const MAX_HABITS = 100;
const MAX_NAME_LENGTH = 25;

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function doneKey(habitId, dateStr) {
  return `done-${habitId}-${dateStr}`;
}

function loadHabits() {
  try {
    return JSON.parse(localStorage.getItem('habits')) || [];
  } catch {
    return [];
  }
}

function saveHabits(habits) {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function makeHabitId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

const habitList = document.getElementById('habit-list');
if (habitList) {
  const dateDisplay = document.getElementById('date-display');
  let currentDate = new Date();

  function renderTracker() {
    dateDisplay.textContent = currentDate.toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const todayKey = dateKey(currentDate);
    const habits = loadHabits().filter((habit) => habit.createdDate <= todayKey);

    habitList.innerHTML = '';

    if (habits.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = 'No habits yet. Tap the gear icon to add one.';
      habitList.appendChild(empty);
      return;
    }

    habits.forEach((habit) => {
      const label = document.createElement('label');
      label.className = 'habit';

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = localStorage.getItem(doneKey(habit.id, todayKey)) === 'true';
      input.addEventListener('change', () => {
        localStorage.setItem(doneKey(habit.id, todayKey), input.checked);
      });

      const checkmark = document.createElement('span');
      checkmark.className = 'checkmark';

      const text = document.createElement('span');
      text.className = 'habit-text';
      text.textContent = habit.name;

      label.appendChild(input);
      label.appendChild(checkmark);
      label.appendChild(text);
      habitList.appendChild(label);
    });
  }

  function changeDay(offset) {
    currentDate.setDate(currentDate.getDate() + offset);
    renderTracker();
  }

  document.getElementById('prev-day').addEventListener('click', () => changeDay(-1));
  document.getElementById('next-day').addEventListener('click', () => changeDay(1));

  renderTracker();
}

const newHabitInput = document.getElementById('new-habit-input');
if (newHabitInput) {
  const addBtn = document.getElementById('add-habit-btn');
  const configList = document.getElementById('config-habit-list');
  const limitMessage = document.getElementById('limit-message');

  function updateAddButtonVisibility() {
    addBtn.style.display = newHabitInput.value.trim().length > 0 ? '' : 'none';
  }

  function renderConfig() {
    const habits = loadHabits();

    configList.innerHTML = '';
    habits.forEach((habit) => {
      const row = document.createElement('div');
      row.className = 'config-habit-row';
      row.textContent = habit.name;
      configList.appendChild(row);
    });

    const atLimit = habits.length >= MAX_HABITS;
    newHabitInput.style.display = atLimit ? 'none' : '';
    limitMessage.style.display = atLimit ? '' : 'none';

    if (atLimit) {
      addBtn.style.display = 'none';
    } else {
      updateAddButtonVisibility();
    }
  }

  function addHabit() {
    const name = newHabitInput.value.trim();
    if (name.length < 1 || name.length > MAX_NAME_LENGTH) {
      return;
    }

    const habits = loadHabits();
    if (habits.length >= MAX_HABITS) {
      return;
    }

    habits.push({
      id: makeHabitId(),
      name,
      createdDate: dateKey(new Date())
    });
    saveHabits(habits);

    newHabitInput.value = '';
    renderConfig();
    newHabitInput.focus();
  }

  newHabitInput.addEventListener('input', updateAddButtonVisibility);
  newHabitInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addHabit();
    }
  });
  addBtn.addEventListener('click', addHabit);

  renderConfig();
}
