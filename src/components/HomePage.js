import React from 'react';
import { Link } from 'react-router-dom';

import image from '../image/home.jpg';

export default function HomePage() {
  return (
    <div>
      <button>
        <Link to='/loopout'>Get Started</Link>
      </button>
    </div>
  )
}