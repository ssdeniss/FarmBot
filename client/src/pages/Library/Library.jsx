import React, { useState } from 'react';
import LibraryTabs from './LibraryTabs';
import LibrarySegment from './LibrarySegment';

const Library = () => {
  const [categoryId, setCategoryId] = useState(0);
  const handleCategoryId = (val) => {
    setCategoryId(val);
  };
  console.log(categoryId);
  return (
    <div className="library">
      <div className="library__content">
        <LibraryTabs handleCategoryId={handleCategoryId} />
        <LibrarySegment categoryId={categoryId} />
      </div>
    </div>
  );
};

export default Library;
