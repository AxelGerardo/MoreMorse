const morseCode = {
    'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',  
    'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---',
    'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---',
    'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
    'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--',
    'Z': '--..',  '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.'
};

function textToMorse(text) {
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
}

document.getElementById('morseForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const textInput = document.getElementById('textInput').value;
    const morseResult = textToMorse(textInput);

    document.getElementById('result').innerText = `Traducción en Morse: ${morseResult}`;
    document.getElementById('vibrateButton').style.display = window.innerWidth < 1024 ? 'block' : 'none';
});

function vibrateMorse(morse) {
    const vibratePattern = [];
    const words = morse.split('   ');

    words.forEach((word, wordIndex) => {
        const letters = word.split(' '); 

        letters.forEach((letter, letterIndex) => {
            letter.split('').forEach((char, charIndex) => {
                if (char === '.') {
                    vibratePattern.push(2000); // la duración de un punto es de 2 segundo
                } else if (char === '-') {
                    vibratePattern.push(5000); // la duración de una raya es de 5 segundos
                }

                // pausa de 1 segundo entre los símbolos de la misma letra (-- ..) 
                if (charIndex < letter.length - 1) {
                    vibratePattern.push(1000); 
                }
            });

            // pausa de 3 segundos entre las letras de una palabra
            if (letterIndex < letters.length - 1) {
                vibratePattern.push(700);
            }
        });

        // pausa de 9 segundos después de cada palabra
        if (wordIndex < words.length - 1) {
            vibratePattern.push(9500);
        }
    });

    navigator.vibrate(vibratePattern); // Aquí se activa la vibración
}

document.getElementById('vibrateButton').addEventListener('click', function() {
    const morseResult = document.getElementById('result').innerText.replace('Traducción en Morse: ', '');
    if (navigator.vibrate) {
        vibrateMorse(morseResult);
    } else {
        alert("Este dispositivo no soporta vibraciones.");
    }
});