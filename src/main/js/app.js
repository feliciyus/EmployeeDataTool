const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

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


function App() {
    const [employees, setEmployees] = React.useState([]);


    React.useEffect(() => {
        loadEmployees();
    }, []);

    function loadEmployees() {
        client({ method: "GET", path: "/api/employees" }).done((response) => {
            console.log(response.entity._embedded.employees);
            setEmployees(response.entity._embedded.employees);
        });
    }

    return (
        <div>
            <EmployeeList employees={employees} />
            <UploadButton loadEmployees={loadEmployees} />
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

function EmployeeList({ employees }) {
    return (
        <table>
            <tbody>
            <tr>
                <th>name</th>
                <th>email</th>
                <th>phoneNumber</th>
            </tr>
            {employees.map((employee) => (
                <Employee key={employee._links.self.href} employee={employee} />
            ))}
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
