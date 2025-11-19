import { useState } from 'react';
import { Plus, MapPin } from 'lucide-react';
import { StatsCards } from './StatsCards';
import { TrashBinCard } from './TrashBinCard';

export interface TrashBin {
  id: string;
  name: string;
  location: string;
  fillLevel: number;
  status: 'online' | 'offline';
  lastUpdate: string;
}

const initialBins: TrashBin[] = [
  {
    id: '1',
    name: 'Lixeira #1',
    location: 'Estacionamento P3',
    fillLevel: 94,
    status: 'online',
    lastUpdate: '09:42'
  }
];

export function Dashboard() {
  const [bins, setBins] = useState<TrashBin[]>(initialBins);
  const [filter, setFilter] = useState<'all' | 'today' | 'yesterday' | 'partial' | 'offline'>('all');

  const addNewBin = () => {
    const newBin: TrashBin = {
      id: Date.now().toString(),
      name: `Lixeira #${bins.length + 1}`,
      location: 'Nova Localização',
      fillLevel: Math.floor(Math.random() * 100),
      status: 'online',
      lastUpdate: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setBins([...bins, newBin]);
  };

  const updateBinFillLevel = (id: string) => {
    setBins(bins.map(bin => 
      bin.id === id 
        ? { ...bin, fillLevel: Math.floor(Math.random() * 100), lastUpdate: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }
        : bin
    ));
  };

  const removeBin = (id: string) => {
    setBins(bins.filter(bin => bin.id !== id));
  };

  // Calculate stats
  const fullBins = bins.filter(bin => bin.fillLevel >= 90 && bin.status === 'online').length;
  const averageFill = bins.length > 0 
    ? Math.round(bins.reduce((sum, bin) => sum + bin.fillLevel, 0) / bins.length)
    : 0;
  const criticalBins = bins.filter(bin => bin.fillLevel >= 95 && bin.status === 'online').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Dashboard — Lixeira Inteligente</h1>
              <p className="text-gray-500 text-sm mt-1">Monitoramento em tempo real do nível de lixeiras</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Campus Joinville</span>
              </div>
              <div className="text-sm text-gray-600">
                Última sync: <span className="font-medium">08:42</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('today')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filter === 'today'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hoje
              </button>
              <button
                onClick={() => setFilter('yesterday')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filter === 'yesterday'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ontem
              </button>
              <button
                onClick={() => setFilter('partial')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filter === 'partial'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Parcial
              </button>
              <button
                onClick={() => setFilter('offline')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filter === 'offline'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Offline
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Ordenar:</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                <option>Prioridade</option>
                <option>Nome</option>
                <option>Nível</option>
                <option>Localização</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards 
          fullBins={fullBins}
          averageFill={averageFill}
          criticalBins={criticalBins}
        />

        {/* Trash Bins Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Lixeiras</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{bins.length} resultado{bins.length !== 1 ? 's' : ''}</span>
              <button
                onClick={addNewBin}
                className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar Lixeira
              </button>
            </div>
          </div>

          {bins.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Nenhuma lixeira cadastrada. Clique em "Adicionar Lixeira" para começar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bins.map(bin => (
                <TrashBinCard
                  key={bin.id}
                  bin={bin}
                  onUpdate={updateBinFillLevel}
                  onRemove={removeBin}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
