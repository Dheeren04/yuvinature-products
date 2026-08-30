// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// Form now posts to Netlify via fetch, then shows success message
function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('enquiry-form');
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
    })
        .then(() => {
            form.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
        })
        .catch(() => {
            btn.disabled = false;
            btn.textContent = 'Send Enquiry 🌿';
            alert('Something went wrong. Please try again or contact us directly.');
        });
}
