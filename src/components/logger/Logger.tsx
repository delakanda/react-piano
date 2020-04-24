import React from 'react';
import './Logger.css';

type TLoggerProps = {
  keyLogs: string[];
};

function Logger(props: TLoggerProps) {

  return (
    <div data-testid="logger-section" className="logger-section">
      <div className="log-heading">
        <small><i>Piano Logs</i></small>
      </div>
      <div data-testid="log-item-container">
        {props.keyLogs.map((log: string, idx: number) => {
          return (
            <span key={idx} className="log-item">{log}</span>
          )
        })}
      </div>
    </div>
  )
}

export default Logger;