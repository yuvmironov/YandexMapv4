/**
 * Табсы v1.1
 * @type {HTMLCollectionOf<Element>}
 */

Element.prototype.MFSTabs = function () {
	let tabs = this,
		links = this.children[0].children,
		blocks = this.children[1].children;
	tabs.classList.add('Tabs');
	for (let i = 0; i < links.length; i++) {
		if (i === 0) {
			links[i].classList.add('Tabs-Link_Active');
			blocks[i].classList.add('Tabs-Block_Active');
		} else {
			links[i].classList.add('Tabs-Link_NotActive');
			blocks[i].classList.add('Tabs-Block_NotActive');
		}
		links[i].addEventListener('click', function (ev) {
			ev.preventDefault();
			if (!(this.classList.contains('Tabs-Link_Active'))) {
				for (let i = 0; i < links.length; i++) {
					links[i].classList.remove('Tabs-Link_Active');
					links[i].classList.add('Tabs-Link_NotActive');
				}
				for (let i = 0; i < blocks.length; i++) {
					blocks[i].classList.remove('Tabs-Block_Active');
					blocks[i].classList.add('Tabs-Block_NotActive');
				}
				this.classList.replace('Tabs-Link_NotActive', 'Tabs-Link_Active');
				let needBlock = this.getAttribute('href').slice(1);
				document.getElementById(needBlock).classList.remove('Tabs-Block_NotActive');
				document.getElementById(needBlock).classList.add('Tabs-Block_Active');
			}
			
		})
	}
};


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
 * Функция создания ссылок для табов карты
 * @param data - данные
 * @param map - линк на карту
 * @param number - номер линка для ьабов
 */
function createTabLink(data, map, number) {
	let collection = new ymaps.GeoObjectCollection(null, {});
	let tabsLinksBlock = document.querySelector('.Tabs-Links');
	const tabsBlocks = document.querySelector('.Tabs-Contents');
	const tabsBlock = createElementSingleClass('div', 'Tabs-Block');
	tabsBlock.id = data.id;
	
	const tabLink = createLink('Tabs-Link', `#${data.id}`, data.name);
	tabsLinksBlock.appendChild(tabLink);
	
	for (let i = 0; i < data.items.length; i++) {
		createTabBlock(data.items[i],tabsBlock, collection);
	}
	
	tabsBlocks.appendChild(tabsBlock);
	
	if (number === 1) {
		map.geoObjects.add(collection);
		console.log('data.items.length ', data.items.length);
		if (data.items.length === 1) {
			map.setBounds(map.geoObjects.getBounds());
			map.setZoom(14);
		}
	}
	
	
	tabLink.addEventListener('click', function(){
		if (!this.classList.contains('Accord-Link_Active')) {
			map.geoObjects.removeAll();
			map.geoObjects.add(collection);
			if (data.items.length === 1) {
				map.setBounds(map.geoObjects.getBounds());
				map.setZoom(14);
			} else {
				map.setBounds(map.geoObjects.getBounds());
				map.setZoom(map.getZoom() - 1);
			}
			
		} else {
			map.geoObjects.removeAll();
		}
	});
	
	
	
}

/**
 * Функция вставки данных по элементам карыт
 * @param data - данные
 * @param block - блок для вставки данных
 * @param collect - коллекция для добавления на карту и показа при выбранном табе
 */
function createTabBlock(data, block, collect) {
	const name = createElementSingleClass('p', 'Contacts-Name', data.name);
	const address = createElementSingleClass('p', 'Contacts-Address', data.adress);
	
	/** --- Блок для информации --- **/
	const infoWrap = createElementSingleClass('div', 'Contacts-Info');
	//График работы
	const scheduleWrap = createElementSingleClass('div', 'Contacts-InfoInner', 'Грфаки работы');
	const scheduleMass = data.schedule.split('|');
	for (let i = 0; i < scheduleMass.length; i++) {
		const schedule = scheduleCreate(scheduleMass[i], 'Contacts-Schedule');
		scheduleWrap.appendChild(schedule);
	}
	infoWrap.appendChild(scheduleWrap);
	
	//Телефоны
	const phoneWrap = createElementSingleClass('div', 'Contacts-InfoInner', 'Телефоны');
	const phoneMass = data.phone.split('|');
	for (let i = 0; i < phoneMass.length; i++) {
		const phone = phoneCreate(phoneMass[i], 'Contacts-Phone');
		phoneWrap.appendChild(phone);
	}
	infoWrap.appendChild(phoneWrap);
	
	//Разбираем и приводим к числам координаты магазина
	let coordinates = data.coordinates.split(',');
	for (let i = 0; i < coordinates.length; i++) {
		coordinates[i] = Number(coordinates[i]);
	}
	let placeMarc = new ymaps.Placemark(
		coordinates,
		{
			hintContent: data.name,
			balloonContentHeader: data.name,
			balloonContentBody: data.adress,
			balloonContentFooter: data.phone
		},
		{
			iconLayout: 'default#image',
			iconImageHref: 'Item.svg',
			iconImageSize: [35,35],
			iconImageOffset: [-17,-17],
			hideIconOnBalloonOpen: false
		}
	);
	
	collect.add(placeMarc);
	
	name.addEventListener('mouseenter', function () {
		placeMarc.balloon.open();
	});
	name.addEventListener('mouseleave', function () {
		placeMarc.balloon.close();
	});
	
	block.appendChild(name);
	block.appendChild(address);
	block.appendChild(infoWrap);
	
	
}


