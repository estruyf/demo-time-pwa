import { useApi } from './hooks/useApi';
import { Connection } from './components/Connection';
import { NextDemo } from './components/NextDemo';
import { DemoList } from './components/DemoList';

function App() {
  const {
    connectionStatus,
    apiData,
    loading,
    connect,
    disconnect,
    triggerNext,
    runById,
    refreshData,
  } = useApi();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-2xl font-bold text-white">DT</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent mb-3">
            Demo Time Remote
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Professional remote control for your live coding presentations
          </p>
        </header>

        <div className="space-y-8">
          <Connection
            connectionStatus={connectionStatus}
            loading={loading}
            onConnect={connect}
            onDisconnect={disconnect}
          />

          {connectionStatus.connected && apiData && (
            <>
              <NextDemo
                nextDemo={apiData.nextDemo}
                onTriggerNext={triggerNext}
                onRefresh={refreshData}
              />

              <DemoList
                apiData={apiData}
                onRunById={runById}
              />
            </>
          )}
        </div>

        {connectionStatus.connected && (
          <footer className="mt-12 text-center">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <p className="text-gray-400 font-medium">
                Connected to <span className="text-blue-400 font-semibold">{connectionStatus.url}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live updates enabled • Add to home screen for best experience
              </p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
