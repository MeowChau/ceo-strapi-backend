const jwt = require('jsonwebtoken');

async function test() {
  const response = await fetch('http://localhost:1337/api/mentoring-requests?filters[user][documentId][$eq]=je84xs311ynx8wa2rftm8pwm&populate=*');
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
