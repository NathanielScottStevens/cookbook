import React, { Component, PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Steps extends Component {
  renderSteps() {
    const { isEditing, steps } = this.props;

    if (isEditing) {
      return steps.map((item, index) =>
        <TextField
          key={index}
          value={item}
          id={`step-${index}`}
          fullWidth
          multiLine
        />
      );
    }

    return steps.map((item, index) =>
      <ListItem
        key={index}
      >
        <li>{item}</li>
      </ListItem>);
  }

  render() {
    const { label, onAddStep } = this.props;
    const styles = {
      h3: {
        fontFamily: this.context.muiTheme.fontFamily,
        textTransform: 'lowercase',
        marginLeft: this.context.muiTheme.tableRowColumn.spacing,
        fontWeight: 400,
        borderBottom: `${this.context.muiTheme.baseTheme.palette.borderColor} solid 1px`,
      },
      ol: {
        marginBottom: 60,
      },
    };

    return (
      <div>
        {label
          ? <h3 style={styles.h3}>{label}</h3>
          : <div />
        }
        <ol style={styles.ol}>
          {this.renderSteps()}
        </ol>
        <RaisedButton
          label="Add Step"
          data-id="add-step"
          secondary
          onClick={() => { onAddStep(); }}
        />
      </div>
    );
  }
}

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
  label: PropTypes.string,
  isEditing: PropTypes.bool,
  onAddStep: PropTypes.func,
};

Steps.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Steps;
