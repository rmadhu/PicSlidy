/**
 * Created with IntelliJ IDEA.
 * User: Madhu Ramalingam
 * Date: 5/27/13
 * Time: 6:45 PM
 * To change this template use File | Settings | File Templates.
 */

//top-level namespace assigned to an object literal
var picSlidy = {
step:0,
canvas:null,
context:null,
images:null,
interval:null,
imageNames: new Array(),

fillCanvas: function(){
    canvas=document.getElementById("picCanvas");
    context = canvas.getContext("2d");
    //array of images to be showcased
    imageNames = ["i4.jpg","i5.jpg","i6.jpg"];
    images = new Array(imageNames.length);
    for(var k=0;k<imageNames.length;k++)   {
        images[k]  = new Image();
        images[k].src = "images/"+imageNames[k];
    }

    //loading first image
    context.drawImage(images[this.step], 0, 0);

    //if there are more than one images then enable the 'next' button which is disabled by default
    if(images.length>1){
        var disableNextButton = document.getElementById("buttonNext");
        disableNextButton.disabled=false;
        disableNextButton.className="button enabled";
    }

    //start slide show
    this.playSlideShow();

},

nextImage: function(){
    //if slide show is on then stops it
    if(interval) {
        window.clearInterval(interval);
    }
    if(this.step<images.length-1){
        this.step=this.step+1;
    }
    if(this.step>=images.length-1)
    {
        var disableNextButton = document.getElementById("buttonNext");
        disableNextButton.disabled=true;
        disableNextButton.className="button disabled";
    }
    if(this.step>0){
        var disablePrevButton = document.getElementById("buttonBack");
        disablePrevButton.disabled=false;
        disablePrevButton.className="button enabled";
    }

    context.drawImage(images[this.step], 0, 0);

},

prevImage: function(){
    //if slide show is on then stops it
    if(interval) {
        window.clearInterval(interval);
    }
    if(this.step>0){
        this.step=this.step-1;
    }
    context.drawImage(images[this.step], 0, 0);
    if(this.step>=1)
    {
        var disablePrevButton = document.getElementById("buttonBack");
        disablePrevButton.disabled=false;
        disablePrevButton.className="button enabled";
        if(this.step<images.length-1)
        {
            var disableNextButton = document.getElementById("buttonNext");
            disableNextButton.disabled=false;
            disableNextButton.className="button enabled";
        }
    }
    else{
        var disablePrevButton = document.getElementById("buttonBack");
        disablePrevButton.disabled=true;
        disablePrevButton.className="button disabled";
    }
},

handleArrowKeys: function(e){
    var code = e.keyCode;
    //if left arrow is pressed, prevent default behavior, stop slide show and go to previous image
    if(code==37){
        e.preventDefault();
        if(interval) {
            window.clearInterval(interval);
        }
        picSlidy.prevImage();
    } else if(code==39){  //if right arrow is pressed, prevent default behavior, stop slide show and go to next image
        e.preventDefault();
        if(interval) {
            window.clearInterval(interval);
        }
        picSlidy.nextImage();
    }

},

playSlideShow:function() {
    var i = -1;

    //image changes every 2 seconds until a button is button or left/right arrow keys are pressed
    interval = setInterval(function() {
        i=i+1;
        //if first image then prev button is disabled and next button is enabled
        if(i==0){
            var disablePrevButton = document.getElementById("buttonBack");
            disablePrevButton.disabled=true;
            disablePrevButton.className="button disabled";
            var disableNextButton = document.getElementById("buttonNext");
            disableNextButton.disabled=false;
            disableNextButton.className="button enabled";
        }
        else if(i>0){     //enable the previous button
            var disablePrevButton = document.getElementById("buttonBack");
            disablePrevButton.disabled=false;
            disablePrevButton.className="button enabled";
        }
        //if last image, next button is disabled
        if(i>=images.length-1)
        {
            var disableNextButton = document.getElementById("buttonNext");
            disableNextButton.disabled=true;
            disableNextButton.className="button disabled";
        }
        context.drawImage(images[i], 0, 0);
        //to keep this.step up-to-date
        this.step=i;
        //to keep the slide show running
        if(i==images.length-1)  {
            i=-1;
        }
    }, 2000);

    }
} //object literal closing
window.addEventListener('keydown',picSlidy.handleArrowKeys,false);

