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
let createPage2 = ($message) => {
    createReservationPage("page2");
    createTitle("page2","How Many Participants?");
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

let displayPage1 = ($group) => {

    localStorage.setItem("gGroup", $group);

    hideReservationPages("reservation-page","page1");
    document.getElementById("reservation-controls").appendChild(createButton("next-1","continue","next-btn"));

    document.getElementById("next-1").addEventListener("click",function(){
        if (collectorValidate("dateInput",cartData.Collectors[0])){
            displayPage2($group);
        } else {
           validateCart("calendar-message",true);
        };    
    },false);
};

//________________________________________________________


let displayPage2 = ($back) => {
    
    $group = localStorage.getItem("gGroup");
    $message = localStorage.getItem("AvailabilityMessage");
    
    hideReservationPages("reservation-page","page2");

    showPrices("page2",cartData.Prices,$group);
    showPrices("page2",cartData.Prices,"Add Infant");
    showPrices("page2",cartData.Prices,"Transportation Add-On");   

//Hack: late transportation add on is manually inserted below because it fell out of the price loop. Figure out why, then remove this.

let showLatePickup = () => {
    let latePriceArg = [
      cartData.Prices[8].ControlName,
      cartData.Prices[8].Description,
      cartData.Prices[8].ListPrice,
      cartData.Prices[8].Saleprice,
      cartData.Prices[8].Quantity,
      cartData.Prices[8].Hidden,
      cartData.Prices[8].Grouping,
    ];

    createPrices("page2",latePriceArg);
}

//====================================================================

    showLatePickup();


    let $groupPrices = document.querySelectorAll('[data-grouping="' + $group + '"]');
   
        if($groupPrices.length == 0){

            clearReservationPage("page2"); 
            unavaliableMessage("page2",$message);

            document.getElementById("unavailable-back").addEventListener("click",() => {

                clearReservationPage("page2"); 
                displayPage1($group);

            });

        }else{

            //showPrices("page2",cartData.Prices,null);

            $spinnerEvents();
            addPriceMessage("page2");
        
            document.getElementById("reservation-controls").appendChild(createButton("prev-2","back","prev-btn"));
            document.getElementById("reservation-controls").appendChild(createButton("next-2","continue","next-btn"));
        
            if($back !== false){
                document.getElementById("prev-2").addEventListener("click",function(){
                    displayPage1($group);
                    clearReservationPage("page2");
                },false);
            };
        
            document.getElementById("next-2").addEventListener("click",function(){
                if(multiInputValidate("price-control")){
                    displayPage3();
                }else{
                    validateCart("price-message",true);
                };
            },false);

        };
    /*=== =============== ===*/
};

//________________________________________________________

let displayPage3 = () => {
    hideReservationPages("reservation-page","page3");
    // document.getElementById("reservation-controls").appendChild(createButton("prev-3","back","prev-btn"));
    // document.getElementById("prev-3").addEventListener("click",function(){
    //     displayPage2();
    // },false);
    submitButton("reservation-controls");
};

//________________________________________________________

let displayPageUnavaliable = () => {
    createReservationPage("page0");
    unavaliableMessage("page0");
};

//________________________________________________________
//Do things!!!
//________________________________________________________
//________________________________________________________

let packageOne = document.getElementById("bronze-reservation");
let packageTwo = document.getElementById("silver-reservation");
let packageThree = document.getElementById("gold-reservation");
packageFour = document.getElementById("vip-reservation");

//page 2 content is dependent on page 1, therefore it's not created at this

packageOne.addEventListener("click",() => {
    let $group = "Bronze Package";
    createReservationTemplate();
    createPage1();
    createPage2();
    createPage3();
    displayPage1($group);
}); 

packageTwo.addEventListener("click",() => {
    let $group = "Silver Package";
    createReservationTemplate();
    createPage1();
    createPage2();
    createPage3();
    displayPage1($group);
}); 

packageThree.addEventListener("click",() => {
    let $group = "Gold Package";
    createReservationTemplate();
    createPage1();
    createPage2();
    createPage3();
    displayPage1($group);
}); 

packageFour.addEventListener("click",() => {

    let $group = "VIP Package";
    localStorage.setItem("AvailabilityMessage" , "This package is not available until December 1st, 2023");

    createReservationTemplate();
    createPage1();
    createPage2();
    createPage3();
    displayPage1($group);

}); 
//________________________________________________________
//________________________________________________________
