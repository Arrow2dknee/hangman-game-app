class Hangman {
    constructor(word, guess) {
        this.gameWord = word.toLowerCase().split('');
        this.playerGuesses = []; 
        this.noOfGuessesAllowed = guess;
        this.status = 'playing';
    }
    get puzzle() {
        return this.gameWord.map((letter) => letter === ' ' || this.playerGuesses.includes(letter) ? letter.toUpperCase() : 'x').join('');
    }

    makeGuess(playerGuess) {
        if (this.status == 'playing') {
            playerGuess = playerGuess.toLowerCase();
            const isUnique = !this.playerGuesses.includes(playerGuess);
            const badGuess = !this.gameWord.includes(playerGuess)
            // we check if guess is a unique one
            if (isUnique) {
                this.playerGuesses.push(playerGuess);
            }
            // we decrement number of guesses if the user guess is not part of the game word
            if (isUnique && badGuess && this.noOfGuessesAllowed > 0) {
                this.noOfGuessesAllowed -= 1;
            }
            this.setStatus();
        }
    }
    setStatus() {
        let matchCount = 0;
        this.gameWord.forEach(letter => {
            if (this.playerGuesses.includes(letter) || letter === ' ') {
                matchCount += 1;
            }
        });
        if (this.noOfGuessesAllowed <= 0) {
            this.status = 'gameover';
        } else if (matchCount == this.gameWord.length) {
            this.status = 'finished';
        } else if (this.noOfGuessesAllowed > 0) {
            this.status = 'playing';
        }
    }
    get message() {
        let message = '';
        switch(this.status) {
            case 'finished': message = `Good job! You have correctly guessed the word!`; 
                            break;
            case 'gameover': message = `Nice try! The word was "${this.gameWord.join('').toUpperCase()}".`; 
                            break;
        }
        return message;
    }
}

export { Hangman as default }; 