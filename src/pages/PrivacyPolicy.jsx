import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content:
        "We collect personal information such as your name, email address, and usage data when you register, subscribe to our newsletter, or interact with our platform. We also collect technical data including IP addresses, browser type, and pages visited to improve our services.",
    },
    {
      title: "How We Use Your Information",
      content:
        "Your information is used to deliver personalized news content, send newsletters and breaking news alerts, improve our platform performance, respond to your support requests, and ensure the security of your account.",
    },
    {
      title: "Data Sharing",
      content:
        "We do not sell or rent your personal data to third parties. We may share data with trusted service providers who assist in operating our platform, subject to strict confidentiality agreements.",
    },
    {
      title: "Cookies",
      content:
        "Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze traffic patterns. You may disable cookies in your browser settings, though some features may not function properly.",
    },
    {
      title: "Data Security",
      content:
        "We implement industry-standard security measures including SSL encryption to protect your personal information. However, no method of transmission over the internet is 100% secure.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal data at any time. You may also opt out of marketing communications by clicking 'unsubscribe' in any email we send.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions or concerns about this Privacy Policy, please contact us at privacy@globalnews.com or through the Contact page on our website.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

  
      <div className="bg-gray-900 text-white py-16 px-6 text-center">
        <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Last updated: May 20, 2026 · Global News
        </p>
      </div>

      
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-8">

        
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 leading-relaxed">
            This Privacy Policy explains how <strong>Global News</strong> collects,
            uses, and protects your personal information when you use our services.
            By using our platform, you agree to the terms described in this policy.
          </p>
        </div>

        {sections.map((section, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-xs font-black shrink-0">
                {i + 1}
              </div>
              <h2 className="text-lg font-black text-gray-900">{section.title}</h2>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm">{section.content}</p>
          </div>
        ))}

      
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}