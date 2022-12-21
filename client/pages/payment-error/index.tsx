// create a payment success page using a success icon from react-icons
import { BsCheckCircle } from "react-icons/bs";
import Router from "next/router";
const PaymentError = () => {
  return (
    <div className=" min-h-screen overflow-hidden bg-slate-200">
      <div className="rounded flex flex-col items-center  w-[600px] m-auto mt-[100px] bg-white">
        <div className=" h-[250px] w-full bg-red-500 flex justify-center">
          <BsCheckCircle className="text-[100px] text-white m-auto" />
        </div>

        <h1 className=" text-5xl mt-10 mb-5">Payment Error</h1>
        <p className=" text-xl text-center text-slate-800 mb-10">
          Unfortunatly your payment was not successful. Please try again.
        </p>
        <button
          onClick={() => Router.push("/")}
          className=" text-white text-2xl bg-black p-3 px-[100px] mb-10 mt-auto hover:bg-gray-800 rounded-md"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};
export default PaymentError;
