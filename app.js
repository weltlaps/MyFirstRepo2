const http = require('http');
const {
getAllStudents,
getStudentById,
getStudentsByGrade,
getAverageAge,
getGradeDistribution
} = require('./students');
// Create server
function createServer() {
return http.createServer((req, res) => {
// Home page with student table
if (req.url === '/' && req.method === 'GET') {
const students = getAllStudents();
const avgAge = getAverageAge();
const gradeDistribution = getGradeDistribution();
const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Student Profiles - Version 2.0</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
min-height: 100vh;
padding: 40px 20px;
}
.container {
max-width: 1000px;
margin: 0 auto;
background: white;
padding: 40px;
border-radius: 20px;
box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
h1 {
color: #667eea;
text-align: center;
margin-bottom: 10px;
font-size: 2.5em;
}
.subtitle {
text-align: center;
color: #666;
margin-bottom: 30px;
}
.stats {
display: flex;
gap: 20px;
margin-bottom: 30px;
flex-wrap: wrap;
}
.stat-card {
flex: 1;
min-width: 200px;
padding: 20px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
border-radius: 10px;
text-align: center;
}
.stat-value {
font-size: 2em;
font-weight: bold;
margin-bottom: 5px;
}
.stat-label {
opacity: 0.9;
}
.student-table {
width: 100%;
border-collapse: collapse;
margin-top: 20px;
}
.student-table thead {
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
}
.student-table th {
padding: 15px;
text-align: left;
font-weight: 600;
}
.student-table td {
padding: 15px;
border-bottom: 1px solid #f0f0f0;
}
.student-table tr:hover {
background-color: #f8f9ff;
}
.grade-badge {
display: inline-block;
padding: 5px 15px;
border-radius: 20px;
font-weight: bold;
color: white;
}
.grade-A { background-color: #4caf50; }
.grade-B { background-color: #2196f3; }
.grade-C { background-color: #ff9800; }
.version {
text-align: center;
color: #667eea;
margin-top: 30px;
font-weight: bold;
}
</style>
</head>
<body>
<div class="container">
<h1>￿ Student Profile System</h1>
<div class="subtitle">Simple & Modern</div>
<div class="stats">
<div class="stat-card">
<div class="stat-value">${students.length}</div>
<div class="stat-label">Total Students</div>
</div>
<div class="stat-card">
<div class="stat-value">${avgAge.toFixed(1)}</div>
<div class="stat-label">Average Age</div>
</div>
<div class="stat-card">
<div class="stat-value">${gradeDistribution['A'] || 0}</div>
<div class="stat-label">Grade A Students</div>
</div>
</div>
<table class="student-table">
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Age</th>
<th>Grade</th>
<th>Email</th>
</tr>
</thead>
<tbody>
${students.map(student => `
<tr>
<td>${student.id}</td>
<td>${student.name}</td>
<td>${student.age}</td>
<td><span class="grade-badge grade-
${student.grade}">${student.grade}</span></td>
<td>${student.email}</td>
</tr>
`).join('')}
</tbody>
</table>
<div class="version">Version 2.0 - With Unit Testing ￿</div>
</div>
</body>
</html>`;
res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
res.end(html);
}
// API: Get all students
else if (req.url === '/api/students' && req.method === 'GET') {
const students = getAllStudents();
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ success: true, data: students }));
}
// API: Get student by ID
else if (req.url.match(/\/api\/students\/\d+/) && req.method === 'GET') {
try {
const id = parseInt(req.url.split('/')[3]);
const student = getStudentById(id);
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ success: true, data: student }));
} catch (error) {
res.writeHead(404, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ success: false, error: error.message }));
}
}
// API: Get students by grade
else if (req.url.match(/\/api\/students\/grade\/[A-F]/) && req.method === 'GET') {
const grade = req.url.split('/')[4];
const students = getStudentsByGrade(grade);
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ success: true, data: students }));
}
// 404 Not found
else {
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end('Page not found');
}
});
}
const PORT = process.env.PORT || 3000;
// Only start server if this file is run directly
if (require.main === module) {
const server = createServer();
server.listen(PORT, () => {
console.log(`￿ Student Profile app running on http://localhost:${PORT}`);
console.log(`￿ API Endpoints:`);
console.log(` GET / - Web Interface`);
console.log(` GET /api/students - All students`);
console.log(` GET /api/students/:id - Student by ID`);
console.log(` GET /api/students/grade/A - Students by grade`);
});
}
// Export for testing
module.exports = { createServer };
