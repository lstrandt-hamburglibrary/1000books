console.log("games.js loaded successfully"); if(typeof showToast === "function") showToast("games.js loaded");
// Mini Games for BookWorm Journey

// Launch game based on selection
function launchGame(gameName) {
    if (typeof showToast === 'function') {
        showToast('launchGame called with: ' + gameName);
    }
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
        case 'rhyme-trains':
            launchRhymeTrainsGame();
            break;
        case 'story-sequencing':
            launchStorySequencingGame();
            break;
        case 'pattern-builder':
            launchPatternBuilderGame();
            break;
    }
}

// Pete's Button Sorting Game
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
                max-width: 700px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>🔘 Pete's Button Sort</h2>
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

                <!-- Level Selection -->
                <div id="levelSelect" style="margin-bottom: 1rem;">
                    <p style="margin-bottom: 0.5rem;">Choose a sorting challenge:</p>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;">
                        <button onclick="startButtonSort(1)" style="
                            padding: 0.5rem 1rem;
                            background: #28a745;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        ">Level 1: Sort by Color</button>
                        <button onclick="startButtonSort(2)" style="
                            padding: 0.5rem 1rem;
                            background: #fbbf24;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        ">Level 2: Sort by Size</button>
                        <button onclick="startButtonSort(3)" style="
                            padding: 0.5rem 1rem;
                            background: #dc3545;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        ">Level 3: Sort by Shape</button>
                    </div>
                </div>

                <p id="sortInstructions" style="margin-bottom: 1rem; text-align: center; font-weight: bold;">Select a level to start!</p>

                <div id="buttonGameScore" style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                ">
                    <span>Sorted: <strong id="buttonsSorted">0</strong>/<strong id="totalButtons">0</strong></span>
                    <span>Score: <strong id="gameScore">0</strong></span>
                </div>

                <div id="buttonGameArea" style="
                    position: relative;
                    min-height: 200px;
                    background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
                    border-radius: 15px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 8px;
                ">
                    <!-- Buttons to sort will appear here -->
                </div>

                <!-- Sorting bins -->
                <div id="sortingBins" style="
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                ">
                    <!-- Bins will be created based on level -->
                </div>

                <div id="gameComplete" style="
                    display: none;
                    text-align: center;
                    margin-top: 1rem;
                ">
                    <h3 style="color: #28a745;">🎉 Groovy! All buttons sorted!</h3>
                    <p>Score: <span id="finalScore">0</span></p>
                    <button onclick="location.reload()" style="
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
}

// Button Sorting Game Logic
let currentSortLevel = 0;
let buttonsToSort = [];
let sortedCount = 0;
let gameScore = 0;

function startButtonSort(level) {
    currentSortLevel = level;
    sortedCount = 0;
    gameScore = 0;
    buttonsToSort = [];

    const gameArea = document.getElementById('buttonGameArea');
    const binsArea = document.getElementById('sortingBins');
    const instructions = document.getElementById('sortInstructions');

    // Clear areas
    gameArea.innerHTML = '';
    binsArea.innerHTML = '';
    document.getElementById('gameComplete').style.display = 'none';

    // Set up level-specific configurations
    let bins = [];
    let buttonConfigs = [];

    if (level === 1) {
        // Sort by Color
        instructions.textContent = 'Drag buttons to the matching color bin!';
        bins = [
            { id: 'red', label: 'Red Buttons', color: '#ffcccc', icon: '🔴' },
            { id: 'blue', label: 'Blue Buttons', color: '#ccccff', icon: '🔵' }
        ];

        // Create 8 buttons (4 red, 4 blue)
        for (let i = 0; i < 4; i++) {
            buttonConfigs.push({ color: '#ff4444', bin: 'red', shape: 'circle' });
            buttonConfigs.push({ color: '#4444ff', bin: 'blue', shape: 'circle' });
        }

    } else if (level === 2) {
        // Sort by Size
        instructions.textContent = 'Sort buttons by size - big or small!';
        bins = [
            { id: 'big', label: 'Big Buttons', color: '#ffe4cc', icon: '●', iconSize: '2.5em' },
            { id: 'small', label: 'Small Buttons', color: '#ccffe4', icon: '●', iconSize: '1.2em' }
        ];

        // Create 8 buttons (4 big, 4 small)
        for (let i = 0; i < 4; i++) {
            buttonConfigs.push({ color: '#667eea', size: 50, bin: 'big', shape: 'circle' });
            buttonConfigs.push({ color: '#667eea', size: 30, bin: 'small', shape: 'circle' });
        }

    } else if (level === 3) {
        // Sort by Shape
        instructions.textContent = 'Sort buttons by their shape!';
        bins = [
            { id: 'circle', label: 'Round', color: '#ffccff', icon: '●' },
            { id: 'square', label: 'Square', color: '#ffffcc', icon: '■' },
            { id: 'star', label: 'Star', color: '#ccffff', icon: '★' }
        ];

        // Create 9 buttons (3 of each shape)
        for (let i = 0; i < 3; i++) {
            buttonConfigs.push({ color: '#ff6b6b', shape: 'circle', bin: 'circle' });
            buttonConfigs.push({ color: '#4ecdc4', shape: 'square', bin: 'square' });
            buttonConfigs.push({ color: '#ffd93d', shape: 'star', bin: 'star' });
        }
    }

    // Shuffle button configs
    buttonConfigs.sort(() => Math.random() - 0.5);

    // Update score display
    document.getElementById('totalButtons').textContent = buttonConfigs.length;
    document.getElementById('buttonsSorted').textContent = '0';
    document.getElementById('gameScore').textContent = '0';

    // Create sorting bins
    bins.forEach(bin => {
        const binDiv = document.createElement('div');
        binDiv.id = `bin-${bin.id}`;
        binDiv.className = 'sort-bin';
        binDiv.dataset.binId = bin.id;
        binDiv.style.cssText = `
            min-width: 140px;
            min-height: 160px;
            background: ${bin.color};
            border: 3px dashed #666;
            border-radius: 15px;
            padding: 10px;
            text-align: center;
            cursor: pointer;
        `;
        binDiv.innerHTML = `
            <div style="font-size: ${bin.iconSize || '2em'}; margin-bottom: 5px; line-height: 1;">${bin.icon || ''}</div>
            <div style="font-weight: bold; margin-bottom: 10px;">${bin.label}</div>
            <div id="bin-content-${bin.id}" style="
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                justify-content: center;
                min-height: 60px;
            "></div>
        `;

        binsArea.appendChild(binDiv);
    });

    // Create buttons to sort
    buttonConfigs.forEach((config, index) => {
        createSortableButton(config, index);
    });

    // Add click handlers for bins (for mobile)
    document.querySelectorAll('.sort-bin').forEach(bin => {
        bin.onclick = function() {
            if (window.selectedButton) {
                const binId = bin.dataset.binId;
                checkButtonSort(window.selectedButton, binId);
            }
        };
    });
}

