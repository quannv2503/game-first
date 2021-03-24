function Balls() {
    this.isExist = true;
    this.radius = 10;
    this.x = Math.random()*(canvas.width-100)+50;
    this.y = canvas.height- myBar.height-this.radius-5;
    this.speed = 7;
    this.dx = this.speed;
    this.dy = -this.speed;
    this.show = function () {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius, 0,2*Math.PI);
        ctx.fillStyle = "white"
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    this.move = function () {
        this.x += this.dx;
        this.y += this.dy;
    }
    this.setDirection = function () {
        this.contactWithWall();
        this.contactWithRectangle(myBar);
        for (let i = 0; i <myBricks.length ; i++) {
            for (let j = 0; j <myBricks[i].length ; j++) {
                this.contactWithRectangle(myBricks[i][j]);
            }
        }
    }
    this.update = function () {
        this.setDirection();
        this.move();
        this.show();
    }
    this.contactWithWall = function () {
        if (this.x -this.radius <=0){
            this.x = this.radius+1;
            this.dx = - this.dx;
        }
        if (this.x + this.radius >= canvas.width){
            this.x = canvas.width - this.radius-1;
            this.dx = - this.dx;
        }
        if (this.y - this.radius <= 0){
            this.y = this.radius+1;
            this.dy = - this.dy;
        }
        if (this.y + this.radius > canvas.height){
            this.isExist = false;
            this.checkBall();
        }
    }
    this.checkBall = function () {
        for (let i = 0; i <myBall.length ; i++) {
            if (!myBall[i].isExist){
                myBall.splice(i,1);
                if (myBall.length ===0){
                    endGame();
                }
            }
        }
    }
    this.contactWithRectangle = function (item) {
        if (!item.isExist) return;
        let pointX, pointY, distant;
        // Set x of the nearest Point on the Rectangle;
        if (this.x < item.x) pointX = item.x;
        else if (this.x > item.x + item.length) pointX = item.x + item.length;
        else pointX = this.x;
        // Set y of the nearest Point on the Rectangle;
        if (this.y < item.y) pointY = item.y;
        else if (this.y > item.y + item.height) pointY = item.y + item.height;
        else pointY = this.y;

        distant = (this.x - pointX)*(this.x - pointX) + (this.y - pointY)*(this.y - pointY);
        if (distant <= this.radius*this.radius){
            // Hit the point of the Rectangle
            if ((pointX === item.x || pointX === item.x+item.length)
                && (pointY=== item.y || pointY === item.y +item.height)){
                // Check the direction before hit point
                let xLetMove = this.dx/Math.abs(this.dx)*item.length/2
                let yLetMove = this.dy/Math.abs(this.dy)*item.height/2
                if ((this.x + xLetMove >item.x && this.x + xLetMove <item.x+item.length)
                && (this.y + yLetMove >item.y && this.y + yLetMove <item.y+item.height)){
                    this.dx = - this.dx;
                    this.dy = - this.dy;
                    if (item.name === "Bar"){
                        this.dy = -Math.abs(this.dy);
                    }
                } else if (this.x - xLetMove >item.x && this.x - xLetMove <item.x+item.length){
                    this.dy = - this.dy;
                } else {
                    this.dx = -this.dx;
                }
                // Hit the length of the Rectangle
            } else if (this.x >= item.x && this.x <item.x +item.length){
                this.dy = - this.dy;
                if (item.name === "Bar"){
                    this.dy = -Math.abs(this.dy);
                }
            } else {
                this.dx = - this.dx;
            }
            soundHit.play();
            if (item.name !== "Bar"){
                myScore.value++;
                myScore.resetValue++;
                if (item.live>0) item.live--;
                if (item.live <=0) {
                    item.isExist = false;
                    let myNewNotKnow = new NotKnow(this.x,this.y);
                    myNotKnow.push(myNewNotKnow);
                }
                for (let i = 0; i <myBricks.length ; i++) {
                    for (let j = 0; j <myBricks[i].length ; j++) {
                        if (myBricks[i][j].isExist) return;
                    }
                }
                isWin = true;
                endGame();
            }
        }
    }
}