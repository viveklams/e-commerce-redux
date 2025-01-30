/* eslint-disable react/no-unescaped-entities */
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser, setUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  async function onSubmit(event) {
    event.preventDefault();
    console.log("Form Data before dispatch:", formData);

    // Validate form fields
    if (!formData.email || !formData.password) {
      toast({
        title: "Email and password are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Dispatch loginUser and await the response
      const response = await dispatch(loginUser(formData));
      const data = response.payload;

      console.log("Login response data:", data);

      // Check for success in the response payload
      if (data && data.success) {
        dispatch(setUser(data.user));
        toast({
          title: "Login successful!",
          variant: "success",
        });
        console.log("User set in Redux:", data.user);
      } else {
        toast({
          title: "Login failed. Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6  ">
      <div className="text-center">
        <h1 className="text-3xl font-bold  tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2   text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={loading ? "Signing In..." : "Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        disabled={loading}
      />
    </div>
  );
}

export default AuthLogin;
