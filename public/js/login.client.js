// const loginBtn = document.querySelector('#loginBtn');

document.loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = event.target;
  const body = {
    login: form.login.value,
    password: form.password.value,
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/login', options);
  const data = await response.json();

  const userMessage = document.querySelector('.response');
  if(data) {
    userMessage.innerText = 'Вы вошли успешно';
  } else {
    userMessage.innerText = data.message;
  }
})
