import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

const CustomAppBar = ({ onMenuChange, children }) => {
  const styles = {
    appBar: {
      position: 'fixed',
      top: 0,
    },
    toolbar: {
      marginTop: 18,
    },
  };

  return (
    <AppBar
      title="Cookbook"
      style={styles.appBar}
      onLeftIconButtonTouchTap={() => { onMenuChange(); }}
    >
      <div style={styles.toolbar}>
        {children}
      </div>
    </AppBar>
  );
};

CustomAppBar.propTypes = {
  onMenuChange: PropTypes.func,
  children: PropTypes.node,
};

export default CustomAppBar;
