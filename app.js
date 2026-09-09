/**
 * DAGGERHEART ADVERSARY CREATOR & ENCOUNTER ARCHITECT (app.js)
 * Standalone, Client-Side JavaScript Engine for Tabletop Encounter Management
 * Strictly follows Daggerheart SRD & RightKnight's Custom Adversary Benchmarks
 */

// =============================================================================
// 1. DAGGERHEART BENCHMARK REFERENCE TABLES (RightKnight's Guide & Old Gus SRD)
// =============================================================================

const DH_BENCHMARKS = {
  // BP Costs by archetype (DH Core 197 standard)
  BP_COSTS: {
    Minion: 1.0,   // Minions (count equal to number of PCs) = 1 BP
    Social: 1.0,
    Support: 1.0,
    Standard: 2.0,
    Skulk: 2.0,
    Ranged: 2.0,
    Horde: 2.0,
    Enigma: 2.0,
    Leader: 3.0,
    Bruiser: 4.0,
    Solo: 5.0,
    Colossus: 10.0,
    Environment: 0.0
  },

  // Standard Archetype Benchmarks by Tier (Tier 1 to 4)
  ARCHETYPES: {
    Colossus: {
      bp: 10.0,
      tiers: {
        0: { diff: 12, major: 8,  severe: 16, hp: 0, stress: 4, atkBonus: 1, dmg: '1d8+2', range: 'Melee', size: '70 ft. tall, 45 ft. wide' },
        1: { diff: 14, major: 11, severe: 22, hp: 0, stress: 6, atkBonus: 2, dmg: '1d10+1', range: 'Melee', size: '95 ft. tall, 60 ft. wide' },
        2: { diff: 16, major: 14, severe: 28, hp: 0, stress: 6, atkBonus: 3, dmg: '2d10+2', range: 'Melee', size: '130 ft. tall, 80 ft. wide' },
        3: { diff: 18, major: 20, severe: 40, hp: 0, stress: 6, atkBonus: 5, dmg: '3d10+4', range: 'Melee', size: '170 ft. tall, 100 ft. wide' },
        4: { diff: 20, major: 30, severe: 60, hp: 0, stress: 6, atkBonus: 7, dmg: '4d10+6', range: 'Melee', size: '240 ft. tall, 140 ft. wide' }
      }
    },
    Minion: {
      bp: 0.25,
      tiers: {
        0: { diff: 9,  major: 'None', severe: 'None', hp: 1, stress: 1, atkBonus: -1, dmg: '2',  range: 'Melee', minionRule: 4 },
        1: { diff: 10, major: 'None', severe: 'None', hp: 1, stress: 1, atkBonus: -1, dmg: '2',  range: 'Melee', minionRule: 4 },
        2: { diff: 13, major: 'None', severe: 'None', hp: 1, stress: 1, atkBonus: 0,  dmg: '5',  range: 'Melee', minionRule: 6 },
        3: { diff: 15, major: 'None', severe: 'None', hp: 1, stress: 1, atkBonus: 1,  dmg: '7',  range: 'Melee', minionRule: 8 },
        4: { diff: 17, major: 'None', severe: 'None', hp: 1, stress: 1, atkBonus: 2,  dmg: '11', range: 'Melee', minionRule: 10 }
      }
    },
    Standard: {
      bp: 1.0,
      tiers: {
        0: { diff: 10, major: 6,  severe: 11, hp: 4, stress: 2, atkBonus: 0, dmg: '1d6+2', range: 'Melee' },
        1: { diff: 12, major: 8,  severe: 15, hp: 5, stress: 3, atkBonus: 1, dmg: '1d8+3', range: 'Melee' },
        2: { diff: 15, major: 10, severe: 20, hp: 6, stress: 4, atkBonus: 2, dmg: '2d8+4', range: 'Melee' },
        3: { diff: 18, major: 14, severe: 28, hp: 7, stress: 5, atkBonus: 3, dmg: '3d8+5', range: 'Melee' },
        4: { diff: 21, major: 18, severe: 36, hp: 8, stress: 6, atkBonus: 5, dmg: '4d8+8', range: 'Melee' }
      }
    },
    Skulk: {
      bp: 1.0,
      tiers: {
        0: { diff: 11, major: 5,  severe: 10, hp: 3, stress: 2, atkBonus: 1, dmg: '1d4+3', range: 'Melee' },
        1: { diff: 13, major: 7,  severe: 14, hp: 4, stress: 3, atkBonus: 2, dmg: '1d6+3', range: 'Melee' },
        2: { diff: 16, major: 9,  severe: 18, hp: 5, stress: 4, atkBonus: 3, dmg: '2d6+4', range: 'Melee' },
        3: { diff: 19, major: 12, severe: 24, hp: 6, stress: 5, atkBonus: 4, dmg: '3d6+5', range: 'Melee' },
        4: { diff: 22, major: 16, severe: 32, hp: 7, stress: 6, atkBonus: 6, dmg: '4d6+8', range: 'Melee' }
      }
    },
    Ranged: {
      bp: 1.0,
      tiers: {
        0: { diff: 10, major: 5,  severe: 10, hp: 3, stress: 2, atkBonus: 1, dmg: '1d6+2', range: 'Far' },
        1: { diff: 12, major: 7,  severe: 14, hp: 4, stress: 3, atkBonus: 2, dmg: '1d8+3', range: 'Far' },
        2: { diff: 15, major: 9,  severe: 18, hp: 5, stress: 4, atkBonus: 3, dmg: '2d8+4', range: 'Far' },
        3: { diff: 18, major: 13, severe: 26, hp: 6, stress: 5, atkBonus: 4, dmg: '3d8+5', range: 'Far' },
        4: { diff: 21, major: 17, severe: 34, hp: 7, stress: 6, atkBonus: 6, dmg: '4d8+8', range: 'Very Far' }
      }
    },
    Leader: {
      bp: 2.0,
      tiers: {
        0: { diff: 11, major: 7,  severe: 13, hp: 5, stress: 3, atkBonus: 1, dmg: '1d8+2', range: 'Melee' },
        1: { diff: 13, major: 9,  severe: 17, hp: 6, stress: 4, atkBonus: 2, dmg: '1d10+3', range: 'Melee' },
        2: { diff: 16, major: 12, severe: 22, hp: 7, stress: 5, atkBonus: 3, dmg: '2d10+4', range: 'Melee' },
        3: { diff: 19, major: 16, severe: 30, hp: 8, stress: 6, atkBonus: 4, dmg: '3d10+5', range: 'Melee' },
        4: { diff: 22, major: 20, severe: 40, hp: 9, stress: 7, atkBonus: 6, dmg: '4d10+8', range: 'Melee' }
      }
    },
    Support: {
      bp: 1.0,
      tiers: {
        0: { diff: 10, major: 5,  severe: 10, hp: 3, stress: 3, atkBonus: 0, dmg: '1d4+2', range: 'Close' },
        1: { diff: 12, major: 7,  severe: 14, hp: 4, stress: 4, atkBonus: 1, dmg: '1d6+2', range: 'Far' },
        2: { diff: 15, major: 9,  severe: 18, hp: 5, stress: 5, atkBonus: 2, dmg: '2d6+3', range: 'Far' },
        3: { diff: 18, major: 13, severe: 26, hp: 6, stress: 6, atkBonus: 3, dmg: '3d6+4', range: 'Far' },
        4: { diff: 21, major: 17, severe: 34, hp: 7, stress: 7, atkBonus: 5, dmg: '4d6+6', range: 'Far' }
      }
    },
    Solo: {
      bp: 3.0,
      tiers: {
        0: { diff: 12, major: 9,  severe: 18, hp: 8,  stress: 4, atkBonus: 2, dmg: '1d10+3', range: 'Melee' },
        1: { diff: 14, major: 12, severe: 24, hp: 10, stress: 6, atkBonus: 3, dmg: '1d12+4', range: 'Melee' },
        2: { diff: 17, major: 16, severe: 32, hp: 12, stress: 7, atkBonus: 4, dmg: '2d12+5', range: 'Melee' },
        3: { diff: 20, major: 22, severe: 44, hp: 14, stress: 8, atkBonus: 5, dmg: '3d12+8', range: 'Melee' },
        4: { diff: 24, major: 28, severe: 56, hp: 16, stress: 10, atkBonus: 7, dmg: '4d12+12', range: 'Melee' }
      }
    },
    Social: {
      bp: 1.0,
      tiers: {
        0: { diff: 9,  major: 3,  severe: 6,  hp: 2, stress: 2, atkBonus: -3, dmg: '1d4',   range: 'Close' },
        1: { diff: 11, major: 4,  severe: 7,  hp: 3, stress: 2, atkBonus: -2, dmg: '1d4+1', range: 'Close' },
        2: { diff: 14, major: 6,  severe: 15, hp: 3, stress: 2, atkBonus: -1, dmg: '2d4+3', range: 'Close' },
        3: { diff: 16, major: 17, severe: 29, hp: 5, stress: 4, atkBonus: 0,  dmg: '3d6+3', range: 'Close' },
        4: { diff: 18, major: 30, severe: 42, hp: 5, stress: 4, atkBonus: 4,  dmg: '4d6+4', range: 'Close' }
      }
    },
    Bruiser: {
      bp: 4.0,
      tiers: {
        0: { diff: 11, major: 7,  severe: 13, hp: 6,  stress: 3, atkBonus: 1, dmg: '1d8+3',   range: 'Melee' },
        1: { diff: 13, major: 9,  severe: 17, hp: 7,  stress: 3, atkBonus: 2, dmg: '1d12+3',  range: 'Melee' },
        2: { diff: 16, major: 12, severe: 24, hp: 8,  stress: 4, atkBonus: 3, dmg: '2d10+4',  range: 'Melee' },
        3: { diff: 19, major: 16, severe: 32, hp: 10, stress: 5, atkBonus: 4, dmg: '3d10+4',  range: 'Melee' },
        4: { diff: 22, major: 22, severe: 44, hp: 12, stress: 6, atkBonus: 6, dmg: '4d12+10', range: 'Melee' }
      }
    },
    Horde: {
      bp: 2.0,
      tiers: {
        0: { diff: 10, major: 6,  severe: 12, hp: 8,  stress: 2, atkBonus: 0, dmg: '1d6+2',  range: 'Close' },
        1: { diff: 12, major: 8,  severe: 16, hp: 10, stress: 3, atkBonus: 1, dmg: '1d8+3',  range: 'Close' },
        2: { diff: 15, major: 11, severe: 22, hp: 12, stress: 4, atkBonus: 2, dmg: '2d8+4',  range: 'Close' },
        3: { diff: 18, major: 15, severe: 30, hp: 14, stress: 5, atkBonus: 3, dmg: '3d8+5',  range: 'Close' },
        4: { diff: 21, major: 20, severe: 40, hp: 16, stress: 6, atkBonus: 5, dmg: '4d8+8',  range: 'Close' }
      }
    },
    Environment: {
      bp: 0.0,
      tiers: {
        0: { diff: 10, major: '—', severe: '—', hp: 0, stress: 0, atkBonus: 0, dmg: '—', range: '—' },
        1: { diff: 11, major: '—', severe: '—', hp: 0, stress: 0, atkBonus: 0, dmg: '—', range: '—' },
        2: { diff: 14, major: '—', severe: '—', hp: 0, stress: 0, atkBonus: 0, dmg: '—', range: '—' },
        3: { diff: 17, major: '—', severe: '—', hp: 0, stress: 0, atkBonus: 0, dmg: '—', range: '—' },
        4: { diff: 20, major: '—', severe: '—', hp: 0, stress: 0, atkBonus: 0, dmg: '—', range: '—' }
      }
    }
  }
};

// =============================================================================
// RIGHTKNIGHT'S GUIDE TO MAKING CUSTOM ADVERSARIES (v1.7) BENCHMARKS
// =============================================================================
const RIGHTKNIGHT_BENCHMARKS = {
  Colossus: {
    motive: "Loom over the battlefield, shatter terrain with titanic force, and demand coordinated climbing tactics to destroy vulnerable segments.",
    attackName: "Titanic Stomp & Crush",
    range: "Melee",
    experiences: {
      1: ["Titanic Bulk +3", "Earthshaker +2"],
      2: ["Titanic Bulk +3", "Seismic Stomp +3"],
      3: ["Titanic Bulk +4", "Cataclysmic Might +3"],
      4: ["Titanic Bulk +5", "Godly Destruction +4"]
    },
    tiers: {
      1: {
        diff: 14, major: 11, severe: 22, hp: 0, stress: 6, atkBonus: 2, targetDmg: "8–11",
        dice: { low: "1d12+3", average: "1d10+4", high: "1d8+5" },
        size: "95 ft. tall, 60 ft. wide",
        features: [
          { name: "Colossal Power", type: "Reaction", text: "When the colossus fails an attack, you gain a Fear." },
          { name: "Swatting Pests", type: "Reaction", text: "When attacked by a flying target within Far range, make a reaction attack. On success, deal damage and the target is knocked to the ground." }
        ],
        defaultSegments: [
          { name: "Head", quantity: 1, diff: 16, hp: 5, isFatal: true, adjacentSegments: ["Torso"], attack: { name: "Peck / Bite", bonus: 2, range: "Melee", damage: "1d10+1", type: "Physical" }, features: [{ name: "Fatal", type: "Passive", text: "When the Head is Destroyed, the Colossus is defeated." }] },
          { name: "Torso", quantity: 1, diff: 14, hp: 7, isFatal: true, adjacentSegments: ["Head", "Arms", "Legs"], attack: { name: "Chest Surge", bonus: 1, range: "Close", damage: "1d12+2", type: "Physical" }, features: [{ name: "Fatal", type: "Passive", text: "When the Torso is Destroyed, the Colossus is defeated." }] },
          { name: "Arms", quantity: 2, diff: 13, hp: 4, isFatal: false, adjacentSegments: ["Torso"], attack: { name: "Crushing Sweep", bonus: 2, range: "Melee", damage: "1d8+2", type: "Physical" }, features: [{ name: "Grab and Crush", type: "Action", text: "Spend a Fear to grab a target and deal 1d10 physical damage." }] },
          { name: "Legs", quantity: 2, diff: 13, hp: 4, isFatal: false, adjacentSegments: ["Torso"], attack: { name: "Earthquake Stomp", bonus: 1, range: "Melee", damage: "1d10+1", type: "Physical" }, features: [{ name: "Shockwave", type: "Action", text: "Spend a Fear to make all creatures on the ground make an Agility Reaction roll." }] }
        ]
      },
      2: {
        diff: 16, major: 14, severe: 28, hp: 0, stress: 6, atkBonus: 3, targetDmg: "12–16",
        dice: { low: "2d12+1", average: "2d10+3", high: "2d8+5" },
        size: "130 ft. tall, 80 ft. wide",
        features: [
          { name: "Colossal Power", type: "Reaction", text: "When the colossus fails an attack, you gain a Fear." },
          { name: "Swatting Pests", type: "Reaction", text: "When attacked by a flying target within Far range, make a reaction attack. On success, deal damage and the target is knocked to the ground." }
        ],
        defaultSegments: [
          { name: "Head", quantity: 1, diff: 18, hp: 6, isFatal: true, adjacentSegments: ["Torso"], attack: { name: "Gore / Bite", bonus: 3, range: "Melee", damage: "2d10+2", type: "Physical" }, features: [{ name: "Fatal", type: "Passive", text: "When the Head is Destroyed, the Colossus is defeated." }] },
          { name: "Torso", quantity: 1, diff: 16, hp: 8, isFatal: true, adjacentSegments: ["Head", "Forelegs", "Hindlegs"], attack: { name: "Core Eruption", bonus: 2, range: "Close", damage: "2d12+3", type: "Physical" }, features: [{ name: "Fatal", type: "Passive", text: "When the Torso is Destroyed, the Colossus is defeated." }] },
          { name: "Forelegs", quantity: 2, diff: 15, hp: 5, isFatal: false, adjacentSegments: ["Torso"], attack: { name: "Heavy Trample", bonus: 3, range: "Melee", damage: "2d8+3", type: "Physical" }, features: [{ name: "Buck Foes", type: "Action", text: "Spend a Fear to throw creatures off this segment." }] },
          { name: "Hindlegs", quantity: 2, diff: 15, hp: 5, isFatal: false, adjacentSegments: ["Torso"], attack: { name: "Tremor Kick", bonus: 2, range: "Melee", damage: "2d10+2", type: "Physical" }, features: [{ name: "Seismic Shock", type: "Action", text: "Spend a Fear to knock grounded foes prone." }] }
        ]
      },
      3: {
        diff: 18, major: 20, severe: 40, hp: 0, stress: 6, atkBonus: 5, targetDmg: "18–22",
        dice: { low: "3d12+1", average: "3d10+4", high: "3d8+7" },
        size: "170 ft. tall, 100 ft. wide",
        features: [
          { name: "Colossal Power", type: "Reaction", text: "When the colossus fails an attack, you gain a Fear." },
          { name: "Gargantuan Whirlwind", type: "Action", text: "Spend a Fear to force all creatures within Far range to make an Agility Reaction Roll." }
        ],
        defaultSegments: [
          { name: "Head", quantity: 1, diff: 20, hp: 7, isFatal: true, adjacentSegments: ["Neck"], attack: { name: "Beak Cleave", bonus: 5, range: "Melee", damage: "3d10+3", type: "Physical" }, features: [{ name: "Fatal", type: "Passive", text: "When the Head is Destroyed, the Colossus is defeated." }] },
          { name: "Neck", quantity: 1, diff: 18, hp: 8, isFatal: true, adjacentSegments: ["Head", "Body"], attack: { name: "Whiplash", bonus: 4, range: "Close", damage: "3d8+4", type: "Physical" }, features: [{ name: "Fatal", type: "Passive", text: "When the Neck is Destroyed, the Colossus is defeated." }] },
          { name: "Wings", quantity: 2, diff: 17, hp: 6, isFatal: false, adjacentSegments: ["Body"], attack: { name: "Buffeting Gale", bonus: 4, range: "Far", damage: "3d6+4", type: "Physical" }, features: [] },
          { name: "Talons", quantity: 2, diff: 17, hp: 6, isFatal: false, adjacentSegments: ["Body"], attack: { name: "Raking Claws", bonus: 5, range: "Melee", damage: "3d8+3", type: "Physical" }, features: [] }
        ]
      },
      4: {
        diff: 20, major: 30, severe: 60, hp: 0, stress: 6, atkBonus: 7, targetDmg: "28–40",
        dice: { low: "4d12+8", average: "4d10+12", high: "4d8+16" },
        size: "240 ft. tall, 140 ft. wide",
        features: [
          { name: "Colossal Power", type: "Reaction", text: "When the colossus fails an attack, you gain a Fear." },
          { name: "Cataclysmic Resonance", type: "Passive", text: "When a segment is attacked, creatures on adjacent segments must succeed on a Strength roll or take 2d8 damage." }
        ],
        defaultSegments: [
          { name: "Body Cavity", quantity: 1, diff: 21, hp: 9, isFatal: true, adjacentSegments: ["Head", "Shell", "Claws"], attack: { name: "Spore Jet", bonus: 6, range: "Close", damage: "4d10+4", type: "Magic" }, features: [{ name: "Fatal", type: "Passive", text: "When the Body Cavity is Destroyed, the Colossus is defeated." }] },
          { name: "Head", quantity: 1, diff: 22, hp: 8, isFatal: true, adjacentSegments: ["Body Cavity"], attack: { name: "Mandible Crush", bonus: 7, range: "Melee", damage: "4d10+6", type: "Physical" }, features: [{ name: "Fatal", type: "Passive", text: "When the Head is Destroyed, the Colossus is defeated." }] },
          { name: "Shell", quantity: 1, diff: 23, hp: 12, isFatal: false, adjacentSegments: ["Body Cavity"], attack: { name: "Spine Burst", bonus: 5, range: "Close", damage: "4d8+4", type: "Physical" }, features: [] },
          { name: "Claws", quantity: 3, diff: 19, hp: 6, isFatal: false, adjacentSegments: ["Body Cavity"], attack: { name: "Titanic Pincer", bonus: 7, range: "Melee", damage: "4d8+6", type: "Physical" }, features: [] },
          { name: "Legs", quantity: 4, diff: 19, hp: 6, isFatal: false, adjacentSegments: ["Body Cavity"], attack: { name: "Trench Stomp", bonus: 6, range: "Melee", damage: "4d8+4", type: "Physical" }, features: [] }
        ]
      }
    }
  },
  Bruiser: {
    motive: "Charge forward, smash defensive lines, and punish exposed targets.",
    attackName: "Heavy Crushing Maul",
    range: "Melee",
    experiences: {
      1: ["Crusher +2", "Intimidation +1"],
      2: ["Crusher +2", "Charger +2"],
      3: ["Crusher +3", "Intimidation +2"],
      4: ["Crusher +4", "Throw +3"]
    },
    tiers: {
      1: {
        diff: 13, major: 8, severe: 14, hp: 6, stress: 4, atkBonus: 1, targetDmg: "8–11",
        dice: { low: "1d12+3", average: "1d10+4", high: "1d8+5" },
        features: [
          { name: "Momentum", type: "Reaction", text: "When the adversary makes a successful attack against a PC, you gain a Fear." },
          { name: "Ramp Up", type: "Passive", text: "You must spend a Fear to spotlight the adversary. While spotlighted, they can make their standard attack against all targets within range." }
        ]
      },
      2: {
        diff: 15, major: 13, severe: 26, hp: 6, stress: 5, atkBonus: 3, targetDmg: "12–16",
        dice: { low: "2d12+1", average: "2d10+3", high: "2d8+5" },
        features: [
          { name: "Momentum", type: "Reaction", text: "When the adversary makes a successful attack against a PC, you gain a Fear." },
          { name: "Ramp Up", type: "Passive", text: "You must spend a Fear to spotlight the adversary. While spotlighted, they can make their standard attack against all targets within range." }
        ]
      },
      3: {
        diff: 17, major: 20, severe: 38, hp: 7, stress: 5, atkBonus: 4, targetDmg: "18–22",
        dice: { low: "3d12+1", average: "3d10+4", high: "3d8+7" },
        features: [
          { name: "Momentum", type: "Reaction", text: "When the adversary makes a successful attack against a PC, you gain a Fear." },
          { name: "Ramp Up", type: "Passive", text: "You must spend a Fear to spotlight the adversary. While spotlighted, they can make their standard attack against all targets within range." }
        ]
      },
      4: {
        diff: 19, major: 34, severe: 66, hp: 8, stress: 5, atkBonus: 6, targetDmg: "30–45",
        dice: { low: "4d12+11", average: "4d10+15", high: "4d8+19" },
        features: [
          { name: "Momentum", type: "Reaction", text: "When the adversary makes a successful attack against a PC, you gain a Fear." },
          { name: "Terrifying", type: "Passive", text: "When the adversary makes a successful attack, all PCs within Far range lose a Hope and you gain a Fear." }
        ]
      }
    }
  },
  Horde: {
    motive: "Swarm in overwhelming numbers, cutting down targets before suffering casualties.",
    attackName: "Swarming Blades",
    range: "Melee",
    experiences: {
      1: ["Overwhelm +2", "Pack Movement +1"],
      2: ["Overwhelm +2", "Swarm Tactics +2"],
      3: ["Overwhelm +3", "Relentless Surge +2"],
      4: ["Overwhelm +4", "Tide of War +3"]
    },
    tiers: {
      1: {
        diff: 11, major: 7, severe: 10, hp: 5, stress: 2, atkBonus: -1, targetDmg: "5–8",
        dice: { low: "1d10+1", average: "1d8+2", high: "1d6+3" },
        features: [
          { name: "Horde (1d4+2)", type: "Passive", text: "When the Horde has marked half or more of their HP, their standard attack deals 1d4+2 physical damage instead." },
          { name: "Too Many to Handle", type: "Passive", text: "When the Horde is within Melee range of a creature and at least one other ally is within Close range, all attacks against that creature have advantage." }
        ]
      },
      2: {
        diff: 13, major: 12, severe: 18, hp: 5, stress: 2, atkBonus: 0, targetDmg: "9–13",
        dice: { low: "2d10", average: "2d8+2", high: "2d6+4" },
        features: [
          { name: "Horde (1d8+3)", type: "Passive", text: "When the Horde has marked half or more of their HP, their standard attack deals 1d8+3 physical damage instead." },
          { name: "Too Many to Handle", type: "Passive", text: "When the Horde is within Melee range of a creature and at least one other ally is within Close range, all attacks against that creature have advantage." }
        ]
      },
      3: {
        diff: 15, major: 20, severe: 29, hp: 7, stress: 3, atkBonus: 1, targetDmg: "14–19",
        dice: { low: "3d10", average: "3d8+3", high: "3d6+6" },
        features: [
          { name: "Horde (2d8+2)", type: "Passive", text: "When the Horde has marked half or more of their HP, their standard attack deals 2d8+2 physical damage instead." },
          { name: "Too Many to Handle", type: "Passive", text: "When the Horde is within Melee range of a creature and at least one other ally is within Close range, all attacks against that creature have advantage." }
        ]
      },
      4: {
        diff: 17, major: 25, severe: 40, hp: 7, stress: 4, atkBonus: 2, targetDmg: "20–30",
        dice: { low: "4d10+3", average: "4d8+7", high: "4d6+11" },
        features: [
          { name: "Horde (2d10+4)", type: "Passive", text: "When the Horde has marked half or more of their HP, their standard attack deals 2d10+4 physical damage instead." },
          { name: "Too Many to Handle", type: "Passive", text: "When the Horde is within Melee range of a creature and at least one other ally is within Close range, all attacks against that creature have advantage." }
        ]
      }
    }
  },
  Leader: {
    motive: "Direct the battlefield, coordinate ally strike teams, and inspire loyalty through force.",
    attackName: "Commanding Broadsword",
    range: "Melee",
    experiences: {
      1: ["Commander +2", "Leadership +1"],
      2: ["Commander +2", "Backstabber +2"],
      3: ["Commander +3", "Leadership +3"],
      4: ["Commander +4", "For the Realm! +4"]
    },
    tiers: {
      1: {
        diff: 13, major: 8, severe: 14, hp: 6, stress: 4, atkBonus: 3, targetDmg: "6–9",
        dice: { low: "1d12+1", average: "1d10+2", high: "1d8+3" },
        features: [
          { name: "Tactician", type: "Action", text: "When you spotlight the adversary, mark a Stress to also spotlight two allies within Close range." },
          { name: "Activate Allies", type: "Action", text: "Spend a Fear to spotlight 1d4 allies. Attacks they make while spotlighted in this way deal half damage." }
        ]
      },
      2: {
        diff: 15, major: 13, severe: 24, hp: 6, stress: 4, atkBonus: 3, targetDmg: "12–15",
        dice: { low: "2d12+1", average: "2d10+3", high: "2d8+5" },
        features: [
          { name: "Tactician", type: "Action", text: "When you spotlight the adversary, mark a Stress to also spotlight two allies within Close range." },
          { name: "Activate Allies", type: "Action", text: "Spend a Fear to spotlight 1d4 allies. Attacks they make while spotlighted in this way deal half damage." }
        ]
      },
      3: {
        diff: 18, major: 20, severe: 38, hp: 7, stress: 5, atkBonus: 6, targetDmg: "15–18",
        dice: { low: "3d10", average: "3d8+3", high: "3d6+6" },
        features: [
          { name: "Tactician", type: "Action", text: "When you spotlight the adversary, mark a Stress to also spotlight two allies within Close range." },
          { name: "Call Reinforcements", type: "Action", text: "Once per scene, mark a Stress to summon an allied adversary within Close range." }
        ]
      },
      4: {
        diff: 20, major: 34, severe: 66, hp: 8, stress: 7, atkBonus: 9, targetDmg: "25–35",
        dice: { low: "4d12+4", average: "4d10+8", high: "4d8+12" },
        features: [
          { name: "Merciless", type: "Passive", text: "When the adversary is spotlighted, spotlight one additional ally without requiring a Fear to be spent." },
          { name: "Activate Allies", type: "Action", text: "Spend a Fear to spotlight 1d4 allies. Attacks they make while spotlighted in this way deal half damage." }
        ]
      }
    }
  },
  Minion: {
    motive: "Follow orders blindly, overwhelm trespassers, and shield leaders.",
    attackName: "Rusty Dagger",
    range: "Melee",
    experiences: {
      1: ["Pack Swarm +1"],
      2: ["Pack Swarm +2"],
      3: ["Mob Mentality +2"],
      4: ["Endless Waves +3"]
    },
    tiers: {
      1: {
        diff: 10, major: "None", severe: "None", hp: 1, stress: 1, atkBonus: -1, minionRule: 4, targetDmg: "1–3",
        dice: { low: "3", average: "2", high: "1" },
        features: [
          { name: "Minion (4)", type: "Passive", text: "The adversary is defeated when they take any damage. For every 4 damage dealt by a single attack, defeat 1 additional Minion within range." },
          { name: "Group Attack", type: "Action", text: "Spend a Fear to choose a target and spotlight all Minions within Close range of them. Those Minions move into Melee range and combine their 2 damage into one attack." }
        ]
      },
      2: {
        diff: 13, major: "None", severe: "None", hp: 1, stress: 1, atkBonus: 0, minionRule: 6, targetDmg: "3–6",
        dice: { low: "6", average: "5", high: "4" },
        features: [
          { name: "Minion (6)", type: "Passive", text: "The adversary is defeated when they take any damage. For every 6 damage dealt by a single attack, defeat 1 additional Minion within range." },
          { name: "Group Attack", type: "Action", text: "Spend a Fear to choose a target and spotlight all Minions within Close range of them. Those Minions move into Melee range and combine their 5 damage into one attack." }
        ]
      },
      3: {
        diff: 15, major: "None", severe: "None", hp: 1, stress: 1, atkBonus: 1, minionRule: 8, targetDmg: "5–8",
        dice: { low: "8", average: "7", high: "6" },
        features: [
          { name: "Minion (8)", type: "Passive", text: "The adversary is defeated when they take any damage. For every 8 damage dealt by a single attack, defeat 1 additional Minion within range." },
          { name: "Group Attack", type: "Action", text: "Spend a Fear to choose a target and spotlight all Minions within Close range of them. Those Minions move into Melee range and combine their 7 damage into one attack." }
        ]
      },
      4: {
        diff: 17, major: "None", severe: "None", hp: 1, stress: 1, atkBonus: 2, minionRule: 10, targetDmg: "10–12",
        dice: { low: "12", average: "11", high: "10" },
        features: [
          { name: "Minion (10)", type: "Passive", text: "The adversary is defeated when they take any damage. For every 10 damage dealt by a single attack, defeat 1 additional Minion within range." },
          { name: "Group Attack", type: "Action", text: "Spend a Fear to choose a target and spotlight all Minions within Close range of them. Those Minions move into Melee range and combine their 11 damage into one attack." }
        ]
      }
    }
  },
  Ranged: {
    motive: "Maintain elevated firing distance, pick off vulnerable targets, and relocate under cover.",
    attackName: "Heavy Warbow",
    range: "Far",
    experiences: {
      1: ["Hunter +2", "Tracker +1"],
      2: ["Hunter +2", "Survival +2"],
      3: ["Hunter +3", "Trapper +2"],
      4: ["Hunter +4", "Tracker +3"]
    },
    tiers: {
      1: {
        diff: 11, major: 4, severe: 8, hp: 3, stress: 2, atkBonus: 1, targetDmg: "6–9",
        dice: { low: "1d12+1", average: "1d10+2", high: "1d8+3" },
        features: [
          { name: "Opportunist", type: "Passive", text: "When two or more adversaries are within Very Close range of a creature, all damage the adversary deals to that creature is doubled." },
          { name: "Opportunity Shot", type: "Reaction", text: "When another adversary deals damage to a target within Far range of the adversary, mark a Stress to add +1d6 to the damage roll." }
        ]
      },
      2: {
        diff: 14, major: 6, severe: 15, hp: 4, stress: 2, atkBonus: 3, targetDmg: "12–16",
        dice: { low: "2d12+1", average: "2d10+3", high: "2d8+5" },
        features: [
          { name: "Opportunist", type: "Passive", text: "When two or more adversaries are within Very Close range of a creature, all damage the adversary deals to that creature is doubled." },
          { name: "Opportunity Shot", type: "Reaction", text: "When another adversary deals damage to a target within Far range of the adversary, mark a Stress to add +1d8 to the damage roll." }
        ]
      },
      3: {
        diff: 16, major: 13, severe: 27, hp: 5, stress: 3, atkBonus: 3, targetDmg: "15–18",
        dice: { low: "3d10", average: "3d8+3", high: "3d6+6" },
        features: [
          { name: "Opportunist", type: "Passive", text: "When two or more adversaries are within Very Close range of a creature, all damage the adversary deals to that creature is doubled." },
          { name: "Hit Multiple Targets", type: "Reaction", text: "Spend a Fear to make an attack against up to 3 targets within Far range. Targets the adversary succeeds against take half damage." }
        ]
      },
      4: {
        diff: 18, major: 21, severe: 35, hp: 5, stress: 4, atkBonus: 5, targetDmg: "25–35",
        dice: { low: "4d12+4", average: "4d10+8", high: "4d8+12" },
        features: [
          { name: "Opportunist", type: "Passive", text: "When two or more adversaries are within Very Close range of a creature, all damage the adversary deals to that creature is doubled." },
          { name: "Hit Multiple Targets", type: "Reaction", text: "Spend a Fear to make an attack against up to 4 targets within Far range. Targets the adversary succeeds against take half damage." }
        ]
      }
    }
  },
  Skulk: {
    motive: "Stalk unseen, strike from ambush, and impart disorienting conditions.",
    attackName: "Hidden Stiletto",
    range: "Melee",
    experiences: {
      1: ["Stealth +2", "Camouflage +1"],
      2: ["Stealth +2", "Intrusion +2"],
      3: ["Stealth +3", "Rabblerouser +2"],
      4: ["Stealth +4", "Intrusion +3"]
    },
    tiers: {
      1: {
        diff: 11, major: 6, severe: 10, hp: 3, stress: 2, atkBonus: 1, targetDmg: "5–8",
        dice: { low: "1d10+1", average: "1d8+2", high: "1d6+3" },
        features: [
          { name: "Cloaked", type: "Action", text: "Become Hidden until after the adversary's next attack. Attacks made while Hidden from this feature have advantage." },
          { name: "Ambush", type: "Action", text: "While Hidden, make an attack against a target within Close range. On a success, deal +1d6 extra physical damage." }
        ]
      },
      2: {
        diff: 14, major: 8, severe: 18, hp: 4, stress: 3, atkBonus: 3, targetDmg: "9–13",
        dice: { low: "2d10", average: "2d8+2", high: "2d6+4" },
        features: [
          { name: "Cloaked", type: "Action", text: "Become Hidden until after the adversary's next attack. Attacks made while Hidden from this feature have advantage." },
          { name: "Ambush", type: "Action", text: "While Hidden, make an attack against a target within Close range. On a success, deal +1d8 extra physical damage." }
        ]
      },
      3: {
        diff: 15, major: 17, severe: 29, hp: 5, stress: 4, atkBonus: 3, targetDmg: "14–18",
        dice: { low: "3d8+3", average: "3d6+5", high: "3d4+9" },
        features: [
          { name: "Cloaked", type: "Action", text: "Become Hidden until after the adversary's next attack. Attacks made while Hidden from this feature have advantage." },
          { name: "Ambush", type: "Action", text: "While Hidden, make an attack against a target within Close range. On a success, deal +2d6 extra physical damage." }
        ]
      },
      4: {
        diff: 17, major: 25, severe: 42, hp: 5, stress: 5, atkBonus: 6, targetDmg: "20–35",
        dice: { low: "4d12+1", average: "4d10+5", high: "4d8+9" },
        features: [
          { name: "Cloaked", type: "Action", text: "Become Hidden until after the adversary's next attack. Attacks made while Hidden from this feature have advantage." },
          { name: "Ambush", type: "Action", text: "While Hidden, make an attack against a target within Close range. On a success, deal +2d8 extra physical damage." }
        ]
      }
    }
  },
  Solo: {
    motive: "Dominate the battlefield alone with relentless actions, shifting phases, and cataclysmic countdowns.",
    attackName: "Cataclysmic Slam",
    range: "Close",
    experiences: {
      1: ["Never Enough! +2", "Vengeful +1"],
      2: ["Never Enough! +3", "I See You +2"],
      3: ["Never Enough! +3", "Vengeful +3"],
      4: ["Never Enough! +4", "I See You +4"]
    },
    tiers: {
      1: {
        diff: 13, major: 8, severe: 14, hp: 9, stress: 3, atkBonus: 3, targetDmg: "8–11",
        dice: { low: "1d12+3", average: "1d10+4", high: "1d8+5" },
        features: [
          { name: "Relentless (2)", type: "Passive", text: "The adversary can be spotlighted up to two times per GM turn. Spend Fear as usual to spotlight them." },
          { name: "Countdown to Calamity", type: "Reaction", text: "Countdown (Loop 1d6). When activated, count down 1 per GM turn. When it triggers, make a standard attack against all targets within Close range." }
        ]
      },
      2: {
        diff: 15, major: 13, severe: 24, hp: 9, stress: 4, atkBonus: 3, targetDmg: "15–20",
        dice: { low: "2d12+4", average: "2d10+6", high: "2d8+8" },
        features: [
          { name: "Relentless (2)", type: "Passive", text: "The adversary can be spotlighted up to two times per GM turn. Spend Fear as usual to spotlight them." },
          { name: "Countdown to Calamity", type: "Reaction", text: "Countdown (Loop 1d6). When activated, count down 1 per GM turn. When it triggers, make a standard attack against all targets within Close range." }
        ]
      },
      3: {
        diff: 18, major: 20, severe: 38, hp: 11, stress: 6, atkBonus: 5, targetDmg: "20–30",
        dice: { low: "3d12+5", average: "3d10+8", high: "3d8+11" },
        features: [
          { name: "Relentless (2)", type: "Passive", text: "The adversary can be spotlighted up to two times per GM turn. Spend Fear as usual to spotlight them." },
          { name: "Countdown to Calamity", type: "Reaction", text: "Countdown (Loop 1d6). When activated, count down 1 per GM turn. When it triggers, make a standard attack against all targets within Close range." }
        ]
      },
      4: {
        diff: 20, major: 34, severe: 66, hp: 11, stress: 8, atkBonus: 8, targetDmg: "30–45",
        dice: { low: "4d12+11", average: "4d10+15", high: "4d8+19" },
        features: [
          { name: "Relentless (2)", type: "Passive", text: "The adversary can be spotlighted up to two times per GM turn. Spend Fear as usual to spotlight them." },
          { name: "Countdown to Calamity", type: "Reaction", text: "Countdown (Loop 1d6). When activated, count down 1 per GM turn. When it triggers, make a standard attack against all targets within Close range." }
        ]
      }
    }
  },
  Standard: {
    motive: "Hold the line with disciplined formations, coordinate attacks, and harry heroes.",
    attackName: "Military Halberd",
    range: "Melee",
    experiences: {
      1: ["Watchman +1"],
      2: ["Foot Soldier +2"],
      3: ["Veteran Guard +2"],
      4: ["Elite Soldier +3"]
    },
    tiers: {
      1: {
        diff: 12, major: 6, severe: 10, hp: 5, stress: 3, atkBonus: 1, targetDmg: "4–6",
        dice: { low: "1d8+1", average: "1d6+2", high: "1d4+3" },
        features: [
          { name: "Pack Tactics", type: "Passive", text: "If the adversary makes a successful standard attack and another ally is within Melee range of the target, deal +1d4 physical damage instead and gain a Fear." },
          { name: "Too Many to Handle", type: "Passive", text: "When the adversary is within Melee range of a creature and at least one other ally is within Close range, all attacks against that creature have advantage." }
        ]
      },
      2: {
        diff: 14, major: 10, severe: 18, hp: 5, stress: 3, atkBonus: 2, targetDmg: "8–12",
        dice: { low: "2d8+1", average: "2d6+3", high: "2d4+5" },
        features: [
          { name: "Pack Tactics", type: "Passive", text: "If the adversary makes a successful standard attack and another ally is within Melee range of the target, deal +1d6 physical damage instead and gain a Fear." },
          { name: "Too Many to Handle", type: "Passive", text: "When the adversary is within Melee range of a creature and at least one other ally is within Close range, all attacks against that creature have advantage." }
        ]
      },
      3: {
        diff: 16, major: 17, severe: 31, hp: 6, stress: 4, atkBonus: 3, targetDmg: "12–17",
        dice: { low: "3d8+1", average: "3d6+4", high: "3d4+7" },
        features: [
          { name: "Pack Tactics", type: "Passive", text: "If the adversary makes a successful standard attack and another ally is within Melee range of the target, deal +1d8 physical damage instead and gain a Fear." },
          { name: "Too Many to Handle", type: "Passive", text: "When the adversary is within Melee range of a creature and at least one other ally is within Close range, all attacks against that creature have advantage." }
        ]
      },
      4: {
        diff: 18, major: 30, severe: 47, hp: 6, stress: 4, atkBonus: 4, targetDmg: "17–28",
        dice: { low: "4d8+4", average: "4d6+8", high: "4d4+12" },
        features: [
          { name: "Pack Tactics", type: "Passive", text: "If the adversary makes a successful standard attack and another ally is within Melee range of the target, deal +2d6 physical damage instead and gain a Fear." },
          { name: "Too Many to Handle", type: "Passive", text: "When the adversary is within Melee range of a creature and at least one other ally is within Close range, all attacks against that creature have advantage." }
        ]
      }
    }
  },
  Support: {
    motive: "Bolster allies, manipulate magical hazards, and impose debilitating conditions on PCs.",
    attackName: "Eldritch Wand",
    range: "Close",
    experiences: {
      1: ["Magical Knowledge +2", "Lore +1"],
      2: ["Magical Knowledge +2", "Lore +2"],
      3: ["Magical Knowledge +3", "Lore +3"],
      4: ["Magical Knowledge +4", "Lore +4"]
    },
    tiers: {
      1: {
        diff: 13, major: 6, severe: 10, hp: 4, stress: 4, atkBonus: 1, targetDmg: "3–5",
        dice: { low: "1d6+1", average: "1d4+2", high: "1d4+2" },
        features: [
          { name: "AOE Condition", type: "Action", text: "Spend a Fear to make an attack against all targets within Very Close range. Targets the adversary succeeds against become Restrained and Vulnerable. A target can break free with a successful Trait Roll." },
          { name: "Quick Cleanse", type: "Action", text: "Mark a Stress to clear a temporary condition on an ally within Close range." }
        ]
      },
      2: {
        diff: 14, major: 10, severe: 18, hp: 4, stress: 5, atkBonus: 2, targetDmg: "5–12",
        dice: { low: "2d6+1", average: "2d4+3", high: "2d4+3" },
        features: [
          { name: "AOE Condition", type: "Action", text: "Spend a Fear to make an attack against all targets within Very Close range. Targets the adversary succeeds against become Restrained and Vulnerable. A target can break free with a successful Trait Roll." },
          { name: "Quick Cleanse", type: "Action", text: "Mark a Stress to clear a temporary condition on an ally within Close range." }
        ]
      },
      3: {
        diff: 16, major: 18, severe: 31, hp: 5, stress: 5, atkBonus: 3, targetDmg: "13–16",
        dice: { low: "3d8+1", average: "3d6+4", high: "3d4+7" },
        features: [
          { name: "AOE Condition", type: "Action", text: "Spend a Fear to make an attack against all targets within Very Close range. Targets the adversary succeeds against become Restrained and Vulnerable. A target can break free with a successful Trait Roll." },
          { name: "Quick Cleanse", type: "Action", text: "Mark a Stress to clear a temporary condition on an ally within Close range." }
        ]
      },
      4: {
        diff: 18, major: 25, severe: 40, hp: 5, stress: 5, atkBonus: 4, targetDmg: "18–25",
        dice: { low: "4d8+3", average: "4d6+7", high: "4d4+11" },
        features: [
          { name: "AOE Condition", type: "Action", text: "Spend a Fear to make an attack against all targets within Very Close range. Targets the adversary succeeds against become Restrained and Vulnerable. A target can break free with a successful Trait Roll." },
          { name: "Quick Cleanse", type: "Action", text: "Mark a Stress to clear a temporary condition on an ally within Close range." }
        ]
      }
    }
  },
  Social: {
    motive: "Use leverage, deceptive bargains, political power, and hired muscle to control encounters.",
    attackName: "Concealed Dagger",
    range: "Close",
    experiences: {
      1: ["Merchant +2", "Deception +1"],
      2: ["Merchant Baron +2", "Bribery +2"],
      3: ["Royal Courtier +3", "High Politics +3"],
      4: ["Mastermind +4", "Blackmail +4"]
    },
    tiers: {
      1: {
        diff: 11, major: 4, severe: 7, hp: 3, stress: 2, atkBonus: -2, targetDmg: "2–4",
        dice: { low: "1d6", average: "1d4+1", high: "1d4+1" },
        features: [
          { name: "Silver Tongue", type: "Action", text: "Mark a Stress to force a PC within Close range to make a Presence Reaction Roll (12). On a failure, they mark a Stress." },
          { name: "Call the Guards!", type: "Action", text: "Spend a Fear to summon 2 Minions who appear within Close range." }
        ]
      },
      2: {
        diff: 14, major: 6, severe: 15, hp: 3, stress: 2, atkBonus: -1, targetDmg: "5–12",
        dice: { low: "2d6+1", average: "2d4+3", high: "2d4+3" },
        features: [
          { name: "Silver Tongue", type: "Action", text: "Mark a Stress to force a PC within Close range to make a Presence Reaction Roll (14). On a failure, they mark a Stress." },
          { name: "Call the Guards!", type: "Action", text: "Spend a Fear to summon 2 Minions who appear within Close range." }
        ]
      },
      3: {
        diff: 16, major: 17, severe: 29, hp: 5, stress: 4, atkBonus: 0, targetDmg: "12–17",
        dice: { low: "3d8+1", average: "3d6+4", high: "3d4+7" },
        features: [
          { name: "Silver Tongue", type: "Action", text: "Mark a Stress to force a PC within Close range to make a Presence Reaction Roll (16). On a failure, they mark a Stress." },
          { name: "Call the Guards!", type: "Action", text: "Spend a Fear to summon 2 Minions who appear within Close range." }
        ]
      },
      4: {
        diff: 18, major: 30, severe: 42, hp: 5, stress: 4, atkBonus: 4, targetDmg: "17–28",
        dice: { low: "4d8+4", average: "4d6+8", high: "4d4+12" },
        features: [
          { name: "Silver Tongue", type: "Action", text: "Mark a Stress to force a PC within Close range to make a Presence Reaction Roll (18). On a failure, they mark a Stress." },
          { name: "Call the Guards!", type: "Action", text: "Spend a Fear to summon 2 Minions who appear within Close range." }
        ]
      }
    }
  },
  Environment: {
    motive: "Present natural or supernatural hazards, forcing PCs to adapt to treacherous conditions.",
    attackName: "Environmental Hazard",
    range: "Close",
    experiences: {
      1: ["Treacherous Footholds +2"],
      2: ["Unstable Scenery +2"],
      3: ["Raging Elements +3"],
      4: ["Cataclysmic Surge +4"]
    },
    tiers: {
      1: {
        diff: 11, major: "—", severe: "—", hp: 0, stress: 0, atkBonus: 0, targetDmg: "Scene",
        dice: { low: "—", average: "—", high: "—" },
        features: [
          { name: "Shifting Terrain", type: "Passive", text: "Any PC who moves farther than Very Close range during their turn must make an Agility Reaction Roll (12) or become Vulnerable." },
          { name: "Environmental Collapse", type: "Action", text: "Spend a Fear to force all creatures in the area to make an Agility Reaction Roll (13) or take 1d8 physical damage and be knocked prone." }
        ]
      },
      2: {
        diff: 14, major: "—", severe: "—", hp: 0, stress: 0, atkBonus: 0, targetDmg: "Scene",
        dice: { low: "—", average: "—", high: "—" },
        features: [
          { name: "Shifting Terrain", type: "Passive", text: "Any PC who moves farther than Very Close range during their turn must make an Agility Reaction Roll (14) or become Vulnerable." },
          { name: "Environmental Collapse", type: "Action", text: "Spend a Fear to force all creatures in the area to make an Agility Reaction Roll (15) or take 2d8 physical damage and be knocked prone." }
        ]
      },
      3: {
        diff: 17, major: "—", severe: "—", hp: 0, stress: 0, atkBonus: 0, targetDmg: "Scene",
        dice: { low: "—", average: "—", high: "—" },
        features: [
          { name: "Shifting Terrain", type: "Passive", text: "Any PC who moves farther than Very Close range during their turn must make an Agility Reaction Roll (16) or become Vulnerable." },
          { name: "Environmental Collapse", type: "Action", text: "Spend a Fear to force all creatures in the area to make an Agility Reaction Roll (17) or take 3d8 physical damage and be knocked prone." }
        ]
      },
      4: {
        diff: 20, major: "—", severe: "—", hp: 0, stress: 0, atkBonus: 0, targetDmg: "Scene",
        dice: { low: "—", average: "—", high: "—" },
        features: [
          { name: "Shifting Terrain", type: "Passive", text: "Any PC who moves farther than Very Close range during their turn must make an Agility Reaction Roll (18) or become Vulnerable." },
          { name: "Cataclysmic Surge", type: "Action", text: "Spend a Fear to force all creatures in the area to make an Agility Reaction Roll (19) or take 4d8 physical damage and mark a Stress." }
        ]
      }
    }
  }
};


