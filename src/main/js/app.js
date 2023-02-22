const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');


function App() {
    const [employees, setEmployees] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(15);
    const [file, setFile] = React.useState();

    React.useEffect(() => {
        loadEmployees(currentPage, pageSize);
    }, []);

    function loadEmployees(page = currentPage, size = pageSize, callback) {
        const url = `/api/employees?page=${page}&size=${size}`;
        client({method: "GET", path: url}).done((response) => {
            console.log(response.entity._embedded.employees);
            setEmployees(response.entity._embedded.employees)
            if (callback) callback();
        });
    }

    function handlePrevClick() {
        const prevPage = currentPage - 1;
        loadEmployees(prevPage, pageSize, () => setCurrentPage(prevPage));
    }

    function handleNextClick() {
        const nextPage = currentPage + 1;
        loadEmployees(nextPage, pageSize, () => setCurrentPage(nextPage));
    }

    function handleUpload(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        client({
            method: "POST",
            path: "/upload",
            entity: formData,
            headers: {"Content-Type": "multipart/form-data"},
        })
            .then((response) => {
                loadEmployees();
            })
            .catch((error) => console.log(error));
    }


    return (
        <div className="container">
            <h1>CSV Uploader</h1>
            <div className="form-group">
                <label htmlFor="file">Note that the CSV file must have a header row with the following columns: "Name",
                    "Email", and "Phone Number". The app will only accept files with this header.</label>
                <input
                    type="file"
                    name="file"
                    className="form-control-file"
                    id="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit" className="btn btn-teal" onClick={handleUpload}>
                    Upload
                </button>
            </div>
            <EmployeeList employees={employees} currentPage={currentPage} pageSize={pageSize}/>
            <div className="pagination">
                <button onClick={handlePrevClick} disabled={currentPage === 0}>
                    Prev
                </button>
                <button onClick={handleNextClick} disabled={employees.length < pageSize}>
                    Next
                </button>
            </div>
        </div>
    );
}


function EmployeeList({employees, currentPage, pageSize}) {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedEmployees = employees.slice(startIndex, endIndex);
    const shouldDisplayAllEmployees = employees.length <= pageSize;

    return (
        <table>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
            </tr>
            {shouldDisplayAllEmployees ? (
                employees.map((employee) => (
                    <Employee key={employee._links.self.href} employee={employee}/>
                ))
            ) : (
                displayedEmployees.map((employee) => (
                    <Employee key={employee._links.self.href} employee={employee}/>
                ))
            )}
            </tbody>
        </table>
    );
}

function Employee({employee}) {
    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phoneNumber}</td>
        </tr>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)
