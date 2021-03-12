const FRAME_TIME = 100;

$(document).ready(function(){
    setTableEnv();
    setMenu();
});
function setMenu() {
    var menuDiv = document.createElement('div');
    setElementPosSize(menuDiv,{top:50,left:50,width:500,height:300});
    menuDiv.style.position = 'fixed';
    menuDiv.style.backgroundColor = 'rgba(144, 144, 144, 0.8)';
    menuDiv.style.borderRadius = '5px';
    menuDiv.style.border = '7px solid rgb(200, 200, 200    )';
    menuDiv.style.zIndex = '2';
    // menuDiv.style.opacity = '0.8';
    document.body.appendChild(menuDiv);
    var nameText = document.createElement('p');
    setElementPosSize(nameText,{top:0,left:40,width:200});
    nameText.style.position = 'absolute';
    nameText.style.backgroundColor = 'rgba(144, 144, 144, 0)';
    nameText.style.fontSize = '1rem';
    nameText.innerText = 'Input your name:您的大名';
    menuDiv.appendChild(nameText);
    var inputName = document.createElement('input');
    inputName.style.position = 'absolute';
    setElementPosSize(inputName,{top:40,left:40,width:200});
    inputName.style.fontSize = '1rem';
    inputName.value = 'My Name';
    menuDiv.appendChild(inputName);
    var opponentText = document.createElement('p');
    setElementPosSize(opponentText,{top:70,left:40,width:300});
    opponentText.style.position = 'absolute';
    opponentText.style.backgroundColor = 'rgba(144, 144, 144, 0)';
    opponentText.style.fontSize = '1rem';
    opponentText.innerText = 'Choose your opponent:選擇對手';
    menuDiv.appendChild(opponentText);
    var rookieText = document.createElement('p');
    setElementPosSize(rookieText,{top:190,left:40});
    rookieText.style.position = 'absolute';
    rookieText.style.backgroundColor = 'rgba(144, 144, 144, 0)';
    rookieText.innerText = 'Rookie新手';
    menuDiv.appendChild(rookieText);
    var rookieIcon = document.createElement('img');
    setElementPosSize(rookieIcon,{top:110,left:30});
    rookieIcon.style.backgroundColor = 'rgb(212, 214, 183)';
    rookieIcon.style.position = 'absolute';
    rookieIcon.src = "./img/rookie_hat.png";
    rookieIcon.id = 'rookie';
    rookieIcon.addEventListener("click", clickOpponent);
    rookieIcon.style.boxShadow="0px 0px 15px yellow";
    menuDiv.appendChild(rookieIcon);
    var seniorText = document.createElement('p');
    setElementPosSize(seniorText,{top:190,left:180});
    seniorText.style.position = 'absolute';
    seniorText.style.backgroundColor = 'rgba(144, 144, 144, 0)';
    seniorText.innerText = 'Senior資深';
    menuDiv.appendChild(seniorText);
    var seniorIcon = document.createElement('img');
    setElementPosSize(seniorIcon,{top:110,left:170});
    seniorIcon.style.backgroundColor = 'rgb(212, 214, 183)';
    seniorIcon.style.position = 'absolute';
    seniorIcon.src = "./img/senior_hat.png";
    seniorIcon.id = 'senior';
    seniorIcon.addEventListener("click", clickOpponent);
    menuDiv.appendChild(seniorIcon);
    var expertText = document.createElement('p');
    setElementPosSize(expertText,{top:190,left:320});
    expertText.style.position = 'absolute';
    expertText.style.backgroundColor = 'rgba(144, 144, 144, 0)';
    expertText.innerText = 'Expert專家';
    menuDiv.appendChild(expertText);
    var expertIcon = document.createElement('img');
    setElementPosSize(expertIcon,{top:110,left:310,width:130,height:90});
    expertIcon.style.backgroundColor = 'rgb(212, 214, 183)';
    expertIcon.style.position = 'absolute';
    expertIcon.src = "./img/expert_hat.png";
    expertIcon.id = 'expert';
    expertIcon.addEventListener("click", clickOpponent);
    menuDiv.appendChild(expertIcon);
    var startBtn = document.createElement('button');
    setElementPosSize(startBtn,{top:250,left:210,width:190,height:40})
    startBtn.innerText = 'START 開始比賽';
    startBtn.style.fontSize = '1rem';
    startBtn.id = 'startBtn';
    startBtn.style.position = 'absolute';
    menuDiv.appendChild(startBtn);
    var redName = 'Rookie';
    menuBtn.disabled = true;
    menuDiv.style.display = 'visible';
    menuBtn.onclick = function() {
        // menuBtn.disabled = true;
        // menuDiv.style.display = 'block';
        $(menuDiv).toggle("slow");
        startBtn.innerText = 'RESTART 重新比賽';
        startBtn.onclick = prepareStart;
        if (pingpong.isRunning)
            pingpong.stop();
        else 
            pingpong.start();
    }
    startBtn.onclick = function() { 
        gamePlayer.setPlayer();
        gamePlayer.setPlayerControl();
        pingpong.setBall();
        // startBtn.disabled = true;
        opponent.setPlayer();
        prepareStart();
    }
    function prepareStart() {
        blueText.innerText = inputName.value;
        redText.innerText = redName;
        opponent.setOpponentLevel(redName);
        menuDiv.style.display = 'none';
        menuBtn.disabled = false;
        redScore.innerText = '00';
        blueScore.innerText = '00';
        countDown.setBoard();
        countDown.startCountDown(3);
        opponent.resetOppoPos();
        setTimeout(function() {
            reminder.setBoard();
            reminder.showBoard('Game Start!');
            pingpong.stop();
            pingpong.restartBall();
        },3000);
    }
    function clickOpponent(event) {
        redName = event.target.id;
        rookieIcon.style.boxShadow = null;
        seniorIcon.style.boxShadow = null;
        expertIcon.style.boxShadow = null;
        event.target.style.boxShadow="0px 0px 15px yellow";
    }
}
function setTableEnv() {
    window.addEventListener('selectstart', function(e){ e.preventDefault(); });
    var menuBtn = document.createElement('button');
    menuBtn.innerText = 'MENU';
    menuBtn.id = 'menuBtn';
    menuBtn.style.position = 'absolute';
    menuBtn.style.fontSize = '1rem';
    document.body.appendChild(menuBtn);
    var groundContainer = document.createElement('div');
    setElementPosSize(groundContainer,{top:0,left:0, width:1000, height:600});
    groundContainer.style.backgroundColor = 'burlywood';
    var gameTableContainer = document.createElement('div');
    gameTableContainer.style.position = 'absolute';
    setElementPosSize(gameTableContainer,{top:70,left:100});
    gameTableContainer.id = 'gameTableContainer';
    var gameTable = document.createElement('div');
    setElementPosSize(gameTable,{top:0,left:0,width:700,height:400});
    gameTable.style.position = 'absolute';
    gameTable.style.backgroundColor = 'white';
    gameTable.style.clipPath = 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)';
    var gameTableG = document.createElement('div');
    setElementPosSize(gameTableG,{top:5,left:15,width:660,height:390});
    gameTableG.style.position = 'absolute';
    gameTableG.style.backgroundColor = 'green';
    gameTableG.style.clipPath = 'polygon(20% 0%, 50% 0, 50% 100%, 0% 100%)';
    var gameTableGR = document.createElement('div');
    setElementPosSize(gameTableGR,{top:5,left:25,width:660,height:390});
    gameTableGR.style.position = 'absolute';
    gameTableGR.style.backgroundColor = 'green';
    gameTableGR.style.clipPath = 'polygon(50% 0, 80% 0%, 100% 100%, 50% 100%)';
    var tableEdge = document.createElement('div');
    setElementPosSize(tableEdge,{top:400,left:0,width:700,height:10})
    tableEdge.style.position = 'absolute';
    tableEdge.style.backgroundColor = '#4d4848';
    // tableEdge.style.clipPath = 'polygon(0% 0%, 100% 0%, 80% 35%, 70% 65%, 75% 100%, 25% 100%, 30% 65%, 20% 35%)';
    var tableNet = document.createElement('div');
    setElementPosSize(tableNet,{top:130,left:25,width:650,height:50});
    tableNet.style.position = 'absolute';
    tableNet.style.backgroundColor = 'rgba(128, 128, 128,0.5)';
    tableNet.style.borderLeft = '5px solid black';
    tableNet.style.borderRight = '5px solid black';
    tableNet.style.borderTop = '5px solid #dadada';
    var tableBase = document.createElement('div');
    setElementPosSize(tableBase,{top:400,left:200,width:300,height:70});
    tableBase.style.position = 'absolute';
    tableBase.style.background = 'linear-gradient(blue, darkBlue, #000036)';
    tableBase.style.clipPath = 'polygon(0% 0%, 100% 0%, 80% 35%, 70% 65%, 75% 100%, 25% 100%, 30% 65%, 20% 35%)';
    gameTableContainer.appendChild(tableBase);
    gameTableContainer.appendChild(gameTable);
    gameTableContainer.appendChild(gameTableG);
    gameTableContainer.appendChild(gameTableGR);
    gameTableContainer.appendChild(tableEdge);
    gameTableContainer.appendChild(tableNet);
    document.body.appendChild(groundContainer);
    document.body.appendChild(gameTableContainer);
    // set scoreboard
    var scoreBoard = document.createElement('div');
    setElementPosSize(scoreBoard,{top:10,left:750,width:250,height:100});
    scoreBoard.style.position = 'absolute';
    scoreBoard.style.backgroundColor = 'rgb(44, 44, 44)';
    scoreBoard.style.borderRadius = '5px';
    scoreBoard.style.userSelect = 'none';
    document.body.appendChild(scoreBoard);
    var timeBoard = document.createElement('div');
    setElementPosSize(timeBoard,{top:10,left:90,width:80,height:30});
    timeBoard.style.position = 'relative';
    timeBoard.style.backgroundColor = 'rgb(14, 14, 14)';
    timeBoard.style.borderRadius = '5px';
    timeBoard.style.color = 'white';
    timeBoard.style.fontFamily = 'Arial, Helvetica, sans-serif';
    timeBoard.style.textAlign = 'center';
    timeBoard.style.fontSize = '1.5rem';
    timeBoard.style.userSelect = 'none';
    timeBoard.innerText = '00:00';
    timeBoard.id = 'timeBoard';
    scoreBoard.appendChild(timeBoard);
    var blueScore = document.createElement('div');
    setElementPosSize(blueScore,{top:40,left:20,width:60,height:50});
    blueScore.style.position = 'absolute';
    blueScore.style.backgroundColor = 'blue';
    blueScore.style.borderRadius = '5px';
    blueScore.style.color = 'white';
    blueScore.style.fontFamily = 'Arial, Helvetica, sans-serif';
    blueScore.style.textAlign = 'center';
    blueScore.style.fontSize = '2.5rem';
    blueScore.innerText = '00';
    blueScore.id = 'blueScore';
    scoreBoard.appendChild(blueScore);
    var redScore = document.createElement('div');
    setElementPosSize(redScore,{top:40,left:175,width:60,height:50});
    redScore.style.position = 'absolute';
    redScore.style.backgroundColor = 'red';
    redScore.style.borderRadius = '5px';
    redScore.style.color = 'white';
    redScore.style.fontFamily = 'Arial, Helvetica, sans-serif';
    redScore.style.textAlign = 'center';
    redScore.style.fontSize = '2.5rem';
    redScore.innerText = '00';
    redScore.id = 'redScore';
    scoreBoard.appendChild(redScore);
    var blueText = document.createElement('p');
    setElementPosSize(blueText, {top:5, left:10});
    blueText.style.position = 'absolute';
    blueText.style.backgroundColor = 'rgb(44, 44, 44)';
    blueText.style.color = 'white';
    blueText.style.fontFamily = 'Arial, Helvetica, sans-serif';
    blueText.style.fontSize = '0.8rem';
    blueText.innerText = 'Your Name';
    blueText.id = 'blueText';
    scoreBoard.appendChild(blueText);
    var redText = document.createElement('p');
    setElementPosSize(redText, {top:5, left:175});
    redText.style.position = 'absolute';
    redText.style.backgroundColor = 'rgb(44, 44, 44)';
    redText.style.color = 'white';
    redText.style.fontFamily = 'Arial, Helvetica, sans-serif';
    redText.style.fontSize = '0.8rem';
    redText.innerText = 'Rookie';
    redText.id = 'redText';
    scoreBoard.appendChild(redText);
}
const paddleRadius = 50;
var opponent = {
    playerDiv: document.createElement('div'),
    paddle: document.createElement('div'),
    width:200, height:200, posx:300, posy:-50, downx:0, downy:0, 
    setPlayer: function() {
        this.playerDiv.style.position = 'fixed';
        // this.playerDiv.style.zIndex = '1';
        // this.playerDiv.id = 'opponent';
        setElementPosSize(this.playerDiv,{top:-50,left:300});
        var playerBody = document.createElement('div');
        setElementPosSize(playerBody,{top:0,left:0,width:opponent.width,height:opponent.height});
        playerBody.style.position = 'absolute';
        playerBody.style.backgroundColor = 'rgb(218, 218, 218,0.7)';
        // playerBody.style.clipPath = 'polygon(13% 37%, 23% 45%, 27% 36%, 35% 35%, 35% 28%, 27% 23%, 25% 16%, 28% 8%, 41% 5%, 52% 6%, 57% 12%, 60% 18%, 59% 27%, 55% 32%, 53% 36%, 59% 38%, 69% 46%, 78% 42%, 74% 35%, 79% 32%, 89% 43%, 71% 53%, 60% 56%, 59% 62%, 67% 69%, 74% 73%, 77% 82%, 77% 93%, 70% 96%, 62% 95%, 62% 83%, 54% 72%, 42% 72%, 37% 78%, 37% 83%, 36% 96%, 21% 95%, 23% 87%, 27% 80%, 29% 64%, 35% 59%, 27% 53%, 14% 52%, 8% 43%)';
        playerBody.style.clipPath = 'polygon(39% 29%, 39% 29%, 39% 23%, 39% 23%, 37% 20%, 37% 15%, 40% 12%, 49% 10%, 55% 12%, 58% 18%, 56% 26%, 56% 29%, 55% 35%, 55% 35%, 61% 38%, 61% 38%, 70% 43%, 70% 43%, 82% 52%, 82% 52%, 72% 56%, 72% 56%, 59% 51%, 59% 51%, 58% 61%, 58% 61%, 59% 67%, 59% 67%, 69% 71%, 69% 71%, 78% 78%, 78% 78%, 84% 86%, 84% 86%, 80% 93%, 80% 93%, 76% 97%, 76% 100%, 66% 98%, 66% 98%, 69% 88%, 69% 88%, 59% 81%, 59% 81%, 46% 73%, 46% 73%, 39% 80%, 39% 80%, 34% 87%, 34% 90%, 34% 97%, 34% 97%, 24% 98%, 24% 98%, 24% 86%, 24% 86%, 28% 74%, 28% 74%, 35% 62%, 35% 62%, 36% 50%, 36% 53%, 36% 44%, 36% 44%, 28% 52%, 28% 52%, 23% 56%, 23% 56%, 14% 39%, 14% 39%, 22% 44%, 22% 44%, 34% 37%, 34% 37%, 39% 35%, 39% 35%)';
        this.playerDiv.appendChild(playerBody);
        document.body.insertBefore(this.playerDiv,gameTableContainer);
    },
    speedX: 5, speedY: 5, targetX: 300, targetY: -50,
    setOpponentLevel: function(levelStr) {
        switch (levelStr) {
            case 'rookie':
                opponent.speedX = 5;
                opponent.speedY = 5;
                break;
            case 'senior':
                opponent.speedX = 8;
                opponent.speedY = 8;
                break;
            case 'expert':
                opponent.speedX = 10;
                opponent.speedY = 10;
                break;
            default:
                opponent.speedX = 5;
                opponent.speedY = 5;
                break;
        }
    },
    newPos: function() {
        var tmpSpeedX = 0;
        if (this.posx < this.targetX-10) {
            tmpSpeedX = this.speedX;
        } else if (this.posx > this.targetX+10) {
            tmpSpeedX = -this.speedX;
        }
        this.posx += tmpSpeedX;
        setElementPosSize(opponent.playerDiv,{top:opponent.posy,left:opponent.posx});
        opponent.checkHitBall();
    },
    checkHitBall: function() {
        var A = {top:opponent.posy+opponent.height/2,left:opponent.posx,width:opponent.width,height:opponent.height/4};
        var B = {top:pingpong.y,left:pingpong.x,width:ballSize,height:ballSize};
        var judge = checkContact(A, B);
        // console.log(A,B,judge);
        if (judge[0]&&judge[1]) {
            pingpong.speedX = Math.random()*10 -5;
            pingpong.speedY = (Math.random()*0.5+0.6)*pingpong.speedY*-1;
            pingpong.y = opponent.posy+opponent.height*3/4;
        }
    },
    setNewTarget: function(ballX,ballY,slope) {
        var b = ballY - slope*ballX;
        this.targetX = (this.targetY+opponent.width/2-b)/slope-opponent.width/2;
        console.log(this.targetX,this.targetY);
    },
    resetOppoPos: function() {
        setElementPosSize(opponent.playerDiv,{top:-50,left:300});
        opponent.targetX = 300;
        opponent.targetY = -50;
        opponent.posx = 300;
        opponent.posy = -50;
    }
}
var gamePlayer = {
    playerDiv: document.createElement('div'),
    paddle: document.createElement('div'),
    paddleAction: document.createElement('div'),
    paddleImg: document.createElement("img"),
    posx:0, posy:0, downx:0, downy:0, padPosx:0, padPosy:0,
    setPlayer: function() {
        this.playerDiv.style.position = 'fixed';
        this.playerDiv.style.zIndex = '1';
        this.playerDiv.id = 'player';
        setElementPosSize(this.playerDiv,{top:230,left:100});
        var playerBody = document.createElement('div');
        setElementPosSize(playerBody,{top:0,left:0,width:300,height:300});
        playerBody.style.position = 'absolute';
        playerBody.style.backgroundColor = 'rgb(218, 218, 218,0.3)';
        // playerBody.style.clipPath = 'polygon(13% 37%, 23% 45%, 27% 36%, 35% 35%, 35% 28%, 27% 23%, 25% 16%, 28% 8%, 41% 5%, 52% 6%, 57% 12%, 60% 18%, 59% 27%, 55% 32%, 53% 36%, 59% 38%, 69% 46%, 78% 42%, 74% 35%, 79% 32%, 89% 43%, 71% 53%, 60% 56%, 59% 62%, 67% 69%, 74% 73%, 77% 82%, 77% 93%, 70% 96%, 62% 95%, 62% 83%, 54% 72%, 42% 72%, 37% 78%, 37% 83%, 36% 96%, 21% 95%, 23% 87%, 27% 80%, 29% 64%, 35% 59%, 27% 53%, 14% 52%, 8% 43%)';
        playerBody.style.clipPath = 'polygon(39% 29%, 39% 29%, 39% 23%, 39% 23%, 37% 20%, 37% 15%, 40% 12%, 49% 10%, 55% 12%, 58% 18%, 56% 26%, 56% 29%, 55% 35%, 55% 35%, 61% 38%, 61% 38%, 70% 43%, 70% 43%, 82% 52%, 82% 52%, 72% 56%, 72% 56%, 59% 51%, 59% 51%, 58% 61%, 58% 61%, 59% 67%, 59% 67%, 69% 71%, 69% 71%, 78% 78%, 78% 78%, 84% 86%, 84% 86%, 80% 93%, 80% 93%, 76% 97%, 76% 100%, 66% 98%, 66% 98%, 69% 88%, 69% 88%, 59% 81%, 59% 81%, 46% 73%, 46% 73%, 39% 80%, 39% 80%, 34% 87%, 34% 90%, 34% 97%, 34% 97%, 24% 98%, 24% 98%, 24% 86%, 24% 86%, 28% 74%, 28% 74%, 35% 62%, 35% 62%, 36% 50%, 36% 53%, 36% 44%, 36% 44%, 28% 52%, 28% 52%, 23% 56%, 23% 56%, 14% 39%, 14% 39%, 22% 44%, 22% 44%, 34% 37%, 34% 37%, 39% 35%, 39% 35%)';
        this.playerDiv.appendChild(playerBody);
        document.body.appendChild(this.playerDiv);
        this.paddle.style.position = 'absolute';
        setElementPosSize(this.paddle,{top:110,left:200,width:paddleRadius*2,height:paddleRadius*2});
        this.paddle.style.backgroundColor = 'rgb(218, 218, 0, 0.05)';
        this.paddle.style.clipPath = 'circle(50% at 50% 50%)';
        this.paddleImg.style.position = 'absolute';
        this.paddleImg.style.left = "10px";
        this.paddleImg.style.top = "10px";
        this.paddleImg.style.opacity = "0.3";
        this.paddleImg.width = paddleRadius*1.7;
        this.paddleImg.height = paddleRadius*1.7;
        this.paddleImg.src = "/img/paddle.png";
        this.paddle.appendChild(this.paddleImg);
        this.playerDiv.appendChild(this.paddle);
        this.paddleAction.style.position = 'absolute';
        setElementPosSize(this.paddleAction,{top:135,left:225,width:50,height:50});
        this.paddleAction.style.backgroundColor = 'rgb(218, 0, 218, 0.05)';
        this.paddleAction.style.clipPath = 'polygon(40% 0%, 40% 35%, 100% 20%, 100% 80%, 40% 65%, 40% 100%, 0% 50%)';
        this.paddleAction.style.transform = 'rotate(99deg)';
        this.paddleAction.style.visibility = 'hidden';
        this.playerDiv.appendChild(this.paddleAction);
    },
    setPlayerControl: function() {
        player.onmouseover = this.mouseStartFun;
    },
    mouseStartFun: function(event) {
        document.onmousemove = gamePlayer.mouseMoveFun;
        gamePlayer.posx = event.clientX;
        gamePlayer.posy = event.clientY;
        gamePlayer.padPosx = event.clientX;
        gamePlayer.padPosy = event.clientY;
        // console.log(gamePlayer.posx,gamePlayer.posy,player.style.top);
        document.onmousedown = gamePlayer.mouseDownFun;
        document.onmouseup = gamePlayer.mouseUpFun;
    },
    mouseMoveFun: function(event) {
        // player
        // console.log('ok');
        var newx = event.clientX;
        var newy = event.clientY;
        // console.log(player.style.top,player.style.left);
        // console.log(this.playerDiv.style.top,this.playerDiv.style.left);
        var topPos = parseInt(player.style.top)+newy-gamePlayer.posy;
        if (topPos < 150) {
            document.onmousemove = null;
            topPos = 155;
        }
        player.style.top = topPos+'px';
        player.style.left = parseInt(player.style.left)+newx-gamePlayer.posx+'px';
        gamePlayer.posx = event.clientX;
        gamePlayer.posy = event.clientY;
        // if (gamePlayer.posy < 200) {
        //     document.onmousemove = null;
        // }
    },
    mouseDownFun: function(event) {
        this.downx = event.clientX;
        this.downy = event.clientY;
        document.onmousemove = null;
        player.onmouseover = null;
        document.onmousemove = gamePlayer.paddleMoveFun;
        gamePlayer.paddleImg.style.opacity = "1";
        // console.log(this.downx);
        // document.onmousemove = gamePlayer.paddleActionFun;
    },
    mouseUpFun: function(event) {
        var dx = (event.clientX - this.downx);
        var dy = (event.clientY - this.downy)*-1;
        var distance = Math.sqrt(dx*dx+dy*dy);
        var moveDeg = (Math.atan(dy/dx*-1))*180/Math.PI;
        // console.log(distance,moveDeg);
        moveDeg = (moveDeg < 0)? moveDeg+180 : moveDeg;
        moveDeg = (dy < 0)? moveDeg+180 : moveDeg;
        // var moveDeg = 0;
        // console.log(distance,moveDeg);
        gamePlayer.paddleAction.style.transform = `rotate(${moveDeg}deg)`;
        gamePlayer.paddleAction.style.visibility = 'visible';
        // document.onmousemove = null;
        // document.onmousedown = null;
        // document.onmouseup = null;
        // console.log(player.offsetTop+gamePlayer.paddle.offsetTop,player.offsetLeft+gamePlayer.paddle.offsetLeft);
        // console.log(gamePlayer.isInsidePaddle());
        if (gamePlayer.isInsidePaddle()[0]) {
            var Tfactor = 7, Dfactor = 10, Ffactor = 3; //T: timing, D: direction, F: force
            gamePlayer.isInsidePaddle()[1]/Tfactor
            console.log(gamePlayer.isInsidePaddle()[1]/Tfactor , dx/Dfactor, dy/Ffactor);
            pingpong.speedX = gamePlayer.isInsidePaddle()[1]/Tfactor + dx/Dfactor;
            pingpong.speedY = Math.abs(dy/Ffactor)*-1;
            opponent.setNewTarget(pingpong.x,pingpong.y,pingpong.speedY/pingpong.speedX);
        }
        document.onmousemove = null;
        gamePlayer.setPlayerControl();
        setElementPosSize(gamePlayer.paddle,{top:110,left:200});
        gamePlayer.paddleImg.style.opacity = "0.3";
    },
    isInsidePaddle: function() {
        var padX = player.offsetLeft+gamePlayer.paddle.offsetLeft+paddleRadius;
        var padY = player.offsetTop+gamePlayer.paddle.offsetTop+paddleRadius;
        var ballX = parseInt(pingpong.ballDiv.style.left)+ballSize/2;
        var ballY = parseInt(pingpong.ballDiv.style.top)+ballSize/2;
        var tmpY = Math.sin(Math.abs(Math.acos((ballX-padX)/paddleRadius)))*paddleRadius;
        // console.log(padX,padY,tmpY);
        return [(padY - tmpY < ballY) && (padY + tmpY > ballY),ballY-padY];
    },
    paddleMoveFun: function(event) {
        var newx = event.clientX;
        var newy = event.clientY;
        // console.log(player.style.top,player.style.left);
        // console.log(this.playerDiv.style.top,this.playerDiv.style.left);
        var topPos = parseInt(gamePlayer.paddle.style.top)+newy-gamePlayer.padPosy;
        var leftPos = parseInt(gamePlayer.paddle.style.left)+newx-gamePlayer.padPosx;
        // if (topPos < 50) 
        //     topPos = 55;
        // else if (topPos >170)
        //     topPos = 165;
        // else if (leftPos <140)
        //     leftPos = 145;
        // else if (leftPos >260)
        //     leftPos = 255;
        console.log(leftPos,topPos);
        [leftPos, topPos] = isOutSideCircle(leftPos,topPos,200,110,80)
        console.log(leftPos,topPos);
        gamePlayer.paddle.style.top = topPos+'px';
        gamePlayer.paddle.style.left = leftPos+'px';
        // gamePlayer.paddle.style.left = parseInt(gamePlayer.paddle.style.left)+newx-gamePlayer.padPosx+'px';
        gamePlayer.padPosx = event.clientX;
        gamePlayer.padPosy = event.clientY;
    }
}
const ballSize = 20;
var pingpong = {
    ballDiv: document.createElement('div'),
    x:400, y:50, speedX:5, speedY:10, height:0, timer:0, isRunning: false, interval: undefined,
    setBall: function() {
        setElementPosSize(this.ballDiv,{top:50,left:400,width:ballSize,height:ballSize});
        this.ballDiv.style.position = 'absolute';
        this.ballDiv.style.backgroundColor = 'orange';
        this.ballDiv.style.clipPath = 'circle(50% at 50% 50%)';
        document.body.appendChild(this.ballDiv);
    },
    restartBall: function() {
        pingpong.x = 400, pingpong.y = 50, pingpong.speedX = 5, pingpong.speedY = 10;
        setElementPosSize(pingpong.ballDiv,{top:pingpong.y,left:pingpong.x});
        // console.log(this);
        // startBtn.disabled = true;
        pingpong.start();
    },
    start: function () {
        pingpong.interval = setInterval(updateGameArea, FRAME_TIME);
        pingpong.isRunning = true;
        // console.log(this.interval);
    },
    stop: function () {
        clearInterval(pingpong.interval);
        pingpong.isRunning = false;
    },
    newPos: function() {
        this.x += this.speedX;
        this.y += this.speedY;
        // if (this.y < 0) {
        //     this.speedX = Math.random()*10 -5;
        //     this.speedY = (Math.random()*0.5+0.6)*this.speedY*-1;
        //     this.y = 0;
        // }
        setElementPosSize(this.ballDiv,{top:this.y,left:this.x});
        if (pingpong.isOut()) {
            gameOver();
        }
    },
    isOut: function() {
        var judge = false;
        if (this.y > 600) {
            this.y = 0;
            judge = true;
            redScore.innerText = parseInt(redScore.innerText)+1;
            redScore.innerText = (redScore.innerText.length==1)? '0'+redScore.innerText:redScore.innerText;
        } else if (this.y < -50) {
            this.y = 0;
            judge = true;
            blueScore.innerText = parseInt(blueScore.innerText)+1;
            blueScore.innerText = (blueScore.innerText.length==1)? '0'+blueScore.innerText:blueScore.innerText;
        }
        return judge;
    },
    setBounce: function(vecX, vecY) {
        this.timer = 0;
        this.speedX = vecX;
        this.speedY = vecY;
    }
}
var reminder = {
    board: document.createElement('div'),
    boardText: document.createElement('p'),
    setBoard: function() {
        this.board.style.position = 'fixed';
        setElementPosSize(this.board,{top:388, left:590, width:400, height:200});
        this.board.style.backgroundColor = 'rgba(53, 171, 218,0.5)';
        this.board.style.border = '10px outset #2880A4';
        this.board.style.borderRadius = '100px 10px 10px 10px';
        // this.board.style.visibility = 'hidden';
        this.board.style.display = 'none';
        document.body.appendChild(this.board);
        this.boardText.style.position = 'absolute';
        setElementPosSize(this.boardText,{top:50, left:50});
        this.boardText.style.backgroundColor = 'rgba(53, 171, 218,0)';
        this.boardText.style.fontSize = '2rem';
        this.boardText.style.color = 'white';
        this.board.appendChild(this.boardText);
    },
    showBoard: function(text) {
        reminder.boardText.innerText = text;
        // console.log($(reminder.board),reminder.board);
        // reminder.board.style.visibility = 'visible';
        $(reminder.board).show("slow");
        setTimeout(function() {
            // reminder.board.style.visibility = 'hidden';
            $(reminder.board).hide("slow");
        }, 5000);
    }
}
var countDown = {
    board: document.createElement('div'),
    canvas: document.createElement('canvas'),
    boardText: document.createElement('p'),
    circleProperty: {
        color:'gray',x: 150,y: 150,radius: 130,w: 20
    },
    timeSlice:0,
    setBoard: function() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        // this.canvas.style.border = '1px solid gray';
        this.canvas.style.left = '0px';
        this.canvas.style.top = '0px';
        this.canvas.style.position = 'absolute';
        this.context = this.canvas.getContext("2d");
        // this.canvas.style.display = 'none';
        this.canvas.style.display = 'block';
        this.boardText.style.position = 'absolute';
        setElementPosSize(this.boardText,{top:-40, left:110});
        this.boardText.style.backgroundColor = 'rgba(53, 171, 218,0)';
        this.boardText.style.fontSize = '8rem';
        this.boardText.style.color = 'rgb(75, 75, 75)';
        this.boardText.innerText = "3";
        setElementPosSize(this.board,{top:150, left:250});
        this.board.style.position = 'fixed';
        this.board.appendChild(this.canvas);
        this.board.appendChild(this.boardText);
        document.body.appendChild(this.board);
        this.drawCircleEdge(countDown.circleProperty);
    },
    drawCircleEdge: function (property, timeSlot) {
        var dt = (timeSlot != undefined)? timeSlot*Math.PI*2 : 0;
        ctx = countDown.context;
        ctx.save();
        ctx.strokeStyle = property.color;
        ctx.lineWidth = property.w;
        ctx.beginPath();
        ctx.translate(property.x, property.y);
        ctx.arc(0, 0, property.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        // rounding part
        ctx.save();
        ctx.strokeStyle = 'white';
        ctx.shadowColor = 'white';
        ctx.shadowBlur = property.w;
        ctx.lineWidth = property.w;
        ctx.beginPath();
        ctx.translate(property.x, property.y);
        ctx.arc(0, 0, property.radius, Math.PI*1.5+dt, Math.PI*(1.5+0.25)+dt);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    },
    startCountDown: function (num) {
        countDown.boardText.innerText = num;
        this.interval = setInterval(countDown.refresh, FRAME_TIME);
    },
    refresh: function () {
        countDown.clear();
        var delta = FRAME_TIME/1000;
        var tmpTime = Math.round(countDown.timeSlice*10)/10;
        if (tmpTime<0.9) {
            countDown.timeSlice += delta;
        } else {
            countDown.timeSlice = 0;
            var num = parseInt(countDown.boardText.innerText);
            num = num -1;
            if (num == 0) { countDown.stop(); }
            countDown.boardText.innerText = num;
        }
        // console.log(tmpTime);
        countDown.drawCircleEdge(countDown.circleProperty,countDown.timeSlice);
    },
    stop: function () {
        clearInterval(this.interval);
        this.board.style.display = 'none';
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function updateGameArea() {
    pingpong.newPos();
    opponent.newPos();
}
function gameOver() {
    pingpong.stop();
    opponent.resetOppoPos();
    // startBtn.onclick = pingpong.restartBall;
    // startBtn.disabled = false;
    setElementPosSize(player, {top: 230, left: 100})
    document.onmousemove = null;
    // document.onmousemove = gamePlayer.mouseMoveFun;
    setTimeout(pingpong.restartBall,2000);
}
function setElementPosSize(element,posSize) {
    element.style.top = posSize.top+'px';
    element.style.left = posSize.left+'px';
    if (posSize.width!=undefined) {element.style.width = posSize.width+'px';}
    if (posSize.height!=undefined) {element.style.height = posSize.height+'px';}
}
function checkContact(A,B) {
    judgeY= (A.top<B.top+B.height) && (A.top+A.height>B.top);
    judgeX= (A.left<B.left+B.width) && (A.left+A.width>B.left);
    // console.log(judgeX,judgeY);
    return [judgeX , judgeY];
}
function isOutSideCircle(x,y,cx,cy,radius) {
    var dx = x-cx;
    var dy = y-cy;
    var theta = Math.atan(dy/dx);
    var dist = Math.sqrt(dx*dx+dy*dy);
    var newx,newy,dt=1;
    if (dist>radius) {
        if (dx<0) 
            dt=-1;
        newx = (Math.cos(theta)*radius)*dt+cx;
        newy = (Math.sin(theta)*radius)*dt+cy;
        
    } else {
        newx = x;
        newy = y;
    }
    return [newx, newy];
}