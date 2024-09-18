import './App.css';
import ListDetail from './ListDetail';
import BrokenListDetail from './BrokenListDetail';

function App() {
  return (
    <>
      <main style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h1>List-Detail Demo</h1>
      <details>
        <summary>Broken List-Detail</summary>
      <BrokenListDetail />
      </details>
      <details>
        <summary>Working List-Detail</summary>
        <ListDetail />
      </details>
      </main>      
    </>
  );
}

export default App;
