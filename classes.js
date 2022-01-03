function createNullArray(n) {
	const arr = [];
	for (let i = 0; i < n; i++) {
		arr.push(null);
	}
	return arr;
}

class Field {
	constructor() {
		this.cells = [];
		for (let i = 0; i < 10; i++) {
			const arr = createNullArray(10);
			this.cells.push(arr);
		}
	}

	shipCanBePlaced(coordinates, Ship) {
		const fieldSideSize = this.cells.length;
		const shipWidth = 1;
		const shipOrientation = Ship.orientation;
		const longDirection = shipOrientation === 'horizontal' ? 'x' : 'y';
		const shortDirection = shipOrientation === 'horizontal' ? 'y' : 'x';
		const shipCanBePlacedInLongDirection = coordinates[longDirection] + Ship.length <= fieldSideSize;
		const shipCanBePlacedInShortDirection = coordinates[shortDirection] + shipWidth <= fieldSideSize;
		const shipCanBePlaced = shipCanBePlacedInLongDirection && shipCanBePlacedInShortDirection;
		return shipCanBePlaced;
	}

	placeShip(coordinates, Ship) {
		const shipCanBePlaced = this.shipCanBePlaced();
		if (!shipCanBePlaced) {
			console.error('Not enough space for ship');
			return false;
		}
		const shipOrientation = Ship.orientation;
		return true;
	}
}


class Ship {
	constructor(length, orientation) {
		const isOrientationCorrect = this.isOrientationCorrect(orientation);
		if (!isOrientationCorrect) return console.error('Wrong orientation!');

		const isLengthCorrect = this.isLengthCorrect(orientation);
		if (!isLengthCorrect) return console.error('Wrong length!');

		this.length = length;
		this.orientation = orientation;
		this.durability = length;
	}

	isOrientationCorrect(orientation) {
		const orientations = ['vertical', 'horizontal'];
		return orientations.includes(orientation);
	}

	isLengthCorrect(length) {
		return length > 0 && length < 5;
	}

	damage() {
		if (this.durability === 0) return console.error('Ship is destroyed. Nothing to damage.');
		this.durability -= 1;
	}
}

