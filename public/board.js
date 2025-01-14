const socket = io();
function drawLine(context,x1,y1,x2,y2,color) {//cette fction permet de dessiner et d'actualiser en temps reel le dessin
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.strokeStyle=color;
    context.stroke();
    
}
document.addEventListener("DOMContentLoaded", function () { //attendre que le document soit charge
    //couleur crayon
    var color;
    document.getElementById("1").addEventListener("click",function () {
        color="skyblue";
        
    });
    document.getElementById("2").addEventListener("click",function () {
        color="mediumpurple";
        
    });
    document.getElementById("3").addEventListener("click",function () {
        color="greenyellow";
        
    });
    document.getElementById("4").addEventListener("click",function () {
        color="rosybrown";
        
    });

    //initialisation du canvas(tableau graphique)

    const canvas = document.getElementById("canvas");
    const context =canvas.getContext("2d");
    const width= window.innerWidth;
    const height= window.innerHeight;

    canvas.width=width;
    canvas.height=height;
    //dessine le mouvement
    var boolDraw=false;
    var x, y, oldX, oldX;

    canvas.onmousedown = function (e) {
        boolDraw=true;
        oldX=x;
        oldY=y;
        
    }
    canvas.onmouseup = function(e) {
        boolDraw=false;

    }
    canvas.onmousemove=function (e) {
        x=e.clientX;
        y=e.clientY;
        if(boolDraw){
            socket.emit('dessin', {
                'x1':oldX,
                'y1':oldY,
                'x2':x,
                'y2':y,
                'color':color

            });
            drawLine(context,oldX,oldY,x,y,color);
            oldX=x;
            oldY=y;

        }
        
    }

    socket.on("dessin", function (data) {
        drawLine(context, data.x1, data.y1, data.x2,data.y2, data.color);
        
    });

});