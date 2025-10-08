// LLM Pokemon Battle - Main Game Controller
class LLMPokemonGame {
    constructor() {
        this.battleEngine = new BattleEngine();
        this.selectedLLM = null;
        this.currentScreen = 'title';
        this.audioEnabled = false;
        this.init();
    }

    async init() {
        this.initElements();
        this.setupEventListeners();
        await audioGenerator.init();
        this.audioEnabled = true;
        this.showScreen('title');
        console.log('LLM Pokemon Battle initialized!');
    }

    initElements() {
        this.screens = {
            title: document.getElementById('title-screen'),
            selection: document.getElementById('selection-screen'),
            battle: document.getElementById('battle-screen'),
            victory: document.getElementById('victory-screen')
        };

        this.buttons = {
            start: document.getElementById('start-button'),
            confirmSelection: document.getElementById('confirm-selection'),
            playAgain: document.getElementById('play-again')
        };

        this.battleElements = {
            playerName: document.getElementById('player-name'),
            playerHP: document.getElementById('player-hp'),
            playerHealth: document.getElementById('player-health'),
            playerSprite: document.getElementById('player-sprite'),
            opponentName: document.getElementById('opponent-name'),
            opponentHP: document.getElementById('opponent-hp'),
            opponentHealth: document.getElementById('opponent-health'),
            opponentSprite: document.getElementById('opponent-sprite'),
            battleLog: document.getElementById('battle-log'),
            mainMenu: document.getElementById('main-menu'),
            attackMenu: document.getElementById('attack-menu'),
            attackOptions: document.getElementById('attack-options')
        };

        this.audio = {
            battle: document.getElementById('battle-music'),
            victory: document.getElementById('victory-music')
        };
    }

