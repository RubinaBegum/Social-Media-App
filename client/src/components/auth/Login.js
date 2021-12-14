import React, { useState } from 'react';
import { Fragment } from 'react';
// import axios from 'axios';
import { Link ,Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({login,isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password,  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email,password)
  };
// Navigate if loggin in 
  if (isAuthenticated){
    return <Navigate to ='/dashboard'></Navigate>
  }

  return (
    <Fragment> 
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e=>onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>onChange(e)}
            minLength='6'
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p> 
    </Fragment>
  );
};
Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{login})(Login);