//_____________________________________________________________
//___________________| Reservation UI V2|______________________

//to do: simplify create pages on reservation-template

//_____________________________________________________________

const reservationWindow = document.getElementById("reservation-window");
reservationWindow.className = "hidden";

//________________________________________________________
//________________________________________________________
//create reservation book
//________________________________________________________
//________________________________________________________

let securitySection = () => {

  let securityHeader;
  let securityHeaderSpan;
  let securityHeaderImg;

  securityHeader = document.createElement("Button");
  securityHeader.setAttribute("type","button");
  securityHeader.setAttribute("ID","security-header");

  securityHeaderSpan = document.createElement("span");
  securityHeaderSpan.innerHTML = "Your Order Is Secure";

  securityHeaderImg = document.createElement("IMG");
  securityHeaderImg.setAttribute("src","images/design/shieldlock.svg");

  securityHeader.appendChild(securityHeaderImg);
  securityHeader.appendChild(securityHeaderSpan);
  return securityHeader;
};

let createSecurityDialogue = () =>{

  let securityHeader = document.getElementById("security-header");

  let securityDialogue = document.createElement("div");
  securityDialogue.setAttribute("id","security-dialogue");
  securityDialogue.innerHTML = "<p>Encrypting our payment processes protects sensitive information from being the risk of unauthorized access. Rest assured your payment details are confidential and secure.</p>";

  securityHeader.parentNode.insertBefore(securityDialogue,securityHeader.nextElementSibling);

  securityHeader.addEventListener("click",() => {
    idToggle("security-dialogue","active");
  },false);

  securityDialogue.addEventListener("click",() => {
    idToggle("security-dialogue","active");
  },false);
};

let createReservationTemplate = () => {

  reservationWindow.className = "active";

  let reservationContainer = document.createElement("div");
  let reservationBook = document.createElement("div");
  let reservationBookControls = document.createElement("div");
  let clearReservationWindowBtn = document.createElement("button");

  clearReservationWindowBtn.setAttribute("type","button");
  clearReservationWindowBtn.setAttribute("id","close-reservation");
  clearReservationWindowBtn.innerHTML = "<span class='material-symbols-outlined'>close</span>";
  clearReservationWindowBtn.addEventListener("click",clearReservationTemplate,false);

  reservationBook.setAttribute("id", "reservation-book");
  reservationBookControls.setAttribute("id", "reservation-controls");
  reservationContainer.setAttribute("id","reservation-container");

  reservationWindow.appendChild(reservationContainer);

  reservationContainer.appendChild(securitySection());
  createSecurityDialogue();

  reservationContainer.appendChild(clearReservationWindowBtn);
  reservationContainer.appendChild(reservationBook);
  reservationContainer.appendChild(reservationBookControls);
};

let clearReservationTemplate = () => {
  reservationWindow.innerHTML = '';
  reservationWindow.className = "hidden";
};

let createReservationPage = (id) => {
  let reservationPage = document.createElement("div");
  reservationPage.setAttribute("class", "reservation-page");
  reservationPage.setAttribute("id", id);
  document.getElementById("reservation-book").appendChild(reservationPage);
};

let hideReservationPages = (pageClass,pageId) => {
  let reservationPage = document.getElementsByClassName(pageClass);
  for (let i = 0; i < reservationPage.length; i++) {
    reservationPage[i].className = pageClass + " hidden";
  }
  document.getElementById(pageId).className = pageClass + " active";
  document.getElementById("reservation-controls").innerHTML = " ";
};

let createButton = ($id,$text,$class) => {
  let $button = document.createElement("Button");
  $button.innerHTML = $text;
  $button.setAttribute("id", $id);
  $button.setAttribute("class",$class);
  $button.setAttribute("type","button");
  return $button;
};


//________________________________________________________
//________________________________________________________
//create Title
//________________________________________________________
//________________________________________________________

let createTitle = (page,$package) =>{
  let packageTitle = document.createElement("h2");
  packageTitle.className = "package-title";
  packageTitle.innerHTML = $package;
  document.getElementById(page).appendChild(packageTitle);
}

//________________________________________________________
//________________________________________________________
//create calendar
//________________________________________________________
//________________________________________________________

