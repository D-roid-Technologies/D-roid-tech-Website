import { TestType } from "../Types";

export const Test: TestType[] = [
  {
    question:
      "Which of the following is a most correct way to declare a JavaScript variable?",
    options: ["variable name", "var name", "v name", "name"],
    correctAnswer: "var name",
  },
  {
    question:
      "Which method is used to convert a JavaScript object to a JSON string?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.decode()",
    ],
    correctAnswer: "JSON.stringify()",
  },
  {
    question: `How do you write "Hello World" in an alert box?`,
    options: [
      `msg("Hello World")`,
      `alertBox("Hello World")`,
      `alert("Hello World")`,
      `msgBox("Hello World")`,
    ],
    correctAnswer: `alert("Hello World")`,
  },
  {
    question: "What will the following code output? console.log(typeof NaN)",
    options: ["undefined", "number", "NaN", "object"],
    correctAnswer: "number",
  },
  {
    question: "Which of the following is not a reserved word in JavaScript?",
    options: ["interface", "throws", "program", "short"],
    correctAnswer: "program",
  },
  {
    question:
      "Which JavaScript method is used to find the largest number in an array?",
    options: ["Math.ceil()", "Math.floor()", "Math.max()", "Math.highest()"],
    correctAnswer: "Math.max()",
  },
  {
    question: "What is the correct syntax for a for loop in JavaScript?",
    options: [
      "for (i <= 5; i++)",
      "for (i = 0; i <= 5; i++)",
      "for i = 1 to 5",
      "for (i = 0; i <= 5)",
    ],
    correctAnswer: "for (i = 0; i <= 5; i++)",
  },
  {
    question: "Which of the following statements will throw an error?",
    options: ["let a = 2;", "const b;", "var c = 3;", "const d = 4;"],
    correctAnswer: "const b;",
  },
  {
    question: `What is the output of the following code? console.log(2 + "2");`,
    options: ["4", "22", "NaN", "undefined"],
    correctAnswer: "22",
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function:myFunction()",
      "function myFunction() {}",
      "create myFunction()",
      "def myFunction()",
    ],
    correctAnswer: "function myFunction() {}",
  },
  {
    question: `What will console.log("5" - 3); output?`,
    options: ["2", "8", "NaN", "undefined"],
    correctAnswer: "2",
  },
  {
    question:
      "Which built-in method combines the text of two strings and returns a new string?",
    options: ["append()", "concat()", "attach()", "merge()"],
    correctAnswer: "concat()",
  },
  {
    question: "What will console.log([] + []); output?",
    options: [`[]`, `""`, `undefined`, `null`],
    correctAnswer: `""`,
  },
  {
    question:
      "Which of the following is the correct way to write an array in JavaScript?",
    options: [
      `var colors = "red", "green", "blue";`,
      `var colors = ["red", "green", "blue"];`,
      `var colors = (1:"red", 2:"green", 3:"blue");`,
      `var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue");`,
    ],
    correctAnswer: `var colors = ["red", "green", "blue"]; `,
  },
  {
    question: "What does the typeof operator return for the value null?",
    options: ["null", "object", "undefined", "number"],
    correctAnswer: "object",
  },
];
