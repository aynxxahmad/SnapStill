
//SELECTORS
const auth ="563492ad6f917000010000019ef5201e40ab4cf59f8021e475ce44b9";
const gallery=document.querySelector(`.gallery`); 
const searchBtn=document.querySelector(`.searchbtn`); 
const searchInput=document.querySelector(`.search-input`); 
const moreBtn = document.querySelector(`.more`);

let page=1;
let currentSearch;
let url;
//EVENT LISTENERS
document.addEventListener(`DOMContentLoaded`,CuratedPhotos);

searchBtn.addEventListener(`click`,(e)=>{
    clear();
    searchPhotos(e);
});

moreBtn.addEventListener(`click`,(e)=>{
    loadMore();
});

//FUNCTIONS
async function fetchApi(url){
    const dataFetch = await fetch(url,{
        
        method:"GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    });

    const data = await dataFetch.json();
    return data;
}



async function CuratedPhotos(){
    
    const url = `https://api.pexels.com/v1/curated?page=1&per_page=15`;
    const data = await fetchApi(url);
    displayImage(data);
}

async function searchPhotos(e){
    e.preventDefault();
    const query = searchInput.value;
    console.log(query);
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=15`;
    const data = await fetchApi(url);
    displayImage(data);
    currentSearch = searchInput.value;
    searchInput.value=``;
}


function displayImage(data){
    data.photos.forEach(photo=>{
        const galleryImg = document.createElement(`div`);
        galleryImg.classList.add(`gallery-img`);
        galleryImg.innerHTML = `<div>
                                <a href="${photo.photographer_url}" target="_blank">${photo.photographer}</a>
                                <h3><a href="${photo.src.original}" target=_blank">Download</a></h3>
                                </div>
                                <img src="${photo.src.large}" alt="image">`;
        gallery.appendChild(galleryImg);
    });
}


async function loadMore(){
    ++page;
    if(currentSearch)
        url = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    else
        url =`https://api.pexels.com/v1/curated?page=${page}&per_page=15`;

    const data = await fetchApi(url);
    displayImage(data);
    
}


function clear(){
    gallery.innerHTML=``;
}