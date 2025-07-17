let currentUser = null;
let isRegister = false;

function toggleForm() {
  isRegister = !isRegister;
  document.getElementById('form-title').innerText = isRegister ? 'Register' : 'Login';
  document.querySelector('button[onclick="handleLogin()"]').innerText = isRegister ? 'Register' : 'Login';
  document.querySelector('button[onclick="toggleForm()"]').innerText = isRegister ? 'Sudah punya akun? Login' : 'Belum punya akun? Register';
  document.getElementById('auth-msg').innerText = '';
}

function isValidUsername(username) {
  return /^[a-z0-9]+$/.test(username);
}

async function handleLogin() {
  const username = document.getElementById('username').value.trim();

  if (!isValidUsername(username)) {
    document.getElementById('auth-msg').innerText = 'Hanya huruf kecil dan angka (a-z, 0-9) tanpa spasi.';
    return;
  }

  const userDoc = db.collection('users').doc(username);

  if (isRegister) {
    const doc = await userDoc.get();
    if (doc.exists) {
      document.getElementById('auth-msg').innerText = `Username '${username}' sudah terdaftar. Silakan login.`;
      return;
    }
    await userDoc.set({ createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    document.getElementById('auth-msg').innerText = `Akun '${username}' berhasil dibuat. Silakan login.`;
    toggleForm();
  } else {
    const doc = await userDoc.get();
    if (!doc.exists) {
      document.getElementById('auth-msg').innerText = `Username '${username}' belum terdaftar. Silakan register.`;
      return;
    }
    currentUser = username;
    localStorage.setItem("chat_user", username);
    loadChat();
  }
}

function loadChat() {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('chat-container').style.display = 'block';

  db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";
    snapshot.forEach(doc => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.textContent = `${msg.username}: ${msg.text}`;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

function sendMessage() {
  const text = document.getElementById("message-input").value.trim();
  if (text === "") return;

  db.collection("messages").add({
    username: currentUser,
    text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("message-input").value = "";
}

function logout() {
  localStorage.removeItem("chat_user");
  location.reload();
}

// Auto-login kalau sudah tersimpan
window.onload = () => {
  const savedUser = localStorage.getItem("chat_user");
  if (savedUser) {
    currentUser = savedUser;
    loadChat();
  }
};
