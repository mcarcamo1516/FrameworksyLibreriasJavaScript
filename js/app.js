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


function validacion() {
	validacioncolumnas();
	validacionfilas();
	if ($('img.delete').length !== 0) {
		eliminaranimacion();
	}
}

function validacionfilas() {
	for (var j = 0; j < 6; j++) {
		var contador = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = candyRows(j);
		var comparisonValue = candyRow[0];
		var validador = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					validador = true;
				} else {
					candyPosition = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!validador) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!validador) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				contador += 1;
			}
			comparisonValue = candyRow[i];
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteHorizontal(candyPosition, candyRow);
			setScore(candyCount);
		}
	}
}