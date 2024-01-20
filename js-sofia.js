// 1. (3,5 puntos) Definir una clase FACTURA que almacena una factura. Una factura está formada por la información de la propia factura (nombre de la empresa, CIF, nombre_cliente, importe_total, IVA) y una lista de líneas de factura (cada una de los cuales dispone de nombre_producto , precio, cantidad).

// Una vez definidas las propiedades del objeto, añadir a la clase Factura un método que calcule el importe_total de la factura.

// Prueba los distintos métodos y propiedades con un ejemplo EN LA CONSOLA.

// 2 (1,5 puntos) Diseña un formulario que permite introducir los datos de la factura y muestre los resultados por pantalla.



const Factura = class {
    constructor(nombre_empresa, CIF, nombre_cliente) {
        this._nombre_empresa = nombre_empresa;
        this._CIF = CIF;
        this._nombre_cliente = nombre_cliente;
        this._IVA = 21;
        this._lineas_factura = [];
    }

    //GETTERS Y SETTERS
    get get_nombre_empresa() {
        return this._nombre_empresa;
    }

    set set_nombre_empresa(nombre_empresa) {
        this._nombre_empresa = nombre_empresa;
    }

    get get_CIF() {
        return this._CIF;
    }

    set set_CIF(CIF) {
        this._CIF = CIF;
    }

    get get_nombre_cliente() {
        return this._nombre_cliente;
    }

    set set_nombre_cliente(nombre_cliente) {
        this._nombre_cliente = nombre_cliente;
    }

    get get_IVA() {
        return this._IVA;
    }

    set get_IVA(IVA) {
        this._IVA = IVA;
    }

    get get_lineas_factura() {
        return this._lineas_factura;
    }

    set set_lineas_factura(lineas_factura) {
        this._lineas_factura = lineas_factura;
    }

    agregar_linea(linea) {
        this._lineas_factura.push(linea);
    }

    //METODOS


    agregarLineaFactura() {
        const nombre_producto = document.getElementById('nombre_producto').value;
        let precio = document.getElementById('precio').value;
        let cantidad = document.getElementById('cantidad').value;
    

        //COMPROBACIONES

        if (!nombre_producto) {
            alert('El nombre del producto no puede estar vacío.');
            return;
        }
    
        //ya hago una comprobacion en el HTML de que es de type=number pero lo añado por si acaso
        if (isNaN(precio) || isNaN(cantidad)) {
            alert('El precio y la cantidad deben ser valores numéricos.');
            return;
        }
    
        precio = Number(precio);
        cantidad = Number(cantidad);
    
        if (precio <= 0 || cantidad <= 0) {
            alert('El precio y la cantidad deben ser mayores que 0.');
            return;
        }
    
        //Crear una nueva línea de factura y agregarla
        const linea = new LineaFactura(nombre_producto, precio, cantidad);
        this._lineas_factura.push(linea);
        document.getElementById('lineas_factura').innerText += linea.toString() + '\n';
    }
    

    //NO LO HE PROBADO EN EL CONSOLE.LOG YA QUE SE VE QUE FUNCIONA EN EL FORMULARIO
    calcularImporteTotal() {
        let importe_total = 0;
    
        //Recorremos todas las líneas de factura
        for(let i = 0; i < this._lineas_factura.length; i++) {
            let linea_factura = this._lineas_factura[i]; //posicion actual
            let importe_linea = linea_factura._precio * linea_factura._cantidad; //calculamos la cantidad
            importe_total += importe_linea; //añadimos
        }
    
        let importe_IVA = importe_total * this._IVA / 100;
        importe_total += importe_IVA;

        this._importe_total = importe_total.toFixed(2); //actualizamos el total de la factura y la printeamos 
        document.getElementById('importe_total').innerText = 'El importe total de tu factura es ' + this._importe_total;
    
        // return "El importe total de tu factura es " + this._importe_total;
    }

    borrarFactura() {
        this._nombre_empresa = '';
        this._CIF = '';
        this._nombre_cliente = '';
        this._IVA = 21;
        this._lineas_factura = [];
    }
    

    //METODO TOSTRING
    toString() {
        let lineas = '';
        for(let i = 0; i < this._lineas_factura.length; i++) { //Como lineas_facturas en un array y es lo que vamos a meter en facturas, para sacar la información hay que hacer un bucle
            lineas += this._lineas_factura[i].toString() + '\n';
        }
        return 'Nombre de la empresa: ' + this._nombre_empresa + '\n'
         +'CIF: ' + this._CIF  + '\n'
         + 'Nombre del cliente: '  + '\n'
         + this._nombre_cliente + '\n'
         + 'IVA: ' + this._IVA  + '\n'
         + 'Líneas que hay en la factura: '   + '\n'
         + lineas + '\n';
    }

    }



const LineaFactura = class {

    //Constructor
    constructor(nombre_producto, precio, cantidad) {
        this._nombre_producto = nombre_producto;
        this._precio = precio;
        this._cantidad = cantidad;
    }

    //GETTERS Y SETTERS
    get get_nombre_producto() {
        return this._nombre_producto;
    }

    set set_nombre_producto(nombre_producto) {
        this._nombre_producto = nombre_producto;
    }

    get get_precio() {
        return this._precio;
    }

    set set_precio(precio) {
        this._precio = precio;
    }

    get get_cantidad() {
        return this._cantidad;
    }

    set set_cantidad(cantidad) {
        this._cantidad = cantidad;
    }

    //TO STRING METODO
    toString() {
        return ' - Nombre del producto: ' 
        + this._nombre_producto + '\n' + ' - Precio: '
        + this._precio + '\n' + ' - Cantidad: '
        + this._cantidad + '\n';
    }

}

//EJECUTO LAS FUNCIONES DE LOS BOTONES

document.getElementById('agregarLineaFactura').addEventListener('click', function() {
    factura.agregarLineaFactura();
});

////
document.getElementById('calcularImporteTotal').addEventListener('click', function() {
    factura.calcularImporteTotal();
});

/////
var lineas_factura = document.getElementById('lineas_factura');
lineas_factura = "";
var importe_total = document.getElementById('"importe_total');
importe_total = "";

document.getElementById('BorrarFactura').addEventListener('click', function() {
    factura.borrarFactura();

    document.getElementById('facturaForm').reset();

    //Borrar lo que habia en los divs
    document.getElementById('lineas_factura').innerText = "";
    document.getElementById('importe_total').innerText = "";
});

//EJEMPLOS

//Crear linea
let libro = new LineaFactura('Como programar en JavaScript', 10, 1);

console.log(libro.toString());

let peras = new LineaFactura('Peras', 3.7, 8); 

console.log(peras.toString());

let peces = new LineaFactura('Peces', 545, 98); 

//Crear factura
let factura = new Factura('SofiaSA', '1234567', 'Doña María Constitución Del Rocío de los Cármenes');

let factura2 = new Factura('Empresa Genérica', '34243242424', 'Pepito Marinero');

//Añadimos las líneas a la factura
factura.agregar_linea(libro);
factura.agregar_linea(peras);

factura2.agregar_linea(peces);

console.log(factura.toString()); 

console.log(factura2.toString()); 


document.getElementById('nombre_empresa').innerText = 'Nombre de la empresa: ' + factura.get_nombre_empresa;

document.getElementById('CIF_empresa').innerText = 'CIF: ' + factura.get_CIF;

document.getElementById('nombre_cliente').innerText = 'Comprador: ' + factura.get_nombre_cliente;

// Total
// console.log(factura.calcular_importe_total());
