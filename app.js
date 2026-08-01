/* ============ DATA ============ */
// stops: ordered list per day. isHL marks a place worth a highlight card.
// stars: 0-5 (as noted in the original planning doc), used as a "must-see" signal.
// lat/lon: approximate real coordinates, used only to lay out the schematic route map (not for live navigation).
const TRIP = {
  start: "2026-08-15",
  end: "2026-08-28",
  days: [
    {
      day: 1, date: "2026-08-15", leg: "kruger",
      fromCode: "JNB", toCode: "GRK", from: "Johannesburgo", to: "Graskop",
      title: "JNB → GRK",
      subtitle: "Johannesburgo → Graskop",
      summary: "Aterrizaje, recogida del coche, desayuno en Dullstroom y primer contacto con la Panorama Route en Graskop.",
      distance: 330, time: "5h 30m (con paradas)",
      flight: { label: "Vuelo de llegada", detail: "Johannesburgo (JNB) · 08:30", status: "confirmed" },
      stops: [
        { name: "Aeropuerto O.R. Tambo (JNB)", lat:-26.1367, lon:28.2420, time: "08:30", note: "Llegada y recogida del coche de alquiler.", isHL:false },
        { name: "Dullstroom", lat:-25.4204, lon:30.1107, time: "Mañana", note: "Parada para desayunar y pasear por el centro (45–60 min).", isHL:false },
        { name: "God's Window / The Pinnacle Rock", lat:-24.8963, lon:30.8564, time: "Tarde", note: "Primer contacto con la Panorama Route. Si el día está despejado, God's Window (vistas espectaculares sobre el Lowveld); si hay niebla, The Pinnacle Rock (parada rápida y muy fotogénica).", isHL:true, stars:0 },
        { name: "Graskop", lat:-24.9209, lon:30.8305, time: "Tarde", note: "Llegada y check-in en el Rustique Hotel. Si queda luz, paseo por el pueblo.", isHL:true, stars:0 },
      ],
      stay: { name: "Rustique Hotel", area: "Graskop" },
      tips: [
        "El clima manda en la Panorama Route, igual que en Table Mountain: si el 15 de agosto llegáis con cielo despejado, aprovechad para subir a God's Window aunque penséis dejarlo para el día 20 — con niebla pierde casi toda la magia. Three Rondavels y Bourke's Luck Potholes, en cambio, suelen verse bien incluso con algo de nubosidad, así que son más fáciles de dejar para el final.",
        "Llegáis con jet lag y horas de vuelo encima — no forcéis el primer día, es solo aclimatación.",
        "Como volvéis a esta zona el día 20, no busquéis los grandes imprescindibles (Three Rondavels, Bourke's Luck Potholes...) hoy — quedan para entonces. Solo una visita corta para empezar a disfrutar sin prisas.",
        "Al empezar en Graskop, intentad llegar sobre las 15:00–16:00 para disfrutar con calma del hotel y del primer mirador."
      ]
    },
  {
      day: 2, date: "2026-08-16", leg: "kruger",
      fromCode: "GRK", toCode: "PTK", from: "Graskop", to: "Pretoriuskop",
      title: "GRK → PTK",
      subtitle: "Graskop → Pretoriuskop",
      summary: "Graskop → Hazyview → Phabeni Gate → Pretoriuskop, con safari de tarde por H1-1 y F9.",
      distance: 75, time: "3h (incl. safari de tarde)",
      stops: [
        { name: "Graskop", lat:-24.9209, lon:30.8305, time: "Mañana", note: "Salida hacia el Kruger.", isHL:false },
        { name: "Hazyview", lat:-25.0430, lon:31.1272, time: "Mañana", note: "Parada para desayunar o tomar un café antes de entrar al parque.", isHL:false },
        { name: "Phabeni Gate", lat:-25.0173, lon:31.1997, time: "≈11:00", note: "Entrada al Kruger — intentad llegar antes de las 11:00.", isHL:false },
        { name: "Pretoriuskop", lat:-25.1793, lon:31.2582, time: "Tarde", note: "Safari de tarde: Phabeni Gate → Pretoriuskop → H1-1 → F9 (si hay tiempo) → Pretoriuskop. Bosques característicos del sur del Kruger. Posibilidad de ver elefantes, jirafas, cebras, rinocerontes y, con suerte, leopardos.", isHL:true, stars:0 },
      ],
      stay: { name: "Pretoriuskop Rest Camp", area: "Kruger National Park" },
      tips: ["Primer safari del viaje — id sin prisa, el objetivo del día es entrar y llegar a tiempo, no acumular kilómetros."]
    },
    {
      day: 3, date: "2026-08-17", leg: "kruger",
      fromCode: "PTK", toCode: "SAT", from: "Pretoriuskop", to: "Satara",
      title: "PTK → SAT",
      subtitle: "Pretoriuskop → Satara",
      summary: "Skukuza, Lake Panic Hide, Tshokwane con los mejores hides del Kruger.",
      distance: 115, time: "4h 30m (safari lento)",
      stops: [
        { name: "Pretoriuskop", lat:-25.1793, lon:31.2582, time: "≈06:00", note: "Salida a la hora de apertura del parque.", isHL:false },
        { name: "Skukuza", lat:-24.9910, lon:31.5905, time: "Mañana", note: "Parada para desayunar. Desde el puente sobre el río Sabie: hipopótamos, cocodrilos, elefantes.", isHL:true, stars:0 },
        { name: "Lake Panic Hide", lat:-24.9975, lon:31.5741, time: "20–30 min", note: "Uno de los mejores hides del Kruger.", isHL:true, stars:4 },
        { name: "Tshokwane Picnic Site", lat:-24.7236, lon:31.8706, time: "Mediodía", note: "Parada clásica del Kruger para tomar algo.", isHL:true, stars:0 },
        { name: "Satara", lat:-24.3936, lon:31.7784, time: "Tarde", note: "Empiezan las grandes llanuras: territorio de leones, guepardos, hienas, chacales.", isHL:true, stars:0 },
      ],
      stay: { name: "Satara Rest Camp", area: "Kruger National Park" },
      tips: ["Llegad a Satara con margen antes del cierre de puertas del campamento."]
    },
    {
      day: 4, date: "2026-08-18", leg: "kruger",
      fromCode: "SAT", toCode: "TBT", from: "Satara", to: "Tamboti",
      title: "SAT → TBT",
      subtitle: "Satara → Tamboti",
      summary: "S100 y H7, carreteras legendarias hasta Tamboti, campamento pequeño y auténtico.",
      distance: 98, time: "3h 45m (safari lento)",
      stops: [
        { name: "Satara", lat:-24.3936, lon:31.7784, time: "Mañana", note: "Salida hacia la S100.", isHL:false },
        { name: "S100", lat:-24.4450, lon:31.5550, time: "Mañana", note: "Probablemente la carretera más famosa del Kruger. Muchos rangers la consideran de las mejores para leones, leopardos e hienas. Recorrerla despacio.", isHL:true, stars:5 },
        { name: "H7", lat:-24.4700, lon:31.4200, time: "Mañana/Mediodía", note: "Otra carretera excelente: elefantes, jirafas, cebras, búfalos.", isHL:true, stars:4 },
        { name: "Orpen", lat:-24.4711, lon:31.3796, time: "Mediodía", note: "Parada para comer.", isHL:false },
        { name: "Tamboti", lat:-24.4300, lon:31.6200, time: "Tarde", note: "Campamento mucho más pequeño y auténtico. Por la noche es frecuente escuchar leones, hienas y búfalos.", isHL:true, stars:0 },
      ],
      stay: { name: "Tamboti Tented Camp", area: "Kruger National Park" },
      tips: ["Muy recomendable cenar pronto y quedarse escuchando los sonidos del bush — «escuchar África»."]
    },
    {
      day: 5, date: "2026-08-19", leg: "kruger",
      fromCode: "TBT", toCode: "CRB", from: "Tamboti", to: "Crocodile Bridge",
      title: "TBT → CRB",
      subtitle: "Tamboti → Crocodile Bridge",
      summary: "H10, Sunset Dam y la terraza de Lower Sabie antes de bajar al sureste del parque.",
      distance: 105, time: "4h 15m (safari lento)",
      stops: [
        { name: "Tamboti", lat:-24.4300, lon:31.6200, time: "Muy temprano", note: "Salida.", isHL:false },
        { name: "Tshokwane", lat:-24.7236, lon:31.8706, time: "Mañana", note: "De paso hacia H10.", isHL:false },
        { name: "H10", lat:-24.9800, lon:31.8600, time: "Mañana", note: "Excelente para leones, guepardos y grandes manadas de elefantes.", isHL:true, stars:4 },
        { name: "Sunset Dam", lat:-25.1257, lon:31.9218, time: "Mediodía", note: "A solo 2 km de Lower Sabie. Una de las mejores paradas del Kruger para observar fauna desde el coche.", isHL:true, stars:5 },
        { name: "Lower Sabie", lat:-25.1219, lon:31.9159, time: "Mediodía", note: "Imprescindible. El restaurante tiene la terraza con mejores vistas del parque.", isHL:true, stars:0 },
        { name: "Crocodile Bridge", lat:-25.3508, lon:31.8999, time: "Tarde", note: "Muy buena zona para rinocerontes, elefantes y leones.", isHL:true, stars:0 },
      ],
      stay: { name: "Crocodile Bridge Rest Camp", area: "Kruger National Park" },
      tips: ["Si el tiempo lo permite, desvío al N'wanetsi Viewpoint — uno de los miradores más bonitos del Kruger."]
    },
    {
      day: 6, date: "2026-08-20", leg: "kruger",
      fromCode: "CRB", toCode: "GRK", from: "Crocodile Bridge", to: "Graskop",
      title: "CRB → GRK",
      subtitle: "Crocodile Bridge → Graskop",
      summary: "Último amanecer (S28) + Panorama Route con Bourke's Luck, Three Rondavels y Lisbon Falls.",
      distance: 225, time: "4h 30m (incluye Panorama Route)",
      stops: [
        { name: "S28", lat:-25.30, lon:31.75, time: "Amanecer", note: "Carretera tranquila, excelente para rinocerontes, guepardos y aves rapaces.", isHL:true, stars:0 },
        { name: "Graskop", lat:-24.9209, lon:30.8305, time: "≈3h30–4h en coche", note: "Llegada a la zona de la Panorama Route.", isHL:false },
        { name: "Bourke's Luck Potholes", lat:-24.8747, lon:30.8036, time: "Tarde", note: "Formaciones geológicas por erosión del agua.", isHL:true, stars:4 },
        { name: "Three Rondavels", lat:-24.8161, lon:30.7574, time: "Tarde", note: "El mirador más icónico de la Panorama Route.", isHL:true, stars:5 },
        { name: "Lisbon Falls", lat:-24.9268, lon:30.7808, time: "Tarde", note: "Una de las cascadas más altas de la ruta.", isHL:true, stars:4 },
        { name: "Berlin Falls", lat:-24.9110, lon:30.7975, time: "Tarde", note: "Parada corta, muy cerca de la carretera.", isHL:true, stars:3 },
        { name: "God's Window", lat:-24.8963, lon:30.8564, time: "Si el día está despejado", note: "Vistas al escarpe del Drakensberg y las tierras bajas.", isHL:true, stars:2 },
      ],
      stay: { name: "Alojamiento en Graskop", area: "Panorama Route" },
      tips: ["Llegad al alojamiento antes del anochecer — la ruta tiene muchas paradas y se hace más larga de lo que parece."]
    },
    {
      day: 7, date: "2026-08-21", leg: "capetown",
      fromCode: "MQP", toCode: "CPT", from: "Nelspruit", to: "Ciudad del Cabo",
      title: "MQP → CPT",
      subtitle: "Nelspruit → Ciudad del Cabo",
      summary: "Vuelo interno y una tarde tranquila de aterrizaje en la ciudad.",
      flight: { label: "Vuelo interno", detail: "Nelspruit (MQP) → Ciudad del Cabo (CPT) · 18:30", status: "confirmed" },
      stops: [
        { name: "Aeropuerto de Ciudad del Cabo", lat:-33.9715, lon:18.6021, time: "≈18:30", note: "Llegada y recogida del coche de alquiler.", isHL:false },
        { name: "De Waterkant / Gardens / Oranjezicht", lat:-33.9249, lon:18.4108, time: "Noche", note: "Zona recomendada para dormir: ambiente agradable, seguro para cenar fuera y bien conectada con las visitas de los próximos días.", isHL:true, stars:0 },
      ],
      stay: { name: "Ciudad del Cabo — De Waterkant / Gardens / Oranjezicht", area: "Zona a confirmar" },
      tips: [
        "No planifiquéis visitas importantes hoy: después de varios días de vuelos, coche y Kruger, mejor empezar tranquilos.",
        "Cena de bienvenida: Kloof Street House (ambiente especial) o Beluga (más tranquilo, reservar si es posible).",
        "No compréis entradas todavía ni cerréis el plan de mañana — primero comprobad la previsión meteorológica. En Ciudad del Cabo el clima manda: con cielo despejado, aprovechad Table Mountain; con nubes o viento, cambiad el orden de los días."
      ]
    },
    {
      day: 8, date: "2026-08-22", leg: "capetown",
      fromCode: "CPT", toCode: "CPT", from: "Ciudad del Cabo", to: "Ciudad del Cabo",
      title: "CPT",
      subtitle: "Ciudad del Cabo",
      summary: "Table Mountain, Bo-Kaap, Company's Garden y atardecer en Signal Hill.",
      distance: 22, time: "Día de ciudad",
      stops: [
        { name: "Table Mountain", lat:-33.9628, lon:18.4098, time: "08:00–08:30", note: "Salir temprano: menos gente, mejor luz, más posibilidades de vistas despejadas. Subida en teleférico si el tiempo acompaña.", isHL:true, stars:5 },
        { name: "Company's Garden", lat:-33.9258, lon:18.4173, time: "Mediodía", note: "Jardines históricos con vistas a Table Mountain.", isHL:true, stars:0 },
        { name: "Bo-Kaap", lat:-33.9181, lon:18.4131, time: "Mediodía", note: "Casas de colores, barrio histórico malayo. Paseo corto (30–45 min).", isHL:true, stars:0 },
        { name: "Signal Hill", lat:-33.9339, lon:18.3959, time: "Atardecer", note: "Uno de los mejores miradores gratuitos: Table Mountain, Lion's Head, la ciudad y el Atlántico.", isHL:true, stars:5 },
      ],
      stay: { name: "Ciudad del Cabo — De Waterkant / Gardens / Oranjezicht", area: "Zona a confirmar" },
      tips: ["Si el tiempo no acompaña para Table Mountain, intercambiad este día con otro — en Ciudad del Cabo la meteorología manda."]
    },
    {
      day: 9, date: "2026-08-23", leg: "capetown",
      fromCode: "CPT", toCode: "SIM", from: "Ciudad del Cabo", to: "Simon's Town",
      title: "CPT → SIM",
      subtitle: "Ciudad del Cabo → Simon's Town",
      summary: "Chapman's Peak Drive, Cape Point y Cabo de Buena Esperanza.",
      distance: 65, time: "2h 15m (con paradas)",
      stops: [
        { name: "Hout Bay", lat:-34.0492, lon:18.3547, time: "Mañana", note: "De paso hacia Chapman's Peak.", isHL:false },
        { name: "Chapman's Peak Drive", lat:-34.0894, lon:18.3553, time: "Mañana", note: "Carretera panorámica imprescindible, con miradores sobre el Atlántico.", isHL:true, stars:5 },
        { name: "Noordhoek", lat:-34.1023, lon:18.3803, time: "Mañana", note: "De paso.", isHL:false },
        { name: "Cape Point Nature Reserve", lat:-34.3568, lon:18.4977, time: "Mediodía", note: "Faro, acantilados y grandes paisajes costeros.", isHL:true, stars:0 },
        { name: "Cabo de Buena Esperanza", lat:-34.3568, lon:18.4740, time: "Mediodía", note: "Punto icónico de la península.", isHL:true, stars:0 },
        { name: "Simon's Town / Kalk Bay", lat:-34.1929, lon:18.4291, time: "Tarde", note: "Mejor ubicación para visitar los pingüinos mañana. Zona con encanto para pasear y cenar.", isHL:true, stars:0 },
      ],
      stay: { name: "Simon's Town / Kalk Bay", area: "Zona a confirmar" },
      tips: ["Una de las rutas costeras más espectaculares de Sudáfrica — dejad tiempo de sobra para paradas fotográficas."]
    },
    {
      day: 10, date: "2026-08-24", leg: "capetown",
      fromCode: "SIM", toCode: "HER", from: "Simon's Town", to: "Hermanus",
      title: "SIM → HER",
      subtitle: "Simon's Town → Hermanus",
      summary: "Boulders Beach, pueblos costeros, Clarence Drive hasta Hermanus.",
      distance: 120, time: "2h 45m",
      stops: [
        { name: "Boulders Beach", lat:-34.1970, lon:18.4498, time: "Mañana", note: "Colonia de pingüinos africanos en libertad.", isHL:true, stars:5 },
        { name: "Kalk Bay", lat:-34.1268, lon:18.4491, time: "Mañana", note: "Pueblo costero con puerto, ambiente local y buen sitio para comer.", isHL:true, stars:0 },
        { name: "Muizenberg", lat:-34.1083, lon:18.4707, time: "Mediodía", note: "Parada fotográfica: las famosas casetas de colores.", isHL:true, stars:0 },
        { name: "Clarence Drive", lat:-34.2915, lon:18.8825, time: "Tarde", note: "Carretera panorámica espectacular entre montaña y océano.", isHL:true, stars:5 },
        { name: "Hermanus", lat:-34.4187, lon:19.2345, time: "Tarde", note: "Paseo por la costa, primer contacto con la zona de ballenas.", isHL:false },
      ],
      stay: { name: "Alojamiento en Hermanus", area: "Zona a confirmar" },
      tips: []
    },
    {
      day: 11, date: "2026-08-25", leg: "capetown",
      fromCode: "HER", toCode: "STB", from: "Hermanus", to: "Stellenbosch",
      title: "HER → STB",
      subtitle: "Hermanus → Stellenbosch",
      summary: "Mañana con Hermanus Cliff Path buscando ballenas, tarde traslado a región vinícola.",
      distance: 130, time: "2h 00m",
      stops: [
        { name: "Hermanus Cliff Path", lat:-34.4204, lon:19.2467, time: "Mañana", note: "Paseo junto a los acantilados: ballenas francas australes, delfines y aves marinas.", isHL:true, stars:5 },
        { name: "Gearing's Point / Old Harbour", lat:-34.4183, lon:19.2427, time: "Mañana", note: "Mejores zonas para observar el océano y el ambiente de Hermanus.", isHL:true, stars:0 },
        { name: "Stellenbosch", lat:-33.9346, lon:18.8600, time: "Tarde", note: "Traslado (≈1h30). Check-in y paseo por el centro histórico.", isHL:false },
      ],
      stay: { name: "Alojamiento en Stellenbosch", area: "Zona a confirmar" },
      tips: []
    },
    {
      day: 12, date: "2026-08-26", leg: "capetown",
      fromCode: "STB", toCode: "STB", from: "Stellenbosch", to: "Stellenbosch",
      title: "STB",
      subtitle: "Stellenbosch",
      summary: "Tokara y Waterford, dos bodegas seleccionadas, centro histórico colonial.",
      distance: 45, time: "Día de región vinícola",
      stops: [
        { name: "Tokara Wine Estate", lat:-33.9764, lon:18.9126, time: "Mañana", note: "Una de las mejores vistas de los viñedos, montañas y paisajes espectaculares.", isHL:true, stars:5 },
        { name: "Waterford Estate", lat:-33.9908, lon:18.8825, time: "Mediodía", note: "Finca con mucho encanto, experiencia tranquila y cuidada.", isHL:true, stars:5 },
        { name: "Stellenbosch centro histórico", lat:-33.9346, lon:18.8600, time: "Tarde", note: "Calles coloniales, cafés, tiendas y ambiente local.", isHL:true, stars:0 },
      ],
      stay: { name: "Alojamiento en Stellenbosch", area: "Zona a confirmar" },
      tips: []
    },
    {
      day: 13, date: "2026-08-27", leg: "capetown",
      fromCode: "STB", toCode: "CPT", from: "Stellenbosch", to: "Zona aeropuerto CPT",
      title: "STB → CPT",
      subtitle: "Stellenbosch → Aeropuerto Ciudad del Cabo",
      summary: "Franschhoek, última bodega, comida de despedida y traslado al aeropuerto.",
      distance: 85, time: "1h 45m",
      flight: { label: "Vuelo de vuelta", detail: "Ciudad del Cabo → salida ≈06:00 (28 ago)", status: "confirmed" },
      stops: [
        { name: "Franschhoek", lat:-33.9122, lon:19.1207, time: "Mañana", note: "Pueblo con encanto rodeado de montañas. Paseo tranquilo por el centro.", isHL:true, stars:5 },
        { name: "Última bodega (Jordan / Delaire Graff)", lat:-33.9711, lon:18.9186, time: "Mediodía", note: "Elegir una: Jordan Wine Estate (paisaje y buena relación calidad/precio) o Delaire Graff Estate (más exclusiva y espectacular).", isHL:true, stars:0 },
        { name: "Zona aeropuerto Ciudad del Cabo", lat:-33.9715, lon:18.6021, time: "Noche", note: "Traslado para evitar madrugón y posibles imprevistos antes del vuelo de las 06:00.", isHL:false },
      ],
      stay: { name: "Zona aeropuerto Ciudad del Cabo", area: "Zona a confirmar" },
      tips: ["Última experiencia gastronómica del viaje — noche tranquila antes del vuelo de madrugada."]
    },
  ]
};

