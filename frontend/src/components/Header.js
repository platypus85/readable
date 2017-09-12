import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='ui inverted vertical masthead center aligned segment'>
      <div className='ui container'>
        <div className='ui large secondary inverted pointing menu'>
          <Link to='/' className='item'>readable</Link>
          <div className='right menu'>
            <div className='item'>
              <a className='ui inverted button' href='http://udacity.com'>Udacity</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}