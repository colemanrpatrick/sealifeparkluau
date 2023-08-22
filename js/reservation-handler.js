//________________________________________________________
//________________________________________________________
//create Pages  
//________________________________________________________
//________________________________________________________
let create_bronzePage1 = () => {
    createReservationPage("page1");
    createTitle("page1",cartData.Groupings[1].Name);
    showCalendar("page1",cartData.Availabilities[0].ClosedDates,cartData.Collectors[0].ControlName);
};
let create_bronzePage2 = () => {
    createReservationPage("page2");
    createTitle("page2",cartData.Groupings[1].Name);
    showPrices("page2",cartData.Prices,"Bronze Package");
    showPrices("page2",cartData.Prices,null);
    $spinnerEvents();
 };
 let create_bronzePage3 = () => {
    createReservationPage("page3");
    createTitle("page3",cartData.Groupings[1].Name);
    showCollectors("page3",cartData.Collectors);
    showEmailPhoneTemplate("page3");
 };
 let create_silverPage1 = () => {
    createReservationPage("page1");
    createTitle("page1",cartData.Groupings[2].Name);
    showCalendar("page1",cartData.Availabilities[0].ClosedDates,cartData.Collectors[0].ControlName);
};
let create_silverPage2 = () => {
    createReservationPage("page2");
    createTitle("page2",cartData.Groupings[2].Name);
    showPrices("page2",cartData.Prices,"Silver Package");
    showPrices("page2",cartData.Prices,null);
    $spinnerEvents();
 };
 let create_silverPage3 = () => {
    createReservationPage("page3");
    createTitle("page3",cartData.Groupings[2].Name);
    showCollectors("page3",cartData.Collectors);
    showEmailPhoneTemplate("page3");
 };
 let create_goldPage1 = () => {
    createReservationPage("page1");
    createTitle("page1",cartData.Groupings[0].Name);
    showCalendar("page1",cartData.Availabilities[0].ClosedDates,cartData.Collectors[0].ControlName);
};
let create_goldPage2 = () => {
    createReservationPage("page2");
    createTitle("page2",cartData.Groupings[0].Name);
    showPrices("page2",cartData.Prices,"Gold Package");
    showPrices("page2",cartData.Prices,null);
    $spinnerEvents();
 };
 let create_goldPage3 = () => {
    createReservationPage("page3");
    createTitle("page3",cartData.Groupings[0].Name);
    showCollectors("page3",cartData.Collectors);
    showEmailPhoneTemplate("page3");
 };

//________________________________________________________
//________________________________________________________
//display Pages
//________________________________________________________
//________________________________________________________

let displayPage1 = () => {
    hideReservationPages("reservation-page","page1");
    document.getElementById("reservation-controls").appendChild(createButton("next-1","continue","next-btn"));
    document.getElementById("next-1").addEventListener("click",function(){
        displayPage2();
    },false);
};
let displayPage2 = () => {
    hideReservationPages("reservation-page","page2");
    document.getElementById("reservation-controls").appendChild(createButton("prev-2","back","prev-btn"));
    document.getElementById("prev-2").addEventListener("click",function(){
        displayPage1();
    },false);
    document.getElementById("reservation-controls").appendChild(createButton("next-2","continue","next-btn"));
    document.getElementById("next-2").addEventListener("click",function(){
        if(multiInputValidate("price-control")){
            displayPage3();
        }else{
            alert("please select a package");
        };
    },false);
};
let displayPage3 = () => {
    hideReservationPages("reservation-page","page3");
    document.getElementById("reservation-controls").appendChild(createButton("prev-3","back","prev-btn"));
    document.getElementById("prev-3").addEventListener("click",function(){
        displayPage2();
    },false);
    submitButton("reservation-controls");
};

//________________________________________________________
//________________________________________________________
//Do things!!!
//________________________________________________________
//________________________________________________________

let _bronze = document.getElementById("bronze-reservation");
let _silver = document.getElementById("silver-reservation");
let _gold = document.getElementById("gold-reservation");

_bronze.addEventListener("click",() => {
    createReservationTemplate();
    create_bronzePage1();
    create_bronzePage2();
    create_bronzePage3();
    displayPage1();
}); 

_silver.addEventListener("click",() => {
    createReservationTemplate();
    create_silverPage1();
    create_silverPage2();
    create_silverPage3();
    displayPage1();
}); 

_gold.addEventListener("click",() => {
    createReservationTemplate();
    create_goldPage1();
    create_goldPage2();
    create_goldPage3();
    displayPage1();
}); 

//________________________________________________________
//________________________________________________________
