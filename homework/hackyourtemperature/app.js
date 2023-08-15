import fetch from 'node-fetch';
import  express  from 'express';
import bodyParser from 'body-parser';
import keys from "./sources/keys.js";

const app = express();


app.use(bodyParser.json());

app.get('/',  (req, res) => {
  res.send("<h1>Hello from backend to frontend!</h1>");
  res.end();
})

app.post('/weather' , async(req , res) => {
  try{
    const city = req.body.cityName;
    if(!city){
      throw new Error("city name is missing");
    }

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${keys.API_KEY}`);
  const data = await response.json();
  if(!data){
  res.send({ weatherText: "City is not found!" });
  }
  const temperature = data.main.temp;
  res.send({ weatherText: `The temperature in ${city} is:${temperature}!.` });
  }catch(error) {
    res.status(400).json({error : error.message});
  };
});



export default app;
