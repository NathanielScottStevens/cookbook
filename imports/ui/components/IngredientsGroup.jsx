import React, { Component, PropTypes } from 'react';

import IngredientTable from './IngredientTable';
import IngredientTableEditable from './IngredientTableEditable';
import EditButton from './EditButton';

class IngredientsGroup extends Component {
  constructor(props) {
    super(props);

    const editingState = Array(props.ingredients.length);
    editingState.fill(false, 0, editingState.length);
    this.state = { isEditing: editingState };
  }

  onChange(index, value) {
    this.setEditingState(index, false);
    if (this.props.onChange) {
      const newValue = [...this.props.ingredients];
      newValue[index] = value;
      this.props.onChange(newValue);
    }
  }

  onClear(index) {
    this.setEditingState(index, false);
  }

  setEditingState(index, value) {
    const newState = [...this.state.isEditing];
    newState[index] = value;
    this.setState({ isEditing: newState });
  }

  render() {
    const { ingredients, servingMultiplier, uoms } = this.props;
    const styles = {
      divider: {
        height: 40,
        width: '100%',
      },
    };

    const tables = ingredients.map((group, index) => {
      const isEditing = this.state.isEditing[index];
      return (
        <div key={`${group.label}-${index}`}>

          {isEditing
            ? <IngredientTableEditable
                ingredients={group.list}
                label={group.label}
                uoms={uoms}
                onChange={value => this.onChange(index, value)}
                onClear={() => this.onClear(index)}
              />
            : <div>
                <EditButton
                  data-id={`ingredients-edit-${index}`}
                  onClick={() =>
                    this.setEditingState(index, true)
                  }
                />
                <IngredientTable
                  ingredients={group.list}
                  label={group.label}
                  servingMultiplier={servingMultiplier}
                  onChange={value => this.onChange(index, value)}
                />
             </div>
          }

          <div style={styles.divider} />
        </div>
      );
    });

    return (
      <div>
        {tables}
      </div>
    );
  }
}

IngredientsGroup.propTypes = {
  ingredients: PropTypes.array.isRequired,
  servingMultiplier: PropTypes.number,
  uoms: PropTypes.array,
  onChange: PropTypes.func,
};

export default IngredientsGroup;
