window.addEventListener("load",function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var q = 0;
    var rad =0.0174532925;
    var a = new Vector(0,0);
    var d = 0;
    var bals = [];
    var centre = new Punt(canvas.width/2,canvas.height/2,0,"blue");
    
    
    function SpawnABall()
    {
        
        var bal = new Bal(Math.random() * canvas.width, -10,10,"blue", 0,0.2+Math.random()*0.3);
        bals.push(bal);
        console.log(bal.x);
        setTimeout(SpawnABall, (1000+ Math.random() *100));
    }
    SpawnABall();
    
    !function animate() {
        
        window.requestAnimationFrame(animate);
        
        context.clearRect(0,0,canvas.width,canvas.height);
        
        for (var i = 0; i < bals.length; i++)
        {
            if(bals[i].y > canvas.height/8 && bals[i].r >0)
            {
                bals[i].r -= 0.1;
            }
            /*if(bals[i].y > canvas.height/1.5)
            {
                bals[i].r -= 0.1;
            }*/
            
            if(bals[i].y>canvas.height+10)
            {
                bals.splice(i,1);
            }
            console.log(bals[i].y);
            bals[i].y += bals[i].dy;
            bals[i].teken(context);
        }
        
        
        centre.update();
        centre.teken(context);
        
    }();
})