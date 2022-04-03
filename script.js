"use strict";

const m = +prompt("Heigth:");
const n = +prompt("Width:");
const speed = +prompt("Speed:")

const side = 25;
const X = side * n;
const Y = side * m;

const matrix = createMatrix(n, m);
const objectsMatrix = createObjectsMatrix(matrix);

function setup(){

    createCanvas(X, Y);
    background("#fff");
    frameRate(speed);
}

function draw(){

    if(findObjects(1) == 0){
        let x = findEmptyCells(matrix)[0];
        let y = findEmptyCells(matrix)[1];
        let newGrass = new Grass(x, y, 1, matrix, objectsMatrix);
        objectsMatrix[y][x] = newGrass;
    }
    if(findObjects(2) <= 10){
        let x = findEmptyCells(matrix)[0];
        let y = findEmptyCells(matrix)[1];
        let newHerbivore = new Herbivore(x, y, 2, side, matrix, objectsMatrix);
        objectsMatrix[y][x] = newHerbivore;
    }
    if(findObjects(3) <= 10){
        let x = findEmptyCells(matrix)[0];
        let y = findEmptyCells(matrix)[1];
        let newPredator = new Predator(x, y, 3, side, matrix, objectsMatrix);
        objectsMatrix[y][x] = newPredator;
    }
    if(findObjects(4) == 0){
        let x = findEmptyCells(matrix)[0];
        let y = findEmptyCells(matrix)[1];
        let newHunter = new Hunter(x, y, 4, matrix, objectsMatrix);
        objectsMatrix[y][x] = newHunter;
    }
    if(findObjects(5) == 0){
        let x = findEmptyCells(matrix)[0];
        let y = findEmptyCells(matrix)[1];
        let newPiedPiper = new PiedPiper(x, y, 5, matrix, objectsMatrix);
        objectsMatrix[y][x] = newPiedPiper;
    }
    drawMatrix(matrix);
    updateObjectsMatrix(objectsMatrix);
}

function findEmptyCells(matrix){

    const emptyCells = [];
    let emptyCellNumber = 0;

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] == 0){
                emptyCells[emptyCellNumber] = [];
                emptyCells[emptyCellNumber][0] = x;
                emptyCells[emptyCellNumber][1] = y;
                emptyCellNumber++;
            }
        }
    }

    const randomCoordinates = Math.floor(Math.random() * (emptyCells.length));

    return emptyCells[randomCoordinates];
}



function createMatrix(horizontalLength, verticalLength){

    const newMatrix = [];
    for(let y = 0; y < verticalLength; y++){
        newMatrix[y] = [];
        for(let x = 0; x < horizontalLength; x++){
            const randomSectionCursor = Math.random() * 100;
            if(randomSectionCursor <= 35){
                newMatrix[y][x] = 1;
            } else if(randomSectionCursor <= 60){
                newMatrix[y][x] = 2;
            } else if(randomSectionCursor <= 75){
                newMatrix[y][x] = 3;
            } else if(randomSectionCursor <= 77){
                newMatrix[y][x] = 4;
            } else if(randomSectionCursor <= 78){
                newMatrix[y][x] = 5;
            } else{
                newMatrix[y][x] = 0;
            }
        }
    }

    return newMatrix;
}

function createObjectsMatrix(matrix){

    const newObjectMatrix = [];
    for(let y = 0; y < matrix.length; y++){
        newObjectMatrix[y] = [];
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] == 1){
                const newGrass = new Grass(x, y, 1, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newGrass;
            } else if(matrix[y][x] == 2){
                const newHerbivore = new Herbivore(x, y, 2, side, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newHerbivore;
            } else if(matrix[y][x] == 3){
                const newPredator = new Predator(x, y, 3, side, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newPredator;
            } else if(matrix[y][x] == 4){
                const newHunter = new Hunter(x, y, 4, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newHunter;
            } else if(matrix[y][x] == 5){
                const newPiedPiper = new PiedPiper(x, y, 5, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newPiedPiper;
            } else{
                newObjectMatrix[y][x] = null;
            }
        }
    }

    return newObjectMatrix;
}

function drawMatrix(matrix){

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] == 1){
                fill("green");
            } else if(matrix[y][x] == 2){
                fill("yellow");
            } else if(matrix[y][x] == 3){
                fill("red");
            } else if(matrix[y][x] == 4){
                fill("blue");
            } else if(matrix[y][x] == 5){
                fill("black");
            } else{
                fill("grey");
            }
            rect(x * side, y * side, side, side);
        }
    }
}


function updateObjectsMatrix(objectsMatrix){

    for(let y = 0; y < objectsMatrix.length; y++){
        for(let x = 0; x < objectsMatrix[y].length; x++){
            const object = objectsMatrix[y][x];
            if(object){
                object.update();
            }
        }
    }
}