import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/auth';
import {createMessage} from '../../actions/messages'

export class Register extends React.Component {

	state = {
		username:'',
		email:'',
		password:'',
		password2:''
	}

	static propTypes = {
		register: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool
	}

	onSubmit = e =>{
		e.preventDefault();
		const {username, email, password, password2} = this.state;
		if(password !== password2){
			this.props.createMessage({
				passwordNotMatch: 'Passwords do not match'
			});
		}else{
			const newUser = {
				username,
				password,
				email
			}

			this.props.register(newUser);
		}
		

	};

	onChange = e => this.setState({[e.target.name]:e.target.value});

	render() {
		if(this.props.isAuthenticated){
			return <Redirect to="/"/>;
		}
		const {username, email, password, password2} = this.state;
		return (
			<div className="col-md-6 m-auto">
			  <div className="card card-body mt-4 mb-4">
			  
			  <h2 className="text-center">Register</h2>

			   <form onSubmit={this.onSubmit}>
				    <div className="form-floating mb-3">
					   <input 
					   type="text" 
					   className="form-control" 
					   id="floatingUsername" 
					   placeholder="Enter Username."
					   name="username"
					   onChange={this.onChange}
					   value={username}
					   />
					   <label htmlFor="floatingUsername">Username</label>
					</div>

				    <div className="form-floating mb-3">
				       <input 
				       type="email" 
				       className="form-control" 
				       id="floatingEmail" 
				       name="email"
				       placeholder="Enter Email."
				       onChange={this.onChange}
				       value={email}
				       />
				       <label htmlFor="floatingEmail">Email</label>
					</div>

					<div className="form-floating mb-3">
				       <input 
				       type="password" 
				       className="form-control" 
				       id="floatingPassword" 
				       name="password"
				       placeholder="Enter Password."
				       onChange={this.onChange}
				       value={password}
				       />
				       <label htmlFor="floatingPassword">Password</label>
					</div>

					<div className="form-floating mb-3">
				       <input 
				       type="password" 
				       className="form-control" 
				       id="floatingPassword2" 
				       name="password2"
				       placeholder="Confirm Password."
				       onChange={this.onChange}
				       value={password2}
				       />
				       <label htmlFor="floatingPassword2">Confirm Password</label>
					</div>

					<div className="form-group text-center mb-2">
					 <button className="btn btn-primary">
						Register
					 </button>
				    </div>

				    <p>
				    	Already have an account? <Link to="/login">Login</Link>
				    </p>

			   </form>
			  </div>
			</div>
		)
	}
}

const mapStateProps = state =>({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateProps, {register, createMessage})(Register);