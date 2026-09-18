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
            
            // If it's a stagger group, animate children with delays
            if (entry.target.classList.contains('stagger-group')) {
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 100); 
                });
            }
            
            // If it's a graph, stagger the dots
            if (entry.target.classList.contains('reveal-graph')) {
                const dots = entry.target.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.style.transitionDelay = `${index * 30}ms`;
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add a slight delay to ensure DOM layout is painted before observing
setTimeout(() => {
    document.querySelectorAll('.reveal-up, .reveal-graph, .stagger-group').forEach(element => {
        observer.observe(element);
    });
    
    // Failsafe: if an element is already somehow missed, force show it after 2 seconds
    setTimeout(() => {
        document.querySelectorAll('.reveal-up:not(.active), .stagger-item:not(.active), .reveal-graph:not(.active)').forEach(el => {
            el.classList.add('active');
        });
    }, 2000);
}, 100);
