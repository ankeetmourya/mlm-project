import React, { useRef,useState } from "react";
import designerImage from '../../public/assets/img1.jpg';
import { IoAlarmSharp,IoSettings,IoBagHandle  } from "react-icons/io5";
import { FaArrowsAlt ,FaUndo } from "react-icons/fa";
import { FiSlack } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { NavLink } from "react-router-dom";

const LandingPage = () => {

  const data = {
    name:"",
    address:"",
    city:"",
    state:"",
    phone:"",
    email:""
  }

  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(data)
  
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   event.preventDefault();
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   console.log()
  //   setIsSubmitted(true);

  //   // Hide the dialog box after 3 seconds
  //   setTimeout(() => {
  //     setIsSubmitted(false);
  //   }, 4000);
  // };


  const sectionStyle = {
    backgroundImage: `url(${designerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const scrollToSectionRef = useRef(null);
  // Function to handle button click and scroll to section
  const handleButtonClick = () => {
    scrollToSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <header
        className="bg-zinc-800 text-white p-4 flex justify-between items-center"
        style={{ backgroundColor: "#3AA6B9" }}
      >
        <div className="text-2xl font-bold">
          <span className="text-black">Business Opportunity</span>
        </div>
        <div className="text-sm">
          <span>(800) 345-6789 | </span>
          <span>info@s1shoppy.com | </span>
           <NavLink
              to="/login"
            >
              <span className="mt-6 bg-red-500 text-white py-2 px-4 rounded">Login</span>
            </NavLink>
        </div>
      </header>

      <section
        className="relative bg-cover bg-center h-96"
        style={sectionStyle}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white p-8">
          <h1 className="text-4xl font-bold">START YOUR NEW BUSINESS TODAY</h1>
          <p className="mt-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, quis eaque
            ipsa quae ab illo inventore veritatis.
          </p>
          <button
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            GET STARTED
          </button>
        </div>
      </section>

      <section className="py-12 text-center">
        <div className="container mx-auto flex flex-wrap justify-around">
          <div className="w-1/3 p-4 flex flex-col items-center">
            <div className="text-6xl mb-4">
              <FiSlack />
            </div>
            <h3 className="text-xl font-bold">NO LIMITATIONS</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div className="w-1/3 p-4 flex flex-col items-center">
            <div className="text-6xl mb-4">
              <IoAlarmSharp />
            </div>
            <h3 className="text-xl font-bold">NO LIMITATIONS</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div className="w-1/3 p-4 flex flex-col items-center">
            <div className="text-6xl mb-4">
              <FaArrowsAlt />
            </div>
            <h3 className="text-xl font-bold">NO LIMITATIONS</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-800 text-white py-12">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-bold">CREATE YOUR BUSINESS</h2>
            <p className="mt-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p className="mt-4">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum
              fugiat quo voluptas nulla pariatur. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
              sed quia.
            </p>
            <button className="mt-6 bg-red-500 text-white py-2 px-4 rounded">
              GET STARTED
            </button>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <img
              src="./assets/img2.jpg"
              alt="Create Your Business"
              className="rounded"
            />
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold">HOW IT WORKS</h2>
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-full sm:w-1/2 md:w-1/4 p-4 items-center">
              <div className="text-6xl mb-4 flex items-center justify-center">
                <IoSettings />
              </div>
              <h3 className="text-xl font-bold">AUTOMATION</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4 items-center">
              <div className="text-6xl mb-4 flex items-center justify-center">
              <MdPayment />
              </div>
              <h3 className="text-xl font-bold">RECURRING PAYMENTS</h3>
              <p className="text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4 items-center">
              <div className="text-6xl mb-4 flex items-center justify-center">
              <FaUndo />
              </div>
              <h3 className="text-xl font-bold">INTUITIVE</h3>
              <p className="text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4 items-center">
              <div className="text-6xl mb-4 flex items-center justify-center">
              <IoBagHandle />
              </div>
              <h3 className="text-xl font-bold">EXTENSIBLE</h3>
              <p className="text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-800 text-white py-12">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2 p-4">
            <img
              src="./assets/img3.jpg"
              alt="100% Online & Secure"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-bold">100% ONLINE & SECURE</h2>
            <p className="mt-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p className="mt-4">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum
              fugiat quo voluptas nulla pariatur. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
              sed quia.
            </p>
            <button className="mt-6 bg-red-500 text-white py-2 px-4 rounded">
              GET STARTED
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold">TESTIMONIALS</h2>
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <p className="italic">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat."
              </p>
              <p className="mt-4 font-bold">JOHN SMITH</p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <p className="italic">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat."
              </p>
              <p className="mt-4 font-bold">KIMBERLY CARTER</p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <p className="italic">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat."
              </p>
              <p className="mt-4 font-bold">DANIEL SCOTT</p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 p-4">
              <p className="italic">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat."
              </p>
              <p className="mt-4 font-bold">LINDA HILL</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section
      ref={scrollToSectionRef}
      className="bg-red-500 text-white py-12 text-center"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold">START YOUR NEW BUSINESS TODAY</h2>
        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className="p-2 rounded md:w-full"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            className="p-2 rounded md:w-full"
            onChange={handleChange}
            value={formData.address}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            className="p-2 rounded md:w-full"
            onChange={handleChange}
            value={formData.city}
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            className="p-2 rounded md:w-full"
            onChange={handleChange}
            value={formData.state}
          />
          <input
            type="text"
            placeholder="Phone"
            name="mobile"
            className="p-2 rounded md:w-full"
            required
            onChange={handleChange}
            value={formData.mobile}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="p-2 rounded md:w-full"
            required
            onChange={handleChange}
            value={formData.email}
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded w-full md:w-auto"
            >
              GET STARTED
            </button>
          </div>
        </form>
        {isSubmitted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-6 rounded shadow-lg">
              <p>Submitted Successfully</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section> */}

      <footer className="bg-zinc-800 text-white py-4 text-center">
        <p>&copy; Copyright 2024-2025. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
