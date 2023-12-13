import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SkillInput = ({ label, skills, setSkills }) => {
  const [currentSkill, setCurrentSkill] = useState('');

  const handleInputChange = (event) => {
    setCurrentSkill(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && currentSkill.trim() !== '') {
      event.preventDefault();
      setSkills((prevSkills) => [...prevSkills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-3">
      <label className="text-sm text-center dark:text-gray-400">{label}</label>
      <div className="flex flex-wrap rounded">
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-primary text-white rounded p-1 m-1 flex items-center"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-2 text-white"
              >
                &#x2715;
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={currentSkill}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter skills..."
          className="w-full p-2 border border-gray-300 rounded-md outline-none bg-gray-200 placeholder:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  );
};

SkillInput.propTypes = {
  label: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
  setSkills: PropTypes.func.isRequired,
};

export default SkillInput;
