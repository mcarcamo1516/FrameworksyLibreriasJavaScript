$(function () {
	iniciojuego();
});

function iniciojuego() {

	colortitulo();
	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
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