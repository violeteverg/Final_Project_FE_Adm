import { useGetOrderIdQuery } from "@/redux/order/api";

/* eslint-disable react/prop-types */
export default function ExpandedOrderItem({ data }) {
  console.log(data, "ini data order");
  const { data: datas } = useGetOrderIdQuery(
    { id: data?.id },
    { skip: !data?.id }
  );
  console.log(datas?.products, "ini ddatas");
  const orderData = datas?.products;

  return (
    <div className='p-6 bg-white border-t border-gray-200 shadow-md'>
      <h4 className='text-xl font-semibold mb-4'>Order Details</h4>

      {orderData?.map((item, index) => (
        <div key={index} className='flex items-center mb-6 px-6'>
          <img
            className='w-24 h-24 object-cover rounded-md border mr-4'
            src={item.image}
            alt={item.title}
          />
          <div className='flex-1'>
            <p className='text-lg font-medium'>{item.title}</p>
          </div>

          <div className='flex flex-col space-y-3'>
            <div className='flex ml-4 space-x-3'>
              <p className='font-medium'>Quantity:</p>
              <p className='text-gray-600'>{item.quantity}</p>
            </div>
            <div className='flex  ml-4 space-x-3'>
              <p className='font-medium'>Price:</p>
              <p className='text-gray-600'>{item.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
