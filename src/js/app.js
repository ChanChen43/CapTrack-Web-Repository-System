// Main application controller
class CapTrackApp {
    constructor() {
        this.currentView = 'dashboard';
        this.appElement = document.getElementById('app');
        this.init();
    }

    init() {
        // Listen for auth state changes
        auth.addListener((user) => {
            this.render();
        });

        // Initial render
        this.render();

        // Initialize Lucide icons
        this.initLucideIcons();
    }

    initLucideIcons() {
        // Initialize Lucide icons after a short delay to ensure DOM is ready
        setTimeout(() => {
            if (window.lucide) {
                lucide.createIcons();
            }
        }, 100);
    }

    setView(viewName) {
        this.currentView = viewName;
        this.render();
    }

    render() {
        const user = auth.getCurrentUser();
        
        if (!user) {
            this.renderLogin();
            return;
        }

        if (user.role === 'faculty') {
            this.renderFacultyInterface();
        } else {
            this.renderStudentInterface();
        }
    }

    renderLogin() {
        this.appElement.innerHTML = Components.loginPage();
        this.initLucideIcons();
        this.setupLoginForm();
    }

    renderStudentInterface() {
        this.appElement.innerHTML = Components.mainLayout('student', this.currentView);
        
        if (this.currentView === 'dashboard') {
            document.getElementById('main-content').innerHTML = Components.dashboardOverview('student');
        } else {
            this.renderStudentView(this.currentView);
        }
        
        this.initLucideIcons();
        this.setupEventListeners();
    }

    renderFacultyInterface() {
        this.appElement.innerHTML = Components.mainLayout('faculty', this.currentView);
        
        if (this.currentView === 'dashboard') {
            document.getElementById('main-content').innerHTML = Components.dashboardOverview('faculty');
        } else {
            this.renderFacultyView(this.currentView);
        }
        
        this.initLucideIcons();
        this.setupEventListeners();
    }

    renderStudentView(view) {
        const mainContent = document.getElementById('main-content');
        
        switch(view) {
            case 'project':
                mainContent.innerHTML = Components.projectView();
                break;
            case 'feedback':
                mainContent.innerHTML = Components.feedbackPage();
                break;
            case 'upload':
                mainContent.innerHTML = Components.uploadPage();
                this.setupUploadHandlers();
                break;
            case 'repository':
                mainContent.innerHTML = Components.repositoryPage();
                this.setupRepositoryHandlers();
                break;
            case 'settings':
                mainContent.innerHTML = Components.settingsPage();
                break;
            default:
                mainContent.innerHTML = Components.dashboardOverview('student');
                this.currentView = 'dashboard';
        }
    }

    renderFacultyView(view) {
        const mainContent = document.getElementById('main-content');
        
        switch(view) {
            case 'submissions':
                mainContent.innerHTML = Components.submissionsPage();
                this.setupSubmissionsHandlers();
                break;
            case 'feedback':
                mainContent.innerHTML = Components.feedbackPage();
                break;
            case 'repository':
                mainContent.innerHTML = Components.repositoryPage();
                this.setupRepositoryHandlers();
                break;
            case 'settings':
                mainContent.innerHTML = Components.settingsPage();
                break;
            default:
                mainContent.innerHTML = Components.dashboardOverview('faculty');
                this.currentView = 'dashboard';
        }
    }

    setupLoginForm() {
        const form = document.getElementById('login-form');
        const loginBtn = document.getElementById('login-btn');
        const loginText = document.getElementById('login-text');
        const loginLoading = document.getElementById('login-loading');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }

            // Show loading state
            loginText.classList.add('hidden');
            loginLoading.classList.remove('hidden');
            loginBtn.disabled = true;

