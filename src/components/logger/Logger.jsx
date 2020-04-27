import React from 'react';
import './Logger.css';

function Logger(props) {

  return (
    <div data-testid="logger-section" className="logger-section">
      <div className="log-heading">
        <small><i>Piano Logs</i></small>
      </div>
      <div data-testid="log-item-container">
        {props.keyLogs.map((log, idx) => {
          return (
            <span data-testid="log-item" key={idx} className="log-item">{log}</span>
          )
        })}
      </div>
    </div>
  )
}

export default Logger;