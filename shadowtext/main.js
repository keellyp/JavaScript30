const hero = document.querySelector('.hero')
const text = document.querySelector('h1')
const walk = 400

function shadow(e)
{
	const { offsetWidth : width, offsetHeight : height } = hero
	let { offsetX : x, offsetY : y } = e

	if (this !== e.target)
	{
		x = x + e.target.offsetLeft
		y = y + e.target.offsetTop
	}

	const xwalk = Math.round((x / width * walk) - (walk/2))
	const ywalk = Math.round((y / width * walk) - (walk/2))

	text.style.textShadow = `
		${xwalk}px ${ywalk}px 0 rgba(255, 111, 207, 1.0),
		${xwalk * -1}px ${ywalk}px 0 rgba(102, 102, 255, 1.0),
		${ywalk}px ${xwalk * -1}px 0 rgba(102, 255, 255, 1.0),
		${ywalk * -1}px ${xwalk}px 0 rgba(255, 255, 102, 1.0)
	`
}

hero.addEventListener('mousemove', shadow, false)