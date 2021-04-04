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



    if (name != "" && lastName != "" && email != "" && phone != "" && coments != "" && notif != "") {
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
    } else if (name != "" && email != "" && phone != "" && dog != "noDog") {
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
        showConfirmButton: false
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer || result.dismiss === Swal.DismissReason.backdrop) {
          window.location.reload()
        }
      })
    } else if (name == "" && email == "") {
      Swal.fire({
        title: "Alerta!",
        text: "Debes ingresar los datos minimos e indispensables para el contacto!",
        icon: "error"
      })
    }
  })
  deleteInfo.addEventListener("click", () => {

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
  })
}

function myProgram(data) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('click', () => {
        window.location.assign("./carrito.html")
      })
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      toast.style.cursor = "pointer"
    }
  })

  const allElements = [...data["response"]]
  const container = document.getElementById("container")
  const tittleTypo = document.title
  let property = null


  function tienda() {
    let idItems = []

    if (tittleTypo.includes("Farmacia")) {
      property = "Medicamento"
      marketPlace(property)
    } else if (tittleTypo.includes("Juguetes")) {
      property = "Juguete"
      marketPlace(property)
    } else if (tittleTypo.includes("Carrito")) {
      carrito()
    }

    function marketPlace(property) {
      let carritoEntero = []
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
    
        <div class="image-container" style="background-image:url(${elemento.imagen});">
        </div>
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
            idItems = localStorage.getItem("itemsCarrito")
            idItems = idItems.split(",")
          }

          idItems.push(item)
          localStorage.setItem("itemsCarrito", idItems)

          // console.log(items)

          idItems.forEach(function (item) {
            carritoEntero.push(...(allElements.filter(elemento => elemento._id == item)))
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

    function carrito() {

      if (localStorage.getItem("itemsCarrito")) {
        let itemsCarrito = []
        let idItems = []
        let itemsNoRep = []
        let carritoSinRepetidos = []
        let totalAPagar = 0
        let cantidadTotal = 0
        let carritoEntero = []
        let idTotal = document.getElementById("total-pagar")
        let idTotalCantidad = document.getElementById("total-cantidad")

        let tableBody = document.getElementById("table-body")
        itemsCarrito = localStorage.getItem("itemsCarrito")
        idItems = itemsCarrito.split(",")
        itemsNoRep = new Set(itemsCarrito.split(","))
        tableBody.innerHTML = ""

        idItems.forEach(function (item) {
          carritoEntero.push(...(allElements.filter(elemento => elemento._id == item)))
        })

        itemsNoRep.forEach(function (item) {
          carritoSinRepetidos.push(...(allElements.filter(elemento => elemento._id == item)))
        })


      

        carritoSinRepetidos.sort((a, b) => {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;

        })
        console.log(carritoSinRepetidos)

        carritoEntero.forEach(producto => {

          producto.vecesRepetido = 1
          totalAPagar += producto.precio
          cantidadTotal += 1
          console.log("producto veces repetido: ", producto.vecesRepetido)
        })

        carritoSinRepetidos.forEach((producto) => {
          let sumaTot = 0
          let productoACalcularCantidad = carritoEntero.filter(item => item._id == producto._id)

          sumaTot = productoACalcularCantidad.reduce((acc, productoX) => {
            return acc = acc + productoX.vecesRepetido
          }, 0)

          producto.vecesRepetido = sumaTot
          console.log(sumaTot)
        })


        function dibujarFilas() {
          carritoSinRepetidos.forEach(producto => {
            let tr = document.createElement("tr")

            tr.innerHTML = `

            <td class="producto">${producto.nombre}</td>

            <td>$${producto.precio}</td>

            <td>${producto.vecesRepetido}</td>

            <td>$${producto.vecesRepetido * producto.precio}</td>

            <td>
            <div class="plusMinus"><img src="./assets/plus.png" class="${producto._id}A plusMinusButton"><img src="./assets/minus.png" class="${producto._id}B plusMinusButton" ></div>
            </td>

            `
            tableBody.appendChild(tr)
            let buttonPlus = document.getElementsByClassName(producto._id + "A")[0]
            let buttonMinus = document.getElementsByClassName(producto._id + "B")[0]

            buttonPlus.addEventListener("click", (e) => {
              let productoAInsertar = e.target.classList[0].slice(0, -1)

              console.log(productoAInsertar)

              idItems.push(productoAInsertar)

              localStorage.setItem("itemsCarrito", idItems)
              console.log(idItems)
              carrito()
            })
            buttonMinus.addEventListener("click", (e) => {
              console.log(e.target.classList[0])

              let productoAQuitar = e.target.classList[0].slice(0, -1)

              let indice = idItems.indexOf(productoAQuitar)

              if (indice != -1) {

                idItems.splice(indice, 1)

              }

              localStorage.setItem("itemsCarrito", idItems)

              carrito()
            })

          })
        }
        idTotalCantidad.innerText = cantidadTotal
        idTotal.innerText = "$ " + totalAPagar

        let limpiarCarrito = document.getElementById("limpiar")
        let comprarCarrito = document.getElementById("comprar")

        limpiarCarrito.addEventListener("click", () => {
          localStorage.removeItem("itemsCarrito")
          carrito()
        })
        comprarCarrito.addEventListener("click", () => {

          Swal.fire({
            title: "Success",
            text: "Your purchase is ready to be picke up. Now confirm the payment method",
            icon: "success"

          })

        })

        dibujarFilas()

      } else {
        let main = document.getElementsByClassName("main-cart")[0]
        main.innerHTML = ""
        let noItems = document.createElement("div")
        noItems.classList.add("noItems")
        noItems.innerHTML = `<h1> No hay productos en el carrito!.</h1>`
        main.appendChild(noItems)
      }
    }


  }
  tienda()
}