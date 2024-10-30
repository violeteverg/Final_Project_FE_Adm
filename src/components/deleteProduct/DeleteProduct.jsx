import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { setIsDelete } from "@/redux/app/slice";
import { Button } from "../ui/button";
import { useDeleteProductMutation } from "@/redux/product/api";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckBigIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DeleteProduct() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { isDelete, productId, checkboxValue } = useSelector(
    (state) => state.app
  );

  const [deleteProduct] = useDeleteProductMutation();

  const handleOpen = () => {
    dispatch(setIsDelete(true));
  };
  const handleClose = () => {
    dispatch(setIsDelete(false));
  };

  const buttoDeleteHandler = async () => {
    const actionType = checkboxValue.isActive ? "activated" : "deactivated";
    await deleteProduct({ id: productId, body: checkboxValue });
    dispatch(setIsDelete(false));
    toast({
      variant: "success",
      description: (
        <div className='flex gap-2 font-bold'>
          <CircleCheckBigIcon className='text-green-600' />
          <p>Product has been {actionType} successfully</p>
        </div>
      ),
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
    });
  };
  return (
    <Dialog
      open={isDelete}
      onOpenChange={(open) => (open ? handleOpen() : handleClose())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {checkboxValue.isActive ? "Activate Product" : "Deactivate Product"}
          </DialogTitle>
          <DialogDescription>
            {checkboxValue.isActive
              ? "Are you sure you want to activate this product?"
              : "Are you sure you want to deactivate this product?"}
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col justify-center items-center gap-y-4 m-2'>
          <img
            src='./warning_sign.svg'
            alt='warning'
            width={100}
            height={100}
          />
          <p>
            {checkboxValue.isActive
              ? "This action will activate the product."
              : "This action will deactivate the product."}
          </p>
          <Button className='w-[90%]' onClick={buttoDeleteHandler}>
            {checkboxValue.isActive ? "Activate" : "Deactivate"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
