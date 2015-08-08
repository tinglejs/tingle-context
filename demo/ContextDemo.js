/**
 * Tingle Context
 * The environment for tingle's initialization
 * @auther gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

var classnames = require('classnames');

var Context = require('../src/Context');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opacitys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    }

    render() {
        var t = this;
        return (<div>
            <div className="tP10">rem demo</div>
            <div>
                {t.state.opacitys.map(function (opacity) {
                    return <div style={{
                        float: 'left',
                        width: '1rem',
                        height: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, ' + (opacity/10) + ')'
                    }}></div>
                })}
            </div>
        </div>);
    }
};

module.exports = Demo;
