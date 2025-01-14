import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import CollegeSelector from "./components/CollegeSelector";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="text-center text-white space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        {/* <p>Loading, please wait...</p> */}
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isCollegeSelectorOpen, setIsCollegeSelectorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [collegeLists, setCollegeLists] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Loading for 3 seconds

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleNavigation = (page) => {
    if (page === "features") {
      setIsCollegeSelectorOpen(true);
    } else {
      setCurrentPage(page);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return (
          <HomePage
            collegeLists={collegeLists}
            setCollegeLists={setCollegeLists}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800">
      <Header onNavigate={handleNavigation} />
      <CollegeSelector
        isOpen={isCollegeSelectorOpen}
        onClose={() => setIsCollegeSelectorOpen(false)}
        collegeLists={collegeLists}
        setCollegeLists={setCollegeLists}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
