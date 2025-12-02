// UI Components for CapTrack application

class Components {
    // Login Page Component
    static loginPage() {
        return `
            <div class="login-container bg-gray-50">
                <div class="login-form">
                    <div class="text-center mb-8">
                        <h1 class="text-2xl font-extrabold mb-2" style="color: var(--uc-blue);">
                            CapTrack - University of Cebu
                        </h1>
                        <p class="text-sm text-gray-600">
                            Demo Mode - Enter any credentials to sign in
                        </p>
                    </div>
                    <form class="space-y-6" id="login-form">
                        <div class="space-y-4">
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                                <input id="email" name="email" type="email" required 
                                       class="form-input" 
                                       placeholder="Enter your email">
                            </div>
                            <div>
                                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input id="password" name="password" type="password" required 
                                       class="form-input" 
                                       placeholder="Enter your password">
                            </div>
                        </div>

                        <div class="card p-4 bg-blue-50" style="border-color: var(--uc-blue); border-width: 1px;">
                            <h3 class="font-medium text-gray-900 mb-2">Test Accounts:</h3>
                            <div class="text-sm text-gray-700 space-y-1">
                                <p><strong>Student:</strong> student@test.com</p>
                                <p><strong>Faculty:</strong> faculty@test.com</p>
                                <p class="text-xs mt-2" style="color: var(--uc-blue);">Or use any email/password combination</p>
                            </div>
                        </div>

                        <div>
                            <button type="submit" id="login-btn"
                                    class="btn btn-primary w-full py-3">
                                <span id="login-text">Sign in</span>
                                <span id="login-loading" class="hidden">Signing in...</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // Main Layout with Sidebar
    static mainLayout(userRole, currentView) {
        const studentNavItems = [
            { id: 'dashboard', label: 'Dashboard', icon: 'home' },
            { id: 'project', label: 'My Project', icon: 'folder' },
            { id: 'feedback', label: 'Feedback', icon: 'message-circle' },
            { id: 'upload', label: 'Upload', icon: 'upload' },
            { id: 'repository', label: 'Repository', icon: 'book-open' },
            { id: 'settings', label: 'Settings', icon: 'settings' }
        ];

        const facultyNavItems = [
            { id: 'dashboard', label: 'Dashboard', icon: 'home' },
            { id: 'submissions', label: 'Submissions', icon: 'file-text' },
            { id: 'feedback', label: 'Feedback', icon: 'message-circle' },
            { id: 'repository', label: 'Repository', icon: 'book-open' },
            { id: 'settings', label: 'Settings', icon: 'settings' }
        ];

        const navItems = userRole === 'faculty' ? facultyNavItems : studentNavItems;
        const user = auth.getCurrentUser();

        return `
            <div class="layout-main">
                <div class="sidebar">
                    <div class="p-6 border-b border-gray-200" style="background: linear-gradient(135deg, var(--uc-blue) 0%, var(--uc-blue-dark) 100%);">
                        <h1 class="text-xl font-bold text-white">CapTrack</h1>
                        <p class="text-sm" style="color: var(--uc-gold-light);">${userRole === 'faculty' ? 'Faculty Portal' : 'Student Portal'}</p>
                    </div>
                    <nav class="sidebar-nav">
                        <ul class="space-y-2">
                            ${navItems.map(item => `
                                <li>
                                    <button onclick="app.setView('${item.id}')" 
                                            class="${currentView === item.id ? 'active' : ''}">
                                        <i data-lucide="${item.icon}"></i>
                                        ${item.label}
                                    </button>
                                </li>
                            `).join('')}
                        </ul>
                    </nav>
                    <div class="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200 bg-white">
                        <div class="flex items-center justify-between">
                            <div class="min-w-0 flex-1">
                                <p class="text-sm font-medium text-gray-900 truncate">${user?.name}</p>
                                <p class="text-xs text-gray-600 truncate">${user?.email}</p>
                            </div>
                            <button onclick="auth.logout()" 
                                    class="ml-3 text-gray-400 hover-text-gray-600 transition-colors flex-shrink-0"
                                    title="Logout">
                                <i data-lucide="log-out" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="layout-content" id="main-content"></div>
            </div>
        `;
    }

    // Dashboard Overview Component
    static dashboardOverview(userRole) {
        if (userRole === 'student') {
            const project = mockData.studentProject;
            const completedMilestones = project.milestones.filter(m => m.status === 'completed').length;
            const totalMilestones = project.milestones.length;
            const recentFeedback = mockData.studentFeedback.slice(0, 2);

            return `
                <div class="p-6">
                    <div class="container">
                        <h1 class="text-2xl font-bold text-gray-900 mb-8">Student Dashboard</h1>
                        
                        <!-- Stats Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="card p-6">
                                <div class="flex items-center">
                                    <div class="p-3 rounded-full bg-blue-100 mr-4" style="color: var(--uc-blue);">
                                        <i data-lucide="folder" class="w-6 h-6"></i>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-600">Project Status</p>
                                        <p class="text-2xl font-bold text-gray-900">${project.status}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card p-6">
                                <div class="flex items-center">
                                    <div class="p-3 rounded-full bg-gold-100 mr-4" style="color: var(--uc-gold);">
                                        <i data-lucide="target" class="w-6 h-6"></i>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-600">Progress</p>
                                        <p class="text-2xl font-bold text-gray-900">${project.progress}%</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card p-6">
                                <div class="flex items-center">
                                    <div class="p-3 rounded-full bg-blue-100 mr-4" style="color: var(--uc-blue-dark);">
                                        <i data-lucide="check-circle" class="w-6 h-6"></i>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-600">Milestones</p>
                                        <p class="text-2xl font-bold text-gray-900">${completedMilestones}/${totalMilestones}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Project Overview -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div class="card p-6">
                                <h2 class="text-lg font-semibold text-gray-900 mb-4">Current Project</h2>
                                <div class="space-y-4">
                                    <div>
                                        <h3 class="font-medium text-gray-900">${project.title}</h3>
                                        <p class="text-sm text-gray-600 mt-1">${project.description}</p>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span class="text-gray-600">Advisor:</span>
                                            <span class="font-medium block">${project.advisor}</span>
                                        </div>
                                        <div>
                                            <span class="text-gray-600">Due Date:</span>
                                            <span class="font-medium block">${new Date(project.dueDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between text-sm mb-2">
                                            <span class="text-gray-600">Progress</span>
                                            <span class="font-medium">${project.progress}%</span>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-bar" style="width: ${project.progress}%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card p-6">
                                <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h2>
                                <div class="space-y-4">
                                    ${recentFeedback.map(feedback => `
                                        <div class="border-l-4 border-blue-500 pl-4 py-2">
                                            <div class="flex justify-between items-start mb-1">
                                                <h4 class="font-medium text-sm text-gray-900">${feedback.title}</h4>
                                                <span class="text-xs text-gray-500">${new Date(feedback.date).toLocaleDateString()}</span>
                                            </div>
                                            <p class="text-sm text-gray-600 line-clamp-2">${feedback.content}</p>
                                        </div>
                                    `).join('')}
                                    <button onclick="app.setView('feedback')" 
                                            class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                        View all feedback →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Faculty dashboard
            const submissions = mockData.facultySubmissions;
            const pendingCount = submissions.filter(s => s.status === 'pending').length;
            const reviewedCount = submissions.filter(s => s.status === 'reviewed').length;

            return `
                <div class="p-6">
                    <div class="container">
                        <h1 class="text-2xl font-bold text-gray-900 mb-8">Faculty Dashboard</h1>
                        
                        <!-- Stats Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="card p-6">
                                <div class="flex items-center">
                                    <div class="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                                        <i data-lucide="clock" class="w-6 h-6"></i>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-600">Pending Reviews</p>
                                        <p class="text-2xl font-bold text-gray-900">${pendingCount}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card p-6">
                                <div class="flex items-center">
                                    <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                                        <i data-lucide="check-circle" class="w-6 h-6"></i>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-600">Reviewed</p>
                                        <p class="text-2xl font-bold text-gray-900">${reviewedCount}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card p-6">
                                <div class="flex items-center">
                                    <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                                        <i data-lucide="users" class="w-6 h-6"></i>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-600">Total Students</p>
                                        <p class="text-2xl font-bold text-gray-900">${submissions.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Recent Submissions -->
                        <div class="card">
                            <div class="p-6 border-b border-gray-200">
                                <h2 class="text-lg font-semibold text-gray-900">Recent Submissions</h2>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Student</th>
                                            <th>Project</th>
                                            <th>Type</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${submissions.slice(0, 5).map(submission => `
                                            <tr>
                                                <td>
                                                    <div>
                                                        <div class="text-sm font-medium text-gray-900">${submission.studentName}</div>
                                                        <div class="text-sm text-gray-500">${submission.studentEmail}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="text-sm text-gray-900 max-w-xs truncate">${submission.projectTitle}</div>
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
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                            <div class="p-4 border-t border-gray-200">
                                <button onclick="app.setView('submissions')" 
                                        class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    View all submissions →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Navigation header for individual pages
    static pageHeader(title, showBackButton = true) {
        const user = auth.getCurrentUser();
        const dashboardText = user?.role === 'faculty' ? 'Faculty Dashboard' : 'Student Dashboard';
        
        return `
            <div class="bg-white border-b border-gray-200 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        ${showBackButton ? `
                            <button onclick="app.setView('dashboard')" 
                                    class="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                                <i data-lucide="arrow-left" class="w-5 h-5 mr-2"></i>
                                Back to ${dashboardText}
                            </button>
                            <div class="h-6 w-px bg-gray-300"></div>
                        ` : ''}
                        <h1 class="text-xl font-semibold text-gray-900">${title}</h1>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="text-sm text-gray-600">${user?.name}</span>
                        <button onclick="auth.logout()" 
                                class="text-gray-400 hover:text-gray-600 transition-colors"
                                title="Logout">
                            <i data-lucide="log-out" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Student project detail view
    static projectView() {
        const project = mockData.studentProject;
        
        return `
            ${Components.pageHeader('My Project')}
            <div class="p-6">
                <div class="container max-w-4xl">
                    <div class="card p-6 mb-6">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex-1">
                                <h2 class="text-xl font-semibold text-gray-900 mb-2">${project.title}</h2>
                                <p class="text-gray-600">${project.description}</p>
                            </div>
                            <span class="badge badge-info ml-4">
                                ${project.status}
                            </span>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-600 mb-1">Advisor</label>
                                <p class="text-gray-900">${project.advisor}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-600 mb-1">Due Date</label>
                                <p class="text-gray-900">${new Date(project.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-600 mb-1">Last Update</label>
                                <p class="text-gray-900">${new Date(project.lastUpdate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="flex justify-between text-sm mb-2">
                                <span class="font-medium text-gray-600">Overall Progress</span>
                                <span class="font-medium text-gray-900">${project.progress}%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar transition-all duration-300" 
                                     style="width: ${project.progress}%"></div>
                            </div>
                        </div>
                    </div>

                    <div class="card p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Milestones</h3>
                        <div class="space-y-4">
                            ${project.milestones.map(milestone => `
                                <div class="flex items-center space-x-4 p-4 border rounded-lg ${
                                    milestone.status === 'completed' ? 'bg-green-50 border-green-200' :
                                    milestone.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                                    'bg-gray-50 border-gray-200'
                                }">
                                    <div class="flex-shrink-0">
                                        <div class="w-8 h-8 rounded-full flex items-center justify-center ${
                                            milestone.status === 'completed' ? 'bg-green-100 text-green-600' :
                                            milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                                            'bg-gray-100 text-gray-400'
                                        }">
                                            <i data-lucide="${
                                                milestone.status === 'completed' ? 'check' :
                                                milestone.status === 'in-progress' ? 'clock' :
                                                'circle'
                                            }" class="w-4 h-4"></i>
                                        </div>
                                    </div>
                                    <div class="flex-grow">
                                        <div class="flex justify-between items-center">
                                            <h4 class="font-medium text-gray-900">${milestone.title}</h4>
                                            <div class="flex items-center space-x-2">
                                                <span class="text-sm text-gray-600">Due: ${new Date(milestone.dueDate).toLocaleDateString()}</span>
                                                <span class="badge ${
                                                    milestone.status === 'completed' ? 'badge-success' :
                                                    milestone.status === 'in-progress' ? 'badge-info' :
                                                    'badge-secondary'
                                                }">
                                                    ${milestone.status.replace('-', ' ')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Feedback page
    static feedbackPage() {
        const user = auth.getCurrentUser();
        const isStudent = user?.role === 'student';
        
        if (isStudent) {
            return `
                ${Components.pageHeader('Feedback')}
                <div class="p-6">
                    <div class="container max-w-4xl">
                        <div class="space-y-6">
                            ${mockData.studentFeedback.map(feedback => `
                                <div class="card p-6">
                                    <div class="flex justify-between items-start mb-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <i data-lucide="user" class="w-4 h-4 text-blue-600"></i>
                                            </div>
                                            <div>
                                                <h3 class="font-semibold text-gray-900">${feedback.title}</h3>
                                                <p class="text-sm text-gray-600">From ${feedback.type}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <span class="text-sm text-gray-500">${new Date(feedback.date).toLocaleDateString()}</span>
                                            ${feedback.status === 'unread' ? '<span class="w-2 h-2 bg-blue-600 rounded-full"></span>' : ''}
                                        </div>
                                    </div>
                                    <div class="prose prose-sm max-w-none">
                                        <p class="text-gray-700">${feedback.content}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Faculty feedback interface
            return `
                ${Components.pageHeader('Provide Feedback')}
                <div class="p-6">
                    <div class="container max-w-4xl">
                        <div class="card p-6">
                            <h2 class="text-lg font-semibold text-gray-900 mb-6">Student Feedback Center</h2>
                            
                            <form class="space-y-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                                    <select class="form-select">
                                        <option>John Student - AI-Powered Student Management System</option>
                                        <option>Jane Doe - Blockchain-based Voting System</option>
                                        <option>Bob Smith - IoT Home Automation</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
                                    <select class="form-select">
                                        <option>General Feedback</option>
                                        <option>Project Proposal Review</option>
                                        <option>Mid-term Progress Review</option>
                                        <option>Final Review</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Feedback Content</label>
                                    <textarea rows="8" 
                                              class="form-textarea"
                                              placeholder="Enter your feedback here..."></textarea>
                                </div>

                                <div class="flex justify-end space-x-3">
                                    <button type="button" class="btn btn-secondary">
                                        Save Draft
                                    </button>
                                    <button type="submit" class="btn btn-primary">
                                        Send Feedback
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Upload page
    static uploadPage() {
        return `
            ${Components.pageHeader('Upload Submission')}
            <div class="p-6">
                <div class="container max-w-4xl">
                    <div class="card p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-6">Submit Your Work</h2>
                        
                        <form class="space-y-6" id="upload-form">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Submission Type</label>
                                <select class="form-select">
                                    <option>Project Proposal</option>
                                    <option>Literature Review</option>
                                    <option>System Design</option>
                                    <option>Implementation</option>
                                    <option>Final Report</option>
                                    <option>Presentation</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input type="text" 
                                       class="form-input"
                                       placeholder="Enter submission title">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea rows="4" 
                                          class="form-textarea"
                                          placeholder="Describe your submission"></textarea>
                            </div>

                            <!-- File Upload Area -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Files</label>
                                <div id="drop-zone" class="drop-zone">
                                    <div class="space-y-2">
                                        <i data-lucide="upload" class="w-12 h-12 text-gray-400 mx-auto block"></i>
                                        <div>
                                            <p class="text-lg font-medium text-gray-900">Drop files here or click to browse</p>
                                            <p class="text-sm text-gray-600">Supports PDF, DOC, DOCX, PPT, PPTX (Max 50MB)</p>
                                        </div>
                                    </div>
                                    <input type="file" class="hidden" id="file-input" multiple accept=".pdf,.doc,.docx,.ppt,.pptx">
                                </div>
                                
                                <div id="file-list" class="mt-4 space-y-2"></div>
                            </div>

                            <div class="flex justify-end space-x-3">
                                <button type="button" class="btn btn-secondary">
                                    Save Draft
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    // Repository page
    static repositoryPage() {
        return `
            ${Components.pageHeader('Project Repository')}
            <div class="p-6">
                <div class="container max-w-6xl">
                    <div class="card p-6 mb-6">
                        <div class="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
                            <h2 class="text-lg font-semibold text-gray-900">Browse Capstone Projects</h2>
                            <div class="flex gap-3">
                                <div class="relative">
                                    <input type="text" 
                                           id="search-input"
                                           placeholder="Search projects..." 
                                           class="form-input pl-10">
                                    <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                                </div>
                                <select id="category-filter" class="form-select">
                                    <option value="">All Categories</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Systems">Information Systems</option>
                                    <option value="Software Engineering">Software Engineering</option>
                                    <option value="Information Security">Information Security</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${mockData.repositoryProjects.map(project => `
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
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Faculty submissions view
    static submissionsPage() {
        return `
            ${Components.pageHeader('Student Submissions')}
            <div class="p-6">
                <div class="container max-w-6xl">
                    <div class="card">
                        <div class="p-6 border-b border-gray-200">
                            <div class="flex justify-between items-center">
                                <h2 class="text-lg font-semibold text-gray-900">All Submissions</h2>
                                <div class="flex space-x-3">
                                    <select id="status-filter" class="form-select text-sm">
                                        <option value="">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in-review">In Review</option>
                                        <option value="reviewed">Reviewed</option>
                                    </select>
                                    <select id="type-filter" class="form-select text-sm">
                                        <option value="">All Types</option>
                                        <option value="Project Proposal">Project Proposal</option>
                                        <option value="Literature Review">Literature Review</option>
                                        <option value="System Design">System Design</option>
                                        <option value="Implementation">Implementation</option>
                                        <option value="Final Report">Final Report</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="overflow-x-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Project Title</th>
                                        <th>Submission Type</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Grade</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="submissions-tbody">
                                    ${mockData.facultySubmissions.map(submission => `
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
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Settings page
    static settingsPage() {
        const user = auth.getCurrentUser();
        
        return `
            ${Components.pageHeader('Settings')}
            <div class="p-6">
                <div class="container max-w-4xl">
                    <div class="card p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-6">Account Settings</h2>
                        
                        <form class="space-y-6">
                            <div class="border-b border-gray-200 pb-6">
                                <h3 class="text-base font-medium text-gray-900 mb-4">Profile Information</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input type="text" value="${user?.name || ''}" 
                                               class="form-input">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input type="email" value="${user?.email || ''}" 
                                               class="form-input">
                                    </div>
                                </div>
                            </div>

                            <div class="border-b border-gray-200 pb-6">
                                <h3 class="text-base font-medium text-gray-900 mb-4">Notifications</h3>
                                <div class="space-y-4">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <label class="text-sm font-medium text-gray-900">Email Notifications</label>
                                            <p class="text-sm text-gray-600">Receive notifications via email</p>
                                        </div>
                                        <input type="checkbox" checked class="w-4 h-4 text-blue-600">
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <label class="text-sm font-medium text-gray-900">Feedback Alerts</label>
                                            <p class="text-sm text-gray-600">Get notified when you receive new feedback</p>
                                        </div>
                                        <input type="checkbox" checked class="w-4 h-4 text-blue-600">
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <label class="text-sm font-medium text-gray-900">Deadline Reminders</label>
                                            <p class="text-sm text-gray-600">Receive reminders for upcoming deadlines</p>
                                        </div>
                                        <input type="checkbox" checked class="w-4 h-4 text-blue-600">
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 class="text-base font-medium text-gray-900 mb-4">Security</h3>
                                <div class="space-y-4">
                                    <button type="button" class="btn btn-secondary">
                                        Change Password
                                    </button>
                                    <button type="button" class="btn btn-secondary">
                                        Download My Data
                                    </button>
                                </div>
                            </div>

                            <div class="flex justify-end space-x-3 pt-6">
                                <button type="button" class="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}