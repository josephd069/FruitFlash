import Routes from './router.jsx';
import { useGame } from './GameProvider.jsx';

export default function App() {
  const { state } = useGame();           // global HUD later
  return (
    <div className="h-screen flex flex-col items-center bg-[#0f2c2c] text-gray-900">
      <Routes />
    </div>
  );
}