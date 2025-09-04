// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="">
//   <h1>Landing page

//   </h1>
//     </div>
//   );
// }

//creating a landing page which will ntake us to the login page
export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">
        School Mock Test System
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage schools, teachers, students, and conduct mock tests seamlessly.
      </p>
      <a
        href="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Go to Login
      </a>
    </div>
  );
}
