"use client";

import React from "react";
import ReactModal from "react-modal";

export default function Modal({ isOpen = true, onRequestClose, children }) {
  ReactModal.setAppElement("#modal-root");

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className="max-w-lg w-full mx-auto mt-20 bg-white p-6 rounded shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    >
      {children}
    </ReactModal>
  );
}
