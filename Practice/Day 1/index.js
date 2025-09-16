const nameEl = document.querySelector(".full_name");
nameEl.addEventListener("mouseover", () => {
  nameEl.style.color = "crimson";
});
nameEl.addEventListener("mouseout", () => {
  nameEl.style.color = "black";
});
