import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  Activity,
  ShieldCheck,
  X,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  SquarePen,
} from "lucide-react";

export default function DashboardTasks({ clickSummary }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerMonth, setPickerMonth] = useState(() => new Date());
  const [tempDate, setTempDate] = useState("");
  const [tempHour, setTempHour] = useState("09");
  const [tempMinute, setTempMinute] = useState("00");
  const [hourOpen, setHourOpen] = useState(false);
  const [minuteOpen, setMinuteOpen] = useState(false);
  const pickerRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "To Do",
    priority: "Low",
    dueDate: "",
  });

  // Add / Update Task
  const handleSubmit = () => {
    if (!form.name) return;

    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = form;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, form]);
    }

    setForm({
      name: "",
      description: "",
      status: "To Do",
      priority: "Low",
      dueDate: "",
    });

    setOpenModal(false);
    setPickerOpen(false);
    setHourOpen(false);
    setMinuteOpen(false);
  };

  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const editTask = (task, index) => {
    setForm(task);
    setEditingIndex(index);
    setOpenModal(true);
    setPickerOpen(false);
    setHourOpen(false);
    setMinuteOpen(false);
  };

  const filtered = tasks.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openDatePicker = () => {
    const base = form.dueDate ? new Date(form.dueDate) : new Date();

    if (!Number.isNaN(base.getTime())) {
      const y = base.getFullYear();
      const m = `${base.getMonth() + 1}`.padStart(2, "0");
      const d = `${base.getDate()}`.padStart(2, "0");
      const h = `${base.getHours()}`.padStart(2, "0");
      const min = `${base.getMinutes()}`.padStart(2, "0");
      setTempDate(`${y}-${m}-${d}`);
      setTempHour(h);
      setTempMinute(min);
      setPickerMonth(new Date(y, base.getMonth(), 1));
    }
    setPickerOpen(true);
    setHourOpen(false);
    setMinuteOpen(false);
  };

  const closeDatePicker = () => {
    setPickerOpen(false);
    setHourOpen(false);
    setMinuteOpen(false);
  };

  const applyDateTime = () => {
    if (!tempDate) return;
    setForm({ ...form, dueDate: `${tempDate}T${tempHour}:${tempMinute}` });
    setPickerOpen(false);
    setHourOpen(false);
    setMinuteOpen(false);
  };

  const clearDateTime = () => {
    setForm({ ...form, dueDate: "" });
    setPickerOpen(false);
    setHourOpen(false);
    setMinuteOpen(false);
  };

  const displayDueDate = useMemo(() => {
    if (!form.dueDate) return "";
    const d = new Date(form.dueDate);
    if (Number.isNaN(d.getTime())) return "";
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return d.toLocaleString(undefined, options);
  }, [form.dueDate]);

  const formatTaskDue = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calendarDays = useMemo(() => {
    const year = pickerMonth.getFullYear();
    const month = pickerMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < startWeekday; i += 1) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d += 1) {
      days.push(new Date(year, month, d));
    }
    return days;
  }, [pickerMonth]);

  useEffect(() => {
    if (!pickerOpen && !hourOpen && !minuteOpen) return;

    const handleOutside = (e) => {
      if (!pickerRef.current) return;
      const path = e.composedPath ? e.composedPath() : [];
      const clickedInside =
        pickerRef.current.contains(e.target) ||
        (path.length && path.includes(pickerRef.current));

      if (!clickedInside) {
        setPickerOpen(false);
        setHourOpen(false);
        setMinuteOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutside, true);
    return () =>
      document.removeEventListener("pointerdown", handleOutside, true);
  }, [pickerOpen, hourOpen, minuteOpen]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* ================= LEFT CARD ================= */}
      <div
        className="
        w-full rounded-2xl p-6
        bg-white/90 border border-gray-200 text-gray-900
        shadow-xl shadow-black/5
        dark:bg-[#0F111A]/90 dark:border-white/10 dark:text-gray-100 dark:shadow-black/30
        lg:h-[520px]
      "
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">Task Manager</h2>

            <button
              onClick={() => {
                setOpenModal(true);
                setPickerOpen(false);
                setHourOpen(false);
                setMinuteOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg
            bg-gradient-to-r from-indigo-500 to-purple-500
            text-white text-sm hover:scale-105 transition-transform cursor-pointer"
            >
              <Plus size={16} /> Add Task
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
            <input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full h-[38px] pl-10 rounded-xl text-sm
              bg-gray-50 dark:bg-[#151826]
              border border-gray-200 dark:border-white/10
              focus:outline-none focus:ring-2 focus:ring-indigo-500/30
            "
            />
          </div>

          {/* Task List */}
          <div className="flex-1 overflow-auto pr-1">
            {filtered.length === 0 ? (
              <div className="h-full flex items-center justify-center rounded-xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50/60 dark:bg-[#151826]/60 text-sm text-gray-500 dark:text-white/40">
                No tasks yet. Click “Add Task” to create one.
              </div>
            ) : (
              <div className="space-y-2.5">
                {filtered.map((task, index) => {
                  const priorityConfig = {
                    High: {
                      dot: "bg-red-500",
                      badge:
                        "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
                      bar: "bg-red-400",
                    },
                    Medium: {
                      dot: "bg-amber-500",
                      badge:
                        "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
                      bar: "bg-amber-400",
                    },
                    Low: {
                      dot: "bg-emerald-500",
                      badge:
                        "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
                      bar: "bg-emerald-400",
                    },
                  };
                  const statusConfig = {
                    "To Do":
                      "bg-zinc-100 text-zinc-600 dark:bg-white/8 dark:text-zinc-400",
                    "In Progress":
                      "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
                    Done: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
                  };
                  const p =
                    priorityConfig[task.priority] ?? priorityConfig["Low"];
                  const s = statusConfig[task.status] ?? statusConfig["To Do"];

                  return (
                    <div
                      key={index}
                      className="group relative flex items-stretch gap-0 rounded-xl overflow-hidden
          border border-zinc-200/80 dark:border-white/[0.07]
          bg-white dark:bg-[#0f1117]
          hover:border-zinc-300 dark:hover:border-white/[0.13]
          hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)]
          transition-all duration-200"
                    >
                      {/* Left accent bar */}
                      <div
                        className={`w-[3px] shrink-0 ${p.bar} opacity-70 group-hover:opacity-100 transition-opacity duration-200`}
                      />

                      {/* Main content */}
                      <div className="flex flex-1 items-center gap-4 px-4 py-3.5 min-w-0">
                        {/* Priority dot */}
                        <div
                          className={`h-2 w-2 rounded-full shrink-0 ${p.dot} ring-4 ring-current/10`}
                        />

                        {/* Text block */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate leading-tight">
                              {task.name}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            {/* Status badge */}
                            <span
                              className={`inline-flex items-center text-[10.5px] font-medium px-2 py-0.5 rounded-md ${s}`}
                            >
                              {task.status}
                            </span>
                            {/* Priority badge */}
                            <span
                              className={`inline-flex items-center text-[10.5px] font-medium px-2 py-0.5 rounded-md ${p.badge}`}
                            >
                              {task.priority}
                            </span>
                            {/* Due date */}
                            {task.dueDate && (
                              <span
                                className="inline-flex items-center gap-1 text-[10.5px] font-medium px-2 py-0.5 rounded-md
                  bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400"
                              >
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="18"
                                    rx="2"
                                  />
                                  <line x1="16" y1="2" x2="16" y2="6" />
                                  <line x1="8" y1="2" x2="8" y2="6" />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {formatTaskDue(task.dueDate)}
                              </span>
                            )}
                            {/* Task ID — subtle, far right */}
                            <span
                              className="inline-flex items-center text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-md
  bg-indigo-50 text-indigo-400
  dark:bg-indigo-500/[0.08] dark:text-indigo-400/70
  border border-indigo-100 dark:border-indigo-500/10"
                            >
                              #{String(index + 1).padStart(3, "0")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons — revealed on hover */}
                      <div className="flex items-center gap-1 pr-3 transition-all duration-200">
                        <button
                          type="button"
                          onClick={() => editTask(task, index)}
                          className="h-7 w-7 rounded-lg flex items-center justify-center
      text-emerald-500 dark:text-emerald-400
      hover:text-emerald-600 dark:hover:text-emerald-300
      hover:bg-emerald-50 dark:hover:bg-emerald-500/10
      transition-colors duration-150 cursor-pointer"
                          title="Edit"
                        >
                          <SquarePen className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteTask(index)}
                          className="h-7 w-7 rounded-lg flex items-center justify-center
      text-red-400 dark:text-red-400
      hover:text-red-600 dark:hover:text-red-300
      hover:bg-red-50 dark:hover:bg-red-500/10
      transition-colors duration-150 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= RIGHT CARD ================= */}
      <div
        className="
        w-full rounded-2xl p-6
        bg-white/90 border border-gray-200 text-gray-900
        shadow-xl shadow-black/5
        dark:bg-[#0F111A]/90 dark:border-white/10 dark:text-gray-100 dark:shadow-black/30
        lg:h-[520px]
      "
      >
        <div className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-[#0F111A] dark:border-white/10">
          <h2 className="text-lg font-semibold mb-1">
            Live Campaign Click Intelligence
          </h2>
          <p className="text-sm opacity-70 mb-6">
            Real-time engagement insights across protected traffic
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Total Clicks */}
            <div className="rounded-2xl p-4 border border-gray-200 bg-white/80 shadow-sm dark:bg-[#111827] dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 dark:text-white/50">
                    Total Clicks
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {clickSummary?.totalClicks || 0}
                  </div>
                </div>
                <div className="h-9 w-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Activity className="text-indigo-500" size={16} />
                </div>
              </div>
              <div className="mt-3 text-[11px] text-emerald-600 dark:text-emerald-300">
                +12.4% this week
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-indigo-500/10 overflow-hidden">
                <div className="h-full w-[70%] bg-indigo-500" />
              </div>
            </div>

            {/* Safe Clicks */}
            <div className="rounded-2xl p-4 border border-gray-200 bg-white/80 shadow-sm dark:bg-[#111827] dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 dark:text-white/50">
                    Safe Clicks
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {clickSummary?.safeClicks || 0}
                  </div>
                </div>
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="text-emerald-500" size={16} />
                </div>
              </div>
              <div className="mt-3 text-[11px] text-indigo-600 dark:text-indigo-300">
                95.6% safe rate
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-emerald-500/10 overflow-hidden">
                <div className="h-full w-[86%] bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="
            w-full max-w-[560px] rounded-2xl p-6 sm:p-7
            bg-white dark:bg-[#0F111A]
            border border-gray-200 dark:border-white/10
            shadow-2xl shadow-black/10 dark:shadow-black/30
          "
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">
                {editingIndex !== null ? "Edit Task" : "Create New Task"}
              </h3>
              <X
                className="cursor-pointer"
                onClick={() => {
                  setOpenModal(false);
                  setPickerOpen(false);
                }}
              />
            </div>

            <div className="space-y-3">
              <input
                placeholder="Task Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="
                  w-full rounded-xl px-3.5 py-2.5 text-sm
                  bg-gray-50 dark:bg-[#151826]
                  border border-gray-200 dark:border-white/10
                  text-gray-900 dark:text-gray-100
                  placeholder:text-gray-400 dark:placeholder:text-white/40
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                  transition
                "
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="
                  w-full rounded-xl px-3.5 py-2.5 text-sm min-h-[96px]
                  bg-gray-50 dark:bg-[#151826]
                  border border-gray-200 dark:border-white/10
                  text-gray-900 dark:text-gray-100
                  placeholder:text-gray-400 dark:placeholder:text-white/40
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                  transition
                "
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="
                    w-full rounded-xl px-3.5 py-2.5 text-sm
                    bg-gray-50 dark:bg-[#151826]
                    border border-gray-200 dark:border-white/10
                    text-gray-900 dark:text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                    transition cursor-pointer
                  "
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Hold</option>
                  <option>Done</option>
                </select>

                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                  className="
                    w-full rounded-xl px-3.5 py-2.5 text-sm
                    bg-gray-50 dark:bg-[#151826]
                    border border-gray-200 dark:border-white/10
                    text-gray-900 dark:text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                    transition cursor-pointer
                  "
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-600 dark:text-white/60">
                    Due Date & Time
                  </label>
                  <span className="text-[11px] text-gray-400 dark:text-white/35">
                    Local timezone
                  </span>
                </div>

                <div className="relative" ref={pickerRef}>
                  <button
                    type="button"
                    onClick={openDatePicker}
                    className="
                      w-full rounded-xl px-3.5 py-2.5 text-sm text-left
                      bg-gray-50 dark:bg-[#151826]
                      border border-gray-200 dark:border-white/10
                      text-gray-900 dark:text-gray-100
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                      hover:bg-gray-100 dark:hover:bg-[#1B2030]
                      transition cursor-pointer
                    "
                  >
                    <div className="flex items-center gap-2">
                      <CalendarClock className="w-4 h-4 text-indigo-500/80" />
                      {displayDueDate ? (
                        <span>{displayDueDate}</span>
                      ) : (
                        <span className="text-gray-400 dark:text-white/40">
                          Pick date & time
                        </span>
                      )}
                    </div>
                  </button>

                  {pickerOpen && (
                    <div
                      className="
                        absolute z-50 w-[320px] bottom-full mb-2
                        rounded-2xl border border-gray-200 dark:border-white/10
                        bg-white dark:bg-[#0F111A]
                        shadow-2xl shadow-black/10 dark:shadow-black/30
                        overflow-hidden
                      "
                    >
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-white/10">
                        <button
                          type="button"
                          onClick={() =>
                            setPickerMonth(
                              new Date(
                                pickerMonth.getFullYear(),
                                pickerMonth.getMonth() - 1,
                                1,
                              ),
                            )
                          }
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="text-xs font-medium">
                          {pickerMonth.toLocaleString(undefined, {
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setPickerMonth(
                              new Date(
                                pickerMonth.getFullYear(),
                                pickerMonth.getMonth() + 1,
                                1,
                              ),
                            )
                          }
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="px-3 pt-2">
                        <div className="grid grid-cols-7 gap-1 text-[10px] text-gray-400 dark:text-white/40 mb-2">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                            (d) => (
                              <div key={d} className="text-center">
                                {d}
                              </div>
                            ),
                          )}
                        </div>
                        <div className="grid grid-cols-7 gap-1 pb-2">
                          {calendarDays.map((d, idx) => {
                            if (!d)
                              return <div key={`e-${idx}`} className="h-7" />;
                            const y = d.getFullYear();
                            const m = `${d.getMonth() + 1}`.padStart(2, "0");
                            const day = `${d.getDate()}`.padStart(2, "0");
                            const value = `${y}-${m}-${day}`;
                            const isSelected = value === tempDate;
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setTempDate(value)}
                                className={`
                                  h-7 rounded-md text-xs transition cursor-pointer
                                  ${
                                    isSelected
                                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                      : "hover:bg-gray-100 dark:hover:bg-white/5"
                                  }
                                `}
                              >
                                {d.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time + Actions */}
                      <div className="px-3 py-2 border-t border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="relative w-full">
                            <button
                              type="button"
                              onClick={() => setHourOpen((v) => !v)}
                              className="
                                w-full rounded-lg px-2.5 py-1.5 text-xs text-left
                                bg-gray-50 dark:bg-[#151826]
                                border border-gray-200 dark:border-white/10
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                                hover:bg-gray-100 dark:hover:bg-[#1B2030]
                                transition cursor-pointer
                              "
                            >
                              {tempHour}
                            </button>

                            {hourOpen && (
                              <div
                                className="
                                  absolute z-50 bottom-full mb-1 w-full
                                  max-h-28 overflow-auto rounded-lg
                                  border border-gray-200 dark:border-white/10
                                  bg-white dark:bg-[#0F111A]
                                  shadow-lg shadow-black/10 dark:shadow-black/30
                                "
                              >
                                {Array.from({ length: 24 }).map((_, i) => {
                                  const v = `${i}`.padStart(2, "0");
                                  const active = v === tempHour;
                                  return (
                                    <button
                                      key={v}
                                      type="button"
                                      onClick={() => {
                                        setTempHour(v);
                                        setHourOpen(false);
                                      }}
                                      className={`
                                        w-full px-2.5 py-1.5 text-xs text-left transition cursor-pointer
                                        ${
                                          active
                                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                            : "hover:bg-gray-100 dark:hover:bg-white/5"
                                        }
                                      `}
                                    >
                                      {v}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          <span className="text-gray-400">:</span>
                          <div className="relative w-full">
                            <button
                              type="button"
                              onClick={() => setMinuteOpen((v) => !v)}
                              className="
                                w-full rounded-lg px-2.5 py-1.5 text-xs text-left
                                bg-gray-50 dark:bg-[#151826]
                                border border-gray-200 dark:border-white/10
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                                hover:bg-gray-100 dark:hover:bg-[#1B2030]
                                transition cursor-pointer
                              "
                            >
                              {tempMinute}
                            </button>

                            {minuteOpen && (
                              <div
                                className="
                                  absolute z-50 bottom-full mb-1 w-full
                                  max-h-28 overflow-auto rounded-lg
                                  border border-gray-200 dark:border-white/10
                                  bg-white dark:bg-[#0F111A]
                                  shadow-lg shadow-black/10 dark:shadow-black/30
                                "
                              >
                                {Array.from({ length: 60 }).map((_, i) => {
                                  const v = `${i}`.padStart(2, "0");
                                  const active = v === tempMinute;
                                  return (
                                    <button
                                      key={v}
                                      type="button"
                                      onClick={() => {
                                        setTempMinute(v);
                                        setMinuteOpen(false);
                                      }}
                                      className={`
                                        w-full px-2.5 py-1.5 text-xs text-left transition cursor-pointer
                                        ${
                                          active
                                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                            : "hover:bg-gray-100 dark:hover:bg-white/5"
                                        }
                                      `}
                                    >
                                      {v}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <button
                            type="button"
                            onClick={clearDateTime}
                            className="text-xs text-gray-500 hover:text-red-500 transition cursor-pointer"
                          >
                            Clear
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={closeDatePicker}
                              className="px-2.5 py-1 rounded-lg text-xs border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={applyDateTime}
                              className="px-2.5 py-1 rounded-lg text-xs text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 transition cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="
                  w-full py-2.5 rounded-xl
                  bg-gradient-to-r from-indigo-500 to-purple-500
                  text-white font-medium mt-2
                  hover:brightness-110 active:scale-[0.99] transition cursor-pointer
                "
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
