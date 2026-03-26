import { Link } from "react-router-dom";

const features = [
  {
    title: "Verified Caregivers",
    description: "Every caregiver passes rigorous background checks and credential verification before joining our platform.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Background Checks",
    description: "Comprehensive criminal background checks, reference verification, and ongoing monitoring for your peace of mind.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
  },
  {
    title: "Flexible Scheduling",
    description: "Book care when you need it -- mornings, afternoons, evenings, weekdays, or weekends. Your schedule, your choice.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Secure Payments",
    description: "Safe, transparent payments with clear pricing. No hidden fees. Caregivers get paid promptly after each booking.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

const steps = [
  { step: "1", title: "Tell Us Your Needs", description: "Share your loved one's care requirements, preferred schedule, and budget." },
  { step: "2", title: "Get Matched", description: "We match you with verified caregivers who fit your specific needs and preferences." },
  { step: "3", title: "Begin Care", description: "Book your caregiver and start receiving compassionate, professional home care." },
];

const testimonials = [
  {
    quote: "Finding Maria through LocalCare was a blessing. She treats my mother like her own family. The peace of mind is priceless.",
    author: "Sarah Johnson",
    role: "Daughter of Dorothy, 82",
  },
  {
    quote: "The matching process was so thoughtful. They found a Cantonese-speaking caregiver who connects beautifully with my father.",
    author: "Lisa Chen",
    role: "Daughter of Wei, 88",
  },
  {
    quote: "As a caregiver, LocalCare treats me as a professional. Fair pay, good families, and a supportive platform. I love my work here.",
    author: "Priya Patel",
    role: "Certified Nursing Assistant",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-rose-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-rose-600 bg-clip-text text-transparent">
                LocalCare
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/app"
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-rose-500 text-white text-sm font-medium rounded-full hover:from-purple-700 hover:to-rose-600 transition-all shadow-md shadow-purple-200"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-rose-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
            Compassionate Care,
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
              Right at Home
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with verified, certified home health aides who provide personalized
            elder care with warmth, dignity, and professionalism.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/app/caregivers"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-rose-500 text-white text-lg font-semibold rounded-full hover:from-purple-700 hover:to-rose-600 transition-all shadow-lg shadow-purple-200"
            >
              Find a Caregiver
            </Link>
            <Link
              to="/app"
              className="w-full sm:w-auto px-8 py-4 bg-white text-purple-700 text-lg font-semibold rounded-full border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              Become a Caregiver
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "2,000+", label: "Families Served" },
              { value: "500+", label: "Verified Caregivers" },
              { value: "4.8", label: "Average Rating" },
              { value: "50,000+", label: "Hours of Care" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Families Trust LocalCare
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure your loved ones receive the highest quality care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Getting started with LocalCare is simple.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-600 to-rose-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-purple-200">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What Our Community Says
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">No hidden fees. No surprises.</p>
          </div>
          <div className="max-w-lg mx-auto bg-gradient-to-br from-purple-600 to-rose-500 rounded-3xl p-8 text-white text-center shadow-xl shadow-purple-200">
            <p className="text-purple-200 font-medium">Platform Fee</p>
            <p className="mt-2 text-5xl font-bold">15%</p>
            <p className="mt-2 text-purple-100">commission per booking</p>
            <div className="mt-6 space-y-3 text-left">
              {[
                "Free to sign up for families and caregivers",
                "Pay only when you book care",
                "Caregivers set their own hourly rates",
                "Secure payment processing included",
                "Background checks included for caregivers",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-200 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ready to Find the Right Care?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of families who have found compassionate, reliable care through LocalCare.
          </p>
          <div className="mt-8">
            <Link
              to="/app"
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-rose-500 text-white text-lg font-semibold rounded-full hover:from-purple-700 hover:to-rose-600 transition-all shadow-lg shadow-purple-200"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-rose-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">LocalCare</span>
            </div>
            <p className="text-sm">2026 LocalCare. Compassionate Care, Right at Home.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
