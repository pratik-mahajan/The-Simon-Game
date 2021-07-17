var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;

var start=false;

var audiored = new Audio("sounds/red.mp3");
    audiored.preload='auto';
var audioblue = new Audio("sounds/blue.mp3");
    audioblue.preload='auto';
var audiogreen = new Audio("sounds/green.mp3");
    audiogreen.preload='auto';
var audioyellow = new Audio("sounds/yellow.mp3");
    audioyellow.preload='auto';

$(document).keypress(function(){
    if(start==false)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        start=true;
    }
    
})

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){nextSequence();}, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    start=false;
}

function playSound(name)
{
    if(name==red)
    {
        audiored.play();
    }
    else if(name==blue)
    {
        audioblue.play();
    }
    else if(name==green)
    {
        audiogreen.play();
    }
    else if(name==yellow)
    {
        audioyellow.play();
    }
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

$(".btn").click(function()
{
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
    userClickedPattern=[];
    ++level;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();
}

