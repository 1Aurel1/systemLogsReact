import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { updateLog } from '../../actions/logActions';
import PropTypes from 'prop-types';

const modalStyle = {
  width: '75%',
  height: '75%'
};

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      console.log(current);
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const updatedLog = {
        id: current.id,
        message: message,
        attention: attention,
        tech: tech,
        date: new Date()
      };

      console.log(updatedLog);

      updateLog(updatedLog);

      M.toast({ html: `Log updated by ${tech}` });

      //Clear fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            ></input>
            {/* <label htmlFor='message' className='active'>
              Log Message
            </label> */}
          </div>
        </div>
        <div className='row'>
          <select
            name='tech'
            value={tech}
            className='browser-default'
            onChange={e => setTech(e.target.value)}
          >
            <option value='' disabled>
              Select Technician
            </option>
            <option value='John Doe'>John Doe</option>
            <option value='Jorge Bush'>Jorge Bush</option>
          </select>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={() => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
        <div className='modal-footer'>
          <a
            href='#!'
            onClick={onSubmit}
            className='waves-effect waves-light btn blue'
            modal='close'
          >
            Update
          </a>
        </div>
      </div>
    </div>
  );
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired
};

const mapStateProps = state => ({
  current: state.log.current
});

export default connect(
  mapStateProps,
  { updateLog }
)(EditLogModal);
