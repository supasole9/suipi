var player1Hand = document.getElementById("player1Hand");
var player2Hand = document.getElementById("player2Hand");
var boardHand = document.getElementById("boardHand");

var player1 = [];
var player2 = [];
var board = [];
var boardCount = 4;
var dealCount = 8;
var playTurn;

function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

function deck(){
	this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['Hearts','Diamonds','Spades','Clubs'];
	var cards = [];

    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push( new card( n+1, this.names[n], this.suits[s] ) );
        }
    }

    return cards;
}

function shuffle(cards){
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
};

function dealToBoard(cards){
  var i = cards.length - 1;
  var checkDuplicate = [];
  while (boardCount){
    if (cards[i].name == 'Ace'){
      shuffle(cards);
    }
    else if (cards[i].suit == 'Spades') {
      if(cards[i].name == '2' || checkDuplicate.includes(cards[i].value)){
      shuffle(cards);
      } else{
        board.push(cards[i]);
        checkDuplicate.push(cards[i].value);
        cards.pop();
        i--;
        boardCount--;
      }
    }
    else if (cards[i].suit == 'Diamonds'){
      if (cards[i].name == '10' || checkDuplicate.includes(cards[i].value)){
        shuffle(cards);
      } else{
        board.push(cards[i]);
        checkDuplicate.push(cards[i].value);
        cards.pop();
        i--;
        boardCount--;
      }
    }
    else if(checkDuplicate.includes(cards[i].value)){
      shuffle(cards);
    }
    else{
      board.push(cards[i]);
      checkDuplicate.push(cards[i].value);
      cards.pop();
      i--;
      boardCount--;
    }
}
};

function dealToPlayers(cards){
  while (dealCount){
    player1.push(cards[cards.length - 1]);
    cards.pop();
    player2.push(cards[cards.length - 1]);
    cards.pop();
    dealCount--;
  }
};

var letsSeeIfThisWorks = function (){
     var newDeck = deck();
     shuffle(newDeck);
     dealToBoard(newDeck);
     dealToPlayers(newDeck);
	displaycards(board, boardHand);
	displaycards(player1, player1Hand);
	displaycards(player2, player2Hand);

};

letsSeeIfThisWorks()

function displaycards (who, hand) {
	for (var i = 0; i < who.length; i ++){
		var cardData = document.createElement("div");
		cardData.className = "card";
		var suitValue =  document.createElement("p");
		suitValue.innerHTML = who[i].suit;
		cardData.appendChild(suitValue)
		var numberValue = document.createElement("p");
		numberValue.innerHTML = who[i].name;
		cardData.appendChild(numberValue);
		hand.appendChild(cardData);
	}
};

$(".card").click(function() {
    var text = $(this).text();
    
    console.log(text)
});
