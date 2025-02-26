import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

interface ITextFieldGroup {
  name: string;
  placeholder?: string;
  value: string;
  error: string;
  info?: string;
  type: any;
  onChange: any;
  disabled?: string;
}

const TextFieldGroup = ({ name, placeholder, value, error, info, type, onChange, disabled }: ITextFieldGroup) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled === 'true' ? true : false}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
