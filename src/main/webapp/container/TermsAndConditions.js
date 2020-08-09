import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const TermsAndConditions = () =>{
    return (
        <div className="terms-wrapper p-20" >
            <div className="page-title d-flex align-items-center">
                <IconButton to="/home" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
                    <i className="zmdi zmdi-arrow-left"/>
                </IconButton>
                <h2>Terms & Conditions</h2>
            </div>
            <div className="terms-conditions-rules">
                <RctCollapsibleCard customClasses="p-30">
                    <h2 className="heading">1. OUR OBLIGATIONS</h2>
                    <ol>
                        <li>We agree to provide the Remittance Service to Send Money to Nepal. You acknowledge that the Service may not be available, in whole or in part, in certain regions, countries, or jurisdictions.</li>
                        <li>When you submit a request to send money to Nepal. We may, decided not to process any particular transaction in our sole discretion. If we decide not to process the Transaction, we will notify you as soon as possible and we will refund the money we have received from you after deducting our service fee.</li>
                        <li>We may impose the limit on transaction amount.</li>
                        <li>We may send you the notifications once you successfully place the transaction. We may also notify once the transaction is completed.</li>
                        <li>We may contact you, if there is any issues in the transaction.</li>
                    </ol>
                </RctCollapsibleCard>
                <RctCollapsibleCard customClasses="p-30">
                    <h2 className="heading">2. YOUR OBLIGATIONS</h2>
                    <h3 className="nest-heading">You Agree that :</h3>
                    <ol className="sub-order">
                        <li>You will not access, use or attempt to use the Service to provide any Instructions unless you are at least 18 years old, and that you have the legal capacity to form a binding legal contract in any relevant jurisdiction.</li>
                        <li>You will pay service fee for each transaction in addition to the transaction amount. Service fee is payable (i.e. non refundable) even if the transaction is cancelled either at your request or at the discretion of Hamro Remit.</li>
                        <li>You agree that, if the transaction is not completed by whatsoever reason you will receive the transaction amount paid at the time of creating the transaction excluding service fee.</li>
                        <li>If you submit a Transaction Request that results in Hamro Remit becoming liable for charges including but not limited to chargeback or other fees, you agree to reimburse us for all such fees.</li>
                        <li>We may apply a convenience fee for processing credit cards in certain jurisdictions at our discretion.</li>
                        <li>You will not use any device, software or routine to interfere or attempt to interfere with the proper working of the Service or any Instruction being conducted through the Service.</li>
                    </ol>
                    <h3 className="nest-heading">You will:</h3>
                    <ol className="sub-order">
                        <li>Provide us with true and correct information about your identity, and promptly update your personal information when it changes.</li>
                        <li>Provide us the valid identity document.</li>
                        <li>Provide us income source documents if required.</li>
                    </ol>
                </RctCollapsibleCard>
                <RctCollapsibleCard customClasses="p-30">
                    <h2 className="heading">3. Others</h2>
                    <ol>
                        <li>We do not accept any liability for loss or damages to you or any third party resulting from non-payment or delay in payment of a Payout Amount to your receiver.</li>
                        <li>You will use the service of Hamro Remit to send money to people that you know personally and not to pay for goods or services from third parties you do not know.</li>
                        <li>It is your responsibility to make sure that all the details are correct before you submit your transaction request. Once the transaction has been submitted, generally it is not possible to change any details of that Transaction.</li>
                        <li>Exchange rate may be changed frequently.</li>
                        <li>Payout amount will be calculated on the basis of transaction amount and the exchange rate determined by the Hamro Remit at the time of submission of transaction request. Exchange Rate will be displayed clearly on the website before you are submit the transaction request.</li>
                        <li>We may refuse a Transaction at any time for any reason.</li>
                        <li>For any cancellation of transactions, Hamro Remit will normally refund your money, less Service Fees already charged, within three (3) Business Days.</li>
                        <li>If the information provided by you is incorrect then we are not liable for the completion of transaction. Any additional charges deducted by the third party for correction of information may reduce the payout amount of receiver.</li>
                        <li>We require you to provide us with personal identifying information relating to you and the Recipient.</li>
                        <li>We may verify your residential address and personal details in order to confirm your identity or we may use the service third party databases or through other sources to verify your identity.</li>
                        <li>We may be required by law to provide information about you and your transaction history with us. You acknowledge and consent to us doing this.</li>
                    </ol>
                </RctCollapsibleCard>
            </div>
        </div>
    );
};

export default TermsAndConditions;