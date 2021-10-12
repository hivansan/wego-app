import React from 'react';

import { useField } from 'formik';

const Radio = ({
  name,
  value,
  containerClassname,
  label,
  labelClassName,
  ...props
}) => {
  const [field, meta] = useField({
    ...props,
    type: 'radio',
    value: value,
    name: name,
  });

  return (
    <>
      <div className={containerClassname}>
        <input {...field} {...props} type='radio' />
        <label className={labelClassName} htmlFor={props.id || props.name}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Radio;
