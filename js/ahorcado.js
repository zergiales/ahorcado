/* Varible del zona, donde insertaremos las letras */
const zona = document.getElementById("zona");
/* Variable de boton comprobar */
const btnComprobar = document.getElementById("btnComprobar");
/* Variable del div donde se muestra la palabra que hay que adivinar (apareceran huecos _ _ _ _ )*/
const palabraJugada = document.getElementById("palabra");
/*variable donde guardamos la etiqueta canvas*/
var pintar = document.getElementById('myCanvas');
var ctx = pintar.getContext("2d");/*toma un parametro, el tipo de contexto. */
/* varibale del div que muestra el resultado de la partida,si has ganado o has perdido */
const divResultado = document.getElementById("resultado");
/*variable div que muestra el numero de intentos que hay*/
var intentosContador=document.getElementById("intentos");
/* Clase ahorcado */
class Ahorcado {
    /*funciones  que pinta con canvas la horca y las partes del hombrecito que pintamos en la horca */
       
    horca(){
        /*TODO ESTO SE HA REALIZADO CON CANVAS */
        ctx.strokeStyle='#fff';//para ponerle color
        ctx.beginPath();//para decirle al contexto del canvas que vamos a empezar a dibujar un camino. ...
        ctx.lineWidth=5;//para ponerle grosor
        //linea vertical
        ctx.moveTo(50,150);//se mueve el borde izquierdo y la parte superior de una ventana a las coordenadas especificadas
        ctx.lineTo(150,150);//Define una línea desde un punto especificado anteriormente hasta otro punto especificado por sus coordenadas "x" e "y"
        //linea horizontal
        ctx.moveTo(100,150);
        //palo de arriba
        ctx.lineTo(100,50);
        ctx.lineTo(150,50);
        ctx.lineTo(150,65);
        ctx.stroke();//le decimos que pare de dibujar el camino
    }
    cabeza(){//CABEZA
        console.log("entra en la funcion cabeza");
        ctx.beginPath();
        ctx.arc(150,75,8,-1.5,2*Math.PI);
        ctx.stroke();
    }
    tronco(){//TRONCO
        console.log("entra en la funcion cabeza");
        ctx.beginPath();
        ctx.moveTo(150,84);
        ctx.lineTo(150,110);
        ctx.stroke();
    }  
    brazoIzq(){ //BRAZO IZQUIERDO
        console.log("entra en la funcion brazoIzq");
        ctx.beginPath();        
        ctx.moveTo(150,90);
        ctx.lineTo(135,100);
        ctx.stroke();
    }
    brazoDer(){//BRAZO DERECHO
        console.log("entra en la funcion brazoDer");
        ctx.beginPath();
        ctx.moveTo(150,90);
        ctx.lineTo(165,100);
        ctx.stroke();
    }
    piernaIzq(){//PIERNA IZQUIERDA
        console.log("entra en la funcion piernaIzq");
        ctx.beginPath();
        ctx.moveTo(150,110);
        ctx.lineTo(135,140);
        ctx.stroke();
    }                                                      
    piernaDer(){//PIERNA DERECHA
        console.log("entra en la funcion piernaDer");
        ctx.beginPath();
        ctx.moveTo(150,110);
        ctx.lineTo(165,140);
        ctx.stroke();
    }
    /* Constructor */
    constructor() {
        /*atributos */
        this.intentos = 7; //intentos por partida maximo,en realida son 6 pero le ponemos siete ,mas adelante se verá
        this.palabras=["APPLE","HP","RAZER","LENOVO","SAMSUNG","LG","MICROSOFT","GOOGLE","AMAZON"];//palabras posibles para adivinar
        this.palabraAleatoria = '';//palabra aleatoria que tendremos que resolver
        this.letras = '';//letras que contiene la palabra aleatoria
        this.huecos = [];//almacena los campos(_) de las letras que tendra la palabra aleatoria 
        pintar=this.horca();//pinta la horca que tenemos en la funcion en el div de pintar 
    }
    /* funcion que extrae una palabra aleatoria del palabras del array y la asigna al atributo palabraAleatoria */
    fPalabraAleatoria()  {
        let posicion = Math.floor(Math.random() * this.palabras.length);//posicion aleatoria del array de palabras  donde estan las posible palabras
        this.palabraAleatoria = this.palabras[posicion];//Palabra aleatoria,esta sera una palabra con una posicion aleatoria del array de palabras
        this.fSepararPalabra();//llamamos a la funcion fSepararPalabra para que nos lo separe en letras la palabra random
    }
    /* funcion que separa la palabra random en un array de letras */
    fSepararPalabra() {
        this.letras = this.palabraAleatoria.split('');//La palabra se convierte en array de letras
        /*usamos el split para que divida la palabra  lo convertimos en un array de letras. */
        console.log("array letras: "+this.letras);
        this.fGenerahuecos();//llamamos a la funcion fGenerarhuecos 
    }
    /* se genera el array a mostrar para esa palabra */
    fGenerahuecos (){
        let array = [];//creamos un array local 
        //añadiremos tantos ' _ ' como letras haya dentro del array letras
        for (let i=0 ; i<this.letras.length;i++){
              array.push(' _ '); 
        }    
        this.huecos = array;//igualamos el array que hemos declarado al inicio al array local que hemos creado en la funcion
            console.log("comprobacion de si los huecos se han metido en el array huecos "+this.huecos);//para comprobar que se ha hecho bien 
      
    }

