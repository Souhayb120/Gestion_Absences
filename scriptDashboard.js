const user = document.getElementById('user');
const gg = document.getElementById('gg');
const js =  JSON.parse(localStorage.getItem('students'));

window.addEventListener("load", (event) => {
  user.innerText = localStorage.getItem('username');
console.log(js.length);
gg.innerText = js.length;
});


document.getElementById('dex').addEventListener('click',()=>{
window.location.href = "./index.html";
 localStorage.removeItem('username');
});