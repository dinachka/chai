const checkbox = document.getElementById('isAdmin');

checkbox.addEventListener('click', (event) => {
  const label = document.createElement('label');
  label.innerText = 'Введите ключевое слово';
  label.for = 'keyWord';

  const input = document.createElement('input');
  input.id = 'keyWord';
  input.type = 'text';
  input.name = 'keyword';

  const adminbox = document.getElementById('admin_reg');
  adminbox.appendChild(label);
  adminbox.appendChild(input);
  // document.body.appendChild(input);
});

// const userMessage = document.querySelector('.response');

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
  // {
  //   userMessage.innerText = 'Вы вошли успешно';
  //   setTimeout(() => {
  //     window.location.href = '/';
  //   }, 2000);
  // } else {
  //   userMessage.innerText = data.message;
  // }
    alert(data.message);
    window.location.href = '/';
  } else {
    alert(data.message);
  }
});
