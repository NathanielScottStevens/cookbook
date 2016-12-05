import React, { Component, PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
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
    return this.state.steps.map((item, index) =>
      <ListItem key={index}>
        <TextField
          id={`step-text-${index}`}
          value={item}
          onChange={(e, value) => this.onChangeStep(value, index)}
          fullWidth
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
