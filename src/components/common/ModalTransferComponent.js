import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "react-modal";

import * as actionTypes from "../../store/actions";

const ModalTransferComponent = ({
  show,
  accountDetails,
  setOpenModal,
  accountAmount,
  setAccountAmount,
  setAccountDetails,
  initialAccountDetails,
  ...props
}) => {
  const customStyles = {
    content: {
      width: "30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const { onTransactionAdded } = props;
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleTransfer = () => {
    setAccountAmount(
      accountAmount - parseFloat(accountDetails.amount).toFixed(2)
    );
    onTransactionAdded(accountDetails);
    // setAccountDetails(initialAccountDetails)
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        isOpen={show}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Transfer money"
      >
        <form>
          <label className="formLbl">Transfer money? </label>
          <label className="formLbl">From : {accountDetails.fromAccount}</label>
          <label className="formLbl">To : {accountDetails.toAccount}</label>
          <label className="formLbl">Amount: {accountDetails.amount}</label>
          <Button
            className="formButton"
            size="lg"
            variant="green"
            type="submit"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="formButton"
            size="lg"
            variant="primaryOrange"
            type="submit"
            onClick={handleTransfer}
          >
            Transfer
          </Button>
        </form>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTransactionAdded: (accountDetails) =>
      dispatch({
        type: actionTypes.ADD_TRANSACTION,
        transaction: accountDetails,
      }),
  };
};

export default connect(null, mapDispatchToProps)(ModalTransferComponent);
