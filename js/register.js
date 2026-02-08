const registerForm = document.getElementById("registerForm")
/* escuchamos el evento submit del formulario de registro */
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    /* asignamos a variables los values de los inputs que ingresa el usuario */
    const fname = document.getElementById("fullname").value
    const uname = document.getElementById("username").value
    const pass = document.getElementById("password").value

    /* obtenemos los usuarios en localstorage con la key 'users' o sino existe se obtiene un array vacio */
    const Users = JSON.parse(localStorage.getItem('users')) || []

    /* asignamos el username que se encuentra en la key users de los registros */
    const isUserRegistered = Users.find(u => u.uname === uname)

    /* validamos que no se puedan registrar usuarios duplicados */
    if (isUserRegistered) {
        return alert("User already registered!")
    }

    /* Hacemos push a la key users el fullname, username y password */
    Users.push({ fname: fname, uname: uname, pass: pass })

    /* Guardamos en localstorage el user que se pusheo */
    localStorage.setItem('users', JSON.stringify(Users))

    /* alerta de usuario creado con exito */
    alert('User successfully created')

    /* redirigimos al login */
    window.location.href = 'login.html'
})