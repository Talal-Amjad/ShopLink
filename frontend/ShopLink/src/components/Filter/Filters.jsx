import Modal from "../Modal/Modal";
import Button from "../Buttons/Button";
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Filters({ onClose, isOpen }) {
  const [notification, setNotification] = useState('');

  const validationSchema = Yup.object().shape({
    fromSalary: Yup.number().min(0, 'Salary must be greater than or equal to 0'),
    toSalary: Yup.number().when('fromSalary', (fromSalary, schema) =>
      fromSalary ? schema.min(fromSalary, 'To Salary must be greater than From Salary') : schema
    ),
    lastDate: Yup.date().min(new Date(), 'Date must be greater than or equal to today')
  });

  const initialValues = {
    fromSalary: '',
    toSalary: '',
    lastDate: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} position="right">
      <h1 className="font-manrope font-semibold text-xl leading-[32.78px] text-[#191D23] mb-2 mx-6 dark:text-gray-400">
        Filters
      </h1>
      <hr className="m-4" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mx-6">
            <h1 className="font-manrope font-semibold mx-0 text-l leading-[32.78px] text-[#191D23] mb-2 dark:text-gray-400">
              Salary Range
            </h1>
            <div className="flex justify-between">
              <Field
                name="fromSalary"
                type="number"
                placeholder="From"
                className="border-gray-300 border p-2 rounded-md w-full"
              />
              <div className="mx-2"></div>
              <Field
                name="toSalary"
                type="number"
                placeholder="To"
                className="border-gray-300 border p-2 rounded-md w-full"
              />
            </div>
            <ErrorMessage name="fromSalary" component="div" className="text-red-500" />
            <ErrorMessage name="toSalary" component="div" className="text-red-500" />

            <h1 className="font-manrope font-semibold mx-0 text-l leading-[32.78px] text-[#191D23] mb-2 dark:text-gray-400">
              Last Date to Apply 
            </h1>

            <Field
              name="lastDate"
              type="date"
              className="border-gray-300 border p-2 rounded-md w-full"
            />
            <ErrorMessage name="lastDate" component="div" className="text-red-500" />

            {notification && <div className="text-red-500">{notification}</div>}
            <hr className="mt-10 mb-4 mx-0" />
            <div className="flex justify-between mb-2">
              <Button
                type="button"
                text="Close"
                onClick={onClose}
              />
              <div className="mx-2"></div>
              <Button
                type="submit"
                text="Apply Filter"
               
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default Filters;
