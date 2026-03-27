function VerifyEmail() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>

        <p className="text-gray-600">
          We sent a verification link to your email.
        </p>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Resend Email
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;