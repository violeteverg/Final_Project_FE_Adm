import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";

import {
  setProductId,
  setIsOpen,
  setType,
  setIsDelete,
} from "@/redux/app/slice";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/modal/Modal";
import DeleteProduct from "@/components/deleteProduct/deleteProduct";
import mockProducts from "@/lib/mock/dummyProduct";

export default function CreateProductPage() {
  const dispatch = useDispatch();
  const { isOpen, isDelete } = useSelector((state) => state.app);

  const buttonUpdateHandler = (id) => {
    dispatch(setProductId(id));
    dispatch(setIsOpen(true));
    dispatch(setType("update"));
  };
  const buttonCreateHandler = () => {
    dispatch(setIsOpen(true));
    dispatch(setType("create"));
  };
  const deleteHandler = (id) => {
    console.log(id, "<>");
    dispatch(setIsDelete(true));
  };

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "price",
      selector: (row) => row.price,
    },
    {
      name: "quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className='flex gap-2'>
            <Button
              className='bg-green-300'
              onClick={() => buttonUpdateHandler(row.id)}
            >
              update
            </Button>
            <Button
              className='bg-red-300'
              onClick={() => deleteHandler(row.id)}
            >
              Delete
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
              data={mockProducts}
              fixedHeader
              fixedHeaderScrollHeight='450px'
              selectableRows
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
