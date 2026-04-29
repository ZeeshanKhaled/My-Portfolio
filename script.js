const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const landingIntro = document.getElementById('landing-intro');
const homeScrollContent = document.getElementById('home-scroll-content');

if (landingIntro && homeScrollContent) {
  const updateHomeIntroState = () => {
    const triggerPoint = window.innerHeight * 0.22;
    const shouldSwap = window.scrollY > triggerPoint;
    document.body.classList.toggle('scrolled', shouldSwap);
  };

  updateHomeIntroState();
  window.addEventListener('scroll', updateHomeIntroState, { passive: true });
  window.addEventListener('resize', updateHomeIntroState);
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((item) => observer.observe(item));

const filterButtons = document.querySelectorAll('.filter-btn');
const filterCards = document.querySelectorAll('.filter-grid .project-card');

if (filterButtons.length && filterCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      filterCards.forEach((card) => {
        const categories = card.dataset.category || '';
        const shouldShow = filter === 'all' || categories.includes(filter);
        card.style.display = shouldShow ? 'flex' : 'none';
      });
    });
  });
}


const heroRotator = document.querySelector('.hero-rotator');
if (heroRotator) {
  const slides = heroRotator.querySelectorAll('.hero-slide');
  const dots = heroRotator.querySelectorAll('.hero-dot');
  const title = heroRotator.querySelector('.hero-rotator-title');
  let currentSlide = 0;
  let slideTimer;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    if (title) {
      title.textContent = slides[index].dataset.project || '';
    }

    currentSlide = index;
  };

  const startRotation = () => {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }, 3200);
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.slide);
      showSlide(index);
      startRotation();
    });
  });

  showSlide(0);
  startRotation();
}
