import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProductAction, editProductAction, productList } from "../actions/products";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProductTable from "./ProductTable";
import Loader from "./report/Loader";

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
    available_quantity: "",
    product_image_link: "",
    cmlevel1: "",
    cmlevel2: "",
    cmlevel3: "",
    cmlevel4: "",
    cmlevel5: "",
    cmlevel6: "",
    rclevel1: "",
    rclevel2: "",
    rclevel3: "",
    rclevel4: "",
    rclevel5: "",
    rclevel6: "",
  };
  const editInitialState = {
    name: "",
    price: "",
    validity_in_months: "",
    repurchasedDays: "",
    commission: [],
    repurchase_commission: [],
    description: "",
    available_quantity: "",
    product_image_link: "",
    cmlevel1: "",
    cmlevel2: "",
    cmlevel3: "",
    cmlevel4: "",
    cmlevel5: "",
    cmlevel6: "",
    rclevel1: "",
    rclevel2: "",
    rclevel3: "",
    rclevel4: "",
    rclevel5: "",
    rclevel6: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const editModal = (pid) => {
    setIsEditModalOpen(true);
    let product = allProducts.find(({ id }) => id == pid);
    console.log("1 prod", product);
    let [cmlevel1, cmlevel2, cmlevel3, cmlevel4, cmlevel5, cmlevel6] =
      product.commission;
    let [rclevel1, rclevel2, rclevel3, rclevel4, rclevel5, rclevel6] =
      product.repurchase_commission;
    setEditProduct({
      ...editProduct,
      ...product,
      cmlevel1,
      cmlevel2,
      cmlevel3,
      cmlevel4,
      cmlevel5,
      cmlevel6,
      rclevel1,
      rclevel2,
      rclevel3,
      rclevel4,
      rclevel5,
      rclevel6,
    });
  };

  const deleteModal = (pid) => {
    setDeleteModalOpen(true);
    let product = allProducts.find(({ id }) => id == pid);
    console.log("1 prod", product);
    let [cmlevel1, cmlevel2, cmlevel3, cmlevel4, cmlevel5, cmlevel6] =
      product.commission;
    let [rclevel1, rclevel2, rclevel3, rclevel4, rclevel5, rclevel6] =
      product.repurchase_commission;
    setEditProduct({
      ...product,
      deleted_at: new Date().toISOString()
    });
  };

  const deleteProduct= ()=>{
    dispatch(deleteProductAction(editProduct, navigate)); 
    deleteCloseModal();
  }

  const editCloseModal = () => setIsEditModalOpen(false);
  const deleteCloseModal = () => setDeleteModalOpen(false);
  const [selectedProduct, setSelectedProduct] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [editProduct, setEditProduct] = useState(editInitialState);

  const allProducts = useSelector((state) => state.products.allProducts);
  useEffect(() => {
    dispatch(productList(navigate));
  }, [dispatch]);

  const handleChange1 = (e) => {
    const { name, value, type, files } = e.target;
    setEditProduct((prevEditProduct) => ({
      ...prevEditProduct,
      [name]: type === "file" ? files[0] : value,
    }));
  };

 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files ? files[0] : value,
    }));

    validateInput(name, value);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files ? files[0] : value,
    }));

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
      case "available_quantity":
        if (!value) error = "available_quantity is required";
        else if (isNaN(value)) error = "available_quantity must be a number";
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Removing the 'data:image/jpeg;base64,' part if needed
        console.log('not passing base64String');
        setSelectedProduct((prevProduct) => ({
          ...prevProduct,
          // Below line should be ----  product_image_link: base64String,
          product_image_link: "base64String",
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEditProduct = (e)=>{
    e.preventDefault();
    dispatch(editProductAction(editProduct, navigate));

    console.log("Form Submitted", editProduct);
    setEditProduct(initialState);
  }

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

    dispatch(addProduct(selectedProduct, navigate));

    // Proceed with form submission if no errors
    console.log("Form Submitted", selectedProduct);
    setSelectedProduct(initialState);
    setIsModalOpen(false);
    // Add your form submission logic here
  };
  const userRole = useSelector((state) => state.auth.userRole);
  return (
    <div className="p-4">
      {userRole && userRole == 'admin' && <div className="flex justify-end items-center mb-4">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded flex items-center hover:bg-purple-800"
          onClick={openModal}
          style={{ background: "#3AA6B9" }}
        >
          <span className="mr-2">+</span> Add Product
        </button>
      </div>}
      
      {allProducts && allProducts.length > 0 ? (
        <ProductTable products={allProducts} editModal={editModal} deleteModal={deleteModal}/>
      ) : (
        // <Loader/>
        <h3>No Products Available</h3>
      )}
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
                        required
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
                        required
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
                        required
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.validity_in_months
                            ? "border-red-500"
                            : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.validity_in_months && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.validity_in_months}
                        </p>
                      )}
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="commission"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Purchase Commission
                      </label>
                      <input
                        type="text"
                        id="cmlevel1"
                        name="cmlevel1"
                        placeholder="Level 1"
                        value={selectedProduct.cmlevel1}
                        onChange={handleChange}
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
                        onChange={handleFileChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.product_image_link
                            ? "border-red-500"
                            : "border-zinc-300"
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
                        htmlFor="available_quantity"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Inventory
                      </label>
                      <input
                        type="text"
                        id="available_quantity"
                        name="available_quantity"
                        required
                        value={selectedProduct.available_quantity}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.available_quantity
                            ? "border-red-500"
                            : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.available_quantity && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.available_quantity}
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
                style={{ background: "#3AA6B9" }}
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 dark:bg-zinc-900 dark:bg-opacity-75 transition-opacity"></div>
          <form
            onSubmit={handleEditProduct}
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
                    Edit Product
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
                        value={editProduct.name}
                        onChange={handleEditChange}
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
                        value={editProduct.price}
                        onChange={handleEditChange}
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
                        value={editProduct.validity_in_months}
                        onChange={handleEditChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.validity_in_months
                            ? "border-red-500"
                            : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.validity_in_months && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.validity_in_months}
                        </p>
                      )}
                    </div>
                    <div className="mt-1">
                      <label
                        htmlFor="commission"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Purchase Commission
                      </label>
                      <input
                        type="text"
                        id="cmlevel1"
                        name="cmlevel1"
                        placeholder="Level 1"
                        value={editProduct.cmlevel1}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel2"
                        name="cmlevel2"
                        placeholder="Level 2"
                        value={editProduct.cmlevel2}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel3"
                        name="cmlevel3"
                        placeholder="Level 3"
                        value={editProduct.cmlevel3}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel4"
                        name="cmlevel4"
                        placeholder="Level 4"
                        value={editProduct.cmlevel4}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel5"
                        name="cmlevel5"
                        placeholder="Level 5"
                        value={editProduct.cmlevel5}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="cmlevel6"
                        name="cmlevel6"
                        placeholder="Level 6"
                        value={editProduct.cmlevel6}
                        onChange={handleEditChange}
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
                      <input
                        type="text"
                        id="rclevel1"
                        name="rclevel1"
                        placeholder="Level 1"
                        value={editProduct.rclevel1}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel2"
                        name="rclevel2"
                        placeholder="Level 2"
                        value={editProduct.rclevel2}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel3"
                        name="rclevel3"
                        placeholder="Level 3"
                        value={editProduct.rclevel3}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel4"
                        name="rclevel4"
                        placeholder="Level 4"
                        value={editProduct.rclevel4}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel5"
                        name="rclevel5"
                        placeholder="Level 5"
                        value={editProduct.rclevel5}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        id="rclevel6"
                        name="rclevel6"
                        placeholder="Level 6"
                        value={editProduct.rclevel6}
                        onChange={handleEditChange}
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
                        onChange={handleEditChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.product_image_link
                            ? "border-red-500"
                            : "border-zinc-300"
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
                        value={editProduct.description}
                        onChange={handleEditChange}
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
                        htmlFor="available_quantity"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Inventory
                      </label>
                      <input
                        type="text"
                        id="available_quantity"
                        name="available_quantity"
                        value={editProduct.available_quantity}
                        onChange={handleEditChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.available_quantity
                            ? "border-red-500"
                            : "border-zinc-300"
                        } dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {errors.available_quantity && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.available_quantity}
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
                style={{ background: "#3AA6B9" }}
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
          </form>
        </div>
      )}

      {deleteModalOpen && (
         <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 dark:bg-zinc-900 dark:bg-opacity-75 transition-opacity"></div>
         
         <form
            // onSubmit={handleEditProduct}
            className="inline-block align-bottom bg-white dark:bg-zinc-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-md lg:max-w-sm w-full max-w-xs mx-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="p-8 text-center ">
            <div className="text-lg">
              Are you sure to delete this product
            </div>
            <div className="flex justify-evenly py-3">
              <button onClick={deleteCloseModal} className="text-white px-4 py-2 rounded flex items-center" style={{ background: "#3AA6B9" }}>Cancel</button>
              <button onClick={(e)=>{e.preventDefault()
                 deleteProduct()}} className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600">Delete</button>
            </div>
            </div>
            
            </form>
       </div>
      )}
    </div>
  );
};

export default Product;
