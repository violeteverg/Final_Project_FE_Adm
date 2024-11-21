import { useDispatch, useSelector } from "react-redux";
import FormProduct from "../formProduct/FormProduct";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { setIsOpen } from "@/redux/app/slice";
import { useGetProductIdQuery } from "@/redux/product/api";

export default function Modal() {
  const dispatch = useDispatch();
  const { isOpen, productId, type } = useSelector((state) => state.app);
  const { data, isLoading } = useGetProductIdQuery({ id: productId });
  const product = data?.result || [];

  const defaultValues =
    product && type === "update"
      ? {
          id: product?.id || 0,
          title: product?.title || "",
          description: product?.description || "",
          price: product?.price || 0,
          quantity: product?.quantity || 0,
          image: product?.image || "",
          categoryId: product?.categoryId || null,
        }
      : {};

  const handleOpen = () => {
    dispatch(setIsOpen(true));
  };

  const handleClose = () => {
    dispatch(setIsOpen(false));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? handleOpen() : handleClose())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create New Product" : "Update Product"}
          </DialogTitle>
          <DialogDescription>
            {type === "create" ? "." : "Please update product carefully"}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <FormProduct defaultValues={defaultValues} />
        )}
      </DialogContent>
    </Dialog>
  );
}
