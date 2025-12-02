import { User, Project, Submission, Feedback, Upload, SystemStats, UserActivity, SystemSetting, RepositoryFile } from '../types';
export { mockSystemSettings } from './comprehensive-system-settings';

export const mockUsers: User[] = [
  // Students
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@university.edu',
    role: 'student',
    studentId: 'ST001',
    department: 'Computer Science'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.johnson@university.edu',
    role: 'student',
    studentId: 'ST002',
    department: 'Computer Science'
  },
  {
    id: '6',
    name: 'Alex Rivera',
    email: 'alex.rivera@uc.edu.ph',
    role: 'student',
    studentId: 'ST003',
    department: 'Information Technology'
  },
  {
    id: '7',
    name: 'Jessica Chen',
    email: 'jessica.chen@uc.edu.ph',
    role: 'student',
    studentId: 'ST004',
    department: 'Computer Science'
  },
  {
    id: '8',
    name: 'David Martinez',
    email: 'david.martinez@uc.edu.ph',
    role: 'student',
    studentId: 'ST005',
    department: 'Information Systems'
  },
  {
    id: '9',
    name: 'Sophie Williams',
    email: 'sophie.williams@uc.edu.ph',
    role: 'student',
    studentId: 'ST006',
    department: 'Computer Science'
  },
  {
    id: '10',
    name: 'Carlos Reyes',
    email: 'carlos.reyes@uc.edu.ph',
    role: 'student',
    studentId: 'ST007',
    department: 'Information Technology'
  },
  {
    id: '11',
    name: 'Maya Patel',
    email: 'maya.patel@uc.edu.ph',
    role: 'student',
    studentId: 'ST008',
    department: 'Computer Science'
  },
  {
    id: '12',
    name: 'Ryan O\'Connor',
    email: 'ryan.oconnor@uc.edu.ph',
    role: 'student',
    studentId: 'ST009',
    department: 'Information Systems'
  },
  {
    id: '13',
    name: 'Isabella Torres',
    email: 'isabella.torres@uc.edu.ph',
    role: 'student',
    studentId: 'ST010',
    department: 'Computer Science'
  },
  {
    id: '14',
    name: 'Kevin Zhang',
    email: 'kevin.zhang@uc.edu.ph',
    role: 'student',
    studentId: 'ST011',
    department: 'Information Technology'
  },
  {
    id: '15',
    name: 'Liana Garcia',
    email: 'liana.garcia@uc.edu.ph',
    role: 'student',
    studentId: 'ST012',
    department: 'Computer Science'
  },
  
  // Faculty
  {
    id: '3',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    role: 'faculty',
    department: 'Computer Science'
  },
  {
    id: '4',
    name: 'Prof. Michael Brown',
    email: 'michael.brown@university.edu',
    role: 'faculty',
    department: 'Computer Science'
  },
  {
    id: '16',
    name: 'Dr. Patricia Lee',
    email: 'patricia.lee@uc.edu.ph',
    role: 'faculty',
    department: 'Information Technology'
  },
  {
    id: '17',
    name: 'Prof. Robert Kim',
    email: 'robert.kim@uc.edu.ph',
    role: 'faculty',
    department: 'Information Systems'
  },
  {
    id: '18',
    name: 'Dr. Amanda Rodriguez',
    email: 'amanda.rodriguez@uc.edu.ph',
    role: 'faculty',
    department: 'Computer Science'
  },
  {
    id: '19',
    name: 'Prof. James Taylor',
    email: 'james.taylor@uc.edu.ph',
    role: 'faculty',
    department: 'Information Technology'
  },
  {
    id: '20',
    name: 'Dr. Michelle Davis',
    email: 'michelle.davis@uc.edu.ph',
    role: 'faculty',
    department: 'Computer Science'
  },
  
  // Admins
  {
    id: '5',
    name: 'Maria Santos',
    email: 'maria.santos@uc.edu.ph',
    role: 'admin',
    department: 'IT Administration',
    permissions: ['user_management', 'system_settings', 'reports', 'data_export']
  },
  {
    id: '21',
    name: 'Admin User',
    email: 'admin@uc.edu.ph',
    role: 'admin',
    department: 'System Administration',
    permissions: ['user_management', 'system_settings', 'reports', 'data_export']
  }
];

