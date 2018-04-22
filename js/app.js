var tablero = new Array();
var i = 0;
var ii = 0;
var cont1 = 1;
//escuachas
$(".btn-reinicio").click( function(){
    llenartablero();
    mostrartablero();
    $(".btn-reinicio").text("Reiniciar");
});


//funciones
function llenartablero(){
    tablero = [];
    i=0;
    while(i < 7){
        tablero[i]=new Array();
        ii=0;
        while(ii < 7){
            tablero[i][ii] = Math.floor(Math.random() * 4) + 1;
            ii ++;
        }
        i++;
    }
    
}
function mostrartablero(){
    i=0;
    ii=0;
    cont1=1;
    $("div[class^='col']").empty();
    
    while(ii < 7){
        i=0;
        while(i < 7){
            $(".col-"+cont1).prepend("<img src='image/"+tablero[i][ii]+".png' class='elemento'>");
            i++;
        }
        ii++;
        cont1++;
    }
    
}