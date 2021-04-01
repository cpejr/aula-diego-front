import React from "react";
import { Tooltip, Popconfirm } from "antd";
import "./actionButton.css";

export default function ActionButton({ title, placement="bottom", confirm, onConfirm, children }) {
  
  return (
    <Tooltip title={title} placement={placement} >
      <Popconfirm
        title={confirm}
        onConfirm={onConfirm}
      >
        <div className="iconWrapper">
          {children}
        </div>
      </Popconfirm>
    </Tooltip>
  )
}
