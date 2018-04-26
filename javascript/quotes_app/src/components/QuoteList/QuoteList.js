import React from 'react';
import './QuoteList.css'

const QuoteList = props => (
    <div className="quote">
        <ul>
          <div>
            <strong>Theme:</strong> {props.theme}
          </div>
          <div>
            <strong>Context:</strong> {props.context}
          </div>
          <div>
            <strong>Quote:</strong> {props.quote}
          </div>
        </ul>
    </div>
  );
  
  export default QuoteList;