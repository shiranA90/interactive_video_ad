import React from 'react';
import PropTypes from 'prop-types';

const IMG_STYLES = { display: 'none'};

const TrackingPixel = ({ url, alt }) => {

  return (
    <img
      src={url}
      width={ 1 }
      height={ 1 }
      style={ IMG_STYLES }
      alt={ alt }
    />
  );
}

TrackingPixel.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string
};

TrackingPixel.defaultProps = {
  url: '',
  alt: 'tracking_pixel'
};

export default TrackingPixel;