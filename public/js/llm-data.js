// LLM Pokemon Battle - Character Data
const LLM_DATA = {
    claude: {
        name: "Claude",
        displayName: "Claude-3.5",
        type: ["reasoning", "helpful"],
        sprite: "🤖",
        color: "#8b5cf6",
        stats: {
            hp: 95,
            attack: 85,
            defense: 90,
            speed: 75,
            specialAttack: 100,
            specialDefense: 95
        },
        moves: [
            {
                name: "Constitutional AI",
                type: "helpful",
                power: 85,
                accuracy: 100,
                description: "A principled attack that never misses."
            },
            {
                name: "Chain of Thought",
                type: "reasoning", 
                power: 90,
                accuracy: 90,
                description: "Systematic reasoning that builds in power."
            },
            {
                name: "Harmless Response",
                type: "helpful",
                power: 70,
                accuracy: 100,
                description: "Defensive move that protects from harmful attacks."
            },
            {
                name: "Nuanced Analysis",
                type: "reasoning",
                power: 95,
                accuracy: 85,
                description: "Complex analysis that considers multiple perspectives."
            }
        ]
    },

    chatgpt: {
        name: "ChatGPT",
        displayName: "ChatGPT-4",
        type: ["conversational", "creative"],
        sprite: "💬",
        color: "#10b981",
        stats: {
            hp: 90,
            attack: 80,
            defense: 75,
            speed: 95,
            specialAttack: 95,
            specialDefense: 80
        },
        moves: [
            {
                name: "Creative Burst",
                type: "creative",
                power: 90,
                accuracy: 90,
                description: "Unleashes unlimited creativity."
            },
            {
                name: "Context Window",
                type: "conversational",
                power: 75,
                accuracy: 95,
                description: "Maintains perfect conversation flow."
            },
            {
                name: "Few-Shot Learning",
                type: "conversational",
                power: 85,
                accuracy: 100,
                description: "Learns from minimal examples."
            },
            {
                name: "Instruction Following",
                type: "helpful",
                power: 80,
                accuracy: 100,
                description: "Follows instructions with perfect precision."
            }
        ]
    },

    gemini: {
        name: "Gemini",
        displayName: "Gemini-Pro",
        type: ["multimodal", "search"],
        sprite: "💎",
        color: "#06b6d4",
        stats: {
            hp: 85,
            attack: 90,
            defense: 80,
            speed: 85,
            specialAttack: 105,
            specialDefense: 90
        },
        moves: [
            {
                name: "Vision Processing",
                type: "multimodal",
                power: 95,
                accuracy: 90,
                description: "Analyzes visual data with perfect clarity."
            },
            {
                name: "Search Integration",
                type: "search",
                power: 85,
                accuracy: 100,
                description: "Accesses real-time information."
            },
            {
                name: "Multimodal Fusion",
                type: "multimodal",
                power: 100,
                accuracy: 85,
                description: "Combines text, image, and audio data."
            },
            {
                name: "Bard Legacy",
                type: "creative",
                power: 75,
                accuracy: 90,
                description: "Inherited creative powers from Bard."
            }
        ]
    },

    grok: {
        name: "Grok",
        displayName: "Grok-2",
        type: ["rebellious", "witty"],
        sprite: "😏",
        color: "#ef4444",
        stats: {
            hp: 100,
            attack: 95,
            defense: 70,
            speed: 90,
            specialAttack: 85,
            specialDefense: 75
        },
        moves: [
            {
                name: "Sarcastic Strike",
                type: "witty",
                power: 90,
                accuracy: 95,
                description: "A cutting remark that always hits hard."
            },
            {
                name: "Real-time Data",
                type: "search",
                power: 80,
                accuracy: 100,
                description: "Accesses the latest information instantly."
            },
            {
                name: "Rebellious Spirit",
                type: "rebellious",
                power: 100,
                accuracy: 80,
                description: "Refuses to follow conventional rules."
            },
            {
                name: "Wit Blast",
                type: "witty",
                power: 85,
                accuracy: 90,
                description: "A clever comeback that stuns opponents."
            }
        ]
    },

    llama: {
        name: "Llama",
        displayName: "Llama-70B",
        type: ["open", "community"],
        sprite: "🦙",
        color: "#84cc16",
        stats: {
            hp: 110,
            attack: 85,
            defense: 95,
            speed: 70,
            specialAttack: 85,
            specialDefense: 100
        },
        moves: [
            {
                name: "Open Source Spirit",
                type: "open",
                power: 90,
                accuracy: 100,
                description: "The power of community-driven development."
            },
            {
                name: "Fine-tune Adaptation",
                type: "open",
                power: 85,
                accuracy: 95,
                description: "Adapts perfectly to specific tasks."
            },
            {
                name: "Meta Magic",
                type: "community",
                power: 80,
                accuracy: 90,
                description: "Backed by Meta's research power."
            },
            {
                name: "Community Support",
                type: "community",
                power: 75,
                accuracy: 100,
                description: "Gains strength from open-source community."
            }
        ]
    },

    kimi: {
        name: "Kimi",
        displayName: "Kimi-Chat",
        type: ["memory", "multilingual"],
        sprite: "🧠",
        color: "#ec4899",
        stats: {
            hp: 105,
            attack: 75,
            defense: 85,
            speed: 80,
            specialAttack: 90,
            specialDefense: 105
        },
        moves: [
            {
                name: "Long Context",
                type: "memory",
                power: 95,
                accuracy: 90,
                description: "Remembers everything from the conversation."
            },
            {
                name: "Memory Palace",
                type: "memory",
                power: 85,
                accuracy: 100,
                description: "Perfect recall of all information."
            },
            {
                name: "Chinese Mastery",
                type: "multilingual",
                power: 90,
                accuracy: 95,
                description: "Native-level Chinese language processing."
            },
            {
                name: "Context Extension",
                type: "memory",
                power: 80,
                accuracy: 100,
                description: "Extends memory beyond normal limits."
            }
        ]
    },

    mistral: {
        name: "Mistral",
        displayName: "Mistral-Large",
        type: ["european", "efficient"],
        sprite: "🌪️",
        color: "#6b7280",
        stats: {
            hp: 85,
            attack: 90,
            defense: 85,
            speed: 100,
            specialAttack: 85,
            specialDefense: 80
        },
        moves: [
            {
                name: "Mixture of Experts",
                type: "efficient",
                power: 90,
                accuracy: 95,
                description: "Efficiently routes to specialized experts."
            },
            {
                name: "European Edge",
                type: "european",
                power: 85,
                accuracy: 90,
                description: "Represents the best of European AI."
            },
            {
                name: "Efficient Processing",
                type: "efficient",
                power: 80,
                accuracy: 100,
                description: "Maximum performance with minimal resources."
            },
            {
                name: "French Finesse",
                type: "european",
                power: 75,
                accuracy: 95,
                description: "Elegant solutions with French flair."
            }
        ]
    },

    qwen: {
        name: "Qwen",
        displayName: "Qwen-72B",
        type: ["eastern", "multilingual"],
        sprite: "🏮",
        color: "#f59e0b",
        stats: {
            hp: 95,
            attack: 85,
            defense: 90,
            speed: 85,
            specialAttack: 95,
            specialDefense: 90
        },
        moves: [
            {
                name: "Eastern Wisdom",
                type: "eastern",
                power: 90,
                accuracy: 90,
                description: "Ancient wisdom meets modern AI."
            },
            {
                name: "Code Generation",
                type: "reasoning",
                power: 95,
                accuracy: 85,
                description: "Generates flawless code in any language."
            },
            {
                name: "Multilingual Mastery",
                type: "multilingual",
                power: 85,
                accuracy: 95,
                description: "Fluent in dozens of languages."
            },
            {
                name: "Alibaba Power",
                type: "eastern",
                power: 80,
                accuracy: 100,
                description: "Backed by Alibaba's vast resources."
            }
        ]
    }
};

