const current_time = document.getElementById('current-time');
const current_date = document.getElementById('current-date');

function formatNow() {
const now = new Date();
const hours = now.getHours() % 12 || 12;
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');
const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
const ampm = now.getHours() >= 12 ? 'pm' : 'am';


const time = `${hours}:${minutes}:${seconds}:${milliseconds} ${ampm}`;
const date = now.toLocaleDateString(undefined, {
year: 'numeric',
month: 'short',
day: 'numeric'
});

current_time.textContent = time;
current_date.textContent = date;
}

formatNow();
setInterval(formatNow, 50);