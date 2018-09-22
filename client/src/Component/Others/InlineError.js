import React from 'react';
import PropTypes  from 'prop-types';

const InlineError =({ text }) => <span className="form-text text-danger" style={{ color : "red!important"}}>{text}</span> ;

InlineError.PropTypes = {
    text : PropTypes.string.isRequired
};
export default InlineError;