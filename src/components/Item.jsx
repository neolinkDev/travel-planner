import PropTypes from 'prop-types';


export const Item = ({ id, description, quantity, packed, onDeleteItem, onToggleItem }) => {
 
  return (
    <li>
      <input 
        type="checkbox" 
        checked={ packed } 
        onChange={ () => onToggleItem(id) }
      />
      <span 
        style={ packed ? {textDecoration: 'line-through'} : {}}
      >
        { quantity } { description }
      </span>
      <button
        onClick={ () => onDeleteItem( id ) }
      >
        &times;
      </button>
    </li>
  )
}

Item.propTypes = {
  id: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  packed: PropTypes.bool.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired
}