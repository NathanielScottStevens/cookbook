import React, { Component, PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';

import EditButton from './EditButton';

class Steps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      label: props.label,
      steps: [...props.steps],
    };
  }

  onChangeStep(value, index) {
    const steps = [...this.state.steps];
    steps[index] = value;
    this.setState({ steps });
  }

  onSave() {
    const { label, steps } = this.state;
    this.props.onChange(label, steps);
    this.setState({ isEditing: false });
  }

  onClear() {
    const { label, steps } = this.props;
    this.setState({
      isEditing: false,
      label,
      steps: [...steps],
    });
  }

  renderSteps() {
    return this.state.steps.map((item, index) =>
      <ListItem
        key={index}
      >
        {this.state.isEditing
          ? <TextField
              id={`step-text-${index}`}
              value={item}
              onChange={(e, value) => this.onChangeStep(value, index)}
              fullWidth
            />
          : <li>{item}</li>
        }
      </ListItem>);
  }

  render() {
    const { label, isEditingEnabled } = this.props;
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
        {label &&
          <h3 style={styles.h3}>{label}</h3>
        }
        {isEditingEnabled &&
          <EditButton
            isEditing={this.state.isEditing}
            onEdit={() => this.setState({ isEditing: true })}
            onClear={() => this.onClear()}
            onSave={() => this.onSave()}
          />
        }
        <ol style={styles.ol}>
          {this.renderSteps()}
        </ol>
      </div>
    );
  }
}

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
  label: PropTypes.string,
  isEditingEnabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Steps.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Steps;
