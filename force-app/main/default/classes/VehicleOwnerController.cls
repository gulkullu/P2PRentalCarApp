// VehicleOwnerController.cls

public class VehicleOwnerController {

    public class VehicleOwnerWrapper {
        @AuraEnabled
        public String label { get; set; }
        @AuraEnabled
        public String value { get; set; }
        
        public VehicleOwnerWrapper(String value, String label) {
            this.value = value;
            this.label = label;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<VehicleOwnerWrapper> getVehicleOwners() {
        List<VehicleOwner__c> owners = [SELECT Id, Name FROM VehicleOwner__c];
        List<VehicleOwnerWrapper> ownerOptions = new List<VehicleOwnerWrapper>();
        for(VehicleOwner__c owner : owners) {
            ownerOptions.add(new VehicleOwnerWrapper(owner.Id, owner.Name));
        }
        return ownerOptions;
    }
}
