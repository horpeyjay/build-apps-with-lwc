import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// Set Bear Object fields
const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s';

const bearFields = [
    NAME_FIELD,
    LOCATION_LATITUDE_FIELD,
    LOCATION_LONGITUDE_FIELD
];

export default class BearLocation extends LightningElement {
    @api recordId;
    name;
    mapMarkers = [];

    @wire(getRecord, { recordId: '$recordId', fields: bearFields })
    loadBear({ error, data }) {
        if (error) {
            console.error('Error fetching bear record:', error); // Handle error
        } else if (data) {
            console.log('Bear data:', data); // Log data for debugging
            // Get Bear Data
            this.name = getFieldValue(data, NAME_FIELD);
            const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
            const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);

            // Check if latitude and longitude exist
            if (Latitude && Longitude) {
                // Transform bear data into map markers
                this.mapMarkers = [{
                    location: { Latitude, Longitude },
                    title: this.name,
                    description: `Coords: ${Latitude}, ${Longitude}`
                }];
            } else {
                console.warn('Latitude or Longitude is missing in the data.');
            }
        }
    }

    get cardTitle() {
        return (this.name) ? `${this.name}'s location` : 'Bear location';
    }
}
