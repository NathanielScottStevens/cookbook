import React, { Component, PropTypes } from 'react';
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth';

import AppBarNavigation from '../components/AppBarNavigation';
import RecipeHeaderEditable from '../components/RecipeHeaderEditable';

class AddRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: null,
      img: null,
      serves: null,
      slug: null,
      type: null,
    };
  }

  onChange(values) {

  }

  render() {
    if (this.props.isLoading) {
      return <div />;
    }

    const styles = {
      main: {
        paddingLeft: this.props.width === LARGE ? 300 : 0,
        paddingTop: 30,
        margin: 50,
        maxWidth: 1000,
      },
    };

    const { label, img, serves, slug, type } = this.state;

    return (
      <div>
        <AppBarNavigation />
        <main style={styles.main}>
          <RecipeHeaderEditable
            label={label}
            img={img}
            serves={serves}
            slug={slug}
            type={type}
            recipeTypes={this.props.recipeTypes}
            images={this.props.images}
            onChange={(v) => { this.onChange(v); }}
          />
        </main>
      </div>
    );
  }
}

AddRecipe.propTypes = {
  isLoading: PropTypes.bool,
  recipes: PropTypes.array,
  recipeTypes: PropTypes.array,
  images: PropTypes.array,
  width: PropTypes.number,
};

AddRecipe.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default withWidth()(AddRecipe);
