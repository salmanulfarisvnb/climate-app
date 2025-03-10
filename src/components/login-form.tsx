import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUser } from "@/context/userContext";
import { useNavigate } from "react-router";
import { motion, MotionProps } from "framer-motion";

interface FormValues {
  name: string;
  phoneNumber: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & MotionProps) {
  const navigate = useNavigate();

  const { setUser, user } = useUser();

  const { register, handleSubmit, formState } = useForm<FormValues>();

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    const { name } = data;
    if (!name) {
      toast.error("Login failed");
    }
    if (user) {
      toast.error("Already logged in please logout first");
    } else {
      setUser(name);
      toast.success(
        `Hey ${name.charAt(0).toUpperCase() + name.slice(1)}, you're in! 🎉`
      );
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={cn(
        "flex max-w-[450px] mx-auto flex-col mt-20 gap-6",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  placeholder="Enter your Name"
                  required
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone-number">Phone Number</Label>

                <Input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors["phoneNumber"] && (
                  <span className="text-sm text-red-500">
                    {errors["phoneNumber"].message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          {/* <DevTool control={control} /> */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
