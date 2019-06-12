// colours in game
var buttonColours = ["red", "blue", "green", "yellow"];
// var with the correct pattern
var gamePattern =[];
// var with the actual user pattern
var userClickedPattern = [];

var level = 0;

var started = false;


function nextSequence(){
  //reset the user clicked pattern for new Level
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
}

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentlevel){

  if (gamePattern[currentlevel]===userClickedPattern[currentlevel]){
    setTimeout(function(){
      nextSequence();
    }, 1000);
    console.log("succes");
  }else{
    playSound("wrong");
    setTimeout(function(){
      $("body").addClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
    console.log("wrong");
  }
}



// when user click any button
$(".btn").click(function(){
  // select the button id and save in variable
  var userChosenColour = $(this).attr("id");
  // push the id into user pattern array
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.lenght-1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
