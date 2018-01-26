var DP = 0; /* Dealer Total Points */
var PP = 0; /* Player Total Points */
var dCards = [];
var pCards = [];

var wallet = 500;
var bet = 0;

var nOfWin = 0;
var nOfLose = 0;
var mostMoney = 500;

var pName;


$(document).ready(function() {
	$("#game").hide();

	$( "#login" ).dialog({
		autoOpen: true,
		width: 600,
        show: {
        	effect: "blind",
        	duration: 800
     	},
        hide: {
        	effect: "blind",
        	duration: 800
        }
    });

	$( "#statsDialog" ).dialog({
		autoOpen: false,
        show: {
        	effect: "blind",
        	duration: 800
     	},
        hide: {
        	effect: "blind",
        	duration: 800
        }
    });
 
    $( "#Stats" ).click(function() {
    	$("#numberOfWin").html(nOfWin);
		$("#numberOfLose").html(nOfLose);
		if (wallet > mostMoney) {
			mostMoney = wallet;
			$("#mostAmountMoney").html(mostMoney);
		}
    	$( "#statsDialog" ).dialog( "open" );
    });
     

    $( "#walletDialog" ).dialog({
		autoOpen: false,
        show: {
        	effect: "blind",
        	duration: 800
     	},
        hide: {
        	effect: "blind",
        	duration: 800
        }	
    });
 
    $( "#playerWallet" ).click(function() {
    	$("#playerBet").text(bet);
    	$("#playerMoney").text(wallet);
    	$( "#walletDialog" ).dialog( "open" );
    });



	$("#stand").click(function() {
		$("#hit").prop("disabled", true);
		$("#dd").prop("disabled", true);
		while (DP < 17) {
			
			dCards.push(generateCard());
			calculatePoints();
			display();

		}

		checkVictory(); 
	});
	
	$("#hit").click(function() {
		
		pCards.push(generateCard());

		display();
		calculatePoints();

		if (PP > 21) {
			checkVictory();	
		}
	});
	
	$("#dd").click(function() {
		if (wallet >= bet * 2) {
			$("#hit").prop("disabled", true);
			$("#dd").prop("disabled", true);
			$("#stand").prop("disabled", true);

			pCards.push(generateCard());
			bet *= 2;

			display();
			calculatePoints();

			checkVictory();
		} else {
			alert("You do not have enough money!");
		}
	});

	$("#playAgain").click(function() {
		/* accept bet again */

		if (wallet <= 0) {
			alert("You have no more money...");
		} else {
			$("#walletCash").text(wallet);

			$("#Dpoints").text("?");
			$("#playerCash").text(wallet);
			$("#login").dialog("open");
			$("#game").hide();

			DP = 0;
			PP = 0;
			dCards = [];
			pCards = [];

			$("#hit").prop("disabled", false);
			$("#dd").prop("disabled", false);
			$("#stand").prop("disabled", false);

			$("#dealerCards").html("");
			$("#playerCards").html("");

			dealCards();
		}
	});

	$("#submit").click(function() {
		var done = false;

		
		
		if ($("#playerName").val() == "") {
			alert("You cannot leave your name blank!");
		} else if ($("#betInput").val() == "" || $("#betInput").val() == 0) {
			alert("You must bet something!");
		}else if ($("#betInput").val() <= 0) {
			alert("You cannot bet negative amount of money!");
		} else if (isInt($("#betInput").val()) == false) {
			alert("You must bet an interger amount of money!");
		} else if (isInt($("#betInput").val()) == true && $("#betInput").val() > wallet) {
			alert("you do not have enough money!");
		} else {
			updateInfo($("#playerName").val(), $("#betInput").val());
			done = true;
		}
		
		if (done == true) {
			$("#login").dialog("close");
			$("#game").show();
			$("#playerName").prop("disabled",true);
		}



	});

	/* display login screen */

	dealCards();
	$("#playAgain").prop("disabled", true);

});



function card (n,s) {
	this.value = n;
	this.suit = s;
	this.getValue = function() {
		if (this.value == "J") {
			return 10;
		}
		if (this.value == "Q") {
			return 10;
		}
		if (this.value == "K") {
			return 10;
		}
		if (this.value == "A") {
			return 11;
		}

		return n;
	};
	this.getSuit = function() {
		return this.suit;
	};
	this.getSrc = function() {
		var Src = s + n + ".png";
		return Src;
	};
}

function generateCard() {
	var n = Math.floor(Math.random() * 13) + 1;
	var s = Math.floor(Math.random() * 4) + 1;
	if (n == 1) {
		n = "A";
	}

	if (n == 11) {
		n = "J";
	}
	if (n == 12) {
		n = "Q";
	}
	if (n == 13) {
		n = "K";
	}

	if (s == 1) {
		s = "S";
	}
	if (s == 2) {
		s = "H";
	}
	if (s == 3) {
		s = "C";
	}
	if (s == 4) {
		s = "D";
	}

	var newCard = new card(n, s);
	return newCard;
}

