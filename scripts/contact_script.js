document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formResponse = document.getElementById('formResponse');
    const submitButton = document.querySelector('.submit-button');

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to display error messages
    function showError(element, message) {
        element.textContent = message;
    }

    // Function to clear error messages
    function clearError(element) {
        element.textContent = '';
    }

    // Add interactivity to the form elements (optional - for visual feedback)
    nameInput.addEventListener('focus', () => clearError(nameError));
    emailInput.addEventListener('focus', () => clearError(emailError));
    messageInput.addEventListener('focus', () => clearError(messageError));

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        let isValid = true;

        // Basic client-side validation
        if (nameInput.value.trim() === '') {
            showError(nameError, 'Please enter your name.');
            isValid = false;
        } else {
            clearError(nameError);
        }

        if (emailInput.value.trim() === '') {
            showError(emailError, 'Please enter your email address.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(emailError);
        }

        if (messageInput.value.trim() === '') {
            showError(messageError, 'Please enter your message.');
            isValid = false;
        } else {
            clearError(messageError);
        }

        if (isValid) {
            // Simulate sending data (replace with your actual backend logic)
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                contactForm.reset();
                formResponse.textContent = 'Your message has been sent successfully!';
                formResponse.className = 'response-message success';
                // Optionally, fade out the success message after a few seconds
                setTimeout(() => {
                    formResponse.textContent = '';
                    formResponse.className = 'response-message';
                }, 3000);
            }, 1500); // Simulate a 1.5-second delay for sending
        } else {
            formResponse.textContent = 'Please correct the errors in the form.';
            formResponse.className = 'response-message error';
            setTimeout(() => {
                formResponse.textContent = '';
                formResponse.className = 'response-message';
            }, 3000);
        }
    });
});