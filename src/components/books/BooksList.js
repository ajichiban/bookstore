import React from 'react';
import {Link} from 'react-router-dom';

//Redux ...
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

//Components ....
import Book from './Book';
import Loader from '../layout/loader/Loader.js';
function BooksList (props) 
{	
	if(!props.books) return <Loader />

	const removeBook = (id)=>{
		
		props.firestore.delete({
			collection: 'books',
			doc : id
		}).then(()=> console.log('deleted ', id))
	}
	return(
		<div className="row">
			<div className="col-md-12 mb-4">
				<Link
					to={'/books/new'}
					className="btn btn-primary">
					<i className="fa fa-plus"></i>{' '}
					Add new Books
				</Link>
			</div>
			<div className="col-md-8">
				<h2>
					<i className="fas fa-book"></i> Books
				</h2>
			</div>
			<table className="table table-striped mt-4">
				<thead className="text-light bg-primary" >
					<tr>
						<th>title</th>
						<th>puplisher</th>
						<th>ISBN</th>
						<th>Existence</th>
						<th>Available</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						props.books.map(book => (
							<Book  
								key={book.id}
								info={book}
								removeBook={removeBook}
								 />
						))
					}
				</tbody>
			</table>
    	</div>
		)
}

export default compose(
	firestoreConnect(() => ['books']),
	connect((state, props) => ({
	  books: state.firestore.ordered.books
	}))
)(BooksList);