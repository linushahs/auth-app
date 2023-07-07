import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { verifyAccountFn } from "../actions/apiActions";

export default function OTPVerification() {
  const [otpArray, setOTPArray] = useState(new Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  //verifyAccountMutation
  const verifyAccountMn = useMutation({
    mutationFn: verifyAccountFn,
    onSuccess: () => {
      alert("Your account is verified");
    },
  });

  const handleOTPInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { value } = e.target;
    const newArray = [...otpArray];
    newArray[id] = value;
    setOTPArray(newArray);

    if (value.length === 1 && id < otpArray.length - 1) {
      const nextInput = inputRefs.current[id + 1];
      nextInput?.focus();
    }
  };

  const verifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = parseInt(otpArray.join(""));

    verifyAccountMn.mutate({
      email: "renarajesh123@gmail.com",
      verificationCode: otp,
    });
  };

  return (
    <form onSubmit={verifyOTP}>
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              OTP Verification
            </h3>
            <div className="flex gap-3 max-w-[200px] my-4">
              {otpArray.map((n, id) => (
                <input
                  key={id}
                  type="number"
                  onChange={(e) => handleOTPInput(e, id)}
                  value={n}
                  maxLength={1}
                  className="border-2 border-gray-200 rounded-lg w-[55px] p-2 h-[60px] text-center"
                  ref={(ref) => (inputRefs.current[id] = ref)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && n === "" && id > 0) {
                      const prevInput = inputRefs.current[id - 1];
                      prevInput?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
