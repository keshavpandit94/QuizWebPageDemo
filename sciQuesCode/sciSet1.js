const question = [
    {
        'ques':'What is the scientific name of Laughing Gas?',
        'a':'Nitrous Oxide',
        'b':'Phosphorous Pentoxide',
        'c':'Sodium Bicarbonate',
        'd':'Carbon Tetrachloride',
        'Correct':'a'
    },
    {
        'ques':'What is a young horse called?',
        'a':'Colt',
        'b':'Filly',
        'c':'Foal',
        'd':'Hack',
        "Correct":'c'
    },
    {
        'ques':"Who coined the word Dinosaur for 'terrible lizard'?",
        'a':'Benjamin Waterhouse Hawkins',
        'b':'Georges Cuvier',
        'c':'Gideon Mantell',
        'd':'Richard Owen',
        "Correct":'d'
    },
    {
        'ques':'What term is used to describe the cultivation of plants without soil?',
        'a':'Aeroponics',
        'b':'Aquaponics',
        'c':'Fogponics',
        'd':'Hydroponics',
        "Correct":'c'
    },
    {
        'ques':"What are the brighter areas on the sun's surface called?",
        'a':'Analemma',
        'b':'Corona',
        'c':'Faculae',
        'd':'Nanoflares',
        'Correct':'c'
    },
    {
        'ques':'What did "x" mean in "x-rays"?',
        'a':'Cross',
        'b':'Mark',
        'c':'Star',
        'd':'Unknown',
        'Correct':'d'
    },
    {
        'ques':'In which year was Nobel Prizes awarded first?',
        'a':'1901',
        'b':'1912',
        'c':'1923',
        'd':'1924',
        'Correct':'a'
    },
    {
        'ques':'When is World Forestry Day celebrated?',
        'a':'March 3',
        'b':'March 21',
        'c':'March 22',
        'd':'March 23',
        'Correct':'d'
    },
    {
        'ques':'Which of the following is not a fertiliser product?',
        'a':'Di-ammonium Phosphate',
        'b':'Calcium Carbonate',
        'c':'Nitrogen phosphorous potassium complexes',
        'd':' Urea',
        'Correct':'b'
    },
    {
        'ques':'Which is the first atomic plant established in India?',
        'a':'Kaiga',
        'b':'Kakrapar',
        'c':'Kalpakkam',
        'd':'Tarapur',
        'Correct':'d'
    },
];
const answer =[
    {
        'ans' : 'Nitrous Oxide'
    },
    {
        'ans' : 'Foal'
    },
    {
        'ans' : 'Richard Owen'
    },
    {
        'ans' : 'Fogponics'
    },
    {
        'ans' : 'Faculae'
    },
    {
        'ans' : 'Unknown'
    },
    {
        'ans' : '1901'
    },
    {
        'ans' : 'March 23'
    },
    {
        'ans' : 'Calcium Carbonate'
    },
    {
        'ans' : 'Tarapur'
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
