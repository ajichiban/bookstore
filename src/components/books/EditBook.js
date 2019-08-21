import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';

//Redux ...
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loader from '../layout/loader/Loader.js';

function EditBook (props) 
{	

	/***********
	* State...*
	**********/
	const [loaderSt, setLoader] = useState(false);
	const titleRef = useRef(),
		  publisherRef = useRef(),
		  existenceRef = useRef();

	if(!props.book) return <Loader />;

	const { title, publisher, existence } = props.book; 
	/*************
	* Methods...*
	************/
	const updateBook = (e) =>  {
		// creo un objeto ...
		e.preventDefault();

		setLoader(true);
		let bookForUpdate = {
			title: titleRef.current.value,
			publisher: publisherRef.current.value,
			existence: existenceRef.current.value,
			/*loaned: props.book.loaned,*/
			/*isbm: `isbm-${Date.now()}`*/
		}

		// update firestore..
		console.log('===>', bookForUpdate);
		
		props.firestore.update({
			collection: 'books',
			doc: props.book.id
		}, bookForUpdate).then(props.history.push('/'));

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
						<i className="fas fa-book-plus"></i>{' '}
						Edit Book
					</h2>

					<form onSubmit={updateBook} >
						<div className="form-group">
							<input 
								type="text"
								className="form-control mb-3"
								ref={titleRef}
								placeholder="Book's title"
								required
								defaultValue={title}
							/>

							<input 
								type="text"
								className="form-control mb-3"
								placeholder="Publisher"
								ref={publisherRef}
								required
								defaultValue={publisher}
							/>

							<input 
								type="number"
								className="form-control mb-3"
								ref={existenceRef}
								placeholder="Existence"
								required
								defaultValue={existence}
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
			collection: 'books',
			storeAs: 'book',
			doc: props.match.params.id
		}
	]),
	connect(({ firestore: {ordered}}, props) => ({
		book: ordered.book && ordered.book[0]
	}))
)(EditBook) ;