function createSortableButton(config, index) {
    const gameArea = document.getElementById('buttonGameArea');
    const button = document.createElement('div');
    button.id = `sort-button-${index}`;
    button.dataset.correctBin = config.bin;
    button.dataset.shape = config.shape || 'default';
    button.className = 'sortable-button';

    const size = config.size || 40;

    // Base styles - make them look like actual buttons
    let baseStyle = `
        display: inline-block;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(180deg, ${config.color}, ${config.color}dd);
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
        box-shadow:
            0 4px 6px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.5),
            inset 0 -2px 0 rgba(0,0,0,0.2);
        border: 2px solid rgba(0,0,0,0.3);
    `;

    // Shape-specific styles
    if (config.shape === 'circle') {
        baseStyle += 'border-radius: 50%;';
        // Add shine effect and button holes for circles
        button.innerHTML = `
            <div style="position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 30%; height: 30%; background: radial-gradient(circle, rgba(255,255,255,0.7), transparent); border-radius: 50%;"></div>
            <div style="position: absolute; top: 28%; left: 28%; width: 5px; height: 5px; background: rgba(0,0,0,0.6); border-radius: 50%;"></div>
            <div style="position: absolute; top: 28%; right: 28%; width: 5px; height: 5px; background: rgba(0,0,0,0.6); border-radius: 50%;"></div>
            <div style="position: absolute; bottom: 28%; left: 28%; width: 5px; height: 5px; background: rgba(0,0,0,0.6); border-radius: 50%;"></div>
            <div style="position: absolute; bottom: 28%; right: 28%; width: 5px; height: 5px; background: rgba(0,0,0,0.6); border-radius: 50%;"></div>
        `;
    } else if (config.shape === 'square') {
        baseStyle += 'border-radius: 8px;';
        // Add shine effect and button holes for squares
        button.innerHTML = `
            <div style="position: absolute; top: 15%; left: 50%; transform: translateX(-50%); width: 40%; height: 25%; background: linear-gradient(180deg, rgba(255,255,255,0.6), transparent); border-radius: 4px;"></div>
            <div style="position: absolute; top: 22%; left: 22%; width: 5px; height: 5px; background: rgba(0,0,0,0.6); border-radius: 50%;"></div>
            <div style="position: absolute; top: 22%; right: 22%; width: 5px; height: 5px; background: rgba(0,0,0,0.6); border-radius: 50%;"></div>
            <div style="position: absolute; bottom: 22%; left: 22%; width: 5px; height: 5px; background: rgba(0,0,0,0.6); border-radius: 50%;"></div>
            <div style="position: absolute; bottom: 22%; right: 22%; width: 5px; height: 5px; background: rgba(0,0,0,0.6); border-radius: 50%;"></div>
        `;
    } else if (config.shape === 'star') {
        button.innerHTML = '⭐';
        baseStyle += `
            background: transparent;
            font-size: ${size}px;
            line-height: ${size}px;
            text-align: center;
            border: none;
            box-shadow: none;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
    }

    button.style.cssText = baseStyle;

    // Add hover effect
    button.onmouseover = function() {
        if (window.selectedButton !== button) {
            if (config.shape === 'star') {
                button.style.transform = 'translateY(-2px) scale(1.1)';
            } else {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = `
                    0 6px 8px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.5),
                    inset 0 -2px 0 rgba(0,0,0,0.2)
                `;
            }
        }
    };

    button.onmouseout = function() {
        if (window.selectedButton !== button) {
            if (config.shape === 'star') {
                button.style.transform = 'translateY(0) scale(1)';
            } else {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = `
                    0 4px 6px rgba(0,0,0,0.2),
                    inset 0 1px 0 rgba(255,255,255,0.5),
                    inset 0 -2px 0 rgba(0,0,0,0.2)
                `;
            }
        }
    };

    // Click to select/deselect
    button.onclick = function() {
        if (window.selectedButton === button) {
            window.selectedButton = null;
            if (config.shape === 'star') {
                button.style.transform = 'translateY(0) scale(1)';
            } else {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = `
                    0 4px 6px rgba(0,0,0,0.2),
                    inset 0 1px 0 rgba(255,255,255,0.5),
                    inset 0 -2px 0 rgba(0,0,0,0.2)
                `;
            }
        } else {
            if (window.selectedButton) {
                const prevShape = window.selectedButton.dataset.shape || 'default';
                if (prevShape === 'star') {
                    window.selectedButton.style.transform = 'translateY(0) scale(1)';
                } else {
                    window.selectedButton.style.transform = 'translateY(0)';
                    window.selectedButton.style.boxShadow = `
                        0 4px 6px rgba(0,0,0,0.2),
                        inset 0 1px 0 rgba(255,255,255,0.5),
                        inset 0 -2px 0 rgba(0,0,0,0.2)
                    `;
                }
            }
            window.selectedButton = button;
            if (config.shape === 'star') {
                button.style.transform = 'translateY(-4px) scale(1.2)';
            } else {
                button.style.transform = 'translateY(-4px) scale(1.1)';
                button.style.boxShadow = `
                    0 8px 12px rgba(0,0,0,0.4),
                    0 0 20px ${config.color}88,
                    inset 0 1px 0 rgba(255,255,255,0.5),
                    inset 0 -2px 0 rgba(0,0,0,0.2)
                `;
            }
        }
    };

    gameArea.appendChild(button);
    buttonsToSort.push(button);
}

function checkButtonSort(button, binId) {
    const correctBin = button.dataset.correctBin;

    if (correctBin === binId) {
        // Correct!
        gameScore += 10;
        sortedCount++;

        // Move button to bin
        const binContent = document.getElementById(`bin-content-${binId}`);
        button.style.transform = 'scale(0.9)';
        button.style.boxShadow = `
            0 2px 4px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.5),
            inset 0 -2px 0 rgba(0,0,0,0.2)
        `;
        button.style.cursor = 'default';
        button.style.opacity = '0.9';
        button.onclick = null;
        button.onmouseover = null;
        button.onmouseout = null;
        binContent.appendChild(button);

        // Update score
        document.getElementById('buttonsSorted').textContent = sortedCount;
        document.getElementById('gameScore').textContent = gameScore;

        // Clear selection
        window.selectedButton = null;

        // Check if all sorted
        if (sortedCount === buttonsToSort.length) {
            document.getElementById('finalScore').textContent = gameScore;
            document.getElementById('gameComplete').style.display = 'block';
            checkGameAchievement('button-sort', currentSortLevel);
        }
    } else {
        // Wrong bin - shake animation
        gameScore = Math.max(0, gameScore - 5);
        document.getElementById('gameScore').textContent = gameScore;

        button.style.animation = 'shake 0.5s';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    }
}

// Add shake animation
if (!document.getElementById('sortAnimations')) {
    const style = document.createElement('style');
    style.id = 'sortAnimations';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0) scale(1.2); }
            25% { transform: translateX(-10px) scale(1.2); }
            75% { transform: translateX(10px) scale(1.2); }
        }
    `;
    document.head.appendChild(style);
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
            font-size: 2.5rem;
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

                <!-- Level Selection -->
                <div id="levelSelection" style="
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                ">
                    <div style="text-align: center; margin-bottom: 0.5rem; font-weight: bold;">Choose Difficulty:</div>
                    <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
                        <button onclick="selectWordBuilderLevel(1)" style="
                            padding: 0.5rem 1rem;
                            background: #28a745;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        ">Level 1: Build Word</button>
                        <button onclick="selectWordBuilderLevel(2)" style="
                            padding: 0.5rem 1rem;
                            background: #fbbf24;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        ">Level 2: Fill 1 Letter</button>
                        <button onclick="selectWordBuilderLevel(3)" style="
                            padding: 0.5rem 1rem;
                            background: #dc3545;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        ">Level 3: Fill 2 Letters</button>
                    </div>
                </div>

                <p id="gameInstructions" style="margin-bottom: 1rem; text-align: center;">Select a level to begin!</p>

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
                    ">---</div>
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
                    ">Check</button>
                    <button onclick="newWordForLevel()" style="
                        padding: 0.75rem 2rem;
                        background: #667eea;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                    ">New Word</button>
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
}

// Start Word Builder Game
let currentWordBuilt = '';
let targetWordForGame = '';
let currentWordBuilderLevel = 0;
let missingLetterPositions = [];
let wordPattern = '';  // Store the pattern like "BU_" or "_OO_"

// Complete word lists for validation - expanded to include many more common words
const allValidWords3Letter = [
    // Original words
    'CAT', 'DOG', 'SUN', 'BED', 'HAT', 'BAT', 'RUN', 'HOP', 'PIG', 'BUG',
    'BUT', 'BUS', 'BUM', 'BUN', 'BUD', 'CUT', 'CUP', 'CUB', 'CUD', 'RAT', 'RUT', 'RUM', 'RUG',
    'MAT', 'MUD', 'MUG', 'SIT', 'SAT', 'SET', 'SOT', 'PET', 'POT', 'PUT', 'PIT', 'PAT', 'HOT',
    'HIT', 'HUT', 'DOT', 'DUG', 'DAD', 'DID', 'BOX', 'BOY', 'TOP', 'TOY', 'LOG', 'FOG', 'JOG',
    'BAG', 'BIG', 'TAG', 'WAG', 'LEG', 'PEG', 'DIG', 'FIG', 'JIG', 'RIG', 'WIG', 'ZIG', 'ZAG',
    'FAN', 'MAN', 'CAN', 'PAN', 'RAN', 'TAN', 'VAN', 'WAN', 'BAN', 'FUN', 'GUN', 'NUN', 'PUN',
    'CAR', 'JAR', 'TAR', 'BAR', 'FAR', 'WAR', 'NET', 'JET', 'MET', 'LET', 'GET', 'VET', 'WET',
    // Additional common words
    'ADD', 'AGE', 'AGO', 'AID', 'AIM', 'AIR', 'ALL', 'AND', 'ANT', 'ANY', 'APE', 'ARC', 'ARE', 'ARK', 'ARM', 'ART', 'ASK', 'ATE',
    'BAD', 'BAM', 'BAY', 'BEE', 'BET', 'BID', 'BIN', 'BIT', 'BOB', 'BOG', 'BOT', 'BOW', 'BOY', 'BUB', 'BUY',
    'CAB', 'CAD', 'CAM', 'CAP', 'CAW', 'COB', 'COD', 'COG', 'COT', 'COW', 'COX', 'COY', 'COZ', 'CRY', 'CUE', 'CUR',
    'DAB', 'DAM', 'DAY', 'DEN', 'DEW', 'DIE', 'DIM', 'DIN', 'DIP', 'DOC', 'DOE', 'DRY', 'DUB', 'DUD', 'DUE', 'DUN', 'DUO', 'DYE',
    'EAR', 'EAT', 'EEL', 'EGG', 'ELF', 'ELK', 'ELM', 'EMU', 'END', 'ERA', 'EVE', 'EWE', 'EYE',
    'FAD', 'FAG', 'FAR', 'FAT', 'FAX', 'FAY', 'FED', 'FEE', 'FEN', 'FEW', 'FEZ', 'FIB', 'FIN', 'FIR', 'FIT', 'FIX', 'FLU', 'FLY', 'FOB', 'FOE', 'FOP', 'FOR', 'FOX', 'FRY', 'FUG', 'FUR',
    'GAB', 'GAG', 'GAL', 'GAP', 'GAS', 'GAY', 'GEE', 'GEL', 'GEM', 'GOB', 'GOD', 'GOT', 'GOO', 'GUM', 'GUT', 'GUY', 'GYM',
    'HAD', 'HAG', 'HAM', 'HAS', 'HAW', 'HAY', 'HEM', 'HEN', 'HEP', 'HER', 'HEW', 'HEX', 'HEY', 'HID', 'HIM', 'HIP', 'HIS', 'HOB', 'HOD', 'HOE', 'HOG', 'HOW', 'HOY', 'HUB', 'HUE', 'HUG', 'HUM', 'HUN', 'HUP',
    'ICE', 'ICY', 'ILL', 'IMP', 'INK', 'INN', 'ION', 'IRE', 'IRK', 'ITS', 'IVY',
    'JAB', 'JAG', 'JAM', 'JAW', 'JAY', 'JOB', 'JOT', 'JOY', 'JUG', 'JUT',
    'KEG', 'KEN', 'KEY', 'KID', 'KIN', 'KIT',
    'LAB', 'LAC', 'LAD', 'LAG', 'LAM', 'LAP', 'LAW', 'LAX', 'LAY', 'LED', 'LEI', 'LET', 'LID', 'LIE', 'LIP', 'LIT', 'LOG', 'LOT', 'LOW', 'LUG',
    'MAC', 'MAD', 'MAM', 'MAP', 'MAR', 'MAW', 'MAX', 'MAY', 'MEN', 'MEW', 'MID', 'MIX', 'MOB', 'MOD', 'MOM', 'MOP', 'MOW',
    'NAB', 'NAG', 'NAP', 'NAY', 'NEE', 'NEW', 'NIB', 'NIT', 'NIX', 'NOB', 'NOD', 'NOG', 'NOM', 'NOR', 'NOT', 'NOW', 'NUB', 'NUT',
    'OAK', 'OAR', 'OAT', 'ODD', 'OFF', 'OFT', 'OHM', 'OIL', 'OLD', 'ONE', 'OPT', 'ORB', 'ORE', 'OUR', 'OUT', 'OWE', 'OWL', 'OWN',
    'PAD', 'PAL', 'PAP', 'PAR', 'PAS', 'PAW', 'PAX', 'PAY', 'PEA', 'PEC', 'PED', 'PEE', 'PEN', 'PEP', 'PER', 'PEW', 'PHI', 'PIC', 'PIE', 'PIN', 'PIP', 'PLY', 'POD', 'POP', 'POW', 'POX', 'PRO', 'PRY', 'PUB', 'PUD', 'PUG', 'PUP', 'PUS', 'PYX',
    'QUA',
    'RAG', 'RAM', 'RAP', 'RAW', 'RAY', 'RED', 'REF', 'REM', 'REP', 'RIB', 'RID', 'RIM', 'RIP', 'ROB', 'ROD', 'ROE', 'ROT', 'ROW', 'RUB', 'RUE', 'RYE',
    'SAC', 'SAD', 'SAG', 'SAP', 'SAW', 'SAX', 'SAY', 'SEA', 'SEE', 'SEW', 'SEX', 'SHE', 'SHY', 'SIN', 'SIP', 'SIR', 'SIS', 'SIX', 'SKI', 'SKY', 'SLY', 'SOB', 'SOD', 'SON', 'SOP', 'SOW', 'SOX', 'SOY', 'SPA', 'SPY', 'STY', 'SUB', 'SUM', 'SUP',
    'TAB', 'TAD', 'TAP', 'TAT', 'TAU', 'TAX', 'TEA', 'TED', 'TEE', 'TEN', 'THE', 'THY', 'TIC', 'TIE', 'TIN', 'TIP', 'TOE', 'TOG', 'TON', 'TOO', 'TOT', 'TOW', 'TRY', 'TUB', 'TUG', 'TUN', 'TUT', 'TWO',
    'UMP', 'UNO', 'UPS', 'URB', 'URN', 'USE',
    'VAC', 'VAT', 'VIA', 'VIE', 'VOW',
    'WAD', 'WAR', 'WAS', 'WAX', 'WAY', 'WEB', 'WED', 'WEE', 'WHO', 'WHY', 'WIN', 'WIT', 'WOE', 'WOK', 'WON', 'WOO', 'WOW',
    'YAK', 'YAM', 'YAP', 'YAW', 'YEA', 'YEP', 'YES', 'YET', 'YEW', 'YIN', 'YIP', 'YON', 'YOU', 'YOW', 'YUK', 'YUM', 'YUP',
    'ZAP', 'ZED', 'ZEE', 'ZEN', 'ZIP', 'ZIT', 'ZOO'
];

