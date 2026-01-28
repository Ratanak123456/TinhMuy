import { loginTemplate } from './login.js';
import { registerTemplate } from './register.js';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '../fireBase/DBConfig.js';

class AuthApp {
    constructor() {
        this.appElement = document.getElementById('app');
        this.init();
    }

    init() {
        // Start with login page
        this.loadLoginPage();
    }

    loadLoginPage() {
        this.appElement.innerHTML = loginTemplate;
        this.attachLoginEventListeners();
    }

    loadRegisterPage() {
        this.appElement.innerHTML = registerTemplate;
        this.attachRegisterEventListeners();
    }

    attachLoginEventListeners() {
        // Navigation
        document.getElementById('showRegister').addEventListener('click', () => {
            this.loadRegisterPage();
        });

        document.getElementById('backToHome').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../../index.html';
        });

        // Login form
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));

        // Forgot password
        document.getElementById('forgotPassword').addEventListener('click', () => {
            this.handleForgotPassword();
        });

        // Google login (placeholder)
        document.getElementById('googleLogin').addEventListener('click', () => {
            alert('Google login would be implemented here');
        });
    }

    attachRegisterEventListeners() {
        // Navigation
        document.getElementById('showLogin').addEventListener('click', () => {
            this.loadLoginPage();
        });

        document.getElementById('backToHome').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../../index.html';
        });

        // Register form
        const registerForm = document.getElementById('registerForm');
        registerForm.addEventListener('submit', (e) => this.handleRegister(e));

        // Google register (placeholder)
        document.getElementById('googleRegister').addEventListener('click', () => {
            alert('Google registration would be implemented here');
        });
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const loginButton = document.getElementById('loginButton');

        // Validation
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (!password) {
            this.showError('Please enter your password');
            return;
        }

        // Set loading state
        this.setButtonLoading(loginButton, true, 'Logging in...');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            this.showSuccess(`Welcome back!`);
            // Redirect to home page after successful login
            setTimeout(() => {
                window.location.href = '../../index.html';
            }, 1000);
            
        } catch (error) {
            this.handleAuthError(error);
        } finally {
            this.setButtonLoading(loginButton, false, 'Login');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAccepted = document.getElementById('terms').checked;
        const registerButton = document.getElementById('registerButton');

        // Validation
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        if (!termsAccepted) {
            this.showError('Please accept the Terms & Conditions');
            return;
        }

        // Set loading state
        this.setButtonLoading(registerButton, true, 'Creating account...');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            this.showSuccess(`Account created successfully!`);
            
            // Redirect to home page after successful registration
            setTimeout(() => {
                window.location.href = '../../index.html';
            }, 1500);
            
        } catch (error) {
            this.handleAuthError(error);
        } finally {
            this.setButtonLoading(registerButton, false, 'Register');
        }
    }

    async handleForgotPassword() {
        const email = prompt('Please enter your email address to reset your password:');
        
        if (!email) return;
        
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert(`Password reset email sent to ${email}. Please check your inbox.`);
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    setButtonLoading(button, isLoading, loadingText = 'Loading...') {
        button.disabled = isLoading;
        button.innerHTML = isLoading ? 
            `<span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ${loadingText}
            </span>` : 
            loadingText.replace('Loading...', button.dataset.originalText || loadingText);
        
        if (isLoading) {
            button.dataset.originalText = loadingText;
        }
    }

    handleAuthError(error) {
        console.error('Auth error:', error);
        
        const errorMessages = {
            'auth/email-already-in-use': 'This email is already registered. Please use a different email or try logging in.',
            'auth/invalid-email': 'Please enter a valid email address.',
            'auth/weak-password': 'Password is too weak. Please use a stronger password (at least 6 characters).',
            'auth/user-not-found': 'No account found with this email. Please check your email or register.',
            'auth/wrong-password': 'Incorrect password. Please try again.',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
            'auth/network-request-failed': 'Network error. Please check your internet connection.',
            'auth/popup-closed-by-user': 'Login cancelled by user.',
            'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.'
        };

        const message = errorMessages[error.code] || error.message;
        this.showError(message);
    }

    showError(message) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
        errorDiv.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    showSuccess(message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
        successDiv.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthApp();
});