const entryInput = document.getElementById("entryInput");
const addEntryBtn = document.getElementById("addEntryBtn");
const entriesDiv = document.getElementById("entries");

// Load entries from localStorage
let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

function saveEntries() {
  localStorage.setItem("journalEntries", JSON.stringify(entries));
}

function renderEntries() {
  entriesDiv.innerHTML = "";

  if (entries.length === 0) {
    entriesDiv.innerHTML = "<p style='color:#777;'>No memories yet. Write the first one 💖</p>";
    return;
  }

  entries.slice().reverse().forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";

    const date = document.createElement("div");
    date.className = "date";
    date.textContent = entry.date;

    const text = document.createElement("div");
    text.textContent = entry.text;

    div.appendChild(date);
    div.appendChild(text);
    entriesDiv.appendChild(div);
  });
}

addEntryBtn.addEventListener("click", () => {
  const text = entryInput.value.trim();
  if (!text) return;

  const newEntry = {
    text: text,
    date: new Date().toLocaleString()
  };

  entries.push(newEntry);
  saveEntries();
  renderEntries();

  entryInput.value = "";
});

// Initial render
renderEntries();
