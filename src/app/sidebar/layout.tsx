"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accessibility,
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Badge,
  BadgePercent,
  Banknote,
  Bell,
  Bolt,
  Book,
  BookOpenCheck,
  BookUser,
  BrainCircuit,
  Briefcase,
  Building,
  Cable,
  Calendar,
  CalendarCheck,
  CalendarDays,
  ChartNoAxesColumn,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  CircleUser,
  CircleUserRound,
  Clock,
  Component,
  CreditCard,
  DollarSign,
  Download,
  Edit,
  File,
  FileBadge,
  FilePlus,
  FileText,
  FileType,
  FlaskConical,
  FolderSync,
  Forklift,
  Globe,
  GraduationCap,
  HardDrive,
  Home,
  Hotel,
  HousePlus,
  IdCard,
  Image,
  Images,
  Inbox,
  Languages,
  Library,
  List,
  Lock,
  Logs,
  Mail,
  Map,
  Menu,
  MessageSquare,
  NotebookPen,
  Package,
  PanelTop,
  Percent,
  Phone,
  PlusCircle,
  Presentation,
  Printer,
  Projector,
  Route,
  ScanQrCode,
  Scroll,
  Search,
  Settings,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  SquareArrowOutUpRight,
  SquareChartGantt,
  SquarePercent,
  SquarePlay,
  Star,
  Tag,
  Trello,
  Trash2,
  Truck,
  Undo2,
  Ungroup,
  Upload,
  User,
  UserPen,
  Users,
  Utensils,
  WalletCards,
  Wifi,
  Zap,
} from "lucide-react";

interface MenuItem {
  title: string;
  icon: string;
  path?: string;
  subItems?: MenuItem[];
}

