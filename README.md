
# 🔐 Password Strength Analyzer

> 🛡️ A web-based cybersecurity tool that analyzes password strength and provides recommendations to create stronger and safer passwords.

**Thiranex Cybersecurity Internship — Task 1**

---
<img width="1894" height="921" alt="Screenshot (19)" src="https://github.com/user-attachments/assets/9cad1b23-db40-40dc-a957-2d9c0c0ecffc" />
<img width="1871" height="914" alt="Screenshot (20)" src="https://github.com/user-attachments/assets/d113c829-fdd4-475b-8fba-9d7a29feca46" />
<img width="1865" height="904" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/b69beddb-d8e5-4fa1-9bd2-f564b4fe40bd" />

## 📌 Overview

The **Password Strength Analyzer** is a browser-based cybersecurity tool developed using **HTML, CSS, and JavaScript**.

It evaluates a user-entered password based on different security factors such as:

- 📏 Password length
- 🔠 Uppercase & lowercase characters
- 🔢 Numbers
- 🔣 Special characters
- 🚨 Common passwords
- 🔁 Repeated characters
- 🔤 Sequential patterns
- ⌨️ Keyboard patterns
- 📅 Predictable years
- 🧠 Password predictability
- 📊 Overall password strength

The tool also provides **security recommendations** and includes a **secure password generator**.

---

## 🎯 Task Objective

The main objective of this task is to understand the fundamentals of **password security** and implement a tool that can help users identify weak passwords.

### Key Goals

✅ Analyze password complexity  
✅ Detect common and predictable patterns  
✅ Calculate an estimated password strength score  
✅ Provide useful security recommendations  
✅ Generate stronger random passwords  
✅ Understand basic cybersecurity and cryptography concepts  

---

## ✨ Features

### 🔍 Password Analysis

The analyzer checks multiple characteristics of the entered password:

- 📏 Length
- 🔠 Uppercase letters
- 🔡 Lowercase letters
- 🔢 Numbers
- 🔣 Special characters
- 🚨 Common password patterns
- 🔁 Repeated characters
- 🔤 Sequential characters
- ⌨️ Keyboard patterns
- 📅 Predictable years
- 🧠 Predictability

---

### 📊 Strength Score

The password receives an estimated score from **0–100**.

The tool categorizes passwords into different strength levels:

🔴 **Very Weak**  
🟠 **Weak**  
🟡 **Moderate**  
🟢 **Strong**  
🔵 **Very Strong**

The score is based on multiple password characteristics rather than length alone.

---

### 💡 Security Recommendations

The application provides suggestions to improve weak passwords.

For example:

- ➕ Increase password length
- 🔠 Add uppercase characters
- 🔢 Add numbers
- 🔣 Add special characters
- 🚫 Avoid common passwords
- 🔁 Avoid repeated characters
- ❌ Avoid predictable patterns

---

### 🎲 Secure Password Generator

The application includes a password generator for creating stronger passwords.

It uses the browser's:

`crypto.getRandomValues()`

instead of relying only on basic `Math.random()` generation.

Users can:

- 🎲 Generate a password
- 📋 Copy the password
- 🔍 Analyze the generated password
- 🔄 Generate another password

---

### 👁️ Show / Hide Password

Users can toggle password visibility while entering or analyzing a password.

This makes the tool easier to use while keeping the interface simple.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| 🌐 HTML5 | Application structure |
| 🎨 CSS3 | Styling and responsive UI |
| ⚡ JavaScript | Password analysis and application logic |
| 🔐 Web Crypto API | Secure random password generation |

---

## 🔒 Privacy & Security

Privacy was considered while designing this project.

🔐 Passwords are analyzed **locally in the browser**.

The application does **not**:

- ❌ Send passwords to an external server
- ❌ Store passwords in a database
- ❌ Save passwords using localStorage
- ❌ Use external password-analysis APIs

> ⚠️ This project is an educational cybersecurity tool and should not be considered a replacement for enterprise-grade password security systems.

---

## 📂 Project Structure

```text
Password-Strength-Analyzer/
│
├── 📄 index.html
├── 🎨 style.css
├── ⚡ script.js
├── 📖 README.md
│
└── 📸 screenshots/
```

---

## 🚀 How to Run

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/VARUNTEJA113/password-strength-analyzer.git
```

### 2️⃣ Open the Project

Open the project folder in **VS Code**.

### 3️⃣ Run the Application

Open `index.html` in a browser.

You can also use the **Live Server** extension in VS Code for a better development experience.

---

## 🧪 Example

A password such as:

```text
password123
```

may be identified as weak because it contains:

🚨 A common password pattern  
🔢 A predictable number sequence  
📉 Low overall unpredictability

A stronger password could contain:

```text
River!Cloud#72Moon
```

with a combination of:

🔠 Uppercase/lowercase letters  
🔢 Numbers  
🔣 Special characters  
📏 Greater length  

> 💡 The examples above are for demonstration only. Do not use them as real passwords.

---

## 🧠 Cybersecurity Concepts Learned

Through this project, I gained practical understanding of:

- 🔐 Password security
- 🧮 Password complexity
- 🎲 Random password generation
- 🧠 Password predictability
- 🔑 Basic cryptography concepts
- 🛡️ Secure coding practices
- 🌐 Client-side JavaScript security considerations
- 🔒 Privacy-focused application design

---

## 🔮 Future Improvements

Possible future versions of the project may include:

### 🚀 Version 2

- 🧠 More advanced password analysis
- 📚 Larger common-password datasets
- 🔍 Improved pattern detection
- 📊 More accurate scoring
- 📝 Better passphrase analysis
- ♿ Accessibility improvements

### 🚀 Version 3

- 🗄️ Optional backend integration
- 🔐 Password history checking
- 🧂 Secure hashing and salting
- 💾 Database integration
- 🛡️ Password reuse prevention

> ⚠️ Any future backend implementation should be designed carefully so that actual passwords are never stored in plaintext.

---

## 📸 Screenshots

Screenshots of the application will be added here to demonstrate the main features and user interface.
<img width="1894" height="921" alt="Screenshot (19)" src="https://github.com/user-attachments/assets/cbe4c31a-c243-49e8-a2d5-b2a975e69f3c" />

---

## 🎓 Internship Information

**Program:** Cybersecurity Internship  
**Organization:** Thiranex  
**Task:** Task 1 — Password Strength Analyzer

This project was developed as part of my cybersecurity internship to gain practical experience in **password security, secure coding, and basic cryptography concepts**.

---

## 👨‍💻 Author

**Varun Teja Raju**

🎓 B.Tech — Computer Science Engineering (Cyber Security)  
🔐 Cybersecurity Enthusiast

---

## ⭐ Project Status

🟢 **Version 1 — Completed**

The current version focuses on client-side password analysis, security recommendations, and secure password generation.

More security-focused improvements can be added in future versions.

---

### ⭐ If you find this project useful, consider giving the repository a star!
