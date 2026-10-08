const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navWrap = document.querySelector('.nav-wrap');
const navLinks = [...document.querySelectorAll('.nav-link')];
const backTop = document.querySelector('.back-top');

menuToggle?.addEventListener('click', () => {
    const open = navWrap.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

navLinks.forEach(link => link.addEventListener('click', () => {
    navWrap.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
    backTop?.classList.toggle('show', window.scrollY > 600);
});

backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

const sections = [...document.querySelectorAll('main section[id]')];
const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section => observerNav.observe(section));

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const serviceData = {
    laptop: {title:'Fixing Laptops', description:'We focus on practical laptop diagnostics, maintenance and repair so your machine can perform reliably again.', items:['Hardware diagnostics','Performance troubleshooting','Windows installation','Driver installation','System cleanup and maintenance']},
    software: {title:'Software Installation', description:'We help configure the software your computer needs and get the basics working correctly.', items:['Operating system installation','Driver installation','Essential software setup','System configuration','Software troubleshooting']},
    website: {title:'Website Design', description:'We create clean, responsive websites that help businesses present themselves professionally online.', items:['Business websites','Responsive mobile design','Contact forms','Business information pages','User-friendly layouts']},
    webapp: {title:'Web App Design', description:'We build custom browser-based applications for businesses that need more than a standard website.', items:['Custom web applications','Business systems','Database-driven applications','Interactive dashboards','Custom functionality']}
};

const modal = document.querySelector('#service-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalList = document.querySelector('#modal-list');
const modalContact = document.querySelector('#modal-contact');

function openService(key){
    const service = serviceData[key];
    if (!service) return;
    modalTitle.textContent = service.title;
    modalDescription.textContent = service.description;
    modalList.innerHTML = service.items.map(item => `<li>${item}</li>`).join('');
    modalContact.dataset.service = service.title;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
}
function closeService(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
}
document.querySelectorAll('.service-card').forEach(card => card.querySelector('.learn-more').addEventListener('click', () => openService(card.dataset.service)));
document.querySelector('.modal-close')?.addEventListener('click', closeService);
document.querySelector('.modal-backdrop')?.addEventListener('click', closeService);
modalContact?.addEventListener('click', () => closeService());

const workItems = [...document.querySelectorAll('.work-item')];
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let lightboxIndex = 0;
function showLightbox(index){
    lightboxIndex = (index + workItems.length) % workItems.length;
    const item = workItems[lightboxIndex];
    lightboxImage.src = `/static/images/${item.dataset.image}`;
    lightboxImage.alt = item.dataset.title;
    lightboxCaption.textContent = item.dataset.title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
}
function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
}
workItems.forEach((item,index) => item.addEventListener('click', () => showLightbox(index)));
document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => showLightbox(lightboxIndex-1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => showLightbox(lightboxIndex+1));
lightbox?.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){ closeService(); closeLightbox(); }
    if(lightbox.classList.contains('open') && e.key === 'ArrowRight') showLightbox(lightboxIndex+1);
    if(lightbox.classList.contains('open') && e.key === 'ArrowLeft') showLightbox(lightboxIndex-1);
});

const form = document.querySelector('#contact-form');
const formError = document.querySelector('#form-error');
form?.addEventListener('submit', event => {
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const errors = [];
    if(name.length < 2) errors.push('Please enter your full name.');
    if(!emailOk) errors.push('Please enter a valid email address.');
    if(message.length < 5) errors.push('Please tell us a little more about what you need help with.');
    formError.textContent = errors.join(' ');
    if(errors.length) event.preventDefault();
});

// Play videos only when they enter the viewport, saving bandwidth and keeping the page calm.
const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const video = entry.target;
        if(entry.isIntersecting){
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    });
}, {threshold:.25});
document.querySelectorAll('video').forEach(video => videoObserver.observe(video));
