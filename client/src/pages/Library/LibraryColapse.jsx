import React from 'react';
import { plantData } from '../../constants/library';
import { ScrollArea } from 'react-scrollbar';

const LibraryColapse = ({ handleCategoryId, categoryId }) => {
  return (
    <div className="library__colapse">
      {plantData?.length
        ? plantData.map((item) => {
            return (
              // eslint-disable-next-line
              <div
                className={`library__colapse-item ${
                  categoryId === item.id ? 'active' : ''
                }`}
                key={item.id}
                onClick={() => handleCategoryId(item.id)}
              >
                <div className="library__colapse-head">
                  <div className="library__colapse-head--content">
                    <div className="library__colapse-head--icon">$</div>
                    <div className="library__colapse-head--title">
                      {item.name}
                    </div>
                  </div>
                  <div className="library__colapse-head--arrow">+</div>
                </div>{' '}
                <ScrollArea className="library__colapse-body">
                  {item.categories?.length
                    ? item.categories.map((category) => {
                        return (
                          <div
                            className="library__colapse-body--title"
                            key={category.id}
                          >
                            {category.name}
                          </div>
                        );
                      })
                    : null}{' '}
                </ScrollArea>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default LibraryColapse;
