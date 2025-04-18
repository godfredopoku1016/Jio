document.addEventListener('DOMContentLoaded', function() {
    // Initialize forms
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) setupForm(loginForm);
    if (signupForm) setupForm(signupForm);
    
    // Password strength indicator
    const passwordInput = document.getElementById('signupPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
    
    // Initialize floating labels
    initFloatingLabels();
});

function setupForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        
        // Validate form
        if (!validateForm(form)) return;
        
        // Show loading state
        button.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            button.classList.remove('loading');
            button.classList.add('success');
            
            // Reset form after success
            setTimeout(() => {
                button.classList.remove('success');
                if (form.id === 'loginForm') {
                    // Redirect to dashboard or home page
                    alert('Login successful! Redirecting...');
                    // window.location.href = 'dashboard.html';
                } else {
                    alert('Account created successfully! Redirecting to login...');
                    window.location.href = 'index.html';
                }
            }, 1500);
        }, 2000);
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    
    // Validate each input
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email');
            isValid = false;
        } else if (input.id === 'signupPassword' && input.value.length < 8) {
            showError(input, 'Password must be at least 8 characters');
            isValid = false;
        } else if (input.id === 'signupConfirm' && 
                  input.value !== document.getElementById('signupPassword').value) {
            showError(input, 'Passwords do not match');
            isValid = false;
        }
    });
    
    return isValid;
}

function showError(input, message) {
    input.classList.add('is-invalid');
    const errorContainer = input.closest('.form-group').querySelector('.error-message');
    if (errorContainer) {
        errorContainer.textContent = message;
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    if (!strengthBar) return;
    
    let strength = 0;
    if (password.length > 0) strength += 20;
    if (password.length > 5) strength += 20;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[^a-zA-Z\d]/.test(password)) strength += 20;
    
    let color = '#dc3545'; // red
    if (strength > 60) color = '#fd7e14'; // orange
    if (strength > 80) color = '#28a745'; // green
    
    strengthBar.style.width = strength + '%';
    strengthBar.style.backgroundColor = color;
}

function initFloatingLabels() {
    document.querySelectorAll('.floating .form-control').forEach(input => {
        // Initialize state
        if (input.value) {
            input.nextElementSibling.classList.add('active');
        }
        
        // Add event listeners
        input.addEventListener('focus', function() {
            this.nextElementSibling.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.nextElementSibling.classList.remove('active');
            }
        });
    });
}