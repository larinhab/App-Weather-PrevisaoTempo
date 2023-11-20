import * as video from './video.js'
import * as searchBtn from './searchbtn.js'
import * as music from './music.js'

export const apiKey = 'b71ca8cf27d815b6a140626bf29383e5';

export function showClimeOnScreen(result) {
    document.querySelector('.icon-temp').src = `./src/assets/${result.weather[0].icon}.png`
    document.querySelector('.city-name').innerHTML = `${result.name}`;
    document.querySelector('.temp').innerHTML = `${result.main.temp.toFixed(0)}°C`;
    document.querySelector('.max-temp').innerHTML = `máx:${result.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.min-temp').innerHTML = `min:${result.main.temp_min.toFixed(0)}°C`;
  }
  

export async function searchCity(city) {
    try {
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&`)
  
      if (data.status === 200) {
        const result = await data.json()
  
        console.log(result)
  
        music.playTopAlbuns(result.sys.country)
        showClimeOnScreen(result);
        searchBtn.showEnvelope();
        video.reloadVideos();
  
      } else {
        throw new Error
      }
  
    } catch {
      alert('Search gone wrong :(');
    }
  }
  
