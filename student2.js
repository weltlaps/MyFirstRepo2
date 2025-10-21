// students.js
const students = [
  { id: 1, name: 'Alice', age: 20, grade: 'A', email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 22, grade: 'B', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 21, grade: 'C', email: 'charlie@example.com' }
];

function getAllStudents() {
  return students;
}

function getStudentById(id) {
  const student = students.find(s => s.id === id);
  if (!student) throw new Error('Student not found');
  return student;
}

function getStudentsByGrade(grade) {
  return students.filter(s => s.grade === grade);
}

function getAverageAge() {
  const total = students.reduce((sum, s) => sum + s.age, 0);
  return total / students.length;
}

function getGradeDistribution() {
  return students.reduce((acc, s) => {
    acc[s.grade] = (acc[s.grade] || 0) + 1;
    return acc;
  }, {});
}

module.exports = {
  getAllStudents,
  getStudentById,
  getStudentsByGrade,
  getAverageAge,
  getGradeDistribution
};
