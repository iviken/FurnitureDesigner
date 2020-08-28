//Версия реализации на CSS 3
//	В отличии от прошлой реализации на JS, эта подвержена недоработке - происходит ассинхрон ф-ции смены кадра и
//		анимации CSS при расфокусировке (переключение с браузера) страницы.
//Библиотека управляет отображением галереи (сменяющихся изображений) в контенте сайта
//	Файл включает в себя класс и параметры файлов (шаблон имен и число файлов).
//	После загрузки изображений, автоматически создается экземпля класса slideShow(	*<класс id изображений верстки>,	**<имена[] файлов изображений> 	)
//	*	класс-переключатель Switcher из библитеки units.js
//	**	класс-загрузчик изображений ImageStack из библитеки units.js
//	Смена раздела изображений для галереи происходит по индефикатору MENU_ID.currentSelected.

//		С дизайнеркой точки зрения еще не придумал как обыграть остановку и дальнейшее воспроизведение изображений так,
//			что бы пауза не выпадала на кадры смены одного изображения  другим.

//---------
//интервал смены каждого изображения
const CHANGE_IMAGE_TIMER_INTERVAL		=	9000;
//шаблон генерации полных имен изображений категорий галереи.	> [префикс - путь и часть имени]	[начальное значение счетчика]	[постфикс]
const GELLERY_IMAGE_PATTERN_NAMES		=	['readyThemes/photo (',				1,	').jpg'];
const BEDROOM_IMAGE_PATTERN_NAMES		=	['images/bedrooms/bedroom (',		1,	').png'];
const PLAYGROUND_IMAGES_PATTERN_NAMES	=	['images/playgrounds/playground (',	2,	').png'];
const KITCHEN_IMAGES_PATTERN_NAMES		=	['images/kitchens/kitchen (',		1,	').png'];
//число изображений
const slideshowImages	=	{
	//генерируем массивы имен файлов изображений. >	[паттерн имени]	[общее число генераций]
	galleryNames	:	new CountStack(	GELLERY_IMAGE_PATTERN_NAMES,	12	),
	bedroomNames	:	new CountStack(	BEDROOM_IMAGE_PATTERN_NAMES,	18	),
	playgroundNames	:	new CountStack(	PLAYGROUND_IMAGES_PATTERN_NAMES,17	),
	kitchenNames	:	new CountStack(	KITCHEN_IMAGES_PATTERN_NAMES,	3	),
	//классы-загрузчики изображений
	galleryLoader	:	0,
	bedroomsLoader	:	0,
	playgroundsLoader:	0,
	kitchensLoader	:	0,
};
//
const MENU_CONTENT	=	new Map();
//--------------
//класс смены изображений
class SlideShow{
	//	>	обьекты-изображения версти (тега IMG),	класс загруженных изображений
	constructor(	objectsIn,	imagesIn	){
		//класс загруженных изображений
		this.images			=	imagesIn;
		//обьекты-изображения верстки
		this.imageObgect	=	objectsIn;
		//флаг остановки воспроизведения
		this._stopFlag		=	false;
		//id фронтального изображения
		this.frontSlideId	=	FRONT_SLIDE_IMAGE_ID;
		//сумма всех интервалов воспроизведения анимации. Введена для подсчета всех прерываний анимации при уводе фокуса
		this.deltaDate		=	0;
		//последняя дата обновления изображения. Нужна для высчитывания прерываний анимации
		this.lastDate		=	new Date();
		//
	};
	//
	
