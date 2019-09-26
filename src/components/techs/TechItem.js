import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTech } from '../../actions/techActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech, deleteTech }) => {
  const onDelete = (id, name) => {
    deleteTech(id);
    M.toast({ html: `Tech ${name} was deleted successfully` });
  };
  return (
    <li className='collection-item'>
      <div>
        {tech.firstName} {tech.lastName}
        <a
          onClick={() =>
            onDelete(tech.id, tech.firstName + ' ' + tech.lastName)
          }
          href='#'
          className='secondary-content'
        >
          <i className='material-icons gray-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  deleteTech: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTech }
)(TechItem);
