import { Mongo } from 'meteor/mongo';

export const ItemTypes = [{ key: 1, text: 'Asset',    value: 'Asset'    },
                          { key: 2, text: 'Scene',    value: 'Scene',    disabled: true },
                          { key: 3, text: 'Audio',    value: 'Audio',    disabled: true },
                          { key: 4, text: 'Timeline', value: 'Timeline', disabled: true }];

export const ItemTypesComponents = [{ key: 1, listComponent: 'AssetList',    mainComponent: 'AssetIndex',    showComponent: 'AssetShow',    editComponent: 'AssetEdit'},
                                    { key: 2, listComponent: 'SceneList',    mainComponent: 'SceneIndex',    showComponent: 'SceneShow',    editComponent: 'SceneEdit'},
                                    { key: 3, listComponent: 'AudioList',    mainComponent: 'AudioIndex',    showComponent: 'AudioShow',    editComponent: 'AudioEdit'},
                                    { key: 4, listComponent: 'TimelineList', mainComponent: 'TimelineIndex', showComponent: 'TimelineShow', editComponent: 'TimelineEdit'}];
