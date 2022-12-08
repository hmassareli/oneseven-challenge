// create a payment success page using a success icon from react-icons
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const PaymentSuccess = () => {
  return (
    <div>
      <IoCheckmarkDoneCircleSharp className="text-6xl text-green-500" />
      <h1>Payment Success</h1>
      <p>
        Thank you for choosing our company, the receipt will be sent to your
        email
      </p>
    </div>
  );
};
export default PaymentSuccess;
