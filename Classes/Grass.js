"use strict";

let LivingCreature = require('./Living_creature')

module.exports = class Grass extends LivingCreature{

    spawn(){

        this.energy++;
        const targetCells = super.chooseCell(0);
        const newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        if(this.energy >= 6 && newCell){
            const newX = newCell[0];
            const newY = newCell[1];
            this.idMatrix[newY][newX] = this.id;
            const newGrass = new Grass(newX, newY, this.id, this.idMatrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newGrass;
            this.energy = 0;
        }
    }

    update(){

        this.spawn();
    }
}