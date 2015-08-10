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

var rem = Context.makePrivateRem(640);

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
            <div className="tCL">
                {t.state.opacitys.map(function (opacity) {
                    return <div key={Context.getTID()} style={{
                        float: 'left',
                        width: '1rem',
                        height: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, ' + (opacity/10) + ')'
                    }}></div>
                })}
            </div>
            <div className="tP10">
                <div className="tLH2 tFAC tMB10 lineByPx">1px</div>
                <div className="tLH2 tFAC tMB10 lineByRem">rem(1)</div>
                <div className="tLH2 tFAC tMB10 lineByRem2">rem(2)</div>
                <div className="tLH2 tFAC lineByRem3">rem(3)</div>
            </div>
        </div>);
    }
};

module.exports = Demo;
