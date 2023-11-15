import React, { useState } from 'react';
import Fields from '../components/Fields/Fields';
import SkillInput from '../components/Fields/SkillInput';
import Button from '../components/Buttons/Button';
import FileInput from '../components/Fields/FileInput';
const ApplyforJob = () => {
  const [cvOption, setCvOption] = useState(null);
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState('');
  const [address, setaddress] = useState('');
  const [zipcode, setzipcode]=useState('');


  const handleCVOption = (option) => {
    setCvOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center  dark:bg-gray-900">
      <div className="bg-white p-8 rounded shadow-md w-96 m-5  dark:bg-gray-700 ">
        <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold   dark:text-gray-400">Application Form</h1>
        <div className="flex justify-between w-full gap-x-2">
          <div className="w-1/2">
            <Fields label="First Name" type="text"  placeholder="Abc" />
          </div>
          <div className="w-1/2">
            <Fields label="Last Name" type="text"  placeholder="DF" />
          </div>
        </div>
        <Fields
          label="Email address"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
         <Fields
          label="Address"
          type="text"
          placeholder="House No, City, Sate"
          value={address}
          handleChange={(e) => setaddress(e.target.value)}
        />
         <Fields
          label="Zip Code"
          type="number"
          placeholder="123456"
          value={zipcode}
          handleChange={(e) =>  setzipcode(e.target.value)}
        />
        

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Apply with CV or without CV
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="withCV"
                name="cvOption"
                className="mr-2"
                onChange={() => handleCVOption('withCV')}
              />
              <label htmlFor="withCV">Apply with CV</label>
              <input
                type="radio"
                id="withoutCV"
                name="cvOption"
                className="ml-8 mr-2"
                onChange={() => handleCVOption('withoutCV')}
              />
              <label htmlFor="withoutCV">Apply without CV</label>
            </div>
          </div>

          {cvOption === 'withCV' && (
            <FileInput label="Upload your resume" height={150} />
          )}

          {cvOption === 'withoutCV' && (
            <SkillInput
              label="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          )}

          <Button text="Apply" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ApplyforJob;