function display() {
	var dealerDisplay = "";

	dealerDisplay += "<img src=\"images/1.png\" height=\"200\">";

	for (var i = 1; i < dCards.length; i++) {
		if (dealerDisplay != "") {
			dealerDisplay += ",";
		}
		dealerDisplay += "<img src=\"images/" + dCards[i].getSrc() + "\" height=\"200\">";
	}

	$("#dealerCards").html(dealerDisplay);

	var playerDisplay = "";

	for (var i = 0; i < pCards.length; i++) {
		if (playerDisplay != "") {
			playerDisplay += ",";
		}
		playerDisplay += "<img src=\"images/" + pCards[i].getSrc() + "\" height=\"200\"> ";
	}

	$("#playerCards").html(playerDisplay);
}

function calculatePoints() {
	DP = 0;
	var dAce = 0;
	for (var i = 0; i < dCards.length; i++) {
		if (dCards[i].getValue() == 11) {
			dAce++;
		}
		DP += dCards[i].getValue();
	}

	while (dAce > 0 && DP > 21) {
		dAce--;
		DP -= 10;
	}



	PP = 0;
	var pAce = 0;
	for (var i = 0; i < pCards.length; i++) {
		if (pCards[i].getValue() == 11) {
			pAce++;
		}
		PP += pCards[i].getValue();
	}



	while (pAce > 0 && PP > 21) {
		pAce--;
		PP -= 10;
	}

	$("#Ppoints").text(PP);
}

function checkVictory() {
	if (DP == PP) {
		fDisplay();
		$("#Dpoints").text(DP);
		/* ITS A DRAW */
		$("#stand").prop("disabled", true);
		$("#hit").prop("disabled", true);
		$("#dd").prop("disabled", true);
		$("#playerCards").html("<h1>ITS A DRAW</h1>");
		$("#dealerCards").html("<h1>ITS A DRAW</h1>");
		$("#playAgain").prop("disabled", false);

	} else if (DP > 21) {
		fDisplay();
		$("#Dpoints").text(DP);
		/* dealer bust, player wins */
		$("#stand").prop("disabled", true);
		$("#hit").prop("disabled", true);
		$("#dd").prop("disabled", true);
		$("#playerCards").html("<h1>DEALER BUSTED</h1>");

		wallet += bet;
		nOfWin++;

		$("#playAgain").prop("disabled", false);

	} else if (PP > 21) {
		fDisplay();
		$("#Dpoints").text(DP);
		/* player bust, dealer wins */
		$("#stand").prop("disabled", true);
		$("#hit").prop("disabled", true);
		$("#dd").prop("disabled", true);
		$("#dealerCards").html("<h1>PLAYER BUSTED</h1>");

		wallet -= bet;
		nOfLose++;

		$("#playAgain").prop("disabled", false);

	} else if (DP == 21) {
		fDisplay();
		$("#Dpoints").text(DP);
		/* dealer wins */
		$("#stand").prop("disabled", true);
		$("#hit").prop("disabled", true);
		$("#dd").prop("disabled", true);
		$("#playerCards").html("<h1>DEALER WINS</h1>");

		wallet -= bet;
		nOfLose++;

		$("#playAgain").prop("disabled", false);


	} else if (PP == 21) {
		fDisplay();
		$("#Dpoints").text(DP);
		/* player wins */
		$("#stand").prop("disabled", true);
		$("#hit").prop("disabled", true);
		$("#dd").prop("disabled", true);
		$("#dealerCards").html("<h1>PLAYER WINS</h1>");

		wallet += bet;
		nOfWin++;

		$("#playAgain").prop("disabled", false);

	} else {
		if (PP > DP) {
			fDisplay();
			$("#Dpoints").text(DP);
			$("#stand").prop("disabled", true);
			$("#hit").prop("disabled", true);
			$("#dd").prop("disabled", true);
			$("#dealerCards").html("<h1>PLAYER WINS</h1>");
			/* player wins */

			wallet += bet;
			nOfWin++;

			$("#playAgain").prop("disabled", false);

		} else if (PP < DP) {
			fDisplay();
			$("#Dpoints").text(DP);
			/*Dealer wins */
			$("#stand").prop("disabled", true);
			$("#hit").prop("disabled", true);
			$("#dd").prop("disabled", true);
			$("#playerCards").html("<h1>DEALER WINS</h1>");

			wallet -= bet;
			nOfLose++;

			$("#playAgain").prop("disabled", false);

		}
	}
}

function dealCards() {
	dCards.push(generateCard());
	dCards.push(generateCard());
	pCards.push(generateCard());
	pCards.push(generateCard());
	
	display();
	calculatePoints();
}

function fDisplay() {
	var dealerDisplay = "";

	for (var i = 0; i < dCards.length; i++) {
		if (dealerDisplay != "") {
			dealerDisplay += ",";
		}
		dealerDisplay += "<img src=\"images/" + dCards[i].getSrc() + "\" height=\"200\">";
	}

	$("#dealerCards").html(dealerDisplay);

	var playerDisplay = "";

	for (var i = 0; i < pCards.length; i++) {
		if (playerDisplay != "") {
			playerDisplay += ",";
		}
		playerDisplay += "<img src=\"images/" + pCards[i].getSrc() + "\" height=\"200\"> ";
	}

	$("#playerCards").html(playerDisplay);
}

function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
}

function updateInfo(name, cash) {
	pName = name;
	bet = parseInt(cash);
	$("#playerID").text(pName);
}