const LEG_LABEL = { kruger: "Kruger", capetown: "Ciudad del Cabo" };
const MYMAPS_URL = "https://www.google.com/maps/d/u/1/viewer?mid=1DIxDEUx2ATWfkPIhY6HAbblI0aXUfv0&usp=sharing";

const GMAPS_URLS = {
  1: "https://www.google.com/maps/dir/OR+Tambo+International+Airport+Johannesburg/Rustique+Boutique+Hotel+Middelburg+South+Africa/Loskop+Dam+Nature+Reserve",
  2: "https://www.google.com/maps/dir/Middelburg+Mpumalanga+South+Africa/Dullstroom+South+Africa/Sabie+South+Africa/Numbi+Gate+Kruger+National+Park/Pretoriuskop+Rest+Camp+Kruger",
  3: "https://www.google.com/maps/dir/Pretoriuskop+Rest+Camp+Kruger/Skukuza+Kruger+National+Park/Lake+Panic+Hide+Kruger/Tshokwane+Picnic+Site+Kruger/Satara+Rest+Camp+Kruger",
  4: "https://www.google.com/maps/dir/Satara+Rest+Camp+Kruger/S100+Kruger+National+Park/H7+Road+Kruger+National+Park/Orpen+Gate+Kruger/Tamboti+Tented+Camp+Kruger",
  5: "https://www.google.com/maps/dir/Tamboti+Tented+Camp+Kruger/Tshokwane+Kruger/H10+Road+Kruger+National+Park/Sunset+Dam+Kruger/Lower+Sabie+Rest+Camp+Kruger/Crocodile+Bridge+Rest+Camp+Kruger",
  6: "https://www.google.com/maps/dir/Crocodile+Bridge+Rest+Camp+Kruger/S28+Road+Kruger+National+Park/Graskop+South+Africa/Three+Rondavels+Panorama+Route",
  7: "https://www.google.com/maps/dir/Cape+Town+International+Airport/De+Waterkant+Cape+Town+South+Africa",
  8: "https://www.google.com/maps/dir/Table+Mountain+Cape+Town/Company's+Garden+Cape+Town/Bo-Kaap+Cape+Town/Signal+Hill+Cape+Town",
  9: "https://www.google.com/maps/dir/Cape+Town+South+Africa/Chapman's+Peak+Drive+South+Africa/Cape+Point+Nature+Reserve/Cape+of+Good+Hope+South+Africa/Simon's+Town+South+Africa",
  10: "https://www.google.com/maps/dir/Simon's+Town+South+Africa/Boulders+Beach+Penguin+Colony/Kalk+Bay+South+Africa/Muizenberg+South+Africa/Hermanus+South+Africa",
  11: "https://www.google.com/maps/dir/Hermanus+Cliff+Path+South+Africa/Gearing's+Point+Hermanus/Stellenbosch+South+Africa",
  12: "https://www.google.com/maps/dir/Stellenbosch+South+Africa/Tokara+Wine+Estate+Stellenbosch/Waterford+Estate+Stellenbosch/Stellenbosch+Town+Centre",
  13: "https://www.google.com/maps/dir/Stellenbosch+South+Africa/Franschhoek+South+Africa/Cape+Town+International+Airport"
};

