import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, productList } from "../actions/products";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProductTable from "./ProductTable";

const Product = () => {
  const initialState = {
    adminid: "",
    name: "",
    price: "",
    validity_in_months: "",
    repurchasedDays: "",
    commission: [],
    repurchase_commission: [],
    description: "",
    inventory: "",
    product_image_link: "",
    cmlevel1:"",
    cmlevel2:"",
    cmlevel3:"",
    cmlevel4:"",
    cmlevel5:"",
    cmlevel6:"",
    rclevel1:"",
    rclevel2:"",
    rclevel3:"",
    rclevel4:"",
    rclevel5:"",
    rclevel6:""
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const dispatch =  useDispatch();
 const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const editModal = () => setIsEditModalOpen(true);
  const editCloseModal = () => setIsEditModalOpen(false);
  const [selectedProduct, setSelectedProduct] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    price: "",
    validity_in_months: "",
    repurchasedDays: "",
    commission: "level1",
    repurchase_commission: "level1",
    description: "",
    inventory: "",
  });

  const allProducts = useSelector((state)=>state.products.allProducts)
  useEffect(() => {
    dispatch(productList());
  }, [])
  

  const handleChange1 = (e) => {
    const { name, value, type, files } = e.target;
    setEditProduct((prevEditProduct) => ({
      ...prevEditProduct,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSave1 = (e) => {
    e.preventDefault();
    console.log(editProduct);
    // Add your logic here to insert the form data
    // For example, you can make an API call to save the data
    // After inserting the data, you can close the modal and reset the form
    editCloseModal(); // Close the modal
    setEditProduct({
      // Reset the form fields
      id: "",
      name: "",
      price: "",
      img: "",
      validity_in_months: "",
      repurchasedDays: "",
      commission: "level1",
      repurchase_commission: "level1",
      description: "",
      inventory: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files ? files[0] : value,
    }));

    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Name is required";
        break;
      case "price":
        if (!value) error = "Price is required";
        else if (isNaN(value)) error = "Price must be a number";
        break;
      case "validity_in_months":
        if (!value) error = "Validity is required";
        else if (isNaN(value)) error = "Validity must be a number";
        break;
      case "repurchasedDays":
        if (!value) error = "Repurchased days are required";
        else if (isNaN(value)) error = "Repurchased days must be a number";
        break;
      case "inventory":
        if (!value) error = "Inventory is required";
        else if (isNaN(value)) error = "Inventory must be a number";
        break;
      case "description":
        if (!value) error = "Description is required";
        break;
      case "image":
        if (!value) error = "Image is required";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSave = (e) => {
    e.preventDefault();


    const newErrors = {};
    Object.keys(selectedProduct).forEach((key) => {
      validateInput(key, selectedProduct[key]);
      if (errors[key]) newErrors[key] = errors[key];
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addProduct(selectedProduct,navigate));

    // Proceed with form submission if no errors
    console.log("Form Submitted", selectedProduct);
    setSelectedProduct(initialState);
    setIsModalOpen(false);
    // Add your form submission logic here
  };

  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded flex items-center hover:bg-purple-800"
          onClick={openModal}
        >
          <span className="mr-2">+</span> Add Product
        </button>
      </div>
      {allProducts &&  allProducts.length>0 ? <ProductTable products={allProducts} editModal={editModal}/> 
     : <div>No Products found</div>
     }
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 dark:bg-zinc-900 dark:bg-opacity-75 transition-opacity"></div>
          <form
            onSubmit={handleSave}
            className="inline-block align-bottom bg-white dark:bg-zinc-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-md lg:max-w-sm w-full max-w-xs mx-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-white dark:bg-zinc-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto max-h-[80vh]">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3
                    className="text-lg leading-6 font-medium text-zinc-900 dark:text-zinc-200"
                    id="modal-title"
                  >
                    Product Information
                  </h3>
                  <div className="mt-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={selectedProduct.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.name ? "border-red-500" : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={selectedProduct.price}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.price ? "border-red-500" : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.price && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.price}
                        </p>
                      )}
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="validity_in_months"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Validity (in months)
                      </label>
                      <input
                        type="text"
                        id="validity_in_months"
                        name="validity_in_months"
                        value={selectedProduct.validity_in_months}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.validity_in_months ? "border-red-500" : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.validity_in_months && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.validity_in_months}
                        </p>
                      )}
                    </div>
                    {/* <div className="mt-1">
                      <label
                        htmlFor="repurchasedDays"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Necessary Repurchased (in days)
                      </label>
                      <input
                        type="text"
                        id="repurchasedDays"
                        name="repurchasedDays"
                        value={selectedProduct.repurchasedDays}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.repurchasedDays
                            ? "border-red-500"
                            : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.repurchasedDays && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.repurchasedDays}
                        </p>
                      )}
                    </div> */}
                    <div className="mt-1">
                      <label
                        htmlFor="commission"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Purchase Commission
                      </label>
                      {/* <select
                        id="commission"
                        name="commission"
                        value={selectedProduct.commission}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="level1">Level 1</option>
                        <option value="level2">Level 2</option>
                        <option value="level3">Level 3</option>
                        <option value="level4">Level 4</option>
                        <option value="level5">Level 5</option>
                        <option value="level6">Level 6</option>
                      </select> */}
                      <input
                        type="text"
                        id="cmlevel1"
                        name="cmlevel1"
                        placeholder="Level 1"
                        value={selectedProduct.cmlevel1}
                        onChange={(handleChange)}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel2"
                        name="cmlevel2"
                        placeholder="Level 2"
                        value={selectedProduct.cmlevel2}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel3"
                        name="cmlevel3"
                        placeholder="Level 3"
                        value={selectedProduct.cmlevel3}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel4"
                        name="cmlevel4"
                        placeholder="Level 4"
                        value={selectedProduct.cmlevel4}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel5"
                        name="cmlevel5"
                        placeholder="Level 5"
                        value={selectedProduct.cmlevel5}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel6"
                        name="cmlevel6"
                        placeholder="Level 6"
                        value={selectedProduct.cmlevel6}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="repurchase_commission"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Repurchase Commission
                      </label>
                      {/* <select
                        id="repurchase_commission"
                        name="repurchase_commission"
                        value={selectedProduct.repurchase_commission}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="level1">Level 1</option>
                        <option value="level2">Level 2</option>
                        <option value="level3">Level 3</option>
                        <option value="level4">Level 4</option>
                        <option value="level5">Level 5</option>
                        <option value="level6">Level 6</option>
                      </select> */}
                      <input
                        type="text"
                        id="rclevel1"
                        name="rclevel1"
                        placeholder="Level 1"
                        value={selectedProduct.rclevel1}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel2"
                        name="rclevel2"
                        placeholder="Level 2"
                        value={selectedProduct.rclevel2}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel3"
                        name="rclevel3"
                        placeholder="Level 3"
                        value={selectedProduct.rclevel3}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel4"
                        name="rclevel4"
                        placeholder="Level 4"
                        value={selectedProduct.rclevel4}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel5"
                        name="rclevel5"
                        placeholder="Level 5"
                        value={selectedProduct.rclevel5}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel6"
                        name="rclevel6"
                        placeholder="Level 6"
                        value={selectedProduct.rclevel6}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        id="product_image_link"
                        name="product_image_link"
                        accept="image/*"
                        onChange={(e)=>{setSelectedProduct({...selectedProduct,product_image_link:e.target.files[0]})}}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.product_image_link ? "border-red-500" : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.product_image_link && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.product_image_link}
                        </p>
                      )}
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        value={selectedProduct.description}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.description
                            ? "border-red-500"
                            : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      ></textarea>
                      {errors.description && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="inventory"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Inventory
                      </label>
                      <input
                        type="text"
                        id="inventory"
                        name="inventory"
                        value={selectedProduct.inventory}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.inventory
                            ? "border-red-500"
                            : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.inventory && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.inventory}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-600 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-zinc-300 dark:border-zinc-600 shadow-sm px-4 py-2 bg-white dark:bg-zinc-700 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isEditModalOpen && (
        <form onSubmit={handleSave1}>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 dark:bg-zinc-900 dark:bg-opacity-75 transition-opacity"></div>
            <div
              className="inline-block align-bottom bg-white dark:bg-zinc-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-md lg:max-w-sm w-full max-w-xs mx-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="bg-white dark:bg-zinc-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto max-h-[80vh]">
                <h3
                  className="text-lg leading-6 font-medium text-zinc-900 dark:text-zinc-200 w-full"
                  id="modal-title"
                >
                  Edit Product
                </h3>
                <div className="mt-4">
                  <div>
                    <label
                      htmlFor="pname"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="pname"
                      name="name"
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={editProduct.name}
                      onChange={handleChange1}
                    />
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={editProduct.price}
                      onChange={handleChange1}
                    />
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleChange1}
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="validity_in_months"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Validity (in months)
                    </label>
                    <input
                      type="text"
                      id="validity_in_months"
                      name="validity_in_months"
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={editProduct.validity_in_months}
                      onChange={handleChange1}
                    />
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="repurchasedDays"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Necessary Repurchased (in days)
                    </label>
                    <input
                      type="text"
                      id="repurchasedDays"
                      name="repurchasedDays"
                      value={editProduct.repurchasedDays}
                      onChange={handleChange1}
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="commission"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Purchase Commission
                    </label>
                    <select
                      id="commission"
                      name="commission"
                      value={editProduct.commission}
                      onChange={handleChange1}
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="level1">Level 1</option>
                      <option value="level2">Level 2</option>
                      <option value="level3">Level 3</option>
                    </select>
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="repurchase_commission"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Purchase Commission
                    </label>
                    <select
                      id="repurchase_commission"
                      name="repurchase_commission"
                      value={editProduct.repurchase_commission}
                      onChange={handleChange1}
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="level1">Level 1</option>
                      <option value="level2">Level 2</option>
                      <option value="level3">Level 3</option>
                    </select>
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={editProduct.description}
                      onChange={handleChange1}
                    ></textarea>
                  </div>
                  <div className="mt-1">
                    <label
                      htmlFor="product_inventory"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Inventory
                    </label>
                    <input
                      type="text"
                      id="inventory"
                      name="inventory"
                      value={editProduct.inventory}
                      onChange={handleChange1}
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-600 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-zinc-300 dark:border-zinc-600 shadow-sm px-4 py-2 bg-white dark:bg-zinc-700 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={editCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Product;
