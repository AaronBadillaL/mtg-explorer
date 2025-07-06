import React, { useState, useEffect } from 'react';
import './Cards.css';
import Select from 'react-select';
import type {
  StylesConfig,
  MultiValue,
} from 'react-select';

interface FilterForm {
  name: string;
  type: string[];
  color: string[];
  rarity: string[];
  manaCost: string;
  set: string[];
}

interface Set {
  name: string;
  code: string;
  icon: string;
}

interface ColorSymbol {
  code: string;
  name: string;
  icon: string;
}

// Definir tipo para los resultados de cartas
interface CardResult {
  id: string;
  name: string;
  image_uris?: { normal: string };
  card_faces?: { 
    image_uris: { normal: string }, 
    oracle_text?: string, 
    name: string,
    type_line?: string,
    mana_cost?: string,
    power?: string,
    toughness?: string,
    loyalty?: string
  }[];
  type_line?: string;
  oracle_text?: string;
  mana_cost?: string;
  cmc?: number;
  rarity?: string;
  set_name?: string;
  set?: string;
  collector_number?: string;
  power?: string;
  toughness?: string;
  loyalty?: string;
  colors?: string[];
  color_identity?: string[];
  flavor_text?: string;
  artist?: string;
  printed_name?: string;
  printed_type_line?: string;
  printed_text?: string;
}

const colorSymbols: ColorSymbol[] = [
  { code: 'W', name: 'Blanco', icon: 'https://svgs.scryfall.io/card-symbols/W.svg' },
  { code: 'U', name: 'Azul', icon: 'https://svgs.scryfall.io/card-symbols/U.svg' },
  { code: 'B', name: 'Negro', icon: 'https://svgs.scryfall.io/card-symbols/B.svg' },
  { code: 'R', name: 'Rojo', icon: 'https://svgs.scryfall.io/card-symbols/R.svg' },
  { code: 'G', name: 'Verde', icon: 'https://svgs.scryfall.io/card-symbols/G.svg' },
  { code: 'C', name: 'Incoloro', icon: 'https://svgs.scryfall.io/card-symbols/C.svg' }
];

type OptionType = { value: string; label: React.ReactNode; name?: string; icon?: string };

const typeOptions: OptionType[] = [
  { value: 'creature', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>🧙 Creature</span> },
  { value: 'instant', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>⚡ Instant</span> },
  { value: 'sorcery', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>✨ Sorcery</span> },
  { value: 'enchantment', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>🔮 Enchantment</span> },
  { value: 'artifact', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>⚙️ Artifact</span> },
  { value: 'planeswalker', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>🧝 Planeswalker</span> },
  { value: 'land', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>Land</span> },
];

const rarityOptions: OptionType[] = [
  { value: 'common', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>⚫ Común</span> },
  { value: 'uncommon', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>⚪ Poco común</span> },
  { value: 'rare', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>🟡 Rara</span> },
  { value: 'mythic', label: <span style={{display: 'flex', alignItems: 'center', gap: 6}}>🔴 Mítica</span> },
];

// Estilos para react-select en modo claro/oscuro y focus
const selectStyles: StylesConfig<OptionType, true> = {
  control: (base, state) => ({
    ...base,
    minHeight: 38,
    borderRadius: 8,
    border: '1.5px solid var(--select-border)',
    background: 'var(--select-bg)',
    color: 'var(--select-text)',
    boxShadow: state.isFocused ? 'var(--select-shadow)' : 'none',
    borderColor: state.isFocused ? '#4f8cff' : 'var(--select-border)',
    transition: 'border 0.2s, box-shadow 0.2s',
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: 6,
    background: 'var(--select-multivalue-bg)',
    color: 'var(--select-text)',
  }),
  option: (base, state) => ({
    ...base,
    color: 'var(--select-text)',
    backgroundColor: state.isSelected
      ? 'var(--select-option-selected)'
      : state.isFocused
      ? 'var(--select-option-focused)'
      : 'var(--select-bg)',
    transition: 'background 0.15s',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--select-placeholder)',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 10,
    background: 'var(--select-bg)',
    color: 'var(--select-text)',
  }),
  input: (base) => ({
    ...base,
    color: 'var(--select-text)',
    background: 'transparent',
  }),
};

// Función para obtener el color de la rareza
const getRarityColor = (rarity: string): string => {
  const colorMap: { [key: string]: string } = {
    'common': '#666',
    'uncommon': '#999',
    'rare': '#ffd700',
    'mythic': '#ff6b6b',
    'special': '#4f8cff',
    'bonus': '#9c27b0'
  };
  return colorMap[rarity] || '#666';
};

