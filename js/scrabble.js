/* Jason Lazera (Scrabble javascript)
Jason_lazera@student.uml.edu */

/* Using prof Professor Heines Website for associative array and images
   Link to array  https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-lecs/lecture26.jsp
   Link to tiles  https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Tiles.zip*/
var game_tiles = [] ;
game_tiles["A"] = { "value" : 1,  "original" : 9,  "remaining" : 9  } ;
game_tiles["B"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
game_tiles["C"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
game_tiles["D"] = { "value" : 2,  "original" : 4,  "remaining" : 4  } ;
game_tiles["E"] = { "value" : 1,  "original" : 12, "remaining" : 12 } ;
game_tiles["F"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
game_tiles["G"] = { "value" : 2,  "original" : 3,  "remaining" : 3  } ;
game_tiles["H"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
game_tiles["I"] = { "value" : 1,  "original" : 9,  "remaining" : 9  } ;
game_tiles["J"] = { "value" : 8,  "original" : 1,  "remaining" : 1  } ;
game_tiles["K"] = { "value" : 5,  "original" : 1,  "remaining" : 1  } ;
game_tiles["L"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
game_tiles["M"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
game_tiles["N"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
game_tiles["O"] = { "value" : 1,  "original" : 8,  "remaining" : 8  } ;
game_tiles["P"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
game_tiles["Q"] = { "value" : 10, "original" : 1,  "remaining" : 1  } ;
game_tiles["R"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
game_tiles["S"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
game_tiles["T"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
game_tiles["U"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
game_tiles["V"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
game_tiles["W"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
game_tiles["X"] = { "value" : 8,  "original" : 1,  "remaining" : 1  } ;
game_tiles["Y"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
game_tiles["Z"] = { "value" : 10, "original" : 1,  "remaining" : 1  } ;
game_tiles["["] = { "value" : 0,  "original" : 2,  "remaining" : 2  } ;

//player rack initialized as an array
var game_rack = [];

var table_keys = Object.keys( game_tiles ).length;
var rack_keys = Object.keys( game_rack ).length;

//player score is initialized at 0 every single game
var game_score = 0;

//allows me to see if there are tiles existing in a position on the game board
var tile_exist = [false, false, false, false, false, false, false, false];

//random number is picked to decide which tile should be generated
function random_tile(){
    return Math.floor((Math.random() * 27));
}

//rack is built in this function
function rack_build(){

    var STARTING_TILE_MAX = 7;
    var rack_count = 1;
    var src;
    var id;
    var title;
    var tileClass = "game_tile";

    tile_exist = [false, false, false, false, false, false, false, false];
    $('#rack_div div').empty();

    for( var i = 0; rack_count <= STARTING_TILE_MAX; i++) {

        var randTile = random_tile();

        //Check if tile has any remaining and check if there is any tiles left in the board
        //If no tiles left then quit trying to add.
        if( game_tiles[ String.fromCharCode(65 + randTile) ][ "remaining"] !== 0 && remaining_tiles()){

            game_rack[rack_count] = {"letter" : String.fromCharCode(65 + randTile),"value" : game_tiles[ String.fromCharCode(65 + randTile) ][ "value" ]};
            game_tiles[ String.fromCharCode(65 + randTile) ][ "remaining"]--;
            rack_keys = Object.keys( game_rack ).length;

            id = "tile" + rack_count;
            title = game_rack[rack_count][ "letter" ];
            src = "/img/Scrabble_Tile_" + game_rack[rack_count][ "letter" ] + ".jpg";

            $('#game_rack').prepend($('<img>',{id:id,src:src,class:tileClass,title:title}));
            rack_count++;
        }

        if(remaining_tiles() == false ) {
            $('#tileButtonDiv').append("<p id='noTileLeft'>No Tiles Left</p>");
            $("#new_tile").prop("disabled",true);

            //tile_print();

            return;
        }

        $("#" + id).draggable({ snap: ".boardTile, .trashTile", snapMode: "inner"});
    }
    score_update();
}

//finds out if any tile remain in the data structure
function remaining_tiles() {

    var tile_exist = false;
    var offset = 0;

    while( offset < 27 ) {

        if(game_tiles[ String.fromCharCode(65 + offset) ][ "remaining" ] !== 0) {
            tile_exist = true;
        }
        offset++;
    }

    return tile_exist;
}

//function
function dropped_tile(event, ui) {

    if(tile_exist[$(this).attr("id") -1] == false && $(this).attr("title") === 'doubleLetter'){
        game_score += (game_tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2 );
    }
    else if(tile_exist[$(this).attr("id") -1] == false && $(this).attr("title") === 'tripleLetter'){
        game_score += (game_tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 3 );
    }
    else if(tile_exist[$(this).attr("id") -1] == false && $(this).attr("title") === 'blank'){
        game_score += (game_tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] );
    }
    else if(tile_exist[$(this).attr("id") -1] == false && $(this).attr("title") === 'doubleWord'){

        game_score = ((game_score + game_tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] ) * 2 );
    }

    tile_exist[$(this).attr("id") -1 ] = true;

    score_update();

}

// function determines what will happen when a tile is removed 
function remove_tile(event, ui) {

    if(tile_exist[$(this).attr("id") -1] == true && $(this).attr("title") === 'doubleLetter'){
        game_score -= (game_tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2 );
    }
    else if(tile_exist[$(this).attr("id") -1] == true && $(this).attr("title") === 'tripleLetter'){
        game_score -= (game_tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 3 );
    }
    else if(tile_exist[$(this).attr("id") -1] == true && $(this).attr("title") === 'blank'){
        game_score -= (game_tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] );
    }
    else if(tile_exist[$(this).attr("id") -1] == true && $(this).attr("title") === 'doubleWord'){
        game_score = (( game_score / 2) - (game_tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] ));
    }

    tile_exist[$(this).attr("id") -1 ] = false;

    score_update();
}


//function to reset the game board
function reset() {

    var STARTING_TILE_MAX = 7;
    var rack_count = 1;
    var src;
    var id;
    var title;
    var tileClass = "game_tile";

    tile_exist = [false, false, false, false, false, false, false, false];
    $('#rack_div div').empty();

    for( var i = 0; rack_count <= STARTING_TILE_MAX; i++) {

        var randTile = random_tile();

        //Check if tile has any remaining and check if there is any tiles left in the board
        //If no tiles left then quit trying to add.
        if( game_tiles[ String.fromCharCode(65 + randTile) ][ "remaining"] !== 0 && remaining_tiles()){

            game_rack[rack_count] = {"letter" : String.fromCharCode(65 + randTile),"value" : game_tiles[ String.fromCharCode(65 + randTile) ][ "value" ]};
            game_tiles[ String.fromCharCode(65 + randTile) ][ "remaining"]--;
            rack_keys = Object.keys( game_rack ).length;

            id = "tile" + rack_count;
            title = game_rack[rack_count][ "letter" ];
            src = "/img/Scrabble_Tile_" + game_rack[rack_count][ "letter" ] + ".jpg";

            $('#game_rack').prepend($('<img>',{id:id,src:src,class:tileClass,title:title}));
            rack_count++;
        }

        if(remaining_tiles() == false ) {
            $('#tileButtonDiv').append("<p id='noTileLeft'>No Tiles Left</p>");
            $("#new_tile").prop("disabled",true);

            //tile_print();

            return;
        }

        $("#" + id).draggable({ snap: ".boardTile, .trashTile", snapMode: "inner"});
    }

    $("#new_tile").prop("disabled",false);
    $('#noTileLeft').remove();

    for ( k = 0 ; k < table_keys ; k++ ) {
        game_tiles[ String.fromCharCode(65 + k) ][ "remaining"] = game_tiles[ String.fromCharCode(65 + k) ][ "original" ];
    }

    game_score = 0;

    score_update();
    tile_print();
    rack_build();
}

// function updates the score 
function score_update(){

    $('#score_board').text(game_score);
    tile_update();
}

function tile_removed( event, ui ){

    //deletes and adds tiles back to remaining
    game_tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "remaining"]++;

    var split = ui.draggable.attr("id").split("");
    var randTile;

    while(1) {

        randTile = random_tile();

        //contantly check to see remaining tiles to determine playability
        if( game_tiles[ String.fromCharCode(65 + randTile) ][ "remaining"] ) {

            game_rack[split[4]] = {"letter" : String.fromCharCode(65 + randTile),"value" : game_tiles[ String.fromCharCode(65 + randTile) ][ "value" ]};
            game_tiles[ String.fromCharCode(65 + randTile) ][ "remaining"]--;

            var id = "tile" + split[4];
            var title = game_rack[split[4]][ "letter" ];
            var src = "/img/Scrabble_Tile_" + game_rack[split[4]][ "letter" ] + ".jpg";

            break;
        }
    }

    //tile dropped in the trash is removed
    $('#' + ui.draggable.attr("id")).remove();

    //new tile is appended to the rack
    $('#game_rack').append($('<img>',{id:id,src:src,class:"game_tile",title:title}));

    //the new tile is made draggable
    $("#" + id).draggable({ snap: ".boardTile, .trashTile", snapMode: "inner"});

    tile_update();
}


//updates the remaining amount of tiles left in the game 
function tile_update() {

    var temp;

    for ( k = 0 ; k < table_keys ; k++ ) {

        temp = String.fromCharCode(65 + k);
        //Had to use this because apparently jQuery cant take an ID that starts like #[ only #a-z

        if( temp == "[") {
            temp = "ZZ";
        }

        $("#" + temp).text(game_tiles[ String.fromCharCode(65 + k)]["remaining"]);
    }
}


//runs when webpage is laoded 
$(document).ready(function(){

    //build initial rack
    rack_build();

    //gameboard can now accept tiles
    $(".boardTile").droppable({ drop: dropped_tile, out: remove_tile });

    //trash can now accept tiles
    $(".trashTile").droppable({ drop: tile_removed });

});
