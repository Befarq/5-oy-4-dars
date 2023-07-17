let gamers = JSON.parse(localStorage.getItem("gamers"))
  ? JSON.parse(localStorage.getItem("gamers"))
  : [];
gamers.sort((a, b) => (a.score - b.score ? 1 : -1));
const makeBests = () => {
  if (gamers.length > 0) {
    let jadval = document.createElement("table");
    jadval.innerHTML = `<tr><td>N</td><td>Player</td><td>Score</td></tr><tr>`;
    for (let i = 0; i < 5; i++) {
      jadval.innerHTML += `<tr><td>#${i + 1}</td><td>${
        gamers[i].userName
      }</td><td>${gamers[i].userScore} ball</td></tr><tr>`;
    }
    document.getElementById("modalka").appendChild(jadval);
  }
};
let resetButton = document.createElement("button");
resetButton.textContent = "yana oynash";
resetButton.addEventListener("click", () => {
  modal.innerHTML = "";
  userTime = 10;
  userScore = 0;
  document.getElementById("fon").style.display = "none";
  modal.style.display = "none";
  Game();
});
let exitButton = document.createElement("button");
exitButton.textContent = "chiqish";
exitButton.addEventListener("click", () => {
  close();
});
let inputEl = document.createElement("input");
let button = document.createElement("button");
let password = document.createElement("input");
let modal = document.getElementById("modalka");
let userTime = 10;
let userScore = 0;
let randomWord;
let userName = "";
let kalitSuz = "";
const suzAlmash = (suzJoyi) => {
  randomWord = words[Math.trunc(Math.random() * words.length)];
  suzJoyi.textContent = randomWord;
};
modal.append(inputEl);
inputEl.placeholder = "Ismingizni kiriting";
inputEl.focus();
modal.append(password);
inputEl.type = "text";
password.type = "password";

modal.append(button);
makeBests();
button.textContent = "Ok";
button.addEventListener("click", (e) => {
  e.preventDefault();
  userName = inputEl.value;
  kalitSuz = password.value;
  modal.style.display = "none";
  document.getElementById("fon").style.display = "none";
  modal.innerHTML = "";
  Game();
});
const Game = () => {
  let playstation = document.createElement("div");
  playstation.id = "playstation";
  document.body.appendChild(playstation);
  let suzJoyi = document.createElement("h1");
  suzAlmash(suzJoyi);
  suzJoyi.id = "Suz";
  playstation.appendChild(suzJoyi);
  inputEl.placeholder = "yuqoridagi suzni";
  playstation.appendChild(inputEl).value = "";
  let timeWord = document.createElement("h2");
  timeWord.textContent = `Timer:${userTime}s`;
  playstation.appendChild(timeWord);
  let scoreWord = document.createElement("h2");

  playstation.appendChild(scoreWord);

  const timeInterval = setInterval(() => {
    if (userTime > 0) {
      timeWord.textContent = `Timer:${userTime}s`;
      userTime--;
      inputEl.addEventListener("input", (e) => {
        if (inputEl.value == randomWord) {
          userScore++;
          userTime += 3;
          inputEl.value = "";
          suzAlmash(suzJoyi);
        }
        scoreWord.textContent = `${userScore} ball`;
      });
    } else {
      clearInterval(timeInterval);
      const userInfo = {
        userName,
        kalitSuz,
        userScore,
      };
      gamers.push(userInfo);
      localStorage.setItem("gamers", JSON.stringify(gamers));
      document.getElementById("fon").style.display = "block";
      modal.style.display = "flex";
      let youLoose = document.createElement("h1");
      youLoose.textContent = `${userName} siz ${userScore} ball bilan yutqazdingiz!`;
      modal.append(youLoose);
      modal.append(resetButton);
      modal.append(exitButton);
    }
  }, 1000);
};
console.log(gamers);
