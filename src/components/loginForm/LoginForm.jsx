import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/login/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/schemas/SchemasLoginForm";
import Cookies from "js-cookie";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const onSubmit = async (val) => {
    try {
      const body = { input: val.input, password: val.password };
      const response = await login(body).unwrap();
      Cookies.set("token", response?.user?.token);
      navigate("/");
    } catch (err) {
      console.error("Error saat login:", err);
    }
  };

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0 lg:pt-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>Login</h1>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='input' className='mb-2'>
                    Username or Email
                  </Label>
                  <Input
                    {...register("input")}
                    placeholder='your username or email'
                    className={cn({
                      "focus-within:ring-red-500": errors.input,
                    })}
                  />
                  {errors.input && (
                    <p className='text-red-500'>{errors.input.message}</p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password' className='mb-2'>
                    Password
                  </Label>
                  <Input
                    {...register("password")}
                    placeholder='password'
                    type='password'
                    className={cn({
                      "focus-within:ring-red-500": errors.password,
                    })}
                  />
                  {errors.password && (
                    <p className='text-red-500'>{errors.password.message}</p>
                  )}
                  {isError && error?.data?.message && (
                    <p className='text-red-500'>{error?.data?.message}</p>
                  )}
                </div>
                <Link
                  to='/forget-password'
                  className='text-sm  hover:underline mt-2'
                >
                  Forgot your password?
                </Link>
                <Button type='submit' disabled={isLoading}>
                  {isLoading ? "Loading..." : "Sign in"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
