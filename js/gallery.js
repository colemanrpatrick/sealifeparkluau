const photoGallerySrc = [
    {"src" :"designs/sealifeparkluau/images/gallery/3.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/6.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/4.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/5.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"images/gallery9.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/12.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/13.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/17.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/25.jpg" , "alt" : "seo-text-goes-here" },
    {"src" :"designs/sealifeparkluau/images/gallery/17.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/25.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/27.jpg", "alt" : "seo-text-goe-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/28.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/29.jpg", "alt" : "so-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/33.jpg", "alt" : "seo-tex-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/40.jpg", "alt" : "seo-textgoes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/41.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/46.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/48.jpg", "alt" : "seo-text-goes-here"},
    {"src" :"designs/sealifeparkluau/images/gallery/49.jpg", "alt" : "seo-text-goes-here"}
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

