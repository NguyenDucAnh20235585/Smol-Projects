function get_random_color(){

  const r = Math.floor(Math.random() * 256);

  const g = Math.floor(Math.random() * 256);

  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;

}

function change_color(){

  const new_color = get_random_color();
  
  document.body.style.backgroundColor = new_color;

  document.getElementById("color_code").textContent = new_color;

}

function copy_color(){

  const color_text = document.getElementById("color_code").textContent;

  navigator.clipboard.writeText(color_text)
  .then(() => {
    window.alert(`Your color code ${color_text} has been copied to the clipboard`)
  })
  .catch(err => {
    window.Error("Blyat, failed to copy. Try again.")
  });

}