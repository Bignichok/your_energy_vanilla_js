export const toggleClearButton = (input, button) => {
  button.style.display = input.value ? 'flex' : 'none';
};

export const clearInput = (input, button) => {
  input.value = '';
  toggleClearButton(input, button);
  input.focus();
};

export const scrollToFilters = element => {
  window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
};

export const getRoundedRating = rating => {
  return parseFloat(Math.round(rating)).toFixed(1);
};
