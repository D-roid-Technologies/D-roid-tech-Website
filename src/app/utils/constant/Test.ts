import { TestType } from "../Types";

export const Test: TestType[] = [
  {
    question:
      "Which of the following is a most correct way to declare a JavaScript variable?",
    options: ["variable name", "var name", "v name", "name"],
    correct: "var name",
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
    correct: "JSON.stringify()",
  },
  {
    question: `How do you write "Hello World" in an alert box?`,
    options: [
      `msg("Hello World")`,
      `alertBox("Hello World")`,
      `alert("Hello World")`,
      `msgBox("Hello World")`,
    ],
    correct: `alert("Hello World")`,
  },
  {
    question: "What will the following code output? console.log(typeof NaN)",
    options: ["undefined", "number", "NaN", "object"],
    correct: "number",
  },
  {
    question: "Which of the following is not a reserved word in JavaScript?",
    options: ["interface", "throws", "program", "short"],
    correct: "program",
  },
  {
    question:
      "Which JavaScript method is used to find the largest number in an array?",
    options: ["Math.ceil()", "Math.floor()", "Math.max()", "Math.highest()"],
    correct: "Math.max()",
  },
  {
    question: "What is the correct syntax for a for loop in JavaScript?",
    options: [
      "for (i <= 5; i++)",
      "for (i = 0; i <= 5; i++)",
      "for i = 1 to 5",
      "for (i = 0; i <= 5)",
    ],
    correct: "for (i = 0; i <= 5; i++)",
  },
  {
    question: "Which of the following statements will throw an error?",
    options: ["let a = 2;", "const b;", "var c = 3;", "const d = 4;"],
    correct: "const b;",
  },
  // {
  //   question: "What is the output of the following code? console.log(2 + "2");",
  //   options: ["4", "22", "NaN", "undefined",],
  //   correct: "22",
  // },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function:myFunction()",
      "function myFunction() {}",
      "create myFunction()",
      "def myFunction()",
    ],
    correct: "function myFunction() {}",
  },
  // {
  //   question: "What will console.log("5" - 3); output?",
  //   options: ["2", "8", "NaN", "undefined",],
  //   correct: "2",
  // },
  {
    question:
      "Which built-in method combines the text of two strings and returns a new string?",
    options: ["append()", "concat()", "attach()", "merge()"],
    correct: "concat()",
  },
  {
    question: "",
    options: [""],
    correct: "",
  },
];

// What will console.log([] + []); output?

// a) []
// b) "" (Correct)
// c) undefined
// d) null
// Which of the following is the correct way to write an array in JavaScript?

// a) var colors = "red", "green", "blue";
// b) var colors = ["red", "green", "blue"]; (Correct)
// c) var colors = (1:"red", 2:"green", 3:"blue");
// d) var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue");
// What does the typeof operator return for the value null?

// a) null
// b) object (Correct)
// c) undefined
// d) number
