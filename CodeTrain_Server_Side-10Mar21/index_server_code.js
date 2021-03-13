const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log('Listening on port 3000'));
app.use(express.static('public'));
app.use(express.json({
  limit: '1mb'
}));

//Route - address is endpoint
//Add ability to fetch data as POST
//Add ability to parse data as JSON

//expect a post, name and call back function
//request from client
//response to client
const database = new Datastore('database.db');
database.loadDatabase();
//
app.get('/api', (request, response) => {
  // console.log(request.body);
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  console.log(request.body);
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json({
    status: "Success",
    timestamp: timestamp,
    latitude: data.lat,
    longitude: data.long
  });
});

//Functions :
//1.  Serve webpages i.e.  javascript, html, authentication,
//2.  Receive information and save to database
//3. Send information from database
