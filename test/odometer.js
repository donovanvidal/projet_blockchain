const Odometer = artifacts.require("Odometer");


contract("Odometer", async accounts => {
  it("should create cars, show their caracteristics, declare account 0 as inspector, inspect car1 twice with 10 and 100km and show inspections and then test if modifiers works as exepcted.", async () => {


    const instance = await Odometer.deployed();

    console.log("-----------Declaring 3 cars-----------");
    console.log("Create car 001 Model 3");
    var car = await instance.createNewCar("001", 2021, "Model 3", "Tesla", accounts[0]);
    console.log("Create car 002 Model S")
    var car = await instance.createNewCar("002", 2021, "Model S", "Tesla", accounts[1]);
    console.log("Create car 003 Model X");
    var car = await instance.createNewCar("003", 2020, "Model X", "Tesla", accounts[2]);
    console.log("-------------------------------------");
    console.log("");

    console.log("-------------Try to create car as a non owner address (should not work)-------------")
    try {
      var car = await instance.createNewCar("004", 2019, "Fake", "Car", accounts[0], {from : accounts[5]});
      assert.fail("The transaction should have thrown an error");
    }
    catch (err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
    console.log("returned error, worked as expected")
    console.log("---------------------------------------------------------------------------");
    console.log("");

    console.log("-----------Show cars details-----------")
    console.log(await instance.seeCar("001"))
    console.log(await instance.seeCar("002"))
    console.log(await instance.seeCar("003"))
    console.log("-------------------------------------");
    console.log("");

    console.log("-----------Declaring account 0 as inspector----------")
    console.log(await instance.createInspector(accounts[0]))
    console.log("---------------------------------------------------------------------------");
    console.log("");

    console.log("-----------Inpsect car 001 by account 0 with 10 km and 1000km----------")
    console.log(await instance.addKilometerCheck("001", 10))
    console.log(await instance.addKilometerCheck("001", 100))
    let car1 = await instance.seeCar("001")
    console.log(car1)
    console.log(car1[3])
    console.log("---------------------------------------------------------------------------");
    console.log("");

    console.log("-------------Try to add kilometers with an address which is not inspector-------------")
    try {
      await instance.addKilometerCheck("001", 100, {from : accounts[1]});
      assert.fail("The transaction should have thrown an error");
    }
    catch (err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
    console.log("returned error, worked as expected")
    console.log("---------------------------------------------------------------------------");
    console.log("");

    console.log("-------------Try to add kilometers with less than previous inspection-------------")
    try {
      await instance.addKilometerCheck("001", 50);
      var CAR = await instance.seeCar("001")
      console.log(CAR)
      console.log(CAR[3])
      assert.fail("The transaction should have thrown an error");
    }
    catch (err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
    console.log("returned error, worked as expected")
    console.log("---------------------------------------------------------------------------");
    console.log("");




  });

});