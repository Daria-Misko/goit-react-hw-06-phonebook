import PropTypes from 'prop-types';
import { DelButton, ListItem } from './ContactsListItem.styles';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

export const ContactsListItem = ({ contact: { name, number, id } }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      {name}: {number}
      <DelButton onClick={() => dispatch(deleteContact(id))}>Delete</DelButton>
    </ListItem>
  );
};

ContactsListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
