import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
        delayChildren: 0.5,
        type: 'spring',
        stiffness: 200,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="w-auto mx-auto px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-900">
      <div className="w-auto px-4 sm:px-6 lg:px-8 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
        <motion.div
          className="sm:text-center lg:text-left md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl"
          >
            <span className="block xl:inline"> Transforming </span>
            <motion.span
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="block text-indigo-600 xl:inline"
            >
              {' '}
              {Array.from('Shop Management').map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            Empower your business with data-driven decision-making.
            ShopLink helps you manage multiple shops efficiently.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-3 sm:mt-0 sm:ml-3"
            >
              <a
                href="/signin"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
            alt="Picture"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            exit={{ opacity: 0 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
