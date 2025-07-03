import React, { useState, useEffect } from "react";

// This defines what each task should look like
interface Todo {
  id: number; // Unique number for the task
  text: string; // What the task says
  completed: boolean; // Is it done?
  createdAt: string; // When it was made
  reminder?: boolean; // Optional: does it have a reminder?
  date?: string; // Optional: which day it belongs to
  color?: string; // Optional: background color for the task
}

// 🎨 Color options for task backgrounds
const colors = [
  "bg-yellow-100",
  "bg-purple-200",
  "bg-darkblue-100",
  "bg-blue-100",
  "bg-pink-100",
  "bg-violet-200",
];

// 🧠 Helper functions for date stuff
const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD format
};

const formatDateDisplay = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDayName = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const subDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

function TodoApp() {
  // ✅ When the app starts, load tasks from localStorage (if any)
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [input, setInput] = useState(""); // What you're typing
  const [selectedDate, setSelectedDate] = useState(new Date()); // The day we're looking at
  const [editingId, setEditingId] = useState<number | null>(null); // Are we editing?
  const [editingText, setEditingText] = useState(""); // What we're editing
  const [filterTab, setFilterTab] = useState<"all" | "completed" | "pending">(
    "all"
  );

  // ✅ Save tasks to localStorage every time they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toLocaleString(),
      color: colors[Math.floor(Math.random() * colors.length)],
      date: formatDate(selectedDate),
      reminder: false,
    };

    setTodos([...todos, newTodo]);
    setInput(""); // clear input box
  };

  const handleRemove = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleReminder = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, reminder: !todo.reminder } : todo
      )
    );
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = (id: number) => {
    if (!editingText.trim()) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const changeDay = (direction: "prev" | "next") => {
    setSelectedDate((prev) =>
      direction === "prev" ? subDays(prev, 1) : addDays(prev, 1)
    );
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesDate = todo.date === formatDate(selectedDate);
    if (filterTab === "completed") return matchesDate && todo.completed;
    if (filterTab === "pending") return matchesDate && !todo.completed;
    return matchesDate;
  });

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  const handleEditKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") saveEdit(id);
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* 🔼 Day navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeDay("prev")}
            className="text-lg hover:bg-gray-100 p-2 rounded"
          >
            ⬅️
          </button>
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              {formatDayName(selectedDate)}
            </p>
            <p className="font-semibold text-lg">
              {formatDateDisplay(selectedDate)}
            </p>
          </div>
          <button
            onClick={() => changeDay("next")}
            className="text-lg hover:bg-gray-100 p-2 rounded"
          >
            ➡️
          </button>
        </div>

        {/* ✍️ Input field */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* 📊 Filter tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFilterTab("all")}
            className={`px-4 py-1 rounded-full ${
              filterTab === "all"
                ? "bg-blue-500 text-white"
                : "bg-blue-200 text-blue-800"
            }`}
          >
            All (
            {todos.filter((t) => t.date === formatDate(selectedDate)).length})
          </button>
          <button
            onClick={() => setFilterTab("completed")}
            className={`px-4 py-1 rounded-full ${
              filterTab === "completed"
                ? "bg-green-500 text-white"
                : "bg-green-200 text-green-800"
            }`}
          >
            Completed (
            {
              todos.filter(
                (t) => t.date === formatDate(selectedDate) && t.completed
              ).length
            }
            )
          </button>
          <button
            onClick={() => setFilterTab("pending")}
            className={`px-4 py-1 rounded-full ${
              filterTab === "pending"
                ? "bg-orange-500 text-white"
                : "bg-orange-200 text-orange-800"
            }`}
          >
            Pending (
            {
              todos.filter(
                (t) => t.date === formatDate(selectedDate) && !t.completed
              ).length
            }
            )
          </button>
        </div>

        {/* 📝 Task List */}
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No tasks for this day yet!</p>
            <p className="text-sm">Add a task above to get started 🚀</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-4 rounded-md ${todo.color} border`}
              >
                {editingId === todo.id ? (
                  <>
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => handleEditKeyPress(e, todo.id)}
                      className="flex-1 p-2 mr-2 rounded border focus:ring-blue-500"
                      autoFocus
                    />
                    <button onClick={() => saveEdit(todo.id)} className="mr-2">
                      ✅
                    </button>
                    <button onClick={cancelEdit}>❌</button>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() => toggleComplete(todo.id)}
                      className={`flex-1 cursor-pointer ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleReminder(todo.id)}>
                        {todo.reminder ? "🔔" : "🔕"}
                      </button>
                      <button onClick={() => startEdit(todo)}>✏️</button>
                      <button onClick={() => handleRemove(todo.id)}>❌</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
