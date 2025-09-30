export interface DemoFile {
  filePath: string;
  demos: {
    id: string;
    title: string;
  }[];
}

export interface NextDemo {
  title: string;
  id: string;
}

export interface CurrentDemoFile {
  filePath: string;
  demo: {
    title: string;
    id: string;
  }[];
}

export interface ApiData {
  demoFiles: DemoFile[];
  nextDemo?: NextDemo;
  currentDemoFile?: CurrentDemoFile;
}

export interface ConnectionStatus {
  connected: boolean;
  url?: string;
  error?: string;
}
