// Game State
let gameState = {
    mode: null,
    maps: [],
    currentMap: null,
    currentFloorIndex: 0,
    correctGuesses: 0,
    remainingMaps: 0,
    usedMaps: [],
    timer: 0,
    timerInterval: null,
    allMapNames: [],
    availableFloors: [], // Track which floors haven't been shown yet
    floorsShownCount: 0, // Track how many floors have been shown for current map
    currentRotation: 0 // Track current rotation for hard mode
};

// DOM Elements
const menuScreen = document.getElementById('menu-screen');
const gameScreen = document.getElementById('game-screen');
const gameoverScreen = document.getElementById('gameover-screen');
const easyModeBtn = document.getElementById('easy-mode-btn');
const hardModeBtn = document.getElementById('hard-mode-btn');
const guessInput = document.getElementById('guess-input');
const suggestionsDiv = document.getElementById('suggestions');
const submitBtn = document.getElementById('submit-btn');
const skipBtn = document.getElementById('skip-btn');
const mapImage = document.getElementById('map-image');
const imageContainer = document.getElementById('image-container');
const mapsRemainingEl = document.getElementById('maps-remaining');
const correctGuessesEl = document.getElementById('correct-guesses');
const timerEl = document.getElementById('timer');
const currentFloorEl = document.getElementById('current-floor');
const totalFloorsEl = document.getElementById('total-floors');
const playAgainBtn = document.getElementById('play-again-btn');
const finalCorrectEl = document.getElementById('final-correct');
const finalTimeEl = document.getElementById('final-time');
const backToMenuBtn = document.getElementById('back-to-menu');
const feedbackMessageEl = document.getElementById('feedback-message');

// Show feedback message
function showFeedbackMessage(message, type = 'info', duration = 3000) {
    feedbackMessageEl.textContent = message;
    feedbackMessageEl.className = 'feedback-message active';
    if (type) {
        feedbackMessageEl.classList.add(type);
    }
    
    setTimeout(() => {
        feedbackMessageEl.classList.remove('active');
        setTimeout(() => {
            feedbackMessageEl.className = 'feedback-message';
        }, 300);
    }, duration);
}

// Load maps data
async function loadMapsData() {
    try {
        const response = await fetch('data/maps.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading maps data:', error);
        // Fallback data if JSON fails to load
        return getFallbackData();
    }
}

