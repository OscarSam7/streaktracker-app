export interface LeagueInfo {
    id: number;
    name: string;
    country: string;
    code: string;
    flag: string;
}

export const LEAGUES: Record<string, LeagueInfo> = {
    LIBERTADORES: { id: 13, name: "Copa Libertadores", country: "Sudamérica", code: "conmebol", flag: "🏆" },
    AUSTRALIA: { id: 188, name: "A-League", country: "Australia", code: "au", flag: "🇦🇺" },
    AUSTRALIA_W: { id: 190, name: "A-League Women", country: "Australia", code: "au", flag: "🇦🇺" },
    AZERBAIJAN: { id: 419, name: "Premyer Liqa", country: "Azerbaiyán", code: "az", flag: "🇦🇿" },
    BELGIUM: { id: 144, name: "Jupiler Pro League", country: "Bélgica", code: "be", flag: "🇧🇪" },
    BOSNIA: { id: 315, name: "Premijer Liga", country: "Bosnia", code: "ba", flag: "🇧🇦" },
    BRAZIL: { id: 71, name: "Serie A", country: "Brasil", code: "br", flag: "🇧🇷" },
    BRAZIL_B: { id: 72, name: "Serie B", country: "Brasil", code: "br", flag: "🇧🇷" },
    BULGARIA: { id: 172, name: "First League", country: "Bulgaria", code: "bg", flag: "🇧🇬" },
    CANADA: { id: 479, name: "Canadian Premier League", country: "Canadá", code: "ca", flag: "🇨🇦" },
    CHILE2: { id: 266, name: "Primera B", country: "Chile", code: "cl", flag: "🇨🇱" },
    CHILE: { id: 265, name: "Primera División", country: "Chile", code: "cl", flag: "🇨🇱" },
    CYPRUS: { id: 318, name: "1. Division", country: "Chipre", code: "cy", flag: "🇨🇾" },
    COLOMBIA: { id: 239, name: "Primera A", country: "Colombia", code: "co", flag: "🇨🇴" },
    COLOMBIA_B: { id: 240, name: "Primera B", country: "Colombia", code: "co", flag: "🇨🇴" },
    CROATIA: { id: 210, name: "HNL", country: "Croacia", code: "hr", flag: "🇭🇷" },
    DENMARK: { id: 119, name: "Superliga", country: "Dinamarca", code: "dk", flag: "🇩🇰" },
    ECUADOR: { id: 242, name: "Liga Pro", country: "Ecuador", code: "ec", flag: "🇪🇨" },
    EGYPT: { id: 233, name: "Premier League", country: "Egipto", code: "eg", flag: "🇪🇬" },
    SLOVENIA: { id: 373, name: "1. SNL", country: "Eslovenia", code: "si", flag: "🇸🇮" },
    SPAIN: { id: 140, name: "La Liga", country: "España", code: "es", flag: "🇪🇸" },
    SPAIN2: { id: 141, name: "Segunda División", country: "España", code: "es", flag: "🇪🇸" },
    ESTONIA: { id: 329, name: "Meistriliiga", country: "Estonia", code: "ee", flag: "🇪🇪" },
    FRANCE: { id: 61, name: "Ligue 1", country: "Francia", code: "fr", flag: "🇫🇷" },
    GREECE: { id: 197, name: "Super League 1", country: "Grecia", code: "gr", flag: "🇬🇷" },
    NETHERLANDS: { id: 88, name: "Eredivisie", country: "Holanda", code: "nl", flag: "🇳🇱" },
    SUDAMERICANA: { id: 11, name: "Copa Sudamericana", country: "Sudamérica", code: "conmebol", flag: "🌎" },
    ENGLAND: { id: 39, name: "Premier League", country: "Inglaterra", code: "gb", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    ITALY: { id: 135, name: "Serie A", country: "Italia", code: "it", flag: "🇮🇹" },
    JORDAN: { id: 387, name: "League", country: "Jordania", code: "jo", flag: "🇯🇴" },
    KUWAIT: { id: 330, name: "Premier League", country: "Kuwait", code: "kw", flag: "🇰🇼" },
    LITHUANIA: { id: 362, name: "A Lyga", country: "Lituania", code: "lt", flag: "🇱🇹" },
    MALAYSIA: { id: 278, name: "Super League", country: "Malasia", code: "my", flag: "🇲🇾" },
    MOROCCO: { id: 200, name: "Botola Pro", country: "Marruecos", code: "ma", flag: "🇲🇦" },
    PARAGUAY: { id: 252, name: "Division Profesional", country: "Paraguay", code: "py", flag: "🇵🇾" },
    PERU: { id: 281, name: "Primera División", country: "Perú", code: "pe", flag: "🇵🇪" },
    POLAND: { id: 106, name: "Ekstraklasa", country: "Polonia", code: "pl", flag: "🇵🇱" },
    POLAND2: { id: 107, name: "I Liga", country: "Polonia", code: "pl", flag: "🇵🇱" },
    PORTUGAL: { id: 94, name: "Primeira Liga", country: "Portugal", code: "pt", flag: "🇵🇹" },
    QATAR: { id: 305, name: "Stars League", country: "Qatar", code: "qa", flag: "🇶🇦" },
    ROMANIA: { id: 283, name: "Liga I", country: "Rumania", code: "ro", flag: "🇷🇴" },
    TANZANIA: { id: 567, name: "Ligi Kuu Bara", country: "Tanzania", code: "tz", flag: "🇹🇿" },
    TURKEY2: { id: 204, name: "1. Lig", country: "Turquía", code: "tr", flag: "🇹🇷" },
    TURKEY: { id: 203, name: "Süper Lig", country: "Turquía", code: "tr", flag: "🇹🇷" },
    URUGUAY: { id: 268, name: "Primera División", country: "Uruguay", code: "uy", flag: "🇺🇾" },
};

export const DEFAULT_ACTIVE_LEAGUES = Object.values(LEAGUES).map(l => l.id);


export const ORDERED_LEAGUES: LeagueInfo[] = Object.values(LEAGUES).sort((a, b) => 
    a.country.localeCompare(b.country, 'es', { sensitivity: 'base' }) || 
    a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
);

export function getLeagueGlobalOrdinal(leagueId: number): number {
    const idx = ORDERED_LEAGUES.findIndex(l => l.id === leagueId);
    return idx !== -1 ? idx + 1 : 1;
}
