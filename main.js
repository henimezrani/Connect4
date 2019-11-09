// **************** Global and temporary variables

//Used for the check function after coming up with the algorithm
var plus = [1, 2, 3];
var zero = [0, 0, 0];
var minus = [-1, -2, -3];
var iterations = {
    i: [plus, plus, zero, minus, minus, minus, zero, plus],
    j: [zero, minus, minus, minus, zero, plus, plus, plus]
}

// Temporary vars
var nbrCols;
var nbrRows;

// ***************** Contructors

//Used to create two instances of the object player 
function Player(name, number, color) {
    var player = {};

    player.name = name,
        player.number = number,
        player.color = color,
        player.score = 0

    return player;
}

// Contains all the methods for the game
function Game(player1name, player1color, player2name, player2color) {
    var game = {};

    // Properties

    game.playBoard = []; // 2-dimentional array representing the playBoard
    game.player1 = Player(player1name, 1, validateColor(player1color, "yellow"));
    game.player2 = Player(player2name, 2, validateColor(player2color, "red"));
    game.currentPlayer; // takes the current player as object

    // Methods

    game.initialize = initialize; // initialize the playBoard to all 0 depending on the nbr of rows and columns
    game.addValue = addValue; // add a value to the board, visually and on the matrix as well
    game.check = check; // checks if the condition is fulfilles after each move
    game.updateScore = updateScore; // update the score if check if true 
    game.updateCurrentPlayer = updateCurrentPlayer; // update current player after each turn
    game.play = play; // play the actual game

    return game;
}

// ****************** Methods for the constructors

var initialize = function(nCols, nRows) {
    this.playBoard = [];
    $('#playBoard').html('');
    $('#prePlayBoard').html('');
    this.currentPlayer = this.player1;
    for (var i = 0; i < nCols; i++) {
        $('#prePlayBoard').append('<div class="precolumn" id="pre' + i + '"></div>')
        for (var j = -1; j < 0; j++) {
            $('#pre' + i).append('<div class="prerow" id="pre' + i + 'r' + j + '"><div>')
        }
    }
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

}

