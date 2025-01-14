import React, { useState } from "react";
import { X, Check } from "lucide-react";

function CollegeSelector({ isOpen, onClose, collegeLists, setCollegeLists }) {
  const [colleges, setColleges] = useState([
    { id: 0, name: "College of Engineering Chengannur", checked: false },
    { id: 3, name: "College of Engineering adoor" },
  ]);

  const handleSelectAll = () => {
    setColleges(colleges.map((college) => ({ ...college, checked: true })));
  };

  const handleUnselectAll = () => {
    setColleges(colleges.map((college) => ({ ...college, checked: false })));
  };

  const handleToggleCollege = (id) => {
    setColleges(
      colleges.map((college) =>
        college.id === id ? { ...college, checked: !college.checked } : college
      )
    );
  };

  const areAllSelected = colleges.every((college) => college.checked);
  const handleDone = () => {
    const selectedColleges = colleges
      .filter((college) => college.checked)
      .map((college) => college.id);
    setCollegeLists(selectedColleges);
    onClose();
    console.log(colleges);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg border border-gray-100 text-gray-500 hover:text-red-500 hover:border-red-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Select Institutions
            </h2>
          </div>

          <div className="mb-4">
            <button
              onClick={areAllSelected ? handleUnselectAll : handleSelectAll}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {areAllSelected ? "Unselect All" : "Select All"}
            </button>
          </div>

          <div className="space-y-2">
            {colleges.map((college) => (
              <label
                key={college.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 cursor-pointer"
              >
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center
                    ${
                      college.checked
                        ? "border-purple-500 bg-purple-500"
                        : "border-gray-300"
                    }`}
                  onClick={() => handleToggleCollege(college.id)}
                >
                  {college.checked && <Check className="h-4 w-4 text-white" />}
                </div>
                <span className="text-gray-700">{college.name}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleDone}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollegeSelector;
