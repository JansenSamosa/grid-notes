import Grid from './components/Grid';

import './App.css';
import { useFirebase, FirebaseContext } from './backend-utils/useFirebase';

const App = () => {

    const [app, analytics, database] = useFirebase()

    const widthPx = 900
    const aspectRatio = 11 / 8.5
    const heightPx = widthPx * aspectRatio

    return (
        <FirebaseContext.Provider value = {{
            database
        }}>
            <div className="App">
                <Grid
                    dbPath={'Grids/'}
                    grid_id={'0'}
                    widthPx={widthPx}
                    heightPx={heightPx}
                />
            </div>
        </FirebaseContext.Provider>
    );
}
export default App;
