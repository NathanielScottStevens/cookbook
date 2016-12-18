import React, { Component, PropTypes } from 'react';

import Steps from './Steps';
import StepsEditable from './StepsEditable';
import EditButton from './EditButton';

class StepsGroup extends Component {
  constructor(props) {
    super(props);

    const editingState = Array(props.steps.length);
    editingState.fill(false, 0, editingState.length);
    this.state = { isEditing: editingState };
  }

  onChange(index, value) {
    this.setStepEditingState(index, false);
    if (this.props.onChange) {
      const newValue = [...this.props.steps];
      newValue[index] = value;
      this.props.onChange(newValue);
    }
  }

  setStepEditingState(index, value) {
    const newState = [...this.state.isEditing];
    newState[index] = value;
    this.setState({ isEditing: newState });
  }

  render() {
    const steps = this.props.steps;
    const styles = {
      editButton: {
        top: 45,
        left: -40,
        minWidth: 33,
      },
    };

    const renderedSteps = steps.map((group, index) => {
      if (this.state.isEditing[index]) {
        return (
          <StepsEditable
            key={index}
            label={group.label}
            steps={group.list}
            onChange={(value) => this.onChange(index, value)}
            onClear={() => this.setStepEditingState(index, false)}
          />
        );
      }

      return (
        <div key={index}>
          <EditButton
            data-id={`steps-edit-${index}`}
            style={styles.editButton}
            onClick={() =>
              this.setStepEditingState(index, true)
            }
          />
          <Steps
            steps={group.list}
            label={group.label}
            key={`${group.label}-${index}`}
          />
        </div>
      );
    });

    return (
      <div>
        {renderedSteps}
      </div>
    );
  }
}

StepsGroup.propTypes = {
  steps: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default StepsGroup;
