const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const mongoose = require('mongoose');
const Pets = require('../models/pets');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - user', () => {

    it('should fail to create a pet without a name', async () => {
        const res = await request(app).post('/pets').send({
            age: '3',
            colour: 'white',
        });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"name" is required');
    });

    it('should create a pet', async () => {
        const pet = {
            name: 'oreo',
            age: 2,
            colour: 'brown'
        };
        const res = await request(app).post('/pets').send(pet);
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(pet.name);
        expect(res.body.colour).to.equal(pet.colour);
        expect(res.body.age).to.equal(pet.age);
    });

    it('should get pets details', async () => {
        const pet = {
            name: 'oreo',
            age: 2
            colour: 'brown'
        };

        const res = await request(app).get('/pets');
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(pet.name);
        expect(res.body.colour).to.equal(pet.colour);
        expect(res.body.age).to.equal(pet.age);
    });
    it('should delete a pet', async () => {
        const pet = {
            name: 'oreo',
        };

        const res = await request(app).delete('/pets').send(pet);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Deleted');
    });

});