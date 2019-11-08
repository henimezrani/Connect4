// On hover on column add buttons on top that take color when column on hover




//$('#game').hide()
$('#winner').hide()
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
        color: 'yellow',
        score: 0
    }
    game.player2 = {
        name: "",
        number: 2,
        color: 'red',
        score: 0
    }
    game.totalPlays = 42;
    game.currentPlayer = true; // true when player one turn

    game.initialize = initialize;
    game.addValue = addValue;
    game.check = check;
    game.updateScore = updateScore;

    game.updateCurrentPlayer = updateCurrentPlayer;
    //game.play = play;

    return game;
}

var initialize = function(nCols, nRows) {
    for (let i = 0; i < nRows; i++) {
        var tmpArr = []
        for (let j = 0; j < nCols; j++) {
            tmpArr.push(0);

        }
        this.playBoard.push(tmpArr);
    }
    for (let i = 0; i < nCols; i++) {
        $('#playBoard').append('<div class="column" id="' + i + '"></div>')
        for (let j = 0; j < nRows; j++) {
            $('#' + i).append('<div class="row" id="c' + i + 'r' + j + '"><div>')
        }
    }

    /*this.playBoard = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]*/

    /*var columns = [];
    for (var i = 0 ; i < 6 ; i++){
        columns[i] = 0
    }
    for (var i = 0 ; i < 7 ; i++) {
        this.playBoard[i] = columns
    }*/


    this.totalPlays = nRows * nCols;
}

var addValue = function(column) {
    var number = 2;
    if (this.currentPlayer){
        number = 1;
    }
    var canAdd = false;
    for (var i = this.playBoard.length - 1; i >= 0; i--) {
        if (this.playBoard[i][column] === 0) {
            this.playBoard[i][column] = number
            canAdd = true; // full colun
            if (this.currentPlayer){
                $('#c' + column + 'r' + i).css('background-color', this.player1.color)
            } else {
                $('#c' + column + 'r' + i).css('background-color', this.player2.color)
            }
            break;
        }
    }
    if (!canAdd) {
        alert('full column')
    }
    this.currentPlayer = !this.currentPlayer;

}



var check = function() {
    var count =0;
    var total = 0;
    var breaking =  0
    for (var i = this.playBoard.length - 1; i >= 0; i--) {
        for (var j = this.playBoard[i].length - 1; j >= 0; j--) {
            for (var k = 0; k < 8; k++) {
                total ++;
                var boo = true

                var iIndexes = iterations.i[k].map(x => x + i);
                var jIndexes = iterations.j[k].map(x => x + j);

                console.log(i,j,iIndexes,jIndexes)
                for (var l = 0; l < iIndexes.length; l++) {
                    if ((iIndexes[l] < 0) || (jIndexes[l] < 0) || (iIndexes[l] >= this.playBoard.length) || (jIndexes >= this.playBoard[i].length)) {
                        boo = false;
                    }
                }

                if (!boo) {
                    console.log("breaking")
                    breaking++

                } else if ((this.playBoard[i][j] === this.playBoard[iIndexes[0]][jIndexes[0]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[1]][jIndexes[1]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[2]][jIndexes[2]])) {
                    console.log(this.playBoard[i][j])
                    count++;
                    if (this.playBoard[i][j] !== 0){
                        return true;
                    }
                }
                
            }
        }
    }-
    console.log("should test " + total)
    console.log("tested " + count)
    console.log("breaking " + breaking)
    return false
}

var updateScore = function() {
    if (this.currentPlayer) {
        this.player1.score++;
        alert(this.player1.name + " wins!");

    } else {
        this.player2.score++;
        alert(this.player2.name + " wins!");
    }
    this.initialize();
}

var updateCurrentPlayer = function() {
    this.currentPlayer = !this.currentPlayer;
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
newGame.initialize(7, 6);
console.table(newGame.playBoard);
