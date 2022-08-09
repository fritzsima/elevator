import Elevator, { ElevatorStatus } from '../elevator';

describe('If the elevator is on the pickup floor', () => {
    it('should arrive immediately', () => {
        const pickupFloor = 4;
        const destinationFloor = 8;
        
        const elevatorFloor = 4;
        const elevator = new Elevator({
            currentFloor: elevatorFloor
        });

        const arrivedTime = elevator.calculateArrivedTime(pickupFloor, destinationFloor);
        expect(arrivedTime).toEqual(0);
    });
});

describe('If the elevator has no onboard', () => {
    it('should return the floor time multiplied by the number of onbaord', () => {
        const pickupFloor = 4;
        const destinationFloor = 8;

        const elevatorFloor = 6;
        const elevatorDoorTime = 5000;
        const elevatorFloorTime = 3000;
        const elevator = new Elevator({
            currentFloor: elevatorFloor,
            floorTime: elevatorFloorTime,
            doorTime: elevatorDoorTime,
            onBoard: [],
            status: ElevatorStatus.IN_MOTION
        });

        const expectedTime = elevatorFloorTime * Math.abs(elevatorFloor - pickupFloor);
        const actualTime = elevator.calculateArrivedTime(pickupFloor, destinationFloor);
        expect(actualTime).toEqual(expectedTime);
    })
})
