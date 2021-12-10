const arrGlobalCoordinates = [];

window.addEventListener('load', async (event) => { // фетч на извлечение из бд координат
  const response = await fetch('http://localhost:3000/home', {
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
  const myMap = new ymaps.Map("map", { // отрисовка пустой карты 
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

  const myCollection = new ymaps.GeoObjectCollection({}, {
    preset: 'islands#redIcon',
    draggable: false,
  });

  arrGlobalCoordinates.forEach((points) => {
    myCollection.add(new ymaps.Placemark(points.coords));
  });

  myMap.geoObjects.add(myCollection);
};

