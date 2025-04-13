export const notificationData =[
    {
      "event": "Exam Result",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear {{student_name}} - {{exam_roll_no}}, your {{exam}} result has been published."
    },
    {
      "event": "CBSE Exam Result",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear {{student_name}} - {{roll_no}}, your {{exam}} result has been published."
    },
    {
      "event": "CBSE Exam Markseet Pdf",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear {{student_name}} ({{admission_no}}) {{class}} Section {{section}}. We have mailed you the marksheet with Roll no.{{roll_no}}"
    },
    {
      "event": "Behaviour Incident Assigned",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "A new {{incident_title}} behaviour incident with {{incident_point}} point is assigned on you. {{student_name}} {{class}} {{section}} {{admission_no}} {{mobileno}} {{email}} {{guardian_name}} {{guardian_phone}} {{guardian_email}}"
    },
    {
      "event": "Online Course Guest User Sign Up",
      "destination": ["Email"],
      "recipient": ["Student"],
      "sampleMessage": "Dear {{guest_user_name}} you have successfully sign up with Email: {{email}} Url {{url}}"
    },
    {
      "event": "Online Course Purchase For Guest User",
      "destination": ["Email"],
      "recipient": ["Student"],
      "sampleMessage": "Thanks for purchasing course {{title}} discount {{discount}} amount {{price}} purchase date {{purchase_date}}"
    },
    {
      "event": "Email PDF Exam Marksheet",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear {{student_name}} ({{admission_no}}) {{class}} Section {{section}}. We have mailed you the marksheet of Exam {{exam}} Roll no.{{roll_no}}"
    },
    {
      "event": "Student Apply Leave",
      "destination": ["Email"],
      "recipient": ["Guardian", "Staff"],
      "sampleMessage": "My Name is {{student_name}} Class {{class}} section {{section}}. I have to apply leave on {{apply_date}} and from {{from_date}} to {{to_date}}. {{message}} please provide."
    },
    {
      "event": "Online Admission Fees Processing",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear {{firstname}} {{lastname}} your online admission form is Submitted successfully and the payment of {{paid_amount}} has processing on date {{date}}. Your Reference number is {{reference_no}} and your transaction id {{transaction_id}}. Please remember your reference number for further process."
    },
    {
      "event": "Fee Processing",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear parents, we have received Fees Amount {{fee_amount}} for {{student_name}} by Your School Name {{class}} {{section}} {{email}} {{contact_no}} transaction_id : {{transaction_id}} {{fee_amount}}"
    },
    {
      "event": "Staff Login Credential",
      "destination": ["Email"],
      "recipient": ["Staff"],
      "sampleMessage": "Hello {{first_name}} {{last_name}} your login details for Url: {{url}} Username: {{username}} Password: {{password}} Employee ID: {{employee_id}}"
    },
    {
      "event": "Student Login Credential",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Hello {{display_name}} your login details for Url: {{url}} Username: {{username}} Password: {{password}} admission No: {{admission_no}}"
    },
    {
      "event": "Online Course Purchase",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Thanks for purchasing course {{title}} amount {{price}} purchase date {{purchase_date}} class {{class}} section {{section}} and assign for {{assign_teacher}}"
    },
    {
      "event": "Online Course Publish",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear student, a new online course {{title}} and price {{price}} with discount {{discount}} for {{class}} {{section}} is {{paid_free}} now available and assign to {{assign_teacher}}."
    },
    {
      "event": "Online Admission Fees Submission",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear {{firstname}} {{lastname}} your online admission form is Submitted successfully and the payment of {{paid_amount}} has received successfully on date {{date}}. Your Reference number is {{reference_no}}. Please remember your reference number for further process."
    },
    {
      "event": "Online Admission Form Submission",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear {{firstname}} {{lastname}} your online admission form is Submitted successfully on date {{date}}. Your Reference number is {{reference_no}}. Please remember your reference number for further process."
    },
    {
      "event": "Zoom Live Classes Start",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear student, your live class {{title}} has been started for the duration of {{duration}} minute."
    },
    {
      "event": "Student Admission",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear {{student_name}} your admission is confirm in Class: {{class}} Section: {{section}} for Session: {{current_session_name}} for more detail contact System Admin {{class}} {{section}} {{admission_no}} {{roll_no}} {{admission_date}} {{mobileno}} {{email}} {{dob}} {{guardian_name}} {{guardian_relation}} {{guardian_phone}} {{father_name}} {{father_phone}} {{blood_group}} {{mother_name}} {{gender}} {{guardian_email}}"
    },
    {
      "event": "Fee Submission",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear parents, we have received Fees Amount {{fee_amount}} for {{student_name}} by Your School Name {{class}} {{section}} {{fine_type}} {{fine_percentage}} {{fine_amount}} {{fee_group_name}} {{type}} {{code}} {{email}} {{contact_no}} {{invoice_id}} {{sub_invoice_id}} {{due_date}} {{amount}} {{fee_amount}}"
    },
    {
      "event": "Student Absent Attendance",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Absent Notice :{{student_name}} was absent on date {{date}} in period {{subject_name}} {{subject_code}} {{subject_type}} from Your School Name"
    },
    {
      "event": "Homework",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "New Homework has been created for {{student_name}} at {{homework_date}} for the class {{class}} {{section}} {{subject}}. kindly submit your homework before {{submit_date}}. Thank you"
    },
    {
      "event": "Fees Reminder",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear parents, please pay fee amount Rs.{{due_amount}} of {{fee_type}} before {{due_date}} for {{student_name}} from smart school (ignore if you already paid)"
    },
    {
      "event": "Forgot Password",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian", "Staff"],
      "sampleMessage": "Dear {{name}}, Recently a request was submitted to reset password for your account. If you didn't make the request, just ignore this email. Otherwise you can reset your password using this link {{resetPassLink}}. If you're having trouble clicking the password reset button, copy and paste the URL below into your web browser, your username {{username}} {{resetPassLink}} Regards, {{school_name}}"
    },
    {
      "event": "Online Examination Publish Exam",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "A new exam {{exam_title}} has been created for duration: {{time_duration}} min, which will be available from: {{exam_from}} to {{exam_to}}."
    },
    {
      "event": "Online Examination Publish Result",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Exam {{exam_title}} result has been declared which was conducted between {{exam_from}} to {{exam_to}}, for more details, please check your student portal."
    },
    {
      "event": "Zoom Live Classes",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Dear student, your live class {{title}} has been scheduled on {{date}} for the duration of {{duration}} minute, please do not share the link to any body."
    },
    {
      "event": "Student Present Attendance",
      "destination": ["Email"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Present Notice :{{student_name}} {{admission_no}} was present on date {{date}} in in_time {{in_time}} period\nsubject-{{subject_name}}\nsubject_code - {{subject_code}}\nsubject_type-{{subject_type}}\nperiod_time_from- {{period_time_from}}\nperiod_time_to- {{period_time_to}}\nfrom Your School Name or more detail contact System Admin\nmobile no - {{mobileno}}\nemail - {{email}}\nfather name - {{father_name}}\nfather phone - {{father_phone}}\nfather occupation - {{father_occupation}}\nmother name - {{mother_name}}\nmother phone - {{mother_phone}}\nguardian name - {{guardian_name}}\nguardian phone - {{guardian_phone}}\nguardian occupation - {{guardian_occupation}}\nguardian email - {{guardian_email}}"
    },
    {
      "event": "Homework Evaluation",
      "destination": ["Email", "Mobile App"],
      "recipient": ["Student", "Guardian"],
      "sampleMessage": "Homework Evaluation Homework Assign Date: {{homework_date}} Last Submit Date: {{submit_date}} Student Name: {{student_name}} . Admission No {{admission_no}} {{class}} section: {{section}} subject : {{subject}} Marks: {{marks}}/{{max_marks}} Date: {{evaluation_date}} Thank you"
    },
    {
      "event": "Staff Present Attendance",
      "destination": ["Email"],
      "recipient": ["Staff"],
      "sampleMessage": "Present Notice: Staff Name {{staff_name}} ({{employee_id}}) is Present on Date : {{date}} at Time : {{in_time}}\nstaff contact no: {{contact_no}}\nstaff mail id : {{email}}"
    },
    {
      "event": "Staff Absent Attendance",
      "destination": ["Email"],
      "recipient": ["Staff"],
      "sampleMessage": "Absent Notice: Staff Name {{staff_name}} ({{employee_id}}) is Absent on Date : {{date}}\nstaff contact no: {{contact_no}}\nstaff mail id : {{email}}"
    }
  ]
  