import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForgetPasswordMutation } from "@/redux/login/api";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CircleCheckBigIcon, CircleX } from "lucide-react";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();

  const [forgetPassword, { isLoading, isError, error }] =
    useForgetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      await forgetPassword({ email: data.email }).unwrap();

      console.log(data, "><><");
      toast({
        variant: "success",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleCheckBigIcon className='text-green-600' />
            <p>email verification already send</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } catch (err) {
      console.log(err, "error");
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>error when send email verify</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  };

  return (
    <div className='mx-auto flex p-8 lg:h-screen lg:p-0 lg:justify-center'>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0 lg:pt-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>Forget Password</h1>
            <p>Please enter your email to receive a password reset link.</p>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-1 py-2 mb-3'>
                <Label htmlFor='email' className='mb-2'>
                  Email
                </Label>
                <Input
                  {...register("email")}
                  placeholder='your username or email'
                  className={`${
                    errors?.email ? "focus-within:ring-red-500" : ""
                  }`}
                />
                {errors?.email && (
                  <p className='text-red-500'>{errors?.email?.message}</p>
                )}
                {isError && error?.data?.message && (
                  <p className='text-red-500'>{error?.data?.message}</p>
                )}
              </div>
              <Button type='submit' className='w-full'>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
