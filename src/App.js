import "./App.css";
import { useLocation } from 'react-router-dom';
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";

function App() {
  const location = useLocation();
  const showSideMenu = location.pathname !== '/Login';

  return (
    <div className="App">
      <div className="SideMenuAndPageContent">
        {showSideMenu && <SideMenu />}
        <PageContent />
      </div>
    </div>
  );
}

export default App;
