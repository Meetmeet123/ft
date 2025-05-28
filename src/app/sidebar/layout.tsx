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
  CreditCardIcon,
  QrCode,
  QrCodeIcon,
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
  QrCode,
  QrCodeIcon
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
      title: "Admin",
      path: "/admin/dashboard",
      icon: "home",
    },
    {
      title: "Current Sessions",
      path: "/current-sessions",
      icon: "UserPen",
    },
    {
      title: "Quick Links",
      path: "/quick-links",
      icon: "SquareArrowOutUpRight",
    },
    {
      title: "Front Office",
      path: "/front-office",
      icon: "Projector",
      subItems: [
        {
          title: "Admission Enquiry",
          path: "/front-office/admission-enquiry",
          icon: "users",
        },
        {
          title: "Visitor Book",
          path: "/front-office/visitor-book",
          icon: "book",
        },
        {
          title: "Phone Call Log",
          path: "/front-office/phone-call-log",
          icon: "phone",
        },
        {
          title: "Postal Dispatch",
          path: "/front-office/postal-dispatch",
          icon: "mail",
        },
        {
          title: "Postal Receive",
          path: "/front-office/postal-receive",
          icon: "mail",
        },
        {
          title: "Complain",
          path: "/front-office/complain",
          icon: "message-square",
        },
        {
          title: "Setup Front Office",
          path: "/front-office/setup-front-office/ComplainType",
          icon: "settings",
        },
      ],
    },
    {
      title: "Student Information",
      path: "/student-information",
      icon: "users",
      subItems: [
        {
          title: "Student Details",
          path: "/student-information/student-details",
          icon: "user",
        },
        {
          title: "Student Admission",
          path: "/student-information/student-admission",
          icon: "file-plus",
        },
        {
          title: "Online Admission",
          path: "/student-information/online-admission",
          icon: "globe",
        },
        {
          title: "Disabled Students",
          path: "/student-information/disabled-students",
          icon: "Accessibility",
        },
        {
          title: "Multi Class Student",
          path: "/student-information/multi-class-student",
          icon: "users",
        },
        {
          title: "Bulk Delete",
          path: "/student-information/bulk-delete",
          icon: "trash2",
        },
        {
          title: "Student Categories",
          path: "/student-information/student-categories",
          icon: "list",
        },
        {
          title: "Student House",
          path: "/student-information/student-house",
          icon: "HousePlus",
        },
        {
          title: "Disable Reason",
          path: "/student-information/disable-reason",
          icon: "alert-triangle",
        },
        {
          title: "Student ID Cards",
          path: "/student-information/student-id-cards",
          icon: "id-card",
        },
      ],
    },
    {
      title: "Fees Collection",
      path: "/fees-collection",
      icon: "Banknote",
      subItems: [
        {
          title: "Collect Fees",
          path: "/fees-collection/collect-fees",
          icon: "plus-circle",
        },
        {
          title: "Offline Bank Payment",
          path: "/fees-collection/offline-bank-payment",
          icon: "credit-card",
        },
        {
          title: "Search Fees Payment",
          path: "/fees-collection/search-fees-payment",
          icon: "search",
        },
        {
          title: "Search Due Fees",
          path: "/fees-collection/search-due-fees",
          icon: "alert-circle",
        },
        {
          title: "Fees Master",
          path: "/fees-collection/fees-master",
          icon: "file-text",
        },
        {
          title: "Fees Master College",
          path: "/fees-collection/fees-master-college",
          icon: "graduation-cap",
        },
        {
          title: "Fees Group",
          path: "/fees-collection/fees-group",
          icon: "users",
        },
        {
          title: "Fees Type",
          path: "/fees-collection/fees-type",
          icon: "list",
        },
        {
          title: "Bank Account",
          path: "/fees-collection/bank-account",
          icon: "credit-card",
        },
        {
          title: "Fees Category",
          path: "/fees-collection/fees-category",
          icon: "tag",
        },
        {
          title: "Fees Discount",
          path: "/fees-collection/fees-discount",
          icon: "percent",
        },
        {
          title: "Fees Carry Forward",
          path: "/fees-collection/fees-carry-forward",
          icon: "arrow-right",
        },
        {
          title: "Fees Reminder",
          path: "/fees-collection/fees-reminder",
          icon: "bell",
        },
      ],
    },
    {
      title: "Online Course",
      path: "/online-course",
      icon: "calendar_check",
      subItems: [
        {
          title: "Online Course",
          path: "/online-course/online-course",
          icon: "users",
        },
        {
          title: "Offline Payment",
          path: "/online-course/offline-payment",
          icon: "users", 
        },
        {
          title: "Course Category",
          path: "/online-course/course-category",
          icon: "barcode",
        },
        {
          title: "Question Bank",
          path: "/online-course/question-bank",
          icon: "clock",
        },
        {
          title: "Online Couese Report",
          path: "/online-course/online-course-report",
          icon: "calendar",
        },
        {
          title: "Setting",
          path: "/online-course/Setting",
          icon: "Check",
        },
      ],
    },
    
    

    {
      title: "Zoom Live Classes",
      path: "/zoom-live-classes",
      icon: "calendar_check",
      subItems: [
        {
          title: "Live Classes",
          path: "/zoom-live-classes/live-classes",
          icon: "users",
        },
        {
          title: "Live Meeting",
          path: "/zoom-live-classes/live-meeting",
          icon: "users", 
        },
        {
          title: "Live Class Report",
          path: "/zoom-live-classes/live-class-report",
          icon: "barcode",
        },
        {
          title: "Live Meeting Report",
          path: "/zoom-live-classes/live-meeting-report",
          icon: "clock",
        },
        {
          title: "Setting",
          path: "/zoom-live-classes/setting",
          icon: "calendar",
        },],},

     {
      title: "Behavior Records",
      path: "/behavior-record",
      icon: "calendar_check",
      subItems: [
        {
          title: "Assign Incident",
          path: "/behavior-record/assign-incident",
          icon: "users",
        },
        {
          title: "Incident",
          path: "/behavior-record/incident",
          icon: "users", 
        },
        {
          title: "Reports",
          path: "/behavior-record/reports",
          icon: "barcode",
        },
        
        {
          title: "Setting",
          path: "/behavior-record/setting",
          icon: "calendar",
        },],},

        {
          title: "Gmeet Live Classes",
          path: "/gmeet-live-classes",
          icon: "calendar_check",
          subItems: [
            {
              title: "Live Classes",
              path: "/gmeet-live-classes/live-classes",
              icon: "users",
            },
            {
              title: "Live Meeting",
              path: "/gmeet-live-classes/live-meeting",
              icon: "users", 
            },
            {
              title: "Live Class Report",
              path: "/gmeet-live-classes/live-class-report",
              icon: "barcode",
            },
            {
              title: "Live Meeting Report",
              path: "/gmeet-live-classes/live-meeting-report",
              icon: "clock",
            },
            {
              title: "Setting",
              path: "/gmeet-live-classes/setting",
              icon: "calendar",
            },],},
    
    {
      title: "Income",
      path: "/income",
      icon: "dollar-sign",
      subItems: [
        {
          title: "Add Income",
          path: "/income/add-income",
          icon: "plus-circle",
        },
        {
          title: "Search Income",
          path: "/income/search-income",
          icon: "search",
        },
        {
          title: "Income Head",
          path: "/income/income-head",
          icon: "file-text",
        },
      ],
    },

    {
      title: "Multi Branch",
      path: "/multi-branch",
      icon: "users",
      subItems: [
        { title: "Overview", path: "/multi-branch/overview", icon: "user" },
        { title: "Report ", path: "/multi-branch/report ", icon: "calendar" },
        { title: "Setting ", path: "/multi-branch/setting ", icon: "settings" },
      ],
    },
    {
      title: "Expenses",
      path: "/expenses",
      icon: "credit-card",
      subItems: [
        {
          title: "Add Expense",
          path: "/expenses/add-expense",
          icon: "plus-circle",
        },
        {
          title: "Search Expense",
          path: "/expenses/search-expense",
          icon: "search",
        },
        {
          title: "Expense Head",
          path: "/expenses/expense-head",
          icon: "file-text",
        },
      ],
    },
     {
      title: "CBSE Examination",
      path: "/cbse-examination",
      icon: "book-open",
      subItems: [
        {
          title: "Exam",
          path: "/cbse-examination/exam",
          icon: "file-text",
        },
        {
          title: "Exam Schedule",
          path: "/cbse-examination/exam-schedule",
          icon: "calendar",
        },
        {
          title: "Print Marksheet",
          path: "/cbse-examination/print-marksheet",
          icon: "Printer",
        },
        {
          title: "Exam Grade",
          path: "/cbse-examination/exam-grade",
          icon: "award",
        },
        {
          title: "Assign Observation",
          path: "/cbse-examination/assign-observation",
          icon: "users",
        },
        {
          title: "Observation",
          path:"/cbse-examination/observation",
          icon:"SlidersHorizontal"
        },
        {
          title: "Observation Parameter",
          path: "/cbse-examination/observation-parameter",
          icon: "list",
        },
        {
          title: "Assessment",
          path: "/cbse-examination/assesment",
          icon: "check-circle",
        },
        {
          title: "Term",
          path: "/cbse-examination/term",
          icon: "clock",
        },
        {
          title: "Template",
          path: "/cbse-examination/template",
          icon: "layout",
        },
        {
          title: "Report",
          path: "/cbse-examination/report",
          icon: "clipboard-list",
        },
        {
          title: "Setting",
          path: "/cbse-examination/setting",
          icon: "settings",
        }
      ]
    },
    {
      title: "Attendance",
      path: "/attendance",
      icon: "calendar_check",
      subItems: [
        {
          title: "Student Attendance",
          path: "/attendance/student-attendance",
          icon: "users",
        },
        {
          title: "Scan ID For Attendance",
          path: "/attendance/scan-id-for-attendance",
          icon: "barcode",
        },
        {
          title: "Check-in & Check-out",
          path: "/attendance/check-in-check-out",
          icon: "clock",
        },
        {
          title: "Attendance By Date",
          path: "/attendance/attendance-by-date",
          icon: "calendar",
        },
        {
          title: "Approve Leave",
          path: "/attendance/approve-leave",
          icon: "Check",
        },
      ],
    },
    {
      title:"QR Attendance",
      path:"/qr-attendance",
      icon:"QrCode",
      subItems:[
        {
          title:"Attendance",
          path:"/qr-attendance/attendance",
          icon:"QrCodeIcon"
        },
        {
          title:"Setting",
          path:"/qr-attendance/setting",
          icon:"settings"
        }
      ]
    },
    {
      title: "Examinations",
      path: "/examinations",
      icon: "Map",
      subItems: [
        {
          title: "Exam Group",
          path: "/examinations/exam-group",
          icon: "users",
        },
        {
          title: "Exam Schedule",
          path: "/examinations/exam-schedule",
          icon: "calendar",
        },
        {
          title: "Exam Result",
          path: "/examinations/exam-result",
          icon: "file-text",
        },
        {
          title: "Design Admit Card",
          path: "/examinations/design-admit-card",
          icon: "IdCard",
        },
        {
          title: "Print Admit Card",
          path: "/examinations/print-admit-card",
          icon: "Printer",
        },
        {
          title: "Design Marksheet",
          path: "/examinations/design-marksheet",
          icon: "SquarePercent",
        },
        {
          title: "Print Marksheet",
          path: "/examinations/print-marksheet",
          icon: "Printer",
        },
        {
          title: "Marks Grade",
          path: "/examinations/marks-grade",
          icon: "award",
        },
      ],
    },
    {
      title: "Academic/Term Exam",
      path: "/academic-term-exam",
      icon: "book",
      subItems: [
        {
          title: "Maharashtra Pattern",
          path: "/academic-term-exam/maharashtra-pattern",
          icon: "ScrollText",
          subItems: [
            {
              title: "Exams",
              path: "/academic-term-exam/exams",
              icon: "file-text",
            },
            {
              title: "Marks Dist. Type",
              path: "/academic-term-exam/marks-dist-type",
              icon: "list",
            },
            {
              title: "Marks Dist. Comp",
              path: "/academic-term-exam/marks-dist-comp",
              icon: "BrainCircuit",
            },
            {
              title: "Subjectwise Remarks",
              path: "/academic-term-exam/subjectwise-remarks",
              icon: "Percent",
            },
            {
              title: "Class Subjects Marks",
              path: "/academic-term-exam/class-subjects-marks",
              icon: "BookOpenCheck",
            },
            {
              title: "Component Marks",
              path: "/academic-term-exam/component-marks",
              icon: "BadgePercent",
            },
            {
              title: "Score Card Comp",
              path: "/academic-term-exam/score-card-comp",
              icon: "award",
            },
          ],
        },
      ],
    },
    {
      title: "Online Examinations",
      path: "/online-examinations",
      icon: "wifi",
      subItems: [
        {
          title: "Online Exam",
          path: "/online-examinations/online-exam",
          icon: "file-text",
        },
        {
          title: "Question Bank",
          path: "/online-examinations/question-bank",
          icon: "book",
        },
      ],
    },
    {
      title: "Competitive Exam",
      path: "/competitive-exam",
      icon: "wifi",
      subItems: [
        {
          title: "Competitive Exam",
          path: "/competitive-exam/competitive-exam",
          icon: "file-text",
        },
        {
          title: "Question Bank",
          path: "/competitive-exam/question-bank",
          icon: "book",
        },
      ],
    },
    {
      title: "Lesson Plan",
      path: "/lesson-plan",
      icon: "NotebookPen",
      subItems: [
        {
          title: "Manage Lesson Plan",
          path: "/lesson-plan/manage-lesson-plan",
          icon: "SquareChartGantt",
        },
        {
          title: "Manage Syllabus Status",
          path: "/lesson-plan/manage-syllabus-status",
          icon: "ChartNoAxesColumn",
        },
        { title: "Lesson", path: "/lesson-plan/lesson", icon: "book" },
        { title: "Topic", path: "/lesson-plan/topic", icon: "list" },
        {
          title: "Add Log Lesson Plan",
          path: "/lesson-plan/add-log-lesson-plan",
          icon: "plus-circle",
        },
        {
          title: "Manage Log Lesson Plan",
          path: "/lesson-plan/manage-log-lesson-plan",
          icon: "file-text",
        },
      ],
    },
    {
      title: "Academics",
      path: "/academics",
      icon: "graduation-cap",
      subItems: [
        {
          title: "Class Timetable",
          path: "/academics/class-timetable",
          icon: "calendar",
        },
        {
          title: "Teachers Timetable",
          path: "/academics/teachers-timetable",
          icon: "clock",
        },
        {
          title: "Assign Class Teacher",
          path: "/academics/assign-class-teacher",
          icon: "users",
        },
        {
          title: "Assign Subject Teacher",
          path: "/academics/assign-subject-teacher",
          icon: "CircleUserRound",
        },
        {
          title: "Promote Students",
          path: "/academics/promote-students",
          icon: "CircleUser",
        },
        {
          title: "Subject Group",
          path: "/academics/subject-group",
          icon: "users",
        },
        { title: "Subjects", path: "/academics/subjects", icon: "book" },
        {
          title: "Admission Committee",
          path: "/academics/admission-committee",
          icon: "users",
        },
        { title: "Course", path: "/academics/course", icon: "file-text" },
        { title: "Class", path: "/academics/class", icon: "home" },
        { title: "Sections", path: "/academics/sections", icon: "list" },
      ],
    },
    {
      title: "Human Resource",
      path: "/human-resource",
      icon: "users",
      subItems: [
        {
          title: "Staff Directory",
          path: "/human-resource/staff-directory",
          icon: "user",
        },
        {
          title: "Staff Attendance",
          path: "/human-resource/staff-attendance",
          icon: "calendar",
        },
        {
          title: "Payroll",
          path: "/human-resource/payroll",
          icon: "dollar-sign",
        },
        {
          title: "Staff Loan",
          path: "/human-resource/staff-loan",
          icon: "credit-card",
        },
        {
          title: "Approve Leave Request",
          path: "/human-resource/approve-leave-request",
          icon: "Check",
        },
        {
          title: "Apply Leave",
          path: "/human-resource/apply-leave",
          icon: "file-plus",
        },
        {
          title: "Leave Type",
          path: "/human-resource/leave-type",
          icon: "list",
        },
        {
          title: "Teachers Rating",
          path: "/human-resource/teachers-rating",
          icon: "Star",
        },
        {
          title: "Department",
          path: "/human-resource/department",
          icon: "Ungroup",
        },
        {
          title: "Designation",
          path: "/human-resource/designation",
          icon: "BookUser",
        },
        {
          title: "Disable Staff",
          path: "/human-resource/disable-staff",
          icon: "Accessibility",
        },
      ],
    },
    {
      title: "Communicate",
      path: "/communicate",
      icon: "Phone",
      subItems: [
        {
          title: "Notice Board",
          path: "/communicate/notice-board",
          icon: "Presentation",
        },
        { title: "Send Email", path: "/communicate/send-email", icon: "mail" },
        {
          title: "Send SMS",
          path: "/communicate/send-sms",
          icon: "message-square",
        },
        {
          title: "Email / SMS Log",
          path: "/communicate/email-sms-log",
          icon: "file-text",
        },
        {
          title: "Login Credentials Send",
          path: "/communicate/login-credentials-send",
          icon: "WalletCards",
        },
      ],
    },
    {
      title: "Download Center",
      path: "/download-center",
      icon: "Download",
      subItems: [
        {
          title: "Upload Content",
          path: "/download-center/upload-content",
          icon: "Upload",
        },
        {
          title: "Assignments",
          path: "/download-center/assignments",
          icon: "file-text",
        },
        {
          title: "Study Material",
          path: "/download-center/study-material",
          icon: "book",
        },
        { title: "Syllabus", path: "/download-center/syllabus", icon: "list" },
        {
          title: "Other Downloads",
          path: "/download-center/other-downloads",
          icon: "Download",
        },
      ],
    },
    {
      title: "Homework",
      path: "/homework",
      icon: "flask",
      subItems: [
        {
          title: "Add Homework",
          path: "/homework/add-homework",
          icon: "plus-circle",
        },
      ],
    },
    {
      title: "Library",
      path: "/library",
      icon: "Library",
      subItems: [
        { title: "Book List", path: "/library/book-list", icon: "list" },
        { title: "Issue Return", path: "/library/issue-return", icon: "Undo2" },
        { title: "Add Student", path: "/library/add-student", icon: "users" },
        {
          title: "Add Staff Member",
          path: "/library/add-staff-member",
          icon: "CircleUserRound",
        },
      ],
    },
    {
      title: "Poshak Aahar",
      path: "/poshak-aahar",
      icon: "utensils",
      subItems: [
        { title: "Food Menu", path: "/poshak-aahar/food-menu", icon: "menu" },
        {
          title: "Food Setup",
          path: "/poshak-aahar/food-setup",
          icon: "settings",
        },
        {
          title: "Item Supplier",
          path: "/poshak-aahar/item-supplier",
          icon: "truck",
        },
        {
          title: "Item Category",
          path: "/poshak-aahar/item-category",
          icon: "tag",
        },
        {
          title: "Add Item",
          path: "/poshak-aahar/add-item",
          icon: "plus-circle",
        },
        {
          title: "Item Store",
          path: "/poshak-aahar/item-store",
          icon: "shopping-bag",
        },
        {
          title: "Add Item Stock",
          path: "/poshak-aahar/add-item-stock",
          icon: "package",
        },
      ],
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: "package",
      subItems: [
        {
          title: "Issue Item",
          path: "/inventory/issue-item",
          icon: "rotate-ccw",
        },
        {
          title: "Add Item Stock",
          path: "/inventory/add-item-stock",
          icon: "plus-circle",
        },
        { title: "Add Item", path: "/inventory/add-item", icon: "plus-circle" },
        {
          title: "Item Category",
          path: "/inventory/item-category",
          icon: "tag",
        },
        {
          title: "Item Store",
          path: "/inventory/item-store",
          icon: "shopping-bag",
        },
        {
          title: "Item Supplier",
          path: "/inventory/item-supplier",
          icon: "truck",
        },
      ],
    },
    {
      title: "Student-CV",
      path: "/student-cv",
      icon: "file-text",  
      subItems: [
        {
          title: "Build CV",
          path: "/student-cv/build-cv",
          icon: "file-text",
        },
        {
          title: "CV-Setting",
          path: "/student-cv/cv-setting",
          icon: "settings",
        },
        {
          title: "Details",
          path: "/student-cv/details",
          icon: "info",
        },
        {
          title: "Download-CV",
          path: "/student-cv/download-cv",
          icon: "download",
        },
      ],
    },
    {
      title: "Transport",
      path: "/transport",
      icon: "Forklift",
      subItems: [
        { title: "Routes", path: "/transport/routes", icon: "Route" },
        { title: "Vehicle", path: "/transport/vehicle", icon: "truck" },
        {
          title: "Assign Vehicle",
          path: "/transport/assign-vehicle",
          icon: "Cable",
        },
      ],
    },
    {
      title: "Hostel",
      path: "/hostel",
      icon: "hotel",
      subItems: [
        { title: "Hostel Rooms", path: "/hostel/hostel-rooms", icon: "home" },
        { title: "Room Type", path: "/hostel/room-type", icon: "list" },
        { title: "Hostel", path: "/hostel/hostel", icon: "building" },
      ],
    },
    {
      title: "Certificate",
      path: "/certificate",
      icon: "award",
      subItems: [
        {
          title: "Student Certificate",
          path: "/certificate/student-certificate",
          icon: "user",
        },
        {
          title: "Registration Certificate",
          path: "/certificate/registration-certificate",
          icon: "file-text",
        },
        {
          title: "Generate Certificate",
          path: "/certificate/generate-certificate",
          icon: "Printer",
        },
        {
          title: "Student ID Card",
          path: "/certificate/student-id-card",
          icon: "id-card",
        },
        {
          title: "Income Tax Certificate",
          path: "/certificate/income-tax-certificate",
          icon: "dollar-sign",
        },
        {
          title: "Generate ID Card",
          path: "/certificate/generate-id-card",
          icon: "Printer",
        },
        {
          title: "Staff ID Card",
          path: "/certificate/staff-id-card",
          icon: "id-card",
        },
        {
          title: "Generate Staff ID Card",
          path: "/certificate/generate-staff-id-card",
          icon: "Printer",
        },
      ],
    },
    {
      title: "Front CMS",
      path: "/front-cms",
      icon: "globe",
      subItems: [
        { title: "Event", path: "/front-cms/event", icon: "calendar" },
        { title: "Gallery", path: "/front-cms/gallery", icon: "Images" },
        { title: "Notice", path: "/front-cms/notice", icon: "bell" },
        {
          title: "Media Manager",
          path: "/front-cms/media-manager",
          icon: "SquarePlay",
        },
        { title: "Page", path: "/front-cms/page", icon: "file-text" },
        { title: "Menus", path: "/front-cms/menus", icon: "menu" },
        {
          title: "Banner Images",
          path: "/front-cms/banner-images",
          icon: "Image",
        },
        { title: "Services", path: "/front-cms/services", icon: "briefcase" },
        { title: "Directors", path: "/front-cms/directors", icon: "users" },
        { title: "Teachers", path: "/front-cms/teachers", icon: "user" },
        {
          title: "Testimonials",
          path: "/front-cms/testimonials",
          icon: "Star",
        },
        { title: "Blogs", path: "/front-cms/blogs", icon: "Logs" },
      ],
    },
    {
      title: "Alumni",
      path: "/alumni",
      icon: "users",
      subItems: [
        { title: "Manage Alumni", path: "/alumni/manage-alumni", icon: "user" },
        { title: "Events", path: "/alumni/events", icon: "calendar" },
      ],
    },
    {
      title: "Reports",
      path: "/reports",
      icon: "ChartNoAxesCombined",
      subItems: [
        {
          title: "Student Information",
          path: "/reports/student-information",
          icon: "users",
        },
        { title: "Finance", path: "/reports/finance", icon: "dollar-sign" },
        {
          title: "Attendance",
          path: "/reports/attendance",
          icon: "calendar_check",
        },
        { title: "Examinations", path: "/reports/examinations", icon: "Map" },
        {
          title: "Online Examinations",
          path: "/reports/online-examinations",
          icon: "wifi",
        },
        { title: "Lesson Plan", path: "/reports/lesson-plan", icon: "book" },
        {
          title: "Human Resource",
          path: "/reports/human-resource",
          icon: "users",
        },
        { title: "Library", path: "/reports/library", icon: "book" },
        { title: "Inventory", path: "/reports/inventory", icon: "package" },
        { title: "Transport", path: "/reports/transport", icon: "truck" },
        { title: "Hostel", path: "/reports/hostel", icon: "hotel" },
        { title: "Alumni", path: "/reports/alumni", icon: "users" },
        { title: "User Log", path: "/reports/user-log", icon: "file-text" },
        {
          title: "Audit Trail Report",
          path: "/reports/audit-trail-report",
          icon: "list",
        },
        { title: "Certificate", path: "/reports/certificate", icon: "award" },
      ],
    },
    {
      title: "System Settings",
      path: "/system-settings",
      icon: "settings",
      subItems: [
        {
          title: "General Setting",
          path: "/system-settings/general-setting",
          icon: "Bolt",
        },
        {
          title: "School Timing",
          path: "/system-settings/school-timing",
          icon: "clock",
        },
        {
          title: "Session Setting",
          path: "/system-settings/session-setting",
          icon: "calendar",
        },
        {
          title: "Notification Setting",
          path: "/system-settings/notification-setting",
          icon: "bell",
        },
        {
          title: "SMS Setting",
          path: "/system-settings/sms-setting",
          icon: "message-square",
        },
        {
          title: "Email Setting",
          path: "/system-settings/email-setting",
          icon: "mail",
        },
        {
          title: "Whats App Setting",
          path: "/system-settings/whats-app-setting",
          icon: "Settings2",
        },
        {
          title: "Certificate Setting",
          path: "/system-settings/certificate-setting",
          icon: "award",
        },
        {
          title: "Payment Methods",
          path: "/system-settings/payment-methods",
          icon: "credit-card",
        },
        {
          title: "Print Header Footer",
          path: "/system-settings/print-header-footer",
          icon: "PanelTop",
        },
        {
          title: "Front CMS Setting",
          path: "/system-settings/front-cms-setting",
          icon: "globe",
        },
        {
          title: "Roles Permissions",
          path: "/system-settings/roles-permissions",
          icon: "UserPen",
        },
        {
          title: "Backup / Restore",
          path: "/system-settings/backup-restore",
          icon: "Folder_Sync",
        },
        {
          title: "Languages",
          path: "/system-settings/languages",
          icon: "Languages",
        },
        { title: "Users", path: "/system-settings/users", icon: "users" },
        {
          title: "Modules",
          path: "/system-settings/modules",
          icon: "Component",
        },
        {
          title: "Custom Fields",
          path: "/system-settings/custom-fields",
          icon: "badge",
        },
        {
          title: "Captcha Setting",
          path: "/system-settings/captcha-setting",
          icon: "ShieldCheck",
        },
        {
          title: "System Fields",
          path: "/system-settings/system-fields",
          icon: "list",
        },
        {
          title: "Student Profile Update",
          path: "/system-settings/student-profile-update",
          icon: "users",
        },
        {
          title: "Online Admission",
          path: "/system-settings/online-admission",
          icon: "file-plus",
        },
        {
          title: "File Types",
          path: "/system-settings/file-types",
          icon: "FileType",
        },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isActive = item.path
      ? pathname === item.path
      : item.subItems?.some((subItem) => subItem.path === pathname) || false;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus.includes(item.title);
    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;

    return (
      <li key={item.title}>
        <Link
          href={item.path || "#"}
          className={`flex items-center p-3 text-slate-700 hover:bg-slate-200/50 transition-colors duration-200 ${
            isActive ? "bg-[#e0f7fa] text-[#1e40af] font-medium" : ""
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
                className={`w-4 h-4 flex items-center justify-center transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <ChevronDown size={16} />
              </div>
            )}
          </div>
        </Link>
        {hasSubItems && isOpen && (
          <ul className="space-y-1 mt-1">
            {item.subItems!.map((subItem) =>
              renderMenuItem(subItem, level + 1)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Mobile Toggle button */}
      <button
        className="md:hidden p-4 fixed top-4 left-4 z-60 text-slate-700 bg-white/80 rounded shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>
      {/* Sidebar Navigation */}
      <nav
        className={`fixed left-0 w-64 bg-slate-100 p-4 overflow-y-auto transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:min-h-0 dark:bg-darkmode-800 dark:text-slate-300 z-50`}
        style={{ top: "80px", height: "calc(100vh - 80px)" }}
      >
        <ul className="space-y-2 pb-4 pt-4">
          {menuItems.map((item) => renderMenuItem(item))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
