import { useState } from "react";

const Modal = ({ isOpen, onClose, done, handleImageChange, handleSubmit }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <label>
                Profile Picture:
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>

              <br />
              <button type="submit" onClick={done}>
                Update Profile Picture
              </button>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: black;
          padding: 20px;
          border-radius: 8px;
          width: 50vw;
          heigth: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
        }
      `}</style>
    </>
  );
};

export default Modal;
