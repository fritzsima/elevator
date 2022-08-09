export enum ElevatorStatus {
    BOARDING,
    IN_MOTION
}

type ElevatorOptions = {
    currentFloor?: number,
    onBoard?: number[],
    status?: ElevatorStatus,
    doorTime?: number,
    floorTime?: number
}

class Elevator {
    currentFloor: number;
    onBoard: number[];
    status: ElevatorStatus;
    doorTime: number;
    floorTime: number;

    constructor(options: ElevatorOptions) {
        this.validateConfig(options)

        this.currentFloor = options.currentFloor || 0;
        this.onBoard = options.onBoard || [];
        this.status = options.status || ElevatorStatus.BOARDING;
        this.doorTime = options.doorTime || 5000;
        this.floorTime = options.floorTime || 3000;
    }

    validateConfig(options: ElevatorOptions) {
        // TODO: options validation
    }

    calculateArrivedTime(pickupFloor: number, destinationFloor: number): number {
        if (this.currentFloor === pickupFloor) {
            return 0;
        }

        let arrivedTime: number = this.floorTime * Math.abs(pickupFloor - this.currentFloor);

        const elevatorDirection = Math.sign(this.onBoard[0] - this.currentFloor);
        const passengerDirection = Math.sign(pickupFloor - this.currentFloor);
        const movementDirection = Math.sign(destinationFloor - pickupFloor);

        if (this.onBoard.length === 0) {
            arrivedTime += 0;
        } else if (elevatorDirection === passengerDirection && movementDirection === elevatorDirection) {
            const passedOnBoard = this.onBoard.filter(floor => {
                const isBetween = (this.currentFloor < floor && floor < pickupFloor)
                    || (this.currentFloor > floor && floor > pickupFloor);
                return isBetween;
            });
            arrivedTime += this.doorTime * passedOnBoard.length;
        } else {
            const passedOnBoard = this.onBoard.filter(floor => {
                const onBoardDirection = Math.sign(floor - this.currentFloor);
                return onBoardDirection === elevatorDirection;
            });
            arrivedTime += this.doorTime * passedOnBoard.length;
            arrivedTime += this.floorTime * (pickupFloor - this.onBoard[this.onBoard.length - 1]);
        }

        if (this.status === ElevatorStatus.BOARDING) {
            arrivedTime += this.doorTime;
        }

        return arrivedTime;
    }
}

export default Elevator;
