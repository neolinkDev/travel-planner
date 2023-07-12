import { useState } from 'react';

/**
 * 
 * @param {Fn} onAddItems 
 * @returns {{}}
 */
export function useForm( onAddItems ) {

  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [isEmpty, setIsEmpty] = useState(false);

  /**
   * Generates a unique id
   * 
   * @returns {String}
   */
  const generateID = () =>
    Math.random().toString(36).substring(2) + Date.now().toString(36);

  /**
   *
   * @param {event} e
   */
  function handleSubmit(e) {
    e.preventDefault();

    // form validation
    if (description.trim() === '') {
      setIsEmpty(true);
      return;
    }

    // remove spaces
    let formattedDescription = description.trim();

    const newItem = {
      description: formattedDescription,
      quantity,
      packed: false,
      id: generateID(),
    };

    onAddItems(newItem);

    setIsEmpty(false);
    setDescription('');
    setQuantity(1);
  }

  /**
   *
   * @param {event} target
   */
  const handleInputChange = ({ target }) => {
    setDescription(target.value);
  };

  /**
   *
   * @param {event} e
   */
  function onSelectChange(e) {
    setQuantity(Number(e.target.value));
  }

  return {
    description,
    quantity,
    isEmpty,
    handleSubmit,
    handleInputChange,
    onSelectChange
  }
}
