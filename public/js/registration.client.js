const checkbox = document.getElementById('isAdmin');

const label = document.createElement('label');
label.innerText = 'Введите ключевое слово';
label.for = 'keyWord';

const input = document.createElement('input');
input.id = 'keyWord';
input.type = 'text';
input.name = 'keyword';

checkbox?.addEventListener('click', (event) => {
  const adminbox = document.getElementById('admin_reg');
  adminbox.appendChild(label);
  adminbox.appendChild(input);
});

document.registrationForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  console.log(registrationForm);

  const {
    username, email, password, checkUserPassword, action,
  } = event.target;

  console.log(password);

  if (password.value === checkUserPassword.value) {
    const response = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        repeatPassword: checkUserPassword.value,
        password: password.value,
        // role: role.value,
      }),
    });

    const data = await response.json();
    if (data.UserRegistered) {
      alert(data.message);
      window.location.href = '/';
    } else {
      alert(data.message);
      //window.location.href = data.path;
    }
  } else {
    alert('Пароли не совпадают, повторите ввод');
  }
});
