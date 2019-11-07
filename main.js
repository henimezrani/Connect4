// ***************** Global vars
var plus = [1,2,3];
var zero = [0,0,0];
var minus = [-1,-2,-3];

var iterations = {
    i: [plus, plus, zero, minus, minus, minus, zero, plus],
    j: [zero, minus, minus, minus, zero, plus, plus, plus]
}



// ***************** Constructors

function Game(){
    var game = {};

    game.playBoard = [];

    game.initialize = initialize;
    game.addValue = addValue;
    game.check = check;
    return game;
}

var initialize = function() {

    this.playBoard = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]
    /*var columns = [];
    for (var i = 0 ; i < 6 ; i++){
        columns[i] = 0
    }
    for (var i = 0 ; i < 7 ; i++) {
        this.playBoard[i] = columns
    }*/
}

var addValue = function(number, column) {
    for (var i = this.playBoard.length; i >= 0; i--) {
        if (this.playBoard[i][column] === 0){
            this.playBoard[i][column] = number
            break;  
        }
    }
}



var check = function(){
    for (var i = this.playBoard.length; i >= 0; i--) {
        for (var j = this.playBoard[i].length; j >= 0; j--) {
            for(var k = 0 ; k < 8 ; k++) {
                

                var iIndexes = iterations.i[k].map(x => x + i);
                var jIndexes = iterations.j[k].map(x => x + j);


                for (var l = 0 ; l < iIndexes.length ; l++){
                    if ( (iIndexes[l] < 0) || (jIndexes[l] < 0) || (iIndexes[l] >= this.playBoard.length) || (jIndexes >=this.playBoard[i].length) ){
                        boo = false;
                    }
                }

                if (!boo) {
                    break;
                }

                /*********** Another method to keep in mind

                jIndexes.filter(x => x<0)
                iIndexes.filter(x => x>=this.playBoard.length)
                jIndexes.filter(x => x<0)
                jIndexes.filter(x => x>=this.playBoard[i].length)

                */

                if ( (this.playBoard[i][j] === this.playBoard[iIndexes[0]][jIndexes[0]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[1]][jIndexes[1]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[2]][jIndexes[2]]) ){
                    console.log("there is a correct answer")
                }
            }
            console.log("no correct answer")
        }
    }
}


newGame = Game();
newGame.initialize();
console.table(newGame.playBoard);

