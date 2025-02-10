const morseDictionary = [
    { letter: 'A', audio: 'audios/A.mp3' },
    { letter: 'B', audio: 'audios/B.mp3' },
    { letter: 'C', audio: 'audios/C.mp3' },
    { letter: 'D', audio: 'audios/D.mp3' },
    { letter: 'E', audio: 'audios/E.mp3' },
    { letter: 'F', audio: 'audios/F.mp3' },
    { letter: 'G', audio: 'audios/G.mp3' },
    { letter: 'H', audio: 'audios/H.mp3' },
    { letter: 'I', audio: 'audios/I.mp3' },
    { letter: 'J', audio: 'audios/J.mp3' },
    { letter: 'K', audio: 'audios/K.mp3' },
    { letter: 'L', audio: 'audios/L.mp3' },
    { letter: 'M', audio: 'audios/M.mp3' },
    { letter: 'N', audio: 'audios/N.mp3' },
    { letter: 'O', audio: 'audios/O.mp3' },
    { letter: 'P', audio: 'audios/P.mp3' },
    { letter: 'Q', audio: 'audios/Q.mp3' },
    { letter: 'R', audio: 'audios/R.mp3' },
    { letter: 'S', audio: 'audios/S.mp3' },
    { letter: 'T', audio: 'audios/T.mp3' },
    { letter: 'U', audio: 'audios/U.mp3' },
    { letter: 'V', audio: 'audios/V.mp3' },
    { letter: 'W', audio: 'audios/W.mp3' },
    { letter: 'X', audio: 'audios/X.mp3' },
    { letter: 'Y', audio: 'audios/Y.mp3' },
    { letter: 'Z', audio: 'audios/Z.mp3' },
    { letter: '1', audio: 'audios/1.mp3' },
    { letter: '2', audio: 'audios/2.mp3' },
    { letter: '3', audio: 'audios/3.mp3' },
    { letter: '4', audio: 'audios/4.mp3' },
    { letter: '5', audio: 'audios/5.mp3' },
    { letter: '6', audio: 'audios/6.mp3' },
    { letter: '7', audio: 'audios/7.mp3' },
    { letter: '8', audio: 'audios/8.mp3' },
    { letter: '9', audio: 'audios/9.mp3' },
    { letter: '0', audio: 'audios/0.mp3' }
];

let score = 0;
let round = 0;
let currentAudio = null;  
const totalRounds = 10;

const scoreDisplay = document.getElementById('score');
const roundDisplay = document.getElementById('round');
const resetBtn = document.getElementById('resetBtn');
const optionButtons = document.querySelectorAll('.options button');
const speaker = document.getElementById('speaker');

function getRandomMorse() {
    const randomIndex = Math.floor(Math.random() * morseDictionary.length);
    return morseDictionary[randomIndex];
}

function getUniqueIncorrectOptions(correctLetter, count) {
    const incorrectOptions = [];
    while (incorrectOptions.length < count) {
        const randomEntry = getRandomMorse();
        const randomLetter = randomEntry.letter.toUpperCase();
        if (randomLetter !== correctLetter && !incorrectOptions.includes(randomLetter)) {
            incorrectOptions.push(randomLetter);
        }
    }
    return incorrectOptions;
}

function playMorseSound(audioSrc) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(audioSrc);
    currentAudio.play();
}

function loadRound() {
    if (round < totalRounds) {
        round++;
        roundDisplay.textContent = `Ronda: ${round}/${totalRounds}`;
        
        const correctMorse = getRandomMorse();
        const correctLetter = correctMorse.letter.toUpperCase();
        
        speaker.onclick = () => playMorseSound(correctMorse.audio);
        
        const incorrectOptions = getUniqueIncorrectOptions(correctLetter, optionButtons.length - 1);
        
        const allOptions = [...incorrectOptions, correctLetter];
        
        shuffleArray(allOptions);
        
        optionButtons.forEach((button, index) => {
            button.textContent = allOptions[index];
        });

        speaker.dataset.correctAnswer = correctLetter;
    } else {
        setTimeout(() => {
            alert(`¡Juego terminado! Tu puntuación final es: ${score}`);
            resetBtn.style.display = 'block';
        }, 100);
    }
}

function checkAnswer(button) {
    const selectedAnswer = button.textContent.toUpperCase();
    const correctAnswer = speaker.dataset.correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score += 10;  
        button.style.backgroundColor = '#28a745'; 
    } else {
        button.style.backgroundColor = '#dc3545'; 
        optionButtons.forEach(btn => {
            if (btn.textContent.toUpperCase() === correctAnswer) {
                btn.style.backgroundColor = '#28a745'; 
            }
        });
    }

    optionButtons.forEach(btn => btn.disabled = true);

    scoreDisplay.textContent = `Puntos: ${score}`;
    
    setTimeout(() => {
        optionButtons.forEach(btn => {
            btn.style.backgroundColor = '#ff9d00';
            btn.disabled = false;
        });
        loadRound();
    }, 1000);
}

function resetGame() {
    score = 0;
    round = 0;
    scoreDisplay.textContent = `Puntos: ${score}`;
    roundDisplay.textContent = `Ronda: ${round + 1}/${totalRounds}`;
    resetBtn.style.display = 'none';
    loadRound();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

optionButtons.forEach(button => {
    button.addEventListener('click', () => checkAnswer(button));
});

resetBtn.addEventListener('click', resetGame);

loadRound();