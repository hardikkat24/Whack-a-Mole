const MIN_TIME = 800; //milliseconds
const MAX_TIME = 1000; //milliseconds
const PLAY_TIME = 30; //seconds

let height = 0;
let highScore = 0;
let timeUp = true;
let lastHole = 1000;
let myScore = 0;


$("#startBtn").click(start);

let images = document.body.querySelectorAll('.mole');
let holes = document.body.querySelectorAll('.mole');


scoreStart();


function start(){

    if(timeUp){
        timeUp = false;
        myScore = 0;
        updateScore();

        /* photos hide */
        height = document.body.getElementsByClassName('img-holder')[0].clientHeight;
        $('.mole').css("transform", "translateY(" + (height+10) + "px)");

        $('#time').text(PLAY_TIME);

        moleUp();
        countdown();
    }

    else{
        console.log('Game is still running!');
    }
}


function updateScore(){
    $('#myScore').text(myScore);
    $('#highScore').text(highScore);
}

function redEffect(image){
    image.parentNode.childNodes[1].classList.add('mask')

    setTimeout(()=>{
        image.parentNode.childNodes[1].classList.remove('mask')
    }, 75)

    setTimeout(()=>{
        image.parentNode.childNodes[1].classList.add('mask')
    }, 150)

    setTimeout(()=>{
        image.parentNode.childNodes[1].classList.remove('mask')
    }, 300)
}


function scoreStart(){
    $('.mole').click(function(event){
        console.log(event.target);
        if(!timeUp){
            myScore += 1;
            redEffect(event.target);
            moleDown(event.target);
            updateScore();
        }
    })
}


function randomTime(min, max){
    return Math.random()*(max - min) + min;
}



function randomHoles(){
    let id = Math.floor(Math.random() * $('.mole').length);
    let hole = $('.mole')[id];
    if(hole == lastHole){
        return randomHoles();
    }

    lastHole = hole;
    return hole;
}


function finish(){
    $('#time').text("Time Up");
    if(myScore > highScore){
        highScore = myScore;
    }
    updateScore();
    alert('Your score is: '+ myScore);
    timeUp = true;
}


function countdown(){
    seconds = $('#time').text();
    seconds--;
    if(seconds>0){
        $('#time').text(seconds);
    }
    else{
        finish();
        return
    }
    
    setTimeout(countdown, 1000);
}


function moleUp(){
    let time = randomTime(MIN_TIME, MAX_TIME);
    let hole = randomHoles();

    //hole.css("transform", "translateY(0px)")
    hole.style.transform = "translateY(20px)";

    setTimeout(() => {
        if (!timeUp){
            moleDown(hole);
            moleUp();
        }
    }, time)
}

function moleDown(hole){
    hole.style.transform = "translateY(" + height + "px)";
}