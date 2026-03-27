export default function LatestNews() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">

      <h2 className="text-2xl font-bold mb-8">
        Latest News
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {[1,2,3,4,5,6].map((item)=>(
          <div key={item} className="bg-white shadow rounded-xl overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1529101091764-c3526daf38fe"
              className="h-52 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold">
                Global politics shaping the future
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                September 2024
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}