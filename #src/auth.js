export function getFormAuth() {
  return `<form method="post" class="modal__form">
    <div class="modal__block-input">
      <label for="email" class="modal__label">Email</label>
      <input type="email" required minlength="6" placeholder="Введите логин" id="email" class="input">
    </div>
    <div class="modal__block-input">
      <label for="password" class="modal__label">Пароль</label>
      <input type="password" required minlength="6" placeholder="Введите пароль" id="password" class="input">
    </div>
    <input type="submit" class="button" value="Войти">
  </form>`
}

export async function authWithEmailAndPassword(email, password) {
  const token = 'AIzaSyCQE9iz6DW4T5bfGcQBTxE3PdELC-1ypCY';

  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQE9iz6DW4T5bfGcQBTxE3PdELC-1ypCY`, {
    method: 'POST',
    body: JSON.stringify({
      email, password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json();

  if(data.error) {
    throw Error('Неверно введен логин или пароль!');
  }

  return data.idToken;
}

export function setErrorAuth(err) {
  if(!document.querySelector('.error')) {
    const error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = err.message;
    document.querySelector('.modal').append(error);
  }
}