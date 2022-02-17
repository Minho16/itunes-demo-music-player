const container = document.querySelector('.container');
const searchElem = document.querySelector('#search1');
const media = document.querySelector('.media');
           
const getContent = (search) => {
    const url = new URL('https://itunes.apple.com/search');
    const params = { term: search, media: 'music', limit:50 };
    url.search = new URLSearchParams(params);
    fetch(url, { method: 'POST'})
        .then(results => results.json())
        .then(data => {
            const resultsHTML = data.results.map(result => `
                <div style="background-image: url(${result.artworkUrl100})"
                onclick="openMedia('${result.previewUrl}','${result.trackCensoredName}')" class="result"></div> 
            `                   
            ).join('');
            container.innerHTML = resultsHTML;
        })
};

const openMedia = (url, title) => {
    media.innerHTML = `<audio controls autoplay src="${url}"></audio><p>${title}</p>`;
    media.classList.remove('hidden');

};

document.getElementById("myBtn").addEventListener("click", function(){
    getContent(searchElem.value);
});

searchElem.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getContent(searchElem.value);
    }
});