var addValue = function(column) {

    var canAdd = false;
    for (var i = this.playBoard.length - 1; i >= 0; i--) {
        if (this.playBoard[i][column] === 0) {
            console.log(this.currentPlayer.number)
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
                    if (this.playBoard[i][j] !== 0) {
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

    this.initialize(nbrCols, nbrRows);

    $("#score1").text(newGame.player1.score)
    $("#score2").text(newGame.player2.score)
    this.play();
}

var updateCurrentPlayer = function() {
    if (this.currentPlayer === this.player1) {
        this.currentPlayer = this.player2;
        $("#p1stats").css("background-color", "white")
        $("#p2stats").css("background-color", newGame.player2.color)
    } else {
        this.currentPlayer = this.player1;
        $("#p1stats").css("background-color", newGame.player1.color)
        $("#p2stats").css("background-color", "white")
    }

}

var play = function() {
    var that = this
    $('.column').on('click', function() {
        that.addValue($(this).attr('id'));
        that.check();
    })



    $('.column').mouseover(function() {
        $('#pre' + $(this).attr('id') + 'r-1').css('background-color', newGame.currentPlayer.color)
    })

    $('.column').mouseout(function() {
        $('#pre' + $(this).attr('id') + 'r-1').css('background-color', "transparent")
    })


    $('#updateSize').on('click', function() {
        nbrCols = $('#columns').val()
        nbrRows = $('#rows').val()
        that.initialize(nbrCols, nbrRows)
    })
}


// BONUS ****************** The user can choose any color he wants

function validateColor(input, defaultVal) {
    var colorValidation = ["Pink", "LightPink", "HotPink", "DeepPink", "PaleVioletRed", "MediumVioletRed", "LightSalmon", "Salmon", "DarkSalmon", "LightCoral", "IndianRed", "Crimson", "Firebrick", "DarkRed", "Red",
        "OrangeRed", "Tomato", "Coral", "DarkOrange", "Orange", "Yellow", "LightYellow", "LemonChiffon", "LightGoldenrodYellow ", "PapayaWhip", "Moccasin", "PeachPuff", "PaleGoldenrod", "Khaki", "DarkKhaki", "Gold",
        "Cornsilk", "BlanchedAlmond", "Bisque", "NavajoWhite", "Wheat", "Burlywood", "Tan", "RosyBrown", "SandyBrown", "Goldenrod", "DarkGoldenrod", "Peru", "Chocolate", "SaddleBrown", "Sienna", "Brown", "Maroon",
        "DarkOliveGreen", "Olive", "OliveDrab", "YellowGreen", "LimeGreen", "Lime", "LawnGreen", "Chartreuse", "GreenYellow", "SpringGreen", "MediumSpringGreen ", "LightGreen", "PaleGreen", "DarkSeaGreen", "MediumAquamarine",
        "MediumSeaGreen", "SeaGreen", "ForestGreen", "Green", "DarkGreen", "Aqua", "Cyan", "LightCyan", "PaleTurquoise", "Aquamarine", "Turquoise", "MediumTurquoise", "DarkTurquoise", "LightSeaGreen", "CadetBlue",
        "DarkCyan", "Teal", "LightSteelBlue", "PowderBlue", "LightBlue", "SkyBlue", "LightSkyBlue", "DeepSkyBlue", "DodgerBlue", "CornflowerBlue", "SteelBlue", "RoyalBlue", "Blue", "MediumBlue", "DarkBlue", "Navy",
        "MidnightBlue", "Lavender", "Thistle", "Plum", "Violet", "Orchid", "Fuchsia", "Magenta", "MediumOrchid", "MediumPurple", "BlueViolet", "DarkViolet", "DarkOrchid", "DarkMagenta", "Purple", "Indigo", "DarkSlateBlue",
        "SlateBlue", "MediumSlateBlue ", "White", "Snow", "Honeydew", "MintCream", "Azure", "AliceBlue", "GhostWhite", "WhiteSmoke", "Seashell", "Beige", "OldLace", "FloralWhite", "Ivory", "AntiqueWhite", "Linen",
        "LavenderBlush", "MistyRose", "Gainsboro", "LightGray", "Silver", "DarkGray", "Gray", "DimGray", "LightSlateGray", "SlateGray", "DarkSlateGray", "Black"
    ].map(x => x.toLowerCase());
    var hexValidation = ["a", "b", "c", "d", "e", "f", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].join('')

    var hex = true;
    var htmlColor = true;
    for (var i = 1; i < input.length; i++) {
        if (hexValidation.indexOf(input[i].toLowerCase()) < 0) {
            hex = false;
        }
        if (!((input.length === 7 || input.length === 4) && (input[0] === "#"))) {
            hex = false;
        }
    }

    if (colorValidation.indexOf(input) < 0) {
        htmlColor = false;
    }

    if (hex || htmlColor) {
        return input;
    }
    return defaultVal;
}

// ****************** Execution upon click on "Play"
var player1name;
var player1color;
var player2name;
var player2color;
var nbrCols;
var nbrRows;
$('#startGame').on("click", function() {
    player1name = $('#player1name').val()
    player1color = $('#player1color').val()
    player2name = $('#player2name').val()
    player2color = $('#player2color').val()
    newGame = Game(player1name, player1color, player2name, player2color);

    nbrCols = $('#columns').val()
    nbrRows = $('#rows').val()

    newGame.initialize(nbrCols, nbrRows)

    $("#p1stats").css("border-color", newGame.player1.color)
    $("#p2stats").css("border-color", newGame.player2.color)
    $("#p1stats").append('<h3>' + newGame.player1.name + '</h3>')
    $("#p2stats").append('<h3>' + newGame.player2.name + '</h3>')
    $("#p1stats").append('<h5>Score: <h5 id="score1">' + newGame.player1.score + '</h5></h5>')
    $("#p2stats").append('<h5>Score: <h5 id="score2">' + newGame.player2.score + '</h5></h5>')
    $("#p1stats").css("background-color", newGame.player1.color)

    $('#welcome').hide()
    newGame.play();
})