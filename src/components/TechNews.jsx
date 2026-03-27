export default function TechNews() {
  return (
    <section className="bg-white py-14">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-2xl font-bold mb-8">
          Technology News
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {[1,2,3,4].map((item)=>(
            <div key={item}>

              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                className="h-40 w-full object-cover rounded"
              />

              <h4 className="mt-3 text-sm font-semibold">
                Latest innovations in AI robotics
              </h4>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}