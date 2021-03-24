
function Bricks(x,y) {
    this.name = "Brick"
    this.length = 100;
    this.height = 30;
    this.isExist = true;
    this.live = Math.floor(Math.random()*4)+1;
    this.defautColor = "";
    this.color = "";
    this.x = x;
    this.y = y;
    this.show  = function () {
        if (!this.isExist) return;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.length, this.height);
        if (this.color === ""){
            ctx.fillStyle = colorLive[this.live];
        } else {
            ctx.fillStyle = this.color;
        }
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    this.update = function () {
        this.show();
    }
}