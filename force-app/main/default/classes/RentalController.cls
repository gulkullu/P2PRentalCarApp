public with sharing class RentalController {
    @AuraEnabled(cacheable=true)
    public static List<Vehicle__c> getVehicles() {
        return [SELECT Id, Name FROM Vehicle__c WHERE Status__c = 'Active'];
    }
}
