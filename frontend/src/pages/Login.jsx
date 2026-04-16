import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { loginUser, getCurrentUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/mode-toggle";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);
      const token = data.token;
      const userResponse = await getCurrentUser(token);

      login(userResponse.user, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(251,191,36,0.15),_transparent_30%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(249,115,22,0.12),_transparent_28%),linear-gradient(to_bottom_right,_rgb(2,6,23),_rgb(15,23,42),_rgb(30,41,59))]">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] dark:bg-slate-950/30" />

      <div className="absolute right-5 top-5 z-20">
        <ModeToggle />
      </div>

      <Card className="relative z-10 w-full max-w-lg rounded-3xl border border-white/40 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80">
        <CardHeader className="space-y-3 pb-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#52b788] text-2xl shadow-sm">
            ✈
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-[#52b788]">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Sign in to manage your trips and favorites.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              id="login"
              label="Email, Username, or Phone"
              icon={<Mail className="h-4 w-4" />}
            >
              <Input
                id="login"
                name="login"
                type="text"
                placeholder="maki@gmail.com"
                value={formData.login}
                onChange={handleChange}
                required
                className="h-12 rounded-xl border-slate-200 bg-white/70 px-10 shadow-sm transition focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-800/70"
              />
            </FormField>

            <FormField
              id="password"
              label="Password"
              icon={<Lock className="h-4 w-4" />}
            >
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12 rounded-xl border-slate-200 bg-white/70 px-10 shadow-sm transition focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-800/70"
              />
            </FormField>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#52b788] text-white shadow-lg transition hover:bg-[#47a67d]"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-300">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#52b788] underline underline-offset-4"
              >
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function FormField({ id, label, icon, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-slate-700 dark:text-slate-200">
        {label}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

export default Login;
