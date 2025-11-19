interface StatsCardsProps {
  fullBins: number;
  averageFill: number;
  criticalBins: number;
}

export function StatsCards({ fullBins, averageFill, criticalBins }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cheias */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">Cheias</p>
            <p className="text-gray-900 mb-1">{fullBins}</p>
            <p className="text-sm text-gray-500">Lixeiras acima de 90%</p>
          </div>
        </div>
      </div>

      {/* Média % */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">Média %</p>
            <p className="text-gray-900 mb-1">{averageFill}</p>
            <p className="text-sm text-gray-500">Nível médio do campus</p>
          </div>
        </div>
      </div>

      {/* Lotadas */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">Lotadas</p>
            <p className="text-gray-900 mb-1">{criticalBins}</p>
            <p className="text-sm text-gray-500">Lixeiras acima de 95%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
