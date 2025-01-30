import { Outlet } from "react-router-dom";
import animation2 from "../../assets/animation2.gif";
function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center bg-gradient-to-r from-purple-500 to-pink-500 after:justify-center w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <img
            src={animation2}
            alt="Ecommerce Animation"
            className="w-64 h-auto"
          />
          <h1 className="text-4xl font-sans hover:font-serif text-white tracking-tight">
            Vivek's Ecommerce Store
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background bg-gradient-to-r from-pink-500 to-fuchsia-500">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
