// script.js

const createStyledElement = (tag, text, styles = {}) => {
    const element = document.createElement(tag);
    element.textContent = text;
    Object.entries(styles).forEach(([key, value]) => {
        element.style[key] = value;
    });
    return element;
};

const addSurpriseMessageOnClick = (heartElement, heroContentElement) => {
    let clickCount = 0;
    const messages = [
        "You're the heart of our family, Mom! ❤️",
        "Thank you for absolutely everything! 🥰",
        "Wishing you the happiest Mother's Day! ✨",
        "So much love for you today and always! 💖",
        "You make the world a brighter place! 💐"
    ];

    const showNextMessage = () => {
        let surpriseP = heroContentElement.querySelector('.surprise-message');
        
        if (!surpriseP) {
            surpriseP = createStyledElement('p', messages[clickCount % messages.length], {
                marginTop: "15px",
                fontSize: "1.1em",
                color: "#d1426b",
                fontWeight: "bold",
                opacity: "0",
                transition: "opacity 0.5s ease-in-out",
                textAlign: "center" // Ensure message is centered
            });
            surpriseP.classList.add('surprise-message');
            heroContentElement.appendChild(surpriseP);
        } else {
            surpriseP.style.opacity = "0"; // Fade out before changing text
        }
        
        setTimeout(() => {
            surpriseP.textContent = messages[clickCount % messages.length];
            void surpriseP.offsetWidth; // Trigger reflow
            surpriseP.style.opacity = "1";
        }, surpriseP.style.opacity === "0" && clickCount > 0 ? 500 : 10);

        clickCount++;
    };

    if (heartElement) {
        heartElement.addEventListener('click', showNextMessage);
    }
};

// Add this function: Animate main heading letters
const animateMainHeading = () => {
    const heading = document.querySelector('header h1');
    if (!heading) return;

    const text = heading.textContent;
    heading.textContent = ''; // Clear original text to replace with spans

    text.split('').forEach((char, index) => {
        const span = createStyledElement('span', char === ' ' ? '\u00A0' : char, {
            opacity: '0',
            display: 'inline-block',
            transform: 'translateY(-20px)',
            // Start animation after H1's own slideInDown (0.8s)
            animation: `letterFadeIn 0.5s ease-out ${0.8 + index * 0.06}s forwards`
        });
        heading.appendChild(span);
    });
};

// Add these functions: For falling petals
const createPetal = () => {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 10 + 6; // 6px to 16px
    petal.style.width = `${size}px`;
    petal.style.height = `${size * (Math.random() * 0.4 + 1)}px`; // Vary aspect ratio slightly
    petal.style.left = `${Math.random() * 100}vw`;
    
    const animationDuration = Math.random() * 7 + 8; // 8 to 15 seconds to fall
    petal.style.animationDuration = `${animationDuration}s`;
    petal.style.animationDelay = `${Math.random() * 10}s`; // Stagger start times more

    // Custom property for horizontal sway, varying per petal
    petal.style.setProperty('--sway', (Math.random() - 0.5) * 25); // Sway between -12.5vw and +12.5vw

    const type = Math.floor(Math.random() * 3) + 1;
    if (type === 2) petal.classList.add('type2');
    else if (type === 3) petal.classList.add('type3');
    
    // Initial rotation to vary appearance
    petal.style.transform = `rotate(${Math.random() * 90 - 45}deg)`;


    return petal;
};

const initPetals = (numPetals = 35) => { // Increased default number slightly
    const container = document.getElementById('petals-container');
    if (!container) return;
    // Clear any existing petals if re-initializing (not strictly needed on first load)
    // container.innerHTML = ''; 
    Array.from({ length: numPetals }).forEach(() => {
        container.appendChild(createPetal());
    });
};
// End of petal functions

const initApp = () => {
    const heart = document.querySelector('.heart');
    const heroContent = document.querySelector('.hero-content');

    if (heart && heroContent) {
        addSurpriseMessageOnClick(heart, heroContent);
    }

    animateMainHeading(); // Call the heading animation
    initPetals();         // Initialize falling petals

    // console.log("Mother's Day site (enhanced) initialized for Lorraine! luvu.mom");
};

document.addEventListener('DOMContentLoaded', initApp);
