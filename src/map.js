ymaps.ready(createMap);

/**
 * Функция построения элемента телефона
 * @param phone - номер телефона для вставки
 * @param className - Имя класса для элемента телефона
 * @return {HTMLParagraphElement} - элемент для вставки в дом
 */
function phoneCreate (phone, className) {
	const phoneElement = document.createElement('p');
	phoneElement.className = className;
	phoneElement.innerText += phone;
	return phoneElement;
}

/**
 * Функция построения элемента графика работы
 * @param schedule - строка с графиком работы для вставки
 * @param className - класс для элемента графика работы
 * @return {HTMLParagraphElement} - элемент для вставки в дом
 */
function scheduleCreate (schedule, className) {
	const phoneElement = document.createElement('p');
	phoneElement.className = className;
	phoneElement.innerText += schedule;
	return phoneElement;
}

/**
 * Функция для создания элемента карты с одним классом
 * @param teg - Необходимый тег
 * @param className - Имя класса
 * @param inner - Содержимое тега
 * @return {HTMLElement | HTMLSelectElement | HTMLLegendElement | HTMLTableCaptionElement | HTMLTextAreaElement | HTMLModElement | HTMLHRElement | HTMLOutputElement | HTMLPreElement | HTMLEmbedElement | HTMLCanvasElement | HTMLFrameSetElement | HTMLMarqueeElement | HTMLScriptElement | HTMLInputElement | HTMLUnknownElement | HTMLMetaElement | HTMLStyleElement | HTMLObjectElement | HTMLTemplateElement | MSHTMLWebViewElement | HTMLBRElement | HTMLAudioElement | HTMLIFrameElement | HTMLMapElement | HTMLTableElement | HTMLAnchorElement | HTMLMenuElement | HTMLPictureElement | HTMLParagraphElement | HTMLTableDataCellElement | HTMLTableSectionElement | HTMLQuoteElement | HTMLTableHeaderCellElement | HTMLProgressElement | HTMLLIElement | HTMLTableRowElement | HTMLFontElement | HTMLSpanElement | HTMLTableColElement | HTMLOptGroupElement | HTMLDataElement | HTMLDListElement | HTMLFieldSetElement | HTMLSourceElement | HTMLBodyElement | HTMLDirectoryElement | HTMLDivElement | HTMLUListElement | HTMLHtmlElement | HTMLAreaElement | HTMLMeterElement | HTMLAppletElement | HTMLFrameElement | HTMLOptionElement | HTMLImageElement | HTMLLinkElement | HTMLHeadingElement | HTMLVideoElement | HTMLBaseFontElement | HTMLTitleElement | HTMLButtonElement | HTMLHeadElement | HTMLParamElement | HTMLTrackElement | HTMLOListElement | HTMLDataListElement | HTMLLabelElement | HTMLFormElement | HTMLTimeElement | HTMLBaseElement}
 */
function createElementSingleClass (teg, className='', inner = '') {
	const element = document.createElement(teg);
	element.className = className;
	element.innerText = inner;
	return element;
}

/**
 * Функция для создания ссылки
 * @param className - класс
 * @param hrefLink - значение атирибута href
 * @param inner - Текст для отображения
 * @return {HTMLAnchorElement} - готовый элемент ссылки для вставки
 */
function createLink(className, hrefLink, inner) {
	const link = document.createElement('a');
	const text = document.createTextNode(inner);
	link.className = className;
	link.href = hrefLink;
	link.appendChild(text);
	return link;
}

/**
 * Функция инициализации и построения карты
 */
function createMap(){
		//Получение данных для обработки
	$.getJSON('MapSource.json', (dataMap) => {
		//Получем элемент, где будут находяться элементы управления картой
		const mapInfo = document.getElementById('DescMap');
		
		//Получаем город
		const city = dataMap.city;
		delete dataMap.city;
		//Обращаемся к яндексу для получения координат центра города в котором показываем информацию
		ymaps.geocode(city).then(
			function (res) {
				//Создаем карту и показываем её на странице
				let myMap = new ymaps.Map(
					'Map',
					{
						center: res.geoObjects.get(0).geometry.getCoordinates(),
						zoom: 10,
						controls: ['zoomControl', 'fullscreenControl'],
						behaviors: ['drag', 'dblClickZoom']
					},
					{
						searchControlProvider: 'yandex#search'
					}
				);
				
				myMap.setBounds(myMap.geoObjects.getBounds());
				myMap.setZoom(myMap.getZoom()-1);
			}
		
		);
		
	});
	console.groupEnd();
}
