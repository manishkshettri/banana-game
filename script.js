// // // script.js
// // // Updated: hide Next button and use loadPuzzle() for auto-next so "Correct!" is cleared consistently.

// // const loginBtn = document.getElementById("loginBtn");
// // const showRegisterBtn = document.getElementById("showRegisterBtn");
// // const registerSection = document.getElementById("register-section");
// // const authSection = document.getElementById("auth-section");
// // const gameSection = document.getElementById("game-section");
// // const gameoverSection = document.getElementById("gameover-section");

// // const usernameInput = document.getElementById("username");
// // const passwordInput = document.getElementById("password");
// // const loginMsg = document.getElementById("loginMsg");

// // const welcome = document.getElementById("welcome");
// // const puzzleImg = document.getElementById("puzzle");
// // const nextBtn = document.getElementById("nextBtn");
// // const logoutBtn = document.getElementById("logoutBtn");
// // const resultP = document.getElementById("result");
// // const scoreSpan = document.getElementById("score");
// // const timerSpan = document.getElementById("timer");

// // const finalScoreSpan = document.getElementById("finalScore");
// // const leaderboardDiv = document.getElementById("leaderboard");
// // const newGameBtn = document.getElementById("newGameBtn");
// // const backToLoginBtn = document.getElementById("backToLoginBtn");

// // const regUsername = document.getElementById("reg_username");
// // const regPassword = document.getElementById("reg_password");
// // const regConfirm = document.getElementById("reg_confirm");
// // const registerBtn = document.getElementById("registerBtn");
// // const cancelRegisterBtn = document.getElementById("cancelRegisterBtn");
// // const regMsg = document.getElementById("regMsg");

// // let timer = null;
// // let timeLeft = 15; // seconds
// // let locked = false;

// // // event bindings
// // loginBtn.addEventListener("click", login);
// // showRegisterBtn.addEventListener("click", () => {
// //   registerSection.classList.remove("hidden");
// //   authSection.classList.add("hidden");
// // });
// // cancelRegisterBtn.addEventListener("click", () => {
// //   registerSection.classList.add("hidden");
// //   authSection.classList.remove("hidden");
// // });
// // registerBtn.addEventListener("click", registerUser);
// // logoutBtn.addEventListener("click", logout);
// // // keep nextBtn handler for manual testing but hide it from UI
// // nextBtn.addEventListener("click", async () => {
// //   resultP.textContent = "";
// //   await loadPuzzle();
// // });
// // newGameBtn.addEventListener("click", startNewGame);
// // backToLoginBtn.addEventListener("click", () => {
// //   gameoverSection.classList.add("hidden");
// //   authSection.classList.remove("hidden");
// //   registerSection.classList.add("hidden");
// // });

// // // helper: fetch JSON
// // async function postForm(url, bodyObj) {
// //   const body = new URLSearchParams(bodyObj).toString();
// //   const res = await fetch(url, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
// //     body,
// //   });
// //   return res.json();
// // }

// // async function login() {
// //   loginMsg.textContent = "";
// //   const u = usernameInput.value.trim();
// //   const p = passwordInput.value;

// //   if (!u || !p) {
// //     loginMsg.textContent = "Enter credentials";
// //     return;
// //   }

// //   const data = await postForm("login.php", { username: u, password: p });

// //   if (data.status === "success") {
// //     authSection.classList.add("hidden");
// //     gameSection.classList.remove("hidden");
// //     // HIDE nextBtn in UI — redundant with num-pad auto-advance
// //     if (nextBtn) nextBtn.style.display = "none";

// //     welcome.textContent = `Welcome, ${data.user}`;
// //     scoreSpan.textContent = 0;

// //     await postForm("start_game.php", {});
// //     await loadPuzzle();
// //   } else {
// //     loginMsg.textContent = data.message || "Login failed";
// //   }
// // }

// // async function registerUser() {
// //   regMsg.textContent = "";
// //   const u = regUsername.value.trim();
// //   const p = regPassword.value;
// //   const c = regConfirm.value;

// //   if (!u || !p || !c) {
// //     regMsg.textContent = "Fill fields";
// //     return;
// //   }
// //   if (p !== c) {
// //     regMsg.textContent = "Passwords do not match";
// //     return;
// //   }

// //   const data = await postForm("register.php", { username: u, password: p });

// //   if (data.status === "success") {
// //     regMsg.style.color = "green";
// //     regMsg.textContent = "Account created. Redirecting to login...";

