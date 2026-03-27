import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        About Us
      </h1>

      <p className="text-gray-600 mb-4">
        Our news website provides reliable and up-to-date
        information about technology, business, sports,
        and world events.
      </p>

      <p className="text-gray-600 mb-4">
        Our mission is to deliver accurate news and help
        readers stay informed about global developments.
      </p>

      <p className="text-gray-600">
        We are committed to responsible journalism and
        high-quality reporting.
      </p>

      <Link to="/" className="text-red-600 mt-6 block">
        ← Back Home
      </Link>

    </div>
  );
}
