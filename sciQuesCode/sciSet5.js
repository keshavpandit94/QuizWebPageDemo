const question = [
    {
        'ques':'In what year did the Great October Socialist Revolution take place?',
        'a':'1917',
        'b':'1923',
        'c':'1914',
        'd':'1920',
        'Correct':'a'
    },
    {
        'ques':'What is the largest lake in the world?',
        'a':'Caspian Sea',
        'b':'Baikal',
        'c':'Lake Superior',
        'd':'Ontario',
        "Correct":'b'
    },
    {
        'ques':'Which planet in the solar system is known as the “Red Planet”?',
        'a':'Venus',
        'b':'Earth',
        'c':'Mars',
        'd':'Jupiter',
        "Correct":'c'
    },
    {
        'ques':'Who wrote the novel “War and Peace”?',
        'a':'Anton Chekhov',
        'b':'Fyodor Dostoevsky',
        'c':'Leo Tolstoy',
        'd':'Ivan Turgenev',
        "Correct":'c'
    },
    {
        'ques':'What is the capital of Japan?',
        'a':'Beijing',
        'b':'Tokyo',
        'c':'Seoul',
        'd':'Bangkok',
        'Correct':'b'
    },
    {
        'ques':'Which river is the longest in the world?',
        'a':'Amazon',
        'b':'Mississippi',
        'c':'Nile',
        'd':'Yangtze',
        'Correct':'c'
    },
    {
        'ques':'What gas is used to extinguish fires?',
        'a':'Oxygen',
        'b':'Nitrogen',
        'c':'Carbon dioxide',
        'd':'Hydrogen',
        'Correct':'b'
    },
    {
        'ques':'What animal is the national symbol of Australia?',
        'a':'Kangaroo',
        'b':'Koala',
        'c':'Emu',
        'd':'Crocodile',
        'Correct':'a'
    },
    {
        'ques':'Which of the following planets is not a gas giant?',
        'a':'Mars',
        'b':'Jupiter',
        'c':'Saturn',
        'd':'Uranus',
        'Correct':'a'
    },
    {
        'ques':'What is the name of the process by which plants convert sunlight into energy?',
        'a':'Respiration',
        'b':'Photosynthesis',
        'c':'Oxidation',
        'd':'Evolution',
        'Correct':'b'
    },
];

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
    document.getElementById('box').innerHTML = `
    <div style="text-align: center">
        <h3>Thank you for playing the quiz!</h3>
        <h2>${correct} / ${total} are correct</h2>
    </div>
    `;
};

loadQuestion();
