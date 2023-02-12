const selectionLeft = document.getElementById("selectionLeft");
const selectionRight = document.getElementById("selectionRight");
const results = document.getElementById("results");
const options = document.getElementById("options").children;
const marcadorPlayer = document.getElementById("marcadorPlayer");
const marcadorComputer = document.getElementById("marcadorComputer");
const instructions = document.getElementById("instructions");
const score = [0, 0];
const optionsList = ["Piedra", "Papel", "Tijeras"];
const resultsList = ["Empate", "Ganaste", "Perdiste"];
let enabled = true;

for (let option of options) {
  option.addEventListener("click", () => {
    if (enabled == true) {
      //change 'enabled' to prevent spam click
      enabled = false;
      //get choices
      let playerChoice = optionsList.indexOf(option.id);
      let ComputerChoice = Math.floor(Math.random() * 3);
      //calculate winner
      let winner = getWinner(playerChoice, ComputerChoice);
      //create selection elements and append them
      const PlayerSelection = select(option.id);
      selectionLeft.appendChild(PlayerSelection);
      const ComputerSelection = select(optionsList[ComputerChoice]);
      selectionRight.appendChild(ComputerSelection);
      //hide instructions
      instructions.style.opacity = 0;

      setTimeout(() => {
        //change scores
        marcadorComputer.innerText = score[1];
        marcadorPlayer.innerText = score[0];
        // clean board and show results
        selectionLeft.innerHTML = selectionRight.innerHTML = "";
        selectionLeft.style.opacity = selectionRight.style.opacity = 0;
        results.style.opacity = 1;
        results.innerHTML = `<p class='results__text'>${resultsList[winner]}</p>`;

        setTimeout(() => {
          //clean everything and get ready for next game
          selectionLeft.style.opacity =
            selectionRight.style.opacity =
            instructions.style.opacity =
              1;
          results.style.opacity = 0;
          results.innerHTML = "";
          enabled = true;
        }, 1000);
      }, 1000);
    }
  });
}

function select(id) {
  //Create selection div based on id
  let selection = document.createElement("div");
  const img = document.createElement("img");
  img.classList.add("selection__img");
  img.src = `./assets/${id}.svg`;
  img.alt = id;

  const text = document.createElement("p");
  text.classList.add("selection__text");
  text.innerText = id;
  selection.appendChild(img);
  selection.appendChild(text);
  return selection;
}

function getWinner(p1, p2) {
  //Check who won:
  //0 = draw - 1 = player - 2 = computer
  if ((p1 + 1) % 3 == p2) {
    score[1]++;
    return 2;
  } else if (p1 == p2) {
    return 0;
  } else {
    score[0]++;
    return 1;
  }
}
