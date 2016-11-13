import React, { PropTypes } from 'react';

const FramedImage = ({ img, imgStyle }) => {
  const styles = {
    border: {
      backgroundImage: 'url(/../../images/shadow-bottom.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      backgroundPositionY: '100%',
      padding: 10,
      height: '100%',
    },
  };

  return (
    <div style={styles.border}>
      <img role="presentation" src={img} style={imgStyle} />
    </div>
  );
};

FramedImage.propTypes = {
  img: PropTypes.string.isRequired,
  imgStyle: PropTypes.object,
};

export default FramedImage;