const allValidWords4Letter = [
    // Original words
    'BOOK', 'JUMP', 'FISH', 'BIRD', 'TREE', 'STAR', 'MOON', 'FROG', 'DUCK', 'SHIP',
    'BALL', 'CAKE', 'DOOR', 'FARM', 'GATE', 'HAND', 'LAMP', 'MILK', 'NOSE', 'RAIN', 'SOCK', 'TAIL',
    'BEAR', 'BOAT', 'COAT', 'DESK', 'FACE', 'GAME', 'HOME', 'KITE', 'LEAF', 'NEST', 'PARK', 'RING',
    'SAND', 'TENT', 'WAVE', 'YARD', 'BABY', 'BATH', 'BIKE', 'BLUE', 'COLD', 'DARK', 'FAST', 'GOOD',
    'HELP', 'KIND', 'LONG', 'NAME', 'OPEN', 'PLAY', 'ROOM', 'SLOW', 'TALL', 'WARM', 'WORK', 'BACK',
    // Additional common words
    'ABLE', 'ALSO', 'AREA', 'AWAY', 'BASE', 'BEEN', 'BELL', 'BEST', 'BILL', 'BLOW', 'BODY', 'BONE', 'BOTH', 'BOWL', 'BURN', 'BUSY',
    'CALL', 'CALM', 'CAME', 'CAMP', 'CARD', 'CARE', 'CART', 'CASE', 'CASH', 'CAST', 'CAVE', 'CELL', 'CITY', 'CLAP', 'CLAY', 'CLEAN', 'CLUB', 'CODE', 'COIN', 'COME', 'COOK', 'COOL', 'COPY', 'CORN', 'COST', 'CRAB', 'CROW', 'CUTE',
    'DARE', 'DATE', 'DAWN', 'DAYS', 'DEAD', 'DEAL', 'DEAR', 'DEEP', 'DEER', 'DICE', 'DIRT', 'DISH', 'DOES', 'DOLL', 'DONE', 'DOWN', 'DRAG', 'DRAW', 'DREW', 'DRIP', 'DROP', 'DRUM', 'DUST',
    'EACH', 'EARN', 'EARS', 'EASY', 'EDGE', 'ELSE', 'EVEN', 'EVER', 'EXIT', 'EYES',
    'FACT', 'FAIL', 'FAIR', 'FALL', 'FAME', 'FARE', 'FEAR', 'FEEL', 'FEET', 'FELL', 'FELT', 'FILE', 'FILL', 'FILM', 'FIND', 'FINE', 'FIRE', 'FIRM', 'FIVE', 'FLAG', 'FLAT', 'FLEW', 'FLIP', 'FLOW', 'FOAM', 'FOLD', 'FOLK', 'FOOD', 'FOOL', 'FOOT', 'FORK', 'FORM', 'FORT', 'FOUR', 'FREE', 'FROM', 'FULL', 'FUND',
    'GAIN', 'GAVE', 'GEAR', 'GIFT', 'GIRL', 'GIVE', 'GLAD', 'GLOW', 'GLUE', 'GOAL', 'GOAT', 'GOES', 'GOLD', 'GOLF', 'GONE', 'GRAB', 'GRAY', 'GREW', 'GREY', 'GRID', 'GRIN', 'GRIP', 'GROW',
    'HAIR', 'HALF', 'HALL', 'HANG', 'HARD', 'HARE', 'HARM', 'HATE', 'HAVE', 'HEAD', 'HEAR', 'HEAT', 'HELD', 'HERE', 'HERO', 'HIDE', 'HIGH', 'HILL', 'HINT', 'HIRE', 'HOLD', 'HOLE', 'HOPE', 'HORN', 'HOUR', 'HUGE', 'HUNT', 'HURT',
    'IDEA', 'IRON', 'ITEM',
    'JAIL', 'JAZZ', 'JEANS', 'JELLY', 'JOIN', 'JOKE', 'JULY', 'JUNE', 'JUNK', 'JUST',
    'KEEP', 'KEPT', 'KICK', 'KING', 'KISS', 'KNEE', 'KNEW', 'KNIT', 'KNOT', 'KNOW',
    'LACE', 'LACK', 'LADY', 'LAID', 'LAKE', 'LAND', 'LANE', 'LAST', 'LATE', 'LAZY', 'LEAD', 'LEAN', 'LEAP', 'LEFT', 'LEND', 'LENS', 'LESS', 'LIAR', 'LICE', 'LIFE', 'LIFT', 'LIKE', 'LIME', 'LINE', 'LINK', 'LION', 'LIST', 'LIVE', 'LOAD', 'LOAF', 'LOAN', 'LOCK', 'LOFT', 'LOOK', 'LOOP', 'LOSE', 'LOSS', 'LOST', 'LOUD', 'LOVE', 'LUCK', 'LUMP',
    'MADE', 'MAIL', 'MAIN', 'MAKE', 'MALE', 'MALL', 'MANY', 'MARK', 'MARS', 'MASK', 'MASS', 'MATH', 'MEAL', 'MEAN', 'MEAT', 'MEET', 'MELT', 'MENU', 'MESS', 'MICE', 'MILD', 'MILE', 'MIND', 'MINE', 'MINT', 'MISS', 'MIST', 'MODE', 'MOLD', 'MOLE', 'MORE', 'MOST', 'MOTH', 'MOVE', 'MUCH',
    'NAIL', 'NEAR', 'NEAT', 'NECK', 'NEED', 'NEWS', 'NEXT', 'NICE', 'NINE', 'NODE', 'NONE', 'NOON', 'NOTE',
    'OBEY', 'ODDS', 'ONCE', 'ONLY', 'ONTO', 'OVEN', 'OVER', 'OWES', 'OWNS',
    'PACE', 'PACK', 'PAGE', 'PAID', 'PAIN', 'PAIR', 'PALE', 'PALM', 'PANT', 'PART', 'PASS', 'PAST', 'PATH', 'PEAK', 'PEAR', 'PEAS', 'PEEK', 'PEEL', 'PEER', 'PENS', 'PETS', 'PICK', 'PILE', 'PILL', 'PINE', 'PING', 'PINK', 'PIPE', 'PLAN', 'PLOT', 'PLUG', 'PLUS', 'POEM', 'POET', 'POLE', 'POLL', 'POND', 'PONY', 'POOL', 'POOR', 'PORK', 'PORT', 'POST', 'POUR', 'PRAY', 'PREP', 'PREY', 'PROP', 'PULL', 'PUMP', 'PURE', 'PUSH',
    'QUIT', 'QUIZ',
    'RACE', 'RACK', 'RAFT', 'RAGE', 'RAIL', 'RAKE', 'RANK', 'RARE', 'RATE', 'READ', 'REAL', 'REAP', 'REAR', 'RELY', 'RENT', 'REST', 'RICE', 'RICH', 'RIDE', 'RIND', 'RINK', 'RIPE', 'RISE', 'RISK', 'ROAD', 'ROAR', 'ROBE', 'ROCK', 'RODE', 'ROLE', 'ROLL', 'ROOF', 'ROOT', 'ROPE', 'ROSE', 'RUDE', 'RULE', 'RUSH', 'RUST',
    'SACK', 'SAFE', 'SAGE', 'SAID', 'SAIL', 'SAKE', 'SALE', 'SALT', 'SAME', 'SANG', 'SANK', 'SAVE', 'SCAN', 'SCAR', 'SEAL', 'SEAM', 'SEAT', 'SEED', 'SEEK', 'SEEM', 'SEEN', 'SELF', 'SELL', 'SEND', 'SENT', 'SETS', 'SHED', 'SHIN', 'SHOP', 'SHOT', 'SHOW', 'SHUT', 'SICK', 'SIDE', 'SIFT', 'SIGN', 'SILK', 'SILL', 'SING', 'SINK', 'SIZE', 'SKIP', 'SLAM', 'SLAP', 'SLED', 'SLID', 'SLIM', 'SLIP', 'SLOT', 'SNAP', 'SNOW', 'SOAK', 'SOAP', 'SOAR', 'SOFT', 'SOIL', 'SOLD', 'SOLE', 'SOME', 'SONG', 'SOON', 'SORE', 'SORT', 'SOUL', 'SOUP', 'SOUR', 'SPAN', 'SPIN', 'SPOT', 'STAB', 'STAY', 'STEM', 'STEP', 'STEW', 'STOP', 'SUCH', 'SUIT', 'SUNG', 'SUNK', 'SURE', 'SWAN', 'SWAP', 'SWIM', 'SWAM',
    'TACK', 'TAKE', 'TALE', 'TALK', 'TAME', 'TANK', 'TAPE', 'TASK', 'TEAM', 'TEAR', 'TELL', 'TERM', 'TEST', 'TEXT', 'THAN', 'THAT', 'THEM', 'THEN', 'THEY', 'THIN', 'THIS', 'THUD', 'TICK', 'TIDE', 'TIED', 'TIER', 'TIES', 'TILE', 'TILL', 'TILT', 'TIME', 'TINY', 'TIPS', 'TIRE', 'TOAD', 'TOES', 'TOLD', 'TOLL', 'TOMB', 'TONE', 'TOOK', 'TOOL', 'TOPS', 'TORE', 'TORN', 'TOSS', 'TOUR', 'TOWN', 'TOYS', 'TRAP', 'TRAY', 'TRIM', 'TRIP', 'TROT', 'TRUE', 'TUBE', 'TUCK', 'TUNE', 'TURF', 'TURN', 'TWIG', 'TWIN', 'TYPE',
    'UGLY', 'UNDO', 'UNIT', 'UPON', 'USED', 'USER', 'USES',
    'VAIN', 'VARY', 'VAST', 'VEIL', 'VEIN', 'VENT', 'VERB', 'VERY', 'VEST', 'VIEW', 'VINE', 'VOID', 'VOTE',
    'WADE', 'WAGE', 'WAIL', 'WAIT', 'WAKE', 'WALK', 'WALL', 'WAND', 'WANT', 'WARD', 'WARE', 'WARN', 'WART', 'WASH', 'WASP', 'WAYS', 'WEAK', 'WEAR', 'WEED', 'WEEK', 'WELL', 'WENT', 'WERE', 'WEST', 'WHAT', 'WHEN', 'WHIP', 'WHOM', 'WIDE', 'WIFE', 'WILD', 'WILL', 'WILT', 'WIND', 'WINE', 'WING', 'WINK', 'WINS', 'WIPE', 'WIRE', 'WISE', 'WISH', 'WITH', 'WOKE', 'WOLF', 'WOOD', 'WOOL', 'WORD', 'WORE', 'WORM', 'WORN', 'WRAP',
    'YANK', 'YARN', 'YAWN', 'YEAR', 'YELL', 'YOGA', 'YOKE', 'YOLK', 'YOUR', 'YOYO',
    'ZEAL', 'ZERO', 'ZEST', 'ZINC', 'ZONE', 'ZOOM'
];

