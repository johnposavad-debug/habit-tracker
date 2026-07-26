const checkbox = document.getElementById('early-walk');
const dateDisplay = document.getElementById('date-display');

let currentDate = new Date();

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function storageKey(date) {
  return `early-walk-${dateKey(date)}`;
}

function render() {
  dateDisplay.textContent = currentDate.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  checkbox.checked = localStorage.getItem(storageKey(currentDate)) === 'true';
}

function changeDay(offset) {
  currentDate.setDate(currentDate.getDate() + offset);
  render();
}

checkbox.addEventListener('change', () => {
  localStorage.setItem(storageKey(currentDate), checkbox.checked);
});

document.getElementById('prev-day').addEventListener('click', () => changeDay(-1));
document.getElementById('next-day').addEventListener('click', () => changeDay(1));

render();
