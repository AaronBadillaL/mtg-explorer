import React, { useState, useEffect } from 'react';
import './Decks.css';

interface Card {
  id: string;
  name: string;
  image_uris?: { normal: string, art_crop?: string };
  card_faces?: { image_uris: { normal: string, art_crop?: string }, name: string }[];
  mana_cost?: string;
  type_line?: string;
  rarity?: string;
  set_name?: string;
  collector_number?: string;
}

interface Deck {
  id: string;
  name: string;
  format: 'Pioneer' | 'Modern' | 'Standard' | 'Pauper' | 'Commander';
  description: string;
  mainCard: string; // Carta principal para el fondo
  cards: string[]; // Lista de nombres de cartas
  sideboard: string[];
  owner: string;
  isMeta: boolean;
}

// Mazos predefinidos
const predefinedDecks: Deck[] = [
  {
    id: '1',
    name: 'Izzet Phoenix',
    format: 'Pioneer',
    description: 'Mazo de combo agresivo que busca llenar el cementerio para resucitar Arclight Phoenix y generar ventaja de cartas.',
    mainCard: 'Arclight Phoenix',
    cards: [
      // Creatures
      'Picklock Prankster', 'Arclight Phoenix',
      // Spells
      'Consider', 'Fiery Impulse', 'Lightning Axe', 'Opt', 'Sleight of Hand', 'Treasure Cruise',
      'Into the Flood Maw', 'Torch the Tower', 'Spell Pierce', 'Spikefield Hazard',
      // Artifacts
      'Cori-Steel Cutter',
      // Enchantments
      'Artist\'s Talent', 'Proft\'s Eidetic Memory',
      // Lands
      'Island', 'Otawara, Soaring City', 'Riverglide Pathway', 'Spirebluff Canal', 'Steam Vents',
      'Hall of Storm Giants', 'Stormcarved Coast', 'Shivan Reef'
    ],
    sideboard: [
      'Annul', 'Brazen Borrower', 'Abrade', 'Aether Gust', 'Negate', 'Brotherhood\'s End',
      'Anger of the Gods', 'Into the Flood Maw', 'Spell Pierce', 'Thing in the Ice', 'Chandra\'s Defeat'
    ],
    owner: 'Aaron',
    isMeta: true
  },
  {
    id: '2',
    name: 'Mono Red Aggro',
    format: 'Pioneer',
    description: 'Mazo agresivo con criaturas rápidas y hechizos de daño directo que busca ganar antes del turno 5.',
    mainCard: 'Heartfire Hero',
    cards: [
      // Creatures
      'Heartfire Hero', 'Emberheart Challenger', 'Manifold Mouse', 'Screaming Nemesis', 'Sunspine Lynx', 'Bonecrusher Giant',
      // Spells
      'Monstrous Rage', 'Burst Lightning', 'Lightning Strike', 'Reckless Rage',
      // Enchantments
      'Kumano Faces Kakkazan',
      // Lands
      'Mountain', 'Ramunap Ruins', 'Rockface Village', 'Mutavault', 'Den of the Bugbear', 'Sokenzan, Crucible of Defiance'
    ],
    sideboard: [
      'Redcap Melee', 'Witchstalker Frenzy', 'Urabrask\'s Forge', 'Torch the Tower', 'Rending Volley', 'Magebane Lizard', 'Grafdigger\'s Cage'
    ],
    owner: 'Miguel Angel',
    isMeta: true
  },
  {
    id: '3',
    name: 'Selesnya Company',
    format: 'Pioneer',
    description: 'Mazo de midrange que utiliza Collected Company para generar ventaja de cartas y control del juego con criaturas eficientes.',
    mainCard: 'Collected Company',
    cards: [
      // Creatures
      'Elvish Mystic', 'Llanowar Elves', 'Thalia, Guardian of Thraben', 'Archon of Emeria', 'Aven Interrupter',
      'Enduring Innocence', 'Skyclave Apparition', 'Kellan, Daring Traveler', 'Werefox Bodyguard', 'Knight of Autumn', 'Elite Spellbinder',
      // Spells
      'Collected Company', 'Dromoka\'s Command',
      // Enchantments
      'Virtue of Loyalty',
      // Lands
      'Branchloft Pathway', 'Brushland', 'Eiganjo, Seat of the Empire', 'Plains', 'Razorverge Thicket', 'Temple Garden', 'Boseiju, Who Endures', 'Shefet Dunes'
    ],
    sideboard: [
      'Portable Hole', 'Brutal Cathar', 'Elite Spellbinder', 'Werefox Bodyguard', 'Gideon, Ally of Zendikar', 'Unlicensed Hearse', 'Elesh Norn, Mother of Machines'
    ],
    owner: 'Sescalo',
    isMeta: false
  },
  {
    id: '4',
    name: 'Dimir Midrange',
    format: 'Standard',
    description: 'Mazo de control midrange que combina removal eficiente, criaturas de valor y planeswalkers para controlar el juego.',
    mainCard: 'Sheoldred, the Apocalypse',
    cards: [
      // Creatures
      'Floodpits Drowner', 'Preacher of the Schism', 'Enduring Curiosity', 'Spyglass Siren', 'Deep-Cavern Bat', 'Sheoldred, the Apocalypse', 'Azure Beastbinder', 'Faerie Mastermind', 'Vren, the Relentless',
      // Planeswalkers
      'Kaito, Bane of Nightmares',
      // Spells
      'Cut Down', 'Go for the Throat', 'Duress', 'Spell Pierce', 'Gix\'s Command', 'Phantom Interference', 'Anoint with Affliction',
      // Lands
      'Darkslick Shores', 'Gloomlake Verge', 'Island', 'Restless Reef', 'Swamp', 'Underground River', 'Soulstone Sanctuary', 'Fountainport'
    ],
    sideboard: [
      'Tishana\'s Tidebinder', 'Ghost Vacuum', 'Gix\'s Command', 'Duress', 'Anoint with Affliction', 'The Filigree Sylex', 'Kaito, Bane of Nightmares', 'Disdainful Stroke', 'Faerie Mastermind', 'Negate', 'Vren, the Relentless', 'Sheoldred, the Apocalypse'
    ],
    owner: 'Emma Anchia',
    isMeta: true
  },
  {
    id: '5',
    name: 'Madness Burn',
    format: 'Pauper',
    description: 'Mazo agresivo que utiliza el mecanismo de Madness para descartar cartas y generar valor mientras hace daño directo.',
    mainCard: 'Sneaky Snacker',
    cards: [
      // Creatures
      'Sneaky Snacker', 'Voldaren Epicure', 'Kitchen Imp',
      // Spells
      'Faithless Looting', 'Lightning Bolt', 'Grab the Prize', 'Fiery Temper', 'Highway Robbery', 'Vampire\'s Kiss', 'Alms of the Vein', 'Chain Lightning',
      // Lands
      'Mountain', 'Jagged Barrens', 'Swamp', 'Rakdos Carnarium', 'Razortrap Gorge', 'Bojuka Bog'
    ],
    sideboard: [
      'Extract a Confession', 'Duress', 'Nihil Spellbomb', 'Cast into the Fire', 'Pyroblast', 'Smash to Smithereens', 'Red Elemental Blast'
    ],
    owner: 'Oscar 🐺',
    isMeta: true
  },
  {
    id: '6',
    name: 'Azorius Control',
    format: 'Modern',
    description: 'Mazo de control clásico que utiliza contrahechizos, removal masivo y planeswalkers para controlar el juego.',
    mainCard: 'Teferi, Time Raveler',
    cards: [
      // Companion
      'Kaheera, the Orphanguard',
      // Creatures
      'Solitude', 'Subtlety',
      // Planeswalkers
      'Teferi, Time Raveler', 'Teferi, Hero of Dominaria', 'Narset, Parter of Veils',
      // Spells
      'Counterspell', 'Wrath of the Skies', 'Spell Snare', 'Lorien Revealed', 'Day\'s Undoing', 'Prismatic Ending', 'Orim\'s Chant', 'Force of Negation', 'Tune the Narrative', 'March of Otherworldly Light', 'Supreme Verdict',
      // Artifacts
      'Isochron Scepter',
      // Lands
      'Flooded Strand', 'Hallowed Fountain', 'Meticulous Archive', 'Mystic Gate', 'Island', 'Plains', 'Hall of Storm Giants', 'Otawara, Soaring City', 'Monumental Henge', 'Geier Reach Sanitarium', 'Windswept Heath', 'Breeding Pool', 'Scalding Tarn'
    ],
    sideboard: [
      'Consign to Memory', 'Celestial Purge', 'Rest in Peace', 'Mystical Dispute', 'Isochron Scepter', 'Stony Silence', 'High Noon', 'Ashiok, Dream Render', 'Wrath of the Skies', 'Harbinger of the Seas'
    ],
    owner: 'Royal',
    isMeta: false
  },
  {
    id: '7',
    name: 'Boros Energy',
    format: 'Modern',
    description: 'Mazo agresivo que utiliza el mecanismo de Energy para generar ventaja y controlar el juego con criaturas eficientes.',
    mainCard: 'Ragavan, Nimble Pilferer',
    cards: [
      // Creatures
      'Guide of Souls', 'Phlage, Titan of Fire\'s Fury', 'Ocelot Pride', 'Ragavan, Nimble Pilferer', 'Ajani, Nacatl Pariah', 'Seasoned Pyromancer', 'Voice of Victory',
      // Spells
      'Galvanic Discharge', 'Thraben Charm',
      // Enchantments
      'Static Prison', 'Goblin Bombardment', 'Fable of the Mirror-Breaker',
      // Lands
      'Arena of Glory', 'Arid Mesa', 'Elegant Parlor', 'Sacred Foundry', 'Plains', 'Mountain', 'Marsh Flats', 'Flooded Strand', 'Windswept Heath'
    ],
    sideboard: [
      'Celestial Purge', 'Molten Rain', 'Wear // Tear', 'Orim\'s Chant', 'Ghost Vacuum', 'Wrath of the Skies', 'Showdown of the Skalds', 'Deafening Silence', 'Blood Moon', 'Clarion Conqueror'
    ],
    owner: 'Paul',
    isMeta: true
  },
  {
    id: '8',
    name: 'Nykthos Ramp',
    format: 'Pioneer',
    description: 'Mazo de ramp que utiliza Nykthos, Shrine to Nyx para generar grandes cantidades de maná y jugar amenazas poderosas.',
    mainCard: 'Nykthos, Shrine to Nyx',
    cards: [
      // Creatures
      'Elvish Mystic', 'Llanowar Elves', 'Old-Growth Troll', 'Outcaster Trailblazer', 'Ulvenwald Oddity', 'Cavalier of Thorns',
      // Planeswalkers
      'Kiora, Behemoth Beckoner',
      // Battles
      'Invasion of Ixalan',
      // Spells
      'Storm the Festival',
      // Enchantments
      'Oath of Nissa', 'Wolfwillow Haven',
      // Lands
      'Boseiju, Who Endures', 'Forest', 'Lair of the Hydra', 'Nykthos, Shrine to Nyx'
    ],
    sideboard: [
      'The Stone Brain', 'Tranquil Frillback', 'Monstrous Emergence', 'The Mightstone and Weakstone', 'Pithing Needle', 'Back to Nature', 'Wicked Wolf', 'Unlicensed Hearse', 'Obstinate Baloth', 'Cityscape Leveler', 'Emrakul, the Promised End'
    ],
    owner: 'Donaldo',
    isMeta: true
  },
  {
    id: '9',
    name: 'Krenko, Mob Boss',
    format: 'Commander',
    description: 'Mazo de Commander tribal de Goblins liderado por Krenko, Mob Boss. Genera tokens de Goblin rápidamente y utiliza sinergias tribales para abrumar a los oponentes.',
    mainCard: 'Krenko, Mob Boss',
    cards: [
      // Commander
      'Krenko, Mob Boss',
      // Creatures
      'Skirk Prospector', 'Goblin Warchief', 'Siege-Gang Commander', 'Goblin Matron', 'Krenko, Tin Street Kingpin', 'Goblin Chieftain', 'Goblin Instigator', 'Goblin King', 'Goblin Ringleader', 'Goblin Trashmaster', 'Legion Warboss', 'Hobgoblin Bandit Lord', 'Pashalik Mons', 'Muxus, Goblin Grandee', 'Goblin Recruiter', 'Battle Cry Goblin', 'Howlsquad Heavy', 'Conspicuous Snoop', 'Mogg War Marshal', 'Rundvelt Hordemaster', 'Gempalm Incinerator', 'Beetleback Chief', 'Volley Veteran', 'Battle Squadron', 'Goblin Chirurgeon', 'Goro-Goro, Disciple of Ryusei', 'Foundry Street Denizen', 'Goblin Motivator', 'Goblin Piledriver', 'Goblin Wardriver', 'Warren Instigator', 'Frenzied Goblin', 'Grenzo, Havoc Raiser', 'General Kreat, the Boltbringer', 'Goblin Lackey', 'Moria Marauder', 'Searslicer Goblin', 'Torch Courier', 'Marvin, Murderous Mimic', 'Squee, Dubious Monarch', 'Treasure Nabber', 'Fanatical Firebrand', 'Goblin Bushwhacker', 'Dark-Dweller Oracle', 'Goblin Cratermaker', 'Goblin Lookout', 'Purphoros, God of the Forge', 'Kiki-Jiki, Mirror Breaker', 'Legion Loyalist', 'Rummaging Goblin', 'Reckless Lackey', 'Squee, the Immortal', 'Moggcatcher', 'Zada, Hedron Grinder', 'Sarpadian Simulacrum', 'Courageous Goblin', 'Guttersnipe', 'Goblin Arsonist', 'Arms Dealer', 'Goblin Rabblemaster', 'Grotag Night-Runner', 'Redcap Thief', 'Witty Roastmaster', 'Chimney Rabble', 'Ogre Battledriver', 'Siege-Gang Lieutenant',
      // Spells
      'Lightning Bolt', 'Goblin Grenade', 'Goblin War Strike', 'Goblin Rally', 'Goblin Offensive', 'Goblin Assault', 'Goblin War Party',
      // Artifacts
      'Sol Ring', 'Arcane Signet', 'Goblin Charbelcher', 'Goblin Bombardment',
      // Enchantments
      'Impact Tremors', 'Goblin War Drums',
      // Lands
      'Mountain', 'Command Tower', 'Exotic Orchard', 'Path of Ancestry', 'Unclaimed Territory', 'Cavern of Souls', 'Ancient Tomb', 'City of Brass', 'Mana Confluence', 'Reflecting Pool', 'Tarnished Citadel', 'Gemstone Caverns', 'Crystal Vein', 'Dwarven Ruins', 'Great Furnace', 'Darksteel Citadel', 'Blast Zone', 'Valakut, the Molten Pinnacle', 'Field of the Dead', 'Bojuka Bog', 'Strip Mine', 'Wasteland', 'Ghost Quarter', 'Tectonic Edge', 'Dust Bowl', 'Encroaching Wastes', 'Field of Ruin', 'Scavenger Grounds', 'Blighted Fen', 'Blighted Gorge', 'Blighted Woodland'
    ],
    sideboard: [
      'Goblin Chainwhirler', 'Goblin Cratermaker', 'Goblin Trashmaster', 'Goblin Warchief', 'Goblin Chieftain', 'Goblin King', 'Goblin Ringleader', 'Goblin Recruiter', 'Goblin Matron', 'Goblin Lackey', 'Goblin Piledriver', 'Goblin Bushwhacker', 'Legion Loyalist', 'Goblin Rabblemaster', 'Goblin Wardriver', 'Goblin Motivator', 'Goblin Instigator', 'Goblin Arsonist', 'Goblin Lookout', 'Goblin Chirurgeon'
    ],
    owner: 'Briam 🫐',
    isMeta: false
  }
];

