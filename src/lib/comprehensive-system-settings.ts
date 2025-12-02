import { SystemSetting } from '../types';

export const mockSystemSettings: SystemSetting[] = [
  // Upload Settings
  {
    id: 'upload_max_size',
    key: 'upload.max_file_size',
    description: 'Maximum file upload size (MB)',
    value: '50',
    category: 'uploads'
  },
  {
    id: 'upload_types',
    key: 'upload.allowed_file_types', 
    description: 'Allowed file types',
    value: 'pdf,docx,pptx,xlsx,zip,jpg,png,mp4,avi',
    category: 'uploads'
  },
  {
    id: 'storage_enabled',
    key: 'storage.cloud_storage_enabled',
    description: 'Enable cloud storage backup',
    value: 'true',
    category: 'uploads'
  },
  {
    id: 'upload_retention',
    key: 'upload.retention_days',
    description: 'File retention period (days)',
    value: '365',
    category: 'uploads'
  },
  {
    id: 'virus_scan',
    key: 'upload.virus_scan_enabled',
    description: 'Enable virus scanning for uploads',
    value: 'true',
    category: 'uploads'
  },
  {
    id: 'concurrent_uploads',
    key: 'upload.max_concurrent_uploads',
    description: 'Maximum concurrent uploads per user',
    value: '3',
    category: 'uploads'
  },
  {
    id: 'upload_compression',
    key: 'upload.auto_compression_enabled',
    description: 'Enable automatic file compression',
    value: 'false',
    category: 'uploads'
  },

  // Submission Settings
  {
    id: 'submission_deadline',
    key: 'submissions.default_deadline_days',
    description: 'Default submission deadline (days)',
    value: '14',
    category: 'submissions'
  },
  {
    id: 'late_penalty',
    key: 'submissions.late_penalty_percent',
    description: 'Late submission penalty (%)',
    value: '10',
    category: 'submissions'
  },
  {
    id: 'auto_reminder',
    key: 'submissions.auto_reminder_enabled',
    description: 'Enable automatic submission reminders',
    value: 'true',
    category: 'submissions'
  },
  {
    id: 'reminder_frequency',
    key: 'submissions.reminder_days_before',
    description: 'Send reminder days before deadline',
    value: '3',
    category: 'submissions'
  },
  {
    id: 'max_submissions',
    key: 'submissions.max_submissions_per_assignment',
    description: 'Maximum submissions per assignment',
    value: '5',
    category: 'submissions'
  },
  {
    id: 'versioning_enabled',
    key: 'submissions.version_control_enabled',
    description: 'Enable submission version control',
    value: 'true',
    category: 'submissions'
  },
  {
    id: 'auto_grading',
    key: 'submissions.auto_grading_enabled',
    description: 'Enable automatic grading',
    value: 'false',
    category: 'submissions'
  },
  {
    id: 'plagiarism_check',
    key: 'submissions.plagiarism_check_enabled',
    description: 'Enable plagiarism detection',
    value: 'true',
    category: 'submissions'
  },

  // System Settings
  {
    id: 'maintenance_mode',
    key: 'system.maintenance_mode',
    description: 'Enable maintenance mode',
    value: 'false',
    category: 'system'
  },
  {
    id: 'backup_frequency',
    key: 'system.backup_frequency_hours',
    description: 'Database backup frequency (hours)',
    value: '24',
    category: 'system'
  },
  {
    id: 'session_timeout',
    key: 'system.session_timeout_minutes',
    description: 'User session timeout (minutes)',
    value: '120',
    category: 'system'
  },
  {
    id: 'system_name',
    key: 'system.application_name',
    description: 'System application name',
    value: 'CapTrack - UC Philippines',
    category: 'system'
  },
  {
    id: 'max_users',
    key: 'system.max_concurrent_users',
    description: 'Maximum concurrent users',
    value: '500',
    category: 'system'
  },
  {
    id: 'cache_enabled',
    key: 'system.cache_enabled',
    description: 'Enable system caching',
    value: 'true',
    category: 'system'
  },
  {
    id: 'debug_mode',
    key: 'system.debug_mode_enabled',
    description: 'Enable debug mode',
    value: 'false',
    category: 'system'
  },
  {
    id: 'analytics_enabled',
    key: 'system.analytics_tracking_enabled',
    description: 'Enable analytics tracking',
    value: 'true',
    category: 'system'
  },
  {
    id: 'api_rate_limit',
    key: 'system.api_rate_limit_per_minute',
    description: 'API rate limit per minute',
    value: '100',
    category: 'system'
  },

  // Notification Settings
  {
    id: 'email_notifications',
    key: 'notifications.email_enabled',
    description: 'Enable email notifications',
    value: 'true',
    category: 'notifications'
  },
  {
    id: 'sms_notifications',
    key: 'notifications.sms_enabled',
    description: 'Enable SMS notifications',
    value: 'false',
    category: 'notifications'
  },
  {
    id: 'push_notifications',
    key: 'notifications.push_enabled',
    description: 'Enable push notifications',
    value: 'true',
    category: 'notifications'
  },
  {
    id: 'notification_frequency',
    key: 'notifications.digest_frequency_hours',
    description: 'Notification digest frequency (hours)',
    value: '24',
    category: 'notifications'
  },
  {
    id: 'faculty_notifications',
    key: 'notifications.faculty_auto_notify',
    description: 'Auto-notify faculty of new submissions',
    value: 'true',
    category: 'notifications'
  },
  {
    id: 'student_notifications',
    key: 'notifications.student_auto_notify',
    description: 'Auto-notify students of feedback',
    value: 'true',
    category: 'notifications'
  },
  {
    id: 'email_templates',
    key: 'notifications.custom_email_templates',
    description: 'Enable custom email templates',
    value: 'true',
    category: 'notifications'
  },
  {
    id: 'notification_priority',
    key: 'notifications.priority_filtering_enabled',
    description: 'Enable notification priority filtering',
    value: 'true',
    category: 'notifications'
  },

  // Security Settings
  {
    id: 'password_policy',
    key: 'security.min_password_length',
    description: 'Minimum password length',
    value: '8',
    category: 'security'
  },
  {
    id: 'login_attempts',
    key: 'security.max_login_attempts',
    description: 'Maximum login attempts before lockout',
    value: '5',
    category: 'security'
  },
  {
    id: 'two_factor_auth',
    key: 'security.two_factor_auth_enabled',
    description: 'Enable two-factor authentication',
    value: 'false',
    category: 'security'
  },
  {
    id: 'password_complexity',
    key: 'security.password_complexity_required',
    description: 'Require complex passwords',
    value: 'true',
    category: 'security'
  },
  {
    id: 'account_lockout',
    key: 'security.account_lockout_minutes',
    description: 'Account lockout duration (minutes)',
    value: '30',
    category: 'security'
  },
  {
    id: 'password_expiry',
    key: 'security.password_expiry_days',
    description: 'Password expiry period (days)',
    value: '90',
    category: 'security'
  },
  {
    id: 'ssl_required',
    key: 'security.ssl_required',
    description: 'Require SSL/HTTPS connections',
    value: 'true',
    category: 'security'
  },
  {
    id: 'ip_whitelist',
    key: 'security.ip_whitelist_enabled',
    description: 'Enable IP address whitelisting',
    value: 'false',
    category: 'security'
  },
  {
    id: 'audit_logging',
    key: 'security.audit_logging_enabled',
    description: 'Enable security audit logging',
    value: 'true',
    category: 'security'
  },
  {
    id: 'session_encryption',
    key: 'security.session_encryption_enabled',
    description: 'Enable session data encryption',
    value: 'true',
    category: 'security'
  },

  // Communication Settings
  {
    id: 'chat_enabled',
    key: 'communication.chat_enabled',
    description: 'Enable real-time chat',
    value: 'true',
    category: 'communication'
  },
  {
    id: 'video_calls',
    key: 'communication.video_calls_enabled',
    description: 'Enable video calling',
    value: 'false',
    category: 'communication'
  },
  {
    id: 'file_sharing',
    key: 'communication.file_sharing_enabled',
    description: 'Enable file sharing in messages',
    value: 'true',
    category: 'communication'
  },
  {
    id: 'message_retention',
    key: 'communication.message_retention_days',
    description: 'Message retention period (days)',
    value: '365',
    category: 'communication'
  },
  {
    id: 'broadcast_messages',
    key: 'communication.broadcast_enabled',
    description: 'Enable broadcast messages',
    value: 'true',
    category: 'communication'
  },

  // Grading Settings
  {
    id: 'grading_scale',
    key: 'grading.default_scale',
    description: 'Default grading scale',
    value: '100',
    category: 'grading'
  },
  {
    id: 'passing_grade',
    key: 'grading.minimum_passing_grade',
    description: 'Minimum passing grade',
    value: '70',
    category: 'grading'
  },
  {
    id: 'grade_visibility',
    key: 'grading.student_grade_visibility',
    description: 'Allow students to see grades immediately',
    value: 'true',
    category: 'grading'
  },
  {
    id: 'rubric_required',
    key: 'grading.rubric_required',
    description: 'Require grading rubrics',
    value: 'false',
    category: 'grading'
  },
  {
    id: 'grade_statistics',
    key: 'grading.statistics_enabled',
    description: 'Enable grade statistics',
    value: 'true',
    category: 'grading'
  },

  // Reporting Settings
  {
    id: 'reports_enabled',
    key: 'reporting.advanced_reports_enabled',
    description: 'Enable advanced reporting',
    value: 'true',
    category: 'reporting'
  },
  {
    id: 'export_formats',
    key: 'reporting.export_formats',
    description: 'Available export formats',
    value: 'pdf,xlsx,csv',
    category: 'reporting'
  },
  {
    id: 'scheduled_reports',
    key: 'reporting.scheduled_reports_enabled',
    description: 'Enable scheduled reports',
    value: 'true',
    category: 'reporting'
  },
  {
    id: 'data_retention',
    key: 'reporting.data_retention_years',
    description: 'Report data retention (years)',
    value: '7',
    category: 'reporting'
  },

  // Integration Settings
  {
    id: 'ldap_integration',
    key: 'integration.ldap_enabled',
    description: 'Enable LDAP authentication',
    value: 'false',
    category: 'integration'
  },
  {
    id: 'google_drive',
    key: 'integration.google_drive_enabled',
    description: 'Enable Google Drive integration',
    value: 'false',
    category: 'integration'
  },
  {
    id: 'microsoft_365',
    key: 'integration.microsoft_365_enabled',
    description: 'Enable Microsoft 365 integration',
    value: 'false',
    category: 'integration'
  },
  {
    id: 'lms_integration',
    key: 'integration.lms_sync_enabled',
    description: 'Enable LMS synchronization',
    value: 'false',
    category: 'integration'
  },
  {
    id: 'calendar_sync',
    key: 'integration.calendar_sync_enabled',
    description: 'Enable calendar synchronization',
    value: 'true',
    category: 'integration'
  },

  // Mobile Settings
  {
    id: 'mobile_app',
    key: 'mobile.app_enabled',
    description: 'Enable mobile application',
    value: 'true',
    category: 'mobile'
  },
  {
    id: 'offline_sync',
    key: 'mobile.offline_sync_enabled',
    description: 'Enable offline synchronization',
    value: 'true',
    category: 'mobile'
  },
  {
    id: 'push_notifications_mobile',
    key: 'mobile.push_notifications_enabled',
    description: 'Enable mobile push notifications',
    value: 'true',
    category: 'mobile'
  },
  {
    id: 'biometric_auth',
    key: 'mobile.biometric_auth_enabled',
    description: 'Enable biometric authentication',
    value: 'false',
    category: 'mobile'
  }
];