export const videoURLs = [
    './src/assets/video/video1.mp4',
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
  

export function getOtherVideos(array) {
    const randomIndex = Math.floor(Math.random() + array);
    return array[randomIndex];
  }
  
export function reloadVideos() {
    const videoElement = document.querySelector('.video');
    const videoSource = document.getElementById('video-source');
    const randonVideoURL = getOtherVideos(videoURLs);
  
    if (videoElement && videoSource) {
      videoSource.src = randonVideoURL;
  
      videoElement.load();
    }
  }