import React, { useState, useRef, useEffect } from 'react';
import { AYURVEDIC_HERBS } from '../data/mockData';
import { Search, ChevronDown, Check } from 'lucide-react';

export const HerbAutocomplete = ({ value, onChange, placeholder = "Search Ayurvedic Herb..." }) => {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredHerbs = query === '' 
    ? AYURVEDIC_HERBS 
    : AYURVEDIC_HERBS.filter(h => h.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (herb) => {
    setQuery(herb);
    onChange(herb);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-bgDeep border border-borderDark focus:border-primaryGreen rounded-xl pl-9 pr-8 py-2.5 text-xs text-textPrimary outline-none transition-colors"
        />
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none" />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto bg-surface border border-borderDark rounded-xl shadow-2xl p-1">
          {filteredHerbs.length === 0 ? (
            <div className="px-3 py-2 text-xs text-textMuted italic">No herb found</div>
          ) : (
            filteredHerbs.map((herb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(herb)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                  value === herb ? 'bg-primaryGreen/10 text-primaryGreen font-semibold' : 'text-textPrimary hover:bg-borderDark/40'
                }`}
              >
                <span>{herb}</span>
                {value === herb && <Check size={14} className="text-primaryGreen" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
