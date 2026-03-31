import React, { useMemo, useState } from "react";

const PLAN_LIMITS = {
  basic: 2,
  pro: 3,
  enterprise: 5,
};

const PLAN_LABELS = {
  basic: "Basic",
  pro: "Pro",
  enterprise: "Enterprise",
};

const PERMISSION_OPTIONS = [
  { value: "basic", label: "Basic Access" },
  { value: "pro", label: "Pro Access" },
  { value: "elite", label: "Elite Access" },
];

const seededUsers = [
  {
    id: "u-1",
    name: "Aarav Mehta",
    email: "aarav@company.com",
    permission: "pro",
    status: "Active",
    role: "Product Ops",
  },
];

const UserPermission = () => {
  const [currentPlan, setCurrentPlan] = useState("pro");
  const [users, setUsers] = useState(seededUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    permission: "basic",
    password: "",
    role: "",
  });
  const [formError, setFormError] = useState("");

  const planLimit = PLAN_LIMITS[currentPlan];
  const usedSeats = users.length;
  const remainingSeats = Math.max(planLimit - usedSeats, 0);
  const seatPercent = Math.min((usedSeats / planLimit) * 100, 100);

  const progressTone = useMemo(() => {
    if (remainingSeats === 0) return "bg-rose-500";
    if (remainingSeats <= 1) return "bg-amber-500";
    return "bg-emerald-500";
  }, [remainingSeats]);

  const handleFormChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const resetForm = () => {
    setFormState({
      name: "",
      email: "",
      permission: "basic",
      password: "",
      role: "",
    });
    setFormError("");
  };

  const handleCreateUser = (event) => {
    event.preventDefault();

    if (usedSeats >= planLimit) {
      setFormError("Plan limit reached. Upgrade your plan to add more users.");
      return;
    }

    if (!formState.name.trim() || !formState.email.trim() || !formState.password.trim()) {
      setFormError("Name, email, and password are required.");
      return;
    }

    const newUser = {
      id: `u-${Date.now()}`,
      name: formState.name.trim(),
      email: formState.email.trim(),
      permission: formState.permission,
      status: "Pending",
      role: formState.role.trim() || "Team Member",
    };

    setUsers((prev) => [newUser, ...prev]);
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-[#0b0f1f] dark:text-white">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 shadow-lg dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-white dark:ring-[#0b0f1f]"></span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">
                  User profile
                </p>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Riya Sharma
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-300">riya@botcloakguard.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em]">Current Plan</span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
                  {PLAN_LABELS[currentPlan]}
                </span>
              </div>
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                {usedSeats} of {planLimit} seats used
              </p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div className={`h-full ${progressTone}`} style={{ width: `${seatPercent}%` }}></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                You can still create {remainingSeats} more user{remainingSeats === 1 ? "" : "s"} on this plan.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-300">
                  Plan control
                </p>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Choose active plan
                </h2>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-300">
                Limits update instantly
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {Object.keys(PLAN_LIMITS).map((planKey) => (
                <button
                  key={planKey}
                  type="button"
                  onClick={() => setCurrentPlan(planKey)}
                  className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                    currentPlan === planKey
                      ? "border-slate-900 bg-slate-900 text-white shadow-[0_10px_25px_rgba(15,23,42,0.35)] dark:border-white dark:bg-white dark:text-slate-900"
                      : "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-transparent dark:text-slate-200"
                  }`}
                >
                  <div>
                    <p className="text-base font-semibold">{PLAN_LABELS[planKey]}</p>
                    <p className="text-xs opacity-80">Up to {PLAN_LIMITS[planKey]} users</p>
                  </div>
                  <span className={`text-xs font-semibold ${currentPlan === planKey ? "text-white/80 dark:text-slate-600" : "text-slate-400"}`}>
                    Select
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Create users</p>
                <h2 className="text-xl font-semibold">Invite new teammates</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{remainingSeats} seats left</span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-sm text-white/80">Every user gets custom access and security defaults.</p>
                <p className="mt-2 text-xs text-white/60">
                  Basic: Dashboard view • Pro: Manage links • Elite: Admin controls
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setFormError("");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-[0_20px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5"
              >
                <span className="text-lg">+</span>
                Add User
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-300">
                Team members
              </p>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Premium access cards</h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-300">Updated just now</span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 p-5 shadow-[0_15px_35px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-gradient-to-br dark:from-white/10 dark:via-white/5 dark:to-white/10"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{user.email}</p>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white dark:bg-white dark:text-slate-900">
                    {user.permission}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
                  <span>{user.role}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200">
                    {user.status}
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500 transition hover:border-slate-400 hover:text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <span className="rounded-full border border-slate-300 px-3 py-1 text-xs dark:border-white/30">+</span>
              Create another user
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur"
            onClick={() => {
              setIsModalOpen(false);
              resetForm();
            }}
          />
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_25px_60px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-[#111827]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-300">Add a user</p>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Create a new team member</h3>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:text-slate-900 dark:border-white/10 dark:text-slate-300"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
              >
                Close
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleCreateUser}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-300">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={handleFormChange("name")}
                    placeholder="Enter full name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-300">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={handleFormChange("email")}
                    placeholder="name@company.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-300">
                    Permission tier
                  </label>
                  <select
                    value={formState.permission}
                    onChange={handleFormChange("permission")}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    {PERMISSION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-300">
                    Temporary password
                  </label>
                  <input
                    type="password"
                    value={formState.password}
                    onChange={handleFormChange("password")}
                    placeholder="Create a secure password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-300">
                  Role label (optional)
                </label>
                <input
                  type="text"
                  value={formState.role}
                  onChange={handleFormChange("role")}
                  placeholder="Security analyst, marketing, etc."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              {formError && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                  {formError}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  An invite email will be sent after creation.
                </p>
                <button
                  type="submit"
                  className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
                >
                  Create user
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPermission;
