import React from 'react';
import {Link} from 'react-router-dom';

function Book (props) 
{	
	const {title, isbm, publisher, id, loaned, existence} = props.info
	return(
		<tr>
			<td>{title}</td>
			<td>{publisher}</td>
			<td>{isbm}</td>
			<td>{existence}</td>
			<td>{existence - loaned.length}</td>
			<td>
				<Link
					to={`/books/show/${id}`}
					className="btn btn-success btn-block">
					<i className="fas fa-angle-double-right"></i>
					{' '} more info..
					
				</Link>
				{<button
					className="btn btn-danger btn-block"
					onClick={() => props.removeBook(id)}>
					<i className="fas fa-trash-alt"></i>{' '}
					Delete
				</button>}
			</td>
		</tr>
		)
}

export default Book ;