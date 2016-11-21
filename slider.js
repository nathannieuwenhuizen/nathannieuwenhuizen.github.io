window.addEventListener("load", function (){
	var slider = document.getElementById("slider");
    var slides =slider.getElementsByTagName('img');
    var amountOfimages = 3;
    var curentimage = 1;
    var loop
    console.log(slides);
    slider.style.left = '-'+(curentimage-1)+'00%';
    
    loop = setInterval(function(){
        curentimage++;
        console.log(curentimage);
        if(curentimage >amountOfimages)
        {    
            //clearInterval(loop);
            curentimage = 1;            
        }
        
        gotToSlide(curentimage);
        
    },3000);
    
    function gotToSlide(i)
    {
        
        slides[curentimage-1].src =slides[curentimage-1].src; 
        slider.style.transition = "all 2s";
        slider.style.left = '-'+(curentimage-1)+'00%';
        
    }
    
}, false);