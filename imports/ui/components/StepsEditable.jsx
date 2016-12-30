import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Delete from 'material-ui/svg-icons/action/delete';

import DoneClearButton from './DoneClearButton';

class StepsEditable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.label,
      steps: [...props.steps],
    };
  }

  onChangeStep(value, index) {
    const steps = [...this.state.steps];
    steps[index] = value;
    this.setState({ steps });
  }

  onAddStep() {
    const steps = [...this.state.steps];
    steps.push('');
    this.setState({ steps });
  }

  onDeleteStep(index) {
    const steps = [...this.state.steps];
    steps.splice(index, 1);
    this.setState({ steps });
  }

  onChangeLabel(label) {
    this.setState({ label });
  }

  onDone() {
    const { label, steps } = this.state;
    const onChange = this.props.onChange;
    if (onChange) {
      onChange({ label, list: steps });
    }
  }

  onClear() {
    if (this.props.onClear) {
      this.props.onClear();
    }
  }

  renderSteps() {
    const styles = {
      textField: {
        width: '90%',
      },
      deleteButton: {
        minWidth: '5%',
      },
    };

    return this.state.steps.map((item, index) =>
      <ListItem key={index}>
        <TextField
          id={`step-text-${index}`}
          data-id="step-text"
          value={item}
          onChange={(e, value) => this.onChangeStep(value, index)}
          multiLine
          style={styles.textField}
        />
        <FlatButton
          data-id="delete-button"
          icon={<Delete />}
          onClick={() => { this.onDeleteStep(index); }}
          style={styles.deleteButton}
        />
      </ListItem>);
  }

  render() {
    const label = this.state.label;
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
        <DoneClearButton
          onDone={() => { this.onDone(); }}
          onClear={() => { this.onClear(); }}
        />
        {label &&
          <TextField
            id="label"
            value={label}
            onChange={(e, value) => this.onChangeLabel(value)}
            fullWidth
          />
        }
        <ol style={styles.ol}>
          {this.renderSteps()}
        </ol>
        <RaisedButton
          label="+ Step"
          secondary
          data-id="add-step"
          onClick={() => { this.onAddStep(); }}
        />
      </div>
    );
  }
}

StepsEditable.propTypes = {
  steps: PropTypes.array.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
};

StepsEditable.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default StepsEditable;
