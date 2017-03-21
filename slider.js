window.addEventListener("load", function (){
	var slider = document.getElementById("slider");
    var slides = slider.getElementsByTagName('a');
    var buttons = document.getElementById("sliderButtons").getElementsByTagName('img');
    var amountOfimages = 3;
    var curentimage = 1;
    var loop;
    var pauzeDuration = 6;
    ResumeLoop();
    gotToSlide(curentimage-1);
    
    for(var i = 0; i < buttons.length; i++)
    {
        (function(i){
            buttons[i].onclick = function()
            {
                gotToSlide(i); 
                curentimage = i+1;
                clearInterval(loop); 
                ResumeLoop();
            };
        })(i);
    }
    
    function ResumeLoop()
    {
        loop = setInterval(function(){
            curentimage++;

            if(curentimage >amountOfimages)
                curentimage = 1;            

            gotToSlide(curentimage-1);
        }, pauzeDuration*1000);
    }
    
    function gotToSlide(index)
    {
        slides[index].src =slides[index].src; 
        slider.style.transition = "all 2s";
        slider.style.left = '-'+(index)+'00%';
        UpdateButtons(index);
    }
    function UpdateButtons(index)
    {
        for(var i = 0; i < buttons.length; i++)
        {
            if(i == index)
                buttons[i].src = "img/buttonPressed.jpg";
            else
                buttons[i].src = "img/button.jpg";
        }
    }
    
}, false);