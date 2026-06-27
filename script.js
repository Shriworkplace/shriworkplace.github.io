        // Particle System Implementation (Made With Gemini)My will to use this type 
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width, height;
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;

        const mouse = { x: undefined, y: undefined, radius: 250, isActive: false };
        const particleColors = ['#bcc7de', '#dde3eb', '#ffffff', '#e2e8f0', '#f8fafc'];

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2.5 + 1.2;
                this.baseXVelocity = (Math.random() - 0.5) * 0.25;
                this.baseYVelocity = (Math.random() - 0.5) * 0.25;
                this.vx = this.baseXVelocity;
                this.vy = this.baseYVelocity;
                this.baseOpacity = Math.random() * 0.25 + 0.12;
                this.opacity = this.baseOpacity;
                this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
                this.glowFactor = 1;
                this.repelFactorX = 0;
                this.repelFactorY = 0;
            }
            update() {
                this.vy += scrollVelocity * 0.05;
                if (mouse.isActive) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.repelFactorX = (dx / distance) * force * 2.2;
                        this.repelFactorY = (dy / distance) * force * 2.2;
                        this.glowFactor = 1 + force * 4.5;
                        this.opacity = Math.min(0.95, this.baseOpacity + force * 0.65);
                    } else {
                        this.repelFactorX *= 0.88;
                        this.repelFactorY *= 0.88;
                        this.glowFactor = Math.max(1, this.glowFactor * 0.94);
                        this.opacity = Math.max(this.baseOpacity, this.opacity * 0.94);
                    }
                } else {
                    this.repelFactorX *= 0.88;
                    this.repelFactorY *= 0.88;
                    this.glowFactor = Math.max(1, this.glowFactor * 0.94);
                    this.opacity = Math.max(this.baseOpacity, this.opacity * 0.94);
                }
                this.x += this.vx - this.repelFactorX;
                this.y += this.vy - this.repelFactorY;
                this.vx += (this.baseXVelocity - this.vx) * 0.03;
                this.vy += (this.baseYVelocity - this.vy) * 0.03;
                if (this.x < -20) this.x = width + 20;
                if (this.x > width + 20) this.x = -20;
                if (this.y < -20) this.y = height + 20;
                if (this.y > height + 20) this.y = -20;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.shadowBlur = this.size * 10 * this.glowFactor;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                const drawSize = this.size * (1 + (this.glowFactor - 1) * 0.4);
                ctx.beginPath();
                ctx.arc(this.x, this.y, drawSize / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        function initParticles() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            const count = Math.floor((width * height) / 5000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            const currentScrollY = window.scrollY;
            scrollVelocity = (currentScrollY - lastScrollY) * 0.4;
            lastScrollY = currentScrollY;
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animate);
        }

        // Scroll Reveal & Parallax Enhancement
        const setupScrollInteractions = () => {
            const revealOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -80px 0px'
            };

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, revealOptions);

            document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

            // Focus-based scaling for project cards
            const focusOptions = {
                threshold: 0.5,
                rootMargin: '0px'
            };

            const focusObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const card = entry.target.querySelector('.project-card-container');
                    if (card) {
                        if (entry.isIntersecting) {
                            card.classList.add('focused');
                        } else {
                            card.classList.remove('focused');
                        }
                    }
                });
            }, focusOptions);

            document.querySelectorAll('.md\\:col-span-7, .md\\:col-span-5, .md\\:col-span-4, .md\\:col-span-8').forEach(el => {
                focusObserver.observe(el);
            });
        };

        // Magnetic Button Effect
        const setupMagneticButtons = () => {
            const magneticButtons = document.querySelectorAll('.magnetic-button');

            magneticButtons.forEach(btn => {
                if (!isMobile()) {
                    btn.addEventListener('mousemove', (e) => {
                        const rect = btn.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;

                        // Button follow intensity
                        const intensity = 0.35;
                        btn.style.transform = `translate(${x * intensity}px, ${y * intensity}px) scale(1.05)`;

                        // Child element (text/icon) offset for extra depth
                        const text = btn.querySelector('span, font, div');
                        if (text) text.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                    });

                    btn.addEventListener('mouseleave', () => {
                        btn.style.transform = 'translate(0px, 0px) scale(1)';
                        const text = btn.querySelector('span, font, div');
                        if (text) text.style.transform = 'translate(0px, 0px)';
                    });
                } else {
                    // Mobile touch feedback
                    btn.addEventListener('touchstart', (e) => {
                        btn.style.transform = 'scale(0.95)';
                        btn.style.opacity = '0.8';
                    });

                    btn.addEventListener('touchend', () => {
                        btn.style.transform = 'scale(1)';
                        btn.style.opacity = '1';
                    });
                }
            });
        };

        // Entrance Animations
        const initEntrance = () => {
            // Staggered nav links
            setTimeout(() => {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.add('loaded');
                });
            }, 300);
        };

        // Mobile Detection
        const isMobile = () => {
            return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        };

        // Events
        window.addEventListener('mousemove', (e) => {
            if (!isMobile()) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                mouse.isActive = true;
            }
        });
        window.addEventListener('mouseleave', () => { mouse.isActive = false; });
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
                mouse.isActive = true;
            }
        });
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });
        window.addEventListener('touchend', () => { mouse.isActive = false; });
        window.addEventListener('resize', initParticles);

        // Initializers
        initParticles();
        animate();
        setupMagneticButtons();
        
        // Wait for preloader to complete before firing entrance animations
        window.addEventListener('preloaderComplete', () => {
            setupScrollInteractions();
            initEntrance();
        });
        
        // Fallback if no preloader exists
        if (!document.getElementById('preloader')) {
            setupScrollInteractions();
            initEntrance();
        }

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Active Navigation Link Based on Scroll Position
        const setupActiveNavigation = () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            window.addEventListener('scroll', () => {
                let currentSection = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    const sectionHeight = section.offsetHeight;
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('nav-link-active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('nav-link-active');
                    }
                });
            });
        };

        // Project Card Interaction
        const setupProjectCardInteraction = () => {
            const projectCards = document.querySelectorAll('.project-card-container');

            projectCards.forEach((card, index) => {
                // Click/Tap pulse effect
                const triggerPulse = () => {
                    card.style.animation = 'pulse 0.6s ease-out';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 600);
                };

                card.addEventListener('click', triggerPulse);

                if (!isMobile()) {
                    // Desktop hover effects
                    card.addEventListener('mouseenter', () => {
                        card.style.boxShadow = '0 50px 100px -20px rgba(255, 255, 255, 0.2)';
                    });

                    card.addEventListener('mouseleave', () => {
                        card.style.boxShadow = '';
                    });
                } else {
                    // Mobile touch feedback
                    card.addEventListener('touchstart', () => {
                        card.style.boxShadow = '0 50px 100px -20px rgba(255, 255, 255, 0.2)';
                        card.style.transform = 'scale(0.98)';
                    });

                    card.addEventListener('touchend', () => {
                        card.style.boxShadow = '';
                        card.style.transform = '';
                        triggerPulse();
                    });
                }
            });
        };

        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Setup all interactions
        setupActiveNavigation();
        setupProjectCardInteraction();

        // Mobile-specific optimizations
        if (isMobile()) {
            // Disable particle system on very old mobile devices for better performance
            if (window.innerWidth < 375) {
                particles = [];
            }

            // Add passive event listeners for better scroll performance
            window.addEventListener('touchstart', () => { }, { passive: true });
            window.addEventListener('touchmove', () => { }, { passive: true });

            // Optimize reveal-on-scroll for mobile
            const mobileRevealOptions = {
                threshold: 0.05,
                rootMargin: '0px 0px -40px 0px'
            };

            const mobileRevealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, mobileRevealOptions);

            document.querySelectorAll('.reveal-on-scroll').forEach(el => {
                mobileRevealObserver.observe(el);
            });

            // Add haptic feedback for supported devices
            const addHapticFeedback = (element) => {
                if (navigator.vibrate) {
                    element.addEventListener('click', () => {
                        navigator.vibrate(10);
                    });
                    element.addEventListener('touchstart', () => {
                        navigator.vibrate(5);
                    });
                }
            };

            document.querySelectorAll('.magnetic-button, .project-card-container').forEach(el => {
                addHapticFeedback(el);
            });
        }

        // Email Obfuscation - prevents bots from harvesting the raw email address
        (function() {
            const emailContainer = document.getElementById('email-contact');
            if (emailContainer) {
                const user = 'shrived.work';
                const domain = 'gmail.com';
                const email = user + '@' + domain;
                const link = document.createElement('a');
                link.href = 'mail' + 'to:' + email;
                link.textContent = email;
                link.className = 'hover:text-primary transition-colors duration-300';
                emailContainer.appendChild(link);
            }
        })();
