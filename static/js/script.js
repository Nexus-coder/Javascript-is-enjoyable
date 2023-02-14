//Challenge 1:Your Age in days
function ageInDays(){
var birthYear=prompt('What is your birth year ...Good friend?')
var ageInDayss=(2022-birthYear)*365;
var h1=document.createElement('h1');
var textAnswer=document.createTextNode('You are ' + ageInDayss + ' days old')
h1.setAttribute('id','ageInDays')
h1.appendChild(textAnswer);
document.getElementById('flex-box-result').appendChild(h1)
}
 function reset(){
     document.getElementById('ageInDays').remove()
 }
 
 //Challenge 2:Cat Generator
 function generateCat(){
 var image=document.createElement('img');
 var div=document.getElementById("flex-cat")
 image.src="https://thecatapi.com/api/images/get?format=src&type=gif&size=small"
 div.appendChild(image)
}
//Challenge 3:Rock,Paper,Scissors
function rpsGame(yourChoices){
  var humanChoice,botChoice;
    humanChoice=yourChoices.id;

    botChoice=numbertoChoice(randomNumber());
    
    result=decideWinner(humanChoice,botChoice);
    console.log(result)
    console.log(botChoice)
    console.log(yourChoices.src)

    message=finalMessage(result)
    console.log(message)

    rpsFrontEnd(humanChoice,botChoice,message)
}
function randomNumber(){
   return  Math.floor(Math.random()*3);
}

function numbertoChoice(number){
    return ['rock','paper','scissors'][number]
}


function decideWinner(yourChoice,computerChoice){
var rpsDataBase={
    'rock': {'rock':0.5,'paper':0,'scissors':1},
    'paper': {'paper':0.5,'scissors':0,'rock':1},
    'scissors': {'scissors':0.5,'rock':0,'paper':1}
};

var yourScore = rpsDataBase[yourChoice][computerChoice];
var computerScore = rpsDataBase[computerChoice][yourChoice];
 
return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]){
    if (yourScore ===0){
        return {'message':'You lost!','colour':'red'}
    } else if (yourScore ===0.5){
        return {'message':'Its a draw!','colour':'yellow'}
    } else {
       return  {'message':'You win!','colour':'green'}
    }
}
function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    var imageDatabase=
    {
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissors':document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    humanDiv=document.createElement('div');
    botDiv=document.createElement('div');
    messageDiv=document.createElement('div');

    humanDiv.innerHTML = "<img src='"  +  imageDatabase[humanImageChoice]  + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(11, 26, 235, 0.7);' >";
    messageDiv.innerHTML="<h1 style='color: " + finalMessage['colour'] + "; font-size: 60 px; padding: 30px; '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='"  +  imageDatabase[botImageChoice]  + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);' >";


    document.getElementById('flex-box-rps-div').appendChild(humanDiv)
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}  

var allButtons=document.getElementsByTagName('button' );


var copyButtons=[];
for(let i=0;i < allButtons.length; i++){
    copyButtons.push(allButtons[i].classList[1]);
}

function buttonColourChange(buttonThingy){
if (buttonThingy.value==='red'){
    buttonRed()
} else if (buttonThingy.value==='green'){
    buttonGreen();
} else if (buttonThingy.value==='reset'){
    buttonReset();
} else if (buttonThingy.value==='random'){
    buttonRandom();
}

function buttonRed(){
    for (i=0;i < allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add('btn-danger')
    }
};

};

function buttonGreen(){
    for(i=0;i < allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success')
    }
};

function buttonReset(){
    for(i=0;i < allButtons.length;i++){
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add(copyButtons[i])
    
}
};

function buttonRandom(){
    let choices=['btn-primary', 'btn-danger', 'btn-success','btn-warning']
   
    for (i=0; i< allButtons.length; i++){
        let randomNumber=Math.floor(Math.random()*4);
        allButtons[i].classList.remove(allButtons[i].classList[i])
        allButtons[i].classList.add(choices[randomNumber])
    }
}

//Challenge 5
let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-result','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-result', 'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'K':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand': false,
    'turnsOver':false,
};
 const YOU = blackjackGame['you'];
 const DEALER = blackjackGame['dealer'];

 const hitSound = new Audio('A:/Users/andrew/Desktop/project/static/sounds/swish.m4a');
 const winSound = new Audio('A:/Users/andrew/Desktop/project/static/sounds/cash.mp3')
 const lossSound = new Audio('A:/Users/andrew/Desktop/project/static/sounds/aww.mp3')
 
 document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

 document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
  
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic)

 function blackjackHit(){
     if (blackjackGame['isStand'] === false){
    let card= randomCard();
     showCard(card,YOU);
     updateScore(card,YOU);
     showScore(YOU)
     }
 }

 function randomCard(){
     let randomIndex = Math.floor(Math.random()*13);
     return blackjackGame['cards'][randomIndex];
 }

 function showCard(card,activePlayer){
     if (activePlayer['score'] < 21){
  let cardImage = document.createElement('img');
   cardImage.src = `A:/Users/andrew/Desktop/project/static/images/${card}.png`;
   document.querySelector(activePlayer['div']).appendChild(cardImage);

   hitSound.play()
     }
 }

 function blackjackDeal(){
if (blackjackGame['turnsOver'] === true){

    blackjackGame['isStand'] = false

    let yourImages = document.querySelector('#your-result').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-result').querySelectorAll('img');

    for (i=0;i < yourImages.length;i++){
        yourImages[i].remove();
    }

    for (i=0;i < dealerImages.length;i++){
        dealerImages[i].remove();
        
    }
    
    YOU['score'] = 0;
    DEALER['score'] = 0;

    
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent= "Let's play";
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = false 
     }
       }

function updateScore(card,activePlayer){
    if (card==='A'){
        if (activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardMap'][card][1]
        } else{
            activePlayer['score'] += blackjackGame['cardMap'][card][0]
        }
    } else {
    activePlayer['score']+=blackjackGame['cardMap'][card];
    }
}
 function showScore(activePlayer){ 
     if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
     } else {
     document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
     }

    }

 function sleep(ms){
     return new Promise(resolve => setTimeout(resolve,ms))
 }




  async  function dealerLogic(){
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true ){
    let card = randomCard() ;
    showCard(card,DEALER);
    updateScore(card,DEALER)
    showScore(DEALER);
    await sleep(1000)
    }

    blackjackGame['turnsOver'] = true
    let winner=computeWinner()
    showResult(winner)
   }
    
  
    function computeWinner(){
        let winner;
        if (YOU['score'] <= 21){
          if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
              blackjackGame['wins']++;
              winner = YOU;
          
        } else if (YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner =DEALER;
            
        } else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }

        } else if (YOU['score'] > 21 && DEALER['score']<= 21){
            blackjackGame['losses']++
            winner = DEALER;


        } else if (YOU['score'] > 21 && DEALER['score'] > 21){
            blackjackGame['draws']++
        } 
    
      return winner;
      
    }
    function showResult(winner){
        let message, messageColor;
    if (blackjackGame['turnsOver'] === true){
        if (winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins']
            message = 'You won!';
            messageColor = 'green';
            winSound.play();

        } else if (winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses']
            message ='You lost!'
            messageColor = 'red';
            lossSound.play()

        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws']
            message = 'You drew!'
            messageColor = 'black';
        }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
    }
    }