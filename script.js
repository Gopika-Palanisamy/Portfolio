// ============================================
    // Typewriter Animation
    // ============================================
    const taglines = [
      "Backend Developer with C# and ASP.NET Core.",
      "Building production-grade RESTful APIs.",
      "EF Core, SQL Server and Cloud optimizations."
    ];
    let taglineIndex = 0;
    let charIndex = 0;
    const typewriterElement = document.getElementById('typewriter');
    let isDeleting = false;

    function typewriter() {
      const currentTagline = taglines[taglineIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentTagline.substring(0, charIndex - 1) + ' ';
        charIndex--;
      } else {
        typewriterElement.textContent = currentTagline.substring(0, charIndex + 1) + '|';
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentTagline.length) {
        isDeleting = true;
        typeSpeed = 2000;
        typewriterElement.textContent = currentTagline;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        taglineIndex = (taglineIndex + 1) % taglines.length;
        typeSpeed = 500;
      }

      setTimeout(typewriter, typeSpeed);
    }

    typewriter();

    // ============================================
    // Theme Toggle Functionality
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    // ============================================
    // Resume Modal
    // ============================================
    function openResume() {
      document.getElementById('resumeFrame').src = './Gopika_Resume.pdf';
      document.getElementById('resumeModal').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeResume() {
      document.getElementById('resumeModal').classList.remove('open');
      document.getElementById('resumeFrame').src = '';
      document.body.style.overflow = '';
    }

    document.getElementById('resumeModal').addEventListener('click', function(e) {
      if (e.target === this) closeResume();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeResume();
    });

    // Check persisted theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      sunIcon.style.display = 'none';
      moonIcon.style.display = '';
    } else {
      sunIcon.style.display = '';
      moonIcon.style.display = 'none';
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.setAttribute('data-theme', '');
        localStorage.setItem('theme', '');
        sunIcon.style.display = '';
        moonIcon.style.display = 'none';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = '';
      }
    });

    // ============================================
    // Counter Animation
    // ============================================
    function animateCounters() {
      const counters = document.querySelectorAll('.metric-value');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const suffix = counter.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString() + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString() + suffix;
          }
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.disconnect();
            }
          });
        }, { threshold: 0.5 });

        observer.observe(counter.parentElement);
      });
    }

    // ============================================
    // Skill Bars Animation
    // ============================================
    function animateSkillBars() {
      const skillFills = document.querySelectorAll('.skill-bar-fill');
      skillFills.forEach(fill => {
        const target = fill.style.getPropertyValue('--target') || '100%';
        fill.style.width = target;
      });
    }

    // ============================================
    // Timeline Animation
    // ============================================
    function animateTimeline() {
      const timelineLine = document.getElementById('timelineLine');
      const timelineItems = document.querySelectorAll('.timeline-item');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100);

            if (timelineLine) {
              timelineLine.classList.add('visible');
            }
          }
        });
      }, { threshold: 0.1 });

      timelineItems.forEach(item => observer.observe(item));
    }

    // ============================================
    // Scroll Progress Bar
    // ============================================
    function updateScrollProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.getElementById('scrollProgress').style.width = scrollPercent + '%';
    }

    // ============================================
    // Navbar Scrolled State
    // ============================================
    function updateNavbar() {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Update active nav link
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-links a');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
          link.classList.add('active');
        }
      });
    }

    // ============================================
    // Custom Cursor
    // ============================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      // Dot follows closely
      dotX += (mouseX - dotX) * 0.4;
      dotY += (mouseY - dotY) * 0.4;
      cursorDot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;

      // Ring lags behind
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.transform = `translate(${ringX - 17}px, ${ringY - 17}px)`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    document.querySelectorAll('a, button, .project-card, .btn, .meta-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });

    document.addEventListener('mousedown', () => {
      cursorDot.classList.add('click');
      cursorRing.classList.add('click');
    });
    document.addEventListener('mouseup', () => {
      cursorDot.classList.remove('click');
      cursorRing.classList.remove('click');
    });

    // ============================================
    // Mobile Menu
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('open');
      }
    });

    // ============================================
    // Contact Form
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append('entry.2113511146', document.getElementById('nameInput').value);
      formData.append('entry.1613555204', document.getElementById('emailInput').value); // For custom email field
      formData.append('entry.1197741941', document.getElementById('subjectInput').value);
      formData.append('entry.113202919', document.getElementById('messageInput').value);

      submitBtn.textContent = 'SENDING...';
      
      fetch('https://docs.google.com/forms/d/e/1FAIpQLSclpdl0qTBrVLqky9dDdH691iMS3zQus0kzg13j3Iuysp0InA/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      }).then(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
        submitBtn.classList.add('submitted');
        successMessage.classList.add('show');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.textContent = 'SEND MESSAGE';
          submitBtn.classList.remove('submitted');
          successMessage.classList.remove('show');
        }, 3000);
      }).catch(err => {
        submitBtn.textContent = 'ERROR!';
        setTimeout(() => {
          submitBtn.textContent = 'SEND MESSAGE';
        }, 3000);
      });
    });

    // ============================================
    // Scroll Fade-In Sections
    // ============================================
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    // Observe animation elements (project cards, etc.)
    const animElements = document.querySelectorAll('.animate-fade, .animate-scale');
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    animElements.forEach(el => animObserver.observe(el));

    // ============================================
    // Stagger Animations
    // ============================================
    const staggerContainers = document.querySelectorAll('.stagger-container');
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = Array.from(entry.target.children);
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, index * 100);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    staggerContainers.forEach(container => {
      staggerObserver.observe(container);
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 60,
            behavior: 'smooth'
          });
        }
      });
    });

    // ============================================
    // Initialize Animations on Load
    // ============================================
    // ============================================
    // Premium GSAP Animations
    // ============================================
    function initPremiumAnimations() {
      // 1. Magnetic Buttons
      const magnets = document.querySelectorAll('.btn, .theme-toggle, .meta-icon, .nav-links a');
      magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', function(e) {
          const position = magnet.getBoundingClientRect();
          const x = e.clientX - position.left - position.width / 2;
          const y = e.clientY - position.top - position.height / 2;
          
          gsap.to(magnet, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.4,
            ease: "power2.out"
          });
        });
        
        magnet.addEventListener('mouseleave', function(e) {
          gsap.to(magnet, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });

      // 2. Text Reveal for Section Titles
      const titles = document.querySelectorAll('.section-title');
      titles.forEach(title => {
        // Exclude the ::before element pseudo content from being split if possible, 
        // SplitType handles innerText.
        const text = new SplitType(title, { types: 'chars' });
        gsap.from(text.chars, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          },
          y: 60,
          opacity: 0,
          rotateX: -90,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.5)"
        });
      });

      // 3. Parallax Hero Code Window
      gsap.to(".code-window", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      // 4. Smooth Fade-up for Hero Content
      gsap.from(".hero-name", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.from(".hero-tagline", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.4 });
      gsap.from(".hero-metrics", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.6 });
      gsap.from(".hero-buttons", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.8 });
    }

    // Dynamic footer year
    document.getElementById('footerYear').textContent = new Date().getFullYear();

    window.addEventListener('load', () => {
      updateNavbar();
      animateCounters();
      animateSkillBars();
      animateTimeline();
      updateScrollProgress();
      initPremiumAnimations();
    });

    window.addEventListener('scroll', () => {
      updateScrollProgress();
      updateNavbar();
      animateCounters();
    });