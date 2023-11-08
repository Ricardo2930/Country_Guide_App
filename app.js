//main container
const mainContainer = document.querySelector(".container");

//search box
const searchBox = document.querySelector(".search-box");

//search input
const searchInput = document.querySelector(".search-box-input");

//info box of country
const infoBox = document.querySelector(".info-box");

searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  let inputValue = e.target.value;
  if (e.key == "Enter") {
    if (e.target.value != "") {
      getDataCountry(inputValue);
    }
  }
});

const getDataCountry = async (country) => {
  const response = await fetch(`
    https://restcountries.com/v3.1/name/${country}?fullText=true`);
  const data = await response.json();
  const dataCountry = data[0];

  const currencyName = [];
  const currencyData = [];
  for (const key in dataCountry.currencies) {
    currencyData.push(Object.values(dataCountry.currencies[key]));
    currencyName.push(key);
  }

  const {googleMaps} = dataCountry.maps

  infoBox.innerHTML = `
        <section class="info-box-country">
            <img class="info-box-country-img" src=${dataCountry.flags.png}>
            <h2 class="info-box-country-name">${dataCountry.name.common}</h2>  
            <h4 class="info-box-country-capital">
            Capital : <span class="country-data">${dataCountry.capital[0]}</span>
            </h4>
            <h4 class="info-box-country-continent">
            Continent : <span class="country-data">${dataCountry.continents[0]}</span>
            </h4>
            <h4 class="info-box-country-population">
            Population : <span class="country-data">${dataCountry.population}</span>
            </h4>
            <h4 class="info-box-country-currency">
            Currency : <span class="country-data">${currencyName[0]} - ${currencyData[0][0]} (${currencyData[0][1]})</span>
            </h4>
            <h4 class="info-box-country-languages">
            Languages : <span class="country-data">${Object.values(dataCountry.languages).toString()}</span>
            </h4>
            <a class="info-box-country-map" href="${googleMaps}" target="_blank">
            <i class="fa-solid fa-map-location-dot"></i> Google Maps
            </a>
        </section>
    `;
};
