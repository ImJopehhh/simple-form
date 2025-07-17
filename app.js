let isRegister = false;
let currentUser = null;

// Toggle antara login dan register
function toggleForm() {
  isRegister = !isRegister;
  document.getElementById('form-title').innerText = isRegister ? 'Register' : 'Login';
  document.querySelector('button[onclick="handleLogin()"]').innerText = isRegister ? 'Register' : 'Login';
  document.querySelector('button[onclick="toggleForm()"]').innerText = isRegister ? 'Sudah punya akun? Login' : 'Belum punya akun? Register';
  document.getElementById('auth-msg').innerText = '';
}

// Validasi username
function isValidUsername(username) {
  return /^[a-z0-9]+$/.test(username);
}

// Fungsi login atau register
async function handleLogin() {
  const username = document.getElementById('username').value.trim();

  if (!isValidUsername(username)) {
    document.getElementById('auth-msg').innerText = 'Hanya huruf kecil dan angka (a-z, 0-9) tanpa spasi.';
    return;
  }

  const email = `${username}@chatapp.fake`;
  const password = "defaultpassword";

  try {
    if (isRegister) {
      await auth.createUserWithEmailAndPassword(email, password);
      document.getElementById('auth-msg').innerText = `Akun '${username}' berhasil dibuat. Silakan login.`;
      toggleForm();
    } else {
      await auth.signInWithEmailAndPassword(email, password);
      currentUser = username;
      loadChat();
    }
  } catch (e) {
    if (e.code === 'auth/user-not-found') {
      document.getElementById('auth-msg').innerText = `Nama pengguna '${username}' belum terdaftar. Silakan buat akun baru.`;
    } else if (e.code === 'auth/email-already-in-use') {
      document.getElementById('auth-msg').innerText = `Nama pengguna '${username}' sudah terdaftar. Silakan login.`;
    } else {
      document.getElementById('auth-msg').innerText = 'Terjadi kesalahan.';
    }
  }
}

// Tampilkan chat
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

// Kirim pesan
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

// Logout
function logout() {
  auth.signOut().then(() => location.reload());
}