// Test accounts for role-based login
export const testAccounts = {
  student: {
    email: 'student@uc.edu.ph',
    password: 'student123',
    userData: {
      id: '1',
      name: 'John Smith',
      email: 'student@uc.edu.ph',
      role: 'student' as const,
      studentId: 'ST001',
      department: 'Computer Science'
    }
  },
  faculty: {
    email: 'faculty@uc.edu.ph', 
    password: 'faculty123',
    userData: {
      id: '3',
      name: 'Dr. Sarah Wilson',
      email: 'faculty@uc.edu.ph',
      role: 'faculty' as const,
      department: 'Computer Science'
    }
  },
  admin: {
    email: 'admin@uc.edu.ph',
    password: 'admin123', 
    userData: {
      id: '5',
      name: 'Maria Santos',
      email: 'admin@uc.edu.ph',
      role: 'admin' as const,
      department: 'IT Administration',
      permissions: ['user_management', 'system_settings', 'reports', 'data_export']
    }
  }
};

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    title: 'AI-Powered Task Management System',
    description: 'A web application that uses machine learning to optimize task scheduling and prioritization.',
    studentId: '1',
    studentName: 'John Smith',
    status: 'in-progress',
    progress: 65,
    createdAt: '2024-09-01',
    updatedAt: '2024-12-01',
    advisorId: '3',
    advisorName: 'Dr. Sarah Wilson'
  },
  {
    id: 'proj2',
    title: 'Blockchain-Based Voting Platform',
    description: 'A secure voting system using blockchain technology to ensure transparency and immutability.',
    studentId: '2',
    studentName: 'Emily Johnson',
    status: 'planning',
    progress: 25,
    createdAt: '2024-09-15',
    updatedAt: '2024-11-28',
    advisorId: '4',
    advisorName: 'Prof. Michael Brown'
  },
  {
    id: 'proj3',
    title: 'Smart Campus IoT System',
    description: 'An Internet of Things platform for monitoring and controlling campus facilities, including lighting, temperature, and security systems.',
    studentId: '6',
    studentName: 'Alex Rivera',
    status: 'completed',
    progress: 100,
    createdAt: '2024-02-15',
    updatedAt: '2024-11-30',
    advisorId: '16',
    advisorName: 'Dr. Patricia Lee'
  },
  {
    id: 'proj4',
    title: 'E-Learning Platform with AR Integration',
    description: 'An educational platform that incorporates augmented reality to enhance student learning experiences.',
    studentId: '7',
    studentName: 'Jessica Chen',
    status: 'in-progress',
    progress: 78,
    createdAt: '2024-08-20',
    updatedAt: '2024-12-08',
    advisorId: '3',
    advisorName: 'Dr. Sarah Wilson'
  },
  {
    id: 'proj5',
    title: 'Healthcare Data Analytics Dashboard',
    description: 'A comprehensive dashboard for analyzing patient data and providing insights to healthcare professionals.',
    studentId: '8',
    studentName: 'David Martinez',
    status: 'in-progress',
    progress: 45,
    createdAt: '2024-09-10',
    updatedAt: '2024-12-05',
    advisorId: '17',
    advisorName: 'Prof. Robert Kim'
  },
  {
    id: 'proj6',
    title: 'Mobile Banking Security Framework',
    description: 'A security framework for mobile banking applications with multi-factor authentication and fraud detection.',
    studentId: '9',
    studentName: 'Sophie Williams',
    status: 'planning',
    progress: 15,
    createdAt: '2024-10-01',
    updatedAt: '2024-11-25',
    advisorId: '18',
    advisorName: 'Dr. Amanda Rodriguez'
  },
  {
    id: 'proj7',
    title: 'Social Media Sentiment Analysis Tool',
    description: 'A machine learning tool that analyzes social media posts to determine public sentiment on various topics.',
    studentId: '10',
    studentName: 'Carlos Reyes',
    status: 'completed',
    progress: 100,
    createdAt: '2024-01-20',
    updatedAt: '2024-10-15',
    advisorId: '19',
    advisorName: 'Prof. James Taylor'
  },
  {
    id: 'proj8',
    title: 'Virtual Reality Training Simulator',
    description: 'A VR application for training medical students in surgical procedures and emergency response.',
    studentId: '11',
    studentName: 'Maya Patel',
    status: 'in-progress',
    progress: 82,
    createdAt: '2024-07-05',
    updatedAt: '2024-12-10',
    advisorId: '20',
    advisorName: 'Dr. Michelle Davis'
  },
  {
    id: 'proj9',
    title: 'Supply Chain Management System',
    description: 'An enterprise system for tracking and optimizing supply chain operations with real-time analytics.',
    studentId: '12',
    studentName: 'Ryan O\'Connor',
    status: 'in-progress',
    progress: 35,
    createdAt: '2024-09-25',
    updatedAt: '2024-12-02',
    advisorId: '17',
    advisorName: 'Prof. Robert Kim'
  },
  {
    id: 'proj10',
    title: 'Cybersecurity Threat Detection AI',
    description: 'An artificial intelligence system for detecting and preventing cybersecurity threats in real-time.',
    studentId: '13',
    studentName: 'Isabella Torres',
    status: 'planning',
    progress: 20,
    createdAt: '2024-10-15',
    updatedAt: '2024-12-01',
    advisorId: '18',
    advisorName: 'Dr. Amanda Rodriguez'
  },
  {
    id: 'proj11',
    title: 'Sustainable Energy Monitoring Platform',
    description: 'A platform for monitoring and optimizing renewable energy usage in smart buildings.',
    studentId: '14',
    studentName: 'Kevin Zhang',
    status: 'in-progress',
    progress: 55,
    createdAt: '2024-08-30',
    updatedAt: '2024-12-07',
    advisorId: '16',
    advisorName: 'Dr. Patricia Lee'
  },
  {
    id: 'proj12',
    title: 'Digital Art Authentication System',
    description: 'A blockchain-based system for authenticating and tracking digital artwork ownership.',
    studentId: '15',
    studentName: 'Liana Garcia',
    status: 'completed',
    progress: 100,
    createdAt: '2024-03-10',
    updatedAt: '2024-11-20',
    advisorId: '4',
    advisorName: 'Prof. Michael Brown'
  }
];

