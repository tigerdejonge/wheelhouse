// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initTabs();
    initAnimations();
    initCounters();
    initFormHandling();
    initParallax();
    initROICalculator();
    initDemoSection();
    init3DEffects();
    initAdvancedScrollAnimations();
    initFloatingMenu();
    initScrollProgress();
    initMagneticEffects();
    initIntersectionAnimations();
    initTextRevealAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Get target section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects and back to top button
function initScrollEffects() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Tab functionality for services section
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add a subtle animation effect
            const activePane = document.getElementById(targetTab);
            activePane.style.opacity = '0';
            activePane.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activePane.style.opacity = '1';
                activePane.style.transform = 'translateY(0)';
                activePane.style.transition = 'all 0.3s ease';
            }, 50);
        });
    });
}

// Scroll-triggered animations
function initAnimations() {
    const animateElements = document.querySelectorAll('.animate');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Animated counters for statistics
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number (add % for satisfaction rate)
            const text = element.closest('.stat-item').querySelector('.stat-label').textContent;
            const suffix = text.includes('Satisfaction') ? '%' : '+';
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formElements = contactForm.querySelectorAll('input, textarea');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Disable form while submitting
            formElements.forEach(el => el.disabled = true);
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Re-enable form
                formElements.forEach(el => el.disabled = false);
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }, 2000);
        });
    }
}

// Parallax effects
function initParallax() {
    const particles = document.querySelectorAll('.particle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.3;
            particle.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// ROI Calculator functionality
function initROICalculator() {
    const sliders = document.querySelectorAll('.range-slider');
    const employeeSlider = document.getElementById('employeeCount');
    const rateSlider = document.getElementById('hourlyRate');
    const hoursSlider = document.getElementById('repetitiveHours');
    const efficiencySlider = document.getElementById('efficiency');
    
    sliders.forEach(slider => {
        const valueDisplay = document.getElementById(slider.id.replace('Count', 'Value').replace('Rate', 'Value').replace('Hours', 'Value').replace('efficiency', 'efficiencyValue'));
        
        slider.addEventListener('input', () => {
            valueDisplay.textContent = slider.value + (slider.id === 'efficiency' ? '%' : '');
            calculateROI();
            
            // Add visual feedback
            slider.style.background = `linear-gradient(to right, #00c6ff 0%, #00c6ff ${(slider.value - slider.min) / (slider.max - slider.min) * 100}%, rgba(255,255,255,0.3) ${(slider.value - slider.min) / (slider.max - slider.min) * 100}%, rgba(255,255,255,0.3) 100%)`;
        });
        
        // Initialize slider backgrounds
        slider.dispatchEvent(new Event('input'));
    });
    
    function calculateROI() {
        const employees = parseInt(employeeSlider.value);
        const hourlyRate = parseInt(rateSlider.value);
        const weeklyHours = parseInt(hoursSlider.value);
        const efficiency = parseInt(efficiencySlider.value) / 100;
        
        // Calculate annual savings
        const weeklyTimeAutomated = weeklyHours * efficiency;
        const weeklySavings = weeklyTimeAutomated * hourlyRate;
        const annualSavings = weeklySavings * 52 * employees;
        
        // Calculate time saved
        const annualTimeSaved = weeklyTimeAutomated * 52 * employees;
        
        // Calculate ROI (assuming implementation cost of $50k)
        const implementationCost = 50000;
        const roi = ((annualSavings - implementationCost) / implementationCost) * 100;
        
        // Update displays with animation
        animateValue('annualSavings', 0, annualSavings, 1000, (val) => `$${val.toLocaleString()}`);
        animateValue('timeSaved', 0, annualTimeSaved, 1000, (val) => val.toLocaleString());
        animateValue('roiPercentage', 0, Math.max(roi, 0), 1000, (val) => `${Math.round(val)}%`);
    }
    
    function animateValue(elementId, start, end, duration, formatter = (val) => val) {
        const element = document.getElementById(elementId);
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (end - start) * easeOutQuart;
            
            element.textContent = formatter(current);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Initial calculation
    calculateROI();
}

// Demo section functionality
function initDemoSection() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanes = document.querySelectorAll('.demo-pane');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetDemo = tab.getAttribute('data-demo');
            
            // Remove active class from all tabs and panes
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            tab.classList.add('active');
            document.getElementById(targetDemo + '-demo').classList.add('active');
        });
    });
    
    // Initialize chatbot
    initChatbot();
    initVisionDemo();
    initAnalysisDemo();
}

