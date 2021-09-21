import React, { forwardRef, useEffect, useState } from 'react';

const SearchInput = forwardRef((props, ref) => {
  const [isFocus, setIsFocus] = useState(false);

  const hasExtraClasses = props.className ? props.className : '';

  const handleChange = (e) => {
    props.onChange(e.target.value);

    if (props.setDebounceParam) {
      props.setDebounceParam(e.target.value);
    }
  };

  useEffect(() => {
    if (props.dropDown) {
      if (isFocus && props.value !== '') {
        return props.setDropDownOpen(true);
      }
      // props.setDropDownOpen(false);
      if (props.isModalFocus) {
        return props.setDropDownOpen(true);
      }

      props.setDropDownOpen(false);
    }
  }, [isFocus, props.isModalFocus]);

  return (
    <input
      className={`${hasExtraClasses} search-input`}
      type='text'
      placeholder='Search Nft, Collections, or Keyword'
      value={props.value}
      onChange={handleChange}
      ref={ref}
      onKeyDown={(e) => e.key === 'Enter' && props.onPressEnter()}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      autoFocus
    />
  );
});

export default SearchInput;
