import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://647f4289c246f166da9071a1.mockapi.io';

export const fetchContacts = createAsyncThunk(
	'contacts/fetch',
	async (_, thunkAPI) => {
		try {
			const res = await axios.get('/contacts');
			return res.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

export const addContactThunk = createAsyncThunk(
	'contacts/add',
	async (data, thunkAPI) => {
		try {
			const res = await axios.post('/contacts', data);
			return res.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

export const deleteContactThunk = createAsyncThunk(
	'contacts/delete',
	async (id, thunkApi) => {
		try {
			await axios.delete(`/contacts/${id}`);
			return id;
		} catch (err) {
			return thunkApi.rejectWithValue(err.message);
		}
	}
);