    /* Funcion que comprueba si la letra introducida esta en la palabra a adivinar */
    fComprobar(){
        if (this.intentos > 0) {
            //creamos na variable elemento para para poder manejarlo mejor y resetear la zona
            let elemento = zona.value.trim();//Elimina posibles espacios en blanco en ambos extremos de la palabra
            zona.value = ''; //resetea el valor del zona a vacio 
            /*si el elemento es mayor que la longitud de uno */
            if (elemento.length>1) {
                if (elemento.toUpperCase() === this.palabraAleatoria.toUpperCase())
                    this.fMostrar(elemento);//llamamos a la funcion mostrar para que nos lo muestre por pantalla ,si es correcta,si no no y contaria como fallo
                else{
                    this.fFinDePartida();//funcion que contiene un mensaje de que has perddio 
                   this.cabeza(); this.tronco(); this.brazoIzq();  this.brazoDer(); this.piernaIzq();this.piernaDer(); //pintamos del tiron el monigote 
                } 
            }else{
                //bucle para comprobar si el elemento introducido por el usuario esta en la palabra
                //recorre el array de letras para comprobar si el elemnto esta presente ,si lo esta modificamos el array de los huecos
                //he utilizado for-of con el array.entries para que ademas de proporcionar el valor proporcione la posicion-index
                for (const [posicion, letra] of this.letras.entries()) {
                    if (letra.toLowerCase() === elemento.toLowerCase()){
                        this.huecos[posicion] = letra; //Se cambia _ por la letra correspondiente    
                        console.log(this.letras.entries());//comprobacion de que funciona el array iterador se recorre bien
                    }
                }
                //Si la letra introducida no esta en el array de la palabra, se resta un intento
                if (!this.letras.includes(elemento.toUpperCase())){
                    console.log(this.intentos-1);
                    intentosContador.innerHTML=this.intentos-1;//muestra por pantalla
                    this.intentos--;
                    
                    switch (this.intentos) {
                        case 6://CABEZA
                            console.log("pinta circulo");
                            this.cabeza();
                            break;
                        case 5: //TRONCO
                            console.log("pinta tronco");
                            this.tronco();
                            break;
                        case 4://BRAZO IZQUIERDO
                            console.log("pinta brazo izquierdo");
                            this.brazoIzq();
                            break;
                        case 3://BRAZO DERECHO
                            console.log("pinta brazo derecho");
                            this.brazoDer();
                            break;
                        case 2://PIERNA IZQUIERDA
                            console.log("pinta pierna izquierda");
                            this.piernaIzq();
                            break;           
                        case 1://PIERNA DERECHA
                            console.log("pinta pierna derecha");
                            this.piernaDer();    
                            this.fFinDePartida(); //funcion que muestra al jugador que ha perdido
                            break;
                        default:
                            
                    }
                }
                this.fMostrar();
            }
        }
    }
    /* Funcion que introduce en el div con id=palabra el contenido de aciertos y _ */
    fMostrar(palabraCompleta = this.huecos){
        /*ahora recargamos en el div de la palabra el contenido  */

        let caja = "<p>";
        for (const letra of palabraCompleta) {
            caja += letra.toUpperCase();
        }
        caja += "</p>";
        palabraJugada.innerHTML = caja;
        /*si acierta aparece la letra o palabra,pero las posiciones donde no se ha adivinado, aparecera "_" */
        /* COmprobacion - Salida si la palabra o el array es igual a la palabraAleatoria */
        if (this.huecos.join('').toUpperCase() === this.palabraAleatoria.toUpperCase()) 
            divResultado.innerHTML = "Has ganado";
        else if(typeof palabraCompleta === 'string') {
            if (palabraCompleta.toLowerCase() === this.palabraAleatoria.toLowerCase()) 
                divResultado.innerHTML = "Has ganado";
        }
    };
    
    /* Funcion que rellena el div con id="resultado", mostrando al jugador el mensaje de que ha perdido */
    fFinDePartida() {
        divResultado.innerHTML = "Has perdido";
    };
}

const partida = new Ahorcado();//creacion del nuevo objeto de la clase ahorcado
partida.fPalabraAleatoria();//llamamos a la funcion que contiene el objeto
partida.fMostrar();
/* Evento de boton comprobar que cuando lo pulsamos llamamos a la funcion del objeto partida fCmprobar */
btnComprobar.addEventListener("click", function () { partida.fComprobar() });