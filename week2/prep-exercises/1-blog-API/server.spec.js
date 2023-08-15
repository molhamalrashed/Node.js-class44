import { describe } from "node:test";

const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = require("./server");

describe('')
request(app)
  .get('/blogs')
  .expect('Content-Type', /json/)
  //.expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

