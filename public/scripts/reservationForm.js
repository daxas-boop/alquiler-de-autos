function setDateValidationTags() {
  const endDate = document.querySelector('#end-date');
  const startDate = document.querySelector('#start-date');
  endDate.min = startDate.value;
  startDate.max = endDate.value;
  startDate.addEventListener('change', (e) => {
    endDate.min = e.target.value;
  });
  endDate.addEventListener('change', (e) => {
    startDate.max = e.target.value;
  });
}

setDateValidationTags();
