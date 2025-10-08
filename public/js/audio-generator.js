// Simple 8-bit style audio generator using Web Audio API
class ChiptuneAudioGenerator {
    constructor() {
        this.audioContext = null;
        this.enabled = false;
        this.currentTheme = null;
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.enabled = true;
            console.log('Audio system initialized');
        } catch (error) {
            console.log('Web Audio API not supported:', error);
        }
    }

    createSquareWave(frequency, duration, volume = 0.05) {
        if (!this.audioContext) return null;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        return { oscillator, gainNode };
    }

    playMelody(notes, tempo = 120) {
        if (!this.audioContext || !this.enabled) return;

        const noteLength = 60 / tempo / 4;
        let currentTime = this.audioContext.currentTime;

        notes.forEach((note) => {
            if (note.frequency > 0) {
                const { oscillator } = this.createSquareWave(note.frequency, note.duration * noteLength, 0.03);
                oscillator.start(currentTime);
                oscillator.stop(currentTime + note.duration * noteLength);
            }
            currentTime += note.duration * noteLength;
        });
    }

    playBattleTheme() {
        if (!this.enabled) return;
        
        const battleMelody = [
            { frequency: 523.25, duration: 0.5 },
            { frequency: 659.25, duration: 0.5 },
            { frequency: 783.99, duration: 0.5 },
            { frequency: 1046.50, duration: 1 },
            { frequency: 783.99, duration: 0.5 },
            { frequency: 659.25, duration: 0.5 },
            { frequency: 523.25, duration: 1 },
            { frequency: 0, duration: 0.5 }
        ];

        this.playMelody(battleMelody, 140);
        
        this.currentTheme = setTimeout(() => {
            if (this.enabled) {
                this.playBattleTheme();
            }
        }, 4000);
    }

    playVictoryTheme() {
        if (!this.enabled) return;

        const victoryMelody = [
            { frequency: 523.25, duration: 0.25 },
            { frequency: 659.25, duration: 0.25 },
            { frequency: 783.99, duration: 0.25 },
            { frequency: 1046.50, duration: 0.5 },
            { frequency: 783.99, duration: 0.25 },
            { frequency: 1046.50, duration: 0.25 },
            { frequency: 1318.51, duration: 1 },
            { frequency: 1174.66, duration: 0.5 },
            { frequency: 1046.50, duration: 1.5 }
        ];

        this.playMelody(victoryMelody, 160);
    }

    playAttackSound() {
        if (!this.enabled) return;
        const attackSound = [
            { frequency: 800, duration: 0.1 },
            { frequency: 600, duration: 0.1 },
            { frequency: 400, duration: 0.1 }
        ];
        this.playMelody(attackSound, 200);
    }

    playHitSound() {
        if (!this.enabled) return;
        const hitSound = [
            { frequency: 200, duration: 0.15 },
            { frequency: 150, duration: 0.1 }
        ];
        this.playMelody(hitSound, 200);
    }

    stopAll() {
        if (this.currentTheme) {
            clearTimeout(this.currentTheme);
            this.currentTheme = null;
        }
    }

    setEnabled(enabled) {
        this.enabled = enabled;
        if (!enabled) {
            this.stopAll();
        }
    }
}

const audioGenerator = new ChiptuneAudioGenerator();
