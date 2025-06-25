// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');
const startMeetBtn = document.querySelector('.start-meet');
const videoPlaceholder = document.querySelector('.video-placeholder');
const playBtn = document.querySelector('.play-btn');

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Google Meet integration
function createGoogleMeetLink() {
    // Google Meet API endpoint for creating instant meetings
    const meetLink = 'https://meet.google.com/new';
    window.open(meetLink, '_blank');
}


// Start instant Google Meet call
startMeetBtn.addEventListener('click', createGoogleMeetLink);

// Video placeholder click handler
videoPlaceholder.addEventListener('click', () => {
    const iframe = videoPlaceholder.querySelector('.youtube-player');
    const thumbnail = videoPlaceholder.querySelector('img');
    const playButton = videoPlaceholder.querySelector('.play-btn');

    // Set the YouTube embed URL with autoplay
    iframe.src = 'https://www.youtube.com
    iframe.style.display = 'block';
    
    // Hide the placeholder elements
    thumbnail.style.display = 'none';
    playButton.style.display = 'none';
});


// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
});

// Play button hover animation
playBtn.addEventListener('mouseenter', () => {
    playBtn.style.transform = 'translate(-50%, -50%) scale(1.1)';
});

playBtn.addEventListener('mouseleave', () => {
    playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Intersection Observer for fade-in animations
const fadeInElements = document.querySelectorAll('.video-wrapper, .call-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeInObserver.observe(element);
});

// Handle video thumbnail loading
const videoThumbnail = document.querySelector('.video-placeholder img');

videoThumbnail.addEventListener('load', () => {
    videoThumbnail.style.opacity = '1';
});

videoThumbnail.addEventListener('error', () => {
    videoThumbnail.src = 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg';
});
