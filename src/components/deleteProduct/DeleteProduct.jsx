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

export default function DeleteProduct() {
  const dispatch = useDispatch();
  const { isDelete } = useSelector((state) => state.app);
  const handleOpen = () => {
    dispatch(setIsDelete(true));
  };
  const handleClose = () => {
    dispatch(setIsDelete(false));
  };
  const buttoDeleteHandler = () => {
    dispatch(setIsDelete(false));
  };
  return (
    <Dialog
      open={isDelete}
      onOpenChange={(open) => (open ? handleOpen() : handleClose())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Expense</DialogTitle>
          <DialogDescription>test</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col justify-center items-center gap-y-4 m-2'>
          <img
            src='./warning_sign.svg'
            alt='warning'
            width={100}
            height={100}
          />
          <p>Are you sure you want to delete this expense?</p>
          <Button className='w-[90%]' onClick={buttoDeleteHandler}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
