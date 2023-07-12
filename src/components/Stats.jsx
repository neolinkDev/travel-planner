
import PropTypes from 'prop-types';


export const Stats = ({ items }) => {

  if(items.length === 0)
    return (
      <p className="stats">
        <em>
          Empieza a agregar artículos para tu viaje.
        </em>
      </p>
    )

  const itemsSize = items.length;
  
  const numPacked = items.filter( item => item.packed).length;
  
  let percentagePacked = 0;

  if (itemsSize > 0) {
    percentagePacked = Math.round((numPacked / itemsSize) * 100);
  }

  return (
    <footer className="stats">
      <em>
        {
          percentagePacked === 100 
            ? '¡Todos empacado, buen viaje! ✈️'
            : `🧳 Tienes ${ itemsSize } items en tu lista, ${ numPacked } empacado(s) (${ percentagePacked })%`
        } 
      </em>
    </footer>
  );
};

Stats.propTypes = {
  items: PropTypes.array.isRequired
}