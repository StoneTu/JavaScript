const DIVIDE_COUNT = 20;
const DIVIDE_TIME = 20;

var mushDiv = document.getElementById("mushroomDiv");
var mush = document.getElementById("mushroom");
var checkText = document.getElementById("checkText");
var wallEle = document.getElementsByClassName("wall")[0];
var moreDiv = document.getElementById("moreDiv");

var mushDivEle = window.getComputedStyle(mushDiv);//.getPropertyValue(top)
var wallEle = window.getComputedStyle(wallEle);//.getPropertyValue(top)
var mushEle = window.getComputedStyle(mush);//.getPropertyValue(top)

main();
function main() {
    mush.onclick = function () { checkInputValid(); }
}
function mushOver() {
    mushDiv.onmouseover = function () { mushDivMouseOver(); }
    mush.onclick = function () { mushChecked(); }
    mush.onmouseover = function () { }
}
function mushChecked() {
    if (mush.checked == true) {
        setTimeout(() => {
            window.alert("哎呦！厲害喔！");
            mush.checked = false;
            resetForm();
        }, 1000);
    }
}
function changeText() {
    var rand = parseInt(Math.random() * 4);
    switch (rand) {
        case 0:
            checkText.innerText = "Ha!Ha!";
            break;
        case 1:
            checkText.innerText = "Sorry!";
            break;
        case 2:
            checkText.innerText="@.@";
            break;
        case 3:
                checkText.innerText="Check me!";
                break;
        default:
            break;
    }
}
function mushDivMouseOver() {
    mushDiv.onmouseover = function () { };
    changeText();
    var mushDivTop = mushDivEle.getPropertyValue('top');
    var mushDivLeft = mushDivEle.getPropertyValue('left');
    var topStr = mushDivTop.slice(0, -2);
    var leftStr = mushDivLeft.slice(0, -2);
    // console.log(leftStr, topStr);
    randX = Math.random() * 100 - 50;
    randY = Math.random() * 100 - 50;
    topStr = parseFloat(topStr) + randY;
    leftStr = parseFloat(leftStr) + randX;
    returnArr = checkBoundary(leftStr, topStr);
    leftStr = returnArr[0];
    topStr = returnArr[1];
    // console.log(leftStr, topStr);
    smoothMove(mushDiv, leftStr, topStr);
    // mushDiv.style.top=topStr+"px";
    // mushDiv.style.left=leftStr+"px";
}
function checkBoundary(posX, posY) {
    var returnX = posX, returnY = posY;
    var wallTop = parseInt(wallEle.getPropertyValue('top').slice(0, -2));
    var wallHeight = parseInt(wallEle.getPropertyValue('height').slice(0, -2));
    var wallLeft = parseInt(wallEle.getPropertyValue('left').slice(0, -2));
    var wallWidth = parseInt(wallEle.getPropertyValue('width').slice(0, -2));
    var mushWidth = parseInt(mushDivEle.getPropertyValue('width').slice(0, -2));
    var mushHeight = parseInt(mushDivEle.getPropertyValue('height').slice(0, -2));
    //console.log(posX,posY,mushWidth,mushHeight);
    // console.log(wallLeft,wallLeft+wallWidth,wallTop,wallTop+wallHeight);
    // console.log(posX+mushWidth > wallLeft+wallWidth,posY+mushHeight >wallTop+wallHeight);
    if (posX < 0) { returnX = 0; }
    else if (posX + mushWidth > wallWidth) { returnX = wallWidth - mushWidth * 2; }
    if (posY < 0) { returnY = 0; }
    else if (posY + mushHeight > wallHeight) { returnY = wallHeight - mushHeight * 1.5; }
    return [returnX, returnY];
}
function smoothMove(element, posX, posY) {
    var cnt = 0;
    var orgX = parseInt(window.getComputedStyle(element).getPropertyValue('left').slice(0, -2));
    var orgY = parseInt(window.getComputedStyle(element).getPropertyValue('top').slice(0, -2));
    var dx = (posX - orgX) / DIVIDE_COUNT;
    var dy = (posY - orgY) / DIVIDE_COUNT;
    function loop() {
        element.style.left = (orgX + dx * (cnt + 1)) + "px";
        element.style.top = (orgY + dy * (cnt + 1)) + "px";
        if (cnt < DIVIDE_COUNT) {
            setTimeout(loop, DIVIDE_TIME);
            cnt++;
        } else { mushDiv.onmouseover = function () { mushDivMouseOver() }; }
    }
    loop();
}
function showDayValue(inputVal) { document.getElementById("day").value=inputVal; }
function checkInputValid() {
    var nameVal=(document.getElementById("namebox").value==0);
    var birthVal=(document.getElementById("birth").value<=0);
    var dayVal=(document.getElementById("day").value==0);
    var phoneVal=(document.getElementById("phoneNum").value==0)
    console.log(nameVal,birthVal,dayVal,phoneVal);
    if (nameVal) { document.getElementById("namebox").style.borderColor="red" }
    if (birthVal) { document.getElementById("birth").style.borderColor="red" }
    if (dayVal) { document.getElementById("day").style.borderColor="red" }
    if (phoneVal) { document.getElementById("phoneNum").style.borderColor="red" }
    mush.checked = false;
    if (!nameVal&&!birthVal&&!dayVal&&!phoneVal) {
        mushDiv.style.top = "125px";
        mushDiv.style.left = "-5px";
        moreDiv.style.visibility = "visible";
        mush.onmouseover = function () { mushOver(); }
    }
}
function submit() {
    alert("請先勾取確認！")
}
function resetForm() {
    mushDiv.style.top = "65px";
    mushDiv.style.left = "-5px";
    moreDiv.style.visibility = "hidden";
    document.getElementById("namebox").style.borderColor="black";
    document.getElementById("birth").style.borderColor="black"; 
    document.getElementById("day").style.borderColor="black"; 
    document.getElementById("phoneNum").style.borderColor="black"; 
    document.getElementById("namebox").value="";
    document.getElementById("birth").value="2021"; 
    document.getElementById("day").value=""; 
    document.getElementById("phoneNum").value="";
    checkText.innerText = "確認資料正確!";
    mush.onclick = function () { checkInputValid();}
    mushDiv.onmouseover = function () { }
    mush.onmouseover = function () { };
}