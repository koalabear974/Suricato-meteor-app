import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './routes.js';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
