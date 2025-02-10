let currentLevel = "Fácil";
let correctAnswers = 0;
const morseData = [
  { code: ".-", letter: "A" },
  { code: "-...", letter: "B" },
  { code: "-.-.", letter: "C" },
  { code: "-..", letter: "D" },
  { code: ".", letter: "E" },
  { code: "..-.", letter: "F" },
  { code: "--.", letter: "G" },
  { code: "....", letter: "H" },
  { code: "..", letter: "I" },
  { code: ".---", letter: "J" },
  { code: "-.-", letter: "K" },
  { code: ".-..", letter: "L" },
  { code: "--", letter: "M" },
  { code: "-.", letter: "N" },
  { code: "---", letter: "O" },
  { code: ".--.", letter: "P" },
  { code: "--.-", letter: "Q" },
  { code: ".-.", letter: "R" },
  { code: "...", letter: "S" },
  { code: "-", letter: "T" },
  { code: "..-", letter: "U" },
  { code: "...-", letter: "V" },
  { code: ".--", letter: "W" },
  { code: "-..-", letter: "X" },
  { code: "-.--", letter: "Y" },
  { code: "--..", letter: "Z" },
  { code: "-----", letter: "0" },
  { code: ".----", letter: "1" },
  { code: "..---", letter: "2" },
  { code: "...--", letter: "3" },
  { code: "....-", letter: "4" },
  { code: ".....", letter: "5" },
  { code: "-....", letter: "6" },
  { code: "--...", letter: "7" },
  { code: "---..", letter: "8" },
  { code: "----.", letter: "9" }
];

let currentQuestion = generateQuestion();

function generateQuestion() {
  const randomIndex = Math.floor(Math.random() * morseData.length);
  return morseData[randomIndex];
}

function displayQuestion() {
  const morseCode = currentQuestion.code;
  const correctAnswer = currentQuestion.letter;

  document.getElementById("morse-code").textContent = morseCode;

  const answers = [correctAnswer, ...generateRandomAnswers(correctAnswer)];
  answers.sort(() => Math.random() - 0.5);

  const answerButtons = document.querySelectorAll(".answer");
  answerButtons.forEach((button, index) => {
    button.textContent = answers[index];
    button.classList.remove("correct", "incorrect");
  });
}

function generateRandomAnswers(correctAnswer) {
  const randomAnswers = [];
  while (randomAnswers.length < 2) {
    const randomIndex = Math.floor(Math.random() * morseData.length);
    const randomLetter = morseData[randomIndex].letter;
    if (!randomAnswers.includes(randomLetter) && randomLetter !== correctAnswer) {
      randomAnswers.push(randomLetter);
    }
  }
  return randomAnswers;
}

function checkAnswer(selectedIndex) {
  const answerButtons = document.querySelectorAll(".answer");
  const selectedAnswer = answerButtons[selectedIndex].textContent;
  const correctAnswer = currentQuestion.letter;

  if (selectedAnswer === correctAnswer) {
    correctAnswers++;
    answerButtons[selectedIndex].classList.add("correct");
    document.getElementById("correct-answers").textContent = `Respuestas correctas: ${correctAnswers}`;

    if (correctAnswers >= 5) {
      if (currentLevel === "Fácil") {
        currentLevel = "Medio";
      } else if (currentLevel === "Medio") {
        currentLevel = "Difícil";
      } else {
        // Mensaje de felicitaciones al pasar el nivel difícil
        document.getElementById("result").textContent = "¡Felicidades! Has superado todos los niveles, has aprendido muy bien del código morse.";
        document.getElementById("correct-answers").textContent = `Respuestas correctas: ${correctAnswers}`;
        return;
      }
      correctAnswers = 0;

      // Efecto de transición para el nivel
      transitionLevel();
      fadeTransition();
    }

    // Pasar a una nueva pregunta después de una respuesta correcta
    currentQuestion = generateQuestion();
    displayQuestion();
  } else {
    answerButtons[selectedIndex].classList.add("incorrect");
    setTimeout(() => {
      answerButtons[selectedIndex].classList.remove("incorrect");
    }, 1000);
  }
}

function transitionLevel() {
  const levelElement = document.getElementById("level");
  levelElement.classList.add("hidden");

  setTimeout(() => {
    levelElement.textContent = `Nivel ${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}`;
    levelElement.classList.remove("hidden");
  }, 1000);
}

function fadeTransition() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.style.transition = "opacity 1s";
  gameContainer.style.opacity = 0;
  setTimeout(() => {
    gameContainer.style.opacity = 1;
  }, 1000);
}

function restartGame() {
  currentLevel = "Fácil";
  correctAnswers = 0;
  document.getElementById("level").textContent = `Nivel ${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}`;
  document.getElementById("correct-answers").textContent = "Respuestas correctas: 0";
  currentQuestion = generateQuestion();
  displayQuestion();
  document.getElementById("result").textContent = "";
}

window.onload = function() {
  // Inicializar el nivel en la carga de la página
  document.getElementById("level").textContent = `Nivel ${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}`;
  displayQuestion();
};
