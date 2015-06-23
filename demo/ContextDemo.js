// TODO: move the two lines below to tingle-context

// webpack bug: https://github.com/webpack/webpack/issues/300
// var Tingle = require('../src') // 这个写法报错
// var Tingle = require('../src/index') // 这个写法报错

var Tingle = require('../src/tingle');
console.log(Tingle);

// var {Mask} = Tingle;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // Mask.show();
    }

    render() {
        return <div>Tingle is loaded</div>
    }
}

React.render(<Demo/>, document.getElementById('TingleDemo'));