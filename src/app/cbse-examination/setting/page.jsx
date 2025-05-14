function Setting() {
  return (
    <div className="p-4 md:p-6">
      {/* Heading */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Setting</h3>
      </div>

      {/* Alert Message */}
      <div className="bg-red-100 border border-red-600 text-red-700 rounded-md p-4 shadow-sm">
        <p className="text-sm md:text-base">
          You are using the registered version of <strong>Smart School CBSE Examination Addon</strong>.
        </p>
      </div>
    </div>
  );
}

export default Setting;