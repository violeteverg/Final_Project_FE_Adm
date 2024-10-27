/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";

import DropdownCategory from "../dropdownCategory/DropdownCategory";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function FormProduct({ defaultValues }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (val) => {
    console.log(val, "value");
  };

  return (
    <form
      className='grid items-start gap-4 mx-4 my-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='grid gap-2'>
        <Label>Title</Label>
        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder='Product Title'
            />
          )}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div className='grid gap-2'>
        <Label>Description</Label>
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder='Product Description'
            />
          )}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div className='grid gap-2'>
        <Label>Price</Label>
        <Controller
          control={control}
          name='price'
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={(e) => onChange(parseFloat(e.target.value))}
              value={value}
              type='number'
              placeholder='Product Price'
            />
          )}
        />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      <div className='grid gap-2'>
        <Label>Quantity</Label>
        <Controller
          control={control}
          name='quantity'
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={(e) => onChange(parseInt(e.target.value))}
              value={value}
              type='number'
              placeholder='Product Quantity'
            />
          )}
        />
        {errors.quantity && <p>{errors.quantity.message}</p>}
      </div>

      <div className='grid gap-2'>
        <Label>Image</Label>
        <Controller
          control={control}
          name='image'
          render={({ field: { onChange, value } }) => (
            <Input onChange={onChange} value={value} placeholder='Image URL' />
          )}
        />
        {errors.image && <p>{errors.image.message}</p>}
      </div>

      <div className='grid gap-2'>
        <Label>Category</Label>
        <Controller
          control={control}
          name='categoryId'
          render={({ field: { onChange, value } }) => (
            <DropdownCategory value={value} onChange={onChange} />
          )}
        />
        {errors.categoryId && <p>{errors.categoryId.message}</p>}
      </div>

      {/* <div className='grid gap-2'>
        <Label>Discount</Label>
        <Controller
          control={control}
          name='discountId'
          render={({ field: { onChange, value } }) => (
            <DropdownDiscount value={value} onChange={onChange} />
          )}
        />
        {errors.discountId && <p>{errors.discountId.message}</p>}
      </div> */}

      <Button type='submit'>Save changes</Button>
    </form>
  );
}

//todo-list:
// bedakan sumbit data nantinya ketika create denga update
