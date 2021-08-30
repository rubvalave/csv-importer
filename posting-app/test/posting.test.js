const chai = require("chai");
const chaiAsPromised = require("chai-as-promised")
const request = require("supertest");
const path = require('path');
const fs = require('fs');
const app = require("../app");
const mongoose = require('mongoose');
chai.use(chaiAsPromised)

const expect = chai.expect;

describe("posting-app", () => {
  before(async () => {
    const db = await mongoose.createConnection('mongodb://mongo:27017/vizz-importer-test');
    db.once('connected', () => {
        mongoose.connection.db.dropDatabase();
    });
  });

  after(async () => {
    mongoose.disconnect();
  });

  it("should connect and disconnect to mongodb", async () => {
    mongoose.disconnect();
    mongoose.connection.on('disconnected', () => {
      expect(mongoose.connection.readyState).to.equal(0);
    });
    mongoose.connection.on('connected', () => {
      expect(mongoose.connection.readyState).to.equal(1);
    });
    mongoose.connection.on('error', () => {
      expect(mongoose.connection.readyState).to.equal(99);
    });
  });

  describe("POST /create-from-csv", () => {
    it("should create emmissions info", async () => {
      const validCSVPath = path.join(
          __dirname,
          '..',
          '..',
          'sample-files',
          'emissions.csv',
      );

      const csvFile = fs.readFileSync(validCSVPath);
      const response = await request(app)
      .post("/create-from-csv")
      .attach('file', csvFile, 'emmissions.csv');
      expect(response.status).to.equal(200);
    });

    it("should fail as there is no file attached", async () => {
      const response = await request(app)
      .post("/create-from-csv")
      expect(response.status).to.equal(400);
    });

    it("should fail as the CSV file is missing headers", async () => {
      const validCSVPath = path.join(
          __dirname,
          '..',
          '..',
          'sample-files',
          'failemissions.csv',
      );
  
      const csvFile = fs.readFileSync(validCSVPath);
      await expect(() => request(app)
      .post("/create-from-csv")
      .attach('file', csvFile, 'emmissions.csv')
      .to.throw(Error));
    });
  });
});