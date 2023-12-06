import React, { useState } from "react";
import { FiFile } from "react-icons/fi";
import PropTypes from "prop-types";
import Button from "../Buttons/Button";

function FileInput({ label, height }) {
  const [filePreview, setFilePreview] = useState(null);

  // Function to handle file changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
        setFilePreview(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle the "Change File" button click
  const handleChangeFileClick = (e) => {
    e.preventDefault();
  
    // Trigger a click on the hidden file input
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };
  
  const dashedHeightStyle = {
    height: `${height}px`,
  };

  return (
    <div className="border-2 border-dashed h-full dark:text-gray-400 my-2 md:my-4" style={dashedHeightStyle}>
      <label htmlFor="fileInput" className="h-full w-full flex justify-center items-center flex-col">
        {/* Hidden file input */}
        <input
          type="file"
          id="fileInput"
          name="cv"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {filePreview ? (
          // Display when a file is selected
          <>
            <FiFile className="w-5 h-5 font-bold" />
            <p className="text-center">{filePreview}</p>
            <div className="px-2 h-10">
              {/* "Change File" button */}
              <Button text="Change File" onClick={handleChangeFileClick} />
            </div>
          </>
        ) : (
          // Display when no file is selected
          <>
            <FiFile className="w-5 h-5 font-bold" />
            <p>{label}</p>
            <div className="w-10 h-10">
              {/* "+" button to trigger file input click */}
              <Button text="+" onClick={handleChangeFileClick} />
            </div>
          </>
        )}
      </label>
    </div>
  );
}

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default FileInput;
