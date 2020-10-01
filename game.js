const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".btn").click(function () {
  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

$("#start").click(function () {
  if (!started) {
    nextSequence();
    started = true;
    $("#start").css("visibility", "hidden");
  }
});

function nextSequence() {
  $("#level-title").text("Level " + level);
  level++;

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern.length == 0) {
    $("#level-title").fadeOut(80).fadeIn(80);
  } else if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("Game Over");

    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  $("#start").css("visibility", "visible");
}
