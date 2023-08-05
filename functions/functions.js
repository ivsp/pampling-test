// function to remove accents from string and transform it to lowercase
function removeAccentsAndLowerCase(string) {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export { removeAccentsAndLowerCase };
