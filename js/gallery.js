const photoGallerySrc = [
    { "src" : "/designs/painaluau/images/gallery/138A6949.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7108.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7024.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7144.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7173.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7214.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7244.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7269.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7278.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7779.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7815.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A7900.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A8063 cropped.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A8063.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A8079.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A8107.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A8133.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A8171.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A8214.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A8600.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A8644.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9596.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9617.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9625.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9648.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9665.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9698.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9708.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9720.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9723.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9725.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9728.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9743.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9756.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9834.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9879.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9920.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9945.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/138A9960.jpg" , "alt" : " "},
    { "src" : "/designs/painaluau/images/gallery/000016450022.jpg" , "alt" : " "}
    ];
    
    const photoGallery = document.getElementById("photo-gallery");
    const videoGallery = document.getElementById("video-gallery");
    const photoControls = document.getElementById("photo-controls");
    const videoControls = document.getElementById("video-controsl");
    
    let createImageGalleryButton = ($name) => {
        let $button = document.createElement("button");
        $button.setAttribute("ID","image-gallery-" + $name + "");
        $button.setAttribute("type","button");
        return $button;
    };
    
    /*=====================================================================*/
    
    photoControls.appendChild(createImageGalleryButton("prev")); 
    
    Array.prototype.forEach.call(photoGallerySrc, function (item, index) {
            let galleryIndexButton = document.createElement("BUTTON");
            galleryIndexButton.setAttribute("type","button");
            galleryIndexButton.setAttribute("class","gallery-index-button");
            photoControls.appendChild(galleryIndexButton); 
    });
    
    photoControls.appendChild(createImageGalleryButton("next")); 
    
    /*=====================================================================*/
    let galleryButtonCurrent = document.getElementsByClassName("gallery-index-button");
    let imageGalleryIndex = 1;
    
    showGalleryImage(imageGalleryIndex);
    // Next/previous controls
    function plusGalleryImage(n) {
        showGalleryImage(imageGalleryIndex += n);
    };
        
    // Thumbnail image controls
    function currentGalleryImage(n) {
        showGalleryImage(imageGalleryIndex = n);
    };
    
    function showGalleryImage(n) {
        let i;
        let galleryImages = document.getElementsByClassName("gallery-image");
        if (n > galleryImages.length) { imageGalleryIndex = 1 }
        if (n < 1) { imageGalleryIndex = galleryImages.length }
        for (i = 0; i < galleryImages.length; i++) {
            galleryImages[i].className = "gallery-image";
        }
        if(galleryImages[imageGalleryIndex - 1] !== undefined){
            galleryImages[imageGalleryIndex - 1].className = "gallery-image active";
        };
    };
    
    /*=====================================================================*/
    
    Array.prototype.forEach.call(photoGallerySrc, function (item, index) {
        // create images
            let galleryImage = new Image();
            galleryImage.setAttribute("src",item.src);
            galleryImage.setAttribute("class","gallery-image");
            galleryImage.setAttribute("alt",item.alt);
            galleryImage.addEventListener("click",() => {
                if(photoGallery.className == "photo-gallery"){
                    currentGalleryImage(index+1);
                    photoGallery.className = "photo-gallery active";
                }else{
                    photoGallery.className = "photo-gallery";
                }
            });
        // add images to gallery
            photoGallery.appendChild(galleryImage);
    });
    
    const galleryButtonNext = document.getElementById("image-gallery-next");
    galleryButtonNext.innerHTML = '<span class="material-symbols-outlined">chevron_right</span>';
    const galleryButtonPrev = document.getElementById("image-gallery-prev");
    galleryButtonPrev.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>';
    
    galleryButtonNext.addEventListener("click",function(){
        plusGalleryImage(1)
    },false);
    galleryButtonPrev.addEventListener("click",function(){
        plusGalleryImage(-1)
    },false);
    
    Array.prototype.forEach.call(galleryButtonCurrent, function (item, index) {
        item.addEventListener("click",function(){
            currentGalleryImage(index + 1);
        },false)
    });
    
    let closeBtn = document.getElementById('photo-close-btn');
    closeBtn.addEventListener("click",function(){
        photoGallery.className = "photo-gallery";
    },false);
    
    /*=====================================================================*/
    // video gallery
    /*=====================================================================*/

    // let galleryVideos = [
    //     {"src" :"https://www.youtube.com/embed/-LlPutbEJak?autoplay=1&rel=0" , "id" : "video-1", "videoSrc" : "designs/sealifeparkluau/images/gallery/the_luau.png"},
    //     {"src" :"https://www.youtube.com/embed/oFuAN_y3_jE?autoplay=1&rel=0" , "id" : "video-2", "videoSrc" : "designs/sealifeparkluau/images/gallery/testemonials.png"},
    //     {"src" :"https://www.youtube.com/embed/u7eXSWeCTH4?autoplay=1&rel=0" , "id" : "video-3", "videoSrc" : "designs/sealifeparkluau/images/gallery/makapu'u-twilight-concert.png"}
    // ];


    // let loadVideo = (galleryVideo,galleryVideoSrc) => {
    //     galleryVideo.addEventListener("click", function () {
    //         var iframe = document.createElement("iframe");
    //         iframe.setAttribute("frameborder", "0");
    //         iframe.setAttribute("allowfullscreen", "");
    //         iframe.setAttribute("src", "https://www.youtube.com/embed/-LlPutbEJak?autoplay=1&rel=0");  //youtube video source//
    //         this.innerHTML = "";
    //         this.appendChild(iframe);
    //     });
    // };

