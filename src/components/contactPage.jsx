import { Card } from "flowbite-react";
import { FaEnvelope } from "react-icons/fa6";

function ContactPage() {
  return (
    <>
      <Card className="max-w-sm" imgSrc="/emplogo.png" horizontal>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Contact Us
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400 flex items-center gap-3">
          <FaEnvelope className="inline text-lg" />{" "}
          {/* help@everyminipainted.com */}
        </div>
      </Card>
    </>
  );
}

export default ContactPage;
