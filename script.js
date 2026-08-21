/* =========================================================
   ADITYA GITE PORTFOLIO - COMPLETE SCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('#nav');

menuBtn?.addEventListener('click', () => {
    nav?.classList.toggle('open');
});

document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav?.classList.remove('open');
    });
});


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', event => {

        const targetId = link.getAttribute('href');

        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

            }

        });

    },
    {
        threshold: 0.08
    }
);


document
    .querySelectorAll(
        '.hero-copy, .hero-visual, .section .content, .contact-inner'
    )
    .forEach(element => {

        element.classList.add('reveal');

        revealObserver.observe(element);

    });


/* =========================================================
   TYPING EFFECT
   ========================================================= */

const typingText = document.getElementById('typingText');

const roles = [
    'AI & Data Science Student',
    'Machine Learning Enthusiast',
    'Data Analytics Learner',
    'Python Developer'
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeRole() {

    if (!typingText) return;

    const currentRole = roles[roleIndex];

    typingText.textContent =
        currentRole.slice(0, characterIndex);


    /* Typing */

    if (!deleting && characterIndex < currentRole.length) {

        characterIndex++;

        setTimeout(typeRole, 80);

        return;
    }


    /* Wait before deleting */

    if (!deleting && characterIndex === currentRole.length) {

        deleting = true;

        setTimeout(typeRole, 1400);

        return;
    }


    /* Deleting */

    if (deleting && characterIndex > 0) {

        characterIndex--;

        setTimeout(typeRole, 42);

        return;
    }


    /* Next role */

    if (deleting && characterIndex === 0) {

        deleting = false;

        roleIndex =
            (roleIndex + 1) % roles.length;

        setTimeout(typeRole, 300);

    }

}

typeRole();


/* =========================================================
   SCROLL PROGRESS BAR
   ========================================================= */

const scrollProgress =
    document.getElementById('scrollProgress');


function updateScrollProgress() {

    const documentHeight =
        document.documentElement.scrollHeight;

    const viewportHeight =
        window.innerHeight;

    const scrollableHeight =
        documentHeight - viewportHeight;


    let percentage = 0;

    if (scrollableHeight > 0) {

        percentage =
            (window.scrollY / scrollableHeight) * 100;

    }


    if (scrollProgress) {

        scrollProgress.style.width =
            `${percentage}%`;

    }

}


window.addEventListener(
    'scroll',
    updateScrollProgress,
    {
        passive: true
    }
);

updateScrollProgress();


/* =========================================================
   BACK TO TOP BUTTON
   ========================================================= */

const backToTop =
    document.getElementById('backToTop');


function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add('show');

    } else {

        backToTop.classList.remove('show');

    }

}


window.addEventListener(
    'scroll',
    updateBackToTop,
    {
        passive: true
    }
);


backToTop?.addEventListener(
    'click',
    () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }
);


/* =========================================================
   PROJECT FILTERS
   ========================================================= */

const filterButtons =
    document.querySelectorAll('.filter-btn');

const projectCards =
    document.querySelectorAll('.project-card');


filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        /* Remove active class */

        filterButtons.forEach(btn => {

            btn.classList.remove('active');

        });


        /* Add active class */

        button.classList.add('active');


        const selectedFilter =
            button.dataset.filter;


        /* Filter projects */

        projectCards.forEach(card => {

            const category =
                card.dataset.category;


            if (
                selectedFilter === 'all' ||
                category === selectedFilter
            ) {

                card.classList.remove('hidden');

            } else {

                card.classList.add('hidden');

            }

        });

    });

});


/* =========================================================
   DARK / LIGHT MODE
   ========================================================= */

const themeToggle =
    document.getElementById('themeToggle');


/* Load saved theme */

const savedTheme =
    localStorage.getItem('aditya-theme');


if (savedTheme === 'light') {

    document.body.classList.add('light');

}


/* Update theme icon */

function updateThemeIcon() {

    if (!themeToggle) return;


    if (
        document.body.classList.contains('light')
    ) {

        themeToggle.textContent = '☾';

        themeToggle.setAttribute(
            'aria-label',
            'Switch to dark mode'
        );

    } else {

        themeToggle.textContent = '☼';

        themeToggle.setAttribute(
            'aria-label',
            'Switch to light mode'
        );

    }

}


updateThemeIcon();


/* Toggle theme */

themeToggle?.addEventListener(
    'click',
    () => {

        document.body.classList.toggle('light');


        const isLight =
            document.body.classList.contains('light');


        localStorage.setItem(
            'aditya-theme',
            isLight ? 'light' : 'dark'
        );


        updateThemeIcon();

    }
);


/* =========================================================
   AI PORTFOLIO AGENT
   ========================================================= */