const getTime = (_timezone) => {
  let datetime_str = new Date().toLocaleString(
    "en-GB",
    { timeZone: _timezone },
    { hour12: false }
  );
  dateArr = datetime_str.split(",", 2);
  dateArr.shift();
  datetime_str = dateArr[0].slice(1);
  datetime_str = parseInt(datetime_str);
  return datetime_str;
};

const getTodaysDate = () => {
  let currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return currentDate;
};

let createCalendar = (page,$name) => {
  let dateInput = document.createElement("input");
  let datePicker = document.createElement("div");

  dateInput.setAttribute("type", "text");
  dateInput.setAttribute("name", $name);
  dateInput.setAttribute("id", "dateInput");

  datePicker.setAttribute("id", "datepicker");

  let calendarMessage = document.createElement("div");
  calendarMessage.setAttribute("id","calendar-message");
  calendarMessage.setAttribute("class","hidden");
  calendarMessage.innerHTML = "<span class='material-symbols-outlined'>edit_calendar</span><p>Select a date to continue</p>";

  document.getElementById(page).appendChild(dateInput);
  document.getElementById(page).appendChild(datePicker);
  document.getElementById(page).appendChild(calendarMessage);

};

let validateCart = ($id,$visible) => {
  calendarMsg = document.getElementById($id);
  if($visible){
    calendarMsg.className = "visible";
  }else{
    calendarMsg.className = "hidden";
  }
};

//________________________________________________________
//________________________________________________________
//show calendar
//________________________________________________________
//________________________________________________________

