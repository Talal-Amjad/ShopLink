import React ,{useState} from 'react'
import Modal from '../../components/Modal/Modal'
import Fields from '../../components/Fields/Fields'
import Button from '../../components/Buttons/Button'



export default function UpdatePassword({ isOpen, onClose }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit=()=>{}
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" rounded-md">
        <h1 className="font-medium text-[24px] leading-34 text-[#353535] h-9 mb-2 dark:text-gray-400">
          Update Your Password
        </h1>
        <Fields
          label="New Password"
          type="password"
          value={password}
          placeholder=""
          handleChange={(e) => setPassword(e.target.value)}
        />
          <Fields
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          placeholder=""
          handleChange={(e) => setConfirmPassword(e.target.value)}
        />
          <Button
            type="submit"
            text="Update Password"
            onClick={handleSubmit}
           
          />
        <button
          className="w-full py-2 rounded-md outline-none text-primary dark:text-white "
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}
