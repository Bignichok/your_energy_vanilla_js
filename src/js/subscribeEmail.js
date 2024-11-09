import { subscribeEmail } from './api.js';

export const initializeSubscribeEmail = () => {
  const subscriptionForm = document.getElementById('subscription-form');

  subscriptionForm.addEventListener('submit', async event => {
    event.preventDefault();
    const emailInput = event.target.elements.email;
    const email = emailInput.value;

    try {
      const response = await subscribeEmail(email);
      if (response) {
        alert('Subscription successful!');
        emailInput.value = '';
      } else {
        alert('Subscription failed. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  });
};
