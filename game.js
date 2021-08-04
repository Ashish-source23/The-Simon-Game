var buttonColours = ["red", "blue", "yellow", "green"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

//Detects the keyboard press

$("body").keydown(function() {
  if (!started) {
    $("#title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

//Detect the button that user clicked !!

$(".row div").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//fUNCTION TO CHECK THE ANSWER

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length)

      setTimeout(function() {
        nextSequence();
      }, 1000);

  } else {
    console.log("Wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#title").html("Game Over , Press Any Key to Restart");

    startOver();
  }

}

// Function that generate next Pattern !!!

function nextSequence() {
  userClickedPattern = [];
  
  level++;
  $("#title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  // Click audio
  playSound(randomChosenColour);
}

//Function that plays the sound of the button clicked !!!

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function for animations !!!

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Function that reset all the previous values

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
