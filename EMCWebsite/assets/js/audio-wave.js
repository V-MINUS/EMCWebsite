/**
 * Electronic Music Council - Audio Wave Visualization
 * Creates an animated audio waveform visualization in the hero section
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('audio-wave');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let audioWave;
        
        // Set canvas dimensions to match container
        function resizeCanvas() {
            const container = canvas.parentElement;
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            
            // Reinitialize the audio wave with new dimensions
            if (audioWave) {
                audioWave.init();
            }
        }
        
        // Initialize resize and run on window resize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Audio Wave class
        class AudioWave {
            constructor(options) {
                this.canvas = options.canvas;
                this.ctx = options.ctx;
                this.waveColor = options.waveColor || 'rgba(110, 18, 232, 0.5)';
                this.waveColor2 = options.waveColor2 || 'rgba(33, 221, 184, 0.3)';
                this.lineWidth = options.lineWidth || 3;
                this.frequency = options.frequency || 0.02;
                this.amplitude = options.amplitude || 0.3;
                this.speed = options.speed || 0.1;
                this.points = [];
                this.tick = 0;
                
                this.init();
            }
            
            init() {
                // Create wave points based on canvas width
                const pointCount = Math.floor(this.canvas.width / 20);
                this.points = [];
                
                for (let i = 0; i <= pointCount; i++) {
                    const x = (this.canvas.width * i) / pointCount;
                    const y = this.canvas.height / 2;
                    this.points.push({ x, y });
                }
            }
            
            animate() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Draw first wave
                this.drawWave(this.waveColor, 1);
                
                // Draw second wave with slight offset for depth effect
                this.drawWave(this.waveColor2, 1.5, 10);
                
                // Update animation values
                this.tick += this.speed;
                
                // Request next frame
                requestAnimationFrame(this.animate.bind(this));
            }
            
            drawWave(color, amplitudeModifier = 1, offset = 0) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = this.lineWidth;
                
                // Update points Y position based on sine wave
                for (let i = 0; i < this.points.length; i++) {
                    const point = this.points[i];
                    // Calculate Y position with sine function
                    const y = this.canvas.height / 2 + 
                        Math.sin((i * this.frequency) + this.tick + offset) * 
                        (this.canvas.height * this.amplitude * amplitudeModifier);
                    
                    if (i === 0) {
                        this.ctx.moveTo(point.x, y);
                    } else {
                        this.ctx.lineTo(point.x, y);
                    }
                    
                    // Store the new y position
                    point.y = y;
                }
                
                // Complete the path and stroke it
                this.ctx.stroke();
                
                // Add subtle glow effect
                this.ctx.shadowColor = color;
                this.ctx.shadowBlur = 5;
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
            }
        }
        
        // Initialize the audio wave visualization
        audioWave = new AudioWave({
            canvas: canvas,
            ctx: ctx,
            waveColor: 'rgba(110, 18, 232, 0.5)',
            waveColor2: 'rgba(33, 221, 184, 0.3)',
            lineWidth: 2,
            frequency: 0.03,
            amplitude: 0.2,
            speed: 0.05
        });
        
        // Start the animation
        audioWave.animate();
    }
});
