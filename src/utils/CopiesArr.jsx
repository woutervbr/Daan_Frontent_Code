const copies_data = [
  
  { number: 0, title: "0 extra exemplaar – €0,- (bespaar €0,-)", amount: 0 },
  { number: 1, title: "1 extra exemplaar – €60,- (bespaar €29,-)", amount: 60 , originalAmount: 89 },
  { number: 2, title: "2 extra exemplaren – €120,- (bespaar €58,-)", amount: 120 , originalAmount: 178 },
  { number: 3, title: "3 extra exemplaren – €180,- (bespaar €87,-)", amount: 180 , originalAmount: 267 },
  { number: 4, title: "4 extra exemplaren – €240,- (bespaar €116,-)", amount: 240 , originalAmount: 356 },
  { number: 5, title: "5 extra exemplaren – €300,- (bespaar €145,-)", amount: 300 , originalAmount: 445 },
  { number: 6, title: "6 extra exemplaren – €360,- (bespaar €174,-)", amount: 360 , originalAmount:  534},
  { number: 7, title: "7 extra exemplaren – €420,- (bespaar €203,-)", amount: 420 , originalAmount: 623},
  { number: 8, title: "8 extra exemplaren – €480,- (bespaar €232,-)", amount: 480 , originalAmount: 712},
  { number: 9, title: "9 extra exemplaren – €540,- (bespaar €261,-)", amount: 540 , originalAmount: 801},
];

// Dynamic copy pricing (for 10 or more)
const getCopyAmount = (numberOfCopies) => {
  if (numberOfCopies < 0) return null; // negative invalid

  // For 0 to 9, use static list
  const staticEntry = copies_data.find((copy) => copy.number === numberOfCopies);
  if (staticEntry) return staticEntry;

  // For 10 or more copies
  const amount = numberOfCopies * 60;
  const saved = numberOfCopies * 29;
  const title = `${numberOfCopies} extra exemplaren – €${amount},- (bespaar €${saved},-)`;

  return {
    number: numberOfCopies,
    title,
    amount,
    originalAmount: numberOfCopies * 89,
  };
};


export { copies_data, getCopyAmount };
