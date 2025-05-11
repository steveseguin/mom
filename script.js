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
        "Wishing you the happiest Mother's Day! ✨"
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
                textAlign: "center"
            });
            surpriseP.classList.add('surprise-message');
            heroContentElement.appendChild(surpriseP);
        } else {
            surpriseP.style.opacity = "0"; // Fade out before changing text
        }
        
        setTimeout(() => {
            surpriseP.textContent = messages[clickCount % messages.length];
            // Trigger reflow to enable transition
            void surpriseP.offsetWidth;
            surpriseP.style.opacity = "1";
        }, surpriseP.style.opacity === "0" && clickCount > 0 ? 500 : 10); // Delay if fading out

        clickCount++;
    };

    if (heartElement) {
        heartElement.addEventListener('click', showNextMessage);
    }
};


const initApp = () => {
    const heart = document.querySelector('.heart');
    const heroContent = document.querySelector('.hero-content');

    if (heart && heroContent) {
        addSurpriseMessageOnClick(heart, heroContent);
    }
    // console.log("Mother's Day site initialized for Lorraine! luvu.mom");
};

document.addEventListener('DOMContentLoaded', initApp);
