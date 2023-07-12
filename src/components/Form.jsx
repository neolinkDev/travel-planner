import PropTypes from 'prop-types';
import { useForm } from '../hooks/useForm';

export const Form = ({ onAddItems }) => {

  // custom hook
  const {
    description,
    quantity,
    isEmpty,
    handleSubmit,
    handleInputChange,
    onSelectChange
  } = useForm( onAddItems );

  return (
    <form 
      className="add-form" 
      onSubmit={ handleSubmit }
    >
      {
        isEmpty &&
        (
          <div
            style={{
              backgroundColor: 'tomato',
              fontSize: '12px',
              color: '#fff',
              textAlign: 'center',
              padding: '10px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              borderRadius: '5px',
            }}
          >
            <p>El campo es obligatorio</p>
          </div>
        )
      }
      <h3>¿Qué necesitas para tu viaje?</h3>

      <select 
        value={ quantity } 
        onChange={ onSelectChange }
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((n) => (
          <option value={n} key={n}>
            {n}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Articulo..."
        value={ description }
        onChange={ handleInputChange }
      />

      <button>Agregar</button>
    </form>
  );
};


Form.propTypes = {
  onAddItems: PropTypes.func.isRequired,
}