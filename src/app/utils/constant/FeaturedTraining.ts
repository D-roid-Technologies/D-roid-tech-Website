export type Course = {
    id: number;
    title: string;
    trainings: string[];
    descriptions: {
      [key: string]: {
        explanation: string;
        procedures: string[];
      };
    };
  };
  
  export const courses: Course[] = [
    {
      id: 1,
      title: "Secondary School Tech Trainings",
      trainings: [
        "Introduction to Coding (Python Basics)",
        "Web Development (HTML, CSS, JavaScript)",
        "Robotics and Automation",
        "App Development (Using MIT App Inventor)",
        "Digital Design and Creativity (Using Canva and Photoshop)",
        "Cybersecurity Basics",
        "Data Science and Analysis (Using Excel and Python)",
        "Introduction to Artificial Intelligence and Machine Learning",
        "3D Printing and Design (Using Tinkercad)",
        "Introduction to Networking (Cisco Networking Basics)"
      ],
      descriptions: {
        "Introduction to Coding (Python Basics)": {
          explanation: "This course introduces students to the fundamentals of coding using Python, one of the most popular and versatile programming languages. Students will learn about variables, data types, control structures, functions, and basic algorithms.",
          procedures: [
            "Week 1: Introduction to Python and setting up the environment (e.g., using Anaconda or Thonny).",
            "Week 2: Understanding variables and data types.",
            "Week 3: Control structures (if-else statements, loops).",
            "Week 4: Functions and modular programming.",
            "Week 5: Basic algorithms and problem-solving.",
            "Week 6: Mini projects and practical applications."
          ]
        },
        "Web Development (HTML, CSS, JavaScript)": {
          explanation: "Students will learn how to create and design their own websites using HTML for structure, CSS for styling, and JavaScript for interactivity.",
          procedures: [
            "Week 1: Introduction to HTML and basic tags.",
            "Week 2: Advanced HTML (forms, tables).",
            "Week 3: Introduction to CSS and styling basics.",
            "Week 4: Advanced CSS (layouts, flexbox, grid).",
            "Week 5: Introduction to JavaScript and basic programming concepts.",
            "Week 6: Creating interactive web pages with JavaScript.",
            "Week 7: Mini project – Building a personal website."
          ]
        },
        // ... (other training course descriptions)
      }
    },
    {
      id: 2,
      title: "University Tech Trainings",
      trainings: [
        "Advanced Programming (Python, Java, C++)",
        "Full Stack Web Development",
        "Data Science and Big Data Analytics",
        "Cybersecurity and Ethical Hacking",
        "Artificial Intelligence and Machine Learning",
        "Cloud Computing and DevOps",
        "Mobile App Development (iOS and Android)",
        "Blockchain and Cryptography",
        "Internet of Things (IoT)",
        "UX/UI Design",
        "Digital Marketing and SEO",
        "Game Development",
        "AR/VR Development",
        "Network Administration and Security",
        "Advanced Database Management Systems",
        "Software Testing and Quality Assurance",
        "Robotic Process Automation (RPA)",
        "Computer Vision",
        "Quantum Computing",
        "Natural Language Processing (NLP)"
      ],
      descriptions: {
        "Advanced Programming (Python, Java, C++)": {
          explanation: "Students will deepen their programming skills in advanced languages such as Python, Java, and C++. This course covers object-oriented programming, data structures, algorithms, and software development practices.",
          procedures: [
            "Week 1: Review of basics and setup environment.",
            "Week 2: Object-oriented programming concepts.",
            "Week 3: Advanced data structures and algorithms.",
            "Week 4: Software development methodologies.",
            "Week 5: Hands-on coding projects.",
            "Week 6: Capstone project."
          ]
        },
        "Full Stack Web Development": {
          explanation: "This course covers both front-end and back-end web development, teaching students to build complete web applications using frameworks like React, Node.js, Express, and databases like MongoDB.",
          procedures: [
            "Week 1: Introduction to HTML, CSS, and JavaScript.",
            "Week 2: Front-end development with React.",
            "Week 3: Back-end development with Node.js and Express.",
            "Week 4: Database integration with MongoDB.",
            "Week 5: Building and deploying full-stack applications.",
            "Week 6: Capstone project."
          ]
        },
        // ... (other training course descriptions)
      }
    },
    {
      id: 3,
      title: "Organisation Training",
      trainings: [
        "Cybersecurity Awareness and Best Practices",
        "Data Privacy and GDPR Compliance",
        "Cloud Computing and Infrastructure Management",
        "DevOps and Continuous Integration/Continuous Deployment (CI/CD)",
        "Data Analytics and Business Intelligence",
        "Artificial Intelligence and Machine Learning for Business",
        "Blockchain for Enterprise Applications",
        "Internet of Things (IoT) Integration",
        "Advanced Project Management Tools and Techniques",
        "Digital Transformation Strategies",
        "Advanced Excel and Data Analysis",
        "Business Process Automation with RPA",
        "Customer Relationship Management (CRM) Systems",
        "Enterprise Resource Planning (ERP) Systems",
        "Network Security and Management",
        "Web and Mobile Application Development",
        "User Experience (UX) and User Interface (UI) Design",
        "Agile Methodologies and Scrum",
        "Digital Marketing Strategies",
        "Software Testing and Quality Assurance"
      ],
      descriptions: {
        "Cybersecurity Awareness and Best Practices": {
          explanation: "This course focuses on educating employees about the importance of cybersecurity and how to protect the organization against cyber threats. Topics include recognizing phishing attempts, using strong passwords, and following security protocols.",
          procedures: [
            "Week 1: Introduction to cybersecurity and common threats.",
            "Week 2: Best practices for secure passwords and authentication.",
            "Week 3: Recognizing and responding to phishing and social engineering.",
            "Week 4: Secure handling of sensitive information.",
            "Week 5: Regular security audits and updates.",
            "Week 6: Capstone project on implementing a security plan."
          ]
        },
        "Data Privacy and GDPR Compliance": {
          explanation: "This training ensures that employees understand data privacy laws, especially the General Data Protection Regulation (GDPR), and know how to handle personal data responsibly.",
          procedures: [
            "Week 1: Overview of data privacy laws and GDPR.",
            "Week 2: Identifying personal data and data subject rights.",
            "Week 3: Data processing principles and legal bases.",
            "Week 4: Implementing data protection measures.",
            "Week 5: Data breach management and reporting.",
            "Week 6: Capstone project on creating a GDPR compliance plan."
          ]
        },
        // ... (other training course descriptions)
      }
    },
    {
      id: 4,
      title: "Basic Training",
      trainings: [
        "Introduction to Programming with Python",
        "Introduction to Web Development (HTML, CSS, JavaScript)",
        "Introduction to Java Programming",
        "Introduction to C++ Programming",
        "Introduction to Mobile App Development (Kotlin for Android)",
        "Introduction to SQL and Databases",
        "Introduction to Data Science with Python",
        "Introduction to Game Development with Unity",
        "Introduction to Git and Version Control",
        "Introduction to API Development and Integration"
      ],
      descriptions: {
        "Introduction to Programming with Python": {
          explanation: "This course introduces the fundamentals of programming using Python, a beginner-friendly language known for its readability and versatility.",
          procedures: [
            "Week 1: Setting up Python environment, basic syntax, and data types.",
            "Week 2: Control structures (if statements, loops).",
            "Week 3: Functions and modules.",
            "Week 4: Lists, dictionaries, and other data structures.",
            "Week 5: File I/O operations.",
            "Week 6: Capstone project (building a small application)."
          ]
        },
        "Introduction to Web Development (HTML, CSS, JavaScript)": {
          explanation: "Students learn the basics of web development, including how to create and style web pages using HTML, CSS, and JavaScript.",
          procedures: [
            "Week 1: Introduction to HTML and basic tags.",
            "Week 2: Structuring content with HTML.",
            "Week 3: Introduction to CSS and basic styling.",
            "Week 4: Advanced CSS techniques (flexbox, grid).",
            "Week 5: Introduction to JavaScript and interactivity.",
            "Week 6: Capstone project (creating a static website)."
          ]
        },
        // ... (other training course descriptions)
      }
    },
    {
      id: 5,
      title: "Basic Web Training",
      trainings: [
        "HTML & CSS Fundamentals",
        "Advanced CSS Techniques",
        "JavaScript Essentials",
        "Responsive Web Design",
        "Front-End Frameworks (React.js)",
        "Back-End Development (Node.js)",
        "Full-Stack Development",
        "Web Performance Optimization",
        "Web Security Essentials",
        "API Development and Integration"
      ],
      descriptions: {
        "HTML & CSS Fundamentals": {
          explanation: "This course introduces the basic building blocks of web development: HTML for content structure and CSS for styling.",
          procedures: [
            "Week 1: Introduction to HTML, basic tags, and document structure.",
            "Week 2: Creating and structuring web pages with semantic HTML elements.",
            "Week 3: Introduction to CSS, selectors, and properties.",
            "Week 4: Styling text, boxes, and layout with CSS.",
            "Week 5: Building a simple web page project incorporating learned concepts.",
            "Week 6: Capstone project (building a multi-page static website)."
          ]
        },
        "Advanced CSS Techniques": {
          explanation: "This course delves deeper into CSS, covering advanced techniques for layout and design.",
          procedures: [
            "Week 1: Advanced selectors and pseudo-classes/elements.",
            "Week 2: CSS Grid and Flexbox for responsive layouts.",
            "Week 3: Animations and transitions with CSS.",
            "Week 4: CSS preprocessors (Sass, LESS).",
            "Week 5: Building a complex responsive layout project.",
            "Week 6: Capstone project (creating a fully responsive web design)."
          ]
        },
        // ... (other training course descriptions)
      }
    }
  ];