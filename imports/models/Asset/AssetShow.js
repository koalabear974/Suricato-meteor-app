import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './Asset.css'

import Assets from '../../api/asset.js';

class AssetShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    if(!this.state.isMounted) {
      return <p>LOADING</p>
    }
    return (
      <div className="AssetShow">
        <h2 className="AssetShow__name">{this.props.asset.name}</h2>
        <div className="AssetShow__description">
          <label className="AssetShow__label">Description</label>
          {this.props.asset.descrption}
        </div>
        <div className="AssetShow__times">
          <label className="AssetShow__label">Created At</label>
          {this.props.asset.createdAt ? this.props.asset.createdAt.toString() : ""}
          <label className="AssetShow__label">Updated At</label>
          {this.props.asset.updatedAt ? this.props.asset.updatedAt.toString() : ""}
        </div>
      </div>
    );
  }
}

export default withTracker(({itemId}) => {
  return {
    asset: !!itemId ? Assets.findOne(itemId) : Assets.initObject(),
  };
})(AssetShow);
