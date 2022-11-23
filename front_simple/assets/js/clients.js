fetch('http://localhost:3350/users').then(data => data.json())
    .then(data => {
        data.data.forEach((e, i) => {
            i = i + 1;
            document.getElementById('listClients').innerHTML += `
         <tr>
            <td>${i}</td>
            <td>${e.ni_client}</td>
            <td>${e.name_client}</td>
            <td>${e.surname_client}</td>
            <td>${e.email_client}</td>
            <td>
            <div class="row">
            <div class="col-4">
                <button type="button" class="btn btn-primary" data-toggle="modal" onclick="functionUpdateUser('${e.ni_client}')" data-target="#ModalEditUser">
                    <img class="edit-img" src="./assets/img/edit.ico" alt="">
                  </button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-danger" onclick="functionDeleteUser('${e.ni_client}')" >
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


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formCreateUser').addEventListener('submit', functionPostCreateUser)
})


function functionPostCreateUser(e) {
    e.preventDefault();

    let niUser = document.getElementById('niUser').value;
    let nameUser = document.getElementById('nameUser').value;
    let surnameUser = document.getElementById('surnameUser').value;
    let emailUser = document.getElementById('emailUser').value;

    if (niUser.length == 0 && nameUser.length == 0 && surnameUser.length == 0 && emailUser.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor rellena todos los campos!',
        })
        return;
    }

    if (niUser.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor rellena el numero de identidad!',
        })
        return;
    }

    if (nameUser.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor ingresa el nombre del cliente!',
        })
        return;
    }

    if (surnameUser.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor ingresa el apellido del cliente!',
        })
        return;
    }

    if (emailUser.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor ingresa el correo electronico del cliente!',
        })
        return;
    }

    fetch('http://localhost:3350/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ni_client: niUser,
            name_client: nameUser,
            surname_client: surnameUser,
            email_client: emailUser
        })
    }).then(res => res.json())
        .then(data => {
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

function functionUpdateUser(ni) {
    fetch(`http://localhost:3350/user/${ni}`,
        {
            methods: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    ).then(res => res.json())
        .then(data => {

            let dataUserUpdate = data.data;
            dataUserUpdate.forEach(e => {
                console.log(e)
                document.getElementById('niUserUpdate').value = e.ni_client;
                document.getElementById('nameUserUpdate').value = e.name_client;
                document.getElementById('surnameUserUpdate').value = e.surname_client;
                document.getElementById('emailUserUpdate').value = e.email_client;
            });

        }).catch(error => {
            console.error(error)
        })
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formUpdateUser').addEventListener('submit', saveFormUpdateSaveUser);
})

function saveFormUpdateSaveUser(e) {
    e.preventDefault();

    let niUserUpdate = document.getElementById('niUserUpdate').value;
    let nameUserUpdate = document.getElementById('nameUserUpdate').value;
    let surnameUserUpdate = document.getElementById('surnameUserUpdate').value;
    let emailUserUpdate = document.getElementById('emailUserUpdate').value;

    if(niUserUpdate.length == 0 && nameUserUpdate.length == 0 && surnameUserUpdate.length == 0 && emailUserUpdate.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor rellena todos los campos!',
        })
        return;
    }

    if(niUserUpdate.length == 0){ 
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor el NI es necesario!',
        })
        return;
    }

    if(nameUserUpdate.length == 0){ 
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor ingresa el nombre del cliente!',
        })
        return;
    }

    if(surnameUserUpdate.length == 0){ 
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor ingresa el apellido del cliente!',
        })
        return;
        return;
    }

    if(emailUserUpdate.length == 0){ 
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor ingresa el correo electronico del cliente!',
        })
        return;
    }


    fetch('http://localhost:3350/user', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ni_client: niUserUpdate,
            name_client: nameUserUpdate,
            surname_client: surnameUserUpdate,
            email_client: emailUserUpdate
        })
    }).then(res => res.json())
        .then(data => {
            if (data.status == "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Excelente...',
                    text: 'Se ha actualizado un cliente nuevo!',
                })

                setTimeout(() => {
                    window.location.reload();
                }, 800);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Excelente...',
                    text: 'Error en el servidor interno, intenta mas tarde.',
                })
            }
        })
}


function functionDeleteUser(niClient) {
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
            fetch('http://localhost:3350/user', {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ni_client: niClient,
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