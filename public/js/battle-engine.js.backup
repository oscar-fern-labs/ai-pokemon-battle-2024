// LLM Pokemon Battle - Battle Engine
class BattleEngine {
    constructor() {
        this.playerLLM = null;
        this.opponentLLM = null;
        this.battleState = 'waiting';
    }

    initBattle(playerLLM, opponentLLM) {
        this.playerLLM = this.createBattleLLM(playerLLM);
        this.opponentLLM = this.createBattleLLM(opponentLLM);
        this.battleState = 'player-turn';
    }

    createBattleLLM(llmData) {
        return {
            ...llmData,
            currentHP: llmData.stats.hp,
            maxHP: llmData.stats.hp,
            statusEffects: []
        };
    }

    calculateDamage(attacker, target, move) {
        let baseDamage = move.power;
        let attackStat = attacker.stats.attack;
        let defenseStat = target.stats.defense;
        
        let levelMultiplier = (2 * 50 + 10) / 250;
        let damage = Math.floor((levelMultiplier * baseDamage * (attackStat / defenseStat)) / 2 + 2);
        
        let effectiveness = this.getTypeEffectiveness(move.type, target.type);
        damage = Math.floor(damage * effectiveness.multiplier);
        
        let randomFactor = (Math.random() * 0.15) + 0.85;
        damage = Math.floor(damage * randomFactor);
        
        damage = Math.max(damage, 1);
        
        return {
            damage: damage,
            effectiveness: effectiveness.text,
            critical: Math.random() < 0.0625
        };
    }

    getTypeEffectiveness(attackType, defenderTypes) {
        let multiplier = 1.0;
        let effectivenessText = '';
        
        defenderTypes.forEach(defType => {
            if (TYPE_EFFECTIVENESS[attackType] && TYPE_EFFECTIVENESS[attackType].strong.includes(defType)) {
                multiplier *= 2.0;
                effectivenessText = "It's super effective!";
            } else if (TYPE_EFFECTIVENESS[attackType] && TYPE_EFFECTIVENESS[attackType].weak.includes(defType)) {
                multiplier *= 0.5;
                effectivenessText = "It's not very effective...";
            }
        });
        
        if (multiplier === 1.0) {
            effectivenessText = '';
        }
        
        return {
            multiplier: multiplier,
            text: effectivenessText
        };
    }

    executePlayerMove(moveIndex) {
        if (this.battleState !== 'player-turn') return false;
        
        let move = this.playerLLM.moves[moveIndex];
        if (!move) return false;
        
        if (Math.random() * 100 > move.accuracy) {
            return {
                success: false,
                message: `${this.playerLLM.name}'s ${move.name} missed!`
            };
        }
        
        let damageResult = this.calculateDamage(this.playerLLM, this.opponentLLM, move);
        this.opponentLLM.currentHP = Math.max(0, this.opponentLLM.currentHP - damageResult.damage);
        
        let message = `${this.playerLLM.name} used ${move.name}!`;
        if (damageResult.critical) {
            message += ' A critical hit!';
        }
        if (damageResult.effectiveness) {
            message += ` ${damageResult.effectiveness}`;
        }
        
        if (this.opponentLLM.currentHP <= 0) {
            this.battleState = 'battle-over';
            message += ` ${this.opponentLLM.name} fainted!`;
        } else {
            this.battleState = 'opponent-turn';
        }
        
        return {
            success: true,
            message: message,
            damage: damageResult.damage,
            effectiveness: damageResult.effectiveness,
            critical: damageResult.critical
        };
    }

    executeOpponentMove() {
        if (this.battleState !== 'opponent-turn') return false;
        
        let moveIndex = Math.floor(Math.random() * this.opponentLLM.moves.length);
        let move = this.opponentLLM.moves[moveIndex];
        
        if (Math.random() * 100 > move.accuracy) {
            this.battleState = 'player-turn';
            return {
                success: false,
                message: `${this.opponentLLM.name}'s ${move.name} missed!`
            };
        }
        
        let damageResult = this.calculateDamage(this.opponentLLM, this.playerLLM, move);
        this.playerLLM.currentHP = Math.max(0, this.playerLLM.currentHP - damageResult.damage);
        
        let message = `${this.opponentLLM.name} used ${move.name}!`;
        if (damageResult.critical) {
            message += ' A critical hit!';
        }
        if (damageResult.effectiveness) {
            message += ` ${damageResult.effectiveness}`;
        }
        
        if (this.playerLLM.currentHP <= 0) {
            this.battleState = 'battle-over';
            message += ` ${this.playerLLM.name} fainted!`;
        } else {
            this.battleState = 'player-turn';
        }
        
        return {
            success: true,
            message: message,
            damage: damageResult.damage,
            effectiveness: damageResult.effectiveness,
            critical: damageResult.critical
        };
    }

    getBattleState() {
        return {
            state: this.battleState,
            playerLLM: this.playerLLM,
            opponentLLM: this.opponentLLM,
            playerHPPercent: this.playerLLM ? (this.playerLLM.currentHP / this.playerLLM.maxHP) * 100 : 0,
            opponentHPPercent: this.opponentLLM ? (this.opponentLLM.currentHP / this.opponentLLM.maxHP) * 100 : 0
        };
    }

    getBattleResult() {
        if (this.battleState !== 'battle-over') return null;
        
        if (this.playerLLM.currentHP <= 0) {
            return {
                winner: 'opponent',
                message: `${this.opponentLLM.name} wins!`
            };
        } else if (this.opponentLLM.currentHP <= 0) {
            return {
                winner: 'player',
                message: `${this.playerLLM.name} wins!`
            };
        }
        
        return null;
    }

    reset() {
        this.playerLLM = null;
        this.opponentLLM = null;
        this.battleState = 'waiting';
    }
}
