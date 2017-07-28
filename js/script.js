/**
 * Created by Warren on 2017-07-25.
 */

// todo: add search filter(filter on char keyup for images that contain the word in the search
//Write this function in vanilla javaScript as I need to get more comfortable with the language
function searchAndDetroy() {

    var images = document.getElementsByClassName('image');
    var input = document.getElementById('search');
    var imageItem = document.querySelectorAll('.imageItem');

    input.onkeyup = function () {
        for(i=0; i < images.length; i++){
            // console.log(images[i].previousElementSibling.innerHTML); // desired results
            // console.log(images[i].getAttribute('alt'));
            // console.log(images[i].getAttribute('title').toUpperCase());
            // console.log(input.value.toUpperCase());
            if(images[i].getAttribute('title').toUpperCase().indexOf(input.value.toUpperCase()) >= 0 ){
                //hide images that don't contain keyword from input
                document.getElementsByClassName('imageItem')[i].style.display = '';
            } else {
                // show image
                document.getElementsByClassName('imageItem')[i].style.display = 'none';
            }
            // console.log('Display: '+images[i].style.display);
        }
    };
}// EOF
searchAndDetroy();


/**
 * Created by Warren Leyes on 2017-07-16.
 */
// todo: figure out how to detect if on mobile breakpoint and set title and text visible
$(document).ready(function() {
    $(this).find('.imageTitle').hide();
    $(this).find('.imageText').hide();
    $('.imageItem').hover( function() {
        $(this).find('.imageTitle').slideDown(400);
        $(this).find('.imageText').slideDown(400);
    }, function() {
        $(this).find('.imageTitle').slideUp(400);
        $(this).find('.imageText').slideUp(400);
    });
}); // EOF


/**
 * Created by Warren on 2017-07-11.
 */

$(document).ready(function() {
    //Global variables
    var image = document.getElementsByClassName('image');
    var headerText = document.getElementsByClassName('imageTitle');
    var captionText= document.getElementsByClassName('imageText');
    var $imageIndex = 0;
    var lightbox;

    // this is set get and set local storage to prevent the intro from playing everytime the lightbox gets closed
    // can remove the local storage cookie in dev console ;)
    function intro(){
        var ls = window.localStorage;
        if(ls.getItem('intro') === 'undefined' || ls.getItem('intro') === null)
        {
            ls.setItem('intro', true);
        }
        if(ls.getItem('intro') === 'true'){
            $('.imageItem').addClass('intro');
            $('.gallery').addClass('intro2');
        }
        if(ls.getItem('intro') === 'false'){
            $('.imageItem').removeClass('intro');
            $('.gallery').removeClass('intro2');
        }
    }
    intro();

    // Buttons
    function closeOverlay() {
        $('.overlay').on('click', '.fa-times' ,function () {
            $('.gallery').show();
            $('.header').show();
            $('.overlayBackground').hide();
            $('.overlay').hide();
            clearOverlay();
            intro()
        });
    }

    function nextImage() {
        $('.overlay').on('click', '.fa-chevron-circle-right', function () {
            $imageIndex++;
            if($imageIndex === $('.imageItem').length){
                $imageIndex = 0;
            }
            clearOverlay();
            appendToOverlay();
        });
    }

    function previousImage() {
        $('.overlay').on('click', '.fa-chevron-circle-left', function () {
            $imageIndex--;
            if($imageIndex < 0){
                $imageIndex = $('.imageItem').length -1;
            }
            closeOverlay();
            appendToOverlay();
        });
    }

    // string replace image path
    function largeImagePath(path) {
        var imagePath = 'img/thumbnails/';
        var newImagePath = 'img/';
        path =  image[$imageIndex].src;
        return path.replace(imagePath, newImagePath);
    }

    // create a click function
    $('.gallery').on('click', '.imageItem',function (e) {
        e.preventDefault();
        $imageIndex = $(this).index();
        $('.header').hide();
        $('.gallery').hide();
        $('.imageItem').css('z-index', 5);
        //Open overlay and elements
        appendToOverlay();
        nextImage();
        previousImage();
        closeOverlay();
        window.localStorage.setItem('intro', 'false');
        intro();
    });

    function appendToOverlay() {
        $('body').append(lightbox.background)
            .append(lightbox.overlay);
        $('.overlayBackground').attr('src', largeImagePath(image[$imageIndex].src)).show();
        $('#largeImage').attr('src', largeImagePath(image[$imageIndex].src)).show();
        $('#heading').html(headerText[$imageIndex].innerHTML).show();
        $('#caption').html(captionText[$imageIndex].innerHTML).show();
        $('.overlay').append(lightbox.largeImage)
            .append(lightbox.title).show()
            .append(lightbox.caption).show()
            .append(lightbox.exit).show()
            .append(lightbox.next).show()
            .append(lightbox.previous).show();
        }
    lightbox = {
        background: function () {return '<img id="background" class="overlayBackground" src="' + largeImagePath(image[$imageIndex].src) + '" alt="' + image[$imageIndex].alt + '">';},
        overlay: '<div class="overlay"></div>',
        previous: '<i id="previousButton" class="fa fa-chevron-circle-left"></i>',
        next: '<i id="nextButton" class="fa fa-chevron-circle-right"></i>',
        exit: '<i id="closeButton" class="fa fa-times"></i>',
        largeImage: function () {return '<img id="largeImage" src="' + largeImagePath(image[$imageIndex].src) + '" alt="' + image[$imageIndex].alt + '">';},
        title: function () {return '<h1 id="heading">' + headerText[$imageIndex].innerHTML + '</h1>';} ,
        caption: function() {return '<figcaption id="caption">' + captionText[$imageIndex].innerHTML + '</figcaption>';}
    };

    function clearOverlay() {
        lightbox.background = '';
        lightbox.overlay = '';
        lightbox.previous = '';
        lightbox.next = '';
        lightbox.exit ='';
        lightbox.largeImage = '';
        lightbox.title = '';
        lightbox.caption = '';
        $('.overlayBackground').children('.overlay').remove();
    }
}); // EOF

