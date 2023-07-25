import { nanoid } from 'nanoid';
import { Button, Input, InputTitle, StyledForm } from './Form.styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/slice';

export const Form = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);

	const [name, setName] = useState('');
	const [number, setNumber] = useState('');

	const onNumberChange = e => {
		setNumber(e.target.value);
	};

	const onNameChange = e => {
		setName(e.target.value);
	};

	const onFormSubmit = e => {
		e.preventDefault();
		const existingContact = contacts.find(
			contact =>
				contact.name.toLowerCase() === name.toLowerCase() ||
				contact.number === number.toLowerCase()
		);
		if (existingContact) {
			alert(`${name} or ${number} is already in contacts`);
			setName('');
			setNumber('');
		} else {
			dispatch(
				addContact({
					id: nanoid(),
					name,
					number,
				})
			);
			setName('');
			setNumber('');
		}
	};

	return (
		<StyledForm onSubmit={onFormSubmit}>
			<InputTitle>Name</InputTitle>
			<Input
				type="text"
				name="name"
				pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
				title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
				required
				onChange={onNameChange}
				value={name}
			/>
			<InputTitle>Number</InputTitle>
			<Input
				type="tel"
				name="number"
				pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
				title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
				required
				onChange={onNumberChange}
				value={number}
			/>
			<Button type="submit">Add contact</Button>
		</StyledForm>
	);
};
