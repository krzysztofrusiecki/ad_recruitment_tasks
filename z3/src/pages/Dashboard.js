import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import MainTemplate from "../templates/MainTemplate";

const Dashboard = ({ isAuthenticated }) => {
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/signin");
    }
  }, [isAuthenticated]);

  return <MainTemplate>DASHBOARD</MainTemplate>;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
