import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';

const DoneClearButton = ({ onClear, onDone }, context) => {
  const color = context.muiTheme.palette.primary1Color;

  return (
    <div>
      <FlatButton
        data-id="done-button"
        icon={<Done color={color} />}
        onClick={() => onDone()}
      />
      <FlatButton
        data-id="clear-button"
        icon={<Clear color={color} />}
        onClick={() => onClear()}
      />
    </div>
  );
};

DoneClearButton.propTypes = {
  onClear: PropTypes.func,
  onDone: PropTypes.func,
};

DoneClearButton.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default DoneClearButton;
