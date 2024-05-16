import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
      <p>Created by Saeid Khoobdell</p>
      <p>Find me on GitHub: <a href="https://github.com/saeidkhoobdell"><FontAwesomeIcon icon={faGithub} /></a></p>
    </footer>
  );
}

export default Footer;
