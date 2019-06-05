/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, diceHistory;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){

   if(gamePlaying){

 //get random number
 var dice1 = Math.floor(Math.random()*6)+1;
 var dice2 = Math.floor(Math.random()*6)+1;

 //display random number on dice
 var dice1Dom =  document.getElementById('dice1');
 var dice2Dom =  document.getElementById('dice2');

dice1Dom.style.display = 'block';
dice2Dom.style.display = 'block';

dice1Dom.src = 'dice-'+dice1+'.png';
dice2Dom.src = 'dice-'+dice2+'.png';

if(dice1 !==1 && dice2 !==1 ){

    if((dice1 ===6 && diceHistory[0] === 6) && (dice2 === 6 && diceHistory[1] === 6) ){

        alert('played double six twice, scores cleared and turn passed!');

        diceHistory[0] = 0;
        diceHistory[1] = 0;

        roundScore = 0;

        scores[activePlayer] = 0;
        
        document.querySelector('#score-'+activePlayer).textContent = roundScore
     
        document.getElementById('current-'+activePlayer).textContent = roundScore;

        nextPlayer();

    }else{

        diceHistory[0] = dice1;
        diceHistory[1] = dice2;
     
         roundScore += (dice1+dice2);
     
         document.getElementById('current-'+activePlayer).textContent = roundScore;
    }

   

}else{

    alert('player '+(activePlayer+1)+' rolled 1('+dice1+' and '+dice2+') so turn passed!');
    nextPlayer();

}
   }



});

//next player function

function nextPlayer(){

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}

document.querySelector('.btn-hold').addEventListener('click',function(){

   if(gamePlaying){

 //add current score to global score
 scores[activePlayer] += roundScore;

 document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

//check if player won the game

var winningScore  = document.getElementById('win-score').value;

if(!winningScore){

winningScore = 100;
}

    if(scores[activePlayer]>=winningScore){

        document.querySelector('#name-'+activePlayer).textContent = 'Winner';
        document.getElementById('dice1').style.display = 'none';
        document.getElementById('dice2').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    
        gamePlaying = false;
    
    }else{
    
        nextPlayer();
    }
   }



});

document.querySelector('.btn-new').addEventListener('click',init);

function init(){

    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    scores = [0,0];
    diceHistory = [0,0];
    roundScore = 0;
    activePlayer = 0;
   
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;


    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
   
   document.getElementById('dice1').style.display = 'none';
   document.getElementById('dice2').style.display = 'none';
   
   document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}
