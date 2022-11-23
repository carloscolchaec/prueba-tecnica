fetch('http://localhost:3350/orders').then(data => data.json())
    .then(data => {
        data.data.forEach((e, i) => {
            i = i + 1;
            console.log(e)
            document.getElementById('listClients').innerHTML += `
         <tr>
            <td>${i}</td>
            <td>${e.code_order}</td>
            <td>${e.date_order}</td>
            <td>${e.ni_client}</td>
            <td>${e.name_client}</td>
            <td>${e.surname_client}</td>
            <td>${e.email_client}</td>
            <td>
            <div class="row">
            <div class="col-2">
                <button type="button" class="btn btn-danger" onclick="functionDeleteOrder('${e.code_order}')" >
                    <img class="edit-img" src="./assets/img/tash.png" alt="">
                  </button>
            </div>
            </div>
            </td>
        </tr>
        `
        });
        $(document).ready(function () {
            $('#clientsTB').DataTable();
        });
    })



let niSearch = document.getElementById('niUserNewSearch');
let timeout;
niSearch.addEventListener('keydown', () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {


        fetch(`http://localhost:3350/user/${niSearch.value}`,
            {
                methods: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json())
            .then(data => {
                console.log(data.data.length)
                if(data.data.length == 1) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Bien...',
                        text: `Se ha encontrado el cliente ${niSearch.value}`,
                      })
                    let dataUserUpdate = data.data;
                    dataUserUpdate.forEach(e => {
                        console.log(e)
                        document.getElementById('niUserUpdate').value = e.ni_client;
                        document.getElementById('nameUserNew').value = e.name_client;
                        document.getElementById('surnameUserNew').value = e.surname_client;
                        document.getElementById('emailUserNew').value = e.email_client;
                    });
                } else if (data.data.length == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'El cliente que ha introducido no existe...',
                        footer: '<a href="./clientes.html" class="text-muted">Quieres crear un nuevo cliente?</a>'
                      })
                }

            })

    }, 1000)
})



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formCreateOrder').addEventListener('submit', functionPostCreateOrder)
})


function functionPostCreateOrder(e) {
    e.preventDefault();

    var date = new Date();

    let codeOrder = document.getElementById('codeOrders').value;
    let niUserOrder = document.getElementById('niUserNewSearch').value;
    var timeOrders = date.toLocaleString();
    console.log(timeOrders);
     

    if (codeOrder.length == 0 && niUserOrder.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor rellena todos los campos!',
        })
        return;
    }

    if (codeOrder.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor rellena el codigo del pedido!',
        })
        return;
    }

    if (niUserOrder.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor ingrese el numero de identidad del cliente!',
        })
        return;
    }

    fetch('http://localhost:3350/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code_order: codeOrder,
            date_order: timeOrders,
            ni_client: niUserOrder
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status == "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Excelente...',
                    text: 'Se ha agregado un cliente nuevo!',
                })

                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Excelente...',
                    text: 'Error en el servidor interno, intenta mas tarde.',
                })
            }
        })
}

// function functionUpdateUser(ni) {
//     fetch(`http://localhost:3350/user/${ni}`,
//         {
//             methods: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         }
//     ).then(res => res.json())
//         .then(data => {

//             let dataUserUpdate = data.data;
//             dataUserUpdate.forEach(e => {
//                 console.log(e)
//                 document.getElementById('niUserUpdate').value = e.ni_client;
//                 document.getElementById('nameUserUpdate').value = e.name_client;
//                 document.getElementById('surnameUserUpdate').value = e.surname_client;
//                 document.getElementById('emailUserUpdate').value = e.email_client;
//             });

//         }).catch(error => {
//             console.error(error)
//         })
// }

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('formUpdateUser').addEventListener('submit', saveFormUpdateSaveUser);
// })

// function saveFormUpdateSaveUser(e) {
//     e.preventDefault();

//     let niUserUpdate = document.getElementById('niUserUpdate').value;
//     let nameUserUpdate = document.getElementById('nameUserUpdate').value;
//     let surnameUserUpdate = document.getElementById('surnameUserUpdate').value;
//     let emailUserUpdate = document.getElementById('emailUserUpdate').value;

//     if(niUserUpdate.length == 0 && nameUserUpdate.length == 0 && surnameUserUpdate.length == 0 && emailUserUpdate.length == 0) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Oops...',
//             text: 'Porfavor rellena todos los campos!',
//         })
//         return;
//     }

//     if(niUserUpdate.length == 0){ 
//         Swal.fire({
//             icon: 'warning',
//             title: 'Oops...',
//             text: 'Porfavor el NI es necesario!',
//         })
//         return;
//     }

//     if(nameUserUpdate.length == 0){ 
//         Swal.fire({
//             icon: 'warning',
//             title: 'Oops...',
//             text: 'Porfavor ingresa el nombre del cliente!',
//         })
//         return;
//     }

//     if(surnameUserUpdate.length == 0){ 
//         Swal.fire({
//             icon: 'warning',
//             title: 'Oops...',
//             text: 'Porfavor ingresa el apellido del cliente!',
//         })
//         return;
//         return;
//     }

//     if(emailUserUpdate.length == 0){ 
//         Swal.fire({
//             icon: 'warning',
//             title: 'Oops...',
//             text: 'Porfavor ingresa el correo electronico del cliente!',
//         })
//         return;
//     }


//     fetch('http://localhost:3350/user', {
//         method: 'PUT',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             ni_client: niUserUpdate,
//             name_client: nameUserUpdate,
//             surname_client: surnameUserUpdate,
//             email_client: emailUserUpdate
//         })
//     }).then(res => res.json())
//         .then(data => {
//             if (data.status == "success") {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Excelente...',
//                     text: 'Se ha actualizado un cliente nuevo!',
//                 })

//                 setTimeout(() => {
//                     window.location.reload();
//                 }, 800);
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Excelente...',
//                     text: 'Error en el servidor interno, intenta mas tarde.',
//                 })
//             }
//         })
// }


function functionDeleteOrder(code) {
    Swal.fire({
        icon: "warning",
        title: 'Estas seguro que deseas eliminar este cliente?',
        text: "Despues de esta acción sera irreversible el cambio.",
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            fetch('http://localhost:3350/order', {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code_order: code,
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.status == "success") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Excelente...',
                            text: 'Se ha eliminado el cliente!',
                        })

                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Excelente...',
                            text: 'Error en el servidor interno, intenta mas tarde.',
                        })
                    }
                })

        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
}