let guessCount = 1;
let resetButton;
let userGuess;
let TotalScore = 0 ;
let total = 100;
let wins = 0;
let losses = 0;
let max = 100;
let randomNumber = Math.floor(Math.random() * max) + 1;
const guesses = document.getElementById('guesses');
const lastResult = document.getElementById('lastResult');
const notice = document.getElementById('notice');
const guessSubmit = document.querySelector('#guessbtn');
const guessField = document.querySelector('#guessnum');
const greeting = document.getElementById('greet');
const background = document.getElementById('background');
const capacity = document.getElementById('notice1');
const totaltally = document.getElementById('notice2');
const gamebody = document.getElementById('gamebody');
const formbody = document.getElementById('formbody');
const submitbtn = document.getElementById('submit');  
const playbtn = document.getElementById('play');  
const resultsbtn = document.getElementById('results');
const quitbtn = document.getElementById('quit'); 
const username = document.getElementById('username');
const email = document.getElementById('email');
const dobinput = document.getElementById('dob');
const gender = document.getElementById('male');
const gender1 = document.getElementById('female');
const ageinput = document.getElementById('age');
capacity.textContent = 'MAXIMUM CAPACITY ' +max;
totaltally.textContent = 'Total is ' + total;
const gamewon = 0;


function playGame(){
    greeting.innerHTML="Ship Sail! Ship Sail! 'Ow Much Man Deh Pan Board?"
    randomNumber = Math.floor(Math.random() * max) + 1
    guesses.textContent = '';
    lastResult.textContent = '';
    background.style.backgroundColor = '#ffffff00';

    if(max < 100){
       resetGame(); 
    }
    formbody.hidden = true;
    gamebody.hidden = false;
    guessField.disabled = false;
    guessSubmit.disabled = false;

} 

