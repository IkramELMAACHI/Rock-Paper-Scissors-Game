"use strict";

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
var pick = Array.from(document.querySelectorAll(".pick"));
var choice = document.querySelector(".choice");
var show = document.querySelector(".show");
var resultDiv = document.querySelector(".result");
var resultH1 = document.querySelector(".result h1");
var again = document.getElementById("again");
var score = document.querySelector("span");

var playerPick, pcPick, number;

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

function computerPick() {
  var tab = ["paper", "rock", "scissors"];
  var rand = Math.floor(Math.random() * 3);
  console.log(rand);

  var compEmpty = document.querySelector(".compEmpty");
  // console.log(compEmpty);

  compEmpty.classList.remove("compEmpty");
  // Creation div player
  // var divComputer = document.createElement("div");
  var divComputerChild = document.createElement("div");

  // Ajout classe au div
  compEmpty.classList.add("mx-auto", "cont-icon-" + tab[rand]);
  divComputerChild.classList.add("bg-" + tab[rand]);

  // insertion div child dans div parent
  // compEmpty.append(divComputer);
  compEmpty.append(divComputerChild);
  pcPick = tab[rand];

  resultat(playerPick, pcPick);
  // return tab[rand];
}

function resultat(player, pc) {
  var result;

  switch (player) {
    case "paper":
      result =
        pc === "rock" ? "you win" : pc === "scissors" ? "you lose" : "draw";

      break;
    case "rock":
      result =
        pc === "scissors" ? "you win" : pc === "paper" ? "you lose" : "draw";

      break;
    case "scissors":
      result = pc === "paper" ? "you win" : pc === "rock" ? "you lose" : "draw";

      break;

    default:
      break;
  }

  console.log(player);
  console.log(pc);
  console.log(result);

  // **************************show result****************************************
  resultH1.innerHTML = result.toUpperCase();
  resultDiv.style.display = "block";

  if (result === "you win") {
    sessionStorage.setItem("scoreBoard", parseInt(number) + 2);
    score.innerHTML = sessionStorage.getItem("scoreBoard");
  } else if (result === "you lose") {
    sessionStorage.setItem("scoreBoard", parseInt(number) - 1);
    score.innerHTML = sessionStorage.getItem("scoreBoard");
  } else {
    sessionStorage.setItem("scoreBoard", parseInt(number) + 10);
    score.innerHTML = sessionStorage.getItem("scoreBoard");
  }
}

/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/

// recuperation la session  et afficher dans span le score
number = sessionStorage.getItem("scoreBoard")
  ? sessionStorage.getItem("scoreBoard")
  : 0;
if (parseInt(number) > 10) {
  score.innerHTML = "WIN";
} else {
  score.innerHTML = number;
}
// score.innerHTML = number;

pick.forEach((elem) => {
  elem.addEventListener("click", function (e) {
    choice.style.display = "none";
    show.style.display = "block";

    var className = elem.classList[0].substring(
      10,
      elem.classList[0].length - 1
    );

    // Creation div player
    var divPlayer = document.createElement("div");
    var divPlayerChild = document.createElement("div");

    // Ajout classe au div
    divPlayer.classList.add("mx-auto", "cont-icon-" + className);
    divPlayerChild.classList.add("bg-" + className);

    // insertion div child dans div parent
    document.querySelector(".player").append(divPlayer);
    divPlayer.append(divPlayerChild);

    playerPick = className;
    setTimeout(computerPick, 1000);
  });
});

again.addEventListener("click", function () {
  sessionStorage.setItem("test", 1);

  location.reload();
});
