import { title } from "process";
import Button from "../../ui/components/button/Button";

export const DATA = {
  socialLinks: {
    twitter: "https://x.com/Droidtechn?t=LVFJ6SEetP5DD1BHdSK0rQ&s=09",
    linkedin:
      "https://www.linkedin.com/company/d-roid-technologies-international/",
    instagram: "https://www.instagram.com/droidtechn?igsh=ZGUzMzM3NWJiOQ==",
    whatsapp: "https://wa.me/c/447886386437",
    email: "hr@droidtechinternational.com",
  },
  navLinks: [
    {
      link: "About Us",
      path: "/aboutus",
    },
    {
      link: "Software Development",
      path: "/software",
    },
    {
      link: "Animation Creation",
      path: "/animation",
    },
    {
      link: "Tech Training",
      path: "/training",
    },
    {
      link: "Contact",
      path: "/contact",
    },
    {
      link: "More",
      path: "/more",
    },
  ],
  dropDownLinks: [
    {
      link: "Drone Services",
      path: "/drone",
    },
    {
      link: "Equipment",
      path: "/offices",
    },
    // {
    //   link: "Staff Login",
    //   path: "/staff",
    // },
  ],
  // courses: [
  //   {
  //     id: 1,
  //     level: "Level 1-4",
  //     title: "Front-End Development (React)",
  //     subtitle: "Master Front-End Development with React.",
  //     description:
  //       "Welcome to the world of Frontend Development with React Js, where you'll learn to create stunning and dynamic user interfaces for web applications. React Js is a powerful JavaScript library that enables you to build reusable UI components, making the development process efficient and enjoyable.",
  //     benefits: [
  //       {
  //         title: "Html & css",
  //         description:
  //           "Master the foundational languages of the web – HTML and CSS. Learn how to structure web pages using HTML, style them using CSS, and create visually appealing layouts and designs.",
  //       },
  //       {
  //         title: "Javascript",
  //         description:
  //           "Deepen your understanding of Javascript, the programming language that powers interactivity on the web. Learn essential JavaScript concepts and techniques to enhance the functionality of your React applications.",
  //       },
  //       {
  //         title: "React Fundamentals",
  //         description:
  //           "Understand the core principles of React, including component-based architecture, JSX syntax, and virtual DOM. Learn how to build reusable UI components and effectively manage state in React applications.",
  //       },
  //       {
  //         title: "State Management with Redux",
  //         description:
  //           "Dive into Redux, a powerful state management library for React applications. Learn how to centralize and manage application state, handle complex data flows, and implement actions and reducers for predictable state updates.",
  //       },
  //       {
  //         title: "React Router",
  //         description:
  //           "Explore react router, a popular routing library for building single-page application. Learn how to implement navigation, handle routing, and create dynamic routes to create a smooth and seamless user experience.",
  //       },
  //       {
  //         title: "API integration",
  //         description:
  //           "Learn how to integrate external APIs into your react applications to fetch and display dynamic data. Understand concepts like asynchronous programming, handling API responses and managing data flow between components.",
  //       },
  //     ],
  //     projects: [
  //       {
  //         title: "Calculator App",
  //         description:
  //           "Get ready to crunch numbers with style! In just two weeks, you'll build your very own Calculator App using Flutter",
  //       },
  //       {
  //         title: "Event App",
  //         description:
  //           "It's time to unleash your inner event planner! In just five weeks, you'll create an Event App that takes event management to the next level.",
  //       },
  //       {
  //         title: "Fintech App",
  //         description:
  //           "Get ready to dive into the world of finance and technology! As the final project of the course, you'll develop a dynamic and secure Fintech App that empowers users to manage their finances with ease.",
  //       },
  //     ],
  //     howItWorks: [
  //       {
  //         title: "Register",
  //         content:
  //           "Sign up and select the tech skill you want to learn. The system matches you with a group of three to four other users who are also interested in learning the same skill",
  //       },
  //       {
  //         title: "Assign",
  //         content:
  //           "The group is assigned to dedicated mentor who is an expert in the chosen skill. The mentor leads the group through a structured learning program that includes video lectures, interactive exercises and quizzes.",
  //       },
  //       {
  //         title: "Interact",
  //         content:
  //           "The group meets weekly via video conference to discuss their progress, ask questions, and receive feedback from the mentor and each other.",
  //       },
  //       {
  //         title: "Get Certified",
  //         content:
  //           "Upon completion of the program, users receive a certificate of achievement.",
  //       },
  //     ],
  //     courseDetails: {
  //       startDate: "1st August, 2023",
  //       duration: "10 weeks",
  //       price: 250000,
  //       discountedPrice: 60000,
  //       offerExpiry: "21 : 10 : 05",
  //     },
  //   },
  //   {
  //     id: 2,
  //     level: "Level 5-6",
  //     title: "Data Science with Python",
  //     subtitle: "Master Data Science Techniques with Python.",
  //     description:
  //       "Welcome to the realm of Data Science with Python, where you'll learn to analyze, visualize, and interpret complex data sets. Python is a versatile programming language widely used in data science for its simplicity and powerful libraries. In this course, you'll acquire the skills needed to extract insights from data and make informed decisions.",
  //     benefits: [
  //       {
  //         title: "Python Fundamentals",
  //         description:
  //           "Gain a solid understanding of Python programming fundamentals, including data types, control flow, functions, and object-oriented programming. Learn to write clean, efficient, and maintainable Python code for data analysis and manipulation.",
  //       },
  //       {
  //         title: "Data Analysis and Visualization",
  //         description:
  //           "Learn how to use popular Python libraries such as Pandas and Matplotlib to perform data analysis and visualization tasks. Explore techniques for cleaning, transforming, and exploring data, and create insightful visualizations to communicate findings effectively.",
  //       },
  //       {
  //         title: "Machine Learning Basics",
  //         description:
  //           "Dive into the basics of machine learning with Python. Understand fundamental machine learning concepts such as supervised and unsupervised learning, regression, classification, and clustering. Implement machine learning algorithms using libraries like Scikit-learn.",
  //       },
  //       {
  //         title: "Deep Learning Fundamentals",
  //         description:
  //           "Explore the fundamentals of deep learning with Python and TensorFlow. Learn about neural networks, activation functions, loss functions, and optimization algorithms. Build and train deep learning models for tasks such as image classification and natural language processing.",
  //       },
  //       {
  //         title: "Data Science Projects",
  //         description:
  //           "Apply your knowledge to real-world data science projects. Work on projects ranging from predictive analytics and recommendation systems to sentiment analysis and image recognition. Gain hands-on experience and build a portfolio of data science projects to showcase your skills.",
  //       },
  //       {
  //         title: "Data Ethics and Privacy",
  //         description:
  //           "Understand the ethical considerations and privacy concerns associated with data science. Learn best practices for handling sensitive data, ensuring data privacy, and mitigating bias in machine learning models. Explore the ethical implications of data-driven decision-making.",
  //       },
  //     ],
  //     projects: [
  //       {
  //         title: "Predictive Analytics Project",
  //         description:
  //           "Apply predictive analytics techniques to analyze historical data and make predictions about future outcomes. Build a predictive model to forecast sales, customer churn, or stock prices, and evaluate its performance using relevant metrics.",
  //       },
  //       {
  //         title: "Recommendation System Project",
  //         description:
  //           "Develop a recommendation system that suggests products, movies, or music to users based on their preferences and behavior. Implement different recommendation algorithms such as collaborative filtering and content-based filtering, and evaluate their effectiveness.",
  //       },
  //       {
  //         title: "Sentiment Analysis Project",
  //         description:
  //           "Perform sentiment analysis on textual data to understand the sentiment or opinion expressed in the text. Build a sentiment analysis model to classify text as positive, negative, or neutral, and apply it to analyze social media posts, product reviews, or customer feedback.",
  //       },
  //     ],
  //     howItWorks: [
  //       {
  //         title: "Enroll",
  //         content:
  //           "Sign up for the course and gain access to the learning materials and resources.",
  //       },
  //       {
  //         title: "Learn",
  //         content:
  //           "Engage with interactive lessons, video tutorials, and hands-on exercises to master data science concepts and techniques.",
  //       },
  //       {
  //         title: "Practice",
  //         content:
  //           "Apply your knowledge to real-world projects and challenges to reinforce learning and gain practical experience.",
  //       },
  //       {
  //         title: "Collaborate",
  //         content:
  //           "Collaborate with peers and instructors through online forums, discussions, and group projects.",
  //       },
  //       {
  //         title: "Certify",
  //         content:
  //           "Upon completion of the course, earn a certificate of achievement to showcase your skills and expertise in data science with Python.",
  //       },
  //     ],
  //     courseDetails: {
  //       startDate: "1st September, 2024",
  //       duration: "12 weeks",
  //       price: 300000,
  //       discountedPrice: 75000,
  //       offerExpiry: "24 : 06 : 10",
  //     },
  //   },
  //   {
  //     id: 3,
  //     level: "Level 6-7",
  //     title: "Full-Stack Web Development with MERN",
  //     subtitle: "Become a Full-Stack Developer with the MERN Stack.",
  //     description:
  //       "Embark on a journey to become a proficient Full-Stack Web Developer using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This comprehensive course will equip you with the skills and knowledge needed to build modern, scalable, and dynamic web applications from scratch.",
  //     benefits: [
  //       {
  //         title: "MongoDB",
  //         description:
  //           "Master MongoDB, a NoSQL database used for storing and managing data in modern web applications. Learn to design schemas, perform CRUD operations, and integrate MongoDB with Node.js for seamless data handling.",
  //       },
  //       {
  //         title: "Express.js",
  //         description:
  //           "Explore Express.js, a powerful web application framework for Node.js. Learn to build RESTful APIs, handle HTTP requests and responses, and implement middleware for routing, authentication, and error handling.",
  //       },
  //       {
  //         title: "React.js",
  //         description:
  //           "Deepen your understanding of React.js, a popular JavaScript library for building user interfaces. Learn advanced concepts such as state management, hooks, and context API, and build interactive UI components for your web applications.",
  //       },
  //       {
  //         title: "Node.js",
  //         description:
  //           "Delve into Node.js, a runtime environment for executing JavaScript code outside of a web browser. Learn to build server-side applications, handle asynchronous operations, and deploy Node.js applications to production.",
  //       },
  //       {
  //         title: "Authentication and Authorization",
  //         description:
  //           "Implement authentication and authorization mechanisms in your web applications using techniques such as JWT (JSON Web Tokens) and OAuth. Secure your APIs, authenticate users, and manage user sessions effectively.",
  //       },
  //       {
  //         title: "Deployment and DevOps",
  //         description:
  //           "Learn best practices for deploying and managing web applications in production environments. Explore containerization with Docker, orchestration with Kubernetes, and continuous integration and deployment (CI/CD) pipelines with tools like Jenkins and GitLab CI/CD.",
  //       },
  //     ],
  //     projects: [
  //       {
  //         title: "E-Commerce Platform",
  //         description:
  //           "Build a fully functional E-Commerce platform from scratch using the MERN stack. Implement features such as user authentication, product management, shopping cart functionality, and secure payment processing.",
  //       },
  //       {
  //         title: "Social Media Application",
  //         description:
  //           "Create a Social Media application where users can create profiles, connect with friends, share posts, and interact with content. Implement features like user authentication, news feed, comments, and likes.",
  //       },
  //       {
  //         title: "Task Management System",
  //         description:
  //           "Develop a Task Management System for organizing and tracking tasks and projects. Implement features such as user authentication, task creation, assignment, tracking, and notifications.",
  //       },
  //     ],
  //     howItWorks: [
  //       {
  //         title: "Enroll",
  //         content:
  //           "Sign up for the course and gain access to the learning materials and resources.",
  //       },
  //       {
  //         title: "Learn",
  //         content:
  //           "Engage with comprehensive tutorials, hands-on exercises, and real-world projects to master the MERN stack.",
  //       },
  //       {
  //         title: "Build",
  //         content:
  //           "Apply your knowledge to build full-stack web applications from scratch, tackling real-world challenges and scenarios.",
  //       },
  //       {
  //         title: "Collaborate",
  //         content:
  //           "Collaborate with peers and instructors through online forums, discussions, and group projects.",
  //       },
  //       {
  //         title: "Certify",
  //         content:
  //           "Upon completion of the course, earn a certificate of achievement to showcase your proficiency as a Full-Stack Web Developer with the MERN stack.",
  //       },
  //     ],
  //     courseDetails: {
  //       startDate: "1st October, 2024",
  //       duration: "14 weeks",
  //       price: 350000,
  //       discountedPrice: 80000,
  //       offerExpiry: "24 : 12 : 04",
  //     },
  //   },
  //   {
  //     id: 4,
  //     level: "Level 7-9",
  //     title: "Mobile App Development with Flutter",
  //     subtitle: "Build Cross-Platform Mobile Apps with Flutter.",
  //     description:
  //       "Dive into the world of mobile app development with Flutter, Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. This course will teach you everything you need to know to create beautiful, high-performance mobile apps for iOS and Android.",
  //     benefits: [
  //       {
  //         title: "Flutter Fundamentals",
  //         description:
  //           "Master the fundamentals of Flutter, including widgets, layouts, navigation, state management, and theming. Learn how to build responsive and visually appealing user interfaces for mobile apps using Flutter's rich set of widgets and components.",
  //       },
  //       {
  //         title: "Dart Programming",
  //         description:
  //           "Deepen your understanding of Dart, the programming language used for developing Flutter apps. Learn Dart syntax, data types, functions, classes, and asynchronous programming techniques to write clean, efficient, and maintainable code.",
  //       },
  //       {
  //         title: "UI Design Principles",
  //         description:
  //           "Explore UI design principles and best practices for creating engaging and intuitive user interfaces. Learn how to design app layouts, use typography and color effectively, and create consistent and accessible user experiences.",
  //       },
  //       {
  //         title: "State Management",
  //         description:
  //           "Understand different state management approaches in Flutter and choose the right one for your app's architecture. Explore techniques such as setState, Provider, BLoC (Business Logic Component), and Riverpod for managing app state effectively.",
  //       },
  //       {
  //         title: "API Integration",
  //         description:
  //           "Learn how to integrate APIs into your Flutter apps to fetch and display dynamic data. Explore techniques for making network requests, handling responses, and parsing JSON data to build data-driven mobile applications.",
  //       },
  //       {
  //         title: "Deployment and Publishing",
  //         description:
  //           "Discover the process of deploying and publishing Flutter apps to the Google Play Store and Apple App Store. Learn how to configure app settings, generate app bundles and APKs, and manage app releases for distribution to users.",
  //       },
  //     ],
  //     projects: [
  //       {
  //         title: "Weather App",
  //         description:
  //           "Create a Weather App that provides real-time weather forecasts based on the user's location. Implement features such as current weather conditions, hourly and daily forecasts, and weather alerts.",
  //       },
  //       {
  //         title: "Todo List App",
  //         description:
  //           "Build a Todo List App for managing tasks and to-do items. Implement features such as task creation, editing, deletion, and marking tasks as completed, and sync data across devices.",
  //       },
  //       {
  //         title: "Fitness Tracker App",
  //         description:
  //           "Develop a Fitness Tracker App for tracking workouts and fitness activities. Implement features such as exercise logging, activity tracking, progress tracking, and personalized workout plans.",
  //       },
  //     ],
  //     howItWorks: [
  //       {
  //         title: "Enroll",
  //         content:
  //           "Sign up for the course and gain access to the learning materials and resources.",
  //       },
  //       {
  //         title: "Learn",
  //         content:
  //           "Engage with comprehensive tutorials, hands-on exercises, and real-world projects to master Flutter app development.",
  //       },
  //       {
  //         title: "Build",
  //         content:
  //           "Apply your knowledge to build fully functional mobile apps from scratch, tackling real-world use cases and scenarios.",
  //       },
  //       {
  //         title: "Collaborate",
  //         content:
  //           "Collaborate with peers and instructors through online forums, discussions, and group projects.",
  //       },
  //       {
  //         title: "Certify",
  //         content:
  //           "Upon completion of the course, earn a certificate of achievement to showcase your proficiency in mobile app development with Flutter.",
  //       },
  //     ],
  //     courseDetails: {
  //       startDate: "1st November, 2024",
  //       duration: "12 weeks",
  //       price: 300000,
  //       discountedPrice: 70000,
  //       offerExpiry: "24 : 02 : 05",
  //     },
  //   },
  // ],

  courses: [
    { id: 1, title: "Secondary School Tech Trainings" },
    { id: 2, title: "University Tech Trainings" },
    { id: 3, title: "Organisations / Companies Tech Trainings" },
    { id: 4, title: "Basic Coding Training" },
    { id: 5, title: "Web Development Training" },
    { id: 6, title: "Mobile Development Training" },
    { id: 7, title: "Design Training" },
    { id: 8, title: "Project Management Training" },
  ],

  droneApproach: [
    {
      title: "Customized Solutions",
      content:
        "We understand that every project is unique, which is why we work closely with our clients to develop customized drone solutions that address their specific requirements and objectives. Whether it's aerial photography, mapping, or inspection, we have the expertise to deliver results that exceed expectations.",
      Button: "LEARN MORE",
    },
    {
      title: "State-of-the-Art Technology",
      content:
        "Our drones are equipped with the latest technology, including high-resolution cameras, LiDAR sensors, and thermal imaging capabilities. This allows us to capture detailed and accurate data from the air, providing valuable insights for our clients' projects.",
      Button: "LEARN MORE",
    },
    {
      title: "Safety & Compliance",
      content:
        "Safety is our top priority, and we adhere to strict safety protocols and regulations to ensure the safe operation of our drones. Our team of certified pilots undergoes rigorous training and certification processes to ensure compliance with aviation laws and regulations.",
      Button: "LEARN MORE",
    },
    {
      title: "Data Analysis & Reporting",
      content:
        "In addition to capturing aerial imagery and data, we also offer comprehensive data analysis and reporting services. Our team of data analysts and engineers processes and interprets the data collected by our drones, providing actionable insights and recommendations for our clients.",
      Button: "LEARN MORE",
    },
  ],
  FeaturedDroneServices: [
    {
      video: require("../../videos/dronevideo.mp4"),
      title: "AERIAL PHOTOGRAPHY AND VIDEOGRAPHY",
      content:
        "Capture stunning aerial images and videos for marketing, advertising, and promotional purposes.",
    },
  ],
  MappingSurveying: [
    {
      // image: require("../../images/png/drone survey.png"),
      // image: require("../../images/png/dronesurveying.png"),
      title: "MAPPING & SURVEYING",
      content:
        "Generate high-resolution maps and 3D models for land surveying, construction planning, and site analysis.",
    },
  ],
  InfrastructureInspection: [
    {
      image: require("../../images/png/infrastructure.png"),
      title: "INFRASTRUCTURE INSPECTION",
      content:
        "Conduct thorough inspections of infrastructure assets such as buildings, bridges, and power lines to identify defects and maintenance needs.",
    },
  ],
  CropMonitoringAgriculture: [
    {
      image: require("../../images/png/cropmonitorimage.png"),
      title: "CROP MONITORING & AGRICULTURE",
      content:
        "Monitor crop health, assess field conditions, and optimize agricultural operations using aerial imagery and data analysis.",
    },
  ],
  DroneModels: [
    {
      // image: require("../../images/png/dronemodel.png"),
      title: "Drone Models",
      content: " DJI Phantom, DJI Mavic, DJI Inspire, SenseFly eBee",
    },
  ],
  CamerasSensors: [
    {
      // image: require("../../images/png/camerasandsensors.png"),
      title: "Cameras & Sensors",
      content: " RGB cameras, multispectral cameras, LiDAR sensors",
    },
  ],
  SoftwareTools: [
    {
      // image: require("../../images/png/softwaretools.png"),
      title: "Software Tools",
      content: "Pix4D, DroneDeploy, Agisoft Metashape ",
    },
  ],
  equipmentApproach: [
    {
      title: "Consultation & Assessment",
      content:
        "We begin by conducting a thorough consultation with our clients to understand their equipment setup requirements and objectives. Our team assesses the available space, existing infrastructure, and technical specifications to develop a tailored setup plan.",
      Button: "LEARN MORE",
    },
    {
      title: "Hardware Installation",
      content:
        "Our technicians handle the installation of hardware components, including computers, servers, routers, switches, and other devices. We ensure that all equipment is installed correctly and configured to meet our clients' needs.",
      Button: "LEARN MORE",
    },
    {
      title: "Network Configuration",
      content:
        " We configure network settings, including IP addresses, DNS settings, and security protocols, to ensure seamless connectivity and data transfer within our clients' environments. Our goal is to create a stable and secure network infrastructure that supports their business operations.",
      Button: "LEARN MORE",
    },
    {
      title: "Testing & Optimization",
      content:
        "Once the setup is complete, we conduct thorough testing to ensure that all equipment and networks are functioning correctly. We optimize settings and configurations as needed to improve performance and reliability.",
      Button: "LEARN MORE",
    },
    {
      title: "Training & Documentation",
      content:
        "We provide training sessions for our clients' staff to familiarize them with the newly installed equipment and networks. Additionally, we create detailed documentation outlining setup procedures, troubleshooting steps, and best practices for future reference.",
      Button: "LEARN MORE",
    },
  ],
};
