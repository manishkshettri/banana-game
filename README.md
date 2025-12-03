# 🍌 Banana Puzzle Game (CIS046-3)

### Software for Enterprise Assignment

This project demonstrates the four core themes:

1. **Version Control** – Managed using Git & GitHub with multiple feature commits.
2. **Event-Driven Programming** – JavaScript handles button events for login, puzzle loading, and answers.
3. **Interoperability** – Client communicates with PHP, which interacts with the external Banana API.
4. **Virtual Identity** – Implemented using PHP sessions to maintain user authentication.

**Architecture:**  
A 3-tier system:

- **Client (Frontend):** HTML, CSS, JS
- **Server (Backend):** PHP scripts handling logic and session management
- **External Service:** Banana API providing puzzles

**Login credentials:**  
`username: admin`  
`password: admin`

**Tools Used:**

- VS Code
- XAMPP (Apache Server)
- Chrome Browser
- Git & GitHub for version control

--------------------------------------------------------------------------------------------------------

**Post Week 8 Update**
This project has progressed beyond the initial checkpoint and now includes a secure, server-validated puzzle system, improved session handling, and a cleaner frontend experience. All changes follow the four core CIS046-3 themes and reflect best practices learned throughout the assignment.

Core Themes Demonstrated
1. Version Control
-Managed through Git & GitHub, using frequent, meaningful commits.
-Recent improvements include:
-Secure puzzle generation
-Server-side answer validation
-Database configuration using PDO
-Refactored JavaScript with no exposed answers
-Session-based authentication

2. Event-Driven Programming
-JavaScript controls all interactive behaviour, such as:
-Handling login button events
-Fetching puzzle images dynamically
-Submitting answers to the backend
-Updating UI based on server responses

3. Interoperability
-The system incorporates multiple layers communicating with each other:
-Client (JS) → sends requests to
-PHP backend → which retrieves puzzles, validates answers
-Database (MySQL/PDO) → used for managing user login
-External Banana Puzzle Source → provides puzzle images
-All components operate together through HTTP requests.

4. Virtual Identity
-User identity is maintained using:
-PHP sessions
-Login and logout endpoints
-Session checks to verify active users
-Puzzle answers stored securely inside the session
-This ensures the user and puzzle state is never exposed to the client.

****Architecture****

A 3-tier architecture:

1. Client (Frontend)
index.html — login form + puzzle UI
style.css — layout and responsive puzzle alignment
script.js — fetch puzzle, send answer, handle events

2. Server (Backend – PHP)
login.php — user authentication
logout.php — session destroy
check_session.php — verifies active login
get_puzzle.php — loads puzzle image & stores correct answer in session
submit_answer.php — server-side puzzle validation
db.php — PDO database configuration

3. External Service
Banana Puzzle API / Image source
Provides puzzle images
Backend stores each puzzle’s solution privately

🔧 Tools Used
VS Code for development
XAMPP (Apache + PHP) to host backend
MySQL + PDO for database connectivity
Chrome Browser for testing
Git & GitHub for version control

👤 Login Credentials
Must Register before login

📄 How the System Works (Flow Summary)
User Registers
User logs in
PHP creates session
JS requests puzzle → backend stores answer secretly
User submits answer → server verifies
Success → user continues
Logout clears session