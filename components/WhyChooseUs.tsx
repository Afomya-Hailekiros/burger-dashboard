export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative bg-white dark:bg-zinc-950 py-20 px-6 text-center"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20"
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-8">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Fresh Ingredients',
              text: 'We use only the freshest ingredients, sourced daily for peak flavor.',
            },
            {
              title: 'Unique Recipes',
              text: 'Our burgers are crafted with a creative twist and bold flavor combinations.',
            },
            {
              title: 'Fast Delivery',
              text: 'Get your burger fix fast with our lightning-quick delivery service.',
            },
          ].map(({ title, text }, i) => (
            <div
              key={i}
              className="bg-orange-100 dark:bg-zinc-800 p-6 rounded-2xl shadow"
            >
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