export const mockSubmissions: Submission[] = [
  {
    id: 'sub1',
    projectId: 'proj1',
    projectTitle: 'AI-Powered Task Management System',
    studentName: 'John Smith',
    studentId: 'ST001',
    submittedAt: '2024-11-25',
    fileUrl: '/mock-files/project1-report.pdf',
    fileName: 'Midterm Report - AI Task Management.pdf',
    status: 'reviewed',
    grade: 85
  },
  {
    id: 'sub2',
    projectId: 'proj2',
    projectTitle: 'Blockchain-Based Voting Platform',
    studentName: 'Emily Johnson',
    studentId: 'ST002',
    submittedAt: '2024-11-28',
    fileUrl: '/mock-files/project2-proposal.pdf',
    fileName: 'Project Proposal - Blockchain Voting.pdf',
    status: 'pending'
  },
  {
    id: 'sub3',
    projectId: 'proj3',
    projectTitle: 'Smart Campus IoT System',
    studentName: 'Alex Rivera',
    studentId: 'ST003',
    submittedAt: '2024-11-30',
    fileUrl: '/mock-files/project3-final.pdf',
    fileName: 'Final Report - Smart Campus IoT.pdf',
    status: 'reviewed',
    grade: 92
  },
  {
    id: 'sub4',
    projectId: 'proj4',
    projectTitle: 'E-Learning Platform with AR Integration',
    studentName: 'Jessica Chen',
    studentId: 'ST004',
    submittedAt: '2024-12-08',
    fileUrl: '/mock-files/project4-progress.pdf',
    fileName: 'Progress Report - AR E-Learning.pdf',
    status: 'pending'
  },
  {
    id: 'sub5',
    projectId: 'proj5',
    projectTitle: 'Healthcare Data Analytics Dashboard',
    studentName: 'David Martinez',
    studentId: 'ST005',
    submittedAt: '2024-12-05',
    fileUrl: '/mock-files/project5-midterm.pdf',
    fileName: 'Midterm Report - Healthcare Analytics.pdf',
    status: 'reviewed',
    grade: 78
  },
  {
    id: 'sub6',
    projectId: 'proj6',
    projectTitle: 'Mobile Banking Security Framework',
    studentName: 'Sophie Williams',
    studentId: 'ST006',
    submittedAt: '2024-11-25',
    fileUrl: '/mock-files/project6-proposal.pdf',
    fileName: 'Project Proposal - Banking Security.pdf',
    status: 'reviewed',
    grade: 88
  },
  {
    id: 'sub7',
    projectId: 'proj7',
    projectTitle: 'Social Media Sentiment Analysis Tool',
    studentName: 'Carlos Reyes',
    studentId: 'ST007',
    submittedAt: '2024-10-15',
    fileUrl: '/mock-files/project7-final.pdf',
    fileName: 'Final Report - Sentiment Analysis.pdf',
    status: 'reviewed',
    grade: 95
  },
  {
    id: 'sub8',
    projectId: 'proj8',
    projectTitle: 'Virtual Reality Training Simulator',
    studentName: 'Maya Patel',
    studentId: 'ST008',
    submittedAt: '2024-12-10',
    fileUrl: '/mock-files/project8-demo.pdf',
    fileName: 'Demo Report - VR Training.pdf',
    status: 'pending'
  },
  {
    id: 'sub9',
    projectId: 'proj9',
    projectTitle: 'Supply Chain Management System',
    studentName: 'Ryan O\'Connor',
    studentId: 'ST009',
    submittedAt: '2024-12-02',
    fileUrl: '/mock-files/project9-progress.pdf',
    fileName: 'Progress Report - Supply Chain.pdf',
    status: 'reviewed',
    grade: 82
  },
  {
    id: 'sub10',
    projectId: 'proj10',
    projectTitle: 'Cybersecurity Threat Detection AI',
    studentName: 'Isabella Torres',
    studentId: 'ST010',
    submittedAt: '2024-12-01',
    fileUrl: '/mock-files/project10-proposal.pdf',
    fileName: 'Project Proposal - AI Security.pdf',
    status: 'pending'
  },
  {
    id: 'sub11',
    projectId: 'proj11',
    projectTitle: 'Sustainable Energy Monitoring Platform',
    studentName: 'Kevin Zhang',
    studentId: 'ST011',
    submittedAt: '2024-12-07',
    fileUrl: '/mock-files/project11-midterm.pdf',
    fileName: 'Midterm Report - Energy Monitoring.pdf',
    status: 'reviewed',
    grade: 86
  },
  {
    id: 'sub12',
    projectId: 'proj12',
    projectTitle: 'Digital Art Authentication System',
    studentName: 'Liana Garcia',
    studentId: 'ST012',
    submittedAt: '2024-11-20',
    fileUrl: '/mock-files/project12-final.pdf',
    fileName: 'Final Report - Digital Art Auth.pdf',
    status: 'reviewed',
    grade: 90
  },
  {
    id: 'sub13',
    projectId: 'proj1',
    projectTitle: 'AI-Powered Task Management System',
    studentName: 'John Smith',
    studentId: 'ST001',
    submittedAt: '2024-10-15',
    fileUrl: '/mock-files/project1-proposal.pdf',
    fileName: 'Project Proposal - AI Task Management.pdf',
    status: 'reviewed',
    grade: 88
  },
  {
    id: 'sub14',
    projectId: 'proj4',
    projectTitle: 'E-Learning Platform with AR Integration',
    studentName: 'Jessica Chen',
    studentId: 'ST004',
    submittedAt: '2024-10-30',
    fileUrl: '/mock-files/project4-midterm.pdf',
    fileName: 'Midterm Report - AR E-Learning.pdf',
    status: 'reviewed',
    grade: 84
  },
  {
    id: 'sub15',
    projectId: 'proj8',
    projectTitle: 'Virtual Reality Training Simulator',
    studentName: 'Maya Patel',
    studentId: 'ST008',
    submittedAt: '2024-09-20',
    fileUrl: '/mock-files/project8-prototype.pdf',
    fileName: 'Prototype Report - VR Training.pdf',
    status: 'reviewed',
    grade: 89
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: 'fb1',
    projectId: 'proj1',
    submissionId: 'sub1',
    fromUserId: '3',
    fromUserName: 'Dr. Sarah Wilson',
    toUserId: '1',
    content: 'Great progress on the AI implementation. Consider adding more detailed error handling in your machine learning pipeline. The user interface design is intuitive and well-structured.',
    type: 'submission',
    createdAt: '2024-11-26',
    isRead: false
  },
  {
    id: 'fb2',
    projectId: 'proj2',
    fromUserId: '4',
    fromUserName: 'Prof. Michael Brown',
    toUserId: '2',
    content: 'Your blockchain architecture looks solid. Please provide more details on the consensus mechanism you plan to implement. Also, consider the scalability implications.',
    type: 'general',
    createdAt: '2024-11-29',
    isRead: true
  },
  {
    id: 'fb3',
    projectId: 'proj3',
    submissionId: 'sub3',
    fromUserId: '16',
    fromUserName: 'Dr. Patricia Lee',
    toUserId: '6',
    content: 'Excellent work on the IoT integration! Your sensor data analysis is comprehensive and the real-time monitoring dashboard is very impressive. Consider adding predictive maintenance features.',
    type: 'submission',
    createdAt: '2024-12-01',
    isRead: true
  },
  {
    id: 'fb4',
    projectId: 'proj4',
    submissionId: 'sub4',
    fromUserId: '3',
    fromUserName: 'Dr. Sarah Wilson',
    toUserId: '7',
    content: 'The AR integration shows great potential. Your learning module design is innovative. Please ensure proper testing across different devices and consider accessibility features.',
    type: 'submission',
    createdAt: '2024-12-09',
    isRead: false
  },
  {
    id: 'fb5',
    projectId: 'proj5',
    submissionId: 'sub5',
    fromUserId: '17',
    fromUserName: 'Prof. Robert Kim',
    toUserId: '8',
    content: 'Good progress on the analytics dashboard. The data visualization is clear and informative. Consider implementing more advanced statistical analysis and machine learning predictions.',
    type: 'submission',
    createdAt: '2024-12-06',
    isRead: true
  },
  {
    id: 'fb6',
    projectId: 'proj6',
    submissionId: 'sub6',
    fromUserId: '18',
    fromUserName: 'Dr. Amanda Rodriguez',
    toUserId: '9',
    content: 'Strong security framework design. Your multi-factor authentication approach is well thought out. Please include more detailed threat modeling and penetration testing results.',
    type: 'submission',
    createdAt: '2024-11-26',
    isRead: false
  },
  {
    id: 'fb7',
    projectId: 'proj7',
    submissionId: 'sub7',
    fromUserId: '19',
    fromUserName: 'Prof. James Taylor',
    toUserId: '10',
    content: 'Outstanding sentiment analysis implementation! Your natural language processing model shows excellent accuracy. The real-time analysis feature is particularly impressive.',
    type: 'submission',
    createdAt: '2024-10-16',
    isRead: true
  },
  {
    id: 'fb8',
    projectId: 'proj8',
    submissionId: 'sub8',
    fromUserId: '20',
    fromUserName: 'Dr. Michelle Davis',
    toUserId: '11',
    content: 'The VR training simulator is very well designed. The medical procedures are accurately represented. Consider adding haptic feedback and performance analytics for trainees.',
    type: 'submission',
    createdAt: '2024-12-11',
    isRead: false
  },
  {
    id: 'fb9',
    projectId: 'proj9',
    submissionId: 'sub9',
    fromUserId: '17',
    fromUserName: 'Prof. Robert Kim',
    toUserId: '12',
    content: 'Good progress on the supply chain system. The tracking functionality is robust. Please add more detailed cost optimization features and inventory forecasting.',
    type: 'submission',
    createdAt: '2024-12-03',
    isRead: true
  },
  {
    id: 'fb10',
    projectId: 'proj10',
    submissionId: 'sub10',
    fromUserId: '18',
    fromUserName: 'Dr. Amanda Rodriguez',
    toUserId: '13',
    content: 'Promising AI security approach. Your threat detection algorithms show good potential. Include more diverse attack scenarios and improve false positive reduction.',
    type: 'submission',
    createdAt: '2024-12-02',
    isRead: false
  },
  {
    id: 'fb11',
    projectId: 'proj11',
    submissionId: 'sub11',
    fromUserId: '16',
    fromUserName: 'Dr. Patricia Lee',
    toUserId: '14',
    content: 'Excellent energy monitoring platform! Your renewable energy optimization algorithms are innovative. Consider adding carbon footprint tracking and cost-benefit analysis.',
    type: 'submission',
    createdAt: '2024-12-08',
    isRead: true
  },
  {
    id: 'fb12',
    projectId: 'proj12',
    submissionId: 'sub12',
    fromUserId: '4',
    fromUserName: 'Prof. Michael Brown',
    toUserId: '15',
    content: 'Brilliant blockchain implementation for digital art authentication! Your smart contract design is elegant and secure. The provenance tracking feature is particularly valuable.',
    type: 'submission',
    createdAt: '2024-11-21',
    isRead: true
  },
  {
    id: 'fb13',
    projectId: 'proj1',
    fromUserId: '3',
    fromUserName: 'Dr. Sarah Wilson',
    toUserId: '1',
    content: 'Please schedule a meeting to discuss the next phase of your project. We need to review the machine learning model performance and discuss implementation challenges.',
    type: 'general',
    createdAt: '2024-12-10',
    isRead: false
  },
  {
    id: 'fb14',
    projectId: 'proj4',
    fromUserId: '3',
    fromUserName: 'Dr. Sarah Wilson',
    toUserId: '7',
    content: 'Your literature review is comprehensive. Please focus more on the technical implementation details in your next submission.',
    type: 'general',
    createdAt: '2024-11-15',
    isRead: true
  },
  {
    id: 'fb15',
    projectId: 'proj8',
    fromUserId: '20',
    fromUserName: 'Dr. Michelle Davis',
    toUserId: '11',
    content: 'Great work on the user interface design. The VR experience is immersive and educational. Consider adding assessment features to track learning progress.',
    type: 'general',
    createdAt: '2024-11-28',
    isRead: false
  },
  {
    id: 'fb16',
    projectId: 'proj5',
    fromUserId: '17',
    fromUserName: 'Prof. Robert Kim',
    toUserId: '8',
    content: 'Your data preprocessing pipeline needs improvement. Please ensure proper data validation and cleaning procedures are implemented.',
    type: 'general',
    createdAt: '2024-11-20',
    isRead: true
  },
  {
    id: 'fb17',
    projectId: 'proj11',
    fromUserId: '16',
    fromUserName: 'Dr. Patricia Lee',
    toUserId: '14',
    content: 'The sustainability metrics you\'ve chosen are excellent. Your environmental impact analysis is thorough and well-researched.',
    type: 'general',
    createdAt: '2024-12-05',
    isRead: false
  },
  {
    id: 'fb18',
    projectId: 'proj6',
    fromUserId: '18',
    fromUserName: 'Dr. Amanda Rodriguez',
    toUserId: '9',
    content: 'Please review the latest security guidelines published by NIST. Your framework should align with current industry standards.',
    type: 'general',
    createdAt: '2024-12-04',
    isRead: true
  },
  {
    id: 'fb19',
    projectId: 'proj9',
    fromUserId: '17',
    fromUserName: 'Prof. Robert Kim',
    toUserId: '12',
    content: 'Consider integrating with existing ERP systems for better compatibility. Your API design should follow RESTful principles.',
    type: 'general',
    createdAt: '2024-11-30',
    isRead: false
  },
  {
    id: 'fb20',
    projectId: 'proj10',
    fromUserId: '18',
    fromUserName: 'Dr. Amanda Rodriguez',
    toUserId: '13',
    content: 'Your research methodology is solid. Please include more recent cybersecurity threat intelligence in your analysis.',
    type: 'general',
    createdAt: '2024-11-25',
    isRead: true
  }
];

