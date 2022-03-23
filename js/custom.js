(function(){
  
    $('.image-toggler').click(function(){
         $('.image-toggler').removeClass('active');
         $(this).addClass('active');
         $('.image-toggle').css("opacity", "0");
         $($(this).attr('data-image-id')).css("opacity", "1");
     })
     
     
     $(window).scroll(function () {
         if ( $(this).scrollTop() > 20 && !$('header').hasClass('fixing') ) {
           $('header').addClass('fixing');
        
          } else if ( $(this).scrollTop() <= 20 ) {
           $('header').removeClass('fixing');
      
         }
       });
       
       
       function init() {
 var vidDefer = document.getElementsByTagName('iframe');
 for (var i=0; i<vidDefer.length; i++) {
 if(vidDefer[i].getAttribute('data-src')) {
 vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
 } } }
 window.onload = init;
       
       
 $('.beginner-slider').slick({
   dots: false, 
   arrows: true,
   infinite: false,
   speed: 300,
   slidesToShow: 2.5,
   slidesToScroll: 1,
    autoplay: false,
    centerMode:false,
       variableWidth: true,
   responsive: [
     {
       breakpoint: 840,
       settings: {
         slidesToShow: 1.5
       }
     },
     {
       breakpoint: 480,
       settings: {
         slidesToShow: 1
       }
     }
     // You can unslick at a given breakpoint now by adding:
     // settings: "unslick"
     // instead of a settings object
   ]
 });
 
 
 
 $('.gym-food').slick({
   dots: false, 
   arrows: true,
   infinite: false,
   speed: 300,
   slidesToShow: 1.5,
   slidesToScroll: 1,
    autoplay: false,
    centerMode:false,
       variableWidth: true,
       responsive: [
        
         {
           breakpoint: 767,
           settings: {
             arrows: false,
           }
         }
         // You can unslick at a given breakpoint now by adding:
         // settings: "unslick"
         // instead of a settings object
       ]
 });
   
 // Video controls
 
 var $video = $('.video-area video');
 
 $video.on('mouseover', show);
 $video.on('mouseleave', hide);
 
 function show() {
     $(this).attr('controls', '');
 }
 
 function hide() {
     var isPlaying = false;
     if(!$('#site_video').get(0).paused) {
         isPlaying = true;
     }
     if (!isPlaying) {
         $(this).removeAttr('controls');
     }
 }
 
 $('.wrapper-menu').click(function(event){
   event.stopPropagation();
     $(this).toggleClass('open active');
     $('.menu-outer').toggleClass('show');
     $('body').toggleClass('noscroll');
     $('#navbarNav').toggleClass('show');
     
 });
  $('body').click(function(){
    if($('.wrapper-menu').hasClass("open active")){$('.wrapper-menu').removeClass("open active")};
    if($('.menu-outer').hasClass("show")){$('.menu-outer').removeClass("show")};
     if($('body').hasClass("noscroll")){$('body').removeClass("noscroll")};
   
 
 });
 $('.close-menu').click(function(){
   $('.wrapper-menu').toggleClass('open active');
   $('.menu-outer').toggleClass('show');
     $('body').toggleClass('noscroll');
     $('#navbarNav').toggleClass('show');
 });
 $('#navbarNav li a').click(function(){
   $('.wrapper-menu').toggleClass('open active');
   $('.menu-outer').toggleClass('show');
     $('body').toggleClass('noscroll');
     $('#navbarNav').toggleClass('show');
 });
 
 
 
 if($(window).innerWidth() <= 1140) {
   $('.d-black').removeClass('black');
   
 }
 
 if($(window).innerWidth() < 768) {
   $('.work-slider').slick({
     dots: false, 
     arrows: false,
     infinite: false,
     speed: 300,
     slidesToShow: 1.5,
     slidesToScroll: 1,
      autoplay: false,
      centerMode:false,
      variableWidth: true,
     
   });
   $('.three-col').slick({
     dots: false, 
     arrows: false,
     infinite: false,
     speed: 300,
     slidesToShow: 1.5,
     slidesToScroll: 1,
      autoplay: false,
      centerMode:false,
      variableWidth: true,
     
   });
 }
 
 // Datepicker
 var today = new Date();
 today = today.getFullYear()+'/'+((today.getMonth()+1) < 10 ? '0'+(today.getMonth()+1).toString() : (today.getMonth()+1))+'/'+today.getDate();
 config = {
         locale: 'ja-jp',
         minDate:today,
         format:'yyyy/mm/dd'
     };
 $('#date_one').datepicker (config);
 $('#date_two').datepicker (config);
 
 
 // Phone input check 
 $('input[name="phonee"]').keyup(function(e){ 
        
   if (/\D/g.test(this.value))
   {
   // Filter non-digits from input value.
   this.value = this.value.replace(/\D/g, '');
   }
   
 });
 
 //Validation
 $(".formarea").validate({
 
   rules: {
     application_details: "required",
     first_candidate_date: "required",
     first_candidate_time: "required",
     second_candidate_date: "required",
     second_candidate_time: "required",
     username: "required",
      emailid: {
        required: true,
        email: true
      },
     phonee: {
       required: true       
     },
     
       },
    // Specify validation error messages
    messages: {
     application_details: "Required",
     first_candidate_date: "Required",
     first_candidate_time: "Required",
     second_candidate_date: "Required",
     second_candidate_time: "Required",
     username: "Required",
      emailid: "Required",
      phonee: "Required",
     
      },
      errorClass: 'invalid',
      validClass: 'valid',
      highlight: function(element, errorClass, validClass) {
         $(element).removeClass(validClass).addClass(errorClass).
         next('label').removeAttr('data-success').attr('data-error', 'Incorrect!');       
     },
     unhighlight: function(element, errorClass, validClass) {
         $(element).removeClass(errorClass).addClass(validClass).
         next('label').removeAttr('data-error').attr('data-success', 'Correct!');
 
    },
 
    submitHandler: function(form) {
     var fd = new FormData(document.getElementById("contact_form"));
    // console.log([...fd]);
      //form.submit();
      $.ajax({
       type: 'POST',
    // async: true,
       url: '../email.php',
       data:  fd,
    // datatype: 'json',
       cache: false,
   //  global: false,
       processData: false, // tell jQuery not to process the data
       contentType: false, // tell jQuery not to set contentType
       beforeSend: function() { 
           $('#loader').show();
       },
       success: function(response) {
 
             $('#success-box').show().delay(5000).fadeOut();
             $("#contact_form")[0].reset();
          //   $('#firstfile').html('まだ選択されていません');
             $('#loader').hide();
               console.log(response);
           
       },
       error:function (request, status, error) {
          $('#failure').show();
             console.log(request.responseText);
     
     },
       complete: function() { 
           $('#loader').hide();
       }
   });
    } 
  }); 
 
 
 const observer = lozad(); // lazy loads elements with default selector as '.lozad'
 observer.observe();
 
   
 })(this.jQuery);
 
 
 
 //Tingle
 
 var modalContent = "";
             // instanciate new modal
             var modal = new tingle.modal({
                 beforeClose: function() {
                     modal.setContent("");
                     return true; // close the modal
                 }
             });
             // data-modal属性を持つトリガーボタンを取得
             var modalTrigger = document.querySelectorAll('[data-modal]');
             if(modalTrigger.length > 0){
                 for (let i = 0; i < modalTrigger.length; i++) {
                     var el = modalTrigger[i];
                     //イベントをバインド
                     _addModalEvent(el);
                 }
             }
             function _addModalEvent(el){
                 el.addEventListener('click',function(event){
                     event.preventDefault();
                     // data-modalに指定したIDの要素を取得
                     var target = el.getAttribute('data-modal');
                     // モーダルのコンテンツを取得
                     var modalContent = document.querySelector(target);
                     if(modalContent){
                         // コンテンツをセット
                         modal.setContent(modalContent.innerHTML);
                         // モーダルオープン
                         modal.open();
                     }
                 })
             }
 
 
 
 
 
 // Video Poster
 
 var overlay         = document.getElementById('video-overlay'),
     video           = document.getElementById('site_video'),
     videoPlaying    = false;
 
 function hideOverlay() {
     overlay.style.display = "none";
     videoPlaying = true;
     video.play();
 }
 
 function showOverlay() {
     // this check is to differentiate seek and actual pause 
     if (video.readyState === 4) {
         overlay.style.display = "block";
         videoPlaying = true;
     }
 }
 
 video.addEventListener('pause', showOverlay);
 overlay.addEventListener('click', hideOverlay);
 
 
 //cursor
 
 // Stats
 // const stats = new Stats(); stats.showPanel(0); document.body.appendChild(stats.dom);
 
 const cursor = document.querySelector(".cursor");
 const cursorInner = document.querySelector(".cursor-move-inner");
 const cursorOuter = document.querySelector(".cursor-move-outer");
 
 const trigger = document.querySelector("button");
 
 let mouseX = 0;
 let mouseY = 0;
 let mouseA = 0;
 
 let innerX = 0;
 let innerY = 0;
 
 let outerX = 0;
 let outerY = 0;
 
 let loop = null;
 
 document.addEventListener("mousemove", (e) => {
   mouseX = e.clientX;
   mouseY = e.clientY;
 
   if (!loop) {
     loop = window.requestAnimationFrame(render);
   }
 });
 
 trigger.addEventListener("mouseenter", () => {
   cursor.classList.add("cursor--hover");
 });
 
 trigger.addEventListener("mouseleave", () => {
   cursor.classList.remove("cursor--hover");
 });
 
 function render() {
   // stats.begin();
 
   loop = null;
 
   innerX = lerp(innerX, mouseX, 0.15);
   innerY = lerp(innerY, mouseY, 0.15);
 
   outerX = lerp(outerX, mouseX, 0.13);
   outerY = lerp(outerY, mouseY, 0.13);
 
   const angle = (Math.atan2(mouseY - outerY, mouseX - outerX) * 180) / Math.PI;
 
   const normalX = Math.min(
     Math.floor((Math.abs(mouseX - outerX) / outerX) * 1000) / 1000,
     1
   );
   const normalY = Math.min(
     Math.floor((Math.abs(mouseY - outerY) / outerY) * 1000) / 1000,
     1
   );
   const normal = normalX + normalY * 0.5;
   const skwish = normal * 0.7;
 
   cursorInner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0)`;
   cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) rotate(${angle}deg) scale(${
     1 + skwish
   }, ${1 - skwish})`;
 
   // stats.end();
 
   // Stop loop if interpolation is done.
   if (normal !== 0) {
     loop = window.requestAnimationFrame(render);
   }
 }
 
 function lerp(s, e, t) {
   return (1 - t) * s + t * e;
 }