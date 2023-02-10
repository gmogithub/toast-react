import React, { FC } from "react";

interface ToastProps {
  title?: string,
  content: string,
  type?: "success" | "danger" | "default"
}

export const Toast: FC<ToastProps> = ({type, title, content}) => {
  return <div className={`toast toast--${type}`}>
    {
      title && (
        <p>
          <strong>{title}</strong>
        </p>
      )
    }
    <p>{content}</p>
  </div>;
}

Toast.displayName = "Toast";

Toast.defaultProps = {
  type: "default"
};