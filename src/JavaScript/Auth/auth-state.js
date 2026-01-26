import { auth } from '../fireBase/DBConfig.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

export class AuthStateManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupAuthListener();
    }

    setupAuthListener() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.updateUIForLoggedInUser();
                // Store user info
                localStorage.setItem('user', JSON.stringify({
                    email: user.email,
                    uid: user.uid
                }));
            } else {
                this.updateUIForLoggedOutUser();
                localStorage.removeItem('user');
            }
        });
    }

    updateUIForLoggedInUser() {
        // Desktop - Show profile icon, hide login button
        const loginBtnDesktop = document.getElementById('loginButtonNav');
        const profileIconDesktop = document.getElementById('profileIconBtn');
        
        if (loginBtnDesktop) loginBtnDesktop.classList.add('hidden');
        if (profileIconDesktop) profileIconDesktop.classList.remove('hidden');
        
        // Mobile - Show profile icon, hide login button
        const loginBtnMobile = document.getElementById('loginButtonMobile');
        const profileIconMobile = document.getElementById('profileIconMobile');
        
        if (loginBtnMobile) loginBtnMobile.classList.add('hidden');
        if (profileIconMobile) profileIconMobile.classList.remove('hidden');
    }

    updateUIForLoggedOutUser() {
        // Desktop - Show login button, hide profile icon
        const loginBtnDesktop = document.getElementById('loginButtonNav');
        const profileIconDesktop = document.getElementById('profileIconBtn');
        
        if (loginBtnDesktop) loginBtnDesktop.classList.remove('hidden');
        if (profileIconDesktop) profileIconDesktop.classList.add('hidden');
        
        // Mobile - Show login button, hide profile icon
        const loginBtnMobile = document.getElementById('loginButtonMobile');
        const profileIconMobile = document.getElementById('profileIconMobile');
        
        if (loginBtnMobile) loginBtnMobile.classList.remove('hidden');
        if (profileIconMobile) profileIconMobile.classList.add('hidden');
    }
}

// Initialize auth state manager
export function initAuthState() {
    new AuthStateManager();
}