// Chatbot functionality
function initChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    const responses = [
        "That's a great question! Our AI solutions can be customized to fit your specific industry needs.",
        "Cloud migration typically takes 2-6 months depending on your infrastructure complexity. We provide full support throughout the process.",
        "Our AI models achieve 95%+ accuracy across various use cases. We continuously train and optimize for your specific data.",
        "ROI is typically seen within 3-6 months of implementation. Many clients see 300%+ ROI in the first year.",
        "We support all major cloud platforms: AWS, Azure, and Google Cloud. We'll recommend the best fit for your needs.",
        "Security is our top priority. We implement enterprise-grade encryption and compliance standards.",
        "Our team includes PhD-level AI specialists and certified cloud architects with 10+ years of experience."
    ];
    
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = content;
        
        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add typing animation for bot messages
        if (!isUser) {
            messageText.style.opacity = '0';
            setTimeout(() => {
                messageText.style.opacity = '1';
                messageText.style.transition = 'opacity 0.3s ease';
            }, 500);
        }
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, true);
        chatInput.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <p>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </p>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot response delay
        setTimeout(() => {
            chatMessages.removeChild(typingDiv);
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse);
        }, 1500);
    }
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Vision demo functionality
function initVisionDemo() {
    const uploadArea = document.getElementById('imageUpload');
    const analysisResults = document.getElementById('analysisResults');
    
    uploadArea.addEventListener('click', () => {
        // Simulate image upload and analysis
        uploadArea.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <h4>Analyzing Image...</h4>
            <p>Please wait while our AI processes your image</p>
        `;
        
        setTimeout(() => {
            // Show fake analysis results
            analysisResults.style.display = 'block';
            
            const objectCount = Math.floor(Math.random() * 15) + 3;
            const confidence = Math.floor(Math.random() * 20) + 80;
            const processingTime = Math.floor(Math.random() * 200) + 50;
            
            animateValue('objectCount', 0, objectCount, 1000, (val) => Math.floor(val));
            animateValue('confidenceLevel', 0, confidence, 1000, (val) => `${Math.floor(val)}%`);
            animateValue('processingTime', 0, processingTime, 1000, (val) => `${Math.floor(val)}ms`);
            
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: #4ade80;"></i>
                <h4>Analysis Complete!</h4>
                <p>Click to analyze another image</p>
                <button class="upload-btn">Analyze Another Image</button>
            `;
        }, 2000);
    });
}

// Analysis demo functionality
function initAnalysisDemo() {
    const chartButtons = document.querySelectorAll('.chart-btn');
    const canvas = document.getElementById('demoChart');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let currentChart = 'revenue';
    
    const chartData = {
        revenue: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [45000, 52000, 48000, 61000, 55000, 67000],
            color: '#0066ff',
            label: 'Revenue Forecast'
        },
        efficiency: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            data: [65, 72, 78, 85, 89, 94],
            color: '#00c6ff',
            label: 'Efficiency Gains (%)'
        },
        costs: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
            data: [25000, 22000, 19000, 16000, 14000, 12000],
            color: '#ff6b6b',
            label: 'Cost Reduction'
        }
    };
    
    function drawChart(type) {
        const data = chartData[type];
        const width = canvas.width;
        const height = canvas.height;
        const padding = 60;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up chart area
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        // Find min and max values
        const maxValue = Math.max(...data.data);
        const minValue = Math.min(...data.data);
        const valueRange = maxValue - minValue;
        
        // Draw grid lines
        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = padding + (i / 5) * chartHeight;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Draw data points and line
        ctx.strokeStyle = data.color;
        ctx.fillStyle = data.color;
        ctx.lineWidth = 3;
        
        const points = data.data.map((value, index) => ({
            x: padding + (index / (data.data.length - 1)) * chartWidth,
            y: padding + chartHeight - ((value - minValue) / valueRange) * chartHeight
        }));
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Draw points
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        data.labels.forEach((label, index) => {
            const x = padding + (index / (data.labels.length - 1)) * chartWidth;
            ctx.fillText(label, x, height - padding + 20);
        });
    }
    
    chartButtons.forEach(button => {
        button.addEventListener('click', () => {
            chartButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentChart = button.getAttribute('data-chart');
            drawChart(currentChart);
        });
    });
    
    // Initial chart
    drawChart(currentChart);
}

