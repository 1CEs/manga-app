import { StatusBar } from 'expo-status-bar';

import './global.css';
import { Init } from 'screen/Init';

export default function App() {
  return (
    <>
      <Init />
      <StatusBar style="light" />
    </>
  );
}
