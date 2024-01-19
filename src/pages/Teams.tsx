import LeftSideBar from "../components/LeftSideBar";
import BillingForm from "../forms/BillingForm";
import { useState } from "react";

const Billing = () => {
  const [error, setError] = useState<string | null>(null);

  const onRegistratingUser = async (formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    companyName?: string;
    vatNumber?: string;
    address?: string;
    postalCode?: string | number;
    city?: string;
    country?: string;
  }): Promise<void> => {};
  return (
    <>
      <div className="billings-wrapper">
        <div className="dashbord-wrapper">
          <LeftSideBar />
        </div>
        <div className="billings-right-col">
          <div className="billings-header">Billing</div>
          <div className="billing-btn">
            <div className="billing-icon"></div>
            <p className="choose-billing">Choose plan</p>
          </div>
          <p className="subscription-prompt">
            Please scroll down to update your subscription. Confirm the new plan
            subscription by hitting the “Subscribe” button below.
          </p>
          <div className="user-account-from">
            <BillingForm
              isLoading={false}
              isError={false}
              autoFocus={true}
              onSubmit={onRegistratingUser}
            />
            {error && (
              <p className="error-while-registration">
                <div style={{ color: "red" }}>{error}</div>
              </p>
            )}
          </div>
          <div className="billing-footer">
            <div className="billing-subscription-info">
              <p className="billing-subscription-prompt">Subscription</p>
              <div className="subscription-detail">
                <p className="detail-hader">SignRequest FREE (€0,00/month)</p>
                <p className="detail-body">
                  Extra costs for text messages may apply. (€0,20/SMS) Excluding
                  VAT (if applicable) VAT rate: <span>0%</span> (Ethiopia)
                </p>
              </div>
            </div>
            <div className="payment-method">
              <p className="payment-method-prompt">Payment Method</p>
              <button className="add-credit-card payment-btn">
                Add a credit card
              </button>
              <button className="add-sepa-mandate payment-btn">
                Add SEPA mandate
              </button>
            </div>
            <p className="user-notification">
              No payment details at your disposal? Please contact us.
            </p>
            <p className="check-box">
              I understand that this subscription will automatically renew.
            </p>
            <button className="user-subscribe-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