    setupEventListeners() {
        this.buttons.start.addEventListener('click', () => {
            this.showScreen('selection');
            this.populateLLMSelection();
        });

        this.buttons.confirmSelection.addEventListener('click', () => {
            if (this.selectedLLM) {
                this.startBattle();
            }
        });

        this.buttons.playAgain.addEventListener('click', () => {
            this.resetGame();
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('menu-button')) {
                this.handleMenuAction(e.target.dataset.action);
            }
            
            if (e.target.classList.contains('attack-button')) {
                this.handleAttack(parseInt(e.target.dataset.move));
            }
            
            if (e.target.classList.contains('back-button')) {
                this.showMainMenu();
            }
            
            if (e.target.classList.contains('llm-card')) {
                this.selectLLM(e.target.dataset.llm);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'm' || e.key === 'M') {
                this.toggleAudio();
            }
        });
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
            this.currentScreen = screenName;
        }
    }

    populateLLMSelection() {
        const container = document.getElementById('llm-selection');
        container.innerHTML = '';

        Object.keys(LLM_DATA).forEach(llmKey => {
            const llm = LLM_DATA[llmKey];
            const card = document.createElement('div');
            card.className = 'llm-card';
            card.dataset.llm = llmKey;
            
            card.innerHTML = `
                <div class="llm-sprite-preview">${llm.sprite}</div>
                <div class="llm-name">${llm.displayName}</div>
                <div class="llm-type">Type: ${llm.type.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join('/')}</div>
                <div class="llm-stats">
                    HP: ${llm.stats.hp}<br>
                    ATK: ${llm.stats.attack}<br>
                    DEF: ${llm.stats.defense}<br>
                    SPD: ${llm.stats.speed}
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    selectLLM(llmKey) {
        document.querySelectorAll('.llm-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[data-llm="${llmKey}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.selectedLLM = llmKey;
            this.buttons.confirmSelection.disabled = false;
        }
    }

    startBattle() {
        const llmKeys = Object.keys(LLM_DATA).filter(key => key !== this.selectedLLM);
        const opponentKey = llmKeys[Math.floor(Math.random() * llmKeys.length)];
        
        this.battleEngine.initBattle(LLM_DATA[this.selectedLLM], LLM_DATA[opponentKey]);
        this.setupBattleUI();
        this.showScreen('battle');
        this.playBattleMusic();
        
        this.addBattleLog(`A wild ${LLM_DATA[opponentKey].displayName} appeared!`);
        this.addBattleLog(`Go! ${LLM_DATA[this.selectedLLM].displayName}!`);
    }

    setupBattleUI() {
        const battleState = this.battleEngine.getBattleState();
        
        this.battleElements.playerName.textContent = battleState.playerLLM.displayName;
        this.battleElements.playerSprite.textContent = battleState.playerLLM.sprite;
        this.battleElements.playerSprite.style.color = battleState.playerLLM.color;
        this.updateHP('player', battleState.playerLLM.currentHP, battleState.playerLLM.maxHP);
        
        this.battleElements.opponentName.textContent = `Wild ${battleState.opponentLLM.displayName}`;
        this.battleElements.opponentSprite.textContent = battleState.opponentLLM.sprite;
        this.battleElements.opponentSprite.style.color = battleState.opponentLLM.color;
        this.updateHP('opponent', battleState.opponentLLM.currentHP, battleState.opponentLLM.maxHP);
        
        this.setupAttackMenu(battleState.playerLLM.moves);
        this.showMainMenu();
    }

    setupAttackMenu(moves) {
        const container = this.battleElements.attackOptions;
        container.innerHTML = '';
        
        moves.forEach((move, index) => {
            const button = document.createElement('button');
            button.className = 'attack-button';
            button.dataset.move = index;
            
            button.innerHTML = `
                <div class="attack-name">${move.name}</div>
                <div class="attack-type">Type: ${move.type}</div>
                <div class="attack-power">Power: ${move.power}</div>
            `;
            
            container.appendChild(button);
        });
    }

    handleMenuAction(action) {
        switch(action) {
            case 'attack':
                this.showAttackMenu();
                break;
            case 'items':
                this.addBattleLog("No items available!");
                break;
            case 'switch':
                this.addBattleLog("No other LLMs available!");
                break;
            case 'run':
                this.addBattleLog("Can't run from a trainer battle!");
                break;
        }
    }

    showMainMenu() {
        this.battleElements.mainMenu.classList.add('active');
        this.battleElements.attackMenu.classList.remove('active');
    }

    showAttackMenu() {
        this.battleElements.mainMenu.classList.remove('active');
        this.battleElements.attackMenu.classList.add('active');
    }

    handleAttack(moveIndex) {
        if (this.audioEnabled) {
            audioGenerator.playAttackSound();
        }
        
        const result = this.battleEngine.executePlayerMove(moveIndex);
        
        if (!result.success) {
            this.addBattleLog(result.message);
            return;
        }
        
        this.addBattleLog(result.message);
        
        if (this.audioEnabled) {
            setTimeout(() => {
                audioGenerator.playHitSound();
            }, 500);
        }
        
        const battleState = this.battleEngine.getBattleState();
        this.updateHP('opponent', battleState.opponentLLM.currentHP, battleState.opponentLLM.maxHP);
        
        if (this.battleEngine.getBattleState().state === 'battle-over') {
            this.endBattle();
            return;
        }
        
        this.showMainMenu();
        
        setTimeout(() => {
            this.executeOpponentTurn();
        }, 2000);
    }

    executeOpponentTurn() {
        const result = this.battleEngine.executeOpponentMove();
        
        if (!result) return;
        
        this.addBattleLog(result.message);
        
        const battleState = this.battleEngine.getBattleState();
        this.updateHP('player', battleState.playerLLM.currentHP, battleState.playerLLM.maxHP);
        
        if (this.battleEngine.getBattleState().state === 'battle-over') {
            this.endBattle();
        }
    }

    updateHP(side, currentHP, maxHP) {
        const hpElement = this.battleElements[`${side}HP`];
        const healthElement = this.battleElements[`${side}Health`];
        
        hpElement.textContent = currentHP;
        
        const percentage = (currentHP / maxHP) * 100;
        healthElement.style.width = `${percentage}%`;
        
        healthElement.classList.remove('low', 'critical');
        if (percentage <= 25) {
            healthElement.classList.add('critical');
        } else if (percentage <= 50) {
            healthElement.classList.add('low');
        }
    }

    addBattleLog(message) {
        const logElement = this.battleElements.battleLog;
        logElement.innerHTML = `<div class="log-text">${message}</div>`;
        console.log('Battle Log:', message);
    }

    endBattle() {
        const result = this.battleEngine.getBattleResult();
        
        if (result) {
            this.stopBattleMusic();
            
            setTimeout(() => {
                document.getElementById('victory-text').textContent = 
                    result.winner === 'player' ? 'Victory!' : 'Defeat!';
                document.getElementById('victory-message').textContent = result.message;
                
                this.showScreen('victory');
                
                if (result.winner === 'player') {
                    this.playVictoryMusic();
                }
            }, 2000);
        }
    }

    resetGame() {
        this.battleEngine.reset();
        this.selectedLLM = null;
        this.buttons.confirmSelection.disabled = true;
        this.stopAllMusic();
        this.showScreen('title');
    }

    playBattleMusic() {
        if (this.audioEnabled) {
            audioGenerator.playBattleTheme();
        }
    }

    stopBattleMusic() {
        audioGenerator.stopAll();
    }

    playVictoryMusic() {
        if (this.audioEnabled) {
            audioGenerator.playVictoryTheme();
        }
    }

    stopAllMusic() {
        audioGenerator.stopAll();
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        audioGenerator.setEnabled(this.audioEnabled);
        if (!this.audioEnabled) {
            this.stopAllMusic();
        }
        console.log('Audio', this.audioEnabled ? 'enabled' : 'disabled');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new LLMPokemonGame();
});
