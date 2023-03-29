import axios from 'axios';

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'YOUR_API_KEY';

type GoogleGeocodingResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
  status: 'OK' | 'ZERO_RESULTS';
};

const searchAddressHandler = (event: Event) => {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send this to Google's API!
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status != 'OK') {
        throw new Error('Could not fetch location!');
      }
      const coordinates = response.data.results.geometry.location.lat;
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
};

form.addEventListener('submit', searchAddressHandler);
