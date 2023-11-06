import { LightningElement, wire } from 'lwc';
import getVehicles from '@salesforce/apex/RentalController.getVehicles';
import createRentalListing from '@salesforce/apex/RentalListingController.createRentalListing';
import getVehicleOwners from '@salesforce/apex/VehicleOwnerController.getVehicleOwners';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarRenterForm extends NavigationMixin(LightningElement) { // Added opening curly brace here
    @wire(getVehicles) vehicles;

  
    
    selectedVehicle;
    startDate;
    endDate;
    selectedRate;
 

    get vehicleOptions() {
        if (this.vehicles && this.vehicles.data) {
            return this.vehicles.data.map(vehicle => ({label: vehicle.Name, value: vehicle.Id  }));
        }
    } 

    get rateOptions() {
        return [
            { label: 'Hourly', value: 'hourly' },
            { label: 'Daily', value: 'daily' }
        ];
    }
    vehicleOwners = [];
    connectedCallback() {
        getVehicleOwners()
        .then(data => {
            this.vehicleOwners = data;
        })
        .catch(error => {
            console.error('Error fetching vehicle owners: ' + error.message);
            // Handle the error appropriately
        });
    }

    handleVehicleChange(event) {
        this.selectedVehicle = event.detail.value;
    }

    handleStartDateChange(event) {
        this.startDate = event.target.value;
    }

    handleEndDateChange(event) {
        this.endDate = event.target.value;
    }

    handleRateChange(event) {
        this.selectedRate = event.detail.value;
    }

    handleVehicleOwnerChange(event) {
        this.vehicleOwnerId  = event.detail.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;

        let newRentalListing = {
            VehicleId__c: fields.vehicle,  // Adjust accordingly based on your form's field names
            Start_Date__c: fields.startDate,
            End_Date__c: fields.endDate,
            Rate_Type__c: fields.rateType,
            VehicleOwner__c: fields.vehicleOwner
        };
        
    
        createRentalListing({ newListing: newRentalListing })
        .then(newlyCreatedRecordId => {
            console.log('Record created with id: ' + newlyCreatedRecordId);
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: newlyCreatedRecordId,
                    objectApiName: 'RentalListing__c',
                    actionName: 'view'
                }
            });
        })
        .catch(error => {
            console.error('Error creating record: ' + error.message);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.message,
                    variant: 'error'
                })
            );
        });
    }

    handleSuccess( event ) { 
        const toastEvent = new ShowToastEvent({ 
            title: 'Case Updated', 
            message: 'Case Updated Successfully!!!', 
            variant: 'success' 
        }); 
        this.dispatchEvent( toastEvent ); 
    }
}
