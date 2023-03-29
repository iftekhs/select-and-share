import axios from 'axios';

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'YOUR_API_KEY';

const searchAddressHandler = (event: Event) => {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send this to Google's API!
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

form.addEventListener('submit', searchAddressHandler);
