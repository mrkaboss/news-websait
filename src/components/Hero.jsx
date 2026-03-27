export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

      <div className="md:col-span-2">

        <img
          src="https://images.unsplash.com/photo-1495020689067-958852a7765e"
          className="w-full h-[420px] object-cover rounded-xl"
        />

        <h2 className="text-3xl font-bold mt-5">
          Global leaders discuss future of technology
        </h2>

        <p className="text-gray-500 mt-2">
          The world is changing rapidly due to new innovations.
        </p>

      </div>

      <div className="space-y-5">

        {[1,2,3,4].map((item)=>(
          <div key={item} className="flex gap-4">

            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
              className="w-24 h-20 object-cover rounded"
            />

            <h4 className="text-sm font-semibold">
              Understanding artificial intelligence impact
            </h4>

          </div>
        ))}

      </div>

    </section>
  );
}