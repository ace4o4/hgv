// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // We handle the base parallax offset here. 
    // The CSS animation handles the continuous floating.
    document.querySelectorAll('.parallax-shape').forEach(shape => {
        let speed = 0.2;
        if (shape.classList.contains('p-2')) speed = 0.5;
        if (shape.classList.contains('p-3')) speed = 0.1;
        
        // We use top instead of transform because transform is heavily used by the CSS animation.
        // But to keep it performant, we can use margin-top or translate. 
        // Actually, since CSS animation uses transform, let's just use margin-top for the scroll parallax to avoid clashing.
        shape.style.marginTop = `${scrollY * speed}px`;
    });
});

// Intersection Observer for Reveal Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Stagger Groups
            if (entry.target.classList.contains('stagger-group')) {
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 100); 
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Counter Animation Observer
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            let count = 0;
            const speed = target / 50; // frames
            
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


// Initialize Observers safely
setTimeout(() => {
    // 1. Text Reveal Splitter
    document.querySelectorAll('.text-reveal').forEach(el => {
        const words = el.innerText.split(' ');
        el.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.classList.add('word');
            span.style.transitionDelay = `${index * 50}ms`;
            span.innerText = word + ' ';
            el.appendChild(span);
        });
        observer.observe(el);
    });

    // 2. Regular Reveals
    document.querySelectorAll('.reveal-up, .stagger-group').forEach(element => {
        observer.observe(element);
    });
    
    // 3. Counters
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Failsafe
    setTimeout(() => {
        document.querySelectorAll('.reveal-up:not(.active), .stagger-item:not(.active), .text-reveal:not(.active)').forEach(el => {
            el.classList.add('active');
        });
    }, 2000);
}, 100);
