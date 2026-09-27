let currentGame ="";
let score=0;
let memoryCards=[];
let flippedCards=[];
let matchedPairs=0;
let moves=0;
let canFlip=true;
let sequenceAnswer=0;
let sequenceRound=0;
let patternAnswer= "";
function startGame(game){
    currentGame = game;
    score=0;
    document.getElementById("score").textContent=score;
    document.getElementById("home").classList.remove("active");
    document.getElementById("game").classList.add("active");
    if (game==="memory"){
        document.getElementById("gameTitle").textContent=
        "Memory Match";
        startMemoryGame();
    }
    else if(game==="number"){
        document.getElementById("gameTitle").textContent=
        "Number Sequence";
        startNumberGame();
    }
    else if(game==="pattern"){
        document.getElementById("gameTitle").textContent=
        "Pattern Puzzle";
        startPatternGame();
    }
}
function returnHome(){
    document.getElementById("game").classList.remove("active");
    document.getElementById("home").classList.add("active");
}
function showResults(){
    returnHome();
}
function startMemoryGame(){

    matchedPairs=0;
    moves=0;
    flippedCards=[];
    canFlip=true;
    const symbols=[
        "🚀",
        "🎮",
        "⚡",
        "🔥",
        "🌟",
        "🎯",
        "💎",
        "🧠"
    ];
    memoryCards=[...symbols, ...symbols];
    shuffle(memoryCards);
    const gameContent=
    document.getElementById("gameContent");
    gameContent.innerHTML = `
        <div class="memory-info">
            <div>
                Moves: <span id="moves">0</span>
            </div>
            <div>
                Pairs: <span id="pairs">0</span>/8
            </div>

        </div>

        <div class="memory-grid" id="memoryGrid"></div>
    `;

    const memoryGrid=
        document.getElementById("memoryGrid");
        memoryCards.forEach((symbol, index) => {
        const card=document.createElement("button");
        card.className="memory-card";
        card.dataset.symbol=symbol;
        card.dataset.index=index;
        card.innerHTML = `
            <span class="card-front">?</span>
            <span class="card-back">${symbol}</span>
        `;
        card.onclick=function(){
            flipCard(card);
        };
        memoryGrid.appendChild(card);
    });
}
function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        const j=
        Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=
        [array[j],array[i]];
    }
}
function flipCard(card){
    if(!canFlip){
        return;
    }
    if (card.classList.contains("flipped")){
        return;
    }
    if (card.classList.contains("matched")){
        return;
    }
    card.classList.add("flipped");
    flippedCards.push(card);
    if(flippedCards.length===2){
        checkMatch();
    }
}
function checkMatch(){
    canFlip=false;
    const firstCard=flippedCards[0];
    const secondCard=flippedCards[1];
    moves++;
    document.getElementById("moves").textContent=
        moves;
    if(
        firstCard.dataset.symbol ===
        secondCard.dataset.symbol
    ) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;
        document.getElementById("pairs").textContent=
            matchedPairs;
        if(matchedPairs===8){
            setTimeout(()=>{
                showResults();
            },600);
        }    
        score += 10;
        document.getElementById("score").textContent=
            score;
        flippedCards=[];
        canFlip=true;
    }
    else{
        setTimeout(()=>{
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            flippedCards=[];
            canFlip=true;
        },800);
    }
}      
function startNumberGame(){

    sequenceRound = 0;

    const gameContent =
        document.getElementById("gameContent");

    gameContent.innerHTML = `
        <div class="sequence-game">

            <h2>Number Sequence</h2>

            <p style="margin-top: 15px; color: #94a3b8;">
                Find the missing number
            </p>

            <div id="sequenceDisplay"
                 style="font-size: 32px; margin: 30px 0;">
            </div>

            <input
                id="sequenceInput"
                type="number"
                placeholder="Your answer"
            >

            <button onclick="checkSequence()">
                Submit
            </button>

            <div id="sequenceMessage"></div>

        </div>
    `;

    showNextSequence();
}
function showNextSequence(){
    const sequences=[
       { numbers: "2 → 4 → 6 → ?", answer: 8 },
    { numbers: "5 → 10 → 15 → ?", answer: 20 },
    { numbers: "3 → 6 → 12 → ?", answer: 24 },
    { numbers: "10 → 20 → 30 → ?", answer: 40 },
    { numbers: "1 → 4 → 7 → ?", answer: 10 },
    { numbers: "7 → 14 → 21 → ?", answer: 28 },
    { numbers: "20 → 18 → 16 → ?", answer: 14 },
    { numbers: "4 → 8 → 12 → ?", answer: 16 },
    { numbers: "6 → 12 → 18 → ?", answer: 24 },
    { numbers: "9 → 18 → 27 → ?", answer: 36 },
    { numbers: "1 → 2 → 4 → ?", answer: 8 },
    { numbers: "2 → 6 → 18 → ?", answer: 54 },
    { numbers: "3 → 9 → 27 → ?", answer: 81 },
    { numbers: "5 → 15 → 45 → ?", answer: 135 },
    { numbers: "4 → 12 → 36 → ?", answer: 108 },
    { numbers: "100 → 90 → 80 → ?", answer: 70 },
    { numbers: "50 → 45 → 40 → ?", answer: 35 },
    { numbers: "30 → 27 → 24 → ?", answer: 21 },
    { numbers: "25 → 30 → 35 → ?", answer: 40 },
    { numbers: "11 → 22 → 33 → ?", answer: 44 },
    { numbers: "1 → 3 → 5 → ?", answer: 7 },
    { numbers: "4 → 7 → 10 → ?", answer: 13 },
    { numbers: "8 → 12 → 16 → ?", answer: 20 },
    { numbers: "15 → 20 → 25 → ?", answer: 30 },
    { numbers: "2 → 5 → 8 → ?", answer: 11 },
    { numbers: "10 → 15 → 20 → ?", answer: 25 },
    { numbers: "6 → 11 → 16 → ?", answer: 21 },
    { numbers: "12 → 24 → 36 → ?", answer: 48 },
    { numbers: "7 → 17 → 27 → ?", answer: 37 },
    { numbers: "14 → 21 → 28 → ?", answer: 35 }
    ];

    const randomIndex=
        Math.floor(Math.random()*sequences.length);
    const sequence=
        sequences[randomIndex];
    sequenceAnswer=sequence.answer;
    document.getElementById("sequenceDisplay").textContent=
        sequence.numbers;
    document.getElementById("sequenceInput").value="";
    document.getElementById("sequenceMessage").textContent= "";
}
function checkSequence(){

    const input=
        document.getElementById("sequenceInput");
    const message=
        document.getElementById("sequenceMessage");
    const answer=Number(input.value);
    if(answer === sequenceAnswer){
        score += 10;

        document.getElementById("score").textContent=
            score;

        sequenceRound++;
        message.textContent="✓ Correct! +10 points"
        message.style.color="#22c55e";
        input.value= "";
        setTimeout(() => {
    showNextSequence();
}, 700);
    } else{
        message.textContent="✕ Wrong! Try again.";
        message.style.color="#ef4444";
        input.value= "";
    }
}
function startPatternGame(){

    const gameContent=
        document.getElementById("gameContent");

    gameContent.innerHTML= `
        <div class="pattern-game">

            <h2>Pattern Puzzle</h2>

            <p style="margin-top: 15px; color: #94a3b8;">
                Find what comes next
            </p>
            <div id="patternDisplay"
                 style="font-size: 40px; margin: 30px 0;">
            </div>

            <div id="patternOptions"
                 class="pattern-options">
            </div>

            <div id="patternMessage"></div>

        </div>
    `;

    showNextPattern();
}
function showNextPattern(){

  const patterns = [

    {
        pattern: "🔴 🔵 🔵 🔴 🔵 🔵 ?",
        answer: "🔴",
        options: ["🔴", "🔵", "🟢"]
    },

    {
        pattern: "⭐ 🔷 🔷 ⭐ 🔷 🔷 ?",
        answer: "⭐",
        options: ["⭐", "🔷", "🟣"]
    },

    {
        pattern: "🟢 🟡 🔵 🟢 🟡 🔵 ?",
        answer: "🟢",
        options: ["🟢", "🟡", "🔵"]
    },

    {
        pattern: "🔺 🔵 🔵 🔺 🔵 🔵 ?",
        answer: "🔺",
        options: ["🔺", "🔵", "🟣"]
    },

    {
        pattern: "🔥 ⚡ 💎 🔥 ⚡ 💎 ?",
        answer: "🔥",
        options: ["🔥", "⚡", "💎"]
    },

    {
        pattern: "🟣 🟢 🟣 🟡 🟣 🟢 ?",
        answer: "🟣",
        options: ["🟣", "🟢", "🟡"]
    },

    {
        pattern: "⭐ ⭐ 🔷 ⭐ 🔷 ⭐ ⭐ ?",
        answer: "🔷",
        options: ["⭐", "🔷", "🟣"]
    },

    {
        pattern: "🔴 🟢 🔵 🔴 🟢 🔵 ?",
        answer: "🔴",
        options: ["🔴", "🟢", "🔵"]
    },

    {
        pattern: "🚀 🎮 🎮 🚀 🎮 🎮 ?",
        answer: "🚀",
        options: ["🚀", "🎮", "🎯"]
    },

    {
        pattern: "🔺 🔺 🔵 🔺 🔵 🔺 🔺 ?",
        answer: "🔵",
        options: ["🔺", "🔵", "🟢"]
    },

    {
        pattern: "🟢 🔵 🟡 🟢 🔵 🟡 ?",
        answer: "🟢",
        options: ["🟢", "🔵", "🟡"]
    },

    {
        pattern: "💎 🔥 💎 ⚡ 💎 🔥 ?",
        answer: "💎",
        options: ["💎", "🔥", "⚡"]
    },

    {
        pattern: "⭐ 🔷 ⭐ ⭐ 🔷 ⭐ ⭐ ?",
        answer: "🔷",
        options: ["⭐", "🔷", "🟢"]
    },

    {
        pattern: "🔴 🔴 🟢 🔵 🔴 🔴 🟢 ?",
        answer: "🔵",
        options: ["🔴", "🟢", "🔵"]
    },

    {
        pattern: "🔥 💎 ⚡ 🔥 💎 ⚡ 🔥 ?",
        answer: "💎",
        options: ["🔥", "💎", "⚡"]
    }

];

    const randomIndex =
        Math.floor(Math.random() * patterns.length);

    const pattern =
        patterns[randomIndex];

    patternAnswer = pattern.answer;

    document.getElementById("patternDisplay").textContent =
        pattern.pattern;

    const options =
        document.getElementById("patternOptions");

    options.innerHTML = "";

    pattern.options.forEach(option => {

        const button =
            document.createElement("button");

        button.textContent = option;

        button.onclick = function(){
            checkPattern(option);
        };

        options.appendChild(button);
    });

    document.getElementById("patternMessage").textContent = "";
}
function checkPattern(answer){

    const message =
        document.getElementById("patternMessage");

    if(answer === patternAnswer){

        score += 10;

        document.getElementById("score").textContent =
            score;

        message.textContent =
            "✓ Correct! +10 points";

        message.style.color =
            "#22c55e";

        setTimeout(() => {
            showNextPattern();
        }, 700);

    } else {

        message.textContent =
            "✕ Wrong! Try again.";

        message.style.color =
            "#ef4444";
    }
}