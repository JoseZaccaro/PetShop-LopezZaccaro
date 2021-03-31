if (document.title.includes("Farmacia") || document.title.includes("Juguetes") || document.title.includes("Carrito")) {
  fetch("https://apipetshop.herokuapp.com/api/articulos", )
    .then(resolve => resolve.json())
    .then(data => myProgram(data))
    .catch(error => loading(error))
} else if (document.title.includes("Contacto")) {
  form()
}



window.onload = function () {
  let main = undefined
  if (document.title.includes("Inicio")) {
    main = document.getElementById("main-index")
  } else if (document.title.includes("Farmacia")) {
    main = document.getElementById("main-farma")
  } else if (document.title.includes("Juguetes")) {
    main = document.getElementById("main-toys")

  } else if (document.title.includes("Contacto")) {
    main = document.getElementById("main-contact")
  } else if (document.title.includes("Carrito")) {
    main = document.getElementById("main-cart")
  }

  let preLoader = document.getElementById("pre-loader")
  const body = document.getElementById("body")
  main.removeChild(preLoader)
  body.classList.remove("over-hidden")

};

function loading(error) {
  var body = document.getElementById("body");
  console.log(error)
  body.innerHTML = `<h1 style="text-align:center"> Error al cargar la página</h1>
  <img src="../assets/error.png" alt="error" style= "width:50%; position:fixed; left:25%; top:10%; border:solid black;">`
}


const headerPage = document.getElementById("header")
document.addEventListener("scroll", navBar);

function navBar() {
  if (!document.title.includes("Carrito")) {
    if (document.documentElement.scrollTop >= 40) {
      headerPage.classList.replace("header-nav", "page")
    } else if (document.documentElement.scrollTop < 10) {
      headerPage.classList.replace("page", "header-nav")
    }
  }
}

function form() {
  const formulario = document.getElementById("form")
  const nameInput = document.getElementById('name');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const telephoneInput = document.getElementById('phone');
  const notifInput = document.getElementById('check');
  const dogInput = document.getElementById('perro');
  const catInput = document.getElementById('gato');
  const comentsArea = document.getElementById('comentarios');
  const submitBtn = document.getElementById('submit');
  const deleteInfo = document.getElementById('delete');

  if (localStorage.getItem("pug") != "no") {
    localStorage.setItem("pug", "no")
    pug.classList.replace("visible", "hidden")
  }
  submitBtn.addEventListener("click", (event) => {

    localStorage.setItem("name", nameInput.value)
    localStorage.setItem("last_name", lastNameInput.value)
    localStorage.setItem("email", emailInput.value)
    localStorage.setItem("phone_number", telephoneInput.value)
    localStorage.setItem("coments", comentsArea.value)
    localStorage.setItem("allow_notif", notifInput.checked ? "allow" : "deny")
    localStorage.setItem("dog", dogInput.checked ? "dog" : "noDog")
    localStorage.setItem("cat", catInput.checked ? "cat" : "noCat")
    localStorage.setItem("pug", "no")

    let name = localStorage.getItem("name")
    let lastName = localStorage.getItem("last_name")
    let email = localStorage.getItem("email")
    let phone = localStorage.getItem("phone_number")
    let coments = localStorage.getItem("coments")
    let notif = localStorage.getItem("allow_notif")
    let dog = localStorage.getItem("dog")
    let cat = localStorage.getItem("cat")

    let pug = document.getElementById("pug")



    if (name!="" && lastName!="" && email!="" && phone!="" && coments!="" && notif!="") {
      event.preventDefault()

      Swal.fire({
        timer: 10000,
        title: `Genial!!`,
        text: `Atrapa el pug y gana un premio!!!`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "A jugar!",
        cancelButtonText: "Adios!",
        cancelButtonColor: "#EB4134"
      }).then((result) => {

        if (result.isConfirmed) {

          if (localStorage.getItem("pug") != "si") {

            localStorage.setItem("pug", "si")

            pug.classList.replace("hidden", "visible")

            pug.addEventListener("click", () => {

              Swal.fire({
                title: "Felicidades!!!",
                text: `Ganaste un saludo especial ${name} que tengas un buen día!`,
                showConfirmButton: true,
                confirmButtonText: "Gracias!",
                showCancelButton: false,
                timer: "10000"
              }).then((result) => {
                if (result.isConfirmed) {
                  pug.classList.replace("visible", "hidden")
                  window.location.reload()
                }
              })
            })
          }
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title: 'Muchas gracias!',
            text: 'Nos pondremos en contacto a la brevedad!',
            showConfirmButton: false,
            icon: "success",
            timer: 2500
          }).then(result => {
            window.location.reload()
          })
        }


      })
    } else if (name!="" && email!="" && phone!="" && dog != "noDog") {
      event.preventDefault()

      Swal.fire({
        timer: 5000,
        title: "Que bien!",
        text: "Serás contactado a la brevedad (Nosotros también adoramos a los caninos🐕!)",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    } else if (name != "" && email.includes("@")) {

      event.preventDefault()
      Swal.fire({
        timer: 2500,
        title: `Bien hecho ${name}`,
        text: `Se te enviará un email a la direccion ${email} la brevedad!`,
        icon: 'success',
        showConfirmButton:false
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer || result.dismiss === Swal.DismissReason.backdrop) {
          window.location.reload()
        }
      })
    }else if(name == "" && email == ""){
      Swal.fire({
        title:"Alerta!",
        text:"Debes ingresar los datos minimos e indispensables para el contacto!",
        icon:"error"
      })
    }
})
  deleteInfo.addEventListener("click", () =>{

    Swal.fire({
      title: 'Segur@ que deseas eliminar tus datos? ',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar.'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          timer: 2000,
          title: 'Borrado!',
          text: 'Tus datos fueron borrados con exito.',
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
            localStorage.removeItem("name")
            localStorage.removeItem("last_name")
            localStorage.removeItem("email")
            localStorage.removeItem("phone_number")
            localStorage.removeItem("coments")
            localStorage.removeItem("allow_notif")
            localStorage.removeItem("dog")
            localStorage.removeItem("cat")
          }
        })

      }
    })
  }
)}

