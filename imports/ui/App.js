import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import './App.css'

import { ItemTypes, ItemTypesComponents } from '../api/utils.js';

import Sidebar from './Sidebar/Sidebar.js';
import AssetList  from '../models/Asset/AssetList.js';
import AssetIndex from '../models/Asset/AssetIndex.js';
import AssetShow  from '../models/Asset/AssetShow.js';


// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
      itemTypes: this.props.itemTypes,
      // currentItemType: null,
      // currentItemComponents: null,
      currentItemType: { key: 1, text: 'Asset',    value: 'Asset'    }, // As default for now
      currentItemComponents: { key: 1, listComponent: 'AssetList',    mainComponent: 'AssetIndex',    showComponent: 'AssetShow' },
      currentItemId: "",
    }

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleItemClick  = this.handleItemClick.bind(this)
    this.renderLeftComponent  = this.renderLeftComponent.bind(this)
    this.renderRightComponent  = this.renderRightComponent.bind(this)
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  handleTypeChange(type) {
    let components = _.find(this.props.itemTypesComponents, function(a) { return a.key == type.key })
    this.setState({ currentItemType: type, currentItemId: "",  currentItemComponents: components });
  }

  handleItemClick(event, data) {
    // store currentItemId
  }

  renderLeftComponent() {
    if(!this.state.currentItemType) {
      return <div className="main-container__left-empty">Choose a item type to load data</div>
    } else {
      const ListComponent = eval(this.state.currentItemComponents.listComponent)
      return <ListComponent />
    }
  }

  renderRightComponent() {
    if(!this.state.currentItemType) {
      return <div className="main-container__right-empty">ICON</div>
    } else {
      if(this.state.currentItemId == "") {
        const MainComponent = eval(this.state.currentItemComponents.mainComponent)
        return <MainComponent />
      } else {
        const ShowComponent = eval(this.state.currentItemComponents.showComponent)
        return <ShowComponent />
      }
    }
  }

  render() {
    if(!this.state.isMounted) {
      return <p>LOADING</p>
    }
    return (
      <div className="main-container">
        <div className='main-container__left'>
          <Sidebar handleTypeChange={this.handleTypeChange} />
          {
            this.renderLeftComponent()
          }
        </div>
        <div className='main-container__right'>
          {
            this.renderRightComponent()
          }
        </div>
      </div>
    );
  }
          // <ItemSwitchList items={this.state.items} handleSwitchItem={this.handleSwitchItem} currentItemId={this.state.currentItemId}/>
}


export default withTracker(() => {
  return {
    itemTypes: ItemTypes,
    itemTypesComponents: ItemTypesComponents,
  };
})(App);
