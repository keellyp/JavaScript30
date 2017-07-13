const handSeconds = document.querySelector('.hand-sec');
const handMinutes = document.querySelector('.hand-min');
const handHours = document.querySelector('.hand-hours');

function setDate()
{
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = (seconds * 360 / 60) - 90;
    handSeconds.style.transform = `rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = (minutes * 360 / 60 ) - 90;
    handMinutes.style.transform = `rotate(${minutesDegrees}deg)`;

    const hours = now.getHours();
    const hoursDegrees = (hours * 360 / 12 ) - 90;
    handHours.style.transform = `rotate(${hoursDegrees}deg)`;
}

setInterval(setDate, 1000);
