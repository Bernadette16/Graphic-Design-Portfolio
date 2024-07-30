
(function() {
  "use strict";

    // Header toggle for mobile navigation
    const headerToggleBtn = document.querySelector('.header-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    function headerToggle() {
        document.body.classList.toggle('mobile-nav-active');
        headerToggleBtn.classList.toggle('bi-list');
        headerToggleBtn.classList.toggle('bi-x');
    }

    headerToggleBtn.addEventListener('click', headerToggle);

    // Hide mobile nav on same-page/hash links
    document.querySelectorAll('#mobile-nav a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
            if (document.body.classList.contains('mobile-nav-active')) {
                headerToggle();
            }
        });
    });

  /* Preloader*/
 document.addEventListener('DOMContentLoaded', function() {
     window.addEventListener('load', () => {
        window.scrollTo(0, 0);
    });

    const preloader = document.querySelector('#preloader');
    const soundAfterPreload = new Audio('assets/audio/564237__breviceps__retro-audio-logo.mp3');
    soundAfterPreload.volume = 0.5; // Set volume (adjust as needed)
    soundAfterPreload.playbackRate = 2; // Set playback speed (1.5 = 50% faster)

    const welcomeButton = document.querySelector('#welcome-button');
    const heroSection = document.querySelector('#hero');
    let isSoundPlaying = false;

    function playSound() {
        soundAfterPreload.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }

    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    welcomeButton.addEventListener('click', () => {
        if (isSoundPlaying) {
            soundAfterPreload.pause();
        } else {
            playSound();
        }
        isSoundPlaying = !isSoundPlaying;
    });

    // IntersectionObserver to handle hero section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is visible
                welcomeButton.classList.add('active');
            } else {
                // Element is out of view
                welcomeButton.classList.remove('active');
                if (isSoundPlaying) {
                    soundAfterPreload.pause();
                    isSoundPlaying = false;
                }
            }
        });
    }, {
        threshold: 0.8 // Adjust the threshold as needed
    });

    if (heroSection) {
        observer.observe(heroSection);
    }
});



  /*Scroll top button*/
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /*Animation on scroll function and init*/
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);



//  Initiate Typed.js
document.addEventListener('DOMContentLoaded', function () {
    const selectTyped = document.querySelector('.typed');
    const heroSection = document.querySelector('#hero');
    const soundToggle = document.getElementById('sound-toggle');

    let typingSound;
    let isSoundPlaying = false;
    let isHeroSectionInView = false;

    if (selectTyped && heroSection && soundToggle) {
        let typed_strings = selectTyped.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');

        // Load typing sound with reduced volume
        typingSound = new Audio('assets/audio/561697__mattruthsound__keyboard-computer-mechanical-typing-individual-keys-press-button-click-tap-on.mp3');
        typingSound.volume = 0.2; // Set volume (0.2 = 20%)

        // Initialize Typed.js
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 2000,
            onCharAppended: function (char, self) {
                if (isSoundPlaying) {
                    if (typingSound.paused) {
                        typingSound.play(); // Resume audio if paused
                    } else {
                        typingSound.currentTime = 0; // Reset sound to start if already playing
                    }
                }
            },
        });

        // IntersectionObserver to handle scroll visibility for the hero section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero section is visible
                    isHeroSectionInView = true;
                    if (!isSoundPlaying) {
                        typingSound.play(); // Start playing sound
                        isSoundPlaying = false; // Mark as playing
                        soundToggle.classList.remove('active'); // Update button state
                        // soundToggle.querySelector('i').classList.replace('fa-circle-play', 'fa-circle-pause'); // Change icon to pause
                    }
                } else {
                    // Hero section is out of view
                    isHeroSectionInView = false;
                    if (isSoundPlaying) {
                        typingSound.pause(); // Pause sound
                        typingSound.currentTime = 0; // Reset sound to the beginning
                        isSoundPlaying = false; // Mark as stopped
                        soundToggle.classList.remove('active'); // Update button state
                        soundToggle.querySelector('i').classList.replace('fa-circle-pause', 'fa-circle-play'); // Change icon to play
                    }
                }
            });
        }, {
            threshold: 0.8 // Adjust the threshold as needed
        });

        observer.observe(heroSection);

        // Toggle sound on icon click
        soundToggle.addEventListener('click', () => {
            if (!isSoundPlaying) {
                typingSound.play(); // Start sound
                isSoundPlaying = true; // Mark as playing
                soundToggle.classList.add('active'); // Update button state
                soundToggle.querySelector('i').classList.replace('fa-circle-play', 'fa-circle-pause'); // Change icon to pause
            } else {
                typingSound.pause(); // Stop sound
                typingSound.currentTime = 0; // Reset sound to the beginning
                isSoundPlaying = false; // Mark as stopped
                soundToggle.classList.remove('active'); // Update button state
                soundToggle.querySelector('i').classList.replace('fa-circle-pause', 'fa-circle-play'); // Change icon to play
            }
        });

        // Navmenu Scrollspy
        let navmenulinks = document.querySelectorAll('.navmenu a');

        function navmenuScrollspy() {
            navmenulinks.forEach(navmenulink => {
                if (!navmenulink.hash) return;
                let section = document.querySelector(navmenulink.hash);
                if (!section) return;
                let position = window.scrollY + 200;
                if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                    document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
                    navmenulink.classList.add('active');

                    // Stop typing sound when hero section is not active
                    if (section.id !== 'hero' && isSoundPlaying) {
                        typingSound.pause(); // Pause sound
                        typingSound.currentTime = 0; // Reset sound to the beginning
                        isSoundPlaying = false; // Mark as stopped
                        soundToggle.classList.remove('active'); // Update button state
                        soundToggle.querySelector('i').classList.replace('fa-circle-pause', 'fa-circle-play'); // Change icon to play
                    }
                } else {
                    navmenulink.classList.remove('active');
                }
            });
        }

        window.addEventListener('load', navmenuScrollspy);
        document.addEventListener('scroll', navmenuScrollspy);
    }
});



  /*Initiate Pure Counter*/
  new PureCounter();

  /*Animate the skills items on reveal*/
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /*Initiate glightbox*/
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /*Init isotope layout and filters*/
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });



