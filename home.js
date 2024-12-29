let randomNumber;
let attempts;
let guessedNumbers;

// Audio for winning sound
const winSound = document.getElementById("winSound");

// Initialize the game
function initGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessedNumbers = [];

    document.getElementById("guessInput").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("attempts").textContent = "";
    document.getElementById("guessList").innerHTML = "";
    stopConfetti(); // Stop confetti if it's already running
}

// Confetti animation setup
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];
function createConfettiParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 5 + 2,
        angle: Math.random() * Math.PI * 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
}

// Generate confetti particles
for (let i = 0; i < 300; i++) {
    confettiParticles.push(createConfettiParticle());
}

// Draw confetti
function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Update confetti position
function updateConfetti() {
    confettiParticles.forEach((particle) => {
        particle.y += particle.speed;
        particle.x += Math.cos(particle.angle) * 2;
        if (particle.y > canvas.height) particle.y = -particle.size;
    });
}

// Confetti animation loop
let animationFrame;
function startConfetti() {
    drawConfetti();
    updateConfetti();
    animationFrame = requestAnimationFrame(startConfetti);
}

// Stop confetti animation after 3 seconds
function stopConfetti() {
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function stopConfetti() {
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Handle user guess
function makeGuess() {
    const guessInput = document.getElementById("guessInput");
    const feedback = document.getElementById("feedback");
    const attemptsDisplay = document.getElementById("attempts");
    const guessList = document.getElementById("guessList");

    let guessedNumber = parseInt(guessInput.value);
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
        feedback.textContent = "❌ Please enter a valid number between 1 to 100!";
        feedback.style.color = "#ff5555";
        return;
    }

    attempts++;
    guessedNumbers.push(guessedNumber);
    guessList.innerHTML = guessedNumbers.map(num => `<li>${num}</li>`).join("");

    if (guessedNumber > randomNumber) {
        feedback.textContent = "🔽 Lower number, please!";
        feedback.style.color = "#ffb86c";
    } else if (guessedNumber < randomNumber) {
        feedback.textContent = "🔼 Higher number, please!";
        feedback.style.color = "#8be9fd";
    } else {
        feedback.textContent = `🎉 Congratulations! You guessed it in ${attempts} attempts!`;
        feedback.style.color = "#50fa7b";
        startConfetti(); // Trigger confetti animation
        setTimeout(stopConfetti, 5000);// Stop confetti after 3 seconds
        winSound.play(); // Play the win sound
        return;
    }

    attemptsDisplay.textContent = `Attempts: ${attempts}`;
    guessInput.value = "";
    guessInput.focus();
}

// Reset the game
function resetGame() {
    initGame();
}

// Submit on Enter key press
document.getElementById("guessInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});

// Initialize the game on page load
initGame();
