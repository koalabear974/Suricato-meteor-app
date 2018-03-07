import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './Asset.css'

import { Assets } from '../../api/asset.js';

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
        Asset Show
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    assets: Assets.find({id: this.props.id}).fetch(),
  };
})(AssetShow);