const RESERVATIONS_STATIC = [
  { key:"flight-in", label:"Vuelo internacional de ida", detail:"Johannesburgo · 15 ago, 08:30", status:"confirmed" },
  { key:"flight-internal", label:"Vuelo interno Nelspruit → Ciudad del Cabo", detail:"20/21 ago", status:"confirmed" },
  { key:"flight-out", label:"Vuelo internacional de vuelta", detail:"Ciudad del Cabo · 28 ago, ≈06:00", status:"confirmed" },
  { key:"car1", label:"Coche de alquiler — tramo Johannesburgo/Kruger/Panorama", detail:"15–20 ago", status:"pending" },
  { key:"car2", label:"Coche de alquiler — tramo Ciudad del Cabo", detail:"21–28 ago", status:"pending" },
];

const PACKING_DEFAULT = [
  "Capas de abrigo para safaris al amanecer (invierno austral)",
  "Prismáticos",
  "Adaptador de enchufe Tipo M",
  "Repelente de mosquitos",
  "Ropa de colores neutros para el Kruger",
  "Documentación: pasaporte (30 días de margen, 2 páginas en blanco) y billetes de salida",
  "Seguro de viaje con cobertura médica",
];


const LOCAL_PHRASES = [
  { term:"Howzit?", meaning:"Saludo informal, viene a ser «¿qué tal?» o «¿cómo va?»." },
  { term:"Lekker", meaning:"Genial, rico, guay — se usa para casi todo lo que está bien." },
  { term:"Sharp sharp!", meaning:"Vale, de acuerdo, hecho — también se usa como despedida («¡nos vemos!»)." },
  { term:"Eish!", meaning:"Exclamación de sorpresa, frustración o asombro — algo así como «¡vaya!»." },
  { term:"Just now / Now now", meaning:"«Ahora mismo» no significa inmediato — puede ser en un rato (¡o en una hora!)." },
  { term:"Braai", meaning:"Barbacoa — mucho más que comida, es todo un plan social." },
];



