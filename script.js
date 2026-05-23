// Speech content - The complete apology
const speechParts = [
    {
        short: "Roja...",
        full: "Roja, I am so sorry for everything. I know every fault is mine. I did everything wrong, and every mistake was created by me."
    },
    {
        short: "I've been struggling...",
        full: "I have been trying to find a way to say sorry to you for the last 5 or 6 days because I feel so much guilt. If I can't say this to you, I will never be able to forgive myself for the rest of my life."
    },
    {
        short: "I hurt you deeply...",
        full: "I know I did so many foul things and I hurt you so deeply. I know you are a girl with the softest heart, but I made you into a hard-hearted person because of my actions."
    },
    {
        short: "I hate myself...",
        full: "I hate myself for changing the beautiful person you are. You were so kind, so gentle, and I destroyed that."
    },
    {
        short: "Every person makes mistakes...",
        full: "Every single human being, from Adam until now, makes mistakes. We are built to fail, but humanity survives because people get a chance to fix what they broke. I am begging for that one chance."
    },
    {
        short: "I want to spend my life with you...",
        full: "I want to live with you for my whole life. If I made the biggest mistake, please forgive me this one last time."
    },
    {
        short: "I promise I will listen...",
        full: "If I ever do anything wrong again, or if I make a mistake without realizing it—instantly tell me. Teach me, guide me, and show me how to be better for you. I promise I will listen and learn."
    },
    {
        short: "This is my final apology...",
        full: "This is me saying sorry one last time. Even if you never see this, and even if you never reply, I will spend the rest of my life trying to earn your forgiveness in my heart."
    },
    {
        short: "I am waiting for you...",
        full: "I am right here, and I am waiting for you. Please forgive me. I am so sorry. 💔"
    }
];

// Slap messages
const slapMessages = [
    "OW! That hurt!",
    "She's letting it out...",
    "Her anger is still boiling!",
    "Another one!",
    "She's getting it out of her system...",
    "Keep going if you need to!",
    "Her fury is real...",
    "She needed this...",
    "SLAP! That was a strong one!",
    "Her pain is coming out..."
];

// Chase messages
const chaseMessages = [
    "She's running after him!",
    "He's scared for his life!",
    "The chase continues...",
    "She's getting closer!",
    "He's trying to escape!",
    "Wait... she's slowing down...",
    "She's catching her breath...",
    "Maybe she's starting to tire out...",
    "Her anger is fading...",
    "She stops... what will happen next?"
];

// State
let currentSpeechIndex = 0;
let angerLevel = 100;
let slapCount = 0;
let isPlaying = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupMusicControl();
    initializeScene2();
});

// Music Control
function setupMusicControl() {
    const musicBtn = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
            isPlaying = false;
        } else {
            bgMusic.play().catch(err => console.log('Autoplay prevented:', err));
            musicBtn.innerHTML = '<span class="music-icon">⏸️</span>';
            isPlaying = true;
        }
    });

    // Try to autoplay
    bgMusic.play().catch(() => {
        console.log('Autoplay prevented by browser');
    });
}

// Scene Navigation
function goToScene(sceneNum) {
    // Hide all scenes
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.add('hidden');
    });

    // Show selected scene
    const targetScene = document.getElementById(`scene-${getSceneName(sceneNum)}`);
    if (targetScene) {
        targetScene.classList.remove('hidden');
    }

    // Reset scroll
    window.scrollTo(0, 0);

    // Initialize scene
    if (sceneNum === 2) {
        initializeScene2();
    } else if (sceneNum === 3) {
        initializeScene3();
    } else if (sceneNum === 4) {
        initializeScene4();
    } else if (sceneNum === 5) {
        initializeScene5();
    }
}

function getSceneName(num) {
    const names = ['intro', 'apology', 'slap', 'chase', 'acceptance'];
    return names[num - 1];
}

// SCENE 2: APOLOGY
function initializeScene2() {
    currentSpeechIndex = 0;
    updateSpeech();
}

function updateSpeech() {
    const part = speechParts[currentSpeechIndex];
    document.getElementById('speech-text').textContent = part.short;
    document.getElementById('story-content').textContent = part.full;
    document.getElementById('progress').textContent = `${currentSpeechIndex + 1} / ${speechParts.length}`;

    // Update buttons
    document.getElementById('btn-prev').disabled = currentSpeechIndex === 0;
    document.getElementById('btn-next').disabled = currentSpeechIndex === speechParts.length - 1;
}

function nextSpeech() {
    if (currentSpeechIndex < speechParts.length - 1) {
        currentSpeechIndex++;
        updateSpeech();
    }
}

function prevSpeech() {
    if (currentSpeechIndex > 0) {
        currentSpeechIndex--;
        updateSpeech();
    }
}

// SCENE 3: SLAP GAME
function initializeScene3() {
    angerLevel = 100;
    slapCount = 0;
    updateAngerMeter();
    document.getElementById('slap-message').textContent = '';
    document.getElementById('btn-continue-slap').disabled = true;
}

function getSlapped() {
    slapCount++;
    angerLevel = Math.max(0, angerLevel - 15);

    // Add hit animation
    const maleChar = document.getElementById('char-slap-male');
    const femaleChar = document.getElementById('char-slap-female');
    
    maleChar.classList.add('hit');
    femaleChar.querySelector('.arm.slapping').style.animation = 'none';
    
    setTimeout(() => {
        maleChar.classList.remove('hit');
        femaleChar.querySelector('.arm.slapping').style.animation = '';
    }, 300);

    // Play slap sound
    playSound('slapSound');

    // Update message
    const message = slapMessages[Math.floor(Math.random() * slapMessages.length)];
    document.getElementById('slap-message').textContent = `${message} (Slaps: ${slapCount})`;

    // Update anger meter
    updateAngerMeter();

    // Check if anger is gone
    if (angerLevel <= 0) {
        document.getElementById('slap-message').textContent = 'Her anger has finally subsided...';
        document.getElementById('btn-continue-slap').disabled = false;
    }
}

function updateAngerMeter() {
    const fill = document.getElementById('anger-fill');
    const value = document.getElementById('anger-value');
    
    fill.style.width = angerLevel + '%';
    value.textContent = angerLevel + '%';

    // Change color based on anger level
    if (angerLevel > 60) {
        fill.style.background = 'linear-gradient(90deg, #ff1744, #d32f2f)';
    } else if (angerLevel > 30) {
        fill.style.background = 'linear-gradient(90deg, #ff9800, #f57c00)';
    } else {
        fill.style.background = 'linear-gradient(90deg, #ffd700, #ffb300)';
    }
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(err => console.log('Sound play failed:', err));
    }
}

// SCENE 4: CHASE
function initializeScene4() {
    // Chase animation will run automatically
    let chaseMessageIndex = 0;
    const chaseInterval = setInterval(() => {
        if (chaseMessageIndex < chaseMessages.length) {
            document.getElementById('chase-message').textContent = chaseMessages[chaseMessageIndex];
            chaseMessageIndex++;
        } else {
            clearInterval(chaseInterval);
        }
    }, 2000);
}

// SCENE 5: ACCEPTANCE
function initializeScene5() {
    // Create falling hearts
    createHearts();
}

function createHearts() {
    const container = document.getElementById('hearts-container');
    container.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-fall';
        heart.textContent = '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        container.appendChild(heart);
    }
}

// End Story
function endStory() {
    alert('❤️ Thank you for witnessing their journey of forgiveness! ❤️');
}

// Initialize on load
console.log('🎬 Interactive Animated Story Ready!');
console.log('🎵 Music: Tum Hi Ho');
console.log('💕 Start the journey...');
