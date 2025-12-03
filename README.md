# 🍌 Banana Puzzle Game

**CIS046-3 Software for Enterprise Assignment**

---

## 📋 Overview

This project is a web-based puzzle game that demonstrates the four core themes of CIS046-3:

1. **Version Control** – Managed using Git & GitHub with meaningful commits
2. **Event-Driven Programming** – JavaScript handles all user interactions and dynamic content
3. **Interoperability** – Multi-tier architecture with client-server communication and external API integration
4. **Virtual Identity** – Session-based authentication and user state management

---

## 🏗️ Architecture

A **3-tier system** architecture:

### 1. Client (Frontend)
- `index.html` – Login form and puzzle interface
- `style.css` – Responsive layout and styling
- `script.js` – Event handling, API calls, and UI updates

### 2. Server (Backend – PHP)
- `db.php` – PDO database configuration
- `register.php` – User registration endpoint
- `login.php` – User authentication
- `logout.php` – Session destruction
- `check_session.php` – Verify active login
- `start_game.php` – Initialize new game session
- `get_puzzle.php` – Fetch puzzle and store solution server-side
- `submit_answer.php` – Server-side answer validation with timeout handling

### 3. External Service
- **Banana Puzzle API** – Provides puzzle images and solutions
- Backend securely stores solutions in PHP sessions (never exposed to client)

---

## 🎯 How It Works

1. **User Registration** – Create account with username and password
2. **Login** – PHP creates authenticated session
3. **Start Game** – Initialize score and clear previous game state
4. **Fetch Puzzle** – Client requests puzzle, server stores answer secretly in session
5. **Submit Answer** – Server validates response and updates score
6. **Game Over** – Wrong answer or timeout ends game, updates highscore and leaderboard
7. **Logout** – Clear session and return to login

---

## 🔑 Core Features

- **Secure Authentication** – Password hashing with PHP `password_hash()`
- **Session Management** – Server-side state prevents client manipulation
- **Server-Side Validation** – Puzzle answers never exposed to frontend
- **Timeout Detection** – Automatic game over on puzzle timeout
- **Leaderboard System** – Top 5 players ranked by highscore
- **Score Tracking** – Per-game scoring with highscore persistence

---

## 🛠️ Tools & Technologies

- **VS Code** – Development environment
- **XAMPP** – Apache server and MySQL database
- **PHP** – Backend logic and session management
- **MySQL + PDO** – Database connectivity
- **JavaScript** – Client-side event handling
- **Git & GitHub** – Version control
- **Chrome Browser** – Testing and debugging

---

## 🚀 Setup Instructions

1. **Clone the repository**
```bash
   git clone https://github.com/manishkshettri/banana-game.git
```

2. **Import database**
   - Create a MySQL database named `banana_game`
   - Import the provided SQL schema (if included)

3. **Configure database connection**
   - Update `db.php` with your MySQL credentials if needed

4. **Start XAMPP**
   - Enable Apache and MySQL services

5. **Access the game**
   - Navigate to `http://localhost/banana-game/`

---

## 👤 Getting Started

1. **Register** a new account
2. **Login** with your credentials
3. **Start playing** and try to achieve the highest score!

---

## 📝 Post Week 8 Updates

This project has evolved beyond the initial checkpoint with:

- ✅ Secure, server-validated puzzle system
- ✅ Improved session handling and authentication
- ✅ Database integration with PDO
- ✅ Timeout detection for puzzle answers
- ✅ Highscore and leaderboard functionality
- ✅ Refactored JavaScript with no client-side answer exposure
- ✅ Clean separation of concerns across all tiers

All changes align with the four core CIS046-3 themes and reflect best practices in web application development.

---

## 📄 License

This project is for educational purposes as part of CIS046-3 coursework.

---

## 👨‍💻 Author

Created as part of Software for Enterprise (CIS046-3) assignment.