// //     setTimeout(() => {
// //       registerSection.classList.add("hidden");
// //       authSection.classList.remove("hidden");
// //     }, 1500);
// //   } else {
// //     regMsg.style.color = "red";
// //     regMsg.textContent = data.message || "Register failed";
// //   }
// // }

// // async function logout() {
// //   await fetch("logout.php");

// //   gameSection.classList.add("hidden");
// //   authSection.classList.remove("hidden");
// //   registerSection.classList.add("hidden");

// //   resultP.textContent = "";
// //   usernameInput.value = "";
// //   passwordInput.value = "";

// //   clearTimer();
// // }

// // async function loadPuzzle() {
// //   if (locked) return;

// //   // CLEAR any previous messages (fixes lingering "Correct!")
// //   resultP.textContent = "";

// //   try {
// //     const res = await fetch("get_puzzle.php");
// //     const data = await res.json();

// //     if (data.error) {
// //       resultP.textContent = data.error;
// //       return;
// //     }

// //     // update image and start countdown
// //     puzzleImg.src = data.question;
// //     startTimer();
// //   } catch (e) {
// //     resultP.textContent = "Failed to load puzzle";
// //   }
// // }

// // function startTimer() {
// //   clearTimer();
// //   timeLeft = 15;
// //   timerSpan.textContent = timeLeft;

// //   timer = setInterval(() => {
// //     timeLeft--;
// //     timerSpan.textContent = timeLeft;

// //     if (timeLeft <= 0) {
// //       clearTimer();
// //       handleTimeout();
// //     }
// //   }, 1000);
// // }

// // function clearTimer() {
// //   if (timer) {
// //     clearInterval(timer);
// //     timer = null;
// //   }
// // }

// // async function handleTimeout() {
// //   if (locked) return;
// //   locked = true;

// //   resultP.textContent = "⏱ Time up!";

// //   const res = await postForm("submitAnswer.php", { answer: "__TIMEOUT__" });
// //   processGameOverResponse(res);

// //   locked = false;
// // }

// // // NUMBER BUTTON SYSTEM
// // document.addEventListener("click", async (e) => {
// //   if (!e.target.classList.contains("num-btn")) return;
// //   if (locked) return;

// //   const selectedNumber = e.target.textContent.trim();

// //   locked = true;
// //   clearTimer();

// //   const res = await postForm("submitAnswer.php", { answer: selectedNumber });

// //   if (res.result === "correct") {
// //     // set score and a short success message
// //     scoreSpan.textContent = res.score;
// //     resultP.textContent = "✅ Correct!";

// //     // after a brief delay clear message and load a fresh puzzle using loadPuzzle()
// //     setTimeout(async () => {
// //       resultP.textContent = ""; // clear the success message
// //       await loadPuzzle(); // loadPuzzle clears messages and starts timer
// //       locked = false;
// //     }, 400);
// //   } else if (res.result === "wrong") {
// //     resultP.textContent = "❌ Wrong!";
// //     processGameOverResponse(res);
// //     locked = false;
// //   } else if (res.error) {
// //     resultP.textContent = res.error;
// //     locked = false;
// //   } else {
// //     resultP.textContent = "Unexpected response";
// //     locked = false;
// //   }
// // });

// // function processGameOverResponse(res) {
// //   gameSection.classList.add("hidden");
// //   gameoverSection.classList.remove("hidden");

// //   finalScoreSpan.textContent = res.finalScore ?? 0;
// //   renderLeaderboard(res.leaders || []);
// // }

// // function renderLeaderboard(arr) {
// //   leaderboardDiv.classList.add("leaderboard-box");

// //   leaderboardDiv.innerHTML = "<h3>Leaderboard</h3>";

// //   if (!arr.length) {
// //     leaderboardDiv.innerHTML += "<p>No records yet</p>";
// //     return;
// //   }

// //   const ul = document.createElement("ol");
// //   arr.forEach((item) => {
// //     const li = document.createElement("li");
// //     li.textContent = `${item.username} — ${item.highscore}`;
// //     ul.appendChild(li);
// //   });

// //   leaderboardDiv.appendChild(ul);
// // }

// // async function startNewGame() {
// //   gameoverSection.classList.add("hidden");
// //   gameSection.classList.remove("hidden");

// //   // hide nextBtn visually
// //   if (nextBtn) nextBtn.style.display = "none";

