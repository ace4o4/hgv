// 1. Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 2. Custom Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Follower easing loop
function renderCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    if(follower) {
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    }
    requestAnimationFrame(renderCursor);
}
if(follower) renderCursor();

// Cursor Hover States
document.querySelectorAll('.hover-trigger, .interactive-col, .hover-magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// 3. Magnetic Buttons
document.querySelectorAll('.hover-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// 4. Lottie Animations
// We use generic open source Lottie JSONs that fit the "tech" vibe
const lottieUrls = {
    ai: 'https://assets5.lottiefiles.com/packages/lf20_m6cuL6.json', // Server/Network
    web3: 'https://assets2.lottiefiles.com/packages/lf20_yzoqyyqf.json', // Abstract Blockchain
    fintech: 'https://assets9.lottiefiles.com/packages/lf20_vnikrcia.json' // Chart/Finance
};

if (typeof lottie !== 'undefined') {
    lottie.loadAnimation({
        container: document.getElementById('lottie-ai'),
        renderer: 'svg', loop: true, autoplay: true,
        path: 'https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json' // Alternate tech abstract
    });
    lottie.loadAnimation({
        container: document.getElementById('lottie-web3'),
        renderer: 'svg', loop: true, autoplay: true,
        path: 'https://assets1.lottiefiles.com/packages/lf20_1LhwiW.json' // Alternate polygon abstract
    });
    lottie.loadAnimation({
        container: document.getElementById('lottie-fintech'),
        renderer: 'svg', loop: true, autoplay: true,
        path: 'https://assets8.lottiefiles.com/packages/lf20_4kji20Y93P.json' // Alternate finance abstract
    });
}

// 5. Canvas Particle Engine (Constellation Background)
function initCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const particles = [];
    for(let i=0; i<80; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.5 + 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;

        // Bounding rect for canvas to get mouse coords relative to it
        const rect = canvas.getBoundingClientRect();
        const mouseLocalX = mouseX - rect.left;
        const mouseLocalY = mouseY - rect.top;

        particles.forEach(p => {
            // Move
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce
            if(p.x < 0 || p.x > width) p.vx *= -1;
            if(p.y < 0 || p.y > height) p.vy *= -1;

            // Mouse interaction
            const dx = p.x - mouseLocalX;
            const dy = p.y - mouseLocalY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 150) {
                p.x += dx * 0.01;
                p.y += dy * 0.01;
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw connections
        for(let i=0; i<particles.length; i++) {
            for(let j=i+1; j<particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = dx*dx + dy*dy;
                if(dist < 10000) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// Wait a bit for layout to settle before initing canvas
setTimeout(() => {
    initCanvas('particleCanvas');
    initCanvas('particleCanvasFooter');
}, 500);


// 6. Intersection Observers (Reveal & Stagger)
const observerOptions = { root: null, rootMargin: '0px', threshold: 0 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            if (entry.target.classList.contains('stagger-group')) {
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    setTimeout(() => { item.classList.add('active'); }, index * 100); 
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            let count = 0;
            const speed = target / 50; 
            
            const updateCount = () => {
                count += speed;
                if (count < target) {
                    entry.target.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.innerText = target;
                }
            };
            
            updateCount();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Word Splitter
function splitWordsPreserveHTML(element) {
    const html = element.innerHTML;
    const parts = html.split(/(<[^>]+>|\s+)/).filter(p => p.length > 0);
    
    element.innerHTML = '';
    let delayIndex = 0;
    
    parts.forEach(part => {
        if (part.trim() === '') {
            element.appendChild(document.createTextNode(' '));
        } else if (part.startsWith('<') && part.endsWith('>')) {
            const temp = document.createElement('div');
            temp.innerHTML = part;
            while(temp.firstChild) {
                element.appendChild(temp.firstChild);
            }
        } else {
            const span = document.createElement('span');
            span.classList.add('word');
            span.style.transitionDelay = `${delayIndex * 40}ms`;
            span.innerText = part;
            element.appendChild(span);
            delayIndex++;
        }
    });
}

// Hacker Scramble
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
document.querySelectorAll('.hover-magnetic').forEach(el => {
    const originalText = el.innerText.trim();
    if(!originalText) return;
    el.dataset.original = originalText;
    
    el.addEventListener('mouseenter', e => {
        let iterations = 0;
        clearInterval(el.dataset.intervalId);
        
        const textNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
        if(!textNode) return;
        
        el.dataset.intervalId = setInterval(() => {
            textNode.textContent = originalText.split("")
                .map((letter, index) => {
                    if(index < iterations) return originalText[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
            
            if(iterations >= originalText.length) {
                clearInterval(el.dataset.intervalId);
                textNode.textContent = originalText;
            }
            iterations += 1/3;
        }, 30);
    });
});

// Init safe
setTimeout(() => {
    document.querySelectorAll('.text-reveal').forEach(el => {
        splitWordsPreserveHTML(el);
        observer.observe(el);
    });
    document.querySelectorAll('.reveal-up, .stagger-group').forEach(el => observer.observe(el));
    document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));
    setTimeout(() => {
        document.querySelectorAll('.reveal-up:not(.active), .stagger-item:not(.active), .text-reveal:not(.active)').forEach(el => el.classList.add('active'));
    }, 2000);
}, 100);
