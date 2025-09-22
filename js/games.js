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
                    <button onclick="closeGame()" style="
                        background: var(--danger);
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Close X</button>
                </div>

                <p style="margin-bottom: 1rem;">Help Pete find all 4 of his groovy buttons! Click on them when you see them.</p>

                <div id="buttonGameScore" style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: var(--bg);
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
                    <h3 style="color: var(--success);">🎉 Groovy! You found all the buttons!</h3>
                    <p>Time: <span id="finalTime">0</span> seconds</p>
                    <button onclick="startPeteGame()" style="
                        margin-top: 1rem;
                        padding: 0.75rem 2rem;
                        background: var(--primary);
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
                    <button onclick="closeGame()" style="
                        background: var(--danger);
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Close X</button>
                </div>

                <p style="margin-bottom: 1rem;">Match the book characters! Find all the pairs.</p>

                <div style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: var(--bg);
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
                    <h3 style="color: var(--success);">🎉 Great Job! You matched them all!</h3>
                    <p>Completed in <span id="finalMoves">0</span> moves</p>
                    <button onclick="startStoryMatch()" style="
                        margin-top: 1rem;
                        padding: 0.75rem 2rem;
                        background: var(--primary);
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
                    <button onclick="closeGame()" style="
                        background: var(--danger);
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Close X</button>
                </div>

                <p style="margin-bottom: 1rem;">Build the word by clicking the letters in order!</p>

                <div style="
                    padding: 1rem;
                    background: var(--bg);
                    border-radius: 10px;
                    margin-bottom: 1rem;
                ">
                    <div style="text-align: center; margin-bottom: 0.5rem;">Build this word:</div>
                    <div id="targetWord" style="
                        font-size: 2rem;
                        font-weight: bold;
                        text-align: center;
                        color: var(--primary);
                        letter-spacing: 0.5rem;
                    ">CAT</div>
                </div>

                <div id="currentWord" style="
                    min-height: 60px;
                    padding: 1rem;
                    background: white;
                    border: 3px dashed var(--primary);
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
                        background: var(--danger);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                    ">Clear</button>
                    <button onclick="checkWord()" style="
                        padding: 0.75rem 2rem;
                        background: var(--success);
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
            background: var(--primary);
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
        result.style.color = 'var(--success)';
        result.textContent = '🎉 Correct! Great job!';
        checkGameAchievement('word-builder', 1);

        setTimeout(() => {
            startWordBuilder();
        }, 2000);
    } else {
        result.style.color = 'var(--danger)';
        result.textContent = 'Not quite right. Try again!';
    }
}

// Close game modal
function closeGame() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.remove();
    }
}

// Check game achievements
function checkGameAchievement(game, score) {
    // Could add game-specific badges here
    showToast(`Great job playing ${game}! 🎮`);
}

// Empty data.js file (functionality is built into main app.js)
// This file can be used for additional data management if needed