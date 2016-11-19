import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

const EditButton = ({ onClick }, context) => {
  const color = context.muiTheme.palette.primary1Color;

  return (
    <FlatButton
      data-id="edit-button"
      onClick={() => { onClick(); }}
      icon={<ModeEdit color={color} />}
    />
  );
};

EditButton.propTypes = {
  onClick: PropTypes.func,
};

EditButton.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default EditButton;
