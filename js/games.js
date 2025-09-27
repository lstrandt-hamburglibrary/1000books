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
            { id: 'big', label: 'Big Buttons', color: '#ffe4cc', icon: '⭕', iconSize: '2.5em' },
            { id: 'small', label: 'Small Buttons', color: '#ccffe4', icon: '⭕', iconSize: '1.2em' }
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
            { id: 'circle', label: 'Round', color: '#ffccff', icon: '⭕' },
            { id: 'square', label: 'Square', color: '#ffffcc', icon: '⬜' },
            { id: 'star', label: 'Star', color: '#ccffff', icon: '⭐' }
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
    button.className = 'sortable-button';

    const size = config.size || 40;

    // Base styles
    let baseStyle = `
        display: inline-block;
        width: ${size}px;
        height: ${size}px;
        margin: 5px;
        background: ${config.color};
        cursor: pointer;
        transition: transform 0.2s;
        position: relative;
    `;

    // Shape-specific styles
    if (config.shape === 'circle') {
        baseStyle += 'border-radius: 50%; border: 2px solid rgba(0,0,0,0.2);';
    } else if (config.shape === 'square') {
        baseStyle += 'border-radius: 5px; border: 2px solid rgba(0,0,0,0.2);';
    } else if (config.shape === 'star') {
        button.innerHTML = '⭐';
        baseStyle += `
            background: transparent;
            font-size: ${size}px;
            line-height: ${size}px;
            text-align: center;
        `;
    }

    button.style.cssText = baseStyle;

    // Click to select/deselect
    button.onclick = function() {
        if (window.selectedButton === button) {
            window.selectedButton = null;
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '';
        } else {
            if (window.selectedButton) {
                window.selectedButton.style.transform = 'scale(1)';
                window.selectedButton.style.boxShadow = '';
            }
            window.selectedButton = button;
            button.style.transform = 'scale(1.2)';
            button.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
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
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '';
        button.style.cursor = 'default';
        button.onclick = null;
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
                    gap: ${window.innerWidth <= 480 ? '0.5rem' : '1rem'};
                    justify-content: space-evenly;
                    align-items: start;
                    padding: ${window.innerWidth <= 480 ? '0.5rem' : '1rem'};
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
                        <h3 style="text-align: center; color: white; margin-bottom: 0.5rem; font-size: ${window.innerWidth <= 480 ? '0.9rem' : '1rem'};">Uppercase</h3>
                        <div id="uppercaseLetters" style="
                            display: flex;
                            flex-direction: column;
                            gap: ${window.innerWidth <= 480 ? '0.5rem' : '0.8rem'};
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
                        min-width: ${window.innerWidth <= 480 ? '30px' : '60px'};
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
                        <h3 style="text-align: center; color: white; margin-bottom: 0.5rem; font-size: ${window.innerWidth <= 480 ? '0.9rem' : '1rem'};">Lowercase</h3>
                        <div id="lowercaseLetters" style="
                            display: flex;
                            flex-direction: column;
                            gap: ${window.innerWidth <= 480 ? '0.5rem' : '0.8rem'};
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

// Export functions to global window object for onclick handlers
window.startButtonSort = startButtonSort;
window.createSortableButton = createSortableButton;
window.checkButtonSort = checkButtonSort;
window.launchGame = launchGame;
window.launchPeteButtonGame = launchPeteButtonGame;
window.launchStoryMatchGame = launchStoryMatchGame;
window.launchWordBuilderGame = launchWordBuilderGame;
window.launchLetterMatchGame = launchLetterMatchGame;
window.startStoryMatch = startStoryMatch;
window.checkCard = checkCard;
window.selectWordBuilderLevel = selectWordBuilderLevel;
window.newWordForLevel = newWordForLevel;
window.clearWord = clearWord;
window.checkWord = checkWord;
window.toggleCategory = toggleCategory;
window.closeMiniGame = closeMiniGame;
window.checkGameAchievement = checkGameAchievement;

// Empty data.js file (functionality is built into main app.js)
// This file can be used for additional data management if needed