// Fallback data
function getFallbackData() {
    return {
        maps: [
            { name: "CLUBHOUSE", color: ["clubhouse_1.jpg", "clubhouse_2.jpg"], bluewhite: ["clubhouse_1.jpg", "clubhouse_2.jpg"] },
            { name: "BANK", color: ["bank_1.jpg", "bank_2.jpg"], bluewhite: ["bank_1.jpg", "bank_2.jpg"] },
            { name: "BANK REWORK", color: [], bluewhite: ["bank_rework_1.jpg"] },
            { name: "KAFE", color: ["kafe_1.jpg", "kafe_2.jpg"], bluewhite: ["kafe_1.jpg", "kafe_2.jpg"] },
            { name: "CHALET", color: ["chalet_1.jpg", "chalet_2.jpg"], bluewhite: ["chalet_1.jpg", "chalet_2.jpg"] },
            { name: "CHALET REWORK", color: [], bluewhite: ["chalet_rework_1.jpg"] },
            { name: "BORDER", color: ["border_1.jpg", "border_2.jpg"], bluewhite: ["border_1.jpg", "border_2.jpg"] },
            { name: "STADIUM BRAVO", color: ["stadium_bravo_1.jpg"], bluewhite: [] },
            { name: "STADIUM ALPHA", color: ["stadium_alpha_1.jpg"], bluewhite: [] },
            { name: "LAIR", color: ["lair_1.jpg"], bluewhite: [] },
            { name: "NIGHTHAVEN LABS", color: ["nighthaven_1.jpg"], bluewhite: ["nighthaven_1.jpg"] },
            { name: "EMERALD PLAINS", color: ["emerald_1.jpg"], bluewhite: [] },
            { name: "COASTLINE", color: ["coastline_1.jpg", "coastline_2.jpg"], bluewhite: ["coastline_1.jpg"] },
            { name: "CONSULATE", color: ["consulate_1.jpg", "consulate_2.jpg"], bluewhite: ["consulate_1.jpg"] },
            { name: "CONSULATE REWORK", color: [], bluewhite: ["consulate_rework_1.jpg"] },
            { name: "FAVELA", color: ["favela_1.jpg", "favela_2.jpg"], bluewhite: ["favela_1.jpg"] },
            { name: "FORTRESS", color: ["fortress_1.jpg"], bluewhite: ["fortress_1.jpg"] },
            { name: "HEREFORD BASE", color: ["hereford_1.jpg"], bluewhite: ["hereford_1.jpg"] },
            { name: "HOUSE", color: ["house_1.jpg", "house_2.jpg"], bluewhite: ["house_1.jpg"] },
            { name: "HOUSE REWORK",color: ["House_1.jpg", "House_2.jpg", "House_3.jpg"], bluewhite: ["House_RW_1.jpg", "House_RW_2.jpg", "House_RW_3.jpg"] },            
            { name: "KANAL", color: ["kanal_1.jpg", "kanal_2.jpg"], bluewhite: ["kanal_1.jpg"] },
            { name: "OREGON", color: ["oregon_1.jpg", "oregon_2.jpg"], bluewhite: ["oregon_1.jpg"] },
            { name: "OREGON REWORK", color: [], bluewhite: ["oregon_rework_1.jpg"] },
            { name: "OUTBACK", color: ["outback_1.jpg"], bluewhite: ["outback_1.jpg"] },
            { name: "OUTBACK REWORK", color: [], bluewhite: ["outback_rework_1.jpg"] },
            { name: "PRESIDENTIAL PLANE", color: ["plane_1.jpg"], bluewhite: ["plane_1.jpg"] },
            { name: "SKYSCRAPER", color: ["skyscraper_1.jpg"], bluewhite: ["skyscraper_1.jpg"] },
            { name: "SKYSCRAPER REWORK", color: [], bluewhite: ["skyscraper_rework_1.jpg"] },
            { name: "THEME PARK", color: ["themepark_1.jpg", "themepark_2.jpg"], bluewhite: ["themepark_1.jpg"] },
            { name: "TOWER", color: ["tower_1.jpg"], bluewhite: ["tower_1.jpg"] },
            { name: "VILLA", color: ["villa_1.jpg", "villa_2.jpg"], bluewhite: ["villa_1.jpg"] },
            { name: "YACHT", color: ["yacht_1.jpg"], bluewhite: ["yacht_1.jpg"] }
        ]
    };
}

// Initialize game
async function init() {
    const data = await loadMapsData();
    gameState.allMapNames = data.maps.map(m => m.name);
    
    // Event listeners
    easyModeBtn.addEventListener('click', () => startGame('bluewhite', data, false));
    hardModeBtn.addEventListener('click', () => startGame('bluewhite', data, true));
    submitBtn.addEventListener('click', submitGuess);
    document.getElementById('intel-btn').addEventListener('click', showNextFloor);
    skipBtn.addEventListener('click', skipMap);
    guessInput.addEventListener('input', handleInput);
    guessInput.addEventListener('keypress', handleKeyPress);
    playAgainBtn.addEventListener('click', returnToMenu);
    backToMenuBtn.addEventListener('click', () => {
        showFeedbackMessage('RETURNING TO MAIN MENU...', 'info', 2000);
        setTimeout(() => {
            stopTimer();
            returnToMenu();
        }, 2000);
    });
}

// Start game
function startGame(mode, data, isHardMode) {
    gameState.mode = mode;
    gameState.isHardMode = isHardMode;
    
    // Filter maps that have blueprints for this mode
    gameState.maps = data.maps.filter(map => map[mode] && map[mode].length > 0);
    
    gameState.remainingMaps = gameState.maps.length;
    gameState.correctGuesses = 0;
    gameState.usedMaps = [];
    gameState.timer = 0;
    gameState.currentFloorIndex = 0;
    gameState.currentRotation = 0;
    
    // Update UI
    updateScore();
    
    // Show game screen
    showScreen('game');
    
    // Start timer
    startTimer();
    
    // Load first map
    loadRandomMap();
}

// Show screen
function showScreen(screen) {
    menuScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    gameoverScreen.classList.remove('active');
    
    if (screen === 'menu') {
        menuScreen.classList.add('active');
    } else if (screen === 'game') {
        gameScreen.classList.add('active');
    } else if (screen === 'gameover') {
        gameoverScreen.classList.add('active');
    }
}

