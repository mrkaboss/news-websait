import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Terms of Service
      </h1>

      <p className="text-gray-600 mb-4">
        By using this website, you agree to follow our terms and
        conditions. These terms explain the rules and regulations
        for using our news platform.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">
        Use of Content
      </h2>

      <p className="text-gray-600">
        All articles, images, and content published on this
        website are protected by copyright and may not be
        copied or distributed without permission.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">
        User Responsibilities
      </h2>

      <p className="text-gray-600">
        Users must not misuse the website or attempt to
        damage or disrupt its services.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">
        Changes to Terms
      </h2>

      <p className="text-gray-600">
        We may update these terms at any time. Continued use
        of the website means you accept the updated terms.
      </p>

      <Link to="/" className="text-red-600 mt-6 block">
        ← Back Home
      </Link>

    </div>
  );
}