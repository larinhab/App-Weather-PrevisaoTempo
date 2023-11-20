export const clientId = "04fc25eb6b49484780e47ba7577ce2c8";
export const clientSecret = "2f8cd6fd617d4d8aa2392ec281322205";

export const ulElement = document.querySelector('.playlist-box');
export const liElement = document.querySelectorAll('li');



export async function getAccessToken() {
    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = btoa(credentials)
  
    const response = await fetch(`https://accounts.spotify.com/api/token?grant_type=client_credentials`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
  
      body: 'grant_type=client_credentials',
    });
  
  
    const data = await response.json()
    console.log(data);
    return data.access_token;
  }

  
// accessToken();

export function getActualDate() {
    const currentDate = new Date();
    const ano = currentDate.getFullYear();
    const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dia = currentDate.getDate().toString().padStart(2, '0')
  
    return `${ano}-${mes}-${dia}`
  }
  
  
 export async function playTopAlbuns(country) {
    try {
      const accessToken = await getAccessToken();
      const currentDate = getActualDate();
      
      const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${currentDate}T09%3A00%3A00&limit=3`
  
      const result = await fetch(`${url}`, {
  
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });
  
      if (result.status === 200) {
        const data = await result.json()
        const results = data.playlists.items.map(item => ({
          name: item.name,
          image: item.images[0].url
        }))
  
        showMusicOnScreen(result);
  
      } else {
        throw new Error
      }
    } catch (error) {
      console.log('ERROR HERE MUSIC SEARCH: ', error);
  
      alert('Music search gone wrong :(')
    }
  }
  
  export function showMusicOnScreen(data) {
    liElement.forEach((liElement, index) => {
      const imgElement = liElement.querySelector('img')
      const pElement = liElement.querySelector('p')
  
      imgElement.src = data[index].image;
      pElement.textContent = dados[index].name;
    })
    document.querySelector('.playlsit-box').style.visibility = 'visible'
  }