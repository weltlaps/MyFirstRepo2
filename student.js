// Student data and functions
const students = [
{ id: 1, name: 'John Doe', age: 20, grade: 'A', email: 'john@school.com' },
{ id: 2, name: 'Jane Smith', age: 21, grade: 'B', email: 'jane@school.com' },
{ id: 3, name: 'Mike Johnson', age: 19, grade: 'A', email: 'invalid-email' }, // BAD EMAIL - will
cause test to fail
{ id: 4, name: 'Sarah Wilson', age: 22, grade: 'C', email: 'sarah@school.com' }
];
// Email validation function
function isValidEmail(email) {
// Check if email has @ and . and proper format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}
// Validate all student emails
function validateAllEmails() {
const invalidStudents = [];
students.forEach(student => {
if (!isValidEmail(student.email)) {
invalidStudents.push({
id: student.id,
name: student.name,
email: student.email
});
}
});
return invalidStudents;
}
// Get all students
function getAllStudents() {
return students;
}
// Get student by ID
function getStudentById(id) {
const student = students.find(s => s.id === id);
if (!student) {
throw new Error('Student not found');
}
return student;
}
// Get students by grade
function getStudentsByGrade(grade) {
return students.filter(s => s.grade === grade);
}
// Calculate average age
function getAverageAge() {
if (students.length === 0) return 0;
const sum = students.reduce((acc, s) => acc + s.age, 0);
return sum / students.length;
}
// Get grade distribution
function getGradeDistribution() {
return students.reduce((acc, student) => {
acc[student.grade] = (acc[student.grade] || 0) + 1;
return acc;
}, {});
}
// Add a new student with validation
function addStudent(name, age, grade, email) {
// Validate email before adding
if (!isValidEmail(email)) {
throw new Error('Invalid email address');
}
const newStudent = {
id: students.length + 1,
name,
age,
grade,
email
};
students.push(newStudent);
return newStudent;
}
module.exports = {
students,
getAllStudents,
getStudentById,
getStudentsByGrade,
getAverageAge,
getGradeDistribution,
addStudent,
isValidEmail,
validateAllEmails
};