// Load random map
function loadRandomMap() {
    const unusedMaps = gameState.maps.filter(m => !gameState.usedMaps.includes(m.name));
    
    if (unusedMaps.length === 0) {
        endGame();
        return;
    }
    
    const randomMap = unusedMaps[Math.floor(Math.random() * unusedMaps.length)];
    gameState.currentMap = randomMap;
    
    // Get all available floors for this map
    const floors = randomMap[gameState.mode];
    
    // Create array of floor indices and randomize starting floor
    gameState.availableFloors = floors.map((_, index) => index);
    
    // Reset floors shown counter for this new map
    gameState.floorsShownCount = 0;
    
    // Pick a random starting floor
    const randomIndex = Math.floor(Math.random() * gameState.availableFloors.length);
    gameState.currentFloorIndex = gameState.availableFloors.splice(randomIndex, 1)[0];
    
    // Increment floors shown count
    gameState.floorsShownCount = 1;
    
    // Reset input
    guessInput.value = '';
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.classList.remove('active');
    
    // Remove feedback classes
    imageContainer.classList.remove('correct', 'incorrect');
    
    // Remove any existing placeholder
    const existingPlaceholder = imageContainer.querySelector('.image-placeholder');
    if (existingPlaceholder) {
        existingPlaceholder.remove();
    }
    
    // Load image
    loadMapImage();
    
    // Focus input
    guessInput.focus();
}

// Load map image
function loadMapImage() {
    const floors = gameState.currentMap[gameState.mode];
    const imagePath = `blueprints/${gameState.mode}/${floors[gameState.currentFloorIndex]}`;
    
    // Show the image container
    mapImage.style.display = 'block';
    
    // Set the image source
    mapImage.src = imagePath;
    
    // If in hard mode, apply random rotation
    if (gameState.isHardMode) {
        const rotations = [0, 90, 180, 270];
        gameState.currentRotation = rotations[Math.floor(Math.random() * rotations.length)];
        mapImage.style.transform = `rotate(${gameState.currentRotation}deg)`;
        mapImage.style.transition = 'transform 0.5s ease';
    } else {
        mapImage.style.transform = 'rotate(0deg)';
    }
    
    // Update floor indicator - show how many floors have been revealed vs total
    currentFloorEl.textContent = gameState.floorsShownCount;
    totalFloorsEl.textContent = floors.length;
    
    // Handle successful load
    mapImage.onload = function() {
        this.style.opacity = '1';
    };
    
    // Handle image load error (show placeholder)
    mapImage.onerror = function() {
        console.warn(`Image not found: ${imagePath}`);
        this.onerror = null;
        // Create a more visible placeholder
        this.style.display = 'none';
        showPlaceholder();
    };
}

// Show placeholder when image is missing
function showPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = `
        <div style="text-align: center; color: #666; padding: 60px 20px;">
            <div style="font-size: 80px; margin-bottom: 20px;">🗺️</div>
            <div style="font-size: 24px; margin-bottom: 10px;">Map Blueprint</div>
            <div style="font-size: 14px; margin-bottom: 20px;">Floor ${gameState.currentFloorIndex + 1} of ${gameState.currentMap[gameState.mode].length}</div>
            <div style="font-size: 12px; color: #444; margin-top: 20px;">
                Mode: ${gameState.mode === 'color' ? 'Colored Blueprint' : 'Blue & White Blueprint'}
            </div>
            <div style="font-size: 11px; color: #333; margin-top: 10px; font-family: monospace;">
                Expected: blueprints/${gameState.mode}/${gameState.currentMap[gameState.mode][gameState.currentFloorIndex]}
            </div>
        </div>
    `;
    
    // Remove any existing placeholder
    const existingPlaceholder = imageContainer.querySelector('.image-placeholder');
    if (existingPlaceholder) {
        existingPlaceholder.remove();
    }
    
    imageContainer.appendChild(placeholder);
}

// Handle input
function handleInput(e) {
    const value = e.target.value.toUpperCase().trim();
    
    if (value.length > 0) {
        const filtered = gameState.allMapNames.filter(name => 
            name.includes(value)
        );
        
        if (filtered.length > 0) {
            suggestionsDiv.innerHTML = '';
            filtered.forEach(name => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = name;
                div.addEventListener('click', () => selectSuggestion(name));
                suggestionsDiv.appendChild(div);
            });
            suggestionsDiv.classList.add('active');
        } else {
            suggestionsDiv.classList.remove('active');
        }
    } else {
        suggestionsDiv.classList.remove('active');
    }
    
    // Enable/disable submit button
    submitBtn.disabled = value.length === 0;
}