// //   await postForm("start_game.php", {});
// //   scoreSpan.textContent = 0;
// //   await loadPuzzle();
// // }

// // // restore session
// // (async function checkSession() {
// //   try {
// //     const res = await fetch("check_session.php");
// //     const d = await res.json();

// //     if (d.loggedIn) {
// //       authSection.classList.add("hidden");
// //       gameSection.classList.remove("hidden");
// //       // hide nextBtn visually
// //       if (nextBtn) nextBtn.style.display = "none";
// //       welcome.textContent = `Welcome, ${d.user}`;
// //       scoreSpan.textContent = d.score ?? 0;
// //       await loadPuzzle();
// //     }
// //   } catch (e) {}
// // })();

// // script.js
// // Fixed: Next button hidden via CSS, and "Correct!" message properly cleared

// const loginBtn = document.getElementById("loginBtn");
// const showRegisterBtn = document.getElementById("showRegisterBtn");
// const registerSection = document.getElementById("register-section");
// const authSection = document.getElementById("auth-section");
// const gameSection = document.getElementById("game-section");
// const gameoverSection = document.getElementById("gameover-section");

// const usernameInput = document.getElementById("username");
// const passwordInput = document.getElementById("password");
// const loginMsg = document.getElementById("loginMsg");

// const welcome = document.getElementById("welcome");
// const puzzleImg = document.getElementById("puzzle");
// const nextBtn = document.getElementById("nextBtn");
// const logoutBtn = document.getElementById("logoutBtn");
// const resultP = document.getElementById("result");
// const scoreSpan = document.getElementById("score");
// const timerSpan = document.getElementById("timer");

// const finalScoreSpan = document.getElementById("finalScore");
// const leaderboardDiv = document.getElementById("leaderboard");
// const newGameBtn = document.getElementById("newGameBtn");
// const backToLoginBtn = document.getElementById("backToLoginBtn");

// const regUsername = document.getElementById("reg_username");
// const regPassword = document.getElementById("reg_password");
// const regConfirm = document.getElementById("reg_confirm");
// const registerBtn = document.getElementById("registerBtn");
// const cancelRegisterBtn = document.getElementById("cancelRegisterBtn");
// const regMsg = document.getElementById("regMsg");

// let timer = null;
// let timeLeft = 15; // seconds
// let locked = false;

// // event bindings
// loginBtn.addEventListener("click", login);
// showRegisterBtn.addEventListener("click", () => {
//   registerSection.classList.remove("hidden");
//   authSection.classList.add("hidden");
// });
// cancelRegisterBtn.addEventListener("click", () => {
//   registerSection.classList.add("hidden");
//   authSection.classList.remove("hidden");
// });
// registerBtn.addEventListener("click", registerUser);
// logoutBtn.addEventListener("click", logout);
// nextBtn.addEventListener("click", async () => {
//   resultP.textContent = "";
//   await loadPuzzle();
// });
// newGameBtn.addEventListener("click", startNewGame);
// backToLoginBtn.addEventListener("click", () => {
//   gameoverSection.classList.add("hidden");
//   authSection.classList.remove("hidden");
//   registerSection.classList.add("hidden");
// });

// // helper: fetch JSON
// async function postForm(url, bodyObj) {
//   const body = new URLSearchParams(bodyObj).toString();
//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body,
//   });
//   return res.json();
// }

// async function login() {
//   loginMsg.textContent = "";
//   const u = usernameInput.value.trim();
//   const p = passwordInput.value;

//   if (!u || !p) {
//     loginMsg.textContent = "Enter credentials";
//     return;
//   }

//   const data = await postForm("login.php", { username: u, password: p });

//   if (data.status === "success") {
//     authSection.classList.add("hidden");
//     gameSection.classList.remove("hidden");

//     welcome.textContent = `Welcome, ${data.user}`;
//     scoreSpan.textContent = 0;

//     await postForm("start_game.php", {});
//     await loadPuzzle();
//   } else {
//     loginMsg.textContent = data.message || "Login failed";
//   }
// }

// async function registerUser() {
//   regMsg.textContent = "";
//   const u = regUsername.value.trim();
//   const p = regPassword.value;
//   const c = regConfirm.value;

//   if (!u || !p || !c) {
//     regMsg.textContent = "Fill fields";
//     return;
//   }
//   if (p !== c) {
//     regMsg.textContent = "Passwords do not match";
//     return;
//   }

//   const data = await postForm("register.php", { username: u, password: p });

