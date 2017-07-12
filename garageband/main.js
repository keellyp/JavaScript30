// Get all keys
const keys = document.querySelectorAll('.key');

// On keydown event, call this function
function playSound(e)
{
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!audio) return;
    else
    {
       audio.currentTime = 0;
       audio.play();
       key.classList.add('playing');
    }
}

// Remove playing class
function removeTransition(e)
{
    if (e.propertyName !== "transform") return;
    else this.classList.remove('playing');
}

keys.forEach( key => key.addEventListener('transitionend', removeTransition));

// Event
document.addEventListener('keydown', playSound);
