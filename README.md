# Student Management System - Admin Dashboard

## Overview

The Student Management System (Admin Dashboard) is a web application designed to help administrators efficiently manage students, courses, enrollments, attendance, and grades. This system is built using a modern tech stack, including Spring Boot for the backend, React for the frontend, and Postman for API testing.

## Project Structure

* **Backend**: Spring Boot + Java EE (IntelliJ IDEA Community Edition 2024.1.4)
* **Frontend**: React + CSS + JavaScript (VS Code)
* **Testing**: Postman
* **Version Control**: Git
* **Browser Compatibility**: Google Chrome or Microsoft Edge

## Features

### 1. Dashboard

* Provides an overview of the system with key statistics and insights.

### 2. Students Management

* Manage student information (StudentId, FirstName, LastName, Email).
* CRUD operations: Add, View, Edit, Delete Students.

### 3. Courses Management

* Manage course details (CourseCode, CourseName, Description, Credit).
* CRUD operations: Add, View, Edit, Delete Courses.

### 4. Enrollments Management

* Track course enrollments (EnrollmentId, StudentId, CourseId, EnrollmentDate).
* CRUD operations: Add, View, Edit, Delete Enrollments.

### 5. Attendance Management

* Record and monitor student attendance (AttendanceId, StudentId, CourseId, Date, Status).
* CRUD operations: Add, View, Edit, Delete Attendance records.

### 6. Grades Management

* Manage student grades (GradeId, StudentId, CourseId, Score, Grade).
* CRUD operations: Add, View, Edit, Delete Grades.

## Installation and Setup

### Prerequisites

* Install IntelliJ IDEA Community Edition 2024.1.4 for backend development.
* Install VS Code for frontend development.
* Install Node.js and npm for React project setup.
* Install Java JDK (version 17 or later) for Spring Boot.
* Install Postman for API testing.
* Install Git for version control.

### Backend Setup (Spring Boot + Java EE)

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```
2. Open the backend project in IntelliJ IDEA.
3. Set up the database configuration in `application.properties` or `application.yml`.
4. Run the Spring Boot application.

### Frontend Setup (React + CSS + JavaScript)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React application:

   ```bash
   npm start
   ```

### Accessing the Application

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:8080`

## Usage

* Login as an admin to access the dashboard.
* Use the sidebar navigation to manage Students, Courses, Enrollments, Attendance, and Grades.

## Testing

* Use Postman to test the RESTful APIs for each module (Students, Courses, Enrollments, Attendances, Grades).

## Screenshots

![Dashboard](https://github.com/user-attachments/assets/6ab4e780-7d4c-4e8d-b03e-a2a1df71f989)
<br>
![SM Table](https://github.com/user-attachments/assets/bd2a35a0-1bdf-4818-97ec-0ffe8c848ce8)
<br>
![SM Form](https://github.com/user-attachments/assets/6b3518db-396b-4b35-9332-9def2fb7e077)
<br>
![CM Table](https://github.com/user-attachments/assets/0f50814f-7502-4700-8dd1-103d03e42a3a)
<br>
![CM Form](https://github.com/user-attachments/assets/78c83d98-2663-4bed-97bb-5a89bcbcbfea)
<br>
![EM Table](https://github.com/user-attachments/assets/6914fd2b-0469-4aef-b88c-0e8fb70567d0)
<br>
![EM Form](https://github.com/user-attachments/assets/dce29ac0-d557-44bd-971c-eb738b6c9d87)
<br>
![AM Table](https://github.com/user-attachments/assets/47665e71-f059-4636-9493-642142238b6c)
<br>
![AM Form](https://github.com/user-attachments/assets/8f7d8282-94db-4aab-864c-6f962d86e8a9)
<br>
![GM Table](https://github.com/user-attachments/assets/d2e8a1cf-eefb-4700-b46c-0cce6c4b84d8)
<br>
![GM Form](https://github.com/user-attachments/assets/71b33769-1eeb-4d57-bfb3-9a1b0ca23cb8)
<br>
Success Message
<br>
![Success Message](https://github.com/user-attachments/assets/d784c5db-8dab-4a90-9466-5ce2d006b9e7)
<br>
Update
![Update ](https://github.com/user-attachments/assets/7def8ff2-746b-4117-be46-931eb798b043)
<br>
Delete
<br>
![Confirm Delete](https://github.com/user-attachments/assets/dfd41f77-317b-414c-a384-36a1f0d6dd85)





