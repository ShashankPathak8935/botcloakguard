import { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  Activity,
  ShieldCheck,
  X,
} from "lucide-react";

export default function DashboardTasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

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
  };

  const deleteTask = (index) =>
    setTasks(tasks.filter((_, i) => i !== index));

  const editTask = (task, index) => {
    setForm(task);
    setEditingIndex(index);
    setOpenModal(true);
  };

  const filtered = tasks.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* ================= LEFT CARD ================= */}
      <div
        className="
        w-full rounded-2xl p-6 transition
        bg-white border border-gray-200 text-gray-900
        dark:bg-[#0F111A] dark:border-white/10 dark:text-gray-100
      "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Task Manager</h2>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg
            bg-gradient-to-r from-indigo-500 to-purple-500
            text-white text-sm hover:scale-105 transition"
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
              focus:outline-none
            "
          />
        </div>

        {/* Task List */}
        <div className="space-y-3 max-h-[350px] overflow-auto">
          {filtered.map((task, index) => (
            <div
              key={index}
              className="
              p-4 rounded-xl flex justify-between items-center
              bg-gray-50 dark:bg-[#151826]
              border border-gray-200 dark:border-white/10
            "
            >
              <div>
                <p className="font-medium">{task.name}</p>
                <span className="text-xs opacity-70">
                  {task.status} • {task.priority}
                </span>
              </div>

              <div className="flex gap-3">
                <Pencil
                  size={16}
                  className="cursor-pointer hover:text-indigo-500"
                  onClick={() => editTask(task, index)}
                />
                <Trash2
                  size={16}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => deleteTask(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT CARD ================= */}
      <div
        className="
        w-full rounded-2xl p-6 transition
        bg-white border border-gray-200 text-gray-900
        dark:bg-[#0F111A] dark:border-white/10 dark:text-gray-100
      "
      >
        <h2 className="text-lg font-semibold mb-1">
          Live Campaign Click Intelligence
        </h2>
        <p className="text-sm opacity-70 mb-6">
          Real-time engagement insights across protected traffic
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Total Clicks */}
          <div className="rounded-xl p-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10">
            <Activity className="mb-2 text-indigo-500" />
            <p className="text-sm opacity-70">Total Clicks</p>
            <h3 className="text-2xl font-semibold">12,480</h3>
          </div>

          {/* Safe Clicks */}
          <div className="rounded-xl p-5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-white/10">
            <ShieldCheck className="mb-2 text-emerald-500" />
            <p className="text-sm opacity-70">Safe Clicks</p>
            <h3 className="text-2xl font-semibold">11,932</h3>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="
            w-[420px] rounded-2xl p-6
            bg-white dark:bg-[#0F111A]
            border border-gray-200 dark:border-white/10
          "
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">
                {editingIndex !== null
                  ? "Edit Task"
                  : "Create New Task"}
              </h3>
              <X
                className="cursor-pointer"
                onClick={() => setOpenModal(false)}
              />
            </div>

            <div className="space-y-3">
              <input
                placeholder="Task Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="input"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="input h-20"
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="input"
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
                className="input"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                type="datetime-local"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
                className="input"
              />

              <button
                onClick={handleSubmit}
                className="w-full py-2 rounded-lg
                bg-gradient-to-r from-indigo-500 to-purple-500
                text-white font-medium mt-2"
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