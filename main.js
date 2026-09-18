// WebGL Fluid Cloud Shader
const vertexShaderSource = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const fragmentShaderSource = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform float u_time;
    uniform vec2 u_resolution;

    float random (in vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    #define OCTAVES 6
    float fbm (in vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < OCTAVES; i++) {
            value += amplitude * noise(st);
            st = rot * st * 2.0;
            amplitude *= 0.5;
        }
        return value;
    }
    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        st.x *= u_resolution.x/u_resolution.y;

        vec2 q = vec2(0.);
        q.x = fbm( st + 0.01 * u_time);
        q.y = fbm( st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
        r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

        float f = fbm(st+r);

        // Light Theme Cloud Colors (Visible but airy, no black)
        vec3 baseColor = vec3(1.0, 1.0, 1.0); // Pure white
        vec3 darkCloudColor = vec3(0.82, 0.85, 0.88); // Soft cool gray to show depth
        vec3 orangeCloudColor = vec3(1.0, 0.85, 0.75); // Soft orange hint

        // Mix between white and light gray based on noise density
        vec3 color = mix(baseColor, darkCloudColor, clamp(f * 2.0, 0.0, 1.0));
        
        // Add subtle orange hints based on q
        color = mix(color, orangeCloudColor, clamp(length(q) * 0.8, 0.0, 1.0));
        
        // Output final color
        gl_FragColor = vec4(color, 1.0);
    }
`;

function initCloudShader() {
    const canvas = document.getElementById('cloudCanvas');
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    function compileShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    function render(time) {
        // Fix resolution
        const width = canvas.parentElement.offsetWidth;
        const height = canvas.parentElement.offsetHeight;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            gl.viewport(0, 0, width, height);
        }

        gl.uniform1f(timeLocation, time * 0.001);
        gl.uniform2f(resolutionLocation, width, height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
setTimeout(initCloudShader, 500);

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



// 5. Canvas Particle Engine (Constellation Background)
function initCanvas(canvasId, isDarkTheme = false) {
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
        
        // Use dark points on light backgrounds, light points on dark backgrounds
        if(isDarkTheme) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        }
        
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
    initCanvas('particleCanvas', false);
    initCanvas('particleCanvasFooter', false);
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
