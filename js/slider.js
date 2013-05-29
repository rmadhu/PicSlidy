/**
 * Created with IntelliJ IDEA.
 * User: Madhu Ramalingam
 * Date: 5/27/13
 * Time: 6:45 PM
 * To change this template use File | Settings | File Templates.
 */
var step = 0, canvas, context, images, interval, imageNames;
window.addEventListener('keydown',this.handleArrowKeys,false);
function fillCanvas(){
    canvas=document.getElementById("picCanvas");
    context = canvas.getContext("2d");
    imageNames = ["i4.jpg","i5.jpg","i6.jpg"];
    images = new Array(imageNames.length);
    for(k=0;k<imageNames.length;k++)   {
        images[k]  = new Image();
        images[k].src = "images/"+imageNames[k];
    }
    context.drawImage(images[step], 0, 0)
    if(images.length>1){
        var disableNextButton = document.getElementById("buttonNext");
        disableNextButton.style.visibility="visible";
    }
    playSlideShow();

}

function nextImage(){
    if(interval) {
        window.clearInterval(interval);
    }
    if(step<images.length-1){
        step=step+1;
    }
    if(step>=images.length-1)
    {
        var disableNextButton = document.getElementById("buttonNext");
        disableNextButton.style.visibility="hidden";
    }
    context.drawImage(images[step], 0, 0);
    if(step>0){
        var disablePrevButton = document.getElementById("buttonBack");
        disablePrevButton.style.visibility="visible";
    }
}

function prevImage(){
    if(interval) {
        window.clearInterval(interval);
    }
    if(step>0){
        step=step-1;
    }
    context.drawImage(images[step], 0, 0);
    if(step>=1)
    {
        var disablePrevButton = document.getElementById("buttonBack");
        disablePrevButton.style.visibility="visible";
        if(step<images.length-1)
        {
            var disableNextButton = document.getElementById("buttonNext");
            disableNextButton.style.visibility="visible";
        }
    }
    else{
        var disablePrevButton = document.getElementById("buttonBack");
        disablePrevButton.style.visibility="hidden";
    }
}

function handleArrowKeys(e){
    var code = e.keyCode;
    if(code==37){
        e.preventDefault();
        if(interval) {
            window.clearInterval(interval);
        }
        prevImage();
    } else if(code==39){
        e.preventDefault();
        if(interval) {
            window.clearInterval(interval);
        }
        nextImage();
    }

}

function playSlideShow() {
    var i = -1;
    interval = setInterval(function() {
        i=i+1;
        if(i==0){
            var disablePrevButton = document.getElementById("buttonBack");
            disablePrevButton.style.visibility="hidden";
            var disableNextButton = document.getElementById("buttonNext");
            disableNextButton.style.visibility="visible";
        }
        if(i>=images.length-1)
        {
            var disableNextButton = document.getElementById("buttonNext");
            disableNextButton.style.visibility="hidden";
        }
        context.drawImage(images[i], 0, 0);
        if(i>0){
            var disablePrevButton = document.getElementById("buttonBack");
            disablePrevButton.style.visibility="visible";
        }
        step=i;
        if(i==images.length-1)  {
            i=-1;
        }
    }, 2000);

}

