// 🧠 Import global styles and components
import "./App.css";          // general styles for the whole app
import Header from "./Header";  
import "./Header.css";       // styles for the Header component

// 🧠 Import our main functional components
import StudentsList from "./components/StudentsList";   // shows the list of students
import StudentForm from "./components/StudentForm";     // handles add & edit of students

// 🧠 Import useState hook to manage state in this component
import { useState } from "react";

function App() {
  // 🧠 This state keeps track of the student currently being edited.
  // - If it's null → the form is in "Add" mode
  // - If it's a student object → the form switches to "Edit" mode
  const [editingStudent, setEditingStudent] = useState(null);

  return (
    <>
      {/* 📝 Header component — appears at the top of the page */}
      <Header />

      <div className="container">
        <h2>Students</h2>

        {/* ✏️ StudentForm is used for both Adding and Editing */}
        <StudentForm
          // 👇 Pass the current student to edit (or null for add mode)
          editingStudent={editingStudent}

          // ❌ When "Cancel" button is clicked in the form, exit edit mode
          onCancelEdit={() => setEditingStudent(null)}

          // ➕ After adding a student, simply reload the page to refresh the list
          onAdded={() => window.location.reload()}

          // ✏️ After updating a student:
          // - Exit edit mode
          // - Reload page to refresh the students list
          onUpdated={() => {
            setEditingStudent(null);
            window.location.reload();
          }}
        />

        {/* 📋 StudentsList displays all students in a table */}
        <StudentsList
          // When the Edit button is clicked inside StudentsList
          // → set the clicked student as the one we're editing
          // This triggers StudentForm to switch to edit mode and fill the data
          onEdit={(student) => setEditingStudent(student)}
        />
      </div>
    </>
  );
}

// 📝 Export the component so React can render it
export default App;
