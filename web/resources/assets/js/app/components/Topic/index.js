import React, { Component, PropTypes } from 'react';

class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                Topic
            </div>
        );
    }
}

Topic.propTypes = {
    title: PropTypes.string
};

export default Topic;
