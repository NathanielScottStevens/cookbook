import { createContainer } from 'meteor/react-meteor-data';
import { RecipeTypes } from '../../api/recipeTypes/recipeTypes';
import TileLinkList from '../pages/TileLinkList';

function getLink(type) {
  return `recipes/${type.name}`;
}

const RecipeCategoriesContainer = createContainer(() => {
  const typesHandle = Meteor.subscribe('recipeTypes');
  const isLoading = !typesHandle.ready();
  const types = RecipeTypes.find({}).fetch();

  return {
    items: types,
    isLoading,
    getLink,
  };
}, TileLinkList);

export default RecipeCategoriesContainer;
