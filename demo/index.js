/**
 * Tingle Context
 * The environment for tingle's initialization
 * @auther gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
window.FaskClick && FastClick.attach(document.body);
var Demo = require('./ContextDemo');
React.render(<Demo/>, document.getElementById('TingleDemo'));