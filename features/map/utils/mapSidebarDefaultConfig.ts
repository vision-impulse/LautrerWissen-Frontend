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

import { LayerGroup } from '@/types/map-ui';
import privateConfig from '@/config/private';

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

  apiBackendGeoDogPark: "/geo/osmleisuredogpark",
  apiBackendGeoMilitaryLandUse: "/geo/osmlandusemilitary",
  apiBackendGeoGrafanaDashboard: "/geo/klsensorgrafanadashboard",
};

export const DEFAULT_EXPANDED_GROUP_CONFIG: Record<string, string[]> = {
  cultural_group: ['Freizeit, Spiel und Sport', 'Kultur', 'Religion',],
  citylife_group: ['Leben in KL', 'Bildungsstadtplan', 'Planen und Bauen', 'Freizeit, Spiel und Sport',],
  environment_group: ['Umwelt und Natur', 'Sensorik', 'Recycling / Nachhaltigkeit'],
  education: ['Bildungsstadtplan',],
  sustainability: ['Recycling / Nachhaltigkeit',],
  bubatz: ['Bubatzkarte',],
  citylife: ['Leben in KL',],
  planning: ['Planen und Bauen',],
  environment: ['Umwelt und Natur',],
  sensors: ['Sensorik und Umwelt',],
  mobility: ['Verkehr und Mobilität'],
  cultural: ['Kultur',],
  leisure: ['Freizeit, Spiel und Sport',],
  religion: ['Religion',],
};


