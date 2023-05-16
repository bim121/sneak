export class ScoreCounter {
    score: number;
  
    constructor(score: number) {
      this.score = score;
    }
  
    increaseScore() {
      this.score++;
    }
  }
  