// Función para formatear la rareza
const formatRarity = (rarity: string): string => {
  const rarityMap: { [key: string]: string } = {
    'common': 'Común',
    'uncommon': 'Poco común', 
    'rare': 'Rara',
    'mythic': 'Mítica',
    'special': 'Especial',
    'bonus': 'Bonus'
  };
  return rarityMap[rarity] || rarity;
};

// Componente para renderizar el coste de maná con símbolos SVG
const ManaCost: React.FC<{ manaCost: string }> = ({ manaCost }) => {
  if (!manaCost) return null;
  
  const symbols = manaCost.match(/\{([^}]+)\}/g)?.map(symbol => {
    const cleanSymbol = symbol.replace(/[{}]/g, '');
    const symbolUrl = `https://svgs.scryfall.io/card-symbols/${cleanSymbol}.svg`;
    
    return (
      <img 
        key={symbol} 
        src={symbolUrl} 
        alt={cleanSymbol} 
        style={{ 
          width: '16px', 
          height: '16px', 
          display: 'inline-block',
          margin: '0 1px',
          verticalAlign: 'middle'
        }} 
      />
    );
  }) || [];
  
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>{symbols}</span>;
};

// Componente para renderizar el texto de la carta con símbolos de maná
const CardText: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;
  
  // Dividir el texto por símbolos de maná y mantener los símbolos
  const parts = text.split(/(\{[^}]+\})/g);
  
  return (
    <span>
      {parts.map((part, index) => {
        if (part.match(/^\{[^}]+\}$/)) {
          // Es un símbolo de maná
          const cleanSymbol = part.replace(/[{}]/g, '');
          const symbolUrl = `https://svgs.scryfall.io/card-symbols/${cleanSymbol}.svg`;
          
          return (
            <img 
              key={index} 
              src={symbolUrl} 
              alt={cleanSymbol} 
              style={{ 
                width: '14px', 
                height: '14px', 
                display: 'inline-block',
                margin: '0 1px',
                verticalAlign: 'middle'
              }} 
            />
          );
        } else {
          // Es texto normal
          return <span key={index}>{part}</span>;
        }
      })}
    </span>
  );
};

// Función para limpiar y validar códigos de edición
const cleanSetCode = (setCode: string): string => {
  return setCode.toLowerCase().replace(/[^a-z0-9]/g, '');
};

