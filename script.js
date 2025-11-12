// =============== Version Control Notes ===============
// Commit stages: "Initial setup", "Added PHP login", "Integrated get_puzzle.php (3-tier)"

const loginSection = document.getElementById("login-section");
const gameSection = document.getElementById("game-section");
const welcome = document.getElementById("welcome");
const loginMsg = document.getElementById("loginMsg");

// Check if session is active
checkSession();

// ================= LOGIN =================
document.getElementById("loginBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    loginMsg.textContent = "Please enter both fields.";
    loginMsg.style.color = "red";
    return;
  }

  const res = await fetch("login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `username=${username}&password=${password}`
  });
  const data = await res.json();

  if (data.status === "success") {
    showGame(data.user);
  } else {
    loginMsg.textContent = "❌ Invalid credentials.";
    loginMsg.style.color = "red";
  }
});

// ================= LOGOUT =================
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await fetch("logout.php");
  gameSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
  loginMsg.textContent = "You have logged out.";
  loginMsg.style.color = "green";
});

// ================= SESSION CHECK =================
async function checkSession() {
  const res = await fetch("check_session.php");
  const data = await res.json();
  if (data.loggedIn) showGame(data.user);
}

// ================= SHOW GAME =================
function showGame(user) {
  loginSection.classList.add("hidden");
  gameSection.classList.remove("hidden");
  welcome.textContent = `Welcome, ${user}!`;
  loadPuzzle();
}

// ================= FETCH PUZZLE (3-TIER INTEROPERABILITY) =================
async function loadPuzzle() {
  const puzzleImg = document.getElementById("puzzle");
  const result = document.getElementById("result");
  result.textContent = "";

  try {
    const res = await fetch("get_puzzle.php");
    const data = await res.json();

    if (data.error) {
      result.textContent = data.error;
      return;
    }

    puzzleImg.src = data.question;
    puzzleImg.dataset.answer = data.solution;

  } catch (err) {
    result.textContent = "⚠️ Failed to load puzzle.";
    console.error("Error:", err);
  }
}

// ================= SUBMIT ANSWER =================
document.getElementById("submitBtn").addEventListener("click", () => {
  const userAnswer = document.getElementById("answer").value.trim();
  const correctAnswer = document.getElementById("puzzle").dataset.answer;
  const result = document.getElementById("result");

  if (!userAnswer) {
    result.textContent = "Please enter your answer!";
    result.style.color = "orange";
    return;
  }

  if (userAnswer === correctAnswer) {
    result.textContent = "✅ Correct!";
    result.style.color = "green";
  } else {
    result.textContent = `❌ Wrong! Correct: ${correctAnswer}`;
    result.style.color = "red";
  }
});

document.getElementById("nextBtn").addEventListener("click", loadPuzzle);
