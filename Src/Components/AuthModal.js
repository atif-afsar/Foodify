// components/AuthModal.jsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold text-center mb-4 text-emerald-600">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Dialog.Title>

                <form className="space-y-4">
                  {isSignUp && (
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600"
                  >
                    {isSignUp ? "Create Account" : "Sign In"}
                  </button>
                </form>

                <p className="text-center mt-4 text-sm">
                  {isSignUp ? "Already have an account?" : "New here?"}{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-emerald-600 underline"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
