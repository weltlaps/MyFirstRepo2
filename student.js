const http = require('http');
// Student data
const students = [
{ id: 1, name: 'John Doe', age: 20, grade: 'A', email: 'john@school.com' },
{ id: 2, name: 'Jane Smith', age: 21, grade: 'B', email: 'jane@school.com' },
{ id: 3, name: 'Mike Johnson', age: 19, grade: 'A', email: 'mike@school.com' },
{ id: 4, name: 'Sarah Wilson', age: 22, grade: 'C', email: 'sarah@school.com' }
];
const server = http.createServer((req, res) => {
if (req.url === '/' && req.method === 'GET') {
res.writeHead(200, { 'Content-Type': 'text/html' });
const html = `
<!DOCTYPE html>
<html>
<head>
<title>Student Profiles - Version 1</title>
<style>
body {
font-family: Arial, sans-serif;
margin: 40px;
background-color: #f5f5f5;
}
.container {
max-width: 800px;
margin: 0 auto;
background: white;
padding: 20px;
border-radius: 10px;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
h1 {
color: #2e7d32; /* Green color */
text-align: center;
margin-bottom: 30px;
}
.student-table {
width: 100%;
border-collapse: collapse;
margin-top: 20px;
}
.student-table th {
background-color: #4caf50; /* Green header */
color: white;
padding: 12px;
text-align: left;
}
.student-table td {
padding: 12px;
border-bottom: 1px solid #ddd;
}
.student-table tr:hover {
background-color: #e8f5e8; /* Light green hover */
}
.version {
text-align: center;
color: #2e7d32;
margin-top: 20px;
font-weight: bold;
}
</style>
</head>
<body>
<div class="container">
<h1>Student Profiles</h1>
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
<td>${student.grade}</td>
<td>${student.email}</td>
</tr>
`).join('')}
</tbody>
</table>
<div class="version">Version 1.0 - Green Theme</div>
</div>
</body>
</html>
`;
res.end(html);
} else {
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end('Page not found');
}
});
const PORT = 3000;
server.listen(PORT, () => {
console.log(`Student Profile app running on http://localhost:${PORT}`);
console.log('Theme: Green (Version 1)');
});