// 3D Card Effects
function init3DEffects() {
    const cards = document.querySelectorAll('.service-card, .solution-card, .case-study-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Advanced scroll animations
function initAdvancedScrollAnimations() {
    // Parallax scrolling for hero particles
    const particles = document.querySelectorAll('.particle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = rate * speed;
            const rotation = scrolled * 0.1 * (index + 1);
            
            particle.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
    });
    
    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.cta-button');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Floating Action Menu
function initFloatingMenu() {
    const floatingMenu = document.getElementById('floatingMenu');
    const floatingMainBtn = document.getElementById('floatingMainBtn');
    
    floatingMainBtn.addEventListener('click', () => {
        floatingMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!floatingMenu.contains(e.target)) {
            floatingMenu.classList.remove('active');
        }
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarFill.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
}

// Enhanced Magnetic Effects
function initMagneticEffects() {
    const magneticElements = document.querySelectorAll('.cta-button, .floating-main-btn');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('magnetic-button');
        });
        
        element.addEventListener('mousemove', (e) => {
            if (!element.classList.contains('magnetic-button')) return;
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                element.style.transform = `translate(${x * force * 0.3}px, ${y * force * 0.3}px) scale(${1 + force * 0.1})`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0) scale(1)';
            element.classList.remove('magnetic-button');
        });
    });
}

// Intersection Observer for enhanced animations
function initIntersectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add staggered animation for grid items
                if (element.classList.contains('service-grid') || 
                    element.classList.contains('solutions-grid') ||
                    element.classList.contains('case-studies-grid')) {
                    
                    const items = element.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Add pulse effect for metrics
                if (element.classList.contains('stat-number') || 
                    element.classList.contains('metric-value')) {
                    setTimeout(() => {
                        element.style.animation = 'pulse 0.6s ease';
                    }, 500);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe grid containers and metrics
    const elementsToObserve = document.querySelectorAll(
        '.service-grid, .solutions-grid, .case-studies-grid, .stat-number, .metric-value'
    );
    
    elementsToObserve.forEach(element => {
        // Prepare grid items for animation
        if (element.classList.contains('service-grid') || 
            element.classList.contains('solutions-grid') ||
            element.classList.contains('case-studies-grid')) {
            
            Array.from(element.children).forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }
        
        observer.observe(element);
    });
}

// Text reveal animation
function initTextRevealAnimations() {
    const textElements = document.querySelectorAll('.section-title, .hero-title');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        // Create spans for each word
        text.split(' ').forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word + ' ';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.opacity = '0';
            wordSpan.style.transform = 'translateY(20px)';
            wordSpan.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            element.appendChild(wordSpan);
        });
    });
    
    // Animate text when in view
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const words = entry.target.querySelectorAll('span');
                words.forEach(word => {
                    word.style.opacity = '1';
                    word.style.transform = 'translateY(0)';
                });
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(element => textObserver.observe(element));
}

// Add CSS for additional animations
const additionalStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .tech-item {
        opacity: 0;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#0066ff'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Smooth hover effects for cards
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.service-card, .solution-card, .tech-item')) {
        const card = e.target.closest('.service-card, .solution-card, .tech-item');
        card.style.transform = 'translateY(-10px) scale(1.02)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.service-card, .solution-card, .tech-item')) {
        const card = e.target.closest('.service-card, .solution-card, .tech-item');
        card.style.transform = 'translateY(0) scale(1)';
    }
});

// Add typing effect to hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let index = 0;
        const typeText = () => {
            if (index < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeText, 1000);
    }
}

// Initialize additional effects
setTimeout(() => {
    // Add subtle animations to tech stack items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        item.style.opacity = '0';
    });
    
    // Add floating animation to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.style.animation = 'float 3s ease-in-out infinite';
    });
}, 500);

// Add typing animation CSS
const typingCSS = `
    .typing-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--gray-color);
        margin: 0 2px;
        animation: typing 1.5s infinite;
    }
    
    .typing-dot:nth-child(1) { animation-delay: 0s; }
    .typing-dot:nth-child(2) { animation-delay: 0.3s; }
    .typing-dot:nth-child(3) { animation-delay: 0.6s; }
    
    @keyframes typing {
        0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
        30% { opacity: 1; transform: scale(1); }
    }
`;

// Inject typing animation CSS
const typingStyleSheet = document.createElement('style');
typingStyleSheet.textContent = typingCSS;
document.head.appendChild(typingStyleSheet);

// Add pulse animation CSS
const pulseCSS = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;

// Initialize all new features
document.addEventListener('DOMContentLoaded', () => {
    // ...existing initialization code...
    initFloatingMenu();
    initScrollProgress();
    initMagneticEffects();
    initIntersectionAnimations();
    initTextRevealAnimations();
    
    // Add pulse animation
    const pulseStyleSheet = document.createElement('style');
    pulseStyleSheet.textContent = pulseCSS;
    document.head.appendChild(pulseStyleSheet);
});