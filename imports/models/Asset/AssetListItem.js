import React, { Component } from 'react';

import './Asset.css'

export default class AssetListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AssetListItem" onClick={() => this.props.handleItemClick(this.props.asset._id, false)}>
        <div className="AssetListItem__name">
          {this.props.asset.name}
        </div>
        <div className="AssetListItem__edit-button" onClick={(e) => { e.stopPropagation(); this.props.handleItemClick(this.props.asset._id, true) }}>
          Edit
        </div>
      </div>
    );
  }
}

