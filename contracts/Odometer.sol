pragma solidity 0.6.0;


contract Odometer {
    address owner;
    constructor () public {
        owner = msg.sender;
    }

    struct KilometerInspection {
        
            uint date; 
            uint32 kilometers;
            address inspector_address;
        }

    struct Car {
            string vin; // Vehicule Identification Number
            uint32 year; // Year of entry in circulation
            uint8  inspection_counter; // / number of inspection for the car
            string car_model; // car model
            string car_brand; //car brand
            address owner_address;// adress of the car's owner
            mapping(uint8 => KilometerInspection) kilometers; // list of kilometers inspections
            
        }




    mapping (string => Car) cars; // list of all the cars 

    mapping (address => bool) isInspector; // list of inspectors authorized to inspect vehicles

    modifier onlyInspector() {
        require(isInspector[msg.sender] == true);
        _;
    }

    modifier validateKilometer(string memory _vin, uint _kilometers) {
        Car storage c = cars[_vin];
        require(c.kilometers[c.inspection_counter-1].kilometers < _kilometers);
        _;
        
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier onlyCarOwner(string memory _vin) {
        require(cars[_vin].owner_address == msg.sender);
        _;
    }
    
    /**
     */
    function createInspector(address newInspector) external onlyOwner {
        isInspector[newInspector] = true;
    }


    function createNewCar(string memory _vin, uint32 _year, string memory _car_model, string memory _car_brand, address _owner_address) public onlyOwner{
        require(_year < now);
        cars[_vin] = Car(_vin, _year,0, _car_model, _car_brand, _owner_address);
    }
    
    function addKilometerCheck (string memory _vin, uint32 _kilometers ) validateKilometer(_vin, _kilometers) onlyInspector  public {
        Car storage c = cars[_vin];
        c.kilometers[c.inspection_counter] = KilometerInspection(now, _kilometers, msg.sender);
        c.inspection_counter ++;
    }
    
    function seeCar(string calldata _vin) external view returns(string memory ,string memory , address , uint[] memory) {
        uint timeChecked = cars[_vin].inspection_counter;
        uint[] memory checks = new uint[](timeChecked);
        for(uint8 i = 0; i < timeChecked ; i++) {
            checks[i]= cars[_vin].kilometers[i].kilometers;
        }
        return(cars[_vin].car_model, cars[_vin].car_brand, cars[_vin].owner_address, checks);
    }
    
    function getParticularCheck (string calldata _vin, uint8 _checkId) external view returns(uint , uint32 , address ) {
       return( cars[_vin].kilometers[_checkId].date, cars[_vin].kilometers[_checkId].kilometers,cars[_vin].kilometers[_checkId].inspector_address);
    }
    
    function changeCarOwner(string calldata _vin,  address _newOwner) onlyCarOwner(_vin) external {
        require(_newOwner != msg.sender);
        cars[_vin].owner_address = _newOwner;
    }
    
    fallback() external payable {}
    //function () public payable {}

    

}

