/**
 * Electronic Music Council - Interactive Particles Background
 * Creates an animated network of connected dots that react to mouse movement
 */

class ParticlesNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = {
            x: null,
            y: null,
            radius: 200
        };
        
        this.resizeCanvas();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 9000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            // Increased size range for more visible particles
            const size = Math.random() * 3 + 2;
            const x = Math.random() * (this.canvas.width - size * 2);
            const y = Math.random() * (this.canvas.height - size * 2);
            const directionX = Math.random() * 1 - 0.5;
            const directionY = Math.random() * 1 - 0.5;
            // Brighter particles
            const color = 'rgba(220, 220, 255, 0.9)';
            
            this.particles.push(new Particle(x, y, directionX, directionY, size, color, this));
        }
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
        
        document.addEventListener('mousemove', (event) => {
            this.mousePosition.x = event.x;
            this.mousePosition.y = event.y;
        });
        
        document.addEventListener('mouseout', () => {
            this.mousePosition.x = null;
            this.mousePosition.y = null;
        });
    }
    
    connectParticles() {
        // Enhanced particle connections with gradient lines
        const maxDistance = this.canvas.width / 6; // Increased connection distance
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Opacity based on distance
                    const opacity = 1 - (distance / maxDistance);
                    
                    // Create gradient for lines
                    const gradient = this.ctx.createLinearGradient(
                        this.particles[i].x, this.particles[i].y,
                        this.particles[j].x, this.particles[j].y
                    );
                    
                    // Purple gradient lines
                    gradient.addColorStop(0, `rgba(160, 140, 255, ${opacity * 0.7})`);
                    gradient.addColorStop(1, `rgba(110, 18, 232, ${opacity * 0.7})`);
                    
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 0.8; // Thicker lines
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // First draw connections between particles
        this.connectParticles();
        
        // Then draw and update particles
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(x, y, directionX, directionY, size, color, network) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.originalSize = size;
        this.color = color;
        this.network = network;
    }
    
    draw() {
        const ctx = this.network.ctx;
        
        // Reset shadow effect before drawing
        ctx.shadowBlur = 0;
        
        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8; // Enhanced glow
        ctx.shadowColor = 'rgba(110, 18, 232, 0.6)';
        ctx.fill();
    }
    
    update() {
        // Boundary check
        if (this.x > this.network.canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > this.network.canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        // Move the particle
        this.x += this.directionX;
        this.y += this.directionY;
        
        // Mouse interaction
        if (
            this.network.mousePosition.x !== null && 
            this.network.mousePosition.y !== null
        ) {
            const dx = this.x - this.network.mousePosition.x;
            const dy = this.y - this.network.mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.network.mousePosition.radius) {
                // Calculate size increase based on how close mouse is to particle
                const sizeIncrease = (1 - (distance / this.network.mousePosition.radius)) * 6;
                this.size = this.originalSize + sizeIncrease;
            } else {
                // Gradually return to original size
                if (this.size > this.originalSize) {
                    this.size -= 0.1;
                }
            }
        } else {
            // Return to original size when mouse is out
            if (this.size > this.originalSize) {
                this.size -= 0.1;
            }
        }
        
        this.draw();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create background canvas element
    const backgroundCanvas = document.createElement('canvas');
    backgroundCanvas.id = 'particles-background';
    backgroundCanvas.style.position = 'fixed';
    backgroundCanvas.style.top = '0';
    backgroundCanvas.style.left = '0';
    backgroundCanvas.style.width = '100%';
    backgroundCanvas.style.height = '100%';
    backgroundCanvas.style.zIndex = '-1';
    backgroundCanvas.style.pointerEvents = 'none'; // Allow interaction with elements behind canvas
    document.body.insertBefore(backgroundCanvas, document.body.firstChild);
    
    // Initialize the particles network
    new ParticlesNetwork('particles-background');
});
