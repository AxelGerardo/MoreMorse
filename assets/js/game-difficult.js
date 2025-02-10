const morseDictionary = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
};

const words = ['PERRO', 'CASA', 'GATO', 'LUNA', 'SOL'];
const phrases = [
    'LA LUNA ES GRANDE',
    'EL SOL BRILLA',
    'LOS GATOS CORREN',
    'MI CASA ES AZUL',
    'LOS PERROS LADRAN'
];

let score = 0;
let round = 0;
const totalRounds = 10;

const textCard = document.getElementById('textCard');
const morseInput = document.getElementById('morseInput');
const scoreDisplay = document.getElementById('score');
const roundDisplay = document.getElementById('round');
const resetBtn = document.getElementById('resetBtn');
const submitBtn = document.getElementById('submitBtn');

function getTextForRound() {
    if (round <= 5) {
        return words[round - 1];  
    } else {
        return phrases[round - 6]; 
    }
}

function convertToMorse(text) {
    return text.toUpperCase().split('').map(char => {
        if (char === ' ') return '/'; 
        return morseDictionary[char] || ''; 
    }).join(' ');
}

function loadRound() {
    if (round < totalRounds) {
        round++;
        roundDisplay.textContent = `Ronda: ${round}/${totalRounds}`;

        const currentText = getTextForRound();
        textCard.textContent = currentText;  
        morseInput.value = '';  
    } else {
        setTimeout(() => {
            alert(`¡Juego terminado! Tu puntuación final es: ${score}`);
            resetBtn.style.display = 'block';  
        }, 100); 
    }
}

function checkAnswer() {
    const userInput = morseInput.value.trim();
    const correctMorse = convertToMorse(textCard.textContent);

    if (userInput === correctMorse) {
        score += 10;  
        alert('¡Correcto!');
    } else {
        alert(`Incorrecto. La respuesta correcta es: ${correctMorse}`);
    }

    scoreDisplay.textContent = `Puntos: ${score}`;
    loadRound();  
}

function resetGame() {
    score = 0;
    round = 0;
    scoreDisplay.textContent = `Puntos: ${score}`;
    roundDisplay.textContent = `Ronda: ${round + 1}/${totalRounds}`;
    resetBtn.style.display = 'none';  
    loadRound();  
}

submitBtn.addEventListener('click', checkAnswer);

resetBtn.addEventListener('click', resetGame);

loadRound();
