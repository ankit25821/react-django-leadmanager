import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addLead} from '../../actions/leads';

export class Form extends React.Component {
	state = {
		name:'',
		email:'',
		message:''
	}

	static propTypes = {
		addLead: PropTypes.func.isRequired
	}

	onChange = e => this.setState({
		[e.target.name]:e.target.value
	});

	onSubmit = e => {
		e.preventDefault();
		const {name, email, message} = this.state;
		const lead = {name, email, message};
		this.props.addLead(lead);
		this.setState({
			name:'',
			email:'',
			message:''
		});
	};

	render() {
		const {name, email, message} = this.state;
		return (
			<div className="card card-body mt-4 mb-4">
			  
			  <h2>Add Lead</h2>

			   <form onSubmit={this.onSubmit}>
			     
			    <div className="form-floating mb-3">
				   <input 
				   type="text" 
				   className="form-control" 
				   id="floatingName" 
				   placeholder="Enter Name."
				   name="name"
				   onChange={this.onChange}
				   value={name}
				   />
				   <label htmlFor="floatingName">Name</label>
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
			       <textarea 
			       type="text" 
			       className="form-control" 
			       id="floatingMessage" 
			       name="message"
			       placeholder="Enter Message."
			       onChange={this.onChange}
			       value={message}
			       style={{'height':'100px'}}
			       />
			       <label htmlFor="floatingMessage">Message</label>
				</div>

				<div className="form-group">
					<button className="btn btn-primary">
						Submit
					</button>
				</div>

				</form>

			</div>
		)
	}
}

export default connect(null,{addLead})(Form)