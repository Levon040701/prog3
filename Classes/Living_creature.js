module.exports = class LivingCreature{

    constructor(x, y, id, side, idMatrix, objectsMatrix){

        this.x = x;
        this.y = y;
        this.id = id;
        this.side = side;
        this.energy = 0;
        this.idMatrix = idMatrix;
        this.objectsMatrix = objectsMatrix;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    updateCoordinates(){

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(characterId){

        this.updateCoordinates();
        const found = [];

        for(let i = 0; i < this.directions.length; i++){
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && x < this.idMatrix[0].length && y >= 0 && y < this.idMatrix.length){
                if(this.idMatrix[y][x] == characterId){
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    computeDistance(x1, y1, x2, y2){

        const distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return distance;
    }
}