export const mockUploads: Upload[] = [
  // Project 1 uploads
  {
    id: 'up1',
    projectId: 'proj1',
    fileName: 'requirements-analysis.docx',
    fileSize: 2048576,
    uploadedAt: '2024-10-15',
    uploadedBy: 'John Smith',
    type: 'document'
  },
  {
    id: 'up2',
    projectId: 'proj1',
    fileName: 'ui-mockups.zip',
    fileSize: 5242880,
    uploadedAt: '2024-11-10',
    uploadedBy: 'John Smith',
    type: 'other'
  },
  {
    id: 'up28',
    projectId: 'proj1',
    fileName: 'database-design.pdf',
    fileSize: 1842170,
    uploadedAt: '2024-11-15',
    uploadedBy: 'John Smith',
    type: 'document'
  },
  {
    id: 'up29',
    projectId: 'proj1',
    fileName: 'ml-algorithms-code.zip',
    fileSize: 15728640,
    uploadedAt: '2024-11-20',
    uploadedBy: 'John Smith',
    type: 'code'
  },
  {
    id: 'up30',
    projectId: 'proj1',
    fileName: 'user-testing-results.xlsx',
    fileSize: 3145728,
    uploadedAt: '2024-12-05',
    uploadedBy: 'John Smith',
    type: 'other'
  },

  // Project 2 uploads
  {
    id: 'up3',
    projectId: 'proj2',
    fileName: 'blockchain-research.pdf',
    fileSize: 1572864,
    uploadedAt: '2024-10-20',
    uploadedBy: 'Emily Johnson',
    type: 'document'
  },
  {
    id: 'up31',
    projectId: 'proj2',
    fileName: 'smart-contracts.sol',
    fileSize: 524288,
    uploadedAt: '2024-11-12',
    uploadedBy: 'Emily Johnson',
    type: 'code'
  },
  {
    id: 'up32',
    projectId: 'proj2',
    fileName: 'voting-system-demo.mp4',
    fileSize: 52428800,
    uploadedAt: '2024-11-25',
    uploadedBy: 'Emily Johnson',
    type: 'video'
  },

  // Project 3 uploads
  {
    id: 'up4',
    projectId: 'proj3',
    fileName: 'iot-sensor-data.csv',
    fileSize: 8388608,
    uploadedAt: '2024-09-15',
    uploadedBy: 'Alex Rivera',
    type: 'data'
  },
  {
    id: 'up5',
    projectId: 'proj3',
    fileName: 'campus-layout-diagram.png',
    fileSize: 4194304,
    uploadedAt: '2024-10-01',
    uploadedBy: 'Alex Rivera',
    type: 'image'
  },
  {
    id: 'up33',
    projectId: 'proj3',
    fileName: 'system-architecture.pdf',
    fileSize: 2621440,
    uploadedAt: '2024-10-20',
    uploadedBy: 'Alex Rivera',
    type: 'document'
  },
  {
    id: 'up34',
    projectId: 'proj3',
    fileName: 'final-presentation.pptx',
    fileSize: 12582912,
    uploadedAt: '2024-11-28',
    uploadedBy: 'Alex Rivera',
    type: 'presentation'
  },

  // Additional uploads for other projects...
  {
    id: 'up6',
    projectId: 'proj4',
    fileName: 'ar-learning-modules.zip',
    fileSize: 25165824,
    uploadedAt: '2024-09-30',
    uploadedBy: 'Jessica Chen',
    type: 'other'
  },
  {
    id: 'up7',
    projectId: 'proj4',
    fileName: 'user-interface-designs.fig',
    fileSize: 6291456,
    uploadedAt: '2024-10-25',
    uploadedBy: 'Jessica Chen',
    type: 'design'
  },
  {
    id: 'up8',
    projectId: 'proj5',
    fileName: 'healthcare-dataset.csv',
    fileSize: 16777216,
    uploadedAt: '2024-10-05',
    uploadedBy: 'David Martinez',
    type: 'data'
  },
  {
    id: 'up9',
    projectId: 'proj5',
    fileName: 'dashboard-wireframes.pdf',
    fileSize: 3145728,
    uploadedAt: '2024-10-30',
    uploadedBy: 'David Martinez',
    type: 'document'
  },
  {
    id: 'up10',
    projectId: 'proj6',
    fileName: 'security-audit-report.pdf',
    fileSize: 4194304,
    uploadedAt: '2024-11-05',
    uploadedBy: 'Sophie Williams',
    type: 'document'
  }
];

