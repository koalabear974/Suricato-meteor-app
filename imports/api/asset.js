import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class AssetsCollection extends Mongo.Collection {
  initObject() {
    return ({
      name: "",
      description: "",
    });
  }
  // insert(doc, callback) {
  //   const ourDoc = doc;
  //   ourDoc.createdAt = ourDoc.createdAt || new Date();
  //   const result = super.insert(ourDoc, callback);
  //   return result;
  // }
  // update(selector, modifier) {
  //   const result = super.update(selector, modifier);
  //   return result;
  // }
  // remove(selector) {
  //   const assets = this.find(selector).fetch();
  //   const result = super.remove(selector);
  //   return result;
  // }
}

const Assets = new AssetsCollection('assets');

export default Assets;

// Deny all client-side updates since we will be using methods to manage this collection
Assets.deny({
  // insert() { return true; },
  // update() { return true; },
  // remove() { return true; },
});

Assets.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
    max: 100,
  },
  description: {
    type: String,
    max: 500,
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    },
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    // denyInsert: true,
    optional: true
  },
});

Assets.attachSchema(Assets.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Assets.publicFields = {
  name: 1,
  description: 1,
  createdAt: 1,
  updatedAt: 1,
};

Assets.helpers({
  test() {
    return true;
  }
  // list() {
  //   return Lists.findOne(this.listId);
  // },
  // editableBy(userId) {
  //   return this.list().editableBy(userId);
  // },
});
