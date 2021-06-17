import React, { useState } from 'react';
import './ToolbarButton.css';

export default function ToolbarButton(props) {
    const { icon } = props;
   
    return (
      <i onClick={props.onClick} className={`toolbar-button ${icon}`} />
    );
}