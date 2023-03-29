function setValidationTags() {
  const $input = document.getElementById('manufacture-year');
  $input.max = new Date().getFullYear();
}

setValidationTags();
