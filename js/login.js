const loginForm = document.getElementById("loginForm")

/* escuchamos el evento submit del formulario de inicio de sesion */
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    /* asignamos a variables los values de los inputs que ingresa el usuario */
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    /* obtenemos los usuarios en localstorage con la key 'users' o sino existe se obtiene un array vacio */
    const Users = JSON.parse(localStorage.getItem('users')) || []

    /* asigamos a una variable 'validUser' si encontro un usuario que coincide con las credenciales ingresados por el usuario */
    const validUser = Users.find(u => u.uname === username && u.pass === password)

    /* sino coincide alguno de los datos se muesta una alerta de usuario o contraseña incorrectos */
    if (!validUser) {
        return alert('Username or password incorrect!')
    }

    /* Para el caso de encontrar los datos ingresados validos (que existan) en localstorage 
    Mostramos una alerta de bienvenida al usuario que se logeo */
    alert(`Bienvenido ${validUser.fname}`)

    /* guardamos una key del usuario logeado llamada 'login_success' con los datos del usuario */
    localStorage.setItem('login_success', JSON.stringify(validUser))

    /* Redirigimos al index/home */
    window.location.href = 'index.html'
})