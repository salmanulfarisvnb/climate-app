import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";

interface FormValues {
  name: string;
  phoneNumber: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { register, handleSubmit, control, formState } = useForm<FormValues>();
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    const { name, phoneNumber } = data;
    if (!name || !phoneNumber) return;
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/dashboard");
  };

  return (
    <div
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
                  <span className="text-red-500 text-sm">
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
                  <span className="text-red-500 text-sm">
                    {errors["phoneNumber"].message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <DevTool control={control} />
        </CardContent>
      </Card>
    </div>
  );
}
