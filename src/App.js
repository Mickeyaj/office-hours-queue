import './App.css';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function App() {
  const testFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, "test"), {
        message: "Hello Firebase!",
        timestamp: new Date()
      });
      console.log('Document written with ID:', docRef.id);
      alert("Firebase connection works! Check your console");
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Firebase connection failed. Check console for errors");
    }
  };

  return (
    <div className="App">
      <h1>Office Hour Queue</h1>
      <button onClick={testFirebase}>Test Firebase connection</button>
    </div>
  );
}

export default App;
