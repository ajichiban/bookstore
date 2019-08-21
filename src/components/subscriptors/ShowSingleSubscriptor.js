import React from 'react';
import {Link} from 'react-router-dom';
//Redux ...
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Loader from '../layout/loader/Loader';

function ShowSingleSubscriptor (props) 
{	
	if(!props.subscriptor) return <Loader />

	const {name, career, code, lastName} = props.subscriptor;
	return(
		<div className="row">
			<div className="actions d-flex justify-content-between w-100">
				<Link  
					to={'/subscriptors'}
					className="btn btn-secondary">
					<i className="fas fa-arrow-circle-left"></i>{' '}
					Go Back to List
				</Link>

				<Link  
					to={`/subscriptors/edit/${props.match.params.id}`}
					className="btn btn-warning">
					<i className="fas fa-pencil-alt"></i>{' '}
					Edit Subscriptor
				</Link>
			</div>
			<hr className="w-100" />

			<div className="col-12 mb-3">
				<h3>
					{name}  {lastName}
				</h3>

				<p>
					<span className="font-weight-bold">
						Career:
					</span>{' '}
					{career}
				</p>

				<p>
					<span className="font-weight-bold">
						Code:
					</span>{' '}
					{code}
				</p>
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
)(ShowSingleSubscriptor) ;