import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

export default function Header() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text="Readable"/>
      </ToolbarGroup>
    </Toolbar>
  )
}