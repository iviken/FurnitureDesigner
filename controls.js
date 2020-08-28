//Библиотека, обеспечивающая контроль за событиями юзера на сайте
//	Реализовано через захват событий мыши.
//	Реализовано:
//		1. Эффект размытия (blur) через CSS 3 контента (галереи) при потери им фокуса. Присваивается класс стиля CSS.
//		2. Сокрытие бара при наведении на меню. Присваивается класс стиля.

//---------
//флаг одноразового состояния
let checkGalleryUnfocusFlag	=	false;
//проверка фокуса на контенте (галереи) через id
function checkGalleryUnfocus(	idIn	){
	//если фокуса на контенте нет
	if(	idIn	!=	FRONT_SLIDE_IMAGE_ID	){
		//проверяем флаг разового запуска
		if(	!checkGalleryUnfocusFlag	){
			//
			//imageObjects.get().classList.remove(	'blurStyleEnd'	);
			//imageObjects.get().classList.remove(	'blurStyleEnd'	);
			//добавляем класс стиля размытия
			imageObjects.get().classList.toggle(	'blurStyleStart'	);
			imageObjects.get().classList.toggle(	'blurStyleStart'	);
			//imageObjects.get().className	=	'blurStyle';
			//imageObjects.get().className	=	'blurStyle';
			//
			//imageObjects.get().setAttribute('style',	'transition-delay:	1s;	transition-duration:	1s;	filter:	blur(5px)'	);
			//imageObjects.get().setAttribute('style',	'transition-delay:	1s;	transition-duration:	1s;	filter:	blur(5px)'	);
			//меняем флаг для предотвращения постоянного запуска
			checkGalleryUnfocusFlag	=	true;
			//console.log(imageObjects.get());
			//console.log(imageObjects.get());
			//если в фокусе не бар
			if(	!barInFocusFlag	)
				//скрываем
				document.getElementById(	BAR_ID	).classList.toggle(	'barHideAnimation'	);
		};
	}else{
		//проверяем флаг разового запуска
		if(	checkGalleryUnfocusFlag	){
			//меняем этот флаг
			checkGalleryUnfocusFlag	=	false;
			//
			//imageObjects.get().setAttribute('style',	'transition-delay:	1s;	transition-duration:	2s;	filter:	blur(0px)'	);
			//imageObjects.get().setAttribute('style',	'transition-delay:	1s;	transition-duration:	2s;	filter:	blur(0px)'	);
			//console.log(imageObjects.get());
			//console.log(imageObjects.get());
			//
			//удаляем класс стиля скрятия
			document.getElementById(	BAR_ID	).classList.remove(	'barHideAnimation'	);
			//удаляем класс стиля размытия
			imageObjects.get().classList.remove(	'blurStyleStart'	);
			imageObjects.get().classList.remove(	'blurStyleStart'	);
			//imageObjects.get().classList.toggle(	'blurStyleEnd'	);
			//imageObjects.get().classList.toggle(	'blurStyleEnd'	);
		};
	};
};
	
//флаг фокуса на баре
let barInFocusFlag	=	false;
//правило состояния  флага фокуса на баре.
function checkBarFocus(	idIn	){
	//console.log(	idIn);
	//При <наведении> фокуса на бар флаг истина
	if(	idIn	==	BAR_ID	)
		barInFocusFlag	=	true;
	//при наведении фокуса на меню и 
	if(	barInFocusFlag	&&	(idIn	==	FRONT_SLIDE_IMAGE_ID)	)
		barInFocusFlag	=	false;
	//
};
	
document.addEventListener('mouseover',	function(){
	//передаем элемент
	checkBarFocus(	event.target.id	);
});

document.addEventListener('mousemove',	function(){
	//передаем элемент
	checkGalleryUnfocus(	event.target.id	);
	
});








