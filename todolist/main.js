const inputs = document.querySelectorAll('.inbox input')
let lastChecked

function handleCheck(e) {
	let inBetween = false
	if (e.shiftKey && this.checked)
	{
		inputs.forEach(input =>
		{
			if (input === this || input === lastChecked)
				inBetween = !inBetween
			if (inBetween)
				input.checked = "true";
		})
	}
	lastChecked = this;
}

inputs.forEach(input => input.addEventListener('change', handleCheck, false));
inputs.forEach(input => input.addEventListener('click', handleCheck, false));