function createTabLinkPartner(data, map, number) {
	let collection = new ymaps.GeoObjectCollection(null, {});
	let tabsLinksBlock = document.querySelector('.Tabs-Links');
	const tabsBlocks = document.querySelector('.Tabs-Contents');
	const tabsBlock = createElementSingleClass('div', 'Tabs-Block');
	tabsBlock.id = data.id;
	
	const tabLink = createLink('Tabs-Link', `#${data.id}`, data.name);
	tabsLinksBlock.appendChild(tabLink);
	
	
	createTabBlockPartner(data.items,tabsBlock, collection);
	
	
	tabsBlocks.appendChild(tabsBlock);
	
	tabLink.addEventListener('click', function(){
		if (!this.classList.contains('Accord-Link_Active')) {
			map.geoObjects.removeAll();
			map.geoObjects.add(collection);
			if (data.items.length === 1) {
				map.setBounds(map.geoObjects.getBounds());
				map.setZoom(14);
			} else {
				map.setBounds(map.geoObjects.getBounds());
				map.setZoom(map.getZoom() - 1);
			}
			
		} else {
			map.geoObjects.removeAll();
		}
	});
}

function createTabBlockPartner(data, blocks, collect) {
	console.log('data ', data);
	for (let i = 0; i < data.length; i++) {
		const partner = createElementSingleClass('div', 'Contacts-Partner');
		const logo = createElementSingleClass('img', 'Contacts-PartnerLogo');
		logo.setAttribute('src', data[i].brandLogo);
		partner.appendChild(logo);
		
		const partnerInfo = createElementSingleClass('div', 'Contacts-PartnerInfo');
		const name = createElementSingleClass('p', 'Contacts-PartnerName', data[i].brandName);
		
		const phoneSchedule = createElementSingleClass('div', 'Contacts-PartnerInfoWrap');
		const phone = createElementSingleClass('p', 'Contacts-PartnerPhone', 'Телефон');
		phone.appendChild(phoneCreate(data[i].brandPhone, 'Contacts-PartnerPhoneItem'));
		const schedule = createElementSingleClass('p', 'Contacts-PartnerSchedule', `График работы`);
		schedule.appendChild(scheduleCreate(data[i].brandSchedule, 'Contacts-PartnerScheduleItem'));
		phoneSchedule.appendChild(phone);
		phoneSchedule.appendChild(schedule);
		
		const address = createElementSingleClass('p', 'Contacts-PartnerAddress', data[i].brandAddress);
		const link = createLink('Contacts-PartnerLink', '#', `Все магазины`);
		
		partnerInfo.appendChild(name);
		partnerInfo.appendChild(address);
		partnerInfo.appendChild(phoneSchedule);
		partnerInfo.appendChild(link);
		partner.appendChild(partnerInfo);
		
		for (let j = 0; j < data[i].addresses.length; j++) {
			//Разбираем и приводим к числам координаты магазина
			let coordinates = data[i].addresses[j].coordinates.split(',');
			for (let i = 0; i < coordinates.length; i++) {
				coordinates[i] = Number(coordinates[i]);
			}
			let placeMarc = new ymaps.Placemark(
				coordinates,
				{
					hintContent: data[i].addresses[j].name,
				},
				{
					iconLayout: 'default#image',
					iconImageHref: 'Item.svg',
					iconImageSize: [35,35],
					iconImageOffset: [-17,-17],
					hideIconOnBalloonOpen: false
				}
			);
			
			collect.add(placeMarc);
		}
		
		blocks.appendChild(partner);
	}
	
}

/**
 * Функция инициализации и построения карты
 */
function createMap(){
	//Получение данных для обработки
	$.getJSON('MapSource.json', (dataMap) => {
	//Получем элемент, где будут находяться элементы управления картой
	const tabs = document.getElementById('ContactsTabs');
	
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
			let num = 1;
			for(let data in dataMap) {
				if (data === 'storesPart') {
					createTabLinkPartner(dataMap[data], myMap, num);
					num++;
				} else {
					createTabLink(dataMap[data], myMap, num);
					num++;
				}
			}
			
			tabs.MFSTabs();
		});
		
	});
	console.groupEnd();
}
