import { GarageProvider } from './state/GarageContext';
import { NavigationProvider } from './state/NavigationContext';
import { AppShell } from './components/AppShell';

function App() {
  return (
    <GarageProvider>
      <NavigationProvider>
        <AppShell />
      </NavigationProvider>
    </GarageProvider>
  );
}

export default App;
