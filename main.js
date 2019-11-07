// ***************** Global vars
var plus = [1, 2, 3];
var zero = [0, 0, 0];
var minus = [-1, -2, -3];

var iterations = {
    i: [plus, plus, zero, minus, minus, minus, zero, plus],
    j: [zero, minus, minus, minus, zero, plus, plus, plus]
}



// ***************** Constructors

function Game() {
    var game = {};

    game.playBoard = [];
    game.player1 = {
        name: "",
        number: 1,
        color: 'red',
        score: 0,
        start: true
    }
    game.player2 = {
        name: "",
        number: 2,
        color: 'yellow',
        score: 0,
        start: false
    }
    game.totalPlays = 42;


    game.initialize = initialize;
    game.addValue = addValue;
    game.check = check;
    game.updateScore = updateScore;
    game.currentPlayer = currentPlayer;
    //game.play = play;

    return game;
}

var initialize = function() {
    this.playBoard = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]

    /*var columns = [];
    for (var i = 0 ; i < 6 ; i++){
        columns[i] = 0
    }
    for (var i = 0 ; i < 7 ; i++) {
        this.playBoard[i] = columns
    }*/
    this.totalPlays = 42;
}

var addValue = function(number, column) {
    var boo = true;
    for (var i = this.playBoard.length - 1; i >= 0; i--) {
        if (this.playBoard[i][column] === 0) {
            this.playBoard[i][column] = number
            boo = false; // full colun
            break;
        }
    }
    if (!boo) {
        // handle full columns
    }

}



var check = function() {
    for (var i = this.playBoard.length - 1; i >= 0; i--) {
        for (var j = this.playBoard[i].length - 1; j >= 0; j--) {
            for (var k = 0; k < 8; k++) {
                var boo = true

                var iIndexes = iterations.i[k].map(x => x + i);
                var jIndexes = iterations.j[k].map(x => x + j);


                for (var l = 0; l < iIndexes.length; l++) {
                    if ((iIndexes[l] < 0) || (jIndexes[l] < 0) || (iIndexes[l] >= this.playBoard.length) || (jIndexes >= this.playBoard[i].length)) {
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
                if ((this.playBoard[i][j] !== 0) && (this.playBoard[i][j] === this.playBoard[iIndexes[0]][jIndexes[0]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[1]][jIndexes[1]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[2]][jIndexes[2]])) {

                    console.log("there is a correct answer")
                }
            }
            console.log("no correct answer")
        }
    }
}

var updateScore = function(n) {
    if (n === 1) {
        this.player1.score++;
        alert(this.player1.name + " wins!");

    } else {
        this.player2.score++;
        alert(this.player2.name + " wins!");
    }
    this.initialize();
}

var currentPlayer = function() {
    this.player1.start = !this.player1.start
    this.player2.start = !this.player2.start
}

/*
var play = function() {
    $column.on('click', function() {

        
        //switch player
        //check
        // if true update score
        //else keep playing




    })
}*/




newGame = Game();
newGame.initialize();
console.table(newGame.playBoard);
newGame.addValue(1, 2)
newGame.addValue(1, 1)
newGame.addValue(1, 2)
newGame.addValue(1, 2)
newGame.addValue(1, 2)