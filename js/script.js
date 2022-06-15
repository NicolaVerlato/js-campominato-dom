const btn = document.getElementById('play-btn');

// massimo di numeri in base al livello di difficoltà
let maxNumber;

btn.addEventListener('click', clickButton
    
)

function clickButton(){
    // Chiedere all'utente il livello di difficoltà
    const difficultyLevel = document.getElementById('user-level').value;

    let gridClass;
    if(difficultyLevel === '1') {
        maxNumber = 100;
        gridClass = 'easy'
    } else if( difficultyLevel === '2') {
        maxNumber = 81;
        gridClass = 'hard'
    } else if(difficultyLevel === '3') {
        maxNumber = 49;
        gridClass = 'crazy'
    }
    console.log(difficultyLevel)
    console.log(maxNumber)
    // numero massimo bombe
    const maxbombs = 16;

    // array per i tentativi buoni dell'utente
    const goodAttempt = [];

    // array bombe con funzione (l'array è dento la funzione)
    const bombsArray = randomBombs(1, maxbombs);
    console.log(bombsArray)

    // numero massimo di tentativi
    const maxAttempts = maxNumber - bombsArray.length;

    crateGrid();

    const userMessage = document.getElementById('user-message');
    function crateGrid(){
        const grid = document.getElementById('grid');
        grid.classList.add(gridClass);

        for(let i = 1; i <= maxNumber; i++){
            // creo il qudrato dal sample html <div class="square"><span>1</span></div>
            const square = document.createElement('div');
            square.classList.add('square');
            // aggiungo il numero al quadrato
            square.innerHTML = `<span>${i}</span>`;
            
            square.addEventListener('click', handleClick);

            function handleClick(){
                let thisNumber = parseInt(this.querySelector('span').innerHTML);

                // ogni numero cliccato viene pushato nell'array dei numeri giusti
                goodAttempt.push(thisNumber)
                //  se l'utente preme uno square con una bomba 
                if(bombsArray.includes(thisNumber)){
                    this.classList.add('red');
                    let squares = document.querySelectorAll('.square');
                    
                    for(let i = 0; i < squares.length; i++){
                        // squares[i].removeEventListener('click', handleClick)
                        squares[i].style.pointerEvents = 'none';
                    }
                    

                    // messaggio per l'utente
                    userMessage.innerHTML = `Hai perso, il tuo punteggio è ${goodAttempt.length}`;
                } else{
                    this.classList.add('blue');
                }

                if(goodAttempt.length === maxNumber){
                    // messaggio per l'utente
                    userMessage.innerHTML = `Hai vinto, il tuo punteggio è ${goodAttempt.length}`;
                }
            }
            // appendo il quadrato alla griglia
            grid.append(square); 
        }
    }
}





// ------------------
// FUNZIONI
// ------------------
// funzione per generare le bombe
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// funzione per creare array bombe random
function randomBombs(min, max) {
    const array = [];

    while(array.length < max) {
        const bombs = getRndInteger(min, maxNumber);
        if(!array.includes(bombs)) {
            array.push(bombs);
        }
    }

    return array;
}

// funzione per endGame
// function endOfGame(result, score) {

//     if(result === 'win') {
//         alert('Hai Vinto!');
//         alert(score);
//     } else {
//         alert('Hai perso');
//         alert('Il tuo punteggio è: ' + score);
//     }
// }
