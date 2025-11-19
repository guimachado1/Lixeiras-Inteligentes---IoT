import { MapPin, Trash2, RefreshCw } from "lucide-react";
import type { TrashBin } from "./Dashboard";

interface TrashBinCardProps {
  bin: TrashBin;
  onUpdate: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TrashBinCard({
  bin,
  onUpdate,
  onRemove,
}: TrashBinCardProps) {
  const getStatusColor = (fillLevel: number) => {
    if (fillLevel >= 90) return "text-red-600";
    if (fillLevel >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  const getProgressColor = (fillLevel: number) => {
    if (fillLevel >= 90) return "bg-red-500";
    if (fillLevel >= 70) return "bg-yellow-500";
    return "bg-teal-500";
  };

  const getStatusText = (fillLevel: number, status: string) => {
    if (status === "offline") return "Offline";
    if (fillLevel >= 90) return "Cheia";
    return "Online";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-900">{bin.name}</h3>
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(bin.fillLevel)}`}
            >
              <span className="w-2 h-2 rounded-full bg-current"></span>
              {getStatusText(bin.fillLevel, bin.status)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{bin.location}</span>
          </div>
        </div>
        <button
          onClick={() => onRemove(bin.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Remover lixeira"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Fill Level */}
      <div className="mb-4">
        <div className="flex items-end justify-between mb-2">
          <span className="text-gray-900">
            {bin.fillLevel}%
          </span>
          <span className="text-sm text-gray-500">
            Última: {bin.lastUpdate}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor(bin.fillLevel)} transition-all duration-500`}
            style={{ width: `${bin.fillLevel}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Detalhar
        </button>
        <button
          onClick={() => onUpdate(bin.id)}
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          title="Atualizar nível"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}