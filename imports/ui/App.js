import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import './App.css'

import { ItemTypes, ItemTypesComponents } from '../api/utils.js';

import Sidebar from './Sidebar/Sidebar.js';
import AssetList  from '../models/Asset/AssetList.js';
import AssetIndex from '../models/Asset/AssetIndex.js';
import AssetShow  from '../models/Asset/AssetShow.js';
import AssetEdit  from '../models/Asset/AssetEdit.js';


// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
      itemTypes: this.props.itemTypes,
      currentItemType: null,
      currentItemComponents: null,
      // currentItemType: { key: 1, text: 'Asset',    value: 'Asset'    }, // As default for now
      // currentItemComponents: { key: 1, listComponent: 'AssetList',    mainComponent: 'AssetIndex',    showComponent: 'AssetShow',    editComponent: 'AssetEdit'},
      currentItemId: "",
      isItemEdit: false,
    }

    this.handleTypeChange  = this.handleTypeChange.bind(this)
    this.handleItemClick   = this.handleItemClick.bind(this)
    this.handleEditSuccess = this.handleEditSuccess.bind(this)
    this.renderLeftComponent = this.renderLeftComponent.bind(this)
    this.renderRightComponent  = this.renderRightComponent.bind(this)
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  handleTypeChange(type) {
    let components = _.find(this.props.itemTypesComponents, function(a) { return a.key == type.key })
    this.setState({ currentItemType: type, currentItemId: "",  currentItemComponents: components });
  }

  handleItemClick(id, isEdit = false) {
    this.setState({ currentItemId: id || "", isItemEdit: isEdit });
  }

  handleEditSuccess(result) {
    //TODO flash message
    this.setState({isItemEdit: false, currentItemId: result});
  }

  renderLeftComponent() {
    if(!this.state.currentItemType) {
      return <div className="main-container__left-empty">Choose a item type to load data</div>
    } else {
      var ListComponent = eval(this.state.currentItemComponents.listComponent)
      return <ListComponent currentItemId={this.state.currentItemId} handleItemClick={this.handleItemClick} />
    }
  }

  renderRightComponent() {
    if(!this.state.currentItemType) {
      return <div className="main-container__right-empty"><img className="main-container__right-empty-icon" src="/img/loading.GIF" /></div>
    } else {
      if(this.state.isItemEdit) {
        var EditComponent = eval(this.state.currentItemComponents.editComponent)
        return <EditComponent itemId={this.state.currentItemId} handleSuccess={this.handleEditSuccess}/>
      }else if(this.state.currentItemId == "") {
        var MainComponent = eval(this.state.currentItemComponents.mainComponent)
        return <MainComponent />
      } else {
        var ShowComponent = eval(this.state.currentItemComponents.showComponent)
        return <ShowComponent itemId={this.state.currentItemId} />
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
