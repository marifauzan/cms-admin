import ReactDOM from 'react-dom';

const ModalWrapper = ({ children, open }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-wrapper">{children}</div>,
    document.body,
  );
};

export default ModalWrapper;