// SWIPER EFFECT WITH SOUND
 function initSwiper() {
  document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
    let config = JSON.parse(
      swiperElement.querySelector(".swiper-config").innerHTML.trim()
    );

    if (swiperElement.classList.contains("swiper-tab")) {
      initSwiperWithCustomPagination(swiperElement, config);
    } else {
      let swiperInstance = new Swiper(swiperElement, config);

      // Adding sound effect on slide change
      swiperInstance.on('slideChange', function() {
        if (isSwiperSectionInView) { // Check if the section is in view
          let soundEffect = document.getElementById('soundEffect');
          if (soundEffect) {
            soundEffect.volume = 0.2; // Reduce volume
            soundEffect.currentTime = 0; // Rewind to start
            soundEffect.play();
          }
        }
      });
    }
  });
}

let isSwiperSectionInView = false; // Flag to check if the swiper section is in view

document.addEventListener("DOMContentLoaded", function() {
  let soundEffect = document.getElementById('soundEffect');
  let swiperSection = document.getElementById('video-carousel');

  // Check if the elements exist
  if (soundEffect && swiperSection) {
    // Set initial volume
    soundEffect.volume = 0.2; // Reduce volume

    // Create an Intersection Observer
    let observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isSwiperSectionInView = true; // Set flag when the section is in view
        } else {
          isSwiperSectionInView = false; // Unset flag when the section is out of view
          soundEffect.pause(); // Pause the sound when the section is out of view
          soundEffect.currentTime = 0; // Reset the sound to the beginning
        }
      });
    }, {
      threshold: 0.5 // Adjust this value to control when the sound starts/stops
    });

    // Observe the swiper section
    observer.observe(swiperSection);
  }

  window.addEventListener("load", initSwiper);
});


  /*Correct scrolling position upon page load for URLs containing hash links.*/
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /* Navmenu Scrollspy*/
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

//Trigger Icon animation when section is in sight
document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('.info-wrap');
    const iconElements = section.querySelectorAll('.info-item i');

    // Function to check if an element is in view
    function isInView(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add animation classes
    function triggerAnimations() {
        if (isInView(section)) {
            iconElements.forEach(icon => {
                icon.classList.add('animate-icon');
            });
        }
    }

    // Initial check
    triggerAnimations();

    // Check on scroll
    window.addEventListener('scroll', triggerAnimations);
 });

document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('#contact');
    const animatedIcon = section.querySelector('.animated-icon');

    function isInView(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function triggerAnimations() {
        if (isInView(section)) {
            animatedIcon.classList.add('animate-icon');
        }
    }

    // Initial check
    triggerAnimations();

    // Check on scroll
    window.addEventListener('scroll', triggerAnimations);
});