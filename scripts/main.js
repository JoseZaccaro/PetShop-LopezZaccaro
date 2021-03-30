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

  if (document.documentElement.scrollTop >= 40) {
    headerPage.classList.replace("header-nav", "page")

  } else if (document.documentElement.scrollTop < 10) {
    headerPage.classList.replace("page", "header-nav")

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


  submitBtn.addEventListener("click", (event) => {
    // event .preventDefault()
    localStorage.setItem("name", nameInput.value)
    localStorage.setItem("last_name", lastNameInput.value)
    localStorage.setItem("email", emailInput.value)
    localStorage.setItem("phone_number", telephoneInput.value)
    localStorage.setItem("coments", comentsArea.value)
    localStorage.setItem("allow_notif", notifInput.checked ? "allow" : "deny")
    localStorage.setItem("dog", dogInput.checked ? "dog" : "noDog")
    localStorage.setItem("cat", catInput.checked ? "cat" : "noCat")

    let name = localStorage.getItem("name")
    let lastName = localStorage.getItem("last_name")
    let email = localStorage.getItem("email")
    let phone = localStorage.getItem("phone_number")
    let coments = localStorage.getItem("coments")
    let notif = localStorage.getItem("allow_notif")
    let dog = localStorage.getItem("dog")
    let cat = localStorage.getItem("cat")



    if (name && lastName && email && phone && coments && notif) {
      event.preventDefault()
      Swal.fire({
        timer: 4000,
        title: `Genial!!`,
        text: `Atrapa el pug y gana un premio!!!`,
        icon: 'success'
      })
    } else if (name && email && phone && dog != "noDog") {
      event.preventDefault()

      Swal.fire({
        timer: 5000,
        title: "Que bien!",
        text: "Serás contactado a la brevedad (Nosotros también adoramos a los caninos🐕!)",
        icon: "success"
      })
    } else if (name && email) {

      event.preventDefault()
      Swal.fire({
        timer: 3000,
        title: `Bien hecho ${name}`,
        text: `Se te enviará un email a la direccion ${email} la brevedad!`,
        icon: 'success'
      })
    }
  })

  deleteInfo.addEventListener("click", () =>
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
        })
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
  )
}

function myProgram(data) {
  const allElements = [...data["response"]]
  const table = document.getElementById("table-body")
  const container = document.getElementById("container")
  const tittleTypo = document.title
  let property = null


  if (localStorage.getItem("itemsCarrito")) {
    let itemsCarrito = localStorage.getItem("itemsCarrito")
    let items = itemsCarrito.split(",")
    let carrito = []
    items.forEach(function(item){
    carrito.push(...(allElements.filter(elemento => elemento._id == item )))  
  })
    if(tittleTypo.includes("Carrito")){

      tableStorage(carrito)
    
    }
    console.log(items)
    console.log(carrito)
  } else {

    itemsCarrito = []
  }
  

  function tableStorage(itemsCarrito) {
    // let datosFiltrados = allElements.filter(elemento => elemento.tipo == property)
    itemsCarrito.map(elemento =>
      table.innerHTML += `
    <tr>
    <td>${elemento.nombre}</td>
    <td>${elemento.stock}</td>
    <td>$${elemento.precio}</td>
    <td></td>
    </tr>
    `)
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
    
    <button class="btn btn-warning">Comprar</button>
    
    <button class="btn btn-success" id="${elemento._id}"><img src="./assets/carrito.png" alt="carro" class="item-carrito"> Añadir</button>
    </div>
    
    `

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
          if (localStorage.getItem("itemsCarrito")) {
          items = localStorage.getItem("itemsCarrito")
          items = items.split(",")
          if(item != ""){

            Swal.fire({
              text: 'Toast with custom target',
              target: '#custom-target',
              customClass: {
                container: 'position-absolute'
              },
              toast: true,
              position: 'bottom-right'
            })
          }
        }

          items.push(item)
          localStorage.setItem("itemsCarrito", items)
          console.log(items)
        })
        contador++
      })
      let perro = document.createElement("div")
      perro.classList.add("item-pug")
      perro.innerHTML += `
  <img src="./assets/pugTexto.png" alt="pug-footer">
  `
      container.appendChild(perro)
    }
    storage(property)
  }

  if (document.title.includes("Carrito")) {
    // console.log(items)
    // tableStorage(itemsCarrito)
  } else {
    tienda()
  }
}