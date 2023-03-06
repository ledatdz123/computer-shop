// import commentApi from 'apis/commentApi';
import EvaluationView from '@/components/ProductDetail/Evaluation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function Evaluation(props) {
    const { productId, rates, avgRate } = props;
    // rendering...
    return <EvaluationView productId={productId} avgRate={avgRate} rates={rates} />;
}

Evaluation.defaultProps = {};
Evaluation.propTypes = {
    productId: PropTypes.string,
    rates: PropTypes.array || PropTypes.object,
};

export default Evaluation;
