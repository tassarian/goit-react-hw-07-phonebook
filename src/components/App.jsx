import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';

import { Container } from './Global.styled';
import { Section } from './Section/Section';

const App = () => {
	return (
		<Container>
			<Section title="Phonebook">
				<Form />
			</Section>
			<Section title="Contacts">
				<ContactList />
			</Section>
		</Container>
	);
};

// 21312412

export default App;
