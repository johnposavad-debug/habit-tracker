const checkbox = document.getElementById('early-walk');

checkbox.addEventListener('change', () => {
  checkbox.parentElement.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
});
