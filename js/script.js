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

btnSearch.addEventListener('click', searchPlace)

async function searchPlace() {
    const search = document.getElementById("searchLocation").value
    if (!search) {
        return
    }

    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${search}`;

    let response = await fetch(url)
    let data = await response.json()

    if (data.length > 0) {
        let lat = data[0].lat
        let lon = data[0].lon
        map.setView([lat, lon], 13)
        let marker = L.marker([lat, lon], { draggable: true }).addTo(map)
        let placeName = await getPlaceName(lat, lon)
        marker.bindTooltip(placeName)

        marker.on('dragend', async function (e) {
            let pos = e.target.getLatLng()
            let newPlaceName = await getPlaceName(pos.lat, pos.lng)
            marker.bindTooltip(newPlaceName).openTooltip()
        })
    } else {
        alert("Place didn't find...")
    }
}

const user = JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href = 'login.html'
}

const logout = document.getElementById("logout")
logout.addEventListener('click', () => {
    alert("See you later...")
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
})