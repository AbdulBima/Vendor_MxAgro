import React from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  stock: number;
  sales: number;
  rating: number;
}

interface TableProps {
  products: Product[];
  onEdit: (id: number) => void;
}

const ProductTable: React.FC<TableProps> = ({ products, onEdit }) => {
  return (
    <div className="overflow-x-auto pb-8">
      <table className="min-w-full bg-white font-[sans-serif]">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="pl-6 w-8">
              <input id="checkbox" type="checkbox" className="hidden peer" />
              <label
                htmlFor="checkbox"
                className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000"
                  />
                </svg>
              </label>
            </th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-black">Product</th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-black">Price</th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-black">In stock</th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-black">Sales</th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-black">Rating</th>
            <th className="px-6 py-5 text-left text-sm font-semibold text-black">Action</th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="pl-6 w-8">
                <input id={`checkbox${product.id}`} type="checkbox" className="hidden peer" />
                <label
                  htmlFor={`checkbox${product.id}`}
                  className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                    <path
                      d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                      data-name="7-Check" data-original="#000000"
                    />
                  </svg>
                </label>
              </td>
              <td className="px-6 py-3 text-sm">
                <div className="flex items-center cursor-pointer">
                  <img src={product.image} className="w-10 h-10 p-1.5 shrink-0 bg-gray-100" alt={product.name} />
                  <div className="ml-4">
                    <p className="text-sm text-black">{product.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-3 text-sm">{product.price}</td>
              <td className="px-6 py-3">{product.stock}</td>
              <td className="px-6 py-3">{product.sales}</td>
              <td className="px-6 py-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-[18px] h-4 inline mr-1 ${i < product.rating ? 'fill-[#facc15]' : 'fill-[#CED5D8]'}`}
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                    />
                  </svg>
                ))}
              </td>
              <td className="px-6 py-3">
                <button className="mr-4" title="Edit" onClick={() => onEdit(product.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-gray-500" viewBox="0 0 32 32">
                    <path
                      d="M13 16c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zm0 10c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zm0-20c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3z"
                      data-original="#000000"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
