const config = {
    apiBackend: 'your-domain/api',
    apiWebSocketEndpoint: "wss://your-domain/ws/sensors/",
    plausible: {
        domain: "your-domain", 
        src: "your-plausible-domain/js/script.js",
    },
    dataSourceUrls: {
        geoportal: "https://www.kaiserslautern.de/sozial_leben_wohnen/geoportal/index.html.de",
        event_calendar: "https://www.kaiserslautern.de/tourismus_freizeit_kultur/veranstaltungen/index.html.de",
        ris_calendar: "https://ris.kaiserslautern.de/buergerinfo/info.asp",
        wga_calendar: "https://www.wasgehtapp.de/",
    },
    emailAddressContact: "your-email"
};

export default config;