import Navbar from "@/components/navbar/Navbar";
import { setPage, setLimit } from "@/redux/app/slice";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useDeferredValue, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useGetOrderQuery } from "@/redux/order/api";
import ExpandedOrderItem from "@/components/expandedOrderItem/ExpandedOrderItem";
import { Button } from "@/components/ui/button";
import { downloadCSV, formatDate } from "@/lib/utils";

export default function OrderManagemnetPage() {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state) => state.app);
  const [searchTerm, setSearchTerm] = useState("");
  const searchDebounced = useDeferredValue(searchTerm, { timeoutMs: 500 });

  const { data, isLoading, isFetching } = useGetOrderQuery({
    page,
    limit,
    search: searchDebounced,
  });
  const totalData = data?.result?.pagination;
  const loading = isLoading || isFetching;

  const products = useMemo(() => {
    return data ? data?.result : [];
  }, [data]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleLimitChange = (limit) => {
    dispatch(setLimit(limit));
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log(products, "ini product");

  const columns = [
    {
      name: "No",
      selector: (_, index) => (page - 1) * limit + index + 1,
    },
    {
      name: "Order Id",
      selector: (row) => row.orderId,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => formatDate(row.orderDate),
      sortable: true,
    },
    {
      name: "Order status",
      selector: (row) => row.orderStatus,
    },
    {
      name: "user",
      selector: (row) => row.User.fullName,
      sortable: true,
    },
    {
      name: "total amount",
      selector: (row) => row.totalAmount,
    },
  ];

  return (
    <>
      <div className='flex flex-col w-full h-screen'>
        <Navbar />

        <div className='flex flex-col justify-center mx-4 my-8 space-y-4'>
          <h1 className='text-3xl font-semibold '>Order management</h1>
          <div className='flex justify-between items-center'>
            <Button
              onClick={() => downloadCSV(products?.data)}
              className='bg-green-700 text-white w-[30%] lg:w-[10%]'
            >
              Export to CSV
            </Button>

            <div className='relative w-fit md:w-[500px] lg:w-[500px]'>
              <Search className='absolute z-10 top-0 bottom-0 w-6 h-6 my-auto text-slate-800 left-3' />
              <Input
                type='text'
                placeholder='Search Product'
                className='pl-12 pr-4'
                value={searchTerm}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='border '>
            <DataTable
              progressPending={loading}
              columns={columns}
              data={products?.data}
              fixedHeader
              fixedHeaderScrollHeight='450px'
              responsive={true}
              expandableRows
              expandableRowsComponent={ExpandedOrderItem}
              pagination
              paginationServer
              paginationTotalRows={totalData?.totalItems}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
