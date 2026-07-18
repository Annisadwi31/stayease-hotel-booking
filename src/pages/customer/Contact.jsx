import React from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <h1 className="text-4xl font-semibold text-slate-900">Contact Us</h1>
            <p className="mt-4 text-slate-600">Have a question or need help with your booking? Reach out anytime.</p>
            <div className="mt-10 space-y-6 text-slate-600">
              <div>
                <p className="text-sm font-semibold text-slate-900">Email</p>
                <p>support@stayease.com</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Phone</p>
                <p>+62 812 3456 7890</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Address</p>
                <p>StayEase Hotel, Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <form className="space-y-6">
              <Input label="Your Name" type="text" placeholder="Alex Morgan" />
              <Input label="Email" type="email" placeholder="you@example.com" />
              <Input label="Message" as="textarea" placeholder="Write your message" className="h-40 resize-none" />
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
