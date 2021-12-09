const arrGlobalCoordinates = [];

window.addEventListener('load', async (event) => {
  const response = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
  data.coordinates.forEach((element) => {
    const obj = {};
    obj.coords = [+element.latitude, +element.longitude];
    arrGlobalCoordinates.push(obj);
  });
  console.log(arrGlobalCoordinates);
});


ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map("map", {
    center: [35.76, 37.64],
    zoom: 2,
  });
  myMap.events.add('click', (event) => {
    const clickCoords = event.get('coords');

    function getAddress(coords) {
      myPlacemark.properties.set('iconCaption', 'поиск...');
      ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);

        myPlacemark.properties
          .set({
            // Формируем строку с данными об объекте.
            iconCaption: [
              // Название населенного пункта или вышестоящее административно-территориальное образование.
              firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
              // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
            ].filter(Boolean).join(', '),
            // В качестве контента балуна задаем строку с адресом объекта.
            balloonContent: firstGeoObject.getAddressLine(),
          });
      });
    }

    function createPlacemark(coords) {
      return new ymaps.Placemark(coords, {
        iconCaption: 'поиск...',
      }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
      });
    }

    const myPlacemark = createPlacemark(clickCoords);
    myMap.geoObjects.add(myPlacemark);

    getAddress(clickCoords);
    // console.log(clickCoords);
    document.addArticle.latitude.value = clickCoords[0];
    document.addArticle.longitude.value = clickCoords[1];
  });
};

