import {
	StyledButton,
	StyledInput,
	StyledItem,
	StyledList,
} from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import { useEffect } from 'react';
import { deleteContactThunk, fetchContacts } from 'redux/operations';

export const ContactList = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const selectedFilter = useSelector(selectFilter);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	const filteredContacts = contacts.filter(el =>
		el.name.toLowerCase().includes(selectedFilter.toLowerCase())
	);

	return (
		<>
			<StyledInput
				type="text"
				placeholder="Enter name for search here"
				onChange={e => dispatch(setFilter(e.target.value))}
			/>
			<StyledList>
				{filteredContacts.length > 0 &&
					filteredContacts.map(el => {
						return (
							<StyledItem key={el.id}>
								{el.name}:<span>{el.number}</span>
								<StyledButton
									id={el.id}
									onClick={() =>
										dispatch(deleteContactThunk(el.id))
									}
								>
									Delete
								</StyledButton>
							</StyledItem>
						);
					})}
			</StyledList>
		</>
	);
};
