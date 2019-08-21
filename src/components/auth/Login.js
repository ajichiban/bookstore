import React, {useRef} from 'react';

import {firebaseConnect} from 'react-redux-firebase';

function Login (props) 
{	
	/***********
	* State...*
	**********/
	let emailRef = useRef(),
		passwordRef = useRef();

	/*************
	* Methods...*
	************/
	const tryLogin = e =>{
		e.preventDefault();
		console.log(emailRef.current.value, passwordRef.current.value);
		
		props.firebase.login({
			email: emailRef.current.value,
			password: passwordRef.current.value
		})
		.then(res => console.log('has iniciado sesion'))
		.catch(error => console.log('hubo un error , ', error))
	}

	
	return(
		<div className="row justify-content-center">
			<div className="col-md-5">
				<div className="card mt-5">
					<div className="card-body">
						<h2 className="text-center py-4">
							<i className="fas fa-lock"></i>{' '}
							Login
						</h2>

						<form  onSubmit={tryLogin} >
							<div className="form-group">
								<label>Email:</label>
								<input 
									type="email" 
									className="form-control"
									ref={emailRef}/>
							</div>

							<div className="form-group">
								<label>Password:</label>
								<input 
									type="password" 
									className="form-control"
									ref={passwordRef}/>
							</div>

							<input 
								type="submit" 
								className="btn btn-success btn-block"
								value="Login"/>
						</form>
					</div>
				</div>
			</div>
		</div>
		)
}

export default firebaseConnect()(Login) ;