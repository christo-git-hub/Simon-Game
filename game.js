let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern=[]; 
let userClickedPattern=[];
let level=0;
let gameActive= false;

//Produces next sequence
function nextSequence() {
    level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

//The user chosen colour
$(".btn").click(function(){
  if(!gameActive) return;
  let userChosenColour= $(this).attr('id'); 
  userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
  checkAnswer(userChosenColour);
})


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(() => {
    $("#"+currentColour).removeClass("pressed");
  }, 150);
}

function checkAnswer(userChosenColour){
  
    if(gamePattern[userClickedPattern.length-1]!=userClickedPattern[userClickedPattern.length-1]){
      $("#level-title").html('Game Over <br> Press a key to restart');
        $("body").addClass("game-over");
        setTimeout(() => {
          $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        gameActive= false;
        userClickedPattern= [];
        gamePattern=[];
        level=0;
        return;
    }

    else
      playSound(userChosenColour);

  if(userClickedPattern.length==level){
   userClickedPattern= [];
    setTimeout(nextSequence,1000);
  }
}

$(document).keydown(function () {
  if(!gameActive){
    gameActive= true;
    nextSequence();
  }
});

window.addEventListener('load', function () {
  const popup = document.getElementById('popup-window');
  const closeBtn = document.getElementById('close-btn');

  // Show the popup
  popup.style.display = 'block';

  // Close the popup when the close button is clicked
  closeBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });
});