// Mock stats for system overview
export const mockSystemStats: SystemStats = {
  totalUsers: 21,
  totalProjects: 12,
  totalSubmissions: 15,
  totalFeedback: 20,
  activeProjects: 8,
  completedProjects: 4,
  pendingSubmissions: 5,
  totalUploads: 45,
  activeUsers: 18,
  totalStorage: 125
};

// Mock user activity for analytics
export const mockUserActivities: UserActivity[] = [
  {
    id: 'act1',
    userId: '1',
    userName: 'John Smith',
    action: 'submitted',
    resourceType: 'submission',
    resourceId: 'sub1',
    timestamp: '2024-11-25T10:30:00Z',
    details: 'Submitted Midterm Report - AI Task Management.pdf'
  },
  {
    id: 'act2',
    userId: '3',
    userName: 'Dr. Sarah Wilson',
    action: 'reviewed',
    resourceType: 'submission',
    resourceId: 'sub1',
    timestamp: '2024-11-26T14:15:00Z',
    details: 'Reviewed and graded submission'
  },
  {
    id: 'act3',
    userId: '2',
    userName: 'Emily Johnson',
    action: 'uploaded',
    resourceType: 'file',
    resourceId: 'up3',
    timestamp: '2024-10-20T09:45:00Z',
    details: 'Uploaded blockchain-research.pdf'
  },
  {
    id: 'act4',
    userId: '6',
    userName: 'Alex Rivera',
    action: 'completed',
    resourceType: 'project',
    resourceId: 'proj3',
    timestamp: '2024-11-30T16:20:00Z',
    details: 'Completed Smart Campus IoT System project'
  },
  {
    id: 'act5',
    userId: '7',
    userName: 'Jessica Chen',
    action: 'updated',
    resourceType: 'project',
    resourceId: 'proj4',
    timestamp: '2024-12-08T11:30:00Z',
    details: 'Updated project progress to 78%'
  }
];

