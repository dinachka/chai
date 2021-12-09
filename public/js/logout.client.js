const logoutLink = document.querySelector('#logout-link');

// if (logoutLink) {
//   logoutLink.addEventListener('click', async (event) => {
//     event.preventDefault();
//     const response = await fetch('/logout');
//     const data = await response.json();
//     if (data.status) {
//       alert(data.message);
//       window.location.href = '/';
//     } else {
//       alert(data.message);
//     }
//   });
// }

logoutLink.addEventListener('click', async (event) => {
  event.preventDefault();
  const response = await fetch('/logout');
  const data = await response.json();
  if (data.status) {
    alert(data.message);
    window.location.href = '/';
  } else {
    alert(data.message);
  }
})