//   if (data.status === "success") {
//     regMsg.style.color = "green";
//     regMsg.textContent = "Account created. Redirecting to login...";

//     setTimeout(() => {
//       registerSection.classList.add("hidden");
//       authSection.classList.remove("hidden");
//     }, 1500);
//   } else {
//     regMsg.style.color = "red";
//     regMsg.textContent = data.message || "Register failed";
//   }
// }

// async function logout() {
//   await fetch("logout.php");

//   gameSection.classList.add("hidden");
//   authSection.classList.remove("hidden");
//   registerSection.classList.add("hidden");

//   resultP.textContent = "";
//   usernameInput.value = "";
//   passwordInput.value = "";

//   clearTimer();
// }

// async function loadPuzzle() {
//   if (locked) return;

//   try {
//     const res = await fetch("get_puzzle.php");
//     const data = await res.json();

//     if (data.error) {
//       resultP.textContent = data.error;
//       return;
//     }

//     // Clear message AFTER we have the new puzzle data
//     resultP.textContent = "";

//     // update image and start countdown
//     puzzleImg.src = data.question;
//     startTimer();
//   } catch (e) {
//     resultP.textContent = "Failed to load puzzle";
//   }
// }

// function startTimer() {
//   clearTimer();
//   timeLeft = 15;
//   timerSpan.textContent = timeLeft;

//   timer = setInterval(() => {
//     timeLeft--;
//     timerSpan.textContent = timeLeft;

//     if (timeLeft <= 0) {
//       clearTimer();
//       handleTimeout();
//     }
//   }, 1000);
// }

// function clearTimer() {
//   if (timer) {
//     clearInterval(timer);
//     timer = null;
//   }
// }

// async function handleTimeout() {
//   if (locked) return;
//   locked = true;

//   resultP.textContent = "⏱ Time up!";

//   const res = await postForm("submitAnswer.php", { answer: "__TIMEOUT__" });
//   processGameOverResponse(res);

//   locked = false;
// }

// // NUMBER BUTTON SYSTEM
// document.addEventListener("click", async (e) => {
//   if (!e.target.classList.contains("num-btn")) return;
//   if (locked) return;

//   const selectedNumber = e.target.textContent.trim();

//   locked = true;
//   clearTimer();

//   const res = await postForm("submitAnswer.php", { answer: selectedNumber });

//   if (res.result === "correct") {
//     // set score and show success message
//     scoreSpan.textContent = res.score;
//     resultP.textContent = "✅ Correct!";
//     resultP.style.color = "green";

//     // Wait, then explicitly clear and load next puzzle
//     setTimeout(async () => {
//       resultP.textContent = ""; // Clear message explicitly before loading
//       resultP.style.color = ""; // Reset color
//       await loadPuzzle();
//       locked = false;
//     }, 800);
//   } else if (res.result === "wrong") {
//     resultP.textContent = "❌ Wrong!";
//     resultP.style.color = "red";
//     processGameOverResponse(res);
//     locked = false;
//   } else if (res.error) {
//     resultP.textContent = res.error;
//     locked = false;
//   } else {
//     resultP.textContent = "Unexpected response";
//     locked = false;
//   }
// });

// function processGameOverResponse(res) {
//   gameSection.classList.add("hidden");
//   gameoverSection.classList.remove("hidden");

//   finalScoreSpan.textContent = res.finalScore ?? 0;
//   renderLeaderboard(res.leaders || []);
// }

// function renderLeaderboard(arr) {
//   leaderboardDiv.classList.add("leaderboard-box");

//   leaderboardDiv.innerHTML = "<h3>Leaderboard</h3>";

//   if (!arr.length) {
//     leaderboardDiv.innerHTML += "<p>No records yet</p>";
//     return;
//   }

//   const ul = document.createElement("ol");
//   arr.forEach((item) => {
//     const li = document.createElement("li");
//     li.textContent = `${item.username} — ${item.highscore}`;
//     ul.appendChild(li);
//   });

//   leaderboardDiv.appendChild(ul);
// }

// async function startNewGame() {
//   gameoverSection.classList.add("hidden");
//   gameSection.classList.remove("hidden");

//   resultP.textContent = "";
//   resultP.style.color = "";

//   await postForm("start_game.php", {});
//   scoreSpan.textContent = 0;
//   await loadPuzzle();
// }

// // restore session
// (async function checkSession() {
//   try {
//     const res = await fetch("check_session.php");
//     const d = await res.json();

