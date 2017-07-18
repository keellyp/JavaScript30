const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.list ul');

// DATA source
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// Create a new array with all the cities
const cities = [];

// Decode JSON and push datas in cities array
fetch(endpoint)
	.then( function(response) {
		return response.json();
	})
	.then( function(data) {
		cities.push(...data);
	})

//  Find if the word searched matches a word in our array
function findMatches(wordToMatch, cities)
{
	return cities.filter( function(list){
		const regex = new RegExp(wordToMatch, "gi");
		return list.city.match(regex) || list.state.match(regex);
	})
}

function numberWithCommas(x)
{
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Display the correct list of suggestions
function displayMatches()
{
	// If there is no text on the input, hide the list
	if (this.value.length == 0)
	{
		suggestions.innerHTML = '';
	}
	else
	{
		const matchArray = findMatches(this.value, cities);
		const html = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi');
		const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
		const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
		return `
		  <li>
		    <span class="name">${cityName}, ${stateName}</span>
		    <span class="population">${numberWithCommas(place.population)}</span>
		  </li>
		`;
		}).join('');
		suggestions.innerHTML = html;
	}
}

// Events
searchInput.addEventListener('change', displayMatches, false);
searchInput.addEventListener('keyup', displayMatches, false);