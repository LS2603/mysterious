// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

let specimenCounter = 1;

let pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
        let randomIndex = Math.floor(Math.random() * this.dna.length);
        let currentBase = this.dna[randomIndex];
        let newBase = returnRandBase();
        while (newBase === currentBase) {
          newBase = returnRandBase();
          };
        this.dna[randomIndex] = newBase;
        return this.dna; 
        },
      compareDNA(pAequor){
        let matchingCount = 0;
        for(let i = 0; i < this.dna.length; i++){
          if(this.dna[i] === pAequor.dna[i]){
            matchingCount++
          }; 
        } let percentage = matchingCount / this.dna.length * 100;
        console.log(`There is ${percentage.toFixed(2)}% match`)
      },
      willLikelySurvive() {
        let CGCount = 0;
        for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
        CGCount++;
        }
      }
        let percentage = (CGCount / this.dna.length) * 100;
        return percentage >= 60;
      },
      complementStrand(){
        return this.dna.map ((strand) => {
          switch (strand) {
            case 'A':
              return 'T';
              break;
            case 'T':
              return 'A';
              break;
            case 'C':
              return 'G';
              break;
            case 'G':
              return 'C';
              break;
            }
          }) 
        }
     }
};

let survivors = []
while (survivors.length < 30) {
  let newSpecimen = pAequorFactory(specimenCounter++, mockUpStrand())
  if (newSpecimen.willLikelySurvive()) {
    survivors.push(newSpecimen);
  }
}