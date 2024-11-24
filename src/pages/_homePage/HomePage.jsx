/* eslint-disable react/prop-types */
import Navbar from "@/components/navbar/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { useGetStatOrderQuery } from "@/redux/order/api";
import { DollarSign, ShoppingCart, Users } from "lucide-react";

export default function HomePage() {
  const { data } = useGetStatOrderQuery();
  console.log(data);
  function StatCard({ icon, title, value }) {
    return (
      <Card>
        <CardContent className='flex items-center p-6'>
          <div className='mr-4'>{icon}</div>
          <div>
            <p className='text-sm font-medium text-gray-500'>{title}</p>
            <p className='text-2xl font-bold text-teal-700'>{value}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className='flex flex-col w-full h-screen'>
      <Navbar />
      <div className='flex flex-col justify-center mx-4 my-8 space-y-4'>
        <h1 className='text-3xl font-bold text-teal-800 mb-8'>
          Admin Dashboard
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            icon={<Users className='h-8 w-8 text-teal-600' />}
            title='Total Users'
            value={data?.user}
          />
          <StatCard
            icon={<ShoppingCart className='h-8 w-8 text-teal-600' />}
            title='Orders'
            value={data?.totalOrders}
          />
          <StatCard
            icon={<DollarSign className='h-8 w-8 text-teal-600' />}
            title='Revenue'
            value={data?.totalRevenue}
          />
        </div>
      </div>
    </div>
  );
}
