function Timelap(position,radius,amount)
{
    this.position = position;
    this.radius = radius;
    this.amount = amount;
    
    let points = [];
    let radian = Math.PI/180;
    
    let mainCircle = new CircleObject(this.position,this.radius,'rgba(200,255,255, 0.0)',2);
    let valueForCosAndSin;
    
    
    for(let i = 0; i <360; i += 360/this.amount)
    {
        let spawnPosition = new Vector();
        spawnPosition.x = this.position.x - this.radius * Math.cos(i * radian);
        spawnPosition.y = this.position.y - this.radius * Math.sin(i * radian);
        
        let point = new CircleObject(spawnPosition,10,'black',10);
        points.push(point);
    }
    console.log(points[0].radius);
    this.Update = function()
    {
        this.position.x += 1;
        //valueForCosAndSin = (360/amount)*multiplicationFactor * radian;
        for(let i = 0; i < points.length; i++)   
        {
            
        }
    }
    this.Draw = function(context)
    {
        mainCircle.Draw(context);
        
        for(let i = 0; i < points.length; i++)   
        {
            
            points[i].Draw(context);
        }
    }
}