
window.onload = function () {
    var imageIndex = 0; // index of current image which is on display
    var images = document.getElementsByClassName('test');   // object array of all the images of class test
    var isMouseOverImage = false; // this tells us if mouse if over image or not, we only change image if mouse if over it
    var scrollImages = document.getElementById('scroll-image'); // object of parent element containing all images
    var x, y; // stores the current scoll co-ordinates so that the window don't scroll down while scrolling the images

    // this function sets the scroll to x,y
    function noScroll() {
        window.scrollTo(x, y);
    }

    // the following event id fired once when we hover mouse over the images
    scrollImages.addEventListener('mouseenter', function () {
        // we store the current page offset to x,y
        x = window.pageXOffset;
        y = window.pageYOffset;
        // we add the following event to window object, so if we scroll down after mouse is over the image we can avoid scrolling the window
        window.addEventListener('scroll', noScroll);
        // we set isMouseOverImage to true, this means mouse is now over the iamge
        isMouseOverImage = true;
    });

    // the following function is fired when mouse is no longer over the images
    scrollImages.addEventListener('mouseleave', function () {
        // we set isMouseOverImage to false, this means mouse is not over the iamge
        isMouseOverImage = false;
        // we remove the event we previously added because we are no longer over the image, the scroll will now scroll the window
        window.removeEventListener('scroll', noScroll);
    });

    // the following function is called when we move mouse wheel over the images
    scrollImages.addEventListener('wheel', function (e) {
        // We check if we are over image or not
        if (isMouseOverImage) {
            var nextImageIndex;

            //The following condition finds the next image index depending if we scroll up or scroll down
            if (e.deltaY > 0)
                nextImageIndex = (imageIndex + 1) % images.length;
            else
                nextImageIndex = (imageIndex - 1 + images.length) % images.length;
            // we set the z index of current image to 0
            images[imageIndex].style.zIndex = "0";
            // we set the z index of next image to 1, this makes the new image appear on top of old image
            images[nextImageIndex].style.zIndex = "1";
            imageIndex = nextImageIndex;
        }
    });
}
