var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
    }
    nextSequence();
    started = true;
})
function nextSequence(){
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#"+randomChosenColour).fadeOut(250).fadeIn(250);
    playSound(randomChosenColour);
    
}


$(".btn").click(function(){  
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length - 1 === gamePattern.length){
            console.log("success");
            setTimeout(function(){
                nextSequence();
            },1000)
            userClickedPattern = [];
        }
    }
    else{
        console.log("wrong"); 
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}





    


