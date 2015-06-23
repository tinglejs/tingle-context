 /**
 * Tingle Context
 * The environment for tingle's initialization
 * @auther gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
require("fastclick").attach(document.body);
React.initializeTouchEvents(true);

var Tingle = {
    Dialog:        require('tingle-dialog'),
    GroupList:     require('tingle-group-list'),
    Layer:         require('tingle-layer'),
    Mask:          require('tingle-mask'),
    OnOff:         require('tingle-on-off'),
    OnOffField:    require('tingle-on-off-field'),
    Slide:         require('tingle-slide'),
    TextField:     require('tingle-text-field'),
    TextareaField: require('tingle-textarea-field'),
    Tip:           require('tingle-tip'),
};

module.exports = window.Tingle = Tingle;