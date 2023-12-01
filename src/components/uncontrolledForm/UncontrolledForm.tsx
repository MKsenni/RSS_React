import React from 'react';
import { useNavigate } from 'react-router-dom';

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <>
      <button type="button" onClick={back}>
        back
      </button>
      <div>uncontrolledForm</div>
    </>
  );
};

export default UncontrolledForm;
