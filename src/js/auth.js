// Authentication system - Demo mode that accepts any credentials
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.listeners = [];
        this.loadUserFromStorage();
    }

    // Add listener for auth state changes
    addListener(callback) {
        this.listeners.push(callback);
    }

    // Remove listener
    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    // Notify all listeners of auth state change
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.currentUser));
    }

    // Demo login - accepts any credentials
    login(email, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In demo mode, we accept any credentials
                // Check if it's a known test account first
                if (mockData.testAccounts[email]) {
                    this.currentUser = mockData.testAccounts[email];
                } else {
                    // For any other credentials, create a generic user
                    // Determine role based on email pattern or default to student
                    const role = email.includes('faculty') || email.includes('admin') || email.includes('prof') ? 'faculty' : 'student';
                    const name = email.split('@')[0].split('.').map(part => 
                        part.charAt(0).toUpperCase() + part.slice(1)
                    ).join(' ');
                    
                    this.currentUser = {
                        id: Date.now().toString(),
                        email: email,
                        name: name,
                        role: role
                    };
                }
                
                this.saveUserToStorage();
                this.notifyListeners();
                resolve(this.currentUser);
            }, 800); // Simulate network delay
        });
    }

    // Logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem('captrack_user');
        this.notifyListeners();
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Save user to localStorage
    saveUserToStorage() {
        if (this.currentUser) {
            localStorage.setItem('captrack_user', JSON.stringify(this.currentUser));
        }
    }

    // Load user from localStorage
    loadUserFromStorage() {
        const stored = localStorage.getItem('captrack_user');
        if (stored) {
            try {
                this.currentUser = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading user from storage:', error);
                localStorage.removeItem('captrack_user');
            }
        }
    }
}

// Global auth instance
const auth = new AuthSystem();