// cube status can be recorded as 
// "f"+"r"+"b"+"l"+"u"+"d"
// "fffffffffrrrrrrrrrbbbbbbbbbllllllllluuuuuuuuuddddddddd"
// Created by Stone Tu 2021.02.01
//
const turnArr = ["f", "fm", "r", "rm", "b", "bm", "l", "lm", "u", "um", "d", "dm"];
const cubeChar = "frblud";
const EDGE_SCORE = 10;
const CORNOR_SCORE = 10;
function initialCubeStr() {
    var returnStr = "";
    for (char of cubeChar) {
        for (var i = 0; i < 9; i++) {
            returnStr += char;
        }
    }
    return returnStr;
}
function getScore(cubeStr) {
    // the currect edge get 10 points. There will be 12 pairs edge.
    // f2-u8,f4-l6,f6-r4,f8-d2,u6-r2,r8-d6,
    // d4-l8,l2-u4,b4-r6,b2-u2,b6-l4,b8-d8
    const EDGE_ARR = ['f2-u8', 'f4-l6', 'f6-r4', 'f8-d2', 'u6-r2', 'r8-d6', 'd4-l8', 'l2-u4', 'b4-r6', 'b2-u2', 'b6-l4', 'b8-d8']
    // the current cornor get 5 points. There will be 8 corner.
    // f1-l3-u7, f3-u9-r1, f7-l9-d1, f9-r7-d3
    // b1-r3-u3, b3-l1-u1, b7-r9-d9, b9-d7-l7
    const CORNOR_ARR = ['f1-l3-u7', 'f3-u9-r1', 'f7-l9-d1', 'f9-r7-d3', 'b1-r3-u3', 'b3-l1-u1', 'b7-r9-d9', 'b9-d7-l7']
    var currentScore = 0;
    for (ed of EDGE_ARR) {
        var tmpA = ed.substr(0, 2), tmpB = ed.substr(3, 2);
        currentScore += compareCubePosition(cubeStr, tmpA, tmpB);
    }
    for (co of CORNOR_ARR) {
        var tmpA = co.substr(0, 2), tmpB = co.substr(3, 2), tmpC = co.substr(6, 2);
        currentScore += compareCubePosition(cubeStr, tmpA, tmpB, tmpC);
    }
    return currentScore;
}
function compareCubePosition(cubeStr, strA, strB, strC) {
    var posA = findCubeCharPos(strA[0]);
    var posB = findCubeCharPos(strB[0]);
    if (strC == undefined) {
        var judgeFlag = cubeStr[posA + parseInt(strA[1]) - 1] == strA[0] && cubeStr[posB + parseInt(strB[1]) - 1] == strB[0];
        // if (judgeFlag) { console.log(`${strA}-${strB}`); }
        return (judgeFlag) ? EDGE_SCORE : 0;
    } else {
        var posC = findCubeCharPos(strC[0]);
        var judgeFlagA = cubeStr[posA + parseInt(strA[1]) - 1] == strA[0];
        var judgeFlagB = cubeStr[posB + parseInt(strB[1]) - 1] == strB[0];
        var judgeFlagC = cubeStr[posC + parseInt(strC[1]) - 1] == strC[0];
        return (judgeFlagA && judgeFlagB && judgeFlagC) ? CORNOR_SCORE : 0;
    }
}
function turnCube(cubeStr, way) {
    // 12 way to turn cube f,fm,
    // f clockwise f : f123456789 -> f741852973
    //             u : u789 > l963
    //             l : l963 > d321
    //             d : d321 > r147
    //             r : r147 > u789
    // f counterclockwise f : f123456789 -> f379258147
    //             u : u789 > r147
    //             l : l963 > u789
    //             d : d321 > l963
    //             r : r147 > d321
    // r face : l > f
    //          f > r
    //          r > b
    //          b > l
    //          u123456789 -> u741852963
    //          d123456789 -> d369258147
    // b face : r + r face
    // l face : r + r + r face
    // u face : l123456789 > l741852963
    //          r123456789 > r369258147
    //          f > u
    //          u123456789 > b987654321
    //          b987654321 > d123456789
    //          d > f
    // d face : l123456789 > l369258147
    //          r123456789 > r741852963
    //          f > d
    //          d>b987654321
    //          b987654321 > u123456789
    //          u > f
    var isCCW = (way.length > 1 && way[1] == "m") ? true : false;
    switch (way[0]) {
        case 'f':
            cubeStr = cubeClockwise(cubeStr, isCCW);
            break;
        case 'r':
            cubeStr = cubeRFace(cubeStr);
            cubeStr = cubeClockwise(cubeStr, isCCW);
            cubeStr = cubeLFace(cubeStr);
            break;
        case 'b':
            cubeStr = cubeBFace(cubeStr);
            cubeStr = cubeClockwise(cubeStr, isCCW);
            cubeStr = cubeBFace(cubeStr);
            break;
        case 'l':
            cubeStr = cubeLFace(cubeStr);
            cubeStr = cubeClockwise(cubeStr, isCCW);
            cubeStr = cubeRFace(cubeStr);
            break;
        case 'u':
            cubeStr = cubeUFace(cubeStr);
            cubeStr = cubeClockwise(cubeStr, isCCW);
            cubeStr = cubeDFace(cubeStr);
            break;
        case 'd':
            cubeStr = cubeDFace(cubeStr);
            cubeStr = cubeClockwise(cubeStr, isCCW);
            cubeStr = cubeUFace(cubeStr);
            break;
        default:
            break;

    }
    return cubeStr;
}
function cubeDFace(cubeStr) {
    cubeStr = replaceCubeStr(cubeStr, "l123456789", "l369258147");
    cubeStr = replaceCubeStr(cubeStr, "r123456789", "r741852963");
    cubeStr = replaceCubeStr(cubeStr, "f123456789", "d123456789", "b987654321", "u123456789");
    return cubeStr;
}
function cubeUFace(cubeStr) {
    cubeStr = replaceCubeStr(cubeStr, "l123456789", "l741852963");
    cubeStr = replaceCubeStr(cubeStr, "r123456789", "r369258147");
    cubeStr = replaceCubeStr(cubeStr, "f123456789", "u123456789", "b987654321", "d123456789");
    return cubeStr;
}
function cubeClockwise(cubeStr, CCWFlag) {
    if (CCWFlag) { // CCW turn
        cubeStr = replaceCubeStr(cubeStr, "f123456789", "f369258147");
        cubeStr = replaceCubeStr(cubeStr, "u789", "r147", "d321", "l963");
    } else { //CW turn
        cubeStr = replaceCubeStr(cubeStr, "f123456789", "f741852963");
        cubeStr = replaceCubeStr(cubeStr, "u789", "l963", "d321", "r147");
    }
    return cubeStr;
}
function cubeRFace(cubeStr) {
    cubeStr = replaceCubeFace(cubeStr, 'l', 'f', 'r', 'b');
    cubeStr = replaceCubeStr(cubeStr, "u123456789", "u741852963");
    cubeStr = replaceCubeStr(cubeStr, "d123456789", "d369258147");
    return cubeStr;
}
function cubeBFace(cubeStr) {
    cubeStr = cubeRFace(cubeStr);
    cubeStr = cubeRFace(cubeStr);
    return cubeStr;
}
function cubeLFace(cubeStr) {
    // cubeStr = cubeRFace(cubeStr);
    // cubeStr = cubeRFace(cubeStr);
    // cubeStr = cubeRFace(cubeStr);
    cubeStr = replaceCubeFace(cubeStr, 'b', 'r', 'f', 'l');
    cubeStr = replaceCubeStr(cubeStr, "u123456789", "u369258147");
    cubeStr = replaceCubeStr(cubeStr, "d123456789", "d741852963");
    return cubeStr;
}
function StrReplaceAt(thisStr, index, replacement) {
    return thisStr.substr(0, index) + replacement + thisStr.substr(index + 1);
}
function replaceCubeFace(cubeStr, faceA, faceB, faceC, faceD) {
    var faceAStr = `${faceA}123456789`;
    var faceBStr = `${faceB}123456789`;
    var faceCStr = `${faceC}123456789`;
    var faceDStr = `${faceD}123456789`;
    cubeStr = replaceCubeStr(cubeStr, faceAStr, faceBStr, faceCStr, faceDStr);
    return cubeStr;
}
function replaceCubeStr(cubeStr, strA, strB, strC, strD, strE) {
    var firstPos = findCubeCharPos(strA[0]);
    var firstList = strA.slice(1);
    var secondPos = findCubeCharPos(strB[0]);
    var secondList = strB.slice(1);
    var tmpFirst = '', tmpSecond = '';
    if (strC == undefined || strD == undefined) {
        for (index in firstList) {
            tmpFirst += cubeStr[firstPos + parseInt(firstList[index]) - 1];
            tmpSecond += cubeStr[secondPos + parseInt(secondList[index]) - 1];
        }
        for (index in firstList) {
            cubeStr = StrReplaceAt(cubeStr, firstPos + parseInt(firstList[index]) - 1, tmpSecond[index]);
        }
    } else if (strE == undefined) {
        var thirdPos = findCubeCharPos(strC[0]);
        var thirdList = strC.slice(1);
        var forthPos = findCubeCharPos(strD[0]);
        var forthList = strD.slice(1);
        var tmpThird = '', tmpForth = '';
        for (index in firstList) {
            tmpFirst += cubeStr[firstPos + parseInt(firstList[index]) - 1];
            tmpSecond += cubeStr[secondPos + parseInt(secondList[index]) - 1];
            tmpThird += cubeStr[thirdPos + parseInt(thirdList[index]) - 1];
            tmpForth += cubeStr[forthPos + parseInt(forthList[index]) - 1];
        }
        for (index in firstList) {
            // var tempChar = cubeStr[firstPos + parseInt(firstList[index]) - 1];
            cubeStr = StrReplaceAt(cubeStr, firstPos + parseInt(firstList[index]) - 1, tmpSecond[index]);
            cubeStr = StrReplaceAt(cubeStr, secondPos + parseInt(secondList[index]) - 1, tmpThird[index]);
            cubeStr = StrReplaceAt(cubeStr, thirdPos + parseInt(thirdList[index]) - 1, tmpForth[index]);
            cubeStr = StrReplaceAt(cubeStr, forthPos + parseInt(forthList[index]) - 1, tmpFirst[index]);
        }
    } else {
        var fifthPos = findCubeCharPos(strE[0]);
        var fifthList = strE.slice(1);
        for (index in firstList) {
            cubeStr = StrReplaceAt(cubeStr, firstPos + parseInt(firstList[index]) - 1, cubeStr[secondPos + parseInt(secondList[index]) - 1]);
            cubeStr = StrReplaceAt(cubeStr, secondPos + parseInt(secondList[index]) - 1, cubeStr[thirdPos + parseInt(thirdList[index]) - 1]);
            cubeStr = StrReplaceAt(cubeStr, thirdPos + parseInt(thirdList[index]) - 1, cubeStr[forthPos + parseInt(forthList[index]) - 1]);
            cubeStr = StrReplaceAt(cubeStr, forthPos + parseInt(forthList[index]) - 1, cubeStr[fifthPos + parseInt(fifthList[index]) - 1]);
        }
    }
    return cubeStr;
}

