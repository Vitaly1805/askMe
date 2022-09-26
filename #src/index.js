import './style.css';
import { isValid } from './utils';
import { createModal, delModal } from './modal';
import Question from './qustion';
import Reply from './reply';
import { getFormAuth, authWithEmailAndPassword, setErrorAuth } from './auth';

const form = document.querySelector('.question-form');
const input = form.querySelector('.input');
const modalBtn = document.querySelector('.modal-create');


form.addEventListener('submit', submitQuestionFormHandler);
window.addEventListener('load', () => {
  Question.renderQuestions();

  const replyesBtn = document.querySelectorAll('.reply-show-btn');
  replyesBtn.forEach(showReplyHandler);
});
modalBtn.addEventListener('click', openModel)

function openModel() {
  createModal('Авторизация', getFormAuth());
  document
        .querySelector('.modal__form')
        .addEventListener('submit', authFormHandler);
}

function showReplyHandler(reply) {
  reply.addEventListener('click', () => {
    Reply.renderReply(event.target);
  }, {once: true});
}

function authFormHandler(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  authWithEmailAndPassword(email, password)
    .then(token => {
      delModal();
      return Question.renderQuestionsFromFirebase(token);
    })
    .then(rend => {
      createModal('Список неотвеченных вопросов', rend);

      const replyButtons = document.querySelectorAll('.reply-btn');
      replyButtons.forEach(repBtn => {
        repBtn.addEventListener('click', replyHandler.bind(null, repBtn));
      });
    })
    .catch(setErrorAuth);
}

function replyHandler(repBtn) {
  delModal();
  createModal('Форма ответа на вопрос', Reply.getReplyForm(repBtn));

  const formReply = document.querySelector('.form-reply');
  formReply.addEventListener('submit', appendReplyHandler);
}

function appendReplyHandler(event) {
  event.preventDefault();

  const formReply = event.target;
  const reply = formReply.querySelector('.input').value;

  if(isValid(reply)) {
    const idQuestion = formReply.querySelector('.button').id;
  
    // delModal();
    Reply.setReply(reply, idQuestion);
  }
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