// Built-in fallback baseline adversaries
const FALLBACK_SRD_BESTIARY = [
  {
    id: 'srd-cult-initiate',
    name: 'Cult Initiate',
    tier: 1,
    type: 'Minion',
    motive: 'Follow orders, chant forbidden rites, overwhelm trespassers',
    diff: 11,
    major: 'None',
    severe: 'None',
    hp: 1,
    stress: 1,
    minionRule: 6,
    attack: { name: 'Ritual Dagger', bonus: 0, range: 'Melee', damage: '5', type: 'Physical' },
    experiences: ['Forbidden Rituals +1'],
    features: [
      { name: 'Minion (6)', type: 'Passive', text: 'Defeated upon taking any damage. For every 6 damage dealt by a single attack, defeat 1 additional Minion within range.' },
      { name: 'Group Attack', type: 'Action', text: 'Spend a Fear to spotlight all Cult Initiates within Close range. They move into Melee range and combine their 5 damage into one attack.' }
    ]
  },
  {
    id: 'srd-forest-troll',
    name: 'Ancient Moss-Troll',
    tier: 2,
    type: 'Solo',
    motive: 'Defend primordial territory, regenerate flesh, devour intruders whole',
    diff: 17,
    major: 16,
    severe: 32,
    hp: 12,
    stress: 7,
    minionRule: 0,
    attack: { name: 'Crushing Tree-Trunk Club', bonus: 4, range: 'Melee', damage: '2d12+5', type: 'Physical' },
    experiences: ['Primal Might +3', 'Forest Stalker +2'],
    features: [
      { name: 'Relentless (2)', type: 'Passive', text: 'The Troll may be spotlighted up to two times per GM turn. Spend Fear as usual to spotlight.' },
      { name: 'Regeneration', type: 'Reaction', text: 'At the start of the GM turn, clear 1 marked HP unless the Troll took fire or acid damage since its last turn.' }
    ]
  }
];

// =============================================================================
// 2. PROCEDURAL TOKEN GENERATOR (HTML5 Canvas Engine)
// =============================================================================

const TokenRenderer = {
  generate(name, type, tier, customColor = null) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    const roleColors = {
      Minion:  { bg: '#374151', border: '#9ca3af', crest: 'M' },
      Standard:{ bg: '#1e3a8a', border: '#60a5fa', crest: 'S' },
      Skulk:   { bg: '#312e81', border: '#a78bfa', crest: 'K' },
      Ranged:  { bg: '#064e3b', border: '#34d399', crest: 'R' },
      Leader:  { bg: '#78350f', border: '#f59e0b', crest: 'L' },
      Bruiser: { bg: '#854d0e', border: '#facc15', crest: 'B' },
      Support: { bg: '#4c1d95', border: '#c084fc', crest: 'P' },
      Solo:    { bg: '#831843', border: '#f43f5e', crest: 'X' },
      Colossus:{ bg: '#451a03', border: '#f59e0b', crest: 'Ω' },
      Social:  { bg: '#134e4a', border: '#2dd4bf', crest: 'C' },
      Horde:   { bg: '#581c87', border: '#d8b4fe', crest: 'H' },
      Environment: { bg: '#064e3b', border: '#10b981', crest: 'E' }
    };

    const style = roleColors[type] || roleColors.Standard;
    const bgCol = customColor || style.bg;

    const gradient = ctx.createRadialGradient(64, 64, 40, 64, 64, 64);
    gradient.addColorStop(0, bgCol);
    gradient.addColorStop(1, '#0b0d0e');

    ctx.beginPath();
    ctx.arc(64, 64, 60, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#c99a4e';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(64, 64, 52, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = style.border;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const words = (name || 'Adv').trim().split(/\s+/);
    let initials = words[0] ? words[0][0].toUpperCase() : 'A';
    if (words.length > 1 && words[1]) {
      initials += words[1][0].toUpperCase();
    }
    ctx.fillText(initials, 64, 60);

    ctx.fillStyle = '#111827';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(34, 96, 60, 22, 6);
    } else if (ctx.rect) {
      ctx.rect(34, 96, 60, 22);
    }
    ctx.fill();
    ctx.strokeStyle = '#c99a4e';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#facc8e';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`T${tier} ${(type || 'STD').slice(0, 3).toUpperCase()}`, 64, 107);

    return canvas.toDataURL('image/png');
  }
};

// =============================================================================
// 3. SYNTHESIZED WEB AUDIO ENGINE
// =============================================================================

const AudioFX = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  },
  playRoll() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200 + Math.random() * 250, now + (i * 0.035));
        gain.gain.setValueAtTime(0.08, now + (i * 0.035));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.035) + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + (i * 0.035));
        osc.stop(now + (i * 0.035) + 0.07);
      }
    } catch (e) {}
  }
};

// =============================================================================
// 4. MAIN APPLICATION ARCHITECTURE & STATE
// =============================================================================

