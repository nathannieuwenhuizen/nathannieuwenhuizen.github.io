function Bal(x,y,r,kleur,dx,dy){
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.kleur = kleur;
    
    
    var myImage = new Image();
    myImage.src = "img/ball.png";
    this.teken = function(context){
        context.drawImage(myImage,this.x- this.r/2,this.y - this.r/2,this.r,this.r);
    }
}