public with sharing class VehicleController {
    @AuraEnabled(cacheable=true)
    public static List<Vehicle__c> getVehicles() {
        return [SELECT Id, Name FROM Vehicle__c WHERE Status__c = 'Active'];
    }
}
