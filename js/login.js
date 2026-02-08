const loginForm = document.getElementById("loginForm")
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = Users.find(u => u.uname === username && u.pass === password)
    if (!validUser) {
        return alert('Username or password incorrect!')
    }

    alert(`Bienvenido ${validUser.fname}`)
    localStorage.setItem('login_success', JSON.stringify(validUser))
    window.location.href = 'index.html'
})