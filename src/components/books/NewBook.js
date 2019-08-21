import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';

import { firestoreConnect } from 'react-redux-firebase';

import Loader from '../layout/loader/Loader';

function NewBook (props) 
{	
	const [loaderSt, setLoader] = useState(false);
	const titleRef = useRef(),
		  publisherRef = useRef(),
		  existenceRef = useRef();

	/*************
	* Methods...*
	************/
	const addBook = e =>  {
		// creo un objeto ...
		e.preventDefault();

		setLoader(true);
		let newB = {
			title: titleRef.current.value,
			publisher: publisherRef.current.value,
			existence: existenceRef.current.value,
			loaned: [],
			isbm: `isbm-${Date.now()}`
		}

		// agregar a firestore..
		props.firestore.add({
			collection: 'books'
		}, newB)
			.then(()=> props.history.push('/'));

	}


	return(
		<div className="row justify-content-center">
			<div className="col-12 mb-3 text-center">
				<Link  
					to={'/'}
					className="btn btn-secondary">
					<i className="fas fa-arrow-circle-left"></i>{' '}
					Go Back to List
				</Link>
			</div>

			<div className="col-8 text-center">
				<div className="card p-5">
					<h2>
						<i className="fas fa-book"></i>{' '}
						New Book
					</h2>

					<form onSubmit={addBook} >
						<div className="form-group">
							<input 
								type="text"
								className="form-control mb-3"
								ref={titleRef}
								placeholder="Book's title"
								required
							/>

							<input 
								type="text"
								className="form-control mb-3"
								placeholder="Publisher"
								ref={publisherRef}
								required
							/>

							<input 
								type="number"
								className="form-control mb-3"
								ref={existenceRef}
								placeholder="existence"
								required
							/>

							<input 
								type="submit"
								className="btn btn-success btn-block mb-1"
								value="Add Book"/>
							
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

export default firestoreConnect()( NewBook) ;