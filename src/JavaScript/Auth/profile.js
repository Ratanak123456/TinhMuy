import { auth } from '../fireBase/DBConfig.js';
import { signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

export class ProfileManager {
    constructor() {
        this.init();
    }

    async init() {
        await this.checkAuth();
        this.loadUserData();
        this.setupEventListeners();
        this.setupForm();
    }

    async checkAuth() {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
            // Redirect to login if not logged in
            window.location.href = 'auth.html';
            return false;
        }
        
        return true;
    }

    loadUserData() {
        const user = JSON.parse(localStorage.getItem('user'));
        const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        
        if (user) {
            // Display basic user info
            const email = user.email;
            const displayName = email.split('@')[0];
            
            document.getElementById('userName').textContent = displayName;
            document.getElementById('userEmail').textContent = email;
            document.getElementById('email').value = email;
            
            // Display account creation date
            document.getElementById('accountDate').textContent = 
                new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            
            // Load saved profile data if exists
            if (userProfile) {
                this.populateForm(userProfile);
            }
        }
    }

    populateForm(profileData) {
        // Populate form fields with saved data
        if (profileData.firstName) document.getElementById('firstName').value = profileData.firstName;
        if (profileData.lastName) document.getElementById('lastName').value = profileData.lastName;
        if (profileData.nickname) document.getElementById('nickname').value = profileData.nickname;
        if (profileData.dob) document.getElementById('dob').value = profileData.dob;
        if (profileData.gender) document.getElementById('gender').value = profileData.gender;
        if (profileData.country) document.getElementById('country').value = profileData.country;
        if (profileData.phone) document.getElementById('phone').value = profileData.phone;
    }

    setupEventListeners() {
        // Logout buttons
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
        document.getElementById('sidebarLogoutBtn').addEventListener('click', () => this.handleLogout());
        
        // Delete account button
        document.getElementById('deleteAccountBtn').addEventListener('click', () => this.handleDeleteAccount());
        
        // Save changes button
        document.getElementById('saveChangesBtn').addEventListener('click', (e) => this.handleSaveChanges(e));
        
        // Form submission
        document.getElementById('profileForm').addEventListener('submit', (e) => this.handleSaveChanges(e));
    }

    setupForm() {
        // Set today's date as max for date of birth
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dob').max = today;
    }

    async handleLogout() {
        try {
            await signOut(auth);
            localStorage.clear();
            window.location.href = '../../index.html';
        } catch (error) {
            console.error('Logout error:', error);
            this.showMessage('Failed to logout. Please try again.', 'error');
        }
    }

    async handleSaveChanges(e) {
        e.preventDefault();
        
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) return;
            
            // Collect form data
            const profileData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                nickname: document.getElementById('nickname').value,
                dob: document.getElementById('dob').value,
                gender: document.getElementById('gender').value,
                country: document.getElementById('country').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                lastUpdated: new Date().toISOString()
            };
            
            // Save to localStorage
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            
            // In a real app, you would save to Firestore here
            // await this.saveToFirestore(user.uid, profileData);
            
            this.showMessage('Profile saved successfully!', 'success');
            
            // Update displayed name
            const displayName = profileData.firstName || profileData.nickname || user.email.split('@')[0];
            document.getElementById('userName').textContent = displayName;
            
        } catch (error) {
            console.error('Save profile error:', error);
            this.showMessage('Failed to save profile. Please try again.', 'error');
        }
    }

    showMessage(message, type = 'success') {
        // Remove any existing message
        const existingMessage = document.querySelector('.profile-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `profile-message fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in ${
            type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 
            'bg-red-100 border border-red-400 text-red-700'
        }`;
        messageDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Optional: Save to Firestore if you set it up
    async saveToFirestore(userId, data) {
        // Example Firestore integration:
        /*
        import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
        const db = getFirestore();
        await setDoc(doc(db, "users", userId), data, { merge: true });
        */
    }
}

// Initialize profile manager
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
});