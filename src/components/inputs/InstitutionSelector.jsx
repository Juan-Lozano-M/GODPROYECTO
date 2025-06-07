import { useState, useEffect } from 'react';

const InstitutionSelector = ({ value, onChange, onSuccess }) => {
  const [institutions, setInstitutions] = useState([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('TODOS');
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(value || '');

  const fetchSchools = async () => {
    try {
      const [apiRes, ibagueRes] = await Promise.all([
        fetch('https://www.datos.gov.co/resource/asz7-yxne.json?$limit=1000000'),
        fetch('/src/data/ibague_escuelas.json')
      ]);

      const apiData = await apiRes.json();
      const ibagueData = await ibagueRes.json();

      const apiSchools = apiData.map(inst => ({
        id: inst.codigo_dane_establecimiento || inst.id,
        name: inst.nombre_establecimiento || 'Sin nombre',
        city: inst.municipio || 'Sin especificar',
        department: inst.departamento || 'Sin especificar'
      }));

      return [...apiSchools, ...ibagueData];
    } catch (error) {
      console.error('Error fetching schools:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadInstitutions = async () => {
      setIsLoading(true);
      try {
        let schools = await fetchSchools();

        const uniqueMap = new Map();
        schools.forEach(inst => {
          if (!uniqueMap.has(inst.name)) {
            uniqueMap.set(inst.name, inst);
          }
        });
        const uniqueInstitutions = Array.from(uniqueMap.values());

        const sorted = uniqueInstitutions.sort((a, b) => a.name.localeCompare(b.name));
        setInstitutions(sorted);

        const departments = Array.from(
          new Set(
            sorted
              .map(inst => inst.department?.trim())
              .filter(dep => dep && dep.length > 0)
          )
        ).sort();
        setAvailableDepartments(departments);

        setFilteredInstitutions(sorted.slice(0, 50));
      } catch (error) {
        console.error('Error loading institutions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInstitutions();
  }, []);

  useEffect(() => {
    let filtered = institutions;

    if (departmentFilter !== 'TODOS') {
      filtered = filtered.filter(inst => inst.department === departmentFilter);
    }

    if (searchTerm.length >= 2) {
      filtered = filtered.filter(inst =>
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInstitutions(filtered.slice(0, 30));
  }, [searchTerm, departmentFilter, institutions]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowDropdown(term.length > 0 || selectedInstitution.length > 0);
  };

  const handleSelectInstitution = (institution) => {
    setSelectedInstitution(institution.name);
    setSearchTerm('');
    setShowDropdown(false);
    if (onChange) onChange(institution.name);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="relative space-y-2">
      {/* Input de búsqueda y filtro por departamento en la misma línea */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={showDropdown ? searchTerm : selectedInstitution}
            onChange={handleSearch}
            onFocus={() => setShowDropdown(true)}
            placeholder="Buscar institución educativa..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#87C232] focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#87C232]"></div>
            ) : (
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
        </div>

        {/* Filtro por departamento */}
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="px-2 py-2 border border-gray-300 rounded-lg text-xs w-auto max-w-[150px]"
        >
          <option value="TODOS">Todos los departamentos</option>
          {availableDepartments.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
      </div>

      {/* Dropdown de resultados */}
      {showDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredInstitutions.length > 0 ? (
            filteredInstitutions.map((institution, index) => (
              <div
                key={institution.id || `${institution.name}-${index}`}
                onClick={() => handleSelectInstitution(institution)}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <p className="font-medium text-gray-900 text-sm leading-tight">
                  {institution.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {institution.city} • {institution.department}
                </p>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-center text-gray-500 text-sm">
              {searchTerm.length < 2
                ? 'Escribe al menos 2 caracteres para buscar'
                : 'No se encontraron instituciones'}
            </div>
          )}
        </div>
      )}

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default InstitutionSelector;