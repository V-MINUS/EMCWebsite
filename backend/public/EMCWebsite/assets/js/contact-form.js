/**
 * Electronic Music Council - Contact Form Functionality
 * Handles form submission and validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordion functionality
    initAccordion();
    
    // Initialize contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        initContactForm(contactForm);
    }
});

/**
 * Initialize accordion functionality for FAQs
 */
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
                const content = accItem.querySelector('.accordion-content');
                content.style.maxHeight = null;
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Initialize contact form validation and submission
 */
function initContactForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const newsletter = document.getElementById('newsletter').checked;
        
        // Validate form (simple client-side validation)
        if (!name || !email || !subject || !message) {
            showFormError('Please fill out all required fields.');
            return;
        }
        
        if (!validateEmail(email)) {
            showFormError('Please enter a valid email address.');
            return;
        }
        
        // In a real implementation, you would send this data to your backend
        // For demonstration, we'll simulate a successful submission
        const formData = {
            name,
            email,
            subject,
            message,
            newsletter,
            timestamp: new Date().toISOString()
        };
        
        console.log('Form submission data:', formData);
        
        // Simulate form submission with loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            showFormSuccess();
            
            // Reset the form
            form.reset();
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, 1500);
    });
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Show form error message
 */
function showFormError(message) {
    // Check if error element already exists
    let errorElement = document.querySelector('.form-error');
    
    if (!errorElement) {
        // Create error element
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.style.color = '#ff4d6d';
        errorElement.style.marginBottom = '1rem';
        errorElement.style.padding = '0.75rem';
        errorElement.style.backgroundColor = 'rgba(255, 77, 109, 0.1)';
        errorElement.style.borderRadius = '4px';
        errorElement.style.fontSize = '0.9rem';
        
        // Insert before the submit button
        const submitButton = document.querySelector('.contact-form button[type="submit"]');
        submitButton.parentNode.insertBefore(errorElement, submitButton);
    }
    
    // Update error message
    errorElement.textContent = message;
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.parentNode.removeChild(errorElement);
        }
    }, 5000);
}

/**
 * Show form success message
 */
function showFormSuccess() {
    // Hide the form
    const form = document.getElementById('contactForm');
    form.style.display = 'none';
    
    // Check if success message exists
    let successElement = document.querySelector('.form-success');
    
    if (!successElement) {
        // Create success element
        successElement = document.createElement('div');
        successElement.className = 'form-success';
        successElement.innerHTML = `
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
            <button class="btn btn-secondary" id="resetForm" style="margin-top: 1rem;">Send Another Message</button>
        `;
        
        // Insert after the form
        form.parentNode.insertBefore(successElement, form.nextSibling);
        
        // Add event listener to the reset button
        const resetButton = document.getElementById('resetForm');
        resetButton.addEventListener('click', () => {
            // Show the form again
            form.style.display = 'block';
            
            // Remove the success message
            successElement.parentNode.removeChild(successElement);
        });
    }
    
    // Show success message
    successElement.style.display = 'block';
}
