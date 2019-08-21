import React,{Component} from 'react';
import {Link} from 'react-router-dom';

//Redux ...
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

//Components ....
import Subscriptor from './components/Subscriptor';
import Loader from '../layout/loader/Loader.js';

class SubscriptorsList extends Component {

	removeSubscriptor = (id)=>{
		
		this.props.firestore.delete({
			collection: 'subscriptors',
			doc : id
		}).then(()=> console.log('deleted ', id))
	}	
  render () {
  	if(!this.props.subscriptors) return  <Loader />;
  	
    return (

    	<div className="row">
			<div className="col-md-12 mb-4">
				<Link
					to={'/subscriptors/new'}
					className="btn btn-primary">
					<i className="fa fa-plus"></i>{' '}
					Add new Subscriptor
				</Link>
			</div>
			<div className="col-md-8">
				<h2>
					<i className="fa fa-users"></i> Subscriptors
				</h2>
			</div>
			<table className="table table-striped mt-4">
				<thead className="text-light bg-primary" >
					<tr>
						<th>Name</th>
						<th>Career</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						this.props.subscriptors.map(subscriptor => (
							<Subscriptor  
								key={subscriptor.id}
								info={subscriptor}
								removeSubscriptor={this.removeSubscriptor} />
						))
					}
				</tbody>
			</table>
    	</div>
    )
  }
}

export default compose(
	firestoreConnect(() => ['subscriptors']),
	connect((state, props) => ({
	  subscriptors: state.firestore.ordered.subscriptors
	}))
)(SubscriptorsList);

