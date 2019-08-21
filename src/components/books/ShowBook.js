import React from 'react';
import {Link} from 'react-router-dom';
//Redux ...
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

//Components...
import SubscriptorRecord from '../subscriptors/components/SubscriptorRecord';
import Loader from '../layout/loader/Loader';

function ShowBook (props) 
{	

	if(!props.book) return <Loader />

	/*
	* METHODS...
	*/

	const bookReturn = code => {
		console.log('repayment from =>', code);
		let listOfBookUpdated = props.book.loaned.filter(peaple => peaple.code !== code);

		let bookUpdated = {...props.book};
		bookUpdated.loaned = listOfBookUpdated;
		
		props.firestore.update({
			collection:'books',
			doc: props.book.id
		},bookUpdated)
	}

	const {title, isbm, publisher, existence, loaned, id} = props.book;
	return(
		<div className="row">
			<div className="actions d-flex justify-content-between w-100">
				<Link  
					to={'/'}
					className="btn btn-secondary">
					<i className="fas fa-arrow-circle-left"></i>{' '}
					Go Back to List
				</Link>

				<Link  
					to={`/books/edit/${props.match.params.id}`}
					className="btn btn-warning">
					<i className="fas fa-pencil-alt"></i>{' '}
					Edit Book
				</Link>
			</div>
			<hr className="w-100" />

			<div className="col-12 mb-3">
				<h3>
					{title}
				</h3>

				<p>
					<span className="font-weight-bold">
						Publisher:
					</span>{' '}
					{publisher}
				</p>

				<p>
					<span className="font-weight-bold">
						Isbm:
					</span>{' '}
					{isbm}
				</p>
				<p>
					<span className="font-weight-bold">
						Existence:
					</span>{' '}
					{existence}
				</p>
				<p>
					<span className="font-weight-bold">
						Available:
					</span>{' '}
					{existence - loaned.length}
				</p>

				{ existence - loaned.length > 0 &&
					<Link 
						to={`/books/loan/${id}`} 
						className="btn btn-success my-3" >
						apply for a book loan
					</Link>
				}
			</div>
			<hr/>

			{/*if anyone has borrowed this book*/}
			<div className="col-12-my-3 ">
				{ loaned.length === 0 ?
					<h5>Nobody has apply for this book !</h5>
				:
					<div >
						<h4>Peaple that has it book loaned</h4>
						<div className="border p-3 d-flex justify-content-center">
							{
								loaned.map(peaple =>(
										<SubscriptorRecord 
										key={peaple.code}
									 	repayment={true}
									 	bookReturn={bookReturn}
									 	info={peaple}	/>
								))
							}
						</div>
					</div>

				}
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
)(ShowBook) ;