function findCubeCharPos(char) {
    switch (char) {
        case 'f':
            return 0;
            break;
        case 'r':
            return 9;
            break;
        case 'b':
            return 18;
            break;
        case 'l':
            return 27;
            break;
        case 'u':
            return 36;
            break;
        case 'd':
            return 45;
            break;
        default:
            break;
    }
}
function myAlgorithm(initStr) {
    const FULLSCORE = EDGE_SCORE * 12 + CORNOR_SCORE * 8;
    const forcastSteps = 3;
    var solveSteps = [], alScore = 0, totalSteps = 0;
    var calStr = initStr;
    while (alScore < FULLSCORE && totalSteps < 50) {
        var tempArr = [];
        var storedSteps = [];
        recursiveFun(storedSteps, calStr, solveSteps[solveSteps.length-1]);
        console.log(tempArr);
        var tempStep = getBestScore(tempArr);
        // console.log(tempStep);
        solveSteps = solveSteps.concat(tempStep[1]);
        totalSteps = solveSteps.length;
        alScore = tempStep[0];
        calStr = tempStep[2];
        function recursiveFun(currentStepAr, currentCube, preStep) {
            var newTurnArr=turnArr;
            if (preStep != undefined) {
                newTurnArr = turnArr.filter(function (val) {
                    var prevent = (preStep.length > 1) ? preStep[0] : `${preStep}m`;
                    return val != prevent;
                })
            }
            for (iTurn of newTurnArr) {
                var tmpCube = currentCube;
                // console.log(iTurn);
                currentStepAr.push(iTurn);
                // console.log(currentStepAr);
                currentCube = turnCube(currentCube, iTurn);
                var tempCalObj = {};
                tempCalObj.steps = currentStepAr.slice(0); // clone the array.
                tempCalObj.score = getScore(currentCube);
                tempCalObj.cubeStr = currentCube;
                // console.log(tempCalObj);
                tempArr.push(tempCalObj);
                if (currentStepAr.length < forcastSteps) {
                    recursiveFun(currentStepAr, currentCube,currentStepAr[currentStepAr.length-1]);
                }
                currentStepAr.pop();
                currentCube = tmpCube;
            }
        }
        function getBestScore(inputArr) {
            var max = 0, index, cubStr;
            inputArr.forEach(function (val, ind) {
                if (max < val.score) {
                    max = val.score;
                    index = val.steps;
                    cubStr = val.cubeStr;
                }
            });
            return [max, index, cubStr];
        }
    }
    console.log(solveSteps);
    console.log(alScore);
}
function myTest() {
    var cb = initialCubeStr();
    // cb = turnCube(cb, 'dm');
    // console.log(getScore(cb));
    // cb = turnCube(cb, 'f');
    // console.log(getScore(cb));
    // cb = turnCube(cb, 'r');
    // console.log(getScore(cb));
    // cb = turnCube(cb, 'lm');
    // console.log(getScore(cb));
    // cb = turnCube(cb, 'd');
    console.log(cb);
    var startTime = new Date();
    myAlgorithm(cb);
    var dTime = new Date() - startTime;
    console.log(dTime);
}
// var a = [1,2,3];
// console.log(a[a.length-1]);
myTest();