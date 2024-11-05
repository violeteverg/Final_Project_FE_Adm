import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import {
  setProductId,
  setIsOpen,
  setType,
  setIsDelete,
  setCheckboxValue,
} from "@/redux/app/slice";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/modal/Modal";
import DeleteProduct from "@/components/deleteProduct/deleteProduct";
// import mockProducts from "@/lib/mock/dummyProduct";
import { useGetProductQuery } from "@/redux/product/api";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductManagemnetPage() {
  const dispatch = useDispatch();
  const { isOpen, isDelete } = useSelector((state) => state.app);
  const { data } = useGetProductQuery();
  console.log(data?.result, "ini adalah data product");

  const products = useMemo(() => {
    return data ? data?.result : [];
  }, [data]);

  const buttonUpdateHandler = (id) => {
    dispatch(setProductId(id));
    dispatch(setIsOpen(true));
    dispatch(setType("update"));
  };
  const buttonCreateHandler = () => {
    dispatch(setIsOpen(true));
    dispatch(setType("create"));
  };

  const checkboxhandler = (id, value) => {
    dispatch(setProductId(id));
    dispatch(setIsDelete(true));
    dispatch(setCheckboxValue({ isActive: value }));
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Active",
      cell: (row) => {
        return (
          <Label className='relative flex justify-between items-center py-2 text-xl'>
            <Input
              type='checkbox'
              isToggle={true}
              checked={row.isActive}
              onChange={(e) => checkboxhandler(row.id, e?.target?.checked)}
            />
            <span
              className='w-14 h-8 flex items-center flex-shrink-0  p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 
                after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1'
            ></span>
          </Label>
        );
      },
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div className='flex gap-2'>
            <Button
              className='bg-green-300'
              onClick={() => buttonUpdateHandler(row.id)}
            >
              update
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className='flex flex-col w-full h-screen'>
        <Navbar />

        <div className='flex flex-col justify-center mx-4 my-8 space-y-4'>
          <h1 className='text-3xl font-semibold '>Product manajement</h1>
          <Button
            className='bg-green-700 text-white w-[30%] lg:w-[10%]'
            onClick={buttonCreateHandler}
          >
            Create Product
          </Button>
          <div className='border '>
            <DataTable
              columns={columns}
              data={products?.data}
              fixedHeader
              fixedHeaderScrollHeight='450px'
              responsive={true}
              pagination
            />
          </div>
        </div>
      </div>
      {isOpen && <Modal />}
      {isDelete && <DeleteProduct />}
    </>
  );
}
