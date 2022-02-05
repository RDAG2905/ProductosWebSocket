
const socket = io.connect()

const Enviar = ()=>{
   let nombre = document.querySelector('#nombre').value
   let precio = document.querySelector('#precio').value
   let fotoUrl = document.querySelector('#fotoUrl').value

   let valores = {
   title: nombre,
   price: precio,
   thumbnail: fotoUrl
   }

   socket.emit('addProduct',valores)
 }


const renderProducts = (productos) =>{
    const temphbs = document.querySelector("#lista").innerHTML
    const template = Handlebars.compile(temphbs)
    console.log(template)
    document.querySelector('#lista').innerHTML = template({productos}); 
  }

   
  socket.on('productos',data => {
   renderTable(data)
 });


 function renderTable(productos) {
    return fetch('plantillas/tabla.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            document.querySelector('#lista').innerHTML = html
        })
}
 
