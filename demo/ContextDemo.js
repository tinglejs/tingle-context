/**
 * Tingle Context
 * The environment for tingle's initialization
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

const classnames = require('classnames');
const Context = window.Tingle = require('../src/Context');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opacityArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    }

    render() {
        const t = this;
        return (<div>
            <div className="tP10">rem demo</div>
            <div className="tCL">
                {t.state.opacityArr.map(function (opacity) {
                    return <div key={Context.getTID()} style={{
                        float: 'left',
                        width: '1rem',
                        height: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, ' + (opacity / 10) + ')'
                    }}></div>
                })}
            </div>
            <div className="tP10 tLH2 tFAC">
                <div className="tMB10 lineByPx">1px的线，当设备支持0.5px时，使用0.5px</div>
                <div className="tMB10 lineByPx2">没有处理过的1px的线</div>
                <div className="tMB10 lineByRem">rem(1)的线</div>
                <div className="tMB10 lineByRem2">rem(2)的线</div>
                <div className="lineByRem3">rem(3)的线</div>
            </div>
            <div className="tP10 tLH2 tFAC">
                <div className="touchDemo tTE">点击效果实现演示</div>
            </div>
        </div>);
    }
}

module.exports = Demo;