const Cards: React.FC = () => {
  const [filters, setFilters] = useState<FilterForm>({
    name: '',
    type: [],
    color: [],
    rarity: [],
    manaCost: '',
    set: []
  });

  const [sets, setSets] = useState<Set[]>([]);
  const [isLoadingSets, setIsLoadingSets] = useState(true);

  const [cardResults, setCardResults] = useState<CardResult[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [errorCards, setErrorCards] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 15;
  const [selectedCard, setSelectedCard] = useState<CardResult | null>(null);

  useEffect(() => {
    const loadSets = async () => {
      try {
        const res = await fetch('https://api.scryfall.com/sets');
        const data = await res.json();

        const today = new Date();

        // Tipos de set permitidos (jugables)
        const allowedTypes = [
          "core", "expansion", "masters", "draft_innovation", "commander", "starter",
          "duel_deck", "from_the_vault", "spellbook", "premium_deck", "remaster",
          "alchemy", "arsenal", "planechase", "archenemy", "vanguard"
        ];

        const filteredSets = data.data
          .filter((set: { released_at: string, set_type: string }) =>
            set.released_at &&
            new Date(set.released_at) < today &&
            allowedTypes.includes(set.set_type)
          )
          .map((set: { name: string; code: string; icon_svg_uri: string }) => ({
            name: set.name,
            code: set.code,
            icon: set.icon_svg_uri
          }))
          .sort((a: Set, b: Set) => b.name.localeCompare(a.name));

        setSets(filteredSets);
      } catch (error) {
        console.error('Error loading sets:', error);
      } finally {
        setIsLoadingSets(false);
      }
    };

    loadSets();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, multiple, options } = e.target as HTMLSelectElement;
    if (multiple) {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFilters(prev => ({
        ...prev,
        [name]: selectedValues
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleColorChange = (color: string) => {
    setFilters(prev => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter(c => c !== color)
        : [...prev.color, color]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingCards(true);
    setErrorCards(null);
    setCardResults([]);
    try {
      // Construir la query de Scryfall de manera más robusta
      const queryParts: string[] = [];
      
      // Nombre de la carta
      if (filters.name.trim()) {
        queryParts.push(`name:"${filters.name.trim()}"`);
      }
      
      // Tipos de carta
      if (filters.type.length > 0) {
        const typeQuery = filters.type.map(t => `t:${t}`).join(' OR ');
        queryParts.push(`(${typeQuery})`);
      }
      
      // Colores
      if (filters.color.length > 0) {
        const colorQuery = filters.color.join('');
        queryParts.push(`c:${colorQuery}`);
      }
      
      // Rareza
      if (filters.rarity.length > 0) {
        const rarityQuery = filters.rarity.map(r => `r:${r}`).join(' OR ');
        queryParts.push(`(${rarityQuery})`);
      }
      
      // Coste de maná
      if (filters.manaCost.trim()) {
        queryParts.push(`mana:"${filters.manaCost.trim()}"`);
      }
      
      // Ediciones - manejar múltiples ediciones correctamente
      if (filters.set.length > 0) {
        if (filters.set.length === 1) {
          queryParts.push(`set:${cleanSetCode(filters.set[0])}`);
        } else {
          // Para múltiples ediciones, usar OR
          const setQuery = filters.set.map(s => `set:${cleanSetCode(s)}`).join(' OR ');
          queryParts.push(`(${setQuery})`);
        }
      }
      
      const query = queryParts.join(' ');
      console.log('Query construida:', query); // Para debugging
      
      // Validar que la query no esté vacía
      if (!query.trim()) {
        throw new Error('Por favor, especifica al menos un filtro para buscar cartas.');
      }
      
      const res = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      if (data.object === 'error') {
        console.error('Error de Scryfall:', data);
        
        // Manejar errores específicos de Scryfall
        if (data.code === 'not_found') {
          throw new Error('No se encontraron cartas con los filtros especificados. Intenta con filtros menos restrictivos.');
        } else if (data.code === 'bad_request') {
          throw new Error('Los filtros especificados no son válidos. Verifica la sintaxis de tu búsqueda.');
        } else if (data.code === 'rate_limited') {
          throw new Error('Demasiadas solicitudes. Espera un momento y vuelve a intentar.');
        } else {
          throw new Error(data.details || 'Error en la búsqueda de Scryfall');
        }
      }
      
      setCardResults(data.data || []);
      setShowFilters(false);
    } catch (error: unknown) {
      console.error('Error completo:', error);
      if (error instanceof Error) {
        setErrorCards(error.message || 'Error desconocido');
      } else {
        setErrorCards('Error desconocido');
      }
    } finally {
      setIsLoadingCards(false);
    }
  };

  // Generar las opciones para react-select a partir de sets
  const setOptions: OptionType[] = sets.map(set => ({
    value: set.code,
    label: (
      <span style={{display: 'flex', alignItems: 'center', gap: 6}}>
        <img src={set.icon} alt={set.name} style={{width: 18, height: 18, marginRight: 4}} />
        {set.name}
      </span>
    ),
    name: set.name,
    icon: set.icon,
  }));

  // Función de filtrado personalizada para react-select
  const filterOption = (option: { data: OptionType }, inputValue: string) => {
    const optionName = option.data.name?.toLowerCase() || '';
    const optionCode = option.data.value?.toLowerCase() || '';
    const input = inputValue.toLowerCase();
    
    return optionName.includes(input) || optionCode.includes(input);
  };

  // Calcular cartas filtradas y paginadas
  const filteredCards = cardResults.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (card.type_line && card.type_line.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const totalPages = Math.max(1, Math.ceil(filteredCards.length / CARDS_PER_PAGE));
  const paginatedCards = filteredCards.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, cardResults]);

  return (
    <div className="cards-container">
      {/* Modal de carta grande */}
      {selectedCard && (
        <div className="card-modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="card-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedCard(null)} aria-label="Cerrar">×</button>
            {/* Si es de doble cara, mostrar ambas */}
            {selectedCard.card_faces && selectedCard.card_faces.length > 1 ? (
              <div className="modal-faces">
                {selectedCard.card_faces.map((face, idx) => (
                  <div key={idx} className="modal-face">
                    <img src={face.image_uris.normal} alt={face.name} className="modal-card-img" />
                    <div className="modal-card-name"><strong>{face.name}</strong></div>
                    
                    {/* Información detallada de la cara */}
                    <div className="modal-card-details">
                      {face.mana_cost && (
                        <div className="modal-detail-item">
                          <span className="detail-label">Coste de maná:</span>
                          <span className="detail-value">
                            <ManaCost manaCost={face.mana_cost} />
                          </span>
                        </div>
                      )}
                      
                      {face.type_line && (
                        <div className="modal-detail-item">
                          <span className="detail-label">Tipo:</span>
                          <span className="detail-value">{face.type_line}</span>
                        </div>
                      )}
                      
                      {(face.power || face.toughness) && (
                        <div className="modal-detail-item">
                          <span className="detail-label">Poder/Resistencia:</span>
                          <span className="detail-value">{face.power}/{face.toughness}</span>
                        </div>
                      )}
                      
                      {face.loyalty && (
                        <div className="modal-detail-item">
                          <span className="detail-label">Lealtad:</span>
                          <span className="detail-value">{face.loyalty}</span>
                        </div>
                      )}
                    </div>
                    
                    {face.oracle_text && (
                      <div className="modal-card-text">
                        <CardText text={face.oracle_text} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <img src={selectedCard.image_uris?.normal || selectedCard.card_faces?.[0]?.image_uris?.normal} alt={selectedCard.name} className="modal-card-img" />
                <div className="modal-card-name"><strong>{selectedCard.name}</strong></div>
                
                {/* Información detallada de la carta */}
                <div className="modal-card-details">
                  {selectedCard.mana_cost && (
                    <div className="modal-detail-item">
                      <span className="detail-label">Coste de maná:</span>
                      <span className="detail-value">
                        <ManaCost manaCost={selectedCard.mana_cost} />
                      </span>
                    </div>
                  )}
                  
                  {selectedCard.cmc !== undefined && (
                    <div className="modal-detail-item">
                      <span className="detail-label">Coste de maná convertido:</span>
                      <span className="detail-value">{selectedCard.cmc}</span>
                    </div>
                  )}
                  
                  {selectedCard.type_line && (
                    <div className="modal-detail-item">
                      <span className="detail-label">Tipo:</span>
                      <span className="detail-value">{selectedCard.type_line}</span>
                    </div>
                  )}
                  
                  {selectedCard.rarity && (
                    <div className="modal-detail-item">
                      <span className="detail-label">Rareza:</span>
                      <span className="detail-value" style={{color: getRarityColor(selectedCard.rarity)}}>
                        {formatRarity(selectedCard.rarity)}
                      </span>
                    </div>
                  )}
                  
                  {(selectedCard.power || selectedCard.toughness) && (
                    <div className="modal-detail-item">
                      <span className="detail-label">Poder/Resistencia:</span>
                      <span className="detail-value">{selectedCard.power}/{selectedCard.toughness}</span>
                    </div>
                  )}
                  
                  {selectedCard.loyalty && (
                    <div className="modal-detail-item">
                      <span className="detail-label">Lealtad:</span>
                      <span className="detail-value">{selectedCard.loyalty}</span>
                    </div>
                  )}
                  
                  {selectedCard.set_name && (
                    <div className="modal-detail-item">
                      <span className="detail-label">Edición:</span>
                      <span className="detail-value">{selectedCard.set_name}</span>
                    </div>
                  )}
                  
                  {selectedCard.collector_number && (
                    <div className="modal-detail-item">
                      <span className="detail-label">Número:</span>
                      <span className="detail-value">{selectedCard.collector_number}</span>
                    </div>
                  )}
                  
                  {selectedCard.artist && (
                    <div className="modal-detail-item">
                      <span className="detail-label">Artista:</span>
                      <span className="detail-value">{selectedCard.artist}</span>
                    </div>
                  )}
                </div>
                
                {selectedCard.oracle_text && (
                  <div className="modal-card-text">
                    <CardText text={selectedCard.oracle_text} />
                  </div>
                )}
                
                {selectedCard.flavor_text && (
                  <div className="modal-card-flavor">
                    <em><CardText text={selectedCard.flavor_text} /></em>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {showFilters && <h1 style={{marginBottom: '2rem'}}>Explorar Cartas</h1>}
      
      {showFilters ? (
        <form className="filter-form" onSubmit={e => {
          handleSubmit(e);
        }}>
          <div className="filter-section">
            <h2>Filtros</h2>
            
            <div className="form-group">
              <label htmlFor="name">Nombre de la carta</label>
              <input
                type="text"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleInputChange}
                placeholder="Buscar por nombre..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Tipo</label>
              <Select
                isMulti
                isClearable
                isSearchable
                name="type"
                options={typeOptions}
                value={typeOptions.filter(opt => filters.type.includes(opt.value))}
                onChange={(selected) => setFilters(prev => ({
                  ...prev,
                  type: (selected as MultiValue<OptionType>) ? (selected as MultiValue<OptionType>).map(opt => opt.value) : []
                }))}
                classNamePrefix="select"
                placeholder="Selecciona tipo(s)..."
                styles={selectStyles}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <div className="color-filters">
                {colorSymbols.map(color => (
                  <button
                    key={color.code}
                    type="button"
                    className={`color-button ${filters.color.includes(color.code) ? 'selected' : ''}`}
                    onClick={() => handleColorChange(color.code)}
                    title={color.name}
                  >
                    <img 
                      src={color.icon} 
                      alt={color.name} 
                      className="color-icon"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="rarity">Rareza</label>
              <Select
                isMulti
                isClearable
                isSearchable
                name="rarity"
                options={rarityOptions}
                value={rarityOptions.filter(opt => filters.rarity.includes(opt.value))}
                onChange={(selected) => setFilters(prev => ({
                  ...prev,
                  rarity: (selected as MultiValue<OptionType>) ? (selected as MultiValue<OptionType>).map(opt => opt.value) : []
                }))}
                classNamePrefix="select"
                placeholder="Selecciona rareza(s)..."
                styles={selectStyles}
              />
            </div>

            <div className="form-group">
              <label htmlFor="manaCost">Coste de maná</label>
              <input
                type="text"
                id="manaCost"
                name="manaCost"
                value={filters.manaCost}
                onChange={handleInputChange}
                placeholder="Ej: {1}{W}"
              />
            </div>

            <div className="form-group">
              <label>Edición</label>
              <Select
                isMulti
                isClearable
                isSearchable
                name="set"
                options={setOptions}
                value={setOptions.filter(opt => filters.set.includes(opt.value))}
                onChange={(selected) => setFilters(prev => ({
                  ...prev,
                  set: (selected as MultiValue<OptionType>) ? (selected as MultiValue<OptionType>).map(opt => opt.value) : []
                }))}
                classNamePrefix="select"
                placeholder="Todas las ediciones"
                styles={selectStyles}
                isLoading={isLoadingSets}
                noOptionsMessage={() => isLoadingSets ? 'Cargando ediciones...' : 'No hay ediciones'}
                filterOption={filterOption}
              />
            </div>

            <button type="submit" className="search-button">
              Buscar Cartas
            </button>
          </div>
        </form>
      ) : null}

      {!showFilters && cardResults.length > 0 && (
        <div className="search-in-results" style={{marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{padding: '0.75rem', borderRadius: 6, border: '1px solid var(--border-color)', width: '100%', maxWidth: 700, flex: 1}}
          />
          <button
            type="button"
            className="filters-btn"
            onClick={() => {
              setShowFilters(true);
              setCardResults([]);
            }}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 6,
              border: '1.5px solid #ffd700',
              background: '#ffd700',
              color: '#1a1a1a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s, border 0.2s, color 0.2s'
            }}
            title="Filtros avanzados"
            aria-label="Filtros avanzados"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'block'}} aria-hidden="true" focusable="false">
              <line x1="4" y1="21" x2="4" y2="14"/>
              <line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/>
              <line x1="20" y1="12" x2="20" y2="3"/>
              <line x1="1" y1="14" x2="7" y2="14"/>
              <line x1="9" y1="8" x2="15" y2="8"/>
              <line x1="17" y1="16" x2="23" y2="16"/>
            </svg>
          </button>
        </div>
      )}

      {!showFilters && (
        <div className="cards-results">
          {isLoadingCards && <p>Cargando cartas...</p>}
          {errorCards && <p style={{color: 'red'}}>{errorCards}</p>}
          {!isLoadingCards && !errorCards && cardResults.length === 0 && (
            <p>Los resultados de las cartas aparecerán aquí...</p>
          )}
          {!isLoadingCards && !errorCards && cardResults.length > 0 && (
            <div className="cards-grid" >
              {paginatedCards.map(card => (
                <div
                  key={card.id}
                  className="card-result"
                  style={{minWidth: '150px'}}
                  onClick={() => setSelectedCard(card)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver detalles de ${card.name}`}
                >
                  <img src={card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal} alt={card.name} style={{width: '150px', borderRadius: '8px'}} />
                  <div><strong>{card.name}</strong></div>
                  <div>{card.type_line}</div>
                </div>
              ))}
            </div>
          )}
          {/* Controles de paginación */}
          {totalPages > 1 && (
            <div className="pagination" style={{display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem'}}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>&lt;</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{fontWeight: page === currentPage ? 'bold' : undefined, textDecoration: page === currentPage ? 'underline' : undefined}}
                  disabled={page === currentPage}
                >
                  {page}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>&gt;</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cards; 