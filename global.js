//Библиотека глобальных переменных для обеспечения взаимодействия между классами интерфеса сайта.
//

//-----------
//id кнопок меню
const MENU_ID	=	{
	GALLERY		:	'menuGalleryID',
	BEDROOMS	:	'menuBadroomID',
	KITCHENS	:	'menuKitchenID',
	PLAYGROUNDS	:	'menuPlaygroundID',
	ALL			:	[	'menuGalleryID',	'menuBadroomID',	'menuKitchenID',	'menuPlaygroundID'	],
	currentSelected	:	'menuGalleryID'
};
//-----------
//верстка
const FRONT_SLIDE_IMAGE_ID	=	'frontSlideImageID';
const BACK_SLIDE_IMAGE_ID	=	'backSlideImageID';
const BAR_ID				=	'barID';
//-----------
//обьекты изображений верстки
const imageObjects	=	new Switcher(
	[	
		document.getElementById(	FRONT_SLIDE_IMAGE_ID	),	
		document.getElementById(	BACK_SLIDE_IMAGE_ID		)	
	]
);
//-----------
//