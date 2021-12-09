const userMessage = document.querySelector('.response');

document.loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  const body = {
    username: form.username.value,
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
  console.log(data);

  if (data.login) {
    userMessage.innerText = 'Вы вошли успешно';
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  } else {
    userMessage.innerText = data.message;
  }
});
