import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

// const initialState = {
//   userName: "",
//   phoneNumber: "", // Added field
//   email: "",
//   password: "",
//   rationNumber: "", // Added field
// };
const initialState = {
  userName: "",
  phoneNumber: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log("Response payload:", data?.payload);
      const message = data?.payload?.message || "An unexpected error occurred";
      const success = data?.payload?.success;

      if (success) {
        // Success toast
        toast({
          title: message,
          variant: "default",
        });
        // Navigate to login after toast
        setTimeout(() => navigate("/auth/login"), 1000);
      } else {
        // Handle validation errors
        const errors = data?.payload?.errors || [];
        if (errors.length > 0) {
          errors.forEach((err) =>
            toast({
              title: err.msg, // Show individual validation error
              variant: "destructive",
            })
          );
        } else {
          // General error message
          toast({
            title: message,
            variant: "destructive",
          });
        }
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl text-white font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2 text-white">
          Already have an account ?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
