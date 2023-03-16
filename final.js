const cardsArray = [
  {
    name: "Front1",
    img: "img/Front1.png",
  },
  {
    name: "Front2",
    img: "img/Front2.png",
  },
  {
    name: "Front3",
    img: "img/Front3.png",
  },
  {
    name: "Front4",
    img: "img/Front4.png",
  },
  {
    name: "Front5",
    img: "img/Front5.png",
  },
  {
    name: "Front6",
    img: "img/Front6.png",
  },
  {
    name: "Front7",
    img: "img/Front7.png",
  },
  {
    name: "Front8",
    img: "img/Front8.png",
  },
  {
    name: "Front9",
    img: "img/Front9.png",
  },
  {
    name: "Front10",
    img: "img/Front10.png",
  },
  {
    name: "Front11",
    img: "img/Front11.png",
  },
  {
    name: "Front12",
    img: "img/Front12.png",
  },
  {
    name: "Front13",
    img: "img/Front13.png",
  },
  {
    name: "Front14",
    img: "img/Front14.png",
  },
];
let previousCard;
let count = 0;
let firstGuess = "";
let secondGuess = "";
const delay = 1000;
const grid = document.querySelector(".grid");
// array.sort(() => 0.5 - Math.random()): random array
function generateCard() {
  // reset innerHTML
  grid.innerHTML = "";
  const cardsArrayMerge = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());
  cardsArrayMerge.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-name", item.name);
    // front card
    const front = document.createElement("div");
    front.classList.add("front");
    // back card
    const back = document.createElement("div");
    back.classList.add("back");
    // card.dataset.name = item.name;
    back.style.backgroundImage = `url(${item.img})`;
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });
}
generateCard();
function matchingCard() {
  const selects = document.querySelectorAll(".selected");
  [...selects].forEach((item) => item.classList.add("matched"));
}
function resetGuess() {
  count = 0;
  firstGuess = "";
  secondGuess = "";
  previousCard = null;
  const selects = document.querySelectorAll(".selected");
  const matchedAll = document.querySelectorAll(".matched");
  const cardLength = document.querySelectorAll(".card").length;
  [...selects].forEach((item) => item.classList.remove("selected"));
  if (matchedAll.length === cardLength) {
    // done game -> reset game
    AlertOutPut();
    setTimeout(
      matchedAll.forEach((el) => el.classList.remove("matched")),
      1000
    );
    setTimeout(generateCard, delay);
  }
}
grid.addEventListener("click", function (event) {
  const clicked = event.target;
  if (
    clicked.nodeName === "SECTION" ||
    previousCard === clicked ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("matched")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(matchingCard, delay);
      }
      setTimeout(resetGuess, delay);
    }
    previousCard = clicked;
  }
});

function renderSweetAlert() {
  const template = ` <div class="sweet-alert">
    <i class="fa fa-check sweet-icon"></i>
    <p class="sweet-text">Congratulations You Win Game</p>
     <img src="./img/Congratulation.png" alt="Ash" id="Ash" />  
    </div>`;
  document.body.insertAdjacentHTML("beforeend", template);
}

function AlertOutPut() {
  renderSweetAlert();
  const sweetItem = document.querySelector(".sweet-alert");
  if (sweetItem) {
    setTimeout(function () {
      sweetItem.parentElement.removeChild(sweetItem);
    }, 2000);
  }
}
