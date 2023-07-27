import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'; 

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
