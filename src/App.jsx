import { useEffect, useState } from 'react';
import { Form, Logo, PackingList, Stats } from './components';

/**
 * 
 * @returns {[]}
 */
const initialStateItems = () => {
  return JSON.parse(localStorage.getItem('items')) ?? [];
  
}; 

function App() {

  const [items, setItems] = useState(initialStateItems());

  // add items to localStorage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  /**
   * 
   * @param {Object} item 
   */
  const handleAddItems = (item) => {
    setItems(items => [...items, item]);
  }

  /**
   * 
   * @param {String} id 
   */
  function handleDeleteItem( id ){
    setItems(items.filter( item => item.id !== id));
  }

  /**
   * 
   * @param {String} id 
   */
  const handleToggleItem = (id) => {
    setItems( items.map( item => item.id === id ? {...item, packed: !item.packed } : item))
  }

  
  function handleClearList(){
    const isConfirmed = confirm('¿Deseas limpiar tu lista de artículos de viaje?');

    if(isConfirmed){
      setItems([]);
    }
  }


  return (
    <div className='app'>
      <Logo />
      <Form 
        onAddItems={ handleAddItems } 
      />
      <PackingList 
        items={ items } 
        onDeleteItem={ handleDeleteItem } 
        onToggleItem= { handleToggleItem }
        onClearList={ handleClearList }
      />
      <Stats items={ items } />
    </div>
  );
}

export default App;
