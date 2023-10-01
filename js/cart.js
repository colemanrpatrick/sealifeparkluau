var $_anchor = document.getElementsByTagName("A");
for (var i = 0; i < $_anchor.length; i++) {
  $_anchor[i].setAttribute("class","anchor-" + i + "");
}

//identifies <td/>s in cart
let cart_td = document.getElementsByTagName("TD");
for (var i = 0; i < cart_td.length; i++) {
  cart_td[i].setAttribute("class","td-" + i + "");
}

var $_checkoutSection = document.getElementsByClassName("checkout-section")[0];
$_checkoutSection.setAttribute("id",$_checkoutSection.className);
var $_checkoutSection = document.getElementById("checkout-section");

let $_checkoutSectionHeader = document.createElement("header");
$_checkoutSectionHeader.innerText = "Personal Details";
$_checkoutSectionHeader.setAttribute("id","checkout-section-header");

$_checkoutSection.parentNode.insertBefore($_checkoutSectionHeader,$_checkoutSection);

let $_checkoutOrderHeader = document.createElement("header");
$_checkoutOrderHeader.innerHTML = "Order Details";
$_checkoutOrderHeader.setAttribute("id","order-details-header");
document.getElementById("accordion").parentNode.insertBefore($_checkoutOrderHeader,document.getElementById("accordion"));

var $_totals = document.getElementsByClassName("cart-edit-bottom")[0];
$_totals.setAttribute("id",$_totals.className);
$_totals = document.getElementById("cart-edit-bottom");

let $_totalsHeader = document.createElement("header");
$_totalsHeader.setAttribute("id","totals-header");
$_totalsHeader.innerHTML = "Order total";
$_totals.parentNode.insertBefore($_totalsHeader,$_totals);

var $_inputs;
var $_labels;
var $_containers = document.getElementsByClassName("container");

for (var i = 0; i < $_containers.length; i++) {
  $_containers[i].setAttribute("id","container-" + i + "");
}

$_inputs = document.getElementsByTagName("INPUT");
$_labels = document.getElementsByTagName("LABEL");

for (var i = 0; i < $_inputs.length; i++) {
  if($_inputs[i].parentNode.getAttribute("id") === "container-1"){
    $_inputs[i].setAttribute("class","detail-input");
  };
};

for (var i = 0; i < $_labels.length; i++) {
  if ($_labels[i].parentNode.getAttribute("id") === "container-1") {
    $_labels[i].setAttribute("class","detail-label");
  };
};

$_inputs = document.getElementsByClassName("detail-input");
$_lables = document.getElementsByClassName("detail-label");

function wrap(elem,wrapper){
  elem.parentNode.insertBefore(wrapper,elem);
  wrapper.appendChild(elem);
};

var $_div;

for (var i = 0; i < $_labels.length; i++) {
  $_div = document.createElement("div");
  $_div.setAttribute("class","customer-fields");

  if ($_labels[i].className === "detail-label") {
    wrap($_labels[i],$_div);
  }
};

for (var i = 0; i < $_inputs.length; i++) {
  $_inputs[i].setAttribute("id","" + $_inputs[i].getAttribute("name"));
  if($_inputs[i].type === "text" || $_inputs[i].type === "email" && $_inputs[i].className === "detail-input"){
    $_inputs[i].setAttribute("placeholder",$_labels[i].innerText);
    wrap($_inputs[i],document.getElementsByClassName("customer-fields")[i]);
  };
};

function numIncrement(numberInput, increase){
  var myInputObject = document.getElementById(numberInput);
  if (increase) {
    myInputObject.value++;
  } else {
    myInputObject.value--;
  }
  if (myInputObject.value > 999) {
    myInputObject.value = 999;
  }
  if(myInputObject.value <= 0){
    myInputObject.value = '';
  }
}
var numberSpinner = document.querySelectorAll('input[type="number"]');
var indexNumber = 0;

(function() {
  'use strict';
  for (var i = 0; i < numberSpinner.length; i++) {
    numberSpinner[i].setAttribute('id','input' + indexNumber++);
    var plusButton = document.createElement("BUTTON");
    var minusButton = document.createElement("BUTTON");
    plusButton.setAttribute("class","numberPlus");
    minusButton.setAttribute("class","numberMinus");
    plusButton.setAttribute("type","button");
    minusButton.setAttribute("type","button");
    plusButton.innerHTML = "+";
    minusButton.innerHTML = "-"

    numberSpinner[i].parentNode.className = "numberSpinner";
    numberSpinner[i].parentNode.insertBefore(plusButton,numberSpinner[i]);
    numberSpinner[i].parentNode.insertBefore(minusButton,numberSpinner[i].nextElementSibling);
  };

}());

function buttonEvents(){
  var numPlus = document.getElementsByClassName("numberPlus");
  var numMinus = document.getElementsByClassName("numberMinus");
  for (var i = 0; i < numPlus.length; i++) {
    numPlus[i].onclick = (function() {
      var buttonAssociation = this.nextElementSibling.getAttribute("id");
      numIncrement(buttonAssociation,true);
    })
  }
  for (var i = 0; i < numMinus.length; i++) {
    numMinus[i].onclick = (function(){
      var buttonAssociation = this.previousElementSibling.getAttribute("id");
      numIncrement(buttonAssociation,false);
    })
  }
}
buttonEvents();
//====================//
var $_cartBottom = document.getElementsByClassName("row")[1];
$_cartBottom.setAttribute("id","cart-bottom");

//==== datepicker validation fix ====//
document.getElementsByClassName("datepicker")[0].readOnly = true;
//=================================//