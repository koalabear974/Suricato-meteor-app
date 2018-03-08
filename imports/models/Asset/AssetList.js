import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';

import './Asset.css'
import AssetListItem from './AssetListItem.js'

import Assets from '../../api/asset.js';

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
    this.props.handleItemClick(null, true)
  }

  render() {
    if(!this.state.isMounted) {
      return <p>LOADING</p>
    }

    var that = this;
    var itemList = this.props.assets.map(function(asset){
      return <AssetListItem key={asset._id} asset={asset} handleItemClick={that.props.handleItemClick} />
    })

    return (
      <div className="AssetList">
        <div className="AssetList__container">
          {
            itemList
          }
        </div>
        <Button className="AssetList__add-button" content={'Create asset'} onClick={this.handleAddItem} />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    assets: Assets.find({}).fetch(),
  };
})(AssetList);