	//вызывается через таймер каждое время замены изображения
	updateByTimer(){
		if(	!this._stopFlag	){
			//заменить изображения по внешней переменной-id. Реализует результат переключения меню
			this.replaceContentByButtonId(	MENU_ID.currentSelected	);
			//передаем ссылку из массива загруженных изображений
			this.imageObgect.get().src	=	this.images.getNextImage().src;
			//
			this.deltaDate	=	0;
			this.lastDate	=	new Date();
			//console.log('change '+this.images.getImage().src+' in '+new Date().getSeconds()	);
		};
		//
	};
	//остановка или запуск 
	stopStartPlaying(){
		
		/*
		//проаеряем статус воспроизведения
		this._stopFlag	=	!this._stopFlag;
		//
		if(	this._stopFlag	){
			//
			//this.imageObgect.get().src	=	this.images.getImage().src;
			let img						=	this.images.getPreviousImage().src;
			this.imageObgect.get().src	=	img;
			this.imageObgect.get().src	=	img;
			//console.log(this.images.getImage().src);
			//
			//let waste	=	this.imageObgect.get();
		}else{
			//
			//let waste	=	this.imageObgect.get();
			//
			this.updateByTimer();
		};
		//
		*/
	};
	//проверка id и основка воспроизведения 
	checkOnFocus(	idIn	){
		//проверяем не смартфон ли это
		if(	window.innerWidth	>	window.innerHeight	){
			//проверяем id фокуса на фронтальном кадре
			//	вход на фокус
			if(	idIn	==	this.frontSlideId	){
				if(	this._stopFlag	){
					this.lastDate	=	new Date();
					//создаем новый таймер с учетом предыдущего времени проигрыша анимации
					slideShowTimer	=	setTimeout(	updateImage,	CHANGE_IMAGE_TIMER_INTERVAL	-	this.deltaDate	%	CHANGE_IMAGE_TIMER_INTERVAL	);
				};
				this._stopFlag	=	false;
			}else{
				//выход из фокуса и остановка таймера
				if(	!this._stopFlag	){
					//
					clearTimeout(	slideShowTimer	);
					//
					this.deltaDate	+=	(new Date()	-	this.lastDate)*1;
					//console.log('SUMdelta: '+this.deltaDate	);
					//
					this._stopFlag	=	true;
				};
			};
		}else{
			this._stopFlag	=	false;
		};
	};
	//
	replaceContentByButtonId(	idIn	){
		//
		//c('in '+idIn);
		this.images		=	MENU_CONTENT.get(	idIn	);
	};
	//
};

//
let slideShow	=	0;
//создаем таймер сразу, чтобы синхронизировать с CSS анимацией смены прозрачности фронтального изображения
let slideShowTimer	=	0
//-------------
let updateImage	=	()	=>	{
	//ф-ция обновления потаймеру
	slideShow.updateByTimer();
	//зацикливаем на интервал смены одного изображения. При смене фокуса этот таймер удаляется и создается новый с новым временем.
	slideShowTimer	=	setTimeout(	updateImage,	CHANGE_IMAGE_TIMER_INTERVAL	);
};

//-------------
//вызывается сразу после загрузки фотографий. Т.к. они первыми отображаются
let galleryImagesLoadDone	=	()	=>	{
	//console.log('load is done');
	//теперь можно создать
	slideShow	=	new SlideShow(	imageObjects,	slideshowImages.galleryLoader	);
	//добавляем этот класс в таймер для вызова
	slideShowTimer	=	setTimeout(	updateImage,	CHANGE_IMAGE_TIMER_INTERVAL	);
	//загружаем остальные разделы изображений
	slideshowImages.bedroomsLoader		=	new ImageStack(	slideshowImages.bedroomNames.getAll()	);
	slideshowImages.playgroundsLoader	=	new ImageStack(	slideshowImages.playgroundNames.getAll());
	slideshowImages.kitchensLoader		=	new ImageStack(	slideshowImages.kitchenNames.getAll()	);
	//загружаем
	slideshowImages.bedroomsLoader.loadImagesAndRunFunctionAfter(	0	);
	slideshowImages.playgroundsLoader.loadImagesAndRunFunctionAfter(0	);
	slideshowImages.kitchensLoader.loadImagesAndRunFunctionAfter(	0	);
	//
	MENU_CONTENT.set(	MENU_ID.GALLERY	,		slideshowImages.galleryLoader		);
	MENU_CONTENT.set(	MENU_ID.BEDROOMS,		slideshowImages.bedroomsLoader		);
	MENU_CONTENT.set(	MENU_ID.PLAYGROUNDS,	slideshowImages.playgroundsLoader	);
	MENU_CONTENT.set(	MENU_ID.KITCHENS,		slideshowImages.kitchensLoader		);
	//
};
//------------
//	>>>>>
//создаем класс изображений для загрузки.
slideshowImages.galleryLoader	=	new ImageStack(	slideshowImages.galleryNames.getAll()	);
//запускаем их загрузку и последующее выполнение ф-ции-аргумента
slideshowImages.galleryLoader.loadImagesAndRunFunctionAfter(	galleryImagesLoadDone	);
//

//----------
document.addEventListener('mouseup',	function(){
	//передаем элемент
	if(	slideShow	!=	0	)
		//остановка или дальнейшее воспроизведение смены изображений
		slideShow.stopStartPlaying();
});

document.addEventListener('mousemove',	function(){
	//передаем элемент
	if(	slideShow	!=	0	){
		slideShow.checkOnFocus(	event.target.id	);
	};
});














