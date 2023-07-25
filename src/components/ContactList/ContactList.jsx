import {
	StyledButton,
	StyledInput,
	StyledItem,
	StyledList,
} from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact, filterContact } from 'redux/slice';

export const ContactList = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const selectedFilter = useSelector(selectFilter);

	const filteredContacts = contacts.filter(el =>
		el.name.toLowerCase().includes(selectedFilter.toLowerCase())
	);
	
	return (
		<>
			<StyledInput
				type="text"
				placeholder="Enter name for search here"
				onChange={e => dispatch(filterContact(e.target.value))}
			/>
			<StyledList>
				{filteredContacts.map(el => {
					return (
						<StyledItem key={el.id}>
							{el.name}:<span>{el.number}</span>
							<StyledButton
								id={el.id}
								onClick={() => dispatch(deleteContact(el.id))}
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
