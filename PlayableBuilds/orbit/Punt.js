function Punt(x, y, r, kleur){
    var self = this;
    this.x = x;
    this.y = y;
    this.r = r;
    this.kleur = kleur;
    var drag = false;
    var mouseX,mouseY,dx,dy,dist;
    
    addEventListener("mousemove", function(e){
        mouseX = e.clientX - canvas.offsetLeft;
        mouseY = e.clientY - canvas.offsetTop;
        dx = mouseX - self.x;
        dy = mouseY - self.y;    
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= self.r) {
           canvas.style.cursor = "pointer";
		   e.stopImmediatePropagation();
        } else {
            canvas.style.cursor = "auto";
        }
    });

    this.update = function () {
        if (drag) {
            this.x = mouseX;
            this.y = mouseY;
        };
    }

    addEventListener('mousedown', function () {
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= self.r) {
            drag = true;
        } else {
            drag = false;
        }
    });

    addEventListener('mouseup', function () {
        drag = false;
    });
    addEventListener("touchmove", function(e){
        mouseX = e.clientX - canvas.offsetLeft;
        mouseY = e.clientY - canvas.offsetTop;
        dx = mouseX - self.x;
        dy = mouseY - self.y;    
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= self.r) {
           canvas.style.cursor = "pointer";
		   e.stopImmediatePropagation();
        } else {
            canvas.style.cursor = "auto";
        }
    });

    addEventListener('touchstart', function () {
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= self.r) {
            drag = true;
        } else {
            drag = false;
        }
    });

    addEventListener('touchend', function () {
        drag = false;
    });
    var myImage = new Image();
    myImage.src = "ball.png";
    this.teken = function (context) {
        context.drawImage(myImage, this.x - this.r / 2, this.y - this.r / 2, this.r, this.r);
    }
}