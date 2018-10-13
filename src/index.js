import './index.css';
import nameGenerator from './name-generator';
import isDef from './is-def';

/* --- COOKIE HANDLER --- */

// Store/retrieve the name in/from a cookie.
const cookies = document.cookie.split(';');
console.log(cookies)
let wsname = cookies.find(function(c) {
  if (c.match(/wsname/) !== null) return true;
  return false;
});
if (isDef(wsname)) {
  wsname = wsname.split('=')[1];
} else {
  wsname = nameGenerator();
  document.cookie = "wsname=" + encodeURIComponent(wsname);
}

/* --- END COOKIE HANDLER --- */

// Set the name in the header
document.querySelector('header>p').textContent = decodeURIComponent(wsname);

/* --- WEBSOCKET HANDLER --- */

// Create a WebSocket connection to the server
const ws = new WebSocket("ws://" + window.location.host+ "/socket");

// We get notified once connected to the server
ws.onopen = (event) => {
  console.log("We are connected.");

};

/* --- END WEBSOCKET HANDLER --- */


/* --- MESSAGE HANDLER --- */

// Retrieve the input element. Add listeners in order to send the content of the input when the "return" key is pressed.
function sendMessage(event, canvas_context) {
  event.preventDefault();
  event.stopPropagation();
  
  ws.send([canvas_context.id ,canvas_context.toDataURL()]);
  
};

// A chaque message reçu
ws.onmessage = function(event) {
  var data = event.data;

  console.log("[DATA RECEIVED] : " + data);

  //cas ou le message contient des données relatives au images
  if(data.includes("data")){

    //On attrape l'url de l'image et on en créer une image
    var tempo = data.split(',')[0];
    var this_id = tempo.substr(tempo.length - 1);
  
    var url_i = data.split(',')[1] + "," +  data.split(',')[2];

    var new_img = new Image();

    new_img.src = url_i;

    var canvas_by_num = document.getElementById(this_id);

    //Si le canvas indiqué dans le message est valide, on insert l'image dans le canvas correspondant 
    if(canvas_by_num!==null)
    {
      var canvas_context_again = canvas_by_num.getContext("2d");

      new_img.onload = function(){
        canvas_context_again.drawImage(new_img, 0, 0, 300, 300);
      };
      canvas_context_again.drawImage(new_img, 0, 0, 300, 300);
    }

  }
};


// Gestion de la couleur a la fin du chargement de la page
var color = "black";

window.onload = function() {
  var text = document.querySelector('header>p').textContent;

    var a_color = "#" + text.split('#')[1];

    if(a_color.includes("#"))
    {
      color = a_color;
    }

    document.querySelector('header>p').style.color = color;
}


// creation CANVAS  

var id = 1;

function Createcanvas(image) {
  var canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  canvas.className = "canvas_class";
  canvas.id = id++;

  // Si l'image n'est pas null, on la dessine dans le canvas
  if(image!==null && image!=="undefined" && typeof image==="string")
  {
    var ctx = canvas.getContext("2d");

    var newimg = JSON.parse(image);

    ctx.drawImage(newimg, 0, 0, newimg.width, newimg.height);
  }

  // Event si on clique sur le canvas, un carré de 10px est ajouté avec la couleur de l'utilisateur
  canvas.addEventListener("mousedown", function(event) {
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = color;

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    ctx.fillRect(x,y,10,10);
  });

  // Event clone de mousedown
  canvas.addEventListener("drag", function(event) {
    var ctx = canvas.getContext("2d");
  
    ctx.fillStyle = color;
  
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
  
    ctx.fillRect(x,y,10,10);
  });

  // Event d'envoi quand on a lacher le clic
  canvas.addEventListener("mouseup", function(event) {

    var img = new Image();

    img.src = canvas.toDataURL();

    sendMessage(event, canvas);
  });

  return canvas
}

var canvas_container = document.getElementById('canvas_container');

canvas_container.insertBefore(Createcanvas(), canvas_container.children[canvas_container.childElementCount-1]);