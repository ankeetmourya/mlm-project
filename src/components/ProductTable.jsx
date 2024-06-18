import React from "react";
import { useSelector } from "react-redux";

const ProductTable = ({ products, editModal,deleteModal }) => {
  console.log(products);

  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <div className="p-4">
      <div className="overflow-x-auto max-h-[420px]">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-2 sm:px-4 text-left">ID</th>
              <th className="py-2 px-2 sm:px-4 text-left">Name</th>
              <th className="py-2 px-2 sm:px-4 text-left">Description</th>
              <th className="py-2 px-2 sm:px-4 text-left">Price</th>
              <th className="py-2 px-2 sm:px-4 text-left">
                Available Quantity
              </th>
              <th className="py-2 px-2 sm:px-4 text-left">Validity (months)</th>
              <th className="py-2 px-2 sm:px-4 text-left">Commission</th>
              <th className="py-2 px-2 sm:px-4 text-left">
                Repurchase Commission
              </th>
              {/* <th className="py-2 px-2 sm:px-4 text-left">Image Link</th> */}
              {userRole && userRole == "admin" && (
                <th className="py-2 px-2 sm:px-4 text-left">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2 px-2 sm:px-4 whitespace-nowrap">
                    {product.id}
                  </td>
                  <td className="py-2 px-2 sm:px-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="py-2 px-2 sm:px-4 whitespace-nowrap">
                    {product.description}
                  </td>
                  <td className="py-2 px-2 sm:px-4 whitespace-nowrap">
                    {product.price}
                  </td>
                  <td className="py-2 px-2 sm:px-4 whitespace-nowrap">
                    {product.available_quantity}
                  </td>
                  <td className="py-2 px-2 sm:px-4 whitespace-nowrap">
                    {product.validity_in_months}
                  </td>
                  <td className="py-2 px-2 sm:px-4 whitespace-nowrap">
                    {product.commission.map((item) => item || 0).join(", ")}
                  </td>
                  <td className="py-2 px-2 sm:px-4 whitespace-nowrap">
                    {product.repurchase_commission
                      .map((item) => item || 0)
                      .join(", ")}
                  </td>
                  {/* <td className="py-2 px-2 sm:px-4 whitespace-nowrap">
                    {product.product_image_link}
                  </td> */}
                  {userRole && userRole == "admin" && (
                    <td className="py-2 px-2 sm:px-4 text-sm flex space-x-2">
                      <i
                        className="fas fa-edit text-blue-500 cursor-pointer"
                        onClick={() => editModal(product.id)}
                      ></i>                      
                      <i className="fas fa-trash text-red-500 cursor-pointer" onClick={()=>(
                        deleteModal(product.id)
                      )}></i>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
