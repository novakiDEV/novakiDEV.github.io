"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snow-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const numSnowflakes = 100;
    let snowflakes = [];
    
    for (let i = 0; i < numSnowflakes; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: (Math.random() * 2 + 0.5) * 0.8,
            depth: Math.random() * 1 + 0.5
        });
    }
    
    function drawSnowflakes() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.beginPath();
        for (let i = 0; i < numSnowflakes; i++) {
            const sf = snowflakes[i];
            ctx.moveTo(sf.x, sf.y);
            ctx.arc(sf.x, sf.y, sf.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        updateSnowflakes();
    }
    
    function updateSnowflakes() {
        for (let i = 0; i < numSnowflakes; i++) {
            const sf = snowflakes[i];
            // Add slight wave motion
            sf.x += Math.sin(Date.now() * 0.001 + i) * 0.3;
            sf.y += 3 * sf.depth;
            if (sf.y > canvas.height) {
                snowflakes[i] = {
                    x: Math.random() * canvas.width,
                    y: 0,
                    r: sf.r,
                    depth: Math.random() * 1 + 0.5
                };
            }
            if (sf.x > canvas.width) {
                snowflakes[i] = {
                    x: 0,
                    y: Math.random() * canvas.height,
                    r: sf.r,
                    depth: Math.random() * 1 + 0.5
                };
            }
        }
    }
    
    function animateSnow() {
        drawSnowflakes();
        requestAnimationFrame(animateSnow);
    }
    
    animateSnow();

    // Add event listener for the startup overlay
    const startupPage = document.getElementById('startup-page');
    const enterButton = document.getElementById('enter-button');
    const audio = document.getElementById('audio');

    enterButton.addEventListener('click', () => {
        startupPage.style.transition = "all 0.8s ease-out";
        startupPage.style.opacity = 0;
        startupPage.style.transform = "scale(1.1)";
        setTimeout(() => {
            startupPage.parentNode.removeChild(startupPage);
            audio.play().catch(console.error);
        }, 800);
    });

    // Remove audio context setup and replace with simple animation
    const VISUALIZER_CONFIG = {
        minHeight: 4,
        maxHeight: 20,
        defaultHeight: 15,
        lines: document.querySelectorAll('.visualizer-line')
    };
    
    function animateVisualizer() {
        const numLines = VISUALIZER_CONFIG.lines.length;
        const mid = Math.floor(numLines / 2);
        const time = Date.now() * 0.003; // Slower animation
        
        for (let i = 0; i < numLines; i++) {
            const distanceFromCenter = Math.abs(i - mid);
            
            // Create a wave effect that starts from the middle
            const wave = Math.sin(time + distanceFromCenter) * 0.5 + 0.5;
            const scale = wave * 1 + 0.5; // Scale between 0.5 and 2.5
            
            const line = VISUALIZER_CONFIG.lines[i];
            line.style.transform = `scaleY(${scale})`;
            line.style.transition = 'transform 0.2s ease';
        }
        
        requestAnimationFrame(animateVisualizer);
    }
    
    animateVisualizer();
});