function myProgram(data) {

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('click', ()=>{window.location.href("./index.html")})
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const allElements = [...data["response"]]
  const container = document.getElementById("container")
  const tittleTypo = document.title
  let property = null
  let carrito = []

  

  if (tittleTypo.includes("Carrito")) {

    if (localStorage.getItem("itemsCarrito")) {
    let carritoSinRepetidos = []
    let main = document.getElementsByClassName("main-cart")[0]
    let tablaProductos = document.createElement("article")
    let itemsCarrito = localStorage.getItem("itemsCarrito")
    let items = itemsCarrito.split(",")
    let itemsNoRep = new Set(items)
    let totalAPagar = 0


    items.forEach(function (item) {
      carrito.push(...(allElements.filter(elemento => elemento._id == item)))
    })

    itemsNoRep.forEach(function (item) {
      carritoSinRepetidos.push(...(allElements.filter(elemento => elemento._id == item)))
    })



    carrito.forEach(producto => {
    if(totalAPagar != 0){
       totalAPagar = totalAPagar + producto.precio
     }else{
       totalAPagar = producto.precio
     }
    })
    let arrayRepetidos = []

    for (let i = 0; i < carritoSinRepetidos.length; i++) {
      let producto1 = carritoSinRepetidos[i]
      producto1.vecesRepetido = 0
      for (let iB = 0; iB < carrito.length; iB++) {
        let producto2 = carrito[iB]

        if (producto1 == producto2) {
          producto1.vecesRepetido += 1
          let nombreProductoRepetido = producto1.nombre
            arrayRepetidos.push({
              vecesRepetido:producto1.vecesRepetido,
              productoRepetido:nombreProductoRepetido}
              )
            
              // console.log(arrayRepetidos)
          } 
        }
      }
    
      tablaProductos.classList.add("show-table")
      tablaProductos.innerHTML = `
      <table class="table table-hover">
        <thead class="table-dark">
         <tr>
            <th>Producto</th>
            <th class="text-center">Precio Unitario </th>
            <th class="text-center">Cantidad</th>
            <th class="text-center">Total a pagar</th>
            <th></th>
         </tr>
        </thead>
        <tbody class="table-light" id="table-body">

        </tbody>
        <tfoot class="table-dark table-active">
        <tr>
        <td class="text-center">Total:</td>
          <td></td>
          <td></td>
          <td class="text-center">$ ${totalAPagar}</td>
          <td></td>
          </tr>
        </tfoot>
      </table>
    `
      main.appendChild(tablaProductos)
      carritoSinRepetidos.map(elemento =>{
        let tbody = document.getElementById("table-body")
        let tr = document.createElement("tr")
          tr.innerHTML += `
            <tr>
              <td class="producto">${elemento.nombre}</td>
              <td>$${elemento.precio}</td>
              <td>${elemento.vecesRepetido}</td>
              <td>$${elemento.vecesRepetido * elemento.precio}</td>
              <td>
              <div class="plusMinus"><img src="./assets/plus.png" class="${elemento._id}A plusMinusButton"><img src="./assets/minus.png" class="${elemento._id}B plusMinusButton" ></div>
              </td>
              
            </tr>
            `
          tbody.appendChild(tr)

          let botonA = document.getElementsByClassName(elemento._id + "A")[0]
          let botonB = document.getElementsByClassName(elemento._id+"B")[0]
          
          botonA.addEventListener("click",(e)=>{
            // console.log(e.target.classList[0].slice(0,-1))
            let productoAInsertar = e.target.classList[0].slice(0,-1)
            items.push(productoAInsertar)
            
            localStorage.setItem("itemsCarrito",items)
            
            location.reload()



          })

          botonB.addEventListener("click",(e)=>{
            // console.log(e.target.classList[0].slice(0,-1))
            let productoAQuitar = e.target.classList[0].slice(0,-1)
            let ordenar = [...items]
            
            ordenar.sort((a,b)=>a-b);
            console.log(ordenar)
            let indice = ordenar.indexOf(productoAQuitar)

            if(indice != -1){
              ordenar.splice(indice,1)
            }
            // items.pop(productoAQuitar)

            localStorage.setItem("itemsCarrito",ordenar)
            window.location.reload()
          })

        })
      
      // console.log("items",items)
      // console.log("carrito",carrito)
      // console.log("carrito sin rep",carritoSinRepetidos)
        
      let buttons = document.createElement("div")

      let comprar = document.createElement("button")

      let limpiarCarrito = document.createElement("button")

      comprar.classList.add("btn","btn-primary")
      comprar.innerText = "Comprar"

      limpiarCarrito.classList.add("btn","btn-danger")
      limpiarCarrito.innerText = "Eliminar carrito"
      buttons.appendChild(comprar)

      buttons.appendChild(limpiarCarrito)

      buttons.classList.add("buttons-cart")
      limpiarCarrito.addEventListener("click",()=>{
        localStorage.removeItem("itemsCarrito")
        window.location.reload()
      })
      // comprar.addEventListener("click", ()=> {
      //   main.innerHTML = `
      //   <div class="gracias">

      //   <h1>Muchas gracias por su compra!</h1>
      //   <div> </div>
      //   </div>
      //   `
      // })
      main.appendChild(buttons)

    } else {




     let main = document.getElementsByClassName("main-cart")[0]
      let noItems = document.createElement("div")
      noItems.classList.add("noItems")
      noItems.innerHTML = `<h1> No hay productos en el carrito!.</h1>` 
      main.appendChild(noItems)
      
    }
  }

  function tienda() {
    let items = []

    if (tittleTypo.includes("Farmacia")) {
      property = "Medicamento"
    } else if (tittleTypo.includes("Juguetes")) {
      property = "Juguete"
    }

    function storage(property) {
      let contador = 0
      let datosFiltrados = allElements.filter(elemento => elemento.tipo == property)
      datosFiltrados.map((elemento) => {

        let stock = null
        if (elemento.stock <= 5) {
          stock = `<span class="last-units"> Ultimas unidades!!! </span>`
        } else if (elemento.stock <= 0) {
          stock = `<span class="no-units">Sin Stock</span>`
        } else {
          stock = `<span"> Stock: ${elemento.stock} unidades. </span>`
        }

        let carta = document.createElement("div")
        carta.classList.add("item-list")

        carta.innerHTML = `
    
    <img src= "${elemento.imagen}" alt="img" class="item-image">
    <p class = "item-description"><strong> ${elemento.nombre}</strong></p>
    <p class = "item-description">${stock} </p>
    <p class = "item-description"><span class="dollar">$ ${elemento.precio} </span></p>
    <div id"original-${contador}">
    <p class="text-capitalize read-more" id="read-${contador}" >leer más...</p>
    </div>
    <div class ="buttons">
    
    
    <button class="btn btn-success" id="${elemento._id}"><img src="./assets/carrito.png" alt="carro" class="item-carrito ${elemento._id}"> Añadir al carrito.</button>

      
    </div>
    
    `
{/* <div id="cantidad">
        <input type="number" min="1" max="${elemento.stock }" step="1" value="1">
      </div> */}
        container.appendChild(carta)
        let desc = document.getElementById("read-" + contador)
        desc.addEventListener("click", () => {
          if (desc.innerText != elemento.descripcion) {

            desc.innerText = elemento.descripcion
            desc.classList.add("overflow-scroll", "descripcion")
            desc.classList.remove("read-more", "text-capitalize")


            let readLess = document.createElement("p")

            readLess.innerText = "Leer Menos..."

            readLess.classList.add("read-more")

            readLess.addEventListener("click", () => {
              desc.innerText = "leer más..."
              desc.classList.remove("overflow-scroll", "descripcion")
              desc.classList.add("read-more", "text-capitalize")
              readLess.parentElement.removeChild(readLess)

            })
            desc.parentElement.appendChild(readLess)
          }
        })

        document.getElementById(elemento._id).addEventListener("click", (e) => {
          let item = e.target.id

          if (item == "") {
            item = e.path[0].classList[1]
          }
          if (localStorage.getItem("itemsCarrito")) {
            items = localStorage.getItem("itemsCarrito")
            items = items.split(",")
          }

          items.push(item)
          localStorage.setItem("itemsCarrito", items)

          // console.log(items)

          items.forEach(function (item) {
            carrito.push(...(allElements.filter(elemento => elemento._id == item)))
          })


          Toast.fire({
            text: 'Producto añadido al carrito.',
            target: '#custom-target',
            customClass: {
              container: 'position-fixed'
            },
            icon: "success",           
          })
        })
        contador++


      })

      let perro = document.createElement("div")
      perro.classList.add("item-pug")
      perro.innerHTML += `
      <img src="./assets/pugTexto.png" alt="pug-footer">
      `
      container.appendChild(perro)
      // datosFiltrados.forEach(item => {masYMenos(datosFiltrados.indexOf(item))})

    }
    storage(property)


  }


  if (!document.title.includes("Carrito")) {

    tienda()
  }
}