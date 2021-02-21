import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from 'react-bootstrap/ProgressBar';

const EventProgress = props => {
  return (
    <div className="progress">
      <ProgressBar 
        variant="custom" 
        animated 
        min={0}
        max={100}
        now={props.now} 
        label={props.label}
        style={{ backgroundColor: 'inherit' }} 
      />
    </div>
  )
}

EventProgress.propTypes = {
  now: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
}

export default EventProgress
