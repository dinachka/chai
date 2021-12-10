const addArticleForm = document.getElementById('addArticle');
// console.log(addArticleForm);
addArticleForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const {
    title, latitude, longitude, description, image, method, action,
  } = event.target;

  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title.value,
      latitude: latitude.value,
      description: description.value,
      longitude: longitude.value,
      image: image.value,
    }),
  });
  const jsonData = await response.json();
  console.log(jsonData);
  if (jsonData.chaiAdded) {
    alert(jsonData.message);
    window.location.href = '/';
  } else {
    alert(jsonData.message);
  }
});

// const chgName = document.getElementById('chg_name');

// document.chgName.addEventListener('submit', async (event) => {
//   event.preventDefault()
//   const { username } = event.target;

//   const response = await fetch(action, {
//     method: 'put',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       username: username.value
//     }),
//   });

//   const jsonData = await response.json();

// })
