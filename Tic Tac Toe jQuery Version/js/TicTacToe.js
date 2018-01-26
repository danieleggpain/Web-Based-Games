var board = ["0","0","0","0","0","0","0","0","0"];
var Xclick = "0";
var Xvictory = "0";
var Ovictory = "0";
var finished = "0";

var dialog;
$(document).ready(function() {
    

    dialog = $( "#dialogGameOver" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Okay": function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        //alert("hi");
      }
    });
    

    $("td").each(function() {
        $(this).hover(function() {
            var x;
            for (var i = 0; i < board.length; i++) {
                if (this.id.indexOf(i)!=-1) {
                    x = i;
                }        
            }
            if (board[x] == 0) {
                this.style['border-color'] = 'green'; 
            }else if (board[x] == 1 || board[x] == -1) {
                this.style['border-color'] = 'red'; 
            }
        
        }, function() {
            this.style['border-color'] = 'black';
        });

        $(this).click(function() {
            if (finished == 0) {
                var x = -1;
                for (var i = 0; i < board.length; i++) {
                    if (this.id.indexOf(i) != -1) {
                        if (board[i] == 0) {
                            x = i;
                            if (Xclick == 0) {
                                board[i] = -1;
                            }
                            else {
                                board[i] = 1;
                            }
                        }
                    }
                }

                if (x != -1) {
                    if (Xclick == 0) {
                        this.className = "xBlocks";
                    }
                    else {
                        this.className = "oBlocks";
                    }
        
                    if (Xclick == 0) {
                        Xclick = 1;
                        $("#player").text(content = "O");
                    }
                    else if (Xclick == 1) {
                        Xclick = 0;
                        $("#player").text(content = "X");
                    }
                }

                checkVictory();
            }
        });
    });
});


function playAgain() {
    finished = 0;
    $("td").each(function() {
        this.className = "reset";
    });
    Xclick = 0;
    for (var i = 0; i < board.length; i++) {
        board[i] = 0;
    }
}

function checkVictory() {
    var winner = -1;
    if (board[0] == board[1]) {
        if (board[0] == board [2]) {
            winner = 0;
            if (board[0] == -1) {
                finished = 1;
                $("#winMessage").text(Content = "X won this game!");
                dialog.dialog( "open" );
                Xvictory++;
                $("#xWin").text(Content = Xvictory);
            }else if (board[0] == 1) {
                finished = 1;
                $("#winMessage").text(Content = "O won this game!")
                dialog.dialog( "open" );
                Ovictory++;
                $("#oWin").text(Content = Ovictory);
            }
        }
    }

    if (board[3] == board[4]) {
        if (board[4] == board[5]) {
            winner = 0;
            if (board[3] == -1) {
                finished = 1;
                $("#winMessage").text(Content = "X won this game!") 
                dialog.dialog( "open" );
                Xvictory++;
                $("#xWin").text(Content = Xvictory);
            }else if (board[3] == 1) {
                finished = 1;
                $("#winMessage").text(Content = "O won this game!")
                dialog.dialog( "open" );
                Ovictory++;
                $("#oWin").text(Content = Ovictory);
            }
        }
    }

    if (board[6] == board[7]) {
        if (board[7] == board[8]) {
            winner = 0;
            if (board[6] == -1) {
                finished = 1;
                $("#winMessage").text(Content = "X won this game!")
                dialog.dialog( "open" );
                Xvictory++;
                $("#xWin").text(Content = Xvictory);
            }else if (board[6] == 1) {
                finished = 1;
                $("#winMessage").text(Content = "O won this game!")
                dialog.dialog( "open" );
                Ovictory++;
                $("#oWin").text(Content = Ovictory);
            }
        }
    }

    if (board[0] == board[3]) {
        if (board[3] == board[6]) {
            winner = 0;
            if (board[0] == -1) {
                finished = 1;
                $("#winMessage").text(Content = "X won this game!")
                dialog.dialog( "open" );
                Xvictory++;
                $("#xWin").text(Content = Xvictory);
            }else if (board[0] == 1) {
                finished = 1;
                $("#winMessage").text(Content = "O won this game!")
                dialog.dialog( "open" );
                Ovictory++;
                $("#oWin").text(Content = Ovictory);
            }
        }
    }

    if (board[1] == board[4]) {
        if (board[4] == board[7]) {
            winner = 0;
            if (board[1] == -1) {
                finished = 1;
                $("#winMessage").text(Content = "X won this game!")
                dialog.dialog( "open" );
                Xvictory++;
                $("#xWin").text(Content = Xvictory);
            }else if (board[1] == 1) {
                finished = 1;
                $("#winMessage").text(Content = "O won this game!")
                dialog.dialog( "open" );
                Ovictory++;
                $("#oWin").text(Content = Ovictory);
            }
        }
    }

    if (board[2] == board[5]) {
        if (board[5] == board[8]) {
            winner = 0;
            if (board[2] == -1) {
                finished = 1;
                $("#winMessage").text(Content = "X won this game!")   
                dialog.dialog( "open" );
                Xvictory++;
                $("#xWin").text(Content = Xvictory);
            }else if (board[2] == 1) {
                finished = 1;
                $("#winMessage").text(Content = "O won this game!")
                dialog.dialog( "open" );
                Ovictory++;
                $("#oWin").text(Content = Ovictory);
            }
        }
    }

    if (board[0] == board[4]) {
        if (board[4] == board[8]) {
            winner = 0;
            if (board[0] == -1) {
                finished = 1;
                $("#winMessage").text(Content = "X won this game!")
                dialog.dialog( "open" );
                Xvictory++;
                $("#xWin").text(Content = Xvictory);
            }else if (board[0] == 1) {
                finished = 1;
                $("#winMessage").text(Content = "O won this game!")
                dialog.dialog( "open" );
                Ovictory++;
                $("#oWin").text(Content = Ovictory);
            }
        }
    }

    if (board[2] == board[4]) {
        if (board[4] == board[6]) {
            winner = 0;
            if (board[2] == -1) {
                finished = 1;
                $("#winMessage").text(Content = "X won this game!")
                dialog.dialog( "open" );
                Xvictory++;
                $("#xWin").text(Content = Xvictory);
            }else if (board[2] == 1) {
                finished = 1;
                $("#winMessage").text(Content = "O won this game!")
                dialog.dialog( "open" );
                Ovictory++;
                $("#oWin").text(Content = Ovictory);
            }
        }
    }

    for (var i = 0; i < board.length; i++) {
        if (board[i] == 0)
            winner = 0;           
    }

    if (winner == -1) {
        $("#winMessage").text(Content = "It's a draw!");
        dialog.dialog( "open" );
        finished = 1;
    }
    
}