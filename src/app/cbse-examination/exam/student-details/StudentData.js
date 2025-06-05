const studentData = [
    {
      "studentName": "Scarlett Kennedy",
      "admissionNo": "07874",
      "classSection": "Class 5 (A)",
      "fatherName": "David",
      "category": "General",
      "gender": "Female"
    },
    {
      "studentName": "Edward Thomas",
      "admissionNo": "18001",
      "classSection": "Class 5 (A)",
      "fatherName": "Olivier Thomas",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Robin Peterson",
      "admissionNo": "18002",
      "classSection": "Class 5 (A)",
      "fatherName": "Lucas Peterson",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Laura Clinton",
      "admissionNo": "18004",
      "classSection": "Class 5 (A)",
      "fatherName": "Michael Clinton",
      "category": "General",
      "gender": "Female"
    },
    {
      "studentName": "Glen Stark",
      "admissionNo": "18005",
      "classSection": "Class 5 (B)",
      "fatherName": "James Stark",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Brian Kohlar",
      "admissionNo": "18007",
      "classSection": "Class 5 (A)",
      "fatherName": "Nick Kohlar",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Kriti Singh",
      "admissionNo": "18010",
      "classSection": "Class 5 (B)",
      "fatherName": "Manish Singh",
      "category": "General",
      "gender": "Female"
    },
    {
      "studentName": "Benjamin Gates",
      "admissionNo": "18013",
      "classSection": "Class 5 (A)",
      "fatherName": "Nathan Gates",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Devin Coinneach",
      "admissionNo": "18014",
      "classSection": "Class 5 (A)",
      "fatherName": "jack Coinneach",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Apolline",
      "admissionNo": "18016",
      "classSection": "Class 5 (A)",
      "fatherName": "Elanie",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Karuna Rana",
      "admissionNo": "18023",
      "classSection": "Class 5 (A)",
      "fatherName": "Rajesh Rana",
      "category": "OBC",
      "gender": "Female"
    },
    {
      "studentName": "Jhonson wood",
      "admissionNo": "18025",
      "classSection": "Class 5 (C)",
      "fatherName": "David",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Rahul Sinha",
      "admissionNo": "18029",
      "classSection": "Class 5 (B)",
      "fatherName": "G S SINHA",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Kenal Dezzy",
      "admissionNo": "18050",
      "classSection": "Class 5 (A)",
      "fatherName": "Rey Dezzy",
      "category": "Physically Challenged",
      "gender": "Male"
    },
    {
      "studentName": "Yash Sinha",
      "admissionNo": "36220",
      "classSection": "Class 5 (C)",
      "fatherName": "Arjun",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Harry",
      "admissionNo": "53322",
      "classSection": "Class 5 (C)",
      "fatherName": "kalvin",
      "category": "",
      "gender": "Male"
    },
    {
      "studentName": "Vikash singh",
      "admissionNo": "90877",
      "classSection": "Class 5 (C)",
      "fatherName": "Gaurav singh",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Saurabh Shah",
      "admissionNo": "908875",
      "classSection": "Class 5 (A)",
      "fatherName": "Vinay Shah",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Markus Stones",
      "admissionNo": "980879",
      "classSection": "Class 5 (B)",
      "fatherName": "Jonson Stones",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Ashwani Kumar",
      "admissionNo": "120020",
      "classSection": "Class 1 (A)",
      "fatherName": "Arjun Kumar",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Nishant Sindhu",
      "admissionNo": "120028",
      "classSection": "Class 1 (B)",
      "fatherName": "Jayant Sindhu",
      "category": "OBC",
      "gender": "Male"
    },
    {
      "studentName": "Nathan Smith",
      "admissionNo": "120039",
      "classSection": "Class 1 (A)",
      "fatherName": "Jason Smith",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Nehal Wadhera",
      "admissionNo": "125005",
      "classSection": "Class 1 (A)",
      "fatherName": "Karun wadhera",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "xavier bartlett",
      "admissionNo": "520039",
      "classSection": "Class 1 (A)",
      "fatherName": "David bartlett",
      "category": "",
      "gender": "Male"
    },
    {
      "studentName": "Vinay Singh",
      "admissionNo": "5422",
      "classSection": "Class 1 (B)",
      "fatherName": "arun singh",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Ayan Desai",
      "admissionNo": "120036",
      "classSection": "Class 2 (A)",
      "fatherName": "Abhinand",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Hazel",
      "admissionNo": "1205",
      "classSection": "Class 2 (B)",
      "fatherName": "Lister",
      "category": "",
      "gender": "Female"
    },
    {
      "studentName": "Kaylen",
      "admissionNo": "2152",
      "classSection": "Class 2 (A)",
      "fatherName": "Lyndon",
      "category": "",
      "gender": "Female"
    },
    {
      "studentName": "Mayer",
      "admissionNo": "5482",
      "classSection": "Class 2 (B)",
      "fatherName": "Medison",
      "category": "",
      "gender": "Male"
    },
    {
      "studentName": "Jacob Bethell",
      "admissionNo": "96302",
      "classSection": "Class 2 (A)",
      "fatherName": "Brydon",
      "category": "General",
      "gender": "Male"
    },
    {
      "studentName": "Vinni Khatri",
      "admissionNo": "980867",
      "classSection": "Class 2 (B)",
      "fatherName": "Suresh",
      "category": "General",
      "gender": "Female"
    }
  ]

  export default studentData