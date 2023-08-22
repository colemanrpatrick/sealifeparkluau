//console.log("precheckout.js");

let page1 = document.getElementById("page-1");
let page2 = document.getElementById("page-2");
let page3 = document.getElementById("page-3");

/*===========================================================*/
/*==================| local/current date |==================*/
/*=========================================================*/

const getTime = function (_timezone) {
  let datetime_str = new Date().toLocaleString(
    "en-GB",
    {
      timeZone: _timezone,
    },
    {
      hour12: false,
    }
  );
  dateArr = datetime_str.split(",", 2);
  dateArr.shift();
  datetime_str = dateArr[0].slice(1);
  datetime_str = parseInt(datetime_str);
  return datetime_str;
};

const getTodaysDate = function () {
  let currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return currentDate;
};

/*========================================================*/
/*==================|   Date Picker   |==================*/
/*======================================================*/

let createDatePicker = function (landing) {




/*========================================================*/
/*==================|  dateValidation |==================*/
/*======================================================*/

let availabilityValidate = function () {
  let availability = cartConfig.Availabilities[0].Cutoff;
  let pickupDate = document.getElementById("dateInput");
  let dateError = document.getElementById("date-error");
  if (pickupDate.value == getTodaysDate()) {
    if (parseFloat(getTime("Pacific/Honolulu")) > parseFloat(availability)) {
      dateError.className === "date-error active";
      return false;
    } else {
      dateError.className === "date-error";
      return true;
    }
  } else {
    return true;
  }
};

/*========================================================*/
/*==================|  number spinner |==================*/
/*======================================================*/

let createSpinners = function (landing, $name, priceValue) {
  let numberSpinner = document.createElement("DIV");
  numberSpinner.setAttribute("class", "numberSpinner");

  let spinnerSection = document.createElement("SECTION");

  let spinnerInput = document.createElement("INPUT");

  spinnerInput.setAttribute("type", "number");
  spinnerInput.setAttribute("name", $name);
  spinnerInput.setAttribute("id", $name);
  spinnerInput.setAttribute("class", "price");
  spinnerInput.setAttribute("placeholder", "0");

  if (!priceValue == 0) {
    spinnerInput.value = priceValue;
  }

  spinnerSection.appendChild(spinnerInput);
  numberSpinner.appendChild(spinnerInput);

  landing.appendChild(numberSpinner);
};

/*========================================================*/
/*==================|     Prices      |==================*/
/*======================================================*/

let createPrices = (landing) => {
  // create group template

  let groupTemplate = document.createElement("DIV");
  groupTemplate.setAttribute("id", "groups");

  let groups = cartConfig.Groupings;
  let group;

  Array.prototype.forEach.call(groups, function (item, index) {
    group = document.createElement("DIV");
    group.setAttribute("class", "group");

    let groupHeader = document.createElement("BUTTON");
    groupHeader.setAttribute("type", "button");
    groupHeader.setAttribute("class", "group-header");

    let groupHeaderBtn = document.createElement("SPAN");
    groupHeaderBtn.setAttribute("class", "group-header-btn");
    groupHeaderBtn.innerHTML =
      '<span class="material-symbols-outlined">add_circle</span> view';

    let groupH2 = document.createElement("H2");
    groupH2.setAttribute("class", "group-title");

    let groupSection = document.createElement("div");
    groupSection.setAttribute("class", "group-section");

    if (item.Hidden !== true) {
      groupH2.innerHTML = item.Name;
      group.setAttribute("id", item.Name.replace(/\s/g, ""));
      groupHeader.appendChild(groupHeaderBtn);
      groupHeader.appendChild(groupH2);
      group.appendChild(groupHeader);
      group.appendChild(groupSection);
      groupTemplate.appendChild(group);
    }

    landing.appendChild(groupTemplate);
  });

  // create prices

  let cartPrices = cartConfig.Prices;
  let priceOption;

  Array.prototype.forEach.call(cartPrices, function (item, index) {
    if (item.Hidden !== true) {
      let description = item.Description;
      let grouping = item.Grouping;

      priceOption = document.createElement("UL");
      priceOption.setAttribute("class", "price-option");

      try {
        priceOption.setAttribute("data-group", grouping.replace(/\s/g, ""));
      } catch (error) {}

      let priceSpinnerCont = document.createElement("LI");
      priceSpinnerCont.setAttribute("class", "price-spinner-cont");

      createSpinners(priceSpinnerCont, item.ControlName, item.Quantity);

      let priceDescription = document.createElement("LI");
      priceDescription.setAttribute("class", "price-description");
      priceDescription.innerHTML = "<p>" + description + "</p>";

      let PricePrices = document.createElement("li");
      PricePrices.setAttribute("class", "price-prices");

      if (item.Saleprice == 0) {
        PricePrices.innerHTML = "<p><span>$" + item.ListPrice + "</span></p>";
      } else {
        PricePrices.innerHTML =
          "<p>was<span class='linethru'>$" +
          item.ListPrice +
          "</span></p><p>now<span>$" +
          item.Saleprice +
          "</span></p>";
      }

      priceOption.appendChild(priceSpinnerCont);
      priceOption.appendChild(priceDescription);
      priceOption.appendChild(PricePrices);
      landing.appendChild(priceOption);
    }
  });

  //assign prices to respective groups

  priceOption = document.getElementsByClassName("price-option");

  Array.prototype.forEach.call(priceOption, function (item, index) {
    try {
      itemGrouping = item.getAttribute("data-group");
      let groupId = document.getElementById(itemGrouping);
      let groupCollection = groupId.firstElementChild.nextElementSibling;
      if (groupId.getAttribute("id") === itemGrouping) {
        groupCollection.appendChild(item);
      }
    } catch (error) {
      //console.log(error);
    }
  });

  // remove empty groups and groups with single items
  group = document.getElementsByClassName("group");

  Array.prototype.forEach.call(group, function (item, index) {
    let groupChildren = item.firstElementChild.nextElementSibling;

    if (groupChildren.childElementCount == 0) {
      item.style.display = "none";
    } else if (groupChildren.childElementCount < 2) {
      landing.appendChild(groupChildren.firstElementChild);
    }

    if (groupChildren.childElementCount == 0) {
      item.style.display = "none";
    }
  });
};

/*========================================================*/
/*==============|  Additional Collectors  |==============*/
/*======================================================*/

let createAdditionalCollectors = (landing) => {
  let collector;
  let collectors = cartConfig.Collectors;
  collectors = collectors.slice(1, collectors.length);

  // create single collectors
  Array.prototype.forEach.call(collectors, function (item, index) {
    collector = document.createElement("DIV");
    collector.setAttribute("class", "collector");
    let collectorInput;

    if (item.ApplicationDataType === 7) {
      // create collectors Select
      collectorInput = document.createElement("SELECT");
      collectorInput.setAttribute("ID", "hotel-select");
      let dropDownItems = item.ListMember.ListMembers;

      Array.prototype.forEach.call(
        dropDownItems,
        function (element, elementIndex) {

      });


      Array.prototype.forEach.call(
        dropDownItems,
        function (element, elementIndex) {
          let _option = document.createElement("option");
          _option.innerHTML = element.Shortcode;
          _option.setAttribute("id", "" + element.ID + "");
          _option.setAttribute("value", "" + element.ID + "");
          _option.setAttribute("class", "hotel-select-option");
          collectorInput.appendChild(_option);

          if (element.Selected == true) {
            _option.selected = true;
            item.value = element.ID;
          }
        }
      );
    } else if (item.ApplicationDataType == 1) {
      // create collectors checkbox

      collectorInput = document.createElement("INPUT");
      collectorInput.setAttribute("type", "checkbox");
      collectorInput.setAttribute("class", "checkbox");

      if (item.Value == true) {
        collectorInput.checked = true;
      }
    } else {
      // create collectors text

      collectorInput = document.createElement("INPUT");
      collectorInput.setAttribute("type", "text");
      collectorInput.setAttribute("placeholder", item.Name);
      collectorInput.value = item.Value;
    }

    // add identifiers to collectors

    collectorInput.setAttribute("name", item.ControlName);

    let collectorLabel = document.createElement("LABEL");
    collectorLabel.innerHTML = item.Name;
    collectorLabel.setAttribute("for", item.ControlName);

    collector.appendChild(collectorLabel);
    collector.appendChild(collectorInput);

    landing.appendChild(collector);
  });
};
/*=========================================================*/
/*==================|  email - phone   |==================*/
/*=======================================================*/

let createEmailPhoneCollectors = (landing) => {
  //=========== create email ===========//

  let emailCollector = document.createElement("DIV");
  emailCollector.setAttribute("id", "email-collector");

  let email = document.createElement("INPUT");
  email.setAttribute("type", "email");
  email.setAttribute("id", "email");
  email.setAttribute("placeholder", "email");

  let emailLabel = document.createElement("LABEL");
  emailLabel.innerHTML = "E-Mail";
  emailLabel.setAttribute("for", email.getAttribute("name"));

  try {
    email.setAttribute("name", emailName);
  } catch (error) {
    ////console.log(error);
  }

  //=========== create phone ===========//

  let phoneCollector = document.createElement("DIV");
  phoneCollector.setAttribute("id", "phone-collector");

  let phone = document.createElement("INPUT");
  phone.setAttribute("type", "phone");
  phone.setAttribute("id", "phone");
  phone.setAttribute("placeholder", "phone");
  phone.setAttribute("name", "phone");

  let phoneLabel = document.createElement("LABEL");
  phoneLabel.innerHTML = "Phone";
  phoneLabel.setAttribute("for", email.getAttribute("name"));

  try {
    email.setAttribute("name", mailPhone);
  } catch (error) {
    ////console.log(error);
  }

  //=========== show email/phone ===========//

  emailCollector.appendChild(emailLabel);
  emailCollector.appendChild(email);

  phoneCollector.appendChild(phoneLabel);
  phoneCollector.appendChild(phone);

  //=========== populate email ===========//
  try {
    if (
      cartConfig.Customer.Email.length > 0 &&
      cartConfig.Customer.MobilePhone.length > 0
    ) {
      // do nothing
    } else if (cartConfig.Customer.Email.length > 0) {
      cartConfig.Customer.MobilePhone;
    } else {
      landing.appendChild(emailCollector);
    }
  } catch (error) {
    //console.log("error email/phone" , error);
  }
};
/*========================================================*/
/*==================|  Create Header  |==================*/
/*======================================================*/

let createCheckoutHeader = () => {
  let checkOutHeader = document.getElementById("checkout-header");
  checkOutHeader.innerHTML = cartConfig.ProductTitle;
};

/*========================================================*/
/*==================|  Create page 1  |==================*/
/*======================================================*/

let createPage1 = () => {
  createDatePicker(page1.firstElementChild);
};

/*========================================================*/
/*==================|  Create page 2  |==================*/
/*======================================================*/

let createPage2 = () => {
  createPrices(page2.firstElementChild);

  let numberSpinnerPlus = document.getElementsByClassName("numberPlus");
  let numberSpinnerMinus = document.getElementsByClassName("numberMinus");

  for (var i = 0; i < numberSpinnerPlus.length; i++) {
    numberSpinnerPlus[i].addEventListener("click", function () {
      numIncrement("" + this.previousElementSibling.firstChild.id + "", true);
    });
  }

  for (var i = 0; i < numberSpinnerMinus.length; i++) {
    numberSpinnerMinus[i].addEventListener("click", function () {
      numIncrement("" + this.nextElementSibling.firstChild.id + "", false);
    });
  }
};

/*========================================================*/
/*==================|  Create page 3  |==================*/
/*======================================================*/

let createPage3 = () => {
  createEmailPhoneCollectors(page3.firstElementChild);
  createAdditionalCollectors(page3.firstElementChild);
};
/*========================================================*/
/*==================|     events!     |==================*/
/*======================================================*/

createCheckoutHeader();
createPage1();
createPage2();
createPage3();

let pageIndex;
pageIndex = 1;

/*======================================================*/

let showPage1 = function () {
  page1.className = "addToCartPage active";
  page2.className = "addToCartPage";
  page3.className = "addToCartPage";
  pageIndex = 1;
};

/*======================================================*/

let showPage2 = function () {
  let datePicker = document.getElementById("datepicker");
  _dateError = document.getElementById("date-error");

  if (
    datePicker.value.trim().length === 0 ||
    datePicker.value === null ||
    datePicker.value === undefined
  ) {
    _dateError.className = "date-error active";
  } else {
    if (availabilityValidate() === true) {
      _dateError.className = "date-error";
      page1.className = "addToCartPage";
      page2.className = "addToCartPage active";
      page3.className = "addToCartPage";
      pageIndex = 2;
    } else {
      _dateError.className = "date-error active";
    }
  }
};

/*======================================================*/

let showPage3 = function () {
  let priceOptions = document.getElementsByClassName("price");
  let priceValuesTotal = [];

  for (let i = 0; i < priceOptions.length; i++) {
    priceValuesTotal.push(priceOptions[i].value);
  }

  let priceValuesCombine = priceValuesTotal.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );

  if (priceValuesCombine > 0) {
    document.getElementById("price-error").className = "price-error";
    page1.className = "addToCartPage";
    page2.className = "addToCartPage";
    page3.className = "addToCartPage active";
    pageIndex = 3;
  } else {
    document.getElementById("price-error").className = "price-error active";
  }
};
/*====================| Set and Change Select Value |====================*/
try {
  if (holelSelect !== undefined && hotelSelect !== null) {
    let hotelSelect = document.getElementById("hotel-select");
    let hotelOption = document.getElementsByClassName("hotel-select-option");

    let setSelectValue = function () {
      for (let i = 0; i < hotelOption.length; i++) {
        if (hotelOption[i].selected == true) {
          hotelSelect.setAttribute("value", "" + hotelOption[i].value + "");
          //console.log(hotelSelect.value,hotelOption[i].value);
        }
      }
    };

    setSelectValue();

    hotelSelect.onchange = function () {
      setSelectValue();
    };
  }
} catch (error) {
  console.log(error);
}