const iconMap = {
  Accessibility: Accessibility,
  "alert-circle": AlertCircle,
  "alert-triangle": AlertTriangle,
  "arrow-right": ArrowRight,
  award: FileBadge,
  badge: Badge,
  BadgePercent: BadgePercent,
  Banknote: Banknote,
  barcode: ScanQrCode,
  bell: Bell,
  Bolt: Bolt,
  book: Book,
  BookOpenCheck: BookOpenCheck,
  BookUser: BookUser,
  BrainCircuit: BrainCircuit,
  briefcase: Briefcase,
  building: Building,
  Cable: Cable,
  calendar: CalendarDays,
  calendar_check: CalendarCheck,
  ChartNoAxesColumn: ChartNoAxesColumn,
  ChartNoAxesCombined: ChartNoAxesCombined,
  Check: Check,
  "chevron-down": ChevronDown,
  CircleUser: CircleUser,
  CircleUserRound: CircleUserRound,
  clock: Clock,
  Component: Component,
  "credit-card": CreditCard,
  "dollar-sign": DollarSign,
  Download: Download,
  "file-plus": FilePlus,
  "file-text": FileText,
  FileType: FileType,
  flask: FlaskConical,
  Folder_Sync: FolderSync,
  Forklift: Forklift,
  globe: Globe,
  "graduation-cap": GraduationCap,
  home: Home,
  hotel: Hotel,
  HousePlus: HousePlus,
  "id-card": IdCard,
  IdCard: IdCard,
  Image: Image,
  Images: Images,
  Library: Library,
  link: Home,
  list: List,
  Logs: Logs,
  mail: Mail,
  Map: Map,
  menu: Menu,
  "message-square": MessageSquare,
  NotebookPen: NotebookPen,
  package: Package,
  PanelTop: PanelTop,
  percent: Percent,
  Percent: Percent,
  phone: Phone,
  Phone: Phone,
  "plus-circle": PlusCircle,
  Presentation: Presentation,
  Printer: Printer,
  Projector: Projector,
  Route: Route,
  ScrollText: Scroll,
  search: Search,
  settings: Settings,
  Settings2: Settings2,
  ShieldCheck: ShieldCheck,
  "shopping-bag": ShoppingBag,
  SquareArrowOutUpRight: SquareArrowOutUpRight,
  SquareChartGantt: SquareChartGantt,
  SquarePercent: SquarePercent,
  SquarePlay: SquarePlay,
  Star: Star,
  tag: Tag,
  trash2: Trash2,
  truck: Truck,
  Undo2: Undo2,
  Ungroup: Ungroup,
  Upload: Upload,
  user: User,
  UserPen: UserPen,
  users: Users,
  utensils: Utensils,
  WalletCards: WalletCards,
  wifi: Wifi,
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const menuItems: MenuItem[] = [
    {
      title: "Current Seesions ",
      path: "/cureent-sessions",
      icon: "UserPen", // Using a generic icon for "Quick Links"
    },
    {
      title: "Quick Links",
      path: "/quick-links",
      icon: "SquareArrowOutUpRight", // Using a generic icon for "Quick Links"
    },
    {
      title: "Front Office",
      path: "/front-office",
      icon: "Projector", // Using "Home" icon as a placeholder for "Front Office"
      subItems: [
        { title: "Admission Enquiry", path: "/front-office/admission-enquiry", icon: "users" },
        { title: "Visitor Book", path: "/front-office/visitor-book", icon: "book" },
        { title: "Phone Call Log", path: "/front-office/phone-call-log", icon: "phone" },
        { title: "Postal Dispatch", path: "/front-office/postal-dispatch", icon: "mail" },
        { title: "Postal Receive", path: "/front-office/postal-receive", icon: "mail" },
        { title: "Complain", path: "/front-office/complain", icon: "message-square" },
        { title: "Setup Front Office", path: "/front-office/setup-front-office", icon: "settings" },
      ],
    },
    {
      title: "Student Information",
      path: "/student-information",
      icon: "users",
      subItems: [
        { title: "Student Details", path: "/student-information/student-details", icon: "user" },
        { title: "Student Admission", path: "/student-information/student-admission", icon: "file-plus" },
        { title: "Online Admission", path: "/student-information/online-admission", icon: "globe" },
        { title: "Disabled Students", path: "/student-information/disabled-students", icon: "Accessibility" },
        { title: "Multi Class Student", path: "/student-information/multi-class-student", icon: "users" },
        { title: "Bulk Delete", path: "/student-information/bulk-delete", icon: "trash2" },
        { title: "Student Categories", path: "/student-information/student-categories", icon: "list" },
        { title: "Student House", path: "/student-information/student-house", icon: "HousePlus" },
        { title: "Disable Reason", path: "/student-information/disable-reason", icon: "alert-triangle" },
        { title: "Student ID Cards", path: "/student-information/student-id-cards", icon: "id-card" },
      ],
    },
    {
      title: "Fees Collection",
      path: "/fees-collection",
      icon: "Banknote",
      subItems: [
        { title: "Collect Fees", path: "/fees-collection/collect-fees", icon: "plus-circle" },
        { title: "Search Fees Payment", path: "/fees-collection/search-fees-payment", icon: "search" },
        { title: "Search Due Fees", path: "/fees-collection/search-due-fees", icon: "alert-circle" },
        { title: "Fees Master", path: "/fees-collection/fees-master", icon: "file-text" },
        { title: "Fees Master College", path: "/fees-collection/fees-master-college", icon: "graduation-cap" },
        { title: "Fees Group", path: "/fees-collection/fees-group", icon: "users" },
        { title: "Fees Type", path: "/fees-collection/fees-type", icon: "list" },
        { title: "Bank Account", path: "/fees-collection/bank-account", icon: "credit-card" },
        { title: "Fees Category", path: "/fees-collection/fees-category", icon: "tag" },
        { title: "Fees Discount", path: "/fees-collection/fees-discount", icon: "percent" },
        { title: "Fees Carry Forward", path: "/fees-collection/fees-carry-forward", icon: "arrow-right" },
        { title: "Fees Reminder", path: "/fees-collection/fees-reminder", icon: "bell" },
      ],
    },
    {
      title: "Income",
      path: "/income",
      icon: "dollar-sign", // Using "dollar-sign" for the main "Income" category
      subItems: [
        { title: "Add Income", path: "/income/add-income", icon: "plus-circle" }, // Adding income
        { title: "Search Income", path: "/income/search-income", icon: "search" }, // Searching income
        { title: "Income Head", path: "/income/income-head", icon: "file-text" }, // Income categorization
      ],
    },
    {
      title: "Expenses",
      path: "/expenses",
      icon: "credit-card", // Using "credit-card" for the main "Expenses" category
      subItems: [
        { title: "Add Expense", path: "/expenses/add-expense", icon: "plus-circle" }, // Adding expense
        { title: "Search Expense", path: "/expenses/search-expense", icon: "search" }, // Searching expense
        { title: "Expense Head", path: "/expenses/expense-head", icon: "file-text" }, // Expense categorization
      ],
    },
    {
      title: "Attendance",
      path: "/attendance",
      icon: "calendar_check", // Using "calendar-check" for the main "Attendance" category
      subItems: [
        { title: "Student Attendance", path: "/attendance/student-attendance", icon: "users" }, // Attendance for students
        { title: "Scan ID For Attendance", path: "/attendance/scan-id-for-attendance", icon: "barcode" }, // Scanning ID
        { title: "Check-in & Check-out", path: "/attendance/check-in-check-out", icon: "clock" }, // Time tracking
        { title: "Attendance By Date", path: "/attendance/attendance-by-date", icon: "calendar" }, // Date-based attendance
        { title: "Approve Leave", path: "/attendance/approve-leave", icon: "Check" }, // Approving leave
      ],
    },
    {
      title: "Examinations",
      path: "/examinations",
      icon: "Map", // Using "book-open" for the main "Examinations" category
      subItems: [
        { title: "Exam Group", path: "/examinations/exam-group", icon: "users" }, // Grouping exams
        { title: "Exam Schedule", path: "/examinations/exam-schedule", icon: "calendar" }, // Scheduling exams
        { title: "Exam Result", path: "/examinations/exam-result", icon: "file-text" }, // Results
        { title: "Design Admit Card", path: "/examinations/design-admit-card", icon: "IdCard" }, // Designing admit cards
        { title: "Print Admit Card", path: "/examinations/print-admit-card", icon: "Printer" }, // Printing admit cards
        { title: "Design Marksheet", path: "/examinations/design-marksheet", icon: "SquarePercent" }, // Designing marksheets
        { title: "Print Marksheet", path: "/examinations/print-marksheet", icon: "Printer" }, // Printing marksheets
        { title: "Marks Grade", path: "/examinations/marks-grade", icon: "award" }, // Grading marks
      ],
    },
    {
      title: "Academic/Term Exam",
      path: "/academic-term-exam",
      icon: "book", // Using "book" for the main "Academic/Term Exam" category
      subItems: [
        {
          title: "Maharashtra Pattern",
          path: "/academic-term-exam/maharashtra-pattern",
          icon: "ScrollText",
          subItems: [ // Regional pattern
            { title: "Exams", path: "/academic-term-exam/exams", icon: "file-text" }, // General exams
            { title: "Marks Dist. Type", path: "/academic-term-exam/marks-dist-type", icon: "list" }, // Distribution type
            { title: "Marks Dist. Comp", path: "/academic-term-exam/marks-dist-comp", icon: "BrainCircuit" }, // Distribution comparison
            { title: "Subjectwise Remarks", path: "/academic-term-exam/subjectwise-remarks", icon: "Percent" }, // Remarks by subject
            { title: "Class Subjects Marks", path: "/academic-term-exam/class-subjects-marks", icon: "BookOpenCheck" }, // Marks by class/subject
            { title: "Component Marks", path: "/academic-term-exam/component-marks", icon: "BadgePercent" }, // Component-wise marks
            { title: "Score Card Comp", path: "/academic-term-exam/score-card-comp", icon: "award" }, // Score card comparison
          ],
        },
      ],
    },
    {
      title: "Online Examinations",
      path: "/online-examinations",
      icon: "wifi", // Using "wifi" for the main "Online Examinations" category (indicating online)
      subItems: [
        { title: "Online Exam", path: "/online-examinations/online-exam", icon: "file-text" }, // Online exam representation
        { title: "Question Bank", path: "/online-examinations/question-bank", icon: "book" }, // Question repository
      ],
    },
    {
      title: "Competitive Exam",
      path: "/competitive-exam",
      icon: "wifi", // Using "wifi" for the main "Competitive Exam" category (indicating online, consistent with "Online Examinations")
      subItems: [
        { title: "Competitive Exam", path: "/competitive-exam/competitive-exam", icon: "file-text" }, // Competitive exam representation
        { title: "Question Bank", path: "/competitive-exam/question-bank", icon: "book" }, // Question repository
      ],
    },
    {
      title: "Lesson Plan",
      path: "/lesson-plan",
      icon: "NotebookPen", // Using "book-open" for the main "Lesson Plan" category (indicating educational planning)
      subItems: [
        { title: "Manage Lesson Plan", path: "/lesson-plan/manage-lesson-plan", icon: "SquareChartGantt" }, // Managing plans
        { title: "Manage Syllabus Status", path: "/lesson-plan/manage-syllabus-status", icon: "ChartNoAxesColumn" }, // Status tracking
        { title: "Lesson", path: "/lesson-plan/lesson", icon: "book" }, // Individual lesson
        { title: "Topic", path: "/lesson-plan/topic", icon: "list" }, // Topics within lessons
        { title: "Add Log Lesson Plan", path: "/lesson-plan/add-log-lesson-plan", icon: "plus-circle" }, // Adding log
        { title: "Manage Log Lesson Plan", path: "/lesson-plan/manage-log-lesson-plan", icon: "file-text" }, // Managing logs
      ],
    },
    {
      title: "Academics",
      path: "/academics",
      icon: "graduation-cap", // Using "graduation-cap" for the main "Academics" category (indicating education)
      subItems: [
        { title: "Class Timetable", path: "/academics/class-timetable", icon: "calendar" }, // Timetable scheduling
        { title: "Teachers Timetable", path: "/academics/teachers-timetable", icon: "clock" }, // Teachers' schedule
        { title: "Assign Class Teacher", path: "/academics/assign-class-teacher", icon: "users" }, // Assigning teachers
        { title: "Assign Subject Teacher", path: "/academics/assign-subject-teacher", icon: "CircleUserRound" }, // Subject teacher assignment
        { title: "Promote Students", path: "/academics/promote-students", icon: "CircleUser" }, // Student promotion
        { title: "Subject Group", path: "/academics/subject-group", icon: "users" }, // Grouping subjects
        { title: "Subjects", path: "/academics/subjects", icon: "book" }, // Subject list
        { title: "Admission Committee", path: "/academics/admission-committee", icon: "users" }, // Committee management
        { title: "Course", path: "/academics/course", icon: "file-text" }, // Course management
        { title: "Class", path: "/academics/class", icon: "home" }, // Class management
        { title: "Sections", path: "/academics/sections", icon: "list" }, // Sections within classes
      ],
    },
    {
      title: "Human Resource",
      path: "/human-resource",
      icon: "users", // Using "users" for the main "Human Resource" category (indicating staff management)
      subItems: [
        { title: "Staff Directory", path: "/human-resource/staff-directory", icon: "user" }, // Staff list
        { title: "Staff Attendance", path: "/human-resource/staff-attendance", icon: "calendar" }, // Attendance tracking
        { title: "Payroll", path: "/human-resource/payroll", icon: "dollar-sign" }, // Payroll management
        { title: "Staff Loan", path: "/human-resource/staff-loan", icon: "credit-card" }, // Loan management
        { title: "Approve Leave Request", path: "/human-resource/approve-leave-request", icon: "Check" }, // Leave approval
        { title: "Apply Leave", path: "/human-resource/apply-leave", icon: "file-plus" }, // Leave application
        { title: "Leave Type", path: "/human-resource/leave-type", icon: "list" }, // Leave categories
        { title: "Teachers Rating", path: "/human-resource/teachers-rating", icon: "Star" }, // Rating system
        { title: "Department", path: "/human-resource/department", icon: "Ungroup" }, // Department management
        { title: "Designation", path: "/human-resource/designation", icon: "BookUser" }, // Role designation
        { title: "Disable Staff", path: "/human-resource/disable-staff", icon: "Accessibility" }, // Disable staff
      ],
    },
    {
      title: "Communicate",
      path: "/communicate",
      icon: "Phone", // Using "bell" for the main "Communicate" category (indicating notifications)
      subItems: [
        { title: "Notice Board", path: "/communicate/notice-board", icon: "Presentation" }, // Notice display
        { title: "Send Email", path: "/communicate/send-email", icon: "mail" }, // Email sending
        { title: "Send SMS", path: "/communicate/send-sms", icon: "message-square" }, // SMS sending
        { title: "Email / SMS Log", path: "/communicate/email-sms-log", icon: "file-text" }, // Log of communications
        { title: "Login Credentials Send", path: "/communicate/login-credentials-send", icon: "WalletCards" }, // Sending credentials
      ],
    },
    {
      title: "Download Center",
      path: "/download-center",
      icon: "Download", // Using "download" for the main "Download Center" category (indicating downloads)
      subItems: [
        { title: "Upload Content", path: "/download-center/upload-content", icon: "Upload" }, // Uploading content
        { title: "Assignments", path: "/download-center/assignments", icon: "file-text" }, // Assignment files
        { title: "Study Material", path: "/download-center/study-material", icon: "book" }, // Study resources
        { title: "Syllabus", path: "/download-center/syllabus", icon: "list" }, // Syllabus document
        { title: "Other Downloads", path: "/download-center/other-downloads", icon: "Download" }, // Miscellaneous downloads
      ],
    },
    {
      title: "Homework",
      path: "/homework",
      icon: "flask", // Using "flask" for the main "Homework" category (indicating learning/education)
      subItems: [
        { title: "Add Homework", path: "/homework/add-homework", icon: "plus-circle" }, // Adding homework
      ],
    },
    {
      title: "Library",
      path: "/library",
      icon: "Library", // Using "book" for the main "Library" category (indicating books/library)
      subItems: [
        { title: "Book List", path: "/library/book-list", icon: "list" }, // List of books
        { title: "Issue Return", path: "/library/issue-return", icon: "Undo2" }, // Book issuing/returning
        { title: "Add Student", path: "/library/add-student", icon: "users" }, // Adding student
        { title: "Add Staff Member", path: "/library/add-staff-member", icon: "CircleUserRound" }, // Adding staff
      ],
    },
    {
      title: "Poshak Aahar",
      path: "/poshak-aahar",
      icon: "utensils", // Using "utensils" for the main "Poshak Aahar" category (indicating food/nutrition)
      subItems: [
        { title: "Food Menu", path: "/poshak-aahar/food-menu", icon: "menu" }, // Food menu
        { title: "Food Setup", path: "/poshak-aahar/food-setup", icon: "settings" }, // Food configuration
        { title: "Item Supplier", path: "/poshak-aahar/item-supplier", icon: "truck" }, // Supplier management
        { title: "Item Category", path: "/poshak-aahar/item-category", icon: "tag" }, // Category management
        { title: "Add Item", path: "/poshak-aahar/add-item", icon: "plus-circle" }, // Adding items
        { title: "Item Store", path: "/poshak-aahar/item-store", icon: "shopping-bag" }, // Item storage
        { title: "Add Item Stock", path: "/poshak-aahar/add-item-stock", icon: "package" }, // Adding stock
      ],
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: "package", // Using "package" for the main "Inventory" category (indicating stock/items)
      subItems: [
        { title: "Issue Item", path: "/inventory/issue-item", icon: "rotate-ccw" }, // Issuing items
        { title: "Add Item Stock", path: "/inventory/add-item-stock", icon: "plus-circle" }, // Adding stock
        { title: "Add Item", path: "/inventory/add-item", icon: "plus-circle" }, // Adding items
        { title: "Item Category", path: "/inventory/item-category", icon: "tag" }, // Category management
        { title: "Item Store", path: "/inventory/item-store", icon: "shopping-bag" }, // Item storage
        { title: "Item Supplier", path: "/inventory/item-supplier", icon: "truck" }, // Supplier management
      ],
    },
    {
      title: "Transport",
      path: "/transport",
      icon: "Forklift", // Using "bus" for the main "Transport" category (indicating transportation)
      subItems: [
        { title: "Routes", path: "/transport/routes", icon: "Route" }, // Route management
        { title: "Vehicle", path: "/transport/vehicle", icon: "truck" }, // Vehicle management
        { title: "Assign Vehicle", path: "/transport/assign-vehicle", icon: "Cable" }, // Assigning vehicles
      ],
    },
    {
      title: "Hostel",
      path: "/hostel",
      icon: "hotel", // Using "hotel" for the main "Hostel" category (indicating accommodation)
      subItems: [
        { title: "Hostel Rooms", path: "/hostel/hostel-rooms", icon: "home" }, // Room management
        { title: "Room Type", path: "/hostel/room-type", icon: "list" }, // Room type categories
        { title: "Hostel", path: "/hostel/hostel", icon: "building" }, // Hostel management
      ],
    },
    {
      title: "Certificate",
      path: "/certificate",
      icon: "award", // Using "award" for the main "Certificate" category (indicating certifications)
      subItems: [
        { title: "Student Certificate", path: "/certificate/student-certificate", icon: "user" }, // Student certificate
        { title: "Registration Certificate", path: "/certificate/registration-certificate", icon: "file-text" }, // Registration document
        { title: "Generate Certificate", path: "/certificate/generate-certificate", icon: "Printer" }, // Certificate generation
        { title: "Student ID Card", path: "/certificate/student-id-card", icon: "id-card" }, // Student ID
        { title: "Income Tax Certificate", path: "/certificate/income-tax-certificate", icon: "dollar-sign" }, // Tax certificate
        { title: "Generate ID Card", path: "/certificate/generate-id-card", icon: "Printer" }, // ID card generation
        { title: "Staff ID Card", path: "/certificate/staff-id-card", icon: "id-card" }, // Staff ID
        { title: "Generate Staff ID Card", path: "/certificate/generate-staff-id-card", icon: "Printer" }, // Staff ID generation
      ],
    },
    {
      title: "Front CMS",
      path: "/front-cms",
      icon: "globe", // Using "globe" for the main "Front CMS" category (indicating web management)
      subItems: [
        { title: "Event", path: "/front-cms/event", icon: "calendar" }, // Event management
        { title: "Gallery", path: "/front-cms/gallery", icon: "Images" }, // Image gallery
        { title: "Notice", path: "/front-cms/notice", icon: "bell" }, // Notices
        { title: "Media Manager", path: "/front-cms/media-manager", icon: "SquarePlay" }, // Media management
        { title: "Page", path: "/front-cms/page", icon: "file-text" }, // Web pages
        { title: "Menus", path: "/front-cms/menus", icon: "menu" }, // Menu management
        { title: "Banner Images", path: "/front-cms/banner-images", icon: "Image" }, // Banner management
        { title: "Services", path: "/front-cms/services", icon: "briefcase" }, // Services offered
        { title: "Directors", path: "/front-cms/directors", icon: "users" }, // Directors list
        { title: "Teachers", path: "/front-cms/teachers", icon: "user" }, // Teachers list
        { title: "Testimonials", path: "/front-cms/testimonials", icon: "Star" }, // Testimonials
        { title: "Blogs", path: "/front-cms/blogs", icon: "Logs" }, // Blog posts
      ],
    },
    {
      title: "Alumni",
      path: "/alumni",
      icon: "users", // Using "users" for the main "Alumni" category (indicating a group of people)
      subItems: [
        { title: "Manage Alumni", path: "/alumni/manage-alumni", icon: "user" }, // Alumni management
        { title: "Events", path: "/alumni/events", icon: "calendar" }, // Alumni events
      ],
    },
    {
      title: "Reports",
      path: "/reports",
      icon: "ChartNoAxesCombined", // Using "bar-chart" for the main "Reports" category (indicating data analysis)
      subItems: [
        { title: "Student Information", path: "/reports/student-information", icon: "users" }, // Student data
        { title: "Finance", path: "/reports/finance", icon: "dollar-sign" }, // Financial reports
        { title: "Attendance", path: "/reports/attendance", icon: "calendar_check" }, // Attendance reports
        { title: "Examinations", path: "/reports/examinations", icon: "Map" }, // Exam reports
        { title: "Online Examinations", path: "/reports/online-examinations", icon: "wifi" }, // Online exam reports
        { title: "Lesson Plan", path: "/reports/lesson-plan", icon: "book" }, // Lesson plan reports
        { title: "Human Resource", path: "/reports/human-resource", icon: "users" }, // HR reports
        { title: "Library", path: "/reports/library", icon: "book" }, // Library reports
        { title: "Inventory", path: "/reports/inventory", icon: "package" }, // Inventory reports
        { title: "Transport", path: "/reports/transport", icon: "truck" }, // Transport reports
        { title: "Hostel", path: "/reports/hostel", icon: "hotel" }, // Hostel reports
        { title: "Alumni", path: "/reports/alumni", icon: "users" }, // Alumni reports
        { title: "User Log", path: "/reports/user-log", icon: "file-text" }, // User activity log
        { title: "Audit Trail Report", path: "/reports/audit-trail-report", icon: "list" }, // Audit trail
        { title: "Certificate", path: "/reports/certificate", icon: "award" }, // Certificate reports
      ],
    },
    {
      title: "System Settings",
      path: "/system-settings",
      icon: "settings", // Using "settings" for the main "System Settings" category (indicating configuration)
      subItems: [
        { title: "General Setting", path: "/system-settings/general-setting", icon: "Bolt" }, // General configurations
        { title: "School Timing", path: "/system-settings/school-timing", icon: "clock" }, // School schedule
        { title: "Session Setting", path: "/system-settings/session-setting", icon: "calendar" }, // Session management
        { title: "Notification Setting", path: "/system-settings/notification-setting", icon: "bell" }, // Notification config
        { title: "SMS Setting", path: "/system-settings/sms-setting", icon: "message-square" }, // SMS configuration
        { title: "Email Setting", path: "/system-settings/email-setting", icon: "mail" }, // Email configuration
        { title: "Whats App Setting", path: "/system-settings/whats-app-setting", icon: "Settings2" }, // WhatsApp config
        { title: "Certificate Setting", path: "/system-settings/certificate-setting", icon: "award" }, // Certificate config
        { title: "Payment Methods", path: "/system-settings/payment-methods", icon: "credit-card" }, // Payment options
        { title: "Print Header Footer", path: "/system-settings/print-header-footer", icon: "PanelTop" }, // Print settings
        { title: "Front CMS Setting", path: "/system-settings/front-cms-setting", icon: "globe" }, // CMS settings
        { title: "Roles Permissions", path: "/system-settings/roles-permissions", icon: "UserPen" }, // Role management
        { title: "Backup / Restore", path: "/system-settings/backup-restore", icon: "Folder_Sync" }, // Backup and restore
        { title: "Languages", path: "/system-settings/languages", icon: "Languages" }, // Language settings
        { title: "Users", path: "/system-settings/users", icon: "users" }, // User management
        { title: "Modules", path: "/system-settings/modules", icon: "Component" }, // Module management
        { title: "Custom Fields", path: "/system-settings/custom-fields", icon: "badge" }, // Custom field settings
        { title: "Captcha Setting", path: "/system-settings/captcha-setting", icon: "ShieldCheck" }, // Captcha config
        { title: "System Fields", path: "/system-settings/system-fields", icon: "list" }, // System field settings
        { title: "Student Profile Update", path: "/system-settings/student-profile-update", icon: "users" }, // Profile updates
        { title: "Online Admission", path: "/system-settings/online-admission", icon: "file-plus" }, // Admission settings
        { title: "File Types", path: "/system-settings/file-types", icon: "FileType" }, // File type management
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isActive = item.path ? pathname === item.path : false;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus.includes(item.title);
    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;

    return (
      <li key={item.title}>
        <Link
          href={item.path || "#"}
          className={`flex items-center p-3 text-slate-700 hover:bg-slate-200/50 transition-colors duration-200 ${isActive ? "bg-darkmode-700 text-white" : ""
            } ${level > 0 ? "pl-8" : ""}`}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault();
              toggleMenu(item.title);
            }
          }}
        >
          <div className="w-6 h-6 flex items-center justify-center mr-3">
            <IconComponent size={20} />
          </div>
          <div className="flex-1 flex items-center justify-between font-medium">
            {item.title}
            {hasSubItems && (
              <div
                className={`w-4 h-4 flex items-center justify-center transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                  }`}
              >
                <ChevronDown size={16} />
              </div>
            )}
          </div>
        </Link>
        {hasSubItems && isOpen && (
          <ul className="space-y-1">{item.subItems!.map((subItem) => renderMenuItem(subItem, level + 1))}</ul>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 fixed top-4 left-4 z-60 text-slate-700 bg-white/80 rounded shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>
      {/* Sidebar Navigation */}
      <nav
        className={`fixed left-0 w-64 bg-slate-100 p-4 overflow-y-auto transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:min-h-0 dark:bg-darkmode-800 dark:text-slate-300 z-50`}
        style={{ top: "80px", height: "calc(100vh - 80px)" }} // Moved sidebar down further
      >
        <ul className="space-y-2 pb-4 pt-4">{menuItems.map((item) => renderMenuItem(item))}</ul>
      </nav>
    </>
  );
};

export default Sidebar;