const ZAR_TO_EUR = 0.051;
const EUR_TO_ZAR = 19.60;

function initCurrencyConverter(){
  const zarInput = document.getElementById("zar-input");
  const eurInput = document.getElementById("eur-input");
  if(!zarInput || !eurInput || zarInput.dataset.bound) return;

  function fromZar(){
    const v = parseFloat(zarInput.value);
    eurInput.value = isNaN(v) ? "" : (v*ZAR_TO_EUR).toFixed(2);
  }
  function fromEur(){
    const v = parseFloat(eurInput.value);
    zarInput.value = isNaN(v) ? "" : (v*EUR_TO_ZAR).toFixed(2);
  }
  zarInput.addEventListener("input", fromZar);
  eurInput.addEventListener("input", fromEur);
  fromZar(); // valor inicial con los 100 ZAR de ejemplo
  zarInput.dataset.bound = "1";
}




/* ============ STORAGE ============ */
const STORE_KEY = "sa-trip-v1";
function loadStore(){
  try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }catch(e){ return {}; }
}
function saveStore(s){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(s)); }catch(e){}
}
let STORE = loadStore();
STORE.stayStatus = STORE.stayStatus || {};   // day -> "confirmed"|"pending"
STORE.stayNotes  = STORE.stayNotes  || {};   // day -> string
STORE.resStatus  = STORE.resStatus  || {};   // key -> "confirmed"|"pending"
STORE.checklist  = STORE.checklist  || {};   // label -> bool
// Confirmar por defecto las estancias de Kruger (días 1-6)
for(let d=1; d<=6; d++){
  if(!STORE.stayStatus[d]) STORE.stayStatus[d] = "confirmed";
}
function persist(){ saveStore(STORE); }

function stayStatus(day){ return STORE.stayStatus[day] || "pending"; }
function resStatus(item){ return STORE.resStatus[item.key] || item.status; }

/* ============ HELPERS ============ */
const DOW = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];
const MON = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
function parseDate(iso){ const [y,m,d]=iso.split("-").map(Number); return new Date(y, m-1, d); }
function dateLabel(iso){ const d=parseDate(iso); return `${d.getDate()} ${MON[d.getMonth()]}`; }
function dowLabel(iso){ const d=parseDate(iso); return DOW[d.getDay()]; }
function starsStr(n){ if(!n) return ""; return "★".repeat(n) + "☆".repeat(5-n); }

function icon(name){ return `<svg><use href="#i-${name}"/></svg>`; }

/* ============ SVG SCHEMATIC MAP ============ */
function pathMidpoint(pts, X, Y){
  const coords = pts.map(p=>({x:X(p.lon), y:Y(p.lat)}));
  let total = 0;
  const segLens = [];
  for(let i=1;i<coords.length;i++){
    const dx = coords[i].x-coords[i-1].x, dy = coords[i].y-coords[i-1].y;
    const len = Math.sqrt(dx*dx+dy*dy);
    segLens.push(len);
    total += len;
  }
  let target = total/2, acc = 0;
  for(let i=0;i<segLens.length;i++){
    if(acc+segLens[i] >= target){
      const t = segLens[i] ? (target-acc)/segLens[i] : 0;
      const a = coords[i], b = coords[i+1];
      return { x: a.x + (b.x-a.x)*t, y: a.y + (b.y-a.y)*t };
    }
    acc += segLens[i];
  }
  return coords[Math.floor(coords.length/2)];
}

