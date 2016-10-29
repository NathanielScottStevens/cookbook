import { createContainer } from 'meteor/react-meteor-data';
import Menu from '../pages/Menu';
import { Recipes } from '../../api/menus/menus';

const MenuContainer = createContainer(({ params: { id } }) => {
  const menuHandle = Meteor.subscribe('menus');
  const isLoading = !menuHandle.ready();
  const menu = Recipes.findOne(id);

  return {
    menu,
    isLoading,
  };
}, Menu);

export default MenuContainer;
