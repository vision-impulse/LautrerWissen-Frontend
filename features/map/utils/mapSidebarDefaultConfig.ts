/**
 * @file This file is part of LautrerWissen
 * @author Benjamin Bischke
 * @copyright 2025 Vision Impulse GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import config from '@/config';
import { LayerGroup } from '@/types/map-ui';

const apiConfig = {  
  apiBackendWikiCulturalMonument: "/wiki/wikiculturalmonument",
  apiBackendWikiNaturalMonument: "/wiki/wikinaturalmonument",
  apiBackendWikiFountain: "/wiki/wikifountain",
  apiBackendWikiFishSculpture: "/wiki/wikifishsculpture",
  apiBackendWikiRitterstein: "/wiki/wikiritterstein",
  apiBackendWikiBrewery: "/wiki/wikibrewery",
  apiBackendWikiStolperstein: "/wiki/wikistolperstein",
  apiBackendWikiNaturalReserve: "/wiki/wikinaturalreserve",
  apiBackendWikiSacralBuilding: "/wiki/wikisacralbuilding",

  apiBackendGeoWikiCulturalMonument: "/geo/wikiculturalmonument",
  apiBackendGeoWikiNaturalMonument: "/geo/wikinaturalmonument",
  apiBackendGeoWikiFountain: "/geo/wikifountain",
  apiBackendGeoWikiFishSculpture: "/geo/wikifishsculpture",
  apiBackendGeoWikiRitterstein: "/geo/wikiritterstein",
  apiBackendGeoWikiBrewery: "/geo/wikibrewery",
  apiBackendGeoWikiStolperstein: "/geo/wikistolperstein",
  apiBackendGeoWikiNaturalReserve: "/geo/wikinaturalreserve",
  apiBackendGeoWikiSacralBuilding: "/geo/wikisacralbuilding",

  apiBackendGeoCemetery: "/geo/osmcemetery",
  apiBackendGeoRecyclingContainer: "/geo/osmrecyclingcontainer",
  apiBackendGeoRecyclingCenter: "/geo/osmrecyclingcenter",
  apiBackendGeoVendingMachineDogtoilet: "/geo/osmvendingmachinedogtoilet",
  apiBackendGeoVendingMachineParkingTicket: "/geo/osmvendingmachineparkingticket",
  apiBackendGeoLeisureDance: "/geo/osmleisuredance",
  apiBackendGeoDrivingSchool: "/geo/osmdrivingschool",
  apiBackendGeoMusicSchool: "/geo/osmmusicschool",
  apiBackendGeoMiniatureGolf: "/geo/osmminiaturegolf",
  apiBackendGeoEscapeGame: "/geo/osmescapegame",
  apiBackendGeoZoo: "/geo/osmzoo",
  apiBackendGeoCopyShop: "/geo/osmcopyshop",
  apiBackendGeoCinema: "/geo/osmcinema",
  
  apiBackendGeoFieldTest: "/geo/klfieldtestmeasurements",
  apiBackendGeoAdvertisingColumn: "/geo/osmadvertisingcolumn",
  apiBackendGeoSportCenterClimbing: "/geo/osmsportcenterclimbing",
  apiBackendGeoSportCenterSwimming: "/geo/osmsportcenterswimming",
  apiBackendGeoVolleyball: "/geo/osmvolleyball",
  apiBackendGeoNatureReserve: "/geo/osmnaturereserve",

  apiBackendGeoAmenityParkingPublic: "/geo/osmamenityparking/?Zugang=Ja",
  apiBackendGeoAmenityParkingPrivate: "/geo/osmamenityparking/?Zugang=privat",
  apiBackendGeoAmenityParkingCustomers: "/geo/osmamenityparking/?Zugang__in=Kunden,Erlaubt",
  apiBackendGeoAmenityParkingDisabled: "/geo/osmamenityparking/?Kapazität%20Behindertenparkplätze__gte=1",
  apiBackendGeoAmenityParkingAccessMissing: "/geo/osmamenityparking/?Zugang__missing=true",

  apiBackendGeoBicycleParking: "/geo/osmbicycleparking",
  apiBackendGeoBicycleRepairStation: "/geo/osmbicyclerepairstation",
  apiBackendGeoCarRental: "/geo/osmcarrental",
  apiBackendGeoBicycleRental: "/geo/osmbicyclerental",
  apiBackendGeoPostBox: "/geo/osmpostbox",
  apiBackendGeoParcelLocker: "/geo/osmparcellocker",

  apiBackendGeoSportBasketball: "/geo/osmsportbasketball",
  apiBackendGeoSportSoccer: "/geo/osmsportsoccer",
  apiBackendGeoSportTennis: "/geo/osmsporttennis",
  apiBackendGeoLeisurePlayground: "/geo/osmleisureplayground",
  apiBackendGeoOsmAmenityWasteBasket: "/geo/osmamenitywastebasket",
  apiBackendGeoOsmAmenityBench: "/geo/osmamenitybench",
  apiBackendGeoOsmAmenityDrinkingwater: "/geo/osmamenitydrinkingwater",
  apiBackendGeoOsmNaturalTrees: "/geo/osmnaturaltrees",
  apiBackendGeoOsmAmenityToilets: "/geo/osmamenitytoilets",
  apiBackendGeoOsmAmenityToiletsNetteToilette: "/geo/osmamenitytoilets/?Betreiber=Nette%20Toilette",
  apiBackendGeoOsmAmenityToiletsOthers: "/geo/osmamenitytoilets/?Betreiber__ne=Nette%20Toilette",

  apiBackendGeoKlConstructionSite: "/geo/klconstructionsite",
  apiBackendGeoKlParkingLocation: "/geo/klparkinglocation",
  apiBackendGeoKlParkingzone: "/geo/klparkingzone",
  apiBackendGeoKlVaccantLot: "/geo/klvacantlot",
  apiBackendGeoKlLandUsePlan: "/geo/kllanduseplan",
  apiBackendGeoKlSensors: "/geo/klenvironmentalsensor",
  apiBackendGeoTTNGateway: "/geo/ttngateway",
  apiBackendGeoKlSculpture: "/geo/klsculpture?",
  apiBackendGeoKlSculptureMonument: "/geo/klsculpture?Kategorie=Denkmal",

  apiBackendGeoKlEduInstitutionSchool: "/geo/kleducationalinstitution?Kategorie=Schule",
  apiBackendGeoKlEduInstitutionKita: "/geo/kleducationalinstitution?Kategorie=Kita",
  apiBackendGeoKlEduInstitutionEducation: "/geo/kleducationalinstitution?Kategorie=Bildung",
  apiBackendGeoKlEduInstitutionConsulting: "/geo/kleducationalinstitution?Kategorie=Beratung",
  apiBackendGeoKlEduInstitutionArt: "/geo/kleducationalinstitution?Kategorie=Kunst%20und%20Kultur",
  apiBackendGeoKlEduInstitutionLanguage: "/geo/kleducationalinstitution?Kategorie=Sprache",

  apiBackendGeoChargingStation: "/geo/chargingstation",
  apiBackendGeoBusStation: "/geo/vrnbusstation",
  apiBackendGeoEmergencyPoint: "/geo/emergencypoint",
  apiBackendGeoWlanhotspot: "/geo/wlanhotspot",
  apiBackendGeoWlanHotspotEmpera: "/geo/wlanhotspot/?Datenquelle=Empera",
  apiBackendGeoWlanHotspotFreifunk: "/geo/wlanhotspot/?Datenquelle=Freifunk",
  apiBackendGeoWlanHotspotMyspot: "/geo/wlanhotspot/?Datenquelle=MySpot",

  wmsGeoBubatzCannabisKonsumVerbotszone: "https://geoportal.kaiserslautern.de/cgi-bin/bubatz_wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=Cannabiskonsumverbot&FORMAT=image/png&SRS=EPSG:4326&TRANSPARENT=false",
  wmsGeoBubatzVerbotCannabisKonsum: "https://geoportal.kaiserslautern.de/cgi-bin/bubatz_wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=Bubatz_100&FORMAT=image/png&SRS=EPSG:4326&TRANSPARENT=false",
  wmsGeoBubatzVerbotAnbauvereinigungen: "https://geoportal.kaiserslautern.de/cgi-bin/bubatz_wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=Bubatz_200&FORMAT=image/png&SRS=EPSG:4326&TRANSPARENT=false",
  wmsGeoFlaechennutzungsplan: "https://geoportal.kaiserslautern.de/cgi-bin/mapserv?map=/var/wms/fnpkl_utm32.map&REQUEST=GetMap&LAYERS=FNP_Stadt_Kaiserslautern&SERVICE=WMS&SRS=EPSG:4326&TRANSPARENT=false&VERSION=1.1.1",  
};


export const DEFAULT_EXPANDED_GROUP_CONFIG: Record<string, string[]> = {
  tourism_group: ['Freizeit, Spiel und Sport', 'Kultur'],
  leisure_group: ['Leben in KL', 'Bildungsstadtplan', 'Planen und Bauen'],
  environment_group: ['Umwelt und Natur', 'Sensorik', 'Recycling / Nachhaltigkeit'],
  education: ['Bildungsstadtplan', ],
  sustainability: ['Recycling / Nachhaltigkeit', ],
  bubatz: ['Bubatzkarte', ],
  citylife: ['Leben in KL', ],
  planning: ['Planen und Bauen', ],
  environment: ['Umwelt und Natur', ],
  sensors: ['Sensorik und Umwelt', ],
  mobility:  ['Verkehr und Mobilität'],
  cultural: ['Kultur', ],
  leisure: ['Freizeit, Spiel und Sport', ],
  religion: ['Religion', ],
};


export const DEFAULT_LAYER_CONFIG: LayerGroup[] = [
    {
      title: 'Bildungsstadtplan', 
      color: '#F1945C',
      layers: {
          "Schulen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionSchool}&format=json`, color: '#000000'},
          "Kita": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionKita}&format=json`, color: '#000000'},
          "Bildung": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionEducation}&format=json`, color: '#000000'},
          "Beratung": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionConsulting}&format=json`, color: '#000000'},
          "Kunst & Kultur": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionArt}&format=json`, color: '#000000'},
          "Sprache": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionLanguage}&format=json`, color: '#000000'},
      },
    },
    {
      title: 'Freizeit, Spiel und Sport',
      color: '#9c27b0',
      layers: {
        "Basketballplätze": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoSportBasketball}/?format=json`, color: '#000000' },
        "Fussballplätze": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoSportSoccer}/?format=json`, color: '#000000' },
        "Spielplätze": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoLeisurePlayground}/?format=json`, color: '#000000' },
        "Tennisplätze": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoSportTennis}/?format=json`, color: '#000000' },
        "Tanzschulen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoLeisureDance}/?format=json`, color: '#000000' },
        "Volleyballfelder": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoVolleyball}/?format=json`, color: '#000000' },
        "Minigolf": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoMiniatureGolf}/?format=json`, color: '#000000' },
        "Schwimmbad": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoSportCenterSwimming}/?format=json`, color: '#000000' },
        "Kino": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoCinema}/?format=json`, color: '#000000' },
        "Kletterhallen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoSportCenterClimbing}/?format=json`, color: '#000000' },
        "Escaperoom": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoEscapeGame}/?format=json`, color: '#000000' },
        "Zoo": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoZoo}/?format=json`, color: '#000000' },
      },
    },
    {
      title: 'Kultur',
      color: '#d06292',
      layers: {
        "Brunnen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWikiFountain}/?format=json`, color: '#000000' },
        "Ehem. Brauereien": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWikiBrewery}/?format=json`, color: '#000000' },
        "Fischskulpturen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWikiFishSculpture}/?format=json`, color: '#000000' },
        "Kulturdenkmäler": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWikiCulturalMonument}/?format=json`, color: '#000000' },
        "Naturdenkmäler": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWikiNaturalMonument}/?format=json`, color: '#000000' },
        "Skulpturen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlSculpture}&format=json`, color: '#000000'},
        "Stolpersteine": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWikiStolperstein}/?format=json`, color: '#000000' },
        "Rittersteine": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWikiRitterstein}/?format=json`, color: '#000000' },
      },
    },
    {
      title: 'Leben in KL',
      color: '#FF9800',
      layers: {
        "Briefkasten": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoPostBox}/?format=json`, color: '#000000'},
        "Packstation": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoParcelLocker}/?format=json`, color: '#000000'},
        "Copyshop": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoCopyShop}/?format=json`, color: '#000000'},
        "Litfaßsäulen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoAdvertisingColumn}/?format=json`, color: '#000000'},
        "Mülleimer": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoOsmAmenityWasteBasket}/?format=json`, color: '#000000' },
        "Sitzbänke": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoOsmAmenityBench}/?format=json`, color: '#000000' },
        "Wasserspender": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoOsmAmenityDrinkingwater}/?format=json`, color: '#000000' },
        "Rettungspunkte": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoEmergencyPoint}/?format=json`, color: '#000000'},
        "Wifi-Hot-Spots": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWlanhotspot}/?format=json`, color: '#000000',
          subLayers: {
            "Empera" : {visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWlanHotspotEmpera}&format=json`, },
            "Freifunk" : {visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWlanHotspotFreifunk}&format=json`, },
            "MySpot" : {visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWlanHotspotMyspot}&format=json`, }            
          },
        },
        "Öffentliche Toiletten": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoOsmAmenityToilets}/?format=json`, color: '#000000',  
          subLayers: {
            "Nette Toilette" : {visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoOsmAmenityToiletsNetteToilette}&format=json`, },            
            "Sonstige" : {visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoOsmAmenityToiletsOthers}&format=json`, }            
          },
       },
      },
    },
    {    
      title: 'Bubatzkarte', 
      color: '#000000',
      layers: {
        "Cannabis Konsum Verbotszone  ": { visible: false, url: `SERVICE=WMS&layer=Cannabiskonsumverbot&URL=https://geoportal.kaiserslautern.de/cgi-bin/bubatz_wms?&SRS=EPSG:4326`, color: '#000000'},
        "Verbot Cannabiskonsum": { visible: false, url: `SERVICE=WMS&layer=Bubatz_100&URL=https://geoportal.kaiserslautern.de/cgi-bin/bubatz_wms?&SRS=EPSG:4326`, color: '#000000'},
        "Verbot Gründung von Anbauvereinigungen": { visible: false, url: `SERVICE=WMS&layer=Bubatz_200&URL=https://geoportal.kaiserslautern.de/cgi-bin/bubatz_wms?&SRS=EPSG:4326`, color: '#000000'},
      },
    },
    {
      title: 'Planen und Bauen',
      color: '#9575cd',
      layers: {
        "Baulandskataster": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlVaccantLot}/?format=json`, color: '#000000' },
        "Baurechtskataster": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlLandUsePlan}/?format=json`, color: '#000000' },        
        "Denkmale - Bauliche Gesamtanlagen": { visible: false, url: `SERVICE=WMS&layer=bga&URL=https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?`, color: '#000000' },
        "Denkmalzonen": { visible: false, url: `SERVICE=WMS&layer=denkmalzonen&URL=https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?`, color: '#000000' },
        "Digitale Topographische Karte (DTK5)": { visible: false, url: `SERVICE=WMS&layer=rp_dtk5&URL=https://geo4.service24.rlp.de/wms/dtk5_rp.fcgi?`, color: '#000000' },
        "Digitale Topographische Karte (DTK25)": { visible: false, url: `SERVICE=WMS&layer=rp_dtk25&URL=https://geo4.service24.rlp.de/wms/rp_dtk25.fcgi?`, color: '#000000' },
        "Einzeldenkmäler Flächen": { visible: false, url: `SERVICE=WMS&layer=edm_flaechen&URL=https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?`, color: '#000000' },
        "Einzeldenkmäler Punkte": { visible: false, url: `SERVICE=WMS&layer=edm_punkte&URL=https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?`, color: '#000000' },
        "Flächennutzungsplan": { visible: false, url: `SERVICE=WMS&layer=FNP_Stadt_Kaiserslautern&URL=https://geoportal.kaiserslautern.de/cgi-bin/mapserv?map=/var/wms/fnpkl_utm32.map`, color: '#000000' },
        "Flurstücke": { visible: false, url: `SERVICE=WMS&layer=Flurstueck&URL=https://geo5.service24.rlp.de/wms/liegenschaften_rp.fcgi?`, color: '#000000' },
      },
    },
    {
      title: 'Recycling / Nachhaltigkeit',
      color: '#4db6ac',
      layers: {
        "Wertstoffhof": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoRecyclingCenter}/?format=json`, color: '#000000' },
        "Recycling-Container": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoRecyclingContainer}/?format=json`, color: '#000000' },
        "Hundekotbeutel": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoVendingMachineDogtoilet}/?format=json`, color: '#000000' },        },
    },
    {
      title: 'Religion', 
      color: '#f06292',
      layers: {
          "Sakralbauten": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWikiSacralBuilding}/?format=json`, color: '#000000' },
          "Friedhöfe": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoCemetery}/?format=json`, color: '#000000'},
      },
    },
    {
      title: 'Sensorik und Umwelt', 
      color: '#33eda7',
      layers: {
          "Umweltsensoren": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlSensors}/?format=json`, color: '#000000' },
          "Sensor-Dashboards": { visible: false, url: `${config.apiBackend}/geo/klsensorgrafanadashboard/?format=json`, color: '#000000' },
          "Sensor-Gateways": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoTTNGateway}/?format=json`, color: '#000000' },
          "Feldstärke": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoFieldTest}/?format=json`, color: '#000000' },
      },
    },

    {
      title: 'Umwelt und Natur',
      color: '#79ED33',
      layers: {
        "Bäume": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoOsmNaturalTrees}/?format=json`, color: '#4CAF50'},
        "Naturschutzgebiet": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoNatureReserve}/?format=json`, color: '#000000' },
        "Naturschutzgebiet Wiki": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoWikiNaturalReserve}/?format=json`, color: '#000000' },
      },
    },
    {
      title: 'Verkehr und Mobilität',
      color: '#4fc3f7',
      layers: {
        "Autoverleih": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoCarRental}/?format=json`, color: '#000000' },
        "Baustellen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlConstructionSite}/?format=json`, color: '#000000' },
        "E-Ladesäulen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoChargingStation}/?format=json`, color: '#000000' },

        "Fahrschulen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoDrivingSchool}/?format=json`, color: '#000000' },
        "Fahrradständer": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoBicycleParking}/?format=json`, color: '#000000' },
        "Fahrrad-Sharing-Stationen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoBicycleRental}/?format=json`, color: '#000000' },
        "Fahrradreparatur-Stationen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoBicycleRepairStation}/?format=json`, color: '#000000' },
        "Haltestellen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoBusStation}/?format=json`, color: '#000000' },

        "Parkscheinautomat": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoVendingMachineParkingTicket}/?format=json`, color: '#000000' },
        "Parkplätze": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoAmenityParkingPublic}/?format=json`, color: '#000000',
          subLayers: {
            "Behinderten-Parkplatz": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoAmenityParkingDisabled}&format=json`,  },
            "Parkhäuser": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlParkingLocation}/?format=json`, },
            "Parkplatz (Öffentlich)": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoAmenityParkingPublic}&format=json`,  },
            "Parkplatz (Privat)": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoAmenityParkingPrivate}&format=json`, },
            "Parkplatz (Kunden)": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoAmenityParkingCustomers}&format=json`,  },
            "Parkplatz (Zugang unklar)": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoAmenityParkingAccessMissing}&format=json`,  },
            },
        },
        "Parkzonen": { visible: false, url: `${config.apiBackend}${apiConfig.apiBackendGeoKlParkingzone}/?format=json`, color: '#000000' },
  
      },
    },
];