import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
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

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");
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
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data = await registerUser(formData);
      setMessage(data.message || "Registration successful");
      setFormData({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#52b788] text-2xl shadow-sm dark:bg-[#52b788]">
            ✈
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-[#52b788] dark:text-[#52b788]">
            Create your travel account
          </CardTitle>
          <CardDescription className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Join the platform to book destinations, manage trips, and save your
            favorite places.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label
                  htmlFor="fullName"
                  className="text-slate-700 dark:text-slate-200"
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Maki Mamo"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white/70 px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-800/70"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-slate-700 dark:text-slate-200"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="maki2003"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white/70 px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-800/70"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-slate-700 dark:text-slate-200"
                >
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="0911995992"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white/70 px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-800/70"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label
                  htmlFor="email"
                  className="text-slate-700 dark:text-slate-200"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="maki@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white/70 px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-800/70"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label
                  htmlFor="password"
                  className="text-slate-700 dark:text-slate-200"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Maki@1234"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-white/70 px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-800/70"
                />
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Minimum 8 characters with uppercase, lowercase, number, and symbol.
                </p>
              </div>
            </div>

            {message && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#52b788] text-white shadow-lg transition hover:bg-[#52b788] dark:bg-[#52b788] dark:text-white dark:hover:bg-[#52b788]"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#52b788] underline underline-offset-4 dark:text-[#52b788]"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
