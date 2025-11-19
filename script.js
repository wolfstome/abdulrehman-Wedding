// --- 1. AUDIO & WELCOME SCREEN ---
const welcomeScreen = document.getElementById('welcome-screen');
const enterBtn = document.getElementById('enter-btn');
const bgAudio = document.getElementById('bg-audio');

// Lock scroll initially to ensure the welcome screen is interactive first
document.body.style.overflow = 'hidden';

enterBtn.addEventListener('click', () => {
    // Hide Welcome Screen
    welcomeScreen.classList.add('hide-welcome');
    
    // Play Audio (User interaction allows this)
    bgAudio.volume = 0.6; 
    bgAudio.play().catch(error => console.log("Audio playback failed:", error));
    
    // Unlock Scroll
    document.body.style.overflow = 'auto';
});

// ----------------------------------------------------------------------

// --- 2. SCROLL ANIMATIONS ---
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing once visible to save resources
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

// ----------------------------------------------------------------------

// --- 3. COUNTDOWN TIMER (Dec 4, 2025 11:00:00) ---
const targetDate = new Date("Dec 4, 2025 11:00:00").getTime();
const countdownGrid = document.getElementById('countdown');

// Define time constants for clarity
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff < 0) {
        countdownGrid.innerHTML = '<div class="cd-box" style="width:100%; border-color:white;"><span class="cd-num">Mubarak!</span><span class="cd-label">Celebration Started</span></div>';
        // Stop the interval once the event starts
        clearInterval(timerInterval); 
        return;
    }

    const days = Math.floor(diff / DAY);
    const hours = Math.floor((diff % DAY) / HOUR);
    const mins = Math.floor((diff % HOUR) / MINUTE);
    const secs = Math.floor((diff % MINUTE) / SECOND);

    countdownGrid.innerHTML = `
        <div class="cd-box"><span class="cd-num">${days}</span><span class="cd-label">Days</span></div>
        <div class="cd-box"><span class="cd-num">${hours}</span><span class="cd-label">Hrs</span></div>
        <div class="cd-box"><span class="cd-num">${mins}</span><span class="cd-label">Min</span></div>
        <div class="cd-box"><span class="cd-num">${secs}</span><span class="cd-label">Sec</span></div>
    `;
}

// Store interval ID to stop it later
const timerInterval = setInterval(updateTimer, SECOND); 
updateTimer();

// ----------------------------------------------------------------------

// --- 4. WISHES SYSTEM ---
const wishForm = document.getElementById('wish-form');
const wishesFeed = document.getElementById('wishes-feed');

// !!! IMPORTANT STEP TO REMOVE UNWANTED MESSAGES !!!
// 1. Uncomment the line below.
// 2. Save the file and refresh your website ONCE in your browser.
// 3. Delete or comment out the line again. This clears ALL saved wishes.
// localStorage.removeItem('sathiWishes'); 

function addWishToDom(name, msg) {
    const div = document.createElement('div');
    div.className = 'wish-card slide-up visible';
    div.innerHTML = `<p class="wish-text">"${msg}"</p><p class="wish-author">- ${name}</p>`;
    // Add the new wish to the top
    wishesFeed.prepend(div); 
}

// Load saved wishes
let savedWishes = JSON.parse(localStorage.getItem('sathiWishes')) || [];

// Function to render the list
function renderWishes() {
    wishesFeed.innerHTML = ''; // Clear current view
    savedWishes.forEach(wish => addWishToDom(wish.name, wish.msg));
}

// Initial Render
renderWishes();

wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value.trim();
    const msg = document.getElementById('user-msg').value.trim();

    if(name && msg) {
        // Add new wish to DOM
        addWishToDom(name, msg);
        
        // Add to storage array
        savedWishes.unshift({ name, msg });
        
        // Save to Browser Memory
        localStorage.setItem('sathiWishes', JSON.stringify(savedWishes));
        
        // Clear inputs
        wishForm.reset();
    }
});
// Start music when user taps anywhere
document.addEventListener('click', function startMusic() {
    const audio = document.getElementById("bgAudio");
    audio.play();        // Play audio
    document.removeEventListener('click', startMusic); // Remove listener after first tap
});