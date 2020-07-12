import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import DeafultCardLayout from "../common/DefaultCardLayout";
import ModalTransferComponent from "../common/ModalTransferComponent";
import icon from "../../public/assets/icons/arrows.png";

const cardLabel = "Make a Transfer";
const formDetails = [
  {
    type: "text",
    placeholder: "Free Checking(4692) - ",
    readonly: true,
    label: "FROM ACCOUNT",
    formControl: "fromAccount",
  },
  {
    type: "text",
    placeholder: "Georgia Power Electric Company",
    readonly: false,
    label: "TO ACCOUNT",
    formControl: "toAccount",
  },
  {
    type: "number",
    placeholder: "$ 0.0",
    readonly: false,
    label: "AMOUNT",
    formControl: "amount",
  },
];
const initialAaccountDetails = {
  amount: "",
  fromAccount: "Free Checking(4692)",
  toAccount: "",
};

const TransferMoneyForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [accountAmount, setAccountAmount] = useState(5824.76);
  const [accountDetails, setAccountDetails] = useState(initialAaccountDetails);

  const openModalWithSetDetails = (e) => {
    e.preventDefault();
    const newAccountDetails = {
      amount: e.target.elements.amount.value,
      toAccount: e.target.elements.toAccount.value,
    };
    setAccountDetails({ ...accountDetails, ...newAccountDetails });
    setModalOpen(true);
  };

  const TransferFormDetails = () => {
    return (
      <>
        <ModalTransferComponent
          show={isModalOpen}
          accountDetails={accountDetails}
          setOpenModal={setModalOpen}
          accountAmount={accountAmount}
          setAccountAmount={setAccountAmount}
          setAccountDetails={setAccountDetails}
          initialAccountDetails={initialAaccountDetails}
        />
        <Form onSubmit={(e) => openModalWithSetDetails(e)}>
          {formDetails.map((detail) => {
            const value =
              detail.formControl === "fromAccount"
                ? `${detail.placeholder}${accountAmount}`
                : initialAaccountDetails[detail.formControl];
            return (
              <Form.Group controlId={detail.formControl}>
                <Form.Label className="formLbl">{detail.label}</Form.Label>
                <Form.Control
                  as="input"
                  key={detail.formControl}
                  bsPrefix="bankCardInput"
                  name={detail.formControl}
                  type={detail.label}
                  disabled={detail.readonly}
                  defaultValue={value}
                  placeholder={detail.placeholder}
                  required
                />
              </Form.Group>
            );
          })}
          <Form.Group className="formButtonWrapper">
            <Button
              style={{ fontSize: "1.5rem" }}
              className="formButton"
              size="lg"
              variant="primaryOrange"
              type="submit"
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </>
    );
  };
  return (
    <DeafultCardLayout
      icon={icon}
      label={cardLabel}
      component={() => <TransferFormDetails />}
    />
  );
};

export default TransferMoneyForm;
