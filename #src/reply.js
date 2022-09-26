export default class Reply {
 static renderReply(btn) {
  const idQuestion = btn.id;

  fetch('https://askme-f6478-default-rtdb.firebaseio.com/:questions.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'     
    }
  })
    .then(response => response.json())
    .then(data => data[idQuestion].reply)
    .then(reply => {
      const replyHTML = document.createElement('div');
      replyHTML.classList.add('reply')

      if(!reply) {
        replyHTML.innerHTML = 'Ответа на данный вопрос пока что нет';
      } else {
        replyHTML.innerHTML = reply;
      }

      const parentBlock = btn.closest('.questions__item');
      parentBlock.append(replyHTML);
    })
 }

 static getReplyForm(btn) {
  const idQuestion = btn.id;

  return `<form class='form-reply'>
            <input type='text' class='input' placeholder='Введите ответ на вопрос'>
            <input type="submit" class='button' value='Ответить' id='${idQuestion}'>
          </form>`;
 }

 static setReply(reply, idQuestion) {
    fetch('https://askme-f6478-default-rtdb.firebaseio.com/:questions.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    .then(response => response.json())
    .then(data => data[idQuestion])
    .then(dataOfQuestion => {
      dataOfQuestion.reply = reply;
      const question = {};

      question[idQuestion] = dataOfQuestion;

      fetch('https://askme-f6478-default-rtdb.firebaseio.com/:questions.json', {
          method: 'PATCH',
          body: JSON.stringify(question),
          headers: {
            'Content-Type': 'application/json' 
          }
        })
      })
 }
}