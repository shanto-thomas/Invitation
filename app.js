document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on load
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Loader logic
    const loader = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Background Music
    const musicTrigger = document.getElementById('music-trigger');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicTrigger.classList.remove('playing');
            musicTrigger.innerHTML = '<i class="fas fa-music"></i><div class="music-tooltip">Play Music</div>';
        } else {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicTrigger.classList.add('playing');
                musicTrigger.innerHTML = '<i class="fas fa-pause"></i><div class="music-tooltip">Pause Music</div>';
            }).catch(e => {
                console.log("Music play blocked by browser. User interaction required.", e);
            });
        }
    });



    // Countdown Timer Logic
    const weddingDate = new Date("April 30, 2026 10:30:00").getTime();
    const countdownTimer = document.getElementById("countdown-timer");
    
    if (countdownTimer) {
        const x = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById("days");
            const hoursEl = document.getElementById("hours");
            const minutesEl = document.getElementById("minutes");
            const secondsEl = document.getElementById("seconds");

            if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(x);
                countdownTimer.innerHTML = "Wedding Started!";
            }
        }, 1000);
    }

    // Bottom Nav Scroll Spy & Click Handling
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('section');

    const setActiveNav = () => {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href') === `#${currentSection}`) {
                btn.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveNav);

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // RSVP Form Logic
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpModal = document.getElementById('rsvp-success');
    const closeModal = document.getElementById('close-modal');

    if (rsvpForm && rsvpModal) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = rsvpForm.querySelector('button');
            submitBtn.innerText = "Submitting...";
            submitBtn.disabled = true;

            setTimeout(() => {
                rsvpModal.style.display = 'flex';
                rsvpForm.reset();
                if (submitBtn) {
                    submitBtn.innerText = "Confirm RSVP";
                    submitBtn.disabled = false;
                }
            }, 1500);
        });
    }

    if (closeModal && rsvpModal) {
        closeModal.addEventListener('click', () => {
            rsvpModal.style.display = 'none';
        });
    }

    // Close modal on escape or background click
    window.addEventListener('click', (e) => {
        if (rsvpModal && e.target === rsvpModal) {
            rsvpModal.style.display = 'none';
        }
    });
});
