import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useRef, useState } from "react";
import { verifyAccountFn } from "../actions/apiActions";

export default function OTPVerification({
  isOpen,
  setIsOpen,
  email,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  email: string;
}) {
  const [otpArray, setOTPArray] = useState(new Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  //verifyAccountMutation
  const verifyAccountMn = useMutation({ mutationFn: verifyAccountFn });

  function closeModal() {
    setIsOpen(false);
  }

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
    console.log(otp);
    verifyAccountMn.mutate({ email, verificationCode: otp });
  };

  return (
    <form onSubmit={verifyOTP}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    OTP Verification
                  </Dialog.Title>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </form>
  );
}
