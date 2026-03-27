import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Privacy Policy
      </h1>

      <p className="text-gray-600 mb-4">
        This Privacy Policy explains how our news website collects,
        uses, and protects your personal information when you use
        our services.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">
        Information We Collect
      </h2>

      <p className="text-gray-600">
        We may collect personal information such as your email
        address when you subscribe to our newsletter or create
        an account on our website.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">
        How We Use Your Information
      </h2>

      <p className="text-gray-600">
        Your information is used to improve our services,
        send news updates, and respond to your requests.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">
        Cookies
      </h2>

      <p className="text-gray-600">
        Our website may use cookies to enhance your experience
        and analyze website traffic.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">
        Contact Us
      </h2>

      <p className="text-gray-600">
        If you have any questions about this Privacy Policy,
        please contact us through our website.
      </p>

      <Link to="/" className="text-red-600 mt-6 block">
        ← Back Home
      </Link>

    </div>
  );
}