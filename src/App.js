import Grid from './components/Grid';

import './App.css';

const App = () => {
    return (
        <div className="App">
            <Grid
                gridSize={{
                    widthVw: 900,
                    aspectRatio: 11 / 8.5
                }}
            />
        </div>
    );
}
export default App;