function selectWordBuilderLevel(level) {
    currentWordBuilderLevel = level;
    const instructions = document.getElementById('gameInstructions');

    switch(level) {
        case 1:
            instructions.textContent = 'Build the word by clicking letters in order!';
            break;
        case 2:
            instructions.textContent = 'Fill in the missing letter to complete ANY valid word!';
            break;
        case 3:
            instructions.textContent = 'Fill in the TWO missing letters to complete ANY valid word!';
            break;
    }

    startWordBuilder();
}

function newWordForLevel() {
    if (currentWordBuilderLevel === 0) {
        alert('Please select a level first!');
        return;
    }
    startWordBuilder();
}

function startWordBuilder() {
    if (currentWordBuilderLevel === 0) return;

    // Different word sets for different levels
    let wordSet;
    if (currentWordBuilderLevel === 1 || currentWordBuilderLevel === 2) {
        wordSet = ['CAT', 'DOG', 'SUN', 'BED', 'HAT', 'BAT', 'RUN', 'HOP', 'PIG', 'BUG'];
    } else {
        // Level 3 - 4 letter words
        wordSet = ['BOOK', 'JUMP', 'FISH', 'BIRD', 'TREE', 'STAR', 'MOON', 'FROG', 'DUCK', 'SHIP'];
    }

    targetWordForGame = wordSet[Math.floor(Math.random() * wordSet.length)];
    currentWordBuilt = '';
    missingLetterPositions = [];

    // Setup based on level
    if (currentWordBuilderLevel === 1) {
        // Level 1: Build entire word
        document.getElementById('targetWord').textContent = targetWordForGame;
        document.getElementById('currentWord').textContent = '';
        createLetterButtons(targetWordForGame);

    } else if (currentWordBuilderLevel === 2) {
        // Level 2: One missing letter
        const missingPos = Math.floor(Math.random() * targetWordForGame.length);
        missingLetterPositions = [missingPos];

        let displayWord = '';
        for (let i = 0; i < targetWordForGame.length; i++) {
            if (i === missingPos) {
                displayWord += '_';
                currentWordBuilt += '_';
            } else {
                displayWord += targetWordForGame[i];
                currentWordBuilt += targetWordForGame[i];
            }
        }
        wordPattern = displayWord;

        // Find all possible valid letters that could complete valid words
        const possibleLetters = new Set();
        allValidWords3Letter.forEach(word => {
            let matches = true;
            for (let i = 0; i < word.length; i++) {
                if (!missingLetterPositions.includes(i) && word[i] !== displayWord[i]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                possibleLetters.add(word[missingPos]);
            }
        });

        document.getElementById('targetWord').textContent = displayWord;
        document.getElementById('currentWord').textContent = currentWordBuilt;

        // Limit possible letters to avoid overwhelming choices
        let lettersToShow = Array.from(possibleLetters);
        if (lettersToShow.length > 6) {
            // If too many valid options, randomly select a subset
            lettersToShow = lettersToShow.sort(() => Math.random() - 0.5).slice(0, 6);
        }
        createLetterButtons(lettersToShow.join(''));

    } else if (currentWordBuilderLevel === 3) {
        // Level 3: Two missing letters in 4-letter word
        const positions = [0, 1, 2, 3];
        // Randomly select 2 positions to be missing
        for (let i = 0; i < 2; i++) {
            const idx = Math.floor(Math.random() * positions.length);
            missingLetterPositions.push(positions.splice(idx, 1)[0]);
        }
        missingLetterPositions.sort();

        let displayWord = '';
        for (let i = 0; i < targetWordForGame.length; i++) {
            if (missingLetterPositions.includes(i)) {
                displayWord += '_';
                currentWordBuilt += '_';
            } else {
                displayWord += targetWordForGame[i];
                currentWordBuilt += targetWordForGame[i];
            }
        }
        wordPattern = displayWord;

        // Find all possible valid letters that could complete valid words
        const possibleLetterPairs = new Set();
        allValidWords4Letter.forEach(word => {
            let matches = true;
            for (let i = 0; i < word.length; i++) {
                if (!missingLetterPositions.includes(i) && word[i] !== displayWord[i]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                possibleLetterPairs.add(word[missingLetterPositions[0]] + word[missingLetterPositions[1]]);
            }
        });

        // Collect all unique letters from valid pairs
        const allPossibleLetters = new Set();
        possibleLetterPairs.forEach(pair => {
            allPossibleLetters.add(pair[0]);
            allPossibleLetters.add(pair[1]);
        });

        document.getElementById('targetWord').textContent = displayWord;
        document.getElementById('currentWord').textContent = currentWordBuilt;

        // Limit possible letters to avoid overwhelming choices
        let lettersToShow = Array.from(allPossibleLetters);
        if (lettersToShow.length > 6) {
            // If too many valid options, randomly select a subset
            lettersToShow = lettersToShow.sort(() => Math.random() - 0.5).slice(0, 6);
        }
        createLetterButtons(lettersToShow.join(''));
    }

    document.getElementById('wordResult').textContent = '';
}

function createLetterButtons(neededLetters) {
    const letterButtons = document.getElementById('letterButtons');
    letterButtons.innerHTML = '';

    const letters = neededLetters.split('');
    const extraLetters = ['A', 'E', 'I', 'O', 'U', 'M', 'N', 'R', 'S', 'T', 'L', 'B', 'C', 'D', 'P', 'G', 'H', 'K', 'F', 'W'];
    const allLetters = [...letters];

    // Calculate how many extra letters to add to reach 8 total
    // For Level 1: 3 letter word = 3 correct + up to 5 extra = 8 total
    // For Level 2: 1 missing letter + extras to make 8 total
    // For Level 3: 2 missing letters + extras to make 8 total
    const targetTotal = 8;
    const currentCount = letters.length;
    const extraCount = Math.max(0, targetTotal - currentCount);

    // Add random extra letters
    for (let i = 0; i < extraCount; i++) {
        let randomLetter;
        do {
            randomLetter = extraLetters[Math.floor(Math.random() * extraLetters.length)];
        } while (allLetters.filter(l => l === randomLetter).length >= 2); // Avoid too many duplicates

        allLetters.push(randomLetter);
    }

    // Ensure we don't exceed 8 letters
    while (allLetters.length > 8) {
        allLetters.pop();
    }

    // Shuffle letters
    for (let i = allLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
    }

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
            if (currentWordBuilderLevel === 1) {
                // Level 1: Just add to the word
                currentWordBuilt += letter;
            } else {
                // Levels 2 & 3: Fill in the blanks
                const firstBlank = currentWordBuilt.indexOf('_');
                if (firstBlank !== -1) {
                    currentWordBuilt = currentWordBuilt.substring(0, firstBlank) + letter + currentWordBuilt.substring(firstBlank + 1);
                }
            }

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
    if (currentWordBuilderLevel === 0) return;

    if (currentWordBuilderLevel === 1) {
        currentWordBuilt = '';
    } else {
        // For levels 2 & 3, reset to original state with blanks
        currentWordBuilt = '';
        for (let i = 0; i < targetWordForGame.length; i++) {
            if (missingLetterPositions.includes(i)) {
                currentWordBuilt += '_';
            } else {
                currentWordBuilt += targetWordForGame[i];
            }
        }
    }

    document.getElementById('currentWord').textContent = currentWordBuilt;
    document.getElementById('wordResult').textContent = '';
}

function checkWord() {
    const result = document.getElementById('wordResult');

    // Check if blanks are filled
    if (currentWordBuilt.includes('_')) {
        result.style.color = '#dc3545';
        result.textContent = 'Please fill in all the blanks!';
        return;
    }

    let isValid = false;

    if (currentWordBuilderLevel === 1) {
        // Level 1: Must match the target word exactly
        isValid = currentWordBuilt === targetWordForGame;
    } else if (currentWordBuilderLevel === 2) {
        // Level 2: Check if it's any valid 3-letter word
        isValid = allValidWords3Letter.includes(currentWordBuilt.toUpperCase());
    } else if (currentWordBuilderLevel === 3) {
        // Level 3: Check if it's any valid 4-letter word that matches the pattern
        isValid = allValidWords4Letter.includes(currentWordBuilt.toUpperCase());

        // Also verify it matches the non-blank letters
        if (isValid) {
            for (let i = 0; i < wordPattern.length; i++) {
                if (wordPattern[i] !== '_' && wordPattern[i] !== currentWordBuilt[i]) {
                    isValid = false;
                    break;
                }
            }
        }
    }

    if (isValid) {
        result.style.color = '#28a745';
        const word = currentWordBuilt.toUpperCase();
        if (currentWordBuilderLevel > 1 && word !== targetWordForGame) {
            result.textContent = `🎉 Correct! "${word}" is a valid word!`;
        } else {
            result.textContent = '🎉 Correct! Great job!';
        }
        checkGameAchievement('word-builder', currentWordBuilderLevel);

        setTimeout(() => {
            startWordBuilder();
        }, 2000);
    } else {
        result.style.color = '#dc3545';
        if (currentWordBuilderLevel === 1) {
            result.textContent = 'Not quite right. Try again!';
        } else {
            result.textContent = `"${currentWordBuilt}" is not a valid word. Try again!`;
        }
    }
}

// Letter Match Game - Multiple levels of letter matching
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

                <!-- Level Selection -->
                <div id="letterLevelSelect" style="margin-bottom: 1rem; text-align: center;">
                    <h3 id="levelSelectTitle" style="color: #667eea; margin-bottom: 1rem; text-align: center;">🎮 Pick a Level!</h3>
                    <p id="levelSelectSubtitle" style="margin-bottom: 0.5rem;">Choose your challenge:</p>
                    <div style="display: flex; gap: 0.3rem; flex-wrap: nowrap; justify-content: center;">
                        <button onclick="selectLetterMatchLevel(1)" style="
                            padding: 0.4rem 0.6rem;
                            background: #28a745;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 0.85rem;
                            white-space: nowrap;
                        ">L1: Upper/Lower</button>
                        <button onclick="selectLetterMatchLevel(2)" style="
                            padding: 0.4rem 0.6rem;
                            background: #fbbf24;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 0.85rem;
                            white-space: nowrap;
                        ">L2: Letter/Picture</button>
                        <button onclick="selectLetterMatchLevel(3)" style="
                            padding: 0.4rem 0.6rem;
                            background: #dc3545;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 0.85rem;
                            white-space: nowrap;
                        ">L3: Picture/Picture</button>
                    </div>
                </div>


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
                    gap: 1rem;
                    justify-content: space-evenly;
                    align-items: start;
                    padding: 1rem;
                    background: linear-gradient(135deg, #fbbf24, #f97316);
                    border-radius: 15px;
                    min-height: 400px;
                    overflow: hidden;
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
                        gap: 0.5rem;
                        z-index: 2;
                        min-width: fit-content;
                    ">
                        <h3 style="text-align: center; color: white; margin-bottom: 0.5rem; font-size: 1rem;">Uppercase</h3>
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
                        min-width: 60px;
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
                        gap: 0.5rem;
                        z-index: 2;
                        min-width: fit-content;
                    ">
                        <h3 style="text-align: center; color: white; margin-bottom: 0.5rem; font-size: 1rem;">Lowercase</h3>
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
                    <button onclick="selectLetterMatchLevel(currentLetterMatchLevel)" style="
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
}

// Current letter match level
let currentLetterMatchLevel = 1;  // Default to level 1
let letterMatchGameTimer = null;  // Global timer reference

// Select Letter Match Level
function selectLetterMatchLevel(level) {
    currentLetterMatchLevel = level;


    // Update heading to show current level
    const levelTitle = document.getElementById('levelSelectTitle');
    const levelSubtitle = document.getElementById('levelSelectSubtitle');
    if (levelTitle) {
        levelTitle.textContent = `🎮 Level ${level} Active`;
    }
    if (levelSubtitle) {
        levelSubtitle.textContent = 'Switch levels anytime:';
    }

    // Update button styles to show active level
    const buttons = document.querySelectorAll('#letterLevelSelect button');
    buttons.forEach((btn, index) => {
        if (index + 1 === level) {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1.05)';
            btn.style.fontWeight = 'bold';
            btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        } else {
            btn.style.opacity = '0.7';
            btn.style.transform = 'scale(1)';
            btn.style.fontWeight = 'normal';
            btn.style.boxShadow = 'none';
        }
    });

    startLetterMatch(level);
}

// Start Letter Match Game with level support
function startLetterMatch(level = currentLetterMatchLevel || 1) {
    let selectedUppercase = null;
    let selectedLowercase = null;
    let matchesFound = 0;
    let score = 0;
    let gameTime = 0;
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

    // Clear SVG canvas to remove ghost lines from previous games
    const svg = document.getElementById('connectionCanvas');
    if (svg) {
        svg.innerHTML = '';
    }

    // Clear any existing timer to prevent multiple timers
    if (letterMatchGameTimer) {
        clearInterval(letterMatchGameTimer);
        letterMatchGameTimer = null;
    }

    // Start fresh timer
    letterMatchGameTimer = setInterval(() => {
        gameTime++;
        document.getElementById('letterTimer').textContent = gameTime;
    }, 1000);

    // Picture items for each letter - primary set (curated for young children)
    const letterPictures = {
        'A': {emoji: '🍎', word: 'Apple'},
        'B': {emoji: '⚽', word: 'Ball'},
        'C': {emoji: '🐱', word: 'Cat'},
        'D': {emoji: '🐶', word: 'Dog'},
        'E': {emoji: '🥚', word: 'Egg'},
        'F': {emoji: '🐟', word: 'Fish'},
        'G': {emoji: '🎁', word: 'Gift'},
        'H': {emoji: '🎩', word: 'Hat'},
        'I': {emoji: '🧊', word: 'Ice'},
        'J': {emoji: '🫙', word: 'Jar'},
        'K': {emoji: '🪁', word: 'Kite'},
        'L': {emoji: '🍃', word: 'Leaf'},
        'M': {emoji: '🌙', word: 'Moon'},
        'N': {emoji: '👃', word: 'Nose'},
        'O': {emoji: '🦉', word: 'Owl'},
        'P': {emoji: '🐷', word: 'Pig'},
        'Q': {emoji: '👸', word: 'Queen'},
        'R': {emoji: '🌧️', word: 'Rain'},
        'S': {emoji: '☀️', word: 'Sun'},
        'T': {emoji: '🌳', word: 'Tree'},
        'U': {emoji: '☂️', word: 'Umbrella'},
        'V': {emoji: '🎻', word: 'Violin'},
        'W': {emoji: '🐋', word: 'Whale'},
        'X': {emoji: '📦', word: 'Box'},  // X words typically end with X
        'Y': {emoji: '🧶', word: 'Yarn'},
        'Z': {emoji: '🦓', word: 'Zebra'}
    };

    // Alternative pictures for Level 3 (different items that start with same letter)
    const alternativePictures = {
        'A': {emoji: '🐜', word: 'Ant'},
        'B': {emoji: '🛏️', word: 'Bed'},
        'C': {emoji: '🚗', word: 'Car'},
        'D': {emoji: '🦆', word: 'Duck'},
        'E': {emoji: '🐘', word: 'Elephant'},
        'F': {emoji: '🦊', word: 'Fox'},
        'G': {emoji: '🍇', word: 'Grapes'},
        'H': {emoji: '🐴', word: 'Horse'},
        'I': {emoji: '🦎', word: 'Iguana'},
        'J': {emoji: '🧃', word: 'Juice'},
        'K': {emoji: '🔑', word: 'Key'},
        'L': {emoji: '🦁', word: 'Lion'},
        'M': {emoji: '🐭', word: 'Mouse'},
        'N': {emoji: '🥅', word: 'Net'},
        'O': {emoji: '🐙', word: 'Octopus'},
        'P': {emoji: '🍕', word: 'Pizza'},
        'Q': {emoji: '❓', word: 'Question'},
        'R': {emoji: '🌹', word: 'Rose'},
        'S': {emoji: '🐍', word: 'Snake'},
        'T': {emoji: '🚂', word: 'Train'},
        'U': {emoji: '🦄', word: 'Unicorn'},
        'V': {emoji: '🌋', word: 'Volcano'},
        'W': {emoji: '⌚', word: 'Watch'},
        'X': {emoji: '🪓', word: 'Axe'},  // Using Axe as it ends with X sound
        'Y': {emoji: '🟡', word: 'Yellow'},
        'Z': {emoji: '🦓', word: 'Zebra'}  // Same as primary since limited options
    };

    // Update column headers based on level
    const uppercaseColumn = document.getElementById('uppercaseColumn');
    const lowercaseColumn = document.getElementById('lowercaseColumn');

    if (level === 1) {
        uppercaseColumn.querySelector('h3').textContent = 'Uppercase';
        lowercaseColumn.querySelector('h3').textContent = 'Lowercase';
    } else if (level === 2) {
        uppercaseColumn.querySelector('h3').textContent = 'Letters';
        lowercaseColumn.querySelector('h3').textContent = 'Pictures';
    } else if (level === 3) {
        uppercaseColumn.querySelector('h3').textContent = 'Pictures Set 1';
        lowercaseColumn.querySelector('h3').textContent = 'Pictures Set 2';
    }

    // Create cards based on level
    const uppercaseContainer = document.getElementById('uppercaseLetters');
    const lowercaseContainer = document.getElementById('lowercaseLetters');
    uppercaseContainer.innerHTML = '';
    lowercaseContainer.innerHTML = '';

    const shuffledUppercase = [...selectedLetters].sort(() => Math.random() - 0.5);
    const shuffledLowercase = [...selectedLetters].sort(() => Math.random() - 0.5);

    if (level === 1) {
        // Level 1: Uppercase and lowercase letters
        shuffledUppercase.forEach(letter => {
            const card = createLetterCard(letter, 'uppercase', level);
            uppercaseContainer.appendChild(card);
        });
        shuffledLowercase.forEach(letter => {
            const card = createLetterCard(letter.toLowerCase(), 'lowercase', level);
            lowercaseContainer.appendChild(card);
        });
    } else if (level === 2) {
        // Level 2: Letters and corresponding pictures
        shuffledUppercase.forEach(letter => {
            const card = createLetterCard(letter, 'uppercase', level);
            uppercaseContainer.appendChild(card);
        });
        shuffledLowercase.forEach(letter => {
            const card = createPictureCard(letter, 'lowercase', level);
            lowercaseContainer.appendChild(card);
        });
    } else if (level === 3) {
        // Level 3: Two different pictures that start with the same letter
        shuffledUppercase.forEach(letter => {
            const card = createPictureCard(letter, 'uppercase', level, true); // Use primary pictures
            uppercaseContainer.appendChild(card);
        });
        shuffledLowercase.forEach(letter => {
            const card = createPictureCard(letter, 'lowercase', level, false); // Use alternative pictures
            lowercaseContainer.appendChild(card);
        });
    }

    // Create picture card for levels 2 and 3
    function createPictureCard(letter, type, level, usePrimary = true) {
        const card = document.createElement('div');
        card.dataset.letter = letter.toUpperCase();
        card.dataset.type = type;
        const screenWidth = window.innerWidth;
        let cardSize, fontSize;

        if (screenWidth <= 480) {
            cardSize = '50px';
            fontSize = '1.8rem';
        } else if (screenWidth <= 768) {
            cardSize = '60px';
            fontSize = '2rem';
        } else {
            cardSize = '80px';
            fontSize = '2.5rem';
        }

        // For Level 3, use different picture sets for each column
        const picture = (level === 3 && !usePrimary)
            ? alternativePictures[letter.toUpperCase()]
            : letterPictures[letter.toUpperCase()];

        card.style.cssText = `
            width: ${cardSize};
            height: ${cardSize};
            background: white;
            border: 3px solid #ddd;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: ${fontSize};
            cursor: pointer;
            transition: all 0.3s;
            user-select: none;
            padding: 2px;
        `;

        // Add emoji only (no word shown)
        card.innerHTML = `<span style="font-size: ${fontSize};">${picture.emoji}</span>`;

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
                selectedUppercase = letter.toUpperCase();
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

    // Create letter card
    function createLetterCard(letter, type, level) {
        const card = document.createElement('div');
        card.dataset.letter = letter.toUpperCase();
        card.dataset.type = type;
        const screenWidth = window.innerWidth;
        let cardSize, fontSize;

        if (screenWidth <= 480) {
            cardSize = '50px';
            fontSize = '1.5rem';
        } else if (screenWidth <= 768) {
            cardSize = '60px';
            fontSize = '1.8rem';
        } else {
            cardSize = '80px';
            fontSize = '2.5rem';
        }

        card.style.cssText = `
            width: ${cardSize};
            height: ${cardSize};
            background: white;
            border: 3px solid #ddd;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${fontSize};
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
                // Clear the global timer
                if (letterMatchGameTimer) {
                    clearInterval(letterMatchGameTimer);
                    letterMatchGameTimer = null;
                }
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

// Rhyme Family Trains Game
function launchRhymeTrainsGame() {
    const gameHTML = `
        <div id="gameModal" class="game-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        ">
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                padding: 20px;
                max-width: 95%;
                width: 800px;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2 style="color: white; margin: 0;">🚂 Rhyme Family Trains!</h2>
                    <button onclick="closeMiniGame()" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                        cursor: pointer;
                    ">✕</button>
                </div>

                <div id="rhymeGameArea" style="background: white; border-radius: 15px; padding: 20px; min-height: 400px;">
                    <!-- Difficulty Selection -->
                    <div id="rhymeDifficultySelect" style="text-align: center; margin-bottom: 20px;">
                        <h3 style="color: #667eea;">Choose Your Track!</h3>
                        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="startRhymeTrains(1)" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 10px; font-size: 18px; cursor: pointer;">
                                🟢 Easy<br><small>2 trains, 4 words</small>
                            </button>
                            <button onclick="startRhymeTrains(2)" style="padding: 10px 20px; background: #ffc107; color: white; border: none; border-radius: 10px; font-size: 18px; cursor: pointer;">
                                🟡 Medium<br><small>3 trains, 6 words</small>
                            </button>
                            <button onclick="startRhymeTrains(3)" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 10px; font-size: 18px; cursor: pointer;">
                                🔴 Hard<br><small>4 trains, 10 words</small>
                            </button>
                        </div>
                    </div>

                    <!-- Game Stats -->
                    <div id="rhymeStats" style="display: none; text-align: center; margin-bottom: 10px;">
                        <span style="font-size: 18px; margin: 0 10px;">🎯 Score: <span id="rhymeScore">0</span></span>
                        <span style="font-size: 18px; margin: 0 10px;">⏱️ Time: <span id="rhymeTimer">0</span>s</span>
                    </div>

                    <!-- Word Cards Area -->
                    <div id="wordCardsArea" style="display: none; min-height: 80px; margin-bottom: 20px; padding: 10px; background: #f8f9fa; border-radius: 10px;">
                        <h4 style="text-align: center; margin: 0 0 10px 0; color: #666;">Drag words to their rhyme family train!</h4>
                        <div id="wordCards" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                            <!-- Word cards will be added here -->
                        </div>
                    </div>

                    <!-- Train Station Area -->
                    <div id="trainStation" style="display: none;">
                        <!-- Trains will be added here -->
                    </div>

                    <!-- Success Message -->
                    <div id="rhymeSuccess" style="display: none; text-align: center; padding: 20px;">
                        <h2 style="color: #28a745;">🎉 All Aboard! Great Job! 🎉</h2>
                        <p style="font-size: 20px;">You sorted all the rhymes correctly!</p>
                        <div>
                            <button onclick="resetRhymeTrains()" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 10px; font-size: 16px; cursor: pointer; margin: 5px;">Play Again</button>
                            <button onclick="closeMiniGame()" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 10px; font-size: 16px; cursor: pointer; margin: 5px;">Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', gameHTML);
    initRhymeTrainsGame();
}

// Rhyme Trains Game Data
let rhymeGameData = {
    level: 1,
    score: 0,
    timer: 0,
    timerInterval: null,
    wordsPlaced: 0,
    totalWords: 0,
    trains: [],
    words: []
};

// Word families with emojis from approved list
const rhymeFamilies = {
    'at': [
        {word: 'cat', emoji: '🐱'},
        {word: 'hat', emoji: '🎩'},
        {word: 'bat', emoji: '🦇'},
        {word: 'rat', emoji: '🐀'}
    ],
    'ar': [
        {word: 'car', emoji: '🚗'},
        {word: 'star', emoji: '⭐'},
        {word: 'jar', emoji: '🫙'},
        {word: 'guitar', emoji: '🎸'}
    ],
    'og': [
        {word: 'dog', emoji: '🐶'},
        {word: 'log', emoji: '🪵'},
        {word: 'frog', emoji: '🐸'}
    ],
    'ee': [
        {word: 'bee', emoji: '🐝'},
        {word: 'tree', emoji: '🌳'},
        {word: 'key', emoji: '🔑'}
    ],
    'ain': [
        {word: 'rain', emoji: '🌧️'},
        {word: 'train', emoji: '🚂'},
        {word: 'brain', emoji: '🧠'},
        {word: 'chain', emoji: '⛓️'}
    ],
    'ake': [
        {word: 'cake', emoji: '🎂'},
        {word: 'snake', emoji: '🐍'}
    ],
    'ing': [
        {word: 'ring', emoji: '💍'},
        {word: 'king', emoji: '👑'}
    ],
    'ock': [
        {word: 'rock', emoji: '🪨'},
        {word: 'lock', emoji: '🔒'}
    ]
};

function initRhymeTrainsGame() {
    // Reset game data
    rhymeGameData = {
        level: 1,
        score: 0,
        timer: 0,
        timerInterval: null,
        wordsPlaced: 0,
        totalWords: 0,
        trains: [],
        words: []
    };
}

function startRhymeTrains(level) {
    rhymeGameData.level = level;
    rhymeGameData.score = 0;
    rhymeGameData.timer = 0;
    rhymeGameData.wordsPlaced = 0;

    // Hide difficulty selection
    document.getElementById('rhymeDifficultySelect').style.display = 'none';
    document.getElementById('rhymeStats').style.display = 'block';
    document.getElementById('wordCardsArea').style.display = 'block';
    document.getElementById('trainStation').style.display = 'block';

    // Start timer
    rhymeGameData.timerInterval = setInterval(() => {
        rhymeGameData.timer++;
        document.getElementById('rhymeTimer').textContent = rhymeGameData.timer;
    }, 1000);

    // Select word families based on level
    let selectedFamilies = [];
    const allFamilies = Object.keys(rhymeFamilies);

    if (level === 1) {
        selectedFamilies = ['at', 'og']; // 2 trains
    } else if (level === 2) {
        selectedFamilies = ['at', 'ar', 'ee']; // 3 trains
    } else {
        selectedFamilies = ['at', 'ar', 'og', 'ain']; // 4 trains
    }

    // Create trains
    const trainStation = document.getElementById('trainStation');
    trainStation.innerHTML = '';

    selectedFamilies.forEach((family, index) => {
        const trainColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731'];
        const train = createTrain(family, trainColors[index % trainColors.length]);
        trainStation.appendChild(train);
        rhymeGameData.trains.push({family: family, element: train, words: []});
    });

    // Create word cards
    const wordCardsArea = document.getElementById('wordCards');
    wordCardsArea.innerHTML = '';
    rhymeGameData.words = [];

    selectedFamilies.forEach(family => {
        const familyWords = rhymeFamilies[family];
        const wordsToUse = level === 1 ? familyWords.slice(0, 2) :
                          level === 2 ? familyWords.slice(0, 2) :
                          familyWords.slice(0, 3);

        wordsToUse.forEach(wordData => {
            rhymeGameData.words.push({...wordData, family: family});
        });
    });

    // Shuffle and create cards
    rhymeGameData.words.sort(() => Math.random() - 0.5);
    rhymeGameData.totalWords = rhymeGameData.words.length;

    rhymeGameData.words.forEach(wordData => {
        const card = createWordCard(wordData);
        wordCardsArea.appendChild(card);
    });
}

function createTrain(family, color) {
    const train = document.createElement('div');
    train.style.cssText = `
        margin: 20px auto;
        display: flex;
        align-items: center;
        min-height: 80px;
        max-width: 600px;
    `;
    train.dataset.family = family;

    // Create engine
    const engine = document.createElement('div');
    engine.style.cssText = `
        background: ${color};
        color: white;
        padding: 15px 20px;
        border-radius: 10px 0 0 10px;
        font-size: 24px;
        font-weight: bold;
        min-width: 80px;
        text-align: center;
        border: 3px solid #333;
        position: relative;
    `;
    engine.innerHTML = `
        <div>🚂</div>
        <div style="font-size: 18px; margin-top: 5px;">-${family}</div>
    `;

    // Create cargo area
    const cargo = document.createElement('div');
    cargo.style.cssText = `
        background: #f8f9fa;
        border: 3px solid #333;
        border-left: none;
        border-radius: 0 10px 10px 0;
        min-height: 80px;
        flex: 1;
        display: flex;
        align-items: center;
        padding: 10px;
        gap: 10px;
        min-width: 200px;
    `;
    cargo.classList.add('train-cargo');
    cargo.dataset.family = family;

    // Add drop zone styling
    cargo.addEventListener('dragover', (e) => {
        e.preventDefault();
        cargo.style.background = '#e8f5e9';
    });

    cargo.addEventListener('dragleave', () => {
        cargo.style.background = '#f8f9fa';
    });

    cargo.addEventListener('drop', (e) => {
        e.preventDefault();
        cargo.style.background = '#f8f9fa';

        const wordData = JSON.parse(e.dataTransfer.getData('word'));
        if (wordData.family === family) {
            // Correct placement
            handleCorrectPlacement(wordData, cargo);
        } else {
            // Wrong placement
            handleWrongPlacement();
        }
    });

    train.appendChild(engine);
    train.appendChild(cargo);

    return train;
}

function createWordCard(wordData) {
    const card = document.createElement('div');
    card.style.cssText = `
        background: white;
        border: 3px solid #667eea;
        border-radius: 10px;
        padding: 10px 15px;
        cursor: grab;
        transition: transform 0.2s;
        user-select: none;
    `;
    card.draggable = true;
    card.innerHTML = `
        <div style="font-size: 30px; text-align: center;">${wordData.emoji}</div>
        <div style="font-size: 16px; text-align: center; margin-top: 5px; font-weight: bold;">${wordData.word}</div>
    `;

    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('word', JSON.stringify(wordData));
        card.style.opacity = '0.5';
    });

    card.addEventListener('dragend', () => {
        card.style.opacity = '1';
    });

    // Add touch support
    let touchItem = null;
    card.addEventListener('touchstart', (e) => {
        touchItem = card.cloneNode(true);
        touchItem.style.position = 'fixed';
        touchItem.style.pointerEvents = 'none';
        touchItem.style.zIndex = '10001';
        touchItem.style.opacity = '0.8';
        document.body.appendChild(touchItem);

        const touch = e.touches[0];
        touchItem.style.left = touch.clientX - 40 + 'px';
        touchItem.style.top = touch.clientY - 40 + 'px';
    });

    card.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (touchItem) {
            const touch = e.touches[0];
            touchItem.style.left = touch.clientX - 40 + 'px';
            touchItem.style.top = touch.clientY - 40 + 'px';
        }
    });

    card.addEventListener('touchend', (e) => {
        if (touchItem) {
            const touch = e.changedTouches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);

            if (target && target.classList.contains('train-cargo')) {
                const family = target.dataset.family;
                if (wordData.family === family) {
                    handleCorrectPlacement(wordData, target);
                    card.remove();
                } else {
                    handleWrongPlacement();
                }
            }

            touchItem.remove();
            touchItem = null;
        }
    });

    return card;
}

