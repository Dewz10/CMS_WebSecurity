import React from 'react'
import Clock from './Clock';
const Count = (props) => {
    const deadline = props.deadline
    return (
      <div>
        <Clock deadline={deadline} />
      </div>
    );
}

export default Count