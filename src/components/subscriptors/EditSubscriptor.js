import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';

//Redux ...
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loader from '../layout/loader/Loader.js';

function EditSubscriptor (props) 
{	

	
	/***********
	* State...*
	**********/
	const [loaderSt, setLoader] = useState(false);
	const nameRef = useRef(),
		  lastNameRef = useRef(),
		  careerRef = useRef();

	if(!props.subscriptor) return <Loader />;

	const { name, lastName, career } = props.subscriptor; 
	/*************
	* Methods...*
	************/
	const updateSubscriptor = (e) =>  {
		// creo un objeto ...
		e.preventDefault();

		setLoader(true);
		let newsubs = {
			name: nameRef.current.value,
			lastName: lastNameRef.current.value,
			career: careerRef.current.value,
			code: props.subscriptor.code
		}

		// update firestore..
		console.log('===>', newsubs);
		
		props.firestore.update({
			collection: 'subscriptors',
			doc: props.subscriptor.id
		}, newsubs).then(props.history.push('/subscriptors'));

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
						Edit Subscriptor
					</h2>

					<form onSubmit={updateSubscriptor} >
						<div className="form-group">
							<input 
								type="text"
								className="form-control mb-3"
								name="name"
								ref={nameRef}
								placeholder="Subscriptor's name"
								required
								defaultValue={name}
							/>

							<input 
								type="text"
								className="form-control mb-3"
								name="lastName"
								placeholder="Last name"
								ref={lastNameRef}
								required
								defaultValue={lastName}
							/>

							<input 
								type="text"
								className="form-control mb-3"
								name="career"
								ref={careerRef}
								placeholder="Career"
								required
								defaultValue={career}
							/>

							<input 
								type="submit"
								className="btn btn-success btn-block mb-1"
								value="Update"/>
							
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

export default compose(
	firestoreConnect((props)=>[
		{
			collection: 'subscriptors',
			storeAs: 'subscriptor',
			doc: props.match.params.id
		}
	]),
	connect(({ firestore: {ordered}}, props) => ({
		subscriptor: ordered.subscriptor && ordered.subscriptor[0]
	}))
)(EditSubscriptor) ;