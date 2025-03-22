document.getElementById('check-button').addEventListener('click', () => {
    const code = document.getElementById('code-input').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    if (!code.trim()) {
      resultsDiv.innerHTML = '<p>Please enter some code to check.</p>';
      return;
    }
  
    
    const sqlInjectionPatterns = [
      {
        pattern: /SELECT\s+.*\s+FROM\s+.*\s+WHERE\s+.*=['"].*['"]/i,
        description: "Potential SQL Injection: SELECT query with direct user input."
      },
      {
        pattern: /INSERT\s+INTO\s+.*\s+VALUES\s+\(.*\)/i,
        description: "Potential SQL Injection: INSERT query with direct user input."
      },
      {
        pattern: /UPDATE\s+.*\s+SET\s+.*=/i,
        description: "Potential SQL Injection: UPDATE query with direct user input."
      },
      {
        pattern: /DELETE\s+FROM\s+.*\s+WHERE\s+.*=/i,
        description: "Potential SQL Injection: DELETE query with direct user input."
      },
      {
        pattern: /\bexec\b.*\(/i,
        description: "Potential SQL Injection: EXEC command with dynamic SQL."
      },
      {
        pattern: /UNION\s+SELECT/i,
        description: "Potential SQL Injection: UNION-based attack detected."
      },
      {
        pattern: /--|\/\*|\*\//,
        description: "Potential SQL Injection: SQL comment detected, which may be used to bypass logic."
      },
      {
        pattern: /;\s*DROP\s+TABLE/i,
        description: "Potential SQL Injection: DROP TABLE command detected."
      },
      {
        pattern: /'.*'/,
        description: "Potential SQL Injection: Unescaped single quotes detected."
      },
      {
        pattern: /".*"/,
        description: "Potential SQL Injection: Unescaped double quotes detected."
      }
    ];
  
    let hasVulnerability = false;
  
    sqlInjectionPatterns.forEach((item) => {
      if (item.pattern.test(code)) {
        hasVulnerability = true;
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