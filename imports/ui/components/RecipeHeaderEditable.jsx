import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem, makeSelectable } from 'material-ui/List';

import FramedImage from './FramedImage';
import DoneClearButton from './DoneClearButton';
import { Images } from '../../api/images/images';


class RecipeHeaderEditable extends Component {
  constructor(props) {
    super(props);
    const { label, serves, slug, type, img } = this.props;

    this.state = {
      label,
      serves,
      slug,
      type,
      img,
      modalOpen: false,
    };
  }

  onDone() {
    const { label, slug, type, img } = this.state;
    const serves = Number(this.state.serves);

    if (this.props.onChange) {
      this.props.onChange({
        label,
        serves,
        slug,
        type,
        img,
      });
    }
  }

  onOpen() {
    this.setState({ modalOpen: true });
  }

  onClose() {
    this.setState({ modalOpen: false });
  }

  getSelectedType() {
    const recipeTypes = this.props.recipeTypes;
    const type = this.state.type;

    if (type) {
      return recipeTypes.findIndex(t => t.label === type);
    }

    return null;
  }

  typeDropdownOnChange(value) {
    const selection = this.props.recipeTypes[value];
    this.setState({ type: selection.label });
  }

  uploadImage(event, template) {
    FS.Utility.eachFile(event, function (file) {
      Images.insert(file, function (err, fileObj) {
        if (err) {
          console.log(err)
          console.trace()
        } else {
          alert('File has been uploaded.')
        }
      });
    });
  }

  renderImages() {
    return this.props.images.map(image =>
      <ListItem
        style={{ minHeight: 128 }}
        onTouchTap={() => {
          this.setState({
            modalOpen: false,
            img: image.fileName,
          });
        }}
      >
        <img src={image.url()} />
      </ListItem>
    );
  }

  renderTypeDropDownItems() {
    return this.props.recipeTypes.map((type, index) =>
      <MenuItem
        key={index}
        primaryText={type.label}
        value={index}
      />
    );
  }

  render() {
    const { label, slug, serves } = this.state;

    const styles = {
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },
      leftHeader: {
        display: 'flex',
        flexDirection: 'column',
      },
      recipeTypeSelect: {
        verticalAlign: 'bottom',
        marginRight: 10,
      },
      fields: {
        marginRight: 10,
      },
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => this.onClose()}
      />,
    ];

    return (
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <DoneClearButton
            onClear={() => this.props.onClear()}
            onDone={() => this.onDone()}
          />
          <div>
            <TextField
              id="recipe-label"
              value={label}
              style={styles.fields}
              onChange={(_, value) => { this.setState({ label: value }); }}
              floatingLabelText="label"
            />
            <TextField
              id="recipe-serves"
              value={serves}
              style={styles.fields}
              onChange={(_, value) => { this.setState({ serves: value }); }}
              floatingLabelText="serves"
            />
          </div>
          <div>
            <TextField
              id="recipe-slug"
              value={slug}
              style={styles.fields}
              onChange={(_, value) => { this.setState({ slug: value }); }}
              floatingLabelText="slug"
            />
            <SelectField
              id="recipe-type"
              floatingLabelText="type"
              style={styles.recipeTypeSelect}
              value={this.getSelectedType()}
              onChange={(_, v) => { this.typeDropdownOnChange(v); }}
            >
              {this.renderTypeDropDownItems()}
            </SelectField>
          </div>
        </div>
        <FramedImage
          img={`/../../images/${this.state.img}`}
        />
        <FlatButton
          label="select image"
          primary
          onTouchTap={() => this.onOpen()}
        />
        <input
          type="file"
          name="upload-image"
          onChange={(event, template) => { this.uploadImage(event, template); }
          }
        />
        <Dialog
          title="Select an Image"
          actions={actions}
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={() => this.onClose()}
          autoScrollBodyContent
          autoDetectWindowHeight={false}
        >
          <List>
            {this.renderImages()}
          </List>
        </Dialog>
      </div>
    );
  }
}

RecipeHeaderEditable.propTypes = {
  label: PropTypes.string,
  img: PropTypes.string,
  serves: PropTypes.number,
  slug: PropTypes.string,
  type: PropTypes.string,
  recipeTypes: PropTypes.array,
  images: PropTypes.array,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
};

RecipeHeaderEditable.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default RecipeHeaderEditable;
