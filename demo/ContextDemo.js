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
            <div className="tBC5" style={{
                width: rem(100),
                height: rem(100)
            }}/>
        </div>);
    }
};

module.exports = Demo;
