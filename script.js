/* Password Strength Analyzer - V1
 * Everything runs locally. The password is never logged, stored, or sent anywhere.
 * Sections: 1) data  2) analysis  3) scoring  4) generator  5) UI
 */
"use strict";

/* ---------- 1) DATA ---------- */
// Small starter list. V2 idea: load a much larger dataset.
const COMMON_PASSWORDS = new Set([
  "123456","123456789","12345678","12345","1234567","1234567890","password","password1","password123",
  "qwerty","qwerty123","qwertyuiop","abc123","111111","000000","123123","iloveyou","admin","admin123",
  "welcome","welcome1","login","letmein","monkey","dragon","football","baseball","master","sunshine",
  "princess","shadow","superman","michael","trustno1","passw0rd","p@ssw0rd","starwars","whatever",
  "freedom","hello","hello123","charlie","donald","batman","access","flower","qazwsx","zaq12wsx",
  "1q2w3e4r","1qaz2wsx","changeme","secret","computer","internet","cricket","india123","test","test123"
]);
const KEYBOARD_ROWS = ["qwertyuiop","asdfghjkl","zxcvbnm","1234567890"];
const LEET = { "0":"o","1":"i","3":"e","4":"a","5":"s","7":"t","@":"a","$":"s","!":"i" };
const LEVELS = ["Very Weak","Weak","Medium","Strong","Very Strong"];

/* ---------- 2) ANALYSIS ---------- */
// Undo common substitutions (p@ssw0rd -> password) so "clever" variants are still caught.
function deLeet(pw){ return [...pw.toLowerCase()].map(c => LEET[c] || c).join(""); }

function isCommon(pw){
  const lower = pw.toLowerCase();
  return COMMON_PASSWORDS.has(lower) || COMMON_PASSWORDS.has(deLeet(pw));
}
function hasRepeats(pw){ return /(.)\1{2,}/.test(pw); }            // aaa, 1111
function hasRepeatedBlock(pw){ return /^(.{2,4})\1+$/.test(pw); }  // abab, 123123

// Finds runs of 3+ characters that go up or down by one (abc, 987).
function hasSequence(pw){
  const s = pw.toLowerCase();
  let up = 1, down = 1;
  for (let i = 1; i < s.length; i++){
    const d = s.charCodeAt(i) - s.charCodeAt(i - 1);
    const alnum = /[a-z0-9]/.test(s[i]) && /[a-z0-9]/.test(s[i - 1]);
    up   = (d ===  1 && alnum) ? up + 1 : 1;
    down = (d === -1 && alnum) ? down + 1 : 1;
    if (up >= 3 || down >= 3) return true;
  }
  return false;
}
// Keyboard walks like qwer or asdf (4+ keys in a row, either direction).
function hasKeyboardWalk(pw){
  const s = pw.toLowerCase();
  for (const row of KEYBOARD_ROWS){
    const rev = [...row].reverse().join("");
    for (let i = 0; i <= row.length - 4; i++){
      if (s.includes(row.slice(i, i + 4)) || s.includes(rev.slice(i, i + 4))) return true;
    }
  }
  return false;
}
function hasYear(pw){ return /(19|20)\d{2}/.test(pw); }

// Rough entropy estimate: length x log2(size of character pool). Educational only.
function estimateEntropy(pw, v){
  const pool = (v.lower ? 26 : 0) + (v.upper ? 26 : 0) + (v.number ? 10 : 0) + (v.special ? 33 : 0);
  return pool ? Math.round(pw.length * Math.log2(pool)) : 0;
}

/* ---------- 3) SCORING ---------- */
function analyze(pw){
  const v = {
    lower: /[a-z]/.test(pw), upper: /[A-Z]/.test(pw),
    number: /[0-9]/.test(pw), special: /[^A-Za-z0-9]/.test(pw)
  };
  const f = {
    common: isCommon(pw), repeats: hasRepeats(pw) || hasRepeatedBlock(pw),
    sequence: hasSequence(pw), keyboard: hasKeyboardWalk(pw), year: hasYear(pw)
  };
  const len = pw.length;
  const variety = Object.values(v).filter(Boolean).length;

  // Score = length (max 50) + variety (max 40) + bonus for 16+ chars (10) - pattern penalties.
  let score = Math.min(len, 16) / 16 * 50 + variety * 10 + (len >= 16 ? 10 : 0);
  if (f.repeats)  score -= 15;
  if (f.sequence) score -= 15;
  if (f.keyboard) score -= 15;
  if (f.year)     score -= 8;
  if (len < 8)    score = Math.min(score, 35);   // short passwords can never rate high
  if (f.common)   score = Math.min(score, 8);    // known passwords are always Very Weak
  score = Math.max(0, Math.min(100, Math.round(score)));

  const level = score < 20 ? 1 : score < 40 ? 2 : score < 60 ? 3 : score < 80 ? 4 : 5;

  const checks = [
    { ok: len >= 12,   label: "Length of 12+ characters", note: `${len} characters` },
    { ok: v.lower,     label: "Lowercase letters" },
    { ok: v.upper,     label: "Uppercase letters" },
    { ok: v.number,    label: "Numbers" },
    { ok: v.special,   label: "Special characters" },
    { ok: !f.common,   label: "Not a very common password" },
    { ok: !f.repeats,  label: "No repeated characters or blocks" },
    { ok: !f.sequence, label: "No sequences like abc or 123" },
    { ok: !f.keyboard, label: "No keyboard patterns like qwer" }
  ];

  const reasons = [], tips = [];
  if (f.common){ reasons.push("It matches a very common password that attackers try first."); tips.push("Pick something completely different. Swapping letters for symbols (p@ssw0rd) is also well known."); }
  if (len < 8){ reasons.push(`At ${len} characters it is short, so there are fewer combinations to guess.`); tips.push("Use at least 12 characters; 16 or more is better."); }
  else if (len < 12){ reasons.push("Length is acceptable but not long."); tips.push("Add more characters. Length helps more than anything else."); }
  else reasons.push(`Good length (${len} characters) makes guessing much slower.`);
  if (variety < 3){ reasons.push(`Only ${variety} of 4 character types are used.`); tips.push("Mix lowercase, uppercase, numbers, and symbols."); }
  else if (variety === 4) reasons.push("It uses all four character types.");
  if (f.repeats){ reasons.push("It contains repeated characters or a repeating block."); tips.push("Avoid things like aaa or abcabc."); }
  if (f.sequence){ reasons.push("It contains a simple sequence such as abc or 321."); tips.push("Avoid counting up or down."); }
  if (f.keyboard){ reasons.push("It follows a keyboard pattern such as qwerty."); tips.push("Avoid neighbouring keys in a row."); }
  if (f.year){ reasons.push("It contains a year, which is easy to guess."); tips.push("Skip birth years and dates."); }
  if (!tips.length) tips.push("Looks good. Make sure it is unique to this account and kept in a password manager.");

  return { score, level, len, checks, reasons, tips, entropy: estimateEntropy(pw, v) };
}