let showCalendar = (page, $collector) => {
  
  let disabledDates = $collector.Availabilities[0].ClosedDates;
  let $name = $collector.Collectors[0].ControlName;

  createCalendar(page,$name);

  let dateToday = new Date();
  disabledDates = JSON.parse(disabledDates);
  for (var i = 0; i < disabledDates.length; i++) {
    disabledDates[i] = disabledDates[i].replace(/\//g, "-");
  }
  $("#datepicker").datepicker({
    minDate: dateToday,
    defaultDate: "0M",
    beforeShowDay: function (date) {
      var disabledDatesString = jQuery.datepicker.formatDate("mm-dd-yy", date);
      return [disabledDates.indexOf(disabledDatesString) == -1];
    },
  });
  console.log($collector.Collectors[0].Value);
  if ($collector.Collectors[0].Value !== null) {
    console.log($collector.Collectors[0].Value);
    $("#datepicker").datepicker("setDate",$collector.Collectors[0].Value);
    $("#dateInput").prop("value", $collector.Collectors[0].Value);
  }else{
    console.log("no value")
    $("#datepicker").val("");
    $("#dateInput").prop("value", "");
  };

  /*====== datepicker / date input events ======*/

  $("#dateInput").change(function () {
    $("#datepicker").datepicker("setDate", $(this).val()).trigger("change");
  });
  $("#datepicker").change(function (disabledDates) {

    if ($("#dateInput").val() !== disabledDates) {
      $("#dateInput").prop("value", $(this).val());
    };

    if ($("#dateInput").val() !== "") {
      validateCart("calendar-message",false);
    }else{
      validateCart("calendar-message",true);
    }
  });
};

//________________________________________________________
//________________________________________________________
//create Prices
//________________________________________________________
//________________________________________________________

var $createNewLiElement = ($parentElement,$elem) => {
  let $li = document.createElement("LI");
  $parentElement.appendChild($li);
  $li.appendChild($elem);
};

function numIncrement(numberInput, increase) {

  var myInputObject = document.getElementById(numberInput);
  //console.log(myInputObject);

  if (increase) {
      myInputObject.value++;
  } else {
      myInputObject.value--;
  };

  if (myInputObject.value > 999) {
      myInputObject.value = 999;
  };
  if (myInputObject.value <= 0) {
      myInputObject.value = 0;
  };

};

let spinnerFunction = (elem,$value) => {
  //console.log(this.id);
};

let createSpinners = (controlName,$value) =>{
  let $priceInput = document.createElement("input");
  $priceInput.setAttribute("type","text"); 
  $priceInput.setAttribute("id",controlName);
  $priceInput.setAttribute("name",controlName);
  $priceInput.setAttribute("class","price-control");


  let $spinnerTemplate = document.createElement("div");
  $spinnerTemplate.setAttribute("class","spinner-container");

  $spinner = document.createElement("input");
  $spinner.setAttribute("type","text");
  $spinner.setAttribute("class","spinner");
  $spinner.setAttribute("id","spinner-"+controlName);

  $priceInput.value = $value;
  $spinner.value = $value;

  $spinner.setAttribute("readonly","true");

  $minusButton = createButton("spinner-minus-"+controlName,"<span class='material-symbols-outlined'>remove</span>","minus-button");
  $plusButton = createButton("spinner-plus-"+controlName,"<span class='material-symbols-outlined'>add</span>","plus-button"); 

  $spinnerTemplate.appendChild($priceInput);
  $spinnerTemplate.appendChild($minusButton);
  $spinnerTemplate.appendChild($spinner);
  $spinnerTemplate.appendChild($plusButton);

  return $spinnerTemplate;

}; 

let createPrices = (page,priceGroupArg) => {

  let controlName = priceGroupArg[0];
  let priceDescription = priceGroupArg[1];
  let listPrice = priceGroupArg[2];
  let salePrice = priceGroupArg[3];
  let $quantity = priceGroupArg[4];
  let $isHidden = priceGroupArg[5];

  let $priceContainer = document.createElement("UL");
  $priceContainer.setAttribute("class","price-container");

  let $description = document.createElement("P");
  $description.setAttribute("class","price-description");
  $description.innerHTML = " " + priceDescription + " ";

  let $priceList = document.createElement("DIV");
  $priceList.setAttribute("class","price-list");
  
  let _listPrice = document.createElement("P");
  _listPrice.setAttribute("class","list-price");
  _listPrice.innerHTML = "$" + listPrice;

  $priceList.appendChild(_listPrice);

  if(salePrice !== 0){
    let _salePrice = document.createElement("P");
    _salePrice.setAttribute("class","sale-price");
    _salePrice.innerHTML = "$" + salePrice;
    $priceList.appendChild(_salePrice);
  }

  if(!$isHidden == true){
    document.getElementById("" + page + "").appendChild($priceContainer);
  }

  $createNewLiElement($priceContainer,createSpinners(controlName,$quantity));
  $createNewLiElement($priceContainer,$description);
  $createNewLiElement($priceContainer,$priceList);
};

//________________________________________________________
//________________________________________________________
//show Prices
//________________________________________________________
//________________________________________________________

let showPrices = (page,dataPrices,priceGroup) => {
  Object.entries(dataPrices).forEach(entry => {
    const [key, value] = entry;
    let priceGroupArg = [ 
    value.ControlName,
    value.Description,
    value.ListPrice,
    value.Saleprice,
    value.Quantity,
    value.Hidden
    ];
    if(value.Grouping == priceGroup){
      createPrices(page,priceGroupArg);
    };
  });

  let listPrice = document.getElementsByClassName("list-price");
  for (let i = 0; i < listPrice.length; i++) {
    if(listPrice[i].nextElementSibling !== null){
      listPrice[i].classList += " strike-price";
    };
  };

};

let addPriceMessage = (page) =>{
  let priceMessage = document.createElement("div");
  priceMessage.setAttribute("id","price-message");
  priceMessage.setAttribute("class","hidden");
  priceMessage.innerHTML = "<span class='material-symbols-outlined'>edit_calendar</span><p>At least one participant must be added to continue</p>";  
  document.getElementById(page).appendChild(priceMessage);
}
//________________________________________________________
//________________________________________________________
//Prices Events
//________________________________________________________
//________________________________________________________

let $spinnerEvents = () => {
  $plusButton = document.getElementsByClassName("plus-button");
  $minusButton = document.getElementsByClassName("minus-button");

    for (let i = 0; i < $plusButton.length; i++) {
      $plusButton[i].addEventListener("click",({target}) => {

        validateCart("price-message",false);

        let $spinner = target.parentElement.previousElementSibling;
        let $input = $spinner.parentElement.firstElementChild;
        numIncrement( $spinner.getAttribute("id"), true);
        $input.value = $spinner.value;
      });
    };


    for (let i = 0; i < $minusButton.length; i++) {
      $minusButton[i].addEventListener("click",({target}) => {

        validateCart("price-message",false);

        let $spinner = target.parentElement.nextElementSibling;
        let $input = $spinner.parentElement.firstElementChild;
        numIncrement( $spinner.getAttribute("id"), false);
        $input.value = $spinner.value;
      });
    };
};

let multiInputValidate = function (elem) {
  let $inputs = document.getElementsByClassName(elem);
  let $inputsValueTotal = [];

  for (let i = 0; i < $inputs.length; i++) {
    $inputsValueTotal.push($inputs[i].value);
  }

  let inputValuesCombine = $inputsValueTotal.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );
  if (inputValuesCombine > 0) {
    return true;
  } else {
    return false;
  }
};

