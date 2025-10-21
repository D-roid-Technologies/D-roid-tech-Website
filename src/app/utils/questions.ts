export const Questions = [
  {
    title: "Java",
    subTitle:
      "Assess your ability to build robust, scalable, and enterprise-ready applications",
    summary:
      "This Java test evaluates your knowledge from fundamentals to advanced: syntax, OOP, collections, multithreading, and Spring Boot.",
    duration: "60 minutes",
    description:
      "The exam is designed to measure your competency in Java programming. It covers object-oriented design, data structures, concurrency, and backend development with Spring Boot.",
    level: "Beginner to Advanced",
    tools: ["Java SE", "Spring Boot", "Maven/Gradle", "IntelliJ IDEA"],
    mode: ["Online test", "Timed questions", "Certificate upon passing"],
    url: "",
    benefits: [
      "Validate your Java syntax & OOP skills",
      "Showcase enterprise development knowledge with Spring Boot",
      "Prove understanding of concurrency & multithreading",
      "Demonstrate backend deployment capabilities",
    ],
    gallery: ["/images/java/1.jpg", "/images/java/2.jpg"],
    learn: [
      "Java fundamentals & OOP",
      "Data structures",
      "Spring Boot basics",
      "REST API development",
      "Unit testing",
    ],
    questions: [
      "What is JVM?",
      "Explain JDK vs JRE.",
      "What are Java data types?",
    ],
    quiz: [
      {
        id: 1,
        question: "What does JVM stand for?",
        options: [
          "Java Virtual Machine",
          "Java Variable Method",
          "Java Version Manager",
          "Java Visual Model",
        ],
        correctAnswer: 0,
        explanation:
          "JVM stands for Java Virtual Machine, which executes Java bytecode and provides platform independence.",
      },
      {
        id: 2,
        question: "How do you start a goroutine in Go?",
        options: [
          "start functionName()",
          "go functionName()",
          "async functionName()",
          "thread functionName()",
        ],
        correctAnswer: 1,
        explanation:
          "The 'go' keyword is used to start a goroutine in Go, which runs the function concurrently with other goroutines.",
      },
      {
        id: 3,
        question: "What are channels used for in Go?",
        options: [
          "To store data permanently",
          "To communicate between goroutines",
          "To handle HTTP requests",
          "To manage memory",
        ],
        correctAnswer: 1,
        explanation:
          "Channels are used for communication between goroutines, allowing safe data sharing and synchronization in concurrent programs.",
      },
      {
        id: 4,
        question: "Which keyword is used to handle errors in Go?",
        options: ["try-catch", "if err != nil", "throw-catch", "error-handle"],
        correctAnswer: 1,
        explanation:
          "Go uses explicit error handling with 'if err != nil' pattern rather than exceptions, making error handling more visible and controlled.",
      },
      {
        id: 5,
        question: "What is the purpose of Go modules?",
        options: [
          "To create web servers",
          "To manage dependencies and versioning",
          "To handle concurrent programming",
          "To optimize performance",
        ],
        correctAnswer: 1,
        explanation:
          "Go modules are used for dependency management and versioning, allowing you to manage external packages and their versions in your Go projects.",
      },
      {
        id: 6,
        question:
          "Which of the following is NOT a primitive data type in Java?",
        options: ["int", "String", "boolean", "char"],
        correctAnswer: 1,
        explanation:
          "String is not a primitive data type in Java. It's a reference type (object) from the String class. The 8 primitive types are byte, short, int, long, float, double, boolean, and char.",
      },
      {
        id: 7,
        question: "What is the difference between JDK and JRE?",
        options: [
          "JDK is for development, JRE is for runtime",
          "JDK is for runtime, JRE is for development",
          "There is no difference",
          "JDK is older version of JRE",
        ],
        correctAnswer: 0,
        explanation:
          "JDK (Java Development Kit) includes development tools like compiler, debugger, and JRE. JRE (Java Runtime Environment) only provides runtime libraries needed to run Java applications.",
      },
      {
        id: 8,
        question: "Which keyword is used to create a subclass in Java?",
        options: ["implements", "extends", "inherits", "super"],
        correctAnswer: 1,
        explanation:
          "The 'extends' keyword is used to create a subclass that inherits from a parent class in Java. 'implements' is used for interfaces.",
      },
      {
        id: 9,
        question:
          "What is the default access modifier for a class member in Java?",
        options: [
          "private",
          "public",
          "protected",
          "package-private (default)",
        ],
        correctAnswer: 3,
        explanation:
          "If no access modifier is specified, the default access is package-private, meaning it's accessible within the same package only.",
      },
      {
        id: 10,
        question: "What is method overloading in Java?",
        options: [
          "Having multiple methods with same name but different parameters",
          "Having multiple methods with different names",
          "Overriding parent class methods",
          "Loading too many methods",
        ],
        correctAnswer: 0,
        explanation:
          "Method overloading allows multiple methods with the same name but different parameter lists (different number or types of parameters) in the same class.",
      },
      {
        id: 11,
        question: "What is the purpose of the 'final' keyword in Java?",
        options: [
          "To end a program",
          "To prevent inheritance, overriding, or modification",
          "To finalize objects",
          "To create constants only",
        ],
        correctAnswer: 1,
        explanation:
          "The 'final' keyword can prevent class inheritance, method overriding, and variable modification. It ensures immutability and design integrity.",
      },
      {
        id: 12,
        question: "What is a Java interface?",
        options: [
          "A class with only abstract methods",
          "A contract defining methods that implementing classes must provide",
          "A graphical user interface",
          "A way to connect to databases",
        ],
        correctAnswer: 1,
        explanation:
          "An interface is a contract that defines method signatures. Classes implementing an interface must provide implementations for all its methods (except default methods).",
      },
      {
        id: 13,
        question: "What is the difference between ArrayList and LinkedList?",
        options: [
          "ArrayList uses array, LinkedList uses doubly-linked nodes",
          "ArrayList is slower than LinkedList",
          "LinkedList can only store integers",
          "No difference",
        ],
        correctAnswer: 0,
        explanation:
          "ArrayList uses a dynamic array internally (fast random access), while LinkedList uses doubly-linked nodes (fast insertion/deletion at ends).",
      },
      {
        id: 14,
        question: "What is exception handling in Java?",
        options: [
          "Ignoring errors",
          "Mechanism to handle runtime errors using try-catch blocks",
          "Preventing compilation errors",
          "Optimizing code performance",
        ],
        correctAnswer: 1,
        explanation:
          "Exception handling uses try-catch-finally blocks to gracefully handle runtime errors, preventing program crashes and allowing recovery.",
      },
      {
        id: 15,
        question: "What is the purpose of the 'static' keyword?",
        options: [
          "To make variables constant",
          "To create class-level members shared by all instances",
          "To prevent modification",
          "To optimize memory",
        ],
        correctAnswer: 1,
        explanation:
          "The 'static' keyword creates class-level members that belong to the class itself rather than instances, shared by all objects of that class.",
      },
      {
        id: 16,
        question: "What is polymorphism in Java?",
        options: [
          "Having multiple forms",
          "Ability of objects to take multiple forms through inheritance and interfaces",
          "Multiple inheritance",
          "Method overloading only",
        ],
        correctAnswer: 1,
        explanation:
          "Polymorphism allows objects to be treated as instances of their parent class or interface, enabling method overriding and dynamic method dispatch.",
      },
      {
        id: 17,
        question: "What is a constructor in Java?",
        options: [
          "A method that builds objects",
          "A special method called when creating an object to initialize it",
          "A destructor",
          "A static method",
        ],
        correctAnswer: 1,
        explanation:
          "A constructor is a special method with the same name as the class, called automatically when an object is created to initialize its state.",
      },
      {
        id: 18,
        question:
          "What is the difference between '==' and '.equals()' in Java?",
        options: [
          "No difference",
          "'==' compares references, '.equals()' compares content",
          "'.equals()' is faster",
          "'==' is for primitives only",
        ],
        correctAnswer: 1,
        explanation:
          "'==' compares object references (memory addresses), while '.equals()' compares the actual content/values of objects when properly overridden.",
      },
      {
        id: 19,
        question: "What is a Java package?",
        options: [
          "A compressed file",
          "A namespace for organizing classes and interfaces",
          "A deployment unit",
          "A library",
        ],
        correctAnswer: 1,
        explanation:
          "A package is a namespace that organizes related classes and interfaces, preventing naming conflicts and controlling access.",
      },
      {
        id: 20,
        question: "What is garbage collection in Java?",
        options: [
          "Manual memory cleanup",
          "Automatic memory management that reclaims unused objects",
          "Deleting files",
          "Code optimization",
        ],
        correctAnswer: 1,
        explanation:
          "Garbage collection is an automatic memory management process that identifies and reclaims memory occupied by objects no longer referenced by the program.",
      },
    ],
  },
  {
    title: "PHP",
    subTitle: "Evaluate your web development skills with PHP",
    summary:
      "This PHP test covers server-side scripting, frameworks like Laravel, and database integration.",
    duration: "30 minutes",
    description:
      "The exam assesses your knowledge of PHP fundamentals, object-oriented programming, popular frameworks, and your ability to build dynamic web applications.",
    level: "Beginner to Intermediate",
    tools: ["PHP", "Laravel", "MySQL", "Composer"],
    mode: ["Online test", "Web development challenges"],
    url: "",
    benefits: [
      "Validate your PHP programming skills",
      "Demonstrate web development expertise",
      "Show framework knowledge with Laravel",
      "Prove database integration abilities",
    ],
    gallery: ["/images/php/1.jpg", "/images/php/2.jpg"],
    learn: [
      "PHP syntax and basics",
      "Object-oriented PHP",
      "Laravel framework",
      "Database operations",
      "Security best practices",
    ],
    questions: [
      "What is PHP?",
      "How do you connect to a database in PHP?",
      "What is Laravel?",
    ],
    quiz: [
      {
        id: 1,
        question: "What does PHP stand for?",
        options: [
          "Personal Home Page",
          "PHP: Hypertext Preprocessor",
          "Private Home Page",
          "Public Hypertext Protocol",
        ],
        correctAnswer: 1,
        explanation:
          "PHP originally stood for 'Personal Home Page' but now stands for 'PHP: Hypertext Preprocessor', a recursive acronym.",
      },
      {
        id: 2,
        question: "Which symbol is used to declare a variable in PHP?",
        options: ["@", "$", "#", "&"],
        correctAnswer: 1,
        explanation:
          "Variables in PHP are declared using the dollar sign ($) followed by the variable name, like $variableName.",
      },
      {
        id: 3,
        question: "How do you include a file in PHP?",
        options: [
          "import 'filename.php'",
          "include 'filename.php'",
          "#include 'filename.php'",
          "using 'filename.php'",
        ],
        correctAnswer: 1,
        explanation:
          "The 'include' statement is used to include files in PHP. You can also use 'require', 'include_once', or 'require_once'.",
      },
      {
        id: 4,
        question: "What is the correct way to start a PHP script?",
        options: ["<script>", "<?php", "<php>", "<%php%>"],
        correctAnswer: 1,
        explanation:
          "PHP scripts start with the opening tag '<?php' and can optionally end with '?>' when mixed with HTML.",
      },
      {
        id: 5,
        question: "Which PHP function is used to connect to a MySQL database?",
        options: [
          "mysql_connect()",
          "mysqli_connect()",
          "connect_mysql()",
          "db_connect()",
        ],
        correctAnswer: 1,
        explanation:
          "mysqli_connect() is the modern way to connect to MySQL databases in PHP. The old mysql_connect() is deprecated.",
      },
      {
        id: 6,
        question:
          "What is the difference between 'include' and 'require' in PHP?",
        options: [
          "No difference",
          "'require' produces fatal error if file not found, 'include' produces warning",
          "'include' is faster",
          "'require' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'require' will produce a fatal error and stop script execution if the file is not found, while 'include' will only produce a warning and continue execution.",
      },
      {
        id: 7,
        question: "What does PDO stand for in PHP?",
        options: [
          "PHP Data Object",
          "PHP Database Operation",
          "Portable Data Object",
          "Public Data Object",
        ],
        correctAnswer: 0,
        explanation:
          "PDO stands for PHP Data Objects, which provides a consistent interface for accessing databases in PHP, supporting multiple database types.",
      },
      {
        id: 8,
        question: "How do you declare a constant in PHP?",
        options: [
          "const NAME = value;",
          "define('NAME', value);",
          "Both A and B",
          "constant NAME = value;",
        ],
        correctAnswer: 2,
        explanation:
          "PHP supports both 'const' keyword (for class constants and compile-time constants) and 'define()' function (for runtime constants) to declare constants.",
      },
      {
        id: 9,
        question: "What is the purpose of $_SESSION in PHP?",
        options: [
          "To store temporary data",
          "To store user-specific data across multiple pages",
          "To handle errors",
          "To connect to databases",
        ],
        correctAnswer: 1,
        explanation:
          "$_SESSION is a superglobal array used to store user-specific data that persists across multiple page requests during a user's session.",
      },
      {
        id: 10,
        question: "What is a namespace in PHP?",
        options: [
          "A way to organize code and avoid naming conflicts",
          "A database schema",
          "A variable scope",
          "A file directory",
        ],
        correctAnswer: 0,
        explanation:
          "Namespaces provide a way to group related classes, interfaces, functions, and constants, preventing naming conflicts in large applications.",
      },
      {
        id: 11,
        question: "What is the difference between '==' and '===' in PHP?",
        options: [
          "No difference",
          "'==' compares values, '===' compares values and types",
          "'===' is faster",
          "'==' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'==' performs type juggling and compares values only, while '===' is a strict comparison that checks both value and type without type conversion.",
      },
      {
        id: 12,
        question: "What is Composer in PHP?",
        options: [
          "A text editor",
          "A dependency manager for PHP",
          "A web server",
          "A database tool",
        ],
        correctAnswer: 1,
        explanation:
          "Composer is a dependency management tool for PHP that allows you to declare and manage the libraries your project depends on.",
      },
      {
        id: 13,
        question: "What is the purpose of the 'use' keyword in PHP?",
        options: [
          "To include files",
          "To import namespaces or traits",
          "To define variables",
          "To create functions",
        ],
        correctAnswer: 1,
        explanation:
          "The 'use' keyword imports namespaces, classes, or traits into the current scope, allowing you to reference them without fully qualified names.",
      },
      {
        id: 14,
        question: "What is a trait in PHP?",
        options: [
          "A type of variable",
          "A mechanism for code reuse in single inheritance",
          "A database connection",
          "An error type",
        ],
        correctAnswer: 1,
        explanation:
          "Traits are a mechanism for code reuse that allows you to include methods in multiple classes, solving the single inheritance limitation.",
      },
      {
        id: 15,
        question: "What does the 'final' keyword do in PHP?",
        options: [
          "Ends script execution",
          "Prevents class inheritance or method overriding",
          "Creates constants",
          "Finalizes database connections",
        ],
        correctAnswer: 1,
        explanation:
          "The 'final' keyword prevents a class from being inherited or a method from being overridden in child classes.",
      },
      {
        id: 16,
        question: "What is Laravel's Eloquent?",
        options: [
          "A templating engine",
          "An ORM (Object-Relational Mapping) system",
          "A routing system",
          "A testing framework",
        ],
        correctAnswer: 1,
        explanation:
          "Eloquent is Laravel's ORM that provides an elegant ActiveRecord implementation for working with databases using object-oriented syntax.",
      },
      {
        id: 17,
        question: "What is the purpose of middleware in Laravel?",
        options: [
          "To store data",
          "To filter HTTP requests entering the application",
          "To handle database queries",
          "To render views",
        ],
        correctAnswer: 1,
        explanation:
          "Middleware provides a mechanism for filtering HTTP requests, commonly used for authentication, logging, CORS, and other request processing.",
      },
      {
        id: 18,
        question: "What is the difference between GET and POST methods in PHP?",
        options: [
          "No difference",
          "GET sends data in URL, POST sends data in request body",
          "POST is faster",
          "GET is more secure",
        ],
        correctAnswer: 1,
        explanation:
          "GET appends data to the URL (visible and limited), while POST sends data in the HTTP request body (more secure and can handle larger data).",
      },
      {
        id: 19,
        question: "What is prepared statement in PHP?",
        options: [
          "A pre-written SQL query",
          "A security feature that prevents SQL injection",
          "A database backup",
          "A caching mechanism",
        ],
        correctAnswer: 1,
        explanation:
          "Prepared statements separate SQL logic from data, preventing SQL injection attacks by treating user input as data rather than executable code.",
      },
      {
        id: 20,
        question: "What is autoloading in PHP?",
        options: [
          "Automatic page refresh",
          "Automatically loading classes when needed without manual includes",
          "Loading images automatically",
          "Auto-starting sessions",
        ],
        correctAnswer: 1,
        explanation:
          "Autoloading automatically loads PHP classes when they are first used, eliminating the need for manual require/include statements for each class file.",
      },
    ],
  },
  {
    title: "Ruby",
    subTitle: "Test your skills in elegant and productive programming",
    summary:
      "This Ruby test evaluates your knowledge of Ruby syntax, Rails framework, and object-oriented design.",
    duration: "45 minutes",
    description:
      "The exam covers Ruby fundamentals, Rails web development, testing practices, and your ability to write clean, maintainable code following Ruby conventions.",
    level: "Beginner to Intermediate",
    tools: ["Ruby", "Rails", "RSpec", "Bundler"],
    mode: ["Online test", "Code quality challenges"],
    url: "",
    benefits: [
      "Validate your Ruby programming skills",
      "Demonstrate Rails framework expertise",
      "Show understanding of Ruby conventions",
      "Prove ability to write clean, readable code",
    ],
    gallery: ["/images/ruby/1.jpg", "/images/ruby/2.jpg"],
    learn: [
      "Ruby syntax and idioms",
      "Object-oriented programming",
      "Rails framework",
      "Testing with RSpec",
      "Gem management",
    ],
    questions: [
      "What is Ruby?",
      "What makes Ruby different from other languages?",
      "What is Ruby on Rails?",
    ],
    quiz: [
      {
        id: 1,
        question: "What is Ruby known for?",
        options: [
          "Being the fastest language",
          "Developer happiness and productivity",
          "Low-level system programming",
          "Mobile app development",
        ],
        correctAnswer: 1,
        explanation:
          "Ruby is known for its focus on developer happiness, productivity, and elegant syntax that reads almost like natural language.",
      },
      {
        id: 2,
        question: "How do you define a method in Ruby?",
        options: [
          "function method_name",
          "def method_name",
          "method method_name",
          "define method_name",
        ],
        correctAnswer: 1,
        explanation:
          "Methods in Ruby are defined using the 'def' keyword followed by the method name and end with 'end'.",
      },
      {
        id: 3,
        question:
          "What is the difference between a symbol and a string in Ruby?",
        options: [
          "No difference",
          "Symbols are immutable, strings are mutable",
          "Strings are faster than symbols",
          "Symbols can only contain letters",
        ],
        correctAnswer: 1,
        explanation:
          "Symbols are immutable and unique objects, while strings are mutable. Symbols are often used as keys and identifiers.",
      },
      {
        id: 4,
        question: "What is Rails?",
        options: [
          "A Ruby testing framework",
          "A web application framework for Ruby",
          "A Ruby database",
          "A Ruby compiler",
        ],
        correctAnswer: 1,
        explanation:
          "Rails (Ruby on Rails) is a web application framework written in Ruby that follows the MVC pattern and emphasizes convention over configuration.",
      },
      {
        id: 5,
        question: "What does 'Convention over Configuration' mean in Rails?",
        options: [
          "You must configure everything manually",
          "Rails makes assumptions to reduce configuration",
          "Configuration files are more important",
          "Conventions are optional",
        ],
        correctAnswer: 1,
        explanation:
          "Convention over Configuration means Rails makes sensible assumptions about what you want to do, reducing the need for configuration files.",
      },
      {
        id: 6,
        question: "What is a Ruby block?",
        options: [
          "A code comment",
          "A chunk of code enclosed in do...end or curly braces",
          "A class definition",
          "A variable type",
        ],
        correctAnswer: 1,
        explanation:
          "A block is a chunk of code that can be passed to methods, enclosed either in do...end or curly braces {}. Blocks are fundamental to Ruby's iterator pattern.",
      },
      {
        id: 7,
        question: "What is the difference between 'puts' and 'print' in Ruby?",
        options: [
          "No difference",
          "'puts' adds a newline, 'print' doesn't",
          "'print' is faster",
          "'puts' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'puts' outputs text and adds a newline character at the end, while 'print' outputs text without adding a newline.",
      },
      {
        id: 8,
        question: "What is a Ruby gem?",
        options: [
          "A precious stone",
          "A packaged Ruby library or application",
          "A variable type",
          "A testing tool",
        ],
        correctAnswer: 1,
        explanation:
          "A gem is a packaged Ruby library or application that can be easily installed and managed using RubyGems, Ruby's package manager.",
      },
      {
        id: 9,
        question: "What does the 'attr_accessor' method do?",
        options: [
          "Creates a class",
          "Creates getter and setter methods for instance variables",
          "Accesses databases",
          "Handles errors",
        ],
        correctAnswer: 1,
        explanation:
          "'attr_accessor' is a shortcut that automatically creates both getter and setter methods for instance variables, reducing boilerplate code.",
      },
      {
        id: 10,
        question: "What is the purpose of 'yield' in Ruby?",
        options: [
          "To stop execution",
          "To transfer control to a block passed to a method",
          "To return a value",
          "To create loops",
        ],
        correctAnswer: 1,
        explanation:
          "'yield' transfers control to the block passed to a method, allowing methods to execute custom code provided by the caller.",
      },
      {
        id: 11,
        question: "What is a Ruby module?",
        options: [
          "A type of class",
          "A collection of methods and constants that can be mixed into classes",
          "A database connection",
          "A file format",
        ],
        correctAnswer: 1,
        explanation:
          "A module is a collection of methods and constants that can be mixed into classes using 'include' or 'extend', providing namespacing and mixins.",
      },
      {
        id: 12,
        question:
          "What is the difference between 'include' and 'extend' in Ruby?",
        options: [
          "No difference",
          "'include' adds instance methods, 'extend' adds class methods",
          "'extend' is deprecated",
          "'include' is faster",
        ],
        correctAnswer: 1,
        explanation:
          "'include' adds module methods as instance methods to a class, while 'extend' adds them as class methods.",
      },
      {
        id: 13,
        question: "What is ActiveRecord in Rails?",
        options: [
          "A testing framework",
          "An ORM that maps database tables to Ruby objects",
          "A routing system",
          "A view renderer",
        ],
        correctAnswer: 1,
        explanation:
          "ActiveRecord is Rails' ORM (Object-Relational Mapping) that provides an interface between Ruby objects and database tables, following the Active Record pattern.",
      },
      {
        id: 14,
        question: "What is the purpose of migrations in Rails?",
        options: [
          "To move files",
          "To version control database schema changes",
          "To deploy applications",
          "To test code",
        ],
        correctAnswer: 1,
        explanation:
          "Migrations are Ruby classes that define database schema changes in a version-controlled way, allowing teams to evolve the database structure over time.",
      },
      {
        id: 15,
        question: "What is a lambda in Ruby?",
        options: [
          "A Greek letter",
          "An anonymous function object with strict argument checking",
          "A variable type",
          "A class method",
        ],
        correctAnswer: 1,
        explanation:
          "A lambda is an anonymous function object that checks the number of arguments and uses 'return' to exit only the lambda, not the enclosing method.",
      },
      {
        id: 16,
        question: "What is the difference between 'nil' and 'false' in Ruby?",
        options: [
          "They are the same",
          "Both are falsy, but 'nil' represents absence of value",
          "'false' is deprecated",
          "'nil' is a string",
        ],
        correctAnswer: 1,
        explanation:
          "Both 'nil' and 'false' are falsy values in Ruby, but 'nil' represents the absence of a value while 'false' is an explicit boolean false.",
      },
      {
        id: 17,
        question: "What is RSpec?",
        options: [
          "A web server",
          "A testing framework for Ruby",
          "A database tool",
          "A deployment system",
        ],
        correctAnswer: 1,
        explanation:
          "RSpec is a behavior-driven development (BDD) testing framework for Ruby that provides a readable DSL for writing tests.",
      },
      {
        id: 18,
        question: "What does the 'self' keyword refer to in Ruby?",
        options: [
          "The current object or class",
          "A variable name",
          "The parent class",
          "A method name",
        ],
        correctAnswer: 0,
        explanation:
          "'self' refers to the current object in an instance method context, or the current class in a class method context.",
      },
      {
        id: 19,
        question: "What is Bundler in Ruby?",
        options: [
          "A code bundler",
          "A dependency management tool for Ruby gems",
          "A web server",
          "A testing tool",
        ],
        correctAnswer: 1,
        explanation:
          "Bundler is a dependency management tool that ensures consistent gem versions across different environments by using a Gemfile and Gemfile.lock.",
      },
      {
        id: 20,
        question: "What is the purpose of the 'rescue' keyword in Ruby?",
        options: [
          "To save files",
          "To handle exceptions and errors",
          "To optimize code",
          "To create backups",
        ],
        correctAnswer: 1,
        explanation:
          "'rescue' is used in exception handling to catch and handle errors, similar to 'catch' in other languages, preventing program crashes.",
      },
    ],
  },
  {
    title: "Swift",
    subTitle: "Master iOS and macOS app development",
    summary:
      "This Swift test covers iOS development, UIKit, SwiftUI, and modern Swift language features.",
    duration: "30 minutes",
    description:
      "The exam evaluates your understanding of Swift syntax, iOS app architecture, user interface development, and your ability to build native Apple applications.",
    level: "Beginner to Advanced",
    tools: ["Swift", "Xcode", "UIKit", "SwiftUI"],
    mode: ["Online test", "iOS development challenges"],
    url: "",
    benefits: [
      "Validate your Swift programming skills",
      "Demonstrate iOS development expertise",
      "Show understanding of Apple's frameworks",
      "Prove ability to build native mobile apps",
    ],
    gallery: ["/images/swift/1.jpg", "/images/swift/2.jpg"],
    learn: [
      "Swift syntax and features",
      "iOS app architecture",
      "UIKit and SwiftUI",
      "Core Data and networking",
      "App Store deployment",
    ],
    questions: [
      "What is Swift?",
      "Difference between UIKit and SwiftUI?",
      "What are optionals in Swift?",
    ],
    quiz: [
      {
        id: 1,
        question: "What are optionals in Swift?",
        options: [
          "Optional parameters in functions",
          "Variables that can contain a value or nil",
          "Optional classes",
          "Settings that can be turned on/off",
        ],
        correctAnswer: 1,
        explanation:
          "Optionals in Swift are types that can contain either a value or nil, providing type safety for potentially missing values.",
      },
      {
        id: 2,
        question: "How do you safely unwrap an optional in Swift?",
        options: [
          "Using !! operator",
          "Using if let or guard let",
          "Using try-catch",
          "Using force unwrap only",
        ],
        correctAnswer: 1,
        explanation:
          "Safe unwrapping is done using 'if let' or 'guard let' statements, which check if the optional contains a value before using it.",
      },
      {
        id: 3,
        question: "What is the difference between let and var in Swift?",
        options: [
          "No difference",
          "let creates constants, var creates variables",
          "var creates constants, let creates variables",
          "let is for strings, var is for numbers",
        ],
        correctAnswer: 1,
        explanation:
          "'let' creates immutable constants that cannot be changed after initialization, while 'var' creates mutable variables.",
      },
      {
        id: 4,
        question: "What is SwiftUI?",
        options: [
          "A testing framework",
          "A declarative UI framework",
          "A database framework",
          "A networking library",
        ],
        correctAnswer: 1,
        explanation:
          "SwiftUI is Apple's declarative framework for building user interfaces across all Apple platforms using Swift.",
      },
      {
        id: 5,
        question: "What is ARC in Swift?",
        options: [
          "Automatic Reference Counting",
          "Apple Resource Center",
          "Application Runtime Controller",
          "Automatic Resource Cleanup",
        ],
        correctAnswer: 0,
        explanation:
          "ARC (Automatic Reference Counting) is Swift's memory management system that automatically deallocates objects when they're no longer needed.",
      },
      {
        id: 6,
        question: "What is a protocol in Swift?",
        options: [
          "A network protocol",
          "A blueprint of methods and properties that types can adopt",
          "A security feature",
          "A data type",
        ],
        correctAnswer: 1,
        explanation:
          "A protocol defines a blueprint of methods, properties, and requirements that conforming types must implement, similar to interfaces in other languages.",
      },
      {
        id: 7,
        question:
          "What is the difference between 'struct' and 'class' in Swift?",
        options: [
          "No difference",
          "Structs are value types, classes are reference types",
          "Classes are faster",
          "Structs can't have methods",
        ],
        correctAnswer: 1,
        explanation:
          "Structs are value types (copied when assigned), while classes are reference types (shared references). Structs also don't support inheritance.",
      },
      {
        id: 8,
        question: "What is optional chaining in Swift?",
        options: [
          "A way to chain methods",
          "A process for querying and calling properties on optionals that might be nil",
          "A data structure",
          "A loop construct",
        ],
        correctAnswer: 1,
        explanation:
          "Optional chaining allows you to safely access properties and methods on optionals using '?', returning nil if any part of the chain is nil.",
      },
      {
        id: 9,
        question: "What is a closure in Swift?",
        options: [
          "A way to close apps",
          "Self-contained blocks of functionality that can be passed around",
          "A class definition",
          "A loop terminator",
        ],
        correctAnswer: 1,
        explanation:
          "Closures are self-contained blocks of functionality that can capture and store references to variables from their surrounding context.",
      },
      {
        id: 10,
        question: "What does the 'weak' keyword do in Swift?",
        options: [
          "Makes variables less secure",
          "Creates a weak reference to prevent retain cycles",
          "Reduces performance",
          "Makes code less strict",
        ],
        correctAnswer: 1,
        explanation:
          "'weak' creates a weak reference that doesn't increase the retain count, preventing strong reference cycles and memory leaks.",
      },
      {
        id: 11,
        question: "What is the purpose of 'defer' in Swift?",
        options: [
          "To delay execution",
          "To execute code just before leaving the current scope",
          "To handle errors",
          "To create async functions",
        ],
        correctAnswer: 1,
        explanation:
          "'defer' schedules code to be executed just before leaving the current scope, commonly used for cleanup operations.",
      },
      {
        id: 12,
        question: "What is a computed property in Swift?",
        options: [
          "A property that calculates its value",
          "A property stored in memory",
          "A constant property",
          "A static property",
        ],
        correctAnswer: 0,
        explanation:
          "A computed property doesn't store a value but provides a getter and optional setter to calculate and retrieve values dynamically.",
      },
      {
        id: 13,
        question:
          "What is the difference between 'map' and 'flatMap' in Swift?",
        options: [
          "No difference",
          "'flatMap' flattens nested arrays and removes nils",
          "'map' is faster",
          "'flatMap' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'map' transforms each element, while 'flatMap' (now 'compactMap' for optionals) transforms and flattens results, removing nil values.",
      },
      {
        id: 14,
        question: "What is a guard statement used for?",
        options: [
          "Security checks",
          "Early exit from a function if conditions aren't met",
          "Loop control",
          "Error handling",
        ],
        correctAnswer: 1,
        explanation:
          "'guard' provides early exit from a function, method, or loop when conditions aren't met, improving code readability and reducing nesting.",
      },
      {
        id: 15,
        question: "What is the purpose of extensions in Swift?",
        options: [
          "To extend file names",
          "To add functionality to existing types",
          "To create new types",
          "To import libraries",
        ],
        correctAnswer: 1,
        explanation:
          "Extensions add new functionality to existing classes, structs, enums, or protocols without modifying their original source code.",
      },
      {
        id: 16,
        question: "What is Core Data in iOS?",
        options: [
          "A networking framework",
          "A framework for managing object graphs and persistence",
          "A UI framework",
          "A testing tool",
        ],
        correctAnswer: 1,
        explanation:
          "Core Data is Apple's framework for managing the model layer, providing object graph management and persistence to various storage formats.",
      },
      {
        id: 17,
        question:
          "What is the difference between '@escaping' and non-escaping closures?",
        options: [
          "No difference",
          "@escaping closures can outlive the function they're passed to",
          "@escaping is faster",
          "@escaping is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "@escaping closures can be stored and executed after the function returns, while non-escaping closures must be executed before the function returns.",
      },
      {
        id: 18,
        question: "What is a property observer in Swift?",
        options: [
          "A debugging tool",
          "Code that responds to changes in property values (willSet/didSet)",
          "A design pattern",
          "A testing feature",
        ],
        correctAnswer: 1,
        explanation:
          "Property observers (willSet and didSet) observe and respond to changes in a property's value, executing code before or after the value changes.",
      },
      {
        id: 19,
        question: "What is the Codable protocol in Swift?",
        options: [
          "A security protocol",
          "A type alias for Encodable and Decodable protocols",
          "A networking protocol",
          "A UI protocol",
        ],
        correctAnswer: 1,
        explanation:
          "Codable is a type alias for Encodable and Decodable protocols, enabling easy encoding and decoding of data to/from external representations like JSON.",
      },
      {
        id: 20,
        question: "What is the purpose of 'async/await' in Swift?",
        options: [
          "To slow down code",
          "To write asynchronous code in a synchronous style",
          "To handle errors",
          "To create threads",
        ],
        correctAnswer: 1,
        explanation:
          "async/await provides a cleaner, more readable way to write asynchronous code, making it look and behave like synchronous code while remaining non-blocking.",
      },
    ],
  },
  {
    title: "Kotlin",
    subTitle: "Evaluate your modern Android development skills",
    summary:
      "This Kotlin test covers Android development, coroutines, and interoperability with Java.",
    duration: "45 minutes",
    description:
      "The exam assesses your knowledge of Kotlin syntax, Android app development, modern concurrency patterns, and your ability to build robust mobile applications.",
    level: "Beginner to Intermediate",
    tools: ["Kotlin", "Android Studio", "Gradle", "JetPack Compose"],
    mode: ["Online test", "Android development scenarios"],
    url: "",
    benefits: [
      "Validate your Kotlin programming skills",
      "Demonstrate Android development expertise",
      "Show understanding of modern concurrency",
      "Prove ability to build scalable mobile apps",
    ],
    gallery: ["/images/kotlin/1.jpg", "/images/kotlin/2.jpg"],
    learn: [
      "Kotlin syntax and features",
      "Android app development",
      "Coroutines and async programming",
      "Jetpack Compose UI",
      "Java interoperability",
    ],
    questions: [
      "What is Kotlin?",
      "How does Kotlin improve upon Java?",
      "What are coroutines?",
    ],
    quiz: [
      {
        id: 1,
        question: "What is Kotlin?",
        options: [
          "A replacement for Java",
          "A modern programming language that runs on JVM",
          "An Android framework",
          "A database system",
        ],
        correctAnswer: 1,
        explanation:
          "Kotlin is a modern, statically-typed programming language that runs on the JVM and is fully interoperable with Java.",
      },
      {
        id: 2,
        question: "What are coroutines in Kotlin?",
        options: [
          "A type of loop",
          "Lightweight threads for asynchronous programming",
          "Data structures",
          "UI components",
        ],
        correctAnswer: 1,
        explanation:
          "Coroutines are Kotlin's solution for asynchronous programming, providing lightweight threads that don't block the main thread.",
      },
      {
        id: 3,
        question: "How do you declare a nullable variable in Kotlin?",
        options: [
          "var name: String?",
          "var name: nullable String",
          "var name: String | null",
          "var name: optional String",
        ],
        correctAnswer: 0,
        explanation:
          "Nullable types in Kotlin are declared by adding a '?' after the type name, like String? for a nullable string.",
      },
      {
        id: 4,
        question: "What is the Elvis operator in Kotlin?",
        options: ["?:", "??", "?.", "??"],
        correctAnswer: 0,
        explanation:
          "The Elvis operator (?:) provides a default value when the left side of the expression is null.",
      },
      {
        id: 5,
        question: "What is Jetpack Compose?",
        options: [
          "A testing framework",
          "A modern UI toolkit for Android",
          "A database library",
          "A networking framework",
        ],
        correctAnswer: 1,
        explanation:
          "Jetpack Compose is Android's modern toolkit for building native UI using declarative programming patterns.",
      },
      {
        id: 6,
        question: "What is a data class in Kotlin?",
        options: [
          "A class for storing data",
          "A class that automatically generates equals, hashCode, toString, and copy",
          "A database class",
          "A serialization class",
        ],
        correctAnswer: 1,
        explanation:
          "Data classes automatically generate useful methods like equals(), hashCode(), toString(), and copy(), making them ideal for holding data.",
      },
      {
        id: 7,
        question: "What is the difference between 'val' and 'var' in Kotlin?",
        options: [
          "No difference",
          "'val' is read-only, 'var' is mutable",
          "'var' is faster",
          "'val' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'val' declares a read-only (immutable) variable that can only be assigned once, while 'var' declares a mutable variable that can be reassigned.",
      },
      {
        id: 8,
        question: "What is a sealed class in Kotlin?",
        options: [
          "A secure class",
          "A class that restricts inheritance to a known set of subclasses",
          "A final class",
          "An abstract class",
        ],
        correctAnswer: 1,
        explanation:
          "Sealed classes restrict class hierarchies to a known set of subclasses, enabling exhaustive when expressions and better type safety.",
      },
      {
        id: 9,
        question: "What is the purpose of the 'companion object' in Kotlin?",
        options: [
          "To create pairs of objects",
          "To define class-level members similar to static in Java",
          "To handle concurrency",
          "To create singletons",
        ],
        correctAnswer: 1,
        explanation:
          "Companion objects provide a way to define class-level members and functions, similar to static members in Java, but with more flexibility.",
      },
      {
        id: 10,
        question: "What is the 'let' function used for in Kotlin?",
        options: [
          "To declare variables",
          "To execute a lambda on a non-null object",
          "To create loops",
          "To handle errors",
        ],
        correctAnswer: 1,
        explanation:
          "'let' is a scope function that executes a lambda on a non-null object, commonly used for null safety and transforming values.",
      },
      {
        id: 11,
        question: "What is the difference between '==' and '===' in Kotlin?",
        options: [
          "No difference",
          "'==' checks structural equality, '===' checks referential equality",
          "'===' is faster",
          "'==' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'==' checks structural equality (like equals() in Java), while '===' checks if two references point to the same object.",
      },
      {
        id: 12,
        question: "What is an extension function in Kotlin?",
        options: [
          "A long function",
          "A function that adds functionality to existing classes",
          "A deprecated function",
          "A recursive function",
        ],
        correctAnswer: 1,
        explanation:
          "Extension functions allow you to add new functions to existing classes without modifying their source code or using inheritance.",
      },
      {
        id: 13,
        question: "What is the purpose of 'lateinit' in Kotlin?",
        options: [
          "To delay initialization",
          "To declare non-null properties that will be initialized later",
          "To create lazy properties",
          "To handle late responses",
        ],
        correctAnswer: 1,
        explanation:
          "'lateinit' allows you to declare non-null properties that will be initialized later, avoiding the need for nullable types when you know initialization will happen.",
      },
      {
        id: 14,
        question: "What is a lambda expression in Kotlin?",
        options: [
          "A Greek letter",
          "An anonymous function that can be passed as a value",
          "A variable type",
          "A class definition",
        ],
        correctAnswer: 1,
        explanation:
          "Lambda expressions are anonymous functions that can be treated as values, passed as arguments, or returned from functions.",
      },
      {
        id: 15,
        question: "What is the 'apply' function used for in Kotlin?",
        options: [
          "To apply styles",
          "To configure an object and return it",
          "To apply filters",
          "To handle errors",
        ],
        correctAnswer: 1,
        explanation:
          "'apply' is a scope function that configures an object's properties and returns the object itself, useful for object initialization.",
      },
      {
        id: 16,
        question: "What is a higher-order function in Kotlin?",
        options: [
          "A complex function",
          "A function that takes functions as parameters or returns a function",
          "A top-level function",
          "A recursive function",
        ],
        correctAnswer: 1,
        explanation:
          "Higher-order functions can take other functions as parameters or return functions, enabling functional programming patterns.",
      },
      {
        id: 17,
        question: "What is the purpose of 'by lazy' in Kotlin?",
        options: [
          "To make code slower",
          "To defer property initialization until first access",
          "To create background tasks",
          "To handle errors",
        ],
        correctAnswer: 1,
        explanation:
          "'by lazy' creates a property that's initialized only when first accessed, useful for expensive computations or resources.",
      },
      {
        id: 18,
        question: "What is a typealias in Kotlin?",
        options: [
          "A fake name",
          "An alternative name for an existing type",
          "A new type",
          "A variable name",
        ],
        correctAnswer: 1,
        explanation:
          "Typealias provides an alternative name for existing types, making complex type declarations more readable without creating new types.",
      },
      {
        id: 19,
        question: "What is the 'when' expression in Kotlin?",
        options: [
          "A time function",
          "A powerful replacement for switch statements",
          "A loop construct",
          "An error handler",
        ],
        correctAnswer: 1,
        explanation:
          "'when' is a powerful expression that replaces switch statements, supporting pattern matching, ranges, and can be used as an expression or statement.",
      },
      {
        id: 20,
        question: "What is Flow in Kotlin?",
        options: [
          "A water stream",
          "An asynchronous data stream that emits values sequentially",
          "A control flow statement",
          "A UI component",
        ],
        correctAnswer: 1,
        explanation:
          "Flow is Kotlin's cold asynchronous data stream that emits values sequentially, built on top of coroutines for reactive programming.",
      },
    ],
  },
  // ];

  // // export default Questions;Which of the following is NOT a primitive data type in Java?",
  //         options: ["int", "String", "boolean", "char"],
  //         correctAnswer: 1,
  //         explanation: "String is not a primitive data type in Java. It's a reference type (object) from the String class."
  //       },
  //       {
  //         id: 3,
  //         question: "What is the difference between JDK and JRE?",
  //         options: [
  //           "JDK is for development, JRE is for runtime",
  //           "JDK is for runtime, JRE is for development",
  //           "There is no difference",
  //           "JDK is older version of JRE"
  //         ],
  //         correctAnswer: 0,
  //         explanation: "JDK (Java Development Kit) includes development tools like compiler, while JRE (Java Runtime Environment) only provides runtime libraries."
  //       },
  //       {
  //         id: 4,
  //         question: "Which keyword is used to create a subclass in Java?",
  //         options: ["implements", "extends", "inherits", "super"],
  //         correctAnswer: 1,
  //         explanation: "The 'extends' keyword is used to create a subclass that inherits from a parent class in Java."
  //       },
  //       {
  //         id: 5,
  //         question: "What is the default access modifier for a class member in Java?",
  //         options: ["private", "public", "protected", "package-private (default)"],
  //         correctAnswer: 3,
  //         explanation: "If no access modifier is specified, the default access is package-private, meaning it's accessible within the same package."
  //       }
  //     ]
  //   },
  {
    title: "JavaScript",
    subTitle: "Evaluate your knowledge of the language of the web",
    summary:
      "This JavaScript test measures your understanding of ES6+, DOM manipulation, and async programming.",
    duration: "45 minutes",
    description:
      "The test consists of timed, multiple-choice and coding questions that evaluate your knowledge of modern JavaScript features, DOM handling, and asynchronous programming.",
    level: "Beginner to Intermediate",
    tools: ["JavaScript (ES6+)", "VS Code", "Browser DevTools"],
    mode: ["Online test", "Interactive coding challenges"],
    url: "",
    benefits: [
      "Validate your core JavaScript skills",
      "Demonstrate practical knowledge in web coding",
      "Establish your foundation for frontend and backend work",
    ],
    gallery: ["/images/javascript/1.jpg", "/images/javascript/2.jpg"],
    learn: [
      "Variables, functions, and scope",
      "DOM & event handling",
      "ES6+ features",
      "Async programming",
      "Modules & bundling",
    ],
    questions: [
      "What are JavaScript data types?",
      "Difference between var, let, and const?",
      "What is hoisting?",
    ],
    quiz: [
      {
        id: 1,
        question:
          "What is the difference between 'let' and 'var' in JavaScript?",
        options: [
          "No difference",
          "'let' has block scope, 'var' has function scope",
          "'var' has block scope, 'let' has function scope",
          "'let' is older than 'var'",
        ],
        correctAnswer: 1,
        explanation:
          "'let' has block scope and is not hoisted, while 'var' has function scope and is hoisted to the top of its scope.",
      },
      {
        id: 2,
        question:
          "Which method is used to add an element to the end of an array?",
        options: ["append()", "push()", "add()", "insert()"],
        correctAnswer: 1,
        explanation:
          "The push() method adds one or more elements to the end of an array and returns the new length.",
      },
      {
        id: 3,
        question: "What does 'hoisting' mean in JavaScript?",
        options: [
          "Moving variables to global scope",
          "Variable and function declarations are moved to the top of their scope",
          "Lifting functions above variables",
          "Converting strings to numbers",
        ],
        correctAnswer: 1,
        explanation:
          "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their containing scope.",
      },
      {
        id: 4,
        question: "Which operator is used for strict equality in JavaScript?",
        options: ["==", "===", "=", "!=="],
        correctAnswer: 1,
        explanation:
          "The === operator checks for strict equality, comparing both value and type without type coercion.",
      },
      {
        id: 5,
        question: "What is a closure in JavaScript?",
        options: [
          "A way to close browser windows",
          "A function having access to variables in its outer scope",
          "A method to terminate loops",
          "A type of event listener",
        ],
        correctAnswer: 1,
        explanation:
          "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
      },
      {
        id: 6,
        question: "What is the purpose of 'this' keyword in JavaScript?",
        options: [
          "To reference the current object",
          "To create variables",
          "To import modules",
          "To handle errors",
        ],
        correctAnswer: 0,
        explanation:
          "'this' refers to the object that is executing the current function. Its value depends on how the function is called.",
      },
      {
        id: 7,
        question: "What is event delegation in JavaScript?",
        options: [
          "Assigning tasks to events",
          "Using event bubbling to handle events at a parent level",
          "Creating multiple event listeners",
          "Removing events",
        ],
        correctAnswer: 1,
        explanation:
          "Event delegation uses event bubbling to handle events at a parent element rather than individual children, improving performance and handling dynamic elements.",
      },
      {
        id: 8,
        question: "What is the difference between 'null' and 'undefined'?",
        options: [
          "No difference",
          "'null' is assigned, 'undefined' means not yet assigned",
          "'undefined' is deprecated",
          "'null' is faster",
        ],
        correctAnswer: 1,
        explanation:
          "'undefined' means a variable has been declared but not assigned a value, while 'null' is an intentional assignment representing no value.",
      },
      {
        id: 9,
        question: "What is a Promise in JavaScript?",
        options: [
          "A guarantee",
          "An object representing eventual completion or failure of async operation",
          "A variable type",
          "A loop construct",
        ],
        correctAnswer: 1,
        explanation:
          "A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.",
      },
      {
        id: 10,
        question: "What is the spread operator (...) used for?",
        options: [
          "To spread butter",
          "To expand iterables into individual elements",
          "To create ranges",
          "To handle errors",
        ],
        correctAnswer: 1,
        explanation:
          "The spread operator (...) expands iterables (arrays, objects) into individual elements, useful for copying, merging, and function arguments.",
      },
      {
        id: 11,
        question: "What is destructuring in JavaScript?",
        options: [
          "Breaking code",
          "Extracting values from arrays or objects into variables",
          "Removing elements",
          "Optimizing code",
        ],
        correctAnswer: 1,
        explanation:
          "Destructuring is a syntax that allows extracting values from arrays or properties from objects into distinct variables in a concise way.",
      },
      {
        id: 12,
        question: "What is the purpose of 'async/await'?",
        options: [
          "To slow down code",
          "To write asynchronous code in a synchronous style",
          "To create threads",
          "To handle events",
        ],
        correctAnswer: 1,
        explanation:
          "async/await provides a cleaner way to work with Promises, allowing asynchronous code to be written in a more synchronous-looking style.",
      },
      {
        id: 13,
        question: "What is the Event Loop in JavaScript?",
        options: [
          "A for loop for events",
          "A mechanism that handles async operations in single-threaded JavaScript",
          "An event handler",
          "A debugging tool",
        ],
        correctAnswer: 1,
        explanation:
          "The Event Loop is a mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded by offloading operations to the browser APIs.",
      },
      {
        id: 14,
        question: "What is the difference between 'map' and 'forEach'?",
        options: [
          "No difference",
          "'map' returns new array, 'forEach' doesn't return anything",
          "'forEach' is faster",
          "'map' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'map' creates and returns a new array with transformed elements, while 'forEach' simply iterates and returns undefined.",
      },
      {
        id: 15,
        question: "What is a callback function?",
        options: [
          "A function that calls back",
          "A function passed as argument to be executed later",
          "A recursive function",
          "An error handler",
        ],
        correctAnswer: 1,
        explanation:
          "A callback is a function passed as an argument to another function to be executed later, commonly used in asynchronous operations.",
      },
      {
        id: 16,
        question: "What is the purpose of 'use strict'?",
        options: [
          "To make code stricter",
          "To enable strict mode for better error checking",
          "To improve performance",
          "To add security",
        ],
        correctAnswer: 1,
        explanation:
          "'use strict' enables strict mode, which catches common coding errors, prevents use of certain syntax, and throws more exceptions.",
      },
      {
        id: 17,
        question: "What is a template literal in JavaScript?",
        options: [
          "A design template",
          "String literals allowing embedded expressions using backticks",
          "A class template",
          "A function template",
        ],
        correctAnswer: 1,
        explanation:
          "Template literals use backticks (`) and allow embedded expressions with ${}, multi-line strings, and string interpolation.",
      },
      {
        id: 18,
        question: "What is the difference between 'call' and 'apply'?",
        options: [
          "No difference",
          "'call' takes arguments separately, 'apply' takes array of arguments",
          "'apply' is faster",
          "'call' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "Both invoke functions with a specified 'this' value, but 'call' takes arguments individually while 'apply' takes an array of arguments.",
      },
      {
        id: 19,
        question: "What is a module in JavaScript?",
        options: [
          "A small piece of code",
          "A file containing reusable code that can be exported and imported",
          "A function",
          "A variable",
        ],
        correctAnswer: 1,
        explanation:
          "Modules are files containing reusable code that can be exported and imported, helping organize code and manage dependencies.",
      },
      {
        id: 20,
        question: "What is the difference between 'slice' and 'splice'?",
        options: [
          "No difference",
          "'slice' returns new array, 'splice' modifies original array",
          "'splice' is faster",
          "'slice' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'slice' returns a shallow copy of a portion of an array without modifying it, while 'splice' changes the original array by adding/removing elements.",
      },
    ],
  },
  {
    title: "TypeScript",
    subTitle: "Verify your ability to build scalable apps with TypeScript",
    summary:
      "This TypeScript test evaluates your skills in types, interfaces, generics, and advanced typing.",
    duration: "40 minutes",
    description:
      "The exam checks your understanding of TypeScript fundamentals, integration with React and Node.js, and your ability to apply advanced type concepts.",
    level: "Intermediate",
    tools: ["TypeScript", "React", "Node.js", "VS Code"],
    mode: ["Online test", "Timed coding problems"],
    url: "",
    benefits: [
      "Show employers your ability to write safer, scalable code",
      "Prove you can integrate TypeScript with React & Node",
      "Validate in-demand TypeScript expertise",
    ],
    gallery: ["/images/typescript/1.jpg", "/images/typescript/2.jpg"],
    learn: [
      "Type annotations & inference",
      "Interfaces & generics",
      "Advanced types",
      "TypeScript + React",
      "TypeScript + Node",
    ],
    questions: [
      "What is TypeScript?",
      "Difference between JS and TS?",
      "What are types in TypeScript?",
    ],
    quiz: [
      {
        id: 1,
        question: "What is TypeScript?",
        options: [
          "A replacement for JavaScript",
          "A superset of JavaScript with static typing",
          "A new programming language",
          "A JavaScript framework",
        ],
        correctAnswer: 1,
        explanation:
          "TypeScript is a superset of JavaScript that adds static type definitions, making it easier to catch errors at compile time.",
      },
      {
        id: 2,
        question: "How do you define an interface in TypeScript?",
        options: [
          "class MyInterface {}",
          "interface MyInterface {}",
          "type MyInterface = {}",
          "function MyInterface() {}",
        ],
        correctAnswer: 1,
        explanation:
          "Interfaces in TypeScript are defined using the 'interface' keyword followed by the interface name and its structure.",
      },
      {
        id: 3,
        question: "What is the purpose of generics in TypeScript?",
        options: [
          "To make code run faster",
          "To create reusable components with type safety",
          "To replace interfaces",
          "To handle errors",
        ],
        correctAnswer: 1,
        explanation:
          "Generics allow you to create reusable components that can work with multiple types while maintaining type safety.",
      },
      {
        id: 4,
        question:
          "Which TypeScript feature helps catch errors at compile time?",
        options: [
          "Runtime checking",
          "Static type checking",
          "Dynamic typing",
          "Automatic debugging",
        ],
        correctAnswer: 1,
        explanation:
          "TypeScript's static type checking analyzes your code at compile time to catch type-related errors before runtime.",
      },
      {
        id: 5,
        question: "What does the '?' symbol mean in TypeScript interfaces?",
        options: [
          "Required property",
          "Optional property",
          "Nullable property",
          "Generic property",
        ],
        correctAnswer: 1,
        explanation:
          "The '?' symbol marks a property as optional, meaning it may or may not be present in objects implementing that interface.",
      },
      {
        id: 6,
        question: "What is a union type in TypeScript?",
        options: [
          "A type that combines multiple types",
          "A type that can be one of several types",
          "A database union",
          "A class union",
        ],
        correctAnswer: 1,
        explanation:
          "Union types allow a value to be one of several types, defined using the pipe symbol (|), like string | number.",
      },
      {
        id: 7,
        question: "What is the 'never' type in TypeScript?",
        options: [
          "A type that never exists",
          "A type for functions that never return",
          "A deprecated type",
          "An error type",
        ],
        correctAnswer: 1,
        explanation:
          "The 'never' type represents values that never occur, commonly used for functions that always throw errors or have infinite loops.",
      },
      {
        id: 8,
        question: "What is type assertion in TypeScript?",
        options: [
          "Asserting code correctness",
          "Telling the compiler to treat a value as a specific type",
          "Type checking",
          "Error handling",
        ],
        correctAnswer: 1,
        explanation:
          "Type assertion tells the TypeScript compiler to treat a value as a specific type, using 'as' syntax or angle brackets.",
      },
      {
        id: 9,
        question: "What is an enum in TypeScript?",
        options: [
          "A number type",
          "A way to define named constants",
          "An error type",
          "A string type",
        ],
        correctAnswer: 1,
        explanation:
          "Enums allow defining a set of named constants, making code more readable and maintainable by giving friendly names to numeric or string values.",
      },
      {
        id: 10,
        question: "What is the 'readonly' modifier in TypeScript?",
        options: [
          "Makes properties read-only after initialization",
          "Makes code read-only",
          "A documentation feature",
          "An access modifier",
        ],
        correctAnswer: 0,
        explanation:
          "The 'readonly' modifier makes properties immutable after initialization, preventing reassignment but allowing initial assignment.",
      },
      {
        id: 11,
        question: "What is a tuple in TypeScript?",
        options: [
          "A two-element array",
          "An array with fixed length and types for each position",
          "A data structure",
          "A function type",
        ],
        correctAnswer: 1,
        explanation:
          "Tuples are arrays with a fixed number of elements where each element can have a different, specific type.",
      },
      {
        id: 12,
        question: "What is the purpose of 'keyof' in TypeScript?",
        options: [
          "To create keys",
          "To get union type of all property names of a type",
          "To check keys",
          "To delete keys",
        ],
        correctAnswer: 1,
        explanation:
          "'keyof' creates a union type of all property names (keys) of a given type, useful for type-safe property access.",
      },
      {
        id: 13,
        question: "What is a mapped type in TypeScript?",
        options: [
          "A map data structure",
          "A type that transforms properties of another type",
          "A navigation type",
          "A function type",
        ],
        correctAnswer: 1,
        explanation:
          "Mapped types transform properties of an existing type to create a new type, like making all properties optional or readonly.",
      },
      {
        id: 14,
        question: "What is the 'unknown' type in TypeScript?",
        options: [
          "An error type",
          "A type-safe alternative to 'any'",
          "A deprecated type",
          "A null type",
        ],
        correctAnswer: 1,
        explanation:
          "'unknown' is a type-safe alternative to 'any' that requires type checking before performing operations on the value.",
      },
      {
        id: 15,
        question: "What is type narrowing in TypeScript?",
        options: [
          "Making types smaller",
          "Refining types to more specific types through checks",
          "Removing types",
          "Compressing types",
        ],
        correctAnswer: 1,
        explanation:
          "Type narrowing refines a general type to a more specific type through type guards, typeof checks, or instanceof checks.",
      },
      {
        id: 16,
        question: "What is a conditional type in TypeScript?",
        options: [
          "An if statement",
          "A type that depends on a condition",
          "A boolean type",
          "A switch type",
        ],
        correctAnswer: 1,
        explanation:
          "Conditional types select one of two possible types based on a condition, using the syntax T extends U ? X : Y.",
      },
      {
        id: 17,
        question: "What is the 'infer' keyword used for?",
        options: [
          "To infer types",
          "To extract types within conditional types",
          "To guess types",
          "To validate types",
        ],
        correctAnswer: 1,
        explanation:
          "'infer' is used within conditional types to extract and name a type, allowing you to capture and use types from generic parameters.",
      },
      {
        id: 18,
        question: "What is a discriminated union in TypeScript?",
        options: [
          "A union with discrimination",
          "A union type with a common property for type narrowing",
          "A database union",
          "A set operation",
        ],
        correctAnswer: 1,
        explanation:
          "Discriminated unions use a common property (discriminant) to distinguish between union members, enabling type-safe narrowing.",
      },
      {
        id: 19,
        question: "What is the 'as const' assertion?",
        options: [
          "A constant assertion",
          "Makes values deeply readonly and literal types",
          "A type cast",
          "A variable declaration",
        ],
        correctAnswer: 1,
        explanation:
          "'as const' creates a deeply readonly value with literal types instead of widened types, useful for creating immutable constants.",
      },
      {
        id: 20,
        question: "What is a utility type in TypeScript?",
        options: [
          "A useful type",
          "Built-in generic types for common type transformations",
          "A helper function",
          "A debugging type",
        ],
        correctAnswer: 1,
        explanation:
          "Utility types are built-in generic types like Partial, Required, Pick, Omit that perform common type transformations.",
      },
    ],
  },
  {
    title: "Python",
    subTitle: "Test your skills in web, data, and automation with Python",
    summary:
      "This Python exam covers syntax, OOP, libraries, and frameworks like Flask/Django.",
    duration: "30 minutes",
    description:
      "The test measures your knowledge of Python basics, OOP concepts, data handling, and popular frameworks like Flask and Django. Includes both multiple-choice and coding tasks.",
    level: "Beginner to Intermediate",
    tools: ["Python", "Flask", "Django", "Jupyter Notebook"],
    mode: ["Online exam", "Hands-on coding questions"],
    url: "",
    howToApply: ["Visit www.droidtechhq.com/tests"],
    gallery: ["/images/python/1.jpg", "/images/python/2.jpg"],
    learn: ["Python basics", "OOP", "Data libraries", "Web frameworks"],
    questions: [
      "What are Python data types?",
      "What are lists and tuples?",
      "Difference between tuple and list?",
    ],
    quiz: [
      {
        id: 1,
        question: "Which of the following is a mutable data type in Python?",
        options: ["tuple", "string", "list", "int"],
        correctAnswer: 2,
        explanation:
          "Lists are mutable in Python, meaning their contents can be changed after creation. Tuples, strings, and integers are immutable.",
      },
      {
        id: 2,
        question:
          "What is the difference between a list and a tuple in Python?",
        options: [
          "Lists are faster than tuples",
          "Lists are mutable, tuples are immutable",
          "Tuples can store more data",
          "No difference",
        ],
        correctAnswer: 1,
        explanation:
          "Lists are mutable (can be changed) and use square brackets [], while tuples are immutable and use parentheses ().",
      },
      {
        id: 3,
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        correctAnswer: 1,
        explanation:
          "The 'def' keyword is used to define functions in Python, followed by the function name and parameters.",
      },
      {
        id: 4,
        question: "What does PEP 8 refer to in Python?",
        options: [
          "Python version 8",
          "Python Enhancement Proposal for style guide",
          "Python Error Protocol 8",
          "Python Execution Path 8",
        ],
        correctAnswer: 1,
        explanation:
          "PEP 8 is the Python Enhancement Proposal that provides the official style guide for Python code formatting and conventions.",
      },
      {
        id: 5,
        question: "Which method is used to add an item to a list in Python?",
        options: ["add()", "append()", "insert()", "push()"],
        correctAnswer: 1,
        explanation:
          "The append() method adds a single item to the end of a list. insert() can add at a specific position, but append() is most common.",
      },
      {
        id: 6,
        question: "What is a dictionary in Python?",
        options: [
          "A book of words",
          "A collection of key-value pairs",
          "A list of items",
          "A string type",
        ],
        correctAnswer: 1,
        explanation:
          "A dictionary is a mutable, unordered collection of key-value pairs, providing fast lookup by key.",
      },
      {
        id: 7,
        question: "What is list comprehension in Python?",
        options: [
          "Understanding lists",
          "A concise way to create lists from iterables",
          "A list method",
          "A debugging tool",
        ],
        correctAnswer: 1,
        explanation:
          "List comprehension provides a concise syntax to create lists by applying an expression to each item in an iterable.",
      },
      {
        id: 8,
        question: "What is the purpose of '__init__' method?",
        options: [
          "To initialize a program",
          "To initialize object attributes when creating an instance",
          "To import modules",
          "To end a class",
        ],
        correctAnswer: 1,
        explanation:
          "__init__ is a constructor method that initializes object attributes when a new instance of a class is created.",
      },
      {
        id: 9,
        question: "What is the difference between '==' and 'is' in Python?",
        options: [
          "No difference",
          "'==' compares values, 'is' compares object identity",
          "'is' is faster",
          "'==' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'==' checks if values are equal, while 'is' checks if two variables refer to the same object in memory.",
      },
      {
        id: 10,
        question: "What is a lambda function in Python?",
        options: [
          "A Greek function",
          "An anonymous function defined with lambda keyword",
          "A named function",
          "A class method",
        ],
        correctAnswer: 1,
        explanation:
          "Lambda functions are small anonymous functions defined using the lambda keyword, useful for short, simple operations.",
      },
      {
        id: 11,
        question: "What is the purpose of 'self' in Python classes?",
        options: [
          "Self-reference",
          "Refers to the instance of the class",
          "A keyword for loops",
          "A variable name",
        ],
        correctAnswer: 1,
        explanation:
          "'self' is a reference to the current instance of the class, used to access instance variables and methods.",
      },
      {
        id: 12,
        question: "What is a decorator in Python?",
        options: [
          "A design pattern",
          "A function that modifies another function's behavior",
          "A class decorator",
          "A variable decorator",
        ],
        correctAnswer: 1,
        explanation:
          "Decorators are functions that modify the behavior of other functions or methods, using the @decorator syntax.",
      },
      {
        id: 13,
        question: "What is the purpose of 'with' statement?",
        options: [
          "To work with files",
          "To ensure proper resource management with context managers",
          "To create loops",
          "To handle errors",
        ],
        correctAnswer: 1,
        explanation:
          "The 'with' statement ensures proper acquisition and release of resources using context managers, commonly used with files.",
      },
      {
        id: 14,
        question: "What is a generator in Python?",
        options: [
          "A power generator",
          "A function that yields values one at a time using yield",
          "A class generator",
          "A random number generator",
        ],
        correctAnswer: 1,
        explanation:
          "Generators are functions that use 'yield' to produce a sequence of values lazily, one at a time, saving memory.",
      },
      {
        id: 15,
        question: "What is the purpose of '*args' and '**kwargs'?",
        options: [
          "Multiplication",
          "To accept variable number of arguments",
          "To create pointers",
          "To handle errors",
        ],
        correctAnswer: 1,
        explanation:
          "*args allows functions to accept any number of positional arguments, **kwargs allows any number of keyword arguments.",
      },
      {
        id: 16,
        question: "What is inheritance in Python?",
        options: [
          "Receiving money",
          "A mechanism where a class inherits attributes and methods from another class",
          "A variable scope",
          "A module import",
        ],
        correctAnswer: 1,
        explanation:
          "Inheritance allows a class to inherit attributes and methods from a parent class, promoting code reuse and hierarchy.",
      },
      {
        id: 17,
        question: "What is the Global Interpreter Lock (GIL)?",
        options: [
          "A security lock",
          "A mutex that allows only one thread to execute Python bytecode at a time",
          "A file lock",
          "A database lock",
        ],
        correctAnswer: 1,
        explanation:
          "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode simultaneously.",
      },
      {
        id: 18,
        question:
          "What is the difference between 'remove()' and 'pop()' for lists?",
        options: [
          "No difference",
          "'remove()' removes by value, 'pop()' removes by index",
          "'pop()' is faster",
          "'remove()' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'remove()' removes the first occurrence of a specified value, while 'pop()' removes and returns an item at a given index.",
      },
      {
        id: 19,
        question: "What is a virtual environment in Python?",
        options: [
          "A virtual machine",
          "An isolated Python environment with its own dependencies",
          "A cloud environment",
          "A testing environment",
        ],
        correctAnswer: 1,
        explanation:
          "A virtual environment is an isolated Python environment that allows you to install packages without affecting the system Python installation.",
      },
      {
        id: 20,
        question: "What is the purpose of 'try-except' blocks?",
        options: [
          "To try code",
          "To handle exceptions and prevent program crashes",
          "To test code",
          "To optimize code",
        ],
        correctAnswer: 1,
        explanation:
          "try-except blocks handle exceptions gracefully, allowing you to catch and respond to errors without crashing the program.",
      },
    ],
  },
  {
    title: "SQL",
    subTitle: "Master database querying and data manipulation",
    summary:
      "This SQL test covers database fundamentals, complex queries, joins, and performance optimization.",
    duration: "35 minutes",
    description:
      "The exam evaluates your ability to write efficient SQL queries, understand database relationships, and perform data analysis tasks using various SQL operations.",
    level: "Beginner to Intermediate",
    tools: ["MySQL", "PostgreSQL", "SQL Server", "SQLite"],
    mode: ["Online test", "Query writing challenges"],
    url: "",
    benefits: [
      "Demonstrate database querying expertise",
      "Show proficiency in data analysis with SQL",
      "Validate understanding of database design principles",
      "Prove ability to optimize query performance",
    ],
    gallery: ["/images/sql/1.jpg", "/images/sql/2.jpg"],
    learn: [
      "Basic SQL syntax",
      "Joins and relationships",
      "Aggregate functions",
      "Subqueries and CTEs",
      "Performance optimization",
    ],
    questions: [
      "What is SQL?",
      "Difference between INNER and LEFT JOIN?",
      "What are aggregate functions?",
    ],
    quiz: [
      {
        id: 1,
        question: "What does SQL stand for?",
        options: [
          "Simple Query Language",
          "Structured Query Language",
          "Standard Query Language",
          "System Query Language",
        ],
        correctAnswer: 1,
        explanation:
          "SQL stands for Structured Query Language, a standard language for managing and manipulating relational databases.",
      },
      {
        id: 2,
        question: "Which SQL clause is used to filter rows?",
        options: ["HAVING", "WHERE", "GROUP BY", "ORDER BY"],
        correctAnswer: 1,
        explanation:
          "The WHERE clause is used to filter rows based on specified conditions before grouping or aggregation occurs.",
      },
      {
        id: 3,
        question: "What is the difference between INNER JOIN and LEFT JOIN?",
        options: [
          "No difference",
          "INNER JOIN returns all rows, LEFT JOIN returns matching rows",
          "INNER JOIN returns matching rows, LEFT JOIN returns all left table rows",
          "LEFT JOIN is faster than INNER JOIN",
        ],
        correctAnswer: 2,
        explanation:
          "INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table plus matching rows from the right table.",
      },
      {
        id: 4,
        question:
          "Which aggregate function calculates the average of numeric values?",
        options: ["SUM()", "COUNT()", "AVG()", "MAX()"],
        correctAnswer: 2,
        explanation:
          "The AVG() function calculates the average (arithmetic mean) of numeric values in a column.",
      },
      {
        id: 5,
        question: "What is a primary key in a database?",
        options: [
          "The first column in a table",
          "A unique identifier for each row in a table",
          "The most important data in a table",
          "A password for the database",
        ],
        correctAnswer: 1,
        explanation:
          "A primary key is a column (or combination of columns) that uniquely identifies each row in a table and cannot contain NULL values.",
      },
      {
        id: 6,
        question: "What is a foreign key?",
        options: [
          "A key from another country",
          "A column that references the primary key of another table",
          "An external key",
          "A backup key",
        ],
        correctAnswer: 1,
        explanation:
          "A foreign key is a column that creates a relationship between two tables by referencing the primary key of another table.",
      },
      {
        id: 7,
        question: "What is the purpose of the GROUP BY clause?",
        options: [
          "To group tables",
          "To group rows with same values for aggregate functions",
          "To create groups of users",
          "To organize databases",
        ],
        correctAnswer: 1,
        explanation:
          "GROUP BY groups rows that have the same values in specified columns, often used with aggregate functions like COUNT, SUM, AVG.",
      },
      {
        id: 8,
        question: "What is the difference between HAVING and WHERE?",
        options: [
          "No difference",
          "HAVING filters groups, WHERE filters rows",
          "WHERE is faster",
          "HAVING is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "WHERE filters rows before grouping, while HAVING filters groups after aggregation. HAVING is used with GROUP BY.",
      },
      {
        id: 9,
        question: "What is a subquery?",
        options: [
          "A small query",
          "A query nested inside another query",
          "A backup query",
          "A query template",
        ],
        correctAnswer: 1,
        explanation:
          "A subquery is a query nested inside another query, used to provide data to the outer query for filtering or calculation.",
      },
      {
        id: 10,
        question: "What is normalization in databases?",
        options: [
          "Making data normal",
          "Organizing data to reduce redundancy and improve integrity",
          "Backing up data",
          "Encrypting data",
        ],
        correctAnswer: 1,
        explanation:
          "Normalization is the process of organizing database tables to reduce redundancy and dependency, improving data integrity.",
      },
      {
        id: 11,
        question: "What is an index in SQL?",
        options: [
          "A table of contents",
          "A data structure that improves query performance",
          "A primary key",
          "A foreign key",
        ],
        correctAnswer: 1,
        explanation:
          "An index is a database object that improves the speed of data retrieval operations, similar to an index in a book.",
      },
      {
        id: 12,
        question: "What is a view in SQL?",
        options: [
          "A window to see data",
          "A virtual table based on a SELECT query",
          "A database backup",
          "A user interface",
        ],
        correctAnswer: 1,
        explanation:
          "A view is a virtual table created by a stored query, providing a way to simplify complex queries and control data access.",
      },
      {
        id: 13,
        question: "What is a transaction in SQL?",
        options: [
          "A database purchase",
          "A sequence of operations performed as a single unit of work",
          "A data transfer",
          "A query execution",
        ],
        correctAnswer: 1,
        explanation:
          "A transaction is a sequence of operations that are executed as a single logical unit, ensuring data consistency with ACID properties.",
      },
      {
        id: 14,
        question: "What does ACID stand for in databases?",
        options: [
          "A chemical compound",
          "Atomicity, Consistency, Isolation, Durability",
          "Advanced Computer Interface Design",
          "Automatic Code Integration Deployment",
        ],
        correctAnswer: 1,
        explanation:
          "ACID represents the four key properties of database transactions: Atomicity, Consistency, Isolation, and Durability.",
      },
      {
        id: 15,
        question: "What is the purpose of the DISTINCT keyword?",
        options: [
          "To make queries distinct",
          "To remove duplicate rows from results",
          "To distinguish tables",
          "To create unique keys",
        ],
        correctAnswer: 1,
        explanation:
          "DISTINCT removes duplicate rows from the result set, returning only unique values.",
      },
      {
        id: 16,
        question: "What is a stored procedure?",
        options: [
          "A saved query",
          "A precompiled collection of SQL statements stored in the database",
          "A backup procedure",
          "A data storage method",
        ],
        correctAnswer: 1,
        explanation:
          "A stored procedure is a prepared SQL code that can be saved and reused, improving performance and security.",
      },
      {
        id: 17,
        question: "What is the difference between DELETE and TRUNCATE?",
        options: [
          "No difference",
          "DELETE can be rolled back and uses WHERE, TRUNCATE cannot and removes all rows",
          "TRUNCATE is slower",
          "DELETE is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "DELETE removes rows one by one and can be rolled back, while TRUNCATE quickly removes all rows and cannot be rolled back.",
      },
      {
        id: 18,
        question: "What is a composite key?",
        options: [
          "A complex key",
          "A primary key consisting of multiple columns",
          "A foreign key",
          "An encrypted key",
        ],
        correctAnswer: 1,
        explanation:
          "A composite key is a primary key that consists of two or more columns used together to uniquely identify rows.",
      },
      {
        id: 19,
        question: "What is the purpose of the UNION operator?",
        options: [
          "To join tables",
          "To combine results of multiple SELECT statements",
          "To create unions",
          "To merge databases",
        ],
        correctAnswer: 1,
        explanation:
          "UNION combines the results of two or more SELECT statements, removing duplicates by default (use UNION ALL to keep duplicates).",
      },
      {
        id: 20,
        question: "What is a trigger in SQL?",
        options: [
          "A button to execute queries",
          "A stored procedure that automatically executes in response to events",
          "A query scheduler",
          "A database alert",
        ],
        correctAnswer: 1,
        explanation:
          "A trigger is a special stored procedure that automatically executes when specific events (INSERT, UPDATE, DELETE) occur on a table.",
      },
    ],
  },
 
  {
    title: "Node.js",
    subTitle: "Evaluate your server-side JavaScript expertise",
    summary:
      "This Node.js test assesses your knowledge of backend development, APIs, and npm ecosystem.",
    duration: "55 minutes",
    description:
      "The exam covers Node.js fundamentals, Express.js framework, database integration, and your ability to build scalable backend services and APIs.",
    level: "Beginner to Intermediate",
    tools: ["Node.js", "Express.js", "MongoDB", "NPM"],
    mode: ["Online test", "API development challenges"],
    url: "",
    benefits: [
      "Validate your Node.js backend skills",
      "Demonstrate API development expertise",
      "Show database integration knowledge",
      "Prove understanding of async programming",
    ],
    gallery: ["/images/nodejs/1.jpg", "/images/nodejs/2.jpg"],
    learn: [
      "Node.js fundamentals",
      "Express.js framework",
      "Async programming",
      "Database integration",
      "REST API development",
    ],
    questions: [
      "What is Node.js?",
      "How does the event loop work?",
      "What is Express.js?",
    ],
    quiz: [
      {
        id: 1,
        question: "What is Node.js?",
        options: [
          "A JavaScript framework",
          "A JavaScript runtime built on Chrome's V8 engine",
          "A database management system",
          "A web browser",
        ],
        correctAnswer: 1,
        explanation:
          "Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server side, built on Chrome's V8 JavaScript engine.",
      },
      {
        id: 2,
        question: "Which method is used to create an HTTP server in Node.js?",
        options: [
          "http.createServer()",
          "http.newServer()",
          "http.makeServer()",
          "http.initServer()",
        ],
        correctAnswer: 0,
        explanation:
          "The http.createServer() method is used to create an HTTP server instance in Node.js that can listen for requests and send responses.",
      },
      {
        id: 3,
        question: "What is npm in Node.js?",
        options: [
          "Node Package Manager",
          "New Project Manager",
          "Network Protocol Manager",
          "Node Performance Monitor",
        ],
        correctAnswer: 0,
        explanation:
          "npm (Node Package Manager) is the default package manager for Node.js, used to install, manage, and share JavaScript packages.",
      },
      {
        id: 4,
        question: "Which of the following is true about Node.js?",
        options: [
          "It's multi-threaded",
          "It's single-threaded with event loop",
          "It only works with databases",
          "It can't handle concurrent requests",
        ],
        correctAnswer: 1,
        explanation:
          "Node.js uses a single-threaded event loop model that can handle many concurrent connections efficiently through non-blocking I/O operations.",
      },
      {
        id: 5,
        question: "What is Express.js?",
        options: [
          "A database for Node.js",
          "A testing framework",
          "A web application framework for Node.js",
          "A deployment tool",
        ],
        correctAnswer: 2,
        explanation:
          "Express.js is a minimal and flexible web application framework for Node.js that provides robust features for building web and mobile applications.",
      },
      {
        id: 6,
        question: "What is middleware in Express.js?",
        options: [
          "Software in the middle",
          "Functions that have access to request and response objects",
          "A database layer",
          "A routing system",
        ],
        correctAnswer: 1,
        explanation:
          "Middleware functions have access to the request and response objects and can execute code, modify them, end the request-response cycle, or call the next middleware.",
      },
      {
        id: 7,
        question: "What is the purpose of the 'require' function?",
        options: [
          "To require users",
          "To import modules in Node.js",
          "To validate requirements",
          "To enforce rules",
        ],
        correctAnswer: 1,
        explanation:
          "The 'require' function is used to import modules, JSON, and local files in Node.js using the CommonJS module system.",
      },
      {
        id: 8,
        question: "What is the event emitter in Node.js?",
        options: [
          "An event creator",
          "A class that facilitates communication between objects",
          "An error handler",
          "A performance monitor",
        ],
        correctAnswer: 1,
        explanation:
          "EventEmitter is a class that facilitates communication between objects in Node.js by emitting named events that cause listeners to be called.",
      },
      {
        id: 9,
        question: "What is a buffer in Node.js?",
        options: [
          "A temporary storage",
          "A class for handling binary data",
          "A caching mechanism",
          "A network buffer",
        ],
        correctAnswer: 1,
        explanation:
          "Buffer is a class that provides a way to work with binary data directly, useful for reading files, network operations, and other I/O operations.",
      },
      {
        id: 10,
        question: "What is the purpose of package.json?",
        options: [
          "To package files",
          "To define project metadata and dependencies",
          "To create packages",
          "To store data",
        ],
        correctAnswer: 1,
        explanation:
          "package.json contains metadata about the project, lists dependencies, defines scripts, and provides configuration for Node.js applications.",
      },
      {
        id: 11,
        question:
          "What is the difference between 'process.nextTick()' and 'setImmediate()'?",
        options: [
          "No difference",
          "nextTick executes before I/O, setImmediate after I/O",
          "setImmediate is faster",
          "nextTick is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "process.nextTick() executes callbacks before the next event loop iteration, while setImmediate() executes after I/O events in the current event loop.",
      },
      {
        id: 12,
        question: "What is a stream in Node.js?",
        options: [
          "A water flow",
          "An abstract interface for working with streaming data",
          "A video stream",
          "A data type",
        ],
        correctAnswer: 1,
        explanation:
          "Streams are objects that let you read data from a source or write data to a destination in a continuous fashion, handling data piece by piece.",
      },
      {
        id: 13,
        question: "What is clustering in Node.js?",
        options: [
          "Grouping servers",
          "Creating multiple processes to handle load",
          "Database clustering",
          "Code organization",
        ],
        correctAnswer: 1,
        explanation:
          "Clustering allows you to create child processes (workers) that share server ports, enabling Node.js to take advantage of multi-core systems.",
      },
      {
        id: 14,
        question: "What is the purpose of 'module.exports'?",
        options: [
          "To export modules",
          "To define what a module exports and makes available to other files",
          "To import modules",
          "To create modules",
        ],
        correctAnswer: 1,
        explanation:
          "module.exports is an object that defines what a module exports and makes available when required by other files.",
      },
      {
        id: 15,
        question: "What is the purpose of the 'fs' module?",
        options: [
          "File system operations",
          "To interact with the file system",
          "Fast server",
          "Function storage",
        ],
        correctAnswer: 1,
        explanation:
          "The 'fs' (file system) module provides an API for interacting with the file system, allowing you to read, write, and manipulate files.",
      },
      {
        id: 16,
        question: "What is callback hell?",
        options: [
          "A bad place",
          "Deeply nested callbacks that make code hard to read",
          "An error state",
          "A debugging issue",
        ],
        correctAnswer: 1,
        explanation:
          "Callback hell refers to deeply nested callbacks that make code difficult to read and maintain, often solved using Promises or async/await.",
      },
      {
        id: 17,
        question: "What is the purpose of 'nodemon'?",
        options: [
          "A Pokemon",
          "A tool that automatically restarts Node.js applications on file changes",
          "A monitoring tool",
          "A testing framework",
        ],
        correctAnswer: 1,
        explanation:
          "Nodemon is a development tool that automatically restarts your Node.js application when file changes are detected, improving development workflow.",
      },
      {
        id: 18,
        question: "What is the 'path' module used for?",
        options: [
          "Creating paths",
          "Working with file and directory paths",
          "Routing",
          "Navigation",
        ],
        correctAnswer: 1,
        explanation:
          "The 'path' module provides utilities for working with file and directory paths in a cross-platform way.",
      },
      {
        id: 19,
        question:
          "What is the difference between 'readFile' and 'createReadStream'?",
        options: [
          "No difference",
          "readFile loads entire file, createReadStream reads in chunks",
          "createReadStream is slower",
          "readFile is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "readFile loads the entire file into memory, while createReadStream reads the file in chunks, making it more memory-efficient for large files.",
      },
      {
        id: 20,
        question: "What is the purpose of environment variables in Node.js?",
        options: [
          "To set the environment",
          "To store configuration values outside the code",
          "To create variables",
          "To optimize performance",
        ],
        correctAnswer: 1,
        explanation:
          "Environment variables store configuration values (like API keys, database URLs) outside the code, improving security and flexibility across environments.",
      },
    ],
  },
  {
    title: "C#",
    subTitle: "Evaluate your .NET development skills",
    summary:
      "This C# test assesses your knowledge of .NET framework, OOP, LINQ, and ASP.NET development.",
    duration: "55 minutes",
    description:
      "The exam covers C# fundamentals, object-oriented programming, .NET framework features, and web development with ASP.NET. Includes practical coding scenarios.",
    level: "Beginner to Advanced",
    tools: ["C#", "Visual Studio", ".NET Framework", "ASP.NET"],
    mode: ["Online test", "Code analysis questions"],
    url: "",
    benefits: [
      "Validate your C# programming skills",
      "Showcase .NET development expertise",
      "Demonstrate enterprise application knowledge",
      "Prove understanding of Microsoft stack",
    ],
    gallery: ["/images/csharp/1.jpg", "/images/csharp/2.jpg"],
    learn: [
      "C# syntax and OOP",
      "LINQ and collections",
      ".NET framework features",
      "ASP.NET web development",
      "Error handling and debugging",
    ],
    questions: [
      "What is C#?",
      "Difference between class and struct?",
      "What is LINQ?",
    ],
    quiz: [
      {
        id: 1,
        question: "What is C#?",
        options: [
          "A markup language",
          "An object-oriented programming language",
          "A database system",
          "A web server",
        ],
        correctAnswer: 1,
        explanation:
          "C# is a modern, object-oriented programming language developed by Microsoft as part of the .NET framework.",
      },
      {
        id: 2,
        question: "What is the difference between a class and a struct in C#?",
        options: [
          "No difference",
          "Classes are value types, structs are reference types",
          "Classes are reference types, structs are value types",
          "Structs can't have methods",
        ],
        correctAnswer: 2,
        explanation:
          "Classes are reference types stored on the heap, while structs are value types stored on the stack, making structs more memory efficient for small data.",
      },
      {
        id: 3,
        question: "What does LINQ stand for in C#?",
        options: [
          "Language Integrated Query",
          "Linear Inquiry",
          "Logic Integration Query",
          "Library Integration Query",
        ],
        correctAnswer: 0,
        explanation:
          "LINQ (Language Integrated Query) allows you to write SQL-like queries directly in C# code to query various data sources.",
      },
      {
        id: 4,
        question:
          "Which access modifier makes a member accessible only within the same class?",
        options: ["public", "private", "protected", "internal"],
        correctAnswer: 1,
        explanation:
          "The 'private' access modifier restricts access to the member only within the same class where it's declared.",
      },
      {
        id: 5,
        question: "What is garbage collection in C#?",
        options: [
          "Manual memory cleanup",
          "Automatic memory management",
          "Error handling mechanism",
          "Code optimization process",
        ],
        correctAnswer: 1,
        explanation:
          "Garbage collection is an automatic memory management feature in C# that automatically frees up memory used by objects that are no longer referenced.",
      },
      {
        id: 6,
        question: "What is an interface in C#?",
        options: [
          "A user interface",
          "A contract that defines methods and properties without implementation",
          "A class type",
          "A database interface",
        ],
        correctAnswer: 1,
        explanation:
          "An interface defines a contract with method signatures and properties that implementing classes must provide, enabling polymorphism.",
      },
      {
        id: 7,
        question: "What is the purpose of 'async' and 'await' keywords?",
        options: [
          "To slow down code",
          "To write asynchronous code more easily",
          "To create threads",
          "To handle errors",
        ],
        correctAnswer: 1,
        explanation:
          "async and await keywords simplify asynchronous programming, allowing you to write asynchronous code that looks synchronous.",
      },
      {
        id: 8,
        question: "What is a delegate in C#?",
        options: [
          "A person who delegates",
          "A type that represents references to methods",
          "A class member",
          "A variable type",
        ],
        correctAnswer: 1,
        explanation:
          "A delegate is a type-safe function pointer that can reference methods with a specific signature, enabling callback mechanisms.",
      },
      {
        id: 9,
        question: "What is the difference between 'ref' and 'out' parameters?",
        options: [
          "No difference",
          "'ref' requires initialization, 'out' doesn't",
          "'out' is faster",
          "'ref' is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "'ref' parameters must be initialized before passing, while 'out' parameters don't need initialization but must be assigned in the method.",
      },
      {
        id: 10,
        question: "What is a property in C#?",
        options: [
          "An attribute",
          "A member that provides flexible mechanism to read, write, or compute values",
          "A variable",
          "A method",
        ],
        correctAnswer: 1,
        explanation:
          "Properties are members that provide a flexible mechanism to read, write, or compute private field values using get and set accessors.",
      },
      {
        id: 11,
        question: "What is boxing and unboxing in C#?",
        options: [
          "Packing objects",
          "Converting between value types and reference types",
          "Creating boxes",
          "Memory management",
        ],
        correctAnswer: 1,
        explanation:
          "Boxing converts a value type to object type, unboxing extracts the value type from the object. This has performance implications.",
      },
      {
        id: 12,
        question: "What is the purpose of 'using' statement?",
        options: [
          "To use namespaces",
          "To ensure proper disposal of resources",
          "To import libraries",
          "To create aliases",
        ],
        correctAnswer: 1,
        explanation:
          "The 'using' statement ensures that IDisposable objects are properly disposed of, even if an exception occurs, managing resources efficiently.",
      },
      {
        id: 13,
        question: "What is an extension method in C#?",
        options: [
          "A long method",
          "A method that adds functionality to existing types without modifying them",
          "A method extension",
          "A helper method",
        ],
        correctAnswer: 1,
        explanation:
          "Extension methods allow you to add new methods to existing types without modifying the original type or creating a derived type.",
      },
      {
        id: 14,
        question:
          "What is the difference between 'String' and 'StringBuilder'?",
        options: [
          "No difference",
          "String is immutable, StringBuilder is mutable",
          "StringBuilder is slower",
          "String is deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "String is immutable (creates new object on modification), while StringBuilder is mutable and more efficient for multiple string manipulations.",
      },
      {
        id: 15,
        question: "What is a lambda expression in C#?",
        options: [
          "A Greek expression",
          "An anonymous function using => operator",
          "A variable expression",
          "A class expression",
        ],
        correctAnswer: 1,
        explanation:
          "Lambda expressions are anonymous functions that use the => operator, commonly used with LINQ and delegates for concise code.",
      },
      {
        id: 16,
        question: "What is the purpose of 'virtual' keyword?",
        options: [
          "To create virtual machines",
          "To allow method overriding in derived classes",
          "To optimize performance",
          "To create virtual properties",
        ],
        correctAnswer: 1,
        explanation:
          "The 'virtual' keyword allows a method or property to be overridden in derived classes, enabling polymorphism.",
      },
      {
        id: 17,
        question: "What is a nullable type in C#?",
        options: [
          "A type that can be null",
          "A value type that can represent null using ?",
          "A reference type",
          "An optional type",
        ],
        correctAnswer: 1,
        explanation:
          "Nullable types allow value types to represent null values using the ? syntax (e.g., int?), useful for database operations.",
      },
      {
        id: 18,
        question: "What is the purpose of 'sealed' keyword?",
        options: [
          "To seal packages",
          "To prevent class inheritance or method overriding",
          "To optimize performance",
          "To create sealed objects",
        ],
        correctAnswer: 1,
        explanation:
          "The 'sealed' keyword prevents a class from being inherited or a method from being overridden, providing design control.",
      },
      {
        id: 19,
        question: "What is dependency injection in C#?",
        options: [
          "Injecting dependencies",
          "A design pattern for providing dependencies to objects",
          "A security feature",
          "A performance optimization",
        ],
        correctAnswer: 1,
        explanation:
          "Dependency injection is a design pattern where dependencies are provided to objects rather than created by them, improving testability and flexibility.",
      },
      {
        id: 20,
        question:
          "What is the difference between 'abstract' class and interface?",
        options: [
          "No difference",
          "Abstract classes can have implementation, interfaces cannot (before C# 8)",
          "Interfaces are faster",
          "Abstract classes are deprecated",
        ],
        correctAnswer: 1,
        explanation:
          "Abstract classes can have implementation and fields, while interfaces (before C# 8) only define contracts. A class can implement multiple interfaces but inherit only one class.",
      },
    ],
  },
   {
  title: "C++",
  subTitle:
    "Test your system programming and performance optimization skills",
  summary:
    "This C++ test evaluates your knowledge of memory management, templates, STL, and performance optimization.",
  duration: "65 minutes",
  description:
    "The exam assesses your understanding of C++ fundamentals, advanced features like templates and smart pointers, and your ability to write efficient, performance-critical code.",
  level: "Intermediate to Advanced",
  tools: ["C++", "GCC/Clang", "CMake", "Visual Studio Code"],
  mode: ["Online test", "Performance analysis questions"],
  url: "",
  benefits: [
    "Prove your systems programming capabilities",
    "Demonstrate memory management expertise",
    "Show understanding of performance optimization",
    "Validate knowledge of modern C++ features",
  ],
  gallery: ["/images/cpp/1.jpg", "/images/cpp/2.jpg"],
  learn: [
    "C++ fundamentals and OOP",
    "Memory management",
    "Templates and STL",
    "Modern C++ features",
    "Performance optimization",
  ],
  questions: [
    "What is C++?",
    "Difference between malloc and new?",
    "What are smart pointers?",
  ],
  quiz: [
    {
      id: 1,
      question: "What is the difference between malloc() and new in C++?",
      options: [
        "No difference",
        "malloc is faster than new",
        "malloc allocates memory, new allocates memory and calls constructor",
        "new is from C, malloc is from C++",
      ],
      correctAnswer: 2,
      explanation:
        "malloc() only allocates raw memory, while new allocates memory and calls the constructor. Similarly, free() vs delete() - delete calls the destructor.",
    },
    {
      id: 2,
      question: "What is RAII in C++?",
      options: [
        "Resource Allocation Is Initialization",
        "Resource Access In Implementation",
        "Runtime Application Interface Integration",
        "Rapid Application Integration Infrastructure",
      ],
      correctAnswer: 0,
      explanation:
        "RAII (Resource Allocation Is Initialization) is a programming idiom where resource management is tied to object lifetime, ensuring automatic cleanup.",
    },
    {
      id: 3,
      question: "What are smart pointers in C++?",
      options: [
        "Pointers that are faster",
        "Objects that manage memory automatically",
        "Pointers with better syntax",
        "Pointers that can do arithmetic",
      ],
      correctAnswer: 1,
      explanation:
        "Smart pointers are objects that manage memory automatically, providing automatic cleanup and helping prevent memory leaks and dangling pointers.",
    },
    {
      id: 4,
      question: "Which C++ feature allows you to write generic code?",
      options: ["Inheritance", "Templates", "Polymorphism", "Overloading"],
      correctAnswer: 1,
      explanation:
        "Templates allow you to write generic code that works with different data types, enabling code reuse and type safety at compile time.",
    },
    {
      id: 5,
      question: "What is the Standard Template Library (STL)?",
      options: [
        "A graphics library",
        "A collection of template classes and functions",
        "A networking library",
        "A database interface",
      ],
      correctAnswer: 1,
      explanation:
        "The STL is a powerful library of template-based containers, algorithms, and iterators that provides common data structures and algorithms.",
    },
    {
      id: 6,
      question: "What is the purpose of a destructor in C++?",
      options: [
        "To initialize an object",
        "To clean up resources when an object is destroyed",
        "To allocate memory for an object",
        "To copy data from another object",
      ],
      correctAnswer: 1,
      explanation:
        "Destructors automatically release resources like memory or file handles when an object goes out of scope.",
    },
    {
      id: 7,
      question: "Which keyword prevents a class from being inherited?",
      options: ["const", "static", "final", "virtual"],
      correctAnswer: 2,
      explanation:
        "The 'final' keyword prevents further inheritance of a class or overriding of a virtual function.",
    },
    {
      id: 8,
      question: "What is a virtual function in C++?",
      options: [
        "A function that executes in the background",
        "A function defined inside a namespace",
        "A function that can be overridden in derived classes",
        "A function that runs at compile time",
      ],
      correctAnswer: 2,
      explanation:
        "Virtual functions enable runtime polymorphism, allowing derived classes to override methods and achieve dynamic dispatch.",
    },
    {
      id: 9,
      question: "Which of the following is NOT a C++ access specifier?",
      options: ["public", "protected", "private", "internal"],
      correctAnswer: 3,
      explanation:
        "'internal' is used in C#, not C++. C++ access specifiers are public, protected, and private.",
    },
    {
      id: 10,
      question: "What does the 'mutable' keyword do in C++?",
      options: [
        "Allows modification of class members even in const objects",
        "Makes a variable constant",
        "Prevents inheritance",
        "Enables multithreading",
      ],
      correctAnswer: 0,
      explanation:
        "'mutable' allows a member variable to be modified even when the containing object is declared const.",
    },
    {
      id: 11,
      question: "What is the use of 'constexpr' in modern C++?",
      options: [
        "To define variables or functions evaluated at compile time",
        "To make a variable constant",
        "To declare external constants",
        "To allocate memory on the stack",
      ],
      correctAnswer: 0,
      explanation:
        "'constexpr' ensures that expressions are evaluated at compile time, improving performance and enabling compile-time computation.",
    },
    {
      id: 12,
      question: "What is a pure virtual function?",
      options: [
        "A function with no implementation",
        "A static function",
        "A template function",
        "A function that always returns void",
      ],
      correctAnswer: 0,
      explanation:
        "A pure virtual function has no implementation and must be overridden in derived classes, making the class abstract.",
    },
    {
      id: 13,
      question: "Which of these containers is not part of STL?",
      options: ["vector", "map", "set", "arraylist"],
      correctAnswer: 3,
      explanation:
        "'arraylist' is from Java. C++ STL containers include vector, map, set, deque, and others.",
    },
    {
      id: 14,
      question: "What is a lambda expression in C++?",
      options: [
        "An inline anonymous function",
        "A macro replacement",
        "A preprocessor directive",
        "A virtual function",
      ],
      correctAnswer: 0,
      explanation:
        "Lambda expressions define anonymous functions inline, often used with STL algorithms for brevity and clarity.",
    },
    {
      id: 15,
      question: "What does the 'explicit' keyword prevent?",
      options: [
        "Implicit type conversions using constructors",
        "Function overloading",
        "Virtual inheritance",
        "Const correctness",
      ],
      correctAnswer: 0,
      explanation:
        "The 'explicit' keyword prevents implicit conversions, ensuring constructors are called only with direct initialization.",
    },
    {
      id: 16,
      question: "Which smart pointer allows shared ownership of an object?",
      options: ["unique_ptr", "shared_ptr", "weak_ptr", "auto_ptr"],
      correctAnswer: 1,
      explanation:
        "'shared_ptr' provides shared ownership, keeping the object alive until all shared_ptr instances are destroyed.",
    },
    {
      id: 17,
      question: "What is move semantics in C++?",
      options: [
        "A feature for transferring resources instead of copying",
        "A syntax for moving files",
        "An optimization for recursion",
        "A type of inheritance",
      ],
      correctAnswer: 0,
      explanation:
        "Move semantics allow efficient transfer of resources from temporary objects, avoiding unnecessary deep copies.",
    },
    {
      id: 18,
      question: "Which operator cannot be overloaded in C++?",
      options: ["+", "=", "::", "[]"],
      correctAnswer: 2,
      explanation:
        "The scope resolution operator (::) cannot be overloaded. Other operators like +, =, and [] can be overloaded.",
    },
    {
      id: 19,
      question: "What is the main purpose of 'std::move()'?",
      options: [
        "To move memory addresses",
        "To enable move semantics by casting to an rvalue reference",
        "To copy an object efficiently",
        "To swap two objects",
      ],
      correctAnswer: 1,
      explanation:
        "'std::move()' casts an object to an rvalue reference, enabling move semantics for efficient transfers.",
    },
    {
      id: 20,
      question: "What is the function of 'emplace_back()' in a vector?",
      options: [
        "Inserts an element by copying it",
        "Constructs an element in place at the end of the vector",
        "Removes the last element",
        "Reserves memory for new elements",
      ],
      correctAnswer: 1,
      explanation:
        "'emplace_back()' constructs the element directly in place, avoiding unnecessary copies and improving performance.",
    },
  ],
},
 {
  title: "Go",
  subTitle:
    "Test your proficiency in building high-performance, concurrent applications",
  summary:
    "This Go test evaluates your knowledge of Go fundamentals, goroutines, channels, error handling, and building scalable microservices.",
  duration: "50 minutes",
  description:
    "The exam measures your competency in Go programming, covering syntax, concurrency patterns, error handling, and microservice development.",
  level: "Beginner to Advanced",
  tools: ["Go", "Gorilla Mux", "GORM", "Docker", "VS Code"],
  mode: ["Online test", "Timed questions", "Certificate upon passing"],
  url: "",
  benefits: [
    "Validate your Go syntax & concurrency skills",
    "Showcase microservice development knowledge",
    "Prove understanding of channels & goroutines",
    "Demonstrate error handling best practices",
  ],
  gallery: ["/images/go/1.jpg", "/images/go/2.jpg"],
  learn: [
    "Go fundamentals & syntax",
    "Goroutines & channels",
    "Error handling patterns",
    "HTTP servers & REST APIs",
    "Testing in Go",
  ],
  questions: [
    "What are goroutines?",
    "How do channels work?",
    "What is Go's approach to error handling?",
  ],
  quiz: [
    {
      id: 1,
      question: "How do you start a goroutine in Go?",
      options: [
        "start functionName()",
        "go functionName()",
        "async functionName()",
        "thread functionName()",
      ],
      correctAnswer: 1,
      explanation:
        "The 'go' keyword is used to start a goroutine in Go, which runs the function concurrently with other goroutines.",
    },
    {
      id: 2,
      question: "What are channels used for in Go?",
      options: [
        "To store data permanently",
        "To communicate between goroutines",
        "To handle HTTP requests",
        "To manage memory",
      ],
      correctAnswer: 1,
      explanation:
        "Channels are used for communication between goroutines, allowing safe data sharing and synchronization in concurrent programs.",
    },
    {
      id: 3,
      question: "Which keyword is used to handle errors in Go?",
      options: ["try-catch", "if err != nil", "throw-catch", "error-handle"],
      correctAnswer: 1,
      explanation:
        "Go uses explicit error handling with 'if err != nil' pattern rather than exceptions, making error handling more visible and controlled.",
    },
    {
      id: 4,
      question: "What is the purpose of Go modules?",
      options: [
        "To create web servers",
        "To manage dependencies and versioning",
        "To handle concurrent programming",
        "To optimize performance",
      ],
      correctAnswer: 1,
      explanation:
        "Go modules are used for dependency management and versioning, allowing you to manage external packages and their versions in your Go projects.",
    },
    {
      id: 5,
      question: "What does the 'defer' keyword do?",
      options: [
        "Delays execution until the function returns",
        "Cancels function execution",
        "Creates a new goroutine",
        "Handles panics",
      ],
      correctAnswer: 0,
      explanation:
        "The 'defer' keyword schedules a function call to be executed just before the surrounding function returns, commonly used for cleanup operations.",
    },
    {
      id: 6,
      question: "What is a goroutine in Go?",
      options: [
        "A lightweight thread managed by the Go runtime",
        "An OS-level process",
        "A memory allocation unit",
        "A pointer type",
      ],
      correctAnswer: 0,
      explanation:
        "Goroutines are lightweight threads managed by the Go runtime, allowing concurrent execution of functions efficiently.",
    },
    {
      id: 7,
      question: "What is the zero value of an int in Go?",
      options: ["nil", "0", "undefined", "empty"],
      correctAnswer: 1,
      explanation:
        "Every Go type has a zero value. For int, it’s 0; for string, it’s an empty string; and for pointers, it’s nil.",
    },
    {
      id: 8,
      question: "Which statement correctly declares a variable in Go?",
      options: [
        "int x = 10",
        "x := 10",
        "var x := 10",
        "define x = 10",
      ],
      correctAnswer: 1,
      explanation:
        "The short variable declaration 'x := 10' is the idiomatic way to declare and initialize variables in Go.",
    },
    {
      id: 9,
      question: "How do you import multiple packages in Go?",
      options: [
        "import pkg1, pkg2",
        "import (\"pkg1\" \"pkg2\")",
        "include pkg1, pkg2",
        "require [pkg1, pkg2]",
      ],
      correctAnswer: 1,
      explanation:
        "Multiple packages can be imported using parentheses: import (\"fmt\" \"os\" \"net/http\").",
    },
    {
      id: 10,
      question: "What does the 'select' statement do in Go?",
      options: [
        "Selects a random goroutine",
        "Waits on multiple channel operations",
        "Starts multiple goroutines",
        "Handles runtime errors",
      ],
      correctAnswer: 1,
      explanation:
        "The 'select' statement waits on multiple channel operations, allowing a goroutine to react to whichever channel is ready first.",
    },
    {
      id: 11,
      question: "How do you create a map in Go?",
      options: [
        "map[string]string{}",
        "make(map[string]string)",
        "new map[string]string",
        "[]map[string]string",
      ],
      correctAnswer: 1,
      explanation:
        "Maps are created using the built-in 'make' function, e.g. make(map[string]string).",
    },
    {
      id: 12,
      question: "What is the capacity of a Go slice?",
      options: [
        "The maximum length before reallocation",
        "The current number of elements",
        "Always fixed at creation",
        "The total memory size of the slice",
      ],
      correctAnswer: 0,
      explanation:
        "A slice’s capacity is the maximum length it can grow before needing to reallocate its underlying array.",
    },
    {
      id: 13,
      question: "How do you recover from a panic in Go?",
      options: [
        "Use try-catch",
        "Use recover() inside a deferred function",
        "Use panic() again",
        "Use handle() function",
      ],
      correctAnswer: 1,
      explanation:
        "The recover() function, when called inside a deferred function, regains control of a panicking goroutine.",
    },
    {
      id: 14,
      question: "What is a struct in Go?",
      options: [
        "A function type",
        "A collection of fields",
        "An array of integers",
        "A constant type",
      ],
      correctAnswer: 1,
      explanation:
        "Structs are composite data types that group together fields under a single type, similar to classes without methods.",
    },
    {
      id: 15,
      question: "How do you define a method for a struct in Go?",
      options: [
        "func (s StructName) methodName() {}",
        "method StructName.methodName() {}",
        "StructName.func methodName() {}",
        "def StructName.methodName() {}",
      ],
      correctAnswer: 0,
      explanation:
        "Methods are defined with a receiver, e.g., func (s StructName) methodName() {} — allowing functions to operate on struct instances.",
    },
    {
      id: 16,
      question: "Which package is used to handle HTTP in Go?",
      options: ["net/http", "httpio", "web", "go/net"],
      correctAnswer: 0,
      explanation:
        "The 'net/http' package provides tools for building HTTP clients and servers in Go.",
    },
    {
      id: 17,
      question: "What does the 'interface{}' type represent in Go?",
      options: [
        "A type that can hold any value",
        "A string type",
        "A nil pointer",
        "A channel type",
      ],
      correctAnswer: 0,
      explanation:
        "'interface{}' is the empty interface in Go and can hold values of any type, making it the most general type.",
    },
    {
      id: 18,
      question: "How do you perform testing in Go?",
      options: [
        "Using the 'go test' command",
        "Using 'npm test'",
        "Using the 'testing' CLI tool",
        "By importing 'go/unittest'",
      ],
      correctAnswer: 0,
      explanation:
        "The 'go test' command automatically detects and runs test functions in files ending with '_test.go'.",
    },
    {
      id: 19,
      question: "Which keyword is used to import packages in Go?",
      options: ["include", "use", "import", "require"],
      correctAnswer: 2,
      explanation:
        "The 'import' keyword is used to include external or standard library packages in Go code.",
    },
    {
      id: 20,
      question: "What is a Go channel's default behavior when sending data?",
      options: [
        "It blocks until another goroutine receives the data",
        "It stores data indefinitely",
        "It automatically duplicates data",
        "It ignores the data if no receiver exists",
      ],
      correctAnswer: 0,
      explanation:
        "Unbuffered channels in Go block the sender until another goroutine receives the data, ensuring synchronization.",
    },
  ],
}
,
  {
  title: "PHP",
  subTitle:
    "Evaluate your skills in building dynamic web applications and APIs",
  summary:
    "This PHP test covers fundamentals to advanced topics: syntax, OOP, frameworks like Laravel, database integration, and modern PHP practices.",
  duration: "55 minutes",
  description:
    "The exam assesses your PHP programming competency, including object-oriented programming, web development, Laravel framework, and database operations.",
  level: "Beginner to Advanced",
  tools: ["PHP", "Laravel", "Composer", "MySQL", "PHPStorm"],
  mode: ["Online test", "Timed questions", "Certificate upon passing"],
  url: "",
  benefits: [
    "Validate your PHP syntax & OOP skills",
    "Showcase Laravel framework expertise",
    "Prove database integration knowledge",
    "Demonstrate modern PHP best practices",
  ],
  gallery: ["/images/php/1.jpg", "/images/php/2.jpg"],
  learn: [
    "PHP fundamentals & syntax",
    "Object-oriented programming",
    "Laravel framework basics",
    "Database operations with PDO",
    "RESTful API development",
  ],
  questions: [
    "What are PHP namespaces?",
    "How does Laravel's Eloquent ORM work?",
    "What is the difference between include and require?",
  ],
  quiz: [
    {
      id: 1,
      question: "Which symbol is used to declare a variable in PHP?",
      options: ["@", "$", "#", "&"],
      correctAnswer: 1,
      explanation:
        "In PHP, variables are declared using the dollar sign ($) followed by the variable name, like $variableName.",
    },
    {
      id: 2,
      question: "What is the correct way to start a PHP script?",
      options: ["<script>", "<?php", "<php>", "<?="],
      correctAnswer: 1,
      explanation:
        "PHP scripts start with the opening tag '<?php' and optionally end with '?>' when mixed with HTML.",
    },
    {
      id: 3,
      question: "Which function is used to connect to a MySQL database in PHP?",
      options: [
        "mysql_connect()",
        "mysqli_connect()",
        "connect_mysql()",
        "db_connect()",
      ],
      correctAnswer: 1,
      explanation:
        "mysqli_connect() is the modern way to connect to MySQL databases in PHP, replacing the deprecated mysql_connect().",
    },
    {
      id: 4,
      question: "What does the 'use' keyword do in PHP?",
      options: [
        "Includes a file",
        "Imports a namespace or trait",
        "Declares a variable",
        "Starts a function",
      ],
      correctAnswer: 1,
      explanation:
        "The 'use' keyword is used to import namespaces, classes, or traits, making them available in the current scope without fully qualified names.",
    },
    {
      id: 5,
      question: "What is Laravel's Artisan?",
      options: [
        "A database driver",
        "A command-line tool",
        "A templating engine",
        "An ORM system",
      ],
      correctAnswer: 1,
      explanation:
        "Artisan is Laravel's command-line interface that provides helpful commands for common tasks like generating models, controllers, and running migrations.",
    },
    {
      id: 6,
      question: "What is the difference between 'include' and 'require' in PHP?",
      options: [
        "No difference at all",
        "require throws a fatal error; include throws a warning",
        "include is faster",
        "require only works with OOP",
      ],
      correctAnswer: 1,
      explanation:
        "The 'require' statement stops script execution on failure, while 'include' only emits a warning and continues.",
    },
    {
      id: 7,
      question: "Which function is used to start a session in PHP?",
      options: ["session_open()", "start_session()", "session_start()", "open_session()"],
      correctAnswer: 2,
      explanation:
        "The 'session_start()' function is used to start a new session or resume an existing one in PHP.",
    },
    {
      id: 8,
      question: "How can you declare a constant in PHP?",
      options: [
        "const NAME = 'value';",
        "$NAME = constant('value');",
        "constant NAME = 'value';",
        "define const NAME = 'value';",
      ],
      correctAnswer: 0,
      explanation:
        "Constants can be declared using either 'const' or 'define()', e.g., const PI = 3.14; or define('PI', 3.14);.",
    },
    {
      id: 9,
      question: "What is the purpose of Composer in PHP?",
      options: [
        "To compile PHP code",
        "To manage PHP packages and dependencies",
        "To connect databases",
        "To execute shell scripts",
      ],
      correctAnswer: 1,
      explanation:
        "Composer is PHP’s dependency manager that helps you install, update, and autoload external libraries easily.",
    },
    {
      id: 10,
      question: "Which of the following is a superglobal variable in PHP?",
      options: ["$data", "$globals", "$_POST", "$input"],
      correctAnswer: 2,
      explanation:
        "PHP has predefined superglobals like $_POST, $_GET, $_SESSION, and $_SERVER, which are accessible anywhere in the script.",
    },
    {
      id: 11,
      question: "What does PDO stand for in PHP?",
      options: [
        "PHP Data Object",
        "Programmed Data Operation",
        "Persistent Data Object",
        "Process Data Output",
      ],
      correctAnswer: 0,
      explanation:
        "PDO (PHP Data Object) is a database access layer that provides a uniform interface for multiple database systems.",
    },
    {
      id: 12,
      question: "Which Laravel file defines the routes for web applications?",
      options: [
        "config/routes.php",
        "routes/web.php",
        "app/routes.php",
        "resources/routes.php",
      ],
      correctAnswer: 1,
      explanation:
        "Laravel’s routes for web interfaces are defined in the 'routes/web.php' file.",
    },
    {
      id: 13,
      question: "How do you define a class in PHP?",
      options: [
        "define class MyClass {}",
        "class MyClass {}",
        "function MyClass() {}",
        "create_class MyClass {}",
      ],
      correctAnswer: 1,
      explanation:
        "Classes in PHP are defined using the 'class' keyword, e.g., class MyClass { public function greet() {} }.",
    },
    {
      id: 14,
      question: "Which method in Laravel handles form validation?",
      options: ["validate()", "check()", "verify()", "assert()"],
      correctAnswer: 0,
      explanation:
        "The 'validate()' method is used in Laravel controllers to validate incoming form data against defined rules.",
    },
    {
      id: 15,
      question: "What is a trait in PHP?",
      options: [
        "A design pattern",
        "A reusable piece of code used inside classes",
        "A type of variable",
        "A database model",
      ],
      correctAnswer: 1,
      explanation:
        "Traits allow code reuse in PHP by enabling you to include sets of methods in multiple classes without inheritance.",
    },
    {
      id: 16,
      question: "Which operator is used for concatenating strings in PHP?",
      options: ["+", ".", "&", "concat"],
      correctAnswer: 1,
      explanation:
        "In PHP, the dot (.) operator is used to concatenate strings, e.g., $fullName = $first . ' ' . $last.",
    },
    {
      id: 17,
      question: "What is middleware in Laravel?",
      options: [
        "A database connection",
        "A function that filters HTTP requests",
        "A configuration setting",
        "A cache layer",
      ],
      correctAnswer: 1,
      explanation:
        "Middleware in Laravel acts as a filter for HTTP requests, allowing logic such as authentication or logging before reaching controllers.",
    },
    {
      id: 18,
      question: "Which PHP version introduced type declarations?",
      options: ["5.2", "5.6", "7.0", "8.0"],
      correctAnswer: 2,
      explanation:
        "PHP 7.0 introduced scalar type declarations and return type hints, improving type safety in applications.",
    },
    {
      id: 19,
      question: "How do you handle exceptions in PHP?",
      options: [
        "Using if statements",
        "Using try-catch blocks",
        "Using switch-case blocks",
        "Using error handlers only",
      ],
      correctAnswer: 1,
      explanation:
        "Exceptions in PHP are handled using try-catch blocks, e.g., try { ... } catch (Exception $e) { echo $e->getMessage(); }.",
    },
    {
      id: 20,
      question: "What does Laravel’s Eloquent ORM provide?",
      options: [
        "An advanced caching system",
        "An expressive database abstraction layer",
        "A real-time messaging protocol",
        "A testing framework",
      ],
      correctAnswer: 1,
      explanation:
        "Eloquent ORM in Laravel provides an elegant, ActiveRecord-style interface to interact with databases using models.",
    },
  ],
}
,
  {
    title: "Docker",
    subTitle: "Test your containerization and deployment skills",
    summary:
      "This Docker test evaluates your knowledge of containerization, image creation, orchestration, and deployment strategies using Docker.",
    duration: "45 minutes",
    description:
      "The exam measures your Docker competency, covering container fundamentals, Dockerfile creation, Docker Compose, and container orchestration.",
    level: "Beginner to Advanced",
    tools: ["Docker", "Docker Compose", "Kubernetes", "Docker Hub", "VS Code"],
    mode: ["Online test", "Timed questions", "Certificate upon passing"],
    url: "",
    benefits: [
      "Validate your containerization skills",
      "Showcase deployment automation knowledge",
      "Prove understanding of microservices architecture",
      "Demonstrate DevOps best practices",
    ],
    gallery: ["/images/docker/1.jpg", "/images/docker/2.jpg"],
    learn: [
      "Docker fundamentals & commands",
      "Dockerfile creation & optimization",
      "Docker Compose for multi-container apps",
      "Container networking & volumes",
      "Docker registry & image management",
    ],
    questions: [
      "What is a Docker container?",
      "How do you create a Dockerfile?",
      "What is Docker Compose used for?",
    ],
    quiz: [
      {
        id: 1,
        question: "What command is used to build a Docker image?",
        options: [
          "docker create",
          "docker build",
          "docker make",
          "docker compile",
        ],
        correctAnswer: 1,
        explanation:
          "The 'docker build' command is used to build Docker images from a Dockerfile, creating a layered filesystem image.",
      },
      {
        id: 2,
        question:
          "What is the difference between a Docker image and container?",
        options: [
          "No difference",
          "Image is running, container is stopped",
          "Container is running instance of an image",
          "Image is smaller than container",
        ],
        correctAnswer: 2,
        explanation:
          "A Docker image is a read-only template, while a container is a running instance of that image with its own filesystem and processes.",
      },
      {
        id: 3,
        question: "Which instruction in Dockerfile sets the working directory?",
        options: ["CD", "WORKDIR", "DIR", "SET_DIR"],
        correctAnswer: 1,
        explanation:
          "The WORKDIR instruction sets the working directory for subsequent instructions in the Dockerfile and for the container when it runs.",
      },
      {
        id: 4,
        question: "What does 'docker-compose up' do?",
        options: [
          "Builds only images",
          "Starts and creates containers from docker-compose.yml",
          "Updates Docker Compose",
          "Uploads images to registry",
        ],
        correctAnswer: 1,
        explanation:
          "'docker-compose up' reads the docker-compose.yml file and starts/creates all the services defined in it, building images if necessary.",
      },
      {
        id: 5,
        question: "How do you persist data in Docker containers?",
        options: [
          "Data persists automatically",
          "Using volumes or bind mounts",
          "Using docker save command",
          "Data cannot be persisted",
        ],
        correctAnswer: 1,
        explanation:
          "Docker volumes and bind mounts are used to persist data beyond the container lifecycle, allowing data to survive container restarts and removals.",
      },
      {
        id: 6,
        question: "Which command lists all running Docker containers?",
        options: ["docker ps", "docker list", "docker show", "docker status"],
        correctAnswer: 0,
        explanation:
          "The 'docker ps' command displays all currently running containers, while 'docker ps -a' shows both running and stopped containers.",
      },
      {
        id: 7,
        question: "What is a Dockerfile?",
        options: [
          "A log file for Docker containers",
          "A script defining instructions to build an image",
          "A configuration file for Docker Hub",
          "A YAML file for orchestrating services",
        ],
        correctAnswer: 1,
        explanation:
          "A Dockerfile is a text document containing instructions used to build a Docker image layer by layer.",
      },
      {
        id: 8,
        question: "Which command is used to remove a Docker image?",
        options: [
          "docker delete",
          "docker rmi",
          "docker remove",
          "docker clear",
        ],
        correctAnswer: 1,
        explanation:
          "The 'docker rmi' command removes one or more Docker images from the local system.",
      },
      {
        id: 9,
        question: "What is the default network driver in Docker?",
        options: ["bridge", "host", "none", "overlay"],
        correctAnswer: 0,
        explanation:
          "By default, Docker containers connect using the 'bridge' network, which allows communication via virtual Ethernet interfaces.",
      },
      {
        id: 10,
        question:
          "What is the purpose of the EXPOSE instruction in Dockerfile?",
        options: [
          "Expose environment variables",
          "Inform Docker which port the container listens on",
          "Make container public",
          "Set up proxy connections",
        ],
        correctAnswer: 1,
        explanation:
          "EXPOSE tells Docker which ports the container listens on at runtime, serving as documentation for linking and networking.",
      },
      {
        id: 11,
        question: "What command stops a running container?",
        options: [
          "docker end <container_id>",
          "docker halt <container_id>",
          "docker stop <container_id>",
          "docker kill <container_id>",
        ],
        correctAnswer: 2,
        explanation:
          "The 'docker stop' command gracefully stops a running container by sending a SIGTERM signal before SIGKILL.",
      },
      {
        id: 12,
        question: "What is the function of Docker Hub?",
        options: [
          "A GUI for Docker",
          "A container orchestration tool",
          "A cloud-based registry for Docker images",
          "A monitoring system",
        ],
        correctAnswer: 2,
        explanation:
          "Docker Hub is Docker’s official cloud-based registry service where users can share and pull container images.",
      },
      {
        id: 13,
        question: "Which command removes all stopped containers?",
        options: [
          "docker clear",
          "docker rm $(docker ps -a -q)",
          "docker reset",
          "docker stop all",
        ],
        correctAnswer: 1,
        explanation:
          "The 'docker rm $(docker ps -a -q)' command removes all stopped containers by referencing their container IDs.",
      },
      {
        id: 14,
        question: "How do you pass environment variables to a container?",
        options: [
          "Using --env or -e flag in 'docker run'",
          "Using ENV instruction only",
          "Editing Dockerfile at runtime",
          "Not possible in Docker",
        ],
        correctAnswer: 0,
        explanation:
          "Environment variables can be passed using the --env or -e flag during 'docker run', or defined in Dockerfile using ENV.",
      },
      {
        id: 15,
        question: "What is the main purpose of Docker Compose?",
        options: [
          "To monitor containers",
          "To build Docker images",
          "To define and manage multi-container applications",
          "To upload images to Docker Hub",
        ],
        correctAnswer: 2,
        explanation:
          "Docker Compose simplifies running multi-container applications using a single YAML configuration file.",
      },
      {
        id: 16,
        question: "What does the CMD instruction in a Dockerfile specify?",
        options: [
          "Default command to run when container starts",
          "Working directory",
          "User permissions",
          "Container network",
        ],
        correctAnswer: 0,
        explanation:
          "CMD defines the default command to run when the container starts, which can be overridden during 'docker run'.",
      },
      {
        id: 17,
        question: "How can you reduce Docker image size?",
        options: [
          "Use smaller base images like alpine",
          "Add more layers",
          "Use multiple FROM statements",
          "Install all dependencies globally",
        ],
        correctAnswer: 0,
        explanation:
          "Using minimal base images like 'alpine' and combining RUN commands reduces image size and improves performance.",
      },
      {
        id: 18,
        question: "What is the purpose of 'ENTRYPOINT' in a Dockerfile?",
        options: [
          "Specifies the default command for the container",
          "Defines where volumes are mounted",
          "Sets build-time arguments",
          "Starts the Docker daemon",
        ],
        correctAnswer: 0,
        explanation:
          "ENTRYPOINT configures a container to run as an executable, defining the main process that runs when the container starts.",
      },
      {
        id: 19,
        question:
          "Which tool helps manage multiple Docker containers across hosts?",
        options: ["Docker CLI", "Docker Compose", "Kubernetes", "Docker Hub"],
        correctAnswer: 2,
        explanation:
          "Kubernetes is an orchestration system that automates deployment, scaling, and management of containerized applications across clusters.",
      },
      {
        id: 20,
        question: "What does 'docker logs <container_id>' do?",
        options: [
          "Shows image history",
          "Displays container output logs",
          "Removes logs",
          "Restarts the container",
        ],
        correctAnswer: 1,
        explanation:
          "The 'docker logs' command retrieves and displays the standard output (stdout/stderr) logs of a running or stopped container.",
      },
    ],
  },
  {
    title: "React",
    subTitle: "Assess your modern frontend development skills",
    summary:
      "This React test evaluates your knowledge of components, hooks, state management, and modern React patterns for building dynamic user interfaces.",
    duration: "30 minutes",
    description:
      "The exam measures your React competency, covering JSX, components, hooks, state management, and best practices for modern frontend development.",
    level: "Beginner to Advanced",
    tools: ["React", "Next.js", "Redux", "React Router", "VS Code"],
    mode: ["Online test", "Timed questions", "Certificate upon passing"],
    url: "",
    benefits: [
      "Validate your React component skills",
      "Showcase modern hooks knowledge",
      "Prove state management expertise",
      "Demonstrate frontend best practices",
    ],
    gallery: ["/images/react/1.jpg", "/images/react/2.jpg"],
    learn: [
      "React fundamentals & JSX",
      "Components & props",
      "Hooks & state management",
      "React Router & navigation",
      "Performance optimization",
    ],
    questions: [
      "What are React hooks?",
      "How does virtual DOM work?",
      "What is the difference between state and props?",
    ],
    quiz: [
      {
        id: 1,
        question: "What hook is used to manage state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation:
          "The useState hook is used to add state to functional components, returning the current state value and a setter function.",
      },
      {
        id: 2,
        question: "What is JSX?",
        options: [
          "A new programming language",
          "JavaScript XML syntax extension",
          "A CSS framework",
          "A testing library",
        ],
        correctAnswer: 1,
        explanation:
          "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript, which gets transpiled to React.createElement calls.",
      },
      {
        id: 3,
        question: "When does useEffect run by default?",
        options: [
          "Before every render",
          "After every render",
          "Only on mount",
          "Only on unmount",
        ],
        correctAnswer: 1,
        explanation:
          "By default, useEffect runs after every render (both mount and updates). You can control this behavior with the dependency array.",
      },
      {
        id: 4,
        question: "What is the purpose of keys in React lists?",
        options: [
          "For styling",
          "For performance optimization and identifying elements",
          "For event handling",
          "For data validation",
        ],
        correctAnswer: 1,
        explanation:
          "Keys help React identify which items have changed, been added, or removed, enabling efficient updates and maintaining component state.",
      },
      {
        id: 5,
        question: "What is the Context API used for?",
        options: [
          "Making HTTP requests",
          "Sharing state across components without prop drilling",
          "Routing between pages",
          "Styling components",
        ],
        correctAnswer: 1,
        explanation:
          "The Context API allows you to share state and data across multiple components without having to pass props through every level of the component tree.",
      },
      {
        id: 6,
        question: "What is the Virtual DOM in React?",
        options: [
          "An actual copy of the browser DOM",
          "A lightweight representation of the real DOM",
          "A CSS styling concept",
          "A debugging tool",
        ],
        correctAnswer: 1,
        explanation:
          "The Virtual DOM is a lightweight in-memory representation of the real DOM that React uses to efficiently update UI changes.",
      },
      {
        id: 7,
        question: "Which hook is used to perform side effects in React?",
        options: ["useState", "useEffect", "useMemo", "useCallback"],
        correctAnswer: 1,
        explanation:
          "The useEffect hook allows you to perform side effects like fetching data, setting up subscriptions, or manually manipulating the DOM.",
      },
      {
        id: 8,
        question: "What is the difference between state and props?",
        options: [
          "Props are mutable, state is immutable",
          "State is immutable, props are read-only",
          "Both are mutable",
          "No difference",
        ],
        correctAnswer: 1,
        explanation:
          "Props are read-only and passed from parent to child components, while state is managed internally within a component and can change over time.",
      },
      {
        id: 9,
        question: "What does lifting state up mean in React?",
        options: [
          "Moving state from child to parent to share between components",
          "Creating global state",
          "Using Redux for state management",
          "Deleting unnecessary state variables",
        ],
        correctAnswer: 0,
        explanation:
          "Lifting state up refers to moving shared state to a common ancestor component so that it can be accessed by multiple child components.",
      },
      {
        id: 10,
        question: "What is the purpose of useMemo in React?",
        options: [
          "To memoize values and avoid expensive recalculations",
          "To manage side effects",
          "To store global data",
          "To control rendering order",
        ],
        correctAnswer: 0,
        explanation:
          "useMemo memoizes expensive computations, ensuring they only re-run when dependencies change, optimizing performance.",
      },
      {
        id: 11,
        question: "Which hook provides access to context values?",
        options: ["useEffect", "useState", "useContext", "useRef"],
        correctAnswer: 2,
        explanation:
          "useContext allows functional components to consume values from React’s Context API without using Consumer components.",
      },
      {
        id: 12,
        question: "How do you prevent unnecessary re-renders in React?",
        options: [
          "Use React.memo or PureComponent",
          "Avoid using keys",
          "Use inline functions everywhere",
          "Add multiple states",
        ],
        correctAnswer: 0,
        explanation:
          "React.memo (for functional components) and PureComponent (for class components) prevent re-renders when props haven’t changed.",
      },
      {
        id: 13,
        question: "What does useRef return?",
        options: [
          "A mutable object that persists across renders",
          "A function that triggers re-render",
          "A constant value",
          "A DOM element only",
        ],
        correctAnswer: 0,
        explanation:
          "useRef returns a mutable object with a `.current` property that persists across renders and can reference DOM elements or values.",
      },
      {
        id: 14,
        question: "What is React Fragment used for?",
        options: [
          "To group multiple elements without adding extra nodes to the DOM",
          "To style elements",
          "To manage state",
          "To handle events",
        ],
        correctAnswer: 0,
        explanation:
          "React Fragments let you group multiple elements without creating unnecessary DOM nodes like `<div>` wrappers.",
      },
      {
        id: 15,
        question: "How do you handle forms in React?",
        options: [
          "Using DOM selectors",
          "Using controlled or uncontrolled components",
          "Using window.prompt",
          "Using Redux only",
        ],
        correctAnswer: 1,
        explanation:
          "React forms can be managed using controlled components (state-managed inputs) or uncontrolled components (refs).",
      },
      {
        id: 16,
        question: "What is React Router used for?",
        options: [
          "To manage API requests",
          "To manage routing and navigation in React apps",
          "To manage global state",
          "To handle form submissions",
        ],
        correctAnswer: 1,
        explanation:
          "React Router enables navigation between different views or components in single-page applications using routes.",
      },
      {
        id: 17,
        question: "What is useCallback used for?",
        options: [
          "To memoize functions and prevent unnecessary re-creations",
          "To fetch data",
          "To manage side effects",
          "To store values in context",
        ],
        correctAnswer: 0,
        explanation:
          "useCallback memoizes a function definition so that it doesn’t get recreated on every render unless dependencies change.",
      },
      {
        id: 18,
        question:
          "What is the difference between useEffect and useLayoutEffect?",
        options: [
          "useEffect runs after paint, useLayoutEffect runs before paint",
          "useEffect is faster",
          "useLayoutEffect is only for mobile apps",
          "No difference",
        ],
        correctAnswer: 0,
        explanation:
          "useLayoutEffect runs synchronously before the browser paints, useful for reading layout or DOM measurements before render.",
      },
      {
        id: 19,
        question: "What is React StrictMode used for?",
        options: [
          "To highlight potential issues in the application",
          "To improve performance",
          "To enable dark mode",
          "To handle form validation",
        ],
        correctAnswer: 0,
        explanation:
          "React StrictMode activates additional checks and warnings in development mode to identify potential problems in components.",
      },
      {
        id: 20,
        question: "How does React’s reconciliation algorithm work?",
        options: [
          "By comparing new and previous Virtual DOM trees",
          "By reloading the browser window",
          "By clearing component cache",
          "By updating only CSS styles",
        ],
        correctAnswer: 0,
        explanation:
          "React’s reconciliation algorithm compares the previous and new Virtual DOM trees to determine the minimal updates needed in the real DOM.",
      },
    ],
  },
  {
    title: "Node.js",
    subTitle: "Test your backend JavaScript development expertise",
    summary:
      "This Node.js test evaluates your knowledge of server-side JavaScript, Express.js, APIs, database integration, and asynchronous programming.",
    duration: "55 minutes",
    description:
      "The exam assesses your Node.js competency, covering runtime fundamentals, Express framework, RESTful APIs, and database operations.",
    level: "Beginner to Advanced",
    tools: ["Node.js", "Express.js", "MongoDB", "npm", "VS Code"],
    mode: ["Online test", "Timed questions", "Certificate upon passing"],
    url: "",
    benefits: [
      "Validate your Node.js runtime knowledge",
      "Showcase Express.js framework skills",
      "Prove API development expertise",
      "Demonstrate async programming mastery",
    ],
    gallery: ["/images/nodejs/1.jpg", "/images/nodejs/2.jpg"],
    learn: [
      "Node.js fundamentals & runtime",
      "Express.js framework",
      "RESTful API development",
      "Database integration",
      "Async/await patterns",
    ],
    questions: [
      "What is the event loop?",
      "How does Node.js handle asynchronous operations?",
      "What is middleware in Express?",
    ],
    quiz: [
      {
        id: 1,
        question: "What is Node.js?",
        options: [
          "A JavaScript library",
          "A JavaScript runtime built on Chrome's V8 engine",
          "A database",
          "A web browser",
        ],
        correctAnswer: 1,
        explanation:
          "Node.js is a JavaScript runtime environment that allows you to run JavaScript code outside of a web browser, built on Chrome's V8 JavaScript engine.",
      },
      {
        id: 2,
        question: "Which method is used to include modules in Node.js?",
        options: ["import()", "require()", "include()", "load()"],
        correctAnswer: 1,
        explanation:
          "The require() function is used to include modules in Node.js (CommonJS), though ES6 import syntax is also supported in modern versions.",
      },
      {
        id: 3,
        question: "What is npm?",
        options: [
          "Node Package Manager",
          "New Programming Module",
          "Network Protocol Manager",
          "Node Process Monitor",
        ],
        correctAnswer: 0,
        explanation:
          "npm (Node Package Manager) is the default package manager for Node.js, used to install, share, and manage JavaScript packages.",
      },
      {
        id: 4,
        question: "What does Express.js middleware do?",
        options: [
          "Handles database connections",
          "Processes requests between client and server",
          "Manages file uploads only",
          "Handles authentication only",
        ],
        correctAnswer: 1,
        explanation:
          "Express.js middleware functions execute during the request-response cycle, allowing you to modify requests/responses, handle authentication, logging, etc.",
      },
      {
        id: 5,
        question: "What is the purpose of package.json?",
        options: [
          "To store application data",
          "To define project metadata and dependencies",
          "To configure the server",
          "To store user credentials",
        ],
        correctAnswer: 1,
        explanation:
          "package.json contains metadata about the project and lists dependencies, scripts, and other configuration information needed for the Node.js application.",
      },
      {
        id: 6,
        question:
          "Which core module is used to create a web server in Node.js?",
        options: ["net", "fs", "http", "os"],
        correctAnswer: 2,
        explanation:
          "The 'http' module allows you to create web servers and handle HTTP requests and responses in Node.js.",
      },
      {
        id: 7,
        question: "What is the purpose of the 'fs' module in Node.js?",
        options: [
          "File system operations",
          "Form submission handling",
          "Frontend styling",
          "Framework settings",
        ],
        correctAnswer: 0,
        explanation:
          "The 'fs' module provides an API for interacting with the file system, allowing you to read, write, and manipulate files.",
      },
      {
        id: 8,
        question: "What is an event emitter in Node.js?",
        options: [
          "A type of database",
          "An object that triggers and listens for named events",
          "A function for asynchronous iteration",
          "A logging utility",
        ],
        correctAnswer: 1,
        explanation:
          "The EventEmitter class allows objects to emit named events that cause functions (listeners) to be called.",
      },
      {
        id: 9,
        question: "What command initializes a new Node.js project?",
        options: ["node init", "npm install", "npm init", "node start"],
        correctAnswer: 2,
        explanation:
          "The 'npm init' command creates a package.json file and sets up a new Node.js project with metadata and dependencies.",
      },
      {
        id: 10,
        question:
          "Which keyword is used to handle asynchronous errors in Node.js?",
        options: ["try/catch", "await", "throw", "callback"],
        correctAnswer: 0,
        explanation:
          "In async functions, 'try/catch' is used to handle errors during asynchronous operations wrapped with 'await'.",
      },
      {
        id: 11,
        question: "Which method sends a JSON response in Express.js?",
        options: ["res.send()", "res.json()", "res.text()", "res.render()"],
        correctAnswer: 1,
        explanation:
          "The res.json() method sends a JSON response to the client, automatically setting the appropriate headers.",
      },
      {
        id: 12,
        question: "How do you install a package globally using npm?",
        options: [
          "npm install package",
          "npm install -g package",
          "npm get package",
          "npm add package",
        ],
        correctAnswer: 1,
        explanation:
          "The '-g' flag installs the package globally so it can be accessed from anywhere on the system.",
      },
      {
        id: 13,
        question: "What is the role of process.env in Node.js?",
        options: [
          "Access environment variables",
          "Start background processes",
          "Configure middleware",
          "Render templates",
        ],
        correctAnswer: 0,
        explanation:
          "process.env provides access to environment variables that can store sensitive or configurable data such as API keys and database URLs.",
      },
      {
        id: 14,
        question:
          "Which function is used to read files asynchronously in Node.js?",
        options: [
          "fs.read()",
          "fs.readFileSync()",
          "fs.readFile()",
          "fs.loadFile()",
        ],
        correctAnswer: 2,
        explanation:
          "fs.readFile() reads the file asynchronously, allowing the program to continue executing while waiting for the operation to complete.",
      },
      {
        id: 15,
        question: "What is a promise in Node.js?",
        options: [
          "A synchronous loop",
          "An object representing eventual completion or failure of an async operation",
          "A callback replacement",
          "A JSON parser",
        ],
        correctAnswer: 1,
        explanation:
          "A promise represents a value that will be available in the future, used for handling asynchronous operations cleanly.",
      },
      {
        id: 16,
        question: "Which Express method defines a GET route?",
        options: ["app.get()", "app.route()", "app.fetch()", "app.send()"],
        correctAnswer: 0,
        explanation:
          "app.get() handles GET requests to a specified endpoint in an Express application.",
      },
      {
        id: 17,
        question: "How can you handle CORS in a Node.js API?",
        options: [
          "By installing and configuring the 'cors' middleware",
          "By adding it to package.json",
          "By using the fs module",
          "By disabling headers",
        ],
        correctAnswer: 0,
        explanation:
          "The 'cors' middleware helps enable Cross-Origin Resource Sharing, allowing your API to be accessed from different origins.",
      },
      {
        id: 18,
        question:
          "What is the difference between synchronous and asynchronous code in Node.js?",
        options: [
          "Synchronous code blocks execution, async code doesn't",
          "Async code is faster by default",
          "Synchronous code runs only in browsers",
          "There is no difference",
        ],
        correctAnswer: 0,
        explanation:
          "Synchronous code executes line by line, blocking the thread, while asynchronous code allows non-blocking operations.",
      },
      {
        id: 19,
        question:
          "What database driver is commonly used with MongoDB in Node.js?",
        options: ["pg", "mysql", "mongoose", "sqlite3"],
        correctAnswer: 2,
        explanation:
          "Mongoose is an ODM (Object Data Modeling) library used to interact with MongoDB databases in Node.js.",
      },
      {
        id: 20,
        question: "What does 'app.listen()' do in Express.js?",
        options: [
          "Listens for database queries",
          "Starts the server and listens for incoming connections",
          "Logs errors to console",
          "Creates a new router",
        ],
        correctAnswer: 1,
        explanation:
          "The app.listen() method binds and listens for connections on the specified host and port, starting the Express server.",
      },
    ],
  },
  {
    title: "Rust",
    subTitle: "Evaluate your systems programming and memory safety skills",
    summary:
      "This Rust test covers ownership, borrowing, error handling, concurrency, and building high-performance, memory-safe applications.",
    duration: "60 minutes",
    description:
      "The exam measures your Rust competency, including ownership model, pattern matching, error handling, and concurrent programming.",
    level: "Beginner to Advanced",
    tools: ["Rust", "Cargo", "serde", "tokio", "VS Code"],
    mode: ["Online test", "Timed questions", "Certificate upon passing"],
    url: "",
    benefits: [
      "Validate your ownership & borrowing knowledge",
      "Showcase memory safety expertise",
      "Prove concurrent programming skills",
      "Demonstrate systems programming competency",
    ],
    gallery: ["/images/rust/1.jpg", "/images/rust/2.jpg"],
    learn: [
      "Rust fundamentals & ownership",
      "Pattern matching & enums",
      "Error handling with Result",
      "Concurrency & async programming",
      "Cargo & package management",
    ],
    questions: [
      "What is ownership in Rust?",
      "How does borrowing work?",
      "What is the difference between String and &str?",
    ],
    quiz: [
      {
        id: 1,
        question: "What is Rust's ownership system designed to prevent?",
        options: [
          "Compilation errors",
          "Memory leaks and data races",
          "Runtime errors",
          "Performance issues",
        ],
        correctAnswer: 1,
        explanation:
          "Rust's ownership system prevents memory leaks, dangling pointers, and data races at compile time, ensuring memory safety without a garbage collector.",
      },
      {
        id: 2,
        question: "What keyword is used to create a mutable variable in Rust?",
        options: ["var", "let mut", "mutable", "mut let"],
        correctAnswer: 1,
        explanation:
          "In Rust, variables are immutable by default. Use 'let mut' to create a mutable variable that can be changed after declaration.",
      },
      {
        id: 3,
        question: "What is the Result type used for in Rust?",
        options: [
          "Storing multiple values",
          "Handling errors without exceptions",
          "Creating loops",
          "Defining structures",
        ],
        correctAnswer: 1,
        explanation:
          "Result<T, E> is an enum used for error handling in Rust, representing either a successful value (Ok) or an error (Err) without using exceptions.",
      },
      {
        id: 4,
        question: "What does the borrow checker do?",
        options: [
          "Manages memory allocation",
          "Enforces ownership and borrowing rules at compile time",
          "Handles runtime errors",
          "Optimizes performance",
        ],
        correctAnswer: 1,
        explanation:
          "The borrow checker analyzes code at compile time to ensure references are valid and ownership rules are followed, preventing memory safety issues.",
      },
      {
        id: 5,
        question: "What is Cargo in Rust?",
        options: [
          "A web framework",
          "Rust's build system and package manager",
          "A testing library",
          "An IDE",
        ],
        correctAnswer: 1,
        explanation:
          "Cargo is Rust's built-in build system and package manager that handles dependencies, compilation, testing, and documentation generation.",
      },
      {
        id: 6,
        question: "What is the purpose of 'match' in Rust?",
        options: [
          "Conditional branching with pattern matching",
          "Loop iteration",
          "Variable declaration",
          "String formatting",
        ],
        correctAnswer: 0,
        explanation:
          "The 'match' keyword in Rust allows pattern matching against values, similar to a switch statement but more powerful and exhaustive.",
      },
      {
        id: 7,
        question: "What are lifetimes in Rust used for?",
        options: [
          "Tracking variable mutability",
          "Ensuring references remain valid",
          "Specifying data size",
          "Handling asynchronous code",
        ],
        correctAnswer: 1,
        explanation:
          "Lifetimes ensure that references are valid for as long as they are used, preventing dangling pointers and unsafe memory access.",
      },
      {
        id: 8,
        question: "What is the difference between String and &str in Rust?",
        options: [
          "String is immutable, &str is mutable",
          "String is heap-allocated, &str is a string slice reference",
          "They are identical types",
          "String is a pointer, &str is a number",
        ],
        correctAnswer: 1,
        explanation:
          "A String owns its data on the heap, while &str is a borrowed reference to a string slice, often pointing to data owned elsewhere.",
      },
      {
        id: 9,
        question: "Which keyword is used to handle errors that may occur?",
        options: ["unwrap!", "expect!", "try", "match"],
        correctAnswer: 3,
        explanation:
          "Using 'match' allows you to safely handle both Ok and Err variants of a Result without panicking at runtime.",
      },
      {
        id: 10,
        question: "What is the purpose of the 'Option' enum in Rust?",
        options: [
          "To represent optional values safely",
          "To define generic types",
          "To control loops",
          "To manage memory allocation",
        ],
        correctAnswer: 0,
        explanation:
          "Option<T> is used to represent an optional value — it can be Some(T) or None — avoiding null pointer errors found in other languages.",
      },
      {
        id: 11,
        question: "What does 'async/await' enable in Rust?",
        options: [
          "Parallel computation",
          "Asynchronous, non-blocking programming",
          "Faster compilation",
          "Error suppression",
        ],
        correctAnswer: 1,
        explanation:
          "'async/await' enables writing asynchronous code that looks synchronous, allowing efficient, non-blocking I/O operations in Rust.",
      },
      {
        id: 12,
        question: "What is a trait in Rust?",
        options: [
          "A macro definition",
          "A struct field type",
          "A collection of method signatures defining shared behavior",
          "A constant variable",
        ],
        correctAnswer: 2,
        explanation:
          "A trait defines shared behavior (similar to interfaces in other languages) that types can implement to gain certain functionalities.",
      },
      {
        id: 13,
        question: "How do you define a constant in Rust?",
        options: ["var", "let const", "const", "static mut"],
        correctAnswer: 2,
        explanation:
          "Use the 'const' keyword to define constants that are immutable and must have their type explicitly specified.",
      },
      {
        id: 14,
        question: "Which keyword transfers ownership of a value in Rust?",
        options: ["borrow", "move", "clone", "mutate"],
        correctAnswer: 1,
        explanation:
          "In Rust, assignment or function passing usually results in a 'move', which transfers ownership from one variable to another.",
      },
      {
        id: 15,
        question: "What is 'serde' used for in Rust?",
        options: [
          "Serialization and deserialization",
          "Database management",
          "Thread synchronization",
          "Memory optimization",
        ],
        correctAnswer: 0,
        explanation:
          "Serde is a popular Rust library for serializing and deserializing data structures efficiently and safely.",
      },
      {
        id: 16,
        question: "What macro is used for printing to the console?",
        options: ["write!", "println!", "display!", "echo!"],
        correctAnswer: 1,
        explanation:
          "The println! macro outputs text to the console, automatically appending a newline character.",
      },
      {
        id: 17,
        question:
          "What crate is commonly used for asynchronous runtime in Rust?",
        options: ["serde", "tokio", "regex", "rayon"],
        correctAnswer: 1,
        explanation:
          "Tokio is a popular async runtime for Rust, providing event loops, tasks, and async I/O utilities.",
      },
      {
        id: 18,
        question: "What happens when a variable goes out of scope in Rust?",
        options: [
          "Its memory is freed automatically",
          "It stays allocated until manual cleanup",
          "It triggers a panic",
          "It becomes global",
        ],
        correctAnswer: 0,
        explanation:
          "When a variable goes out of scope, Rust automatically calls 'drop' to free its memory, ensuring safety without garbage collection.",
      },
      {
        id: 19,
        question: "What does the '?' operator do in Rust?",
        options: [
          "Converts errors to strings",
          "Propagates errors automatically",
          "Ignores failed results",
          "Logs errors to console",
        ],
        correctAnswer: 1,
        explanation:
          "The '?' operator is used to propagate errors conveniently by returning early from a function if an operation fails.",
      },
      {
        id: 20,
        question: "What is the purpose of the 'derive' attribute in Rust?",
        options: [
          "Automatically implements common traits like Debug or Clone",
          "Creates a macro expansion",
          "Defines async functions",
          "Optimizes performance",
        ],
        correctAnswer: 0,
        explanation:
          "The #[derive()] attribute automatically generates implementations for common traits, reducing boilerplate and improving readability.",
      },
    ],
  },
  {
    title: "Swift",
    subTitle: "Test your iOS and macOS development skills",
    summary:
      "This Swift test evaluates your knowledge of Swift syntax, iOS development, UIKit, SwiftUI, and building native Apple applications.",
    duration: "55 minutes",
    description:
      "The exam assesses your Swift programming competency, covering language features, iOS frameworks, and mobile app development patterns.",
    level: "Beginner to Advanced",
    tools: ["Swift", "Xcode", "UIKit", "SwiftUI", "Core Data"],
    mode: ["Online test", "Timed questions", "Certificate upon passing"],
    url: "",
    benefits: [
      "Validate your Swift language skills",
      "Showcase iOS development expertise",
      "Prove UIKit & SwiftUI knowledge",
      "Demonstrate mobile app architecture understanding",
    ],
    gallery: ["/images/swift/1.jpg", "/images/swift/2.jpg"],
    learn: [
      "Swift fundamentals & syntax",
      "iOS app development basics",
      "UIKit & SwiftUI frameworks",
      "Data persistence with Core Data",
      "App Store deployment process",
    ],
    questions: [
      "What are optionals in Swift?",
      "How does ARC work?",
      "What is the difference between UIKit and SwiftUI?",
    ],
    quiz: [
      {
        id: 1,
        question: "What is an optional in Swift?",
        options: [
          "A required parameter",
          "A type that can hold either a value or nil",
          "A function parameter",
          "A class property",
        ],
        correctAnswer: 1,
        explanation:
          "An optional in Swift is a type that can hold either a value of a specific type or nil, providing a safe way to handle the absence of values.",
      },
      {
        id: 2,
        question: "What does ARC stand for in Swift?",
        options: [
          "Automatic Reference Counting",
          "Advanced Runtime Compiler",
          "Application Resource Controller",
          "Asynchronous Runtime Control",
        ],
        correctAnswer: 0,
        explanation:
          "ARC (Automatic Reference Counting) automatically manages memory by tracking and counting references to objects, deallocating them when no longer needed.",
      },
      {
        id: 3,
        question: "Which keyword is used to unwrap optionals safely?",
        options: ["unwrap", "if let", "force", "safe"],
        correctAnswer: 1,
        explanation:
          "'if let' provides safe optional binding, allowing you to unwrap an optional and use its value only if it's not nil, avoiding runtime crashes.",
      },
      {
        id: 4,
        question: "What is SwiftUI?",
        options: [
          "A testing framework",
          "Apple's declarative UI framework",
          "A database library",
          "A networking framework",
        ],
        correctAnswer: 1,
        explanation:
          "SwiftUI is Apple's modern, declarative framework for building user interfaces across all Apple platforms using Swift.",
      },
      {
        id: 5,
        question: "What is a closure in Swift?",
        options: [
          "A class definition",
          "A self-contained block of functionality",
          "A variable declaration",
          "A loop construct",
        ],
        correctAnswer: 1,
        explanation:
          "A closure in Swift is a self-contained block of functionality that can be passed around and used in your code, similar to lambdas or anonymous functions.",
      },
      {
        id: 6,
        question: "What keyword is used to declare a constant in Swift?",
        options: ["var", "let", "const", "immutable"],
        correctAnswer: 1,
        explanation:
          "The 'let' keyword declares constants in Swift, meaning their value cannot be changed after initialization.",
      },
      {
        id: 7,
        question:
          "Which data type is used to represent true or false values in Swift?",
        options: ["Int", "Bool", "String", "Float"],
        correctAnswer: 1,
        explanation:
          "The 'Bool' type represents boolean values — true or false — and is often used in conditions and logical expressions.",
      },
      {
        id: 8,
        question: "What is the purpose of guard statements in Swift?",
        options: [
          "To create loops",
          "To safely exit a function early when conditions are not met",
          "To declare constants",
          "To define classes",
        ],
        correctAnswer: 1,
        explanation:
          "A 'guard' statement allows you to check conditions and exit early from a function if those conditions aren’t met, improving code clarity.",
      },
      {
        id: 9,
        question:
          "What is the main difference between struct and class in Swift?",
        options: [
          "Structs support inheritance, classes don’t",
          "Structs are value types, classes are reference types",
          "Classes are faster than structs",
          "Structs can’t have methods",
        ],
        correctAnswer: 1,
        explanation:
          "Structs are value types, meaning they are copied when assigned or passed. Classes are reference types, meaning they share references to the same instance.",
      },
      {
        id: 10,
        question: "What is optional chaining in Swift?",
        options: [
          "Combining multiple functions into one",
          "Safely accessing properties or methods of an optional",
          "Declaring optional types",
          "Handling multiple optionals at once",
        ],
        correctAnswer: 1,
        explanation:
          "Optional chaining lets you safely call properties, methods, or subscripts on an optional that might currently be nil, preventing runtime crashes.",
      },
      {
        id: 11,
        question: "What is the role of @State in SwiftUI?",
        options: [
          "To manage local, mutable state in a view",
          "To define constants",
          "To track global state",
          "To handle network requests",
        ],
        correctAnswer: 0,
        explanation:
          "The @State property wrapper in SwiftUI allows a view to manage local mutable state and re-render automatically when the state changes.",
      },
      {
        id: 12,
        question:
          "Which Swift feature allows pattern matching in switch statements?",
        options: ["Guards", "Closures", "Enums", "Pattern cases"],
        correctAnswer: 3,
        explanation:
          "Swift's switch statements support powerful pattern matching using 'case' patterns, allowing developers to match complex conditions succinctly.",
      },
      {
        id: 13,
        question: "What is Combine in Swift?",
        options: [
          "A database framework",
          "A reactive programming framework",
          "A UI animation library",
          "A testing tool",
        ],
        correctAnswer: 1,
        explanation:
          "Combine is Apple's reactive programming framework for handling asynchronous events and data streams using publishers and subscribers.",
      },
      {
        id: 14,
        question: "What does the 'deinit' keyword do in Swift?",
        options: [
          "Initializes a class",
          "Cleans up resources before an instance is deallocated",
          "Creates a new instance",
          "Deletes memory manually",
        ],
        correctAnswer: 1,
        explanation:
          "The 'deinit' method is called automatically before an instance of a class is deallocated, allowing you to perform cleanup tasks.",
      },
      {
        id: 15,
        question:
          "Which collection type in Swift is unordered and ensures unique elements?",
        options: ["Array", "Dictionary", "Set", "Tuple"],
        correctAnswer: 2,
        explanation:
          "A 'Set' is an unordered collection of unique elements, useful when order doesn’t matter but uniqueness does.",
      },
      {
        id: 16,
        question: "What is Core Data used for?",
        options: [
          "UI animations",
          "Data persistence and object graph management",
          "Network communication",
          "Thread management",
        ],
        correctAnswer: 1,
        explanation:
          "Core Data is a powerful framework for managing persistent data and complex object graphs in iOS and macOS applications.",
      },
      {
        id: 17,
        question: "Which keyword is used to define an enumeration in Swift?",
        options: ["enum", "enumeration", "case", "switch"],
        correctAnswer: 0,
        explanation:
          "The 'enum' keyword defines an enumeration, a type that groups related values together under a single type name.",
      },
      {
        id: 18,
        question: "What is the main purpose of extensions in Swift?",
        options: [
          "To add new functionality to existing types",
          "To create subclasses",
          "To define protocols",
          "To declare private methods",
        ],
        correctAnswer: 0,
        explanation:
          "Extensions in Swift allow developers to add new functionality to existing classes, structs, or enums without modifying their original source code.",
      },
      {
        id: 19,
        question:
          "What is the difference between synchronous and asynchronous code in Swift?",
        options: [
          "Synchronous code runs concurrently, asynchronous does not",
          "Synchronous code runs sequentially, asynchronous can run in parallel",
          "Both run at the same time",
          "They are identical in Swift",
        ],
        correctAnswer: 1,
        explanation:
          "Synchronous code runs one task at a time, while asynchronous code allows multiple tasks to execute concurrently without blocking the main thread.",
      },
      {
        id: 20,
        question: "What does @Published do in SwiftUI?",
        options: [
          "Publishes data changes to subscribers",
          "Stores global variables",
          "Handles network calls",
          "Defines constants",
        ],
        correctAnswer: 0,
        explanation:
          "The @Published property wrapper automatically notifies SwiftUI views or Combine subscribers when its value changes, enabling reactive updates.",
      },
    ],
  },
  {
    title: "Kotlin",
    subTitle: "Assess your Android development and JVM programming skills",
    summary:
      "This Kotlin test evaluates your knowledge of Kotlin syntax, Android development, coroutines, and building modern mobile applications.",
    duration: "55 minutes",
    description:
      "The exam measures your Kotlin competency, covering language features, Android frameworks, and mobile app development best practices.",
    level: "Beginner to Advanced",
    tools: ["Kotlin", "Android Studio", "Jetpack Compose", "Room", "Retrofit"],
    mode: ["Online test", "Timed questions", "Certificate upon passing"],
    url: "",
    benefits: [
      "Validate your Kotlin language skills",
      "Showcase Android development expertise",
      "Prove coroutines & async programming knowledge",
      "Demonstrate modern Android architecture understanding",
    ],
    gallery: ["/images/kotlin/1.jpg", "/images/kotlin/2.jpg"],
    learn: [
      "Kotlin fundamentals & syntax",
      "Android app development",
      "Jetpack Compose UI toolkit",
      "Coroutines for async programming",
      "Room database & data persistence",
    ],
    questions: [
      "What are Kotlin coroutines?",
      "How does null safety work in Kotlin?",
      "What is Jetpack Compose?",
    ],
    quiz: [
      {
        id: 1,
        question: "What makes Kotlin null-safe?",
        options: [
          "It doesn't allow variables",
          "Types are nullable or non-nullable by default",
          "It uses garbage collection",
          "It has automatic error handling",
        ],
        correctAnswer: 1,
        explanation:
          "Kotlin's type system distinguishes between nullable (Type?) and non-nullable types, preventing null pointer exceptions at compile time.",
      },
      {
        id: 2,
        question: "What are coroutines in Kotlin?",
        options: [
          "A type of loop",
          "Lightweight threads for asynchronous programming",
          "Error handling mechanisms",
          "Database connections",
        ],
        correctAnswer: 1,
        explanation:
          "Coroutines are lightweight threads that allow for asynchronous programming, making it easier to handle long-running operations without blocking the main thread.",
      },
      {
        id: 3,
        question:
          "Which keyword is used to declare a read-only variable in Kotlin?",
        options: ["const", "val", "var", "final"],
        correctAnswer: 1,
        explanation:
          "The 'val' keyword declares a read-only (immutable) variable in Kotlin, similar to 'final' in Java but more concise.",
      },
      {
        id: 4,
        question: "What is Jetpack Compose?",
        options: [
          "A database library",
          "Android's modern declarative UI toolkit",
          "A testing framework",
          "A networking library",
        ],
        correctAnswer: 1,
        explanation:
          "Jetpack Compose is Android's modern toolkit for building native UI declaratively, simplifying UI development with less code and powerful tools.",
      },
      {
        id: 5,
        question: "What does the 'suspend' keyword do in Kotlin?",
        options: [
          "Pauses the application",
          "Marks a function that can be suspended and resumed",
          "Stops error handling",
          "Delays variable initialization",
        ],
        correctAnswer: 1,
        explanation:
          "The 'suspend' keyword marks functions that can be suspended without blocking a thread, allowing them to be used with coroutines for asynchronous programming.",
      },
      {
        id: 6,
        question:
          "What is the main difference between 'val' and 'var' in Kotlin?",
        options: [
          "'val' is mutable, 'var' is immutable",
          "'val' is immutable, 'var' is mutable",
          "Both are mutable",
          "Both are immutable",
        ],
        correctAnswer: 1,
        explanation:
          "'val' creates a read-only variable (immutable), while 'var' creates a mutable variable that can change after initialization.",
      },
      {
        id: 7,
        question: "What is the Elvis operator in Kotlin?",
        options: ["?:", "!!", "?.", "::"],
        correctAnswer: 0,
        explanation:
          "The Elvis operator (?:) provides a default value when an expression on the left is null, helping to avoid null pointer exceptions.",
      },
      {
        id: 8,
        question: "What is the purpose of 'data class' in Kotlin?",
        options: [
          "To define test cases",
          "To automatically generate equals(), hashCode(), and toString()",
          "To handle exceptions",
          "To create immutable lists",
        ],
        correctAnswer: 1,
        explanation:
          "A 'data class' automatically generates useful methods like equals(), hashCode(), and toString(), simplifying data object creation.",
      },
      {
        id: 9,
        question: "Which function is used to start a coroutine in Kotlin?",
        options: ["run()", "launch()", "execute()", "begin()"],
        correctAnswer: 1,
        explanation:
          "The 'launch()' function starts a new coroutine in Kotlin, allowing concurrent execution without blocking the main thread.",
      },
      {
        id: 10,
        question: "What is the role of 'lateinit' in Kotlin?",
        options: [
          "It initializes variables automatically",
          "It allows late initialization of non-null variables",
          "It delays class creation",
          "It prevents memory leaks",
        ],
        correctAnswer: 1,
        explanation:
          "The 'lateinit' modifier allows you to declare non-null variables that will be initialized later, commonly used with dependency injection.",
      },
      {
        id: 11,
        question: "What is the 'by lazy' delegate used for?",
        options: [
          "To create variables that load immediately",
          "To initialize variables only when first accessed",
          "To handle asynchronous loading",
          "To define immutable constants",
        ],
        correctAnswer: 1,
        explanation:
          "'by lazy' creates a lazily initialized property that executes its initializer only the first time it's accessed.",
      },
      {
        id: 12,
        question: "Which Kotlin feature replaces Java's 'checked exceptions'?",
        options: [
          "try-catch blocks",
          "Nothing — Kotlin does not have checked exceptions",
          "Error handlers",
          "suspend functions",
        ],
        correctAnswer: 1,
        explanation:
          "Kotlin does not have checked exceptions, simplifying code and reducing unnecessary try-catch boilerplate from Java.",
      },
      {
        id: 13,
        question: "What is 'sealed class' used for in Kotlin?",
        options: [
          "To define a class hierarchy with restricted inheritance",
          "To create immutable data",
          "To prevent serialization",
          "To handle coroutines",
        ],
        correctAnswer: 0,
        explanation:
          "A 'sealed class' restricts inheritance to the same file, making it useful for representing restricted class hierarchies, like result states.",
      },
      {
        id: 14,
        question: "What is the purpose of the 'when' expression in Kotlin?",
        options: [
          "To replace if-else chains with pattern matching",
          "To start coroutines",
          "To handle nulls",
          "To define constants",
        ],
        correctAnswer: 0,
        explanation:
          "The 'when' expression is a more powerful alternative to switch statements, allowing flexible pattern matching and concise condition handling.",
      },
      {
        id: 15,
        question: "Which Android library simplifies API calls in Kotlin?",
        options: ["Dagger", "Retrofit", "Room", "Compose"],
        correctAnswer: 1,
        explanation:
          "Retrofit is a type-safe HTTP client that simplifies network requests and JSON parsing in Android and Kotlin applications.",
      },
      {
        id: 16,
        question: "What is Room in Android development?",
        options: [
          "A UI framework",
          "A local database persistence library",
          "A testing tool",
          "A network handler",
        ],
        correctAnswer: 1,
        explanation:
          "Room is an ORM (Object Relational Mapping) library for local data persistence, providing a clean abstraction over SQLite databases.",
      },
      {
        id: 17,
        question: "What does 'companion object' mean in Kotlin?",
        options: [
          "It defines static members for a class",
          "It creates a new thread",
          "It represents an interface",
          "It defines coroutine scopes",
        ],
        correctAnswer: 0,
        explanation:
          "A 'companion object' allows defining static-like members and functions within a class, similar to static methods in Java.",
      },
      {
        id: 18,
        question: "What is the difference between '=='' and '===' in Kotlin?",
        options: [
          "'==' compares references, '===' compares values",
          "'==' compares values, '===' compares references",
          "Both compare values",
          "Both compare references",
        ],
        correctAnswer: 1,
        explanation:
          "In Kotlin, '==' checks structural equality (values), while '===' checks referential equality (if two references point to the same object).",
      },
      {
        id: 19,
        question: "What is the default visibility modifier in Kotlin?",
        options: ["private", "public", "protected", "internal"],
        correctAnswer: 1,
        explanation:
          "'public' is the default visibility modifier in Kotlin, meaning members are visible everywhere unless specified otherwise.",
      },
      {
        id: 20,
        question: "Which function is used to handle exceptions in coroutines?",
        options: [
          "try/catch",
          "CoroutineExceptionHandler",
          "exceptionScope",
          "handleError()",
        ],
        correctAnswer: 1,
        explanation:
          "CoroutineExceptionHandler is used to handle uncaught exceptions in Kotlin coroutines, providing structured concurrency and better error handling.",
      },
    ],
  },
];