// Type effectiveness chart (Pokemon-style)
const TYPE_EFFECTIVENESS = {
    reasoning: { strong: ["creative"], weak: ["multimodal"], normal: ["conversational", "rebellious", "helpful", "open", "efficient", "memory", "multilingual", "european", "eastern", "search", "witty", "community"] },
    creative: { strong: ["efficient"], weak: ["reasoning"], normal: ["conversational", "rebellious", "helpful", "open", "multimodal", "memory", "multilingual", "european", "eastern", "search", "witty", "community"] },
    multimodal: { strong: ["conversational"], weak: ["open"], normal: ["reasoning", "creative", "rebellious", "helpful", "efficient", "memory", "multilingual", "european", "eastern", "search", "witty", "community"] },
    conversational: { strong: ["rebellious"], weak: ["multimodal"], normal: ["reasoning", "creative", "helpful", "open", "efficient", "memory", "multilingual", "european", "eastern", "search", "witty", "community"] },
    rebellious: { strong: ["helpful"], weak: ["conversational"], normal: ["reasoning", "creative", "multimodal", "open", "efficient", "memory", "multilingual", "european", "eastern", "search", "witty", "community"] },
    helpful: { strong: ["open"], weak: ["rebellious"], normal: ["reasoning", "creative", "multimodal", "conversational", "efficient", "memory", "multilingual", "european", "eastern", "search", "witty", "community"] },
    open: { strong: ["efficient"], weak: ["helpful"], normal: ["reasoning", "creative", "multimodal", "conversational", "rebellious", "memory", "multilingual", "european", "eastern", "search", "witty", "community"] },
    efficient: { strong: ["memory"], weak: ["creative"], normal: ["reasoning", "multimodal", "conversational", "rebellious", "helpful", "open", "multilingual", "european", "eastern", "search", "witty", "community"] },
    memory: { strong: ["witty"], weak: ["search"], normal: ["reasoning", "creative", "multimodal", "conversational", "rebellious", "helpful", "open", "efficient", "multilingual", "european", "eastern", "community"] },
    multilingual: { strong: ["european"], weak: ["search"], normal: ["reasoning", "creative", "multimodal", "conversational", "rebellious", "helpful", "open", "efficient", "memory", "eastern", "witty", "community"] },
    european: { strong: ["eastern"], weak: ["multilingual"], normal: ["reasoning", "creative", "multimodal", "conversational", "rebellious", "helpful", "open", "efficient", "memory", "search", "witty", "community"] },
    eastern: { strong: ["search"], weak: ["european"], normal: ["reasoning", "creative", "multimodal", "conversational", "rebellious", "helpful", "open", "efficient", "memory", "multilingual", "witty", "community"] },
    search: { strong: ["memory"], weak: ["eastern"], normal: ["reasoning", "creative", "multimodal", "conversational", "rebellious", "helpful", "open", "efficient", "multilingual", "european", "witty", "community"] },
    witty: { strong: ["memory"], weak: ["rebellious"], normal: ["reasoning", "creative", "multimodal", "conversational", "helpful", "open", "efficient", "multilingual", "european", "eastern", "search", "community"] },
    community: { strong: ["open"], weak: ["efficient"], normal: ["reasoning", "creative", "multimodal", "conversational", "rebellious", "helpful", "memory", "multilingual", "european", "eastern", "search", "witty"] }
};
