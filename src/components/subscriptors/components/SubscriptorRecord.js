import React from 'react';

function SubscriptorRecord (props) 
{	
	
	const {name, career, lastName, code} = props.info

	let stylesForTypes = `card my-3 ${props.repayment && 'mx-2'}`;
	return(
		<div className={stylesForTypes}>
			{ props.title &&
				<h3 className="card-header bg-primary text-white" >
					Applicant's data
				</h3>
			}

			<div className="card-body d-flex justify-content-start flex-column align-items-start">
				<p className="font-weight-bold">
					Name: {''}
					<span className="font-weight-normal">
						{name} {lastName}
					</span>
				</p>

				<p className="font-weight-bold">
					Code: {''}
					<span className="font-weight-normal">
						{code}
					</span>
				</p>

				<p className="font-weight-bold">
					Career: {''}
					<span className="font-weight-normal">
						{career}
					</span>
				</p>
			</div>
			{ props.repayment &&
				<button
					className="btn btn-danger"
					onClick={()=> props.bookReturn(code)}>
					Return Book ?
				</button>

			}
		</div>
		)
}

export default SubscriptorRecord ;