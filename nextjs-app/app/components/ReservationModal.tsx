"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
};

export default function ReservationModal({
  isOpen,
  onClose,
  url,
}: ReservationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !url) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999] px-5">
      <div className="relative bg-white w-full max-w-3xl min-h-[85vh] max-h-[85vh] rounded-lg shadow-lg flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="25"
            viewBox="0 0 26 25"
            fill="#712538"
          >
            <path
              d="M1.37744 1L24.6221 24.2446"
              stroke="#712538"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M24.6221 1L1.37744 24.2446"
              stroke="#712538"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </button>
        <div className="flex-grow flex justify-center items-center 2xl:mt-32 md:mt-12 lg:mt-0">
          <iframe
            src={url}
            className="w-full h-full min-h-[80vh] rounded-lg"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
