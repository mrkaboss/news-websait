export default function Podcast() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">

      <h2 className="text-2xl font-bold mb-8">
        Podcasts
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {[1,2,3].map((item)=>(
          <div key={item} className="flex gap-4">

            <img
              src="https://images.unsplash.com/photo-1590608897129-79da98d15969"
              className="w-24 h-24 object-cover rounded"
            />

            <div>

              <h4 className="font-semibold">
                Innovation and technology trends
              </h4>

              <p className="text-gray-500 text-sm">
                20 minutes podcast
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}