/**
 * Context Component for tinglejs
 * @auther gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
class Context extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>tingle-context component</div>
        );
    }
}

Context.defaultProps = {
}

// http://facebook.github.io/react/docs/reusable-components.html
Context.propTypes = {
}

module.exports = Context;