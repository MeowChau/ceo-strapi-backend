async function test() {
  try {
    const loginRes = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: 'testuser123@example.com', password: 'password123' })
    });
    const data = await loginRes.json();
    const token = data.jwt;

    if (!token) return console.log("Login failed");

    // Let's test the /me endpoint!
    let res1 = await fetch(`http://localhost:1337/api/mentoring-requests/me`, { headers: { 'Authorization': `Bearer ${token}` } });
    console.log("Test /me ->", res1.status, await res1.text());

  } catch (err) {
    console.error("Error:", err);
  }
}
test();
