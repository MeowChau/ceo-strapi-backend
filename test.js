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

  const profRes = await fetch('http://localhost:1337/api/ceo-profiles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
    body: JSON.stringify({
      data: {
        managementExperience: 'Từ 1-5 năm',
        industry: 'Dịch vụ',
        foundedYear: 2020,
        annualRevenue: 'Dưới 5 tỷ VND',
        employeeCount: 'Từ 11-50 người',
        equity: 10.5,
        companyType: 'Công ty TNHH 1 thành viên',
        users_permissions_user: { connect: [userId] }
      }
    })
  });
  const profData = await profRes.json();
  console.log(profRes.status, JSON.stringify(profData, null, 2));
}
run();