const Decks: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<'All' | 'Pioneer' | 'Modern' | 'Standard' | 'Pauper' | 'Commander'>('All');
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [deckCards, setDeckCards] = useState<Card[]>([]);
  const [sideboardCards, setSideboardCards] = useState<Card[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [mainCardImages, setMainCardImages] = useState<Record<string, string>>({});
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchMainCardImages = async () => {
      const decksToFetch = predefinedDecks.filter(deck => !mainCardImages[deck.id]);
      if (decksToFetch.length === 0) return;

      const imagePromises = decksToFetch.map(deck =>
        fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(deck.mainCard)}`)
          .then(res => res.json())
          .then(cardData => ({
            deckId: deck.id,
            cardData,
          }))
      );
      
      const results = await Promise.all(imagePromises);
      
      const imageMap = results.reduce((acc, result) => {
        const { deckId, cardData } = result;
        if (cardData.object !== 'error') {
          const imageUrl = cardData.image_uris?.art_crop || cardData.card_faces?.[0]?.image_uris?.art_crop;
          if (imageUrl) {
            acc[deckId] = imageUrl;
          }
        }
        return acc;
      }, {} as Record<string, string>);

      setMainCardImages(prev => ({ ...prev, ...imageMap }));
    };

    fetchMainCardImages();
  }, []);

  const filteredDecks = selectedFormat === 'All'
    ? predefinedDecks
    : predefinedDecks.filter(deck => deck.format === selectedFormat);

  const openDeckModal = async (deck: Deck) => {
    setSelectedDeck(deck);
    setIsLoadingCards(true);
    setDeckCards([]);
    setSideboardCards([]);
    
    try {
      // Cargar cartas principales
      const cardPromises = deck.cards.map(async (cardName) => {
        const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`);
        return response.json();
      });
      
      // Cargar sideboard
      const sideboardPromises = deck.sideboard.map(async (cardName) => {
        const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`);
        return response.json();
      });
      
      const [cardsData, sideboardData] = await Promise.all([
        Promise.all(cardPromises),
        Promise.all(sideboardPromises)
      ]);
      
      setDeckCards(cardsData.filter(card => card.object !== 'error'));
      setSideboardCards(sideboardData.filter(card => card.object !== 'error'));
    } catch (error) {
      console.error('Error loading deck cards:', error);
    } finally {
      setIsLoadingCards(false);
    }
  };

  const closeModal = () => {
    setSelectedDeck(null);
    setDeckCards([]);
    setSideboardCards([]);
  };

  // Función para agrupar cartas por tipo
  const groupCardsByType = (cards: Card[]) => {
    const groups: { [key: string]: Card[] } = {};
    
    cards.forEach(card => {
      const typeLine = card.type_line || '';
      let type = 'Other';
      
      if (typeLine.includes('Creature')) type = 'Creatures';
      else if (typeLine.includes('Instant')) type = 'Instants';
      else if (typeLine.includes('Sorcery')) type = 'Sorceries';
      else if (typeLine.includes('Enchantment')) type = 'Enchantments';
      else if (typeLine.includes('Artifact')) type = 'Artifacts';
      else if (typeLine.includes('Planeswalker')) type = 'Planeswalkers';
      else if (typeLine.includes('Land')) type = 'Lands';
      
      if (!groups[type]) groups[type] = [];
      groups[type].push(card);
    });
    
    return groups;
  };

  // Función para alternar el estado de colapso de una sección
  const toggleSection = (sectionName: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionName)) {
        newSet.delete(sectionName);
      } else {
        newSet.add(sectionName);
      }
      return newSet;
    });
  };

  return (
    <div className="decks-container">
      <div className="decks-header">
        <h1>Mazos de la Comunidad</h1>
        <p className="decks-subtitle">Mazos de Pioneer, Modern, Standard, Pauper y Commander de nuestros jugadores</p>
      </div>

      <div className="format-selector">
        <button 
          className={`format-btn ${selectedFormat === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedFormat('All')}
        >
          Todos
        </button>
        <button 
          className={`format-btn ${selectedFormat === 'Pioneer' ? 'active' : ''}`}
          onClick={() => setSelectedFormat('Pioneer')}
        >
          Pioneer
        </button>
        <button 
          className={`format-btn ${selectedFormat === 'Modern' ? 'active' : ''}`}
          onClick={() => setSelectedFormat('Modern')}
        >
          Modern
        </button>
        <button 
          className={`format-btn ${selectedFormat === 'Standard' ? 'active' : ''}`}
          onClick={() => setSelectedFormat('Standard')}
        >
          Standard
        </button>
        <button 
          className={`format-btn ${selectedFormat === 'Pauper' ? 'active' : ''}`}
          onClick={() => setSelectedFormat('Pauper')}
        >
          Pauper
        </button>
        <button 
          className={`format-btn ${selectedFormat === 'Commander' ? 'active' : ''}`}
          onClick={() => setSelectedFormat('Commander')}
        >
          Commander
        </button>
      </div>

      <div className="deck-grid-container">
        {filteredDecks.map(deck => (
          <div 
            key={deck.id} 
            className="deck-display-card"
            onClick={() => openDeckModal(deck)}
          >
            <div 
              className="deck-card-background" 
              style={{ backgroundImage: `url(${mainCardImages[deck.id] || ''})` }}
            />
            <div className="deck-card-overlay">
              <div className="deck-card-header">
                <h3>{deck.name}</h3>
                <span className="deck-card-format">{deck.format}</span>
              </div>
              <div className="deck-card-footer">
                <span>Por: {deck.owner}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDeck && (
        <div className="deck-modal-overlay" onClick={closeModal}>
          <div className="deck-modal" onClick={e => e.stopPropagation()}>
            <div className="deck-modal-header">
              <h2>{selectedDeck.name}</h2>
              <button className="close-modal-btn" onClick={closeModal}>×</button>
            </div>
            <p className="deck-modal-description">{selectedDeck.description}</p>
            <div className="deck-modal-cards">
              {isLoadingCards ? (
                <p>Cargando cartas...</p>
              ) : (
                <>
                  {/* Cartas principales agrupadas por tipo */}
                  {Object.entries(groupCardsByType(deckCards)).map(([type, cards]) => (
                    <div key={type} className="card-type-section">
                      <h3 
                        className="card-type-title"
                        onClick={() => toggleSection(type)}
                      >
                        {type} ({cards.length})
                        <span className="collapse-icon">
                          {collapsedSections.has(type) ? '▼' : '▲'}
                        </span>
                      </h3>
                      {!collapsedSections.has(type) && (
                        <div className="modal-cards-grid">
                          {cards.map(card => (
                            <div key={card.id} className="modal-card-item">
                              <img 
                                src={card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal} 
                                alt={card.name}
                                className="modal-card-image"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Sideboard */}
                  {sideboardCards.length > 0 && (
                    <div className="card-type-section sideboard-section">
                      <h3 
                        className="card-type-title"
                        onClick={() => toggleSection('Sideboard')}
                      >
                        Sideboard ({sideboardCards.length})
                        <span className="collapse-icon">
                          {collapsedSections.has('Sideboard') ? '▼' : '▲'}
                        </span>
                      </h3>
                      {!collapsedSections.has('Sideboard') && (
                        <div className="modal-cards-grid">
                          {sideboardCards.map(card => (
                            <div key={card.id} className="modal-card-item">
                              <img 
                                src={card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal} 
                                alt={card.name}
                                className="modal-card-image"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Decks; 