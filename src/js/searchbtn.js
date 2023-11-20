export const input = document.getElementById('input-area');


export function searchButton() {
    const inputValue = input.value;
  
    console.log(input.value)
    movInput()
  }
  
export function closeInput() {
    input.style.visibility = 'hidden';
    input.style.width = '40px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.value = "";
  
  }
  
export function openInput() {
    input.style.visibility = 'visible';
    input.style.width = '500px';
    input.style.padding = 'padding: 10px 30px 10px 50px;';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.value = "";
  
  }
  
export function showEnvelope() {
    document.querySelector('.envelope').style.visibility = 'visible';
    document.querySelector('.box').style.alignItems = 'end';
    document.querySelector('.search').style.position = 'initial';
  }
  
export function movInput(inputValue) {
    const visibility = input.style.visibility;
  
    inputValue && searchCity(inputValue);
  
    visibility === 'hidden' ? openInput() : closeInput()
  }

 