function checkGuess() {
    userGuess = Number(guessField.value);

    if (guessCount === 1) {
        guesses.textContent = '';
    }
    guesses.textContent += userGuess + ' ';
    if (userGuess === randomNumber) {
        lastResult.textContent = 'CONGRATULATIONS! YOU GUESSED IT RIGHT! GUESS THE NEXT NUMBER!';
        background.style.backgroundColor = 'green';
        guesses.textContent = '';
        max -= guessField.value;
        total += userGuess;
        totaltally.textContent = 'Total is ' + total
        setGameOver();
        guessCount = 1;
    } else if (guessCount === 10 || total === 0) {
        max +=  randomNumber;
        total -= randomNumber;
        lastResult.textContent = '!!!GAME OVER!!!';
        guessField.disabled = true;
        guessSubmit.disabled = true;
        notice.textContent = '';
        totaltally.textContent = 'Total is ' + total
        gameplayed += 1;
        setGameOver();
    } else {
        background.style.backgroundColor = 'red';
        if(userGuess < randomNumber) {
        lastResult.textContent = 'TOO LOW!' ;
        } else if(userGuess > randomNumber) {
            lastResult.textContent =  'TOO HIGH!';
        }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
    showall () ; 
}
guessSubmit.addEventListener('click', checkGuess);

function setGameOver(){ //function generates a new random number after previous guess
    
    //shows the highest number currently able to guess    
    capacity.textContent = 'MAXIMUM CAPACITY ' +max;
    randomNumber = Math.floor(Math.random() * max) + 1;

    //tells player they've won if max is 0
    if(max === 0 || total === 0){
        lastResult.textContent = 'CONGRATULATIONS! YOU WON!';
        background.style.backgroundColor = 'green';
        guessField.disabled = true;
        guessSubmit.disabled = true;
        guesses.textContent = '';
        gamewon +=1;
        gameplayed +=1;
}

}

function resetGame(){
    max = 100;
    total = 100;
    guessCount = 1;
    randomNumber = Math.floor(Math.random() * max) + 1;
    capacity.textContent = 'MAXIMUM CAPACITY ' +max;
    guessField.value = '';
    guessField.focus();
    lastResult.textContent = '';
    background.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    totaltally.textContent = 'Total is ' + total
}

function emailCheck(){
    return RegExp(/([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g);
}

function register(){ //the register function accepts the user input and validate that they meet the nessary criteria 
    gmail = emailCheck();

    testing = gmail.test(email.value);

    if (username.value =='' || username.length<3){
        document.getElementById('error1').innerHTML = "Enter A Username Of At Least 3 Characters"
            
    } else{
        document.getElementById('error1').innerHTML = ""

    }
            
    if (gmail.test(email.value)) {
        result = true;
        document.getElementById('error2').innerHTML = ""

    } else {
        document.getElementById('error2').innerHTML = "Please Input A Gmail Email"
    }
    if (dobinput.value == ''){
        document.getElementById('error3').innerHTML = "Please Input Your Date of Birth"

    } else{
        document.getElementById('error3').innerHTML = ""

    } 
    if (ageinput.value === '') {
        document.getElementById('error3').innerHTML = "Please Input A Valid Date of Birth"

    } else {
        document.getElementById('error3').innerHTML = ""

    } 

    //if input is empty, the register button remains enabled until otherwise. 
    if(dobinput.value == '' || username.value == '' ||   ageinput.value < 5 ||  gmail.test(email.value) == ''){
        submitbtn.disabled = false;
    }else {
        submitbtn.disabled = true;
        username.disabled = true;
        dobinput.disabled = true;
        email.disabled = true;
        gender.disabled = true;
        gender1.disabled = true;
        quitbtn.disabled = false;
        playbtn.disabled = false;
        resultsbtn.disabled = false;
        document.getElementById('error2').innerHTML = ""
        findPercentageScore(); 
    }
}

function ageCalculator() {
    var dob = new Date(dobinput.value);
    
    if(dobinput.value==null || dobinput.value=='') {
              return false; 
    } else {
            
        //calculate month difference from current date in time
        var month_diff = Date.now() - dob.getTime();
            
        //convert the calculated difference in date format
        var age_dt = new Date(month_diff); 
            
        //extract year from date    
        var year = age_dt.getUTCFullYear();
            
        //now calculate the age of the user
        var age = Math.abs(year - 1970);

        
            
        //display the calculated age
        return ageinput.value =  age;
    }
}

const PlayersData = ['Player: ' +username.value,'\nPercentage: ' + percentage,'\nDate: '+newdate,'\nAge:'+ ageinput.value,'\nGames won: '+ wins,'\nGames lost: '+losses,'\nTotal Score:'+TotalScore];   
function findPercentageScore() {
    
    userGuess = Number(guessField.value);
    
     // genarate today's date 
    var dateObj = new Date();
    var month = dateObj.toLocaleString('default', {month: 'short'});
    var day = dateObj.getDate();
    var year = dateObj.getUTCFullYear();

    //if guess is correct it is a win
    if (max === 0 || userGuess === randomNumber) {
        wins +=  1;
    }
    //if guesses are depleted it is a loss
    if (guessCount === 3) {
        losses += 1;
        
    }
    TotalScore = wins + losses ; // calculate the total score of they player 
    percentage = Math.floor((wins/TotalScore)*100) +"%"; // calculate the percentage of the player wins 



    newdate =  month + " " + day+", " + year;
  
   

    const PlayersData = ['Player: ' +username.value,'\nPercentage: ' + percentage,'\nGames won: '+ wins,'\nGames lost:'+losses,'\nTotal Score:'+TotalScore,'\nDate: '+ newdate];


    document.getElementById('showpercentage').value = PlayersData;  
}

function quit() {
    //show score
    findPercentageScore();

    //disable and enable buttons and inputs
    formbody.hidden = false;
    gamebody.hidden = true;
    submitbtn.disabled = false;
    quitbtn.disabled = true;
    playbtn.disabled = true;
    resultsbtn.disabled = true;
    username.disabled = false;
    username.value = "";
    email.disabled = false;
    email.value = "";
    dobinput.disabled = false;
    dobinput.value = "";
    ageinput.value = "";
    gender.disabled = false;
    gender1.disabled = false;
}

function quitnow() {
    quit();
}

function resultnow() {
    findPercentageScore();
}
// the function show all display the player data in the textarea with the id show all player 
function showall (){
    PlayersData;
    document.getElementById ('showallplayers').value = PlayersData;
}
 