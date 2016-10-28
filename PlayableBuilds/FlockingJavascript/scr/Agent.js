/*
Made by: Nathan Nieuwenhuizen

This class hadles the agent draws and updates.
It also contains the agent its velocity and position.*/
function Agent(position,velocity,radius)
{
    //Declares the variables.
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    
    //The draw function.
    this.Draw = function(context){
        //the outer cirlce (white)
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();
        
        //the inner circle (black) / eye (o)
        /*context.beginPath();
        context.arc(position.x, position.y, radius/4, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        */
    }
    
    //The update function.
    this.Update = function(canvas)
    {
        
        //If the agent goes off canvas, it goes to the other side of the canvas.
        if(position.x <0)
            position.x =canvas.width;
        if(position.x >canvas.width)
            position.x = 0;
        if(position.y <0)
            position.y =canvas.height;
        if(position.y >canvas.height)
            position.y = 0;
        
        //Updates the position with the velocity.
        position.x += velocity.x;
        position.y += velocity.y;
    }
}