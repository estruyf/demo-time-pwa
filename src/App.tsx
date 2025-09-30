import { useApi } from './hooks/useApi';
import { Connection } from './components/Connection';
import { DemoList } from './components/DemoList';
import { InstallPrompt } from './components/InstallPrompt';

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
    <div className="min-h-screen bg-[#202736] text-white flex flex-col">
      <InstallPrompt />
      <div className="container mx-auto px-4 py-6 max-w-4xl flex-shrink-0">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-[#FFD23F] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-[#202736]">DT</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Demo Time Remote
          </h1>
          <p className="text-lg text-gray-400">
            Remote control for live coding presentations
          </p>
        </header>

        <div className="space-y-6">
          <Connection
            connectionStatus={connectionStatus}
            loading={loading}
            onConnect={connect}
            onDisconnect={disconnect}
          />
        </div>
      </div>

      {connectionStatus.connected && apiData && (
        <div className="container mx-auto px-4 max-w-4xl flex-1 overflow-hidden pb-32">
          <DemoList
            apiData={apiData}
            onRunById={runById}
          />
        </div>
      )}

      {connectionStatus.connected && apiData && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1a1f2e] border-t border-gray-700/50 shadow-2xl">
          <div className="container mx-auto px-4 py-4 max-w-4xl">
            {apiData.nextDemo && (
              <div className="bg-gray-800/60 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-400 mb-1">NEXT UP</p>
                <p className="font-semibold text-white text-sm">{apiData.nextDemo.title}</p>
              </div>
            )}
            <button
              onClick={async () => {
                try {
                  await triggerNext(true);
                  setTimeout(() => refreshData(), 500);
                } catch (error) {
                  console.error('Failed to trigger next demo:', error);
                }
              }}
              disabled={loading}
              className="w-full btn-primary text-lg py-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Starting...' : apiData.nextDemo ? '▶ Next Demo' : '🚀 Start Demo'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
