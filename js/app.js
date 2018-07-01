$(function () {
	iniciojuego();
});

function iniciojuego() {

	colortitulo();
	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		revisartablero();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: endGame
		});
	});
}

function colortitulo(){
    $(".main-titulo").animate({color: '#fff' },1000,revertircolor);
}
function revertircolor(){
    $(".main-titulo").animate({color: '#DCFF0E' },1000,colortitulo);  
}

function revisartablero() {
	llenartablero();
}

function llenartablero() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var dulce = $(this).children().length;
		var agrega = top - dulce;
		for (var i = 0; i < agrega; i++) {
			var tipodulce = Math.floor(Math.random() * 4) + 1;
			if (i === 0 && dulce < 1) {
				$(this).append('<img src="image/' + tipodulce + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + tipodulce + '.png" class="element"></img>');
			}
		}
	});
	agregardulceevento();
	validacion();
}