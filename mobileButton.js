window.addEventListener("load", function (){
	var menu = document.getElementById("nav").getElementsByTagName("ul")[0];
    menu.style.transition = 'height .5s';
    var mobileButton = menu.getElementsByClassName("mobile-button")[0];
    console.log(mobileButton);
    var menuEnable = false;
    mobileButton.onclick = function()
    {
        if(!menuEnable) 
        {
            menu.style.height = '60vh';
            menuEnable = true;
        }
        else
        {
            menu.style.height = '10vh';
            menuEnable = false;
        }
    };
}, false);