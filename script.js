// 🔥 Your Firebase config (PASTE YOURS HERE)
const firebaseConfig = {
  apiKey: "AIzaSyCF89RvT_RKM94nZBG0iQzIZJcvJ1dGI90",
  authDomain: "our-journal-c3aea.firebaseapp.com",
  projectId: "our-journal-c3aea",
  storageBucket: "our-journal-c3aea.firebasestorage.app",
  messagingSenderId: "327947684248",
  appId: "1:327947684248:web:9de8c4b5c078992b9003ed"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const entryInput = document.getElementById("entryInput");
const addEntryBtn = document.getElementById("addEntryBtn");
const entriesDiv = document.getElementById("entries");

// Listen for real-time updates
db.collection("entries").orderBy("createdAt", "desc").onSnapshot(snapshot => {
  entriesDiv.innerHTML = "";

  if (snapshot.empty) {
    entriesDiv.innerHTML = "<p style='color:#777;'>No memories yet. Write the first one 💖</p>";
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();

    const div = document.createElement("div");
    div.className = "entry";

    const date = document.createElement("div");
    date.className = "date";
    date.textContent = new Date(data.createdAt.seconds * 1000).toLocaleString();

    const text = document.createElement("div");
    text.textContent = data.text;

    div.appendChild(date);
    div.appendChild(text);
    entriesDiv.appendChild(div);
  });
});

// Add new entry
addEntryBtn.addEventListener("click", async () => {
  const text = entryInput.value.trim();
  if (!text) return;

  await db.collection("entries").add({
    text: text,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  entryInput.value = "";
});