function dayMapSVG(day){
  const pts = day.stops;
  const lons = pts.map(p=>p.lon), lats = pts.map(p=>p.lat);
  const minLon = Math.min(...lons), maxLon = Math.max(...lons);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const W = 640, H = 440, PAD = 64;
  const spanLon = Math.max(maxLon-minLon, 0.02);
  const spanLat = Math.max(maxLat-minLat, 0.02);
  const sx = (W-2*PAD)/spanLon, sy = (H-2*PAD)/spanLat;
  const s = Math.min(sx, sy);
  const offX = PAD + ((W-2*PAD) - spanLon*s)/2;
  const offY = PAD + ((H-2*PAD) - spanLat*s)/2;
  function X(lon){ return offX + (lon-minLon)*s; }
  function Y(lat){ return offY + (maxLat-lat)*s; }

  const isCape = day.leg === "capetown";
  const mapBg = isCape ? "#F5F9F6" : "#FAF4E8";
  const routeColor = isCape ? "#4E9484" : "#C97B42";
  const hlColor = isCape ? "#2E6B5E" : "#8C4A22";
  const dotFaint = isCape ? "rgba(46,107,94,.45)" : "rgba(140,74,34,.4)";

  let extras = "";
  if(isCape && day.day >= 9){
    extras += `<path d="M ${W-20} 0 L ${W-15} ${H*0.3} L ${W-10} ${H*0.6} L ${W} ${H}" fill="none" stroke="rgba(78,148,132,.25)" stroke-width="2.5" stroke-dasharray="3 4"/>`;
  }
  if(day.day >= 3 && day.day <= 6){
    extras += `<path d="M ${W*0.3} ${H*0.2} Q ${W*0.5} ${H*0.4} ${W*0.7} ${H*0.8}" fill="none" stroke="rgba(140,74,34,.15)" stroke-width="1.5" stroke-dasharray="2 3"/>`;
  }

  let path = "M";
  pts.forEach((p,i)=>{ path += `${i===0?"":" L"} ${X(p.lon).toFixed(1)} ${Y(p.lat).toFixed(1)}`; });

  let markers = "";
  pts.forEach((p,i)=>{
    const x=X(p.lon).toFixed(1), y=Y(p.lat).toFixed(1);
    const isEndpoint = i===0 || i===pts.length-1;
    const r = isEndpoint ? 9 : (p.isHL ? 7.5 : 4.5);
    const fill = (isEndpoint || p.isHL) ? hlColor : dotFaint;
    markers += `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${mapBg}" stroke-width="2.5"/>`;
    if(p.isHL || isEndpoint){
      markers += `<circle cx="${x}" cy="${y}" r="${r+5}" fill="none" stroke="${hlColor}" stroke-width="1" opacity=".4"/>`;
    }
    const labY = isEndpoint ? Number(y)+24 : Number(y)-15;
    const anchor = X(p.lon) < W*0.18 ? "start" : (X(p.lon) > W*0.82 ? "end" : "middle");
    const fontSize = isEndpoint ? 15 : (p.isHL ? 13 : 11);
    const fontWeight = isEndpoint ? 700 : (p.isHL ? 600 : 400);
    const label = escapeXML(p.name.split(" ").slice(0, isEndpoint?3:2).join(" "));
    const estW = label.length * fontSize * 0.62;
    const boxX = anchor==="start" ? Number(x)-4 : (anchor==="end" ? Number(x)-estW+4 : Number(x)-estW/2);
    markers += `<rect x="${boxX.toFixed(1)}" y="${(labY-fontSize+2).toFixed(1)}" width="${estW.toFixed(1)}" height="${(fontSize+4).toFixed(1)}" rx="4" fill="${mapBg}" opacity=".88"/>`;
    markers += `<text x="${x}" y="${labY}" font-size="${fontSize}" font-weight="${fontWeight}" font-family="'Roboto Mono',ui-monospace,monospace" fill="rgba(46,38,24,.88)" text-anchor="${anchor}">${label}</text>`;
  });

  const mid = pathMidpoint(pts, X, Y);
  const distStr = day.distance ? `${day.distance} km` : "";
  const timeStr = day.time ? `${day.time}` : "";
  const infoText = (distStr && timeStr) ? `${distStr} · ${timeStr}` : (distStr || timeStr || "");
  let midInfo = "";
  if(infoText){
    const boxW = infoText.length*6.6 + 22;
    midInfo = `
      <rect x="${(mid.x-boxW/2).toFixed(1)}" y="${(mid.y-13).toFixed(1)}" width="${boxW.toFixed(1)}" height="26" rx="13" fill="${mapBg}" stroke="${routeColor}" stroke-width="1"/>
      <text x="${mid.x.toFixed(1)}" y="${(mid.y+4).toFixed(1)}" font-size="11.5" font-family="'Roboto Mono',ui-monospace,monospace" fill="${hlColor}" text-anchor="middle" font-weight="600">${escapeXML(infoText)}</text>`;
  }

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${W}" height="${H}" fill="${mapBg}"/>
    ${extras}
    <path d="${path}" fill="none" stroke="${routeColor}" stroke-width="2.5" stroke-dasharray="1 7" stroke-linecap="round"/>
    <path d="${path}" fill="none" stroke="${routeColor}" stroke-width="1" opacity=".4"/>
    ${markers}
    ${midInfo}
  </svg>`;
}
function escapeXML(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

function fullTripMapSVG(legFilter){
  const days = TRIP.days.filter(d => legFilter === "kruger" ? d.day <= 6 : d.day >= 7);
  const pts = [];
  days.forEach(d=> d.stops.forEach(p=> pts.push({...p, leg:d.leg})) );

  const lons = pts.map(p=>p.lon), lats = pts.map(p=>p.lat);
  const minLon = Math.min(...lons), maxLon = Math.max(...lons);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const W = 500, H = 620, PAD = 36;  
  const spanLon = Math.max(maxLon-minLon, 0.05), spanLat = Math.max(maxLat-minLat, 0.05);
  const sx = (W-2*PAD)/spanLon, sy=(H-2*PAD)/spanLat;
  const s = Math.min(sx,sy);
  const offX = PAD + ((W-2*PAD)-spanLon*s)/2;
  const offY = PAD + ((H-2*PAD)-spanLat*s)/2;
  function X(lon){ return offX+(lon-minLon)*s; }
  function Y(lat){ return offY+(maxLat-lat)*s; }

  const isCape = legFilter === "capetown";
  const bg = isCape ? "#F5F9F6" : "#FAF4E8";
  const lineColor = isCape ? "#4E9484" : "#C97B42";
  const dotColor = isCape ? "#2E6B5E" : "#8C4A22";

  const coastline = isCape
    ? `<path d="M ${X(16)},${Y(-33.9)} Q ${X(17)},${Y(-33.5)} ${X(18)},${Y(-33.3)} T ${X(20)},${Y(-32.5)}" fill="none" stroke="rgba(78,148,132,.15)" stroke-width="1.5" stroke-dasharray="2 3"/>`
    : "";

let markers = "";
days.forEach((d, dayIdx)=>{
  const last = d.stops[d.stops.length-1];
  const first = d.stops[0];
  const x = X(last.lon).toFixed(1), y = Y(last.lat).toFixed(1);
  const label = escapeXML(`D${d.day}`);
  const destName = escapeXML(last.name);
  const anchor = X(last.lon) < W*0.2 ? "start" : (X(last.lon) > W*0.8 ? "end" : "middle");

  // Tramo de línea propio de este día (así se puede ocultar por separado)
  let dayPath = "M";
  d.stops.forEach((p,i)=>{ dayPath += `${i===0?"":" L"} ${X(p.lon).toFixed(1)} ${Y(p.lat).toFixed(1)}`; });
  const dayLine = `<path d="${dayPath}" fill="none" stroke="${lineColor}" stroke-width="3.5" stroke-dasharray="1 7" stroke-linecap="round" opacity=".75"/>`;

  // Posición D1, D2, etc.
  const labY = Number(y) - 13;
  const fontSize = 11;
  const estW = label.length * fontSize * 0.68 + 6;
  const boxX = anchor==="start" ? Number(x)-3 : (anchor==="end" ? Number(x)-estW+3 : Number(x)-estW/2);
  
  // Posición nombre de destino (más abajo, más pequeño)
  const destY = Number(y) + 24;
  const destFontSize = 8;
  const destLabel = destName.split(" ").slice(0, 2).join(" ");
  const destEstW = destLabel.length * destFontSize * 0.65;
  const destBoxX = anchor==="start" ? Number(x)-2 : (anchor==="end" ? Number(x)-destEstW+2 : Number(x)-destEstW/2);
  
  // Casilla km y horas: calcular punto medio entre inicio y fin del día
  let kmHoursBox = "";
  const distStr = d.distance ? `${d.distance} km` : "";
  const timeStr = d.time ? `${d.time}` : "";
  const infoText = (distStr && timeStr) ? `${distStr} · ${timeStr}` : (distStr || timeStr || "");
  if(infoText){
    const midX = (X(first.lon) + X(last.lon)) / 2;
    const midY = (Y(first.lat) + Y(last.lat)) / 2;
    const boxW = infoText.length * 6 + 18;
    kmHoursBox = `
    <rect x="${(midX-boxW/2).toFixed(1)}" y="${(midY-11).toFixed(1)}" width="${boxW.toFixed(1)}" height="22" rx="11" fill="${bg}" stroke="${lineColor}" stroke-width="0.8" opacity=".9"/>
    <text x="${midX.toFixed(1)}" y="${(midY+3).toFixed(1)}" font-size="9" font-family="'Roboto Mono',ui-monospace,monospace" fill="${dotColor}" text-anchor="middle" font-weight="500">${escapeXML(infoText)}</text>`;
  }
  
  markers += `<g class="fm-day" data-day="${d.day}">
    ${dayLine}
    ${kmHoursBox}
    <circle cx="${x}" cy="${y}" r="7" fill="${dotColor}" stroke="${bg}" stroke-width="2.5"/>
    <circle cx="${x}" cy="${y}" r="12" fill="none" stroke="${dotColor}" stroke-width="1" opacity=".4"/>
    <rect x="${boxX.toFixed(1)}" y="${(labY-fontSize+1).toFixed(1)}" width="${estW.toFixed(1)}" height="${(fontSize+5).toFixed(1)}" rx="4" fill="${bg}" opacity=".92"/>
    <text x="${x}" y="${labY}" font-size="${fontSize}" font-weight="700" font-family="'Roboto Mono',ui-monospace,monospace" fill="rgba(46,38,24,.9)" text-anchor="${anchor}">${label}</text>
    <rect x="${destBoxX.toFixed(1)}" y="${(destY-destFontSize+0.5).toFixed(1)}" width="${destEstW.toFixed(1)}" height="${(destFontSize+3).toFixed(1)}" rx="2.5" fill="${bg}" opacity=".85"/>
    <text x="${x}" y="${destY}" font-size="${destFontSize}" font-weight="500" font-family="'Roboto Mono',ui-monospace,monospace" fill="rgba(46,38,24,.7)" text-anchor="${anchor}">${destLabel}</text>
  </g>`;
});

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${bg}"/>
    ${coastline}
    ${markers}
  </svg>`;
}

function renderFullMap(){
  const elNorth = document.getElementById("full-map-north");
  const elSouth = document.getElementById("full-map-south");
  if(elNorth && !elNorth.dataset.rendered){
    elNorth.innerHTML = fullTripMapSVG("kruger");
    elNorth.dataset.rendered = "1";
    renderDayToggles("full-map-north-days", "full-map-north", TRIP.days.filter(d=>d.day<=6));
    const expandBtn = document.getElementById("expand-full-map-north");
    if(expandBtn) expandBtn.addEventListener("click", ()=>{
      MapViewer.open({
        type:"svg", markup: elNorth.querySelector("svg").outerHTML,
        days: TRIP.days.filter(d=>d.day<=6), activeColor:"#8C4A22",
        syncToggleId:"full-map-north-days", syncMapId:"full-map-north"
      });
    });
  }
  if(elSouth && !elSouth.dataset.rendered){
    elSouth.innerHTML = fullTripMapSVG("capetown");
    elSouth.dataset.rendered = "1";
    renderDayToggles("full-map-south-days", "full-map-south", TRIP.days.filter(d=>d.day>=7));
    const expandBtn = document.getElementById("expand-full-map-south");
    if(expandBtn) expandBtn.addEventListener("click", ()=>{
      MapViewer.open({
        type:"svg", markup: elSouth.querySelector("svg").outerHTML,
        days: TRIP.days.filter(d=>d.day>=7), activeColor:"#2E6B5E",
        syncToggleId:"full-map-south-days", syncMapId:"full-map-south"
      });
    });
  }
}

function renderDayToggles(containerId, mapElId, days){
  const el = document.getElementById(containerId);
  if(!el || el.dataset.rendered) return;
  el.innerHTML = days.map(d => `<button class="day-pill active" data-day="${d.day}">${d.day}</button>`).join("");
  el.querySelectorAll(".day-pill").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      btn.classList.toggle("active");
      const day = btn.dataset.day;
      const group = document.querySelector(`#${mapElId} .fm-day[data-day="${day}"]`);
      if(group) group.style.display = btn.classList.contains("active") ? "" : "none";
    });
  });
  el.dataset.rendered = "1";
}


function renderPhrases(){
  const el = document.getElementById("phrase-grid");
  if(!el || el.dataset.rendered) return;
  el.innerHTML = LOCAL_PHRASES.map(p => `
    <div class="phrase-card">
      <div class="phrase-term">${p.term}</div>
      <div class="phrase-meaning">${p.meaning}</div>
    </div>
  `).join("") + `
    <div class="tip" style="margin-top:2px;">
      ${icon("info")}
      <span><b>Ojo con «robot»:</b> en Sudáfrica significa semáforo, no un droide — «turn left at the robot» es «gira a la izquierda en el semáforo».</span>
    </div>`;
  el.dataset.rendered = "1";
}





