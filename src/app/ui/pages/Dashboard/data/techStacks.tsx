 import {
 
   FaCode,
   
   FaAccessibleIcon,
   FaPencilRuler,
   FaServer,
 } from "react-icons/fa"; 
 import { GrDocumentPerformance } from "react-icons/gr";
 import { TbApiApp } from "react-icons/tb";
 import { BiWorld, BiCloudUpload } from "react-icons/bi";
 import { MdFactCheck } from "react-icons/md";
 
 

  export const techStacks = {
    frontend: [
      {
        title: "Responsive Web Design (Mobile-first)",
        description:
          "Responsive Web Design (Mobile-First) is a strategic front-end development methodology that places mobile usability at the core of the design process. At D’roid Technologies, we start by creating streamlined, performance-optimized layouts specifically for smaller screens—smartphones and other handheld devices—where clarity, speed, and intuitive interaction matter most. By focusing first on the mobile experience, we ensure that essential content, navigation, and functionality are easily accessible and visually engaging, even on the most constrained displays. This approach is rooted in modern digital behavior, where mobile browsing has overtaken desktop usage, and it aligns seamlessly with search engine standards, particularly Google’s mobile-first indexing, which prioritizes mobile-optimized sites in search rankings. As the user’s screen size increases—from mobile to tablet to desktop—the interface is progressively enhanced. This means additional features, layout refinements, and interactive elements are layered in to take advantage of the extra real estate, without compromising performance or usability. The result is a seamless, device-agnostic user experience—whether someone is accessing your site from a smartphone on the go or a large desktop monitor at the office. With mobile-first responsive design, D’roid Technologies delivers solutions that are not only future-ready but also aligned with user expectations, business goals, and the evolving standards of the web.",
        icon: FaAccessibleIcon({ size: 40 }),
        summary:
          "Mobile-first responsive design ensures your website delivers a fast, accessible, and visually polished experience on every screen size, starting from smartphones upward.",
      },
      {
        title: "React, Vue, Angular Development",
        description:
          "Our team excels in crafting robust, high-performance front-end solutions using modern JavaScript frameworks such as React, Vue, and Angular. Each framework serves a unique purpose—React offers unparalleled component reusability and flexibility for dynamic UIs, Vue provides a lightweight yet powerful approach to progressive enhancement, and Angular delivers enterprise-grade tooling and structure ideal for complex applications. We help clients choose the right framework based on their project needs, scalability requirements, and long-term maintainability goals. Our developers adhere to best practices such as component-based architecture, efficient state management, and modular code organization to ensure your frontend is fast, responsive, and future-ready.",
        icon: FaPencilRuler({ size: 40 }),
        url: "",
        summary:
          "We build scalable, high-performing front-end interfaces using React, Vue, or Angular—tailored to your business goals and user experience expectations.",
      },
      {
        title: "Custom UI/UX Implementation",
        description:
          "Custom UI/UX Implementation at D’roid Technologies focuses on translating unique brand identities and user needs into immersive, intuitive interfaces. Our team meticulously crafts visual and interactive elements that not only align with your business goals but also ensure fluid, user-centric experiences across all platforms. We integrate design systems, motion patterns, accessibility best practices, and performance optimizations into a seamless front-end build. Every pixel and interaction is tailored—from custom component libraries to dynamic theming—to reflect your brand’s personality while enhancing usability and engagement. The result is a digital experience that feels both elegant and effortless for every user.",
        icon: FaCode({ size: 40 }),
        url: "",
        summary:
          "We design and build tailored user interfaces that blend innovation with usability to deliver exceptional user experiences.",
      },
      {
        title: "Performance Optimization",
        description:
          "Performance Optimization in front-end development is the strategic enhancement of a website or application’s speed, responsiveness, and overall efficiency to deliver a seamless user experience across all devices and networks. At D’roid Technologies, we focus on minimizing load times, reducing render-blocking resources, optimizing assets (such as images and scripts), leveraging caching, and implementing lazy loading. We utilize modern performance auditing tools like Google Lighthouse and Core Web Vitals to identify bottlenecks and continuously fine-tune the front-end architecture. By optimizing how data is fetched and rendered, and ensuring efficient use of client-side resources, we help clients retain users, improve SEO rankings, and increase overall engagement.",
        icon: GrDocumentPerformance({ size: 40 }),
        url: "",
        summary:
          "We enhance your digital product’s speed and responsiveness to deliver fast, smooth, and reliable experiences for every user.",
      },
      {
        title: "API Integration & State Management",
        description:
          "At D'roid Technologies, API integration and state management are pivotal components of our front-end architecture. We seamlessly connect your front-end interfaces with powerful back-end services, third-party platforms, or internal APIs to ensure real-time data flow and interactivity. Using robust libraries like Redux, Zustand, or React Query, we manage application state with precision—delivering a smooth, responsive, and consistent user experience across all views. Our focus is on efficiency, scalability, and clean architecture, so your application not only looks great but performs reliably as it grows.",
        icon: TbApiApp({ size: 50 }),
        url: "",
        summary:
          "We expertly integrate APIs and manage application state to deliver fast, dynamic, and scalable user experiences.",
      },
      {
        title: "Cross-Browser Compatibility",
        description:
          "Cross-Browser Compatibility ensures that your website or web application delivers a consistent, seamless experience across all major web browsers—such as Chrome, Firefox, Safari, Edge, and Opera—regardless of their rendering engines or version differences. At D’roid Technologies, we rigorously test our front-end code using real devices and modern automation tools to identify and fix inconsistencies in layout, functionality, and performance. We implement standardized best practices and polyfills where necessary to maintain visual integrity and interactivity across platforms. This attention to detail ensures that all users, regardless of browser preference, enjoy a high-quality and reliable interface.",
        icon: BiWorld({ size: 40 }),
        url: "",
        summary:
          "We ensure your website looks and functions flawlessly across all modern browsers, delivering a uniform experience to every user.",
      },
    ],

    backend: [
      {
        title: "Node.js & Express Development",
        description:
          "At D'roid Technologies, we specialize in building robust and scalable backend applications using Node.js and Express. Our team leverages the power of JavaScript on the server-side to create high-performance APIs, real-time applications, and microservices. We implement best practices in asynchronous programming, error handling, and middleware integration to ensure your backend is both powerful and maintainable. From RESTful APIs to WebSocket implementations, we create backend solutions that can handle high traffic loads while maintaining optimal performance.",
        icon: FaServer({ size: 40 }),
        summary:
          "We build scalable and efficient backend applications using Node.js and Express, delivering high-performance APIs and real-time solutions.",
      },
      {
        title: "Python Backend Development",
        description:
          "Our Python backend development services harness the versatility and power of Python frameworks like Django and Flask to create sophisticated backend systems. We develop secure, scalable, and maintainable applications that can handle complex business logic, data processing, and API integrations. Whether you need a full-featured web application with Django's built-in admin interface or a lightweight API with Flask, our team ensures your Python backend is optimized for performance and security.",
        icon: FaCode({ size: 40 }),
        url: "",
        summary:
          "We create powerful and secure backend systems using Python frameworks, tailored to your specific business requirements.",
      },
      {
        title: "Database Design & Optimization",
        description:
          "Database design and optimization is a critical component of our backend development services. We work with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases to create efficient data storage solutions. Our team focuses on proper schema design, query optimization, indexing strategies, and caching mechanisms to ensure your database performs optimally under any load. We implement best practices in data modeling, normalization, and security to protect your valuable information while maintaining fast access times.",
        icon: GrDocumentPerformance({ size: 40 }),
        url: "",
        summary:
          "We design and optimize database architectures that ensure fast, secure, and scalable data management for your applications.",
      },
      {
        title: "API Development & Integration",
        description:
          "Our API development and integration services focus on creating robust, well-documented, and secure APIs that serve as the backbone of your application. We design RESTful and GraphQL APIs that follow industry best practices and standards. Our team ensures proper authentication, rate limiting, error handling, and versioning while maintaining comprehensive API documentation. We also specialize in integrating third-party APIs and services, ensuring seamless communication between different systems and platforms.",
        icon: TbApiApp({ size: 40 }),
        url: "",
        summary:
          "We develop secure, scalable, and well-documented APIs that enable seamless integration between different systems and services.",
      },
      {
        title: "Cloud Infrastructure & Deployment",
        description:
          "We provide comprehensive cloud infrastructure and deployment services using leading cloud providers like AWS, Azure, and Google Cloud. Our team designs scalable and resilient cloud architectures, implements containerization with Docker and Kubernetes, and sets up CI/CD pipelines for automated deployment. We ensure your backend services are properly configured for high availability, load balancing, and auto-scaling while maintaining security best practices and cost optimization.",
        icon: BiCloudUpload({ size: 40 }),
        url: "",
        summary:
          "We design and implement cloud infrastructure that ensures your backend services are scalable, secure, and highly available.",
      },
      {
        title: "Security & Performance Optimization",
        description:
          "Security and performance optimization are fundamental to our backend development approach. We implement robust security measures including authentication, authorization, data encryption, and protection against common vulnerabilities. Our performance optimization strategies include code profiling, caching implementation, load balancing, and database query optimization. We conduct regular security audits and performance testing to ensure your backend remains secure and efficient as it scales.",
        icon: MdFactCheck({ size: 40 }),
        url: "",
        summary:
          "We implement comprehensive security measures and performance optimizations to ensure your backend is both secure and efficient.",
      },
    ],
    cloud: [
      {
        title: "Database Design & Architecture",
        description:
          "At D'roid Technologies, we specialize in designing and implementing robust database architectures that form the foundation of your data infrastructure. Our team works with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases to create efficient, scalable, and secure data storage solutions. We focus on proper schema design, normalization, indexing strategies, and data modeling to ensure optimal performance and data integrity. Our database solutions are built to handle growing data volumes while maintaining fast query response times and ensuring data consistency across your applications.",
        icon: FaServer({ size: 40 }),
        summary:
          "We design and implement scalable database architectures that ensure efficient data storage, retrieval, and management for your applications.",
      },
      {
        title: "Cloud Infrastructure & Migration",
        description:
          "Our cloud infrastructure and migration services help businesses transition to and optimize their cloud presence. We work with leading cloud providers like AWS, Azure, and Google Cloud to design scalable, secure, and cost-effective cloud architectures. Our team handles everything from initial cloud strategy and migration planning to implementation and ongoing optimization. We implement best practices in cloud security, resource management, and cost optimization while ensuring high availability and disaster recovery capabilities for your critical systems.",
        icon: BiCloudUpload({ size: 40 }),
        url: "",
        summary:
          "We help businesses migrate to and optimize their cloud infrastructure, ensuring scalability, security, and cost-effectiveness.",
      },
      {
        title: "Database Performance Optimization",
        description:
          "Database performance optimization is crucial for maintaining fast and efficient data operations. Our team specializes in identifying and resolving performance bottlenecks through query optimization, index tuning, and caching strategies. We implement advanced techniques like query optimization, connection pooling, and database sharding to ensure your database performs optimally under any load. Regular performance monitoring and tuning help maintain optimal database performance as your data grows.",
        icon: GrDocumentPerformance({ size: 40 }),
        url: "",
        summary:
          "We optimize database performance through advanced tuning techniques, ensuring fast and efficient data operations at any scale.",
      },
      {
        title: "Cloud Security & Compliance",
        description:
          "Security and compliance are paramount in cloud environments. Our team implements comprehensive security measures including encryption, access control, and threat detection systems. We ensure compliance with industry standards and regulations like GDPR, HIPAA, and SOC 2. Our security approach includes regular security audits, vulnerability assessments, and implementation of security best practices to protect your cloud infrastructure and data from potential threats.",
        icon: MdFactCheck({ size: 40 }),
        url: "",
        summary:
          "We implement robust security measures and ensure compliance with industry standards to protect your cloud infrastructure and data.",
      },
      {
        title: "Database Backup & Recovery",
        description:
          "Reliable backup and recovery solutions are essential for business continuity. We design and implement comprehensive backup strategies that ensure your data is protected against loss or corruption. Our solutions include automated backup scheduling, point-in-time recovery capabilities, and disaster recovery planning. We test recovery procedures regularly to ensure your data can be restored quickly and accurately when needed, minimizing potential downtime and data loss.",
        icon: FaCode({ size: 40 }),
        url: "",
        summary:
          "We implement reliable backup and recovery solutions to ensure your data is protected and can be restored quickly when needed.",
      },
      {
        title: "Cloud Cost Optimization",
        description:
          "Cloud cost optimization is crucial for maintaining an efficient and cost-effective cloud infrastructure. Our team analyzes your cloud usage patterns and implements strategies to optimize costs without compromising performance. We focus on resource right-sizing, reserved instance planning, and implementing auto-scaling solutions. Regular cost monitoring and optimization recommendations help ensure you're getting the best value from your cloud investment while maintaining the performance and reliability your business needs.",
        icon: TbApiApp({ size: 40 }),
        url: "",
        summary:
          "We help optimize cloud costs through strategic resource management and implementation of cost-effective solutions.",
      },
    ],
    crossPlatform: [
      {
        title: "React Native Development",
        description:
          "At D'roid Technologies, we specialize in building high-performance cross-platform mobile applications using React Native. Our team leverages the power of JavaScript and React to create native-like experiences for both iOS and Android platforms. We implement best practices in component architecture, state management, and performance optimization to ensure your app delivers a smooth, responsive experience across all devices. From complex animations to native module integration, we create mobile solutions that feel truly native while maintaining the efficiency of cross-platform development.",
        icon: FaCode({ size: 40 }),
        summary:
          "We build high-performance mobile applications using React Native, delivering native-like experiences across iOS and Android platforms.",
      },
      {
        title: "Flutter Development",
        description:
          "Our Flutter development services harness the power of Dart to create beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. We leverage Flutter's rich widget library and hot reload feature to rapidly develop and iterate on your application. Our team ensures your app maintains consistent design language and performance across all platforms while taking advantage of platform-specific features when needed. We focus on creating smooth animations, responsive layouts, and efficient state management to deliver an exceptional user experience.",
        icon: FaPencilRuler({ size: 40 }),
        url: "",
        summary:
          "We create beautiful, high-performance applications using Flutter that work seamlessly across multiple platforms from a single codebase.",
      },
      {
        title: "Hybrid App Development",
        description:
          "Our hybrid app development approach combines the best of web and native technologies to create efficient, cost-effective mobile solutions. Using frameworks like Ionic or Capacitor, we build applications that can be deployed across multiple platforms while maintaining access to native device features. We focus on optimizing performance, implementing responsive design patterns, and ensuring smooth integration with device hardware. Our hybrid solutions provide a balance between development efficiency and native-like user experience.",
        icon: BiWorld({ size: 40 }),
        url: "",
        summary:
          "We develop efficient hybrid applications that combine web technologies with native features for optimal cross-platform performance.",
      },
      {
        title: "Cross-Platform UI/UX Design",
        description:
          "Cross-platform UI/UX design is crucial for delivering consistent, engaging user experiences across different devices and platforms. Our team creates adaptive design systems that maintain visual consistency while respecting platform-specific design guidelines. We implement responsive layouts, platform-specific navigation patterns, and touch-friendly interfaces that work seamlessly across iOS, Android, and web platforms. Our design approach ensures your app feels native on each platform while maintaining a cohesive brand identity.",
        icon: FaAccessibleIcon({ size: 40 }),
        url: "",
        summary:
          "We design adaptive, platform-aware interfaces that deliver consistent, engaging experiences across all devices and platforms.",
      },
      {
        title: "Native Module Integration",
        description:
          "Native module integration is essential for accessing platform-specific features and optimizing performance. Our team specializes in bridging the gap between cross-platform code and native functionality. We develop custom native modules for features like camera access, push notifications, biometric authentication, and hardware-specific optimizations. Our integration approach ensures your app can leverage the full power of each platform while maintaining the efficiency of cross-platform development.",
        icon: TbApiApp({ size: 40 }),
        url: "",
        summary:
          "We seamlessly integrate native modules and platform-specific features to enhance your cross-platform application's capabilities.",
      },
      {
        title: "Performance Optimization",
        description:
          "Performance optimization is critical for delivering smooth, responsive cross-platform applications. Our team implements advanced optimization techniques including lazy loading, memory management, and efficient state handling. We focus on reducing bundle size, optimizing asset loading, and implementing efficient caching strategies. Regular performance profiling and optimization ensure your app maintains high performance across all target platforms and devices, providing users with a seamless experience regardless of their device capabilities.",
        icon: GrDocumentPerformance({ size: 40 }),
        url: "",
        summary:
          "We optimize application performance to ensure smooth, responsive experiences across all platforms and devices.",
      },
    ],
  };
