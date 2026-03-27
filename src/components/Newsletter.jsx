export default function Newsletter() {
  return (
    <section className="bg-gray-900 text-white py-16 text-center">

      <h2 className="text-3xl font-bold">
        Subscribe to our Newsletter
      </h2>

      <p className="text-gray-400 mt-2">
        Get the latest news updates
      </p>

      <div className="mt-6 flex justify-center">

        <input
          type="email"
          placeholder="Your email"
          className="px-4 py-3 text-black rounded-l-lg"
        />

        <button className="bg-red-600 px-6 py-3 rounded-r-lg">
          Subscribe
        </button>

      </div>

    </section>
  );
}