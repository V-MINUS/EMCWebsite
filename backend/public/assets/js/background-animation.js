// Connected Dots Background Animation for Producer Competition Platform
// Inspired by the EMC website style with enhanced community network effect

document.addEventListener('DOMContentLoaded', function() {
    // Create the canvas element and append it to the background container
    const backgroundContainer = document.getElementById('background-animation');
    if (!backgroundContainer) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    backgroundContainer.appendChild(canvas);
    
    // Animation settings
    const particleCount = 100;
    const particles = [];
    
    // Animation state
    let hueRotation = 0;
    let networkPulse = 0;
    
    // Base colors (will be modified with hue rotation)
    const primaryHue = 275; // Brighter purple
    const secondaryHue = 160; // Brighter teal
    
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
        particles.length = 0;
        
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
    
    // Draw particles
    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        
        // First draw connections
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
        // Connection distance varies with screen size and pulse
        const baseDistance = width > 1200 ? 200 : (width > 768 ? 180 : 150);
        const connDistance = baseDistance * (0.8 + networkPulse * 0.4);
        
        // Reset connection count for each particle
        particles.forEach(p => p.connections = 0);
        
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
    
    // Update particle positions and animation state
    function updateParticles() {
        // Update global animation state
        hueRotation = (hueRotation + 0.1) % 360; // Slowly rotate hues
        networkPulse = (Math.sin(Date.now() * 0.0005) + 1) / 2; // Network pulse between 0 and 1
        
        // Add slight attraction between connected particles
        // This creates more natural clustering
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Apply attraction to connected particles
            for (let j = 0; j < particles.length; j++) {
                if (i === j) continue;
                
                const p2 = particles[j];
                const distance = Math.sqrt(
                    Math.pow(p.x - p2.x, 2) + 
                    Math.pow(p.y - p2.y, 2)
                );
                
                // Very slight attraction/repulsion forces
                if (distance < 200 && distance > 10) {
                    const force = 0.00005;
                    const attraction = p.connections > 3 ? force : -force * 0.5;
                    
                    const angle = Math.atan2(p2.y - p.y, p2.x - p.x);
                    p.vx += Math.cos(angle) * attraction;
                    p.vy += Math.sin(angle) * attraction;
                }
            }
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Slightly randomize velocity for organic movement
            p.vx += (Math.random() - 0.5) * 0.02;
            p.vy += (Math.random() - 0.5) * 0.02;
            
            // Dampen velocity to prevent excessive speed
            p.vx *= 0.99;
            p.vy *= 0.99;
            
            // Contain particles within bounds (with smooth bounce)
            if (p.x < 0) {
                p.x = 0;
                p.vx *= -0.5;
            } else if (p.x > width) {
                p.x = width;
                p.vx *= -0.5;
            }
            
            if (p.y < 0) {
                p.y = 0;
                p.vy *= -0.5;
            } else if (p.y > height) {
                p.y = height;
                p.vy *= -0.5;
            }
            
            // Update pulse phase
            p.pulsePhase += 0.01;
        }
    }
    
    // Animation loop
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    // Initialize
    initCanvas();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        initCanvas();
    });
});
