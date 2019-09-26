import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteLog, setCurrent } from '../../actions/logActions';

const LogItem = ({ log, deleteLog, setCurrent }) => {
  const onDelete = () => {
    deleteLog(log.id);
  };

  return (
    <li className='collection-item'>
      <a
        href='#edit-log-modal'
        className={`modal-trigger ${log.attention ? 'red-text' : 'blue-text'}`}
        onClick={() => setCurrent(log)}
      >
        {log.message}
      </a>
      <br />
      <span className='grey-text'>
        <span className='black-text'>ID #{log.id}</span>
        <span className='black-text'>{log.tech}</span> on{' '}
        <Moment format='MMMM Do YYYY, h:mm:ss'>{log.date}</Moment>
      </span>
      <a href='#!' onClick={onDelete} className='secondary-content'>
        <i className='material-icons grey-text'>delete</i>
      </a>
    </li>
  );
};

LogItem.propType = {
  deleteLog: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteLog, setCurrent }
)(LogItem);