/* ============ RENDER: DAY LIST ============ */
let currentLeg = "all";
let currentQuery = "";

function matchesFilter(day){
  if(currentLeg!=="all" && day.leg!==currentLeg) return false;
  if(!currentQuery) return true;
  const q = currentQuery.toLowerCase();
  const hay = [day.title, day.from, day.to, day.summary, day.stay.name, ...day.stops.map(s=>s.name)].join(" ").toLowerCase();
  return hay.includes(q);
}

function renderDayList(){
  const list = document.getElementById("day-list");
  const days = TRIP.days.filter(matchesFilter);
  if(days.length===0){
    list.innerHTML = `<div class="empty">${icon("search")}<p>No hay ningún día que coincida con la búsqueda.</p></div>`;
    return;
  }
  let html = "";
  let lastLeg = null;
  days.forEach(day=>{
    if(day.leg!==lastLeg){
      html += `<div class="section-label">${LEG_LABEL[day.leg]}</div>`;
      lastLeg = day.leg;
    }
    const st = stayStatus(day.day);
    html += `
    <button class="card" data-leg="${day.leg}" data-day="${day.day}">
      <div class="card-main">
        <div class="card-top">
          <span class="card-daytag">Día ${day.day}</span>
          <span class="card-date">${dowLabel(day.date)} · ${dateLabel(day.date)}</span>
        </div>
        <div class="card-route">${day.fromCode}<span class="arrow">→</span>${day.toCode}</div>
        ${day.subtitle ? `<div class="card-title">${day.subtitle}</div>` : ""}
        <div class="card-sub">${day.summary}</div>
        <div class="card-bottom">
          <span class="chip">${icon("bed")}${day.stay.name}</span>
          <span class="status-pill ${st}">${st==="confirmed"?"Confirmado":"Pendiente"}</span>
        </div>
      </div>
      <div class="stub">
        <div class="stub-num">${String(day.day).padStart(2,"0")}</div>
        ${icon(day.leg==="capetown" ? "wave" : "paw")}
      </div>
<!-- <svg class="card-chevron"><use href="#i-chevron"/></svg> -->
</button>`;
  });
  list.innerHTML = html;
  list.querySelectorAll(".card").forEach(el=>{
    el.addEventListener("click", ()=> openDay(Number(el.dataset.day)));
  });
  
  // Cambiar background de página según tarjetas visibles
  if(days.length > 0){
    const allCapeTown = days.every(d => d.leg === "capetown");
    const allKruger = days.every(d => d.leg === "kruger");
    const onlyCapeTown = currentLeg === "capetown";
    const onlyKruger = currentLeg === "kruger";
    
    document.getElementById("app").classList.remove("leg-capetown", "leg-kruger");
    
    if(onlyCapeTown && allCapeTown){
      document.getElementById("app").classList.add("leg-capetown");
    } else if(onlyKruger && allKruger){
      document.getElementById("app").classList.add("leg-kruger");
    }
  }
}