/*======================================================*/

let openCheckout = function () {
  document.getElementById("checkout-window").className = "active";
  showPage1();
};

let closeCheckout = function () {
  document.getElementById("checkout-window").className = "";
};

document.addEventListener("click", function (event) {
  let checkoutWindow = document.getElementById("checkout-window");
  if (
    checkoutWindow.className === "active" &&
    event.target.id === "checkout-window" &&
    event.target.id !== "checkout"
  ) {
    closeCheckout();
  }
});

let groupHeader = document.getElementsByClassName("group-header");

Array.prototype.forEach.call(groupHeader, function (item, index) {
  item.addEventListener(
    "click",
    function () {
      if (item.parentElement.className === "group") {
        item.parentElement.className = "group active";
        item.firstElementChild.innerHTML =
          '<span class="material-symbols-outlined">cancel</span> close';
      } else {
        item.parentElement.className = "group";
        item.firstElementChild.innerHTML =
          '<span class="material-symbols-outlined">add_circle</span> view';
      }
    },
    false
  );
});

let lastCheckbox = document.querySelectorAll(".checkbox");
let $checkout = document.getElementById("addToCartSubmit");

try {
  lastCheckbox[lastCheckbox.length - 1].addEventListener("change", function () {
    if (this.checked) {
      $checkout.disabled = false;
    } else {
      $checkout.disabled = true;
    }
  });
} catch (error) {
  console.log(error);
}
