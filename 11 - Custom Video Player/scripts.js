// const video = document.querySelector('video.viewer')
// const progress = document.querySelector('.progress')
// const progress_filled = document.querySelector('.progress__filled')
// const playerButton = document.querySelector('button.toggle')
// const volumeInput = document.querySelector('input[name="volume"]')
// const playBackInput = document.querySelector('input[name="playbackRate"]')

const selector = {
  video: document.querySelector('video.viewer'),
  progress: document.querySelector('.progress'),
  progress_filled: document.querySelector('.progress__filled'),
  toggleButton: document.querySelector('button.toggle'),
  volumeInput: document.querySelector('input[name="volume"]'),
  playBackInput: document.querySelector('input[name="playbackRate"]'),
  ctrButton: document.querySelectorAll('button[data-skip]')
}

const {
  video,
  progress,
  progress_filled,
  toggleButton,
  volumeInput,
  playBackInput,
  ctrButton
} = selector

function togglePlay() {
  video.paused ? video.play() : video.pause()
}

function toggleBtn(params) {
  video.paused ? toggleButton.textContent = '►' : toggleButton.textContent = '❚ ❚'
}

function timeUpdate() {
  const width = video.currentTime / video.duration * 100
  progress_filled.setAttribute('style', 'flex-basis: ' + width + '%')
}

function changeTime(e) {
  const newTime =  e.offsetX / progress.offsetWidth * video.duration
  video.currentTime = newTime
}

function skipTime(e) {
  video.currentTime = video.currentTime + parseFloat(this.dataset.skip)
}

function volumeChange(e) {
  video.volume = e.target.value
}
function playBackRateChange(e) {
  video.playbackRate = e.target.value
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', toggleBtn)
video.addEventListener('pause', toggleBtn)
video.addEventListener('timeupdate', timeUpdate)
toggleButton.addEventListener('click', togglePlay)

let mousedown = false
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
progress.addEventListener('mousemove', (e) => mousedown && changeTime(e))

volumeInput.addEventListener('change', volumeChange)
volumeInput.addEventListener('mousemove', volumeChange)
playBackInput.addEventListener('change', playBackRateChange)
playBackInput.addEventListener('mousemove', playBackRateChange)

ctrButton.forEach(button => {
  button.addEventListener('click', skipTime)
})