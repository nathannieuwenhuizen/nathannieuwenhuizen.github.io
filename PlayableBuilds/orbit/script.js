window.addEventListener("load",function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = window.innerWidth - 0;
    canvas.height = window.innerHeight - 0;

    var menu = document.querySelector("#groupInfo");
    menu.style.display = "none";
    var showButton = document.getElementById("showButton");
    var spawnButton = document.getElementById("spawnButton");
    var clearButton = document.getElementById("clearButton");
    
    var amountField = document.getElementById("amountField");
    var startRangeField = document.getElementById("startRangeField");
    var ballSizeField = document.getElementById("sizeField");
    var circleDxField = document.getElementById("circleDxField");
    var circleDyField = document.getElementById("circleDyField");
    var ballDirectionCosField = document.getElementById("ballDirectionCosField");
    var ballDirectionSinField = document.getElementById("ballDirectionSinField");
    var angleOfCircleField = document.getElementById("angleOfCircleField");
    var spiralToggle = document.getElementById("spiralToggle");
    var delaySpawningToggle = document.getElementById("delaySpawningToggle");
    var delayRateField = document.getElementById("delayRateField");
    var canBounceToggle = document.getElementById("canBounceToggle");
    var timeScaleField = document.getElementById("timeScaleField");
    var xPosField = document.getElementById("xPosField");
    var yPosField = document.getElementById("yPosField");

    var rad =0.0174532925;
    var a = new Vector(0,0);
    var d = 0;
    var bals = [];
    var centre = new Punt(canvas.width/2,canvas.height/2,50,"blue");
    
    //var nameImage= new Image();
    //nameImage.src = "name.png";
    
    var canBounce = false;//done
    var timeScale = 0.1;//done
    var amount = 100;//done
    var angleOfCircle = 360 * 10;//done
    var startRange = 150;//done
    var ballSize = 20;//done
    var ballDirectionCos = 1;//done
    var ballDirectionSin = 1;//done
    var spiral = false;//done
    var spawnAroundCentre = true;
    var xPos, yPos;
    var circleDx = 0;//done
    var circleDy = 0;//done
    
    var delaySpawning = true;//done
    var delayRate = 20;//done
    
    document.onselectstart = new Function("return false");

    if(canvas.width < canvas.height)
    {
        startRangeField.value= canvas.width/2 -10;
    }
    else
    {
        startRangeField.value= canvas.height/2 -10;
    }
    EditData();
    SpawnBalls();
    
    spawnButton.onclick = function(){
        EditData();
        SpawnBalls();
        
    };
    clearButton.onclick = function(){ClearField();};
    showButton.onclick = function () {
        
        if(menu.style.display == "block")
        {
            console.log(menu.style.display);
            menu.style.display = "none";
        }
        else
        {
            
            menu.style.display = "block";
        }
    };
    function EditData() {
        amount = amountField.value;
        startRange = startRangeField.value;
        ballSize = ballSizeField.value;
        circleDx = circleDxField.value;
        circleDy = circleDyField.value;
        ballDirectionCos = ballDirectionCosField.value;
        ballDirectionSin = ballDirectionSinField.value;
        angleOfCircle = angleOfCircleField.value;
        spiral = spiralToggle.checked;
        delaySpawning = delaySpawningToggle.checked;
        delayRate = delayRateField.value;
        xPos = xPosField.value;
        yPos = yPosField.value;
        
    }
    function SpawnBalls()
    {   
        
        if(delaySpawning)
        {
            d = 0;
            var delayFunction = setInterval(function(){
                if (d <angleOfCircle)
                {
                    SpawnABall(d);
                    d+= angleOfCircle/amount;
                }
                else
                {
                    clearInterval(delayFunction);
                }
            },delayRate);
        }
        else
        {  
            for (var i = 0; i < angleOfCircle; i+= angleOfCircle/amount)
            {
                SpawnABall(i);
            }
        }
    }
    
    function SpawnABall(temp)
    {
        if(spiral)
        {
            var x = centre.x+ (1*xPos) + startRange*Math.cos(temp * rad)*(temp%angleOfCircle/(angleOfCircle));
            var y = centre.y + (1*yPos) + startRange*Math.sin(temp * rad)*(temp%angleOfCircle/(angleOfCircle));
        }
        else
        {   
            var x = centre.x + (1 * xPos) + startRange * Math.cos(temp * rad);
            var y = centre.y + (1 * yPos) + startRange * Math.sin(temp * rad);
        }
        console.log(circleDx);
        var bal = new Bal(x,y,ballSize,"blue",(circleDx*1) + ballDirectionCos* Math.cos((temp+90)* rad), (circleDy*1) +ballDirectionSin * Math.sin((temp+90)* rad));
        bals.push(bal);
    }
    
    function ClearField()
    {
        d = angleOfCircle;
        bals = [];
    }
    
    !function animate() {
        window.requestAnimationFrame(animate);
        
        
        context.fillStyle = "rgba(0,0,0, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height) 
        
        
        
        for (var i = 0; i < bals.length; i++)
        {
            a.dx = (centre.x - bals[i].x)*(timeScale/1000);
            a.dy = (centre.y - bals[i].y)*(timeScale/1000);
            
            bals[i].dx += a.dx;
            bals[i].dy += a.dy;
            
            bals[i].x += bals[i].dx;
            bals[i].y += bals[i].dy;
            if(canBounce)
            {
                if(bals[i].y> canvas.height || bals[i].y < 0)
                {
                    bals[i].dy *= -1;
                }
                if(bals[i].x> canvas.width || bals[i].x < 0)
                {
                    bals[i].dx *= -1;
                }
                
            }
            bals[i].teken(context);
            
            
        }
        
        //context.drawImage(nameImage,centre.x-150,centre.y-60, 300,120);
        
        centre.update();
        centre.teken(context);
        canBounce = canBounceToggle.checked;
        timeScale = timeScaleField.value;

    }();
})