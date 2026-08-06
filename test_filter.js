async function test() {
  try {
    const authRes = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'test@example.com', password: 'password123' })
    });
    
    // Actually, I don't know the user's password. Let's just create a new user or use the local API token if we have one.
    // Or just query the DB for the user!
  } catch(e) {
    console.error(e);
  }
}
test();
