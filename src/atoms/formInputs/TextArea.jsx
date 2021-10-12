import React from 'react';
import { useField } from 'formik';

const TextArea = ({ label, name, labelClassName, ...props }) => {
  const [field, meta] = useField({
    ...props,
    name,
  });

  return (
    <>
      <label htmlFor={props.id || props.name} className={labelClassName}>
        {label}
      </label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <small className='color-primary'>{meta.error}</small>
      ) : null}
    </>
  );
};

export default TextArea;
