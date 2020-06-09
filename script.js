const MIN_TIME = 1000; //milliseconds
const MAX_TIME = 1500; //milliseconds
const PLAY_TIME = 15; //seconds

let height = 0;
let highScore = 0;
let timeUp = false;
let lastHole = 1000;
let myScore = 0;


let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', start);

let time = document.getElementById('time');
let myScore_field = document.getElementById('myScore');
let highScore_field = document.getElementById('highScore');

let images = document.body.querySelectorAll('.mole');
let holes = document.body.querySelectorAll('.mole');


scoreStart();


function start(){

    timeUp = false;
    myScore = 0;
    updateScore();

    /* making photos to disappear */
    height = document.body.getElementsByClassName('img-holder')[0].clientHeight;

    
    
    for(let i = 0; i< images.length; i++){
        images[i].style.transform = "translateY(" + (height+10) + "px)";
    }

    time.innerHTML = PLAY_TIME;

    startBtn.removeEventListener('click', start);

    
    moleUp();
    countdown();
}


function updateScore(){
    console.log(myScore);
    myScore_field.innerHTML = myScore;
    highScore_field.innerHTML = highScore;
}


function scoreStart(){
    for(let i = 0; i< images.length; i++){
        console.log(images[i])
        images[i].addEventListener('click',function(event) {
            if(!timeUp){
                myScore += 1;
                moleDown(event.target)
                updateScore();
            }
        })
    }
}


function randomTime(min, max){
    return Math.random()*(max - min) + min;
}



function randomHoles(holes){
    let id = Math.floor(Math.random() * holes.length);
    let hole = holes[id];
    if(hole == lastHole){
        return randomHoles(holes);
    }

    lastHole = hole;
    return hole;
}


function finish(){
    time.innerHTML = "Time Up";
    startBtn.addEventListener('click', start);
    if(myScore > highScore){
        highScore = myScore;
    }
    updateScore();
    alert('Your score is: '+ myScore);
    timeUp = true;
}


function countdown(){
    seconds = time.innerHTML;
    seconds--;
    if(seconds>0){
        time.innerHTML = seconds;
    }
    else{
        finish();
        return
    }
    
    
    setTimeout(countdown, 1000);
}


function moleUp(){
    const time = randomTime(MIN_TIME, MAX_TIME);
    const hole = randomHoles(holes);

    hole.style.transform = "translateY(0px)";

    setTimeout(() => {
        if (!timeUp){
            moleDown(hole);
            moleUp()
        }
    }, time)
}

function moleDown(hole){
    hole.style.transform = "translateY(" + height + "px)";
}