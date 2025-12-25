'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Activity, getActivities } from '../data/activities';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const activityTypes = [
  { value: 'COURSE', label: 'Curso' },
  { value: 'WORKSHOP', label: 'Workshop' },
  { value: 'SEMINAR', label: 'Seminário' },
  { value: 'RESEARCH', label: 'Pesquisa' },
  { value: 'EXTENSION', label: 'Extensão' },
  { value: 'OTHER', label: 'Outro' },
];

const statusChoices = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em Andamento' },
  { value: 'COMPLETED', label: 'Concluída' },
  { value: 'CANCELLED', label: 'Cancelada' },
];

const getTypeGradient = (type: string) => {
  switch (type) {
    case 'COURSE': return 'bg-gradient-to-r from-blue-500 to-indigo-600';
    case 'WORKSHOP': return 'bg-gradient-to-r from-purple-500 to-violet-600';
    case 'SEMINAR': return 'bg-gradient-to-r from-emerald-500 to-teal-600';
    case 'RESEARCH': return 'bg-gradient-to-r from-amber-500 to-orange-600';
    case 'EXTENSION': return 'bg-gradient-to-r from-rose-500 to-pink-600';
    default: return 'bg-gradient-to-r from-gray-500 to-slate-600';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'COURSE': return '📚';
    case 'WORKSHOP': return '🛠️';
    case 'SEMINAR': return '🎯';
    case 'RESEARCH': return '🔬';
    case 'EXTENSION': return '🤝';
    default: return '📌';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
    case 'UPCOMING':
      return 'bg-yellow-100 text-yellow-800';
    case 'IN_PROGRESS':
    case 'ACTIVE':
      return 'bg-blue-100 text-blue-800';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'PENDING': return 'Pendente';
    case 'UPCOMING': return 'Pendente';
    case 'IN_PROGRESS': return 'Em Andamento';
    case 'ACTIVE': return 'Em Andamento';
    case 'COMPLETED': return 'Concluída';
    case 'CANCELLED': return 'Cancelada';
    default: return status;
  }
};

const getTypeText = (type: string) => {
  switch (type) {
    case 'COURSE': return 'Curso';
    case 'WORKSHOP': return 'Workshop';
    case 'SEMINAR': return 'Seminário';
    case 'RESEARCH': return 'Pesquisa';
    case 'EXTENSION': return 'Extensão';
    case 'OTHER': return 'Outro';
    default: return type;
  }
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [searchResults, setSearchResults] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput) params.set('search', searchInput);
    if (typeFilter) params.set('type', typeFilter);
    if (statusFilter) params.set('status', statusFilter);
    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';

    setSearchInput(search);
    setTypeFilter(type);
    setStatusFilter(status);

    setLoading(true);
    const activities = getActivities();

    if (!search && !type && !status) {
      setSearchResults(activities);
      setLoading(false);
      return;
    }

    const results = activities.filter(activity => {
      let matches = true;

      if (search) {
        const searchQuery = search.toLowerCase();
        matches = matches && (
          activity.title.toLowerCase().includes(searchQuery) ||
          activity.description.toLowerCase().includes(searchQuery) ||
          activity.coordinator.toLowerCase().includes(searchQuery) ||
          activity.location.toLowerCase().includes(searchQuery) ||
          activity.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
      }

      if (type) {
        matches = matches && activity.type === type;
      }

      if (status) {
        if (status === 'UPCOMING') {
          matches = matches && (activity.status === 'PENDING' || activity.status === 'UPCOMING');
        } else if (status === 'ACTIVE') {
          matches = matches && (activity.status === 'IN_PROGRESS' || activity.status === 'ACTIVE');
        } else {
          matches = matches && activity.status === status;
        }
      }

      return matches;
    });

    setSearchResults(results);
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">Pesquisar Atividades</h1>
            <p className="text-gray-500 dark:text-gray-400">Encontre atividades da UFC Sobral</p>
          </div>
        </div>

        {/* Formulário de Busca */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Campo de busca */}
            <div className="flex-1 min-w-[250px]">
              <label htmlFor="search" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Buscar
              </label>
              <input
                type="text"
                name="search"
                id="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Digite sua busca..."
                autoFocus
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-white transition-all duration-200 focus:border-blue-500 focus:outline-none hover:border-blue-300"
              />
            </div>

            {/* Filtro por Tipo */}
            <div className="w-full md:w-[180px]">
              <label htmlFor="type" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tipo
              </label>
              <select
                name="type"
                id="type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-white transition-all duration-200 focus:border-blue-500 focus:outline-none hover:border-blue-300"
              >
                <option value="">Todos os tipos</option>
                {activityTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Status */}
            <div className="w-full md:w-[180px]">
              <label htmlFor="status" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-white transition-all duration-200 focus:border-blue-500 focus:outline-none hover:border-blue-300"
              >
                <option value="">Todos os status</option>
                {statusChoices.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão de Busca */}
            <div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar
              </button>
            </div>
          </div>
        </form>

        {/* Resultados */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((activity) => (
              <Link href={`/atividades/${activity.id}`} key={activity.id} className="group block">
                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Barra colorida por tipo */}
                  <div className={`h-1.5 w-full ${getTypeGradient(activity.type)}`}></div>
                  
                  <div className="p-5">
                    {/* Badges e Ícone */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {getStatusText(activity.status)}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {getTypeText(activity.type)}
                        </span>
                      </div>
                      <div className="text-2xl">
                        {getTypeIcon(activity.type)}
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {activity.title}
                    </h3>

                    {/* Metadados */}
                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{format(new Date(activity.startDate), "dd/MM/yyyy", { locale: ptBR })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{activity.coordinator}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{activity.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-300 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhuma atividade encontrada
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              {searchInput ? (
                <>Não encontramos resultados para &quot;{searchInput}&quot;. Tente outros termos.</>
              ) : (
                <>Digite algo para pesquisar atividades.</>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
