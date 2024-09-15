document.addEventListener('DOMContentLoaded', () => {
    const videoItems = document.querySelectorAll('.video-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            } else {
                entry.target.classList.remove('fade-in');
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the element is visible

    videoItems.forEach(item => {
        observer.observe(item);
    });
});
