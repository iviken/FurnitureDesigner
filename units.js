//Библиотека со вспомагательными классами
//	СПИСОК:
//		Генератор-счетчик имен файлов по шаблону
//		Загрузчик изображений.
//		Таймер
//		Класс-переключатель. Хранит счетчик активного обекта. Удобно. Чтобы не отслеживать каждый раз какой следующий элемент нужно получить
//		Мультитаймер (	TODO	)

//	ERRORS:
//		Загрузчик изображений в Chrome приостанавливается при недозагрузке (срабатывает onerror).

//---------------
//для отладки
function c(	dataIn	){	console.log(	dataIn	);	};

//---------------
//генератор-счетчик имен файлов по возрастанию счетчиков
class CountStack{
	//	>	[name,	NUMBER,	postfix],	число генераций имен
	constructor(	massIn,	iCounts	){
		//массив[] с правилами имен
		this._dataIn		=	massIn;
		//выходной массив имен
		this._dataOut		=	0;
		//длинна massIn[]
		this._dataLength	=	massIn.length;
		//
		this._ch			=	0;
		//число генераций
		this._maxCounts		=	iCounts;
	};
	//просчитать генерацию
	countMe(){
		this._dataOut	=	[];
		for(	let i	=	0;	i	<	this._maxCounts;	i++	){
			this._dataOut.push(	this._dataIn[0]	+	String(i	+	this._dataIn[1])	+	this._dataIn[2]	);
		};
	};
	//вернуть следующее имя
	getNext(){
		//
		this._ch++;
		if(	this._ch	>=	this._dataLength	)	this._ch	=	1;
		//проверка на заполнение
		if(	this._dataOut	==	0	)	this.countMe();
		//
		return this._dataOut[	this._ch-1	];
	};
	//вернуть все имена[]
	getAll(){
		//проверка на заполнение
		if(	this._dataOut	==	0	)	this.countMe();
		//
		return this._dataOut;
	};
};

//---------------
//стек изображений. Загружает и выдает изображения
class ImageStack{
	//	>	полные имена[] файлов
	constructor(	massStrImageNamesIn	){
		//url изображений[]
		this.imageNames		=	massStrImageNamesIn;
		//объекты изображений[]
		this._imageObjects	=	[];
		//счиетчик загрузчика (сист.)
		this._loadImageCh	=	0;
		//флаги[] окончания загрузки изображений
		this._loadingImagesComplited	=	[];
		//счетчик запроса изображения
		this._currentImageCounter		=	0;
	};
	//возвращает предыдущее изображение и декрементирует счетчик
	getPreviousImage(){
		//
		this._currentImageCounter--;
		//проверка на выход счетчика из массива имен изображений
		if(	this._currentImageCounter	<	1	)	this._currentImageCounter	=	this._imageObjects.length;
		//
		return this.getImage();
	};
	//получить текущее изображение (без прироста счетчика)
	getImage(){
		//проверка на завершенность загрузки. В случае сбоя или РАННЕГО ДОСТУПА возращаем пустое изображение
		if(	this._loadingImagesComplited[	this._currentImageCounter-1	]	==	true	){
			//c(	this._currentImageCounter-1	);
			//возвращем	>>>>>
			return this._imageObjects[	this._currentImageCounter	-	1	];
		}else{
			console.log('не все изображения загружены');
			//	>>>>>
			return new Image();
		};
	};
	//получить следующее изображение
	getNextImage(){
		//проверка на выход счетчика из массива имен изображений
		if(	this._currentImageCounter	>=	this._imageObjects.length	)	this._currentImageCounter	=	0;
		//
		this._currentImageCounter++;
		//
		return this.getImage();
	};
	//загрузить изображения из массива ссылок[] massStrImageNamesIn и выполнить ф-цию после
	loadImagesAndRunFunctionAfter(	functionIn	){
		//если все изображения загружены
		if(	this._loadImageCh	==	this.imageNames.length	){
			c(this._imageObjects);
			//если есть ф-ция
			if(	functionIn	!=	0	){
				//запускаем
				functionIn();
			};
			//выходим	>>>>>
			return;
		};
		//создаем экземпляр изображения
		let _img		=	new Image();
		_img.src		=	this.imageNames[	this._loadImageCh	];
		//по загрузке
		_img.onload		=	()	=>	{
			//пушим
			this._imageObjects.push(	_img	);
			//пушим флаг состояния загрузки
			this._loadingImagesComplited.push(	true	);
			//инкрементируем счетчик имен изображений для загрузки
			this._loadImageCh++;
			//зацикливаем
			this.loadImagesAndRunFunctionAfter(	functionIn	);
		};
		//при ошибке загрузки
		/*
		_img.onerror	=	()	=>	{
			//помечаем[false] что файл не загружен
			this._loadingImagesComplited[	this._loadImageCh	]	=	false;
			//
			console.log('ресурс '+this.imageNames[	this._loadImageCh	]+' не загружен.');
			//пушим пустое изображение
			this._imageObjects.push(	new Image()	);
			//инкрементируем счетчик имен изображений для дальнейшей загрузки остальных изображений
			this._loadImageCh++;
			//зацикливаем (грузим дальше)
			this.loadImagesAndRunFunctionAfter(	functionIn	);
		};
		*/
		//при сбое загрузки просто пропускаем его.
		//	Почему-то Chrome приостанавливает сайт на этой ошибке
		_img.onerror	=	()	=>	{
			//
			console.log('ресурс '+this.imageNames[	this._loadImageCh	]+' не загружен.');
			//инкрементируем счетчик имен изображений для дальнейшей загрузки остальных изображений
			this._loadImageCh++;
			//зацикливаем (грузим дальше)
			this.loadImagesAndRunFunctionAfter(	functionIn	);
		};
	};
	//
};

