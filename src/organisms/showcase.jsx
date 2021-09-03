import React, { useEffect, useReducer, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ShowcaseCard from '../molecules/showcaseCard';

const Showcase = ({ getElements }) => {
  const [elements, setElements] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [moreRef, inView] = useInView({
    threshold: 0,
  });
  let i = 0;

  useEffect(() => {
    function loadItems() {
      getElements(nextPage).then((res) => {
        setNextPage(res.nextPage ? res.nextPage : Infinity);
        setElements((lastElements) => [...lastElements, ...res.elements]);
      });
    }
    if (inView) loadItems();
  }, [inView]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {elements.map((el) => (
        <ShowcaseCard
          key={`card-${i++}-${el.id}`}
          collectionId={el.collectionId}
          id={el.id}
          src={el.src}
          name={el.name}
          from={el.from}
          collection={el.collection}
        />
      ))}
      <div ref={moreRef}></div>
    </div>
  );
};

export default Showcase;