//________________________________________________________
//________________________________________________________
//create collectors
//________________________________________________________
//________________________________________________________

let createCollectors = (page,$collector) => {

    let $dataType = $collector.ApplicationDataType;
    
    let $collectorContainer = document.createElement("DIV");
    $collectorContainer.setAttribute("class","collector-container");

    switch ($dataType) {

      case 0:

        let $textLabel = document.createElement("label");
        let $textInput = document.createElement("input");

        if($collector.Value === null){
          $textInput.value = "";
        }else{
          $textInput.value = $collector.Value;
        };

        if(!$collector.DisplayAlias){
          $textLabel.innerHTML = $collector.Name;
          $textInput.setAttribute("placeholder",$collector.Name);
        }else{
          $textLabel.innerHTML = $collector.DisplayAlias;
          $textInput.setAttribute("placeholder",$collector.DisplayAlias);
        }
        
        $textLabel.setAttribute("for",$collector.ControlName);
        $textInput.setAttribute("type","text");
        $textInput.setAttribute("id",$collector.ControlName);
        $textInput.setAttribute("name",$collector.ControlName);

        $collectorContainer.appendChild($textLabel);
        $collectorContainer.appendChild($textInput);

        document.getElementById("" + page + "").appendChild($collectorContainer);

        break;

      case 1:

        let $bitLabel = document.createElement("label");
        $bitLabel.innerHTML = $collector.Name;

        let $bitInput = document.createElement("input");
        $bitInput.setAttribute("type", "checkbox");
        $bitInput.setAttribute("name", $collector.ControlName);
        $bitInput.setAttribute("Id", $collector.ControlName);

        if($collector.Value === null){
          $bitInput.checked = false;
        }else{
          $bitInput.checked = true;
        };

        $collectorContainer.appendChild($bitLabel);
        $collectorContainer.appendChild($bitInput);

        document.getElementById("" + page + "").appendChild($collectorContainer);

        break;

      case 7:

        let $selectCollector = document.createElement("SELECT");
        let $selectLabel = document.createElement("Label");

        $selectLabel.setAttribute("for",$collector.ControlName);
        $selectLabel.innerHTML = $collector.Name; 

        $selectCollector.setAttribute("name", $collector.ControlName);
        $selectCollector.setAttribute("id", $collector.ControlName);

        let $selectCollectorList = $collector.ListMember.ListMembers;

        Array.prototype.forEach.call(

          $selectCollectorList,
          function (element, elementIndex) {
            let $selectCollectorOption = document.createElement("option");
            $selectCollectorOption.setAttribute("id",element.ID);
            $selectCollectorOption.innerHTML = element.Shortcode;
            $selectCollectorOption.setAttribute("value", "" + element.ID + "");
            $selectCollector.appendChild($selectCollectorOption);
            
            if(element.Selected == true){
              $selectCollector.value = $selectCollectorOption.id;
            };
        });

        $collectorContainer.appendChild($selectLabel);
        $collectorContainer.appendChild($selectCollector);
        document.getElementById("" + page + "").appendChild($collectorContainer);

        $selectCollector.addEventListener("change",() => {
           let selectOption = $selectCollector.options[$selectCollector.selectedIndex];
           let selectOptionId = selectOption.id;
           $selectCollector.value = selectOptionId;
        });

        break;

      default:

        //console.log("no collectors to return", $collector);

        break;

    };

};

