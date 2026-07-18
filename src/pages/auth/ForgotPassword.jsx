import React from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
        <h1 className="text-3xl font-semibold text-slate-900">Forgot Password</h1>
        <p className="mt-3 text-slate-500">Enter your email to reset your password.</p>
        <form className="mt-8 space-y-5">
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Button className="w-full">Send Reset Link</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
