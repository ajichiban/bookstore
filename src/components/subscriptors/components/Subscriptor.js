import React from 'react';
import {Link} from 'react-router-dom';

function  Subscriptor(props) 
{	
	const {name, career, lastName, id} = props.info
	return(
		<tr>
			<td>{name} {lastName} </td>
			<td>{career}</td>
			<td>
				<Link
					to={`/subscriptors/show/${id}`}
					className="btn btn-success btn-block">
					<i className="fas fa-angle-double-right"></i>
					{' '} more info..
					
				</Link>
				<button
					className="btn btn-danger btn-block"
					onClick={() => props.removeSubscriptor(id)}>
					<i className="fas fa-trash-alt"></i>{' '}
					Delete
				</button>
			</td>
		</tr>
		)
}

export default Subscriptor ;