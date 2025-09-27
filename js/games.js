// Mini Games for BookWorm Journey

// Launch game based on selection
function launchGame(gameName) {
    switch(gameName) {
        case 'pete-buttons':
            launchPeteButtonGame();
            break;
        case 'story-match':
            launchStoryMatchGame();
            break;
        case 'word-builder':
            launchWordBuilderGame();
            break;
        case 'letter-match':
            launchLetterMatchGame();
            break;
    }
}

// Pete's Button Hunt Game
function launchPeteButtonGame() {
    const gameHTML = `
        <div id="gameModal" class="game-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        ">
            <div class="game-container" style="
                background: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>🔘 Pete's Button Hunt</h2>
                    <button onclick="closeMiniGame()" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Close ✕</button>
                </div>

                <p style="margin-bottom: 1rem;">Help Pete find all 4 of his groovy buttons! Click on them when you see them.</p>

                <div id="buttonGameScore" style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                ">
                    <span>Buttons Found: <strong id="buttonsFound">0</strong>/4</span>
                    <span>Time: <strong id="gameTimer">0</strong>s</span>
                </div>

                <div id="buttonGameArea" style="
                    position: relative;
                    height: 400px;
                    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                    border-radius: 15px;
                    overflow: hidden;
                ">
                    <!-- Buttons will appear here -->
                </div>

                <div id="gameComplete" style="
                    display: none;
                    text-align: center;
                    margin-top: 1rem;
                ">
                    <h3 style="color: #28a745;">🎉 Groovy! You found all the buttons!</h3>
                    <p>Time: <span id="finalTime">0</span> seconds</p>
                    <button onclick="startPeteGame()" style="
                        margin-top: 1rem;
                        padding: 0.75rem 2rem;
                        background: #667eea;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                    ">Play Again</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', gameHTML);
    startPeteGame();
}

// Start Pete's Button Game
function startPeteGame() {
    let buttonsFound = 0;
    let gameTime = 0;
    let gameTimer;
    const buttonColors = ['#ff0000', '#0000ff', '#ffff00', '#00ff00'];
    const gameArea = document.getElementById('buttonGameArea');

    // Reset game
    document.getElementById('buttonsFound').textContent = '0';
    document.getElementById('gameTimer').textContent = '0';
    document.getElementById('gameComplete').style.display = 'none';
    gameArea.innerHTML = '';

    // Start timer
    gameTimer = setInterval(() => {
        gameTime++;
        document.getElementById('gameTimer').textContent = gameTime;
    }, 1000);

    // Create buttons at random positions
    buttonColors.forEach((color, index) => {
        setTimeout(() => {
            const button = document.createElement('button');
            button.style.cssText = `
                position: absolute;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: ${color};
                border: 3px solid white;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                animation: buttonFloat 3s ease-in-out infinite;
                top: ${Math.random() * 70 + 10}%;
                left: ${Math.random() * 70 + 10}%;
            `;

            button.onclick = function() {
                buttonsFound++;
                document.getElementById('buttonsFound').textContent = buttonsFound;
                button.style.animation = 'buttonCollect 0.5s ease';

                setTimeout(() => {
                    button.remove();

                    if (buttonsFound === 4) {
                        clearInterval(gameTimer);
                        document.getElementById('finalTime').textContent = gameTime;
                        document.getElementById('gameComplete').style.display = 'block';

                        // Add achievement check
                        checkGameAchievement('pete-buttons', gameTime);
                    }
                }, 400);
            };

            gameArea.appendChild(button);
        }, index * 1000);
    });

    // Add animations
    if (!document.getElementById('gameAnimations')) {
        const style = document.createElement('style');
        style.id = 'gameAnimations';
        style.textContent = `
            @keyframes buttonFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
            @keyframes buttonCollect {
                0% { transform: scale(1) rotate(0deg); }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Story Match Memory Game
function launchStoryMatchGame() {
    const gameHTML = `
        <div id="gameModal" class="game-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        ">
            <div class="game-container" style="
                background: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>📚 Story Match</h2>
                    <button onclick="closeMiniGame()" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Close ✕</button>
                </div>

                <p style="margin-bottom: 1rem;">Match the book characters! Find all the pairs.</p>

                <div style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                ">
                    <span>Pairs Found: <strong id="pairsFound">0</strong>/6</span>
                    <span>Moves: <strong id="moveCount">0</strong></span>
                </div>

                <div id="storyMatchGrid" style="
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    padding: 1rem;
                    background: linear-gradient(135deg, #10b981, #3b82f6);
                    border-radius: 15px;
                ">
                    <!-- Cards will appear here -->
                </div>

                <div id="matchComplete" style="
                    display: none;
                    text-align: center;
                    margin-top: 1rem;
                ">
                    <h3 style="color: #28a745;">🎉 Great Job! You matched them all!</h3>
                    <p>Completed in <span id="finalMoves">0</span> moves</p>
                    <button onclick="startStoryMatch()" style="
                        margin-top: 1rem;
                        padding: 0.75rem 2rem;
                        background: #667eea;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                    ">Play Again</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', gameHTML);
    startStoryMatch();
}

// Start Story Match Game
function startStoryMatch() {
    const characters = ['🐛', '🐻', '🐭', '🐘', '🦊', '🦁'];
    const cards = [...characters, ...characters];
    let flippedCards = [];
    let matchedPairs = 0;
    let moveCount = 0;
    let canFlip = true;

    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // Reset game
    document.getElementById('pairsFound').textContent = '0';
    document.getElementById('moveCount').textContent = '0';
    document.getElementById('matchComplete').style.display = 'none';

    // Create card grid
    const grid = document.getElementById('storyMatchGrid');
    grid.innerHTML = '';

    cards.forEach((character, index) => {
        const card = document.createElement('div');
        card.dataset.character = character;
        card.dataset.index = index;
        card.style.cssText = `
            height: 80px;
            background: white;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            cursor: pointer;
            transition: transform 0.3s;
        `;
        card.textContent = '?';

        card.onclick = function() {
            if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
                return;
            }

            card.textContent = character;
            card.classList.add('flipped');
            card.style.background = '#fef3c7';
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                canFlip = false;
                moveCount++;
                document.getElementById('moveCount').textContent = moveCount;

                if (flippedCards[0].dataset.character === flippedCards[1].dataset.character) {
                    // Match!
                    setTimeout(() => {
                        flippedCards.forEach(c => {
                            c.classList.add('matched');
                            c.style.background = '#86efac';
                            c.style.transform = 'scale(0.9)';
                        });
                        matchedPairs++;
                        document.getElementById('pairsFound').textContent = matchedPairs;

                        if (matchedPairs === 6) {
                            document.getElementById('finalMoves').textContent = moveCount;
                            document.getElementById('matchComplete').style.display = 'block';
                            checkGameAchievement('story-match', moveCount);
                        }

                        flippedCards = [];
                        canFlip = true;
                    }, 500);
                } else {
                    // No match
                    setTimeout(() => {
                        flippedCards.forEach(c => {
                            c.textContent = '?';
                            c.classList.remove('flipped');
                            c.style.background = 'white';
                        });
                        flippedCards = [];
                        canFlip = true;
                    }, 1000);
                }
            }
        };

        grid.appendChild(card);
    });
}

// Word Builder Game
function launchWordBuilderGame() {
    const gameHTML = `
        <div id="gameModal" class="game-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        ">
            <div class="game-container" style="
                background: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>🔤 Word Builder</h2>
                    <button onclick="closeMiniGame()" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Close ✕</button>
                </div>

                <p style="margin-bottom: 1rem;">Build the word by clicking the letters in order!</p>

                <div style="
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                ">
                    <div style="text-align: center; margin-bottom: 0.5rem;">Build this word:</div>
                    <div id="targetWord" style="
                        font-size: 2rem;
                        font-weight: bold;
                        text-align: center;
                        color: #667eea;
                        letter-spacing: 0.5rem;
                    ">CAT</div>
                </div>

                <div id="currentWord" style="
                    min-height: 60px;
                    padding: 1rem;
                    background: white;
                    border: 3px dashed #667eea;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                    font-size: 2rem;
                    text-align: center;
                    letter-spacing: 0.5rem;
                "></div>

                <div id="letterButtons" style="
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                ">
                    <!-- Letter buttons will appear here -->
                </div>

                <div style="
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 1.5rem;
                ">
                    <button onclick="clearWord()" style="
                        padding: 0.75rem 2rem;
                        background: #dc3545;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                    ">Clear</button>
                    <button onclick="checkWord()" style="
                        padding: 0.75rem 2rem;
                        background: #28a745;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                    ">Check Word</button>
                </div>

                <div id="wordResult" style="
                    margin-top: 1rem;
                    text-align: center;
                    font-size: 1.2rem;
                    font-weight: bold;
                "></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', gameHTML);
    startWordBuilder();
}

// Start Word Builder Game
let currentWordBuilt = '';
let targetWordForGame = '';

function startWordBuilder() {
    const simpleWords = ['CAT', 'DOG', 'SUN', 'BED', 'HAT', 'BAT', 'RUN', 'HOP', 'PIG', 'BUG'];
    targetWordForGame = simpleWords[Math.floor(Math.random() * simpleWords.length)];
    currentWordBuilt = '';

    document.getElementById('targetWord').textContent = targetWordForGame;
    document.getElementById('currentWord').textContent = '';
    document.getElementById('wordResult').textContent = '';

    // Create letter buttons (target word + some random letters)
    const letters = targetWordForGame.split('');
    const extraLetters = ['A', 'E', 'I', 'O', 'U', 'M', 'N', 'R', 'S', 'T'];
    const allLetters = [...letters];

    // Add some random letters
    for (let i = 0; i < 5; i++) {
        allLetters.push(extraLetters[Math.floor(Math.random() * extraLetters.length)]);
    }

    // Shuffle letters
    for (let i = allLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
    }

    // Create buttons
    const letterButtons = document.getElementById('letterButtons');
    letterButtons.innerHTML = '';

    allLetters.forEach(letter => {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.style.cssText = `
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
            font-weight: bold;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.2s;
        `;

        btn.onclick = function() {
            currentWordBuilt += letter;
            document.getElementById('currentWord').textContent = currentWordBuilt;
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        };

        letterButtons.appendChild(btn);
    });
}

function clearWord() {
    currentWordBuilt = '';
    document.getElementById('currentWord').textContent = '';
    document.getElementById('wordResult').textContent = '';
}

function checkWord() {
    const result = document.getElementById('wordResult');
    if (currentWordBuilt === targetWordForGame) {
        result.style.color = '#28a745';
        result.textContent = '🎉 Correct! Great job!';
        checkGameAchievement('word-builder', 1);

        setTimeout(() => {
            startWordBuilder();
        }, 2000);
    } else {
        result.style.color = '#dc3545';
        result.textContent = 'Not quite right. Try again!';
    }
}

// Letter Match Game - Match uppercase and lowercase letters
function launchLetterMatchGame() {
    const gameHTML = `
        <div id="gameModal" class="game-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        ">
            <div class="game-container" style="
                background: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 700px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>🔤 Letter Match</h2>
                    <button onclick="closeMiniGame()" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Close ✕</button>
                </div>

                <p style="margin-bottom: 1rem;">Match the uppercase letter with its lowercase friend!</p>

                <div style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                ">
                    <span>Matches: <strong id="letterMatches">0</strong>/6</span>
                    <span>Score: <strong id="letterScore">0</strong></span>
                    <span>Time: <strong id="letterTimer">0</strong>s</span>
                </div>

                <div id="gameBoard" style="
                    position: relative;
                    display: flex;
                    gap: 2rem;
                    justify-content: center;
                    align-items: start;
                    padding: 2rem 1rem;
                    background: linear-gradient(135deg, #fbbf24, #f97316);
                    border-radius: 15px;
                    min-height: 400px;
                ">
                    <!-- SVG Canvas for drawing lines -->
                    <svg id="connectionCanvas" style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: 1;
                    ">
                    </svg>

                    <!-- Uppercase letters column -->
                    <div id="uppercaseColumn" style="
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        z-index: 2;
                    ">
                        <h3 style="text-align: center; color: white; margin-bottom: 1rem;">Uppercase</h3>
                        <div id="uppercaseLetters" style="
                            display: flex;
                            flex-direction: column;
                            gap: 0.8rem;
                        ">
                            <!-- Uppercase letter cards will appear here -->
                        </div>
                    </div>

                    <!-- Match indicator area -->
                    <div style="
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        min-width: 100px;
                        z-index: 2;
                    ">
                        <div id="matchIndicator" style="
                            font-size: 3rem;
                            opacity: 0;
                            transition: opacity 0.3s;
                        ">✨</div>
                    </div>

                    <!-- Lowercase letters column -->
                    <div id="lowercaseColumn" style="
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        z-index: 2;
                    ">
                        <h3 style="text-align: center; color: white; margin-bottom: 1rem;">Lowercase</h3>
                        <div id="lowercaseLetters" style="
                            display: flex;
                            flex-direction: column;
                            gap: 0.8rem;
                        ">
                            <!-- Lowercase letter cards will appear here -->
                        </div>
                    </div>
                </div>

                <div id="letterGameComplete" style="
                    display: none;
                    text-align: center;
                    margin-top: 1rem;
                ">
                    <h3 style="color: #28a745;">🎉 Fantastic! You matched all the letters!</h3>
                    <p>Score: <span id="finalLetterScore">0</span> | Time: <span id="finalLetterTime">0</span> seconds</p>
                    <button onclick="startLetterMatch()" style="
                        margin-top: 1rem;
                        padding: 0.75rem 2rem;
                        background: #667eea;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                    ">Play Again</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', gameHTML);
    startLetterMatch();
}

// Start Letter Match Game
function startLetterMatch() {
    let selectedUppercase = null;
    let selectedLowercase = null;
    let matchesFound = 0;
    let score = 0;
    let gameTime = 0;
    let gameTimer;
    let attempts = 0;

    // Letter pairs to use (randomly select 6)
    const allLetterPairs = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    // Randomly select 6 letters
    const selectedLetters = [];
    const tempLetters = [...allLetterPairs];
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * tempLetters.length);
        selectedLetters.push(tempLetters[randomIndex]);
        tempLetters.splice(randomIndex, 1);
    }

    // Reset game
    document.getElementById('letterMatches').textContent = '0';
    document.getElementById('letterScore').textContent = '0';
    document.getElementById('letterTimer').textContent = '0';
    document.getElementById('letterGameComplete').style.display = 'none';

    // Clear timer if exists
    if (gameTimer) clearInterval(gameTimer);

    // Start timer
    gameTimer = setInterval(() => {
        gameTime++;
        document.getElementById('letterTimer').textContent = gameTime;
    }, 1000);

    // Create uppercase letters (shuffled)
    const uppercaseContainer = document.getElementById('uppercaseLetters');
    uppercaseContainer.innerHTML = '';
    const shuffledUppercase = [...selectedLetters].sort(() => Math.random() - 0.5);

    shuffledUppercase.forEach(letter => {
        const card = createLetterCard(letter, 'uppercase');
        uppercaseContainer.appendChild(card);
    });

    // Create lowercase letters (shuffled differently)
    const lowercaseContainer = document.getElementById('lowercaseLetters');
    lowercaseContainer.innerHTML = '';
    const shuffledLowercase = [...selectedLetters].sort(() => Math.random() - 0.5);

    shuffledLowercase.forEach(letter => {
        const card = createLetterCard(letter.toLowerCase(), 'lowercase');
        lowercaseContainer.appendChild(card);
    });

    // Create letter card
    function createLetterCard(letter, type) {
        const card = document.createElement('div');
        card.dataset.letter = letter.toUpperCase();
        card.dataset.type = type;
        card.style.cssText = `
            width: 80px;
            height: 80px;
            background: white;
            border: 3px solid #ddd;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            user-select: none;
            color: ${type === 'uppercase' ? '#dc2626' : '#2563eb'};
        `;
        card.textContent = letter;

        card.onclick = function() {
            if (card.classList.contains('matched')) return;

            // Clear previous selections of same type
            document.querySelectorAll(`.letter-${type}-selected`).forEach(c => {
                c.classList.remove(`letter-${type}-selected`);
                c.style.border = '3px solid #ddd';
                c.style.transform = 'scale(1)';
                c.style.boxShadow = 'none';
            });

            // Select this card
            card.classList.add(`letter-${type}-selected`);
            card.style.border = `3px solid ${type === 'uppercase' ? '#dc2626' : '#2563eb'}`;
            card.style.transform = 'scale(1.1)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';

            if (type === 'uppercase') {
                selectedUppercase = letter;
            } else {
                selectedLowercase = letter.toUpperCase();
            }

            // Check for match if both selected
            if (selectedUppercase && selectedLowercase) {
                attempts++;
                checkLetterMatch();
            }
        };

        return card;
    }

    // Draw line between selected letters
    function drawConnectionLine(isCorrect) {
        const uppercaseCard = document.querySelector('.letter-uppercase-selected');
        const lowercaseCard = document.querySelector('.letter-lowercase-selected');

        if (!uppercaseCard || !lowercaseCard) return;

        const svg = document.getElementById('connectionCanvas');
        const gameBoard = document.getElementById('gameBoard');

        // Get positions relative to game board
        const boardRect = gameBoard.getBoundingClientRect();
        const upperRect = uppercaseCard.getBoundingClientRect();
        const lowerRect = lowercaseCard.getBoundingClientRect();

        // Calculate line coordinates
        const x1 = upperRect.right - boardRect.left;
        const y1 = upperRect.top + (upperRect.height / 2) - boardRect.top;
        const x2 = lowerRect.left - boardRect.left;
        const y2 = lowerRect.top + (lowerRect.height / 2) - boardRect.top;

        // Create animated line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x1);
        line.setAttribute('y2', y1);
        line.setAttribute('stroke', isCorrect ? '#22c55e' : '#dc3545');
        line.setAttribute('stroke-width', '4');
        line.setAttribute('stroke-linecap', 'round');
        line.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';

        svg.appendChild(line);

        // Animate the line drawing
        let progress = 0;
        const animationSpeed = 20;
        const animationSteps = 15;

        const animateLine = setInterval(() => {
            progress += 1 / animationSteps;
            if (progress >= 1) {
                progress = 1;
                clearInterval(animateLine);

                // Keep the line for a moment then fade/remove
                if (isCorrect) {
                    // For correct matches, keep the line with reduced opacity
                    setTimeout(() => {
                        line.style.opacity = '0.3';
                        line.setAttribute('stroke', '#fbbf24');
                    }, 500);
                } else {
                    // For incorrect, fade out and remove
                    setTimeout(() => {
                        line.style.transition = 'opacity 0.3s';
                        line.style.opacity = '0';
                        setTimeout(() => line.remove(), 300);
                    }, 500);
                }
            }

            const currentX2 = x1 + (x2 - x1) * progress;
            const currentY2 = y1 + (y2 - y1) * progress;
            line.setAttribute('x2', currentX2);
            line.setAttribute('y2', currentY2);
        }, animationSpeed);
    }

    // Check if letters match
    function checkLetterMatch() {
        const matchIndicator = document.getElementById('matchIndicator');
        const isCorrect = selectedUppercase === selectedLowercase;

        // Draw connection line
        drawConnectionLine(isCorrect);

        if (isCorrect) {
            // Match found!
            matchesFound++;
            score += Math.max(100 - (attempts * 5), 20); // Score decreases with more attempts

            document.getElementById('letterMatches').textContent = matchesFound;
            document.getElementById('letterScore').textContent = score;

            // Show match indicator with celebration
            matchIndicator.textContent = '✅';
            matchIndicator.style.opacity = '1';
            matchIndicator.style.animation = 'celebrate 0.5s ease';

            // Mark cards as matched
            document.querySelectorAll('.letter-uppercase-selected, .letter-lowercase-selected').forEach(card => {
                card.classList.add('matched');
                card.style.background = '#86efac';
                card.style.border = '3px solid #22c55e';
                card.style.transform = 'scale(0.9)';
                card.style.opacity = '0.7';
                card.style.cursor = 'default';
                card.style.animation = 'correctMatch 0.5s ease';
            });

            // Play success animation
            setTimeout(() => {
                matchIndicator.style.opacity = '0';
                matchIndicator.style.animation = '';
            }, 1000);

            // Check if game complete
            if (matchesFound === 6) {
                clearInterval(gameTimer);
                document.getElementById('finalLetterScore').textContent = score;
                document.getElementById('finalLetterTime').textContent = gameTime;

                setTimeout(() => {
                    document.getElementById('letterGameComplete').style.display = 'block';
                    checkGameAchievement('letter-match', score);
                }, 500);
            }
        } else {
            // No match
            matchIndicator.textContent = '❌';
            matchIndicator.style.opacity = '1';

            // Shake animation for wrong match
            document.querySelectorAll('.letter-uppercase-selected, .letter-lowercase-selected').forEach(card => {
                card.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    card.style.animation = '';
                }, 500);
            });

            setTimeout(() => {
                matchIndicator.style.opacity = '0';
            }, 1000);
        }

        // Reset selections
        setTimeout(() => {
            selectedUppercase = null;
            selectedLowercase = null;

            document.querySelectorAll('.letter-uppercase-selected, .letter-lowercase-selected').forEach(card => {
                if (!card.classList.contains('matched')) {
                    card.classList.remove('letter-uppercase-selected', 'letter-lowercase-selected');
                    card.style.border = '3px solid #ddd';
                    card.style.transform = 'scale(1)';
                    card.style.boxShadow = 'none';
                }
            });
        }, isCorrect ? 600 : 800);
    }

    // Add shake animation if not exists
    if (!document.getElementById('letterMatchAnimations')) {
        const style = document.createElement('style');
        style.id = 'letterMatchAnimations';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0) scale(1.1); }
                25% { transform: translateX(-10px) scale(1.1); }
                75% { transform: translateX(10px) scale(1.1); }
            }
            @keyframes celebrate {
                0% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.3) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
            }
            @keyframes correctMatch {
                0% { transform: scale(1.1); }
                50% { transform: scale(1.2) rotate(5deg); }
                100% { transform: scale(0.9) rotate(0deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Close game modal for mini-games
function closeMiniGame() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.remove();
    }
}

// Don't override the main closeGame function - remove this entirely
// The main app already has closeGame defined for built-in games

// Check game achievements
function checkGameAchievement(game, score) {
    // Could add game-specific badges here
    if (typeof showToast === 'function') {
        showToast(`Great job playing ${game}! 🎮`);
    }
}

// Empty data.js file (functionality is built into main app.js)
// This file can be used for additional data management if needed