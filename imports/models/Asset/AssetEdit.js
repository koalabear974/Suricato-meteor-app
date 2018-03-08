import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { withTracker } from 'meteor/react-meteor-data';

import './Asset.css'

import Assets from '../../api/asset.js';

class AssetEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
      isEditObject: !!this.props.itemId,
      asset: this.props.asset,
      errors: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    console.log(Assets);
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  handleChange (e) {
    var asset = this.state.asset
    let errors = this.state.errors
    let targetName = e.target.name

    asset[targetName] = e.target.value

    if(this.hasErrors(targetName)) {
      errors = _.reject(errors, (a) => { return a.name == targetName })
    }
    this.setState({asset: asset, errors: errors})
  }

  handleSubmit (e, data) {
    e.preventDefault();
    if(this.state.isEditObject) {
    } else {
      Assets.insert(this.state.asset, (error, result) => {
        if(!error) {
          // console.log(result); == id
          this.props.handleSuccess(result);
        } else {
          console.log(error);
          this.setState({errors: error.invalidKeys})
        }
      });
    }
  }

  hasErrors(name = "null") {
    if(name) {
      return !!_.find(this.state.errors, (a) => { return a.name == name })
    } else {
      return !_.isEmpty(this.state.errors)
    }
  }

  render() {
    if(!this.state.isMounted) {
      return <p>LOADING</p>
    }
    return (
      <div className="AssetEdit">
        <h2>{ this.state.isEditObject? "Edit" : "Create" } asset</h2>
        <Form name="form" onSubmit={this.handleSubmit} onChange={this.handleChange} error={this.hasErrors()}>
          <Form.Input name="name" fluid label='Name' placeholder='Name' error={this.hasErrors('name')}/>
          <Form.TextArea name="description" label='Description' placeholder='Tell us more about the asset...' error={this.hasErrors('description')}/>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }

          //   <input placeholder="name" className={styles['form-field']} ref="name" />
          // <select className={styles['form-field']} ref="_t">{this.state.itemTypes.map(this.listOfItems)}</select>
          // <input placeholder="category" className={styles['form-field']} ref="category" />
          // <input placeholder="description" className={styles['form-field']} ref="description" />
          // <input placeholder="image" className={styles['form-field']} ref="image" />
          // <input placeholder="stage" className={styles['form-field']} ref="stage" />
}

export default withTracker(({itemId}) => {
  return {
    asset: !!itemId ? Assets.find({itemId}).fetch() : Assets.initObject(),
  };
})(AssetEdit);
