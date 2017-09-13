import React from 'react';

const NoSuchRoute = ({ location }) => (
  <div>
    <b>No such path exists:</b>
    <div>
      <code>{location.pathname}</code>
    </div>
  </div>
);

export default NoSuchRoute;