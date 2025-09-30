import React, { useState } from 'react';
import { ConnectionStatus } from '../types/api';

interface ConnectionProps {
  connectionStatus: ConnectionStatus;
  loading: boolean;
  onConnect: (url: string) => void;
  onDisconnect: () => void;
}

export const Connection: React.FC<ConnectionProps> = ({
  connectionStatus,
  loading,
  onConnect,
  onDisconnect,
}) => {
  const [url, setUrl] = useState('localhost:3710');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onConnect(url.trim());
    }
  };

  if (connectionStatus.connected) {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="status-connected flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Connected
            </div>
            <div className="text-sm text-gray-300">
              {connectionStatus.url}
            </div>
          </div>
          <button
            onClick={onDisconnect}
            className="btn-danger text-sm px-4 py-2"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Connect to Demo Time
        </h2>
        <p className="text-gray-400">Enter your Demo Time API server address</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-semibold text-gray-300 mb-3">
            API Server URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="localhost:3710"
            className="input-field w-full text-lg"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-2">
            Usually localhost:3710 when running Demo Time with API enabled
          </p>
        </div>

        {connectionStatus.error && (
          <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-500/50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-red-400">⚠️</div>
              <p className="text-red-300 font-medium">
                Connection failed: {connectionStatus.error}
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Connecting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🔗 Connect to Demo Time
            </span>
          )}
        </button>
      </form>

      <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-4">
        <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
          <span className="text-lg">📋</span>
          Setup Instructions
        </h3>
        <ol className="text-sm text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">1.</span>
            Enable the API in Demo Time VS Code extension settings
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">2.</span>
            Enter the API URL shown in the extension
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">3.</span>
            Connect and start controlling your demos remotely
          </li>
        </ol>
      </div>
    </div>
  );
};
