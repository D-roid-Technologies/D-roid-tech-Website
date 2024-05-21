export type Course = {
  id: number;
  title: string;
  description?: string;
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
      "Introduction to Networking (Cisco Networking Basics)",
    ],
    descriptions: {
      "Introduction to Coding (Python Basics)": {
        explanation:
          "This course introduces students to the fundamentals of coding using Python, one of the most popular and versatile programming languages. Students will learn about variables, data types, control structures, functions, and basic algorithms.",
        procedures: [
          "Week 1: Introduction to Python and setting up the environment (e.g., using Anaconda or Thonny).",
          "Week 2: Understanding variables and data types.",
          "Week 3: Control structures (if-else statements, loops).",
          "Week 4: Functions and modular programming.",
          "Week 5: Basic algorithms and problem-solving.",
          "Week 6: Mini projects and practical applications.",
        ],
      },
      "Web Development (HTML, CSS, JavaScript)": {
        explanation:
          "Students will learn how to create and design their own websites using HTML for structure, CSS for styling, and JavaScript for interactivity.",
        procedures: [
          "Week 1: Introduction to HTML and basic tags.",
          "Week 2: Advanced HTML (forms, tables).",
          "Week 3: Introduction to CSS and styling basics.",
          "Week 4: Advanced CSS (layouts, flexbox, grid).",
          "Week 5: Introduction to JavaScript and basic programming concepts.",
          "Week 6: Creating interactive web pages with JavaScript.",
          "Week 7: Mini project – Building a personal website.",
        ],
      },
      "Robotics and Automation": {
        explanation:
          "This course provides hands-on experience with building and programming robots using kits like LEGO Mindstorms or VEX Robotics. Students learn the basics of automation and robotic controls.",
        procedures: [
          "Week 1: Introduction to robotics and assembling the robot.",
          "Week 2: Basic programming and controlling movements.",
          "Week 3: Using sensors and responding to the environment.",
          "Week 4: Advanced programming concepts.",
          "Week 5: Building complex robotic functions.",
          "Week 6: Mini project – Designing and programming a robotic task.",
        ],
      },
      "App Development (Using MIT App Inventor)": {
        explanation:
          "Students will learn to create simple mobile applications using MIT App Inventor, a visual programming environment.",
        procedures: [
          "Week 1: Introduction to mobile app development and MIT App Inventor.",
          "Week 2: Creating simple user interfaces.",
          "Week 3: Adding functionality with blocks.",
          "Week 4: Using sensors and media in apps.",
          "Week 5: Advanced app development techniques.",
          "Week 6: Mini project – Developing a personal app.",
        ],
      },

      "Digital Design and Creativity (Using Canva and Photoshop)": {
        explanation:
          "Students will explore digital design principles and tools, using Canva for online design and Adobe Photoshop for more advanced image editing.",
        procedures: [
          "Week 1: Introduction to digital design and Canva.",
          "Week 2: Creating social media graphics and presentations.",
          "Week 3: Basics of Photoshop (interface, tools).",
          "Week 4: Photo editing and manipulation.",
          "Week 5: Advanced Photoshop techniques (layers, masks).",
          "Week 6: Mini project – Designing a digital portfolio.",
        ],
      },
      "Cybersecurity Basics": {
        explanation:
          "This course covers fundamental cybersecurity concepts, including online safety, data protection, and basic security measures.",
        procedures: [
          "Week 1: Introduction to cybersecurity and the importance of online safety.",
          "Week 2: Understanding common threats (malware, phishing).",
          "Week 3: Basics of encryption and data protection.",
          "Week 4: Secure passwords and authentication methods.",
          "Week 5: Social engineering and how to avoid it.",
          "Week 6: Mini project – Creating a cybersecurity awareness campaign.",
        ],
      },
      "Data Science and Analysis (Using Excel and Python)": {
        explanation:
          "Students will learn how to collect, analyze, and visualize data using Excel and Python.",
        procedures: [
          "Week 1: Introduction to data science and Excel basics.",
          "Week 2: Data cleaning and manipulation in Excel.",
          "Week 3: Introduction to Python for data analysis.",
          "Week 4: Data visualization techniques.",
          "Week 5: Advanced data analysis with Python.",
          "Week 6: Mini project – Analyzing a real-world dataset.",
        ],
      },
      "Introduction to Artificial Intelligence and Machine Learning": {
        explanation:
          "Students will gain a basic understanding of AI and machine learning concepts, using tools like Google Teachable Machine.",
        procedures: [
          "Week 1: Introduction to AI and its applications.",
          "Week 2: Basics of machine learning.",
          "Week 3: Using Google Teachable Machine for simple models.",
          "Week 4: Understanding data and training models.",
          "Week 5: Exploring different types of AI models.",
          "Week 6: Mini project – Creating a simple AI application.",
        ],
      },
      "3D Printing and Design (Using Tinkercad)": {
        explanation:
          "This course introduces students to 3D design and printing using Tinkercad, a user-friendly 3D modeling tool.",
        procedures: [
          "Week 1: Introduction to 3D printing and Tinkercad.",
          "Week 2: Basics of 3D design (shapes, scaling).",
          "Week 3: Creating complex models.",
          "Week 4: Preparing models for 3D printing.",
          "Week 5: Printing and troubleshooting.",
          "Week 6: Mini project – Designing and printing a 3D object.",
        ],
      },
      "Introduction to Networking (Cisco Networking Basics)": {
        explanation:
          "Students will learn the basics of computer networking, including how networks operate, network devices, and basic configuration.",
        procedures: [
          "Week 1: Introduction to networking and its importance.",
          "Week 2: Understanding network components (routers, switches).",
          "Week 3: Basic network configurations and IP addressing.",
          "Week 4: Setting up a home network.",
          "Week 5: Troubleshooting network issues.",
          "Week 6: Mini project – Designing a simple network.",
        ],
      },
    },
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
      "Natural Language Processing (NLP)",
    ],
    descriptions: {
      "Advanced Programming (Python, Java, C++)": {
        explanation:
          "Students will deepen their programming skills in advanced languages such as Python, Java, and C++. This course covers object-oriented programming, data structures, algorithms, and software development practices.",
        procedures: [
          "Week 1: Review of basics and setup environment.",
          "Week 2: Object-oriented programming concepts.",
          "Week 3: Advanced data structures and algorithms.",
          "Week 4: Software development methodologies.",
          "Week 5: Hands-on coding projects.",
          "Week 6: Capstone project.",
        ],
      },
      "Full Stack Web Development": {
        explanation:
          "This course covers both front-end and back-end web development, teaching students to build complete web applications using frameworks like React, Node.js, Express, and databases like MongoDB.",
        procedures: [
          "Week 1: Introduction to HTML, CSS, and JavaScript.",
          "Week 2: Front-end development with React.",
          "Week 3: Back-end development with Node.js and Express.",
          "Week 4: Database integration with MongoDB.",
          "Week 5: Building and deploying full-stack applications.",
          "Week 6: Capstone project.",
        ],
      },
      "Data Science and Big Data Analytics": {
        explanation:
          "Students will learn how to handle and analyze large datasets using tools like Python, R, Hadoop, and Spark, with a focus on statistical analysis, data visualization, and machine learning.",
        procedures: [
          "Week 1: Introduction to data science and setting up the environment.",
          "Week 2: Data manipulation and cleaning.",
          "Week 3: Statistical analysis and visualization.",
          "Week 4: Machine learning fundamentals.",
          "Week 5: Big data technologies (Hadoop, Spark).",
          "Week 6: Capstone project.",
        ],
      },
      "Cybersecurity and Ethical Hacking": {
        explanation:
          "This course covers the principles of cybersecurity, ethical hacking, and penetration testing, teaching students to protect systems and data against cyber threats.",
        procedures: [
          "Week 1: Introduction to cybersecurity concepts.",
          "Week 2: Network security and cryptography.",
          "Week 3: Ethical hacking methodologies.",
          "Week 4: Tools for penetration testing.",
          "Week 5: Incident response and recovery.",
          "Week 6: Capstone project.",
        ],
      },
      "Artificial Intelligence and Machine Learning": {
        explanation:
          "Students will explore AI and machine learning concepts, including supervised and unsupervised learning, neural networks, and deep learning using frameworks like TensorFlow and PyTorch.",
        procedures: [
          "Week 1: Introduction to AI and machine learning.",
          "Week 2: Supervised learning algorithms.",
          "Week 3: Unsupervised learning algorithms.",
          "Week 4: Neural networks and deep learning.",
          "Week 5: Model evaluation and optimization.",
          "Week 6: Capstone project.",
        ],
      },
      "Cloud Computing and DevOps": {
        explanation:
          "This course covers cloud computing concepts and DevOps practices, teaching students to deploy and manage applications on cloud platforms like AWS, Azure, and Google Cloud, and to implement CI/CD pipelines.",
        procedures: [
          "Week 1: Introduction to cloud computing.",
          "Week 2: Setting up and managing cloud environments.",
          "Week 3: Introduction to DevOps and CI/CD.",
          "Week 4: Automating deployment with Jenkins, Docker, and Kubernetes.",
          "Week 5: Monitoring and scaling applications.",
          "Week 6: Capstone project.",
        ],
      },
      "Mobile App Development (iOS and Android)": {
        explanation:
          "Students will learn to develop mobile applications for iOS and Android using Swift, Kotlin, and cross-platform tools like React Native or Flutter.",
        procedures: [
          "Week 1: Introduction to mobile app development.",
          "Week 2: iOS development with Swift.",
          "Week 3: Android development with Kotlin.",
          "Week 4: Cross-platform development with React Native/Flutter.",
          "Week 5: Testing and deploying mobile apps.",
          "Week 6: Capstone project.",
        ],
      },
      "Blockchain and Cryptography": {
        explanation:
          "This course introduces students to blockchain technology and cryptography, covering concepts such as decentralized applications, smart contracts, and blockchain security.",
        procedures: [
          "Week 1: Introduction to blockchain technology.",
          "Week 2: Cryptographic principles.",
          "Week 3: Developing smart contracts.",
          "Week 4: Blockchain platforms (Ethereum, Hyperledger).",
          "Week 5: Security and privacy in blockchain.",
          "Week 6: Capstone project.",
        ],
      },
      "Internet of Things (IoT)": {
        explanation:
          "Students will learn about IoT technology, including the development and integration of IoT devices, sensors, and data management.",
        procedures: [
          "Week 1: Introduction to IoT concepts.",
          "Week 2: Setting up IoT devices and sensors.",
          "Week 3: Data collection and processing.",
          "Week 4: IoT communication protocols.",
          "Week 5: IoT security.",
          "Week 6: Capstone project.",
        ],
      },
      "UX/UI Design": {
        explanation:
          "This course focuses on user experience and user interface design principles, teaching students to create intuitive and aesthetically pleasing digital interfaces.",
        procedures: [
          "Week 1: Introduction to UX/UI design.",
          "Week 2: User research and personas.",
          "Week 3: Wireframing and prototyping.",
          "Week 4: Visual design principles.",
          "Week 5: Usability testing and feedback.",
          "Week 6: Capstone project.",
        ],
      },
      "Digital Marketing and SEO": {
        explanation:
          "Students will learn about digital marketing strategies and search engine optimization (SEO) techniques to enhance online visibility and engagement.",
        procedures: [
          "Week 1: Introduction to digital marketing.",
          "Week 2: SEO fundamentals.",
          "Week 3: Content marketing and social media strategies.",
          "Week 4: PPC and online advertising.",
          "Week 5: Analyzing and optimizing campaigns.",
          "Week 6: Capstone project.",
        ],
      },
      "Game Development": {
        explanation:
          "This course teaches students the fundamentals of game development using game engines like Unity or Unreal Engine, covering design, development, and deployment of games.",
        procedures: [
          "Week 1: Introduction to game development.",
          "Week 2: Basic game design principles.",
          "Week 3: Using Unity/Unreal Engine for game development.",
          "Week 4: Scripting and interaction.",
          "Week 5: Game testing and optimization.",
          "Week 6: Capstone project.",
        ],
      },
      "AR/VR Development": {
        explanation:
          "Students will explore augmented reality (AR) and virtual reality (VR) technologies, learning to create immersive experiences using tools like Unity and AR/VR SDKs.",
        procedures: [
          "Week 1: Introduction to AR/VR concepts.",
          "Week 2: Setting up AR/VR development environments.",
          "Week 3: Creating AR experiences.",
          "Week 4: Developing VR environments.",
          "Week 5: Advanced AR/VR interactions.",
          "Week 6: Capstone project.",
        ],
      },
      "Network Administration and Security": {
        explanation:
          "This course covers the fundamentals of network administration and security, teaching students to configure and manage network infrastructures and secure networks from threats.",
        procedures: [
          "Week 1: Introduction to network administration.",
          "Week 2: Network configuration and management.",
          "Week 3: Network security principles.",
          "Week 4: Implementing security measures.",
          "Week 5: Network monitoring and troubleshooting.",
          "Week 6: Capstone project.",
        ],
      },
      "Advanced Database Management Systems": {
        explanation:
          "Students will learn advanced concepts in database management, including SQL, NoSQL, database design, and optimization techniques.",
        procedures: [
          "Week 1: Introduction to database systems.",
          "Week 2: Advanced SQL queries.",
          "Week 3: NoSQL databases.",
          "Week 4: Database design and normalization.",
          "Week 5: Performance optimization and indexing.",
          "Week 6: Capstone project.",
        ],
      },
      "Software Testing and Quality Assurance": {
        explanation:
          "This course teaches the principles and practices of software testing and quality assurance, covering testing methodologies, tools, and best practices.",
        procedures: [
          "Week 1: Introduction to software testing.",
          "Week 2: Types of testing (unit, integration, system).",
          "Week 3: Automated testing tools.",
          "Week 4: Writing and executing test cases.",
        ],
      },
    },
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
      "Software Testing and Quality Assurance",
    ],
    descriptions: {
      "Cybersecurity Awareness and Best Practices": {
        explanation:
          "This course focuses on educating employees about the importance of cybersecurity and how to protect the organization against cyber threats. Topics include recognizing phishing attempts, using strong passwords, and following security protocols.",
        procedures: [
          "Week 1: Introduction to cybersecurity and common threats.",
          "Week 2: Best practices for secure passwords and authentication.",
          "Week 3: Recognizing and responding to phishing and social engineering.",
          "Week 4: Secure handling of sensitive information.",
          "Week 5: Regular security audits and updates.",
          "Week 6: Capstone project on implementing a security plan.",
        ],
      },
      "Data Privacy and GDPR Compliance": {
        explanation:
          "This training ensures that employees understand data privacy laws, especially the General Data Protection Regulation (GDPR), and know how to handle personal data responsibly.",
        procedures: [
          "Week 1: Overview of data privacy laws and GDPR.",
          "Week 2: Identifying personal data and data subject rights.",
          "Week 3: Data processing principles and legal bases.",
          "Week 4: Implementing data protection measures.",
          "Week 5: Data breach management and reporting.",
          "Week 6: Capstone project on creating a GDPR compliance plan.",
        ],
      },
      "Cloud Computing and Infrastructure Management": {
        explanation:
          "This course covers the essentials of cloud computing, including cloud service models (IaaS, PaaS, SaaS), cloud deployment models (public, private, hybrid), and managing cloud infrastructure.",
        procedures: [
          "Week 1: Introduction to cloud computing concepts.",
          "Week 2: Cloud service and deployment models.",
          "Week 3: Setting up and managing cloud infrastructure.",
          "Week 4: Cloud security and compliance.",
          "Week 5: Cost management and optimization.",
          "Week 6: Capstone project on deploying a cloud solution.",
        ],
      },
      "DevOps and Continuous Integration/Continuous Deployment (CI/CD)": {
        explanation:
          "This training focuses on the DevOps methodology and CI/CD practices to improve collaboration between development and operations teams and automate the software delivery process.",
        procedures: [
          "Week 1: Introduction to DevOps principles and practices.",
          "Week 2: Setting up CI/CD pipelines.",
          "Week 3: Using tools like Jenkins, Docker, and Kubernetes.",
          "Week 4: Monitoring and logging in DevOps.",
          "Week 5: Security in CI/CD processes.",
          "Week 6: Capstone project on implementing a CI/CD pipeline.",
        ],
      },
      "Data Analytics and Business Intelligence": {
        explanation:
          "This course teaches employees how to analyze data and use business intelligence tools to make informed business decisions.",
        procedures: [
          "Week 1: Introduction to data analytics and BI concepts.",
          "Week 2: Data collection and cleaning.",
          "Week 3: Using tools like Power BI, Tableau, and Excel.",
          "Week 4: Data visualization techniques.",
          "Week 5: Advanced analytics and predictive modeling.",
          "Week 6: Capstone project on creating a BI report.",
        ],
      },
      "Artificial Intelligence and Machine Learning for Business": {
        explanation:
          "This training introduces AI and machine learning concepts and their applications in business, including predictive analytics, automation, and data-driven decision-making.",
        procedures: [
          "Week 1: Introduction to AI and machine learning.",
          "Week 2: Supervised and unsupervised learning algorithms.",
          "Week 3: Using tools like TensorFlow and PyTorch.",
          "Week 4: Implementing machine learning models.",
          "Week 5: Evaluating and optimizing models.",
          "Week 6: Capstone project on deploying an AI solution.",
        ],
      },
      "Blockchain for Enterprise Applications": {
        explanation:
          "This course covers blockchain technology and its applications in business, including smart contracts, decentralized applications, and blockchain security.",
        procedures: [
          "Week 1: Introduction to blockchain technology.",
          "Week 2: Cryptographic principles and blockchain security.",
          "Week 3: Developing and deploying smart contracts.",
          "Week 4: Blockchain platforms (Ethereum, Hyperledger).",
          "Week 5: Use cases and applications in business.",
          "Week 6: Capstone project on creating a blockchain application.",
        ],
      },
      "Internet of Things (IoT) Integration": {
        explanation:
          "This training focuses on integrating IoT devices into business operations, including device setup, data collection, and analysis.",
        procedures: [
          "Week 1: Introduction to IoT concepts.",
          "Week 2: Setting up IoT devices and sensors.",
          "Week 3: Data collection and processing.",
          "Week 4: IoT communication protocols.",
          "Week 5: IoT security and privacy.",
          "Week 6: Capstone project on deploying an IoT solution.",
        ],
      },
      "Advanced Project Management Tools and Techniques": {
        explanation:
          "This course covers advanced project management methodologies, including Agile, Scrum, and Kanban, as well as tools like Jira and Trello.",
        procedures: [
          "Week 1: Overview of project management methodologies.",
          "Week 2: Setting up and using project management tools.",
          "Week 3: Agile project management and Scrum practices.",
          "Week 4: Kanban and Lean principles.",
          "Week 5: Risk management and mitigation.",
          "Week 6: Capstone project on managing a project using Agile or Scrum.",
        ],
      },
      "Digital Transformation Strategies": {
        explanation:
          "This training helps organizations develop and implement digital transformation strategies to improve efficiency, enhance customer experiences, and drive innovation.",
        procedures: [
          "Week 1: Introduction to digital transformation.",
          "Week 2: Assessing current digital maturity.",
          "Week 3: Identifying opportunities for digital transformation.",
          "Week 4: Developing a digital transformation roadmap.",
          "Week 5: Implementing digital solutions.",
          "Week 6: Capstone project on creating a digital transformation plan.",
        ],
      },
      "Advanced Excel and Data Analysis": {
        explanation:
          "This course teaches advanced Excel functions and data analysis techniques to help employees make data-driven decisions.",
        procedures: [
          "Week 1: Advanced Excel functions and formulas.",
          "Week 2: Data manipulation and cleaning.",
          "Week 3: Pivot tables and data visualization.",
          "Week 4: Using Excel for statistical analysis.",
          "Week 5: Automating tasks with macros.",
          "Week 6: Capstone project on creating an Excel-based data analysis report.",
        ],
      },
      "Business Process Automation with RPA": {
        explanation:
          "This training covers Robotic Process Automation (RPA) tools and techniques to automate repetitive business processes and improve efficiency.",
        procedures: [
          "Week 1: Introduction to RPA concepts.",
          "Week 2: Identifying processes for automation.",
          "Week 3: Using RPA tools like UiPath and Blue Prism.",
          "Week 4: Developing and deploying RPA bots.",
          "Week 5: Monitoring and optimizing RPA processes.",
          "Week 6: Capstone project on implementing an RPA solution.",
        ],
      },
      "Customer Relationship Management (CRM) Systems": {
        explanation:
          "This course teaches the use of CRM systems like Salesforce and HubSpot to manage customer relationships and improve sales processes.",
        procedures: [
          "Week 1: Introduction to CRM concepts.",
          "Week 2: Setting up and customizing CRM systems.",
          "Week 3: Managing customer data and interactions.",
          "Week 4: Automating sales and marketing processes.",
          "Week 5: Analyzing CRM data for insights.",
          "Week 6: Capstone project on deploying a CRM solution.",
        ],
      },
      "Enterprise Resource Planning (ERP) Systems": {
        explanation:
          "This training covers the implementation and use of ERP systems like SAP and Oracle to integrate and manage business processes.",
        procedures: [
          "Week 1: Introduction to ERP concepts.",
          "Week 2: Setting up and configuring ERP systems.",
          "Week 3: Managing financial, HR, and supply chain processes.",
          "Week 4: Integrating ERP with other business systems.",
          "Week 5: ERP security and compliance.",
          "Week 6: Capstone project on deploying an ERP solution.",
        ],
      },
      "Network Security and Management": {
        explanation:
          "This course teaches network security principles and best practices to protect organizational networks from cyber threats.",
        procedures: [
          "Week 1: Introduction to network security concepts.",
          "Week 2: Setting up and managing network infrastructure.",
          "Week 3: Implementing firewalls and intrusion detection systems.",
        ],
      },
    },
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
      "Introduction to API Development and Integration",
    ],
    descriptions: {
      "Introduction to Programming with Python": {
        explanation:
          "This course introduces the fundamentals of programming using Python, a beginner-friendly language known for its readability and versatility.",
        procedures: [
          "Week 1: Setting up Python environment, basic syntax, and data types.",
          "Week 2: Control structures (if statements, loops).",
          "Week 3: Functions and modules.",
          "Week 4: Lists, dictionaries, and other data structures.",
          "Week 5: File I/O operations.",
          "Week 6: Capstone project (building a small application).",
        ],
      },
      "Introduction to Web Development (HTML, CSS, JavaScript)": {
        explanation:
          "Students learn the basics of web development, including how to create and style web pages using HTML, CSS, and JavaScript.",
        procedures: [
          "Week 1: Introduction to HTML and basic tags.",
          "Week 2: Structuring content with HTML.",
          "Week 3: Introduction to CSS and basic styling.",
          "Week 4: Advanced CSS techniques (flexbox, grid).",
          "Week 5: Introduction to JavaScript and interactivity.",
          "Week 6: Capstone project (creating a static website).",
        ],
      },
      "Introduction to Java Programming": {
        explanation:
          "This course covers the basics of Java programming, a widely-used language known for its portability across platforms.",
        procedures: [
          "Week 1: Setting up Java environment, basic syntax, and data types.",
          "Week 2: Control structures (if statements, loops).",
          "Week 3: Functions and object-oriented programming.",
          "Week 4: Arrays and collections.",
          "Week 5: File I/O operations and exceptions.",
          "Week 6: Capstone project (building a simple application).",
        ],
      },
      "Introduction to C++ Programming": {
        explanation:
          "Students learn the fundamentals of C++, a powerful language commonly used for system/software development and game programming.",
        procedures: [
          "Week 1: Setting up C++ environment, basic syntax, and data types.",
          "Week 2: Control structures (if statements, loops).",
          "Week 3: Functions and object-oriented programming.",
          "Week 4: Pointers and dynamic memory allocation.",
          "Week 5: File I/O operations.",
          "Week 6: Capstone project (building a console application).",
        ],
      },
      "Introduction to Mobile App Development (Kotlin for Android)": {
        explanation:
          "This course introduces the basics of mobile app development for Android using Kotlin, a modern and expressive language.",
        procedures: [
          "Week 1: Setting up Android Studio and Kotlin environment.",
          "Week 2: Basic Android components (activities, layouts).",
          "Week 3: User input and UI components.",
          "Week 4: Navigating between screens.",
          "Week 5: Data persistence and using SQLite.",
          "Week 6: Capstone project (building a simple Android app).",
        ],
      },
      "Introduction to SQL and Databases": {
        explanation:
          "Students learn the fundamentals of SQL and how to manage databases, a crucial skill for data management and backend development.",
        procedures: [
          "Week 1: Introduction to databases and SQL.",
          "Week 2: Creating and managing tables.",
          "Week 3: Inserting, updating, and deleting data.",
          "Week 4: Basic queries and data retrieval.",
          "Week 5: Advanced queries (joins, subqueries).",
          "Week 6: Capstone project (building and querying a database).",
        ],
      },
      "Introduction to Data Science with Python": {
        explanation:
          "This course covers the basics of data science using Python, focusing on data analysis, visualization, and basic machine learning.",
        procedures: [
          "Week 1: Setting up Python for data science (installing libraries like NumPy, Pandas).",
          "Week 2: Data manipulation with Pandas.",
          "Week 3: Data visualization with Matplotlib and Seaborn.",
          "Week 4: Introduction to machine learning with Scikit-learn.",
          "Week 5: Basic machine learning algorithms (linear regression, clustering).",
          "Week 6: Capstone project (analyzing a dataset and building a model).",
        ],
      },
      "Introduction to Game Development with Unity": {
        explanation:
          "Students learn the basics of game development using Unity, a popular game engine, and C# programming.",
        procedures: [
          "Week 1: Setting up Unity environment.",
          "Week 2: Basic Unity components (objects, scenes).",
          "Week 3: Introduction to C# scripting.",
          "Week 4: Implementing player controls and interactions.",
          "Week 5: Basic game physics and animations.",
          "Week 6: Capstone project (creating a simple game).",
        ],
      },
      "Introduction to Git and Version Control": {
        explanation:
          "This course covers the basics of Git, a version control system used to manage code changes and collaborate on software projects.",
        procedures: [
          "Week 1: Introduction to version control and Git concepts.",
          "Week 2: Setting up a Git repository and basic commands.",
          "Week 3: Branching and merging strategies.",
          "Week 4: Collaborating with Git (pull requests, code reviews).",
          "Week 5: Managing conflicts and resolving issues.",
          "Week 6: Capstone project (collaborating on a small project using Git).",
        ],
      },
      "Introduction to API Development and Integration": {
        explanation:
          "Students learn how to develop and integrate APIs (Application Programming Interfaces) to enable communication between software applications.",
        procedures: [
          "Week 1: Introduction to APIs and RESTful principles.",
          "Week 2: Setting up a server environment.",
          "Week 3: Creating basic APIs using frameworks like Flask (Python) or Express (Node.js).",
          "Week 4: Testing APIs using tools like Postman.",
          "Week 5: Consuming APIs in a web application.",
          "Week 6: Capstone project (building and integrating an API).",
        ],
      },
    },
  },
  {
    id: 5,
    title: "Basic Web Training",
    description:
      "Each of these training modules provides a thorough understanding of key web development concepts, from basic HTML and CSS to advanced full-stack development. The courses are structured to build upon each other, with a focus on practical, hands-on learning and culminating in capstone projects that reinforce the skills learned.",
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
      "API Development and Integration",
    ],
    descriptions: {
      "HTML & CSS Fundamentals": {
        explanation:
          "This course introduces the basic building blocks of web development: HTML for content structure and CSS for styling.",
        procedures: [
          "Week 1: Introduction to HTML, basic tags, and document structure.",
          "Week 2: Creating and structuring web pages with semantic HTML elements.",
          "Week 3: Introduction to CSS, selectors, and properties.",
          "Week 4: Styling text, boxes, and layout with CSS.",
          "Week 5: Building a simple web page project incorporating learned concepts.",
          "Week 6: Capstone project (building a multi-page static website).",
        ],
      },
      "Advanced CSS Techniques": {
        explanation:
          "This course delves deeper into CSS, covering advanced techniques for layout and design.",
        procedures: [
          "Week 1: Advanced selectors and pseudo-classes/elements.",
          "Week 2: CSS Grid and Flexbox for responsive layouts.",
          "Week 3: Animations and transitions with CSS.",
          "Week 4: CSS preprocessors (Sass, LESS).",
          "Week 5: Building a complex responsive layout project.",
          "Week 6: Capstone project (creating a fully responsive web design).",
        ],
      },
      "JavaScript Essentials": {
        explanation:
          "Students learn the fundamentals of JavaScript, the programming language that powers interactivity on the web.",
        procedures: [
          "Week 1: Introduction to JavaScript syntax, variables, and data types.",
          "Week 2: Control structures (if statements, loops).",
          "Week 3: Functions, objects, and arrays.",
          "Week 4: DOM manipulation and event handling.",
          "Week 5: Building a simple interactive web application.",
          "Week 6: Capstone project (creating a dynamic web application).",
        ],
      },
      "Responsive Web Design": {
        explanation:
          "This course covers techniques and best practices for creating websites that look great on all devices.",
        procedures: [
          "Week 1: Introduction to responsive design principles.",
          "Week 2: Media queries and responsive layout techniques.",
          "Week 3: Flexible images and responsive typography.",
          "Week 4: Mobile-first design approach.",
          "Week 5: Building a responsive web project.",
          "Week 6: Capstone project (creating a responsive website from scratch).",
        ],
      },
      "Front-End Frameworks (React.js)": {
        explanation:
          "Students learn to use React.js, a popular front-end library for building dynamic user interfaces.",
        procedures: [
          "Week 1: Introduction to React.js and component-based architecture.",
          "Week 2: JSX, props, and state management.",
          "Week 3: Handling events and form data in React.",
          "Week 4: Routing with React Router.",
          "Week 5: Building a small React application.",
          "Week 6: Capstone project (creating a complex React application).",
        ],
      },
      "Back-End Development (Node.js)": {
        explanation:
          "This course introduces back-end development using Node.js, an open-source, cross-platform runtime environment.",
        procedures: [
          "Week 1: Introduction to Node.js and setting up the environment.",
          "Week 2: Basics of server-side programming with Node.js.",
          "Week 3: Working with Express.js to create APIs.",
          "Week 4: Database integration with MongoDB.",
          "Week 5: Building a simple RESTful API.",
          "Week 6: Capstone project (creating a full-featured back-end application).",
        ],
      },
      "Full-Stack Development": {
        explanation:
          "Students learn to develop both the front-end and back-end of a web application, integrating skills from previous courses.",
        procedures: [
          "Week 1: Overview of full-stack development and setting up the environment.",
          "Week 2: Building the front-end with HTML, CSS, and JavaScript.",
          "Week 3: Creating the back-end with Node.js and Express.",
          "Week 4: Integrating the front-end and back-end.",
          "Week 5: User authentication and security.",
          "Week 6: Capstone project (building a full-stack web application).",
        ],
      },
      "Web Performance Optimization": {
        explanation:
          "This course covers techniques to optimize the performance of web applications, ensuring fast load times and smooth user experiences.",
        procedures: [
          "Week 1: Introduction to web performance metrics.",
          "Week 2: Optimizing images and other media.",
          "Week 3: Minimizing CSS and JavaScript.",
          "Week 4: Using caching and CDNs.",
          "Week 5: Measuring and improving performance with tools like Lighthouse.",
          "Week 6: Capstone project (optimizing an existing website).",
        ],
      },
      "Web Security Essentials": {
        explanation:
          "Students learn the basics of web security, including common threats and how to protect web applications against them.",
        procedures: [
          "Week 1: Introduction to web security principles.",
          "Week 2: Understanding and preventing SQL injection.",
          "Week 3: Cross-site scripting (XSS) and cross-site request forgery (CSRF).",
          "Week 4: Secure authentication and session management.",
          "Week 5: Implementing HTTPS and secure communications.",
          "Week 6: Capstone project (securing a web application).",
        ],
      },
      "API Development and Integration": {
        explanation:
          "This course focuses on building and integrating APIs, enabling communication between different software systems.",
        procedures: [
          "Week 1: Introduction to APIs and RESTful principles.",
          "Week 2: Creating basic APIs with Node.js and Express.",
          "Week 3: Testing APIs using tools like Postman.",
          "Week 4: Consuming APIs in front-end applications.",
          "Week 5: Securing APIs with authentication and authorization.",
          "Week 6: Capstone project (building and integrating a comprehensive API).",
        ],
      },
    },
  },
];