function handleCorrectPlacement(wordData, cargo) {
    // Create word element in train
    const wordElement = document.createElement('div');
    wordElement.style.cssText = `
        background: #28a745;
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 5px;
        animation: popIn 0.3s ease;
    `;
    wordElement.innerHTML = `
        <span style="font-size: 20px;">${wordData.emoji}</span>
        <span style="font-size: 14px; font-weight: bold;">${wordData.word}</span>
    `;

    cargo.appendChild(wordElement);

    // Update score
    rhymeGameData.score += 10;
    rhymeGameData.wordsPlaced++;
    document.getElementById('rhymeScore').textContent = rhymeGameData.score;

    // Remove the word card
    const cards = document.querySelectorAll('#wordCards > div');
    cards.forEach(card => {
        if (card.textContent.includes(wordData.word)) {
            card.remove();
        }
    });

    // Check if game is complete
    if (rhymeGameData.wordsPlaced === rhymeGameData.totalWords) {
        endRhymeGame();
    }

    // Play success sound effect (visual feedback for now)
    cargo.style.animation = 'trainChug 0.5s ease';
    setTimeout(() => {
        cargo.style.animation = '';
    }, 500);
}

function handleWrongPlacement() {
    // Visual feedback for wrong placement
    if (typeof showToast === 'function') {
        showToast('❌ That word doesn\'t rhyme! Try another train.');
    }
}

