import React, { Component, PropTypes } from 'react';
import { ListItem } from 'material-ui/List';

class Steps extends Component {
  constructor(props) {
    super(props);

    this.state = { isEditing: false };
  }

  renderSteps() {
    return this.props.steps.map((item, index) =>
      <ListItem
        key={index}
      >
        <li>{item}</li>
      </ListItem>);
  }

  render() {
    const label = this.props.label;
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
        {label ?
          <h3 style={styles.h3}>{label}</h3>
          : <div />
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
};

Steps.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Steps;
