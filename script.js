const startbtn = document.getElementById("startbtn");

const quizModal = document.getElementById("quizModal");
const closeModal = document.getElementById("closeModal");

const quizForm = document.getElementById("quizForm");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const progressText = document.getElementById("progressText");
const totalMcqsText = document.getElementById("totalMcqsText");

const resultBox = document.getElementById("resultBox");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
const closeResultBtn = document.getElementById("closeResultBtn");
const timerText = document.getElementById("timerText");

const subjectSelect = document.getElementById("subjectSelect");
const modalTitle = document.getElementById("modalTitle");

let currentIndex = 0;
let score = 0;
let locked = false;

let timerSeconds = 8 * 60;
let timerInterval = null;

let attempted = 0;

let currentSubject = localStorage.getItem("current_subject") || "HTML";

/* ✅ SUBJECT DATA (MCQs) */
const subjects = {
  HTML: [
    {
      question: "Which HTML element does NOT have a closing tag?",
      answers: [
        { id: 1, option: "<div>" },
        { id: 2, option: "<span>" },
        { id: 3, option: "<section>" },
        { id: 4, option: "<meta>" }
      ],
      correctAnswer: 4
    },
    {
      question: "Which attribute is used to associate a label with a form control?",
      answers: [
        { id: 1, option: "name" },
        { id: 2, option: "for" },
        { id: 3, option: "id" },
        { id: 4, option: "target" }
      ],
      correctAnswer: 2
    },
    {
      question: "What is the default value of the 'type' attribute in a <button> element?",
      answers: [
        { id: 1, option: "submit" },
        { id: 2, option: "button" },
        { id: 3, option: "reset" },
        { id: 4, option: "none" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which HTML tag is used to define a self-contained piece of content?",
      answers: [
        { id: 1, option: "<section>" },
        { id: 2, option: "<article>" },
        { id: 3, option: "<aside>" },
        { id: 4, option: "<main>" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which attribute prevents an input field from being edited but still submits its value?",
      answers: [
        { id: 1, option: "disabled" },
        { id: 2, option: "hidden" },
        { id: 3, option: "readonly" },
        { id: 4, option: "locked" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which tag improves SEO by defining machine-readable time?",
      answers: [
        { id: 1, option: "<time>" },
        { id: 2, option: "<date>" },
        { id: 3, option: "<meta>" },
        { id: 4, option: "<mark>" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which HTML attribute is required for accessibility in images?",
      answers: [
        { id: 1, option: "title" },
        { id: 2, option: "src" },
        { id: 3, option: "alt" },
        { id: 4, option: "aria" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which tag is used to embed external interactive content?",
      answers: [
        { id: 1, option: "<iframe>" },
        { id: 2, option: "<embed>" },
        { id: 3, option: "<object>" },
        { id: 4, option: "All of these" }
      ],
      correctAnswer: 4
    },
    {
      question: "What does the 'defer' attribute do in script loading?",
      answers: [
        { id: 1, option: "Loads script after page load" },
        { id: 2, option: "Loads script asynchronously" },
        { id: 3, option: "Executes script after HTML parsing" },
        { id: 4, option: "Blocks HTML parsing" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which HTML tag is used for defining keyboard input?",
      answers: [
        { id: 1, option: "<kbd>" },
        { id: 2, option: "<samp>" },
        { id: 3, option: "<code>" },
        { id: 4, option: "<var>" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which attribute specifies that an input must be filled before submitting?",
      answers: [
        { id: 1, option: "validate" },
        { id: 2, option: "required" },
        { id: 3, option: "mandatory" },
        { id: 4, option: "pattern" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which element defines a container for SVG graphics?",
      answers: [
        { id: 1, option: "<canvas>" },
        { id: 2, option: "<svg>" },
        { id: 3, option: "<graphic>" },
        { id: 4, option: "<vector>" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which HTML tag represents a scalar measurement?",
      answers: [
        { id: 1, option: "<progress>" },
        { id: 2, option: "<meter>" },
        { id: 3, option: "<range>" },
        { id: 4, option: "<status>" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which tag is used to define a base URL for all relative links?",
      answers: [
        { id: 1, option: "<meta>" },
        { id: 2, option: "<link>" },
        { id: 3, option: "<base>" },
        { id: 4, option: "<head>" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which input type enables selecting multiple files?",
      answers: [
        { id: 1, option: "file" },
        { id: 2, option: "files" },
        { id: 3, option: "upload" },
        { id: 4, option: "file-multiple" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which HTML element is used to mark highlighted text?",
      answers: [
        { id: 1, option: "<strong>" },
        { id: 2, option: "<em>" },
        { id: 3, option: "<mark>" },
        { id: 4, option: "<highlight>" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which attribute controls how a form is submitted?",
      answers: [
        { id: 1, option: "method" },
        { id: 2, option: "action" },
        { id: 3, option: "target" },
        { id: 4, option: "name" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which tag is used to define fallback content for unsupported media?",
      answers: [
        { id: 1, option: "<source>" },
        { id: 2, option: "<track>" },
        { id: 3, option: "<object>" },
        { id: 4, option: "<noscript>" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which HTML element defines a description list?",
      answers: [
        { id: 1, option: "<ul>" },
        { id: 2, option: "<ol>" },
        { id: 3, option: "<dl>" },
        { id: 4, option: "<list>" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which attribute is used to improve accessibility for screen readers?",
      answers: [
        { id: 1, option: "role" },
        { id: 2, option: "aria-label" },
        { id: 3, option: "tabindex" },
        { id: 4, option: "alt" }
      ],
      correctAnswer: 2
    }
  ],
  CSS: [
    {
      question: "Which CSS selector has the highest specificity?",
      answers: [
        { id: 1, option: "div p" },
        { id: 2, option: ".class" },
        { id: 3, option: "#id" },
        { id: 4, option: "div.class#id" }
      ],
      correctAnswer: 4
    },
    {
      question: "Which property creates a new stacking context?",
      answers: [
        { id: 1, option: "z-index" },
        { id: 2, option: "position: relative" },
        { id: 3, option: "opacity less than 1" },
        { id: 4, option: "display: block" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which value of position removes the element from normal document flow?",
      answers: [
        { id: 1, option: "relative" },
        { id: 2, option: "absolute" },
        { id: 3, option: "static" },
        { id: 4, option: "sticky" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which unit is relative to the root element font-size?",
      answers: [
        { id: 1, option: "em" },
        { id: 2, option: "vh" },
        { id: 3, option: "rem" },
        { id: 4, option: "%" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which property defines how flex items are distributed along the main axis?",
      answers: [
        { id: 1, option: "align-items" },
        { id: 2, option: "align-content" },
        { id: 3, option: "justify-content" },
        { id: 4, option: "flex-direction" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which CSS function allows dynamic calculations?",
      answers: [
        { id: 1, option: "var()" },
        { id: 2, option: "calc()" },
        { id: 3, option: "attr()" },
        { id: 4, option: "minmax()" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which shorthand resets unspecified background properties?",
      answers: [
        { id: 1, option: "background: none" },
        { id: 2, option: "background: initial" },
        { id: 3, option: "background: unset" },
        { id: 4, option: "background: transparent" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which pseudo-class targets the last element of its type?",
      answers: [
        { id: 1, option: ":last-child" },
        { id: 2, option: ":last-of-type" },
        { id: 3, option: ":nth-last-child(1)" },
        { id: 4, option: ":only-child" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which property prevents margin collapsing?",
      answers: [
        { id: 1, option: "overflow: hidden" },
        { id: 2, option: "display: inline-block" },
        { id: 3, option: "position: absolute" },
        { id: 4, option: "float: left" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which value of display enables grid layout?",
      answers: [
        { id: 1, option: "grid" },
        { id: 2, option: "inline-grid" },
        { id: 3, option: "flex" },
        { id: 4, option: "Both 1 and 2" }
      ],
      correctAnswer: 4
    },
    {
      question: "Which property controls the resizing behavior of flex items?",
      answers: [
        { id: 1, option: "flex-basis" },
        { id: 2, option: "flex-shrink" },
        { id: 3, option: "flex-grow" },
        { id: 4, option: "All of these" }
      ],
      correctAnswer: 4
    },
    {
      question: "Which pseudo-element is used to style the first line of text?",
      answers: [
        { id: 1, option: "::before" },
        { id: 2, option: "::first-letter" },
        { id: 3, option: "::first-line" },
        { id: 4, option: "::after" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which property allows smooth animation between states?",
      answers: [
        { id: 1, option: "transform" },
        { id: 2, option: "transition" },
        { id: 3, option: "animation" },
        { id: 4, option: "will-change" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which value of overflow clips content without scrollbars?",
      answers: [
        { id: 1, option: "hidden" },
        { id: 2, option: "clip" },
        { id: 3, option: "scroll" },
        { id: 4, option: "auto" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which CSS property defines the size of an element before flex-grow or shrink?",
      answers: [
        { id: 1, option: "width" },
        { id: 2, option: "min-width" },
        { id: 3, option: "flex-basis" },
        { id: 4, option: "max-width" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which property is GPU-accelerated in most browsers?",
      answers: [
        { id: 1, option: "top" },
        { id: 2, option: "left" },
        { id: 3, option: "transform" },
        { id: 4, option: "margin" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which CSS rule allows conditional styling based on screen size?",
      answers: [
        { id: 1, option: "@supports" },
        { id: 2, option: "@media" },
        { id: 3, option: "@container" },
        { id: 4, option: "@keyframes" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which property defines how an image fits inside its container?",
      answers: [
        { id: 1, option: "background-size" },
        { id: 2, option: "object-position" },
        { id: 3, option: "object-fit" },
        { id: 4, option: "image-rendering" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which CSS keyword resets a property to browser default?",
      answers: [
        { id: 1, option: "unset" },
        { id: 2, option: "inherit" },
        { id: 3, option: "initial" },
        { id: 4, option: "revert" }
      ],
      correctAnswer: 4
    },
    {
      question: "Which property determines how white space inside an element is handled?",
      answers: [
        { id: 1, option: "word-break" },
        { id: 2, option: "white-space" },
        { id: 3, option: "text-wrap" },
        { id: 4, option: "overflow-wrap" }
      ],
      correctAnswer: 2
    }
  ],

  JavaScript: [
    {
      question: "What will be the output of: console.log(typeof null)?",
      answers: [
        { id: 1, option: "null" },
        { id: 2, option: "object" },
        { id: 3, option: "undefined" },
        { id: 4, option: "number" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which statement about 'let' is true?",
      answers: [
        { id: 1, option: "It is function-scoped" },
        { id: 2, option: "It is block-scoped" },
        { id: 3, option: "It allows redeclaration" },
        { id: 4, option: "It is hoisted with value" }
      ],
      correctAnswer: 2
    },
    {
      question: "What is the output of: console.log(1 + '2' + 3)?",
      answers: [
        { id: 1, option: "6" },
        { id: 2, option: "123" },
        { id: 3, option: "15" },
        { id: 4, option: "NaN" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which object is the root of the JavaScript prototype chain?",
      answers: [
        { id: 1, option: "Object.prototype" },
        { id: 2, option: "Function.prototype" },
        { id: 3, option: "null" },
        { id: 4, option: "Global Object" }
      ],
      correctAnswer: 3
    },
    {
      question: "What does a closure allow?",
      answers: [
        { id: 1, option: "Access to global scope only" },
        { id: 2, option: "Access to parent function variables" },
        { id: 3, option: "Access to block scope only" },
        { id: 4, option: "Memory cleanup" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which method converts JSON string to JavaScript object?",
      answers: [
        { id: 1, option: "JSON.stringify()" },
        { id: 2, option: "JSON.parse()" },
        { id: 3, option: "JSON.convert()" },
        { id: 4, option: "JSON.toObject()" }
      ],
      correctAnswer: 2
    },
    {
      question: "What will 'this' refer to in a regular function called in strict mode?",
      answers: [
        { id: 1, option: "window" },
        { id: 2, option: "global object" },
        { id: 3, option: "undefined" },
        { id: 4, option: "function itself" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which array method mutates the original array?",
      answers: [
        { id: 1, option: "map()" },
        { id: 2, option: "filter()" },
        { id: 3, option: "slice()" },
        { id: 4, option: "splice()" }
      ],
      correctAnswer: 4
    },
    {
      question: "What is the output of: console.log([] == ![])?",
      answers: [
        { id: 1, option: "true" },
        { id: 2, option: "false" },
        { id: 3, option: "undefined" },
        { id: 4, option: "TypeError" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which phase comes first in the JavaScript event loop?",
      answers: [
        { id: 1, option: "Microtask queue" },
        { id: 2, option: "Macrotask queue" },
        { id: 3, option: "Call stack execution" },
        { id: 4, option: "Rendering" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which keyword stops event bubbling?",
      answers: [
        { id: 1, option: "stop()" },
        { id: 2, option: "preventDefault()" },
        { id: 3, option: "stopPropagation()" },
        { id: 4, option: "cancelBubble()" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which Promise state represents successful completion?",
      answers: [
        { id: 1, option: "resolved" },
        { id: 2, option: "fulfilled" },
        { id: 3, option: "completed" },
        { id: 4, option: "done" }
      ],
      correctAnswer: 2
    },
    {
      question: "What does async function always return?",
      answers: [
        { id: 1, option: "Value" },
        { id: 2, option: "Callback" },
        { id: 3, option: "Promise" },
        { id: 4, option: "Undefined" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which operator checks both value and type?",
      answers: [
        { id: 1, option: "==" },
        { id: 2, option: "!=" },
        { id: 3, option: "===" },
        { id: 4, option: "=!" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which built-in method freezes an object?",
      answers: [
        { id: 1, option: "Object.seal()" },
        { id: 2, option: "Object.freeze()" },
        { id: 3, option: "Object.lock()" },
        { id: 4, option: "Object.prevent()" }
      ],
      correctAnswer: 2
    },
    {
      question: "What is the output of: console.log(NaN === NaN)?",
      answers: [
        { id: 1, option: "true" },
        { id: 2, option: "false" },
        { id: 3, option: "NaN" },
        { id: 4, option: "undefined" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which statement about arrow functions is true?",
      answers: [
        { id: 1, option: "They have their own this" },
        { id: 2, option: "They bind this lexically" },
        { id: 3, option: "They are hoisted" },
        { id: 4, option: "They can be used as constructors" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which method is used to schedule a microtask?",
      answers: [
        { id: 1, option: "setTimeout()" },
        { id: 2, option: "setInterval()" },
        { id: 3, option: "queueMicrotask()" },
        { id: 4, option: "requestAnimationFrame()" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which error occurs when accessing a variable before initialization?",
      answers: [
        { id: 1, option: "TypeError" },
        { id: 2, option: "ReferenceError" },
        { id: 3, option: "SyntaxError" },
        { id: 4, option: "RangeError" }
      ],
      correctAnswer: 2
    },
    {
      question: "What will Object.is(+0, -0) return?",
      answers: [
        { id: 1, option: "true" },
        { id: 2, option: "false" },
        { id: 3, option: "NaN" },
        { id: 4, option: "undefined" }
      ],
      correctAnswer: 2
    }
  ],

  Python: [
    {
      question: "What is the output of: print(type(lambda x: x))?",
      answers: [
        { id: 1, option: "<class 'function'>" },
        { id: 2, option: "<class 'lambda'>" },
        { id: 3, option: "<class 'generator'>" },
        { id: 4, option: "<class 'callable'>" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which statement about Python integers is true?",
      answers: [
        { id: 1, option: "They have fixed size" },
        { id: 2, option: "They are mutable" },
        { id: 3, option: "They have arbitrary precision" },
        { id: 4, option: "They overflow at 32-bit" }
      ],
      correctAnswer: 3
    },
    {
      question: "What will be the output of: print([] * 3)?",
      answers: [
        { id: 1, option: "[]" },
        { id: 2, option: "[[], [], []]" },
        { id: 3, option: "[]" },
        { id: 4, option: "Error" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which of the following creates a generator?",
      answers: [
        { id: 1, option: "(i for i in range(5))" },
        { id: 2, option: "[i for i in range(5)]" },
        { id: 3, option: "{i for i in range(5)}" },
        { id: 4, option: "{i: i for i in range(5)}" }
      ],
      correctAnswer: 1
    },
    {
      question: "What does the 'nonlocal' keyword do?",
      answers: [
        { id: 1, option: "Refers to global variable" },
        { id: 2, option: "Refers to variable in nearest enclosing scope" },
        { id: 3, option: "Creates immutable variable" },
        { id: 4, option: "Deletes local variable" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which method is called when an object is garbage collected?",
      answers: [
        { id: 1, option: "__init__" },
        { id: 2, option: "__del__" },
        { id: 3, option: "__exit__" },
        { id: 4, option: "__gc__" }
      ],
      correctAnswer: 2
    },
    {
      question: "What will be the output of: print(bool('False'))?",
      answers: [
        { id: 1, option: "False" },
        { id: 2, option: "True" },
        { id: 3, option: "Error" },
        { id: 4, option: "None" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which Python object is hashable?",
      answers: [
        { id: 1, option: "List" },
        { id: 2, option: "Set" },
        { id: 3, option: "Dictionary" },
        { id: 4, option: "Tuple" }
      ],
      correctAnswer: 4
    },
    {
      question: "What does *args represent?",
      answers: [
        { id: 1, option: "Keyword arguments" },
        { id: 2, option: "Variable-length positional arguments" },
        { id: 3, option: "Default arguments" },
        { id: 4, option: "Global arguments" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which exception is raised when accessing a missing dictionary key?",
      answers: [
        { id: 1, option: "IndexError" },
        { id: 2, option: "ValueError" },
        { id: 3, option: "KeyError" },
        { id: 4, option: "AttributeError" }
      ],
      correctAnswer: 3
    },
    {
      question: "What is the output of: print(0.1 + 0.2 == 0.3)?",
      answers: [
        { id: 1, option: "True" },
        { id: 2, option: "False" },
        { id: 3, option: "0.3" },
        { id: 4, option: "Error" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which decorator is used to create a static method?",
      answers: [
        { id: 1, option: "@classmethod" },
        { id: 2, option: "@staticmethod" },
        { id: 3, option: "@property" },
        { id: 4, option: "@decorator" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which module is used for regular expressions?",
      answers: [
        { id: 1, option: "regex" },
        { id: 2, option: "re" },
        { id: 3, option: "pyregex" },
        { id: 4, option: "expression" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which keyword is used to handle exceptions?",
      answers: [
        { id: 1, option: "catch" },
        { id: 2, option: "except" },
        { id: 3, option: "handle" },
        { id: 4, option: "error" }
      ],
      correctAnswer: 2
    },
    {
      question: "What does the GIL control?",
      answers: [
        { id: 1, option: "Memory allocation" },
        { id: 2, option: "Thread execution" },
        { id: 3, option: "Process creation" },
        { id: 4, option: "File I/O" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which function returns an iterator?",
      answers: [
        { id: 1, option: "range()" },
        { id: 2, option: "list()" },
        { id: 3, option: "tuple()" },
        { id: 4, option: "dict()" }
      ],
      correctAnswer: 1
    },
    {
      question: "What is the output of: print(type(None))?",
      answers: [
        { id: 1, option: "<class 'None'>" },
        { id: 2, option: "<class 'null'>" },
        { id: 3, option: "<class 'NoneType'>" },
        { id: 4, option: "<class 'void'>" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which keyword is used to create a context manager?",
      answers: [
        { id: 1, option: "using" },
        { id: 2, option: "with" },
        { id: 3, option: "context" },
        { id: 4, option: "open" }
      ],
      correctAnswer: 2
    },
    {
      question: "What will be the output of: print([i for i in range(3)] is [i for i in range(3)])?",
      answers: [
        { id: 1, option: "True" },
        { id: 2, option: "False" },
        { id: 3, option: "None" },
        { id: 4, option: "Error" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which function is used to get the memory address of an object?",
      answers: [
        { id: 1, option: "address()" },
        { id: 2, option: "mem()" },
        { id: 3, option: "id()" },
        { id: 4, option: "hex()" }
      ],
      correctAnswer: 3
    }
  ],

  English: [
    {
      question: "Choose the sentence with correct subject–verb agreement:",
      answers: [
        { id: 1, option: "Neither of the answers are correct." },
        { id: 2, option: "Neither of the answers is correct." },
        { id: 3, option: "Neither answers is correct." },
        { id: 4, option: "Neither answer are correct." }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct use of the subjunctive mood:",
      answers: [
        { id: 1, option: "If I was you, I would apologize." },
        { id: 2, option: "If I were you, I would apologize." },
        { id: 3, option: "If I am you, I would apologize." },
        { id: 4, option: "If I be you, I would apologize." }
      ],
      correctAnswer: 2
    },
    {
      question: "Identify the sentence with correct parallelism:",
      answers: [
        { id: 1, option: "She likes reading, to swim, and jogging." },
        { id: 2, option: "She likes reading, swimming, and jogging." },
        { id: 3, option: "She likes to read, swimming, and jog." },
        { id: 4, option: "She likes reading, swim, and to jog." }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct word: He is not only intelligent ___ also hardworking.",
      answers: [
        { id: 1, option: "and" },
        { id: 2, option: "but" },
        { id: 3, option: "also" },
        { id: 4, option: "than" }
      ],
      correctAnswer: 2
    },
    {
      question: "Select the sentence with correct tense sequence:",
      answers: [
        { id: 1, option: "She said that she is tired." },
        { id: 2, option: "She said that she was tired." },
        { id: 3, option: "She says that she was tired." },
        { id: 4, option: "She say that she had tired." }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct meaning of the idiom 'spill the beans':",
      answers: [
        { id: 1, option: "To waste food" },
        { id: 2, option: "To reveal a secret" },
        { id: 3, option: "To make a mess" },
        { id: 4, option: "To cook badly" }
      ],
      correctAnswer: 2
    },
    {
      question: "Identify the correctly punctuated sentence:",
      answers: [
        { id: 1, option: "However I decided to stay." },
        { id: 2, option: "However, I decided to stay." },
        { id: 3, option: "However I, decided to stay." },
        { id: 4, option: "However: I decided to stay." }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct sentence:",
      answers: [
        { id: 1, option: "The committee have made its decision." },
        { id: 2, option: "The committee has made its decision." },
        { id: 3, option: "The committee have made their decision." },
        { id: 4, option: "The committee are making its decision." }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct form: Hardly had he arrived ___ it started raining.",
      answers: [
        { id: 1, option: "than" },
        { id: 2, option: "when" },
        { id: 3, option: "then" },
        { id: 4, option: "while" }
      ],
      correctAnswer: 2
    },
    {
      question: "Select the correct passive voice:",
      answers: [
        { id: 1, option: "Someone has stolen my wallet." },
        { id: 2, option: "My wallet has been stolen." },
        { id: 3, option: "My wallet is stolen by someone." },
        { id: 4, option: "My wallet was stole." }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct word: He has a great ___ for classical music.",
      answers: [
        { id: 1, option: "affect" },
        { id: 2, option: "effect" },
        { id: 3, option: "affection" },
        { id: 4, option: "effective" }
      ],
      correctAnswer: 3
    },
    {
      question: "Choose the correct indirect speech:",
      answers: [
        { id: 1, option: "He said that he will come tomorrow." },
        { id: 2, option: "He said that he would come the next day." },
        { id: 3, option: "He said he comes tomorrow." },
        { id: 4, option: "He said that he comes the next day." }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct sentence with a dangling modifier fixed:",
      answers: [
        { id: 1, option: "Walking down the street, the trees were beautiful." },
        { id: 2, option: "Walking down the street, I admired the beautiful trees." },
        { id: 3, option: "Walking down the street, the beauty of trees impressed me." },
        { id: 4, option: "Walking down the street, beautiful trees." }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct word: She is senior ___ me.",
      answers: [
        { id: 1, option: "than" },
        { id: 2, option: "to" },
        { id: 3, option: "from" },
        { id: 4, option: "with" }
      ],
      correctAnswer: 2
    },
    {
      question: "Identify the correct usage of 'whom':",
      answers: [
        { id: 1, option: "Whom is coming to the party?" },
        { id: 2, option: "Whom did you meet yesterday?" },
        { id: 3, option: "Whom is responsible for this?" },
        { id: 4, option: "Whom wrote this letter?" }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the sentence with correct article usage:",
      answers: [
        { id: 1, option: "He is an university professor." },
        { id: 2, option: "He is a university professor." },
        { id: 3, option: "He is the university professor." },
        { id: 4, option: "He is university professor." }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct word: The news ___ shocking.",
      answers: [
        { id: 1, option: "are" },
        { id: 2, option: "were" },
        { id: 3, option: "is" },
        { id: 4, option: "have been" }
      ],
      correctAnswer: 3
    },
    {
      question: "Choose the correct meaning of the word 'ubiquitous':",
      answers: [
        { id: 1, option: "Rare" },
        { id: 2, option: "Present everywhere" },
        { id: 3, option: "Dangerous" },
        { id: 4, option: "Temporary" }
      ],
      correctAnswer: 2
    },
    {
      question: "Choose the correct sentence:",
      answers: [
        { id: 1, option: "No sooner did he arrive than he left." },
        { id: 2, option: "No sooner he arrived than he left." },
        { id: 3, option: "No sooner did he arrived than he left." },
        { id: 4, option: "No sooner had he arrive than he left." }
      ],
      correctAnswer: 1
    },
    {
      question: "Choose the correct preposition: She insisted ___ paying the bill.",
      answers: [
        { id: 1, option: "in" },
        { id: 2, option: "on" },
        { id: 3, option: "for" },
        { id: 4, option: "about" }
      ],
      correctAnswer: 2
    }
  ],

  Maths: [
    {
      question: "If f(x) = 2x + 3 and f⁻¹(x) is its inverse, what is f⁻¹(7)?",
      answers: [
        { id: 1, option: "1" },
        { id: 2, option: "2" },
        { id: 3, option: "3" },
        { id: 4, option: "4" }
      ],
      correctAnswer: 2
    },
    {
      question: "What is the value of x if log₂(x) = 5?",
      answers: [
        { id: 1, option: "10" },
        { id: 2, option: "16" },
        { id: 3, option: "25" },
        { id: 4, option: "32" }
      ],
      correctAnswer: 4
    },
    {
      question: "If sin θ = 1/2 and 0° < θ < 90°, find cos θ.",
      answers: [
        { id: 1, option: "√3/2" },
        { id: 2, option: "1/2" },
        { id: 3, option: "√2/2" },
        { id: 4, option: "1" }
      ],
      correctAnswer: 1
    },
    {
      question: "What is the determinant of the matrix [[1,2],[3,4]]?",
      answers: [
        { id: 1, option: "2" },
        { id: 2, option: "-2" },
        { id: 3, option: "10" },
        { id: 4, option: "-10" }
      ],
      correctAnswer: 2
    },
    {
      question: "How many solutions does the equation x² + 4x + 4 = 0 have?",
      answers: [
        { id: 1, option: "0" },
        { id: 2, option: "1" },
        { id: 3, option: "2" },
        { id: 4, option: "Infinite" }
      ],
      correctAnswer: 2
    },
    {
      question: "What is the sum of first 50 natural numbers?",
      answers: [
        { id: 1, option: "1225" },
        { id: 2, option: "1250" },
        { id: 3, option: "1275" },
        { id: 4, option: "1300" }
      ],
      correctAnswer: 1
    },
    {
      question: "If the probability of an event is 0.3, what is the probability of its complement?",
      answers: [
        { id: 1, option: "0.7" },
        { id: 2, option: "0.3" },
        { id: 3, option: "1.3" },
        { id: 4, option: "0" }
      ],
      correctAnswer: 1
    },
    {
      question: "What is the value of ∫ 0 dx?",
      answers: [
        { id: 1, option: "0" },
        { id: 2, option: "C" },
        { id: 3, option: "1" },
        { id: 4, option: "Undefined" }
      ],
      correctAnswer: 2
    },
    {
      question: "If A = {1,2,3} and B = {3,4,5}, what is A ∩ B?",
      answers: [
        { id: 1, option: "{1,2}" },
        { id: 2, option: "{3}" },
        { id: 3, option: "{4,5}" },
        { id: 4, option: "{}" }
      ],
      correctAnswer: 2
    },
    {
      question: "What is the value of |−7|?",
      answers: [
        { id: 1, option: "-7" },
        { id: 2, option: "0" },
        { id: 3, option: "7" },
        { id: 4, option: "1" }
      ],
      correctAnswer: 3
    },
    {
      question: "If the ratio of angles in a triangle is 2:3:4, what is the largest angle?",
      answers: [
        { id: 1, option: "40°" },
        { id: 2, option: "60°" },
        { id: 3, option: "80°" },
        { id: 4, option: "90°" }
      ],
      correctAnswer: 3
    },
    {
      question: "What is the solution of |x| = 5?",
      answers: [
        { id: 1, option: "x = 5" },
        { id: 2, option: "x = -5" },
        { id: 3, option: "x = ±5" },
        { id: 4, option: "x = 0" }
      ],
      correctAnswer: 3
    },
    {
      question: "What is the value of 0! ?",
      answers: [
        { id: 1, option: "0" },
        { id: 2, option: "1" },
        { id: 3, option: "Undefined" },
        { id: 4, option: "Infinity" }
      ],
      correctAnswer: 2
    },
    {
      question: "If x + y = 10 and x − y = 4, what is x?",
      answers: [
        { id: 1, option: "3" },
        { id: 2, option: "7" },
        { id: 3, option: "5" },
        { id: 4, option: "6" }
      ],
      correctAnswer: 2
    },
    {
      question: "What is the next prime number after 29?",
      answers: [
        { id: 1, option: "30" },
        { id: 2, option: "31" },
        { id: 3, option: "33" },
        { id: 4, option: "37" }
      ],
      correctAnswer: 2
    },
    {
      question: "What is the value of sin 90°?",
      answers: [
        { id: 1, option: "0" },
        { id: 2, option: "1" },
        { id: 3, option: "-1" },
        { id: 4, option: "Undefined" }
      ],
      correctAnswer: 2
    },
    {
      question: "If a number is divisible by 9, it must also be divisible by:",
      answers: [
        { id: 1, option: "2" },
        { id: 2, option: "3" },
        { id: 3, option: "6" },
        { id: 4, option: "9 only" }
      ],
      correctAnswer: 2
    },
    {
      question: "What is the value of (a + b)²?",
      answers: [
        { id: 1, option: "a² + b²" },
        { id: 2, option: "a² + 2ab + b²" },
        { id: 3, option: "a² − b²" },
        { id: 4, option: "2a² + 2b²" }
      ],
      correctAnswer: 2
    },
    {
      question: "If the perimeter of a square is 20, what is its area?",
      answers: [
        { id: 1, option: "16" },
        { id: 2, option: "20" },
        { id: 3, option: "25" },
        { id: 4, option: "36" }
      ],
      correctAnswer: 1
    },
    {
      question: "What is the value of √(144)?",
      answers: [
        { id: 1, option: "10" },
        { id: 2, option: "11" },
        { id: 3, option: "12" },
        { id: 4, option: "14" }
      ],
      correctAnswer: 3
    }
  ],

  Chemistry: [
    {
      question: "Which quantum number determines the shape of an orbital?",
      answers: [
        { id: 1, option: "Principal quantum number (n)" },
        { id: 2, option: "Azimuthal quantum number (l)" },
        { id: 3, option: "Magnetic quantum number (m)" },
        { id: 4, option: "Spin quantum number (s)" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which of the following has the highest bond order?",
      answers: [
        { id: 1, option: "O₂" },
        { id: 2, option: "O₂⁺" },
        { id: 3, option: "O₂⁻" },
        { id: 4, option: "O₂²⁻" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which acid is used in the manufacture of fertilizers?",
      answers: [
        { id: 1, option: "Hydrochloric acid" },
        { id: 2, option: "Nitric acid" },
        { id: 3, option: "Sulphuric acid" },
        { id: 4, option: "Acetic acid" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which of the following is NOT a colligative property?",
      answers: [
        { id: 1, option: "Osmotic pressure" },
        { id: 2, option: "Boiling point elevation" },
        { id: 3, option: "Vapour pressure lowering" },
        { id: 4, option: "Surface tension" }
      ],
      correctAnswer: 4
    },
    {
      question: "The hybridization of carbon in ethyne (C₂H₂) is:",
      answers: [
        { id: 1, option: "sp³" },
        { id: 2, option: "sp²" },
        { id: 3, option: "sp" },
        { id: 4, option: "dsp²" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which of the following shows maximum hydrogen bonding?",
      answers: [
        { id: 1, option: "H₂O" },
        { id: 2, option: "NH₃" },
        { id: 3, option: "HF" },
        { id: 4, option: "CH₃OH" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which law states that volume of gas is directly proportional to temperature?",
      answers: [
        { id: 1, option: "Boyle’s law" },
        { id: 2, option: "Charles’ law" },
        { id: 3, option: "Gay-Lussac’s law" },
        { id: 4, option: "Avogadro’s law" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which species acts as a Lewis acid?",
      answers: [
        { id: 1, option: "NH₃" },
        { id: 2, option: "OH⁻" },
        { id: 3, option: "BF₃" },
        { id: 4, option: "H₂O" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which metal is extracted by electrolysis?",
      answers: [
        { id: 1, option: "Iron" },
        { id: 2, option: "Copper" },
        { id: 3, option: "Aluminium" },
        { id: 4, option: "Zinc" }
      ],
      correctAnswer: 3
    },
    {
      question: "What is the oxidation state of sulfur in H₂SO₄?",
      answers: [
        { id: 1, option: "+4" },
        { id: 2, option: "+6" },
        { id: 3, option: "+2" },
        { id: 4, option: "0" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which compound shows geometrical isomerism?",
      answers: [
        { id: 1, option: "Ethane" },
        { id: 2, option: "Ethene" },
        { id: 3, option: "But-2-ene" },
        { id: 4, option: "Methane" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which electrolyte shows maximum conductivity?",
      answers: [
        { id: 1, option: "NaCl" },
        { id: 2, option: "CH₃COOH" },
        { id: 3, option: "HCl" },
        { id: 4, option: "NH₄OH" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which type of reaction is Haber’s process?",
      answers: [
        { id: 1, option: "Endothermic" },
        { id: 2, option: "Exothermic" },
        { id: 3, option: "Neutralization" },
        { id: 4, option: "Photochemical" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which of the following is a strong electrolyte?",
      answers: [
        { id: 1, option: "Glucose" },
        { id: 2, option: "Urea" },
        { id: 3, option: "NaOH" },
        { id: 4, option: "Alcohol" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which orbital is involved in π-bond formation?",
      answers: [
        { id: 1, option: "s–s" },
        { id: 2, option: "s–p" },
        { id: 3, option: "p–p sideways" },
        { id: 4, option: "p–p head-on" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which of the following is an example of a buffer solution?",
      answers: [
        { id: 1, option: "HCl + NaCl" },
        { id: 2, option: "NaOH + NaCl" },
        { id: 3, option: "CH₃COOH + CH₃COONa" },
        { id: 4, option: "H₂SO₄ + Na₂SO₄" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which polymer is biodegradable?",
      answers: [
        { id: 1, option: "PVC" },
        { id: 2, option: "Polythene" },
        { id: 3, option: "Nylon-6" },
        { id: 4, option: "PHBV" }
      ],
      correctAnswer: 4
    },
    {
      question: "Which element has the highest electronegativity?",
      answers: [
        { id: 1, option: "Oxygen" },
        { id: 2, option: "Nitrogen" },
        { id: 3, option: "Fluorine" },
        { id: 4, option: "Chlorine" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which reaction involves transfer of electrons?",
      answers: [
        { id: 1, option: "Neutralization" },
        { id: 2, option: "Precipitation" },
        { id: 3, option: "Redox reaction" },
        { id: 4, option: "Combination reaction" }
      ],
      correctAnswer: 3
    },
    {
      question: "What is the coordination number of Fe in [Fe(CN)₆]³⁻?",
      answers: [
        { id: 1, option: "3" },
        { id: 2, option: "4" },
        { id: 3, option: "5" },
        { id: 4, option: "6" }
      ],
      correctAnswer: 4
    }
  ],

  Physics: [
    {
      question: "Which physical quantity has the same dimensions as torque?",
      answers: [
        { id: 1, option: "Energy" },
        { id: 2, option: "Power" },
        { id: 3, option: "Momentum" },
        { id: 4, option: "Angular velocity" }
      ],
      correctAnswer: 1
    },
    {
      question: "What is the dimensional formula of Planck’s constant?",
      answers: [
        { id: 1, option: "ML²T⁻¹" },
        { id: 2, option: "ML²T⁻²" },
        { id: 3, option: "ML²T⁻¹" },
        { id: 4, option: "MLT⁻¹" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which of the following is a scalar quantity?",
      answers: [
        { id: 1, option: "Velocity" },
        { id: 2, option: "Acceleration" },
        { id: 3, option: "Momentum" },
        { id: 4, option: "Speed" }
      ],
      correctAnswer: 4
    },
    {
      question: "The area under a velocity–time graph represents:",
      answers: [
        { id: 1, option: "Acceleration" },
        { id: 2, option: "Displacement" },
        { id: 3, option: "Distance" },
        { id: 4, option: "Force" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which law explains the recoil of a gun?",
      answers: [
        { id: 1, option: "Newton’s First Law" },
        { id: 2, option: "Newton’s Second Law" },
        { id: 3, option: "Newton’s Third Law" },
        { id: 4, option: "Law of Gravitation" }
      ],
      correctAnswer: 3
    },
    {
      question: "What happens to the time period of a pendulum on the Moon?",
      answers: [
        { id: 1, option: "Increases" },
        { id: 2, option: "Decreases" },
        { id: 3, option: "Remains same" },
        { id: 4, option: "Becomes zero" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which quantity remains constant in uniform circular motion?",
      answers: [
        { id: 1, option: "Velocity" },
        { id: 2, option: "Acceleration" },
        { id: 3, option: "Speed" },
        { id: 4, option: "Force" }
      ],
      correctAnswer: 3
    },
    {
      question: "What is the SI unit of electric field?",
      answers: [
        { id: 1, option: "N/C" },
        { id: 2, option: "C/N" },
        { id: 3, option: "J/C" },
        { id: 4, option: "V·s" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which material is used as the core of a transformer?",
      answers: [
        { id: 1, option: "Copper" },
        { id: 2, option: "Aluminium" },
        { id: 3, option: "Soft iron" },
        { id: 4, option: "Steel" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which wave does NOT require a medium to propagate?",
      answers: [
        { id: 1, option: "Sound wave" },
        { id: 2, option: "Water wave" },
        { id: 3, option: "Electromagnetic wave" },
        { id: 4, option: "Seismic wave" }
      ],
      correctAnswer: 3
    },
    {
      question: "What is the value of work done in uniform circular motion?",
      answers: [
        { id: 1, option: "Maximum" },
        { id: 2, option: "Minimum" },
        { id: 3, option: "Zero" },
        { id: 4, option: "Infinite" }
      ],
      correctAnswer: 3
    },
    {
      question: "Which phenomenon explains the blue color of the sky?",
      answers: [
        { id: 1, option: "Reflection" },
        { id: 2, option: "Refraction" },
        { id: 3, option: "Diffraction" },
        { id: 4, option: "Scattering" }
      ],
      correctAnswer: 4
    },
    {
      question: "Which device converts AC to DC?",
      answers: [
        { id: 1, option: "Transformer" },
        { id: 2, option: "Rectifier" },
        { id: 3, option: "Generator" },
        { id: 4, option: "Inductor" }
      ],
      correctAnswer: 2
    },
    {
      question: "What happens to resistance when temperature of a conductor increases?",
      answers: [
        { id: 1, option: "Decreases" },
        { id: 2, option: "Becomes zero" },
        { id: 3, option: "Remains constant" },
        { id: 4, option: "Increases" }
      ],
      correctAnswer: 4
    },
    {
      question: "Which particle has maximum penetrating power?",
      answers: [
        { id: 1, option: "Alpha particle" },
        { id: 2, option: "Beta particle" },
        { id: 3, option: "Gamma ray" },
        { id: 4, option: "Electron" }
      ],
      correctAnswer: 3
    },
    {
      question: "What is the nature of image formed by a plane mirror?",
      answers: [
        { id: 1, option: "Real and inverted" },
        { id: 2, option: "Virtual and erect" },
        { id: 3, option: "Real and erect" },
        { id: 4, option: "Virtual and inverted" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which law gives the relation between current and voltage?",
      answers: [
        { id: 1, option: "Ohm’s Law" },
        { id: 2, option: "Faraday’s Law" },
        { id: 3, option: "Coulomb’s Law" },
        { id: 4, option: "Kirchhoff’s Law" }
      ],
      correctAnswer: 1
    },
    {
      question: "Which effect explains emission of electrons from a metal surface?",
      answers: [
        { id: 1, option: "Thermionic effect" },
        { id: 2, option: "Photoelectric effect" },
        { id: 3, option: "Compton effect" },
        { id: 4, option: "Hall effect" }
      ],
      correctAnswer: 2
    },
    {
      question: "Which instrument is used to measure potential difference?",
      answers: [
        { id: 1, option: "Ammeter" },
        { id: 2, option: "Galvanometer" },
        { id: 3, option: "Voltmeter" },
        { id: 4, option: "Ohmmeter" }
      ],
      correctAnswer: 3
    },
    {
      question: "What is the escape velocity of Earth approximately?",
      answers: [
        { id: 1, option: "7.9 km/s" },
        { id: 2, option: "9.8 km/s" },
        { id: 3, option: "11.2 km/s" },
        { id: 4, option: "15 km/s" }
      ],
      correctAnswer: 3
    }
  ]
};

let quizzData = subjects[currentSubject] || subjects.HTML;

subjectSelect.value = currentSubject;
modalTitle.textContent = `${currentSubject} Quiz`;
totalMcqsText.textContent = `Total MCQs (${currentSubject}): ${quizzData.length}`;

subjectSelect.addEventListener("change", () => {
  currentSubject = subjectSelect.value;
  localStorage.setItem("current_subject", currentSubject);

  quizzData = subjects[currentSubject];
  modalTitle.textContent = `${currentSubject} Quiz`;
  totalMcqsText.textContent = `Total MCQs (${currentSubject}): ${quizzData.length}`;

  localStorage.removeItem("quiz_state");
});

function loadQuestion() {
  locked = false;

  const currentQuestion = quizzData[currentIndex];

  progressText.textContent = `${currentIndex + 1}/${quizzData.length}`;
  questionEl.textContent = currentQuestion.question;

  optionsEl.innerHTML = "";

  currentQuestion.answers.forEach((ans) => {
    const label = document.createElement("label");
    label.classList.add("option");
    label.dataset.id = ans.id;

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = ans.id;

    label.appendChild(radio);
    label.append(" " + ans.option);

    optionsEl.appendChild(label);
  });

  const nextBtn = document.querySelector(".next-btn");
  nextBtn.textContent =
    currentIndex === quizzData.length - 1 ? "Finish" : "Next";
}

/* ✅ TIMER */
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateTimerUI() {
  timerText.textContent = formatTime(timerSeconds);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function startTimer() {
  stopTimer();
  updateTimerUI();

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerUI();
    saveQuizState();

    if (timerSeconds <= 0) {
      stopTimer();
      showResult(true);
    }
  }, 1000);
}

/* ✅ Result */
function showResult(isTimeUp = false) {
  quizForm.classList.add("hidden");
  resultBox.classList.remove("hidden");

  if (attempted === 0) {
    finalScore.textContent = isTimeUp
      ? `Time Up ⏰ You didn't attempt any question.`
      : `You didn't attempt any question.`;
  } else {
    finalScore.textContent = isTimeUp
      ? `Time Up ⏰ You scored ${score} out of ${attempted}.`
      : `You scored ${score} out of ${quizzData.length}.`;
  }

  localStorage.removeItem("quiz_state");
}

function saveQuizState() {
  const state = {
    subject: currentSubject,
    currentIndex,
    score,
    attempted,
    timerSeconds,
    modalOpen: !quizModal.classList.contains("hidden")
  };
  localStorage.setItem("quiz_state", JSON.stringify(state));
}

function loadQuizState() {
  const saved = localStorage.getItem("quiz_state");
  if (!saved) return false;

  const state = JSON.parse(saved);

  if (state.subject && subjects[state.subject]) {
    currentSubject = state.subject;
    subjectSelect.value = currentSubject;
    quizzData = subjects[currentSubject];
    modalTitle.textContent = `${currentSubject} Quiz`;
    totalMcqsText.textContent = `Total MCQs (${currentSubject}): ${quizzData.length}`;
  }

  currentIndex = state.currentIndex ?? 0;
  score = state.score ?? 0;
  attempted = state.attempted ?? 0;
  timerSeconds = state.timerSeconds ?? 8 * 60;

  if (state.modalOpen) {
    openModal();
    resultBox.classList.add("hidden");
    quizForm.classList.remove("hidden");
    loadQuestion();
    startTimer();
  } else {
    updateTimerUI();
  }

  return true;
}

/* ✅ Modal */
function openModal() {
  quizModal.classList.remove("hidden");
}

function closeModalFunc() {
  quizModal.classList.add("hidden");
}

/* ✅ Reset Quiz */
function resetQuiz() {
  currentIndex = 0;
  score = 0;
  attempted = 0;
  timerSeconds = 8 * 60;

  resultBox.classList.add("hidden");
  quizForm.classList.remove("hidden");

  loadQuestion();
  updateTimerUI();
  saveQuizState();
}

startbtn.addEventListener("click", () => {
  openModal();
  resetQuiz();
  startTimer();
});

closeModal.addEventListener("click", () => {
  closeModalFunc();
  stopTimer();
  saveQuizState();
});

closeResultBtn.addEventListener("click", () => {
  closeModalFunc();
  stopTimer();
  saveQuizState();
});

restartBtn.addEventListener("click", () => {
  resetQuiz();
  startTimer();
});

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (locked) return;
  locked = true;

  const selected = document.querySelector('input[name="answer"]:checked');

  if (!selected) {
    alert("Select one option!");
    locked = false;
    return;
  }

  const selectedAnswer = Number(selected.value);
  const correctAnswer = quizzData[currentIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  attempted++;
  saveQuizState();

  setTimeout(() => {
    currentIndex++;

    if (currentIndex < quizzData.length) {
      loadQuestion();
    } else {
      showResult(false);
    }
  }, 400);
});

loadQuizState();
