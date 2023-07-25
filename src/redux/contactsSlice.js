import { createSlice } from '@reduxjs/toolkit';
import {
	addContactThunk,
	deleteContactThunk,
	fetchContacts,
} from './operations';

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: {
		items: [],
		isLoading: false,
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(addContactThunk.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(deleteContactThunk.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					el => el.id === action.payload
				);
				state.items.splice(index, 1);
			})
			.addMatcher(
				action => action.type.endsWith('/pending'),
				state => {
					state.isLoading = true;
					state.error = null;
				}
			)
			.addMatcher(
				action => action.type.endsWith('/fulfilled'),
				state => {
					state.isLoading = false;
					state.error = null;
				}
			)
			.addMatcher(
				action => action.type.endsWith('/rejected'),
				(state, action) => {
					state.error = action.payload;
					state.isLoading = false;
				}
			);
	},
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
