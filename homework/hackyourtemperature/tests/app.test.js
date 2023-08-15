import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

//Testing http get request
describe("GET/", ()=> {
it("Should send back a message 'Hello from backend to frontend'", (done)=> {
  request.get('/')
  .send('Hello from backend to frontend!')
  .end(function(err, res) {
    if (err) return done(err);
    done();
  });
});

it("Should send a status 200", (done)=> {
  request.get('/')
  .expect(200)
  .end(function(err, res) {
    if (err) return done(err);
    done();
  });
});

});

//Testing http post request
describe("POST/weather", ()=> {
  it("Should send a status 200 in case of sending correct city name", (done)=> {
    request.post('/weather')
    .send({cityName:"London"})
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  it("Should send /city name is missing/ in case of not sending a not proper city name", (done)=> {
    request.post('/weather')
    .send({})
    .expect({error : "city name is missing"})
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  it("Should sent 400 if the city was not found", (done)=> {
    request.post('/weather')
    .send({cityName: "Londom"})
    .expect(400)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  it("Should sent a message contains the temperature information if the city was found", (done)=> {
    request.post('/weather')
    .send({cityName: "London"})
    .expect((res) => {
      expect(res.body.weatherText).toContain("The temperature in London is")
    })
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  });
