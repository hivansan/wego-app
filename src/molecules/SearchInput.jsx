import React, { forwardRef, useMemo } from 'react';

const SearchInput = forwardRef((props, ref) => {
  const hasExtraClasses = props.className ? props.className : '';

  const handleChange = (e) => {
    props.onChange(e.target.value);
    props.setDebounceParam(e.target.value);
  };

  return (
    <input
      className={`${hasExtraClasses} search-input`}
      type='text'
      placeholder='Search Nft, Collections, or Keyword'
      value={props.value}
      onChange={handleChange}
      ref={ref}
      onKeyDown={(e) => e.key === 'Enter' && props.onPressEnter()}
      autoComplete='off'
    />
  );
});

export default SearchInput;