// Select suggestion
function selectSuggestion(name) {
    guessInput.value = name;
    suggestionsDiv.classList.remove('active');
    submitGuess();
}

// Handle key press
function handleKeyPress(e) {
    if (e.key === 'Enter' && guessInput.value.trim()) {
        submitGuess();
    }
}

// Submit guess
function submitGuess() {
    const guess = guessInput.value.toUpperCase().trim();
    const answer = gameState.currentMap.name.toUpperCase().trim();
    
    if (guess === answer) {
        // Correct!
        imageContainer.classList.add('correct');
        gameState.correctGuesses++;
        gameState.usedMaps.push(gameState.currentMap.name);
        gameState.remainingMaps--;
        
        showFeedbackMessage('CORRECT IDENTIFICATION — MOVING TO NEXT TARGET', 'info', 1000);
        
        updateScore();
        
        setTimeout(() => {
            loadRandomMap();
        }, 1000);
    } else {
        // Incorrect
        imageContainer.classList.add('incorrect');
        
        // Check if there are more floors to show
        if (gameState.availableFloors.length > 0) {
            showFeedbackMessage('INCORRECT — REVEALING ADDITIONAL INTEL...', 'incorrect', 2000);
        } else {
            showFeedbackMessage(`MISSION FAILED — TARGET WAS: ${gameState.currentMap.name}`, 'incorrect', 3000);
        }
        
        setTimeout(() => {
            imageContainer.classList.remove('incorrect');
            
            // Check if there are more floors to show
            if (gameState.availableFloors.length > 0) {
                // Show next random floor from remaining floors
                const randomIndex = Math.floor(Math.random() * gameState.availableFloors.length);
                gameState.currentFloorIndex = gameState.availableFloors.splice(randomIndex, 1)[0];
                
                // Increment floors shown count
                gameState.floorsShownCount++;
                
                loadMapImage();
                guessInput.value = '';
                suggestionsDiv.classList.remove('active');
            } else {
                // No more floors, move to next map
                gameState.usedMaps.push(gameState.currentMap.name);
                gameState.remainingMaps--;
                updateScore();
                setTimeout(() => {
                    loadRandomMap();
                }, 3000);
            }
        }, 500);
    }
}

// Skip map
function skipMap() {
    showFeedbackMessage(`EXTRACTION CALLED — TARGET WAS: ${gameState.currentMap.name}`, 'info', 3000);
    gameState.usedMaps.push(gameState.currentMap.name);
    gameState.remainingMaps--;
    updateScore();
    setTimeout(() => {
        loadRandomMap();
    }, 3000);
}

// Update score
function updateScore() {
    mapsRemainingEl.textContent = gameState.remainingMaps;
    correctGuessesEl.textContent = gameState.correctGuesses;
}

// Start timer
function startTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        updateTimer();
    }, 1000);
}

// Stop timer
function stopTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

// Update timer display
function updateTimer() {
    const minutes = Math.floor(gameState.timer / 60);
    const seconds = gameState.timer % 60;
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// End game
function endGame() {
    stopTimer();
    
    // Update final stats
    finalCorrectEl.textContent = gameState.correctGuesses;
    const minutes = Math.floor(gameState.timer / 60);
    const seconds = gameState.timer % 60;
    finalTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Show game over screen
    showScreen('gameover');
}

// Return to menu
function returnToMenu() {
    showScreen('menu');
}

// Show next floor (Intel button)
function showNextFloor() {
    // Check if there are more floors available
    if (gameState.availableFloors.length > 0) {
        // Show feedback
        showFeedbackMessage('ADDITIONAL INTEL ACQUIRED — DISPLAYING NEXT FLOOR PLAN', 'info', 2000);
        
        // Pick a random floor from remaining floors
        const randomIndex = Math.floor(Math.random() * gameState.availableFloors.length);
        gameState.currentFloorIndex = gameState.availableFloors.splice(randomIndex, 1)[0];
        
        // Increment floors shown count
        gameState.floorsShownCount++;
        
        // Load the new floor image
        loadMapImage();
        
        // Clear input and suggestions
        guessInput.value = '';
        suggestionsDiv.classList.remove('active');
        
        // Remove any feedback classes from image container
        imageContainer.classList.remove('correct', 'incorrect');
    } else {
        // No more floors available
        showFeedbackMessage('NO ADDITIONAL INTEL AVAILABLE FOR THIS MAP', 'info', 2000);
    }
}

// Start the game
init();