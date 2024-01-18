const startButton = document.getElementById('start')
const nextButton = document.getElementById('next')
const questionContainerElement = document.getElementById('container-intrebare')
const questionElement = document.getElementById('intrebare')
const answerButtonsElement = document.getElementById('butoane-raspuns')

let shuffledQuestions, currentQuestionIndex, corectAnswersCount
const corectCountElement = document.getElementById('corect-count')

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

function startGame(){
 startButton.classList.add('hide')
 shuffledQuestions = questions.sort(() => Math.random() -.5)
 currentQuestionIndex = 0;
 corectAnswersCount = 0;
 questionContainerElement.classList.remove('hide')
 corectCountElement.textContent = corectAnswersCount;
 nextQuestion();
}

function nextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
 questionElement.innerText = question.question
 answerButtonsElement.classList.remove('hide');
 question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('buton')
    if (answer.corect) {
        button.dataset.corect = answer.corect
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
 })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const iscorect = selectedButton.dataset.corect === 'true';

    setStatusClass(document.body, iscorect);

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.corect === 'true');
    });

    if (iscorect) {
        corectAnswersCount++;
        corectCountElement.textContent = corectAnswersCount;
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        alert(`You got ${corectAnswersCount} correct answers out of ${questions.length} questions.`);
        alert("There are no more questions. Press 'Restart' to play again.");
    }
}

function setStatusClass(element, corect){
    clearStatusClass(element)
    if(corect){
        element.classList.add('corect')
    } 

    else {
        element.classList.add('gresit')
    }
}

function clearStatusClass(element){

        element.classList.remove('corect')
        element.classList.remove('gresit')
    }


const questions = [
    {
        question: '2+2',
        answers:[
            { text: '4', corect: true },
            { text: '22', corect: false },
            { text: '69', corect: false},
            { text: '123', corect: false}
        ]
    },
    {
        question: 'What is the capital of Japan?',
        answers: [
            { text: 'Beijing', corect: false },
            { text: 'Tokyo', corect: true },
            { text: 'Seoul', corect: false },
            { text: 'Bangkok', corect: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Mars', corect: true },
            { text: 'Venus', corect: false },
            { text: 'Jupiter', corect: false },
            { text: 'Mercury', corect: false }
        ]
    },
    {
        question: 'What is the largest mammal?',
        answers: [
            { text: 'Elephant', corect: false },
            { text: 'Blue Whale', corect: true },
            { text: 'Giraffe', corect: false },
            { text: 'Hippopotamus', corect: false }
        ]
    },
    {
        question: 'In what year did the Titanic sink?',
        answers: [
            { text: '1912', corect: true },
            { text: '1920', corect: false },
            { text: '1905', corect: false },
            { text: '1935', corect: false }
        ]
    },
    {
        question: 'Which element has the chemical symbol "O"?',
        answers: [
            { text: 'Oxygen', corect: true },
            { text: 'Gold', corect: false },
            { text: 'Carbon', corect: false },
            { text: 'Iron', corect: false }
        ]
    },
    {
        question: 'What is the largest ocean on Earth?',
        answers: [
            { text: 'Atlantic Ocean', corect: false },
            { text: 'Indian Ocean', corect: false },
            { text: 'Southern Ocean', corect: false },
            { text: 'Pacific Ocean', corect: true }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', corect: true },
            { text: 'Berlin', corect: false },
            { text: 'Madrid', corect: false },
            { text: 'Rome', corect: false }
        ]
    },
    {
        question: 'In what year did World War II end?',
        answers: [
            { text: '1945', corect: true },
            { text: '1939', corect: false },
            { text: '1941', corect: false },
            { text: '1950', corect: false }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Jupiter', corect: true },
            { text: 'Mars', corect: false },
            { text: 'Earth', corect: false },
            { text: 'Saturn', corect: false }
        ]
    }
];