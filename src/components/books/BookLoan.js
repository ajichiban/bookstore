import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';

//Redux ...
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

//Components...
import Loader from '../layout/loader/Loader.js';
import SubscriptorRecord from '../subscriptors/components/SubscriptorRecord';

// Redux Actions...
import { searchUser } from '../../actions/searchUserActions';

function BookLoan (props) 
{	
	const [noResultSt, setNoResult] = useState(true),
		/*  [studentSt, setStuden] = useState(''),*/
		  [searchingSt, setSearching] = useState(false),
		  [loaderForSearchSt, setLoaderForSearch ] = useState(false);

	const searchRef = useRef();

	if (!props.book) return <Loader />

	/*
	*  METHODS...
	*/
	const doSearch = e => {
		e.preventDefault()

		setLoaderForSearch(true);
		setSearching(true);


		props.firestore.collection('subscriptors')
			.where("code", "==", searchRef.current.value)
			.get()
			.then(res =>{
				setLoaderForSearch(false);
				if(res.empty){
					setNoResult(true)
					setSearching(false)

					props.searchUser({})
				}else{
					props.searchUser(res.docs[0].data())
					setSearching(false)
					setNoResult(false);

					
					/*setStuden(res.docs[0].data());*/
				}
			})
	}

	const applyForLoan = ()=>{

		const {user} = props;

		// add date for apply.
		user.date_application = new Date().toLocaleDateString();

		/*console.log('user =>, ' ,user);*/

		// do copy from original book
		const bookUpdated = {...props.book};

		// add new loaned.
		bookUpdated.loaned = [ ...bookUpdated.loaned, user];

		props.firestore.update({
			collection: 'books',
			doc: props.book.id
		}, bookUpdated).then(props.history.push('/'));


	}

	const {title} = props.book;
	

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

			<div className="col-12 text-center">
				<div className="card p-5">
					<h2>
						<i className="fas fa-book-plus"></i>{' '}
						Book loan : {title}
					</h2>

					<div className="row justify-content-center">
						<div className="col-md-8">
							<form onSubmit={doSearch} >
								<legend>
									Search book for Code
								</legend>
								<div className="form-group">
									<input 
										type="text" 
										className="form-control"
										ref={searchRef}
										/>
								</div>
								<input 
									type="submit" 
									className="btn btn-success btn block"
									value="Search Student"
								/>
							</form>
						</div>
					</div>
					<hr className="w-100 my-3"/>
					{loaderForSearchSt && <Loader />}
					{
						searchingSt ? ''
						:
							noResultSt ?
							<h4>No hay Resultado</h4>
							:
								<React.Fragment>
									<SubscriptorRecord 
										info={props.user}
										title={true} />
									<button 
										className="btn btn-warning btn-block" 
										onClick={applyForLoan} >
										Apply for  Loan
									</button>	
								</React.Fragment>
							
					}
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
	connect(({ firestore: {ordered}, user}, props) => ({
		book: ordered.book && ordered.book[0],
		user
	}), {searchUser})
)(BookLoan);