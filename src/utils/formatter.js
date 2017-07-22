
function getAgeText(value) {
  if (value === 100) {
    return '∞';
  }
  return `${value}`;
}

export default {
  getAgeText,
};
