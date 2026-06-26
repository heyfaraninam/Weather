const API_KEY = '949b06972bed82fe8200c458a344c9c0';
const BASE    = 'https://api.openweathermap.org/data/2.5';

// ── DOM ──
const $inp        = document.getElementById('search-inp');
const $error      = document.getElementById('error-msg');
const $loader     = document.getElementById('loader');
const $current    = document.getElementById('current-card');
const $forecast   = document.getElementById('forecast-card');
const $fcList     = document.getElementById('forecast-list');

// current
const $cityName   = document.getElementById('city-name');
const $cityCountry= document.getElementById('city-country');
const $cityTime   = document.getElementById('city-time');
const $cityDate   = document.getElementById('city-date');
const $icon       = document.getElementById('weather-icon');
const $tempVal    = document.getElementById('temp-val');
const $tempFeels  = document.getElementById('temp-feels');
const $desc       = document.getElementById('weather-desc');
const $humidity   = document.getElementById('stat-humidity');
const $wind       = document.getElementById('stat-wind');
const $pressure   = document.getElementById('stat-pressure');
const $visibility = document.getElementById('stat-visibility');
const $sunrise    = document.getElementById('sunrise');
const $sunset     = document.getElementById('sunset');

// ── WEATHER ICON MAP ──
function weatherIcon(id, pod) {
  const night = pod === 'n';
  if (id >= 200 && id < 300) return '⛈️';
  if (id >= 300 && id < 400) return '🌦️';
  if (id >= 500 && id < 600) {
    if (id === 511) return '🌨️';
    if (id < 502)  return night ? '🌧️' : '🌧️';
    return '🌧️';
  }
  if (id >= 600 && id < 700) return '❄️';
  if (id >= 700 && id < 800) return '🌫️';
  if (id === 800) return night ? '🌙' : '☀️';
  if (id === 801) return night ? '🌤️' : '🌤️';
  if (id === 802) return '⛅';
  if (id >= 803)  return '☁️';
  return '🌡️';
}

// ── HELPERS ──
function showError(msg) {
  $error.textContent = msg;
  $error.classList.add('show');
  setTimeout(() => $error.classList.remove('show'), 3500);
}
function setLoading(v) {
  $loader.classList.toggle('show', v);
  if (v) { $current.classList.remove('show'); $forecast.classList.remove('show'); }
}
function fmtTime(unix, offset) {
  const d = new Date((unix + offset) * 1000);
  return d.toUTCString().slice(17, 22);
}
function fmtDate(unix, offset) {
  const d = new Date((unix + offset) * 1000);
  return d.toUTCString().slice(0, 16);
}
function fmtDay(unix, offset) {
  const d = new Date((unix + offset) * 1000);
  return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getUTCDay()];
}

// ── FETCH CURRENT ──
async function fetchCurrent(query) {
  const url = typeof query === 'string'
    ? `${BASE}/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`
    : `${BASE}/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status === 404 ? 'City not found.' : 'Something went wrong.');
  return res.json();
}

// ── FETCH FORECAST ──
async function fetchForecast(lat, lon) {
  const res = await fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error('Forecast unavailable.');
  return res.json();
}

// ── RENDER CURRENT ──
function renderCurrent(d) {
  const off = d.timezone;
  $cityName.textContent    = d.name;
  $cityCountry.textContent = d.sys.country;
  $cityTime.textContent    = fmtTime(Date.now() / 1000, off);
  $cityDate.textContent    = fmtDate(Date.now() / 1000, off);
  $icon.textContent        = weatherIcon(d.weather[0].id, d.weather[0].icon.slice(-1));
  $tempVal.textContent     = Math.round(d.main.temp) + '°C';
  $tempFeels.textContent   = `Feels like ${Math.round(d.main.feels_like)}°C`;
  $desc.textContent        = d.weather[0].description;
  $humidity.textContent    = d.main.humidity + '%';
  $wind.textContent        = Math.round(d.wind.speed * 3.6) + ' km/h';
  $pressure.textContent    = d.main.pressure + ' hPa';
  $visibility.textContent  = d.visibility ? (d.visibility / 1000).toFixed(1) + ' km' : '—';
  $sunrise.textContent     = fmtTime(d.sys.sunrise, off);
  $sunset.textContent      = fmtTime(d.sys.sunset, off);
  $current.classList.add('show');
}

// ── RENDER FORECAST ──
function renderForecast(data, offset) {
  // Pick one entry per day (noon UTC) — skip today
  const days = {};
  data.list.forEach(item => {
    const day = fmtDay(item.dt, offset);
    const today = fmtDay(Date.now() / 1000, offset);
    if (day === today) return;
    if (!days[day]) days[day] = [];
    days[day].push(item);
  });

  const entries = Object.entries(days).slice(0, 5);
  const allTemps = entries.flatMap(([,items]) => items.map(i => i.main.temp));
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);

  $fcList.innerHTML = '';
  entries.forEach(([day, items], i) => {
    const temps  = items.map(x => x.main.temp);
    const hi     = Math.round(Math.max(...temps));
    const lo     = Math.round(Math.min(...temps));
    const mid    = items[Math.floor(items.length / 2)];
    const ico    = weatherIcon(mid.weather[0].id, 'd');
    const desc   = mid.weather[0].description;
    const pct    = globalMax === globalMin ? 80
      : Math.round(((hi - globalMin) / (globalMax - globalMin)) * 70 + 15);

    const row = document.createElement('div');
    row.className = 'forecast-row';
    row.style.animationDelay = (i * 0.07) + 's';
    row.innerHTML = `
      <div class="fc-day">${day}</div>
      <div class="fc-icon">${ico}</div>
      <div class="fc-desc">${desc}</div>
      <div class="fc-bar-wrap" style="min-width:60px;"><div class="fc-bar" style="width:${pct}%"></div></div>
      <div class="fc-temps"><span class="fc-hi">${hi}°</span><span class="fc-lo">${lo}°</span></div>`;
    $fcList.appendChild(row);
  });
  $forecast.classList.add('show');
}

// ── LOAD ──
async function load(query) {
  $error.classList.remove('show');
  setLoading(true);
  try {
    const current  = await fetchCurrent(query);
    const forecast = await fetchForecast(current.coord.lat, current.coord.lon);
    renderCurrent(current);
    renderForecast(forecast, current.timezone);
  } catch(e) {
    showError(e.message);
  } finally {
    setLoading(false);
  }
}

// ── SEARCH ──
function search() {
  const q = $inp.value.trim();
  if (!q) { showError('Please enter a city name.'); return; }
  load(q);
}

// ── LOCATE ──
function locate() {
  if (!navigator.geolocation) { showError('Geolocation not supported.'); return; }
  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    pos => load({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
    ()  => { setLoading(false); showError('Location access denied.'); }
  );
}

// ── KEYBOARD ──
$inp.addEventListener('keydown', e => { if (e.key === 'Enter') search(); });

// ── EXPOSE ──
window.search = search;
window.locate = locate;

// ── DEFAULT: load Karachi ──
load('Karachi');
