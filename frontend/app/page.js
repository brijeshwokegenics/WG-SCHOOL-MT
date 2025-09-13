export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            School Mock Test Management System
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-gray-300">
            A secure and scalable platform for managing mock examinations across institutions with ease and precision.
          </p>
          <div className="mt-10">
            <a
              href="/login"
              className="inline-block border border-gray-300 text-white hover:text-gray-900 hover:bg-white transition px-6 py-3 text-sm uppercase tracking-wide"
            >
              Access Login Portal
            </a>
          </div>
        </div>
      </header>

     {/* Features Section */}
<section className="bg-gray-100 py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-medium mb-12 border-l-4 border-blue-800 pl-4">
      Platform Capabilities
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-700">
      <div>
        <h3 className="text-lg font-semibold mb-2">Mock Test Creation</h3>
        <p>
          Easily create subject-wise mock tests with customizable question formats, time limits, and difficulty levels.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Automated Grading</h3>
        <p>
          Instantly grade objective tests with support for custom marking schemes, negative marking, and result breakdowns.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
        <p>
          Analyze student performance across tests, subjects, and terms using intuitive reports and progress charts.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Exam Scheduling</h3>
        <p>
          Schedule mock exams in advance with clear instructions, availability windows, and access controls per class or group.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Secure Test Environment</h3>
        <p>
          Prevent cheating with IP restrictions, time-bound sessions, and randomized question sets for each student.
        </p>
      </div>
     <div>
  <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
  <p>
    Provide tailored access to principal, teachers and students with dedicated dashboards, permissions, and secure access controls.
  </p>
</div>

    </div>
  </div>
</section>


      {/* Call to Action */}
      <section className="bg-white py-16 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-left">
          <h2 className="text-2xl font-medium mb-4">
            Ensure Consistency & Performance in Testing
          </h2>
          <p className="text-gray-600 max-w-2xl mb-6">
            Login to access your dashboard and begin managing academic assessments efficiently and securely.
          </p>
          <a
            href="/login"
            className="inline-block border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition px-6 py-3 text-sm tracking-wide"
          >
            Login to Admin Panel
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-6 px-6 text-center">
        &copy; {new Date().getFullYear()} School Mock Test System. Confidential & Secure.
      </footer>
    </div>
  );
}
