//Библиотека позволяет реализовать эффект параллакса - движение дальних кадров.
//	Управление осуществляется за счет считывания координат мыши.
//	В данном случае задействовано только движение по горизонтале, по вертикале игнорируется.
//	Так же движение останавливается при диагональном приращении и выше для предотвращения дрожания обьекта.
//	В данном случае класс Parallax создается в двух экземплярах для одновременного смещения двух изображений через присвоения стиля left
//		Для переода значений смещения в пикселях в числовое используется ф-ция getNumberFromPixels из библиотеки math.js
//			Скорость движения регулируется в самом классе.

//-------
//Возвращает приращение координат
class DeltaXY{
	constructor(){
		//предыдущие координаты
		this.previousXY		=	{x:	0,	y:	0};
		//флаг начала. т.к. при старте координат еще нет
		this.onstartFlag	=	false;
	}
	//вернуть приращение {x,y}
	getDeltaXY(	currentXyIn	){
		//при первом запуске возвращаем 0, 0
		if(	!this.onstartFlag	){
			this.onstartFlag		=	true;
			this.previousXY			=	currentXyIn;
			return {x:	0,	y:	0};
		};
		//находим приращения
		let deltaX		=	currentXyIn.x	-	this.previousXY.x;
		let deltaY		=	currentXyIn.y	-	this.previousXY.y;
		//заменяем старую координату на новую
		this.previousXY	=	currentXyIn;
		//	>>>>>
		return {	x:	deltaX,	y:	deltaY	};
	};
};
//Класс эффекта паралакса для обьекта. 
//	В данном случае для изображения, которое будет чуть идти за мышью по горизонтали
class Parallax	extends	DeltaXY{
	//		>		id обьекта верстки
	constructor(	idIn	){
		super();
		//элемент для движения
		this._movingElement	=	document.getElementById(	idIn	);
		//величина замедления
		this.deceleration	=	10;
		//максимальное приращение для предотвращения разрыва и дрожания
		this.maxDeltaX		=	5;
		//минимальное значение по у. Необходимо чтобы предотвратить дрожание по Х при вертикальном движении указателя
		//this.minDeltaY		=	20;
	};
	//передвинуть элемент. {x, y}
	moveElement(	xyIn	){
		//console.log('check Parallax: '+xyIn.x);
		//берем текущие значения координат из стиля
		let datX		=	getComputedStyle(this._movingElement).left;
		let currentLeft	=	getNumberFromPixels(	datX	);
		//находим приращения
		let delta		=	super.getDeltaXY(	xyIn	);
		//
		//let deltaTarget	=	delta.x	<	0	?	-1	:	1;
		//console.log(	deltaTarget);
		//delta.x	=	Math.abs(delta.x)	>	this.maxDeltaX	?	deltaTarget*this.maxDeltaX	:	deltaTarget*delta.x;
		//console.log(String(currentLeft	+	(delta.x/this.deceleration)));
		//console.log(	deltaTarget);
		//приверяем на дергания, сравнивая с максимальным приращением
		delta.x	=	Math.abs(delta.x)	>	this.maxDeltaX	?	delta.x%this.maxDeltaX	:	delta.x;
		//
		//c(delta.y);
		//if(	Math.abs(delta.y)	>	this.minDeltaY	)	delta.x	=	0;
		if(	Math.abs(delta.y)	>	Math.abs(delta.x)	)	delta.x	=	0;
		//обновляем стиль. Передаем координаты нового смещения
		//let styles	=	this._movingElement.style;
		//this._movingElement.setAttribute(	'style',	styles+' left:'+String(currentLeft	+	(delta.x/this.deceleration))	);
		//присваиваем новый атрибут смещения влево
		//console.log('left: '+currentLeft);
		//console.log('styles: '+getComputedStyle(this._movingElement).filter);
		this._movingElement.style.left	=	String(currentLeft	+	(delta.x/this.deceleration))	+	'px';
	};
};

//------------
//
const parallax_1		=	new Parallax(	FRONT_SLIDE_IMAGE_ID,	);
const parallax_2		=	new Parallax(	BACK_SLIDE_IMAGE_ID,	);
//------------
document.addEventListener('mousemove',	function(){
	//передаем элемент
	//	сразу меняем координату Х на -Х
	parallax_1.moveElement(	{x:	-1*event.offsetX,	y:	event.offsetY}	);
	parallax_2.moveElement(	{x:	-1*event.offsetX,	y:	event.offsetY}	);
});


