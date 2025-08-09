import Loading from "@/components/general-loader";
import MyLoginForm from "@/components/my-login-form";
import { Suspense } from "react";

const Login = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Suspense fallback={<Loading />}>
        <MyLoginForm />
      </Suspense>
    </div>
  )
}

export default Login