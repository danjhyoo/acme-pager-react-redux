import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployees } from "./store";

class Employee extends Component {
  constructor() {
    super();
  }
  componentDidUpdate(prevProps) {
    const pageNum = this.props.match.params.pageNum;
    const prevPageNum = prevProps.match.params.pageNum;
    if (prevPageNum !== pageNum) {
      this.props.load(pageNum);
    }
  }
  componentDidMount() {
    const hash = this.props.match.params.pageNum;
    const pageNum = hash ? hash : 0;
    this.props.load(pageNum);
  }

  render() {
    const { employees } = this.props;
    return (
      <div className="main-container">
        <h1>ACME Pager</h1>
        <div className="employee-table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return (
                  <tr key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ employees }) => {
  return {
    employees: employees.rows,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (pageNum) => dispatch(getEmployees(pageNum)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
