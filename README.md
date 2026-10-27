# Password Strength Analyzer (V1)

A browser-based cybersecurity tool that analyzes how strong a password is, explains the result, and generates stronger random passwords. Built for **Thiranex Cybersecurity Internship, Task 1**.

> This is a password-**analysis** tool, not a login system. Passwords never leave your browser.

## Project Overview
Enter a password and get a live rating (Very Weak to Very Strong), a score out of 100, nine individual security checks, a plain-language explanation, and improvement tips. A built-in generator creates random passwords with the browser's cryptographic random number generator.

## Purpose
To learn and demonstrate what makes passwords weak or strong, and to build a small tool that handles sensitive input safely.

## Features
- Live analysis as you type, with a 5-segment strength meter
- Length and complexity checks (lowercase, uppercase, numbers, special characters)
- Common-password detection (including simple leetspeak like `p@ssw0rd`)
- Pattern detection: repeated characters/blocks, sequences (`abc`, `123`), keyboard walks (`qwer`), years
- Explanation of the rating and specific suggestions
- Secure random password generator with adjustable length, copy button, and "analyze it"
- Show/Hide and Clear buttons
- Responsive layout for desktop and mobile

## Technologies Used
HTML5, CSS3, vanilla JavaScript. No frameworks, no build step, no external requests, no external fonts.

## How the Analyzer Works
1. **Length score** (up to 50 points): grows to 16 characters.
2. **Variety score** (10 points per character type, up to 40) plus 10 bonus points for 16+ characters.
3. **Penalties**: repeats, sequences, keyboard walks (-15 each), years (-8).
4. **Caps**: under 8 characters cannot score above 35; a common password is capped at 8.
5. **Rating**: 0-19 Very Weak, 20-39 Weak, 40-59 Medium, 60-79 Strong, 80-100 Very Strong.
6. **Entropy estimate**: `length x log2(character pool size)`. This is a rough teaching number, not a guarantee.

Code is split into sections inside `script.js` (data, analysis, scoring, generator, UI) so each part can be extended independently.

## Password Security Concepts Learned
Length vs. complexity, entropy, dictionary and common-password attacks, predictable patterns, leetspeak substitutions, modulo bias in random generation, why `Math.random()` is unsafe for secrets, and why passwords should be unique per account.

## Security Considerations
- Analysis runs 100% client-side; no network requests are made.
- Passwords are not logged to the console and not saved to `localStorage`, cookies, or anywhere else.
- The input uses `autocomplete="off"` and is not inside a `<form>`; results are written with `textContent` (no `innerHTML`).
- Generator uses `crypto.getRandomValues` with rejection sampling.
- A high score does **not** guarantee a password is unbreakable. If a password is already in a data breach, it is unsafe regardless of score.
- Tip: do not test a password you actively use on important accounts on any website. Test a similar one instead.

## How to Run
No installation needed.
1. Download or clone the repository.
2. Open `index.html` in any modern browser.

Optional local server: `python -m http.server 8000`, then visit `http://localhost:8000`.

## Screenshots
Add images to the `screenshots/` folder and link them here:
```
![Weak password](screenshots/weak.png)
![Strong password](screenshots/strong.png)
![Generator](screenshots/generator.png)
```

## Future Improvements
Not part of V1. Later versions may include:
- Improved password analysis
- Larger common-password datasets
- Better predictability detection
- Advanced password generation options
- An optional backend
- Secure password-history handling
- Database integration
- Password hashing and salting concepts

## Disclaimer
V1 is an educational project, not an enterprise-grade password security system.
