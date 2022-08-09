import Elevator from './elevator';

class Controller {
    elevators: Elevator[];

    constructor() {
        this.elevators = [];
    }

    addElevator(elevator: Elevator) {
        this.elevators.push(elevator);
    }

    findBestElevator(pickupFloor: number, destinationFloor: number): Elevator | null {
        if (this.elevators.length === 0) {
            return null;
        }

        let bestArrivedTime = Number.MAX_VALUE;
        let bestElevator: Elevator | null = null;
        for (const elevator of this.elevators) {
            const arrivedTime = elevator.calculateArrivedTime(pickupFloor, destinationFloor);
            if (arrivedTime < bestArrivedTime) {
                bestArrivedTime = arrivedTime;
                bestElevator = elevator
            }
        }

        return bestElevator;
    }
}

export default Controller;
