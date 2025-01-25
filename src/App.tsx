import React, { useState } from 'react';
import { X, RotateCcw, Calculator } from 'lucide-react';

type Course = {
  grade: string;
  credits: number;
};

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentGrade, setCurrentGrade] = useState('');
  const [currentCredits, setCurrentCredits] = useState('');
  const [showGPA, setShowGPA] = useState(true);

  const gradePoints: { [key: string]: number } = {
    'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const addCourse = () => {
    if (currentGrade && currentCredits) {
      setCourses([...courses, { 
        grade: currentGrade, 
        credits: parseFloat(currentCredits) 
      }]);
      setCurrentGrade('');
      setCurrentCredits('');
    }
  };

  const calculateGPA = () => {
    if (courses.length === 0) return 0;
    
    const totalPoints = courses.reduce((sum, course) => 
      sum + (gradePoints[course.grade] * course.credits), 0);
    const totalCredits = courses.reduce((sum, course) => 
      sum + course.credits, 0);
    
    return (totalPoints / totalCredits).toFixed(2);
  };

  const resetCalculator = () => {
    setCourses([]);
    setCurrentGrade('');
    setCurrentCredits('');
  };

  const gradeButtons = Object.keys(gradePoints).sort().reverse();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            {showGPA ? 'GPA Calculator' : 'CGPA Calculator'}
          </h1>
          <button
            onClick={() => setShowGPA(!showGPA)}
            className="p-2 rounded-full hover:bg-gray-800"
          >
            <Calculator size={24} />
          </button>
        </div>

        {/* Display */}
        <div className="bg-gray-900 p-4 rounded-2xl mb-4">
          <div className="text-right text-4xl font-light mb-2">
            {calculateGPA()}
          </div>
          <div className="text-right text-gray-400">
            {courses.length} course{courses.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Course List */}

        {/* Input Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Reset Button */}
          <button
            onClick={resetCalculator}
            className="col-span-2 bg-gray-600 h-16 rounded-full font-semibold hover:bg-gray-500 transition-colors"
          >
            <RotateCcw className="mx-auto" size={24} />
          </button>

          {/* Credits Input */}
          <input
            type="number"
            value={currentCredits}
            onChange={(e) => setCurrentCredits(e.target.value)}
            placeholder="Credits"
            className="col-span-2 bg-gray-800 rounded-full px-4 text-center"
          />

          {/* Grade Buttons */}
          {gradeButtons.map((grade) => (
            <button
              key={grade}
              onClick={() => setCurrentGrade(grade)}
              className={`${
                currentGrade === grade ? 'bg-white text-black' : 'bg-gray-800'
              } h-16 rounded-full font-semibold hover:opacity-90 transition-colors`}
            >
              {grade}
            </button>
          ))}

          {/* Add Course Button */}
          <button
            onClick={addCourse}
            disabled={!currentGrade || !currentCredits}
            className="col-span-4 bg-orange-500 h-16 rounded-full font-semibold hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Course
          </button>
        </div>
        <div className="mb-4 space-y-2">
          {courses.map((course, index) => (
            <div key={index} className="flex justify-between bg-gray-800 p-2 rounded-lg">
              <span>Grade: {course.grade}</span>
              <span>Credits: {course.credits}</span>
              <button
                onClick={() => setCourses(courses.filter((_, i) => i !== index))}
                className="text-red-500 hover:text-red-400"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;