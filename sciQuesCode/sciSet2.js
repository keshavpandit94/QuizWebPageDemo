const question = [
    {
        'ques':'When is World Ozone Day observed?',
        'a':'September 16',
        'b':'September 27',
        'c':'October 16',
        'd':'October 17',
        'Correct':'a'
    },
    {
        'ques':'Which of the following countries is not the member of the Nuclear Suppliers Group?',
        'a':'Argentina',
        'b':'Belgium',
        'c':'Canada',
        'd':'Iran',
        "Correct":'d'
    },
    {
        'ques':'Which one of the following does not belong to the Millennium Goals set by UNO?',
        'a':'Gravimeter',
        'b':'Hydrometer',
        'c':'Hygrometer',
        'd':'Hypsometer',
        "Correct":'b'
    },
    {
        'ques':'Which spacecraft was the first to land on the Moon?',
        'a':'Apollo 10',
        'b':'Apollo 11',
        'c':'Apollo 13',
        'd':'Sputnik',
        "Correct":'b'
    },
    {
        'ques':'Who discovered antiseptic surgery?',
        'a':'Alexander Fleming',
        'b':'Edward Jenner',
        'c':'Joseph Lister',
        'd':'Louis Pasteur',
        'Correct':'c'
    },
    {
        'ques':'Which of the following uses radio waves to determine the range, altitude, direction, or speed of objects?',
        'a':'Lidar',
        'b':'LORAN',
        'c':'Radar',
        'd':'Sonar',
        'Correct':'c'
    },
    {
        'ques':'Which one of the following prevents bleeding?',
        'a':'Leukocytes',
        'b':'Lymphocytes',
        'c':'Neutrophils',
        'd':'Platelets',
        'Correct':'d'
    },
    {
        'ques':'What is the purpose of sphygmomanometer?',
        'a':'To measure blood pressure',
        'b':'To measure hypertension',
        'c':'To measure body temperature',
        'd':'To measure heart beat',
        'Correct':'a'
    },
    {
        'ques':'When is the World Diabetes Day observed?',
        'a':'November 6',
        'b':'November 10',
        'c':'November 14',
        'd':'November 19',
        'Correct':'c'
    },
    {
        'ques':'Under which one of the following comes the National River Conservation Directorate?',
        'a':'Ministry of Earth Sciences',
        'b':'Ministry of Agriculture',
        'c':'Ministry of Environment and Forests',
        'd':'Ministry of Water Resources',
        'Correct':'c'
    },
];
const answer =[
    {
        'ans' : 'September 16'
    },
    {
        'ans' : 'Iran'
    },
    {
        'ans' : 'Hydrometer'
    },
    {
        'ans' : 'Apollo 11'
    },
    {
        'ans' : 'Joseph Lister'
    },
    {
        'ans' : 'Radar'
    },
    {
        'ans' : 'Platelets'
    },
    {
        'ans' : 'To measure blood pressure'
    },
    {
        'ans' : 'November 14'
    },
    {
        'ans' : 'Ministry of Environment and Forests'
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
