import './App.css';
import './styles.css';
import CreateOfficeHours from './components/CreateOfficeHours';
import OfficeHoursList from './components/OfficeHoursList';

function App() {
  return (
    <div className="App">
      <h1>Office Hours Queue - Professor View</h1>
      <CreateOfficeHours />
      <hr />
      <OfficeHoursList />
    </div>
  );
}

export default App;
