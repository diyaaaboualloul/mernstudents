import "./App.css";
import Header from "./Header";
import "./Header.css";

import StudentsList from "./components/StudentsList";
import StudentForm from "./components/StudentForm";
import { useState } from "react";

function App() {
  const [editingStudent, setEditingStudent] = useState(null);

  return (
    <>
      <Header />
      <div className="container">
        <h2>Students</h2>

        <StudentForm
          editingStudent={editingStudent}
          onCancelEdit={() => setEditingStudent(null)}
          onAdded={() => window.location.reload()}
          onUpdated={() => {
            setEditingStudent(null);
            window.location.reload();
          }}
        />

        <StudentsList
          onEdit={(student) => setEditingStudent(student)}
        />
      </div>
    </>
  );
}

export default App;
