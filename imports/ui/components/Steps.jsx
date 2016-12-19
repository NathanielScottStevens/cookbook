import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';

const Steps = ({ steps, label }, context) => {
  const renderSteps = () => {
    return steps.map((item, index) =>
      <ListItem
        key={index}
      >
        <li>{item}</li>
      </ListItem>
    );
  };

  const styles = {
    h3: {
      fontFamily: context.muiTheme.fontFamily,
      textTransform: 'lowercase',
      marginLeft: context.muiTheme.tableRowColumn.spacing,
      fontWeight: 400,
      borderBottom: `${context.muiTheme.baseTheme.palette.borderColor} solid 1px`,
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
      <ol style={styles.ol}>
        {renderSteps()}
      </ol>
    </div>
  );
};

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
  label: PropTypes.string,
};

Steps.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Steps;
