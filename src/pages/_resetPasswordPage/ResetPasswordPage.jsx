import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "@/schemas/SchemasResetPassword";
import { useResetPasswordMutation } from "@/redux/login/api";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  //   console.log(token, "><token><");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword({
        body: {
          newPassword: data.newPassword,
        },
        token,
      }).unwrap();

      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className='mx-auto flex p-8 lg:h-screen lg:p-0 lg:justify-center'>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0 lg:pt-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>Reset Password</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='newPassword' className='mb-2'>
                New Password
              </Label>
              <Input
                isPassword
                type='password'
                {...register("newPassword")}
                placeholder='Enter your new password'
                className={cn({
                  "focus-within:ring-red-500": errors?.newPassword,
                })}
              />
              {errors?.newPassword && (
                <p className='text-red-500'>{errors?.newPassword?.message}</p>
              )}
            </div>
            <div className='grid gap-1 py-2'>
              <Label htmlFor='repeatPassword' className='mb-2'>
                Repeat Password
              </Label>
              <Input
                isPassword
                type='password'
                {...register("repeatPassword")}
                placeholder='Repeat your new password'
                className={cn({
                  "focus-within:ring-red-500": errors?.repeatPassword,
                })}
              />
              {errors?.repeatPassword && (
                <p className='text-red-500'>
                  {errors?.repeatPassword?.message}
                </p>
              )}
            </div>
            <Button type='submit'>Reset Password</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
