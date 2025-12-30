const historyData = [
  {
    date: "Mercredi 17 December 2025",
    absents: [
      { syno: "RH", nom: "Rihane Harchi", group: "4", id: "0001" }
    ],
    retards: [
      { syno: "AH", nom: "Ahmed Harchi", group: "2", id: "0003", duree: "30" },
      { syno: "YH", nom: "Yassine Harchi", group: "5", id: "0002", duree: "15" }
    ]
  },
  {
    date: "Mardi 16 December 2025",
    absents: [],
    retards: []
  },
  {
    date: "Lundi 15 December 2025",
    absents: [
      { syno: "RH", nom: "Rihane Harchi", group: "4", id: "0001" }
    ],
    retards: []
  }
];

const admin = document.getElementById('admin');

const storedHistoryData = JSON.parse(localStorage.getItem("historyData")) || [];

const buttons = document.querySelectorAll(".btnDetails");
const detailDate = document.getElementById("detailDate");
const input = document.getElementById("input");
const jours = document.querySelectorAll("#joursContainer > .jour");

const absentsContainer = document.querySelector(".flex.flex-col.gap-2"); // contnt absents et retards


function afficherDetails(day) {
  absentsContainer.innerHTML = "";

  detailDate.textContent =`Details - ${day.date}`;

  

  if (day.absents.length > 0) {
    const title = document.createElement("p");
    absentsContainer.appendChild(title);

    day.absents.forEach(a => {
      const div = document.createElement("div");
      div.className = "flex justify-between items-center pr-2 pl-5 rounded-lg bg-black";

      div.innerHTML = `
        <div class="flex items-center gap-6 p-2 px-5 text-white">
          <div class="syno bg-orange-400 p-2 h-10 rounded-lg">${a.syno}</div>
          <div>
            <p class="nom text-xs">${a.nom}</p>
            <p class="text-xs text-gray-400 pt-1">Group <span class="group">${a.group}</span> · ID : <span class="etudiantId">${a.id}</span></p>
          </div>
        </div>
        <button class="bg-red-700 text-xs ml-20 px-8 text-white py-1 rounded-lg text-xs">Absent</button>
      `;
      absentsContainer.appendChild(div);
    });
  } else {
    const p = document.createElement("p");
    p.className = "text-red-600 mb-2 font-bold";
    p.textContent = "Aucun absent";
    absentsContainer.appendChild(p);
  }

  if (day.retards.length > 0) {
    const title = document.createElement("p");
    title.className = "text-orange-400 mb-2 font-bold";
    title.textContent = "Retards";
    absentsContainer.appendChild(title);

    day.retards.forEach(r => {
      const div = document.createElement("div");
      div.className = "flex justify-between items-center pr-2 pl-5 rounded-lg bg-black";

      div.innerHTML = `
        <div class="flex items-center gap-6 p-2 px-5 text-white">
          <div class="syno bg-green-400 p-2 h-10 rounded-lg">${r.syno}</div>
          <div>
            <p class="nom text-xs">${r.nom}</p>
            <p class="text-xs text-gray-400 pt-1">Group <span class="group">${r.group}</span> · ID : <span class="etudiantId">${r.id}</span></p>
          </div>
        </div>
        <button class="bg-orange-400 text-xs ml-20 px-8 text-white py-1 rounded-lg text-xs">${r.duree} min retard</button>
      `;
      absentsContainer.appendChild(div);
    });
  }
}

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    afficherDetails(storedHistoryData[index]);
    detailDate.scrollIntoView({ behavior: "smooth" });
  });
});

input.addEventListener("input", () => {
  const value = input.value;

  jours.forEach(jour => {
      const jourDate = jour.dataset.date;                      // utilis l attribut data date
      jour.style.display = jourDate.includes(value) ? "block" : "none";
  });
});


function storeHistory(){
  let historyString = JSON.stringify(historyData)
  localStorage.setItem("historyData", historyString)
 
}

storeHistory()