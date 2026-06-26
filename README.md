<div align="center">

# ✦ WEATHER

### A glassmorphic weather app with real-time data, 5-day forecast, and auto-location — built in pure HTML, CSS & JS.

<br/>

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![OpenWeatherMap](https://img.shields.io/badge/API-OpenWeatherMap-orange?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=for-the-badge)

<br/>

> Search any city · Auto-detect location · Live data · 5-day forecast

<br/>

</div>

---

## ✦ Features

### 🌡️ Current Weather
Full real-time weather for any city in the world, including:

| Field | Details |
|-------|---------|
| Temperature | Actual + feels like in °C |
| Condition | Description + animated emoji icon |
| Humidity | Percentage |
| Wind Speed | km/h |
| Pressure | hPa |
| Visibility | km |
| Sunrise & Sunset | Local city time |

### 📅 5-Day Forecast
One row per day showing high/low temperatures, condition icon, description, and a visual temperature bar that scales relative to the week — so you can instantly see the warmest and coolest days.

### 📍 Two Ways to Find Location
- **Search** — type any city name and press Enter or click Search
- **Locate** — one click uses your browser's GPS to fetch your current location automatically

### 🌍 Timezone-Aware
All times (current time, date, sunrise, sunset) are shown in the searched city's local timezone — not yours.

### ✨ Animated & Polished
- Floating weather emoji that gently bobs
- Glassmorphic cards with backdrop blur
- Smooth card entrance animations
- Spinner while data is loading
- Inline error messages for city not found or location denied
- Floating background orbs matching the series palette

---

## ✦ Getting Started

### 1. Get a free API key
Sign up at [openweathermap.org](https://openweathermap.org/api) — the free tier covers everything this app uses.

### 2. Add your key
Open `script.js` and replace the key on line 1:

```javascript
const API_KEY = 'your_api_key_here';
```

> ⚠️ New API keys take up to 10 minutes to activate after creation.

### 3. Run it
```bash
git clone https://github.com/heyfaraninam/Weather.git
cd weather
open index.html
```

No build step. No npm. No config.

---

## ✦ File Structure

```
weather/
├── index.html     # Markup, search bar, current card, forecast card
├── styles.css     # Glassmorphism, animations, forecast bars, stat grid
└── app.js         # API calls, data rendering, geolocation, icon mapping
```

---

## ✦ API Used

This app uses the **OpenWeatherMap free tier**:

| Endpoint | Used For |
|----------|---------|
| `/data/2.5/weather` | Current weather |
| `/data/2.5/forecast` | 5-day / 3-hour forecast |

Both endpoints are free with no credit card required.

---

## ✦ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` in search field | Search city |

---

## ✦ Browser Support

| Browser | Support |
|---------|---------|
| Chrome 76+ | ✅ Full |
| Firefox 103+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 79+ | ✅ Full |

Requires `backdrop-filter` for glassmorphism and `navigator.geolocation` for the locate feature.

---

## ✦ Part of a Series

This is part of a growing collection of beautiful, zero-dependency web apps:

| Project | Description |
|---------|-------------|
| [Calculator](https://github.com/heyfaraninam/Calculator) | Glassmorphic calculator with 4 themes, scientific mode & history |
| [Notes](https://github.com/heyfaraninam/Notes) | Glassmorphic notes app with tags, pinning & instant search |
| **Weather** | This project |

---

## ✦ License

MIT — free to use, modify, and ship.

---

<div align="center">

Made with care · pure HTML · CSS · JS · no frameworks needed

</div>
