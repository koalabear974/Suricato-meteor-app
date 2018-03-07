import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './Asset.css'

import { Assets } from '../../api/asset.js';

class AssetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
    }

    this.handleAddItem = this.handleAddItem.bind(this)
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  handleAddItem () {

  }

  render() {
    if(!this.state.isMounted) {
      return <p>LOADING</p>
    }
    return (
      <div className="AssetList">
        <Button className="AssetList__add-button" content={'Create asset'} onClick={this.handleAddItem} />
        Asset LIST
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    assets: Assets.find({}).fetch(),
  };
})(AssetList);
