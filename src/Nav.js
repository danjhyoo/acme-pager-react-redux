import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = ({ count, match }) => {
  const totalPages = Math.ceil(count / 50);
  const pages = new Array(totalPages).fill("").map((_, idx) => {
    return {
      idx,
      text: idx + 1,
    };
  });
  const currPage = match.params.pageNum;
  return (
    <nav className="page-nav">
      <Link
        to={parseInt(currPage) - 1 >= 0 ? `/${currPage - 1}` : `/${currPage}`}
      >
        Previous
      </Link>
      {pages.map((page) => {
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
  );
};

const mapStateToProps = ({ employees }) => {
  return {
    count: employees.count,
  };
};

export default connect(mapStateToProps)(Nav);
