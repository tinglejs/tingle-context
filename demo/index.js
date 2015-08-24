/**
 * Tingle Context
 * The environment for tingle's initialization
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
window.FaskClick && FastClick.attach(document.body);

const Demo = require('./ContextDemo');

React.render(<Demo/>, document.getElementById('App'));