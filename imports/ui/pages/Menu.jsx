import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

class Menu extends Component {

  renderMenuItems() {
    return this.props.menu.items.map(item =>
      item
    );
  }

  render() {
    const styles = {
      textField: {
        width: 400,
        height: 70,
        fontSize: '3em',
      },
    };

    const menu = this.props.menu;

    return (
      <div>
      <h1>Here</h1>
        <TextField
          id="menu-title"
          defaultValue={menu.title}
          value={menu.title}
          style={styles.textField}
        />
        <DatePicker value={menu.date} />

      </div>
    );
  }
}

Menu.propTypes = {
  isLoading: PropTypes.bool,
  menu: PropTypes.object,
};

export default Menu;
