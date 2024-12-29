const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Fixed canvas size (not affected by zooming)
const fixedWidth = 1920; // Set a fixed width
const fixedHeight = 1080; // Set a fixed height

// Ensure canvas always matches the fixed dimensions
canvas.width = fixedWidth;
canvas.height = fixedHeight;

const letters = "01"; // Binary-like effect
const fontSize = 16;
const columns = fixedWidth / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, fixedWidth, fixedHeight);

    ctx.fillStyle = "#0f0"; // Green color for technical effect
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > fixedHeight && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    });
}

// Call draw function every 50ms
setInterval(draw, 50);
