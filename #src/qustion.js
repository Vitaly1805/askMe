export default class Question {
  static questionsHTML = document.querySelector('.questions');

  static addQuestion(question) {
    Question.#addQuestionToLocaleStorage(question);
    Question.#addQuestionToFirebase(question);
  }

  static renderQuestions() {
    let questions  = Question.#getQuestionsFromLocaleStorage();

    Question.questionsHTML.innerHTML = questions.map(q => {
      return `<div class="questions__item">
                <div class="questions__date">
                  ${new Date(q.date).toLocaleDateString()}
                  ${new Date(q.date).toLocaleTimeString()}
                </div>
                <div class="questions__text">
                  ${q.text}
                </div>
              </div>`
    }).join('');
  }

  static #addQuestionToFirebase(question) {
    fetch('https://askme-f6478-default-rtdb.firebaseio.com/:questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json' 
      }
    })
  }

  static #addQuestionToLocaleStorage(question) {
    let questions = Question.#getQuestionsFromLocaleStorage()
    
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
    Question.#renderQuestion(question);
  }

  static #getQuestionsFromLocaleStorage() {
    let result = localStorage.getItem('questions') || [];
    return typeof result === 'string' ? JSON.parse(result) : result;
  }

  static #renderQuestion(question) {
    Question.questionsHTML.innerHTML += `<div class="questions__item">
                                <div class="questions__date">
                                  ${new Date(question.date).toLocaleDateString()}
                                  ${new Date(question.date).toLocaleTimeString()}
                                </div>
                                <div class="questions__text">
                                  ${question.text}
                                </div>
                              </div>`
  }

  static renderQuestionsFromFirebase(token) {
    if(!token) {
      return '<p>Вопросов пока что нет!</p>';
    }

    return fetch(`https://askme-f6478-default-rtdb.firebaseio.com/:questions.json?auth=${token}`)
      .then(response => response.json())
      .then(data => {
        return Object.values(data).map(q => `<div class="questions__item">
        <div class="questions__date">
          ${new Date(q.date).toLocaleDateString()}
          ${new Date(q.date).toLocaleTimeString()}
        </div>
        <div class="questions__text">
          ${q.text}
        </div>
      </div>`).join('');
      });
  }
}