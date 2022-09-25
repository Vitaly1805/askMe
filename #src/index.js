import './style.css';
import { isValid } from './utils';
import { createModal, delModal } from './modal';
import Question from './qustion';
import { getFormAuth, authWithEmailAndPassword, setErrorAuth } from './auth';

const form = document.querySelector('.question-form');
const input = form.querySelector('.input');
const modalBtn = document.querySelector('.modal-create');


form.addEventListener('submit', submitQuestionFormHandler);
window.addEventListener('load', Question.renderQuestions);
modalBtn.addEventListener('click', openModel)

function openModel() {
  createModal('Авторизация', getFormAuth());
  document
        .querySelector('.modal__form')
        .addEventListener('submit', authFormHandler);
}

export function authFormHandler(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  authWithEmailAndPassword(email, password)
    .then(token => {
      delModal();
      return Question.renderQuestionsFromFirebase(token);
    })
    .then(rend => createModal('Список вопросов', rend))
    .catch(setErrorAuth);
}

function submitQuestionFormHandler(event) {
  event.preventDefault();

  if(isValid(input.value)) {
    const question = {
      date: new Date().toJSON(),
      text: input.value
    }

    input.value = ''
  
    Question.addQuestion(question);
    Question.renderQuestions(question);
  }
}

