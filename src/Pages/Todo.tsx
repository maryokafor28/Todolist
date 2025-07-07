import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEdit,
  FaBell,
  FaBellSlash,
  FaCheck,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  reminder?: boolean;
  date?: string;
  color?: string;
  lastNotifiedAt?: number;
}

const colors = [
  "bg-yellow-100",
  "bg-purple-200",
  "bg-blue-100",
  "bg-pink-100",
  "bg-violet-200",
];

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const formatDateDisplay = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const formatDayName = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "long" });

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
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "completed" | "pending">(
    "all"
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = Date.now();

      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (
            todo.reminder &&
            Notification.permission === "granted" &&
            (!todo.lastNotifiedAt ||
              now - todo.lastNotifiedAt >= 10 * 60 * 1000) // 10 mins
          ) {
            new Notification("⏰ Task Reminder", {
              body: todo.text,
            });

            return { ...todo, lastNotifiedAt: now }; // Update last notified time
          }
          return todo;
        })
      );
    }, 60000); // Check every 1 minute

    return () => clearInterval(interval);
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
    setInput("");
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
        {/* Day navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeDay("prev")}
            className="text-lg hover:bg-gray-200 p-2 rounded"
          >
            <FaArrowLeft className="text-blue-500" />
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
            className="text-lg hover:bg-gray-200 p-2 rounded"
          >
            <FaArrowRight className="text-blue-500" />
          </button>
        </div>

        {/* Input field */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none p-2 rounded-l"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFilterTab("all")}
            className={`px-4 py-1 rounded-full transition-colors hover:bg-blue-300 ${
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
            className={`px-4 py-1 rounded-full transition-colors hover:bg-green-300 ${
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
            className={`px-4 py-1 rounded-full transition-colors hover:bg-orange-300 ${
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

        {/* Task list */}
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No tasks for this day yet!</p>
            <p className="text-sm">Add a task above to get started </p>
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
                      className="flex-1 p-2 mr-2 rounded border border-transparent focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      autoFocus
                    />
                    <button onClick={() => saveEdit(todo.id)} className="mr-2">
                      <FaCheck className="bg-green-500 p-1 rounded text-white inline-flex items-center justify-center" />
                    </button>
                    <button onClick={cancelEdit}>
                      <MdCancel className="text-red-500" />
                    </button>
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
                      <button
                        onClick={() => toggleReminder(todo.id)}
                        className={`p-1 rounded transition-colors ${
                          todo.reminder
                            ? "text-blue-500 hover:text-blue-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        title={
                          todo.reminder ? "Notification on" : "Notification off"
                        }
                      >
                        {todo.reminder ? <FaBell /> : <FaBellSlash />}
                      </button>
                      <button onClick={() => startEdit(todo)}>
                        <FaEdit className="text-blue-500 hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleRemove(todo.id)}>
                        <MdCancel className="text-red-500 hover:text-red-700" />
                      </button>
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
