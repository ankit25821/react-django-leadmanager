import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

export class Login extends React.Component {

	state = {
		username:'',
		password:'',
	}

	static propTypes = {
		login: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool
	}

	onSubmit = e =>{
		e.preventDefault();
		this.props.login(this.state.username, this.state.password);
	};

	onChange = e => this.setState({[e.target.name]:e.target.value});

	render() {
		if(this.props.isAuthenticated){
			return <Redirect to='/'/>;
		}
		const {username, password} = this.state;
		return (
			<div className="col-md-6 m-auto">
			  <div className="card card-body mt-4 mb-4">
			  
			  <h2 className="text-center">Login</h2>

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

					<div className="form-group text-center mb-2">
					 <button className="btn btn-primary">
						Login
					 </button>
				    </div>

				    <p>
				    	Don't have an account? <Link to="/register">Register</Link>
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

export default connect(mapStateProps, {login})(Login);