var minuto = 2;
var segundo = 0;
var timer

$(function () {
	iniciojuego();
});

function iniciojuego() {

	colortitulo();
	$('.btn-reinicio').click(function () {
        minuto = 2;
        segundo = 0;
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		revisartablero();
		$(this).text('Reiniciar');
        $("#timer").text("02:00");
        timer = setInterval(mitimer, 1000);

    
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
			resultado(candyCount);
		}
	}
}

function validacioncolumnas() {
for (var j = 0; j < 7; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyColumn = candyColumns(j);
		var comparisonValue = candyColumn.eq(0);
		var gap = false;
		for (var i = 1; i < candyColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
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
				counter += 1;
			}
			comparisonValue = candyColumn.eq(i);
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteColumnCandy(candyPosition, candyColumn);
			resultado(candyCount);
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

function resultado(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

function deleteHorizontal(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}

function deleteColumnCandy(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}

function candyColumns(index) {
	var candyColumn = giveCandyArrays('columns');
	return candyColumn[index];
}
function candyRows(index) {
	var candyRow = giveCandyArrays('rows', index);
	return candyRow;
}

function giveCandyArrays(arrayType, index) {

	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();

	var candyColumns = $([candyCol1, candyCol2, candyCol3, candyCol4,
		candyCol5, candyCol6, candyCol7
	]);

	if (typeof index === 'number') {
		var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
			candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
			candyCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return candyColumns;
	} else if (arrayType === 'rows' && index !== '') {
		return candyRow;
	}
}

function mitimer(){
    if(segundo == 0){
        if(minuto == 0){
            finJuego();
            clearInterval(timer);
            
        }else{
            minuto = minuto - 1;
            segundo = 59;
        }
    }else{
        segundo= segundo - 1;
    }
    if(segundo < 10){
        $("#timer").text("0"+minuto+":0"+segundo);
    }else{
        $("#timer").text("0"+minuto+":"+segundo);
    }
    
    
}