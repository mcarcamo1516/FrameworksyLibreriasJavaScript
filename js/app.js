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
			onComplete: finJuego
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

function validacioncolumnas() {
	for (var j = 0; j < 6; j++) {
		var contador = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = candyRows(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
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

function agregardulceevento() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: intercambiar
	});
	habilitardulce();
}

function finJuego() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
}


function habilitardulce() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

function intercambiar(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		revisartablero();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			actualizar();
		}
	}, 500);

}

function actualizar() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

function eliminaranimacion() {
	desshabilitardulce();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				eliminardulce()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

function desshabilitardulce() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function checkBoardPromise(result) {
	if (result) {
		revisartablero();
	}
}

function showPromiseError(error) {
	console.log(error);
}
function eliminardulce() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Dulce...');
		}
	});
}