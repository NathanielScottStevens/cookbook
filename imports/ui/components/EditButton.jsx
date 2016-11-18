import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';

const EditButton = ({ isEditing, onEdit, onClear, onSave }, context) => {
  const color = context.muiTheme.palette.primary1Color;

  if (isEditing) {
    return (
      <div>
        <FlatButton
          data-id="done-button"
          icon={<Done color={color} />}
          onClick={() => onSave()}
        />
        <FlatButton
          data-id="clear-button"
          icon={<Clear color={color} />}
          onClick={() => onClear()}
        />
      </div>
    );
  }

  return (
    <FlatButton
      data-id="edit-button"
      onClick={() => { onEdit(); }}
      icon={<ModeEdit color={color} />}
    />
  );
};

EditButton.propTypes = {
  isEditing: PropTypes.bool,
  onEdit: PropTypes.func,
  onClear: PropTypes.func,
  onSave: PropTypes.func,
};

EditButton.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default EditButton;
