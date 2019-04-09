const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')

function getVideo(params) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(mediaStream => {
    video.srcObject = mediaStream
    video.play()
  }).catch(err => {
    console.error('OH NO!!!', err)
  })
}

function drawVideo() {
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const { width, height } = canvas
  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
    let frameData = ctx.getImageData(0, 0, width, height)
    frameData.data = greenScreen(frameData.data)
    ctx.putImageData(frameData, 0, 0)
  }, 16)
}

function takePhoto() {
  snap.currentTime = 0
  snap.play()

  const img = canvas.toDataURL('image/jpeg')
  const aDom = document.createElement('a')
  aDom.setAttribute('href', img)
  aDom.setAttribute('download', 'snapshot')
  aDom.innerHTML = `
    <img src=${img} alt="点击下载">
  `
  strip.appendChild(aDom)
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.length; i+=4 ) {
    pixels[i + 0] = pixels[i + 0] + 100 // red
    pixels[i + 1] = pixels[i + 1] - 0 // green
    pixels[i + 2] = pixels[i + 2] / 1 // blue
    pixels[i + 3] = pixels[i + 3] // alpha
  }
  return pixels
}
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.length; i+=4 ) {
    pixels[i + 0] = pixels[i + 0] // red
    pixels[i + 1] = pixels[i + 200] // green
    pixels[i + 2] = pixels[i + 400] // blue
    pixels[i + 3] = pixels[i + 3] // alpha
  }
  return pixels
}
function greenScreen(pixels) {
  const levels = {}

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  })
  for (i = 0; i < pixels.length; i = i + 4) {
    red = pixels[i + 0]
    green = pixels[i + 1]
    blue = pixels[i + 2]
    alpha = pixels[i + 3]

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels[i + 3] = 0
    }
  }

  return pixels;
}
getVideo()

video.addEventListener('canplay', drawVideo)