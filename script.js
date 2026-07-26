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
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const checked = localStorage.getItem(storageKey(currentDate)) === 'true';
  checkbox.checked = checked;
  checkbox.parentElement.style.textDecoration = checked ? 'line-through' : 'none';
}

function changeDay(offset) {
  currentDate.setDate(currentDate.getDate() + offset);
  render();
}

checkbox.addEventListener('change', () => {
  localStorage.setItem(storageKey(currentDate), checkbox.checked);
  checkbox.parentElement.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
});

document.getElementById('prev-day').addEventListener('click', () => changeDay(-1));
document.getElementById('next-day').addEventListener('click', () => changeDay(1));

render();
