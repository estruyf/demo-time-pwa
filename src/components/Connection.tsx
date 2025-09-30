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
}) => {
  const [url, setUrl] = useState('localhost:3710');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onConnect(url.trim());
    }
  };

  if (connectionStatus.connected) {
    return null;
  }

  return (
    <div className="card">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
          Connect to Demo Time
        </h2>
        <p className="text-sm md:text-base text-gray-400">Enter your Demo Time API server address</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
            API Server URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="localhost:3710"
            className="input-field w-full text-base md:text-lg"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-2">
            Usually localhost:3710 when running Demo Time
          </p>
        </div>

        {connectionStatus.error && (
          <div className="bg-red-900/30 border border-red-500/40 rounded-lg p-3">
            <p className="text-red-300 text-sm">
              {connectionStatus.error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="btn-primary w-full text-base md:text-lg py-3.5 md:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Connecting...
            </span>
          ) : (
            'Connect to Demo Time'
          )}
        </button>
      </form>

      <div className="mt-6 bg-gray-800/20 border border-gray-700/30 rounded-lg p-4">
        <h3 className="font-semibold text-[#FFD23F] text-sm mb-2">
          Quick Setup
        </h3>
        <ol className="text-xs md:text-sm text-gray-400 space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-[#FFD23F] font-semibold">1.</span>
            <span>Enable API in Demo Time settings</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FFD23F] font-semibold">2.</span>
            <span>Enter the API URL above</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FFD23F] font-semibold">3.</span>
            <span>Control demos remotely</span>
          </li>
        </ol>
      </div>
    </div>
  );
};