const App = {
  state: {
    party: { count: 4, tier: 1 },
    gmFear: 2,
    roster: [],
    srdAdversaries: [],
    srdEnvironments: [],
    customAdversaries: [],
    savedEncounters: [],
    theme: 'dark'
  },

  // Custom Adversary & Encounter edit tracking
  editingCustomIdx: null,
  editingCustomId: null,
  pendingCustomAdvSave: null,
  pendingCustomAdvTargetIdx: -1,
  loadedEncounterId: null,
  loadedEncounterTitle: null,

  // Pagination & accordion state for compendium
  bestiaryPage: 1,
  environmentsPage: 1,
  pageSize: 24,
  expandedBestiaryId: null,

  async init() {
    this.loadState();
    await this.loadExternalSRDAdversaries();
    this.setupEventListeners();
    this.renderAll();
    this.updateCreatorPreview();
  },

  // Load external SRD adversaries, environments, and custom library from project folder
  async loadExternalSRDAdversaries() {
    try {
      const [resAdv, resEnv, resCustom] = await Promise.all([
        fetch('daggerheart-srd-adversaries.json').catch(() => null),
        fetch('daggerheart-srd-environments.json').catch(() => null),
        fetch('custom-library.json').catch(() => null)
      ]);

      if (resAdv && resAdv.ok) {
        const advList = await resAdv.json();
        if (Array.isArray(advList) && advList.length > 0) {
          this.state.srdAdversaries = advList.filter(a => a.type !== 'Environment' && !a.isEnvironment);
          console.log(`Successfully loaded ${this.state.srdAdversaries.length} adversaries from daggerheart-srd-adversaries.json`);
        }
      } else {
        this.state.srdAdversaries = FALLBACK_SRD_BESTIARY;
      }

      if (resEnv && resEnv.ok) {
        const envList = await resEnv.json();
        if (Array.isArray(envList) && envList.length > 0) {
          this.state.srdEnvironments = envList;
          console.log(`Successfully loaded ${this.state.srdEnvironments.length} environments from daggerheart-srd-environments.json`);
        }
      }

      if (resCustom && resCustom.ok) {
        const customData = await resCustom.json();
        const advList = Array.isArray(customData) ? customData : (customData.customAdversaries || []);
        if (Array.isArray(advList) && advList.length > 0) {
          advList.forEach(item => {
            const existingIdx = this.state.customAdversaries.findIndex(ca =>
              (ca.id && ca.id === item.id) || (ca.name && item.name && ca.name.toLowerCase() === item.name.toLowerCase())
            );
            if (existingIdx !== -1) {
              this.state.customAdversaries[existingIdx] = item;
            } else {
              this.state.customAdversaries.push(item);
            }
          });
          console.log(`Loaded ${advList.length} custom library entries from custom-library.json`);
        }

        // Also load saved encounters if present in custom-library.json
        if (customData && !Array.isArray(customData) && Array.isArray(customData.savedEncounters)) {
          customData.savedEncounters.forEach(enc => {
            const existingIdx = this.state.savedEncounters.findIndex(se =>
              (se.id && se.id === enc.id) || (se.name && enc.name && se.name === enc.name) || (se.title && enc.title && se.title === enc.title)
            );
            if (existingIdx !== -1) {
              this.state.savedEncounters[existingIdx] = enc;
            } else {
              this.state.savedEncounters.push(enc);
            }
          });
          console.log(`Loaded saved encounters from custom-library.json`);
        }
        this.saveState();
      }
    } catch (err) {
      console.warn('Could not fetch external SRD files directly, falling back to embedded library.', err);
      if (!this.state.srdAdversaries || this.state.srdAdversaries.length === 0) {
        this.state.srdAdversaries = FALLBACK_SRD_BESTIARY;
      }
    }
    this.renderBestiary();
    this.renderEnvironments();
    this.renderCustomLibrary();
    this.renderSavedEncounters();
  },

  loadState() {
    try {
      const savedParty = localStorage.getItem('dh_party_config');
      if (savedParty) this.state.party = JSON.parse(savedParty);

      const savedFear = localStorage.getItem('dh_fear_pool');
      if (savedFear !== null) this.state.gmFear = parseInt(savedFear, 10);

      const savedRoster = localStorage.getItem('dh_active_roster');
      if (savedRoster) this.state.roster = JSON.parse(savedRoster);

      const savedCustoms = localStorage.getItem('dh_custom_adversaries');
      if (savedCustoms) this.state.customAdversaries = JSON.parse(savedCustoms);

      const savedEnc = localStorage.getItem('dh_saved_encounters');
      if (savedEnc) this.state.savedEncounters = JSON.parse(savedEnc);

      const savedTheme = localStorage.getItem('dh_theme');
      if (savedTheme) this.state.theme = savedTheme;
    } catch (e) {
      console.warn('Storage read fallback:', e);
    }
  },

  saveState() {
    try {
      localStorage.setItem('dh_party_config', JSON.stringify(this.state.party));
      localStorage.setItem('dh_fear_pool', this.state.gmFear.toString());
      localStorage.setItem('dh_active_roster', JSON.stringify(this.state.roster));
      localStorage.setItem('dh_custom_adversaries', JSON.stringify(this.state.customAdversaries));
      localStorage.setItem('dh_saved_encounters', JSON.stringify(this.state.savedEncounters));
      localStorage.setItem('dh_theme', this.state.theme);
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  },

  // Save full library (Custom Adversaries + Saved Encounters) directly to custom-library.json on Google Drive
  async saveCustomLibraryToFile(silent = false) {
    const payload = {
      version: '1.0',
      updatedAt: new Date().toISOString(),
      customAdversaries: this.state.customAdversaries || [],
      savedEncounters: this.state.savedEncounters || []
    };

    try {
      const res = await fetch('/api/save-custom-library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload, null, 2)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (!silent) {
            this.showToast('&#10004; Saved directly to <strong>custom-library.json</strong> in project folder!');
          }
          return true;
        }
      }
    } catch (err) {
      console.warn('Backend auto-save API not reachable:', err);
    }

    // Fallback if not running server.py:
    if (!silent) {
      this.showToast('Saved to browser cache. (Tip: Run <code>start_app.bat</code> to enable auto-save to project file!)');
    }
    return false;
  },

  // Build a formatted mouseover tooltip containing Name, Description, and Motives & Tactics
  getAdversaryTooltip(adv) {
    if (!adv) return '';
    const name = adv.name || 'Adversary';
    const isEnv = (adv.type === 'Environment' || adv.isEnvironment);
    const desc = (adv.summary || adv.description || '').trim();
    const motive = (adv.motive || (isEnv ? adv.impulses : '') || '').trim();

    let html = `<div class="dh-tooltip-header">${name}</div>`;
    if (desc) {
      html += `<div class="dh-tooltip-section-title">Description</div><div class="dh-tooltip-text">${desc}</div>`;
    }
    if (motive) {
      html += `<div class="dh-tooltip-section-title">${isEnv ? 'Impulses & Hazards' : 'Motives & Tactics'}</div><div class="dh-tooltip-text">${motive}</div>`;
    }
    return html.replace(/"/g, '&quot;');
  },

  // Initialize global rich floating tooltip listener for [data-adv-tooltip]
  initRichTooltips() {
    let tooltipEl = document.getElementById('dh-adversary-tooltip');
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'dh-adversary-tooltip';
      document.body.appendChild(tooltipEl);
    }

    const showTooltip = (trigger, e) => {
      const content = trigger.getAttribute('data-adv-tooltip');
      if (!content) return;
      // Decode HTML entities
      const txt = document.createElement('textarea');
      txt.innerHTML = content;
      tooltipEl.innerHTML = txt.value;
      tooltipEl.classList.add('show');
      positionTooltip(e);
    };

    const positionTooltip = (e) => {
      if (!tooltipEl.classList.contains('show')) return;
      const offset = 14;
      let x = e.clientX + offset;
      let y = e.clientY + offset;

      const rect = tooltipEl.getBoundingClientRect();
      if (x + rect.width > window.innerWidth - 12) {
        x = e.clientX - rect.width - offset;
      }
      if (y + rect.height > window.innerHeight - 12) {
        y = e.clientY - rect.height - offset;
      }
      if (x < 10) x = 10;
      if (y < 10) y = 10;

      tooltipEl.style.left = `${x}px`;
      tooltipEl.style.top = `${y}px`;
    };

    const hideTooltip = () => {
      tooltipEl.classList.remove('show');
    };

    document.addEventListener('mouseover', (e) => {
      const trigger = e.target.closest('[data-adv-tooltip]');
      if (trigger) {
        showTooltip(trigger, e);
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (tooltipEl.classList.contains('show')) {
        positionTooltip(e);
      }
    });

    document.addEventListener('mouseout', (e) => {
      const trigger = e.target.closest('[data-adv-tooltip]');
      if (trigger && (!e.relatedTarget || !trigger.contains(e.relatedTarget))) {
        hideTooltip();
      }
    });
  },

  // Get full combined compendium (SRD Adversaries, SRD Environments, and Custom Creations)
  getAllCompendiumEntities() {
    const list = [];
    const addedIds = new Set();

    // 1. SRD Adversaries
    (this.state.srdAdversaries || []).forEach(adv => {
      if (adv.type === 'Environment' || adv.isEnvironment) return;
      const id = adv.id || `srd-${adv.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      if (!addedIds.has(id)) {
        addedIds.add(id);
        list.push({
          ...adv,
          id,
          book: adv.book || 'Core',
          isCustom: false,
          isEnvironment: false
        });
      }
    });

    // 2. SRD Environments
    (this.state.srdEnvironments || []).forEach(env => {
      const id = env.id || `env-${env.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      if (!addedIds.has(id)) {
        addedIds.add(id);
        list.push({
          ...env,
          id,
          type: 'Environment',
          book: env.book || 'Core',
          isCustom: false,
          isEnvironment: true
        });
      }
    });

    // 3. Custom Adversaries & Environments
    (this.state.customAdversaries || []).forEach((item, idx) => {
      const isEnv = (item.type === 'Environment' || item.isEnvironment);
      const id = item.id || `custom-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx}`;
      list.push({
        ...item,
        id,
        type: isEnv ? 'Environment' : (item.type || 'Standard'),
        book: 'Custom',
        isCustom: true,
        isEnvironment: isEnv,
        customIdx: idx
      });
    });

    return list;
  },

  getAllAdversaries() {
    return this.getAllCompendiumEntities();
  },

  getAllEnvironments() {
    return this.getAllCompendiumEntities().filter(a => a.isEnvironment || a.type === 'Environment');
  },

  // ===========================================================================
  // 5. EVENT LISTENERS
  // ===========================================================================
  setupEventListeners() {
    // Global click listener to close open dropdown menus
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.adv-options-dropdown')) {
        document.querySelectorAll('.adv-options-dropdown .dropdown-menu.show').forEach(m => {
          m.classList.remove('show');
        });
      }
    });

    // Tab Switching
    document.querySelectorAll('.nav-pills .nav-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        this.switchTab(tabId);
      });
    });

    // Party Configuration Controls
    const updatePartyCount = (val) => {
      this.state.party.count = Math.max(1, parseInt(val, 10) || 4);
      this.saveState();
      this.renderHUD();
      this.renderRoster();
    };

    const pcCountInput = document.getElementById('input-pc-count');
    pcCountInput?.addEventListener('change', (e) => updatePartyCount(e.target.value));
    pcCountInput?.addEventListener('input', (e) => updatePartyCount(e.target.value));

    document.getElementById('select-party-tier')?.addEventListener('change', (e) => {
      this.state.party.tier = parseInt(e.target.value, 10) || 1;
      this.saveState();
      this.renderHUD();
      this.renderRoster();
    });

    // Fear Pool (Max 12)
    document.getElementById('btn-fear-minus')?.addEventListener('click', () => {
      if (this.state.gmFear > 0) {
        this.state.gmFear = Math.max(0, this.state.gmFear - 1);
        AudioFX.playClick();
        this.saveState();
        this.renderFear();
      }
    });

    document.getElementById('btn-fear-plus')?.addEventListener('click', () => {
      this.state.gmFear = Math.min(12, (this.state.gmFear || 0) + 1);
      AudioFX.playClick();
      this.saveState();
      this.renderFear();
    });

    document.querySelectorAll('.btn-fear-set').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-val'), 10);
        this.state.gmFear = isNaN(val) ? 0 : Math.min(12, Math.max(0, val));
        AudioFX.playClick();
        this.saveState();
        this.renderFear();
      });
    });

    // Theme Toggle
    document.getElementById('btn-toggle-theme')?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // GM Console Toggle
    document.getElementById('toggle-dice-tray')?.addEventListener('click', () => {
      this.toggleDiceTray();
    });

    document.getElementById('btn-close-dice-tray')?.addEventListener('click', () => {
      this.closeDiceTray();
    });

    // GM Action d20 Roll
    document.getElementById('btn-roll-gm-d20')?.addEventListener('click', () => {
      this.rollGMD20();
    });

    // d20 Modifier Plus / Minus
    document.getElementById('btn-mod-minus')?.addEventListener('click', () => {
      const input = document.getElementById('gm-d20-bonus');
      if (input) {
        input.value = (parseInt(input.value, 10) || 0) - 1;
      }
    });

    document.getElementById('btn-mod-plus')?.addEventListener('click', () => {
      const input = document.getElementById('gm-d20-bonus');
      if (input) {
        input.value = (parseInt(input.value, 10) || 0) + 1;
      }
    });

    // d20 Modifier Presets (+0, +2, +3, +4, +5, +8)
    document.querySelectorAll('.gm-mod-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const mod = parseInt(btn.getAttribute('data-mod'), 10) || 0;
        const input = document.getElementById('gm-d20-bonus');
        if (input) input.value = mod;
      });
    });

    // Polyhedral Dice Quantity Multiplier (1x, 2x, 3x, 4x, 6x)
    this.diceQuantity = 1;
    const updatePolyFormulaPreview = () => {
      const preview = document.getElementById('poly-formula-preview');
      const bonus = parseInt(document.getElementById('poly-dice-bonus')?.value, 10) || 0;
      const modStr = bonus > 0 ? ` + ${bonus}` : (bonus < 0 ? ` - ${Math.abs(bonus)}` : '');
      if (preview) preview.textContent = `${this.diceQuantity || 1}d...${modStr}`;
    };

    document.querySelectorAll('.dice-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.dice-qty-btn').forEach(b => {
          b.classList.remove('active', 'btn-warning');
          b.classList.add('btn-outline-secondary');
        });
        btn.classList.add('active', 'btn-warning');
        btn.classList.remove('btn-outline-secondary');
        this.diceQuantity = parseInt(btn.getAttribute('data-qty'), 10) || 1;
        updatePolyFormulaPreview();
      });
    });

    // Polyhedral Modifier Controls
    document.getElementById('btn-poly-mod-minus')?.addEventListener('click', () => {
      const input = document.getElementById('poly-dice-bonus');
      if (input) {
        input.value = (parseInt(input.value, 10) || 0) - 1;
        updatePolyFormulaPreview();
      }
    });

    document.getElementById('btn-poly-mod-plus')?.addEventListener('click', () => {
      const input = document.getElementById('poly-dice-bonus');
      if (input) {
        input.value = (parseInt(input.value, 10) || 0) + 1;
        updatePolyFormulaPreview();
      }
    });

    document.getElementById('poly-dice-bonus')?.addEventListener('input', () => {
      updatePolyFormulaPreview();
    });

    document.querySelectorAll('.poly-mod-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const mod = parseInt(btn.getAttribute('data-mod'), 10) || 0;
        const input = document.getElementById('poly-dice-bonus');
        if (input) {
          input.value = mod;
          updatePolyFormulaPreview();
        }
      });
    });

    // Polyhedral Quick Buttons
    document.querySelectorAll('.dice-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const die = parseInt(btn.getAttribute('data-die'), 10);
        this.rollSingleDie(die, this.diceQuantity || 1);
      });
    });

    document.getElementById('btn-clear-roll-log')?.addEventListener('click', () => {
      const log = document.getElementById('combat-roll-log');
      if (log) log.innerHTML = '<div class="text-muted italic">Log cleared.</div>';
    });

    // Initialize GM Console Calculator
    this.initCalculator();

    // Initialize Rich Floating Adversary Tooltips
    this.initRichTooltips();

    // Empty state buttons
    document.getElementById('btn-empty-bestiary')?.addEventListener('click', () => this.switchTab('tab-bestiary'));
    document.getElementById('btn-empty-create')?.addEventListener('click', () => this.switchTab('tab-creator'));
    document.getElementById('btn-quick-add-srd')?.addEventListener('click', () => this.switchTab('tab-bestiary'));

    // Roster Global Controls
    document.getElementById('btn-clear-encounter')?.addEventListener('click', () => {
      if (this.state.roster.length === 0) return;
      if (confirm('Are you sure you want to reset the current combat roster?')) {
        this.state.roster = [];
        this.loadedEncounterId = null;
        this.loadedEncounterTitle = null;
        this.saveState();
        this.renderRoster();
        this.renderHUD();
        this.showToast('Encounter roster cleared.');
      }
    });

    document.getElementById('btn-collapse-all')?.addEventListener('click', () => {
      this.state.roster.forEach(adv => { adv.isCollapsed = true; });
      this.saveState();
      this.renderRoster();
      AudioFX.playClick();
    });

    document.getElementById('btn-expand-all')?.addEventListener('click', () => {
      this.state.roster.forEach(adv => { adv.isCollapsed = false; });
      this.saveState();
      this.renderRoster();
      AudioFX.playClick();
    });

    // Creator Form
    const creatorForm = document.getElementById('form-adversary-builder');
    if (creatorForm) {
      creatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCreatorSubmit(false);
      });

      ['form-adv-name', 'form-adv-tier', 'form-adv-type', 'form-adv-description', 'form-adv-motive', 'form-adv-diff',
       'form-adv-thresh-major', 'form-adv-thresh-severe', 'form-adv-hp', 'form-adv-stress',
       'form-adv-atk-name', 'form-adv-atk-bonus', 'form-adv-atk-range', 'form-adv-atk-damage',
       'form-adv-atk-damagetype', 'form-adv-experiences',
       'form-env-subtype', 'form-env-impulses', 'form-env-adversaries'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => this.updateCreatorPreview());
        document.getElementById(id)?.addEventListener('change', () => this.updateCreatorPreview());
      });

      document.getElementById('form-adv-type')?.addEventListener('change', () => this.handleTypeChange());
      document.getElementById('form-adv-tier')?.addEventListener('change', () => this.handleTierChange());
      document.getElementById('btn-origin-restore')?.addEventListener('click', () => this.resetCreatorToOrigin());
      document.getElementById('btn-origin-detach')?.addEventListener('click', () => this.detachCreatorOrigin());
    }

    document.getElementById('form-adv-token-style')?.addEventListener('change', (e) => {
      const container = document.getElementById('container-token-upload');
      if (container) container.style.display = e.target.value === 'upload' ? 'block' : 'none';
      this.updateCreatorPreview();
    });

    document.getElementById('form-adv-token-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          this.creatorCustomImageData = evt.target.result;
          this.updateCreatorPreview();
        };
        reader.readAsDataURL(file);
      }
    });

    document.getElementById('btn-creator-add-to-encounter')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleCreatorSubmit(false);
    });
    document.getElementById('btn-save-as-custom-template')?.addEventListener('click', () => this.handleCreatorSubmit(true));
    document.getElementById('btn-add-feature-row')?.addEventListener('click', () => this.addFeatureRow());
    document.getElementById('btn-add-segment-preset-limb')?.addEventListener('click', () => this.addColossusSegment('limb'));
    document.getElementById('btn-add-colossus-segment')?.addEventListener('click', () => this.addColossusSegment());
    document.getElementById('form-colossus-size')?.addEventListener('input', () => this.updateCreatorPreview());

    // RightKnight v1.7 Preset Generator Modal
    document.getElementById('btn-load-preset-template')?.addEventListener('click', () => this.openPresetModal());
    ['preset-select-type', 'preset-select-tier', 'preset-select-consistency'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.updatePresetModalPreview());
    });
    document.getElementById('btn-confirm-generate-preset')?.addEventListener('click', () => this.generateFromPreset());
    document.getElementById('btn-reset-creator-form')?.addEventListener('click', () => this.clearCreatorForm());

    // Bestiary Filters
    document.getElementById('bestiary-search-input')?.addEventListener('input', () => {
      this.bestiaryPage = 1;
      this.renderBestiary();
    });
    document.getElementById('bestiary-filter-source')?.addEventListener('change', () => {
      this.bestiaryPage = 1;
      this.renderBestiary();
    });
    document.getElementById('bestiary-filter-tier')?.addEventListener('change', () => {
      this.bestiaryPage = 1;
      this.renderBestiary();
    });
    document.getElementById('bestiary-filter-type')?.addEventListener('change', () => {
      this.bestiaryPage = 1;
      this.renderBestiary();
    });

    // Environments Filters
    document.getElementById('environments-search-input')?.addEventListener('input', () => {
      this.environmentsPage = 1;
      this.renderEnvironments();
    });
    document.getElementById('environments-filter-source')?.addEventListener('change', () => {
      this.environmentsPage = 1;
      this.renderEnvironments();
    });
    document.getElementById('environments-filter-tier')?.addEventListener('change', () => {
      this.environmentsPage = 1;
      this.renderEnvironments();
    });
    document.getElementById('environments-filter-type')?.addEventListener('change', () => {
      this.environmentsPage = 1;
      this.renderEnvironments();
    });

    // Custom Library Filters & Controls
    document.getElementById('custom-library-search-input')?.addEventListener('input', () => {
      this.renderCustomLibrary();
    });
    document.getElementById('custom-library-filter-category')?.addEventListener('change', () => {
      this.renderCustomLibrary();
    });
    document.getElementById('custom-library-filter-tier')?.addEventListener('change', () => {
      this.renderCustomLibrary();
    });
    document.getElementById('btn-custom-library-create-new')?.addEventListener('click', () => {
      this.switchTab('tab-creator');
    });
    document.getElementById('btn-export-custom-json')?.addEventListener('click', () => this.exportCustomLibraryJSON());
    document.getElementById('input-import-custom-json')?.addEventListener('change', (e) => this.importCustomLibraryJSON(e));

    // Delegated click listener for Custom Library grid actions
    document.getElementById('custom-library-grid')?.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add-custom-idx]');
      if (addBtn) {
        const idx = parseInt(addBtn.getAttribute('data-add-custom-idx'), 10);
        this.addCustomToRoster(idx);
        return;
      }
      const editBtn = e.target.closest('[data-edit-custom-idx]');
      if (editBtn) {
        const idx = parseInt(editBtn.getAttribute('data-edit-custom-idx'), 10);
        this.editCustomInCreator(idx);
        return;
      }
      const delBtn = e.target.closest('[data-delete-custom-idx]');
      if (delBtn) {
        const idx = parseInt(delBtn.getAttribute('data-delete-custom-idx'), 10);
        this.deleteCustomAdversary(idx);
        return;
      }
      const emptyGoCreator = e.target.closest('#btn-empty-go-creator');
      if (emptyGoCreator) {
        this.switchTab('tab-creator');
        return;
      }
    });

    // Save & Load Encounter Controls
    document.getElementById('btn-quick-load-encounter')?.addEventListener('click', () => {
      this.switchTab('tab-saved');
    });

    document.getElementById('btn-save-encounter-dialog')?.addEventListener('click', () => {
      this.openSaveEncounterModal();
    });

    document.getElementById('btn-save-encounter-overwrite')?.addEventListener('click', async () => {
      const input = document.getElementById('input-save-encounter-name');
      const name = input ? input.value.trim() : '';
      const modalEl = document.getElementById('modal-save-encounter');
      this.closeModal(modalEl);
      await this.saveCurrentEncounter(name, true);
    });

    document.getElementById('btn-save-encounter-new')?.addEventListener('click', async () => {
      const input = document.getElementById('input-save-encounter-name');
      const name = input ? input.value.trim() : '';
      const modalEl = document.getElementById('modal-save-encounter');
      this.closeModal(modalEl);
      await this.saveCurrentEncounter(name, false);
    });

    document.getElementById('input-save-encounter-name')?.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const input = document.getElementById('input-save-encounter-name');
        const name = input ? input.value.trim() : '';
        const modalEl = document.getElementById('modal-save-encounter');
        this.closeModal(modalEl);
        const isLoaded = Boolean(this.loadedEncounterId && this.state.savedEncounters.some(se => se.id === this.loadedEncounterId));
        await this.saveCurrentEncounter(name, isLoaded);
      }
    });

    // Save Custom Adversary Modal Controls
    document.getElementById('btn-save-custom-overwrite')?.addEventListener('click', async () => {
      const modalEl = document.getElementById('modal-save-custom-adversary');
      this.closeModal(modalEl);
      if (this.pendingCustomAdvSave) {
        await this.executeSaveCustomAdversary(this.pendingCustomAdvSave, true, this.pendingCustomAdvTargetIdx);
      }
    });

    document.getElementById('btn-save-custom-as-new')?.addEventListener('click', async () => {
      const modalEl = document.getElementById('modal-save-custom-adversary');
      this.closeModal(modalEl);
      if (this.pendingCustomAdvSave) {
        await this.executeSaveCustomAdversary(this.pendingCustomAdvSave, false);
      }
    });

    // Backup Export/Import
    document.getElementById('btn-export-json')?.addEventListener('click', () => this.exportBackupJSON());
    document.getElementById('input-import-json')?.addEventListener('change', (e) => this.importBackupJSON(e));

    this.addDefaultFeatures();
  },

  // ===========================================================================
  // 6. TAB & HUD MANAGEMENT
  // ===========================================================================
  switchTab(tabId) {
    if (tabId === 'tab-environments' || tabId === 'tab-custom-library') {
      tabId = 'tab-bestiary';
    }

    document.querySelectorAll('.tab-pane-content').forEach(pane => {
      pane.classList.add('d-none');
      pane.classList.remove('active');
    });

    const target = document.getElementById(tabId);
    if (target) {
      target.classList.remove('d-none');
      target.classList.add('active');
    }

    document.querySelectorAll('.nav-pills .nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-tab') === tabId);
    });

    if (tabId === 'tab-bestiary') this.renderBestiary();
    if (tabId === 'tab-saved') this.renderSavedEncounters();
    if (tabId === 'tab-creator') this.updateCreatorPreview();
    if (tabId === 'tab-encounter') this.renderRoster();
  },

  openSaveEncounterModal() {
    const input = document.getElementById('input-save-encounter-name');
    const banner = document.getElementById('save-encounter-loaded-banner');
    const loadedNameEl = document.getElementById('save-encounter-loaded-name');
    const btnOverwrite = document.getElementById('btn-save-encounter-overwrite');
    const btnNew = document.getElementById('btn-save-encounter-new');

    const isLoaded = Boolean(this.loadedEncounterId && this.state.savedEncounters.some(se => se.id === this.loadedEncounterId));

    if (isLoaded) {
      const loadedEnc = this.state.savedEncounters.find(se => se.id === this.loadedEncounterId);
      const title = loadedEnc ? loadedEnc.title : (this.loadedEncounterTitle || 'Loaded Encounter');
      if (banner) banner.classList.remove('d-none');
      if (loadedNameEl) loadedNameEl.textContent = title;
      if (input) input.value = title;
      if (btnOverwrite) {
        btnOverwrite.classList.remove('d-none');
        btnOverwrite.textContent = 'Overwrite Current Encounter';
      }
      if (btnNew) {
        btnNew.textContent = 'Save as New';
      }
    } else {
      if (banner) banner.classList.add('d-none');
      const rosterCount = (this.state.roster || []).length;
      const dateStr = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (input) {
        if (rosterCount > 0) {
          const firstName = this.state.roster[0]?.name || 'Adversaries';
          input.value = rosterCount === 1
            ? `Encounter: ${firstName} (${dateStr})`
            : `Battle with ${rosterCount} Foes (${dateStr})`;
        } else {
          input.value = `Encounter (${dateStr}, ${timeStr})`;
        }
      }
      if (btnOverwrite) {
        btnOverwrite.classList.add('d-none');
      }
      if (btnNew) {
        btnNew.textContent = 'Save as New';
      }
    }

    const modalEl = document.getElementById('modal-save-encounter');
    if (modalEl) {
      if (window.bootstrap && window.bootstrap.Modal) {
        try {
          const inst = window.bootstrap.Modal.getOrCreateInstance(modalEl);
          inst.show();
        } catch (e) {
          console.warn('Bootstrap modal show fallback:', e);
          modalEl.classList.add('show');
          modalEl.style.display = 'block';
        }
      } else {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
      }

      setTimeout(() => {
        if (input) {
          input.focus();
          input.select();
        }
      }, 200);
    }
  },

  closeModal(modalEl) {
    if (!modalEl) return;
    try {
      if (window.bootstrap && window.bootstrap.Modal) {
        const inst = window.bootstrap.Modal.getInstance(modalEl) || window.bootstrap.Modal.getOrCreateInstance(modalEl);
        if (inst) inst.hide();
      }
    } catch (e) {
      console.warn('Bootstrap modal hide error:', e);
    }

    // Direct DOM cleanup to guarantee closure and remove stuck backdrops
    setTimeout(() => {
      modalEl.classList.remove('show');
      modalEl.setAttribute('aria-hidden', 'true');
      modalEl.style.display = 'none';
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
    }, 100);
  },

  toggleTheme() {
    this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('theme-light', this.state.theme === 'light');
    document.body.classList.toggle('theme-dark', this.state.theme === 'dark');
    document.documentElement.setAttribute('data-bs-theme', this.state.theme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.innerHTML = this.state.theme === 'light' ? '&#9788;' : '&#9789;';
    this.saveState();
  },

  renderAll() {
    document.body.classList.toggle('theme-light', this.state.theme === 'light');
    document.body.classList.toggle('theme-dark', this.state.theme === 'dark');
    document.documentElement.setAttribute('data-bs-theme', this.state.theme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.innerHTML = this.state.theme === 'light' ? '&#9788;' : '&#9789;';

    const pcInput = document.getElementById('input-pc-count');
    if (pcInput) pcInput.value = this.state.party.count;

    const tierSelect = document.getElementById('select-party-tier');
    if (tierSelect) tierSelect.value = this.state.party.tier;

    this.renderFear();
    this.renderHUD();
    this.renderRoster();
    this.renderBestiary();
    this.renderEnvironments();
    this.renderCustomLibrary();
    this.renderSavedEncounters();
  },

  renderFear() {
    const fear = this.state.gmFear !== undefined ? this.state.gmFear : 0;
    const el = document.getElementById('fear-count');
    if (el) el.textContent = fear;

    const navBadge = document.getElementById('navbar-fear-badge');
    if (navBadge) {
      navBadge.textContent = `${fear} Fear`;
      if (fear === 0) {
        navBadge.className = 'badge bg-secondary text-light rounded-pill px-2 py-1';
      } else if (fear >= 1 && fear <= 4) {
        navBadge.className = 'badge bg-success text-light rounded-pill px-2 py-1';
      } else if (fear >= 5 && fear <= 8) {
        navBadge.className = 'badge bg-warning text-dark rounded-pill px-2 py-1';
      } else {
        navBadge.className = 'badge bg-danger text-light rounded-pill px-2 py-1';
      }
    }

    const statusLabel = document.getElementById('fear-status-label');
    if (statusLabel) {
      if (fear === 0) {
        statusLabel.className = 'badge bg-secondary text-light';
        statusLabel.textContent = 'No Fear Pool';
      } else if (fear >= 1 && fear <= 4) {
        statusLabel.className = 'badge bg-success text-light';
        statusLabel.textContent = 'Standard Fear';
      } else if (fear >= 5 && fear <= 8) {
        statusLabel.className = 'badge bg-warning text-dark';
        statusLabel.textContent = 'Dangerous Fear';
      } else {
        statusLabel.className = 'badge bg-danger text-light';
        statusLabel.textContent = 'Deadly Fear';
      }
    }
  },

  renderHUD() {
    const pcCount = this.state.party.count || 4;
    const pcTier = this.state.party.tier || 1;
    // Daggerheart Target BP Formula: 3 × Number of PCs + 2
    const targetBP = (3 * pcCount) + 2;

    let currentBP = 0;
    this.state.roster.forEach(adv => {
      if (adv.type === 'Environment' || adv.isEnvironment) return;
      const baseCost = DH_BENCHMARKS.BP_COSTS[adv.type] !== undefined ? DH_BENCHMARKS.BP_COSTS[adv.type] : 2.0;
      const tierDiff = (adv.tier || 1) - pcTier;
      let effectiveCost = baseCost;
      if (tierDiff > 0) {
        effectiveCost += (tierDiff * 0.5 * baseCost);
      }
      const units = (adv.trackers && adv.trackers.length > 0) ? adv.trackers.length : 1;
      currentBP += (effectiveCost * units);
    });

    currentBP = Math.round(currentBP * 10) / 10;

    const curBPEl = document.getElementById('hud-current-bp');
    const tarBPEl = document.getElementById('hud-target-bp');
    const barEl = document.getElementById('bp-progress-bar');
    const diffEl = document.getElementById('hud-difficulty-rating');
    const summaryEl = document.getElementById('hud-party-summary');
    const breakdownEl = document.getElementById('hud-bp-breakdown');

    if (curBPEl) curBPEl.textContent = currentBP;
    if (tarBPEl) tarBPEl.textContent = targetBP;
    const tierLevelLabels = { 1: 'Level 1', 2: 'Levels 2–4', 3: 'Levels 5–7', 4: 'Levels 8–10' };
    if (summaryEl) summaryEl.textContent = `${pcCount} PCs • Tier ${pcTier} (${tierLevelLabels[pcTier] || 'Level ' + pcTier})`;
    if (breakdownEl) breakdownEl.innerHTML = `Target: (3 &times; ${pcCount}) + 2 = <strong>${targetBP} BP</strong> (Balanced)`;

    const percentage = Math.min(100, Math.round((currentBP / targetBP) * 100));
    if (barEl) {
      barEl.style.width = `${percentage}%`;
      barEl.className = 'progress-bar';
      if (currentBP <= targetBP - 2) barEl.classList.add('bg-info');
      else if (currentBP <= targetBP + 1) barEl.classList.add('bg-success');
      else if (currentBP <= targetBP + 3) barEl.classList.add('bg-warning');
      else barEl.classList.add('bg-danger');
    }

    if (diffEl) {
      if (currentBP === 0) {
        diffEl.className = 'badge bg-secondary';
        diffEl.textContent = 'Empty Scene';
      } else if (currentBP <= targetBP - 2) {
        diffEl.className = 'badge bg-info text-dark';
        diffEl.textContent = `Easy Encounter (${currentBP} BP ≤ ${targetBP - 2})`;
      } else if (currentBP <= targetBP + 1) {
        diffEl.className = 'badge bg-success';
        diffEl.textContent = `Balanced Encounter (${currentBP} BP ≈ ${targetBP})`;
      } else if (currentBP <= targetBP + 3) {
        diffEl.className = 'badge bg-warning text-dark';
        diffEl.textContent = `Hard Encounter (${currentBP} BP ≥ ${targetBP + 2})`;
      } else {
        diffEl.className = 'badge bg-danger';
        diffEl.textContent = `Deadly Encounter (${currentBP} BP ≥ ${targetBP + 4})`;
      }
    }
  },

  // ===========================================================================
  // 7. COMBAT ROSTER & INTERACTIVE STAT BLOCK RENDERING
  // ===========================================================================
  renderRoster() {
    const container = document.getElementById('active-adversary-roster');
    const emptyState = document.getElementById('encounter-empty-state');
    const badge = document.getElementById('roster-count-badge');

    if (!container) return;

    // Calculate total combatant figures across all cards
    let totalFigures = 0;
    const currentPartySize = Math.max(1, this.state.party?.count || 4);
    this.state.roster.forEach(adv => {
      if (!adv.trackers || !Array.isArray(adv.trackers) || adv.trackers.length === 0) {
        adv.trackers = [{ id: 1, markedHP: adv.markedHP || 0, markedStress: adv.markedStress || 0 }];
      }
      if (adv.type === 'Minion') {
        totalFigures += (adv.trackers.length * currentPartySize);
      } else {
        totalFigures += (adv.type === 'Environment' || adv.isEnvironment || adv.isColossusFramework) ? 1 : adv.trackers.length;
      }
    });

    if (badge) {
      const cardCount = this.state.roster.length;
      badge.textContent = `${totalFigures} Combatant${totalFigures === 1 ? '' : 's'} (${cardCount} Stat Block${cardCount === 1 ? '' : 's'})`;
    }

    if (this.state.roster.length === 0) {
      if (emptyState) emptyState.classList.remove('d-none');
      container.innerHTML = '';
      return;
    }

    if (emptyState) emptyState.classList.add('d-none');

    // Build top-level blocks for rendering and drag-and-drop reordering
    const blocks = [];
    const processedGroups = new Set();

    for (let index = 0; index < this.state.roster.length; index++) {
      const adv = this.state.roster[index];
      const groupId = adv.colossusGroupId;

      if (groupId) {
        if (processedGroups.has(groupId)) continue;
        processedGroups.add(groupId);

        const groupMembers = [];
        this.state.roster.forEach((item, itemIdx) => {
          if (item.colossusGroupId === groupId) {
            groupMembers.push({ item, itemIdx });
          }
        });
        blocks.push({
          type: 'colossus',
          groupId,
          groupMembers
        });
      } else {
        blocks.push({
          type: 'standalone',
          adv,
          index
        });
      }
    }

    let rosterHTML = '';

    blocks.forEach((block, blockIdx) => {
      if (block.type === 'colossus') {
        const groupId = block.groupId;
        const groupMembers = block.groupMembers;
        const frameworkMember = groupMembers.find(m => m.item.isColossusFramework) || groupMembers[0];
        const framework = frameworkMember.item;
        const segmentMembers = groupMembers.filter(m => m !== frameworkMember);

        // Check Colossus defeat condition
        let isColossusDefeated = false;
        let anyFatalDefeated = false;
        let allSegmentsDefeated = (segmentMembers.length > 0);

        segmentMembers.forEach(m => {
          const isSegFatal = m.item.features && m.item.features.some(f => f.name.toLowerCase().includes('fatal'));
          const isSegDefeated = m.item.trackers.every(t => t.markedHP >= (m.item.hp || 1));
          if (isSegFatal && isSegDefeated) anyFatalDefeated = true;
          if (!isSegDefeated) allSegmentsDefeated = false;
        });

        if (anyFatalDefeated || allSegmentsDefeated) {
          isColossusDefeated = true;
        }

        const isAllCollapsed = groupMembers.every(m => Boolean(m.item.isCollapsed));
        const totalGroupUnits = groupMembers.reduce((acc, m) => acc + (m.item.trackers?.length || 1), 0);

        // Render Colossus Enclosure as Draggable Block
        rosterHTML += `
          <div class="col-12 mb-4 colossus-enclosure-wrapper roster-draggable-block" data-block-idx="${blockIdx}" data-block-type="colossus" data-group-id="${groupId}" draggable="true">
            <div class="colossus-enclosure ${isColossusDefeated ? 'is-colossus-defeated' : ''}" id="colossus-group-${groupId}">
              
              <!-- Colossus Enclosure Header Banner -->
              <div class="colossus-enclosure-header d-flex align-items-center justify-content-between p-3 flex-wrap gap-2">
                <div class="d-flex align-items-center gap-3">
                  <span class="colossus-group-drag-handle text-gold" title="Drag to rearrange entire Colossus" draggable="false">⠿</span>
                  <div class="colossus-crest-box">Ω</div>
                  <div>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <h4 class="m-0 fw-bold text-gold">${framework.name}</h4>
                      <span class="badge bg-danger text-light fw-bold">TITANIC COLOSSUS</span>
                      ${framework.size ? `<span class="badge bg-dark border border-warning text-warning">Size: ${framework.size}</span>` : ''}
                      ${isColossusDefeated ? '<span class="badge bg-danger border border-light">COLOSSUS SLAIN</span>' : '<span class="badge bg-success bg-opacity-25 text-success border border-success">ACTIVE TITAN</span>'}
                    </div>
                    <div class="small text-muted mt-1">
                      Composite Colossus &bull; ${segmentMembers.length} Linked Segments (${totalGroupUnits} Total Combat Units)
                    </div>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-2">
                  <button class="btn btn-xs btn-outline-secondary" data-action="toggle-colossus-collapse" data-group-id="${groupId}" title="Collapse/Expand all cards in this Colossus">
                    ${isAllCollapsed ? '▼ Expand All' : '▲ Collapse All'}
                  </button>
                  <button class="btn btn-xs btn-outline-danger" data-action="remove-colossus-group" data-group-id="${groupId}" title="Remove Entire Colossus and all segments">
                    🗑️ Remove Colossus
                  </button>
                </div>
              </div>

              <!-- Colossus Cards Sub-Grid with Draggable Segments -->
              <div class="p-3 colossus-enclosure-body">
                <div class="row g-3">
                  <div class="col-12 col-lg-6 col-xxl-4 colossus-draggable-segment" data-seg-idx="0" data-roster-idx="${frameworkMember.itemIdx}" data-group-id="${groupId}" draggable="true">
                    ${this.renderRosterCard(framework, frameworkMember.itemIdx, isColossusDefeated)}
                  </div>
                  ${segmentMembers.map((m, sIdx) => `
                    <div class="col-12 col-lg-6 col-xxl-4 colossus-draggable-segment" data-seg-idx="${sIdx + 1}" data-roster-idx="${m.itemIdx}" data-group-id="${groupId}" draggable="true">
                      ${this.renderRosterCard(m.item, m.itemIdx, isColossusDefeated)}
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>
          </div>
        `;
      } else {
        // Standard standalone draggable card block
        rosterHTML += `
          <div class="col-12 col-lg-6 col-xxl-4 roster-draggable-block" data-block-idx="${blockIdx}" data-block-type="standalone" data-roster-idx="${block.index}" draggable="true">
            ${this.renderRosterCard(block.adv, block.index, false)}
          </div>
        `;
      }
    });

    container.innerHTML = rosterHTML;
    this.bindRosterCardEvents();
  },

  renderRosterCard(adv, index, isColossusGroupDefeated = false) {
    if (!adv.trackers || !Array.isArray(adv.trackers) || adv.trackers.length === 0) {
      adv.trackers = [{ id: 1, markedHP: adv.markedHP || 0, markedStress: adv.markedStress || 0 }];
    }

    const isEnv = adv.type === 'Environment' || adv.isEnvironment;
    const isFramework = Boolean(adv.isColossusFramework);
    const isSegment = Boolean(adv.isColossusSegment);
    const isMinion = (adv.type === 'Minion');
    const isCollapsed = Boolean(adv.isCollapsed);
    const unitCount = adv.trackers.length;
    const partySize = Math.max(1, this.state.party?.count || 4);
    const hpSlots = isMinion ? partySize : (adv.hp || 1);
    const stressSlots = isMinion ? (adv.stress ? partySize * (adv.stress || 1) : partySize) : (adv.stress || 0);
    const tokenSrc = adv.tokenImg || TokenRenderer.generate(adv.name, isFramework ? 'Colossus' : adv.type, adv.tier);

    // Single adversary defeated logic: whole card gets stamp
    const isSingleDefeated = (!isEnv && !isFramework && unitCount === 1 && adv.trackers[0].markedHP >= hpSlots) || (isFramework && isColossusGroupDefeated);
    const isSingleVulnerable = (!isEnv && unitCount === 1 && adv.trackers[0].markedStress >= stressSlots && stressSlots > 0);

    // Features with interactive Cost Trigger Buttons (Icon-only, inline)
    let featuresHTML = '';
    if (adv.features && adv.features.length > 0) {
      featuresHTML = adv.features.map(f => {
        const cost = f.cost || 'None';
        const featType = f.type || 'Action';
        let costBtnHTML = '';

        if (cost === 'Fear') {
          costBtnHTML = `<button type="button" class="btn btn-xs btn-outline-warning py-0 px-1 btn-feat-cost-trigger me-1 align-baseline" data-action="spend-fear-cost" data-idx="${index}" data-feat-name="${(f.name || 'Move').replace(/"/g, '&quot;')}" title="Spend 1 GM Fear for ${f.name}">💀</button>`;
        } else if (cost === 'Stress') {
          costBtnHTML = `<button type="button" class="btn btn-xs btn-outline-danger py-0 px-1 btn-feat-cost-trigger me-1 align-baseline" data-action="mark-stress-cost" data-idx="${index}" data-unit="0" data-feat-name="${(f.name || 'Move').replace(/"/g, '&quot;')}" title="Mark 1 Stress for ${f.name}">⚡</button>`;
        } else if (cost === 'Hope') {
          costBtnHTML = `<span class="badge bg-info text-dark border border-info me-1 align-baseline" style="font-size: 0.65rem;" title="Costs Hope">✨ Hope</span>`;
        }

        return `
          <div class="feature-item mb-1">
            <span class="feature-type-tag feature-type-${featType.toLowerCase()} me-1">${featType}</span>${costBtnHTML}<strong>${f.name}:</strong> <span>${f.text}</span>
          </div>
        `;
      }).join('');
    }

    // Experiences
    let expHTML = '';
    if (adv.experiences && adv.experiences.length > 0) {
      expHTML = adv.experiences.map(e => `<span class="badge bg-secondary me-1 mb-1">${e}</span>`).join('');
    }

    // Environment Stat Block
    if (isEnv) {
      return `
        <div class="card og-statblock shadow-sm border-gold ${isCollapsed ? 'is-card-collapsed' : ''}" id="roster-card-${index}">
          <!-- Environment Card Header -->
          <div class="p-3 ${isCollapsed ? '' : 'border-bottom border-subtle'} d-flex align-items-start gap-2 adv-card-header" data-idx="${index}" title="${isCollapsed ? 'Click to Expand Environment' : 'Click to Collapse Environment'}">
            <span class="roster-drag-handle text-muted align-self-center" title="Drag to rearrange adversary" draggable="false">⠿</span>
            <div class="adv-token-container" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
              <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
            </div>
            <div class="flex-grow-1 position-relative" style="min-width: 0;">
              <div class="d-flex justify-content-between align-items-center gap-2">
                <h5 class="adv-name m-0 text-truncate text-gold">${adv.name}</h5>

                <div class="d-flex align-items-center gap-1 flex-shrink-0">
                  <button class="btn btn-xs btn-outline-secondary" data-action="duplicate-adv" data-idx="${index}" title="Duplicate Environment">
                    📋
                  </button>
                  <button class="btn btn-xs btn-outline-danger" data-action="remove-adv" data-idx="${index}" title="Remove Environment from Scene">
                    ✕
                  </button>

                  <div class="dropdown adv-options-dropdown position-relative">
                    <button class="btn btn-xs btn-outline-secondary btn-options-toggle" type="button" data-idx="${index}" title="Environment Options">
                      ⚙️
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg" id="dropdown-menu-${index}">
                      <li>
                        <a class="dropdown-item" href="#" data-action="toggle-card-collapse" data-idx="${index}">
                          <span>${isCollapsed ? '🔽' : '🔼'}</span> ${isCollapsed ? 'Expand Card' : 'Collapse Card'}
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" data-action="duplicate-adv" data-idx="${index}">
                          <span>📋</span> Duplicate Environment
                        </a>
                      </li>
                      <li><hr class="dropdown-divider border-secondary my-1"></li>
                      <li>
                        <a class="dropdown-item text-danger" href="#" data-action="remove-adv" data-idx="${index}">
                          <span>🗑️</span> Remove From Scene
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="d-flex gap-1 align-items-center mt-1 flex-wrap">
                <span class="badge-tier">Tier ${adv.tier}</span>
                <span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50">Environment (${adv.subtype || 'Exploration'})</span>
                <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;">0 BP (Scene)</span>
                ${adv.book ? `<span class="badge ${adv.book === 'Hope & Fear' ? 'bg-warning text-dark' : (adv.book === 'Pistolheart' ? 'badge-source-pistolheart' : 'bg-secondary')}" style="font-size: 0.65rem;">${adv.book}</span>` : ''}
              </div>

              ${adv.summary || adv.motive ? `<div class="adv-motive mt-1 text-truncate" style="font-size: 0.75rem;">${adv.summary || adv.motive}</div>` : ''}
            </div>
          </div>

          <div class="adv-card-body p-3 ${isCollapsed ? 'd-none' : ''}">
            <div class="d-flex justify-content-between align-items-center mb-2 p-2 rounded bg-dark border border-subtle">
              <span class="small text-secondary">Difficulty Rating:</span>
              <span class="fw-bold text-gold fs-6">${adv.diff}</span>
            </div>

            ${adv.impulses ? `
              <div class="p-2 mb-2 rounded bg-dark border border-subtle small">
                <strong class="text-gold">Impulses:</strong> <span>${adv.impulses}</span>
              </div>
            ` : ''}

            ${adv.suggestedAdversaries ? `
              <div class="p-2 mb-2 rounded bg-dark border border-subtle small text-muted">
                <strong class="text-light">Suggested Adversaries:</strong> <span>${adv.suggestedAdversaries}</span>
              </div>
            ` : ''}

            ${featuresHTML ? `<div class="mt-2 border-top border-subtle pt-2">${featuresHTML}</div>` : ''}
          </div>
        </div>
      `;
    }

    // Colossus Framework Card (Establishes Major/Severe thresholds & composite BP; difficulty lies on segments)
    if (isFramework) {
      let stressPipsHTML = '';
      const trk = adv.trackers[0];
      for (let i = 0; i < (adv.stress || 6); i++) {
        const isMarked = i < trk.markedStress;
        stressPipsHTML += `<button type="button" class="stress-pip ${isMarked ? 'marked' : ''}" data-action="toggle-stress" data-idx="${index}" data-unit="0" data-pip="${i}" title="Toggle Stress"></button>`;
      }

      // Compute Total Composite BP for this Colossus Group
      let compositeBP = 2.0;
      if (adv.colossusGroupId) {
        this.state.roster.forEach(r => {
          if (r.colossusGroupId === adv.colossusGroupId && r !== adv) {
            const uCount = r.trackers?.length || r.quantity || 1;
            const isF = r.features && r.features.some(f => f.name.toLowerCase().includes('fatal'));
            compositeBP += (uCount * (isF ? 2.0 : 1.0));
          }
        });
      } else if (adv.segments && Array.isArray(adv.segments)) {
        adv.segments.forEach(s => {
          const uCount = s.quantity || 1;
          const isF = s.isFatal || (s.features && s.features.some(f => f.name.toLowerCase().includes('fatal')));
          compositeBP += (uCount * (isF ? 2.0 : 1.0));
        });
      }

      return `
        <div class="card og-statblock border-colossus-framework shadow-sm ${isSingleDefeated ? 'is-defeated' : ''} ${isCollapsed ? 'is-card-collapsed' : ''}" id="roster-card-${index}">
          <!-- Framework Header -->
          <div class="p-3 ${isCollapsed ? '' : 'border-bottom border-subtle'} d-flex align-items-start gap-2 adv-card-header" data-idx="${index}" title="${isCollapsed ? 'Click to Expand Framework' : 'Click to Collapse Framework'}">
            <span class="roster-drag-handle text-gold align-self-center" title="Drag to rearrange framework" draggable="false">⠿</span>
            <div class="adv-token-container" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
              <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
            </div>
            <div class="flex-grow-1 position-relative" style="min-width: 0;">
              <div class="d-flex justify-content-between align-items-center gap-2">
                <h5 class="adv-name m-0 text-truncate text-gold">${adv.name}</h5>

                <div class="d-flex align-items-center gap-1 flex-shrink-0">
                  <button class="btn btn-xs btn-outline-danger" data-action="remove-adv" data-idx="${index}" title="Remove Framework">
                    ✕
                  </button>
                </div>
              </div>

              <div class="d-flex gap-1 align-items-center mt-1 flex-wrap">
                <span class="badge-tier">Tier ${adv.tier}</span>
                <span class="badge bg-warning text-dark fw-bold">👑 FRAMEWORK</span>
                ${adv.size ? `<span class="badge bg-dark border border-warning text-warning" style="font-size: 0.65rem;">Size: ${adv.size}</span>` : ''}
                <span class="badge bg-dark border border-gold text-gold fw-bold" style="font-size: 0.65rem;">${compositeBP} BP (Composite)</span>
                ${adv.book ? `<span class="badge bg-secondary" style="font-size: 0.65rem;">${adv.book}</span>` : ''}
              </div>

              ${adv.motive ? `<div class="adv-motive mt-1 text-truncate" style="font-size: 0.75rem;">${adv.motive}</div>` : ''}
            </div>
          </div>

          <!-- Framework Body -->
          <div class="adv-card-body p-3 ${isCollapsed ? 'd-none' : ''}">
            <!-- Defensive Thresholds (No Difficulty pill) -->
            <div class="row g-2 mb-3">
              <div class="col-4">
                <div class="stat-pill">
                  <span class="stat-pill-label">Major Thresh</span>
                  <span class="stat-pill-val">${adv.major}</span>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-pill">
                  <span class="stat-pill-label">Severe Thresh</span>
                  <span class="stat-pill-val">${adv.severe}</span>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-pill">
                  <span class="stat-pill-label">Composite BP</span>
                  <span class="stat-pill-val text-gold">${compositeBP} BP</span>
                </div>
              </div>
            </div>

            <!-- Stress Tracker Box -->
            <div class="trackers-box mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <span class="small fw-bold text-uppercase text-warning d-flex align-items-center gap-1">
                  <span>&#9670;</span> Stress (${trk.markedStress} / ${adv.stress || 6})
                </span>
                <div class="pip-row">${stressPipsHTML}</div>
              </div>
            </div>

            <!-- Features -->
            ${featuresHTML ? `<div class="mb-3">${featuresHTML}</div>` : ''}

            <!-- Experiences -->
            ${expHTML ? `
              <div class="mt-2 pt-2 border-top border-subtle">
                <div class="small text-muted mb-1 fw-bold text-uppercase" style="font-size: 0.7rem;">Experiences:</div>
                <div class="d-flex flex-wrap">${expHTML}</div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    // Standard Adversary, Minion Squad, or Colossus Segment Card
    const isFatal = adv.features && adv.features.some(f => f.name.toLowerCase().includes('fatal'));
    let trackersHTML = '';

    if (unitCount === 1) {
      const trk = adv.trackers[0];
      let hpPipsHTML = '';
      for (let i = 0; i < hpSlots; i++) {
        const isMarked = i < trk.markedHP;
        if (isMinion && i > 0) {
          hpPipsHTML += `<span class="minion-pip-divider"></span>`;
        }
        hpPipsHTML += `<button type="button" class="hp-pip ${isMarked ? 'marked' : ''}" data-action="toggle-hp" data-idx="${index}" data-unit="0" data-pip="${i}" title="${isMinion ? `Toggle Minion #${i + 1} HP (Defeated)` : 'Toggle HP'}"></button>`;
      }

      let stressPipsHTML = '';
      for (let i = 0; i < stressSlots; i++) {
        const isMarked = i < trk.markedStress;
        if (isMinion && i > 0) {
          stressPipsHTML += `<span class="minion-pip-divider"></span>`;
        }
        stressPipsHTML += `<button type="button" class="stress-pip ${isMarked ? 'marked' : ''}" data-action="toggle-stress" data-idx="${index}" data-unit="0" data-pip="${i}" title="${isMinion ? `Toggle Minion #${i + 1} Stress` : 'Toggle Stress'}"></button>`;
      }

      trackersHTML = `
        <div class="trackers-box mb-2">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="small fw-bold text-uppercase text-danger d-flex align-items-center gap-1">
              <span>&#9829;</span> ${isMinion ? `Minions (${trk.markedHP} / ${partySize})` : `HP (${trk.markedHP} / ${adv.hp})`}
            </span>
            <div class="pip-row">${hpPipsHTML}</div>
          </div>

          ${stressSlots > 0 ? `
            <div class="d-flex justify-content-between align-items-center">
              <span class="small fw-bold text-uppercase text-warning d-flex align-items-center gap-1">
                <span>&#9670;</span> ${isMinion ? `Stress (${trk.markedStress} / ${stressSlots})` : `Stress (${trk.markedStress} / ${adv.stress})`}
              </span>
              <div class="pip-row">${stressPipsHTML}</div>
            </div>
          ` : ''}
        </div>

        <div class="p-2 mb-3 rounded bg-dark border border-subtle">
          <div class="d-flex align-items-center justify-content-between gap-2">
            <span class="small fw-bold text-muted text-uppercase" style="font-size: 0.7rem;">Resolve Damage:</span>
            <div class="input-group input-group-sm" style="max-width: 170px;">
              <input type="number" class="form-control text-center fw-bold dmg-input-${index}-0" placeholder="Dmg" min="1">
              <button class="btn btn-outline-danger btn-xs" data-action="apply-damage" data-idx="${index}" data-unit="0">Apply</button>
            </div>
          </div>
        </div>
      `;
    } else {
      // Multi-Unit Trackers
      const unitCardsHTML = adv.trackers.map((trk, uIdx) => {
        const isUnitDefeated = trk.markedHP >= hpSlots;
        const isUnitVulnerable = trk.markedStress >= stressSlots && stressSlots > 0;

        let hpPipsHTML = '';
        for (let i = 0; i < hpSlots; i++) {
          const isMarked = i < trk.markedHP;
          if (isMinion && i > 0) {
            hpPipsHTML += `<span class="minion-pip-divider"></span>`;
          }
          hpPipsHTML += `<button type="button" class="hp-pip ${isMarked ? 'marked' : ''}" data-action="toggle-hp" data-idx="${index}" data-unit="${uIdx}" data-pip="${i}" title="${isMinion ? `Toggle Unit #${uIdx + 1} Minion #${i + 1} HP (Defeated)` : `Toggle Unit #${uIdx + 1} HP`}"></button>`;
        }

        let stressPipsHTML = '';
        for (let i = 0; i < stressSlots; i++) {
          const isMarked = i < trk.markedStress;
          if (isMinion && i > 0) {
            stressPipsHTML += `<span class="minion-pip-divider"></span>`;
          }
          stressPipsHTML += `<button type="button" class="stress-pip ${isMarked ? 'marked' : ''}" data-action="toggle-stress" data-idx="${index}" data-unit="${uIdx}" data-pip="${i}" title="${isMinion ? `Toggle Unit #${uIdx + 1} Minion #${i + 1} Stress` : `Toggle Unit #${uIdx + 1} Stress`}"></button>`;
        }

        return `
          <div class="adv-unit-card ${isUnitDefeated ? 'is-unit-defeated' : ''}" id="unit-card-${index}-${uIdx}">
            <div class="d-flex justify-content-between align-items-center mb-1 pb-1 border-bottom border-subtle">
              <div class="d-flex align-items-center gap-2">
                <span class="unit-header-badge text-gold fw-bold">${isMinion ? `Minion Squad #${uIdx + 1} (${partySize} Minions)` : `${adv.name.replace(/^(Ikeri|Colossus)\s+/i, '')} #${uIdx + 1}`}</span>
                ${isUnitVulnerable ? '<span class="badge badge-vulnerable py-0" style="font-size: 0.65rem;">VULNERABLE</span>' : ''}
                ${isUnitDefeated ? '<span class="badge bg-danger py-0" style="font-size: 0.65rem;">DEFEATED</span>' : ''}
              </div>
              ${!isSegment ? `
                <button class="btn btn-xs btn-outline-danger py-0 px-1" data-action="remove-unit" data-idx="${index}" data-unit="${uIdx}" title="Delete Unit #${uIdx + 1}" style="font-size: 0.7rem; line-height: 1.1;">
                  ✕
                </button>
              ` : ''}
            </div>

            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="small fw-bold text-danger" style="font-size: 0.75rem;">
                <span>&#9829;</span> ${isMinion ? `Minions (${trk.markedHP}/${partySize})` : `HP (${trk.markedHP}/${adv.hp})`}
              </span>
              <div class="pip-row">${hpPipsHTML}</div>
            </div>

            ${stressSlots > 0 ? `
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="small fw-bold text-warning" style="font-size: 0.75rem;">
                  <span>&#9670;</span> ${isMinion ? `Stress (${trk.markedStress}/${stressSlots})` : `Stress (${trk.markedStress}/${adv.stress})`}
                </span>
                <div class="pip-row">${stressPipsHTML}</div>
              </div>
            ` : ''}

            <div class="d-flex align-items-center justify-content-between gap-2 pt-1 border-top border-subtle">
              <span class="small text-muted" style="font-size: 0.68rem;">Resolve Dmg:</span>
              <div class="input-group input-group-sm" style="max-width: 140px;">
                <input type="number" class="form-control form-control-sm text-center fw-bold dmg-input-${index}-${uIdx}" placeholder="Dmg" min="1" style="height: 24px; font-size: 0.75rem; padding: 2px 4px;">
                <button class="btn btn-outline-danger btn-xs py-0 px-2" data-action="apply-damage" data-idx="${index}" data-unit="${uIdx}" style="height: 24px; font-size: 0.72rem;">Apply</button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      trackersHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="small fw-bold text-gold text-uppercase" style="letter-spacing: 0.05em; font-size: 0.75rem;">
            ${isMinion ? `Minion Squads Tracked (${unitCount} Squad${unitCount === 1 ? '' : 's'} &bull; ${unitCount * partySize} Total Minions)` : `Units Tracked (${unitCount})`}
          </span>
          ${!isSegment ? `
            <button class="btn btn-xs btn-outline-gold py-0 px-2" data-action="add-unit" data-idx="${index}" title="Add another unit to this adversary" style="font-size: 0.72rem;">
              + Add Unit
            </button>
          ` : ''}
        </div>

        <div class="adv-units-container mb-3">
          ${unitCardsHTML}
        </div>
      `;
    }

    const bpPerUnit = isMinion ? 1.0 : (DH_BENCHMARKS.BP_COSTS[adv.type] !== undefined ? DH_BENCHMARKS.BP_COSTS[adv.type] : 2);
    const totalBP = bpPerUnit * unitCount;

    return `
      <div class="card og-statblock ${isSegment ? 'colossus-segment-card' : ''} shadow-sm ${isSingleDefeated ? 'is-defeated' : ''} ${isCollapsed ? 'is-card-collapsed' : ''}" id="roster-card-${index}">
        <!-- Card Header -->
        <div class="p-3 ${isCollapsed ? '' : 'border-bottom border-subtle'} d-flex align-items-start gap-2 adv-card-header" data-idx="${index}" title="${isCollapsed ? 'Click to Expand Stat Block' : 'Click to Collapse Stat Block'}">
          <span class="roster-drag-handle text-muted align-self-center" title="Drag to rearrange adversary" draggable="false">⠿</span>
          <div class="adv-token-container" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
            <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
          </div>
          <div class="flex-grow-1 position-relative" style="min-width: 0;">
            <div class="d-flex justify-content-between align-items-center gap-2">
              <h5 class="adv-name m-0 text-truncate">${adv.name}</h5>

              <!-- Quick Header Action Buttons & Unclipped Options Menu -->
              <div class="d-flex align-items-center gap-1 flex-shrink-0">
                ${!isSegment ? `
                  <button class="btn btn-xs btn-outline-gold" data-action="add-unit" data-idx="${index}" title="Add Unit (Adds another HP & Stress tracker)">
                    + Unit
                  </button>
                ` : ''}
                <button class="btn btn-xs btn-outline-danger" data-action="remove-adv" data-idx="${index}" title="Remove from Encounter">
                  ✕
                </button>

                <!-- Interactive Options Dropdown -->
                <div class="dropdown adv-options-dropdown position-relative">
                  <button class="btn btn-xs btn-outline-secondary btn-options-toggle" type="button" data-idx="${index}" title="Adversary Options">
                    ⚙️
                  </button>
                  <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg" id="dropdown-menu-${index}">
                    <li>
                      <a class="dropdown-item" href="#" data-action="toggle-card-collapse" data-idx="${index}">
                        <span>${isCollapsed ? '🔽' : '🔼'}</span> ${isCollapsed ? 'Expand Card' : 'Collapse Card'}
                      </a>
                    </li>
                    ${!isSegment ? `
                      <li>
                        <a class="dropdown-item" href="#" data-action="add-unit" data-idx="${index}">
                          <span>👥</span> + Add Unit (${isMinion ? `${partySize} Minions` : 'HP/Stress Block'})
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" data-action="duplicate-adv" data-idx="${index}">
                          <span>📋</span> Duplicate Entire Stat Block
                        </a>
                      </li>
                    ` : ''}
                    <li>
                      <a class="dropdown-item" href="#" data-action="reset-trackers" data-idx="${index}">
                        <span>↺</span> Clear All HP & Stress
                      </a>
                    </li>
                    <li><hr class="dropdown-divider border-secondary my-1"></li>
                    <li>
                      <a class="dropdown-item text-danger" href="#" data-action="remove-adv" data-idx="${index}">
                        <span>🗑️</span> Remove From Battle
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="d-flex gap-1 align-items-center mt-1 flex-wrap">
              <span class="badge-tier">Tier ${adv.tier}</span>
              ${isSegment ? `<span class="badge bg-secondary text-light fw-bold" style="font-size: 0.65rem;">🔗 SEGMENT</span>` : (isMinion ? `<span class="badge-role">Minion (${unitCount * partySize} Figures)</span>` : `<span class="badge-role">${adv.type}</span>`)}
              ${isFatal ? `<span class="badge bg-danger text-light fw-bold" style="font-size: 0.65rem;">⚡ FATAL</span>` : ''}
              ${!isSegment ? `<span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;" title="Battle Points">${totalBP} BP</span>` : ''}
              ${unitCount > 1 ? `<span class="badge bg-secondary border border-secondary" style="font-size: 0.65rem;">${unitCount} Units${isMinion ? ` (${partySize}/unit)` : ''}</span>` : (isMinion ? `<span class="badge bg-secondary border border-secondary" style="font-size: 0.65rem;">1 Unit (${partySize} Minions)</span>` : '')}
              ${adv.book ? `<span class="badge ${adv.book === 'Hope & Fear' ? 'bg-warning text-dark' : (adv.book === 'Pistolheart' ? 'badge-source-pistolheart' : 'bg-secondary')}" style="font-size: 0.65rem;">${adv.book}</span>` : ''}
              ${isSingleVulnerable ? '<span class="badge badge-vulnerable">VULNERABLE</span>' : ''}
            </div>

            ${adv.motive ? `<div class="adv-motive mt-1 text-truncate" style="font-size: 0.75rem;">${adv.motive}</div>` : ''}
            ${adv.adjacentSegments && adv.adjacentSegments.length ? `
              <div class="mt-1 d-flex align-items-center gap-1 flex-wrap" style="font-size: 0.72rem;">
                <span class="text-gold fw-bold">Adjacent:</span>
                ${adv.adjacentSegments.map(segName => `<span class="badge bg-dark border border-secondary text-secondary" style="font-size: 0.65rem;">${segName}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <div class="adv-card-body p-3 ${isCollapsed ? 'd-none' : ''}">
          <!-- Defensive Stats Grid (Segments display Difficulty and HP per Unit; non-segments show standard 4 pills) -->
          ${isSegment ? `
            <div class="row g-2 mb-3">
              <div class="${adv.stress > 0 ? 'col-4' : 'col-6'}">
                <div class="stat-pill">
                  <span class="stat-pill-label">Difficulty</span>
                  <span class="stat-pill-val text-gold">${adv.diff}</span>
                </div>
              </div>
              <div class="${adv.stress > 0 ? 'col-4' : 'col-6'}">
                <div class="stat-pill">
                  <span class="stat-pill-label">HP per Unit</span>
                  <span class="stat-pill-val text-danger">${adv.hp} HP</span>
                </div>
              </div>
              ${adv.stress > 0 ? `
                <div class="col-4">
                  <div class="stat-pill">
                    <span class="stat-pill-label">Stress</span>
                    <span class="stat-pill-val text-warning">${adv.stress}</span>
                  </div>
                </div>
              ` : ''}
            </div>
          ` : `
            <div class="row g-2 mb-3">
              <div class="col-3">
                <div class="stat-pill">
                  <span class="stat-pill-label">Difficulty</span>
                  <span class="stat-pill-val text-gold">${adv.diff}</span>
                </div>
              </div>
              <div class="col-3">
                <div class="stat-pill">
                  <span class="stat-pill-label">${isMinion ? 'Party Size' : 'Major Thresh'}</span>
                  <span class="stat-pill-val">${isMinion ? `${partySize} PCs` : adv.major}</span>
                </div>
              </div>
              <div class="col-3">
                <div class="stat-pill">
                  <span class="stat-pill-label">${isMinion ? 'Squad Size' : 'Severe Thresh'}</span>
                  <span class="stat-pill-val">${isMinion ? `${partySize} / Unit` : adv.severe}</span>
                </div>
              </div>
              <div class="col-3">
                <div class="stat-pill">
                  <span class="stat-pill-label">${isMinion ? 'Overkill' : 'BP Cost'}</span>
                  <span class="stat-pill-val">${isMinion ? (adv.minionRule || 6) : (DH_BENCHMARKS.BP_COSTS[adv.type] || 1)}</span>
                </div>
              </div>
            </div>
          `}

          <!-- Trackers Section -->
          ${trackersHTML}

          <!-- Primary Attack Section -->
          ${adv.attack && adv.attack.type !== 'None' && (adv.attack.damage || '').trim() && (adv.attack.damage || '').trim() !== '—' && (adv.attack.damage || '').trim().toLowerCase() !== 'none' ? `
            <div class="attack-banner d-flex justify-content-between align-items-center mb-3">
              <div class="overflow-hidden" style="min-width: 0;">
                <span class="fw-bold text-light">${adv.attack.name || 'Basic Attack'}</span>
                <div class="small text-muted text-truncate">
                  ${(adv.attack.bonus !== undefined ? adv.attack.bonus : 0) >= 0 ? `+${adv.attack.bonus !== undefined ? adv.attack.bonus : 0}` : adv.attack.bonus} to hit &bull; ${adv.attack.range || 'Melee'} &bull; ${adv.attack.damage} ${adv.attack.type || 'Physical'}
                </div>
              </div>
              <div class="d-flex gap-1 flex-shrink-0">
                <button class="btn btn-xs btn-outline-info" data-action="roll-atk" data-idx="${index}" title="Roll ${adv.name} Attack (${(adv.attack.bonus !== undefined ? adv.attack.bonus : 0) >= 0 ? `+${adv.attack.bonus !== undefined ? adv.attack.bonus : 0}` : adv.attack.bonus})">
                  <span>🎲</span> Atk
                </button>
                <button class="btn btn-xs btn-outline-warning" data-action="roll-dmg" data-idx="${index}" title="Roll ${adv.name} Damage (${adv.attack.damage})">
                  <span>💥</span> Dmg
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Motive & Tactics -->
          ${adv.motive ? `
            <div class="p-2 mb-3 rounded bg-dark border border-subtle small">
              <strong class="text-gold">Motive / Tactics:</strong>
              <span class="text-secondary">${adv.motive}</span>
            </div>
          ` : ''}

          <!-- Features / Special Moves -->
          ${featuresHTML ? `<div class="mb-3">${featuresHTML}</div>` : ''}

          <!-- Experiences -->
          ${expHTML ? `
            <div class="mt-2 pt-2 border-top border-subtle">
              <div class="small text-muted mb-1 fw-bold text-uppercase" style="font-size: 0.7rem;">Experiences:</div>
              <div class="d-flex flex-wrap">${expHTML}</div>
            </div>
          ` : ''}

        </div>
      </div>
    `;
  },

  bindRosterCardEvents() {
    const container = document.getElementById('active-adversary-roster');
    if (!container) return;

    // Card header click to toggle collapse (ignoring interactive elements like buttons/dropdowns/inputs)
    container.querySelectorAll('.adv-card-header').forEach(header => {
      header.addEventListener('click', (e) => {
        if (e.target.closest('button, a, input, select, .dropdown, .dropdown-menu')) return;
        const idx = parseInt(header.getAttribute('data-idx'), 10);
        if (!isNaN(idx)) {
          this.handleRosterAction('toggle-card-collapse', idx);
        }
      });
    });

    // Direct Options Dropdown Toggle handler (ensures 100% reliable opening)
    container.querySelectorAll('.btn-options-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = btn.getAttribute('data-idx');
        const menu = document.getElementById(`dropdown-menu-${idx}`);
        
        // Close all other open dropdowns
        document.querySelectorAll('.adv-options-dropdown .dropdown-menu.show').forEach(m => {
          if (m !== menu) m.classList.remove('show');
        });

        if (menu) menu.classList.toggle('show');
      });
    });

    // Action clicks
    container.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // If clicking a dropdown item, close the menu
        const dropdown = btn.closest('.dropdown-menu');
        if (dropdown) dropdown.classList.remove('show');

        const action = btn.getAttribute('data-action');
        const idxStr = btn.getAttribute('data-idx');
        const idx = idxStr !== null ? parseInt(idxStr, 10) : null;
        const groupId = btn.getAttribute('data-group-id');
        const pip = btn.getAttribute('data-pip') !== null ? parseInt(btn.getAttribute('data-pip'), 10) : null;
        const unitIdx = btn.getAttribute('data-unit') !== null ? parseInt(btn.getAttribute('data-unit'), 10) : 0;
        const featName = btn.getAttribute('data-feat-name');
        this.handleRosterAction(action, idx, pip, unitIdx, groupId, featName);
      });
    });

    // Enter key support in damage resolution inputs
    container.querySelectorAll('input[class*="dmg-input-"]').forEach(inp => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const applyBtn = inp.parentElement?.querySelector('[data-action="apply-damage"]');
          if (applyBtn) applyBtn.click();
        }
      });
    });

    // Initialize Drag and Drop Rearrangement
    this.bindRosterDragAndDropEvents();
  },

  bindRosterDragAndDropEvents() {
    const container = document.getElementById('active-adversary-roster');
    if (!container) return;

    let dragSource = null; // { type: 'block' | 'segment', blockIdx, segIdx, groupId, rosterIdx, el }

    // 1. Top-Level Block Dragging (Standalone cards or Colossus Enclosures)
    const blockEls = container.querySelectorAll('.roster-draggable-block');
    blockEls.forEach(el => {
      el.addEventListener('dragstart', (e) => {
        // Prevent drag when interacting with buttons, inputs, pips, dropdowns, etc.
        if (e.target.closest('button, input, select, textarea, .dropdown-menu, .stress-pip, .hp-pip, .btn-feat-cost-trigger, .colossus-draggable-segment')) {
          return;
        }

        const blockIdx = parseInt(el.getAttribute('data-block-idx'), 10);
        const blockType = el.getAttribute('data-block-type');
        const groupId = el.getAttribute('data-group-id');
        const rosterIdx = el.getAttribute('data-roster-idx') ? parseInt(el.getAttribute('data-roster-idx'), 10) : null;

        dragSource = {
          type: 'block',
          blockIdx,
          blockType,
          groupId,
          rosterIdx,
          el
        };

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'block', blockIdx }));
        setTimeout(() => el.classList.add('is-dragging'), 0);
      });

      el.addEventListener('dragover', (e) => {
        if (!dragSource || dragSource.type !== 'block') return;
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';

        const rect = el.getBoundingClientRect();
        const isAfter = (e.clientX - rect.left) > (rect.width / 2);

        blockEls.forEach(b => b.classList.remove('drop-target-before', 'drop-target-after'));
        if (dragSource.el !== el) {
          el.classList.add(isAfter ? 'drop-target-after' : 'drop-target-before');
        }
      });

      el.addEventListener('dragleave', (e) => {
        if (!el.contains(e.relatedTarget)) {
          el.classList.remove('drop-target-before', 'drop-target-after');
        }
      });

      el.addEventListener('drop', (e) => {
        if (!dragSource || dragSource.type !== 'block') return;
        e.preventDefault();
        e.stopPropagation();

        const targetBlockIdx = parseInt(el.getAttribute('data-block-idx'), 10);
        const rect = el.getBoundingClientRect();
        const isAfter = (e.clientX - rect.left) > (rect.width / 2);

        blockEls.forEach(b => b.classList.remove('drop-target-before', 'drop-target-after'));

        if (!isNaN(dragSource.blockIdx) && !isNaN(targetBlockIdx) && dragSource.blockIdx !== targetBlockIdx) {
          this.reorderRosterBlocks(dragSource.blockIdx, targetBlockIdx, isAfter);
        }
      });

      el.addEventListener('dragend', () => {
        el.classList.remove('is-dragging');
        blockEls.forEach(b => b.classList.remove('drop-target-before', 'drop-target-after'));
        dragSource = null;
      });
    });

    // 2. Colossus Segment Internal Dragging
    const segEls = container.querySelectorAll('.colossus-draggable-segment');
    segEls.forEach(el => {
      el.addEventListener('dragstart', (e) => {
        if (e.target.closest('button, input, select, textarea, .dropdown-menu, .stress-pip, .hp-pip, .btn-feat-cost-trigger')) {
          return;
        }

        e.stopPropagation(); // Avoid triggering top-level block drag
        const segIdx = parseInt(el.getAttribute('data-seg-idx'), 10);
        const rosterIdx = parseInt(el.getAttribute('data-roster-idx'), 10);
        const groupId = el.getAttribute('data-group-id');

        dragSource = {
          type: 'segment',
          segIdx,
          rosterIdx,
          groupId,
          el
        };

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'segment', segIdx, groupId }));
        setTimeout(() => el.classList.add('is-dragging'), 0);
      });

      el.addEventListener('dragover', (e) => {
        if (!dragSource || dragSource.type !== 'segment') return;
        const targetGroupId = el.getAttribute('data-group-id');
        if (dragSource.groupId !== targetGroupId) return;

        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';

        const rect = el.getBoundingClientRect();
        const isAfter = (e.clientX - rect.left) > (rect.width / 2);

        segEls.forEach(s => s.classList.remove('drop-target-before', 'drop-target-after'));
        if (dragSource.el !== el) {
          el.classList.add(isAfter ? 'drop-target-after' : 'drop-target-before');
        }
      });

      el.addEventListener('dragleave', (e) => {
        if (!el.contains(e.relatedTarget)) {
          el.classList.remove('drop-target-before', 'drop-target-after');
        }
      });

      el.addEventListener('drop', (e) => {
        if (!dragSource || dragSource.type !== 'segment') return;
        const targetGroupId = el.getAttribute('data-group-id');
        if (dragSource.groupId !== targetGroupId) return;

        e.preventDefault();
        e.stopPropagation();

        const targetRosterIdx = parseInt(el.getAttribute('data-roster-idx'), 10);
        const rect = el.getBoundingClientRect();
        const isAfter = (e.clientX - rect.left) > (rect.width / 2);

        segEls.forEach(s => s.classList.remove('drop-target-before', 'drop-target-after'));

        if (!isNaN(dragSource.rosterIdx) && !isNaN(targetRosterIdx) && dragSource.rosterIdx !== targetRosterIdx) {
          this.reorderColossusSegment(dragSource.rosterIdx, targetRosterIdx, isAfter);
        }
      });

      el.addEventListener('dragend', () => {
        el.classList.remove('is-dragging');
        segEls.forEach(s => s.classList.remove('drop-target-before', 'drop-target-after'));
        dragSource = null;
      });
    });
  },

  reorderRosterBlocks(sourceBlockIdx, targetBlockIdx, isAfter = false) {
    if (sourceBlockIdx === targetBlockIdx) return;

    // 1. Group roster into cohesive blocks
    const blocks = [];
    const processedGroups = new Set();

    for (let i = 0; i < this.state.roster.length; i++) {
      const adv = this.state.roster[i];
      const gid = adv.colossusGroupId;
      if (gid) {
        if (processedGroups.has(gid)) continue;
        processedGroups.add(gid);
        const groupItems = this.state.roster.filter(x => x.colossusGroupId === gid);
        blocks.push({ type: 'colossus', groupId: gid, items: groupItems });
      } else {
        blocks.push({ type: 'standalone', items: [adv] });
      }
    }

    if (sourceBlockIdx < 0 || sourceBlockIdx >= blocks.length) return;
    if (targetBlockIdx < 0 || targetBlockIdx >= blocks.length) return;

    // 2. Remove source block
    const [movedBlock] = blocks.splice(sourceBlockIdx, 1);

    // 3. Calculate destination index
    let destIdx = targetBlockIdx;
    if (sourceBlockIdx < targetBlockIdx) {
      destIdx = isAfter ? targetBlockIdx : targetBlockIdx - 1;
    } else {
      destIdx = isAfter ? targetBlockIdx + 1 : targetBlockIdx;
    }
    destIdx = Math.max(0, Math.min(blocks.length, destIdx));

    // 4. Insert at destination
    blocks.splice(destIdx, 0, movedBlock);

    // 5. Flatten back into this.state.roster
    const newRoster = [];
    blocks.forEach(b => {
      newRoster.push(...b.items);
    });

    this.state.roster = newRoster;
    this.saveState();
    this.renderRoster();
    this.renderHUD();
    this.showToast('Reordered adversaries in encounter');
    AudioFX.playClick();
  },

  reorderColossusSegment(srcRosterIdx, targetRosterIdx, isAfter = false) {
    if (srcRosterIdx === targetRosterIdx) return;
    const roster = this.state.roster;
    const item = roster[srcRosterIdx];
    if (!item) return;

    roster.splice(srcRosterIdx, 1);
    let destIdx = targetRosterIdx;
    if (srcRosterIdx < targetRosterIdx) {
      destIdx = isAfter ? targetRosterIdx : targetRosterIdx - 1;
    } else {
      destIdx = isAfter ? targetRosterIdx + 1 : targetRosterIdx;
    }
    destIdx = Math.max(0, Math.min(roster.length, destIdx));

    roster.splice(destIdx, 0, item);
    this.saveState();
    this.renderRoster();
    this.renderHUD();
    this.showToast(`Reordered "${item.name}"`);
    AudioFX.playClick();
  },

  handleRosterAction(action, idx, pip, unitIdx = 0, groupId = null, featName = '') {
    AudioFX.playClick();

    if (action === 'spend-fear-cost') {
      const currentFear = (this.state.gmFear !== undefined) ? this.state.gmFear : (this.state.fear || 0);
      if (currentFear > 0) {
        this.state.gmFear = Math.max(0, currentFear - 1);
        this.state.fear = this.state.gmFear;
        this.saveState();
        this.renderFear();
        this.renderHUD();
        this.showToast(`💀 Spent 1 GM Fear for "${featName || 'Move'}". (${this.state.gmFear} Fear remaining)`);
        AudioFX.playClick();
      } else {
        this.showToast(`⚠️ Cannot spend Fear for "${featName || 'Move'}" — GM Fear pool is currently 0!`);
      }
      return;
    }

    if (action === 'toggle-colossus-collapse' && groupId) {
      const groupItems = this.state.roster.filter(a => a.colossusGroupId === groupId);
      const anyExpanded = groupItems.some(a => !a.isCollapsed);
      groupItems.forEach(a => { a.isCollapsed = anyExpanded; });
      this.saveState();
      this.renderRoster();
      return;
    }

    if (action === 'remove-colossus-group' && groupId) {
      this.state.roster = this.state.roster.filter(a => a.colossusGroupId !== groupId);
      this.saveState();
      this.renderRoster();
      this.renderHUD();
      this.showToast('Removed Colossus and all linked segments from encounter');
      return;
    }

    const adv = this.state.roster[idx];
    if (!adv) return;

    if (!adv.trackers || !Array.isArray(adv.trackers) || adv.trackers.length === 0) {
      adv.trackers = [{ id: 1, markedHP: adv.markedHP || 0, markedStress: adv.markedStress || 0 }];
    }

    const tracker = adv.trackers[unitIdx] || adv.trackers[0];

    if (action === 'mark-stress-cost') {
      // Check if this card is a Colossus Segment with a linked Framework
      if ((adv.isColossusSegment || adv.colossusGroupId) && !adv.isColossusFramework) {
        const framework = this.state.roster.find(a => a.colossusGroupId === adv.colossusGroupId && (a.isColossusFramework || a.type === 'Colossus'));
        if (framework) {
          if (!framework.trackers || !Array.isArray(framework.trackers) || framework.trackers.length === 0) {
            framework.trackers = [{ id: 1, markedHP: framework.markedHP || 0, markedStress: framework.markedStress || 0 }];
          }
          const fwTracker = framework.trackers[0];
          const fwStressCap = framework.stress || 6;
          if (fwTracker.markedStress < fwStressCap) {
            fwTracker.markedStress++;
            framework.markedStress = fwTracker.markedStress;
            this.saveState();
            this.renderRoster();
            this.showToast(`⚡ Marked 1 Stress on "${framework.name}" for "${adv.name}: ${featName || 'Move'}" (${fwTracker.markedStress}/${fwStressCap}).`);
            AudioFX.playClick();
          } else {
            this.showToast(`⚠️ Colossus "${framework.name}" has already marked maximum Stress (${fwTracker.markedStress}/${fwStressCap})!`);
          }
          return;
        }
      }

      // Standard Adversary or Framework itself
      if ((adv.stress || 0) > 0 && tracker.markedStress < adv.stress) {
        tracker.markedStress++;
        adv.markedStress = adv.trackers[0].markedStress;
        this.saveState();
        this.renderRoster();
        this.showToast(`⚡ Marked 1 Stress on "${adv.name}" for "${featName || 'Move'}" (${tracker.markedStress}/${adv.stress}).`);
        AudioFX.playClick();
      } else if ((adv.stress || 0) <= 0) {
        this.showToast(`⚠️ "${adv.name}" has 0 Stress capacity.`);
      } else {
        this.showToast(`⚠️ "${adv.name}" has already marked maximum Stress (${tracker.markedStress}/${adv.stress})!`);
      }
      return;
    }

    if (action === 'toggle-card-collapse') {
      adv.isCollapsed = !adv.isCollapsed;
      this.saveState();
      this.renderRoster();
    } else if (action === 'toggle-hp') {
      if (pip !== null) {
        if (pip < tracker.markedHP) {
          tracker.markedHP = pip;
        } else {
          tracker.markedHP = pip + 1;
        }
      }
      adv.markedHP = adv.trackers[0].markedHP;
      this.saveState();
      this.renderRoster();
    } else if (action === 'toggle-stress') {
      if (pip !== null) {
        if (pip < tracker.markedStress) {
          tracker.markedStress = pip;
        } else {
          tracker.markedStress = pip + 1;
        }
      }
      adv.markedStress = adv.trackers[0].markedStress;
      this.saveState();
      this.renderRoster();
    } else if (action === 'add-unit') {
      const nextId = adv.trackers.length + 1;
      adv.trackers.push({
        id: nextId,
        markedHP: 0,
        markedStress: 0
      });
      this.saveState();
      this.renderRoster();
      this.renderHUD();
      this.showToast(`Added Unit #${nextId} to ${adv.name}`);
    } else if (action === 'remove-unit') {
      if (adv.trackers.length > 1) {
        adv.trackers.splice(unitIdx, 1);
        adv.markedHP = adv.trackers[0].markedHP;
        adv.markedStress = adv.trackers[0].markedStress;
        this.saveState();
        this.renderRoster();
        this.renderHUD();
        this.showToast(`Removed unit from ${adv.name}`);
      }
    } else if (action === 'apply-damage') {
      const input = document.querySelector(`.dmg-input-${idx}-${unitIdx}`) || document.querySelector(`.dmg-input-${idx}`);
      const dmg = input ? parseInt(input.value, 10) : 0;
      if (dmg > 0) {
        this.applyDamageToAdversary(idx, dmg, unitIdx);
        if (input) input.value = '';
      }
    } else if (action === 'roll-atk') {
      this.rollAdversaryAttack(adv);
    } else if (action === 'roll-dmg') {
      this.rollAdversaryDamage(adv);
    } else if (action === 'duplicate-adv') {
      const clone = JSON.parse(JSON.stringify(adv));
      clone.name = `${clone.name} (Copy)`;
      clone.trackers = [{ id: 1, markedHP: 0, markedStress: 0 }];
      clone.markedHP = 0;
      clone.markedStress = 0;
      delete clone.colossusGroupId;
      delete clone.isColossusFramework;
      delete clone.isColossusSegment;
      this.state.roster.push(clone);
      this.saveState();
      this.renderRoster();
      this.renderHUD();
      this.showToast(`Duplicated ${adv.name} as new stat block`);
    } else if (action === 'reset-trackers') {
      adv.trackers.forEach(t => {
        t.markedHP = 0;
        t.markedStress = 0;
      });
      adv.markedHP = 0;
      adv.markedStress = 0;
      this.saveState();
      this.renderRoster();
      this.showToast(`Cleared HP & Stress on ${adv.name}`);
    } else if (action === 'remove-adv') {
      const name = adv.name;
      this.state.roster.splice(idx, 1);
      this.saveState();
      this.renderRoster();
      this.renderHUD();
      this.showToast(`Removed ${name} from battle`);
    }
  },

  applyDamageToAdversary(idx, dmg, unitIdx = 0) {
    const adv = this.state.roster[idx];
    if (!adv) return;

    if (!adv.trackers || !Array.isArray(adv.trackers) || adv.trackers.length === 0) {
      adv.trackers = [{ id: 1, markedHP: adv.markedHP || 0, markedStress: adv.markedStress || 0 }];
    }

    const tracker = adv.trackers[unitIdx] || adv.trackers[0];
    const unitLabel = (adv.trackers.length > 1) ? ` (Unit #${unitIdx + 1})` : '';

    if (adv.type === 'Minion') {
      const partySize = Math.max(1, this.state.party?.count || 4);
      const overkill = adv.minionRule || 6;
      const totalDefeatedByAttack = 1 + Math.floor(dmg / overkill);
      let remainingToDefeat = totalDefeatedByAttack;

      // Defeat minions in targeted unit first
      const neededInCurrent = partySize - tracker.markedHP;
      const defeatedInCurrent = Math.max(0, Math.min(neededInCurrent, remainingToDefeat));
      tracker.markedHP += defeatedInCurrent;
      remainingToDefeat -= defeatedInCurrent;

      // Cascade overkill to other units in the same Minion statblock if any remain
      let extraCascaded = 0;
      if (remainingToDefeat > 0 && adv.trackers.length > 1) {
        for (let u = 0; u < adv.trackers.length; u++) {
          if (u !== unitIdx && adv.trackers[u].markedHP < partySize && remainingToDefeat > 0) {
            const canDefeat = partySize - adv.trackers[u].markedHP;
            const defeatNow = Math.min(canDefeat, remainingToDefeat);
            adv.trackers[u].markedHP += defeatNow;
            remainingToDefeat -= defeatNow;
            extraCascaded += defeatNow;
          }
        }
      }

      const totalActualDefeated = totalDefeatedByAttack - remainingToDefeat;
      this.logCombatMessage(`${adv.name}${unitLabel} was hit for ${dmg} dmg! ${totalActualDefeated} Minion${totalActualDefeated === 1 ? '' : 's'} Defeated.${totalDefeatedByAttack > 1 ? ` (Overkill ${overkill} cascaded to ${totalDefeatedByAttack - 1} additional minions)` : ''}`);
    } else {
      let hpToMark = 1;
      let tierSeverity = 'Minor Damage (1 HP)';

      let severeThreshold = parseInt(adv.severe, 10);
      let majorThreshold = parseInt(adv.major, 10);

      if ((isNaN(majorThreshold) || isNaN(severeThreshold)) && adv.colossusGroupId) {
        const fw = this.state.roster.find(a => a.colossusGroupId === adv.colossusGroupId && (a.isColossusFramework || a.type === 'Colossus'));
        if (fw) {
          if (isNaN(majorThreshold)) majorThreshold = parseInt(fw.major, 10);
          if (isNaN(severeThreshold)) severeThreshold = parseInt(fw.severe, 10);
        }
      }
      if (isNaN(severeThreshold)) severeThreshold = 999;
      if (isNaN(majorThreshold)) majorThreshold = 999;

      if (dmg >= severeThreshold) {
        hpToMark = 3;
        tierSeverity = 'Severe Damage (3 HP)';
      } else if (dmg >= majorThreshold) {
        hpToMark = 2;
        tierSeverity = 'Major Damage (2 HP)';
      }

      tracker.markedHP = Math.min(adv.hp, tracker.markedHP + hpToMark);
      this.logCombatMessage(`${adv.name}${unitLabel} took ${dmg} dmg &rarr; ${tierSeverity}. Current HP: ${tracker.markedHP}/${adv.hp}`);
    }
    adv.markedHP = adv.trackers[0].markedHP;
    adv.markedStress = adv.trackers[0].markedStress;

    this.saveState();
    this.renderRoster();
    this.renderHUD();
  },

  rollAdversaryAttack(adv) {
    if (!adv.attack || adv.attack.type === 'None' || !(adv.attack.damage || '').trim() || (adv.attack.damage || '').trim() === '—' || (adv.attack.damage || '').trim().toLowerCase() === 'none') return;
    this.openDiceTray();
    AudioFX.playRoll();
    const d20 = Math.floor(Math.random() * 20) + 1;
    const bonus = parseInt(adv.attack?.bonus, 10) || 0;
    const total = d20 + bonus;
    let special = '';

    // Update Visual Die Face in Console (Final Summed Value Emphasized)
    const panelTitle = document.getElementById('gm-roll-panel-title');
    const dieVal = document.getElementById('die-val-d20');
    const dieMod = document.getElementById('die-val-d20-mod');
    const dieSub = document.getElementById('die-val-d20-subtext');
    const outcomeBadge = document.getElementById('gm-d20-outcome-badge');
    const rollLabel = document.getElementById('gm-d20-roll-type-label');

    if (panelTitle) panelTitle.textContent = 'GM Action Roll (d20)';
    if (dieVal) dieVal.textContent = total;
    if (dieMod) dieMod.textContent = `(d20: ${d20} ${bonus >= 0 ? '+' : ''}${bonus})`;
    if (dieSub) dieSub.innerHTML = `<strong>${adv.name}</strong> &bull; ${adv.attack?.name || 'Attack'}`;
    if (rollLabel) rollLabel.textContent = `${adv.name} Attack Roll`;

    if (d20 === 20) {
      special = '<span class="text-warning fw-bold"> [CRITICAL SUCCESS!]</span>';
      if (outcomeBadge) {
        outcomeBadge.className = 'badge bg-warning text-dark';
        outcomeBadge.textContent = 'Critical (Nat 20)!';
      }
    } else if (d20 === 1) {
      special = '<span class="text-danger fw-bold"> [CRITICAL FAILURE!]</span>';
      if (outcomeBadge) {
        outcomeBadge.className = 'badge bg-danger';
        outcomeBadge.textContent = 'Nat 1 Failure';
      }
    } else {
      if (outcomeBadge) {
        outcomeBadge.className = 'badge bg-primary';
        outcomeBadge.textContent = `Total: ${total}`;
      }
    }

    this.logCombatMessage(`<strong>${adv.name}</strong> attacks with ${adv.attack?.name || 'Attack'}: (d20: ${d20}) ${bonus >= 0 ? '+' : ''}${bonus} = <strong class="text-gold fs-6">${total}</strong> vs Evasion${special}`);
  },

  rollAdversaryDamage(adv) {
    if (!adv.attack || adv.attack.type === 'None' || !(adv.attack.damage || '').trim() || (adv.attack.damage || '').trim() === '—' || (adv.attack.damage || '').trim().toLowerCase() === 'none') return;
    this.openDiceTray();
    AudioFX.playRoll();
    const formula = adv.attack?.damage || '1d8';
    const result = this.evaluateDiceFormula(formula);

    // Update Visual Die Face in Console to show Damage Roll (Final Summed Value Emphasized)
    const panelTitle = document.getElementById('gm-roll-panel-title');
    const dieVal = document.getElementById('die-val-d20');
    const dieMod = document.getElementById('die-val-d20-mod');
    const dieSub = document.getElementById('die-val-d20-subtext');
    const outcomeBadge = document.getElementById('gm-d20-outcome-badge');
    const rollLabel = document.getElementById('gm-d20-roll-type-label');

    if (panelTitle) panelTitle.textContent = 'Damage Roll';
    if (dieVal) dieVal.textContent = result.total;
    if (dieMod) dieMod.textContent = `${adv.attack?.type || 'Physical'} Dmg`;
    
    const bonusText = result.bonus !== 0 ? (result.bonus > 0 ? ` + ${result.bonus}` : ` - ${Math.abs(result.bonus)}`) : '';
    if (dieSub) dieSub.innerHTML = `<strong>${formula}</strong> &rarr; [${result.rolls.join(', ')}]${bonusText}`;
    if (rollLabel) rollLabel.textContent = `${adv.name} • ${adv.attack?.name || 'Damage'}`;
    if (outcomeBadge) {
      outcomeBadge.className = 'badge bg-danger text-light';
      outcomeBadge.textContent = `Dmg: ${result.total}`;
    }

    this.logCombatMessage(`<strong>${adv.name}</strong> damage: ${formula} &rarr; [${result.rolls.join(', ')}] ${result.bonus !== 0 ? (result.bonus > 0 ? `+ ${result.bonus}` : `- ${Math.abs(result.bonus)}`) : ''} = <strong class="text-danger fs-6">${result.total} ${adv.attack?.type || 'Physical'}</strong>`);
  },

  evaluateDiceFormula(expr) {
    const clean = expr.trim().toLowerCase();
    const match = clean.match(/^(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?$/);

    if (match) {
      const numDice = parseInt(match[1], 10);
      const dieSides = parseInt(match[2], 10);
      const sign = match[3] || '+';
      const mod = match[4] ? parseInt(match[4], 10) : 0;
      const bonus = (sign === '-' ? -mod : mod);

      const rolls = [];
      let sum = 0;
      for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * dieSides) + 1;
        rolls.push(roll);
        sum += roll;
      }
      return { rolls, bonus, total: Math.max(0, sum + bonus) };
    }

    const flat = parseInt(clean, 10);
    if (!isNaN(flat)) {
      return { rolls: [flat], bonus: 0, total: flat };
    }

    return { rolls: [1], bonus: 0, total: 1 };
  },

  rollGMD20() {
    this.openDiceTray();
    AudioFX.playRoll();
    const bonusInput = document.getElementById('gm-d20-bonus');
    const bonus = bonusInput ? (parseInt(bonusInput.value, 10) || 0) : 0;
    const mode = document.querySelector('input[name="gmRollMode"]:checked')?.value || 'normal';

    const roll1 = Math.floor(Math.random() * 20) + 1;
    const roll2 = Math.floor(Math.random() * 20) + 1;
    let chosen = roll1;
    let subtext = '';
    let modeName = 'Standard d20 Roll';

    if (mode === 'adv') {
      chosen = Math.max(roll1, roll2);
      subtext = `Advantage: [${roll1}, ${roll2}] &rarr; Kept ${chosen}`;
      modeName = 'Advantage (Higher of 2d20)';
    } else if (mode === 'dis') {
      chosen = Math.min(roll1, roll2);
      subtext = `Disadvantage: [${roll1}, ${roll2}] &rarr; Kept ${chosen}`;
      modeName = 'Disadvantage (Lower of 2d20)';
    } else {
      subtext = `Natural d20: ${chosen}`;
    }

    const total = chosen + bonus;

    // Update Visual Die Face in Console (Final Summed Value Emphasized)
    const panelTitle = document.getElementById('gm-roll-panel-title');
    const dieVal = document.getElementById('die-val-d20');
    const dieMod = document.getElementById('die-val-d20-mod');
    const dieSub = document.getElementById('die-val-d20-subtext');
    const outcomeBadge = document.getElementById('gm-d20-outcome-badge');
    const rollLabel = document.getElementById('gm-d20-roll-type-label');

    if (panelTitle) panelTitle.textContent = 'GM Action Roll (d20)';
    if (dieVal) dieVal.textContent = total;
    if (dieMod) dieMod.textContent = `(d20: ${chosen} ${bonus >= 0 ? '+' : ''}${bonus})`;
    if (dieSub) dieSub.innerHTML = subtext;
    if (rollLabel) rollLabel.textContent = modeName;

    let special = '';
    if (chosen === 20) {
      special = '<span class="text-warning fw-bold"> [NAT 20 CRITICAL!]</span>';
      if (outcomeBadge) {
        outcomeBadge.className = 'badge bg-warning text-dark';
        outcomeBadge.textContent = 'Nat 20 Critical!';
      }
    } else if (chosen === 1) {
      special = '<span class="text-danger fw-bold"> [NAT 1 FAILURE]</span>';
      if (outcomeBadge) {
        outcomeBadge.className = 'badge bg-danger';
        outcomeBadge.textContent = 'Nat 1 Failure';
      }
    } else {
      if (outcomeBadge) {
        outcomeBadge.className = 'badge bg-primary';
        outcomeBadge.textContent = `Total: ${total}`;
      }
    }

    const modeStr = mode === 'normal' ? '' : ` (${mode.toUpperCase()})`;
    this.logCombatMessage(`<strong>GM Action (d20${modeStr}):</strong> [Roll: ${chosen}] ${bonus >= 0 ? '+' : ''}${bonus} = <strong class="text-gold fs-6">${total}</strong>${special}`);
  },

  rollSingleDie(sides, qty = 1) {
    this.openDiceTray();
    AudioFX.playRoll();
    const count = Math.max(1, parseInt(qty, 10) || 1);
    const bonusInput = document.getElementById('poly-dice-bonus');
    const bonus = bonusInput ? (parseInt(bonusInput.value, 10) || 0) : 0;

    const rolls = [];
    let diceSum = 0;
    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rolls.push(roll);
      diceSum += roll;
    }

    const total = diceSum + bonus;

    // Update Visual Die Face in Console to show Damage Roll (Final Summed Value Emphasized)
    const panelTitle = document.getElementById('gm-roll-panel-title');
    const dieVal = document.getElementById('die-val-d20');
    const dieMod = document.getElementById('die-val-d20-mod');
    const dieSub = document.getElementById('die-val-d20-subtext');
    const outcomeBadge = document.getElementById('gm-d20-outcome-badge');
    const rollLabel = document.getElementById('gm-d20-roll-type-label');

    const formula = count > 1 ? `${count}d${sides}` : `d${sides}`;
    const modSign = bonus !== 0 ? (bonus > 0 ? ` + ${bonus}` : ` - ${Math.abs(bonus)}`) : '';

    if (panelTitle) panelTitle.textContent = 'Damage Roll';
    if (dieVal) dieVal.textContent = total;
    if (dieMod) dieMod.textContent = `Total`;
    if (dieSub) dieSub.innerHTML = `<strong>${formula}${modSign}</strong> &rarr; [${rolls.join(', ')}]${modSign}`;
    if (rollLabel) rollLabel.textContent = `Polyhedral Roll (${formula})`;
    if (outcomeBadge) {
      outcomeBadge.className = 'badge bg-danger text-light';
      outcomeBadge.textContent = `Dmg: ${total}`;
    }

    if (bonus === 0) {
      if (count === 1) {
        this.logCombatMessage(`Rolled <strong>d${sides}</strong>: <span class="text-gold fw-bold fs-6">${rolls[0]}</span>`);
      } else {
        this.logCombatMessage(`Rolled <strong>${count}d${sides}</strong>: [${rolls.join(', ')}] = <span class="text-gold fw-bold fs-6">${total}</span>`);
      }
    } else {
      if (count === 1) {
        this.logCombatMessage(`Rolled <strong>d${sides}${modSign}</strong>: (${rolls[0]})${modSign} = <strong class="text-gold fs-6">${total}</strong>`);
      } else {
        this.logCombatMessage(`Rolled <strong>${count}d${sides}${modSign}</strong>: [${rolls.join(', ')}]${modSign} = <strong class="text-gold fs-6">${total}</strong>`);
      }
    }
  },


  logCombatMessage(msg) {
    const log = document.getElementById('combat-roll-log');
    if (!log) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const entry = document.createElement('div');
    entry.className = 'combat-log-entry';
    entry.innerHTML = `<span class="combat-log-time">${time}</span> ${msg}`;
    log.prepend(entry);
  },

  openDiceTray() {
    const panel = document.getElementById('dice-tray-panel');
    const toggleBtn = document.getElementById('toggle-dice-tray');
    if (panel) panel.classList.remove('closed');
    document.body.classList.add('dice-tray-open');
    if (toggleBtn) {
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  },

  closeDiceTray() {
    const panel = document.getElementById('dice-tray-panel');
    const toggleBtn = document.getElementById('toggle-dice-tray');
    if (panel) panel.classList.add('closed');
    document.body.classList.remove('dice-tray-open');
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  },

  toggleDiceTray() {
    const panel = document.getElementById('dice-tray-panel');
    if (!panel) return;
    if (panel.classList.contains('closed')) {
      this.openDiceTray();
    } else {
      this.closeDiceTray();
    }
  },

  // ===========================================================================
  // 8B. GM QUICK MATH & DAMAGE CALCULATOR (PEMDAS ORDER OF OPERATIONS)
  // ===========================================================================
  calcState: {
    current: '0',
    tokens: [],
    overwrite: true,
    historyStr: '',
    isCalculated: false
  },

  initCalculator() {
    this.calcState = {
      current: '0',
      tokens: [],
      overwrite: true,
      historyStr: '',
      isCalculated: false
    };
    this.updateCalcDisplay();

    const container = document.querySelector('.gm-calculator-container');
    if (!container) return;

    // Keypad event delegation
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.calc-btn, #btn-calc-clear-history');
      if (!btn) return;

      if (btn.id === 'btn-calc-clear-history') {
        this.clearCalculator();
        AudioFX.playClick();
        return;
      }

      if (btn.hasAttribute('data-num')) {
        this.inputCalcNumber(btn.getAttribute('data-num'));
      } else if (btn.getAttribute('data-action') === 'decimal') {
        this.inputCalcDecimal();
      } else if (btn.getAttribute('data-action') === 'op') {
        this.setCalcOperation(btn.getAttribute('data-op'));
      } else if (btn.getAttribute('data-action') === 'equals') {
        this.computeCalculator();
      } else if (btn.getAttribute('data-action') === 'clear') {
        this.clearCalculator();
      } else if (btn.getAttribute('data-action') === 'backspace') {
        this.backspaceCalculator();
      } else if (btn.getAttribute('data-action') === 'negate') {
        this.negateCalculator();
      }

      AudioFX.playClick();
    });
  },

  inputCalcNumber(numStr) {
    if (this.calcState.isCalculated) {
      this.clearCalculator();
    }

    if (this.calcState.overwrite || this.calcState.current === 'Error') {
      this.calcState.current = numStr;
      this.calcState.overwrite = false;
    } else {
      if (this.calcState.current === '0') {
        this.calcState.current = numStr;
      } else if (this.calcState.current.length < 14) {
        this.calcState.current += numStr;
      }
    }
    this.updateCalcDisplay();
  },

  inputCalcDecimal() {
    if (this.calcState.isCalculated) {
      this.clearCalculator();
    }

    if (this.calcState.overwrite || this.calcState.current === 'Error') {
      this.calcState.current = '0.';
      this.calcState.overwrite = false;
    } else if (!this.calcState.current.includes('.')) {
      this.calcState.current += '.';
    }
    this.updateCalcDisplay();
  },

  setCalcOperation(op) {
    if (this.calcState.current === 'Error') {
      this.clearCalculator();
      return;
    }

    if (this.calcState.isCalculated) {
      const resVal = parseFloat(this.calcState.current) || 0;
      this.calcState.tokens = [resVal];
      this.calcState.isCalculated = false;
    }

    const currentVal = parseFloat(this.calcState.current);
    if (isNaN(currentVal)) return;

    if (this.calcState.overwrite) {
      // Replace previous operator if clicked consecutively
      if (this.calcState.tokens.length > 0 && typeof this.calcState.tokens[this.calcState.tokens.length - 1] === 'string') {
        this.calcState.tokens[this.calcState.tokens.length - 1] = op;
      }
    } else {
      this.calcState.tokens.push(currentVal);
      this.calcState.tokens.push(op);
      this.calcState.overwrite = true;
    }

    this.calcState.historyStr = this.formatExpression(this.calcState.tokens);
    this.updateCalcDisplay();
  },

  computeCalculator() {
    if (this.calcState.isCalculated || this.calcState.current === 'Error') return;

    const currentVal = parseFloat(this.calcState.current);
    if (isNaN(currentVal)) return;

    const fullTokens = [...this.calcState.tokens];
    if (!this.calcState.overwrite || fullTokens.length === 0) {
      fullTokens.push(currentVal);
    } else if (typeof fullTokens[fullTokens.length - 1] === 'string') {
      fullTokens.push(currentVal);
    }

    if (fullTokens.length === 0) return;

    const expressionText = this.formatExpression(fullTokens) + ' =';
    const result = this.evaluatePEMDAS(fullTokens);

    if (result === 'Error') {
      this.calcState.current = 'Error';
      this.calcState.historyStr = expressionText;
      this.calcState.tokens = [];
      this.calcState.isCalculated = true;
      this.calcState.overwrite = true;
    } else {
      this.calcState.historyStr = expressionText;
      this.calcState.current = String(result);
      this.calcState.tokens = [];
      this.calcState.isCalculated = true;
      this.calcState.overwrite = true;
    }

    this.updateCalcDisplay();
  },

  evaluatePEMDAS(tokens) {
    if (!tokens || tokens.length === 0) return 0;
    if (tokens.length === 1) return typeof tokens[0] === 'number' ? tokens[0] : parseFloat(tokens[0]) || 0;

    const list = [...tokens];

    // Pass 1: Multiplication and Division (* and /)
    let i = 0;
    while (i < list.length) {
      if (list[i] === '*' || list[i] === '/') {
        const op = list[i];
        const left = parseFloat(list[i - 1]);
        const right = parseFloat(list[i + 1]);

        if (isNaN(left) || isNaN(right)) return 'Error';

        let subResult = 0;
        if (op === '*') {
          subResult = left * right;
        } else if (op === '/') {
          if (right === 0) return 'Error';
          subResult = left / right;
        }

        list.splice(i - 1, 3, subResult);
        i = i - 1;
      } else {
        i++;
      }
    }

    // Pass 2: Addition and Subtraction (+ and -)
    i = 0;
    while (i < list.length) {
      if (list[i] === '+' || list[i] === '-') {
        const op = list[i];
        const left = parseFloat(list[i - 1]);
        const right = parseFloat(list[i + 1]);

        if (isNaN(left) || isNaN(right)) return 'Error';

        let subResult = 0;
        if (op === '+') {
          subResult = left + right;
        } else if (op === '-') {
          subResult = left - right;
        }

        list.splice(i - 1, 3, subResult);
        i = i - 1;
      } else {
        i++;
      }
    }

    const finalNum = parseFloat(list[0]);
    if (isNaN(finalNum)) return 'Error';
    return Math.round((finalNum + Number.EPSILON) * 10000000) / 10000000;
  },

  formatExpression(tokens) {
    return tokens.map(t => {
      if (t === '*') return '×';
      if (t === '/') return '÷';
      if (t === '-') return '−';
      if (t === '+') return '+';
      return this.formatCalcNum(t);
    }).join(' ');
  },

  clearCalculator() {
    this.calcState = {
      current: '0',
      tokens: [],
      overwrite: true,
      historyStr: '',
      isCalculated: false
    };
    this.updateCalcDisplay();
  },

  backspaceCalculator() {
    if (this.calcState.isCalculated || this.calcState.overwrite || this.calcState.current === 'Error') {
      this.calcState.current = '0';
      this.calcState.overwrite = true;
    } else {
      this.calcState.current = this.calcState.current.slice(0, -1);
      if (this.calcState.current === '' || this.calcState.current === '-') {
        this.calcState.current = '0';
        this.calcState.overwrite = true;
      }
    }
    this.updateCalcDisplay();
  },

  negateCalculator() {
    if (this.calcState.current === '0' || this.calcState.current === 'Error') return;
    if (this.calcState.current.startsWith('-')) {
      this.calcState.current = this.calcState.current.substring(1);
    } else {
      this.calcState.current = '-' + this.calcState.current;
    }
    this.updateCalcDisplay();
  },

  formatCalcNum(num) {
    if (typeof num !== 'number' && isNaN(Number(num))) return String(num);
    const n = Number(num);
    return Number.isInteger(n) ? String(n) : String(parseFloat(n.toFixed(6)));
  },

  updateCalcDisplay() {
    const dispEl = document.getElementById('calc-display');
    const histEl = document.getElementById('calc-expression');
    if (dispEl) {
      dispEl.textContent = this.calcState.current;
    }
    if (histEl) {
      histEl.innerHTML = this.calcState.historyStr ? this.calcState.historyStr : '&nbsp;';
    }
  },

  // ===========================================================================
  // 9. ADVERSARY CREATOR ENGINE & PROPORTIONAL TIER SCALER
  // ===========================================================================
  creatorCustomImageData: null,
  creatorOriginItem: null,
  creatorMode: 'blank', // 'blank' | 'cloned'
  creatorColossusSegments: [],

  /**
   * 4-Pillar Proportional Tier Scaler
   * Preserves adversary unique design intent, variance ratios, signature die profiles, and experiences across tiers.
   * Includes complete multi-segment scaling for Colossus frameworks and all linked limbs/segments.
   */
  scaleItemToTier(originItem, targetTier) {
    if (!originItem) return null;
    const origTier = originItem.tier !== undefined ? parseInt(originItem.tier, 10) : 1;
    targetTier = parseInt(targetTier, 10) || 1;

    // If target tier is identical to origin tier, return exact clean copy
    if (targetTier === origTier) {
      return JSON.parse(JSON.stringify(originItem));
    }

    const type = originItem.type || 'Standard';
    const isEnv = (type === 'Environment' || originItem.isEnvironment);

    // Environments scale difficulty only
    if (isEnv) {
      const scaledEnv = JSON.parse(JSON.stringify(originItem));
      scaledEnv.tier = targetTier;
      const envBench = DH_BENCHMARKS.ARCHETYPES.Environment?.tiers;
      const origBenchDiff = envBench?.[origTier]?.diff || 10;
      const targetBenchDiff = envBench?.[targetTier]?.diff || 10;
      const diffDelta = (originItem.diff || origBenchDiff) - origBenchDiff;
      scaledEnv.diff = Math.max(8, targetBenchDiff + diffDelta);
      return scaledEnv;
    }

    // Benchmark lookups for this archetype
    const rkRole = RIGHTKNIGHT_BENCHMARKS[type];
    const dhRole = DH_BENCHMARKS.ARCHETYPES[type];

    const getBenchmark = (t) => {
      if (rkRole && rkRole.tiers[t]) return rkRole.tiers[t];
      if (dhRole && dhRole.tiers[t]) return dhRole.tiers[t];
      return DH_BENCHMARKS.ARCHETYPES.Standard.tiers[t] || DH_BENCHMARKS.ARCHETYPES.Standard.tiers[1];
    };

    const origBench = getBenchmark(origTier);
    const targetBench = getBenchmark(targetTier);

    const scaled = JSON.parse(JSON.stringify(originItem));
    scaled.tier = targetTier;

    // 1. Difficulty Scaling (Preserve Delta)
    const origDiff = originItem.diff !== undefined ? originItem.diff : origBench.diff;
    const diffDelta = origDiff - origBench.diff;
    scaled.diff = Math.max(8, targetBench.diff + diffDelta);

    // 2. Thresholds Scaling (Proportional Ratio)
    if (type === 'Minion' || origBench.major === 'None' || origBench.major === '—') {
      scaled.major = 0;
      scaled.severe = 0;
      if (originItem.minionRule || origBench.minionRule) {
        const origRule = originItem.minionRule || origBench.minionRule || 6;
        const targetRule = targetBench.minionRule || 6;
        scaled.minionRule = Math.max(1, targetRule + (origRule - (origBench.minionRule || 6)));
      }
    } else {
      const origMajor = typeof originItem.major === 'number' ? originItem.major : (parseInt(originItem.major, 10) || origBench.major);
      const origSevere = typeof originItem.severe === 'number' ? originItem.severe : (parseInt(originItem.severe, 10) || origBench.severe);

      const benchOrigMaj = typeof origBench.major === 'number' ? origBench.major : 8;
      const benchOrigSev = typeof origBench.severe === 'number' ? origBench.severe : 15;
      const benchTargetMaj = typeof targetBench.major === 'number' ? targetBench.major : 8;
      const benchTargetSev = typeof targetBench.severe === 'number' ? targetBench.severe : 15;

      const majRatio = benchOrigMaj > 0 ? (origMajor / benchOrigMaj) : 1;
      const sevRatio = benchOrigSev > 0 ? (origSevere / benchOrigSev) : 1;

      scaled.major = Math.max(1, Math.round(benchTargetMaj * majRatio));
      scaled.severe = Math.max(scaled.major + 2, Math.round(benchTargetSev * sevRatio));
    }

    // 3. HP & Stress Scaling
    const origHP = originItem.hp !== undefined ? originItem.hp : origBench.hp;
    const hpDelta = origHP - origBench.hp;
    scaled.hp = (type === 'Colossus') ? 0 : Math.max(1, targetBench.hp + hpDelta);

    const origStress = originItem.stress !== undefined ? originItem.stress : origBench.stress;
    const stressDelta = origStress - origBench.stress;
    scaled.stress = Math.max(0, targetBench.stress + stressDelta);

    // 4. Attack Bonus & Signature Damage Dice Scaling
    const origAtk = originItem.attack || (originItem.attacklabel || originItem.attackdamage ? {
      name: originItem.attacklabel,
      bonus: originItem.attackbonus,
      range: originItem.attackrange,
      damage: originItem.attackdamage,
      type: originItem.attackdamagetype
    } : null);

    const isNoneType = origAtk && String(origAtk.type || '').toLowerCase() === 'none';
    const origDmgStr = (origAtk && origAtk.damage !== undefined && origAtk.damage !== null ? String(origAtk.damage) : '').trim();
    const hasValidAttack = origAtk && !isNoneType && origDmgStr && origDmgStr !== '—' && origDmgStr.toLowerCase() !== 'none';

    if (hasValidAttack) {
      scaled.attack = JSON.parse(JSON.stringify(origAtk));
      const origAtkBonus = origAtk.bonus !== undefined ? origAtk.bonus : (origBench.atkBonus !== undefined ? origBench.atkBonus : 0);
      const benchAtkBonus = origBench.atkBonus !== undefined ? origBench.atkBonus : 0;
      const atkDelta = origAtkBonus - benchAtkBonus;
      const targetBenchAtkBonus = targetBench.atkBonus !== undefined ? targetBench.atkBonus : 0;
      scaled.attack.bonus = targetBenchAtkBonus + atkDelta;

      const diceMatch = origDmgStr.match(/^(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);

      if (diceMatch) {
        const origDieCount = parseInt(diceMatch[1], 10);
        const dieSize = parseInt(diceMatch[2], 10);
        const origSign = diceMatch[3] || '+';
        const origFlat = diceMatch[4] ? parseInt(diceMatch[4], 10) * (origSign === '-' ? -1 : 1) : 0;
        const origAvgDmg = (origDieCount * ((dieSize + 1) / 2)) + origFlat;

        // Calculate original benchmark average
        let origBenchAvg = 9;
        if (origBench.targetDmg) {
          const parts = String(origBench.targetDmg).split(/[–-]/).map(p => parseFloat(p.trim()));
          origBenchAvg = parts.length === 2 ? (parts[0] + parts[1]) / 2 : (parts[0] || 9);
        } else if (origBench.dmg) {
          const m = String(origBench.dmg).match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/);
          if (m) {
            origBenchAvg = parseInt(m[1], 10) * ((parseInt(m[2], 10) + 1) / 2) + (m[4] ? parseInt(m[4], 10) * (m[3] === '-' ? -1 : 1) : 0);
          }
        }

        // Calculate target benchmark average
        let targetBenchAvg = 9;
        if (targetBench.targetDmg) {
          const parts = String(targetBench.targetDmg).split(/[–-]/).map(p => parseFloat(p.trim()));
          targetBenchAvg = parts.length === 2 ? (parts[0] + parts[1]) / 2 : (parts[0] || 9);
        } else if (targetBench.dmg) {
          const m = String(targetBench.dmg).match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/);
          if (m) {
            targetBenchAvg = parseInt(m[1], 10) * ((parseInt(m[2], 10) + 1) / 2) + (m[4] ? parseInt(m[4], 10) * (m[3] === '-' ? -1 : 1) : 0);
          }
        }

        // Proportional power scaling: preserve custom / compendium offset ratio
        const dmgRatio = origBenchAvg > 0 ? (origAvgDmg / origBenchAvg) : 1;
        const scaledTargetAvg = targetBenchAvg * dmgRatio;

        const targetDieCount = Math.max(1, targetTier);
        const avgDiceRoll = targetDieCount * ((dieSize + 1) / 2);
        let desiredFlat = Math.round(scaledTargetAvg - avgDiceRoll);
        
        let newDmgFormula = `${targetDieCount}d${dieSize}`;
        if (desiredFlat > 0) {
          newDmgFormula += `+${desiredFlat}`;
        } else if (desiredFlat < 0) {
          newDmgFormula += `${desiredFlat}`;
        }
        scaled.attack.damage = newDmgFormula;
      } else if (!isNaN(parseInt(origDmgStr, 10))) {
        const origFlat = parseInt(origDmgStr, 10);
        const origBenchFlat = parseInt(origBench.dmg || origBench.dice?.average || '4', 10) || 4;
        const targetFlatBench = parseInt(targetBench.dmg || targetBench.dice?.average || '6', 10) || 6;
        const flatRatio = origBenchFlat > 0 ? (origFlat / origBenchFlat) : 1;
        scaled.attack.damage = String(Math.max(1, Math.round(targetFlatBench * flatRatio)));
      }
    } else {
      delete scaled.attack;
    }

    // 5. Experiences Scaling (+1, +2, +3, +4, +5)
    if (originItem.experiences && Array.isArray(originItem.experiences)) {
      const tierStep = targetTier - origTier;
      scaled.experiences = originItem.experiences.map(exp => {
        const match = exp.match(/^(.*?)\s*([+-]\s*\d+)$/);
        if (match) {
          const label = match[1].trim();
          const currentBonus = parseInt(match[2].replace(/\s+/g, ''), 10);
          const newBonus = Math.max(1, currentBonus + tierStep);
          return `${label} +${newBonus}`;
        }
        return exp;
      });
    }

    // 6. Colossus Multi-Segment Scaling: Scale every linked segment
    if (type === 'Colossus' && originItem.segments && Array.isArray(originItem.segments)) {
      const tierStep = targetTier - origTier;
      scaled.segments = originItem.segments.map(seg => {
        const scaledSeg = JSON.parse(JSON.stringify(seg));
        scaledSeg.tier = targetTier;
        scaledSeg.diff = Math.max(8, (seg.diff || 14) + (tierStep * 2));
        scaledSeg.hp = Math.max(1, Math.round((seg.hp || 5) * (1 + (tierStep * 0.25))));
        
        const hasAttack = Boolean(seg.attack && (seg.attack.damage || '').trim() && (seg.attack.damage || '').trim() !== '—' && (seg.attack.damage || '').trim().toLowerCase() !== 'none');
        if (hasAttack && scaledSeg.attack) {
          scaledSeg.attack.bonus = (scaledSeg.attack.bonus !== undefined ? scaledSeg.attack.bonus : 2) + tierStep;
          const sDmg = (scaledSeg.attack.damage || '').trim();
          const sMatch = sDmg.match(/^(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);
          if (sMatch) {
            const dieCount = Math.max(1, targetTier);
            const dieSize = sMatch[2];
            const flat = sMatch[4] ? parseInt(sMatch[4], 10) : 0;
            const sign = sMatch[3] || '+';
            scaledSeg.attack.damage = `${dieCount}d${dieSize}${flat ? `${sign}${flat}` : ''}`;
          }
        } else {
          delete scaledSeg.attack;
        }
        return scaledSeg;
      });
    }

    return scaled;
  },

  // ===========================================================================
  // COLOSSUS SEGMENT ARCHITECT ENGINE
  // ===========================================================================
  renderColossusSegments() {
    const container = document.getElementById('colossus-segments-container');
    if (!container) return;

    if (!this.creatorColossusSegments || this.creatorColossusSegments.length === 0) {
      container.innerHTML = `
        <div class="text-center p-3 rounded bg-dark border border-secondary border-dashed text-muted small">
          No segments added yet. Click <strong>"+ Add Limb"</strong> or <strong>"+ Add Custom Segment"</strong> above to build the colossus body.
        </div>
      `;
      this.calculateColossusBP();
      return;
    }

    container.innerHTML = this.creatorColossusSegments.map((seg, idx) => {
      const isFatal = seg.isFatal || (seg.features && seg.features.some(f => f.name.toLowerCase().includes('fatal')));
      const qty = seg.quantity || 1;
      const atk = seg.attack || {};
      const atkName = atk.name || '';
      const atkBonus = atk.bonus !== undefined ? atk.bonus : '';
      const atkRange = atk.range || 'Melee';
      const atkDamage = (atk.damage && atk.damage !== '—' && atk.damage.toLowerCase() !== 'none') ? atk.damage : '';
      const adjStr = Array.isArray(seg.adjacentSegments) ? seg.adjacentSegments.join(', ') : (seg.adjacentSegments || '');
      const features = seg.features || [];

      const featuresHTML = features.map((f, featIdx) => `
        <div class="seg-feature-row d-flex gap-2 align-items-start mb-2 p-2 rounded bg-dark border border-subtle" data-seg-idx="${idx}" data-feat-idx="${featIdx}">
          <div class="d-flex flex-column gap-1 flex-grow-1">
            <div class="d-flex gap-2 flex-wrap">
              <input type="text" class="form-control form-control-sm fw-bold seg-feat-name" value="${(f.name || '').replace(/"/g, '&quot;')}" placeholder="Move Name (e.g. Grab & Crush, Stomp)" style="flex: 2; min-width: 140px;">
              <select class="form-select form-select-sm seg-feat-type" style="flex: 1; min-width: 100px;">
                <option value="Action" ${f.type === 'Action' || !f.type ? 'selected' : ''}>Action</option>
                <option value="Passive" ${f.type === 'Passive' ? 'selected' : ''}>Passive</option>
                <option value="Reaction" ${f.type === 'Reaction' ? 'selected' : ''}>Reaction</option>
              </select>
              <select class="form-select form-select-sm seg-feat-cost" style="flex: 1; min-width: 100px;">
                <option value="None" ${f.cost === 'None' || !f.cost ? 'selected' : ''}>Cost: None</option>
                <option value="Fear" ${f.cost === 'Fear' ? 'selected' : ''}>💀 Fear</option>
                <option value="Stress" ${f.cost === 'Stress' ? 'selected' : ''}>⚡ Stress</option>
                <option value="Hope" ${f.cost === 'Hope' ? 'selected' : ''}>✨ Hope</option>
              </select>
            </div>
            <textarea class="form-control form-control-sm seg-feat-text" rows="2" placeholder="Feature rules, triggers, or mechanics...">${(f.text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
          </div>
          <button type="button" class="btn btn-xs btn-outline-danger btn-remove-seg-feature" data-seg-idx="${idx}" data-feat-idx="${featIdx}" title="Remove this move">
            &times;
          </button>
        </div>
      `).join('');

      return `
        <div class="card og-statblock-alt border-gold p-3 rounded shadow-sm segment-builder-card" data-seg-idx="${idx}">
          <!-- Header Bar -->
          <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2 flex-grow-1" style="min-width: 200px;">
              <span class="badge bg-gold text-dark fw-bold">#${idx + 1}</span>
              <input type="text" class="form-control form-control-sm fw-bold text-light bg-dark border-gold seg-field-name" value="${(seg.name || `Segment ${idx + 1}`).replace(/"/g, '&quot;')}" placeholder="Segment Name (e.g. Head, Arm)">
            </div>
            
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <!-- Quantity / Units Control -->
              <div class="d-flex align-items-center gap-1 bg-dark px-2 py-1 rounded border border-secondary">
                <span class="small text-muted" style="font-size: 0.72rem;">Units:</span>
                <button type="button" class="btn btn-xs btn-outline-secondary py-0 px-1 btn-seg-qty-minus" data-idx="${idx}" title="Decrease Units">−</button>
                <span class="fw-bold text-gold px-1 seg-qty-display">${qty}</span>
                <button type="button" class="btn btn-xs btn-outline-warning py-0 px-1 btn-seg-qty-plus" data-idx="${idx}" title="Increase Units">+</button>
              </div>

              <!-- Fatal Segment Toggle -->
              <label class="form-check-label d-flex align-items-center gap-1 small text-danger fw-bold bg-dark px-2 py-1 rounded border border-danger-subtle cursor-pointer" title="Fatal segments defeat the Colossus when destroyed">
                <input type="checkbox" class="form-check-input mt-0 seg-field-fatal" ${isFatal ? 'checked' : ''} data-idx="${idx}">
                ⚡ Fatal (${isFatal ? '2 BP' : '1 BP'})
              </label>

              <!-- Remove Segment Button -->
              <button type="button" class="btn btn-xs btn-outline-danger btn-remove-colossus-seg" data-idx="${idx}" title="Delete this segment">
                &times;
              </button>
            </div>
          </div>

          <!-- Defensive & Connection Parameters -->
          <div class="row g-2 mb-2">
            <div class="col-4 col-md-2">
              <label class="form-label small text-muted mb-0" style="font-size: 0.68rem;">Difficulty</label>
              <input type="number" class="form-control form-control-sm text-center fw-bold seg-field-diff" value="${seg.diff || 14}" min="1" max="30">
            </div>
            <div class="col-4 col-md-2">
              <label class="form-label small text-danger mb-0 fw-bold" style="font-size: 0.68rem;">HP per Unit</label>
              <input type="number" class="form-control form-control-sm text-center fw-bold text-danger seg-field-hp" value="${seg.hp || 5}" min="1" max="50">
            </div>
            <div class="col-4 col-md-2">
              <label class="form-label small text-warning mb-0" style="font-size: 0.68rem;">Stress</label>
              <input type="number" class="form-control form-control-sm text-center fw-bold text-warning seg-field-stress" value="${seg.stress || 0}" min="0" max="10">
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label small text-muted mb-0" style="font-size: 0.68rem;">Adjacent Segments (CSV)</label>
              <input type="text" class="form-control form-control-sm seg-field-adjacent" value="${(adjStr || '').replace(/"/g, '&quot;')}" placeholder="e.g. Torso, Head">
            </div>
          </div>

          <!-- Attack Parameters (Optional) -->
          <div class="row g-2 p-2 rounded bg-dark border border-subtle mb-2">
            <div class="col-12 col-md-4">
              <input type="text" class="form-control form-control-sm seg-field-atk-name" value="${atkName.replace(/"/g, '&quot;')}" placeholder="Attack Name (Optional)">
            </div>
            <div class="col-4 col-md-2">
              <div class="input-group input-group-sm">
                <span class="input-group-text py-0 text-muted" style="font-size: 0.68rem;">+</span>
                <input type="number" class="form-control form-control-sm text-center fw-bold seg-field-atk-bonus" value="${atkBonus}" placeholder="0">
              </div>
            </div>
            <div class="col-4 col-md-3">
              <select class="form-select form-select-sm seg-field-atk-range">
                <option value="Melee" ${atkRange === 'Melee' ? 'selected' : ''}>Melee</option>
                <option value="Very Close" ${atkRange === 'Very Close' ? 'selected' : ''}>Very Close</option>
                <option value="Close" ${atkRange === 'Close' ? 'selected' : ''}>Close</option>
                <option value="Far" ${atkRange === 'Far' ? 'selected' : ''}>Far</option>
                <option value="Very Far" ${atkRange === 'Very Far' ? 'selected' : ''}>Very Far</option>
              </select>
            </div>
            <div class="col-4 col-md-3">
              <input type="text" class="form-control form-control-sm seg-field-atk-damage" value="${atkDamage.replace(/"/g, '&quot;')}" placeholder="Damage (e.g. 1d10+1, or blank)">
            </div>
          </div>

          <!-- Segment Features & Moves Section -->
          <div class="seg-features-section p-2 rounded bg-dark bg-opacity-50 border border-secondary border-dashed">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="small fw-bold text-gold text-uppercase" style="font-size: 0.72rem;">
                ⚔️ Segment Moves & Features (${features.length})
              </span>
              <button type="button" class="btn btn-xs btn-outline-gold py-0 px-2 btn-add-seg-feature" data-seg-idx="${idx}">
                + Add Move
              </button>
            </div>
            <div class="seg-features-list">
              ${featuresHTML || '<div class="text-muted small text-center py-1 fst-italic" style="font-size: 0.72rem;">No unique moves. Click "+ Add Move" to create segment actions, passives, or reactions.</div>'}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach event listeners for segment controls
    container.querySelectorAll('.btn-remove-colossus-seg').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        this.removeColossusSegment(idx);
      });
    });

    container.querySelectorAll('.btn-seg-qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        if (this.creatorColossusSegments[idx]) {
          this.creatorColossusSegments[idx].quantity = Math.max(1, (this.creatorColossusSegments[idx].quantity || 1) - 1);
          this.renderColossusSegments();
          this.updateCreatorPreview();
        }
      });
    });

    container.querySelectorAll('.btn-seg-qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        if (this.creatorColossusSegments[idx]) {
          this.creatorColossusSegments[idx].quantity = Math.min(8, (this.creatorColossusSegments[idx].quantity || 1) + 1);
          this.renderColossusSegments();
          this.updateCreatorPreview();
        }
      });
    });

    container.querySelectorAll('.btn-add-seg-feature').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const segIdx = parseInt(e.currentTarget.dataset.segIdx, 10);
        this.addColossusSegmentFeature(segIdx);
      });
    });

    container.querySelectorAll('.btn-remove-seg-feature').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const segIdx = parseInt(e.currentTarget.dataset.segIdx, 10);
        const featIdx = parseInt(e.currentTarget.dataset.featIdx, 10);
        this.removeColossusSegmentFeature(segIdx, featIdx);
      });
    });

    container.querySelectorAll('.seg-field-fatal').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        if (this.creatorColossusSegments[idx]) {
          this.creatorColossusSegments[idx].isFatal = e.currentTarget.checked;
          if (e.currentTarget.checked) {
            if (!this.creatorColossusSegments[idx].features) this.creatorColossusSegments[idx].features = [];
            const hasFatal = this.creatorColossusSegments[idx].features.some(f => f.name.toLowerCase().includes('fatal'));
            if (!hasFatal) {
              this.creatorColossusSegments[idx].features.unshift({ name: 'Fatal', type: 'Passive', text: `When the ${this.creatorColossusSegments[idx].name || 'Segment'} is Destroyed, the Colossus is defeated.` });
            }
          } else {
            if (this.creatorColossusSegments[idx].features) {
              this.creatorColossusSegments[idx].features = this.creatorColossusSegments[idx].features.filter(f => !f.name.toLowerCase().includes('fatal'));
            }
          }
          this.renderColossusSegments();
          this.updateCreatorPreview();
        }
      });
    });

    // Sync input field changes back to state
    container.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => {
        this.syncColossusSegmentInputs();
        this.calculateColossusBP();
        this.updateCreatorPreview();
      });
    });

    this.calculateColossusBP();
  },

  addColossusSegmentFeature(segIdx, name = '', type = 'Action', text = '', cost = 'None') {
    this.syncColossusSegmentInputs();
    if (this.creatorColossusSegments[segIdx]) {
      if (!this.creatorColossusSegments[segIdx].features) {
        this.creatorColossusSegments[segIdx].features = [];
      }
      this.creatorColossusSegments[segIdx].features.push({
        name: name || 'Special Move',
        type: type || 'Action',
        cost: cost || 'None',
        text: text || ''
      });
      this.renderColossusSegments();
      this.updateCreatorPreview();
    }
  },

  removeColossusSegmentFeature(segIdx, featIdx) {
    this.syncColossusSegmentInputs();
    if (this.creatorColossusSegments[segIdx]?.features) {
      this.creatorColossusSegments[segIdx].features.splice(featIdx, 1);
      this.renderColossusSegments();
      this.updateCreatorPreview();
    }
  },

  syncColossusSegmentInputs() {
    const cards = document.querySelectorAll('#colossus-segments-container .segment-builder-card');
    cards.forEach((card, idx) => {
      if (!this.creatorColossusSegments[idx]) return;
      const seg = this.creatorColossusSegments[idx];
      seg.name = card.querySelector('.seg-field-name')?.value.trim() || `Segment ${idx + 1}`;
      seg.diff = parseInt(card.querySelector('.seg-field-diff')?.value, 10) || 14;
      seg.hp = parseInt(card.querySelector('.seg-field-hp')?.value, 10) || 5;
      seg.stress = parseInt(card.querySelector('.seg-field-stress')?.value, 10) || 0;
      const adjVal = card.querySelector('.seg-field-adjacent')?.value.trim() || '';
      seg.adjacentSegments = adjVal ? adjVal.split(',').map(s => s.trim()).filter(Boolean) : [];
      
      const atkDmg = card.querySelector('.seg-field-atk-damage')?.value.trim() || '';
      const atkName = card.querySelector('.seg-field-atk-name')?.value.trim() || '';
      const atkBonusRaw = card.querySelector('.seg-field-atk-bonus')?.value.trim();
      const atkRange = card.querySelector('.seg-field-atk-range')?.value || 'Melee';

      if (atkDmg && atkDmg !== '—' && atkDmg.toLowerCase() !== 'none') {
        seg.attack = {
          name: atkName || 'Natural Strike',
          bonus: atkBonusRaw !== '' ? (parseInt(atkBonusRaw, 10) || 0) : 0,
          range: atkRange,
          damage: atkDmg,
          type: 'Physical'
        };
      } else {
        delete seg.attack;
      }

      // Sync per-segment features
      const featRows = card.querySelectorAll('.seg-feature-row');
      const updatedFeatures = [];
      featRows.forEach(row => {
        const fName = row.querySelector('.seg-feat-name')?.value.trim();
        const fType = row.querySelector('.seg-feat-type')?.value || 'Action';
        const fCost = row.querySelector('.seg-feat-cost')?.value || 'None';
        const fText = row.querySelector('.seg-feat-text')?.value.trim();
        if (fName || fText) {
          updatedFeatures.push({ name: fName || 'Move', type: fType, cost: fCost, text: fText || '' });
        }
      });
      seg.features = updatedFeatures;
    });
  },

  addColossusSegment(preset = null) {
    this.syncColossusSegmentInputs();
    const currentTier = parseInt(document.getElementById('form-adv-tier')?.value, 10) || 1;
    const dieCount = Math.max(1, currentTier);

    if (preset === 'limb') {
      this.creatorColossusSegments.push({
        id: `seg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: 'Limbs',
        quantity: 2,
        isFatal: false,
        diff: 13 + (currentTier - 1) * 2,
        hp: 4 + (currentTier - 1),
        stress: 0,
        adjacentSegments: ['Torso'],
        attack: {
          name: 'Crushing Sweep',
          bonus: 2 + (currentTier - 1),
          range: 'Melee',
          damage: `${dieCount}d8+${currentTier + 1}`,
          type: 'Physical'
        },
        features: [
          { name: 'Grab and Crush', type: 'Action', text: 'Spend a Fear to restrain a target climbing on this segment.' }
        ]
      });
    } else {
      this.creatorColossusSegments.push({
        id: `seg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: `Segment ${this.creatorColossusSegments.length + 1}`,
        quantity: 1,
        isFatal: false,
        diff: 14 + (currentTier - 1) * 2,
        hp: 5 + (currentTier - 1),
        stress: 0,
        adjacentSegments: ['Torso'],
        features: []
      });
    }

    this.renderColossusSegments();
    this.updateCreatorPreview();
    this.showToast(`Added segment "${this.creatorColossusSegments[this.creatorColossusSegments.length - 1].name}".`);
  },

  removeColossusSegment(index) {
    if (index >= 0 && index < this.creatorColossusSegments.length) {
      const removed = this.creatorColossusSegments.splice(index, 1)[0];
      this.renderColossusSegments();
      this.updateCreatorPreview();
      this.showToast(`Removed segment "${removed.name}".`);
    }
  },

  calculateColossusBP() {
    let segBP = 0;
    (this.creatorColossusSegments || []).forEach(seg => {
      const qty = seg.quantity || 1;
      const isFatal = seg.isFatal || (seg.features && seg.features.some(f => f.name.toLowerCase().includes('fatal')));
      const weight = isFatal ? 2.0 : 1.0;
      segBP += (qty * weight);
    });

    const totalBP = 2.0 + segBP;
    const bpInput = document.getElementById('form-colossus-bp-preview');
    if (bpInput) {
      bpInput.value = `${totalBP} BP (Framework: 2 BP + Segments: ${segBP} BP)`;
    }
    return totalBP;
  },

  populateCreatorFields(item) {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val !== undefined ? val : '';
    };

    const isEnv = (item.type === 'Environment' || item.isEnvironment);
    const isColossus = (item.type === 'Colossus' || (item.segments && item.segments.length > 0));

    setVal('form-adv-name', item.name || '');
    setVal('form-adv-tier', item.tier !== undefined ? item.tier : 1);
    setVal('form-adv-type', isEnv ? 'Environment' : (item.type || 'Standard'));
    setVal('form-adv-description', item.description || item.summary || '');
    setVal('form-adv-motive', item.motive || '');
    setVal('form-adv-diff', item.diff || '');
    setVal('form-adv-thresh-major', item.major === 'None' || item.major === '—' ? 0 : (item.major || 0));
    setVal('form-adv-thresh-severe', item.severe === 'None' || item.severe === '—' ? 0 : (item.severe || 0));
    setVal('form-adv-hp', item.hp !== undefined ? item.hp : '');
    setVal('form-adv-stress', item.stress !== undefined ? item.stress : '');
    setVal('form-adv-minion-num', item.minionRule || '');

    const atk = item.attack || (item.attacklabel || item.attackdamage ? {
      name: item.attacklabel,
      bonus: item.attackbonus,
      range: item.attackrange,
      damage: item.attackdamage,
      type: item.attackdamagetype
    } : null);

    let normType = 'Physical';
    if (atk && atk.type) {
      const tLower = String(atk.type).toLowerCase();
      if (tLower.includes('mag')) normType = 'Magic';
      else if (tLower.includes('dir')) normType = 'Direct';
      else if (tLower === 'none' || tLower === '—') normType = 'None';
      else normType = 'Physical';
    } else if (!atk || !atk.damage || atk.damage === '—' || String(atk.damage).toLowerCase() === 'none') {
      normType = 'None';
    }

    const hasAtk = Boolean(atk && normType !== 'None' && atk.damage && String(atk.damage).trim() !== '' && String(atk.damage).trim() !== '—' && String(atk.damage).trim().toLowerCase() !== 'none');

    if (hasAtk) {
      setVal('form-adv-atk-name', atk.name || 'Basic Attack');
      setVal('form-adv-atk-bonus', atk.bonus !== undefined ? atk.bonus : 0);
      setVal('form-adv-atk-range', atk.range || 'Melee');
      setVal('form-adv-atk-damagetype', normType);
      setVal('form-adv-atk-damage', atk.damage || '');
    } else {
      // If adversary has no attack mechanic, fields are blank and damage type is None
      setVal('form-adv-atk-name', (atk?.name && atk.name !== '—') ? atk.name : '');
      setVal('form-adv-atk-bonus', '');
      setVal('form-adv-atk-range', atk?.range || 'Melee');
      setVal('form-adv-atk-damagetype', 'None');
      setVal('form-adv-atk-damage', '');
    }

    setVal('form-adv-experiences', Array.isArray(item.experiences) ? item.experiences.join(', ') : (item.experiences || ''));

    // Colossus specific
    if (isColossus) {
      setVal('form-colossus-size', item.size || '95 ft. tall, 60 ft. wide');
      this.creatorColossusSegments = JSON.parse(JSON.stringify(item.segments || []));
      this.renderColossusSegments();
    } else {
      this.creatorColossusSegments = [];
    }

    // Environment specific
    setVal('form-env-subtype', item.subtype || 'Exploration');
    setVal('form-env-impulses', item.impulses || '');
    setVal('form-env-adversaries', item.suggestedAdversaries || '');

    // Token
    this.creatorCustomImageData = item.tokenImg || null;

    // Features
    const container = document.getElementById('features-container');
    if (container && item.features && Array.isArray(item.features)) {
      container.innerHTML = '';
      item.features.forEach(f => {
        this.addFeatureRow(f.name, f.type, f.text, f.cost || 'None');
      });
    }

    // Toggle UI sections - Attack card always displays for all adversaries (only hidden for Environment)
    const colossusFrameworkSec = document.getElementById('section-colossus-framework-params');
    const colossusSegmentsSec = document.getElementById('section-colossus-segments');
    const envSection = document.getElementById('section-environment-params');
    const atkSection = document.getElementById('section-primary-attacks');
    const combatGroups = document.querySelectorAll('.group-adversary-combat');
    const motiveLabel = document.getElementById('label-adv-motive');

    if (colossusFrameworkSec) colossusFrameworkSec.classList.toggle('d-none', !isColossus);
    if (colossusSegmentsSec) colossusSegmentsSec.classList.toggle('d-none', !isColossus);
    if (envSection) envSection.classList.toggle('d-none', !isEnv);
    if (atkSection) atkSection.classList.toggle('d-none', isEnv);
    combatGroups.forEach(el => el.classList.toggle('d-none', isEnv));
    if (motiveLabel) motiveLabel.textContent = isEnv ? 'Sensory Description & Atmosphere' : (isColossus ? 'Titanic Motive & Concept' : 'Motive & Concept');
  },

  handleTierChange() {
    const newTier = parseInt(document.getElementById('form-adv-tier')?.value, 10) || 1;
    if (this.creatorMode === 'cloned' && this.creatorOriginItem) {
      const scaled = this.scaleItemToTier(this.creatorOriginItem, newTier);
      if (scaled) {
        this.populateCreatorFields(scaled);
        this.updateCreatorOriginBanner();
        this.updateCreatorPreview();
        const origTier = this.creatorOriginItem.tier !== undefined ? this.creatorOriginItem.tier : 1;
        if (newTier === origTier) {
          this.showToast(`Restored original Tier ${newTier} stats for "${this.creatorOriginItem.name}".`);
        } else {
          this.showToast(`Scaled "${this.creatorOriginItem.name}" from Tier ${origTier} to Tier ${newTier} (Proportional Scaling).`);
        }
        return;
      }
    }
    this.syncBenchmarkDefaults();
  },

  handleTypeChange() {
    const newType = document.getElementById('form-adv-type')?.value || 'Standard';
    if (this.creatorMode === 'cloned' && this.creatorOriginItem && this.creatorOriginItem.type !== newType) {
      this.creatorOriginItem.type = newType;
      const currentTier = parseInt(document.getElementById('form-adv-tier')?.value, 10) || 1;
      const scaled = this.scaleItemToTier(this.creatorOriginItem, currentTier);
      if (scaled) {
        this.populateCreatorFields(scaled);
        this.updateCreatorOriginBanner();
        this.updateCreatorPreview();
        return;
      }
    }
    this.syncBenchmarkDefaults();
  },

  updateCreatorOriginBanner() {
    const banner = document.getElementById('creator-origin-banner');
    const titleEl = document.getElementById('origin-banner-title');
    if (!banner || !titleEl) return;

    if (this.creatorMode === 'cloned' && this.creatorOriginItem) {
      const origTier = this.creatorOriginItem.tier !== undefined ? this.creatorOriginItem.tier : 1;
      const currentTier = document.getElementById('form-adv-tier')?.value || '1';
      const isScaled = String(origTier) !== String(currentTier);

      titleEl.innerHTML = `Cloned from <strong>"${this.creatorOriginItem.name}"</strong> (Original: Tier ${origTier} ${this.creatorOriginItem.type || 'Standard'})${isScaled ? ` &bull; <span class="badge bg-gold text-dark fw-bold">Scaled to Tier ${currentTier}</span>` : ''}`;
      banner.classList.remove('d-none');
    } else {
      banner.classList.add('d-none');
    }
  },

  resetCreatorToOrigin() {
    if (!this.creatorOriginItem) return;
    this.populateCreatorFields(this.creatorOriginItem);
    this.updateCreatorOriginBanner();
    this.updateCreatorPreview();
    this.showToast(`Restored original cloned stats for "${this.creatorOriginItem.name}".`);
  },

  detachCreatorOrigin() {
    this.creatorOriginItem = null;
    this.creatorMode = 'blank';
    this.updateCreatorOriginBanner();
    this.updateCreatorPreview();
    this.showToast('Detached template: Creator is now in Blank Slate Preset mode.');
  },

  syncBenchmarkDefaults(forceOverride = false) {
    const tier = parseInt(document.getElementById('form-adv-tier')?.value, 10) || 1;
    const type = document.getElementById('form-adv-type')?.value || 'Standard';

    const rkRole = RIGHTKNIGHT_BENCHMARKS[type];
    const benchmark = rkRole ? (rkRole.tiers[tier] || rkRole.tiers[1]) : (DH_BENCHMARKS.ARCHETYPES[type]?.tiers[tier] || DH_BENCHMARKS.ARCHETYPES[type]?.tiers[1]);
    if (!benchmark) return;

    const diffInput = document.getElementById('form-adv-diff');
    const majInput = document.getElementById('form-adv-thresh-major');
    const sevInput = document.getElementById('form-adv-thresh-severe');
    const hpInput = document.getElementById('form-adv-hp');
    const stressInput = document.getElementById('form-adv-stress');
    const atkBonusInput = document.getElementById('form-adv-atk-bonus');
    const atkRangeInput = document.getElementById('form-adv-atk-range');
    const atkDmgInput = document.getElementById('form-adv-atk-damage');
    const minionInput = document.getElementById('form-adv-minion-num');

    if (diffInput) diffInput.value = benchmark.diff;
    if (majInput) majInput.value = benchmark.major === 'None' || benchmark.major === '—' ? 0 : benchmark.major;
    if (sevInput) sevInput.value = benchmark.severe === 'None' || benchmark.severe === '—' ? 0 : benchmark.severe;
    if (hpInput) hpInput.value = benchmark.hp;
    if (stressInput) stressInput.value = benchmark.stress;
    if (atkBonusInput) atkBonusInput.value = benchmark.atkBonus;
    if (atkRangeInput) atkRangeInput.value = rkRole ? rkRole.range : (benchmark.range || 'Melee');
    if (atkDmgInput) atkDmgInput.value = benchmark.dice ? benchmark.dice.average : benchmark.dmg;
    if (minionInput) minionInput.value = benchmark.minionRule || 0;

    // Toggle Colossus UI & populate default segments
    const isColossus = (type === 'Colossus');
    const isEnv = (type === 'Environment');
    const colossusFrameworkSec = document.getElementById('section-colossus-framework-params');
    const colossusSegmentsSec = document.getElementById('section-colossus-segments');
    const envSection = document.getElementById('section-environment-params');
    const atkSection = document.getElementById('section-primary-attacks');
    const combatGroups = document.querySelectorAll('.group-adversary-combat');
    const motiveLabel = document.getElementById('label-adv-motive');

    if (isColossus) {
      const sizeInput = document.getElementById('form-colossus-size');
      if (sizeInput) sizeInput.value = benchmark.size || '95 ft. tall, 60 ft. wide';
      if (benchmark.defaultSegments && (!this.creatorColossusSegments || this.creatorColossusSegments.length === 0 || forceOverride)) {
        this.creatorColossusSegments = JSON.parse(JSON.stringify(benchmark.defaultSegments));
      }
      this.renderColossusSegments();
    } else {
      this.creatorColossusSegments = [];
    }

    if (colossusFrameworkSec) colossusFrameworkSec.classList.toggle('d-none', !isColossus);
    if (colossusSegmentsSec) colossusSegmentsSec.classList.toggle('d-none', !isColossus);
    if (envSection) envSection.classList.toggle('d-none', !isEnv);
    if (atkSection) atkSection.classList.toggle('d-none', isEnv);
    combatGroups.forEach(el => el.classList.toggle('d-none', isEnv));
    if (motiveLabel) motiveLabel.textContent = isEnv ? 'Sensory Description & Atmosphere' : (isColossus ? 'Titanic Motive & Concept' : 'Motive & Concept');

    this.updateCreatorPreview();
    if (forceOverride) this.showToast(`Loaded ${type} Tier ${tier} benchmarks.`);
  },

  renderCreatorBalanceCheck(currentStats) {
    const container = document.getElementById('creator-balance-check-container');
    if (!container) return;

    const type = currentStats.type || 'Standard';
    const tier = currentStats.tier || 1;
    const isEnv = (type === 'Environment');
    const isColossus = (type === 'Colossus' || currentStats.isColossus);

    if (isEnv) {
      container.innerHTML = `
        <div class="card og-statblock-alt border-secondary shadow-sm p-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="small fw-bold text-gold text-uppercase">Environment Balance Verification</span>
            <span class="badge bg-success bg-opacity-25 text-success border border-success">Scene / Hazard</span>
          </div>
          <p class="small text-muted mb-0">Environments do not use combat HP/damage thresholds. Difficulty is calibrated for Tier ${tier} exploration and hazard reaction checks.</p>
        </div>
      `;
      return;
    }

    if (isColossus) {
      const compositeBP = this.calculateColossusBP();
      const segCount = (this.creatorColossusSegments || []).length;
      const totalUnits = (this.creatorColossusSegments || []).reduce((acc, s) => acc + (s.quantity || 1), 0);

      container.innerHTML = `
        <div class="card og-statblock-alt border-gold shadow-sm p-3">
          <div class="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom border-secondary flex-wrap gap-2">
            <span class="small fw-bold text-gold text-uppercase d-flex align-items-center gap-1">
              <span>👑</span> Colossus Composite Balance Architecture
            </span>
            <span class="badge bg-warning text-dark fw-bold">Tier ${tier} Colossus &bull; ${compositeBP} Total BP</span>
          </div>
          <div class="row g-2 small mb-2">
            <div class="col-4">
              <div class="p-1 rounded bg-dark border border-subtle text-center">
                <div class="text-muted" style="font-size: 0.68rem;">Framework Thresholds</div>
                <div class="fw-bold text-light">${currentStats.major} / ${currentStats.severe}</div>
                <div class="text-muted" style="font-size: 0.65rem;">Stress: ${currentStats.stress || 6}</div>
              </div>
            </div>
            <div class="col-4">
              <div class="p-1 rounded bg-dark border border-subtle text-center">
                <div class="text-muted" style="font-size: 0.68rem;">Body Architecture</div>
                <div class="fw-bold text-gold">${segCount} Segments</div>
                <div class="text-muted" style="font-size: 0.65rem;">${totalUnits} Total Units</div>
              </div>
            </div>
            <div class="col-4">
              <div class="p-1 rounded bg-dark border border-subtle text-center">
                <div class="text-muted" style="font-size: 0.68rem;">Composite BP</div>
                <div class="fw-bold text-warning">${compositeBP} BP</div>
                <div class="text-muted" style="font-size: 0.65rem;">Base 2 BP + Segments</div>
              </div>
            </div>
          </div>
          <div class="small text-muted" style="font-size: 0.72rem;">
            🧬 Multi-Segment Architecture: Framework sets party damage thresholds and global stress; linked segments hold individual difficulty, HP pools, and unique attacks.
          </div>
        </div>
      `;
      return;
    }

    const rkRole = RIGHTKNIGHT_BENCHMARKS[type];
    const bench = rkRole ? (rkRole.tiers[tier] || rkRole.tiers[1]) : (DH_BENCHMARKS.ARCHETYPES[type]?.tiers[tier] || DH_BENCHMARKS.ARCHETYPES[type]?.tiers[1]);
    if (!bench) {
      container.innerHTML = '';
      return;
    }

    // Parse current damage average
    let currentAvgDmg = 0;
    const dmgStr = (currentStats.attack?.damage || '').trim();
    const match = dmgStr.match(/^(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);
    if (match) {
      const count = parseInt(match[1], 10);
      const size = parseInt(match[2], 10);
      const sign = match[3] || '+';
      const flat = match[4] ? parseInt(match[4], 10) * (sign === '-' ? -1 : 1) : 0;
      currentAvgDmg = (count * (size + 1) / 2) + flat;
    } else if (!isNaN(parseInt(dmgStr, 10))) {
      currentAvgDmg = parseInt(dmgStr, 10);
    }

    const diffDelta = currentStats.diff - bench.diff;
    const hpDelta = currentStats.hp - bench.hp;
    const targetDmgStr = bench.targetDmg || `${bench.dice?.average || bench.dmg}`;

    const formatDelta = (d, suffix = '') => {
      if (d === 0) return `<span class="badge bg-secondary">Baseline</span>`;
      if (d > 0) return `<span class="badge bg-warning text-dark">+${d}${suffix}</span>`;
      return `<span class="badge bg-info text-dark">${d}${suffix}</span>`;
    };

    container.innerHTML = `
      <div class="card og-statblock-alt border-gold shadow-sm p-3">
        <div class="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom border-secondary flex-wrap gap-2">
          <span class="small fw-bold text-gold text-uppercase d-flex align-items-center gap-1">
            <span>⚖️</span> Benchmark Balance Verification
          </span>
          <span class="badge bg-dark border border-gold text-gold">Tier ${tier} ${type} Standard</span>
        </div>

        <div class="row g-2 small mb-2">
          <div class="col-6 col-md-3">
            <div class="p-1 rounded bg-dark border border-subtle text-center">
              <div class="text-muted" style="font-size: 0.68rem;">Difficulty</div>
              <div class="fw-bold text-light">${currentStats.diff}</div>
              <div style="font-size: 0.65rem;">${formatDelta(diffDelta)}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-1 rounded bg-dark border border-subtle text-center">
              <div class="text-muted" style="font-size: 0.68rem;">Thresholds</div>
              <div class="fw-bold text-light">${currentStats.major}/${currentStats.severe}</div>
              <div class="text-muted" style="font-size: 0.65rem;">Base: ${bench.major}/${bench.severe}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-1 rounded bg-dark border border-subtle text-center">
              <div class="text-muted" style="font-size: 0.68rem;">HP / Stress</div>
              <div class="fw-bold text-light">${currentStats.hp} / ${currentStats.stress}</div>
              <div style="font-size: 0.65rem;">${formatDelta(hpDelta, ' HP')}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-1 rounded bg-dark border border-subtle text-center">
              <div class="text-muted" style="font-size: 0.68rem;">Avg Damage</div>
              <div class="fw-bold text-gold">${currentAvgDmg ? currentAvgDmg.toFixed(1) : '—'}</div>
              <div class="text-muted" style="font-size: 0.65rem;">Target: ${targetDmgStr}</div>
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-between pt-1 border-top border-subtle flex-wrap gap-2">
          <span class="small text-muted" style="font-size: 0.72rem;">
            ${this.creatorMode === 'cloned' ? '🧬 <strong>Cloned Mode</strong>: Scaling maintains proportional offsets & signature dice.' : '✨ <strong>Blank Slate Mode</strong>: Using standard archetype presets.'}
          </span>
          ${this.creatorMode === 'cloned' ? `
            <button class="btn btn-xs btn-outline-warning py-0 px-1" id="btn-balance-restore-origin" style="font-size: 0.68rem;">
              ↺ Reset to Origin
            </button>
          ` : ''}
        </div>
      </div>
    `;

    document.getElementById('btn-balance-restore-origin')?.addEventListener('click', () => {
      this.resetCreatorToOrigin();
    });
  },

  openPresetModal() {
    const modalEl = document.getElementById('modal-load-preset');
    if (!modalEl) return;
    const currentTier = document.getElementById('form-adv-tier')?.value || '1';
    const currentType = document.getElementById('form-adv-type')?.value || 'Bruiser';
    const tierSel = document.getElementById('preset-select-tier');
    const typeSel = document.getElementById('preset-select-type');
    if (tierSel && tierSel.querySelector(`option[value="${currentTier}"]`)) {
      tierSel.value = currentTier;
    }
    if (typeSel && typeSel.querySelector(`option[value="${currentType}"]`)) {
      typeSel.value = currentType;
    }
    this.updatePresetModalPreview();
    if (window.bootstrap) {
      new window.bootstrap.Modal(modalEl).show();
    }
  },

  updatePresetModalPreview() {
    const type = document.getElementById('preset-select-type')?.value || 'Bruiser';
    const tier = parseInt(document.getElementById('preset-select-tier')?.value, 10) || 1;
    const consistency = document.getElementById('preset-select-consistency')?.value || 'average';

    const roleData = RIGHTKNIGHT_BENCHMARKS[type];
    if (!roleData) return;
    const tierData = roleData.tiers[tier] || roleData.tiers[1];

    const consistencyGroup = document.getElementById('preset-group-consistency');
    if (consistencyGroup) {
      consistencyGroup.classList.toggle('d-none', type === 'Environment' || type === 'Colossus');
    }

    const diceFormula = tierData.dice[consistency] || tierData.dice.average;
    const hintEl = document.getElementById('preset-dice-hint');
    if (hintEl) {
      if (type === 'Environment') {
        hintEl.innerHTML = '<em>Environments do not use weapon attacks or damage dice.</em>';
      } else if (type === 'Colossus') {
        const segCount = tierData.defaultSegments ? tierData.defaultSegments.length : 4;
        hintEl.innerHTML = `Titanic Framework: <strong>${tierData.size}</strong> &bull; Pre-loads <strong>${segCount} modular body segments</strong>`;
      } else if (type === 'Minion') {
        const consistencyLabel = consistency === 'low' ? 'Low (+1 Flat / Heavy)' : consistency === 'high' ? 'High (-1 Flat / Light)' : 'Average (Baseline)';
        hintEl.innerHTML = `Minion Static Damage: <strong class="text-gold">${diceFormula}</strong> (${consistencyLabel}) &bull; Overkill Rule: <strong>Minion (${tierData.minionRule})</strong> (Target Dmg: ${tierData.targetDmg})`;
      } else {
        const consistencyLabel = consistency === 'low' ? 'Low (Heavy Hits)' : consistency === 'high' ? 'High (Steady / Flat Bonus)' : 'Average (Balanced)';
        hintEl.innerHTML = `Consistency: <strong>${consistencyLabel}</strong> &bull; Dice Pool: <strong class="text-gold">${diceFormula}</strong> (Target Damage Avg: ${tierData.targetDmg})`;
      }
    }

    const previewEl = document.getElementById('preset-specs-preview');
    if (previewEl) {
      if (type === 'Environment') {
        previewEl.innerHTML = `
          <div class="d-flex justify-content-between text-secondary mb-1">
            <span>Difficulty: <strong class="text-gold">${tierData.diff}</strong></span>
            <span>Category: <strong class="text-light">Exploration / Scene</strong></span>
            <span>Battle Points: <strong class="text-success">0 BP</strong></span>
          </div>
          <div class="text-muted small mt-1">Pre-populates 2 thematic environment hazards & moves.</div>
        `;
      } else if (type === 'Colossus') {
        const segBadges = (tierData.defaultSegments || []).map(s => `<span class="badge bg-dark border border-gold text-gold me-1 mb-1">${s.name} (Diff ${s.diff}, ${s.hp} HP)</span>`).join(' ');
        previewEl.innerHTML = `
          <div class="d-flex justify-content-between text-secondary mb-2 border-bottom border-secondary pb-1 flex-wrap gap-2">
            <span>Framework Maj: <strong class="text-gold">${tierData.major}</strong></span>
            <span>Framework Sev: <strong class="text-danger">${tierData.severe}</strong></span>
            <span>Stress: <strong class="text-warning">${tierData.stress}</strong></span>
            <span>Size: <strong class="text-light">${tierData.size}</strong></span>
          </div>
          <div class="small text-muted mb-1">
            <strong class="text-light">Default Linked Segments:</strong> ${segBadges}
          </div>
        `;
      } else {
        const featureBadges = tierData.features.map(f => `<span class="badge bg-secondary me-1 mb-1">${f.name} (${f.type})</span>`).join(' ');
        const expBadges = (roleData.experiences[tier] || []).map(e => `<span class="badge bg-dark border border-secondary me-1 mb-1">${e}</span>`).join(' ');
        previewEl.innerHTML = `
          <div class="d-flex justify-content-between text-secondary mb-2 border-bottom border-secondary pb-1 flex-wrap gap-2">
            <span>Diff: <strong class="text-gold">${tierData.diff}</strong></span>
            <span>Maj: <strong>${tierData.major}</strong></span>
            <span>Sev: <strong>${tierData.severe}</strong></span>
            <span>HP: <strong class="text-danger">${tierData.hp}</strong></span>
            <span>Stress: <strong class="text-warning">${tierData.stress}</strong></span>
            <span>ATK: <strong class="text-light">+${tierData.atkBonus}</strong></span>
          </div>
          <div class="small text-muted mb-1">
            <strong class="text-light">Signature Moves:</strong> ${featureBadges}
          </div>
          <div class="small text-muted">
            <strong class="text-light">Thematic Experiences:</strong> ${expBadges}
          </div>
        `;
      }
    }
  },

  generateFromPreset() {
    const type = document.getElementById('preset-select-type')?.value || 'Bruiser';
    const tier = parseInt(document.getElementById('preset-select-tier')?.value, 10) || 1;
    const consistency = document.getElementById('preset-select-consistency')?.value || 'average';

    const roleData = RIGHTKNIGHT_BENCHMARKS[type];
    if (!roleData) return;
    const tierData = roleData.tiers[tier] || roleData.tiers[1];

    // Close Modal
    const modalEl = document.getElementById('modal-load-preset');
    if (modalEl && window.bootstrap) {
      const inst = window.bootstrap.Modal.getInstance(modalEl);
      if (inst) inst.hide();
    }

    // Populate Creator form fields
    const nameInput = document.getElementById('form-adv-name');
    const tierInput = document.getElementById('form-adv-tier');
    const typeInput = document.getElementById('form-adv-type');
    const descInput = document.getElementById('form-adv-description');
    const motiveInput = document.getElementById('form-adv-motive');
    const diffInput = document.getElementById('form-adv-diff');
    const majInput = document.getElementById('form-adv-thresh-major');
    const sevInput = document.getElementById('form-adv-thresh-severe');
    const hpInput = document.getElementById('form-adv-hp');
    const stressInput = document.getElementById('form-adv-stress');
    const minionInput = document.getElementById('form-adv-minion-num');

    const atkNameInput = document.getElementById('form-adv-atk-name');
    const atkBonusInput = document.getElementById('form-adv-atk-bonus');
    const atkRangeInput = document.getElementById('form-adv-atk-range');
    const atkDamageInput = document.getElementById('form-adv-atk-damage');
    const atkTypeInput = document.getElementById('form-adv-atk-damagetype');
    const expInput = document.getElementById('form-adv-experiences');

    if (nameInput) {
      if (!nameInput.value || !nameInput.value.trim() || nameInput.value.includes('(Tier')) {
        nameInput.value = `${type} (Tier ${tier})`;
      }
    }
    if (tierInput) tierInput.value = tier;
    if (typeInput) typeInput.value = type;
    if (descInput) descInput.value = roleData.description || roleData.summary || '';
    if (motiveInput) motiveInput.value = roleData.motive;
    if (diffInput) diffInput.value = tierData.diff;
    if (majInput) majInput.value = (tierData.major === 'None' || tierData.major === '—') ? 0 : tierData.major;
    if (sevInput) sevInput.value = (tierData.severe === 'None' || tierData.severe === '—') ? 0 : tierData.severe;
    if (hpInput) hpInput.value = tierData.hp;
    if (stressInput) stressInput.value = tierData.stress;
    if (minionInput) minionInput.value = tierData.minionRule || 0;

    const chosenDice = tierData.dice ? (tierData.dice[consistency] || tierData.dice.average) : '1d10+1';
    if (atkNameInput) atkNameInput.value = roleData.attackName || 'Standard Strike';
    if (atkBonusInput) atkBonusInput.value = tierData.atkBonus;
    if (atkRangeInput) atkRangeInput.value = roleData.range || 'Melee';
    if (atkDamageInput) atkDamageInput.value = chosenDice;
    if (atkTypeInput) atkTypeInput.value = (type === 'Support') ? 'Magic' : 'Physical';

    const exps = roleData.experiences[tier] || roleData.experiences[1] || [];
    if (expInput) expInput.value = exps.join(', ');

    // Pre-populate Features in #features-container
    const container = document.getElementById('features-container');
    if (container) {
      container.innerHTML = '';
      tierData.features.forEach(f => {
        this.addFeatureRow(f.name, f.type, f.text);
      });
    }

    // Colossus specific
    const isColossus = (type === 'Colossus');
    const isEnv = (type === 'Environment');
    const colossusFrameworkSec = document.getElementById('section-colossus-framework-params');
    const colossusSegmentsSec = document.getElementById('section-colossus-segments');
    const envSection = document.getElementById('section-environment-params');
    const atkSection = document.getElementById('section-primary-attacks');
    const combatGroups = document.querySelectorAll('.group-adversary-combat');
    const motiveLabel = document.getElementById('label-adv-motive');

    if (isColossus) {
      const sizeInput = document.getElementById('form-colossus-size');
      if (sizeInput) sizeInput.value = tierData.size || '95 ft. tall, 60 ft. wide';
      if (tierData.defaultSegments) {
        this.creatorColossusSegments = JSON.parse(JSON.stringify(tierData.defaultSegments));
      }
      this.renderColossusSegments();
    } else {
      this.creatorColossusSegments = [];
    }

    if (isEnv) {
      const envSubtype = document.getElementById('form-env-subtype');
      const envImpulses = document.getElementById('form-env-impulses');
      const envAdversaries = document.getElementById('form-env-adversaries');
      if (envSubtype) envSubtype.value = 'Exploration';
      if (envImpulses) envImpulses.value = roleData.impulses || '';
      if (envAdversaries) envAdversaries.value = roleData.suggestedAdversaries || '';
    }

    if (colossusFrameworkSec) colossusFrameworkSec.classList.toggle('d-none', !isColossus);
    if (colossusSegmentsSec) colossusSegmentsSec.classList.toggle('d-none', !isColossus);
    if (envSection) envSection.classList.toggle('d-none', !isEnv);
    if (atkSection) atkSection.classList.toggle('d-none', isEnv);
    combatGroups.forEach(el => el.classList.toggle('d-none', isEnv));
    if (motiveLabel) motiveLabel.textContent = isEnv ? 'Sensory Description & Atmosphere' : (isColossus ? 'Titanic Motive & Concept' : 'Motive & Concept');

    this.creatorOriginItem = null;
    this.creatorMode = 'blank';
    this.updateCreatorOriginBanner();
    this.updateCreatorPreview();
    const consistencyText = consistency === 'low' ? 'Low Consistency' : consistency === 'high' ? 'High Consistency' : 'Average Consistency';
    this.showToast(`Generated Tier ${tier} ${type} (${consistencyText})`);
  },

  clearCreatorForm() {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    setVal('form-adv-name', '');
    setVal('form-adv-tier', '1');
    setVal('form-adv-type', 'Standard');
    setVal('form-adv-description', '');
    setVal('form-adv-motive', '');
    setVal('form-adv-diff', '');
    setVal('form-adv-thresh-major', '');
    setVal('form-adv-thresh-severe', '');
    setVal('form-adv-hp', '');
    setVal('form-adv-stress', '');
    setVal('form-adv-minion-num', '');
    setVal('form-adv-atk-name', '');
    setVal('form-adv-atk-bonus', '');
    setVal('form-adv-atk-range', 'Melee');
    setVal('form-adv-atk-damagetype', 'Physical');
    setVal('form-adv-atk-damage', '');
    setVal('form-adv-experiences', '');

    // Colossus specific
    setVal('form-colossus-size', '');
    this.creatorColossusSegments = [];
    this.renderColossusSegments();

    // Environment specific fields
    setVal('form-env-subtype', 'Exploration');
    setVal('form-env-impulses', '');
    setVal('form-env-adversaries', '');

    // Clear all feature rows for a true blank slate
    const container = document.getElementById('features-container');
    if (container) container.innerHTML = '';

    // Clear custom image and file input
    this.creatorCustomImageData = null;
    setVal('form-adv-token-file', '');

    // Reset visibility to Standard Adversary mode
    const colossusFrameworkSec = document.getElementById('section-colossus-framework-params');
    const colossusSegmentsSec = document.getElementById('section-colossus-segments');
    const envSection = document.getElementById('section-environment-params');
    const atkSection = document.getElementById('section-primary-attacks');
    const combatGroups = document.querySelectorAll('.group-adversary-combat');
    const motiveLabel = document.getElementById('label-adv-motive');

    if (colossusFrameworkSec) colossusFrameworkSec.classList.add('d-none');
    if (colossusSegmentsSec) colossusSegmentsSec.classList.add('d-none');
    if (envSection) envSection.classList.add('d-none');
    if (atkSection) atkSection.classList.remove('d-none');
    combatGroups.forEach(el => el.classList.remove('d-none'));
    if (motiveLabel) motiveLabel.textContent = 'Motive & Concept';

    this.creatorOriginItem = null;
    this.creatorMode = 'blank';
    this.editingCustomIdx = null;
    this.editingCustomId = null;
    this.pendingCustomAdvSave = null;
    this.pendingCustomAdvTargetIdx = -1;
    this.updateCreatorOriginBanner();
    this.updateCreatorPreview();
    this.showToast('Cleared all fields to a blank slate.');
  },

  addDefaultFeatures() {
    const container = document.getElementById('features-container');
    if (!container) return;
    container.innerHTML = '';
  },

  addFeatureRow(name = '', type = 'Action', text = '', cost = 'None') {
    const container = document.getElementById('features-container');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'feature-row p-2 rounded bg-dark border border-subtle d-flex flex-column gap-1';
    div.innerHTML = `
      <div class="d-flex gap-2 flex-wrap">
        <input type="text" class="form-control form-control-sm feature-name" placeholder="Move Name" value="${(name || '').replace(/"/g, '&quot;')}" style="flex: 2; min-width: 140px;">
        <select class="form-select form-select-sm feature-type" style="flex: 1; min-width: 100px;">
          <option value="Action" ${type === 'Action' || !type ? 'selected' : ''}>Action</option>
          <option value="Passive" ${type === 'Passive' ? 'selected' : ''}>Passive</option>
          <option value="Reaction" ${type === 'Reaction' ? 'selected' : ''}>Reaction</option>
        </select>
        <select class="form-select form-select-sm feature-cost" style="flex: 1; min-width: 100px;">
          <option value="None" ${cost === 'None' || !cost ? 'selected' : ''}>Cost: None</option>
          <option value="Fear" ${cost === 'Fear' ? 'selected' : ''}>💀 Fear</option>
          <option value="Stress" ${cost === 'Stress' ? 'selected' : ''}>⚡ Stress</option>
        </select>
        <button type="button" class="btn btn-xs btn-outline-danger btn-remove-feature" title="Remove move">&times;</button>
      </div>
      <textarea class="form-control form-control-sm feature-text" rows="2" placeholder="Feature mechanics, Stress or Fear costs...">${(text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
    `;
    div.querySelector('.btn-remove-feature')?.addEventListener('click', () => {
      div.remove();
      this.updateCreatorPreview();
    });
    ['input', 'change'].forEach(evt => {
      div.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener(evt, () => this.updateCreatorPreview());
      });
    });
    container.appendChild(div);
    this.updateCreatorPreview();
  },

  getCreatorFormData() {
    const name = document.getElementById('form-adv-name')?.value.trim() || 'Custom Adversary';
    const tier = parseInt(document.getElementById('form-adv-tier')?.value, 10) || 1;
    const type = document.getElementById('form-adv-type')?.value || 'Standard';
    const isEnv = (type === 'Environment');
    const isColossus = (type === 'Colossus');

    const subtype = isEnv ? (document.getElementById('form-env-subtype')?.value || 'Exploration') : undefined;
    const impulses = isEnv ? (document.getElementById('form-env-impulses')?.value.trim() || '') : undefined;
    const suggestedAdversaries = isEnv ? (document.getElementById('form-env-adversaries')?.value.trim() || '') : undefined;

    const size = isColossus ? (document.getElementById('form-colossus-size')?.value.trim() || '95 ft. tall, 60 ft. wide') : undefined;

    const description = document.getElementById('form-adv-description')?.value.trim() || '';
    const motive = document.getElementById('form-adv-motive')?.value.trim() || '';
    const diff = parseInt(document.getElementById('form-adv-diff')?.value, 10) || 12;
    const major = isEnv ? '—' : (parseInt(document.getElementById('form-adv-thresh-major')?.value, 10) || 0);
    const severe = isEnv ? '—' : (parseInt(document.getElementById('form-adv-thresh-severe')?.value, 10) || 0);
    const hp = isEnv ? 0 : (isColossus ? 0 : Math.max(1, parseInt(document.getElementById('form-adv-hp')?.value, 10) || 5));
    const stress = isEnv ? 0 : Math.max(0, parseInt(document.getElementById('form-adv-stress')?.value, 10) || (isColossus ? 6 : 3));
    const minionRule = isEnv ? 0 : (parseInt(document.getElementById('form-adv-minion-num')?.value, 10) || 0);

    const atkName = document.getElementById('form-adv-atk-name')?.value.trim() || 'Natural Weapon';
    const rawAtkBonus = document.getElementById('form-adv-atk-bonus')?.value;
    const atkBonus = (rawAtkBonus !== '' && rawAtkBonus !== null && rawAtkBonus !== undefined && !isNaN(parseInt(rawAtkBonus, 10)))
      ? parseInt(rawAtkBonus, 10)
      : 0;
    const atkRange = document.getElementById('form-adv-atk-range')?.value || 'Melee';
    const rawAtkDmg = document.getElementById('form-adv-atk-damage')?.value;
    const atkDamage = (rawAtkDmg !== undefined && rawAtkDmg !== null) ? rawAtkDmg.trim() : '';
    const atkType = document.getElementById('form-adv-atk-damagetype')?.value || 'Physical';

    const expString = document.getElementById('form-adv-experiences')?.value.trim() || '';
    const experiences = (!isEnv && expString) ? expString.split(',').map(s => s.trim()).filter(Boolean) : [];

    const features = [];
    document.querySelectorAll('#features-container .feature-row').forEach(row => {
      const fName = row.querySelector('.feature-name')?.value.trim();
      const fType = row.querySelector('.feature-type')?.value || 'Action';
      const fCost = row.querySelector('.feature-cost')?.value || 'None';
      const fText = row.querySelector('.feature-text')?.value.trim();
      if (fName && fText) {
        features.push({ name: fName, type: fType, cost: fCost, text: fText });
      }
    });

    if (isColossus) {
      this.syncColossusSegmentInputs();
    }

    const tokenStyle = document.getElementById('form-adv-token-style')?.value;
    const tokenImg = (tokenStyle === 'upload' && this.creatorCustomImageData)
      ? this.creatorCustomImageData
      : TokenRenderer.generate(name, type, tier);

    return {
      id: `custom-${Date.now()}`,
      name,
      tier,
      type,
      subtype,
      size,
      description,
      summary: description,
      isEnvironment: isEnv,
      isColossus: isColossus,
      segments: isColossus ? JSON.parse(JSON.stringify(this.creatorColossusSegments || [])) : undefined,
      impulses,
      suggestedAdversaries,
      motive,
      diff,
      major: isEnv ? '—' : (major === 0 ? 'None' : major),
      severe: isEnv ? '—' : (severe === 0 ? 'None' : severe),
      hp,
      stress,
      minionRule,
      attack: (isEnv || isColossus || atkType === 'None' || !atkDamage || atkDamage === '—' || atkDamage.toLowerCase() === 'none')
        ? (isEnv ? { name: '—', bonus: 0, range: '—', damage: '—', type: '—' } : undefined)
        : {
            name: atkName || 'Basic Attack',
            bonus: atkBonus,
            range: atkRange,
            damage: atkDamage,
            type: atkType
          },
      experiences,
      features,
      tokenImg,
      markedHP: 0,
      markedStress: 0,
      trackers: [{ id: 1, markedHP: 0, markedStress: 0 }]
    };
  },

  updateCreatorPreview() {
    const previewContainer = document.getElementById('live-preview-container');
    if (!previewContainer) return;

    const adv = this.getCreatorFormData();
    const tokenSrc = adv.tokenImg;

    let featuresHTML = '';
    if (adv.features && adv.features.length > 0) {
      featuresHTML = adv.features.map(f => {
        const cost = f.cost || 'None';
        let costBadge = '';
        if (cost === 'Fear') {
          costBadge = '<span class="badge bg-warning text-dark border border-warning ms-1 py-0" style="font-size: 0.62rem;">💀 Fear</span>';
        } else if (cost === 'Stress') {
          costBadge = '<span class="badge bg-danger text-light border border-danger ms-1 py-0" style="font-size: 0.62rem;">⚡ Stress</span>';
        } else if (cost === 'Hope') {
          costBadge = '<span class="badge bg-info text-dark border border-info ms-1 py-0" style="font-size: 0.62rem;">✨ Hope</span>';
        }
        return `
          <div class="feature-item mb-1">
            <span class="feature-type-tag feature-type-${(f.type || 'action').toLowerCase()}">${f.type || 'Action'}</span>
            ${costBadge}
            <strong>${f.name}:</strong> <span>${f.text}</span>
          </div>
        `;
      }).join('');
    }

    // Dedicated Environment Preview Layout
    if (adv.isEnvironment) {
      previewContainer.innerHTML = `
        <div class="card og-statblock border-gold shadow">
          <div class="p-3 border-bottom border-subtle d-flex align-items-center gap-3">
            <div class="adv-token-container" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
              <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
            </div>
            <div>
              <h5 class="adv-name m-0 text-gold">${adv.name}</h5>
              <div class="d-flex gap-1 align-items-center mt-1 flex-wrap">
                <span class="badge-tier">Tier ${adv.tier}</span>
                <span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50">Environment (${adv.subtype || 'Exploration'})</span>
                <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;">0 BP (Scene)</span>
              </div>
              ${adv.motive ? `<div class="adv-motive mt-1">${adv.motive}</div>` : ''}
            </div>
          </div>

          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center mb-2 p-2 rounded bg-dark border border-subtle">
              <span class="small text-secondary">Difficulty Rating:</span>
              <span class="fw-bold text-gold fs-6">${adv.diff}</span>
            </div>

            ${adv.impulses ? `
              <div class="p-2 mb-2 rounded bg-dark border border-subtle small">
                <strong class="text-gold">Impulses:</strong> <span>${adv.impulses}</span>
              </div>
            ` : ''}

            ${adv.suggestedAdversaries ? `
              <div class="p-2 mb-2 rounded bg-dark border border-subtle small text-muted">
                <strong class="text-light">Suggested Adversaries:</strong> <span>${adv.suggestedAdversaries}</span>
              </div>
            ` : ''}

            ${featuresHTML ? `<div class="mt-2 border-top border-subtle pt-2">${featuresHTML}</div>` : ''}
          </div>
        </div>
      `;
      this.renderCreatorBalanceCheck(adv);
      return;
    }

    // Dedicated Colossus Preview Layout
    if (adv.isColossus) {
      const compositeBP = this.calculateColossusBP();
      const segments = this.creatorColossusSegments || [];
      const segPillsHTML = segments.map(s => {
        const isFatal = s.isFatal || (s.features && s.features.some(f => f.name.toLowerCase().includes('fatal')));
        const qty = s.quantity || 1;
        const segFeats = s.features || [];
        const segFeatSnippet = segFeats.length > 0
          ? `<div class="mt-1 pt-1 border-top border-subtle small text-muted" style="font-size: 0.68rem;">${segFeats.map(f => `<span class="badge bg-dark border border-secondary text-light me-1">${f.name}</span>`).join('')}</div>`
          : '';

        const segHasAtk = Boolean(s.attack && (s.attack.damage || '').trim() && (s.attack.damage || '').trim() !== '—' && (s.attack.damage || '').trim().toLowerCase() !== 'none');
        return `
          <div class="p-2 rounded bg-dark border border-secondary">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-1">
              <div class="d-flex align-items-center gap-1">
                <span class="fw-bold text-light">${s.name || 'Segment'}${qty > 1 ? ` ×${qty}` : ''}</span>
                ${isFatal ? '<span class="badge bg-danger text-light py-0" style="font-size: 0.65rem;">FATAL</span>' : ''}
              </div>
              <div class="d-flex align-items-center gap-2 small">
                <span class="text-gold fw-bold">Diff ${s.diff || 14}</span>
                <span class="text-danger fw-bold">${s.hp || 5} HP/unit</span>
                ${segHasAtk ? `<span class="text-muted" style="font-size: 0.68rem;">${s.attack.name || 'Strike'} (${s.attack.damage})</span>` : '<span class="badge bg-secondary bg-opacity-25 text-muted" style="font-size: 0.65rem;">No Attack</span>'}
              </div>
            </div>
            ${segFeatSnippet}
          </div>
        `;
      }).join('');

      let expHTML = '';
      if (adv.experiences.length > 0) {
        expHTML = adv.experiences.map(e => `<span class="badge bg-secondary me-1 mb-1">${e}</span>`).join('');
      }

      previewContainer.innerHTML = `
        <div class="card og-statblock border-colossus-framework shadow">
          <!-- Colossus Framework Header -->
          <div class="p-3 border-bottom border-subtle d-flex align-items-center gap-3">
            <div class="adv-token-container" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
              <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
            </div>
            <div class="overflow-hidden" style="min-width: 0;">
              <h5 class="adv-name m-0 text-gold text-truncate">${adv.name}</h5>
              <div class="d-flex gap-1 align-items-center mt-1 flex-wrap">
                <span class="badge-tier">Tier ${adv.tier}</span>
                <span class="badge bg-warning text-dark fw-bold">👑 FRAMEWORK</span>
                ${adv.size ? `<span class="badge bg-dark border border-warning text-warning" style="font-size: 0.65rem;">Size: ${adv.size}</span>` : ''}
                <span class="badge bg-dark border border-gold text-gold fw-bold" style="font-size: 0.65rem;">${compositeBP} BP (Composite)</span>
              </div>
              ${adv.motive ? `<div class="adv-motive mt-1 text-truncate">${adv.motive}</div>` : ''}
            </div>
          </div>

          <!-- Colossus Framework Body -->
          <div class="p-3">
            <!-- Defensive Thresholds (No Difficulty pill) -->
            <div class="row g-2 mb-3">
              <div class="col-4">
                <div class="stat-pill">
                  <span class="stat-pill-label">Major Thresh</span>
                  <span class="stat-pill-val">${adv.major}</span>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-pill">
                  <span class="stat-pill-label">Severe Thresh</span>
                  <span class="stat-pill-val">${adv.severe}</span>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-pill">
                  <span class="stat-pill-label">Composite BP</span>
                  <span class="stat-pill-val text-gold">${compositeBP} BP</span>
                </div>
              </div>
            </div>

            <!-- Stress -->
            <div class="trackers-box mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <span class="small fw-bold text-warning text-uppercase">&#9670; Stress (${adv.stress || 6})</span>
                <span class="badge bg-dark border border-warning text-warning">${adv.stress || 6} Slots</span>
              </div>
            </div>

            <!-- Linked Segments Architecture List -->
            <div class="mb-3">
              <div class="small fw-bold text-gold text-uppercase mb-1 d-flex justify-content-between">
                <span>🔗 Linked Body Segments (${segments.length})</span>
                <span class="text-muted" style="font-size: 0.68rem;">Each segment has independent HP & Diff</span>
              </div>
              <div class="d-flex flex-column gap-1">
                ${segPillsHTML || '<div class="text-muted small">No segments configured yet.</div>'}
              </div>
            </div>

            ${expHTML ? `<div class="mb-2">${expHTML}</div>` : ''}
            ${featuresHTML ? `<div class="border-top border-subtle pt-2">${featuresHTML}</div>` : ''}
          </div>
        </div>
      `;

      this.renderCreatorBalanceCheck(adv);
      return;
    }

    let expHTML = '';
    if (adv.experiences.length > 0) {
      expHTML = adv.experiences.map(e => `<span class="badge bg-secondary me-1 mb-1">${e}</span>`).join('');
    }

    let hpPips = '';
    for (let i = 0; i < adv.hp; i++) {
      hpPips += `<span class="hp-pip" style="pointer-events: none;"></span>`;
    }

    let stressPips = '';
    for (let i = 0; i < adv.stress; i++) {
      stressPips += `<span class="stress-pip" style="pointer-events: none;"></span>`;
    }

    previewContainer.innerHTML = `
      <div class="card og-statblock border-gold shadow">
        <div class="p-3 border-bottom border-subtle d-flex align-items-center gap-3">
          <div class="adv-token-container" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
            <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
          </div>
          <div>
            <h5 class="adv-name m-0">${adv.name}</h5>
            <div class="d-flex gap-1 align-items-center mt-1">
              <span class="badge-tier">Tier ${adv.tier}</span>
              <span class="badge-role">${adv.type}</span>
            </div>
            ${adv.motive ? `<div class="adv-motive mt-1">${adv.motive}</div>` : ''}
          </div>
        </div>

        <div class="p-3">
          <div class="row g-2 mb-3">
            <div class="col-3">
              <div class="stat-pill">
                <span class="stat-pill-label">Difficulty</span>
                <span class="stat-pill-val text-gold">${adv.diff}</span>
              </div>
            </div>
            <div class="col-3">
              <div class="stat-pill">
                <span class="stat-pill-label">Major Thresh</span>
                <span class="stat-pill-val">${adv.major}</span>
              </div>
            </div>
            <div class="col-3">
              <div class="stat-pill">
                <span class="stat-pill-label">Severe Thresh</span>
                <span class="stat-pill-val">${adv.severe}</span>
              </div>
            </div>
            <div class="col-3">
              <div class="stat-pill">
                <span class="stat-pill-label">${adv.type === 'Minion' ? 'Overkill' : 'BP'}</span>
                <span class="stat-pill-val">${adv.type === 'Minion' ? adv.minionRule : (DH_BENCHMARKS.BP_COSTS[adv.type] || 1)}</span>
              </div>
            </div>
          </div>

          <div class="trackers-box mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="small fw-bold text-danger text-uppercase">&#9829; HP (${adv.hp})</span>
              <div class="pip-row">${hpPips}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <span class="small fw-bold text-warning text-uppercase">&#9670; Stress (${adv.stress})</span>
              <div class="pip-row">${stressPips}</div>
            </div>
          </div>

          ${adv.attack && (adv.attack.damage || '').trim() && (adv.attack.damage || '').trim() !== '—' && (adv.attack.damage || '').trim().toLowerCase() !== 'none' ? `
            <div class="attack-banner d-flex justify-content-between align-items-center mb-3">
              <div>
                <span class="fw-bold text-light">${adv.attack.name || 'Basic Attack'}</span>
                <div class="small text-muted">
                  ${adv.attack.bonus >= 0 ? `+${adv.attack.bonus}` : adv.attack.bonus} to hit &bull; ${adv.attack.range || 'Melee'} &bull; ${adv.attack.damage} ${adv.attack.type || 'Physical'}
                </div>
              </div>
              <span class="badge bg-primary">Ready</span>
            </div>
          ` : ''}

          ${expHTML ? `<div class="mb-2">${expHTML}</div>` : ''}
          ${featuresHTML ? `<div class="border-top border-subtle pt-2">${featuresHTML}</div>` : ''}
        </div>
      </div>
    `;

    this.renderCreatorBalanceCheck(adv);
  },

  async handleCreatorSubmit(saveToCompendiumOnly = false) {
    const adv = this.getCreatorFormData();

    if (saveToCompendiumOnly) {
      // Check if editing existing custom adversary or name match in custom library
      let targetIdx = -1;
      if (this.editingCustomIdx !== null && this.editingCustomIdx !== undefined && this.state.customAdversaries[this.editingCustomIdx]) {
        targetIdx = this.editingCustomIdx;
      } else if (this.editingCustomId) {
        targetIdx = this.state.customAdversaries.findIndex(ca => ca && ca.id === this.editingCustomId);
      } else {
        targetIdx = this.state.customAdversaries.findIndex(ca => ca && ca.name && ca.name.toLowerCase() === adv.name.toLowerCase());
      }

      if (targetIdx >= 0) {
        const existingItem = this.state.customAdversaries[targetIdx];
        this.openSaveCustomAdversaryModal(adv, targetIdx, existingItem);
        return;
      }

      await this.executeSaveCustomAdversary(adv, false);
      return;
    }

    if (adv.isColossus) {
      const groupId = 'colossus-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      
      // 1. Add Framework Card
      const framework = JSON.parse(JSON.stringify(adv));
      delete framework.attack;
      framework.colossusGroupId = groupId;
      framework.isColossusFramework = true;
      framework.markedHP = 0;
      framework.markedStress = 0;
      framework.trackers = [{ id: 1, markedHP: 0, markedStress: 0 }];
      this.state.roster.push(framework);

      // 2. Add each Segment Card
      if (adv.segments && Array.isArray(adv.segments)) {
        adv.segments.forEach(seg => {
          const segInstance = JSON.parse(JSON.stringify(seg));
          segInstance.colossusGroupId = groupId;
          segInstance.colossusParentName = adv.name;
          segInstance.isColossusSegment = true;
          segInstance.tier = adv.tier;
          segInstance.markedHP = 0;
          segInstance.markedStress = 0;
          const qty = segInstance.quantity || 1;
          segInstance.trackers = Array.from({ length: qty }, (_, q) => ({
            id: q + 1,
            markedHP: 0,
            markedStress: 0
          }));
          this.state.roster.push(segInstance);
        });
      }

      this.saveState();
      this.renderRoster();
      this.renderHUD();
      this.switchTab('tab-encounter');
      this.showToast(`Added Titanic Colossus "${adv.name}" and ${adv.segments?.length || 0} segments to Encounter!`);
      return;
    }

    this.state.roster.push(adv);
    this.saveState();
    this.renderRoster();
    this.renderHUD();
    this.switchTab('tab-encounter');
    this.showToast(`Added "${adv.name}" to Active Encounter!`);
  },

  openSaveCustomAdversaryModal(adv, targetIdx, existingItem) {
    this.pendingCustomAdvSave = adv;
    this.pendingCustomAdvTargetIdx = targetIdx;

    const infoMsgEl = document.getElementById('save-custom-info-msg');
    if (infoMsgEl) {
      infoMsgEl.innerHTML = `You are currently editing <strong class="text-gold">${existingItem.name || 'Custom Adversary'}</strong>.`;
    }

    const modalEl = document.getElementById('modal-save-custom-adversary');
    if (modalEl) {
      if (window.bootstrap && window.bootstrap.Modal) {
        try {
          const inst = window.bootstrap.Modal.getOrCreateInstance(modalEl);
          inst.show();
        } catch (e) {
          console.warn('Bootstrap modal show fallback:', e);
          modalEl.classList.add('show');
          modalEl.style.display = 'block';
        }
      } else {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
      }
    }
  },

  async executeSaveCustomAdversary(adv, overwrite = false, targetIdx = -1) {
    if (!Array.isArray(this.state.customAdversaries)) {
      this.state.customAdversaries = [];
    }

    if (overwrite && targetIdx >= 0 && this.state.customAdversaries[targetIdx]) {
      const existingId = this.state.customAdversaries[targetIdx].id;
      adv.id = existingId || adv.id || `custom-${Date.now()}`;
      this.state.customAdversaries[targetIdx] = adv;
      this.editingCustomIdx = targetIdx;
      this.editingCustomId = adv.id;
      this.saveState();
      this.renderCustomLibrary();
      this.renderBestiary();
      this.renderEnvironments();
      await this.saveCustomLibraryToFile(true);
      this.showToast(`Overwrote and updated "${adv.name}" in Custom Library.`);
    } else {
      adv.id = `custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      this.state.customAdversaries.push(adv);
      this.editingCustomIdx = this.state.customAdversaries.length - 1;
      this.editingCustomId = adv.id;
      this.saveState();
      this.renderCustomLibrary();
      this.renderBestiary();
      this.renderEnvironments();
      await this.saveCustomLibraryToFile(true);
      this.showToast(`Saved "${adv.name}" as new entry in Custom Library.`);
    }

    this.pendingCustomAdvSave = null;
    this.pendingCustomAdvTargetIdx = -1;
  },

  // ===========================================================================
  // 10. UNIFIED ADVERSARIES & ENVIRONMENTS COMPENDIUM
  // ===========================================================================
  renderBestiary() {
    const grid = document.getElementById('bestiary-grid');
    const searchVal = document.getElementById('bestiary-search-input')?.value.trim().toLowerCase() || '';
    const sourceFilter = document.getElementById('bestiary-filter-source')?.value || 'all';
    const tierFilter = document.getElementById('bestiary-filter-tier')?.value || 'all';
    const typeFilter = document.getElementById('bestiary-filter-type')?.value || 'all';
    const countEl = document.getElementById('bestiary-results-count');

    if (!grid) return;

    const allEntities = this.getAllCompendiumEntities();

    const filtered = allEntities.filter(item => {
      const matchSearch = !searchVal ||
        (item.name && item.name.toLowerCase().includes(searchVal)) ||
        (item.motive && item.motive.toLowerCase().includes(searchVal)) ||
        (item.summary && item.summary.toLowerCase().includes(searchVal)) ||
        (item.impulses && item.impulses.toLowerCase().includes(searchVal)) ||
        (item.suggestedAdversaries && item.suggestedAdversaries.toLowerCase().includes(searchVal)) ||
        (item.features && item.features.some(f => (f.name && f.name.toLowerCase().includes(searchVal)) || (f.text && f.text.toLowerCase().includes(searchVal)))) ||
        (item.attack && item.attack.name && item.attack.name.toLowerCase().includes(searchVal));

      const matchSource = sourceFilter === 'all' ||
        (sourceFilter === 'Custom' && item.isCustom) ||
        (!item.isCustom && item.book && item.book.toLowerCase() === sourceFilter.toLowerCase()) ||
        (!item.isCustom && sourceFilter === 'Core' && (!item.book || item.book === 'Core'));

      const matchTier = tierFilter === 'all' || (item.tier !== undefined && item.tier.toString() === tierFilter);

      const matchType = typeFilter === 'all' ||
        (typeFilter === 'Environment' && (item.type === 'Environment' || item.isEnvironment)) ||
        (typeFilter !== 'Environment' && !item.isEnvironment && item.type && item.type.toLowerCase() === typeFilter.toLowerCase());

      return matchSearch && matchSource && matchTier && matchType;
    });

    const totalResults = filtered.length;
    if (countEl) countEl.textContent = `Showing ${totalResults} of ${allEntities.length} entries`;

    if (totalResults === 0) {
      grid.innerHTML = '<div class="col-12 text-center text-muted p-5"><h5>No matching adversaries or environments found.</h5><p class="small">Try adjusting your search query or archetype/source filters.</p></div>';
      return;
    }

    // Pagination slice
    const totalPages = Math.ceil(totalResults / this.pageSize);
    if (this.bestiaryPage > totalPages) this.bestiaryPage = 1;

    const startIdx = (this.bestiaryPage - 1) * this.pageSize;
    const pageItems = filtered.slice(startIdx, startIdx + this.pageSize);

    const cardsHTML = pageItems.map(adv => {
      const isEnv = adv.isEnvironment || adv.type === 'Environment';
      const tokenSrc = adv.tokenImg || TokenRenderer.generate(adv.name, isEnv ? 'Environment' : adv.type, adv.tier);
      const safeId = adv.id || adv.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const isHF = adv.book === 'Hope & Fear';
      const isExpanded = (this.expandedBestiaryId === safeId);

      // Features HTML
      let featuresHTML = '';
      if (adv.features && adv.features.length > 0) {
        featuresHTML = adv.features.map(f => {
          const cost = f.cost || 'None';
          let costBadge = '';
          if (cost === 'Fear') {
            costBadge = '<span class="badge bg-warning text-dark border border-warning ms-1 py-0" style="font-size: 0.62rem;">💀 Fear</span>';
          } else if (cost === 'Stress') {
            costBadge = '<span class="badge bg-danger text-light border border-danger ms-1 py-0" style="font-size: 0.62rem;">⚡ Stress</span>';
          } else if (cost === 'Hope') {
            costBadge = '<span class="badge bg-info text-dark border border-info ms-1 py-0" style="font-size: 0.62rem;">✨ Hope</span>';
          }
          return `
            <div class="feature-item mb-1">
              <span class="feature-type-tag feature-type-${(f.type || 'action').toLowerCase()}">${f.type || 'Action'}</span>
              ${costBadge}
              <strong>${f.name}:</strong>
              <span>${f.text}</span>
            </div>
          `;
        }).join('');
      }

      // Experiences HTML
      let expHTML = '';
      if (adv.experiences && adv.experiences.length > 0) {
        expHTML = adv.experiences.map(e => `<span class="badge bg-secondary me-1 mb-1">${e}</span>`).join('');
      }

      // Environment Card (Expanded vs Collapsed)
      if (isEnv) {
        if (isExpanded) {
          return `
            <div class="col-12 col-md-6 col-xl-4 bestiary-item-col">
              <div class="card og-statblock border-gold shadow-lg is-bestiary-expanded p-0" id="bestiary-card-${safeId}">
                <!-- Header -->
                <div class="p-3 border-bottom border-subtle d-flex align-items-start gap-3 adv-card-header" data-toggle-bestiary-id="${safeId}" style="cursor: pointer;" title="Click to Collapse Card">
                  <div class="adv-token-container" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
                    <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
                  </div>
                  <div class="flex-grow-1 position-relative" style="min-width: 0;">
                    <div class="d-flex justify-content-between align-items-center gap-2">
                      <h5 class="adv-name m-0 text-truncate text-gold">${adv.name}</h5>

                      <div class="d-flex align-items-center gap-1 flex-shrink-0">
                        <button class="btn btn-xs btn-outline-secondary py-0 px-1 collapse-indicator" data-toggle-bestiary-id="${safeId}" title="Collapse Card">
                          ▲
                        </button>
                        <button class="btn btn-xs btn-gold" data-add-bestiary-id="${safeId}" title="Add to Active Encounter">
                          + Add to Encounter
                        </button>
                        ${adv.isCustom ? `
                          <button class="btn btn-xs btn-outline-info" data-edit-custom-idx="${adv.customIdx}" title="Edit in Creator">Edit</button>
                          <button class="btn btn-xs btn-outline-danger" data-delete-custom-idx="${adv.customIdx}" title="Delete Custom Creation">✕</button>
                        ` : `
                          <button class="btn btn-xs btn-outline-secondary" data-template-bestiary-id="${safeId}" title="Load copy as template into Creator">Clone</button>
                        `}
                      </div>
                    </div>

                    <div class="d-flex gap-1 align-items-center mt-1 flex-wrap">
                      <span class="badge-tier">Tier ${adv.tier}</span>
                      <span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50">Environment (${adv.subtype || 'Exploration'})</span>
                      <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;">0 BP (Scene)</span>
                      <span class="badge ${adv.isCustom ? 'bg-info text-dark' : (isHF ? 'bg-warning text-dark' : (adv.book === 'Pistolheart' ? 'badge-source-pistolheart' : 'bg-secondary'))}" style="font-size: 0.65rem;">${adv.isCustom ? 'Custom' : (adv.book || 'Core')}</span>
                    </div>

                    ${adv.summary || adv.motive ? `<div class="adv-motive mt-1 text-truncate" style="font-size: 0.75rem;">${adv.summary || adv.motive}</div>` : ''}
                  </div>
                </div>

                <!-- Expanded Body -->
                <div class="adv-card-body p-3">
                  <div class="d-flex justify-content-between align-items-center mb-2 p-2 rounded bg-dark border border-subtle">
                    <span class="small text-secondary">Difficulty Rating:</span>
                    <span class="fw-bold text-gold fs-6">${adv.diff}</span>
                  </div>

                  ${adv.impulses ? `
                    <div class="p-2 mb-2 rounded bg-dark border border-subtle small">
                      <strong class="text-gold">Impulses:</strong> <span>${adv.impulses}</span>
                    </div>
                  ` : ''}

                  ${adv.suggestedAdversaries ? `
                    <div class="p-2 mb-2 rounded bg-dark border border-subtle small text-muted">
                      <strong class="text-light">Suggested Adversaries:</strong> <span>${adv.suggestedAdversaries}</span>
                    </div>
                  ` : ''}

                  ${featuresHTML ? `<div class="mt-2 border-top border-subtle pt-2">${featuresHTML}</div>` : ''}
                </div>
              </div>
            </div>
          `;
        }

        // Collapsed View for Environment
        return `
          <div class="col-12 col-md-6 col-xl-4 bestiary-item-col">
            <div class="card og-statblock-alt p-3 h-100 d-flex flex-column justify-content-between border-subtle shadow-sm bestiary-card cursor-pointer" data-toggle-bestiary-id="${safeId}">
              <div>
                <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                  <div class="d-flex align-items-center gap-2 overflow-hidden">
                    <div class="adv-token-container" style="width: 44px; height: 44px; flex-shrink: 0;" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
                      <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
                    </div>
                    <div class="overflow-hidden">
                      <h6 class="m-0 text-truncate fw-bold text-gold">${adv.name}</h6>
                      <div class="d-flex gap-1 mt-1 flex-wrap">
                        <span class="badge-tier">Tier ${adv.tier}</span>
                        <span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50" style="font-size: 0.65rem;">Environment</span>
                        <span class="badge ${adv.isCustom ? 'bg-info text-dark' : (isHF ? 'bg-warning text-dark' : (adv.book === 'Pistolheart' ? 'badge-source-pistolheart' : 'bg-secondary'))}" style="font-size: 0.65rem;">${adv.isCustom ? 'Custom' : (adv.book || 'Core')}</span>
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-xs btn-outline-secondary py-0 px-1 collapse-indicator" data-toggle-bestiary-id="${safeId}" title="Expand full card">
                    ▼
                  </button>
                </div>

                <p class="small text-muted mb-2 text-truncate" style="font-size: 0.8rem; line-height: 1.3;">${adv.summary || adv.impulses || 'Interactive environmental hazard scene.'}</p>
                
                <div class="small d-flex justify-content-between text-secondary mb-2 border-top border-bottom border-subtle py-1" style="font-size: 0.75rem;">
                  <span>Difficulty: <strong class="text-gold">${adv.diff}</strong></span>
                  <span>Hazards: <strong class="text-info">${adv.features?.length || 0}</strong></span>
                </div>
              </div>

              <div class="d-flex gap-2 mt-2 pt-1 border-top border-subtle">
                <button class="btn btn-xs btn-gold flex-grow-1" data-add-bestiary-id="${safeId}">
                  + Add to Encounter
                </button>
                ${adv.isCustom ? `
                  <button class="btn btn-xs btn-outline-info" data-edit-custom-idx="${adv.customIdx}" title="Edit in Creator">Edit</button>
                  <button class="btn btn-xs btn-outline-danger" data-delete-custom-idx="${adv.customIdx}" title="Delete Custom Creation">✕</button>
                ` : `
                  <button class="btn btn-xs btn-outline-secondary" data-template-bestiary-id="${safeId}" title="Load copy as template into Creator">Clone</button>
                `}
              </div>
            </div>
          </div>
        `;
      }

      // Adversary or Colossus Card rendering (Expanded vs Collapsed)
      const isColossus = (adv.type === 'Colossus' || (adv.segments && adv.segments.length > 0));
      const atkBonus = adv.attack?.bonus !== undefined ? `+${adv.attack.bonus}` : '+0';
      const atkDmg = adv.attack?.damage || '1d8';
      const bpCost = DH_BENCHMARKS.BP_COSTS[adv.type] !== undefined ? DH_BENCHMARKS.BP_COSTS[adv.type] : 2;

      if (isExpanded) {
        // Full Expanded View for Colossus
        if (isColossus) {
          let stressPipsHTML = '';
          for (let i = 0; i < (adv.stress || 6); i++) {
            stressPipsHTML += `<button type="button" class="stress-pip" disabled></button>`;
          }

          return `
            <div class="col-12 col-md-6 col-xl-4 bestiary-item-col">
              <div class="card og-statblock border-gold shadow-lg is-bestiary-expanded p-0" id="bestiary-card-${safeId}">
                <!-- Header -->
                <div class="p-3 border-bottom border-subtle d-flex align-items-start gap-3 adv-card-header" data-toggle-bestiary-id="${safeId}" style="cursor: pointer;" title="Click to Collapse Card">
                  <div class="adv-token-container" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
                    <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
                  </div>
                  <div class="flex-grow-1 position-relative" style="min-width: 0;">
                    <div class="d-flex justify-content-between align-items-center gap-2">
                      <h5 class="adv-name m-0 text-truncate text-gold">${adv.name}</h5>

                      <div class="d-flex align-items-center gap-1 flex-shrink-0">
                        <button class="btn btn-xs btn-outline-secondary py-0 px-1 collapse-indicator" data-toggle-bestiary-id="${safeId}" title="Collapse Card">
                          ▲
                        </button>
                        <button class="btn btn-xs btn-gold" data-add-bestiary-id="${safeId}" title="Add Colossus and all segments to Active Encounter">
                          + Add Colossus & Segments
                        </button>
                        ${adv.isCustom ? `
                          <button class="btn btn-xs btn-outline-info" data-edit-custom-idx="${adv.customIdx}" title="Edit in Creator">Edit</button>
                          <button class="btn btn-xs btn-outline-danger" data-delete-custom-idx="${adv.customIdx}" title="Delete Custom Creation">✕</button>
                        ` : `
                          <button class="btn btn-xs btn-outline-secondary" data-template-bestiary-id="${safeId}" title="Load copy as template into Creator">Clone</button>
                        `}
                      </div>
                    </div>

                    <div class="d-flex gap-1 align-items-center mt-1 flex-wrap">
                      <span class="badge-tier">Tier ${adv.tier}</span>
                      <span class="badge bg-danger text-light fw-bold">Colossus</span>
                      ${adv.size ? `<span class="badge bg-dark border border-warning text-warning" style="font-size: 0.65rem;">Size: ${adv.size}</span>` : ''}
                      <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;" title="Battle Points">6 BP</span>
                      <span class="badge ${adv.isCustom ? 'bg-info text-dark' : 'bg-secondary'}" style="font-size: 0.65rem;">${adv.isCustom ? 'Custom' : (adv.book || 'Campaign Frame')}</span>
                    </div>

                    ${adv.motive ? `<div class="adv-motive mt-1 text-truncate" style="font-size: 0.75rem;">${adv.motive}</div>` : ''}
                  </div>
                </div>

                <!-- Expanded Body -->
                <div class="adv-card-body p-3">
                  <!-- Defensive Stats Grid -->
                  <div class="row g-2 mb-3">
                    <div class="col-4">
                      <div class="stat-pill">
                        <span class="stat-pill-label">Difficulty</span>
                        <span class="stat-pill-val text-gold">${adv.diff}</span>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="stat-pill">
                        <span class="stat-pill-label">Major</span>
                        <span class="stat-pill-val">${adv.major}</span>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="stat-pill">
                        <span class="stat-pill-label">Severe</span>
                        <span class="stat-pill-val">${adv.severe}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Stress Tracker Box -->
                  <div class="trackers-box mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="small fw-bold text-warning text-uppercase d-flex align-items-center gap-1">
                        <span>&#9670;</span> Stress (${adv.stress || 6})
                      </span>
                      <div class="pip-row">${stressPipsHTML}</div>
                    </div>
                  </div>

                  <!-- Motive & Tactics -->
                  ${adv.motive ? `
                    <div class="p-2 mb-3 rounded bg-dark border border-subtle small">
                      <strong class="text-gold">Motive / Tactics:</strong>
                      <span class="text-secondary">${adv.motive}</span>
                    </div>
                  ` : ''}

                  <!-- Features / Special Moves -->
                  ${featuresHTML ? `<div class="mb-3">${featuresHTML}</div>` : ''}

                  <!-- Experiences -->
                  ${expHTML ? `
                    <div class="mt-2 pt-2 border-top border-subtle mb-3">
                      <div class="small text-muted mb-1 fw-bold text-uppercase" style="font-size: 0.7rem;">Experiences:</div>
                      <div class="d-flex flex-wrap">${expHTML}</div>
                    </div>
                  ` : ''}

                  <!-- Linked Segments Overview -->
                  ${adv.segments && adv.segments.length > 0 ? `
                    <div class="mt-3 pt-2 border-top border-gold">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="small fw-bold text-gold text-uppercase">
                          🔗 Linked Segments (${adv.segments.length} Types, ${adv.segments.reduce((acc, s) => acc + (s.quantity || 1), 0)} Total Units)
                        </span>
                      </div>
                      <div class="d-flex flex-column gap-2">
                        ${adv.segments.map(seg => `
                          <div class="p-2 rounded bg-dark border border-subtle">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                              <span class="fw-bold text-light">${seg.name} ${seg.quantity > 1 ? `<span class="badge bg-secondary ms-1">×${seg.quantity}</span>` : ''}</span>
                              <div class="d-flex gap-1">
                                ${seg.features?.some(f => f.name.toLowerCase().includes('fatal')) ? '<span class="badge bg-danger text-light" style="font-size: 0.6rem;">FATAL</span>' : ''}
                                <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.6rem;">Diff ${seg.diff}</span>
                                <span class="badge bg-dark border border-danger text-danger" style="font-size: 0.6rem;">HP ${seg.hp}${seg.quantity > 1 ? ' ea' : ''}</span>
                              </div>
                            </div>
                            ${seg.attack && (seg.attack.damage || '').trim() && (seg.attack.damage || '').trim() !== '—' && (seg.attack.damage || '').trim().toLowerCase() !== 'none' ? `
                              <div class="small text-muted mb-1" style="font-size: 0.72rem;">
                                <strong>Atk:</strong> ${seg.attack.name || 'Strike'} (+${seg.attack.bonus || 0}, ${seg.attack.range || 'Melee'}, ${seg.attack.damage} ${seg.attack.type || 'Physical'})
                              </div>
                            ` : ''}
                            ${seg.adjacentSegments && seg.adjacentSegments.length ? `
                              <div class="small text-muted mb-1" style="font-size: 0.72rem;">
                                <strong class="text-gold">Adjacent:</strong> ${seg.adjacentSegments.join(', ')}
                              </div>
                            ` : ''}
                            ${seg.features && seg.features.length ? `
                              <div class="small text-secondary" style="font-size: 0.7rem; line-height: 1.25;">
                                ${seg.features.map(f => `<div><strong class="text-light">${f.name}:</strong> ${f.text}</div>`).join('')}
                              </div>
                            ` : ''}
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}

                  <div class="mt-3 pt-2 border-top border-subtle">
                    <button class="btn btn-sm btn-gold w-100" data-add-bestiary-id="${safeId}">
                      + Add Colossus & All Segments to Encounter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }

        // Standard Adversary Expanded View (matching Active Encounter full view)
        let hpPipsHTML = '';
        for (let i = 0; i < (adv.hp || 1); i++) {
          hpPipsHTML += `<button type="button" class="hp-pip" disabled></button>`;
        }

        let stressPipsHTML = '';
        for (let i = 0; i < (adv.stress || 0); i++) {
          stressPipsHTML += `<button type="button" class="stress-pip" disabled></button>`;
        }

        return `
          <div class="col-12 col-md-6 col-xl-4 bestiary-item-col">
            <div class="card og-statblock border-gold shadow-lg is-bestiary-expanded p-0" id="bestiary-card-${safeId}">
              <!-- Header -->
              <div class="p-3 border-bottom border-subtle d-flex align-items-start gap-3 adv-card-header" data-toggle-bestiary-id="${safeId}" style="cursor: pointer;" title="Click to Collapse Card">
                <div class="adv-token-container" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
                  <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
                </div>
                <div class="flex-grow-1 position-relative" style="min-width: 0;">
                  <div class="d-flex justify-content-between align-items-center gap-2">
                    <h5 class="adv-name m-0 text-truncate">${adv.name}</h5>

                    <div class="d-flex align-items-center gap-1 flex-shrink-0">
                      <button class="btn btn-xs btn-outline-secondary py-0 px-1 collapse-indicator" data-toggle-bestiary-id="${safeId}" title="Collapse Card">
                        ▲
                      </button>
                      <button class="btn btn-xs btn-gold" data-add-bestiary-id="${safeId}" title="Add to Active Encounter">
                        + Add to Encounter
                      </button>
                      ${adv.isCustom ? `
                        <button class="btn btn-xs btn-outline-info" data-edit-custom-idx="${adv.customIdx}" title="Edit in Creator">Edit</button>
                        <button class="btn btn-xs btn-outline-danger" data-delete-custom-idx="${adv.customIdx}" title="Delete Custom Creation">✕</button>
                      ` : `
                        <button class="btn btn-xs btn-outline-secondary" data-template-bestiary-id="${safeId}" title="Load copy as template into Creator">Clone</button>
                      `}
                    </div>
                  </div>

                  <div class="d-flex gap-1 align-items-center mt-1 flex-wrap">
                    <span class="badge-tier">Tier ${adv.tier}</span>
                    <span class="badge-role">${adv.type}</span>
                    <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;" title="Battle Points">${bpCost} BP</span>
                    <span class="badge ${adv.isCustom ? 'bg-info text-dark' : (isHF ? 'bg-warning text-dark' : (adv.book === 'Pistolheart' ? 'badge-source-pistolheart' : 'bg-secondary'))}" style="font-size: 0.65rem;">${adv.isCustom ? 'Custom' : (adv.book || 'Core')}</span>
                    ${adv.pages && adv.pages.length ? `<span class="badge bg-dark border border-secondary text-muted" style="font-size: 0.65rem;">${adv.pages[0]}</span>` : ''}
                  </div>

                  ${adv.motive ? `<div class="adv-motive mt-1 text-truncate" style="font-size: 0.75rem;">${adv.motive}</div>` : ''}
                </div>
              </div>

              <!-- Expanded Body -->
              <div class="adv-card-body p-3">
                <!-- Defensive Stats Grid -->
                <div class="row g-2 mb-3">
                  <div class="col-3">
                    <div class="stat-pill">
                      <span class="stat-pill-label">Diff</span>
                      <span class="stat-pill-val text-gold">${adv.diff}</span>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="stat-pill">
                      <span class="stat-pill-label">Major</span>
                      <span class="stat-pill-val">${adv.major}</span>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="stat-pill">
                      <span class="stat-pill-label">Severe</span>
                      <span class="stat-pill-val">${adv.severe}</span>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="stat-pill">
                      <span class="stat-pill-label">${adv.type === 'Minion' ? 'Overkill' : 'BP'}</span>
                      <span class="stat-pill-val">${adv.type === 'Minion' ? (adv.minionRule || 6) : bpCost}</span>
                    </div>
                  </div>
                </div>

                <!-- Trackers Section -->
                <div class="trackers-box mb-3">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="small fw-bold text-danger text-uppercase d-flex align-items-center gap-1">
                      <span>&#9829;</span> HP (${adv.hp})
                    </span>
                    <div class="pip-row">${hpPipsHTML}</div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="small fw-bold text-warning text-uppercase d-flex align-items-center gap-1">
                      <span>&#9670;</span> Stress (${adv.stress})
                    </span>
                    <div class="pip-row">${stressPipsHTML}</div>
                  </div>
                </div>

                <!-- Primary Attack Section -->
                <div class="attack-banner d-flex justify-content-between align-items-center mb-3">
                  <div class="overflow-hidden" style="min-width: 0;">
                    <span class="fw-bold text-light">${adv.attack?.name || 'Basic Attack'}</span>
                    <div class="small text-muted text-truncate">
                      ${(adv.attack?.bonus !== undefined ? adv.attack.bonus : 0) >= 0 ? `+${adv.attack?.bonus !== undefined ? adv.attack.bonus : 0}` : adv.attack.bonus} to hit &bull; ${adv.attack?.range || 'Melee'} &bull; ${adv.attack?.damage || '1d8'} ${adv.attack?.type || 'Physical'}
                    </div>
                  </div>
                </div>

                <!-- Motive & Tactics -->
                ${adv.motive ? `
                  <div class="p-2 mb-3 rounded bg-dark border border-subtle small">
                    <strong class="text-gold">Motive / Tactics:</strong>
                    <span class="text-secondary">${adv.motive}</span>
                  </div>
                ` : ''}

                <!-- Features / Special Moves -->
                ${featuresHTML ? `<div class="mb-3">${featuresHTML}</div>` : ''}

                <!-- Experiences -->
                ${expHTML ? `
                  <div class="mt-2 pt-2 border-top border-subtle">
                    <div class="small text-muted mb-1 fw-bold text-uppercase" style="font-size: 0.7rem;">Experiences:</div>
                    <div class="d-flex flex-wrap">${expHTML}</div>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }

      // Collapsed View for Colossus
      if (isColossus) {
        return `
          <div class="col-12 col-md-6 col-xl-4 bestiary-item-col">
            <div class="card og-statblock-alt p-3 h-100 d-flex flex-column justify-content-between border-subtle shadow-sm bestiary-card cursor-pointer" data-toggle-bestiary-id="${safeId}">
              <div>
                <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                  <div class="d-flex align-items-center gap-2 overflow-hidden">
                    <div class="adv-token-container" style="width: 44px; height: 44px; flex-shrink: 0;" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
                      <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
                    </div>
                    <div class="overflow-hidden">
                      <h6 class="m-0 text-truncate fw-bold text-gold">${adv.name}</h6>
                      <div class="d-flex gap-1 mt-1 flex-wrap">
                        <span class="badge-tier">Tier ${adv.tier}</span>
                        <span class="badge bg-danger text-light fw-bold" style="font-size: 0.65rem;">Colossus</span>
                        ${adv.size ? `<span class="badge bg-dark border border-warning text-warning" style="font-size: 0.65rem;">Size: ${adv.size}</span>` : ''}
                        <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;" title="Battle Points">6 BP</span>
                        <span class="badge ${adv.isCustom ? 'bg-info text-dark' : 'bg-secondary'}" style="font-size: 0.65rem;">${adv.isCustom ? 'Custom' : (adv.book || 'Campaign Frame')}</span>
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-xs btn-outline-secondary py-0 px-1 collapse-indicator" data-toggle-bestiary-id="${safeId}" title="Expand full card">
                    ▼
                  </button>
                </div>

                <p class="small text-muted mb-2 text-truncate" style="font-size: 0.8rem; line-height: 1.3;">${adv.summary || adv.motive || 'Titanic composite adversary.'}</p>
                
                ${adv.segments && adv.segments.length > 0 ? `
                  <div class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 w-100 text-start text-truncate mb-2 p-1" style="font-size: 0.7rem;">
                    🔗 Segments: ${adv.segments.map(s => `${s.name.replace(/^(Ikeri|Colossus)\s+/i, '')}${s.quantity > 1 ? ` ×${s.quantity}` : ''}`).join(', ')}
                  </div>
                ` : ''}
                
                <div class="small d-flex justify-content-between text-secondary mb-2 border-top border-bottom border-subtle py-1" style="font-size: 0.75rem;">
                  <span>Diff: <strong class="text-gold">${adv.diff}</strong></span>
                  <span>Maj: <strong>${adv.major}</strong></span>
                  <span>Sev: <strong>${adv.severe}</strong></span>
                  <span>Stress: <strong class="text-warning">${adv.stress || 6}</strong></span>
                </div>
              </div>

              <div class="d-flex gap-2 mt-2 pt-1 border-top border-subtle">
                <button class="btn btn-xs btn-gold flex-grow-1" data-add-bestiary-id="${safeId}">
                  + Add Colossus & Segments
                </button>
                ${adv.isCustom ? `
                  <button class="btn btn-xs btn-outline-info" data-edit-custom-idx="${adv.customIdx}" title="Edit in Creator">Edit</button>
                  <button class="btn btn-xs btn-outline-danger" data-delete-custom-idx="${adv.customIdx}" title="Delete Custom Creation">✕</button>
                ` : `
                  <button class="btn btn-xs btn-outline-secondary" data-template-bestiary-id="${safeId}" title="Load copy as template into Creator">Clone</button>
                `}
              </div>
            </div>
          </div>
        `;
      }

      // Collapsed View for Standard Adversary
      return `
        <div class="col-12 col-md-6 col-xl-4 bestiary-item-col">
          <div class="card og-statblock-alt p-3 h-100 d-flex flex-column justify-content-between border-subtle shadow-sm bestiary-card cursor-pointer" data-toggle-bestiary-id="${safeId}">
            <div>
              <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                <div class="d-flex align-items-center gap-2 overflow-hidden">
                  <div class="adv-token-container" style="width: 44px; height: 44px; flex-shrink: 0;" data-adv-tooltip="${this.getAdversaryTooltip(adv)}">
                    <img src="${tokenSrc}" alt="${adv.name}" class="adv-token-img">
                  </div>
                  <div class="overflow-hidden">
                    <h6 class="m-0 text-truncate fw-bold text-light">${adv.name}</h6>
                    <div class="d-flex gap-1 mt-1 flex-wrap">
                      <span class="badge-tier">Tier ${adv.tier}</span>
                      <span class="badge-role">${adv.type}</span>
                      <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;" title="Battle Points">${bpCost} BP</span>
                      <span class="badge ${adv.isCustom ? 'bg-info text-dark' : (isHF ? 'bg-warning text-dark' : (adv.book === 'Pistolheart' ? 'badge-source-pistolheart' : 'bg-secondary'))}" style="font-size: 0.65rem;">${adv.isCustom ? 'Custom' : (adv.book || 'Core')}</span>
                    </div>
                  </div>
                </div>
                <button class="btn btn-xs btn-outline-secondary py-0 px-1 collapse-indicator" data-toggle-bestiary-id="${safeId}" title="Expand full card">
                  ▼
                </button>
              </div>

              <p class="small text-muted mb-2 text-truncate" style="font-size: 0.8rem; line-height: 1.3;">${adv.motive || adv.summary || 'Standard adversary profile.'}</p>
              
              <div class="small d-flex justify-content-between text-secondary mb-2 border-top border-bottom border-subtle py-1" style="font-size: 0.75rem;">
                <span>Diff: <strong class="text-gold">${adv.diff}</strong></span>
                <span>Maj: <strong>${adv.major}</strong></span>
                <span>Sev: <strong>${adv.severe}</strong></span>
                <span>HP: <strong class="text-danger">${adv.hp}</strong></span>
                <span>Stress: <strong class="text-warning">${adv.stress}</strong></span>
              </div>

              <div class="small text-muted mb-2 text-truncate" style="font-size: 0.75rem;">
                <strong>Atk:</strong> ${adv.attack?.name || 'Weapon'} (${atkBonus}, ${atkDmg} ${adv.attack?.type || ''})
              </div>
            </div>

            <div class="d-flex gap-2 mt-2 pt-1 border-top border-subtle">
              <button class="btn btn-xs btn-gold flex-grow-1" data-add-bestiary-id="${safeId}">
                + Add to Encounter
              </button>
              ${adv.isCustom ? `
                <button class="btn btn-xs btn-outline-info" data-edit-custom-idx="${adv.customIdx}" title="Edit in Creator">Edit</button>
                <button class="btn btn-xs btn-outline-danger" data-delete-custom-idx="${adv.customIdx}" title="Delete Custom Creation">✕</button>
              ` : `
                <button class="btn btn-xs btn-outline-secondary" data-template-bestiary-id="${safeId}" title="Load copy as template into Creator">Clone</button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Pagination controls HTML
    let paginationHTML = '';
    if (totalPages > 1) {
      paginationHTML = `
        <div class="col-12">
          <div class="bestiary-pagination p-2 rounded bg-dark border border-subtle">
            <button class="btn btn-xs btn-outline-secondary" id="btn-prev-page" ${this.bestiaryPage === 1 ? 'disabled' : ''}>&larr; Prev Page</button>
            <span class="small text-gold fw-bold">Page ${this.bestiaryPage} of ${totalPages}</span>
            <button class="btn btn-xs btn-outline-secondary" id="btn-next-page" ${this.bestiaryPage === totalPages ? 'disabled' : ''}>Next Page &rarr;</button>
          </div>
        </div>
      `;
    }

    grid.innerHTML = cardsHTML + paginationHTML;

    // Toggle card expansion (accordion single-card rule)
    grid.querySelectorAll('[data-toggle-bestiary-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        // If clicking on an action button inside the card, ignore toggle
        if (e.target.closest('button:not([data-toggle-bestiary-id]), a, input')) return;
        e.stopPropagation();
        const id = el.getAttribute('data-toggle-bestiary-id');
        if (this.expandedBestiaryId === id) {
          this.expandedBestiaryId = null;
        } else {
          this.expandedBestiaryId = id;
        }
        AudioFX.playClick();
        this.renderBestiary();
      });
    });

    // Attach Add to Encounter events
    grid.querySelectorAll('[data-add-bestiary-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-add-bestiary-id');
        this.addBestiaryToRoster(id);
      });
    });

    // Attach Edit Custom events
    grid.querySelectorAll('[data-edit-custom-idx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-edit-custom-idx'), 10);
        this.editCustomInCreator(idx);
      });
    });

    // Attach Delete Custom events
    grid.querySelectorAll('[data-delete-custom-idx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-delete-custom-idx'), 10);
        this.deleteCustomAdversary(idx);
      });
    });

    // Attach Clone as Template into Creator events
    grid.querySelectorAll('[data-template-bestiary-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-template-bestiary-id');
        const all = this.getAllCompendiumEntities();
        const found = all.find(a => a.id === id);
        if (found) {
          this.editingCustomIdx = null;
          this.editingCustomId = null;
          this.loadItemIntoCreator(found);
          this.switchTab('tab-creator');
          this.showToast(`Loaded copy of "${found.name}" into Creator.`);
        }
      });
    });

    document.getElementById('btn-prev-page')?.addEventListener('click', () => {
      if (this.bestiaryPage > 1) {
        this.bestiaryPage--;
        this.renderBestiary();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    document.getElementById('btn-next-page')?.addEventListener('click', () => {
      if (this.bestiaryPage < totalPages) {
        this.bestiaryPage++;
        this.renderBestiary();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  },

  addBestiaryToRoster(id) {
    const all = this.getAllCompendiumEntities();
    const found = all.find(a => (a.id && a.id === id) || (a.name && a.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === id));
    if (found) {
      if (found.type === 'Colossus' || (found.segments && found.segments.length > 0)) {
        const groupId = 'colossus-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        
        // 1. Add Framework card
        const framework = JSON.parse(JSON.stringify(found));
        delete framework.attack;
        framework.colossusGroupId = groupId;
        framework.isColossusFramework = true;
        framework.markedHP = 0;
        framework.markedStress = 0;
        framework.trackers = [{ id: 1, markedHP: 0, markedStress: 0 }];
        this.state.roster.push(framework);

        // 2. Add each Segment card
        if (found.segments && Array.isArray(found.segments)) {
          found.segments.forEach(seg => {
            const segInstance = JSON.parse(JSON.stringify(seg));
            segInstance.colossusGroupId = groupId;
            segInstance.colossusParentName = found.name;
            segInstance.isColossusSegment = true;
            segInstance.markedHP = 0;
            segInstance.markedStress = 0;
            const qty = segInstance.quantity || 1;
            segInstance.trackers = Array.from({ length: qty }, (_, q) => ({
              id: q + 1,
              markedHP: 0,
              markedStress: 0
            }));
            this.state.roster.push(segInstance);
          });
        }

        this.saveState();
        this.renderRoster();
        this.renderHUD();
        this.showToast(`Added Titanic Colossus "${found.name}" & ${found.segments?.length || 0} Segments!`);
        AudioFX.playClick();
        return;
      }

      const instance = JSON.parse(JSON.stringify(found));
      const isEnv = (instance.type === 'Environment' || instance.isEnvironment);
      if (!isEnv) {
        instance.markedHP = 0;
        instance.markedStress = 0;
        instance.trackers = [{ id: 1, markedHP: 0, markedStress: 0 }];
      }
      this.state.roster.push(instance);
      this.saveState();
      this.renderRoster();
      this.renderHUD();
      this.showToast(`Added "${instance.name}" to Active Encounter!`);
      AudioFX.playClick();
    }
  },

  renderEnvironments() {
    this.renderBestiary();
  },

  addEnvironmentToRoster(id) {
    this.addBestiaryToRoster(id);
  },

  // ===========================================================================
  // 10C. CUSTOM LIBRARY (SAVED ADVERSARIES & ENVIRONMENTS)
  // ===========================================================================
  renderCustomLibrary() {
    const grid = document.getElementById('custom-library-grid');
    const searchVal = document.getElementById('custom-library-search-input')?.value.trim().toLowerCase() || '';
    const catFilter = document.getElementById('custom-library-filter-category')?.value || 'all';
    const tierFilter = document.getElementById('custom-library-filter-tier')?.value || 'all';
    const countEl = document.getElementById('custom-library-results-count');

    if (!grid) return;

    const items = this.state.customAdversaries || [];

    // Filter items
    const filtered = items.map((item, originalIdx) => ({ item, originalIdx })).filter(({ item }) => {
      const isEnv = (item.type === 'Environment' || item.isEnvironment);

      if (catFilter === 'adversaries' && isEnv) return false;
      if (catFilter === 'environments' && !isEnv) return false;

      if (tierFilter !== 'all' && item.tier !== undefined && item.tier.toString() !== tierFilter) {
        return false;
      }

      if (searchVal) {
        const nameMatch = item.name && item.name.toLowerCase().includes(searchVal);
        const motiveMatch = item.motive && item.motive.toLowerCase().includes(searchVal);
        const impulseMatch = item.impulses && item.impulses.toLowerCase().includes(searchVal);
        const typeMatch = item.type && item.type.toLowerCase().includes(searchVal);
        const featureMatch = item.features && item.features.some(f => (f.name && f.name.toLowerCase().includes(searchVal)) || (f.text && f.text.toLowerCase().includes(searchVal)));
        const expMatch = item.experiences && Array.isArray(item.experiences) && item.experiences.some(e => e.toLowerCase().includes(searchVal));
        if (!nameMatch && !motiveMatch && !impulseMatch && !typeMatch && !featureMatch && !expMatch) {
          return false;
        }
      }

      return true;
    });

    if (countEl) {
      countEl.textContent = `${filtered.length} Custom ${filtered.length === 1 ? 'Entry' : 'Entries'}`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-12">
          <div class="card og-statblock-alt text-center py-5 border-dashed border-secondary shadow-sm">
            <div class="fs-1 mb-2 text-muted">&#128193;</div>
            <h5 class="text-gold">Your Custom Library is Empty</h5>
            <p class="text-muted small mx-auto" style="max-width: 500px;">
              You haven't saved any custom adversaries or environments yet. Design your own statblocks in the <strong>Adversary Creator</strong> and click <strong>"Save to Custom Library"</strong> to store them here permanently in your browser.
            </p>
            <div class="mt-3">
              <button class="btn btn-sm btn-gold" id="btn-empty-go-creator">
                &#9997; Open Adversary Creator
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <p class="text-muted fs-6">No custom entries match your search filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(({ item, originalIdx }) => {
      const isEnv = (item.type === 'Environment' || item.isEnvironment);
      const tokenSrc = item.tokenImg || TokenRenderer.generate(item.name, item.type, item.tier);
      const bpCost = isEnv ? 0 : (DH_BENCHMARKS.BP_COSTS[item.type] !== undefined ? DH_BENCHMARKS.BP_COSTS[item.type] : 2);

      if (isEnv) {
        return `
          <div class="col-12 col-md-6 col-xl-4">
            <div class="card og-statblock-alt p-3 h-100 d-flex flex-column justify-content-between border-subtle shadow-sm">
              <div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <div class="adv-token-container" style="width: 46px; height: 46px;" data-adv-tooltip="${this.getAdversaryTooltip(item)}">
                    <img src="${tokenSrc}" alt="${item.name}" class="adv-token-img">
                  </div>
                  <div class="overflow-hidden">
                    <h6 class="m-0 text-truncate fw-bold text-light">${item.name}</h6>
                    <div class="d-flex gap-1 mt-1 flex-wrap">
                      <span class="badge-tier">Tier ${item.tier}</span>
                      <span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50">Custom Environment (${item.subtype || 'Exploration'})</span>
                      <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;">0 BP (Scene)</span>
                    </div>
                  </div>
                </div>
                <p class="small text-muted mb-2 text-truncate" style="font-size: 0.8rem; line-height: 1.3;">${item.motive || item.summary || 'Custom environment scene profile.'}</p>
                
                <div class="small d-flex justify-content-between text-secondary mb-2 border-top border-bottom border-subtle py-1" style="font-size: 0.75rem;">
                  <span>Diff: <strong class="text-gold">${item.diff || 12}</strong></span>
                  <span>Category: <strong class="text-light">${item.subtype || 'Exploration'}</strong></span>
                </div>

                ${item.impulses ? `
                  <div class="small text-muted mb-1" style="font-size: 0.75rem;">
                    <strong class="text-gold">Impulses:</strong> ${item.impulses}
                  </div>
                ` : ''}

                ${item.features && item.features.length > 0 ? `
                  <div class="small text-muted mb-2" style="font-size: 0.75rem;">
                    <strong>Features:</strong> ${item.features.map(f => `<span class="badge bg-dark border border-secondary text-light me-1">${f.name}</span>`).join('')}
                  </div>
                ` : ''}
              </div>

              <div class="d-flex gap-2 mt-3 pt-2 border-top border-subtle">
                <button class="btn btn-xs btn-gold flex-grow-1" data-add-custom-idx="${originalIdx}">
                  + Add to Encounter
                </button>
                <button class="btn btn-xs btn-outline-light" data-edit-custom-idx="${originalIdx}" title="Edit in Creator">
                  &#9997; Edit
                </button>
                <button class="btn btn-xs btn-outline-danger" data-delete-custom-idx="${originalIdx}" title="Delete from Library">
                  &times;
                </button>
              </div>
            </div>
          </div>
        `;
      }

      // Adversary Card
      const atkBonus = item.attack?.bonus !== undefined ? `+${item.attack.bonus}` : '+0';
      const atkDmg = item.attack?.damage || '1d8';

      return `
        <div class="col-12 col-md-6 col-xl-4">
          <div class="card og-statblock-alt p-3 h-100 d-flex flex-column justify-content-between border-subtle shadow-sm">
            <div>
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="adv-token-container" style="width: 46px; height: 46px;" data-adv-tooltip="${this.getAdversaryTooltip(item)}">
                  <img src="${tokenSrc}" alt="${item.name}" class="adv-token-img">
                </div>
                <div class="overflow-hidden">
                  <h6 class="m-0 text-truncate fw-bold text-light">${item.name}</h6>
                  <div class="d-flex gap-1 mt-1 flex-wrap">
                    <span class="badge-tier">Tier ${item.tier}</span>
                    <span class="badge-role">${item.type}</span>
                    <span class="badge bg-dark border border-gold text-gold" style="font-size: 0.65rem;" title="Battle Points">${bpCost} BP</span>
                    <span class="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50" style="font-size: 0.65rem;">Custom</span>
                  </div>
                </div>
              </div>
              <p class="small text-muted mb-2 text-truncate" style="font-size: 0.8rem; line-height: 1.3;">${item.motive || 'Custom adversary profile.'}</p>
              
              <div class="small d-flex justify-content-between text-secondary mb-2 border-top border-bottom border-subtle py-1" style="font-size: 0.75rem;">
                <span>Diff: <strong class="text-gold">${item.diff}</strong></span>
                <span>Maj: <strong>${item.major}</strong></span>
                <span>Sev: <strong>${item.severe}</strong></span>
                <span>HP: <strong class="text-danger">${item.hp}</strong></span>
                <span>Stress: <strong class="text-warning">${item.stress}</strong></span>
              </div>

              <div class="small text-muted mb-2" style="font-size: 0.75rem;">
                <strong>Atk:</strong> ${item.attack?.name || 'Weapon'} (${atkBonus}, ${atkDmg} ${item.attack?.type || ''})
              </div>

              ${item.experiences && item.experiences.length > 0 ? `
                <div class="small text-muted mb-2" style="font-size: 0.75rem;">
                  <strong>Exp:</strong> ${item.experiences.join(', ')}
                </div>
              ` : ''}

              ${item.features && item.features.length > 0 ? `
                <div class="small text-muted mb-2" style="font-size: 0.75rem;">
                  <strong>Features:</strong> ${item.features.map(f => `<span class="badge bg-dark border border-secondary text-light me-1">${f.name}</span>`).join('')}
                </div>
              ` : ''}
            </div>

            <div class="d-flex gap-2 mt-3 pt-2 border-top border-subtle">
              <button class="btn btn-xs btn-gold flex-grow-1" data-add-custom-idx="${originalIdx}">
                + Add to Encounter
              </button>
              <button class="btn btn-xs btn-outline-light" data-edit-custom-idx="${originalIdx}" title="Edit in Creator">
                &#9997; Edit
              </button>
              <button class="btn btn-xs btn-outline-danger" data-delete-custom-idx="${originalIdx}" title="Delete from Library">
                &times;
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  addCustomToRoster(index) {
    const item = this.state.customAdversaries[index];
    if (!item) return;
    const instance = JSON.parse(JSON.stringify(item));
    instance.markedHP = 0;
    instance.markedStress = 0;
    instance.trackers = [{ id: 1, markedHP: 0, markedStress: 0 }];
    this.state.roster.push(instance);
    this.saveState();
    this.renderRoster();
    this.renderHUD();
    this.showToast(`Added "${instance.name}" to Active Encounter!`);
    AudioFX.playClick();
  },

  editCustomInCreator(index) {
    const item = this.state.customAdversaries[index];
    if (!item) return;
    this.editingCustomIdx = index;
    this.editingCustomId = item.id;
    this.loadItemIntoCreator(item);
    this.switchTab('tab-creator');
    this.showToast(`Loaded "${item.name}" into Adversary Creator for editing.`);
  },

  async deleteCustomAdversary(index) {
    const item = this.state.customAdversaries[index];
    if (!item) return;
    if (confirm(`Are you sure you want to delete "${item.name}" from your Custom Library?`)) {
      if (this.editingCustomIdx === index) {
        this.editingCustomIdx = null;
        this.editingCustomId = null;
      } else if (this.editingCustomIdx !== null && this.editingCustomIdx > index) {
        this.editingCustomIdx--;
      }
      this.state.customAdversaries.splice(index, 1);
      this.saveState();
      this.renderCustomLibrary();
      this.renderBestiary();
      this.renderEnvironments();
      await this.saveCustomLibraryToFile(true);
      this.showToast(`Deleted "${item.name}" from Custom Library.`);
    }
  },

  loadItemIntoCreator(item) {
    this.creatorOriginItem = JSON.parse(JSON.stringify(item));
    this.creatorMode = 'cloned';
    this.populateCreatorFields(item);
    this.updateCreatorOriginBanner();
    this.updateCreatorPreview();
  },

  exportCustomLibraryJSON() {
    const payload = {
      version: '1.0',
      updatedAt: new Date().toISOString(),
      customAdversaries: this.state.customAdversaries || [],
      savedEncounters: this.state.savedEncounters || []
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'custom-library.json');
    dlAnchor.click();
    this.showToast('Downloaded custom-library.json — save it directly into your app folder!');
  },

  importCustomLibraryJSON(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        let customCount = 0;
        let encCount = 0;

        const advList = Array.isArray(data) ? data : (data.customAdversaries || []);
        if (Array.isArray(advList)) {
          advList.forEach(item => {
            const exists = this.state.customAdversaries.some(ca =>
              (ca.id && ca.id === item.id) || (ca.name && ca.name.toLowerCase() === item.name.toLowerCase())
            );
            if (!exists) {
              this.state.customAdversaries.push(item);
              customCount++;
            }
          });
        }

        if (data && !Array.isArray(data) && Array.isArray(data.savedEncounters)) {
          data.savedEncounters.forEach(enc => {
            const exists = this.state.savedEncounters.some(se => se.id === enc.id || se.title === enc.title);
            if (!exists) {
              this.state.savedEncounters.push(enc);
              encCount++;
            }
          });
        }

        this.saveState();
        this.renderCustomLibrary();
        this.renderBestiary();
        this.renderEnvironments();
        this.renderSavedEncounters();
        await this.saveCustomLibraryToFile(true);
        this.showToast(`Imported ${customCount} custom items and ${encCount} saved encounters.`);
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  },

  // ===========================================================================
  // 11. ENCOUNTER RETENTION & BACKUP ENGINE
  // ===========================================================================
  async saveCurrentEncounter(title, overwrite = false) {
    try {
      const rosterCount = (this.state.roster || []).length;
      let finalTitle = (title || '').trim();
      if (!finalTitle) {
        const dateStr = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (rosterCount > 0) {
          const firstName = this.state.roster[0]?.name || 'Adversaries';
          finalTitle = rosterCount === 1 
            ? `Encounter: ${firstName} (${dateStr})`
            : `Battle with ${rosterCount} Foes (${dateStr})`;
        } else {
          finalTitle = `Encounter (${dateStr}, ${timeStr})`;
        }
      }

      // Safe capture of custom adversaries or environments from active battle roster
      if (Array.isArray(this.state.roster)) {
        this.state.roster.forEach(adv => {
          if (!adv || typeof adv !== 'object') return;
          const advName = (adv.name || '').trim();
          if (!advName) return;

          const isOfficial =
            (this.state.srdAdversaries || []).some(s => s && s.name && s.name.toLowerCase() === advName.toLowerCase()) ||
            (this.state.srdEnvironments || []).some(e => e && e.name && e.name.toLowerCase() === advName.toLowerCase());

          if (!isOfficial) {
            if (!Array.isArray(this.state.customAdversaries)) {
              this.state.customAdversaries = [];
            }
            const exists = this.state.customAdversaries.some(ca =>
              ca && ((ca.id && adv.id && ca.id === adv.id) || (ca.name && ca.name.toLowerCase() === advName.toLowerCase()))
            );
            if (!exists) {
              const blueprint = JSON.parse(JSON.stringify(adv));
              delete blueprint.markedHP;
              delete blueprint.markedStress;
              delete blueprint.trackers;
              this.state.customAdversaries.push(blueprint);
            }
          }
        });
      }

      if (!Array.isArray(this.state.savedEncounters)) {
        this.state.savedEncounters = [];
      }

      let targetIdx = -1;
      if (overwrite) {
        if (this.loadedEncounterId) {
          targetIdx = this.state.savedEncounters.findIndex(se => se && se.id === this.loadedEncounterId);
        }
        if (targetIdx === -1 && this.loadedEncounterTitle) {
          targetIdx = this.state.savedEncounters.findIndex(se => se && se.title === this.loadedEncounterTitle);
        }
        if (targetIdx === -1) {
          targetIdx = this.state.savedEncounters.findIndex(se => se && se.title === finalTitle);
        }
      }

      if (overwrite && targetIdx >= 0) {
        const existingId = this.state.savedEncounters[targetIdx].id || this.loadedEncounterId || `enc-${Date.now()}`;
        const record = {
          id: existingId,
          title: finalTitle,
          timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          party: { ...(this.state.party || { count: 4, tier: 1 }) },
          fear: this.state.gmFear !== undefined ? this.state.gmFear : 2,
          roster: JSON.parse(JSON.stringify(this.state.roster || []))
        };
        this.state.savedEncounters[targetIdx] = record;
        this.loadedEncounterId = existingId;
        this.loadedEncounterTitle = finalTitle;
        this.saveState();
        this.renderSavedEncounters();
        this.renderCustomLibrary();
        const savedToFile = await this.saveCustomLibraryToFile();
        if (!savedToFile) {
          this.showToast(`Overwrote and updated "${finalTitle}" in browser cache.`);
        } else {
          this.showToast(`Overwrote and updated encounter "${finalTitle}".`);
        }
        return true;
      }

      // Save as New
      const newId = `enc-${Date.now()}`;
      const record = {
        id: newId,
        title: finalTitle,
        timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        party: { ...(this.state.party || { count: 4, tier: 1 }) },
        fear: this.state.gmFear !== undefined ? this.state.gmFear : 2,
        roster: JSON.parse(JSON.stringify(this.state.roster || []))
      };

      this.state.savedEncounters.unshift(record);
      this.loadedEncounterId = newId;
      this.loadedEncounterTitle = finalTitle;
      this.saveState();
      this.renderSavedEncounters();
      this.renderCustomLibrary();

      // Auto-save directly to custom-library.json in the project folder
      const savedToFile = await this.saveCustomLibraryToFile();
      if (!savedToFile) {
        this.showToast(`Saved "${finalTitle}" as new encounter in browser cache.`);
      } else {
        this.showToast(`Saved "${finalTitle}" as new encounter.`);
      }
      return true;
    } catch (err) {
      console.error('Save encounter error:', err);
      this.showToast('⚠️ Could not save encounter: ' + err.message);
      return false;
    }
  },

  renderSavedEncounters() {
    const list = document.getElementById('saved-encounters-list');
    if (!list) return;

    if (this.state.savedEncounters.length === 0) {
      list.innerHTML = '<div class="text-muted p-4 text-center">No saved encounters yet. Create an encounter and click "Save Encounter".</div>';
      return;
    }

    list.innerHTML = this.state.savedEncounters.map((enc, i) => `
      <div class="list-group-item bg-dark border-subtle d-flex justify-content-between align-items-center text-light py-2 mb-2 rounded">
        <div>
          <h6 class="m-0 text-gold fw-bold">${enc.title}</h6>
          <div class="small text-muted">
            <span>${enc.timestamp}</span> &bull; 
            <span>${enc.roster.length} Adversaries</span> &bull; 
            <span>Party: ${enc.party.count} PCs (Tier ${enc.party.tier})</span>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-xs btn-outline-info" onclick="App.recallEncounter(${i})">Load Encounter</button>
          <button class="btn btn-xs btn-outline-danger" onclick="App.deleteSavedEncounter(${i})">&times;</button>
        </div>
      </div>
    `).join('');
  },

  recallEncounter(idx) {
    const enc = this.state.savedEncounters[idx];
    if (!enc) return;
    if (confirm(`Load encounter "${enc.title}"? (This will overwrite your current active battle roster)`)) {
      if (!enc.id) {
        enc.id = `enc-${Date.now()}`;
      }
      this.loadedEncounterId = enc.id;
      this.loadedEncounterTitle = enc.title;
      this.state.party = { ...enc.party };
      this.state.gmFear = enc.fear || 2;
      this.state.roster = JSON.parse(JSON.stringify(enc.roster));
      this.saveState();
      this.renderAll();
      this.switchTab('tab-encounter');
      this.showToast(`Loaded "${enc.title}".`);
    }
  },

  async deleteSavedEncounter(idx) {
    const enc = this.state.savedEncounters[idx];
    if (confirm('Delete this saved encounter?')) {
      if (enc && this.loadedEncounterId === enc.id) {
        this.loadedEncounterId = null;
        this.loadedEncounterTitle = null;
      }
      this.state.savedEncounters.splice(idx, 1);
      this.saveState();
      this.renderSavedEncounters();
      await this.saveCustomLibraryToFile(true);
      this.showToast('Encounter deleted.');
    }
  },

  exportBackupJSON() {
    const payload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      party: this.state.party,
      gmFear: this.state.gmFear,
      activeRoster: this.state.roster,
      savedEncounters: this.state.savedEncounters,
      customAdversaries: this.state.customAdversaries
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `daggerheart_encounters_${Date.now()}.json`);
    dlAnchor.click();
  },

  importBackupJSON(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.savedEncounters) this.state.savedEncounters = data.savedEncounters;
        if (data.activeRoster) this.state.roster = data.activeRoster;
        if (data.party) this.state.party = data.party;
        if (data.gmFear !== undefined) this.state.gmFear = data.gmFear;
        if (data.customAdversaries) {
          this.state.customAdversaries = data.customAdversaries;
        }
        this.saveState();
        this.renderAll();
        this.showToast('Backup successfully imported!');
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  },

  showToast(msg) {
    const toastEl = document.getElementById('app-toast');
    const msgEl = document.getElementById('toast-message');
    if (msgEl) msgEl.innerHTML = msg;
    if (toastEl && window.bootstrap) {
      new window.bootstrap.Toast(toastEl, { delay: 2800 }).show();
    }
  }
};

// Boot application
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
