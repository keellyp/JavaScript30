/* Get our DOM Elements */
const player = document.querySelector('.player')
	const video 			= player.querySelector('.viewer')
	const progress 			= player.querySelector('.progress')
	const progressBar 		= player.querySelector('.progress__filled')
	const toggle 			= player.querySelector('.toggle')
	const toggleIcon 		= player.querySelector('.toggle i')
	const mute 				= player.querySelector('.mute')
	const muteIcon 			= player.querySelector('.mute i')
	const sound 			= player.querySelector('.volume')
	const currentTime 		= player.querySelector('.current')
	const durationTime 		= player.querySelector('.duration')
	const highDefinition 	= player.querySelector('.hd')
	const speeds 			= player.querySelectorAll('.speeds');
	const full 				= player.querySelector('.fullscreen')

/* Built out our functions */
function togglePlay()
{
	const method = video.paused ? 'play' : 'pause'
	video[method]()
}

function updatePlayButton()
{
	toggleIcon.className = '';
	this.paused ? toggleIcon.classList.add('fa', 'fa-play') : toggleIcon.classList.add('fa', 'fa-pause')
}

function handleProgress()
{
	const percent = (video.currentTime / video.duration) * 100
	progressBar.style.width = `${percent}%`
}

function scrub(e)
{
	const scrub = (e.offsetX / progress.offsetWidth) * video.duration
	video.currentTime = scrub
}

function handleMute()
{
	video.volume = 0;
	sound.value = video.volume;
}

function updateSoundButton()
{
	muteIcon.className = '';
	if (this.volume == 0)
		muteIcon.classList.add('fa', 'fa-volume-off')
	else if (this.volume < 0.5)
		muteIcon.classList.add('fa', 'fa-volume-down')
	else if (this.volume >= 0.5)
		muteIcon.classList.add('fa', 'fa-volume-up')
}

function changeVolume()
{
	const dataVolume = this.value
	video.volume = dataVolume
}

function handleSpeed()
{
	const dataSpeed = this.dataset.speed
	video.playbackRate = dataSpeed
}

function convertTime(number)
{
	const seconds = Math.floor(number % 60)
	const minutes = Math.floor(number / 60)
	const hours = Math.floor(number / 3600)
	return [seconds, minutes, hours]
}

function minTwoDigits(number) { return (number < 10 ? '0' : '') + number; }

function duration()
{
	const durationTotal = video.duration
	let convertDuration = convertTime(durationTotal)
	convertDuration.forEach( () =>
	{
		durationSec = minTwoDigits(convertDuration[0])
		durationMin = minTwoDigits(convertDuration[1])
		durationHours = minTwoDigits(convertDuration[2])
	})
	durationHours == 00 ? text = `${durationMin}:${durationSec}` : text = `${durationHours}:${durationMin}:${durationSec}`
	durationTime.textContent = text
}

function current()
{
	const current = video.currentTime
	let convertCurrent = convertTime(current)
	convertCurrent.forEach( () =>
	{
		currentSec = minTwoDigits(convertCurrent[0])
		currentMin = minTwoDigits(convertCurrent[1])
		currentHours = minTwoDigits(convertCurrent[2])
	})
	currentHours == 00 ? text = `${currentMin}:${currentSec}` : text = `${currentHours}:${currentMin}:${currentSec}`
	currentTime.textContent = text
}

function keySkip(e)
{
	if (e.key == 'ArrowRight')
		video.currentTime += 10
	if (e.key == 'ArrowLeft')
		video.currentTime -= 10
}
function keyPlay(e)
{
	if (e.code == 'Space')
		video.paused ? video.play() : video.pause()
}

/* Hook up the event listners */
// Play and pause
video.addEventListener('click', togglePlay, false)
toggle.addEventListener('click', togglePlay, false)
video.addEventListener('play', updatePlayButton, false)
video.addEventListener('pause', updatePlayButton, false)

// Progress bar
video.addEventListener('timeupdate', handleProgress, false)
progress.addEventListener('click', scrub, false)

let mouseDown = false;
progress.addEventListener('mousedown', () => mouseDown = true, false)
progress.addEventListener('mouseout', () => mouseDown = false, false)
progress.addEventListener('mouseup', () => mouseDown = false, false)
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e), false)

// Volume
mute.addEventListener('click', handleMute, false)
video.addEventListener('volumechange', updateSoundButton, false)

// Speed
speeds.forEach(speed => speed.addEventListener('click', handleSpeed, false))

// Time
video.addEventListener('loadeddata', duration, false)
video.addEventListener('timeupdate', current, false)

// Key events
window.addEventListener('keydown', keySkip, false)
window.addEventListener('keydown', keyPlay, false)