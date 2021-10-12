import React from 'react';
import { useField } from 'formik';

const InputForm = ({ label, type, name, labelClassName, ...props }) => {
  const [field, meta] = useField({
    ...props,
    type,
    name,
  });

  return (
    <>
      <label htmlFor={props.id || props.name} className={labelClassName}>
        {label}
      </label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <small className='text-danger'>{meta.error}</small>
      ) : null}
    </>
  );
};

export default InputForm;
