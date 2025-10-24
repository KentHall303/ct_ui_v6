import React from "react";
import { ContactProfileFSModal3 } from "../../components/modals/ContactProfileFSModal3";
import { useNavigate } from "react-router-dom";

export const ContactProfileModal3DirectPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return <ContactProfileFSModal3 show={true} onHide={handleClose} />;
};
