function assign() {
  let a = document.querySelector(".important");
  console.log(a);
  let b = document.getElementById("john");
  if (a.classList.contains("important") && b.hasAttributes("#john")) {
    a.classList.add("shape");
  }
}

const name = document.getElementById("name");
name.addEventListener("focus", (event) => {
    event.target.style.background = "pink";
    assign();
});
name.addEventListener("blur", (event) => {
    event.target.style.background = "";
});

