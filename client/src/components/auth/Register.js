import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link ,Navigate} from 'react-router-dom';
// import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types'
import { register } from '../../actions/auth';



const Register = ({setAlert,register,isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
        setAlert('Passwords do not match','danger');
    }else{
      // console.log('SUCCESS')
      register({name,email,password})
    }
    // } else {
    //    const newUser={
    //         name,
    //         email,
    //         password
    //     }
    //     try{
    //         const config={
    //             method:'POST',
    //             mode:"cors",
    //             credentials:'include',
    //             headers:{
    //                 'Content-type':'application/json',
    //                   'Content-Type': 'application/json ',
    //                   'Accept': 'application/json',
    //                   "Access-Control-Origin": "*"
    //             }
    //         }
    //         const body=JSON.stringify(newUser);
    //         const res=await axios.post('/api/users',body,config);
    //         console.log(res.data)
    //     }catch(err){
    //         console.log(err.response.data)
    //     }
    // }
  };
  if(isAuthenticated){
    return <Navigate to='/dashboard'></Navigate>
  }

  return (
    <Fragment> 
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e=>onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e=>onChange(e)}
            // required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>onChange(e)}
            // minLength='6'
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e=>onChange(e)}
            // minLength='6'
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p> 
    </Fragment>
  );
};
Register.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(
  mapStateToProps,
  {setAlert,register})(Register);