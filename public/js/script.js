// ============================================
// VMart Ticket System - Client-Side JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // Form Validation Enhancement
    // ============================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

                // Re-enable after 3 seconds in case of error
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = submitBtn.dataset.originalText || 'Submit';
                }, 3000);
            }
        });

        // Store original button text
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.dataset.originalText = submitBtn.innerHTML;
        }
    });

    // ============================================
    // Animate Elements on Scroll
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stat cards and chart cards
    document.querySelectorAll('.stat-card, .chart-card, .info-item').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // Active Navigation Highlighting
    // ============================================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath ||
            (currentPath.startsWith('/tickets') && linkPath === '/tickets') ||
            (currentPath === '/' && linkPath === '/')) {
            link.classList.add('active');
        }
    });

    // ============================================
    // Auto-hide Alerts/Messages
    // ============================================
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s ease';
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    });

    // ============================================
    // Confirmation for Delete Actions
    // ============================================
    const deleteButtons = document.querySelectorAll('form[action*="DELETE"]');
    deleteButtons.forEach(form => {
        form.addEventListener('submit', function (e) {
            const ticketId = this.querySelector('button').dataset.ticketId || 'this ticket';
            if (!confirm(`Are you sure you want to delete ${ticketId}? This action cannot be undone.`)) {
                e.preventDefault();
            }
        });
    });

    // ============================================
    // Chart Bar Animation
    // ============================================
    const chartBars = document.querySelectorAll('.chart-bar-fill');
    chartBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100 + (index * 100));
    });

    // ============================================
    // Tooltip Initialization (if using Bootstrap tooltips)
    // ============================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (typeof bootstrap !== 'undefined') {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // ============================================
    // Auto-format Phone Numbers
    // ============================================
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            e.target.value = value;
        });
    });

    // ============================================
    // Character Counter for Textareas
    // ============================================
    const textareas = document.querySelectorAll('textarea[maxlength]');
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        if (maxLength) {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = 'text-align: right; font-size: 0.85rem; color: #7F8C8D; margin-top: 0.3rem;';
            textarea.parentNode.insertBefore(counter, textarea.nextSibling);

            const updateCounter = () => {
                const remaining = maxLength - textarea.value.length;
                counter.textContent = `${textarea.value.length} / ${maxLength}`;
                counter.style.color = remaining < 50 ? '#E74C3C' : '#7F8C8D';
            };

            textarea.addEventListener('input', updateCounter);
            updateCounter();
        }
    });

    // ============================================
    // Print Ticket Functionality
    // ============================================
    const printButtons = document.querySelectorAll('.btn-print');
    printButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            window.print();
        });
    });

    // ============================================
    // Real-time Search/Filter (if needed)
    // ============================================
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // ============================================
    // Success Message after Form Submission
    // ============================================
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success')) {
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success alert-dismissible fade show';
        successMessage.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
        successMessage.innerHTML = `
            <strong>Success!</strong> ${urlParams.get('message') || 'Operation completed successfully.'}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c🎫 VMart Ticket System', 'font-size: 24px; font-weight: bold; color: #667eea;');
    console.log('%cBuilt with ❤️ for customer excellence', 'font-size: 14px; color: #7F8C8D;');
});
