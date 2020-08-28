//	В 	РАЗРАБОТКЕ
//Класс событий меню. 
//	1. Переключает раздел меню по щелчку пользователя
//	2. Меняет цвета меню. Через прямое присвоение стиля.
//	

//	Сделать через CSS
//	TODO	->	CSS
//-------------
//переключатель разделов меню
class MenuSelector{
	constructor(){
		//текущий раздел меню (id верстки)
		this._currentElementId		=	0;
		//стиль выбора разделп меню
		this.SELECTED_PROOF_CLASS	=	'menuItemSelectorStyle';
		//обьект верстки меню
		this.menu					=	document.getElementById(	'menuID'	);
		//активный пункт меню (id верстки)
		this._previousElementId		=	MENU_ID.GALLERY;
		//класс контента для передачи результата выбора в меню
		this.contentClass	=	0;
	};
	//сделать меню светлым
	setMenuLight(){
		this.menu.setAttribute(	'style',	'filter:	invert(0)'	);
	};
	//сделать меню темным
	setMenuDark(){
		//цвет инвертируются и меняется HUE у каждого пункта меню
		if(	this._currentElementId	==	MENU_ID.BEDROOMS	)
			this.menu.setAttribute(	'style',	'filter:	invert(1)	hue-rotate(300deg)'		);
		if(	this._currentElementId	==	MENU_ID.KITCHENS	)
			this.menu.setAttribute(	'style',	'filter:	invert(1)	hue-rotate(180deg)'		);
		if(	this._currentElementId	==	MENU_ID.PLAYGROUNDS	)
			this.menu.setAttribute(	'style',	'filter:	invert(1)	hue-rotate(90deg)'		);
	};
	//убрать выделения пунктов меню
	_clearMenuItems(){
		//
		if(	this._previousElementId	!=	0	){
			document.getElementById(	this._previousElementId	).parentNode.className		=	'';
		};
	};
	//выставить выделеник пункта меню (присвоить класс)
	_setSelectMenuItem(	constMenuItemIn	){
		//
		if(	this._currentElementId	){
			document.getElementById(	this._currentElementId	).parentNode.className	=	this.SELECTED_PROOF_CLASS;
		};
		//
		this._previousElementId	=	this._currentElementId;
	};
	//меняем цвет меню
	_invertColor(){
		//
		if(	this._currentElementId	!=	MENU_ID.GALLERY	){
			//
			this.setMenuDark();
		}else{
			this.setMenuLight();
		};
	};
	//выбрать пункт меню
	setSelectMenuItem(	idIn	){
		//
		if(	MENU_ID.ALL.indexOf(idIn)	!=	-1	){
			//
			this._currentElementId	=	idIn;
			//
			this._clearMenuItems();
			//
			this._setSelectMenuItem(	idIn	);
			//проверяем не смартфон ли это
			if(	!this.isSmartfon()	){
				//инвертируем цвета
				this._invertColor();
				//
				//document.getElementById(	'BAR_ID'	).classList.toggle(	'barEffects'	);
			};
			//передаем параметры выбора меню в контент
			//if(	this.contentClass	!=	0	){
				//this.contentClass.replaceContentByButtonId(	idIn	);
				MENU_ID.currentSelected	=	this._currentElementId;
				//скрываем бар
				if(	idIn	!=	MENU_ID.GALLERY	){
					document.getElementById(	BAR_ID	).style.display	=	'none';
				}else{
					document.getElementById(	BAR_ID	).style.display	=	'flex';
				};
			//};
		};
	};
	//проверка на соотношения экрана
	isSmartfon(){
		return window.innerWidth	<	window.innerHeight;
	};
	//
	setFocus(	idIn	){
		//
		if(	MENU_ID.ALL.indexOf(idIn)	!=	-1	){
			//
			//document.getElementById(	BAR_ID	).classList.toggle(	'barHideAnimation'	);
		};
	};
	//подключить класс контента для передачи параметра выбора меню
	linkContentClass(	classIn	){
		if(	classIn	!=	0	){
			this.contentClass	=	classIn;
		}else{
			console.log(	'класс контента для меню не присвоен.'	);
		};
	};
};

//
const menuSelector	=	new MenuSelector();
//
//menuSelector.linkContentClass(	slideShow	);
//==============

document.addEventListener('mouseup',	function(){
	//передаем элемент
	menuSelector.setSelectMenuItem(		event.target.id	||	event.srcElement.id	);
});

document.addEventListener('mousemove',	function(){
	//передаем элемент
	menuSelector.setFocus(	event.target.id	);
	
});

















