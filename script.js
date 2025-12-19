const user = document.getElementById('user')


window.addEventListener("load", (event) => {
  user.innerText = localStorage.getItem('username');
});