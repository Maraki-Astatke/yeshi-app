import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.href = "/"}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-xl">✈</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              MakiTravel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link to="/">
              <Button variant="outline" className="rounded-xl">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, make a booking, or contact us. This may include your name, email address, phone number, payment information, and travel preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use your information to process bookings, communicate with you about your trips, provide customer support, and improve our services. We may also send you promotional emails about special offers and new destinations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">3. Information Sharing</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We do not sell your personal information. We may share your information with travel partners (hotels, airlines, tour operators) to fulfill your bookings. We may also disclose information when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">4. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">5. Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              You may access, update, or delete your account information at any time by logging into your dashboard. You may also request that we delete your personal data, subject to certain exceptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">6. Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can disable cookies in your browser settings, but this may affect functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">7. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              📧 <a href="mailto:marakiyeshi@gmail.com" className="text-emerald-600 hover:underline">marakiyeshi@gmail.com</a>
            </p>
          </section>
        </div>

        <div className="mt-10 p-4 bg-gray-100 dark:bg-slate-800 rounded-xl text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By using MakiTravel, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MakiTravel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;