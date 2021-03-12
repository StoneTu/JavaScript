const FRAME_TIME = 20;
const ANIMATE_FRAME = 400;
var animateCycle = 0;
var myGamePiece, goalPos, exitPiece, victoryP, bodyEle, currentLevel=1;
var obstacleArr= [], floorArr=[], obstacleScrArr= [];
$(function(){
    startBtn.onclick=function() { 
        resetGameEle();
        setGameEnv();
        setLevel(currentLevel);
        console.log(`This is level: ${currentLevel}.`);
        obstacleArr=getAllObstaclePos('obstacle');
        obstacleScrArr=getAllObstaclePos('obstacleScr');
        floorArr=getAllObstaclePos('floor');
        startGame(); 
        // console.log(obstacleArr);
    }
});
function setJumpBtn(jumpPosAr) {
    for (jumpPos of jumpPosAr) {
        var jumpBtnContainer = document.createElement('button');
        jumpBtnContainer.classList.add("jumpBtn");
        jumpBtnContainer.classList.add("obstacleScr");
        jumpBtnContainer.style.display="block";
        jumpBtnContainer.innerText = 'JUMP';
        setElementPosSize(jumpBtnContainer,jumpPos);
        jumpBtnContainer.onclick = function (event) {
            jumpClick(event);
        };
        bodyEle.appendChild(jumpBtnContainer);
    }
    function jumpClick(event) {
        var ele=event.target;
        var tmpObj={top:ele.offsetTop,left:ele.offsetLeft,height:ele.offsetHeight,width:ele.offsetWidth};
        var eleC=myGameArea.canvas;
        var posSizeTmp = {top:eleC.offsetTop,left:eleC.offsetLeft,height:eleC.offsetHeight,width:eleC.offsetWidth};
        var judgeAr = checkContact(posSizeTmp,tmpObj);
        // console.log(posSizeTmp,tmpObj);
        if (judgeAr[0]) {
            myGameArea.jump();
        }
    }
}
function setAccordion(accPosAr) {
    var accContainer = document.getElementsByClassName('accContainer')[0];
    accContainer.style.display="block";
    // var obstacleTmp= {top:50, left:300, width:200};
    setElementPosSize(accContainer,accPosAr[0]);
    // var recTmp = accContainer.getBoundingClientRect();
    var accAr = document.getElementsByClassName('accordion');
    var panAr = document.getElementsByClassName('panel');
    for (index=1;index<accAr.length;index++) {
        accAr[index].style.opacity=0.3;
        accAr[index].style.cursor= 'default';
        accAr[index].onclick = null;
        if (accAr[index].nextElementSibling!=null) {
            accAr[index].nextElementSibling.style.display = 'none';
        }
    }
    accAr[0].style.opacity=1;
    accAr[0].style.cursor= 'pointer';
    accAr[0].nextElementSibling.style.display = 'block';
    accAr[0].onclick = (function (event) {
        accordionClick(event);
    });
    var panelPiece=document.getElementsByClassName('panel');
    var index=0;
    for (pan of panelPiece) {
        // console.log(pan);
        pan.style.backgroundColor=`rgba(69, 99, 74,${(panelPiece.length-index)/panelPiece.length}`;
        index++;
    }
    // for (ele of accAr) {
    //     ele.onclick = (function (event) {
    //         accordionClick(event);
    //     });
    // }
    function accordionClick(event) {
        const ACTION_DELAY=500;
        // this.style.borderRadius = "5px 5px 0px 0px";
        for (pan of panAr) {$(pan).slideUp(ACTION_DELAY);;}
        for (acc of accAr) {acc.classList = 'accordion';}
        // console.log(event.target);
        event.target.classList.toggle("active");
        var panel = event.target.nextElementSibling;
        if (panel==null) {
            setTimeout(function() {
                obstacleArr=getAllObstaclePos('obstacle');
                // console.log(obstacleArr);
            },ACTION_DELAY);
            return;}
        // panel.style.display = 'block';
        $(panel).slideDown(ACTION_DELAY);
        setTimeout(function() { 
            var nextAcc = panel.nextElementSibling;
            nextAcc.style.opacity=1;
            nextAcc.style.cursor= 'pointer';
            obstacleArr=getAllObstaclePos('obstacle');
            // console.log(obstacleArr);
            nextAcc.onclick = (function (event) {
                accordionClick(event);
            });
        },ACTION_DELAY*2);
    }
    // console.log(accContainer.offsetTop,accContainer.offsetLeft,accContainer.offsetHeight,accContainer.offsetWidth);
}
function hideAccordion() {
    var accContainer = document.getElementsByClassName('accContainer')[0];
    accContainer.style.display="none";
}
function setFloor(floorPosAr) {
    for (floorPos of floorPosAr) {
        tmpEle=document.createElement('div');
        tmpEle.appendChild(document.createElement('hr'));
        tmpEle.style.position = 'fixed';
        setElementPosSize(tmpEle,floorPos);
        // tmpEle.style.top = floorPos.top;
        // tmpEle.style.left = floorPos.left;
        // tmpEle.style.width = floorPos.width;
        tmpEle.classList.add("floor");
        // floorArr.push(tmpEle);
        bodyEle.appendChild(tmpEle);
        // console.log(floorPos);
    }
    // var floorPiece=document.getElementsByClassName('floor');
    // for (piece of floorPiece) {
    //     // console.log(piece);
    //     // piece.style.position = 'absolute';
    //     piece.style.position = 'absolute';
    //     piece.style.width = '95%';
    //     piece.style.top = '285px';
    // }
}
function removeEleClassName(name) {
    var eleAr=document.getElementsByClassName(name);
    for (ele of eleAr) {
        ele.remove();
    }
}
function setExit(exitPos) {
    exitPiece = document.getElementsByClassName("exitContainer")[0];
    exitPiece.style.display= 'block';
    exitPiece.style.position = 'fixed';
    exitPiece.style.zIndex = '1';
    setElementPosSize(exitPiece,exitPos);
    goalPos={top:exitPiece.offsetTop,left:exitPiece.offsetLeft,height:exitPiece.offsetHeight,width:exitPiece.offsetWidth};
}
function setScrollObstacle(scrObsPosAr) {
    var scrObsContainer = document.createElement('div');
    scrObsContainer.classList.add('scrObsConDiv');
    scrObsContainer.style.position = 'absolute';
    scrObsContainer.style.height = "1000px";
    for (scrObs of scrObsPosAr) {
        scrObsContainer.appendChild(addScrObs(scrObs));
    }
    // bodyEle.appendChild(scrObsContainer);
    window.addEventListener("scroll", function(){
        // console.log(getAllObstaclePos('scrollDiv'));
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        obstacleScrArr=getAllObstaclePos('obstacleScr',scrollTop,scrollLeft);
        // console.log(scrollTop,scrollLeft);
    });
    $(bodyEle).prepend(scrObsContainer);
    function addScrObs(pos) {
        var tmpDiv = document.createElement('div');
        tmpDiv.style.position = 'absolute';
        setElementPosSize(tmpDiv,pos);
        tmpDiv.style.backgroundColor = 'gray';
        tmpDiv.style.opacity = '0.7';
        tmpDiv.classList.add('obstacleScr');
        tmpDiv.classList.add('scrollDiv');
        return tmpDiv;
    }
}
function setGameEnv() {
    bodyEle=document.getElementsByTagName('body')[0];
    startBtn.style.position='fixed';
    myGamePiece = new componentP(20, 10, "green", 55, 13);
    myGameArea.setEnv();
    // new componentP(49, 18, "red", 4, 4).update();
    myGamePiece.drawMan(0);
    // myGamePiece.drawManDown(3);
    var ceilPiece=document.getElementsByClassName('ceil');
    for (piece of ceilPiece) {
        piece.style.position = 'fixed';
        piece.style.width = '95%';
        piece.style.top = '40px';
        piece.ondblclick = function() {
            myGameArea.speedX = 5;
        };
    }
    victoryP = document.createElement("p");
    victoryP.style.color = 'green';
    victoryP.style.position= 'absolute';
    victoryP.style.display= 'none';
    bodyEle.appendChild(victoryP);
}
function startGame() {
    window.scrollTo(0, 0);
    startBtn.disabled = true;
    startBtn.style.backgroundColor='gray';
    myGameArea.start();
}
var myGameArea = {
    canvas: document.createElement('canvas'),
    setEnv: function () {
        this.canvas.width = 45;
        this.canvas.height = 50;
        // this.canvas.style.border = '1px solid gray';
        this.canvas.style.left = '50px';
        this.canvas.style.top = '232px';
        this.canvas.style.position = 'fixed';
        this.context = this.canvas.getContext("2d");
        document.body.append(this.canvas, document.body.childNodes[0]);
        // var buttonRec = {x:4,y:4,width:49,height:18}
        // this.canvas.addEventListener('click',function(event) {
        //     var mousePos = getMousePos(this,event);
        //     if (isInside(mousePos,buttonRec)) {
        //         console.log("inside");
        //         myGameArea.start();
        //     } else {console.log("outside");}
        // });
    },
    start: function () {
        this.interval = setInterval(updateGameArea, FRAME_TIME);
        this.intervalAnimate = setInterval(updateAnimate, ANIMATE_FRAME);
        // console.log(this.interval);
    },
    stop: function () {
        clearInterval(this.interval);
        clearInterval(this.intervalAnimate);
    },
    clear: function () {
        // console.log(this.canvas.width, this.canvas.height);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    speedX: 0.0,
    speedY: 0,
    gravitySpeed: 0,
    gravity: 0.5,
    bounce: 0.3,
    accX: 0.1,
    maxSpeedX: 1.5,
    newPos: function () {
        this.gravitySpeed += this.gravity;
        this.speedX = (this.speedX+this.accX <= this.maxSpeedX)? this.speedX+this.accX: this.speedX-this.accX; 
        var preX=parseInt(this.canvas.style.left);
        var preY=parseInt(this.canvas.style.top);
        var dx=this.speedX;
        var dy=parseInt(this.speedY + this.gravitySpeed);
        if (!this.hitBottom(dx,dy)) {
            this.canvas.style.top = preY+dy+'px';
            this.accX =0.1;
        } else {
            this.canvas.style.top = preY+'px';
        }
        this.canvas.style.left = preX+dx+'px';
        // console.log(this.canvas.style.left);
        // console.log(parseInt(this.speedY + this.gravitySpeed));
        // $(this.canvas).animate({ left: x+'px' },FRAME_TIME);
    },
    jump: function () {
        this.gravitySpeed = -10;
        this.gravity = 0.5;
    },
    hitBottom: function (dX,dY) {
        var ele=this.canvas;
        var prePosSizeTmp = {top:ele.offsetTop,left:ele.offsetLeft,height:ele.offsetHeight,width:ele.offsetWidth};
        var posSizeTmp = {top:ele.offsetTop+dY,left:ele.offsetLeft+dX,height:ele.offsetHeight,width:ele.offsetWidth};
        var judgeGoalAr = checkContact(posSizeTmp,goalPos);
        if (judgeGoalAr[0]&&judgeGoalAr[1]) {
            gameWin();
        }
        for (floorEle of floorArr) {
            var judgePreAr = checkContact(prePosSizeTmp,floorEle);
            var judgeAr = checkContact(posSizeTmp,floorEle);
            // console.log(posSizeTmp.top);
            var botPos = floorEle.top - posSizeTmp.height;
            if (judgeAr[0]&&judgeAr[1]) {
                if (judgePreAr[0]==false&&judgePreAr[1]) { this.accX = -3; }
                // this.canvas.style.top = preY+'px';
                // this.canvas.style.left = preX+'px';
                this.gravitySpeed = -(this.gravitySpeed * this.bounce);
                // console.log(this.gravitySpeed);
                // posSizeTmp = {top:ele.offsetTop,left:ele.offsetLeft,height:ele.offsetHeight,width:ele.offsetWidth};
                return true;
            }
        }
        var tmpObsArr = obstacleArr.concat(obstacleScrArr);
        for (obstacleEle of tmpObsArr) {
            var judgeAr = checkContact(posSizeTmp,obstacleEle);
            if (judgeAr[0]&&judgeAr[1]) {
                gameOver();
                return true;
            }
        }
        // fall down check
        if (posSizeTmp.top > 2000) {
            gameOver();
        }
        return false;
        // console.log(checkContact(posSizeTmp,obstacleArr[0]));
        // console.log(posSizeTmp);
        // var rockbottom = this.canvas.height;// - this.height;
        // if (this.y > rockbottom) {
            // this.y = rockbottom;
            // this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        // }
    }
}
function componentP(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    // this.speedX = 0;
    // this.speedY = 0;
    // this.gravity = 0;
    // this.gravitySpeed = 0;
    // this.bounce = 0.6;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.drawMan = function (anim) {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.save();
        ctx.beginPath();
        ctx.scale(.5, .5);
        ctx.translate(this.x, this.y);
        ctx.arc(0, 0, this.height, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        this.drawLine('green', this.width, -5, 23, -13, 42);
        switch (anim) {
            case 0:
                this.drawLine('green', this.height, 4, 17, -27, 17, -35, 30);
                this.drawLine('green', this.height, 4, 17, 17, 30, 30, 30);
                this.drawLine('green', this.height + 2, -18, 45, -22, 65, -45, 65);
                this.drawLine('green', this.height + 2, -10, 40, 10, 80);
                break;
            case 1:
                this.drawLine('green', this.height, 4 - 10, 17, -27 + 8, 17 + 15, -35 + 35, 30 + 10);
                this.drawLine('green', this.height, 4 - 5, 17, 17 - 15, 30 + 5, 30 - 15, 30 + 5);
                this.drawLine('green', this.height + 2, -18, 45, -22 + 15, 65 - 5, -45 + 25, 65 + 5);
                this.drawLine('green', this.height + 2, -10, 40, 0, 65, 10 - 20, 80);
                break;
            case 2:
                this.drawLine('green', this.height, 4, 17, -27, 17, -35, 30);
                this.drawLine('green', this.height, 4, 17, 17, 30, 30, 30);
                this.drawLine('green', this.height + 2, -18, 45, -45 + 55, 65 + 15);
                this.drawLine('green', this.height + 2, -10, 40, -22, 65, 10 - 55, 65);
                break;
            case 3: //same as case 1
                this.drawLine('green', this.height, 4 - 10, 17, -27 + 8, 17 + 15, -35 + 35, 30 + 10);
                this.drawLine('green', this.height, 4 - 5, 17, 17 - 15, 30 + 5, 30 - 15, 30 + 5);
                this.drawLine('green', this.height + 2, -18, 45, -22 + 15, 65 - 5, -45 + 25, 65 + 5);
                this.drawLine('green', this.height + 2, -10, 40, 0, 65, 10 - 20, 80);
                break;
            default:
                break;
        }

        ctx.restore();
    }
    this.drawManDown = function (anim) {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.save();
        ctx.beginPath();
        ctx.scale(.5, .5);
        ctx.translate(this.x, this.y);
        switch (anim) {
            case 0:
                ctx.arc(-20, 5, this.height, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                this.drawLine('green', this.width, -17, 25, -13, 42);
                this.drawLine('green', this.height, -10, 22, -27, 22, -35, 30);
                this.drawLine('green', this.height, -10, 22, 3, 30, 15, 30);
                this.drawLine('green', this.height + 2, -18, 45, -15, 65, -35, 75);
                this.drawLine('green', this.height + 2, -10, 40, 10, 80);
                break;
            case 1:
                ctx.arc(-40, 30, this.height, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                this.drawLine('green', this.width, -25, 45, -13, 55);
                this.drawLine('green', this.height, -25, 40, -17, 22);
                this.drawLine('green', this.height, -25, 40, -10, 35, 5, 30);
                this.drawLine('green', this.height + 2, -10, 60, 0, 70, -15, 80);
                this.drawLine('green', this.height + 2, -5, 60, 20, 80);
                break;
            case 2:
                ctx.arc(-45, 80, this.height, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                this.drawLine('green', this.width, -25, 80, -13, 80);
                this.drawLine('green', this.height, -30, 80, -25, 62);
                this.drawLine('green', this.height, -30, 80, -20, 70, -15, 50);
                this.drawLine('green', this.height + 2, -10, 85, 20, 85);
                this.drawLine('green', this.height + 2, -5, 80, 20, 80);
                break;
            case 3: //same as case 1
                ctx.arc(-45, 80, this.height, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                this.drawLine('green', this.width, -25, 80, -13, 80);
                this.drawLine('green', this.height, -30, 80, -25, 80);
                this.drawLine('green', this.height, -30, 80, -15, 80);
                this.drawLine('green', this.height + 2, -10, 85, 20, 85);
                this.drawLine('green', this.height + 2, -5, 80, 20, 80);
                break;
            default:
                break;
        }
        ctx.restore();
    }
    this.drawLine = function (color, w, ax, ay, bx, by, ex, ey) {
        // ctx.translate(this.x, this.y);
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = w;
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        if (ex != undefined && ey != undefined) {
            ctx.lineTo(ex, ey);
        }
        ctx.stroke();
        ctx.closePath();
    }
    // this.newPos = function () {
    //     this.gravitySpeed += this.gravity;
    //     this.x += this.speedX;
    //     this.y += this.speedY + this.gravitySpeed;;
    //     this.hitBottom();
    // }
    // this.hitBottom = function () {
    //     var rockbottom = myGameArea.canvas.height - this.height;
    //     if (this.y > rockbottom) {
    //         this.y = rockbottom;
    //         this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    //     }
    // }
}
function updateGameArea() {
    // console.log(animateCycle);
    myGameArea.newPos();
    // myGamePiece.newPos();
    // myGamePiece.update();
}
function updateAnimate() {
    myGameArea.clear();
    animateCycle = (animateCycle >= 3) ? 0 : animateCycle + 1;
    myGamePiece.drawMan(animateCycle);
}
// function getMousePos(canvas, event) {
//     return { x:event.clientX - parseInt(canvas.style.left),
//              y:event.clientY - parseInt(canvas.style.top) };
// }
// function isInside(pos,rect) {
//     return pos.x>rect.x && pos.x<rect.x+rect.width && pos.y>rect.y && pos.y<rect.y+rect.height;
// }
function setElementPosSize(element,posSize) {
    element.style.top = posSize.top+'px';
    element.style.left = posSize.left+'px';
    if (posSize.width!=undefined) {element.style.width = posSize.width+'px';}
    if (posSize.height!=undefined) {element.style.height = posSize.height+'px';}
    
}
function getAllObstaclePos(classString, scrollY,scrollX) {
    if (scrollY==undefined) {scrollY=0;}
    if (scrollX==undefined) {scrollX=0;}
    if (classString==undefined) { classString='obstacle'; }
    var tmpArr=[];
    var obstacleEleAr = document.getElementsByClassName(classString);
    for (ele of obstacleEleAr) {
        var tmpObj={top:ele.offsetTop-scrollY,left:ele.offsetLeft-scrollX,height:ele.offsetHeight,width:ele.offsetWidth};
        tmpArr.push(tmpObj);
    }
    return tmpArr;
}
function checkContact(A,B) {
    judgeY= (A.top<B.top+B.height) && (A.top+A.height>B.top);
    judgeX= (A.left<B.left+B.width) && (A.left+A.width>B.left);
    // console.log(judgeX,judgeY);
    return [judgeX , judgeY];
}
function gameOver() {
    console.log("Game Over!");
    myGameArea.stop();
    animateCycle=0;
    var dt =50;
    $(myGameArea.canvas).animate({left:"+=5px"},dt)
        .animate({left:"-=10px"},dt)
        .animate({left:"+=5px"},dt);
    var gameOverInterval = setInterval(function() {
        // console.log(gameOverInterval);
        myGameArea.clear();
        myGamePiece.drawManDown(animateCycle);
        animateCycle++;
        if (animateCycle>3) { clearInterval(gameOverInterval); }
    },ANIMATE_FRAME);
    startBtn.disabled = false;
    startBtn.innerText = 'RESTART'
    startBtn.style.backgroundColor='rgb(30, 189, 43)';
}
function gameWin() {
    console.log("win!")
    myGameArea.stop();
    setTimeout(function() {
        myGameArea.clear();
        myGamePiece.drawMan(0);
        $(myGameArea.canvas).animate({ 
            left: goalPos.left+30+'px',
            top: goalPos.top+10+'px'
         },FRAME_TIME*20)
         .animate({ top: goalPos.top+-70+'px' },FRAME_TIME*20,"swing")
         .animate({ top: goalPos.top+-70+'px' },FRAME_TIME*60)
         .animate({ top: goalPos.top+10+'px' },FRAME_TIME*20,"swing")
    },FRAME_TIME*20);
    // create text after FRAME*60
    victoryP.innerText = 'YA!YA!';
    victoryP.style.top = goalPos.top-105+'px';
    victoryP.style.left = goalPos.left+30+'px';
    setTimeout(() => { victoryP.style.display= 'block'; }, FRAME_TIME*60);
    setTimeout(() => { victoryP.style.display= 'none'; }, FRAME_TIME*100);
    var dt =100;
    setTimeout(() => {
        $(exitPiece).animate({  borderSpacing: -360 },{step: function(now,fx) {
            $(this).css('transform','rotateY('+now+'deg)');  
          },
          duration:FRAME_TIME*60
      },dt)
    }, FRAME_TIME*60);
    exitPiece.style.zIndex = '1';
    setTimeout(() => {
        $(exitPiece).animate({left:"-=5px"},dt)
        .animate({left:"+=10px"},dt)
        .animate({left:"-=5px"},dt);
        startBtn.innerText = 'NEXT LEVEL'
        startBtn.disabled = false;
        startBtn.style.backgroundColor='rgb(30, 189, 43)';
        currentLevel++;
    }, FRAME_TIME*60);
    exitPiece.style.zIndex = '1';
}
function resetGameEle() {
    hideAccordion();
    removeEleClassName('floor');
    removeEleClassName('jumpBtn');
    removeEleClassName('scrObsConDiv');
}
function setLevel(levelNum) {
    switch (levelNum) {
        case 1:
            setExit({top: 210, left: 700});
            var tmpAPos=[
                {top:50, left:400, width:150}
            ];
            setAccordion(tmpAPos);
            var tmpFPos=[
                {top:285, left:0, width:700}
            ];
            setFloor(tmpFPos);
            break;
        case 2:
            setExit({top: 110, left: 700});
            var tmpJPos=[
                // {top:285, left:550, width:70},
                {top:285, left:250, width:70}
            ];
            setJumpBtn(tmpJPos);
            var tmpFPos=[
                {top:285, left:0, width:700},
                {top:200, left:650, width:400},
                {top:200, left:350, width:400}
            ];
            setFloor(tmpFPos);
            break;
        case 3:
            setExit({top: 210, left: 700});
            var tmpFPos=[
                {top:285, left:0, width:700},
                {top:200, left:650, width:400},
                {top:200, left:350, width:400}
            ];
            setFloor(tmpFPos);
            var tmpSPos=[
                {top:185, left:200, width:100, height: 100},
                {top:285, left:400, width:100, height: 100},
                {top:185, left:600, width:100, height: 100},
                {top:285, left:800, width:100, height: 100},
                {top:385, left:0, width:1000, height: 500}
            ];
            setScrollObstacle(tmpSPos);
            break;
        default:
            setExit({top: 210, left: 700});
            var tmpFPos=[
                {top:285, left:0, width:700},
                {top:200, left:650, width:400},
                {top:200, left:350, width:400}
            ];
            setFloor(tmpFPos);
            break;
    }
}