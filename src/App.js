import "./App.css";
import UserManagement from "./hooks/UserManagement";
import { GlobalProvider } from "./contexts/GlobalContext";

function App() {
    return (
        <div className="App">
            <GlobalProvider>
                <UserManagement></UserManagement>
            </GlobalProvider>
        </div>
    );
}

export default App;
