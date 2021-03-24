function loadGame() {
    soundBegin = new Audio("sounds/begin.mp3");
    backgroundImg.src = "images/background"+backgroundID+".png";
    ctx.beginPath();
    backgroundImg.onload = function(){
        ctx.beginPath();
        ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
        ctx.closePath();
        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(startText,20,300);
    }
    ctx.closePath();
}
function showInstructor() {
    if (isStart && !isOver) return;
    backgroundImg.src = "images/background0.png";
    backgroundImg.onload = function(){
        ctx.beginPath();
         ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
        ctx.closePath();
    }

}
function startGame() {
    if (isOver) return;
    if (isStart) return;
    backgroundImg.src = "images/background"+backgroundID+".png";
    startText = "";
    isStart = true;
    soundBegin.play();
    window.addEventListener("keydown",moveMyBar);
    window.addEventListener("keyup",stopMyBar);
    creatBricks();
    timeID = setInterval(updateScreen,timeSpeed);
    soundHit = new Audio("sounds/ballhit.wav");
}
function endGame() {
    clearInterval(timeID);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (isWin)  backgroundImg.src = "images/win.png";
     else backgroundImg.src = "images/gameover.png";
    ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
    isOver = true;
}
function reset() {
    document.location.reload();
}
function updateScreen() {
    myScore.show();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
    myBar.update();
    for (let i = 0; i <myBricks.length ; i++) {
        for (let j = 0; j <myBricks[i].length ; j++) {
            myBricks[i][j].show();
        }
    }
    for (let i = 0; i <myNotKnow.length ; i++) {
        myNotKnow[i].update();
    }
    for (let i = 0; i <myBall.length ; i++) {
        myBall[i].update();
    }
    for (let i = 0; i <myTimer.length ; i++) {
        myTimer[i].update();
    }
}
function creatBricks() {
    for (let i = 0; i < 8 ; i++) {
        myBricks[i] = [];
        for (let j = 0; j <3 ; j++) {
            myBricks[i][j] = new Bricks(20+ i*130,30+j*50);
        }
    }
}
function moveMyBar(evt) {
    switch (evt.keyCode) {
        case 37:
            myBar.dx = -myBar.speed*myBar.directMove;
            break;
        case 39:
            myBar.dx = myBar.speed*myBar.directMove;
            break;
    }
}
function stopMyBar() {
    myBar.dx = 0;
}
function drawBackground() {
    if (isOver) return;
    if (backgroundID <=4){
        backgroundID++;
    } else backgroundID =1;
    backgroundImg.src = "images/background"+backgroundID+".png";
    backgroundImg.onload = function(){
        ctx.beginPath();
        ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
        ctx.closePath();
    }
}
function GetScore() {
    this.value = 0;
    this.resetValue =1;
    this.show = function () {
        document.getElementById("score-board").innerHTML = this.value;
    }
}
function Timer(time,effect) {
    this.startTime = Date.now();
    this.endTime = Date.now();
    this.time = time;
    this.effect = effect;
    this.update = function () {
        this.endTime = Date.now()
        if (this.endTime - this.startTime > this.time) {
            this.effect.reset();
            return;
        }
        this.effect.update();
    }
}
function EffectChangeColor(item){
    this.reset = function () {
        item.color = item.defautColor;
    }
    this.update = function () {
        let color = Math.floor(Math.random()*colorLive.length);
        item.color = colorLive[color];
    }
}
function YouCantSee() {
    this.startTime = Date.now();
    this.endTime = Date.now();
    this.reset = function () {

    }
    this.update = function () {
        this.endTime = Date.now();
        let timeNow = 500 - this.endTime + this.startTime;
        timeNow = Math.ceil(timeNow/100);
        timeNow = ""+timeNow;
        ctx.beginPath();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "white";
        ctx.closePath();
        ctx.beginPath();
        ctx.font = "300px Arial";
        ctx.fillStyle = "black"
        ctx.fillText(timeNow,canvas.width/2-100,canvas.height/2+50);
        ctx.closePath();
    }
}