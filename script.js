
// 1. DONNÉES

let students = [];
let nextId = 1;


// 2. ÉLÉMENTS HTML

const tableBody = document.getElementById("studentTableBody");
const modal = document.getElementById("studentModal");
const form = document.getElementById("studentForm");
const modalTitle = document.getElementById("modalTitle");

const inputId = document.getElementById("studentId");
const inputName = document.getElementById("studentName");
const inputEmail = document.getElementById("studentEmail");
const inputGroup = document.getElementById("studentGroup");
const inputStatus = document.getElementById("studentStatus");

const totalCount = document.getElementById("Count");
const activeCount = document.getElementById("activeCount");
const inactiveCount = document.getElementById("inactiveCount");

const searchInput = document.getElementById("searchInput");


// 3. AFFICHER LES ÉTUDIANTS

function renderStudents(list = students) {
  tableBody.innerHTML = "";

  list.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-8 py-5 text-white"><strong>ID: ${student.id}</strong> - ${student.name}</td>
      <td class="px-8 py-5 text-white">${student.email}</td>
      <td class="px-8 py-5 text-white">${student.group}</td>
      <td class="px-8 py-5 text-white">${student.status}</td>
      <td class="px-8 py-5 text-center space-x-4">
        <button onclick="viewStudent(${student.id})" class="text-blue-400">View</button>
        <button onclick="editStudent(${student.id})" class="text-yellow-400">Edit</button>
        <button onclick="deleteStudent(${student.id})" class="text-red-400">Delete</button>
      </td>
    `;
    tableBody.appendChild(row); // ajout d'une ligne
  });

  updateStats(); // mettre à jour les compteurs
}


// 4. COMPTEURS

function updateStats() {
  totalCount.textContent = students.length;
  activeCount.textContent = students.filter(student=> student.status === "Active").length;
  inactiveCount.textContent = students.filter(student => student.status === "Inactive").length;
}


// 5. MODAL

function openModal(mode = "add") {
  modal.classList.remove("hidden");
  form.reset();
  inputId.value = "";
  enableInputs(true);
  modalTitle.textContent = mode === "add" ? "Ajouter un étudiant" : modalTitle.textContent;



  if (mode === "view") {
    enableInputs(false); // rendre les champs lecture seule
    form.querySelector("button[type='submit']").style.display = "none"; // pour cacher le bouton enregistrer
  } else {
    enableInputs(true);
    form.querySelector("button[type='submit']").style.display = "block"; // montrer le bouton
    modalTitle.textContent = mode === "add" ? "Ajouter un étudiant" : "Modifier l'étudiant";
  }
}


function closeModal() {
  modal.classList.add("hidden");
}


// 6. VIEW

function viewStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;
  openModal("view");
  modalTitle.textContent = "Détails de l'étudiant";
  fillForm(student);
}



// 7. EDIT

function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;
  openModal();
  modalTitle.textContent = "Modifier l'étudiant";
  fillForm(student);
  enableInputs(true);
  inputId.value = id;
}

// 8. AJOUT / MODIFICATION
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const id = inputId.value;

  // Valeur du statut toujours "Active" ou "Inactive"
  const statusValue = inputStatus.value === "Active" ? "Active" : "Inactive";

  if (id === "") {
    // AJOUT
    students.push({
      id: nextId,
      name: inputName.value,
      email: inputEmail.value,
      group: inputGroup.value,
      status: statusValue
    });
    nextId++;
  } else {
    // MODIFICATION
    const student = students.find(s => s.id == id);
    if (!student) return;
    student.name = inputName.value;
    student.email = inputEmail.value;
    student.group = inputGroup.value;
    student.status = statusValue;
  }

  renderStudents();
  closeModal();
});


// 9. SUPPRIMER

function deleteStudent(id) {
  if (!confirm("Supprimer cet étudiant ?")) return;
  students = students.filter(s => s.id !== id);
  renderStudents();
}


// 10. OUTILS

function fillForm(student) {
  inputName.value = student.name;
  inputEmail.value = student.email;
  inputGroup.value = student.group;
  inputStatus.value = student.status;
}

function enableInputs(active) {
  inputName.disabled = !active;
  inputEmail.disabled = !active;
  inputGroup.disabled = !active;
  inputStatus.disabled = !active;
}


// 11. RECHERCHE

searchInput.addEventListener("input", function() {
  const text = this.value.toLowerCase();
  renderStudents(students.filter(s => s.name.toLowerCase().includes(text)));
});


// 12. DÉMARRAGE

renderStudents();
