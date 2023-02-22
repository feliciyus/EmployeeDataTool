/*
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: []};
        this.loadEmployees = this.loadEmployees.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidMount() {
        this.loadEmployees();
    }

    loadEmployees() {
        client({method: 'GET', path: '/api/employees'}).done(response => {
            this.setState({employees: response.entity._embedded.employees});
        });
    }


    handleFileSelect(event) {
        event.preventDefault();
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        client({method: 'POST', path: '/upload', entity: formData, headers: {'Content-Type': 'multipart/form-data'}}).done(response => {
            console.log(response.entity);
            this.loadEmployees();
        });
    }


    handleUpload(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', event.target.file.files[0]);
        client({
            method: 'POST',
            path: '/upload',
            entity: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).done(() => {
            this.loadEmployees();
        });
    }



    render() {
        return (
            <div>
                <EmployeeList employees={this.state.employees} />
                <UploadButton onUpload={this.handleUpload} />
            </div>
        );
    }
}

class UploadButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    handleFileSelect(event) {
        event.preventDefault();
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        client({method: 'POST', path: '/upload', entity: formData, headers: {'Content-Type': 'multipart/form-data'}}).done(response => {
            console.log(response.entity);
            this.props.onUpload();
        });
    }

    render() {
        return (
            <form onSubmit={this.props.onUpload}>
                <div className="form-group">
                    <label htmlFor="file">Select a CSV file</label>
                    <input type="file" name="file" className="form-control-file" id="file" accept=".csv" />
                    <button type="submit" className="btn btn-primary">
                        Upload
                    </button>
                </div>
            </form>
        );
    }
}

class EmployeeList extends React.Component{
    render() {
        const employees = this.props.employees.map(employee =>
            <Employee key={employee._links.self.href} employee={employee}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>phoneNumber</th>
                </tr>
                {employees}
                </tbody>
            </table>
        )
    }
}

class Employee extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.employee.name}</td>
                <td>{this.props.employee.email}</td>
                <td>{this.props.employee.phoneNumber}</td>
            </tr>
        )
    }
}
*/



const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');




function App() {
    const [employees, setEmployees] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(20);


    React.useEffect(() => {
        loadEmployees(currentPage, pageSize);
    }, []);

    function loadEmployees(page = currentPage, size = pageSize, callback) {
        const url = `/api/employees?page=${page}&size=${size}`;
        client({ method: "GET", path: url }).done((response) => {
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

    return (
        <div className="container">
            <h1>Employee List</h1>
            <EmployeeList employees={employees} currentPage={currentPage} pageSize={pageSize} />
            <UploadButton loadEmployees={loadEmployees} />
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

function UploadButton({ loadEmployees }) {

    const [file, setFile] = React.useState();

    function handleUpload(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        client({
            method: "POST",
            path: "/upload",
            entity: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                console.log("judu1");
                console.log(response);
                console.log("judu2");
                loadEmployees();
                console.log("judu3");
            })
            .catch((error) => console.log(error));
    }

    return (
        <form onSubmit={handleUpload}>
            <div className="form-group">
                <label htmlFor="file">Select a CSV file</label>
                <input
                    type="file"
                    name="file"
                    className="form-control-file"
                    id="file"
                    accept=".csv"
                    onChange={(e)=>setFile(e.target.files[0])}
                />
                <button type="submit" className="btn btn-primary">
                    Upload
                </button>
            </div>
        </form>
    );
}

function EmployeeList({ employees, currentPage, pageSize }) {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedEmployees = employees.slice(startIndex, endIndex);
    const shouldDisplayAllEmployees = employees.length <= pageSize;

    return (
        <table>
            <tbody>
            <tr>
                <th>name</th>
                <th>email</th>
                <th>phoneNumber</th>
            </tr>
            {shouldDisplayAllEmployees ? (
                employees.map((employee) => (
                    <Employee key={employee._links.self.href} employee={employee} />
                ))
            ) : (
                displayedEmployees.map((employee) => (
                    <Employee key={employee._links.self.href} employee={employee} />
                ))
            )}
            </tbody>
        </table>
    );
}

function Employee({ employee }) {
    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phoneNumber}</td>
        </tr>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
