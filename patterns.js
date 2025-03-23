const patterns = {
    php: [
      {
        pattern: /\bmysql_query\s*\(/i,
        description: "Potential SQL Injection: Direct use of mysql_query."
      },
      {
        pattern: /\$[\w]+\s*=\s*['"].*['"]\s*[.;]/i,
        description: "Potential SQL Injection: Unescaped variable in query."
      }
    ],
    python: [
      {
        pattern: /cursor\.execute\s*\(\s*["'][^?]*["']\s*,/i,
        description: "Potential SQL Injection: Direct string in execute()."
      },
      {
        pattern: /SELECT\s+.*\s+FROM\s+.*\s+WHERE\s+.*=\s*['"][^?]*['"]/i,
        description: "Potential SQL Injection: Direct string in SQL query."
      }
    ],
    javascript: [
      {
        pattern: /connection\.query\s*\(\s*["'][^?]*["']\s*,/i,
        description: "Potential SQL Injection: Direct string in query()."
      },
      {
        pattern: /SELECT\s+.*\s+FROM\s+.*\s+WHERE\s+.*=\s*['"][^?]*['"]/i,
        description: "Potential SQL Injection: Direct string in SQL query."
      }
    ],
    java: [
      {
        pattern: /Statement\s+.*=\s+connection\.createStatement\s*\(\s*\)/i,
        description: "Potential SQL Injection: Use of Statement instead of PreparedStatement."
      },
      {
        pattern: /statement\.executeQuery\s*\(\s*["'][^?]*["']\s*\)/i,
        description: "Potential SQL Injection: Direct string in executeQuery()."
      }
    ]
  };
  
  export default patterns;