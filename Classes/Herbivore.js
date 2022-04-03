"use strict";

let LivingCreature = require('./Living_creature')

module.exports = class Herbivore extends LivingCreature{

    constructor(x, y, id, side, idMatrix, objectsMatrix){

        super(x, y, id, side, idMatrix, objectsMatrix);
        this.energy = 8;
    }

    eat(){

        this.respond();
        const targetCells = super.chooseCell(1);
        const newCell = targetCells[Math.floor(Math.random() * targetCells.length)];

        if(newCell && this.energy > 0){
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;
            this.idMatrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;
            this.energy++;

            this.spawn();
        } else{
            this.move();
        }
    }

    spawn(){

        const targetCells = super.chooseCell(0);
        const newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        if(this.energy >= 12 && newCell){
            const newX = newCell[0];
            const newY = newCell[1];
            this.idMatrix[newY][newX] = this.id;
            const newHerbivore = new Herbivore(newX, newY, this.id, this.side, this.idMatrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newHerbivore;
        }
        this.energy = 8;
    }

    respond(){

        let PiedPiperX = -1;
        let PiedPiperY = -1;
        for(let y = 0; y < this.idMatrix.length; y++){
            for(let x = 0; x < this.idMatrix[y].length; x++){
                if(this.idMatrix[y][x] == 5 && super.computeDistance(this.x, this.y, x, y) / this.side <= 8){
                    PiedPiperX = x;
                    PiedPiperY = y;
                }
            }
        }
        const targetCells = super.chooseCell(0);
        if(PiedPiperX >= 0 && PiedPiperY >= 0){
            const distances = [];
            for(let i = 0; i < targetCells.length; i++){
                distances[i] = super.computeDistance(targetCells[i][0], targetCells[i][1], PiedPiperX, PiedPiperY);
            }

            let minimalDistanceIndex = 0;
            for(let i = 0; i < distances.length; i++){
                if(distances[i] < distances[minimalDistanceIndex]){
                    minimalDistanceIndex = i;
                }
            }

            if(targetCells[minimalDistanceIndex]){
                const newX = targetCells[minimalDistanceIndex][0];
                const newY = targetCells[minimalDistanceIndex][1];

                this.idMatrix[newY][newX] = this.id;
                this.idMatrix[this.y][this.x] = 0;

                this.objectsMatrix[newY][newX] = this;
                this.objectsMatrix[this.y][this.x] = null;

                this.x = newX;
                this.y = newY;
            }
        }
    }

    move(){

        const targetCells = super.chooseCell(0);
        const newCell = targetCells[Math.floor(Math.random() * targetCells.length)];

        if(newCell){
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;
            this.idMatrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;
            this.energy--;
        }

        this.die();
    }

    die(){

        if(this.energy < 0){
            this.idMatrix[this.y][this.x] = 0;
            this.objectsMatrix[this.y][this.x] = null;
        }
    }

    update(){

        this.eat();
    }
}
