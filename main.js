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

function Player(name, number, color){
    var player = {};

    player.name = name,
    player.number = number,
    player.color = color,
    player.score = 0

    return player;
}





// ***************** Constructors

function Game() {
    var game = {};

    game.playBoard = [];
    game.player1 = Player("Heni", 1, "yellow");
    game.player2 = Player("Opponent", 2, "red");
    game.totalPlays = 42;
    game.currentPlayer; // true when player one turn

    game.initialize = initialize;
    game.addValue = addValue;
    game.check = check;
    game.updateScore = updateScore;

    game.updateCurrentPlayer = updateCurrentPlayer;
    //game.play = play;

    return game;
}

var initialize = function(nCols, nRows) {
    this.playBoard = [];
    $('#playBoard').html('');
    for (var i = 0; i < nRows; i++) {
        var tmpArr = []
        for (var j = 0; j < nCols; j++) {
            tmpArr.push(0);

        }
        this.playBoard.push(tmpArr);
    }
    for (var i = 0; i < nCols; i++) {
        $('#playBoard').append('<div class="column" id="' + i + '"></div>')
        for (var j = 0; j < nRows; j++) {
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

    var canAdd = false;
    for (var i = this.playBoard.length - 1; i >= 0; i--) {
        if (this.playBoard[i][column] === 0) {
            this.playBoard[i][column] = this.currentPlayer.number;
            canAdd = true; // full colun
            $('#c' + column + 'r' + i).css('background-color', this.currentPlayer.color)
            break;
        }
    }
    if (!canAdd) {
        alert("column full");
        updateCurrentPlayer();
    }
    console.log("updating")
    updateCurrentPlayer();

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

                for (var l = 0; l < iIndexes.length; l++) {
                    if ((iIndexes[l] < 0) || (jIndexes[l] < 0) || (iIndexes[l] >= this.playBoard.length) || (jIndexes >= this.playBoard[i].length)) {
                        boo = false;
                    }
                }

                if (!boo) {
                    breaking++

                } else if ((this.playBoard[i][j] === this.playBoard[iIndexes[0]][jIndexes[0]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[1]][jIndexes[1]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[2]][jIndexes[2]])) {
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
    this.currentPlayer.score++;
    alert(this.currentPlayer.name + " wins!");
    this.initialize(7,6);
}

var updateCurrentPlayer = function() {
    if (this.currentPlayer === this.player1) {
        this.currentPlayer = this.player2;
    } else {
        this.currentPlayer = this.player1;
    }
    
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

$('.column').on('click', function() {
    newGame.addValue($(this).attr('id'));
    if (newGame.check()) {
        newGame.updateScore();
    }
    
})

$('#changeSize').on('click', function() {
    //Make window aprear
    // choose new size
})

$('#updateSize').on('click', function() {
    var newCol = $('#changeCols').val()
    var newRows = $('#changeCols').val()
    newGame.initialize(newCol,newRows)
})
