import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.searchBears(searchTerm) apex method*/
import searchBears from '@salesforce/apex/BearController.searchBears';
export default class BearList extends LightningElement {
    searchTerm = '';
    @wire(searchBears, {searchTerm: '$searchTerm'}) bears;
    appResources = {
        bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
    };
    handleSearchTermChange(event){
        window.clearTimeout(this.delayTimeout);
        const searchTerm = event.target.value;
        //eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
           this.searchTerm = searchTerm; 
        }, 300);
    }
    get hasResults(){
        return(this.bears.data.lenght > 0);
    }
}