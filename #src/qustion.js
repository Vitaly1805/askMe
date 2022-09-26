export default class Question {
  static questionsHTML = document.querySelector('.questions');

  static addQuestion(question) {
    Question.#addQuestionToFirebase(question)
      .then(response => response.json())
      .then(data => data.name)
      .then(id => Question.#addQuestionToLocaleStorage(question, id));
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
                <div class="reply-show-btn" id="${q.id}">Посмотреть ответ</div>
              </div>`
    }).join('');


  }

  static #addQuestionToFirebase(question) {
    return fetch('https://askme-f6478-default-rtdb.firebaseio.com/:questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json' 
      }
    })
  }

  static #addQuestionToLocaleStorage(question, id) {
    let questions = Question.#getQuestionsFromLocaleStorage()
    
    question.id = id;
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
      return '<p>Нет вопросов, на который Вы не дали ответ!</p>';
    }

    return fetch(`https://askme-f6478-default-rtdb.firebaseio.com/:questions.json`)
      .then(response => response.json())
      .then(data => {
        return Object.keys(data).map(id => { 
          if(!data[id].reply) {
              console.log(data)
              console.log(id)
              return `<div class="questions__item">
                <div class="questions__date"> 
                  ${new Date(data[id].date).toLocaleDateString()}
                  ${new Date(data[id].date).toLocaleTimeString()}
                </div>
                <div class="questions__text">
                  ${data[id].text}
                </div>
                <div class='reply-btn' id="${id}">Ответить</div>
              </div>`;
          }
        }).join('')
      });
  }
}