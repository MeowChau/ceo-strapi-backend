// native fetch

async function run() {
  const regRes = await fetch('http://localhost:1337/api/auth/local/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'testuser_' + Date.now() + '@gmail.com',
      email: 'testuser_' + Date.now() + '@gmail.com',
      password: 'password123'
    })
  });
  const regData = await regRes.json();
  const jwt = regData.jwt;
  const userId = regData.user.id;

  const profRes = await fetch('http://localhost:1337/api/ceo-profiles?populate=*', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${jwt}` }
  });
  const profData = await profRes.json();
  console.log(profRes.status, JSON.stringify(profData, null, 2));
}
run();
