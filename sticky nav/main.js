const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop

console.log(topOfNav);

function fixNav()
{
	if (window.scrollY >= topOfNav)
	{
		document.body.style.paddingTop = nav.offsetHeight
		document.body.classList.add('fixed-nav')
		console.log('ok');
	}
	else
	{
		document.body.style.paddingTop = 0
		document.body.classList.remove('fixed-nav')
	}
}
window.addEventListener('scroll', fixNav)
