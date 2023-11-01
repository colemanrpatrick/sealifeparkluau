//________________________________________________________
//________________________________________________________
//create Pages
//________________________________________________________
//________________________________________________________
let createPage1 = () => {
    createReservationPage("page1");
    createTitle("page1","Start By Selecting a Date");
    showCalendar("page1",cartData);
};
let createPage2 = ($group) => {
    createReservationPage("page2");
    createTitle("page2","How Many Participants?");
    showPrices("page2",cartData.Prices,$group);
    showPrices("page2",cartData.Prices,null);
    addPriceMessage("page2");
    $spinnerEvents();
 };
 let createPage3 = () => {
    createReservationPage("page3");
    createTitle("page3","Lastly, Party Name & Details");
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
        if (collectorValidate("dateInput",cartData.Collectors[0])){
            displayPage2();
        } else {
           validateCart("calendar-message",true)   
        };    
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
            validateCart("price-message",true);
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

//________________________________________________________
//________________________________________________________
//Do things!!!
//________________________________________________________
//________________________________________________________

let packageOne = document.getElementById("bronze-reservation");
let packageTwo = document.getElementById("silver-reservation");
let packageThree = document.getElementById("gold-reservation");

packageOne.addEventListener("click",() => {
    createReservationTemplate();
    createPage1();
    createPage2("Bronze Package");
    createPage3();
    displayPage1();
}); 

packageTwo.addEventListener("click",() => {
    createReservationTemplate();
    createPage1();
    createPage2("Silver Package");
    createPage3();
    displayPage1();
}); 

packageThree.addEventListener("click",() => {
    createReservationTemplate();
    createPage1();
    createPage2("Gold Package");
    createPage3();
    displayPage1();
}); 

//________________________________________________________
//________________________________________________________
