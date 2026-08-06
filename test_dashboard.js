async function test() {
  const url = 'http://localhost:1337/api/mentoring-requests?filters[user][$eq]=v5k20u8kqr6pn&populate=*';
  console.log("Fetching:", url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
