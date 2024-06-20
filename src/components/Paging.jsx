import React from 'react';
import { Pagination } from 'semantic-ui-react';

function Paging() {
  return (
    <>
      <Pagination defaultActivePage={5} totalPages={10}/>
    </>
  );

}

export default Paging;