import { applySnapshot, getSnapshot, onSnapshot, types } from 'mobx-state-tree';

const Card = types.model('Card', {
    id: types.identifierNumber,
    src: types.string,
    matched: types.boolean,
    disabled: types.optional(types.boolean, false)
});

const GameRecord = types.model('GameRecord', {
    id: types.identifierNumber,
    minutes: types.number,
    seconds: types.number,
    turns: types.number
});

const CardStore = types
    .model('CardStore', {
        cards: types.array(Card),
        choiceOne: types.maybeNull(types.reference(Card)),
        choiceTwo: types.maybeNull(types.reference(Card)),
        start: types.optional(types.boolean, false),
        gameOver: types.optional(types.boolean, false),
        turn: types.number,
        startTime: types.maybeNull(types.Date),
        elapsedTime: types.maybeNull(types.number),
        history: types.array(GameRecord),
        gameIdCounter: types.optional(types.number, 1),
    })
    .actions((self) => ({
        createCardArray() {
            const originalCards = self.cards.map(card => ({
                ...getSnapshot(card),
                id: card.id
            }));

            const duplicatedCards = originalCards.map(card => ({
                ...card,
                id: card.id + self.cards.length
            }));

            return [...originalCards, ...duplicatedCards];
        },

        shuffleArray(cards) {
            return cards.sort(() => Math.random() - 0.5);
        },
        shuffleCards() {
            if (self.cards.length === 6) {
                var newCardArray = self.createCardArray();
            }
            else {
                var newCardArray = self.cards;
            }
            const shuffledCards = self.shuffleArray(newCardArray);
            self.cards.replace(shuffledCards);
            self.clearChoices();
            self.turn = 0;
            self.elapsedTime = null;
            self.gameOver = false;
        },
        gameStart() {
            if (!self.start) {
                self.shuffleArray(self.cards);
                self.cards.forEach(item => item.matched = false);
                self.start = true;
                self.startTime = new Date();
            } else {
                self.cards.forEach(item => item.matched = true);
                self.gameEnd();
            }
        },
        gameEnd() {
            self.start = false;
            const endTime = new Date();
            if (self.startTime) {
                self.elapsedTime = Math.floor((endTime - self.startTime) / 1000);
                const minutes = Math.floor(self.elapsedTime / 60);
                const seconds = self.elapsedTime % 60;
                console.log(`Game completed in ${minutes} minutes and ${seconds} seconds`);
                self.history.push({
                    id: self.gameIdCounter,
                    minutes: minutes,
                    seconds: seconds,
                    turns: self.turn
                });
                self.gameIdCounter += 1;
            }
            self.startTime = null;
            self.gameOver = true;
            self.turn = 0;
        },
        SelectedCard(card) {
            if (self.choiceOne) {
                self.choiceTwo = card;
            } else {
                self.choiceOne = card;
            }
            self.checkMate();
        },
        checkMate() {
            if (self.choiceOne && self.choiceTwo) {
                self.disabled = true;
                if (self.choiceOne.src === self.choiceTwo.src) {
                    console.log('Cards match...');
                    self.turn++;
                    self.cards.forEach(card => {
                        if (card.src === self.choiceOne.src) {
                            card.matched = true;
                        }
                    });
                    self.clearChoices();
                    if (self.cards.every(card => card.matched)) {
                        self.gameEnd();
                    }
                } else {
                    console.log('Cards do not match...');
                    self.turn++;
                    setTimeout(() => {
                        self.clearChoices();
                    }, 1000);
                }
            }
        },
        clearChoices() {
            self.choiceOne = null;
            self.choiceTwo = null;
            self.disabled = false;
        },
        afterCreate() {
            onSnapshot(self, (snapshot) => console.log('Snapshot:', snapshot));
        }
    }));

const cardImages = CardStore.create({
    cards: [
        { id: 1, src: '/assets/safety.png', matched: true },
        { id: 2, src: '/assets/potion.png', matched: true },
        { id: 3, src: '/assets/wedding-ring.png', matched: true },
        { id: 4, src: '/assets/scroll.png', matched: true },
        { id: 5, src: '/assets/defence.png', matched: true },
        { id: 6, src: '/assets/swords.png', matched: true },
    ],
    turn: 0,
});

export default cardImages;
