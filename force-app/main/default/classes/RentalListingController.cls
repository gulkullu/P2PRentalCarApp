public with sharing class RentalListingController {

    @AuraEnabled
    public static Id createRentalListing(RentalListing__c newListing) {
        
        // Check for the required fields before attempting the insert
        if(newListing.VehicleId__c == null || String.isBlank(newListing.VehicleId__c)) {
            throw new AuraHandledException('The field VehicleId__c is required.');
        }
        
        if(newListing.VehicleOwner__c == null || String.isBlank(newListing.VehicleOwner__c)) {
            throw new AuraHandledException('The field VehicleOwner__c is required.');
        }
        
        try {
            insert newListing;
            return newListing.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Error inserting the Rental Listing: ' + e.getMessage());
        }
    }
}