/* ============ RENDER: DAY DETAIL ============ */
function openDay(dayNum){
  const day = TRIP.days.find(d=>d.day===dayNum);
  const legClass = "leg-"+day.leg;
  const st = stayStatus(day.day);
  const note = STORE.stayNotes[day.day] || "";

  let timelineHtml = "";
  day.stops.forEach(s=>{
    timelineHtml += `
    <div class="tl-item ${s.isHL?"hl":""}">
      <div class="tl-dot"></div>
      <div class="tl-time">${s.time}</div>
      <div class="tl-name">${s.name}</div>
      <div class="tl-note">${s.note}</div>
      ${s.stars ? `<div class="tl-stars">${starsStr(s.stars)}</div>` : ""}
    </div>`;
  });

  const hls = day.stops.filter(s=>s.isHL);
  let hlHtml = hls.map(s=>`
    <div class="hl-card">
      <div class="hl-card-top">
        <div class="name">${s.name}</div>
        ${s.stars ? `<div class="stars">${starsStr(s.stars)}</div>` : ""}
      </div>
      <div class="desc">${s.note}</div>
    </div>`).join("");

  let tipsHtml = (day.tips||[]).map(t=>`<div class="tip">${icon("info")}<span>${t}</span></div>`).join("");

  const gmapsUrl = GMAPS_URLS[day.day] || `https://www.google.com/maps/search/${encodeURIComponent(day.to)}`;

  const flightHtml = day.flight ? `
    <div class="section">
      <div class="section-head">${icon("compass")}<h3>Vuelo</h3></div>
      <div class="stay-card">
        <div class="stay-top">
          <div><div class="stay-name">${day.flight.label}</div><div class="stay-area">${day.flight.detail}</div></div>
          <span class="status-pill confirmed">Confirmado</span>
        </div>
      </div>
    </div>` : "";

  document.getElementById("overlay-inner").innerHTML = `
    <div class="detail-hero ${legClass}">
      <div class="detail-hero-top">
        <button class="closebtn" id="close-detail"><svg><use href="#i-close"/></svg></button>
        <span class="detail-daytag">Día ${day.day} de 13</span>
      </div>
      <div class="detail-route">${day.fromCode}<span class="arrow">→</span>${day.toCode}</div>
      ${day.subtitle ? `<div class="detail-title">${day.subtitle}</div>` : ""}
      <div class="detail-date">${dowLabel(day.date)} · ${dateLabel(day.date)} 2026</div>
    </div>

    ${flightHtml}

    <div class="section ${legClass}">
      <div class="section-head">${icon("map")}<h3>Ruta del día</h3></div>
<div class="mapbox-wrap">
  <div class="mapbox">${dayMapSVG(day)}</div>
  <button class="mapbox-expand" id="expand-map">${icon("expand")}</button>
</div>      

<div class="map-caption">${icon("info")}<span>Mapa esquemático, no es de navegación real — muestra el orden y la posición relativa de las paradas.</span></div>
      <a class="maplink" href="${gmapsUrl}" target="_blank" rel="noopener">${icon("compass")}Abrir ruta en Google Maps (requiere conexión)</a>
      <a class="maplink" href="${MYMAPS_URL}" target="_blank" rel="noopener" style="margin-left:8px;">${icon("map")}Ver en nuestro mapa completo (requiere conexión)</a>
    </div>

    <div class="section ${legClass}">
      <div class="section-head">${icon("route")}<h3>Plan del día</h3></div>
      <div class="timeline">${timelineHtml}</div>
    </div>

    ${hlHtml ? `<div class="section ${legClass}">
      <div class="section-head">${icon("star")}<h3>Highlights</h3></div>
      <div class="hl-grid">${hlHtml}</div>
    </div>` : ""}

    <div class="section ${legClass}">
      <div class="section-head">${icon("bed")}<h3>Dónde dormimos</h3></div>
      <div class="stay-card">
        <div class="stay-top">
          <div><div class="stay-name">${day.stay.name}</div><div class="stay-area">${day.stay.area}</div></div>
        </div>
        <div class="stay-toggle">
          <div class="switch ${st==="confirmed"?"on":""}" id="stay-switch"></div>
          <div class="stay-toggle-label">${st==="confirmed"?"Reserva confirmada":"Marcar como confirmada"}</div>
        </div>
        <textarea class="stay-note" id="stay-note" placeholder="Notas: nº de reserva, enlace, contacto…">${note}</textarea>
        <div class="stay-hint">Esto se guarda solo en este móvil. Si confirmáis la reserva, contádmelo por chat y os regenero la app actualizada para los dos.</div>
      </div>
    </div>

    ${tipsHtml ? `<div class="section ${legClass}">
      <div class="section-head">${icon("info")}<h3>Consejos</h3></div>
      ${tipsHtml}
    </div>` : ""}

    <div class="action-row">
      <a class="actionbtn" href="${gmapsUrl}" target="_blank" rel="noopener">${icon("compass")}Google Maps</a>
      <button class="actionbtn" id="share-day">${icon("download")}Compartir día</button>
    </div>
  `;

  document.getElementById("close-detail").addEventListener("click", closeDay);
  document.getElementById("expand-map").addEventListener("click", ()=>{
  MapViewer.open({ type:"svg", markup: dayMapSVG(day) });
});
  document.getElementById("stay-switch").addEventListener("click", ()=>{
    const cur = stayStatus(day.day);
    STORE.stayStatus[day.day] = cur==="confirmed" ? "pending" : "confirmed";
    persist();
    openDay(dayNum); // re-render detail
    renderDayList();
  });
  document.getElementById("stay-note").addEventListener("input", (e)=>{
    STORE.stayNotes[day.day] = e.target.value;
    persist();
  });
  const shareBtn = document.getElementById("share-day");
  if(shareBtn) shareBtn.addEventListener("click", ()=>{
    const text = `Día ${day.day} (${dateLabel(day.date)}): ${day.title}\n${day.fromCode} → ${day.toCode}\nDormimos en ${day.stay.name}`;
    if(navigator.share){ navigator.share({ title: day.title, text }).catch(()=>{}); }
    else { navigator.clipboard?.writeText(text); shareBtn.querySelector("span")?.remove(); }
  });

  // Añadir clase de leg al overlay para cambiar background
  document.getElementById("overlay").classList.remove("leg-kruger", "leg-capetown");
  document.getElementById("overlay").classList.add("leg-" + day.leg);
  document.getElementById("overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDay(){
  document.getElementById("overlay").classList.remove("open");
  document.getElementById("overlay").classList.remove("leg-kruger", "leg-capetown");
  document.body.style.overflow = "";
}

/* ============ RENDER: OVERVIEW ============ */
function renderOverview(){
  const table = document.getElementById("nights-table");
  let html = "";
  TRIP.days.forEach(d=>{
    const st = stayStatus(d.day);
    html += `<div class="nights-row">
      <div class="nd">${dateLabel(d.date)}</div>
      <div class="nn">${d.stay.name}</div>
      <span class="status-pill ${st}">${st==="confirmed"?"OK":"Pendiente"}</span>
    </div>`;
  });
  table.innerHTML = html;

  const checklist = document.getElementById("checklist");
  let chtml = "";
  RESERVATIONS_STATIC.forEach(r=>{
    const stKey = "res:"+r.key;
    const done = STORE.checklist[stKey] ?? (r.status==="confirmed");
    chtml += `<div class="check-item ${done?"done":""}" data-key="${stKey}">
      <div class="checkbox ${done?"on":""}">${icon("check")}</div>
      <div class="ct">${r.label}<span class="sub">${r.detail}</span></div>
    </div>`;
  });
  TRIP.days.forEach(d=>{
    if(d.stay.area === "Zona a confirmar" || d.stay.area === "Panorama Route" || !d.stay.area){
      const stKey = "stay:"+d.day;
      const done = stayStatus(d.day)==="confirmed";
      chtml += `<div class="check-item ${done?"done":""}" data-key="stay-link:${d.day}">
        <div class="checkbox ${done?"on":""}">${icon("check")}</div>
        <div class="ct">Reservar alojamiento — Día ${d.day}<span class="sub">${d.stay.name}</span></div>
      </div>`;
    }
  });
  checklist.innerHTML = chtml;
  checklist.querySelectorAll(".check-item").forEach(el=>{
    el.addEventListener("click", ()=>{
      const key = el.dataset.key;
      if(key.startsWith("stay-link:")){
        const day = Number(key.split(":")[1]);
        STORE.stayStatus[day] = stayStatus(day)==="confirmed" ? "pending" : "confirmed";
      } else {
        STORE.checklist[key] = !(STORE.checklist[key] ?? false);
      }
      persist();
      renderOverview();
    });
  });
}

/* ============ NAV ============ */
function showPage(name){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("page-"+name).classList.add("active");
  document.querySelectorAll(".navbtn").forEach(b=>b.classList.toggle("active", b.dataset.page===name));
  if(name==="overview"){ renderOverview(); renderFullMap(); }
  if(name==="info") renderFullMap();
  if(name==="info") renderPhrases();
}

/* ============ COUNTDOWN ============ */
function updateCountdown(){
  const now = new Date();
  const start = parseDate(TRIP.start);
  const end = parseDate(TRIP.end);
  const numEl = document.getElementById("countdown-num");
  const lblEl = document.getElementById("countdown-lbl");
  const oneDay = 86400000;
  if(now < start){
    const days = Math.ceil((start-now)/oneDay);
    numEl.textContent = days;
    lblEl.textContent = days===1 ? "día" : "días";
  } else if(now <= end){
    const dayNum = Math.floor((now-start)/oneDay)+1;
    numEl.textContent = "D"+dayNum;
    lblEl.textContent = "en curso";
  } else {
    numEl.textContent = "✓";
    lblEl.textContent = "terminado";
  }
}

/* ============ VISOR v2 (imágenes y SVG, pantalla completa) ============ */
const MapViewer = (() => {
  const modal  = () => document.getElementById("map-zoom-modal");
  const stage  = () => document.getElementById("mv-stage");
  const media  = () => document.getElementById("mv-media");

  const dayToggles = () => document.getElementById("mv-day-toggles");

  function renderModalDayToggles(opts){
    const el = dayToggles();
    if(!el) return;
    if(!opts.days || !opts.days.length){ el.innerHTML = ""; return; }
    const miniRow = opts.syncToggleId ? document.getElementById(opts.syncToggleId) : null;
    el.innerHTML = opts.days.map(d=>{
      const miniBtn = miniRow ? miniRow.querySelector(`.day-pill[data-day="${d.day}"]`) : null;
      const isActive = miniBtn ? miniBtn.classList.contains("active") : true;
      const style = isActive ? ` style="background:${opts.activeColor};color:#fff;border-color:${opts.activeColor};"` : "";
      return `<button class="day-pill${isActive?" active":""}" data-day="${d.day}"${style}>${d.day}</button>`;
    }).join("");
    el.querySelectorAll(".day-pill").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const day = btn.dataset.day;
        const willActivate = !btn.classList.contains("active");
        btn.classList.toggle("active", willActivate);
        btn.style.background = willActivate ? opts.activeColor : "";
        btn.style.color = willActivate ? "#fff" : "";
        btn.style.borderColor = willActivate ? opts.activeColor : "";
        const groupModal = media().querySelector(`.fm-day[data-day="${day}"]`);
        if(groupModal) groupModal.style.display = willActivate ? "" : "none";
        if(miniRow){
          const miniBtn = miniRow.querySelector(`.day-pill[data-day="${day}"]`);
          if(miniBtn) miniBtn.classList.toggle("active", willActivate);
          const miniMapEl = opts.syncMapId ? document.getElementById(opts.syncMapId) : null;
          const groupMini = miniMapEl ? miniMapEl.querySelector(`.fm-day[data-day="${day}"]`) : null;
          if(groupMini) groupMini.style.display = willActivate ? "" : "none";
        }
      });
    });
  }

  const state = { scale:1, fitScale:1, rotation:0, tx:0, ty:0, naturalW:600, naturalH:400 };
  const activePointers = new Map();
  let dragging = false, lastX=0, lastY=0;
  let pinchStartDist = null, pinchStartScale = 1;
  let lastTapTime = 0;

  const clamp = (v,min,max)=> Math.min(max, Math.max(min, v));
  const availSize = () => ({ w: window.innerWidth*0.94, h: window.innerHeight*0.82 });
  const centerOf = (el) => { const r=el.getBoundingClientRect(); return {cx:r.left+r.width/2, cy:r.top+r.height/2}; };

  function computeFitScale(){
    const { w:availW, h:availH } = availSize();
    const swapped = state.rotation % 180 !== 0;
    const effW = swapped ? state.naturalH : state.naturalW;
    const effH = swapped ? state.naturalW : state.naturalH;
    return Math.min(availW/effW, availH/effH);
  }

  function clampPan(){
    const { w:availW, h:availH } = availSize();
    const swapped = state.rotation % 180 !== 0;
    const scaledW = (swapped ? state.naturalH : state.naturalW) * state.scale;
    const scaledH = (swapped ? state.naturalW : state.naturalH) * state.scale;
    const maxX = Math.max(0, (scaledW-availW)/2);
    const maxY = Math.max(0, (scaledH-availH)/2);
    state.tx = clamp(state.tx, -maxX, maxX);
    state.ty = clamp(state.ty, -maxY, maxY);
  }

  function render(){
    const el = media();
    if(!el) return;
    el.style.width  = state.naturalW + "px";
    el.style.height = state.naturalH + "px";
    el.style.transform =
      `translate(-50%, -50%) translate(${state.tx}px, ${state.ty}px) rotate(${state.rotation}deg) scale(${state.scale})`;
  }

  function setScaleAnchored(newScale, anchorX, anchorY){
    newScale = clamp(newScale, state.fitScale, state.fitScale*10);
    const ratio = newScale / state.scale;
    state.tx = anchorX - (anchorX - state.tx) * ratio;
    state.ty = anchorY - (anchorY - state.ty) * ratio;
    state.scale = newScale;
    clampPan();
    render();
  }

  function reset(){
    state.fitScale = computeFitScale();
    state.scale = state.fitScale;
    state.tx = 0; state.ty = 0;
    render();
  }

  function rotate(){
    const wasFitted = Math.abs(state.scale - state.fitScale) < 0.001;
    state.rotation = (state.rotation + 90) % 360;
    state.fitScale = computeFitScale();
    if(wasFitted) state.scale = state.fitScale;
    clampPan();
    render();
  }

  function toggleDoubleTap(cx, cy){
    const target = Math.abs(state.scale - state.fitScale) < 0.001 ? state.fitScale*2.5 : state.fitScale;
    setScaleAnchored(target, cx, cy);
  }

