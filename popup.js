import patterns from './patterns.js';

document.getElementById('switch-to-sql-tool').addEventListener('click', () => {
  document.getElementById('sql-tool').style.display = 'block';
  document.getElementById('password-tool').style.display = 'none';
  document.getElementById('tool-title').textContent = 'SQL Injection Checker';
});

document.getElementById('switch-to-password-tool').addEventListener('click', () => {
  document.getElementById('sql-tool').style.display = 'none';
  document.getElementById('password-tool').style.display = 'block';
  document.getElementById('tool-title').textContent = 'Password Generator';
});

document.getElementById('check-button').addEventListener('click', () => {
  const code = document.getElementById('code-input').value;
  const language = document.getElementById('language-select').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!code.trim()) {
    resultsDiv.innerHTML = '<p>Please enter some code to check.</p>';
    return;
  }

  console.log('Selected Language:', language);
  console.log('Code Input:', code);

  const selectedPatterns = patterns[language] || [];

  if (selectedPatterns.length === 0) {
    resultsDiv.innerHTML = `<p>No patterns available for the selected language: ${language}.</p>`;
    return;
  }

  let hasVulnerability = false;

  selectedPatterns.forEach((item) => {
    if (item.pattern.test(code)) {
      hasVulnerability = true;
      console.log('Detected Vulnerability:', item.description);
      const issue = document.createElement('p');
      issue.style.color = 'red';
      issue.textContent = item.description;
      resultsDiv.appendChild(issue);
    }
  });

  if (!hasVulnerability) {
    resultsDiv.innerHTML = '<p>No SQL injection vulnerabilities detected.</p>';
  }
});


document.getElementById('generate-password-button').addEventListener('click', () => {
  const length = parseInt(document.getElementById('password-length').value, 10);
  const includeUppercase = document.getElementById('include-uppercase').checked;
  const includeLowercase = document.getElementById('include-lowercase').checked;
  const includeNumbers = document.getElementById('include-numbers').checked;
  const includeSymbols = document.getElementById('include-symbols').checked;

  const resultDiv = document.getElementById('password-result');
  resultDiv.innerHTML = '';

  if (length < 4 || length > 64) {
    resultDiv.innerHTML = '<p>Password length must be between 4 and 64 characters.</p>';
    return;
  }

  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    resultDiv.innerHTML = '<p>Please select at least one character type.</p>';
    return;
  }

  const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
  resultDiv.innerHTML = `<p><strong>Generated Password:</strong> ${password}</p>`;
});

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let allowedChars = '';
  let password = '';

  if (includeUppercase) allowedChars += uppercaseChars;
  if (includeLowercase) allowedChars += lowercaseChars;
  if (includeNumbers) allowedChars += numberChars;
  if (includeSymbols) allowedChars += symbolChars;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  return password;
}