            try {
                await auth.login(email, password);
                // Auth listener will handle the re-render
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please try again.');
                // Reset button state
                loginText.classList.remove('hidden');
                loginLoading.classList.add('hidden');
                loginBtn.disabled = false;
            }
        });
    }

    setupEventListeners() {
        // Generic event listeners that apply to multiple views
        this.initLucideIcons();
        
        // Setup form handlers
        this.setupFormHandlers();
    }

    setupFormHandlers() {
        // Settings form handler
        const settingsForm = document.querySelector('#main-content form');
        if (settingsForm && settingsForm.querySelector('input[type="text"], input[type="email"]')) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulate saving settings
                alert('Settings saved successfully!');
            });
        }

        // Upload form handler
        const uploadForm = document.getElementById('upload-form');
        if (uploadForm) {
            uploadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulate file upload
                alert('Files uploaded successfully!');
            });
        }

        // Feedback form handler
        const feedbackForm = document.querySelector('#main-content form');
        if (feedbackForm && feedbackForm.querySelector('textarea')) {
            feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulate sending feedback
                alert('Feedback sent successfully!');
            });
        }
    }

    setupUploadHandlers() {
        const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('file-input');
        const fileList = document.getElementById('file-list');

        if (!dropZone || !fileInput || !fileList) return;

        // Click to browse files
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag and drop handlers
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            this.handleFiles(files, fileList);
        });

        // File input change handler
        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files, fileList);
        });
    }

    handleFiles(files, fileListElement) {
        Array.from(files).forEach(file => {
            // Validate file type
            const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!allowedTypes.includes(fileExtension)) {
                alert(`File type ${fileExtension} is not supported. Please use PDF, DOC, DOCX, PPT, or PPTX files.`);
                return;
            }

            // Validate file size (50MB limit)
            const maxSize = 50 * 1024 * 1024; // 50MB in bytes
            if (file.size > maxSize) {
                alert(`File ${file.name} is too large. Maximum size is 50MB.`);
                return;
            }

            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg';
            
            fileItem.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i data-lucide="file" class="w-5 h-5 text-gray-400"></i>
                    <div>
                        <p class="text-sm font-medium text-gray-900">${file.name}</p>
                        <p class="text-xs text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <button class="text-red-600 hover:text-red-800" onclick="this.parentElement.remove()">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            `;
            
            fileListElement.appendChild(fileItem);
        });

        // Reinitialize Lucide icons for new elements
        this.initLucideIcons();
    }

    setupRepositoryHandlers() {
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProjects(e.target.value, categoryFilter?.value || '');
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filterProjects(searchInput?.value || '', e.target.value);
            });
        }
    }

    setupSubmissionsHandlers() {
        const statusFilter = document.getElementById('status-filter');
        const typeFilter = document.getElementById('type-filter');

        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.filterSubmissions(e.target.value, typeFilter?.value || '');
            });
        }

        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.filterSubmissions(statusFilter?.value || '', e.target.value);
            });
        }
    }

    filterProjects(searchTerm, category) {
        let filtered = [...mockData.repositoryProjects];

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(project => 
                project.title.toLowerCase().includes(term) ||
                project.description.toLowerCase().includes(term) ||
                project.author.toLowerCase().includes(term) ||
                project.tags.some(tag => tag.toLowerCase().includes(term))
            );
        }

        // Filter by category
        if (category) {
            filtered = filtered.filter(project => project.category === category);
        }

        // Update the projects grid
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            if (filtered.length === 0) {
                projectsGrid.innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <i data-lucide="search" class="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                        <p class="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                `;
            } else {
                projectsGrid.innerHTML = filtered.map(project => `
                    <div class="card p-6 hover:shadow-lg transition-shadow">
                        <div class="mb-4">
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">${project.title}</h3>
                            <p class="text-sm text-gray-600 mb-2">by ${project.author} (${project.year})</p>
                            <span class="badge badge-info">${project.category}</span>
                        </div>
                        
                        <p class="text-gray-700 text-sm mb-4 line-clamp-3">${project.description}</p>
                        
                        <div class="mb-4">
                            <div class="flex flex-wrap gap-1">
                                ${project.tags.slice(0, 3).map(tag => `
                                    <span class="badge badge-secondary text-xs">${tag}</span>
                                `).join('')}
                                ${project.tags.length > 3 ? `<span class="badge badge-secondary text-xs">+${project.tags.length - 3}</span>` : ''}
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Details
                            </button>
                            <div class="flex space-x-2">
                                <button class="text-gray-400 hover:text-gray-600" title="Download">
                                    <i data-lucide="download" class="w-4 h-4"></i>
                                </button>
                                <button class="text-gray-400 hover:text-gray-600" title="Bookmark">
                                    <i data-lucide="bookmark" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            // Reinitialize Lucide icons
            this.initLucideIcons();
        }
    }

    filterSubmissions(status, type) {
        let filtered = [...mockData.facultySubmissions];

        // Filter by status
        if (status) {
            filtered = filtered.filter(submission => submission.status === status);
        }

        // Filter by type
        if (type) {
            filtered = filtered.filter(submission => submission.submissionType === type);
        }

        // Update the submissions table
        const submissionsTbody = document.getElementById('submissions-tbody');
        if (submissionsTbody) {
            if (filtered.length === 0) {
                submissionsTbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center py-8">
                            <i data-lucide="search" class="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                            <p class="text-gray-600">Try adjusting your filter criteria</p>
                        </td>
                    </tr>
                `;
            } else {
                submissionsTbody.innerHTML = filtered.map(submission => `
                    <tr>
                        <td>
                            <div>
                                <div class="text-sm font-medium text-gray-900">${submission.studentName}</div>
                                <div class="text-sm text-gray-500">${submission.studentEmail}</div>
                            </div>
                        </td>
                        <td>
                            <div class="text-sm text-gray-900 max-w-xs">${submission.projectTitle}</div>
                        </td>
                        <td>
                            <div class="text-sm text-gray-900">${submission.submissionType}</div>
                        </td>
                        <td class="text-sm text-gray-500">
                            ${new Date(submission.submissionDate).toLocaleDateString()}
                        </td>
                        <td>
                            <span class="badge ${
                                submission.status === 'reviewed' ? 'badge-success' :
                                submission.status === 'pending' ? 'badge-warning' :
                                'badge-info'
                            }">
                                ${submission.status}
                            </span>
                        </td>
                        <td class="text-sm text-gray-900">
                            ${submission.grade || '-'}
                        </td>
                        <td>
                            <div class="flex items-center space-x-2">
                                <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">Review</button>
                                <button class="text-gray-600 hover:text-gray-800 text-sm">Download</button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }

            // Reinitialize Lucide icons
            this.initLucideIcons();
        }
    }

    viewSubmissionDetails(submissionId) {
        const submission = mockData.submissions.find(sub => sub.id === submissionId);
        if (submission) {
            const modal = document.getElementById('submission-modal');
            if (modal) {
                modal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="text-lg font-semibold text-gray-900">Submission Details</h3>
                            <button class="text-gray-400 hover:text-gray-600" title="Close" onclick="this.parentElement.parentElement.style.display='none'">
                                <i data-lucide="x" class="w-4 h-4"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-4">
                                <h4 class="text-md font-semibold text-gray-900">Title</h4>
                                <p class="text-sm text-gray-600">${submission.title}</p>
                            </div>
                            <div class="mb-4">
                                <h4 class="text-md font-semibold text-gray-900">Author</h4>
                                <p class="text-sm text-gray-600">${submission.author}</p>
                            </div>
                            <div class="mb-4">
                                <h4 class="text-md font-semibold text-gray-900">Description</h4>
                                <p class="text-sm text-gray-600">${submission.description}</p>
                            </div>
                            <div class="mb-4">
                                <h4 class="text-md font-semibold text-gray-900">Files</h4>
                                <ul>
                                    ${submission.files.map(file => `
                                        <li>
                                            <a href="${file.url}" target="_blank" class="text-blue-600 hover:text-blue-800">
                                                <i data-lucide="file" class="w-4 h-4 mr-2"></i>${file.name}
                                            </a>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                modal.style.display = 'block';
                this.initLucideIcons();
            }
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CapTrackApp();
});