function open(opts){
    const el = media();
    el.innerHTML = "";
    state.rotation = 0; state.tx = 0; state.ty = 0;

  if(opts.type === "svg"){
      const bgMatch = opts.markup.match(/<rect[^>]*fill="([^"]+)"/);
      modal().style.background = bgMatch ? bgMatch[1] : "";
    } else {
      modal().style.background = "";
    }
    renderModalDayToggles(opts);

    const finish = () => {
      modal().classList.add("open");
      document.body.style.overflow = "hidden";
      reset();
    };

    if(opts.type === "image"){
      const img = new Image();
      img.alt = opts.alt || "";
      img.decoding = "async";
      img.onload = ()=>{
        state.naturalW = img.naturalWidth;
        state.naturalH = img.naturalHeight;
        el.appendChild(img);
        finish();
      };
      img.src = opts.src;
    } else if(opts.type === "svg"){
      el.innerHTML = opts.markup;
      const svg = el.querySelector("svg");
      const vb = (svg?.getAttribute("viewBox")||"0 0 600 400").split(/\s+/).map(Number);
      state.naturalW = vb[2] || 600;
      state.naturalH = vb[3] || 400;
      svg?.removeAttribute("width");
      svg?.removeAttribute("height");
      finish();
    }
  }

  function close(){
    modal().classList.remove("open");
    document.body.style.overflow = "";
  }

  function endPointer(e){
    activePointers.delete(e.pointerId);
    if(activePointers.size === 1){
      const rem = Array.from(activePointers.values())[0];
      dragging = true; lastX = rem.x; lastY = rem.y;
      pinchStartDist = null;
    } else if(activePointers.size === 0){
      dragging = false; pinchStartDist = null;
      const now = Date.now();
      if(now - lastTapTime < 280){
        const { cx, cy } = centerOf(stage());
        toggleDoubleTap(e.clientX - cx, e.clientY - cy);
      }
      lastTapTime = now;
    } else {
      dragging = false;
    }
  }

  function init(){
    document.getElementById("map-zoom-close").addEventListener("click", close);
    document.getElementById("map-zoom-rotate").addEventListener("click", rotate);
    modal().addEventListener("click", (e)=>{ if(e.target.id==="map-zoom-modal") close(); });
    modal().addEventListener("contextmenu", (e)=> e.preventDefault());

    const st = stage();

    st.addEventListener("wheel", (e)=>{
      e.preventDefault();
      const { cx, cy } = centerOf(st);
      const factor = e.deltaY < 0 ? 1.12 : 1/1.12;
      setScaleAnchored(state.scale*factor, e.clientX-cx, e.clientY-cy);
    }, { passive:false });

    st.addEventListener("dblclick", (e)=>{
      const { cx, cy } = centerOf(st);
      toggleDoubleTap(e.clientX-cx, e.clientY-cy);
    });

    st.addEventListener("pointerdown", (e)=>{
      st.setPointerCapture(e.pointerId);
      activePointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
      if(activePointers.size === 1){ dragging=true; lastX=e.clientX; lastY=e.clientY; }
      else { dragging=false; pinchStartDist=null; }
    });

    st.addEventListener("pointermove", (e)=>{
      if(!activePointers.has(e.pointerId)) return;
      activePointers.set(e.pointerId, {x:e.clientX, y:e.clientY});

      if(activePointers.size === 2){
        const pts = Array.from(activePointers.values());
        const dist = Math.hypot(pts[0].x-pts[1].x, pts[0].y-pts[1].y);
        const midX = (pts[0].x+pts[1].x)/2, midY = (pts[0].y+pts[1].y)/2;
        const { cx, cy } = centerOf(st);
        if(pinchStartDist == null){ pinchStartDist=dist; pinchStartScale=state.scale; }
        else setScaleAnchored(pinchStartScale*(dist/pinchStartDist), midX-cx, midY-cy);
        return;
      }
      if(dragging){
        state.tx += e.clientX-lastX; state.ty += e.clientY-lastY;
        lastX=e.clientX; lastY=e.clientY;
        clampPan(); render();
      }
    });

    ["pointerup","pointercancel"].forEach(ev=> st.addEventListener(ev, endPointer));
    window.addEventListener("resize", ()=>{ if(modal().classList.contains("open")) reset(); });
  }

  return { init, open, close };
})();



function initParkMapViewer(){
  const btn = document.getElementById("expand-park-map");
  if(!btn) return;
  btn.addEventListener("click", ()=>{
    MapViewer.open({ type:"image", src:"kruger-park-map.jpg", alt:"Plano del Kruger" });
  });
}


function renderCustomsDeadline(){
  const el = document.getElementById("customs-deadline");
  if(!el) return;
  const arrival = parseDate(TRIP.start);
  const deadline = new Date(arrival.getFullYear(), arrival.getMonth(), arrival.getDate()-1);
  const iso = `${deadline.getFullYear()}-${String(deadline.getMonth()+1).padStart(2,"0")}-${String(deadline.getDate()).padStart(2,"0")}`;
  el.textContent = dateLabel(iso);
}




/* ============ INIT ============ */
function init(){
  renderDayList();
  updateCountdown();
  MapViewer.init();
  initCurrencyConverter();
  initParkMapViewer();
  setInterval(updateCountdown, 60*60*1000);
  renderCustomsDeadline();

  document.querySelectorAll(".tab").forEach(tab=>{
    tab.addEventListener("click", ()=>{
      document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");
      currentLeg = tab.dataset.leg;
      // Cambiar clase de background según el leg
      if(currentLeg === "capetown"){
        document.getElementById("app").classList.add("leg-capetown");
      } else {
        document.getElementById("app").classList.remove("leg-capetown");
      }
      renderDayList();
    });
  });

  document.getElementById("search").addEventListener("input", (e)=>{
    currentQuery = e.target.value.trim();
    renderDayList();
  });

  document.querySelectorAll(".navbtn").forEach(b=>{
    b.addEventListener("click", ()=> showPage(b.dataset.page));
  });

  document.getElementById("overlay").addEventListener("click", (e)=>{
    if(e.target.id==="overlay") closeDay();
  });

  // Install banner
  let deferredPrompt = null;
  const bar = document.getElementById("installbar");
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  const installDismissed = localStorage.getItem("sa-trip-install-dismissed") === "1";
function dismissInstallBar(){
  bar.style.display = "none";  // Ocultar completamente
  bar.classList.remove("show");
  try{ localStorage.setItem("sa-trip-install-dismissed", "1"); }catch(e){}
}

// Manejo separado de iOS y Android

  document.getElementById("install-close").addEventListener("click", (e)=>{
    e.stopPropagation();
    e.preventDefault();
    dismissInstallBar();  // Ahora se oculta
  });
  
  if(isIOS){
} else {
  // Android/Web
  window.addEventListener("beforeinstallprompt", (e)=>{
    e.preventDefault();
    deferredPrompt = e;
    bar.classList.add("show");
    
    // Listener mejorado con userChoice
    bar.addEventListener("click", (clickEvent)=>{
      if(clickEvent.target.closest("#install-close")) {
        clickEvent.stopPropagation();
        clickEvent.preventDefault();
        dismissInstallBar();
        return;
      }
      // ...
    });
  });
}

// Si ya está instalada, ocultar directamente
if(isStandalone || installDismissed) {
  bar.style.display = "none";
}

  // Service worker
  if("serviceWorker" in navigator){
    window.addEventListener("load", ()=>{
      navigator.serviceWorker.register("sw.js").catch(()=>{});
    });
  }

  

let lastScrollTop = 0;
const tolerance = 10; // Pixeles mínimos para ignorar micro-movimientos

window.addEventListener("scroll", () => {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return; 
  
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Si el movimiento es insignificante, no hagas nada
  if (Math.abs(lastScrollTop - scrollTop) <= tolerance) return;

  // SOLUCIÓN AL TEMBLOR: Al llegar abajo del todo, se queda visible fijamente
  if (scrollTop + windowHeight >= documentHeight - 30) {
    topbar.classList.remove("hidden");
    topbar.classList.add("visible");
    lastScrollTop = scrollTop;
    return;
  }

  // COMPORTAMIENTO DE SCROLL
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Bajando: Esconder
    topbar.classList.add("hidden");
    topbar.classList.remove("visible");
  } else if (scrollTop < lastScrollTop) {
    // Subiendo: Mostrar de forma fluida y sin saltos bruscos
    topbar.classList.remove("hidden");
    topbar.classList.add("visible");
  }

  // Guarda la posición actual controlando el scroll elástico
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

}
document.addEventListener("DOMContentLoaded", init);
