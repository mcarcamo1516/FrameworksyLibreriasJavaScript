var tablero = new Array();
var i = 0;
var ii = 0;
var cont1 = 1;
var minuto = 2;
var segundo = 0;
var timer;

//escuachas
$(".btn-reinicio").click( function(){
    llenartablero();
    mostrartablero();
    minuto = 2;
    segundo = 0;
    $(".btn-reinicio").text("Reiniciar");
    $("#timer").text("02:00");
    
    timer = setInterval(mitimer, 1000);
});

colortitulo();



//funciones
//funcio para llenar tablero
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
    $(".panel-tablero").show();
    $(".time").show();
    $(".panel-score").css("width","25%");
    $(".titulo-over").remove();
    
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
//fin de funciones para mostrar 
function mitimer(){
    if(segundo == 0){
        if(minuto == 0){
            findejuego();
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

function colortitulo(){
    $(".main-titulo").animate({color: '#fff' },1000,revertircolor);
}
function revertircolor(){
    $(".main-titulo").animate({color: '#DCFF0E' },1000,colortitulo);  
}

//fin de juego
function findejuego(){
    $(".panel-tablero").hide("slow");
    $(".time").hide("slow");
    $(".panel-score").css("width","100%");
    $(".panel-score").prepend("<h2 class='titulo-over'>Fin De Juego </h2>");

    return;
}


