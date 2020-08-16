import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './LogEntryForm.css';
import { createEntryLogs } from './API';

function LogEntryForm({ location, onClose }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { register, handleSubmit } = useForm();
	const onSubmit = async data => {
		try {
			setLoading(true);
			data.latitude = location.latitude;
			data.longitude = location.longitude;
			await createEntryLogs(data);
			onClose();
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};
	return (
		<div className="LogEntryForm">
			{error && <h3 className="LogEntryForm__error">{error}</h3>}
			<h3>Add your log entry here</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="LogEntryForm__form">
				<label>
					Title: <input autoComplete="off" className="LogEntryForm__input" name="title" type="text" ref={register} required />
				</label>
				<label>
					Comments: <textarea className="LogEntryForm__input" name="comments" rows={3} ref={register}></textarea>
				</label>
				<label>
					Description: <textarea className="LogEntryForm__input" name="description" rows={3} ref={register}></textarea>
				</label>
				<label>
					Image <input autoComplete="off" className="LogEntryForm__input" name="image" type="text" ref={register} />
				</label>
				<label>
					Visit Date: <input className="LogEntryForm__input" name="visitDate" type="date" required ref={register} />
				</label>
				<div>
					<button className="LogEntryForm__button" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Create Log Entry'}</button>
				</div>
			</form>
		</div>
	);
};

export default LogEntryForm;
