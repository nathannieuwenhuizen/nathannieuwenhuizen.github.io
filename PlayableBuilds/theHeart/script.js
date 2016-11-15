/*
By: Nathan Nieuwenhuizen

This project demonstrates the calculations for a refelction in a cup buy a facor of n. 
You see n = 2 in nature like lightbeams on a cofee cup or rolling a circle with half the size around the other circle.
Inspiration came from: 
https://www.youtube.com/watch?v=qhbuKbxJsk8 (you can learn more about it what I am donig here.
And the article:
http://xahlee.info/SpecialPlaneCurves_dir/Cardioid_dir/_p/LightsRaysReflections.pdf

You can see many patterns unfolding like parts of the mandelbrot, spirals and more.

I haven't found many articles or information about this, so I can't recall a name for this one.
So, I call it the heart of mathematics.
*/

//When the window loads.
window.addEventListener("load", function (){
    
    //Declaring the canvas and context.
	let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    
    //Canvas gets size of the window screen.
    canvas.width = window.innerWidth- 30;
    canvas.height = window.innerHeight - 30;
    
    //Declaring the buttons
    let ui = document.getElementById("ui");
    let pauzeButton = document.getElementById("pauzeButton");
    let showButton = document.getElementById("showButton");
    
    //Declaring the div elements in the ui div.
    let colorBox = document.getElementById("colorBox");
    let factorField = document.getElementById("factorField");
    let speedSlider = document.getElementById("speedRange");
    let speedText = document.getElementById("speedText");
    let factorText = document.getElementById("factorText");
    
    //The main circle is declared where all the positions will be calculated.
    let mainCircle = new CircleObject(new Vector(canvas.width/2,canvas.height/2),canvas.height/2 - 20,'rgba(200,255,255, 0.0)',10);
    
    //Vectors and variables for the line drawing is declared.
    let destinationPos = new Vector();
    let originPos = new Vector();
    let radian = Math.PI/180;
    let multiplicationFactor = 2;
    let amount = 1000;
    
    //Devault variables id declared.
    let multiplicationSpeed = 0;
    let lineColor = {r:0,g:0,b:0};
    let maxAmount = 1000;
    let lineWidth, valueForCosAndSin;
    
    //----Button events----
    factorField.oninput = function(){multiplicationFactor = factorField.value/1;};   
    amountField.oninput = function(){amount = amountField.value/1; if(amount >maxAmount) amount = maxAmount;};   
    pauzeButton.onclick = function(){ speedSlider.value = 50; };
    showButton.onclick = function(){
        if(ui.style.display == 'block')
        {
            ui.style.display = 'none';
            showButton.value = "Show menu";
        }
        else
        {
            ui.style.display = 'block';
            showButton.value = "Hide menu";
        }
    };
    
    //Color loop once per 1 sec.
    setInterval(function(){
        TransitionToRandomColor();
    },1000);
    
    //Update loop one per 0.01 sec.
    setInterval(function(){
        //Clears the canvas with an alpha color.
        context.fillStyle = "rgba(200,200,250, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height) 
        
        //Updates the data needed for the calculations
        UpdateData();
        //Update the UI text.
        UpdateText();
        //Draws the circle and lines.
        Draw();
        
    },10);
    
    function UpdateData()
    {
        //Linewidth will be smaller when there are more points to draw and bigger if there are less. This helps for a more visual pleasing result.
        lineWidth = 0.1 + 10/amount;
        
        //the speed of the multiplication factor is assigned based on the UI.
        multiplicationSpeed = (speedSlider.value-50)/100 * 0.01;
        //Factor gets increased by the speed.
        multiplicationFactor += multiplicationSpeed;
        
        //Value for cos and sin is calculated. Sorry for the poor naming. I declared it here rather in the for loop for performance.
        valueForCosAndSin = (360/amount) * radian;
        
        //Checks if needs to get random colors or the standard color.
        if(colorBox.checked)
            context.strokeStyle = "rgb("+lineColor.r+","+lineColor.g+","+lineColor.b+")";
        else
            context.strokeStyle = "rgb(0,0,100)";
        
    }
    
    //The draw function draws the circle and calculates the positions where to draw the lines form and to.
    function Draw()
    {
        //For each point.
        for(let i = 0; i < amount; i++)
        {
            //Begin drawing the line.
            context.beginPath();
            //Line width gets the appropiate value.
            context.lineWidth = lineWidth;
            //calls the drawline fanction with the i value as parameter.
            DrawLine(i);
        }
        //Draws the maincricle.
        mainCircle.Draw(context);
    }
    
    /*
    The drawline function does the following.
    -It moves the the line to the position of the point 'i'.
    -Draws to the point 'i times the factor' (example: factor = 2 and the point i = 3 then the line draws from 3 to 6
    -If there ar less than 6 points, like 5 ,than it loops around to 0,1,2,3,4,5, 0,1,2,3...
    */
    function DrawLine(i)
    {
        //The position of the first point 'i' is calculated and declared.
        originPos.ChangeTo(mainCircle.position.x - mainCircle.radius * Math.cos(i*valueForCosAndSin),
                           mainCircle.position.y - mainCircle.radius * Math.sin(i*valueForCosAndSin));
        //The position of point 'i * factor' is calculated and declared.
        destinationPos.ChangeTo(mainCircle.position.x - mainCircle.radius * Math.cos(i*valueForCosAndSin * (multiplicationFactor%amount)),
                                mainCircle.position.y - mainCircle.radius * Math.sin(i*valueForCosAndSin * (multiplicationFactor%amount)));
        
        //Line moves to originPos.
        context.moveTo(originPos.x,originPos.y);
        //and draws to the destination pos.
        context.lineTo(destinationPos.x,destinationPos.y);
        //And then it strikes!
        context.stroke();
    }
    
    //This function is called once per sec.
    function TransitionToRandomColor()
    {
        fadeColor(lineColor, {r: Math.random()*200, g: Math.random()*100,b: Math.random()*200}, 1000);
    }
    
    //Returns the lerp value of a number.
    lerp = function(a, b, u) {
        return (1 - u) * a + u * b;
    };
    
    //The fadeColor function transition from start color to end color in duration time.
    fadeColor = function(start, end, duration) {
        let interval = 10;
        let steps = duration / interval;
        let step_u = 1.0 / steps;
        let u = 0.0;
        let theInterval = setInterval(function() {
            if (u >= 1.0) {
                clearInterval(theInterval);
            }
            let rValue = Math.round(lerp(start.r, end.r, u));
            let gValue = Math.round(lerp(start.g, end.g, u));
            let bValue = Math.round(lerp(start.b, end.b, u));
            let colorname = {r:rValue, g:gValue,b:bValue};
            lineColor = colorname;
            u += step_u;
        }, interval);
    };
    
    //Update text edits the innerHTML of the divs.
    function UpdateText()
    {
        speedText.innerHTML = "Factor increment: "+(speedSlider.value-50)/50;
        factorText.innerHTML = "Factor: "+multiplicationFactor.toFixed(2);
        amountText.innerHTML = "Amount: "+amount.toFixed(0);
    }
    
}, false);