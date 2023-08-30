
const input = document.getElementById('input-area');
const apiKey = 'b71ca8cf27d815b6a140626bf29383e5';

const clientId = "04fc25eb6b49484780e47ba7577ce2c8";
const clientSecret = "2f8cd6fd617d4d8aa2392ec281322205";

const ulElement = document.querySelector('.playlist-box');
const liElement = document.querySelectorAll('li');

const videoURLs = [
    '.src/assets/video/video1.mp4',
    './src/assets/video/video2.mp4',
    './src/assets/video/video3.mp4',
    './src/assets/video/video4.mp4',
    './src/assets/video/video5.mp4',
    './src/assets/video/video6.mp4',
    './src/assets/video/video7.mp4',
    './src/assets/video/video8.mp4',
    './src/assets/video/video9.mp4',
    './src/assets/video/video10.mp4',
    './src/assets/video/video11.mp4',
    './src/assets/video/video12.mp4',
];

function getOtherVideos(array) {
    const randomIndex = Math.floor(Math.random() + array);
    return array[randomIndex];
}

function reloadVideos() {
    const videoElement = document.querySelector('.video');
    const videoSource = document.getElementById('.video-source');
    const randonVideoURL = getOtherVideos(videoURLs);

    if(videoElement && videoSource) {
        videoSource.src = randonVideoURL;
        
        videoElement.load();
    }
}


function searchButton() {
    const inputValue = input.value;

    console.log(input.value)
    movInput()

}

function closeInput() { 
    input.style.visibility = 'hidden';
    input.style.width = '40px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.value = "";

}

function openInput () {
    input.style.visibility = 'visible';
    input.style.width = '500px';
    input.style.padding = 'padding: 10px 30px 10px 50px;';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.value = "";

}

function showEnvelope() {
    document.querySelector('.envelope').style.visibility = 'visible';
    document.querySelector('.box').style.alignItems = 'end';
    document.querySelector('.search').style.position = 'initial';
}

function movInput (inputValue) {
 const visibility = input.style.visibility;

 inputValue && searchCity(inputValue);

visibility === 'hidden' ? openInput () : closeInput()
}

input.addEventListener('keyup', function(event){
    if(event.keyCode === 13) {
        const valueInput = input.value;
        movInput(valueInput);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    closeInput();
    reloadVideos();
})


async function searchCity(city) {
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&`)
        
    if(data.status===200){    
        const result = await data.json()

        console.log(result)

        playTopAlbuns(result.sys.country)
        showClimeOnScreen(result);
        showEnvelope();
        reloadVideos();

    }else{
        throw new Error
    }

    }catch {
        alert('Search gone wrong :(');
    }
}

function showClimeOnScreen(result) {
    document.querySelector('.icon-temp').src = `./src/assets/${result.weather[0].icon}.png`
    document.querySelector('.city-name').innerHTML = `${result.name}`;
    document.querySelector('.temp').innerHTML = `${result.main.temp.toFixed(0)}°C`;
    document.querySelector('.max-temp').innerHTML = `máx:${result.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.min-temp').innerHTML = `min:${result.main.temp_min.toFixed(0)}°C`;
}

 async function getAccessToken() {
    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = btoa(credentials);

    const response = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Authorization' : `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    });

    
    const data = await response.json()

    return data.access_token;
    console.log(data);
}

// accessToken();

function getActualDate() {
    const currentDate = new Date();
    const ano = currentDate.getFullYear();
    const mes = (currentDate.getMonth()+1).toString().padStart(2, '0');
    const dia = currentDate.getDate().toString().padStart(2, '0')

    return `${ano}-${mes}-${dia}`
}


async function playTopAlbuns(country) {
    try {
        const accessToken = await getAccessToken();
        const currentDate = getActualDate();
        const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${currentDate}T09%3A00%3A00&limit=3`
    
        const result = await fetch(`${url}`, {
            
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
      });
    
      if(result.status === 200) {
        const data = await result.json()
        const results = data.playlists.items.map(item => ({
            name: item.name,
            image: item.images[0].url
        }))

        showMusicOnScreen(result);

    }else{
        throw new Error
    }
      }catch{
        alert('Music search gone wrong :(')
    }
}

function showMusicOnScreen(data) {
    liElement.forEach((liElement, index)=> {
        const imgElement = liElement.querySelector('img')
        const pElement = liElement.querySelector('p')

        imgElement.src = data[index].image;
        pElement.textContent = dados[index].name;
    })
    document.querySelector('.playlsit-box').style.visibility = 'visible'
}