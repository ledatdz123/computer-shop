import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Row } from 'antd';

function GlobalLoading(props) {
    return (
        <Row className="max-w-100 h-100vh" justify="center" align="middle">
            <Spin size="large" className="Global-Loading trans-center" tip={props.content} />
        </Row>
    );
}

GlobalLoading.defaultProps = {
    content: 'TTB Store Loading...',
};

GlobalLoading.propTypes = {
    content: PropTypes.string,
};

export default GlobalLoading;
