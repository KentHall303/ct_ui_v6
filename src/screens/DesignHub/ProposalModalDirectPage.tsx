import React from "react";
import { ProposalFSModal } from "../../components/modals/ProposalFSModal";
import { useNavigate } from "react-router-dom";

export const ProposalModalDirectPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return <ProposalFSModal show={true} onHide={handleClose} />;
};