/*
   Required HTML IDs:

   #aiAgent
   #agentLaunch
   #agentClose
   #agentForm
   #agentInput
   #agentMessages

*/


const aiAgent =
    document.getElementById('aiAgent');

const agentLaunch =
    document.getElementById('agentLaunch');

const agentClose =
    document.getElementById('agentClose');

const agentForm =
    document.getElementById('agentForm');

const agentInput =
    document.getElementById('agentInput');

const agentMessages =
    document.getElementById('agentMessages');


/* Conversation history */

let chatHistory = [];


/* =========================================================
   OPEN AI AGENT
   ========================================================= */

function openAgent() {

    if (!aiAgent) return;


    aiAgent.classList.add('open');


    aiAgent.setAttribute(
        'aria-hidden',
        'false'
    );


    setTimeout(() => {

        agentInput?.focus();

    }, 150);

}


/* =========================================================
   CLOSE AI AGENT
   ========================================================= */

function closeAgent() {

    if (!aiAgent) return;


    aiAgent.classList.remove('open');


    aiAgent.setAttribute(
        'aria-hidden',
        'true'
    );

}


/* =========================================================
   AI AGENT BUTTON EVENTS
   ========================================================= */

agentLaunch?.addEventListener(
    'click',
    openAgent
);


agentClose?.addEventListener(
    'click',
    closeAgent
);


/* Close by clicking outside */

aiAgent?.addEventListener(
    'click',
    event => {

        if (event.target === aiAgent) {

            closeAgent();

        }

    }
);


/* Close with Escape */

document.addEventListener(
    'keydown',
    event => {

        if (
            event.key === 'Escape' &&
            aiAgent?.classList.contains('open')
        ) {

            closeAgent();

        }

    }
);


/* =========================================================
   ADD CHAT MESSAGE
   ========================================================= */

function addMessage(text, type) {

    if (!agentMessages) return null;


    const message =
        document.createElement('div');


    message.className =
        `agent-message ${type}`;


    message.textContent = text;


    agentMessages.appendChild(
        message
    );


    agentMessages.scrollTop =
        agentMessages.scrollHeight;


    return message;

}


/* =========================================================
   AI AGENT REQUEST
   ========================================================= */

async function askAgent(text) {

    if (!text) return;


    /* User message */

    addMessage(
        text,
        'user'
    );


    /* Save user message */

    chatHistory.push({

        role: 'user',

        content: text

    });


    /* Loading message */

    const loading =
        addMessage(
            'Thinking…',
            'bot'
        );


    try {


        /* Send request to Vercel API */

        const response =
            await fetch(
                '/api/chat',
                {

                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({

                        messages:
                            chatHistory

                    })

                }
            );


        /* Read response */

        const data =
            await response.json();


        /* Remove loading */

        loading?.remove();


        /* Check server response */

        if (!response.ok) {

            throw new Error(
                data.error ||
                'AI Agent unavailable'
            );

        }


        /* Get AI reply */

        const reply =
            data.reply ||
            'Sorry, I could not generate a response.';


        /* Show AI response */

        addMessage(
            reply,
            'bot'
        );


        /* Save AI response */

        chatHistory.push({

            role: 'assistant',

            content: reply

        });


    } catch (error) {


        console.error(
            'AI Agent Error:',
            error
        );


        loading?.remove();


        addMessage(
            'Sorry, the AI Agent could not respond. Please try again.',
            'bot'
        );

    }

}


/* =========================================================
   CHAT FORM
   ========================================================= */

agentForm?.addEventListener(
    'submit',
    event => {

        event.preventDefault();


        if (!agentInput) return;


        const text =
            agentInput.value.trim();


        if (!text) return;


        /* Clear input */

        agentInput.value = '';


        /* Send message */

        askAgent(text);

    }
);


/* =========================================================
   AI SUGGESTION BUTTONS
   ========================================================= */

const suggestionButtons =
    document.querySelectorAll(
        '.agent-suggestions button'
    );


suggestionButtons.forEach(button => {

    button.addEventListener(
        'click',
        () => {

            const prompt =
                button.dataset.prompt;


            if (prompt) {

                askAgent(prompt);

            }

        }
    );

});


/* =========================================================
   ENTER KEY SUPPORT
   ========================================================= */

agentInput?.addEventListener(
    'keydown',
    event => {

        if (
            event.key === 'Enter' &&
            !event.shiftKey
        ) {

            event.preventDefault();

            agentForm?.requestSubmit();

        }

    }
);


/* =========================================================
   PREVENT EMPTY AGENT REQUESTS
   ========================================================= */

function resetAgentChat() {

    chatHistory = [];


    if (agentMessages) {

        agentMessages.innerHTML = '';

    }

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        updateScrollProgress();

        updateBackToTop();

        updateThemeIcon();

    }
);
