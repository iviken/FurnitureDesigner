//Библиотека класса бара.
//	TODO

//--------
//класс бара
class BarMover{
	constructor(){
		//
		this.contentClass	=	0;
	};
	//
	checkMove(	idIn	){
		//
		//console.log(	idIn	);
		//
	};
	//
	clickPicture(	idIn	){
		//
		let pixNumber	=	idIn.indexOf(	'bar ('	);
		//
		if(	pixNumber	&&	!this.contentClass	){
			//
			this.contentClass.replaceImageByNumber(	Number(idIn.split(	'('	)[1].split(	'.'	)[0])	);
		};
	};
	//
	linkContentClass(	classIn	){
		this.contentClass	=	classIn;
	};
	//
};

let barMover	=	new BarMover();
















//-------------
//
document.addEventListener('wheel',	function(){
	//передаем элемент
	barMover.checkMove(	event.target.id	);
});

document.addEventListener('onclick',	function(){
	//передаем элемент
	//barMover.clickPicture(	event.target.id	);
});



