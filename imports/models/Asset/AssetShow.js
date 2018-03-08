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
        Asset SHOWWWWWWWWWWWW
      </div>
    );
  }
}

export default withTracker((itemId) => {
  return {
    asset: Assets.find({_id: itemId}).fetch(),
  };
})(AssetShow);
