import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class AssetsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    const result = super.insert(ourDoc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const assets = this.find(selector).fetch();
    const result = super.remove(selector);
    return result;
  }
}

export const Assets = new AssetsCollection('assets');

// Deny all client-side updates since we will be using methods to manage this collection
Assets.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Assets.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
    max: 100,
    optional: true,
  },
  createdAt: {
    type: Date,
    // denyUpdate: true,
  },
  checked: {
    type: Boolean,
    defaultValue: false,
  },
});

Assets.attachSchema(Assets.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Assets.publicFields = {
  name: 1,
  createdAt: 1,
  checked: 1,
};

Assets.helpers({
  test() {
    return true;
  },
  // list() {
  //   return Lists.findOne(this.listId);
  // },
  // editableBy(userId) {
  //   return this.list().editableBy(userId);
  // },
});
