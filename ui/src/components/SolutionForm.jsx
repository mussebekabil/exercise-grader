import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getUserId } from '../utils/localStorageUtil.js';

import 'react-toastify/dist/ReactToastify.css';
import './SolutionForm.css';

const SolutionForm = ({ exerciseId }) => {
	const [code, setCode] = useState('');
	const [error, setError] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('');
		if(!code) {
			setError('Please write some code before sending to the grader.')
			return;
		}

		try {
			await fetch("/api/grades", {
				method: "POST",
				headers: { "Content-type": "application/json; charset=UTF-8" },
				body: JSON.stringify({ 
					code,
					exerciseId,  
					userId: getUserId()
				})
			});
			setIsDisabled(true)
			
			toast.success('Code submitted successfully. You will be notified once the grader is ready.')
			setCode('')
		} catch (error) {
			setError('Something went wrong.')
			console.log(error)
		}
	}

	if(error) {
		toast.error(error)
		setError('')
	}

	return (
		<div className="form-container">
			<form>
				<textarea disabled={isDisabled} className="code-pannel" value={code} onChange={(e) => {setCode(e.target.value)}} name="code"></textarea>
				<button className="button-primary" onClick={handleSubmit} disabled={isDisabled} > Send code </button>
				<button className="button-secondary" 
					onClick={(e) => {
						e.preventDefault()
						window.location.assign('/');
						}} 
					> Close </button>
			</form>
			<ToastContainer />
		</div>
	);
}
export default SolutionForm;
