var tablero = new Array();
var tableroeliminados = new Array();
var i = 0;
var ii = 0;
var cont1 = 1;
var minuto = 2;
var segundo = 0;
var timer;
var tablerorevisado = false;
var contv1 = 0;
var contv2 = 0;
var contv3 = 0;
var contv4 = 0;
var contaux = 0;
var total = 0;
var parcial = 0;
var encontrado = false;
var aux;

//escuachas
$(".btn-reinicio").click( function(){
    total=0;
    llenartablero();
    mostrartablero();
    minuto = 2;
    segundo = 0;
    $(".btn-reinicio").text("Reiniciar");
    $("#timer").text("02:00");
    clearInterval(timer);
    timer = setInterval(mitimer, 1000);
    verificartablero();
    eliminardulces();
});

colortitulo();



//funciones
//funcio para llenar tablero
function llenartablero(){
    tablero = [];
    tableroeliminados =[];
    i=0;
    while(i < 7){
        tablero[i]=new Array();
        tableroeliminados[i]= new Array();
        
        ii=0;
        while(ii < 7){
            tablero[i][ii] = Math.floor(Math.random() * 4) + 1;
            tableroeliminados[i][ii] = false;
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
            $(".col-"+cont1).prepend("<div class='casilla-"+i+"-"+ii+"'><img src='image/"+tablero[i][ii]+".png' class='elemento'></div>");
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
//verificacion de tablero
function verificartablero(){
    contv1 = 0;
    contaux = 0;
    encontrado = false;
    //verificacion vertical
    while(contv1 < 7){
        contv2 = 0;
        contv3 = 1;
        contv4 = 2;
        contaux=0;
        while(contv2 < 5)
        {
            if(tablero[contv1][contv2] == tablero[contv1][contv3] && tablero[contv1][contv3] == tablero[contv1][contv4])
            {
                contaux = contaux + 1;
                tableroeliminados[contv1][contv2] = true;
                tableroeliminados[contv1][contv3] = true;
                tableroeliminados[contv1][contv4] = true;
                encontrado = true;
                if(contv2 == 4){
                    parcial = contaux * 10;
                    total= parcial +total;
                    contaux= 0;
                    $("#score-text").text(total);
                }

            }else if(contaux > 0){
                parcial = contaux * 10;
                total= parcial +total;
                contaux= 0;
                $("#score-text").text(total);
                
            }

            
                contv2 = contv2 + 1;
                contv3 = contv3 + 1;
                contv4 = contv4 + 1;
        }
        contv1 = contv1 + 1;
        
    }
    //verifivacion horizontal
    contv1 = 0;
    
    
    while(contv1 < 7){
        contv2 = 0;
        contv3 = 1;
        contv4 = 2;
        contaux=0;
        while(contv2 < 5)
        {
            if(tablero[contv2][contv1] == tablero[contv3][contv1] && tablero[contv3][contv1] == tablero[contv4][contv1])
            {
                contaux = contaux + 1;
                tableroeliminados[contv2][contv1] = true;
                tableroeliminados[contv3][contv1] = true;
                tableroeliminados[contv4][contv1] = true;
                encontrado = true;
                if(contv2 == 4){
                    parcial = contaux * 10;
                    total= parcial +total;
                    contaux= 0;
                    $("#score-text").text(total);
                }

            }else if(contaux > 0){
                parcial = contaux * 10;
                total= parcial +total;
                contaux= 0;
                $("#score-text").text(total);
                
            }

            
                contv2 = contv2 + 1;
                contv3 = contv3 + 1;
                contv4 = contv4 + 1;
        }
        contv1 = contv1 + 1;
        
    }
    //fin de recorido de matriz
}
//fin verificacion de tablero

// eliminacion de dulces
function eliminardulces(){
    i=0;
    ii=0;
    while(ii < 7){
          i=0;
            while(i < 7){
                if(tableroeliminados[ii][i]){
                    $(".casilla-"+ii+"-"+i).empty();
                    }
                  i++;  
                    
                }
                ii++;
    }
    
}

