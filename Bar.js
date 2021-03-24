function Bar() {
    this.name = "Bar"
    this.length = 250;
    this.height = 20;
    this.isExist = true;
    this.x = canvas.width/2 - this.length/2;
    this.y = canvas.height-this.height;
    this.speed = 15;
    this.directMove = 1;
    this.defautColor = "yellow";
    this.color = "yellow"
    this.dx = 0;
    this.show = function () {
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.length, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    this.move = function () {
        this.x += this.dx;
        if (this.x<0) this.x = 0;
        if (this.x > canvas.width-this.length) this.x = canvas.width-this.length;
    }
    this.update = function () {
        this.move();
        this.show();
    }
}