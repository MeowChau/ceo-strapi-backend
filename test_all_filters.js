async function test() {
  try {
    // 1. Create a user via public API if register is enabled, or just use login if we created one.
    // Let's first register a test user!
    const regRes = await fetch('http://localhost:1337/api/auth/local/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser123', email: 'testuser123@example.com', password: 'password123' })
    });
    
    let token, user;
    if (regRes.ok) {
        const data = await regRes.json();
        token = data.jwt;
        user = data.user;
    } else {
        // Try login
        const loginRes = await fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier: 'testuser123@example.com', password: 'password123' })
        });
        const data = await loginRes.json();
        token = data.jwt;
        user = data.user;
    }

    if (!token) {
        console.error("Failed to get token");
        return;
    }

    console.log("Got user:", user.id, user.documentId);

    // Test 1: filters[user][$eq]=id
    let res1 = await fetch(`http://localhost:1337/api/mentoring-requests?filters[user][$eq]=${user.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    console.log("Test 1 [user][$eq]=id ->", res1.status, await res1.text());

    // Test 2: filters[user][id][$eq]=id
    let res2 = await fetch(`http://localhost:1337/api/mentoring-requests?filters[user][id][$eq]=${user.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    console.log("Test 2 [user][id][$eq]=id ->", res2.status, await res2.text());

    // Test 3: filters[user][documentId][$eq]=documentId
    let res3 = await fetch(`http://localhost:1337/api/mentoring-requests?filters[user][documentId][$eq]=${user.documentId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    console.log("Test 3 [user][documentId][$eq]=documentId ->", res3.status, await res3.text());

  } catch (err) {
    console.error("Error:", err);
  }
}
test();
