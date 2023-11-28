import React ,{useState} from 'react'
import Modal from '../../components/Modal/Modal'
import Fields from '../../components/Fields/Fields'
import Button from '../../components/Buttons/Button'
import { useNavigate } from "react-router-dom";
export default function verifyEmail({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const navigate=useNavigate();

    const handleSubmit=()=>{
        navigate('/verifycode');
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" rounded-md">
        <h1 className="font-medium text-[24px] leading-34 text-[#353535] h-9 mb-2 dark:text-gray-400">
          Verify Your Email
        </h1>
        <Fields
          label="Email address"
          type="email"
          value={email}
          placeholder="example@gmail.com"
          handleChange={(e) => setEmail(e.target.value)}
        />
          <Button
            type="submit"
            text="Verify Email"
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
