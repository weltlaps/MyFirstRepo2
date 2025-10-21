const { expect } = require('chai');
const http = require('http');
const { createServer } = require('../app');
describe('HTTP Server', () => {
let server;
const PORT = 3001;
before((done) => {
server = createServer();
server.listen(PORT, done);
});
after((done) => {
server.close(done);
});
describe('GET /', () => {
it('should return HTML page with status 200', (done) => {
http.get(`http://localhost:${PORT}/`, (res) => {
expect(res.statusCode).to.equal(200);
expect(res.headers['content-type']).to.include('text/html');
done();
});
});
it('should return page with student data', (done) => {
http.get(`http://localhost:${PORT}/`, (res) => {
let data = '';
res.on('data', (chunk) => { data += chunk; });
res.on('end', () => {
expect(data).to.include('John Doe');
expect(data).to.include('Jane Smith');
expect(data).to.include('Student Profile System');
done();
});
});
});
});
describe('GET /api/students', () => {
it('should return all students as JSON', (done) => {
http.get(`http://localhost:${PORT}/api/students`, (res) => {
expect(res.statusCode).to.equal(200);
expect(res.headers['content-type']).to.include('application/json');
let data = '';
res.on('data', (chunk) => { data += chunk; });
res.on('end', () => {
const json = JSON.parse(data);
expect(json.success).to.be.true;
expect(json.data).to.be.an('array');
expect(json.data.length).to.be.at.least(4);
done();
});
});
});
});
describe('GET /api/students/:id', () => {
it('should return specific student by ID', (done) => {
http.get(`http://localhost:${PORT}/api/students/1`, (res) => {
expect(res.statusCode).to.equal(200);
let data = '';
res.on('data', (chunk) => { data += chunk; });
res.on('end', () => {
const json = JSON.parse(data);
expect(json.success).to.be.true;
expect(json.data.name).to.equal('John Doe');
done();
});
});
});
it('should return 404 for non-existent student', (done) => {
http.get(`http://localhost:${PORT}/api/students/999`, (res) => {
expect(res.statusCode).to.equal(404);
done();
});
});
});
describe('GET /api/students/grade/:grade', () => {
it('should return students with specific grade', (done) => {
http.get(`http://localhost:${PORT}/api/students/grade/A`, (res) => {
expect(res.statusCode).to.equal(200);
let data = '';
res.on('data', (chunk) => { data += chunk; });
res.on('end', () => {
const json = JSON.parse(data);
expect(json.success).to.be.true;
expect(json.data).to.be.an('array');
expect(json.data.length).to.be.at.least(2);
done();
});
});
});
});
describe('404 Routes', () => {
it('should return 404 for unknown routes', (done) => {
http.get(`http://localhost:${PORT}/unknown`, (res) => {
expect(res.statusCode).to.equal(404);
done();
});
});
});
});