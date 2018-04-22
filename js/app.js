var tablero = new Array();
var i = 0;
var ii = 0;

function llenartablero(){
    tablero = [];
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