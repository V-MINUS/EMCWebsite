// Connected Dots Background Animation for Producer Competition Platform
// Inspired by the EMC website style with enhanced community network effect

document.addEventListener('DOMContentLoaded', function() {
    // Create the canvas element and append it to the background container
    const backgroundContainer = document.getElementById('background-animation');
    if (!backgroundContainer) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    backgroundContainer.appendChild(canvas);

    // Set canvas dimensions to match window size
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Array to hold the particle objects
    let particles = [];
    
    // Number of particles to create (adjust based on screen size)
    const particleCount = width > 768 ? 100 : 50;
    
    // Animation state
    let hueRotation = 0;
    let networkPulse = 0;
    
    // Base colors (will be modified with hue rotation)
    const primaryHue = 275; // Brighter purple
    const secondaryHue = 160; // Brighter teal
    
    // Increase overall visibility
    backgroundContainer.style.opacity = '0.6'; // Increased from 0.3
    
    // Initialize canvas and resize handler
    function initCanvas() {
        canvas.width = width;
        canvas.height = height;
        
        // For better rendering quality on high DPI screens
        const dpr = window.devicePixelRatio || 1;
        if (dpr > 1) {
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }
        
        // Reset particles when canvas is resized
        initParticles();
    }
    
    // Create the particles
    function initParticles() {
        particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            // Create community clusters by having some particles start near each other
            const clusterChance = Math.random();
            let x, y;
            
            if (clusterChance > 0.7) {
                // Create a cluster point
                const clusterX = Math.random() * width;
                const clusterY = Math.random() * height;
                x = clusterX + (Math.random() - 0.5) * 100;
                y = clusterY + (Math.random() - 0.5) * 100;
            } else {
                x = Math.random() * width;
                y = Math.random() * height;
            }
            
            particles.push({
                x: x,
                y: y,
                radius: Math.random() * 3 + 1.5, // Increased base size
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                baseHue: Math.random() > 0.5 ? primaryHue : secondaryHue,
                hueOffset: Math.random() * 40 - 20, // More color variation
                connections: 0, // Track number of connections for this particle
                pulsePhase: Math.random() * Math.PI * 2 // Random starting phase for pulse effect
            });
        }
    }
    
    // Draw each particle
    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        
        // Update global animation values
        hueRotation = (hueRotation + 0.1) % 360; // Slowly rotate hues
        networkPulse = Math.sin(Date.now() * 0.001) * 0.5 + 0.5; // Pulsing effect (0 to 1)
        
        // First draw all connections (underneath particles)
        drawConnections();
        
        // Then draw particles on top
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Calculate particle color with hue rotation
            const hue = (p.baseHue + p.hueOffset + hueRotation) % 360;
            
            // Boost size slightly for particles with many connections
            const sizeBoost = Math.min(p.connections * 0.15, 1.5);
            
            // Create a pulse effect on radius
            const pulseEffect = Math.sin(p.pulsePhase + Date.now() * 0.002) * 0.3 + 1;
            const displayRadius = p.radius * (1 + sizeBoost) * pulseEffect * 1.5; // Increased base size by 50%
            
            // Draw glow effect
            ctx.beginPath();
            ctx.arc(p.x, p.y, displayRadius * 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 90%, 65%, 0.2)`;
            ctx.fill();
            
            // Draw main particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, displayRadius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 90%, 65%, 0.9)`; // Increased saturation, lightness and opacity
            ctx.fill();
        }
    }
    
    // Draw connections between particles
    function drawConnections() {
        // Reset connection counts
        particles.forEach(p => p.connections = 0);
        
        // Connection distance varies with screen size and pulse
        const baseDistance = width > 1200 ? 200 : (width > 768 ? 180 : 150);
        const connDistance = baseDistance * (0.8 + networkPulse * 0.4);
        
        // Draw network connections
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            let connectedCount = 0;
            
            for (let j = 0; j < particles.length; j++) {
                if (i === j) continue;
                
                const p2 = particles[j];
                const distance = Math.sqrt(
                    Math.pow(p.x - p2.x, 2) + 
                    Math.pow(p.y - p2.y, 2)
                );
                
                // Main connection mesh - connect nearby particles
                if (distance < connDistance) {
                    // Maximum connections per particle - increased from 5 to 8 for more connections
                    if (connectedCount > 8) continue;
                    connectedCount++;
                    
                    p.connections++;
                    p2.connections++;
                    
                    // Calculate connection color using hue rotation
                    const hue1 = (p.baseHue + p.hueOffset + hueRotation) % 360;
                    const hue2 = (p2.baseHue + p2.hueOffset + hueRotation) % 360;
                    const avgHue = (hue1 + hue2) / 2;
                    
                    // Opacity based on distance and network pulse - increased for better visibility
                    const opacity = (1 - distance / connDistance) * 0.7 * (0.8 + networkPulse * 0.5);
                    
                    // Draw glow effect for line
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `hsla(${avgHue}, 90%, 75%, ${opacity * 0.6})`;
                    ctx.lineWidth = 4 * (1 + networkPulse * 0.5);
                    ctx.stroke();
                    
                    // Draw main connection line
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `hsla(${avgHue}, 90%, 70%, ${opacity})`;
                    ctx.lineWidth = 1.8 * (1 + networkPulse * 0.5); // Increased line width
                    ctx.stroke();
                }
            }
        }
    }
    
    // Update particle positions
    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Slight attraction between neighboring particles
            if (p.connections > 0) {
                // Find center of connected particles
                let centerX = 0;
                let centerY = 0;
                let connCount = 0;
                
                for (let j = 0; j < particles.length; j++) {
                    if (i === j) continue;
                    
                    const p2 = particles[j];
                    const distance = Math.sqrt(
                        Math.pow(p.x - p2.x, 2) + 
                        Math.pow(p.y - p2.y, 2)
                    );
                    
                    if (distance < 200) {
                        centerX += p2.x;
                        centerY += p2.y;
                        connCount++;
                    }
                }
                
                if (connCount > 0) {
                    centerX /= connCount;
                    centerY /= connCount;
                    
                    // Slight attraction toward center
                    p.vx += (centerX - p.x) * 0.0001;
                    p.vy += (centerY - p.y) * 0.0001;
                }
            }
            
            // Movement
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges with slight dampening
            if (p.x < 0) {
                p.x = 0;
                p.vx = -p.vx * 0.9;
            } else if (p.x > width) {
                p.x = width;
                p.vx = -p.vx * 0.9;
            }
            
            if (p.y < 0) {
                p.y = 0;
                p.vy = -p.vy * 0.9;
            } else if (p.y > height) {
                p.y = height;
                p.vy = -p.vy * 0.9;
            }
            
            // Small random acceleration to create more organic movement
            p.vx += (Math.random() - 0.5) * 0.01;
            p.vy += (Math.random() - 0.5) * 0.01;
            
            // Speed limit to prevent particles from moving too fast
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 1) {
                p.vx = (p.vx / speed) * 1;
                p.vy = (p.vy / speed) * 1;
            }
        }
    }
    
    // Animation loop
    function animate() {
        drawParticles();
        updateParticles();
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        initCanvas();
    });
    
    // Start the animation
    initCanvas();
    animate();
});
