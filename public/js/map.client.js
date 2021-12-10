const arrGlobalCoordinates = [];

window.addEventListener('load', async (event) => { // фетч на извлечение из бд координат
  const response = await fetch('http://localhost:3000/home', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  // console.log(data);
  data.coordinates.forEach((element) => {
    const obj = {};
    obj.coords = [+element.latitude, +element.longitude];
    obj.titles = element.title;
    obj.id = element.id;
    arrGlobalCoordinates.push(obj);
  });
  // console.log(arrGlobalCoordinates);
});

ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map('map', { // отрисовка пустой карты
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

    function createPlacemark(coords) { // определяет координаты и
      // присваивает долготу и широту dom элементам
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
    // отрисовка точек на главной странице
    preset: 'islands#yellowGlyphCircleIcon',
    iconGlyph: 'glass',
    draggable: false,
  });

  arrGlobalCoordinates.forEach((points) => {
    const placeMark = new ymaps.Placemark(points.coords, {
      hintContent: points.titles
    });
    myCollection.add(placeMark);
    placeMark.events.add('click', () => {
     window.location.href = `/article/${points.id}`;
    })
    // myCollection.events.add('click', () => {
    //   arrGlobalCoordinates.map((points) => {
    //     window.location.href = `/article/${points.id}`;
    //     console.log(points.id);
    //   });
    // });
  });

  myMap.geoObjects.add(myCollection);


  // myCollection.events.add('click', (e) => {
  //   const objectId = e.get('objectId');
  //   console.log(objectId);
  // });

  console.log(myCollection);
  console.log(arrGlobalCoordinates);

}
