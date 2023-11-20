import * as video from './video.js'
import * as searchBtn from './searchbtn.js';
import * as clime from './clime.js'
import * as music from './music.js'

searchBtn.input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    const valueInput = searchBtn.input.value;
    searchBtn.movInput(valueInput);
  }
})

document.addEventListener('DOMContentLoaded', () => {
  searchBtn.closeInput();
  video.reloadVideos();
})

searchBtn()