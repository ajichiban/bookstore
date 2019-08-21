import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';

import { firestoreConnect } from 'react-redux-firebase';

import Loader from '../layout/loader/Loader';

function NewSubscriptor (props) 
{	
	/***********
	* State...*
	**********/
	const [loaderSt, setLoader] = useState(false);
	const nameRef = useRef(),
		  lastNameRef = useRef(),
		  careerRef = useRef();

	/*************
	* Methods...*
	************/
	const addSubscriptor = e =>  {
		// creo un objeto ...
		e.preventDefault();

		setLoader(true);
		let newsubs = {
			name: nameRef.current.value,
			lastName: lastNameRef.current.value,
			career: careerRef.current.value,
			code: `code-${Date.now()}`
		}

		// agregar a firestore..
		props.firestore.add({
			collection: 'subscriptors'
		}, newsubs)
			.then(()=> props.history.push('/subscriptors'));

	}
	
	return(
		<div className="row justify-content-center">
			<div className="col-12 mb-3 text-center">
				<Link  
					to={'/subscriptors'}
					className="btn btn-secondary">
					<i className="fas fa-arrow-circle-left"></i>{' '}
					Go Back to List
				</Link>
			</div>

			<div className="col-8 text-center">
				<div className="card p-5">
					<h2>
						<i className="fas fa-user-plus"></i>{' '}
						New Subscriptor
					</h2>

					<form onSubmit={addSubscriptor} >
						<div className="form-group">
							<input 
								type="text"
								className="form-control mb-3"
								name="name"
								ref={nameRef}
								placeholder="Subscriptor's name"
								required
							/>

							<input 
								type="text"
								className="form-control mb-3"
								name="lastName"
								placeholder="Last name"
								ref={lastNameRef}
								required
							/>

							<input 
								type="text"
								className="form-control mb-3"
								name="career"
								ref={careerRef}
								placeholder="Career"
								required
							/>

							<input 
								type="submit"
								className="btn btn-success btn-block mb-1"
								defaultValue="Add subscriptor"/>
							
							{/*Loading*/}
							{loaderSt &&
								<Loader />
							}
						</div>
					</form>
				</div>

			</div>
		</div>
		)
}

export default firestoreConnect()( NewSubscriptor) ;