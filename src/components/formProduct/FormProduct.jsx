/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";

import DropdownCategory from "../dropdownCategory/DropdownCategory";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckBigIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "@/redux/app/slice";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/product/api";

export default function FormProduct({ defaultValues }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.app);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: defaultValues, mode: "onchange" });

  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();

  const toastText = () => {
    if (type === "update") {
      return "success updated product";
    }
    return "success created product";
  };

  const onSubmit = async (val, e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", val.title);
      formData.append("price", val.price);
      formData.append("quantity", val.quantity);
      formData.append("categoryId", val.categoryId);
      formData.append("description", val.description);

      if (val.image && val.image.length > 0) {
        formData.append("image", val.image[0]);
      } else {
        console.error("No image file selected");
      }

      if (type === "update") {
        await updateProduct({ data: formData, id: val.id });
      } else {
        await createProduct(formData);
      }

      dispatch(setIsOpen(false));
      reset();
      toast({
        variant: "success",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleCheckBigIcon className='text-green-600' />
            <p>{toastText()}</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } catch (error) {
      console.error(error);
    }
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
          render={({ field: { onChange, value } }) => {
            console.log(value, "ini valuenya");
            return (
              <Input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const files = e.target.files;
                  onChange(files || value);
                }}
              />
            );
          }}
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

      <Button type='submit'>Save changes</Button>
    </form>
  );
}
