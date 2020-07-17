import React, { useEffect, useRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error}>
      <input defaultValue={defaultValue} ref={inputRef} {...rest} type="text" />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={15} />
        </Error>
      )}
    </Container>
  );
}

export default Input;