//---------------
//класс фонового таймера
class GlobalTimer{
	constructor(	listenersIn	){
		//внутренний счетчик. Приращается каждый кадр
		this._ch		=	0;
		//массив[] обьектов для вызова каждый кадр
		this.listeners	=	listenersIn;
		//
		
	};
	//ф-ция - агрегатор для периодического вызова классов из this.listeners
	//	вызывается каждый кадр.
	update(){
		//
		this._ch++;
		//вызываем метод обновления у каждого класса listenersIn
		this.listeners.forEach(
			(value)	=>	{
				if(	value	!=	0	){
					value.updateByTimer()
				}
			}
		);
	};
	//Добавить слушателей[]
	addListener(	listenersIn	){
		this.listeners.push(	listenersIn	);
	};
	//
};
//
let globalTimer,	//	переменная экземпляра класса [глобальный таймер - GlobalTimer]
	timer;			//	объект таймера

//создаем фоновый таймер
function createTimer(	listenersIn,	timerSpeedIn	){
	//создаем экземпляр класса фонового таймера (GlobalTimer) и передаем массив[], 
	//	вызываемый каждый кадр экземпляров классов (верстки меню, галереи и бара)
	globalTimer	=	new GlobalTimer(	listenersIn	);
	//фоновый таймер
	timer		=	setInterval(	'globalTimer.update()',	timerSpeedIn	);
	//
	return globalTimer;
};

//--------------
//возвращает следующий элемент из массива
class Switcher{
	//массив[] с любыми данными
	constructor(	massIn	){
		//
		this._data	=	massIn;
		//
		this._ch	=	-1;
	};
	//возвращает один следующий элемент. Начинает с первого
	get(){
		this._ch++;
		if(	this._ch	==	this._data.length	)	this._ch	=	0;
		return this._data[	this._ch	];
	};
	//возвращает один предыдущий элемент
	getPrevious(){
		
		//if(	(this._ch	>=	1)	&&	(this._ch	<	(this.data.length-1))	)	return this._data[	this._ch-1	];
	};
};

//--------------
//
/*
class DoubleController{
	constructor(	firstObjectIn,	secondObjectIn	){
		//
		this._first		=	firstObjectIn;
		this._second	=	secondObjectIn;
		//
		this._flag	=	true;
	};
	//
	count(){
		if(	this._flag	){
			this._flag	=	false;
			this._first();
		}else{
			this._flag	=	true;
			this._second();
		};
	};
};
*/

//--------------
const PERIOD	=	1000;
//
class MultipleTimer{
	//
	constructor(){
		//
		this._ch			=	0;
		//
		this._objects		=	[];
		//
		this._intervalsTIC	=	[];
		//
		//this._data	=	[	[],	[]	];
	};
	//
	addListener(	objectIn,	timeIn	){
		if(	timeIn	>=	PERIOD	){
			//
			this._objects.push(	objectIn	);
			//
			this._intervalsTIC.push(	timeIn	/	PERIOD	);
		};
	};
	//
	update(){
		//
		this._ch++;
		//
		if(	this._objects.length	>	0	){
			//
			this._objects.forEach(
				(value,	ch)	=>	{
					//
					if(	!(this._ch	%	this._intervalsTIC[	ch	])	){
						c(this._ch+' / '+this._intervalsTIC[ch]);
						value.updateByTimer();
					}
				}
			);
		};
	};
	//
};

//
let multipleTimer;
//
let timerFor_MultipleTimer;
//
function createMultipleTimer(){
	//
	multipleTimer		=	new MultipleTimer();
	//
	timerFor_MultipleTimer	=	setInterval(	'multipleTimer.update()',	PERIOD	);
	//
	return multipleTimer;
};

//


































