import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getEmployees } from "./store";

class Home extends Component {
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
    const { employees, count, match } = this.props;
    const totalPages = Math.ceil(count / 50);
    const pages = new Array(totalPages).fill("").map((_, idx) => {
      return {
        idx,
        text: idx + 1,
      };
    });
    const currPage = match.params.pageNum;
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
        <nav className="page-nav">
          <Link
            to={
              parseInt(currPage) - 1 >= 0 ? `/${currPage - 1}` : `/${currPage}`
            }
          >
            Previous
          </Link>
          {pages.map((page) => {
            console.log(page);
            return (
              <Link
                key={page.idx}
                to={`/${page.idx}`}
                className={
                  parseInt(currPage) === page.idx ? "active-page-link" : ""
                }
              >
                {page.text}
              </Link>
            );
          })}
          <Link
            to={
              parseInt(currPage) < pages.length - 1
                ? `/${parseInt(currPage) + 1}`
                : `/${currPage}`
            }
          >
            Next
          </Link>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ employees }) => {
  return {
    employees: employees.rows,
    count: employees.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (pageNum) => dispatch(getEmployees(pageNum)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
