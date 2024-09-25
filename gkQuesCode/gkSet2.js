const question = [
    {
        'ques':'What chemical element is designated as “Hg”?',
        'a':'Silver',
        'b':'Tin',
        'c':'Copper',
        'd':'Mercury',
        'Correct':'d'
    },
    {
        'ques':'In what year was the first international modern Olympiad held?',
        'a':'1896',
        'b':'1900',
        'c':'1912',
        'd':'1924',
        "Correct":'a'
    },
    {
        'ques':'For which of these disciplines Nobel Prize is awarded?',
        'a':'Physics, Chemistry',
        'b':'Physiology',
        'c':'Medicine',
        'd':'All of the above',
        "Correct":'d'
    },
    {
        'ques':'Entomology is the science that studies',
        'a':'Behavior of human beings',
        'b':'Insects',
        'c':'The origin and history of technical and scientific terms',
        'd':'The formation of rocks',
        "Correct":'b'
    },
    {
        'ques':"Hitler's party is known as:",
        'a':'Labour Party',
        'b':'Nazi Party',
        'c':'Ku-Klux-Klan',
        'd':'Democratic Party',
        'Correct':'b'
    },
    {
        'ques':'For which Galileo is famous?',
        'a':'Developed the telescope',
        'b':'Discovered four satellites of Jupiter',
        'c':'Found that the swinging motion of the pendulum results in consistent time measurement.',
        'd':'All of the above',
        'Correct':'d'
    },
    {
        'ques':'When the First Afghan War took place in',
        'a':'1839',
        'b':'1843',
        'c':'1833',
        'd':'1848',
        'Correct':'a'
    },
    {
        'ques':'Ecology deals with',
        'a':'Birds',
        'b':'Cell formation',
        'c':'Relation between organisms and their environment',
        'd':'Tissues',
        'Correct':'c'
    },
    {
        'ques':'Which is the largest island?',
        'a':'New Guinea',
        'b':'Andaman Nicobar',
        'c':'Saturn',
        'd':'Hawaii',
        'Correct':'c'
    },
    {
        'ques':'Which one is the hottest continent?',
        'a':'Africa',
        'b':'South Asia',
        'c':'North America',
        'd':'Australia',
        'Correct':'a'
    },
];

const answer =[
    {
        'ans' : 'Mercury'
    },
    {
        'ans' : '1896'
    },
    {
        'ans' : 'All of the above'
    },
    {
        'ans' : 'Insects'
    },
    {
        'ans' : 'Nazi Party'
    },
    {
        'ans' : 'All of the above'
    },
    {
        'ans' : '1839'
    },
    {
        'ans' : 'Cell formation'
    },
    {
        'ans' : 'Saturn'
    },
    {
        'ans' : 'Africa'
    },
]

let index = 0;
let total = question.length;
let correct = 0, wrong = 0;
const quesbox = document.getElementById('quesbox');
const optionInputs = document.querySelectorAll('.option');

// This will store the selected answers for each question
let selectedAnswers = new Array(total).fill(null);

// Load the question on the screen
const loadQuestion = () => {
    if (index < 0) index = 0;
    if (index >= total) return endQuiz();

    reset();

    const data = question[index];
    quesbox.innerText = `${index + 1}) ${data.ques}`;
    optionInputs[0].nextElementSibling.innerText = data.a;
    optionInputs[1].nextElementSibling.innerText = data.b;
    optionInputs[2].nextElementSibling.innerText = data.c;
    optionInputs[3].nextElementSibling.innerText = data.d;

    // Pre-select the answer if it was previously chosen
    if (selectedAnswers[index]) {
        optionInputs.forEach((input) => {
            if (input.value === selectedAnswers[index].answer) {
                input.checked = true;
            }
        });
    }
};

// Save the current answer
const saveAnswer = () => {
    let answer;
    optionInputs.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
};

// Submit the current question's answer
document.querySelector("#submit").addEventListener("click", function() {
    const currentAnswer = saveAnswer();
    const data = question[index];
    
    // If the answer has been changed, update the selectedAnswers array
    if (currentAnswer) {
        if (selectedAnswers[index] && selectedAnswers[index].answer !== currentAnswer) {
            // If changing from a wrong answer to the correct answer
            if (selectedAnswers[index].answer !== data.Correct && currentAnswer === data.Correct) {
                correct++;
                wrong--;
            }
            // If changing from the correct answer to a wrong answer
            else if (selectedAnswers[index].answer === data.Correct && currentAnswer !== data.Correct) {
                correct--;
                wrong++;
            }
            selectedAnswers[index] = { answer: currentAnswer };
        } else if (!selectedAnswers[index]) {
            // Add the answer if it's not already in the array
            selectedAnswers[index] = { answer: currentAnswer };
            if (currentAnswer === data.Correct) {
                correct++;
            } else {
                wrong++;
            }
        }
    }

    index++;
    loadQuestion();
});

// Move to the next question
document.querySelector("#next").addEventListener("click", function() {
    saveAnswer();  // Save current answer before moving to the next question
    index++;
    loadQuestion();
});

// Move to the previous question
document.querySelector("#prev").addEventListener("click", function() {
    saveAnswer();  // Save current answer before moving to the previous question
    index--;
    loadQuestion();
});

// Reset the selected options
const reset = () => {
    optionInputs.forEach((input) => {
        input.checked = false;
    });
};

// End the quiz and display the result
const endQuiz = () => {

    // Map over the `question` array to display the user's answers along with the correct answers
    const resultDisplay = question.map((q, index) => {
        const userAnswer = selectedAnswers[index] ? selectedAnswers[index].answer : "No answer selected";
        const correctAnswer = q[q.Correct]; // Access correct answer using the key stored in 'Correct'
        
        // Display the question, user's answer, and correct answer (if wrong)
        return `
            <p>
                <strong>Q${index + 1}:</strong> ${q.ques}<br>
                <strong>Your Answer:</strong> ${userAnswer} <br>
                ${userAnswer !== correctAnswer ? `<strong>Correct Answer:</strong> ${correctAnswer}` : ""}
            </p>
        `;
    }).join(""); // Join all the answers into a single string

    // Display the final result
    document.getElementById('box').innerHTML = `
    <div style="text-align: center">
        <h3>Thank you for playing the quiz!</h3>
        <h2>${correct} / ${total} are correct</h2>
        <div>
            <h3>Your Results:</h3>
            ${resultDisplay}
        </div>
    </div>
    `;
};

loadQuestion();