//________________________________________________________
//________________________________________________________
//show collectors
//________________________________________________________
//________________________________________________________

let showCollectors = (page,$collectors) => {
  $collectors = $collectors.slice(1);
  Object.entries($collectors).forEach(entry => {
    const [key,value] = entry;
    createCollectors(page,value);
  });
};

//________________________________________________________
//________________________________________________________
//collector events
//________________________________________________________
//________________________________________________________

let collectorValidate = ($id,$collector) => {

  let $element = document.getElementById($id);
  let $dataType = $collector.ApplicationDataType;

  switch ($dataType) {

    case 0:

      break;

    case 1:

      break;

    case 2: 

      if($element.value.length <= 0 ){
        return false;
      }else{
        return true;
      };

    case 7:

      break;

    default:

      break;

  };

};

//________________________________________________________
//________________________________________________________
//create email/phone collector
//________________________________________________________
//________________________________________________________
let createEmailPhoneCollectors = ($email,$phone) => {

  //=========== create email ===========//
  let emailCollector = document.createElement("DIV");
  emailCollector.setAttribute("id", "email-collector");

  let email = document.createElement("INPUT");
  email.setAttribute("type", "email");
  email.setAttribute("id", "email");
  email.setAttribute("placeholder", "email");
  email.setAttribute("name","Order.Customer.PrimaryEmail");

  let emailLabel = document.createElement("LABEL");
  emailLabel.innerHTML = "E-Mail";

  let phoneCollector = document.createElement("DIV");
  phoneCollector.setAttribute("id", "phone-collector");

  let phone = document.createElement("INPUT");
  phone.setAttribute("type", "text");
  phone.setAttribute("id", "phone");
  phone.setAttribute("placeholder", "phone");
  phone.setAttribute("name", "Order.Customer.MobilePhone");

  let phoneLabel = document.createElement("LABEL");
  phoneLabel.innerHTML = "Phone";

  emailCollector.appendChild(emailLabel);
  emailCollector.appendChild(email);

  phoneCollector.appendChild(phoneLabel);
  phoneCollector.appendChild(phone);

  if($email == true && $phone == false){
    return emailCollector;
  }else if($email == false && $phone == true){
    return phoneCollector;
  }else{
    return false;
  }
};

let showEmailPhoneTemplate = (page) => {
  let collectorContainer = document.createElement("collector-container");
  collectorContainer.setAttribute("class","collector-container");
  if(cartData.Customer.Email.length <= 0){
    collectorContainer.appendChild(createEmailPhoneCollectors(true,false));
    document.getElementById(page).appendChild(collectorContainer);
  }else if(
    cartData.Customer.Email.length > 0 &&
    cartData.Customer.MobilePhone.length <= 0
  ){
    collectorContainer.appendChild(createEmailPhoneCollectors(false,true));
    document.getElementById(page).appendChild(collectorContainer);
  }else{
      //console.log("do nothing ");
  };
};

//________________________________________________________
//________________________________________________________
//helper functions
//________________________________________________________
//________________________________________________________

// let checkValue = ($id) => {
//   $element = document.getElementById($id);
//   alert($id+": "+$element.value);
// }

let submitButton = (page) => {

    $hiddenInput = document.createElement("input");
    $hiddenInput.setAttribute("type","hidden");
    $hiddenInput.setAttribute("name","cart");
    $hiddenInput.setAttribute("value","true");

    $submitButton = document.createElement("button");
    $submitButton.setAttribute("type","submit");
    $submitButton.setAttribute("value","Book Now");
    $submitButton.setAttribute("id","addToCartSubmit");
    $submitButton.setAttribute("name","submit");
    $submitButton.innerHTML = "Add To Cart";

    document.getElementById(page).appendChild($hiddenInput);
    document.getElementById(page).appendChild($submitButton);
    
    $submitButton.addEventListener("click",function(){
      // checkValue("dateInput");
      //checkValue("SelectYourOahuHotel_2341");
    });
};