export const DEFAULT_LAYER_CONFIG: LayerGroup[] = [
  {
    title: 'Bildungsstadtplan',
    color: '#F1945C',
    layers: {
      "Beratungen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionConsulting}&format=json`, color: '#000000' },
      "Bildung": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionEducation}&format=json`, color: '#000000' },
      "Kitas": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionKita}&format=json`, color: '#000000' },
      "Kunst & Kultur": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionArt}&format=json`, color: '#000000' },
      "Musikschulen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoMusicSchool}?format=json`, color: '#000000' },
      "Schulen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionSchool}&format=json`, color: '#000000' },
      "Sprachschulen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlEduInstitutionLanguage}&format=json`, color: '#000000' },
    },
  },
  {
    title: 'Bubatzkarte',
    color: '#000000',
    layers: {
      "Cannabis Konsum Verbotszone  ": { visible: false, url: `SERVICE=WMS&layer=Cannabiskonsumverbot&URL=https://geoportal.kaiserslautern.de/cgi-bin/bubatz_wms?&SRS=EPSG:4326`, color: '#000000' },
      "Verbot Cannabiskonsum": { visible: false, url: `SERVICE=WMS&layer=Bubatz_100&URL=https://geoportal.kaiserslautern.de/cgi-bin/bubatz_wms?&SRS=EPSG:4326`, color: '#000000' },
      "Verbot Gründung von Anbauvereinigungen": { visible: false, url: `SERVICE=WMS&layer=Bubatz_200&URL=https://geoportal.kaiserslautern.de/cgi-bin/bubatz_wms?&SRS=EPSG:4326`, color: '#000000' },
    },
  },
  {
    title: 'Freizeit, Spiel und Sport',
    color: '#9c27b0',
    layers: {
      "Basketballplätze": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoSportBasketball}/?format=json`, color: '#000000' },
      "Escape-Rooms": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoEscapeGame}/?format=json`, color: '#000000' },
      "Fussballplätze": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoSportSoccer}/?format=json`, color: '#000000' },
      "Kinos": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoCinema}/?format=json`, color: '#000000' },
      "Kletterhallen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoSportCenterClimbing}/?format=json`, color: '#000000' },
      "Minigolf": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoMiniatureGolf}/?format=json`, color: '#000000' },
      "Schwimmbäder": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoSportCenterSwimming}/?format=json`, color: '#000000' },
      "Spielplätze": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoLeisurePlayground}/?format=json`, color: '#000000' },
      "Tanzschulen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoLeisureDance}/?format=json`, color: '#000000' },
      "Tennisplätze": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoSportTennis}/?format=json`, color: '#000000' },
      "Volleyballfelder": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoVolleyball}/?format=json`, color: '#000000' },
      "Zoos": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoZoo}/?format=json`, color: '#000000' },
    },
  },
  {
    title: 'Kultur',
    color: '#d06292',
    layers: {
      "Brunnen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWikiFountain}/?format=json`, color: '#000000' },
      "Ehemalige Brauereien": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWikiBrewery}/?format=json`, color: '#000000' },
      "Fischskulpturen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWikiFishSculpture}/?format=json`, color: '#000000' },
      "Kulturdenkmäler": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWikiCulturalMonument}/?format=json`, color: '#000000' },
      "Naturdenkmäler": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWikiNaturalMonument}/?format=json`, color: '#000000' },
      "Rittersteine": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWikiRitterstein}/?format=json`, color: '#000000' },
      "Skulpturen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlSculpture}&format=json`, color: '#000000' },
      "Stolpersteine": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWikiStolperstein}/?format=json`, color: '#000000' },
    },
  },
  {
    title: 'Leben in KL',
    color: '#FF9800',
    layers: {
      "Abfalleimer": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoOsmAmenityWasteBasket}/?format=json`, color: '#000000' },
      "Briefkästen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoPostBox}/?format=json`, color: '#000000' },
      "Copyshops": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoCopyShop}/?format=json`, color: '#000000' },
      "Hundewiesen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoDogPark}/?format=json`, color: '#000000' },
      "Litfaßsäulen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoAdvertisingColumn}/?format=json`, color: '#000000' },
      "Packstationen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoParcelLocker}/?format=json`, color: '#000000' },
      "Rettungspunkte": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoEmergencyPoint}/?format=json`, color: '#000000' },
      "Sitzbänke": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoOsmAmenityBench}/?format=json`, color: '#000000' },
      "Wasserspender": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoOsmAmenityDrinkingwater}/?format=json`, color: '#000000' },
      "Wifi-Hot-Spots": {
        visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWlanhotspot}/?format=json`, color: '#000000',
        subLayers: {
          "Empera": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWlanHotspotEmpera}&format=json`, },
          "Freifunk": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWlanHotspotFreifunk}&format=json`, },
          "MySpot": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWlanHotspotMyspot}&format=json`, }
        },
      },
      "Öffentliche Toiletten": {
        visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoOsmAmenityToilets}/?format=json`, color: '#000000',
        subLayers: {
          "Nette Toilette": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoOsmAmenityToiletsNetteToilette}&format=json`, },
          "Sonstige": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoOsmAmenityToiletsOthers}&format=json`, }
        },
      },
    },
  },
  {
    title: 'Planen und Bauen',
    color: '#9575cd',
    layers: {
      "Baulandskataster": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlVaccantLot}/?format=json`, color: '#000000' },
      "Baurechtskataster": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlLandUsePlan}/?format=json`, color: '#000000' },
      "Bauliche Gesamtanlagen (Denkmäler)": {
        visible: false, url: `SERVICE=WMS&layer=bga&URL=https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?`, color: '#000000', legendUrl: 'https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?version=1.1.1&service=WMS&request=GetLegendGraphic&layer=bga&format=image/png',
        attribution: {
          source: "©GeoBasis-DE / LVermGeoRP (2025)",
          license: "dl-de/by-2-0",
          url: "https://lvermgeo.rlp.de",
        },
      },
      "Denkmalzonen": {
        visible: false, url: `SERVICE=WMS&layer=denkmalzonen&URL=https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?`, color: '#000000', legendUrl: 'https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?version=1.1.1&service=WMS&request=GetLegendGraphic&layer=denkmalzonen&format=image/png',
        attribution: {
          source: "©GeoBasis-DE / LVermGeoRP (2025)",
          license: "dl-de/by-2-0",
          url: "https://lvermgeo.rlp.de",
        },
      },
      "Digitale Topographische Karte (DTK5)": {
        visible: false, url: `SERVICE=WMS&layer=rp_dtk5&URL=https://geo4.service24.rlp.de/wms/dtk5_rp.fcgi?`, color: '#000000', legendUrl: 'https://geo4.service24.rlp.de/attachment/legende/DTK5_Legende.png',
        attribution: {
          source: "©GeoBasis-DE / LVermGeoRP (2025)",
          license: "dl-de/by-2-0",
          url: "https://lvermgeo.rlp.de",
        },
      },
      "Digitale Topographische Karte (DTK25)": {
        visible: false, url: `SERVICE=WMS&layer=rp_dtk25&URL=https://geo4.service24.rlp.de/wms/rp_dtk25.fcgi?`, color: '#000000', legendUrl: 'https://geo4.service24.rlp.de/attachment/legende/DTK25_Legende.png',
        attribution: {
          source: "©GeoBasis-DE / LVermGeoRP (2025)",
          license: "dl-de/by-2-0",
          url: "https://lvermgeo.rlp.de",
        },
      },
      "Einzeldenkmäler (Flächen)": {
        visible: false, url: `SERVICE=WMS&layer=edm_flaechen&URL=https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?`, color: '#000000', legendUrl: 'https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?version=1.1.1&service=WMS&request=GetLegendGraphic&layer=edm_flaechen&format=image/png',
        attribution: {
          source: "©GeoBasis-DE / LVermGeoRP (2025)",
          license: "dl-de/by-2-0",
          url: "https://lvermgeo.rlp.de",
        },
      },
      "Einzeldenkmäler (Punkte)": {
        visible: false, url: `SERVICE=WMS&layer=edm_punkte&URL=https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?`, color: '#000000', legendUrl: 'https://www.geoportal.rlp.de/owsproxy/00000000000000000000000000000000/9c9d7fe2c25527a5cb22cf9ca2266d26?version=1.1.1&service=WMS&request=GetLegendGraphic&layer=edm_punkte&format=image/png',
        attribution: {
          source: "©GeoBasis-DE / LVermGeoRP (2025)",
          license: "dl-de/by-2-0",
          url: "https://lvermgeo.rlp.de",
        },
      },
      "Flächennutzungsplan": { visible: false, url: `SERVICE=WMS&layer=FNP_Stadt_Kaiserslautern&URL=https://geoportal.kaiserslautern.de/cgi-bin/mapserv?map=/var/wms/fnpkl_utm32.map`, color: '#000000', legendUrl: 'https://geoportal.kaiserslautern.de/img/Legenden/Legende_FNP2025.pdf' },
      "Flurstücke": { visible: false, url: `SERVICE=WMS&layer=Flurstueck&URL=https://geo5.service24.rlp.de/wms/liegenschaften_rp.fcgi?`, color: '#000000', legendUrl: 'https://geo5.service24.rlp.de/liegenschaften/WMS_RP_ALKIS_Liegenschaften_Legende.pdf' },
      "Militärflächen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoMilitaryLandUse}/?format=json`, color: '#000000' },
    },
  },
  {
    title: 'Recycling / Nachhaltigkeit',
    color: '#4db6ac',
    layers: {
      "Hundekotbeutel": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoVendingMachineDogtoilet}/?format=json`, color: '#000000' },
      "Recycling-Container": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoRecyclingContainer}/?format=json`, color: '#000000' },
      "Wertstoffhöfe": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoRecyclingCenter}/?format=json`, color: '#000000' }
    },

  },
  {
    title: 'Religion',
    color: '#f06292',
    layers: {
      "Friedhöfe": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoCemetery}/?format=json`, color: '#000000' },
      "Sakralbauten": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWikiSacralBuilding}/?format=json`, color: '#000000' },
    },
  },
  {
    title: 'Sensorik und Umwelt',
    color: '#33eda7',
    layers: {
      "Umweltsensoren": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlSensors}/?format=json`, color: '#000000', legendUrl: 'https://www.lautrer-wissen.de/docs/legend_sensors.pdf' },
      "Sensor-Dashboards": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoGrafanaDashboard}/?format=json`, color: '#000000', legendUrl: 'https://www.lautrer-wissen.de/docs/legend_sensors.pdf' },
      "Sensor-Feldstärke": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoFieldTest}/?format=json`, color: '#000000', legendUrl: 'https://www.lautrer-wissen.de/docs/legend_sensors.pdf' },
      "Sensor-Gateways": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoTTNGateway}/?format=json`, color: '#000000', legendUrl: 'https://www.lautrer-wissen.de/docs/legend_sensors.pdf' },
    },
  },
  {
    title: 'Umwelt und Natur',
    color: '#79ED33',
    layers: {
      "Bäume": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoOsmNaturalTrees}/?format=json`, color: '#4CAF50' },
      "Naturschutzgebiete": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoNatureReserve}/?format=json`, color: '#000000' },
      "Naturschutzgebiete (Wiki)": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoWikiNaturalReserve}/?format=json`, color: '#000000' },
    },
  },
  {
    title: 'Verkehr und Mobilität',
    color: '#4fc3f7',
    layers: {
      "Autovermietungen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoCarRental}/?format=json`, color: '#000000' },
      "Baustellen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlConstructionSite}/?format=json`, color: '#000000' },
      "E-Ladesäulen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoChargingStation}/?format=json`, color: '#000000' },

      "Fahrschulen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoDrivingSchool}/?format=json`, color: '#000000' },
      "Fahrradständer": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoBicycleParking}/?format=json`, color: '#000000' },
      "Fahrrad-Sharing-Stationen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoBicycleRental}/?format=json`, color: '#000000' },
      "Fahrradreparatur-Stationen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoBicycleRepairStation}/?format=json`, color: '#000000' },
      "Haltestellen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoBusStation}/?format=json`, color: '#000000' },

      "Parkscheinautomaten": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoVendingMachineParkingTicket}/?format=json`, color: '#000000' },
      "Parkplätze": {
        visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoAmenityParkingPublic}/?format=json`, color: '#000000',
        subLayers: {
          "Behinderten-Parkplätze": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoAmenityParkingDisabled}&format=json`, },
          "Parkhäuser": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlParkingLocation}/?format=json`, },
          "Parkplätze (Öffentlich)": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoAmenityParkingPublic}&format=json`, },
          "Parkplätze (Privat)": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoAmenityParkingPrivate}&format=json`, },
          "Parkplätze (Kunden)": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoAmenityParkingCustomers}&format=json`, },
          "Parkplätze (Zugang unklar)": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoAmenityParkingAccessMissing}&format=json`, },
        },
      },
      "Parkzonen": { visible: false, url: `${privateConfig.apiBackend}${apiConfig.apiBackendGeoKlParkingzone}/?format=json`, color: '#000000', legendUrl: 'https://www.kaiserslautern.de/mb/themen/verkehr/auto/parken/pdf/parkzonen__gebuehren_ab_mai_2023.pdf' },
    },
  },
];