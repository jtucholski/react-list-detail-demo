import './App.css';
import ListDetail from './ListDetail';
import BrokenListDetail from './BrokenListDetail';

function App() {
  return (
    <>
      <h1>List-Detail Demo</h1>
      <details>
        <summary>Broken List-Detail</summary>
      <BrokenListDetail />
      </details>
      <details>
        <summary>Working List-Detail</summary>
        <ListDetail />
      </details>
    </>
  );
}

export default App;
