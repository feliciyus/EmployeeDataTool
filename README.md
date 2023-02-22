# Employee Management System

This is a web application for managing employee records. It is built using Spring Boot, H2, and React.

## Prerequisites

Before you can run this application, you need to have the following installed on your system:

- Java JDK 8 or later
- Node.js 12.x or later
- Maven 3.x (optional)

## Installation

To install and run the application, follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal or command prompt and navigate to the root directory of the cloned repository.
3. (Optional) If you don't have Maven installed on your system, you can use the Maven wrapper included in the project by running `./mvnw` instead of `mvn`.
4. Run `mvn clean install` to build the project.
5. Run `mvn spring-boot:run` to start the application.
6. Open a web browser and go to `http://localhost:8080` to access the application.

## Usage

### Uploading Employee Records

To add new employees to the database, you can use the CSV uploader on the home page. Note that the CSV file must have a header row with the following columns: "Name", "Email", and "Phone Number". The app will only accept files with this header.

1. Click the "Choose File" button and select a CSV file from your local machine.
2. Click the "Upload" button to submit the file.
3. The new employees will be added to the database and displayed in the table.

### Viewing Employee Records

The home page displays a table of all employees in the database. By default, 15 employees are displayed per page. You can navigate between pages using the "Next" and "Prev" buttons at the bottom of the page.

### Accessing the Database

To access the H2 database used by the app, go to http://localhost:8080/h2-console. The JDBC URL is jdbc:h2:mem:employeedb. The username is sa and there is no password.

