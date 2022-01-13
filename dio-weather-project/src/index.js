import style from './style.css';

const API_KEY = process.env.API_KEY;

class DioWeather extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: 'open' });

    this.shadow.innerHTML = `
      <style>${style}</style>
      <div class="app">
        <h1 id="temp-main">0°</h1>
        <h2 id="condition">desconhecida</h2>
      <div/>
    `;

    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        data => this.getWeather(data),
        err => console.log(err),
        { timeout: 10000 }
      );
    } else {
      alert('Geolocation not supported by this browser');
    }
  }

  getWeather({ coords: { latitude, longitude } }) {
    const baseURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=pt_br`;

    fetch(baseURL)
      .then(res => res.json())
      .then(({ current: data }) => {
        const temp = Math.floor(data.temp - 273);
        const condition = data.weather[0].description;
        const h1 = this.shadow.querySelector('#temp-main');
        const h2 = this.shadow.querySelector('#condition');

        h1.innerHTML = `${temp}°`;
        h2.innerHTML = condition;
      });
  }
}

customElements.define('dio-weather', DioWeather);
