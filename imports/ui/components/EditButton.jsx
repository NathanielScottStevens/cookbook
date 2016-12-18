import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

const EditButton = ({ onClick, style }, context) => {
  const color = context.muiTheme.palette.primary1Color;

  return (
    <FlatButton
      data-id="edit-button"
      onClick={() => { onClick(); }}
      icon={<ModeEdit color={color} />}
      style={style}
    />
  );
};

EditButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};

EditButton.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default EditButton;