/* ---------- 4) GENERATOR ---------- */
const SETS = {
  lower: "abcdefghijkmnopqrstuvwxyz",   // l removed (looks like 1/I)
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",    // I and O removed
  number: "23456789",                   // 0/1 removed
  special: "!@#$%^&*()-_=+[]{};:,.?"
};
// Secure random integer in [0, max) using rejection sampling to avoid modulo bias.
function secureInt(max){
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
  return buf[0] % max;
}
function generatePassword(length){
  const groups = Object.values(SETS);
  const all = groups.join("");
  // Guarantee one character from each group, fill the rest from everything.
  const chars = groups.map(g => g[secureInt(g.length)]);
  while (chars.length < length) chars.push(all[secureInt(all.length)]);
  for (let i = chars.length - 1; i > 0; i--){           // Fisher-Yates shuffle
    const j = secureInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

/* ---------- 5) UI ---------- */
const $ = id => document.getElementById(id);
const pwInput = $("pw");
let generated = ""; // kept only in memory

function fillList(el, items){
  el.replaceChildren(...items.map(t => { const li = document.createElement("li"); li.textContent = t; return li; }));
}
function renderChecks(checks){
  $("checks").replaceChildren(...checks.map(c => {
    const li = document.createElement("li");
    li.className = c.ok ? "pass" : "fail";
    const ic = document.createElement("span"); ic.className = "ic"; ic.textContent = c.ok ? "\u2713" : "\u2717";
    const box = document.createElement("span"); box.textContent = c.label;
    li.append(ic, box);
    return li;
  }));
}
function render(){
  const pw = pwInput.value;
  if (!pw){ renderEmpty(); return; }
  const r = analyze(pw);
  $("level").textContent = LEVELS[r.level - 1];
  $("level").dataset.level = r.level;
  $("meter").dataset.level = r.level;
  $("meter").setAttribute("aria-valuenow", r.score);
  $("score").textContent = r.score; $("len").textContent = r.len; $("ent").textContent = r.entropy;
  fillList($("reasons"), r.reasons); fillList($("tips"), r.tips);
  renderChecks(r.checks);
}
function renderEmpty(){
  $("level").textContent = "Waiting for input"; $("level").dataset.level = "none";
  $("meter").dataset.level = "0"; $("meter").setAttribute("aria-valuenow", 0);
  $("score").textContent = 0; $("len").textContent = 0; $("ent").textContent = 0;
  fillList($("reasons"), ["Enter a password and the explanation appears here."]);
  fillList($("tips"), ["Suggestions appear here."]);
  renderChecks(analyze("").checks.map(c => ({ ...c, ok: false })));
  document.querySelectorAll("#checks li").forEach(li => li.className = "");
  document.querySelectorAll("#checks .ic").forEach(ic => ic.textContent = "\u2022");
}

pwInput.addEventListener("input", render);
$("toggle").addEventListener("click", e => {
  const show = pwInput.type === "password";
  pwInput.type = show ? "text" : "password";
  e.currentTarget.textContent = show ? "Hide" : "Show";
  e.currentTarget.setAttribute("aria-pressed", show);
});
$("reset").addEventListener("click", () => {
  pwInput.value = ""; generated = "";
  pwInput.type = "password"; $("toggle").textContent = "Show"; $("toggle").setAttribute("aria-pressed", false);
  $("genOut").textContent = "Press generate"; $("copy").disabled = $("analyzeGen").disabled = true;
  $("copyMsg").textContent = ""; render(); pwInput.focus();
});
$("genLen").addEventListener("input", e => { $("genLenOut").textContent = e.target.value; });
$("gen").addEventListener("click", () => {
  generated = generatePassword(Number($("genLen").value));
  $("genOut").textContent = generated;
  $("copy").disabled = $("analyzeGen").disabled = false;
  $("copyMsg").textContent = "";
});
$("copy").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(generated); $("copyMsg").textContent = "Copied. Paste it into your password manager."; }
  catch { $("copyMsg").textContent = "Copy was blocked by the browser. Select the text and copy it manually."; }
});
$("analyzeGen").addEventListener("click", () => { pwInput.value = generated; render(); });

renderEmpty();
