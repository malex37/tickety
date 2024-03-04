import { ElectronAPI } from '@electron-toolkit/preload';
import { Definitions } from '@models/api/Definitions';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: Definitions;
  }
}
