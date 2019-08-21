import React, { Component } from 'react'
import {Link} from 'react-router-dom'; 
import {compose} from 'redux';
import {connect} from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';


class Navbar extends Component {

  state = {
  	isAuthenticate: false
  }

  static getDerivedStateFromProps(props, state){
  	if(props.auth.uid){
  		return {isAuthenticate: true}
  	}else{
  		return {isAuthenticate: false}
  	}
  }

  tryLogout = ()=>{

  	this.props.firebase.logout();
  }

  render () {
    return(
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
		  <div className="navbar navbar-light">
			<Link to={'/'} className="navbar-brand mb-0 h1">BookStore's Admin</Link>
		  </div>
		  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
		    <span className="navbar-toggler-icon"></span>
		  </button>

		  <div className="collapse navbar-collapse" id="navbarColor01">
		    { this.state.isAuthenticate && 
				<ul className="navbar-nav mr-auto">	
			      <li className="nav-item">
			        <Link  to={'/subscriptors'} className="nav-link" >
						Subscriptors
			    	</Link>
			      </li>

			      <li className="nav-item">
			        <Link  to={'/'} className="nav-link" >
						Books
			    	</Link>
			      </li>
			    </ul>
		    }

		    {
		    	this.state.isAuthenticate &&
		    	<ul className="navbar-nav ml-auto">	
			      <li className="nav-item">
			        <a  href="#!" className="nav-link" >
						{this.props.auth.email}
			    	</a>
			      </li>

			      <li className="nav-item">
			        <button
			        	className="btn btn-danger"
			        	onClick={this.tryLogout}
			        	>
			        	Logout
			        </button>
			      </li>
			    </ul>
		    }
		  </div>
		</nav>
		)
  }
}

export default compose(
	firebaseConnect(),
	connect((state, props) => ({
		auth:state.firebase.auth
	}))
)(Navbar);
