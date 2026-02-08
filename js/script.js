/* Se inicializa el mapa en la posicion cerca de mi casa */
var map = L.map('map').setView([13.789555279605084, -89.35745218093535], 13);

/* Se le dan atributos al mapa para hacer zoomIn y ZoomOut */
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OpenStreetMap'
}).addTo(map);

/* al hacer click se puede agregar un marcador */
map.on('click', async function (e) {
    var marker = L.marker(e.latlng, {
        draggable: true
    }).addTo(map);
    /* guardamos en una variable el nombre del lugar que se obtiene de la funcion */
    let placeName = await getPlaceName(e.latlng.lat, e.latlng.lng)

    /* al hacer hover nos muestra un tooltip del nombre del lugar */
    marker.bindTooltip(placeName)

    /* Al tomar el marcador manteniendo click se puede poner en otra posicion */
    marker.on('dragend', async function (e) {
        /* Cuando se arrastra la posicion se tiene que volver a consultar la nueva posicion y el nombre */
        var posicion = e.target.getLatLng();

        let placeName = await getPlaceName(posicion.lat, posicion.lng)

        marker.bindTooltip(placeName).openTooltip();
    });
})

/* funcion asincrona para obtener el nombre del lugar marcado que se obtiene de la url de openstreetmap para obtener el json el cual utilizamos solamente
el display_name que viene del json y asi obtenerlo y asignarlo a placeName */
async function getPlaceName(lat, lng) {
    let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    let response = await fetch(url)
    let data = await response.json()

    if (data && data.display_name) {
        return data.display_name
    } else {
        return "Unknown place"
    }
}

const btnSearch = document.getElementById("btnSearch")

/* Escucha el evento click para ejecutar la funcion seachPlace */
btnSearch.addEventListener('click', searchPlace)

/* Funcion para buscar lugares */
async function searchPlace() {
    /* validamos que el campo de busqueda no este vacio para no ejecutar todo el codigo */
    const search = document.getElementById("searchLocation").value
    if (!search) {
        return
    }

    /* Url que proporciona openstreetmap para buscar por lugar para obtener la data y hacerla un json */
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${search}`;

    let response = await fetch(url)
    let data = await response.json()

    /* verificamos que la data no venga vacia */
    if (data.length > 0) {
        /* asignamos a variables la latitud y longitud que esta contenidas en la data que ubtuvimos en el response */
        let lat = data[0].lat
        let lon = data[0].lon
        /* Seteamos la nueva latitud y longitud que se encontro en la busqueda y se posiciona en el punto */
        map.setView([lat, lon], 13)
        /* Se le pinta un marcador al punto de la busqueda */
        let marker = L.marker([lat, lon], { draggable: true }).addTo(map)
        /* se agrega el nombre de la locacion y al hacer hover muestra el dato */
        let placeName = await getPlaceName(lat, lon)
        marker.bindTooltip(placeName)

        /* al arrastrar el marcador necesitamos obtener la nueva posicion del lugar */
        marker.on('dragend', async function (e) {
            /* aqui obtenemos la posicion nueva despues de haber arrastrado el marcador */
            let pos = e.target.getLatLng()
            /* aqui mandamos a llamar a nuestra funcion getPlaceName para obtener el nombre de la locacion */
            let newPlaceName = await getPlaceName(pos.lat, pos.lng)
            /* actualizamos el tooltip para que muestre el nombre de la locacion al hacer hover */
            marker.bindTooltip(newPlaceName).openTooltip()
        })
    } else {
        /* Alerta en el caso que no encuentre la locacion que se busco */
        alert("Place didn't find...")
    }
}

/* obtenemos la key 'login_success' que se guarda en localstorage, la asignamos a una variable y se asina como false si no se obtiene */
const user = JSON.parse(localStorage.getItem('login_success')) || false

/* se valida si se obtuvo la 'login_success' sino, redirige al login */
if (!user) {
    window.location.href = 'login.html'
}

/* obtenemos el id del boton de cerrar sesion */
const logout = document.getElementById("logout")

/* Escuchamos el evento click del boton */
logout.addEventListener('click', () => {

    /* Si se hace click muestra una alerta de nos vemos despues */
    alert("See you later...")

    /* Se remueve la key de login_success para que el usuario no pueda acceder de nuevo sin antes volver a iniciar sesion*/
    localStorage.removeItem('login_success')

    /* redirigimos al inicio de sesion */
    window.location.href = 'login.html'
})