// Mock repository files for document management
export const mockRepositoryFiles: RepositoryFile[] = [
  {
    id: 'repo1',
    name: 'Project Guidelines 2024.pdf',
    size: 2048576,
    type: 'document',
    uploadedAt: '2024-01-15',
    uploadedBy: 'System Admin',
    category: 'guidelines',
    description: 'Official capstone project guidelines for 2024 academic year',
    downloadCount: 156,
    isPublic: true
  },
  {
    id: 'repo2',
    name: 'Research Methodology Template.docx',
    size: 1572864,
    type: 'template',
    uploadedAt: '2024-02-01',
    uploadedBy: 'Dr. Sarah Wilson',
    category: 'templates',
    description: 'Standard template for research methodology sections',
    downloadCount: 89,
    isPublic: true
  },
  {
    id: 'repo3',
    name: 'Presentation Format Guidelines.pptx',
    size: 3145728,
    type: 'presentation',
    uploadedAt: '2024-02-15',
    uploadedBy: 'Prof. Michael Brown',
    category: 'guidelines',
    description: 'Standard format for capstone project presentations',
    downloadCount: 134,
    isPublic: true
  },
  {
    id: 'repo4',
    name: 'Ethics Review Checklist.pdf',
    size: 1048576,
    type: 'document',
    uploadedAt: '2024-03-01',
    uploadedBy: 'Dr. Patricia Lee',
    category: 'forms',
    description: 'Required ethics review checklist for research projects',
    downloadCount: 67,
    isPublic: true
  },
  {
    id: 'repo5',
    name: 'Data Collection Agreement Form.pdf',
    size: 524288,
    type: 'form',
    uploadedAt: '2024-03-15',
    uploadedBy: 'System Admin',
    category: 'forms',
    description: 'Legal agreement form for data collection activities',
    downloadCount: 45,
    isPublic: true
  },
  {
    id: 'repo6',
    name: 'Bibliography Style Guide.pdf',
    size: 1048576,
    type: 'document',
    uploadedAt: '2024-04-01',
    uploadedBy: 'Prof. Robert Kim',
    category: 'guidelines',
    description: 'Standard bibliography and citation style guide',
    downloadCount: 78,
    isPublic: true
  },
  {
    id: 'repo7',
    name: 'Project Proposal Template.docx',
    size: 2097152,
    type: 'template',
    uploadedAt: '2024-04-15',
    uploadedBy: 'Dr. Amanda Rodriguez',
    category: 'templates',
    description: 'Standard template for project proposals',
    downloadCount: 112,
    isPublic: true
  },
  {
    id: 'repo8',
    name: 'Code Documentation Standards.pdf',
    size: 1572864,
    type: 'document',
    uploadedAt: '2024-05-01',
    uploadedBy: 'Prof. James Taylor',
    category: 'guidelines',
    description: 'Standards for documenting source code in projects',
    downloadCount: 56,
    isPublic: true
  },
  {
    id: 'repo9',
    name: 'Final Report Template.docx',
    size: 3670016,
    type: 'template',
    uploadedAt: '2024-05-15',
    uploadedBy: 'Dr. Michelle Davis',
    category: 'templates',
    description: 'Comprehensive template for final project reports',
    downloadCount: 145,
    isPublic: true
  },
  {
    id: 'repo10',
    name: 'Peer Review Form.pdf',
    size: 786432,
    type: 'form',
    uploadedAt: '2024-06-01',
    uploadedBy: 'System Admin',
    category: 'forms',
    description: 'Form for conducting peer reviews of project work',
    downloadCount: 34,
    isPublic: true
  }
];