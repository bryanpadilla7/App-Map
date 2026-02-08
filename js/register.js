const registerForm = document.getElementById("registerForm")
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const fname = document.getElementById("fullname").value
    const uname = document.getElementById("username").value
    const pass = document.getElementById("password").value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(u => u.uname === uname)
    if (isUserRegistered) {
        return alert("User already registered!")
    }

    Users.push({ fname: fname, uname: uname, pass: pass })
    localStorage.setItem('users', JSON.stringify(Users))
    alert('User successfully created')
    window.location.href = 'login.html'
})