function endRhymeGame() {
    clearInterval(rhymeGameData.timerInterval);

    // Hide game elements
    document.getElementById('wordCardsArea').style.display = 'none';
    document.getElementById('trainStation').style.display = 'none';

    // Show success message
    document.getElementById('rhymeSuccess').style.display = 'block';

    // Calculate bonus
    const timeBonus = Math.max(0, 100 - rhymeGameData.timer);
    rhymeGameData.score += timeBonus;

    // Animate trains leaving
    const trains = document.querySelectorAll('#trainStation > div');
    trains.forEach((train, index) => {
        setTimeout(() => {
            train.style.animation = 'trainLeave 1s ease forwards';
        }, index * 200);
    });
}

function resetRhymeTrains() {
    // Reset display
    document.getElementById('rhymeDifficultySelect').style.display = 'block';
    document.getElementById('rhymeStats').style.display = 'none';
    document.getElementById('wordCardsArea').style.display = 'none';
    document.getElementById('trainStation').style.display = 'none';
    document.getElementById('rhymeSuccess').style.display = 'none';

    // Clear timer
    if (rhymeGameData.timerInterval) {
        clearInterval(rhymeGameData.timerInterval);
    }

    // Reset game data
    initRhymeTrainsGame();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    @keyframes trainChug {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    @keyframes trainLeave {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Check game achievements
function checkGameAchievement(game, score) {
    // Could add game-specific badges here
    if (typeof showToast === 'function') {
        showToast(`Great job playing ${game}! 🎮`);
    }
}

// Export functions to global window object for onclick handlers
window.startButtonSort = startButtonSort;
window.createSortableButton = createSortableButton;
window.checkButtonSort = checkButtonSort;
window.launchGame = launchGame;
window.launchPeteButtonGame = launchPeteButtonGame;
window.launchStoryMatchGame = launchStoryMatchGame;
window.launchWordBuilderGame = launchWordBuilderGame;
// Story Sequencing Game Data
const storySequences = {
    level1: [
        {
            story: "Morning Routine",
            events: [
                { text: "😴 Wake up", order: 1 },
                { text: "🪥 Brush teeth", order: 2 },
                { text: "🚌 Go to school", order: 3 }
            ]
        },
        {
            story: "Planting a Seed",
            events: [
                { text: "🌱 Plant seed", order: 1 },
                { text: "💧 Water it", order: 2 },
                { text: "🌻 Flower grows", order: 3 }
            ]
        },
        {
            story: "Washing Hands",
            events: [
                { text: "💧 Turn on water", order: 1 },
                { text: "🧼 Add soap", order: 2 },
                { text: "🚿 Rinse off soap", order: 3 }
            ]
        }
    ],
    level2: [
        {
            story: "The Very Hungry Caterpillar",
            events: [
                { text: "🥚 Tiny egg on leaf", order: 1 },
                { text: "🐛 Caterpillar eats", order: 2 },
                { text: "🟤 Makes cocoon", order: 3 },
                { text: "🦋 Beautiful butterfly", order: 4 }
            ]
        },
        {
            story: "Three Little Pigs",
            events: [
                { text: "🏚️ Build straw house", order: 1 },
                { text: "🪵 Build stick house", order: 2 },
                { text: "🧱 Build brick house", order: 3 },
                { text: "🐺 Wolf can't blow it down", order: 4 }
            ]
        },
        {
            story: "Going to School",
            events: [
                { text: "🎒 Pack backpack", order: 1 },
                { text: "🚌 Ride the bus", order: 2 },
                { text: "👋 Say hi to teacher", order: 3 },
                { text: "📚 Learn and play", order: 4 }
            ]
        }
    ],
    level3: [
        {
            story: "Making Hot Chocolate",
            events: [
                { text: "🥛 Pour milk in pot", order: 1 },
                { text: "🔥 Heat on stove", order: 2 },
                { text: "🍫 Add chocolate", order: 3 },
                { text: "🥄 Stir it up", order: 4 },
                { text: "☕ Pour in mug", order: 5 }
            ]
        },
        {
            story: "Baking Cookies",
            events: [
                { text: "🥣 Mix ingredients", order: 1 },
                { text: "🍪 Shape cookies", order: 2 },
                { text: "🔥 Bake in oven", order: 3 },
                { text: "❄️ Let them cool", order: 4 },
                { text: "😋 Eat cookies", order: 5 }
            ]
        }
    ]
};

let currentSequenceLevel = 1;
let currentSequenceIndex = 0;
let sequenceScore = 0;
let userSequence = [];

// Launch Story Sequencing Game
function launchStorySequencingGame() {
    currentSequenceLevel = 1;
    currentSequenceIndex = 0;
    sequenceScore = 0;

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
                    <h2>📖 Story Sequencing</h2>
                    <button onclick="closeMiniGame()" style="
                        background: #e74c3c;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                    ">✕ Close</button>
                </div>

                <div id="sequenceLevelSelect">
                    <p style="text-align: center; margin-bottom: 2rem; font-size: 1.1rem;">
                        Put the story events in the correct order!
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <button onclick="selectSequenceLevel(1)" style="
                            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
                            border: none;
                            padding: 2rem;
                            border-radius: 15px;
                            cursor: pointer;
                            font-size: 1.2rem;
                            font-weight: bold;
                            transition: transform 0.2s;
                        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            Level 1<br>
                            <span style="font-size: 0.9rem; font-weight: normal;">3 Events</span>
                        </button>
                        <button onclick="selectSequenceLevel(2)" style="
                            background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
                            border: none;
                            padding: 2rem;
                            border-radius: 15px;
                            cursor: pointer;
                            font-size: 1.2rem;
                            font-weight: bold;
                            transition: transform 0.2s;
                        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            Level 2<br>
                            <span style="font-size: 0.9rem; font-weight: normal;">4 Events</span>
                        </button>
                        <button onclick="selectSequenceLevel(3)" style="
                            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                            border: none;
                            padding: 2rem;
                            border-radius: 15px;
                            cursor: pointer;
                            font-size: 1.2rem;
                            font-weight: bold;
                            transition: transform 0.2s;
                        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            Level 3<br>
                            <span style="font-size: 0.9rem; font-weight: normal;">5 Events</span>
                        </button>
                    </div>
                </div>

                <div id="sequenceGameArea" style="display: none;"></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', gameHTML);
}

// Select Sequence Level
function selectSequenceLevel(level) {
    currentSequenceLevel = level;
    currentSequenceIndex = 0;
    sequenceScore = 0;
    document.getElementById('sequenceLevelSelect').style.display = 'none';
    document.getElementById('sequenceGameArea').style.display = 'block';
    loadSequenceStory();
}

// Load Story Sequence
function loadSequenceStory() {
    const levelKey = `level${currentSequenceLevel}`;
    const stories = storySequences[levelKey];

    if (currentSequenceIndex >= stories.length) {
        showSequenceComplete();
        return;
    }

    const story = stories[currentSequenceIndex];
    const shuffledEvents = [...story.events].sort(() => Math.random() - 0.5);

    userSequence = [];

    const gameArea = document.getElementById('sequenceGameArea');
    gameArea.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
            <h3>${story.story}</h3>
            <p>Story ${currentSequenceIndex + 1} of ${stories.length} | Score: ${sequenceScore}</p>
        </div>

        <div style="margin-bottom: 2rem;">
            <p style="font-weight: bold; margin-bottom: 1rem;">Your Sequence:</p>
            <div id="userSequenceArea" style="
                min-height: 80px;
                background: #f8f9fa;
                border: 2px dashed #dee2e6;
                border-radius: 10px;
                padding: 1rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                align-items: center;
                justify-content: center;
            ">
                <span style="color: #999;">Tap events below in order...</span>
            </div>
        </div>

        <div style="margin-bottom: 1rem;">
            <p style="font-weight: bold; margin-bottom: 1rem;">Available Events:</p>
            <div id="availableEvents" style="
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            ">
                ${shuffledEvents.map((event, index) => `
                    <button onclick="selectSequenceEvent(${event.order})"
                            id="event-${event.order}"
                            style="
                        background: white;
                        border: 2px solid #007bff;
                        padding: 1rem;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1.1rem;
                        transition: all 0.2s;
                        text-align: left;
                    " onmouseover="this.style.background='#e7f3ff'" onmouseout="this.style.background='white'">
                        ${event.text}
                    </button>
                `).join('')}
            </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="resetSequence()" style="
                background: #ffc107;
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: bold;
            ">🔄 Reset</button>
            <button onclick="checkSequence()" id="checkSequenceBtn" style="
                background: #28a745;
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: bold;
                opacity: 0.5;
                pointer-events: none;
            ">✓ Check Order</button>
        </div>

        <div id="sequenceFeedback" style="
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            font-weight: bold;
            display: none;
        "></div>
    `;
}

// Select Sequence Event
function selectSequenceEvent(eventOrder) {
    const levelKey = `level${currentSequenceLevel}`;
    const story = storySequences[levelKey][currentSequenceIndex];
    const event = story.events.find(e => e.order === eventOrder);

    if (!event) return;

    userSequence.push(event);

    // Hide the selected event button
    const eventBtn = document.getElementById(`event-${eventOrder}`);
    if (eventBtn) {
        eventBtn.style.display = 'none';
    }

    // Update user sequence display
    const userArea = document.getElementById('userSequenceArea');
    userArea.innerHTML = userSequence.map((e, index) => `
        <div style="
            background: #007bff;
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-size: 1rem;
        ">
            ${index + 1}. ${e.text}
        </div>
    `).join('');

    // Enable check button when all events selected
    if (userSequence.length === story.events.length) {
        const checkBtn = document.getElementById('checkSequenceBtn');
        checkBtn.style.opacity = '1';
        checkBtn.style.pointerEvents = 'auto';
    }
}

// Reset Sequence
function resetSequence() {
    userSequence = [];
    loadSequenceStory();
}

// Check Sequence
function checkSequence() {
    const levelKey = `level${currentSequenceLevel}`;
    const story = storySequences[levelKey][currentSequenceIndex];

    let isCorrect = true;
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i].order !== i + 1) {
            isCorrect = false;
            break;
        }
    }

    const feedback = document.getElementById('sequenceFeedback');

    if (isCorrect) {
        sequenceScore += 10;
        feedback.style.background = '#d4edda';
        feedback.style.color = '#155724';
        feedback.innerHTML = '🎉 Perfect! That\'s the correct order!';
        feedback.style.display = 'block';

        setTimeout(() => {
            currentSequenceIndex++;
            loadSequenceStory();
        }, 2000);
    } else {
        feedback.style.background = '#f8d7da';
        feedback.style.color = '#721c24';
        feedback.innerHTML = '❌ Not quite right. Try again!';
        feedback.style.display = 'block';

        setTimeout(() => {
            feedback.style.display = 'none';
        }, 2000);
    }
}

// Show Sequence Complete
function showSequenceComplete() {
    const gameArea = document.getElementById('sequenceGameArea');
    gameArea.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h2 style="color: #28a745; margin-bottom: 1rem;">🎉 Level Complete!</h2>
            <p style="font-size: 1.5rem; margin-bottom: 2rem;">Final Score: ${sequenceScore}</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button onclick="selectSequenceLevel(${currentSequenceLevel})" style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: bold;
                ">🔄 Play Again</button>
                ${currentSequenceLevel < 3 ? `
                <button onclick="selectSequenceLevel(${currentSequenceLevel + 1})" style="
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: bold;
                ">➡️ Next Level</button>
                ` : ''}
                <button onclick="closeMiniGame()" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: bold;
                ">🏠 Back to Games</button>
            </div>
        </div>
    `;

    // Check for achievement
    if (sequenceScore >= 30) {
        checkGameAchievement('story-sequencer');
    }
}

// Pattern Builder Game
function launchPatternBuilderGame() {
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
                    <h2>🔷 Pattern Builder</h2>
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

                <div id="patternLevelSelect">
                    <p style="text-align: center; margin-bottom: 2rem; font-size: 1.1rem;">Choose your difficulty level!</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                        <button onclick="selectPatternLevel(1)" style="
                            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
                            border: none;
                            padding: 1.5rem;
                            border-radius: 15px;
                            cursor: pointer;
                            font-size: 1.1rem;
                            font-weight: bold;
                        ">Level 1<br><span style="font-size: 0.9rem; font-weight: normal;">Easy Patterns</span></button>
                        <button onclick="selectPatternLevel(2)" style="
                            background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
                            border: none;
                            padding: 1.5rem;
                            border-radius: 15px;
                            cursor: pointer;
                            font-size: 1.1rem;
                            font-weight: bold;
                        ">Level 2<br><span style="font-size: 0.9rem; font-weight: normal;">Medium Patterns</span></button>
                        <button onclick="selectPatternLevel(3)" style="
                            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                            border: none;
                            padding: 1.5rem;
                            border-radius: 15px;
                            cursor: pointer;
                            font-size: 1.1rem;
                            font-weight: bold;
                        ">Level 3<br><span style="font-size: 0.9rem; font-weight: normal;">Hard Patterns</span></button>
                    </div>
                </div>

                <div id="patternContent" style="margin-top: 1rem; display: none;">
                    <!-- Pattern will appear here -->
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', gameHTML);
}

window.selectPatternLevel = function(level) {
    document.getElementById('patternLevelSelect').style.display = 'none';
    document.getElementById('patternContent').style.display = 'block';
    startPatternBuilder(level);
};

function startPatternBuilder(level = 1) {
    const patternsByLevel = {
        1: [ // Easy - simple AB patterns
            { pattern: ['🔴', '🔵', '🔴', '🔵'], answer: '🔴', options: ['🔴', '🔵', '🟢', '🟡'] },
            { pattern: ['⭐', '⭐', '❤️', '⭐', '⭐'], answer: '❤️', options: ['⭐', '❤️', '🔵', '🟢'] },
            { pattern: ['🟢', '🟡', '🟢', '🟡', '🟢'], answer: '🟡', options: ['🟢', '🟡', '🔴', '🔵'] },
            { pattern: ['🔵', '🔵', '🔴', '🔵', '🔵'], answer: '🔴', options: ['🔵', '🔴', '🟢', '⭐'] },
            { pattern: ['🟣', '🟠', '🟣', '🟠', '🟣'], answer: '🟠', options: ['🟣', '🟠', '🔴', '🔵'] }
        ],
        2: [ // Medium - ABC patterns
            { pattern: ['🔴', '🔵', '🟢', '🔴', '🔵'], answer: '🟢', options: ['🔴', '🔵', '🟢', '🟡'] },
            { pattern: ['⭐', '❤️', '🔷', '⭐', '❤️'], answer: '🔷', options: ['⭐', '❤️', '🔷', '🟢'] },
            { pattern: ['🟡', '🟡', '🟢', '🟡', '🟡'], answer: '🟢', options: ['🟢', '🟡', '🔴', '🔵'] },
            { pattern: ['🔷', '🔶', '🔷', '🔷', '🔶'], answer: '🔷', options: ['🔷', '🔶', '🔴', '🔵'] },
            { pattern: ['🐱', '🐶', '🐱', '🐶'], answer: '🐱', options: ['🐱', '🐶', '🐭', '🐰'] }
        ],
        3: [ // Hard - longer and more complex patterns
            { pattern: ['🔴', '🔵', '🟢', '🟡', '🔴', '🔵', '🟢'], answer: '🟡', options: ['🔴', '🔵', '🟢', '🟡'] },
            { pattern: ['⭐', '⭐', '❤️', '❤️', '⭐', '⭐', '❤️'], answer: '❤️', options: ['⭐', '❤️', '🔵', '🟢'] },
            { pattern: ['🔷', '🔶', '🔷', '🔶', '🔶', '🔷', '🔶'], answer: '🔷', options: ['🔷', '🔶', '🔴', '🔵'] },
            { pattern: ['🟣', '🟣', '🟠', '🟣', '🟣', '🟠'], answer: '🟣', options: ['🟣', '🟠', '🔴', '🔵'] },
            { pattern: ['🔵', '🟢', '🟢', '🔵', '🔵', '🟢', '🟢'], answer: '🔵', options: ['🔵', '🟢', '🔴', '🟡'] }
        ]
    };

    const patterns = patternsByLevel[level];
    let currentPattern = 0;
    let score = 0;

    function showPattern() {
        if (currentPattern >= patterns.length) {
            showComplete();
            return;
        }

        const puzzle = patterns[currentPattern];
        const content = document.getElementById('patternContent');

        content.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <p style="font-weight: bold; margin-bottom: 0.5rem;">Pattern ${currentPattern + 1} of ${patterns.length}</p>
                <p>Score: ${score}</p>
            </div>

            <div style="
                background: linear-gradient(135deg, #667eea, #764ba2);
                padding: 2rem;
                border-radius: 15px;
                margin-bottom: 2rem;
            ">
                <p style="color: white; text-align: center; margin-bottom: 1rem; font-weight: bold;">Complete the pattern:</p>
                <div style="
                    display: flex;
                    gap: 0.5rem;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 1rem;
                ">
                    ${puzzle.pattern.map(shape => `
                        <div style="
                            width: 60px;
                            height: 60px;
                            background: white;
                            border-radius: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 2rem;
                        ">${shape}</div>
                    `).join('')}
                    <div id="patternAnswerBox" style="
                        width: 60px;
                        height: 60px;
                        background: white;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2rem;
                        font-weight: bold;
                        color: #667eea;
                    ">?</div>
                </div>
            </div>

            <div style="
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            ">
                ${puzzle.options.map(option => `
                    <button onclick="checkPatternAnswer('${option}')" style="
                        background: linear-gradient(135deg, #a8edea, #fed6e3);
                        border: none;
                        padding: 2rem;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 3rem;
                        transition: transform 0.2s;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">${option}</button>
                `).join('')}
            </div>
        `;
    }

    function showComplete() {
        const content = document.getElementById('patternContent');
        content.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #28a745; margin-bottom: 1rem;">🎉 Great Job!</h3>
                <p style="font-size: 1.5rem; margin-bottom: 1rem;">You completed all patterns!</p>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">Final Score: ${score}</p>
                <button onclick="closeMiniGame()" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: bold;
                ">Back to Games</button>
            </div>
        `;
        if (typeof checkGameAchievement === 'function') {
            checkGameAchievement('pattern-master');
        }
    }

    window.checkPatternAnswer = function(selectedAnswer) {
        const puzzle = patterns[currentPattern];
        const answerBox = document.getElementById('patternAnswerBox');

        // Show the selected shape in the pattern box
        if (answerBox) {
            answerBox.textContent = selectedAnswer;
            answerBox.style.color = 'inherit';
        }

        if (selectedAnswer === puzzle.answer) {
            score += 10;
            if (typeof showToast === 'function') {
                showToast('✅ Correct!');
            }
            // Add a green border briefly to show success
            if (answerBox) {
                answerBox.style.border = '3px solid #28a745';
            }
            currentPattern++;
            setTimeout(showPattern, 800);
        } else {
            if (typeof showToast === 'function') {
                showToast('❌ Try again!');
            }
            // Add a red border briefly to show error, then reset
            if (answerBox) {
                answerBox.style.border = '3px solid #dc3545';
                setTimeout(() => {
                    answerBox.textContent = '?';
                    answerBox.style.color = '#667eea';
                    answerBox.style.border = 'none';
                }, 1000);
            }
        }
    };

    showPattern();
}

// Export functions to window
window.launchGame = launchGame;
window.launchLetterMatchGame = launchLetterMatchGame;
window.launchRhymeTrainsGame = launchRhymeTrainsGame;
window.launchStorySequencingGame = launchStorySequencingGame;
window.startStoryMatch = startStoryMatch;
window.checkCard = checkCard;
window.selectWordBuilderLevel = selectWordBuilderLevel;
window.newWordForLevel = newWordForLevel;
window.clearWord = clearWord;
window.checkWord = checkWord;
window.toggleCategory = toggleCategory;
window.closeMiniGame = closeMiniGame;