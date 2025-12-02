// Mock data for the CapTrack application
const mockData = {
    // Test user accounts for demo
    testAccounts: {
        'student@test.com': {
            id: '1',
            email: 'student@test.com',
            name: 'John Student',
            role: 'student'
        },
        'faculty@test.com': {
            id: '2',
            email: 'faculty@test.com',
            name: 'Dr. Faculty',
            role: 'faculty'
        }
    },

    // Student project data
    studentProject: {
        id: 'proj-001',
        title: 'AI-Powered Student Management System',
        description: 'A comprehensive web application for managing student records with AI-driven analytics and reporting capabilities.',
        status: 'In Progress',
        progress: 65,
        dueDate: '2024-05-15',
        lastUpdate: '2024-03-10',
        advisor: 'Dr. Faculty',
        milestones: [
            { id: 1, title: 'Project Proposal', status: 'completed', dueDate: '2024-01-15' },
            { id: 2, title: 'Literature Review', status: 'completed', dueDate: '2024-02-15' },
            { id: 3, title: 'System Design', status: 'in-progress', dueDate: '2024-03-15' },
            { id: 4, title: 'Implementation', status: 'pending', dueDate: '2024-04-15' },
            { id: 5, title: 'Testing & Documentation', status: 'pending', dueDate: '2024-05-01' },
            { id: 6, title: 'Final Presentation', status: 'pending', dueDate: '2024-05-15' }
        ]
    },

    // Student feedback data
    studentFeedback: [
        {
            id: 'fb-001',
            title: 'Project Proposal Review',
            content: 'Excellent proposal with clear objectives and methodology. Consider adding more detail about the AI algorithms you plan to implement. The timeline looks realistic, but ensure you allocate enough time for testing.',
            date: '2024-01-20',
            type: 'advisor',
            status: 'read'
        },
        {
            id: 'fb-002',
            title: 'Mid-term Progress Review',
            content: 'Good progress on the literature review. The system design looks promising. Please schedule a meeting to discuss the implementation timeline and potential challenges.',
            date: '2024-03-05',
            type: 'advisor',
            status: 'unread'
        },
        {
            id: 'fb-003',
            title: 'System Architecture Feedback',
            content: 'The proposed system architecture is well thought out. However, consider the scalability aspects and database optimization for handling large datasets.',
            date: '2024-02-28',
            type: 'advisor',
            status: 'read'
        }
    ],

    // Faculty submissions data
    facultySubmissions: [
        {
            id: 'sub-001',
            studentName: 'John Student',
            studentEmail: 'student@test.com',
            projectTitle: 'AI-Powered Student Management System',
            submissionType: 'Project Proposal',
            submissionDate: '2024-01-15',
            status: 'reviewed',
            grade: 'A'
        },
        {
            id: 'sub-002',
            studentName: 'Jane Doe',
            studentEmail: 'jane@test.com',
            projectTitle: 'Blockchain-based Voting System',
            submissionType: 'Literature Review',
            submissionDate: '2024-02-10',
            status: 'pending',
            grade: null
        },
        {
            id: 'sub-003',
            studentName: 'Bob Smith',
            studentEmail: 'bob@test.com',
            projectTitle: 'IoT Home Automation',
            submissionType: 'System Design',
            submissionDate: '2024-03-01',
            status: 'in-review',
            grade: null
        },
        {
            id: 'sub-004',
            studentName: 'Alice Johnson',
            studentEmail: 'alice@test.com',
            projectTitle: 'Machine Learning Recommendation Engine',
            submissionType: 'Implementation',
            submissionDate: '2024-03-08',
            status: 'pending',
            grade: null
        },
        {
            id: 'sub-005',
            studentName: 'David Chen',
            studentEmail: 'david@test.com',
            projectTitle: 'Mobile Health Monitoring App',
            submissionType: 'Final Report',
            submissionDate: '2024-02-25',
            status: 'reviewed',
            grade: 'B+'
        }
    ],

    // Repository projects
    repositoryProjects: [
        {
            id: 'repo-001',
            title: 'Machine Learning Recommendation Engine',
            author: 'Alice Johnson',
            year: '2023',
            category: 'Computer Science',
            description: 'A sophisticated recommendation system using collaborative filtering and deep learning techniques to provide personalized content suggestions.',
            tags: ['Machine Learning', 'Python', 'TensorFlow', 'Recommendation Systems', 'Deep Learning']
        },
        {
            id: 'repo-002',
            title: 'Blockchain-based Supply Chain Management',
            author: 'David Chen',
            year: '2023',
            category: 'Information Systems',
            description: 'A decentralized supply chain tracking system built on Ethereum blockchain to ensure transparency and traceability.',
            tags: ['Blockchain', 'Ethereum', 'Supply Chain', 'Smart Contracts', 'Solidity']
        },
        {
            id: 'repo-003',
            title: 'Mobile Health Monitoring Application',
            author: 'Sarah Williams',
            year: '2022',
            category: 'Software Engineering',
            description: 'A cross-platform mobile app for real-time health monitoring and data visualization with IoT device integration.',
            tags: ['Mobile Development', 'React Native', 'Healthcare', 'IoT', 'Data Visualization']
        },
        {
            id: 'repo-004',
            title: 'AI-Powered Code Review Tool',
            author: 'Michael Brown',
            year: '2023',
            category: 'Computer Science',
            description: 'An automated code review system using natural language processing and static analysis to improve code quality.',
            tags: ['AI', 'Code Analysis', 'NLP', 'Software Quality', 'Static Analysis']
        },
        {
            id: 'repo-005',
            title: 'Virtual Reality Training Simulator',
            author: 'Emma Davis',
            year: '2022',
            category: 'Computer Science',
            description: 'An immersive VR training platform for medical procedures with haptic feedback and performance analytics.',
            tags: ['Virtual Reality', 'Unity', 'Medical Training', 'Haptic Feedback', 'Simulation']
        },
        {
            id: 'repo-006',
            title: 'Cybersecurity Threat Detection System',
            author: 'James Wilson',
            year: '2023',
            category: 'Information Security',
            description: 'A real-time network monitoring system using machine learning to detect and prevent cybersecurity threats.',
            tags: ['Cybersecurity', 'Machine Learning', 'Network Security', 'Threat Detection', 'Python']
        }
    ]
};