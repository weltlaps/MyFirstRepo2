const { expect } = require('chai');
const {
getAllStudents,
getStudentById,
getStudentsByGrade,
getAverageAge,
getGradeDistribution,
addStudent,
isValidEmail,
validateAllEmails
} = require('../students');
describe('Student Functions', () => {
describe('getAllStudents()', () => {
it('should return all students', () => {
const students = getAllStudents();
expect(students).to.be.an('array');
expect(students).to.have.lengthOf.at.least(4);
});
it('should return students with correct properties', () => {
const students = getAllStudents();
const student = students[0];
expect(student).to.have.property('id');
expect(student).to.have.property('name');
expect(student).to.have.property('age');
expect(student).to.have.property('grade');
expect(student).to.have.property('email');
});
});
describe('getStudentById()', () => {
it('should return the correct student for valid ID', () => {
const student = getStudentById(1);
expect(student).to.be.an('object');
expect(student.name).to.equal('John Doe');
expect(student.id).to.equal(1);
});
it('should throw error for non-existent student', () => {
expect(() => getStudentById(999)).to.throw('Student not found');
});
it('should return correct student data', () => {
const student = getStudentById(2);
expect(student.name).to.equal('Jane Smith');
expect(student.grade).to.equal('B');
});
});
describe('getStudentsByGrade()', () => {
it('should return students with grade A', () => {
const students = getStudentsByGrade('A');
expect(students).to.be.an('array');
expect(students.length).to.be.at.least(2);
students.forEach(s => {
expect(s.grade).to.equal('A');
});
});
it('should return empty array for grade with no students', () => {
const students = getStudentsByGrade('F');
expect(students).to.be.an('array');
expect(students).to.have.lengthOf(0);
});
it('should return correct students for grade B', () => {
const students = getStudentsByGrade('B');
expect(students).to.have.lengthOf(1);
expect(students[0].name).to.equal('Jane Smith');
});
});
describe('getAverageAge()', () => {
it('should calculate correct average age', () => {
const avgAge = getAverageAge();
expect(avgAge).to.be.a('number');
expect(avgAge).to.equal(20.5);
});
it('should return a positive number', () => {
const avgAge = getAverageAge();
expect(avgAge).to.be.above(0);
});
});
describe('getGradeDistribution()', () => {
it('should return grade distribution object', () => {
const distribution = getGradeDistribution();
expect(distribution).to.be.an('object');
});
it('should have correct count for grade A', () => {
const distribution = getGradeDistribution();
expect(distribution.A).to.equal(2);
});
it('should have correct count for all grades', () => {
const distribution = getGradeDistribution();
expect(distribution.A).to.equal(2);
expect(distribution.B).to.equal(1);
expect(distribution.C).to.equal(1);
});
});
describe('Email Validation', () => {
it('should validate correct email addresses', () => {
expect(isValidEmail('test@example.com')).to.be.true;
expect(isValidEmail('user.name@domain.co.uk')).to.be.true;
expect(isValidEmail('john@school.com')).to.be.true;
});
it('should reject invalid email addresses', () => {
expect(isValidEmail('invalid-email')).to.be.false;
expect(isValidEmail('@example.com')).to.be.false;
expect(isValidEmail('test@')).to.be.false;
expect(isValidEmail('test.com')).to.be.false;
expect(isValidEmail('')).to.be.false;
});
it('should detect students with invalid emails', () => {
const invalidStudents = validateAllEmails();
expect(invalidStudents).to.be.an('array');
expect(invalidStudents.length).to.be.at.least(1);
expect(invalidStudents[0].email).to.equal('invalid-email');
});
it('all students must have valid email addresses', () => {
const students = getAllStudents();
students.forEach(student => {
expect(isValidEmail(student.email),
`${student.name} has invalid email: ${student.email}`
).to.be.true;
});
});
});
describe('addStudent()', () => {
it('should add a student with valid email', () => {
const initialCount = getAllStudents().length;
const newStudent = addStudent('Test User', 20, 'A', 'test@school.com');
expect(newStudent).to.be.an('object');
expect(newStudent.name).to.equal('Test User');
expect(getAllStudents().length).to.equal(initialCount + 1);
});
it('should reject student with invalid email', () => {
expect(() => {
addStudent('Bad Email', 20, 'A', 'invalid-email');
}).to.throw('Invalid email address');
});
it('should assign incremental ID to new student', () => {
const students = getAllStudents();
const lastId = students[students.length - 1].id;
const newStudent = addStudent('Another User', 21, 'B', 'another@school.com');
expect(newStudent.id).to.equal(lastId + 1);
});
});
});