//     if (d.loggedIn) {
//       authSection.classList.add("hidden");
//       gameSection.classList.remove("hidden");
//       welcome.textContent = `Welcome, ${d.user}`;
//       scoreSpan.textContent = d.score ?? 0;

//       resultP.textContent = "";
//       resultP.style.color = "";

//       await loadPuzzle();
//     }
//   } catch (e) {}
// })();

// script.js
// Fixed: Proper DOM structure and forced reflow for result message

const loginBtn = document.getElementById("loginBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const registerSection = document.getElementById("register-section");
const authSection = document.getElementById("auth-section");
const gameSection = document.getElementById("game-section");
const gameoverSection = document.getElementById("gameover-section");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMsg = document.getElementById("loginMsg");

const welcome = document.getElementById("welcome");
const puzzleImg = document.getElementById("puzzle");
const nextBtn = document.getElementById("nextBtn");
const logoutBtn = document.getElementById("logoutBtn");
const resultP = document.getElementById("result");
const scoreSpan = document.getElementById("score");
const timerSpan = document.getElementById("timer");

const finalScoreSpan = document.getElementById("finalScore");
const leaderboardDiv = document.getElementById("leaderboard");
const newGameBtn = document.getElementById("newGameBtn");
const backToLoginBtn = document.getElementById("backToLoginBtn");

const regUsername = document.getElementById("reg_username");
const regPassword = document.getElementById("reg_password");
const regConfirm = document.getElementById("reg_confirm");
const registerBtn = document.getElementById("registerBtn");
const cancelRegisterBtn = document.getElementById("cancelRegisterBtn");
const regMsg = document.getElementById("regMsg");

let timer = null;
let timeLeft = 15; // seconds
let locked = false;

// event bindings
loginBtn.addEventListener("click", login);
showRegisterBtn.addEventListener("click", () => {
  registerSection.classList.remove("hidden");
  authSection.classList.add("hidden");
});
cancelRegisterBtn.addEventListener("click", () => {
  registerSection.classList.add("hidden");
  authSection.classList.remove("hidden");
});
registerBtn.addEventListener("click", registerUser);
logoutBtn.addEventListener("click", logout);
nextBtn.addEventListener("click", async () => {
  clearResultMessage();
  await loadPuzzle();
});
newGameBtn.addEventListener("click", startNewGame);
backToLoginBtn.addEventListener("click", () => {
  gameoverSection.classList.add("hidden");
  authSection.classList.remove("hidden");
  registerSection.classList.add("hidden");
});

// Helper: clear result message with forced reflow
function clearResultMessage() {
  resultP.textContent = "";
  resultP.style.color = "";
  // Force DOM reflow to cancel previous paint
  resultP.style.display = "none";
  void resultP.offsetHeight; // mandatory hack
  resultP.style.display = "block";
}

// helper: fetch JSON
async function postForm(url, bodyObj) {
  const body = new URLSearchParams(bodyObj).toString();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return res.json();
}

async function login() {
  loginMsg.textContent = "";
  const u = usernameInput.value.trim();
  const p = passwordInput.value;

  if (!u || !p) {
    loginMsg.textContent = "Enter credentials";
    return;
  }

  const data = await postForm("login.php", { username: u, password: p });

  if (data.status === "success") {
    authSection.classList.add("hidden");
    gameSection.classList.remove("hidden");

    welcome.textContent = `Welcome, ${data.user}`;
    scoreSpan.textContent = 0;

    await postForm("start_game.php", {});
    await loadPuzzle();
  } else {
    loginMsg.textContent = data.message || "Login failed";
  }
}

async function registerUser() {
  regMsg.textContent = "";
  const u = regUsername.value.trim();
  const p = regPassword.value;
  const c = regConfirm.value;

  if (!u || !p || !c) {
    regMsg.textContent = "Fill fields";
    return;
  }
  if (p !== c) {
    regMsg.textContent = "Passwords do not match";
    return;
  }

  const data = await postForm("register.php", { username: u, password: p });

  if (data.status === "success") {
    regMsg.style.color = "green";
    regMsg.textContent = "Account created. Redirecting to login...";

    setTimeout(() => {
      registerSection.classList.add("hidden");
      authSection.classList.remove("hidden");
    }, 1500);
  } else {
    regMsg.style.color = "red";
    regMsg.textContent = data.message || "Register failed";
  }
}

async function logout() {
  await fetch("logout.php");

  gameSection.classList.add("hidden");
  authSection.classList.remove("hidden");
  registerSection.classList.add("hidden");

  clearResultMessage();
  usernameInput.value = "";
  passwordInput.value = "";

  clearTimer();
}

async function loadPuzzle() {
  if (locked) return;

  // Clear message immediately
  clearResultMessage();

  try {
    const res = await fetch("get_puzzle.php");
    const data = await res.json();

    if (data.error) {
      resultP.textContent = data.error;
      return;
    }

    // update image and start countdown
    puzzleImg.src = data.question;
    startTimer();
  } catch (e) {
    resultP.textContent = "Failed to load puzzle";
  }
}

function startTimer() {
  clearTimer();
  timeLeft = 15;
  timerSpan.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearTimer();
      handleTimeout();
    }
  }, 1000);
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

