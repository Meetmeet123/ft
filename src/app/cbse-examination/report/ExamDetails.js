const examDetails = [
  {
    "Student": "Edward Thomas",
    "Admission No": "18001",
    "Father Name": "Olivier Thomas",
    "Marks": {
      "English": { "Theory": 94.0, "Practical": "xx" },
      "Science": { "Theory": 97.0, "Practical": 65.0 },
      "Elective 1": { "Theory": 94.0, "Practical": 72.0 },
      "Mathematics": { "Theory": 93.0, "Practical": "xx" }
    },
    "Total Marks": "515/550",
    "Percentage": 93.64,
    "Grade": "A +",
    "Rank": 1
  },
  {
    "Student": "Scarlett Kennedy",
    "Admission No": "07874",
    "Father Name": "David",
    "Marks": {
      "English": { "Theory": 88.0, "Practical": "xx" },
      "Science": { "Theory": 99.0, "Practical": 63.0 },
      "Elective 1": { "Theory": 85.0, "Practical": 28.0 },
      "Mathematics": { "Theory": 88.0, "Practical": "xx" }
    },
    "Total Marks": "451/550",
    "Percentage": 82.0,
    "Grade": "A",
    "Rank": 2
  },
  {
    "Student": "Kenal Dezzy",
    "Admission No": "18050",
    "Father Name": "Rey Dezzy",
    "Marks": {
      "English": { "Theory": 65.0, "Practical": "xx" },
      "Science": { "Theory": 76.0, "Practical": 74.0 },
      "Elective 1": { "Theory": 76.0, "Practical": 65.0 },
      "Mathematics": { "Theory": 75.0, "Practical": "xx" }
    },
    "Total Marks": "431/550",
    "Percentage": 78.36,
    "Grade": "B+",
    "Rank": 3
  },
  {
    "Student": "Laura Clinton",
    "Admission No": "18004",
    "Father Name": "Michael Clinton",
    "Marks": {
      "English": { "Theory": 76.0, "Practical": "xx" },
      "Science": { "Theory": 23.0, "Practical": 45.0 },
      "Elective 1": { "Theory": 78.0, "Practical": 74.0 },
      "Mathematics": { "Theory": 67.0, "Practical": "xx" }
    },
    "Total Marks": "363/550",
    "Percentage": 66.0,
    "Grade": "B",
    "Rank": 4
  },
  {
    "Student": "Rahul Sinha",
    "Admission No": "18029",
    "Father Name": "G S SINHA",
    "Marks": {
      "English": { "Theory": 66.0, "Practical": "xx" },
      "Science": { "Theory": 66.0, "Practical": 56.0 },
      "Elective 1": { "Theory": 42.0, "Practical": 67.0 },
      "Mathematics": { "Theory": 45.0, "Practical": "xx" }
    },
    "Total Marks": "342/550",
    "Percentage": 62.18,
    "Grade": "B",
    "Rank": 5
  },
  {
    "Student": "Saurabh Shah",
    "Admission No": "908875",
    "Father Name": "Vinay Shah",
    "Marks": {
      "English": { "Theory": 55.0, "Practical": "xx" },
      "Science": { "Theory": 56.0, "Practical": 55.0 },
      "Elective 1": { "Theory": 55.0, "Practical": 55.0 },
      "Mathematics": { "Theory": 56.0, "Practical": "xx" }
    },
    "Total Marks": "332/550",
    "Percentage": 60.36,
    "Grade": "B",
    "Rank": 6
  },
  {
    "Student": "Apolline",
    "Admission No": "18016",
    "Father Name": "Elanie",
    "Marks": {
      "English": { "Theory": 33.0, "Practical": "xx" },
      "Science": { "Theory": 33.0, "Practical": 34.0 },
      "Elective 1": { "Theory": 66.0, "Practical": 57.0 },
      "Mathematics": { "Theory": 78.0, "Practical": "xx" }
    },
    "Total Marks": "301/550",
    "Percentage": 54.73,
    "Grade": "C",
    "Rank": 7
  },
  {
    "Student": "Yash Sinha",
    "Admission No": "36220",
    "Father Name": "Arjun",
    "Marks": {
      "English": { "Theory": 78.0, "Practical": "xx" },
      "Science": { "Theory": 88.0, "Practical": 34.0 },
      "Elective 1": { "Theory": 67.0, "Practical": 33.0 },
      "Mathematics": { "Theory": "ABS", "Practical": "xx" }
    },
    "Total Marks": "300/550",
    "Percentage": 54.55,
    "Grade": "C",
    "Rank": 8
  },
  {
    "Student": "Kriti Singh",
    "Admission No": "18010",
    "Father Name": "Manish Singh",
    "Marks": {
      "English": { "Theory": 55.0, "Practical": "xx" },
      "Science": { "Theory": 77.0, "Practical": 42.0 },
      "Elective 1": { "Theory": 34.0, "Practical": 33.0 },
      "Mathematics": { "Theory": 56.0, "Practical": "xx" }
    },
    "Total Marks": "297/550",
    "Percentage": 54.0,
    "Grade": "C",
    "Rank": 9
  },
  {
    "Student": "Robin Peterson",
    "Admission No": "18002",
    "Father Name": "Lucas Peterson",
    "Marks": {
      "English": { "Theory": 34.0, "Practical": "xx" },
      "Science": { "Theory": 56.0, "Practical": 42.0 },
      "Elective 1": { "Theory": 56.0, "Practical": 56.0 },
      "Mathematics": { "Theory": 45.0, "Practical": "xx" }
    },
    "Total Marks": "289/550",
    "Percentage": 52.55,
    "Grade": "C",
    "Rank": 10
  },
  {
    "Student": "Karuna Rana",
    "Admission No": "18023",
    "Father Name": "Rajesh Rana",
    "Marks": {
      "English": { "Theory": 67.0, "Practical": "xx" },
      "Science": { "Theory": 67.0, "Practical": 55.0 },
      "Elective 1": { "Theory": 34.0, "Practical": "ABS" },
      "Mathematics": { "Theory": 45.0, "Practical": "xx" }
    },
    "Total Marks": "268/550",
    "Percentage": 48.73,
    "Grade": "D",
    "Rank": 11
  },
  {
    "Student": "Brian Kohlar",
    "Admission No": "18007",
    "Father Name": "Nick Kohlar",
    "Marks": {
      "English": { "Theory": "ABS", "Practical": "xx" },
      "Science": { "Theory": 67.0, "Practical": 23.0 },
      "Elective 1": { "Theory": 66.0, "Practical": 67.0 },
      "Mathematics": { "Theory": 33.0, "Practical": "xx" }
    },
    "Total Marks": "256/550",
    "Percentage": 46.55,
    "Grade": "D",
    "Rank": 12
  },
  {
    "Student": "Benjamin Gates",
    "Admission No": "18013",
    "Father Name": "Nathan Gates",
    "Marks": {
      "English": { "Theory": 34.0, "Practical": "xx" },
      "Science": { "Theory": 34.0, "Practical": 23.0 },
      "Elective 1": { "Theory": 66.0, "Practical": 56.0 },
      "Mathematics": { "Theory": 34.0, "Practical": "xx" }
    },
    "Total Marks": "247/550",
    "Percentage": 44.91,
    "Grade": "D",
    "Rank": 13
  },
  {
    "Student": "Glen Stark",
    "Admission No": "18005",
    "Father Name": "James Stark",
    "Marks": {
      "English": { "Theory": 34.0, "Practical": "xx" },
      "Science": { "Theory": "ABS", "Practical": 55.0 },
      "Elective 1": { "Theory": 45.0, "Practical": 34.0 },
      "Mathematics": { "Theory": 67.0, "Practical": "xx" }
    },
    "Total Marks": "235/550",
    "Percentage": 42.73,
    "Grade": "D",
    "Rank": 14
  },
  {
    "Student": "Devin Coinneach",
    "Admission No": "18014",
    "Father Name": "jack Coinneach",
    "Marks": {
      "English": { "Theory": 67.0, "Practical": "xx" },
      "Science": { "Theory": 67.0, "Practical": "ABS" },
      "Elective 1": { "Theory": 34.0, "Practical": "ABS" },
      "Mathematics": { "Theory": 55.0, "Practical": "xx" }
    },
    "Total Marks": "223/550",
    "Percentage": 40.55,
    "Grade": "D",
    "Rank": 15
  },
  {
    "Student": "Markus Stones",
    "Admission No": "980879",
    "Father Name": "Jonson Stones",
    "Marks": {
      "English": { "Theory": 34.0, "Practical": "xx" },
      "Science": { "Theory": 34.0, "Practical": 34.0 },
      "Elective 1": { "Theory": 34.0, "Practical": 23.0 },
      "Mathematics": { "Theory": 55.0, "Practical": "xx" }
    },
    "Total Marks": "214/550",
    "Percentage": 38.91,
    "Grade": "E",
    "Rank": 16
  },
  {
    "Student": "Jhonson wood",
    "Admission No": "18025",
    "Father Name": "David",
    "Marks": {
      "English": { "Theory": 34.0, "Practical": "xx" },
      "Science": { "Theory": 34.0, "Practical": 23.0 },
      "Elective 1": { "Theory": 66.0, "Practical": 34.0 },
      "Mathematics": { "Theory": 22.0, "Practical": "xx" }
    },
    "Total Marks": "213/550",
    "Percentage": 38.73,
    "Grade": "E",
    "Rank": 17
  }
]

export default examDetails;