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

var demoRem = Context.makePrivateRem(640);

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
            <div className="tP10 tLH2 tFAC">
                <div className="tMB10 lineByPx">1px的线，当设备支持0.5px时，使用0.5px</div>
                <div className="tMB10 lineByPx2">没有处理过的1px的线</div>
                <div className="tMB10 lineByRem">demoRem(1)</div>
                <div className="tMB10 lineByRem2">demoRem(2)</div>
                <div className="lineByRem3">demoRem(3)</div>
            </div>
            <div className="tP10 tLH2 tFAC">
                <div className="touchDemo tTE">点击效果实现演示</div>
            </div>
        </div>);
    }
};

module.exports = Demo;
