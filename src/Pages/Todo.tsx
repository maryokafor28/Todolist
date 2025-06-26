// TodoApp with comments explained like a 15-year-old 👦
import React, { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";

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

function TodoApp() {
  // All the tasks
  const [todos, setTodos] = useState<Todo[]>([]);
  // What you are typing in the input box
  const [input, setInput] = useState("");
  // Which day we are looking at
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Which task we’re editing right now (if any)
  const [editingId, setEditingId] = useState<number | null>(null);
  // What you’re typing when editing
  const [editingText, setEditingText] = useState("");
  // Which tab is active (all/completed/pending)
  const [filterTab, setFilterTab] = useState<"all" | "completed" | "pending">(
    "all"
  );

  // When the page loads, check local storage to see if you already had tasks saved
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Whenever todos change, save them to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // When you click the Add button
  const handleAdd = () => {
    if (input.trim() === "") return; // Don’t add empty tasks

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toLocaleString(),
      color: colors[Math.floor(Math.random() * colors.length)],
      date: format(selectedDate, "yyyy-MM-dd"),
      reminder: false,
    };

    setTodos([...todos, newTodo]); // Add the new task to the list
    setInput(""); // Clear the input box
  };

  // Delete a task
  const handleRemove = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Mark a task as done or not done
  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Turn reminder 🔔 on or off
  const toggleReminder = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, reminder: !todo.reminder } : todo
      )
    );
  };

  // Start editing a task
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  // Save the edited text
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

  // Change day when you click next or previous
  const changeDay = (direction: "prev" | "next") => {
    setSelectedDate((prev) =>
      direction === "prev" ? subDays(prev, 1) : addDays(prev, 1)
    );
  };

  // Filter todos to show only those for the selected day and filter tab
  const filteredTodos = todos.filter((todo) => {
    const matchesDate = todo.date === format(selectedDate, "yyyy-MM-dd");
    if (filterTab === "completed") return matchesDate && todo.completed;
    if (filterTab === "pending") return matchesDate && !todo.completed;
    return matchesDate;
  });

  // JSX: what the UI looks like
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Top section: Day and arrows */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeDay("prev")} className="text-lg">
            ⬅️
          </button>
          <div>
            <p className="text-gray-500 text-sm">
              {format(selectedDate, "EEEE")}
            </p>
            <p className="font-semibold text-lg">
              {format(selectedDate, "MMMM d, yyyy")}
            </p>
          </div>
          <button onClick={() => changeDay("next")} className="text-lg">
            ➡️
          </button>
        </div>

        {/* Input field and Add button */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded-l"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Add
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFilterTab("all")}
            className="px-4 py-1 rounded-full bg-blue-200 text-blue-800"
          >
            All
          </button>
          <button
            onClick={() => setFilterTab("completed")}
            className="px-4 py-1 rounded-full bg-green-200 text-green-800"
          >
            Completed
          </button>
          <button
            onClick={() => setFilterTab("pending")}
            className="px-4 py-1 rounded-full bg-orange-200 text-orange-800"
          >
            Pending
          </button>
        </div>

        {/* To-do list */}
        <ul className="space-y-3">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-md ${todo.color}`}
            >
              {editingId === todo.id ? (
                <>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 p-2 mr-2 rounded border"
                  />
                  <button onClick={() => saveEdit(todo.id)} className="mr-2">
                    ✅
                  </button>
                  <button onClick={() => setEditingId(null)}>❌</button>
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
                  <button
                    onClick={() => toggleReminder(todo.id)}
                    className="mr-2"
                  >
                    {todo.reminder ? "🔔" : "🔕"}
                  </button>
                  <button onClick={() => startEdit(todo)} className="mr-2">
                    ✏️
                  </button>
                  <button onClick={() => handleRemove(todo.id)}>❌</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Color options for task backgrounds
const colors = [
  "bg-yellow-100",
  "bg-purple-200",
  "bg-orange-100",
  "bg-blue-100",
  "bg-pink-100",
  "bg-green-100",
];

export default TodoApp;
