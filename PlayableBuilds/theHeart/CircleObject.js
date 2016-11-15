/*
The circle object class is a simple object class that draws a circle.
*/
function CircleObject(position,radius,color,border)
{
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.Draw = function(context)
    {
        context.beginPath();
        context.lineWidth = border;
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        
        context.fillStyle = this.color;
        context.stroke();
        context.fill();
    }
    
}