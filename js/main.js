const html = {
    input: document.querySelector('#gif-input'),
    button: document.querySelector('#search-btn'),
    output: document.querySelector('#gif-output')
}



function searchGIFs() {
    html.output.classList.add('hidden');
    html.input.innerHTML = '';
    const url = `https://api.giphy.com/v1/gifs/search?q=${html.input.value.trim().toLowerCase().replaceAll(' ', '+')}&limit=24&lang=es&api_key=2j5uCI539EoGFikKTKy5hK5cyqHW0XbT`
    console.log(url);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("No hay GIFs.");
            }
            if (html.input.value.trim().length === 0) {
                throw new Error('Escribe algo.')
            }
            return response.json()
        })
        .then(data => {
            data = data.data;
            if (data.length === 0) {
                throw new Error('No se encontraron gifs.')
            }
            html.output.innerHTML = `<h2>Resultados de la búsqueda ${html.input.value.trim().toLowerCase()}</h2>
        <div id="gifs"></div>`;
            html.gifs = document.querySelector('#gifs');
            html.output.classList.remove('hidden');
            for (let index = 0; index < data.length; index++) {
                console.log(data[index].images);
                html.gifs.innerHTML += `
            <img src="${data[index].images.fixed_width.url}" alt="${data[index].alt_text}">
            `
            }
        }).catch(error => {
            html.output.classList.remove('hidden');
            html.output.innerHTML = `<p>${error.message}</p>`
        })
};

html.button.addEventListener('click', searchGIFs);
html.input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        searchGIFs();
    }
});