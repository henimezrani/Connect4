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

function Game(player1name,player1color,player2name,player2color) {
    var game = {};

    game.playBoard = [];
    game.player1 = Player(player1name, 1, validateColor(player1color,"yellow"));
    game.player2 = Player(player2name, 2, validateColor(player2color,"red"));
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
    this.currentPlayer = this.player1;

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
        return;
    }
    this.check();

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

                if (boo && (this.playBoard[i][j] === this.playBoard[iIndexes[0]][jIndexes[0]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[1]][jIndexes[1]]) && (this.playBoard[i][j] === this.playBoard[iIndexes[2]][jIndexes[2]])) {
                    if (this.playBoard[i][j] !== 0){
                        this.updateScore();
                    }
                }
                
            }
        }
    }
    this.updateCurrentPlayer();
    return false;
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


newGame = Game("Heni", "blue", "opponent", "hur");
newGame.initialize(7, 6);
console.table(newGame.playBoard);

$('.column').on('click', function() {
    newGame.addValue($(this).attr('id'));
    
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

function validateColor(input,defaultVal){
    var colorValidation = ["Pink", "LightPink", "HotPink", "DeepPink", "PaleVioletRed", "MediumVioletRed", "LightSalmon", "Salmon", "DarkSalmon", "LightCoral", "IndianRed", "Crimson", "Firebrick", "DarkRed", "Red", 
    "OrangeRed", "Tomato", "Coral", "DarkOrange", "Orange", "Yellow", "LightYellow", "LemonChiffon", "LightGoldenrodYellow ", "PapayaWhip", "Moccasin", "PeachPuff", "PaleGoldenrod", "Khaki", "DarkKhaki", "Gold", 
    "Cornsilk", "BlanchedAlmond", "Bisque", "NavajoWhite", "Wheat", "Burlywood", "Tan", "RosyBrown", "SandyBrown", "Goldenrod", "DarkGoldenrod", "Peru", "Chocolate", "SaddleBrown", "Sienna", "Brown", "Maroon", 
    "DarkOliveGreen", "Olive", "OliveDrab", "YellowGreen", "LimeGreen", "Lime", "LawnGreen", "Chartreuse", "GreenYellow", "SpringGreen", "MediumSpringGreen ", "LightGreen", "PaleGreen", "DarkSeaGreen", "MediumAquamarine", 
    "MediumSeaGreen", "SeaGreen", "ForestGreen", "Green", "DarkGreen", "Aqua", "Cyan", "LightCyan", "PaleTurquoise", "Aquamarine", "Turquoise", "MediumTurquoise", "DarkTurquoise", "LightSeaGreen", "CadetBlue", 
    "DarkCyan", "Teal", "LightSteelBlue", "PowderBlue", "LightBlue", "SkyBlue", "LightSkyBlue", "DeepSkyBlue", "DodgerBlue", "CornflowerBlue", "SteelBlue", "RoyalBlue", "Blue", "MediumBlue", "DarkBlue", "Navy", 
    "MidnightBlue", "Lavender", "Thistle", "Plum", "Violet", "Orchid", "Fuchsia", "Magenta", "MediumOrchid", "MediumPurple", "BlueViolet", "DarkViolet", "DarkOrchid", "DarkMagenta", "Purple", "Indigo", "DarkSlateBlue", 
    "SlateBlue", "MediumSlateBlue ", "White", "Snow", "Honeydew", "MintCream", "Azure", "AliceBlue", "GhostWhite", "WhiteSmoke", "Seashell", "Beige", "OldLace", "FloralWhite", "Ivory", "AntiqueWhite", "Linen", 
    "LavenderBlush", "MistyRose", "Gainsboro", "LightGray", "Silver", "DarkGray", "Gray", "DimGray", "LightSlateGray", "SlateGray", "DarkSlateGray", "Black"].map( x => x.toLowerCase());
    var hexValidation = ["a", "b", "c", "d", "e", "f", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].join('')

    var hex = true;
    var htmlColor = true;
    for (var i = 1 ; i < input.length ; i++) {
        if (hexValidation.indexOf(input[i].toLowerCase()) < 0) {
            hex = false;
        }
        if ( !( (input.length === 7 || input.length === 4) && (input[0] === "#") ) ) {
            hex = false;
        }
    }

    if (colorValidation.indexOf(input) < 0){
        htmlColor = false;
    }

    if (hex || htmlColor){
        return input;
    }
    return defaultVal;

}