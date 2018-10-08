class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {

    let minimum_raise = gameState.minimum_raise;
    let our_player = gameState.players[gameState.in_action];
    let our_hand = our_player.hole_cards;
    let common_cards = gameState.community_cards;
    let output = minimum_raise;
    let ranks = [];
    let round = gameState.round;

    console.log("----------our player-------------");
    console.log(our_player);

    ranks.push(our_hand[0].rank);
    ranks.push(our_hand[1].rank);
      
    for (var i=0; i<common_cards.length; i++){
        ranks.push(common_cards[i].rank);
    }
        
    console.log("------ ranks in hand and community ------- ");
    console.log(ranks);

    
    try{
        var isThreeOfCards= isThree(ranks);
        console.log("----------Have we three of cards?------------");
        console.log(isThreeOfCards);
    }catch(e){
        console.log("ERROR: -------- isThree -----");
        console.log(e);
    }  

    try {
        if (round == 0) {
            if(isPair(ranks) || isKingInHand(ranks) || isAsInHand(ranks)) {

                console.log("---------round 0: in isPair(ranks) || isKingInHand(ranks) || isAsInHand(ranks)-----------");
                output = raise(gameState);

            } else if(isQueenOrJackInHand(ranks)) {

                console.log("---------round 0: in isQueenOrJackInHand(ranks)-----------");
                output = call(gameState);

            } else {

                console.log("---------round 0: output = 0----------");
                output = 0;
            }
            
        } else {
            if(isPair(ranks) || isAsInHand(ranks)) {

                console.log("---------round next: in isPair(ranks) || isAsInHand(ranks)-----------");
                output = raise(gameState);

            } else {

                console.log("---------round next: output = 0----------");
                output = 0;
            }
        }

    } catch (e) {
      console.log("---------error----------");
      console.log(e);
    }
    
    console.log("---------bet-----------");
    console.log(output);
    bet(output);
  }

  static showdown(gameState) {
      
  }
}


  function isPair(ranks){
      for (var i=2; i<ranks.length; i++){
          if (ranks[i] == ranks[0] || ranks[i] == ranks[1]){
              return true;
          }
      }
      if (ranks[0] == ranks[1]){
          return true;
      }
      return false;
  }

  function isKingInHand(ranks){
      if (ranks[0] == 'K' || ranks[1] == 'K'){
          return true;
      }
      return false;
  }

  function isAsInHand(ranks){
    if (ranks[0] == 'A' || ranks[1] == 'A'){
        return true;
    }
    return false;
}

  function isQueenOrJackInHand(ranks){
      if (ranks[0] == 'Q' || ranks[0] == 'J' || ranks[1] == 'Q' || ranks[1] == 'J'){
          return true;
      }
      return false;
  }

  function isThree(ranks){
      for (var i = 0; i<ranks.length-2; i++){
          for (var j = i+1; j<ranks.length - 1; j++){
              for(var k = j + 1; k<ranks.length; k++){
                  if(ranks[i] == ranks[j] && ranks[i] == ranks[k] && ranks[j] == ranks[k] && (ranks[i] == ranks[0] || ranks[i] == ranks[1] || ranks[j] == ranks[1])){
                      return true;
                  }
              }
          }
      }
      return false;
  }
  

  function raise(gameState) {
    return gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise;
  }

  function call(gameState) {
    return gameState.current_buy_in - gameState.players[gameState.in_action].bet;
  }
   


module.exports = Player;
