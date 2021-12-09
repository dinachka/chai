/* <script type="text/javascript">
    ymaps.ready(init);
    function init(){
        // Создание карты.
        const myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.76, 37.64],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 7
        });
    }
</script> */

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
