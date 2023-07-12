import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Item } from './Item';

export const PackingList = ({ items, onDeleteItem, onToggleItem, onClearList }) => {

  // Initialize sortBy with the value saved in localStorage, or 'input' if there's nothing in localStorage
  // Inicializa sortBy con el valor guardado en localStorage, o 'input' si no hay nada en localStorage
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'input');

  // Each time sortBy changes, save the new value in localStorage
  // Cada vez que sortBy cambia, guarda el nuevo valor en localStorage
  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  // Define sorting functions
  // Define las funciones de ordenamiento
  const sortFns = {
    'input': (items) =>  items,
    'description': (a, b) => a.description.localeCompare(b.description),
    'packed': (a, b) => Number(a.packed) - Number(b.packed)
  };

  // Sort items according to the option selected in sortBy
  // Ordena los items de acuerdo a la opción seleccionada en sortBy
  let sortedItems = [...items].sort(sortFns[ sortBy ]);

  // Check if the list is empty
  // Comprueba si la lista está vacía
  const isListEmpty = items.length === 0;

  // If the list is empty, reset sortBy to 'input'
  // Si la lista está vacía, restablece sortBy a 'input'
  useEffect(() => {
    // si la lista está vacía, restablece el ordenamiento
    if (isListEmpty) {
      setSortBy('input');
    }
  }, [isListEmpty]);

  return (
    <div className="list">

      <ul>
        {sortedItems.map((item) => {
          const { id, description, quantity, packed } = item;
        
          return (
            <Item 
              key={ id }
              id={ id }
              description={ description } 
              quantity={ quantity }
              packed={ packed }
              onDeleteItem={ onDeleteItem }
              onToggleItem={ onToggleItem }
            />
          )
        })}
      </ul>

      <div className="actions">
        <select 
          value={ sortBy }
          onChange={({target}) => setSortBy( target.value ) }
          disabled={ isListEmpty }
        >
          <option value="input">ordenar por entrada</option>
          <option value="description">ordenar por orden alfabético</option>
          <option value="packed">ordenar por el estado del artículo</option>
        </select>
        <button
          style={isListEmpty ? { backgroundColor: 'lightgray' } : {} }
          onClick={ onClearList }
          disabled={ isListEmpty }
        >
          limpiar lista
        </button>
      </div>

    </div>
  );
};

PackingList.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired, 
  onClearList: PropTypes.func.isRequired
}