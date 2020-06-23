import React from 'react';
import PropTypes from 'prop-types';

const Button = (({ display, handleClick, children, type }) => {
    return (
      <button
        type={type}
        onClick={ handleClick }>
        { children }
      </button>
    );

});

Button.propTypes = {
  handleClick: PropTypes.func,
  type: PropTypes.string
};

Button.defaultProps = {
  type: 'button'
};

export default Button;