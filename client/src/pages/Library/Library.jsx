import React, { useState } from 'react';
import LibraryDrawer from './LibraryDrawer';
import LibraryColapse from './LibraryColapse';

const Library = () => {
  const [categoryId, setCategoryId] = useState(0);
  const handleCategoryId = (val) => {
    setCategoryId(val);
  };
  return (
    <div className="library">
      <div className="library__content">
        <div className="container">
          <LibraryColapse
            handleCategoryId={handleCategoryId}
            categoryId={categoryId}
          />
        </div>

        <LibraryDrawer categoryId={categoryId} />
      </div>
    </div>
  );
};

export default Library;
