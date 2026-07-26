const checkbox = document.getElementById('early-walk');

function applyState(checked) {
  checkbox.checked = checked;
  checkbox.parentElement.style.textDecoration = checked ? 'line-through' : 'none';
}

applyState(localStorage.getItem('early-walk') === 'true');

checkbox.addEventListener('change', () => {
  localStorage.setItem('early-walk', checkbox.checked);
  applyState(checkbox.checked);
});