async function handleTimeout() {
  if (locked) return;
  locked = true;

  resultP.textContent = "⏱ Time up!";

  const res = await postForm("submitAnswer.php", { answer: "__TIMEOUT__" });
  processGameOverResponse(res);

  locked = false;
}

// NUMBER BUTTON SYSTEM
// NUMBER BUTTON SYSTEM (robust: supports server returning next_question OR not)
document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("num-btn")) return;
  if (locked) return;

  const selectedNumber = e.target.textContent.trim();
  locked = true;
  clearTimer();

  try {
    const res = await postForm("submitAnswer.php", { answer: selectedNumber });

    console.log('submitAnswer response:', res); // debug: inspect server payload

    if (res.result === "correct") {
      // update score and show brief success
      scoreSpan.textContent = res.score ?? scoreSpan.textContent;
      resultP.textContent = "✅ Correct!";
      resultP.style.color = "green";

      // If server provided next_question, use it (faster)
      if (res.next_question) {
        // small delay so user sees the "Correct!" message
        setTimeout(() => {
          clearResultMessage();           // ensure message cleared
          puzzleImg.src = res.next_question;
          startTimer();
          locked = false;
        }, 450);
        return;
      }

      // Otherwise, request a fresh puzzle via loadPuzzle()
      setTimeout(async () => {
        clearResultMessage();             // clear before loading
        await loadPuzzle();               // loadPuzzle starts the timer
        locked = false;
      }, 450);

    } else if (res.result === "wrong") {
      resultP.textContent = "❌ Wrong!";
      resultP.style.color = "red";
      processGameOverResponse(res);
      locked = false;
    } else if (res.error) {
      // server-side error
      resultP.textContent = res.error;
      resultP.style.color = "red";
      locked = false;
    } else {
      // unexpected response — show and unlock
      console.warn('Unexpected submitAnswer response:', res);
      resultP.textContent = "Unexpected response";
      resultP.style.color = "red";
      locked = false;
    }
  } catch (err) {
    console.error('submitAnswer fetch failed:', err);
    resultP.textContent = "Network error";
    resultP.style.color = "red";
    locked = false;
  }
});


function processGameOverResponse(res) {
  gameSection.classList.add("hidden");
  gameoverSection.classList.remove("hidden");

  finalScoreSpan.textContent = res.finalScore ?? 0;
  renderLeaderboard(res.leaders || []);
}

function renderLeaderboard(arr) {
  leaderboardDiv.classList.add("leaderboard-box");

  leaderboardDiv.innerHTML = "<h3>Leaderboard</h3>";

  if (!arr.length) {
    leaderboardDiv.innerHTML += "<p>No records yet</p>";
    return;
  }

  const ul = document.createElement("ol");
  arr.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.username} — ${item.highscore}`;
    ul.appendChild(li);
  });

  leaderboardDiv.appendChild(ul);
}

async function startNewGame() {
  gameoverSection.classList.add("hidden");
  gameSection.classList.remove("hidden");

  clearResultMessage();

  await postForm("start_game.php", {});
  scoreSpan.textContent = 0;
  await loadPuzzle();
}

// restore session
(async function checkSession() {
  try {
    const res = await fetch("check_session.php");
    const d = await res.json();

    if (d.loggedIn) {
      authSection.classList.add("hidden");
      gameSection.classList.remove("hidden");
      welcome.textContent = `Welcome, ${d.user}`;
      scoreSpan.textContent = d.score ?? 0;

      clearResultMessage();

      await loadPuzzle();
    }
  } catch (e) {}
})();
