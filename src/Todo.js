import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

function Todo(props){
	if(props.todos){
		console.log('state =>' , props.todos);
	}else{
		return false;
	}
	return(
		<div className="df" >
			{props.todos.map(ele =>(
			<h3>{ele.name}</h3>
		))}
		</div>
	)
}
export default compose(
 firestoreConnect(() => ['subscriptors']), // or { collection: 'todos' }
 connect((state, props) => ({
   todos: state.firestore.ordered.subscriptors
 }))
)(Todo)