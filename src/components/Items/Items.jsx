import PropTypes from 'prop-types';

export const Items = ({item}) => {
  return (
    <div>
      <p>{item.nombre}</p>
      <p>{item.nombre}</p>
      <p>{item.precio}</p>
    </div>
  );
};

Items.propTypes = {
  item: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
  }).isRequired,
};
