import React from 'react';
import PropTypes from 'prop-types';

function Posts(props) {
    const { children } = props;

    return (
        <>
            {children == null ? (
                <h3 className="m-t-16">Thông tin đang được cập nhật</h3>
            ) : (
                <article className={`mt-8`} dangerouslySetInnerHTML={{ __html: children }}></article>
            )}
        </>
    );
}

Posts.propTypes = {
    children: PropTypes.string,
};

export default Posts;
