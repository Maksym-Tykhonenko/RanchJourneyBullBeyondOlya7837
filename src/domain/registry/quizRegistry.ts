import {QuizQuestion} from '../models';

export const quizRegistry: QuizQuestion[] = [
  {id: 'q1', text: 'Which animal is especially known for producing fine wool?', options: [
    {key: 'A', label: 'Berkshire pig', correct: false},
    {key: 'B', label: 'Merino sheep', correct: true},
    {key: 'C', label: 'Jersey cow', correct: false},
    {key: 'D', label: 'Boer goat', correct: false},
  ], explanation: 'Merino sheep are famous worldwide for their soft, fine wool, which is highly valued in the textile industry.'},
  {id: 'q2', text: 'What do goats mainly use to explore unfamiliar objects?', options: [
    {key: 'A', label: 'Their mouths', correct: true},
    {key: 'B', label: 'Their tails', correct: false},
    {key: 'C', label: 'Their horns', correct: false},
    {key: 'D', label: 'Their ears', correct: false},
  ], explanation: 'Goats are curious animals and often use their mouths to investigate objects, textures, and even clothing.'},
  {id: 'q3', text: 'Why do pigs often roll in mud?', options: [
    {key: 'A', label: 'To hide food', correct: false},
    {key: 'B', label: 'To sharpen their hooves', correct: false},
    {key: 'C', label: 'To cool down and protect their skin', correct: true},
    {key: 'D', label: 'To attract other pigs', correct: false},
  ], explanation: 'Pigs have sensitive skin and very little hair, so mud helps protect them from heat, sunburn, and insects.'},
  {id: 'q4', text: 'Which animal is best known for having four stomach compartments?', options: [
    {key: 'A', label: 'Cow', correct: true},
    {key: 'B', label: 'Pig', correct: false},
    {key: 'C', label: 'Horse', correct: false},
    {key: 'D', label: 'Dog', correct: false},
  ], explanation: 'Cows are ruminants — their stomach has four compartments that help digest grass and other fibrous plants.'},
  {id: 'q5', text: 'Why do sheep stay close together in a flock?', options: [
    {key: 'A', label: 'They dislike grass', correct: false},
    {key: 'B', label: 'It helps protect them from danger', correct: true},
    {key: 'C', label: 'They cannot see well at all', correct: false},
    {key: 'D', label: 'They need to share body heat all year', correct: false},
  ], explanation: 'Sheep are herd animals — staying together helps them feel safer and respond quickly to possible threats.'},
  {id: 'q6', text: 'Which breed is especially famous for rich milk with a high butterfat content?', options: [
    {key: 'A', label: 'Suffolk sheep', correct: false},
    {key: 'B', label: 'Texas Longhorn', correct: false},
    {key: 'C', label: 'Jersey cow', correct: true},
    {key: 'D', label: 'Berkshire pig', correct: false},
  ], explanation: 'Jersey cows are well known for producing rich milk, which is especially useful for butter, cream, and cheese.'},
  {id: 'q7', text: 'Which animal is often described as highly intelligent and able to learn routines quickly?', options: [
    {key: 'A', label: 'Pig', correct: true},
    {key: 'B', label: 'Sheep', correct: false},
    {key: 'C', label: 'Buffalo', correct: false},
    {key: 'D', label: 'Bull', correct: false},
  ], explanation: 'Pigs are among the most intelligent domestic animals and can remember places, learn routines, and solve simple problems.'},
  {id: 'q8', text: 'What is special about goat pupils?', options: [
    {key: 'A', label: 'They are perfectly round', correct: false},
    {key: 'B', label: 'They are heart-shaped', correct: false},
    {key: 'C', label: 'They glow in daylight', correct: false},
    {key: 'D', label: 'They are horizontal and rectangular', correct: true},
  ], explanation: 'Goats have horizontal rectangular pupils, which help them see a wide area around them.'},
  {id: 'q9', text: 'Which domestic animal is especially associated with mozzarella production?', options: [
    {key: 'A', label: 'Water buffalo', correct: true},
    {key: 'B', label: 'Merino sheep', correct: false},
    {key: 'C', label: 'Boer goat', correct: false},
    {key: 'D', label: 'Suffolk sheep', correct: false},
  ], explanation: 'Water buffalo milk is traditionally used to make mozzarella di bufala because it is rich and creamy.'},
  {id: 'q10', text: 'Why do domestic sheep often need human help?', options: [
    {key: 'A', label: 'They cannot find water', correct: false},
    {key: 'B', label: 'Many breeds need regular shearing', correct: true},
    {key: 'C', label: 'They cannot walk long distances', correct: false},
    {key: 'D', label: 'They cannot eat grass on their own', correct: false},
  ], explanation: 'Domestic sheep bred for wool often grow fleece continuously, so they need regular shearing for comfort and health.'},
  {id: 'q11', text: 'Which animal is especially known for very long horns in some breeds?', options: [
    {key: 'A', label: 'Berkshire pig', correct: false},
    {key: 'B', label: 'Saanen goat', correct: false},
    {key: 'C', label: 'Texas Longhorn cattle', correct: true},
    {key: 'D', label: 'Merino sheep', correct: false},
  ], explanation: 'Texas Longhorn cattle are famous for their impressive horns, which can grow extremely wide.'},
  {id: 'q12', text: 'What do cows spend a lot of time doing after eating?', options: [
    {key: 'A', label: 'Digging', correct: false},
    {key: 'B', label: 'Chewing cud', correct: true},
    {key: 'C', label: 'Climbing', correct: false},
    {key: 'D', label: 'Sleeping underwater', correct: false},
  ], explanation: 'Cows regurgitate partially digested food and chew it again, which helps them digest plant material more efficiently.'},
  {id: 'q13', text: 'Which animal is most likely to enjoy standing in water or mud to cool its body?', options: [
    {key: 'A', label: 'Water buffalo', correct: true},
    {key: 'B', label: 'Merino sheep', correct: false},
    {key: 'C', label: 'Suffolk sheep', correct: false},
    {key: 'D', label: 'Jersey cow', correct: false},
  ], explanation: 'Water buffalo are well adapted to hot environments and often use water or mud to cool down.'},
  {id: 'q14', text: 'What is a common reason people visit farms and ranches as tourists?', options: [
    {key: 'A', label: 'To learn about animals and rural life', correct: true},
    {key: 'B', label: 'To buy airplanes', correct: false},
    {key: 'C', label: 'To train wild predators', correct: false},
    {key: 'D', label: 'To avoid outdoor activities', correct: false},
  ], explanation: 'Farm tourism helps people understand agriculture, meet animals, and experience rural traditions more closely.'},
  {id: 'q15', text: 'Which of these animals is especially known for being agile on rocky terrain?', options: [
    {key: 'A', label: 'Goat', correct: true},
    {key: 'B', label: 'Pig', correct: false},
    {key: 'C', label: 'Cow', correct: false},
    {key: 'D', label: 'Buffalo', correct: false},
  ], explanation: 'Goats are excellent climbers and can move confidently across steep, rocky, and uneven surfaces.'},
  {id: 'q16', text: 'What do horns and antlers have in common?', options: [
    {key: 'A', label: 'They are exactly the same thing', correct: false},
    {key: 'B', label: 'They both fall off every month', correct: false},
    {key: 'C', label: 'They grow on many hoofed animals, but are different structures', correct: true},
    {key: 'D', label: 'They are made of wool', correct: false},
  ], explanation: 'Horns usually stay on the animal and continue growing, while antlers are typically shed and regrown.'},
  {id: 'q17', text: 'Which breed is commonly known as a dairy goat?', options: [
    {key: 'A', label: 'Saanen', correct: true},
    {key: 'B', label: 'Suffolk', correct: false},
    {key: 'C', label: 'Berkshire', correct: false},
    {key: 'D', label: 'Texas Longhorn', correct: false},
  ], explanation: 'Saanen goats are one of the best-known dairy goat breeds and are valued for steady milk production.'},
  {id: 'q18', text: 'Why are cows considered social animals?', options: [
    {key: 'A', label: 'They always live alone', correct: false},
    {key: 'B', label: 'They form bonds within the herd', correct: true},
    {key: 'C', label: 'They never recognize other cows', correct: false},
    {key: 'D', label: 'They prefer silence and isolation', correct: false},
  ], explanation: 'Cows often form stable social relationships and may prefer spending time with certain herd companions.'},
  {id: 'q19', text: 'Why do ruminant animals like cows chew cud after eating?', options: [
    {key: 'A', label: 'To taste food again', correct: false},
    {key: 'B', label: 'To break down tough plant fibers more efficiently', correct: true},
    {key: 'C', label: 'To produce more saliva for cooling', correct: false},
    {key: 'D', label: 'To store food in their mouth', correct: false},
  ], explanation: 'Ruminants regurgitate partially digested food and chew it again to better digest cellulose in plants.'},
  {id: 'q20', text: 'Which feature helps goats maintain balance on steep terrain?', options: [
    {key: 'A', label: 'Hollow bones', correct: false},
    {key: 'B', label: 'Flexible horns', correct: false},
    {key: 'C', label: 'Specialized hooves with soft pads', correct: true},
    {key: 'D', label: 'Long tails', correct: false},
  ], explanation: 'Goat hooves have a soft inner pad and hard outer edge, allowing excellent grip on uneven surfaces.'},
  {id: 'q21', text: 'Why are pigs considered highly trainable animals?', options: [
    {key: 'A', label: 'They imitate other animals', correct: false},
    {key: 'B', label: 'They rely only on instinct', correct: false},
    {key: 'C', label: 'They have strong memory and problem-solving abilities', correct: true},
    {key: 'D', label: 'They respond only to food', correct: false},
  ], explanation: 'Pigs can learn routines, solve simple tasks, and remember solutions, making them highly intelligent.'},
  {id: 'q22', text: 'What is the main advantage of horizontal pupils in goats and sheep?', options: [
    {key: 'A', label: 'Better night vision only', correct: false},
    {key: 'B', label: 'Ability to see colors more vividly', correct: false},
    {key: 'C', label: 'Wider field of view to detect predators', correct: true},
    {key: 'D', label: 'Ability to focus on distant stars', correct: false},
  ], explanation: 'Horizontal pupils allow these animals to see a broad panoramic view without moving their heads.'},
  {id: 'q23', text: 'Why do some cattle breeds develop large horns in hot climates?', options: [
    {key: 'A', label: 'To fight more often', correct: false},
    {key: 'B', label: 'To attract predators', correct: false},
    {key: 'C', label: 'To help regulate body temperature', correct: true},
    {key: 'D', label: 'To dig for food', correct: false},
  ], explanation: 'Horns can help dissipate heat, acting as a natural cooling system in warm environments.'},
  {id: 'q24', text: 'What is a key reason sheep rely heavily on flock behavior?', options: [
    {key: 'A', label: 'They cannot walk alone', correct: false},
    {key: 'B', label: 'They need constant guidance', correct: false},
    {key: 'C', label: 'It increases survival by reducing individual risk', correct: true},
    {key: 'D', label: 'They cannot see each other', correct: false},
  ], explanation: 'Staying in groups lowers the chance of any one sheep being targeted by predators.'},
  {id: 'q25', text: 'Why is buffalo milk often used for specialty dairy products?', options: [
    {key: 'A', label: 'It is easier to transport', correct: false},
    {key: 'B', label: 'It contains less water', correct: false},
    {key: 'C', label: 'It has higher fat and protein content', correct: true},
    {key: 'D', label: 'It lasts longer naturally', correct: false},
  ], explanation: 'Buffalo milk is richer than cow milk, making it ideal for products like mozzarella.'},
  {id: 'q26', text: 'What makes Dorper sheep different from many wool breeds?', options: [
    {key: 'A', label: 'They grow colored wool', correct: false},
    {key: 'B', label: 'They naturally shed much of their coat', correct: true},
    {key: 'C', label: 'They cannot survive in cold climates', correct: false},
    {key: 'D', label: 'They produce no fiber at all', correct: false},
  ], explanation: 'Dorper sheep are hair sheep and require little to no shearing compared to wool breeds.'},
  {id: 'q27', text: 'Why are Texas Longhorn cattle considered historically important?', options: [
    {key: 'A', label: 'They produce the most milk', correct: false},
    {key: 'B', label: 'They were used mainly for wool', correct: false},
    {key: 'C', label: 'They were essential in early cattle drives', correct: true},
    {key: 'D', label: 'They were only used for decoration', correct: false},
  ], explanation: 'Longhorns played a key role in moving cattle across long distances in early American ranching.'},
  {id: 'q28', text: 'What is one reason goats are highly adaptable animals?', options: [
    {key: 'A', label: 'They only eat one type of plant', correct: false},
    {key: 'B', label: 'They can survive in diverse environments', correct: true},
    {key: 'C', label: 'They avoid climbing', correct: false},
    {key: 'D', label: 'They require constant human care', correct: false},
  ], explanation: 'Goats can live in mountains, deserts, and grasslands due to their flexible diet and resilience.'},
  {id: 'q29', text: 'Why do cows often form stable social groups within a herd?', options: [
    {key: 'A', label: 'To compete constantly', correct: false},
    {key: 'B', label: 'To reduce feeding time', correct: false},
    {key: 'C', label: 'To maintain social order and reduce stress', correct: true},
    {key: 'D', label: 'To avoid movement', correct: false},
  ], explanation: 'Social bonds help reduce stress and create predictable group behavior.'},
  {id: 'q30', text: 'What is a major difference between pigs and ruminants like cows?', options: [
    {key: 'A', label: 'Pigs cannot digest plants', correct: false},
    {key: 'B', label: 'Pigs have a single-chamber stomach', correct: true},
    {key: 'C', label: 'Pigs cannot learn', correct: false},
    {key: 'D', label: 'Pigs do not eat regularly', correct: false},
  ], explanation: 'Unlike ruminants, pigs are monogastric animals with one stomach chamber.'},
  {id: 'q31', text: 'Why do sheep often appear to move as a single unit?', options: [
    {key: 'A', label: 'They communicate telepathically', correct: false},
    {key: 'B', label: 'They have identical behavior patterns', correct: false},
    {key: 'C', label: 'They follow movement cues from nearby individuals', correct: true},
    {key: 'D', label: 'They are controlled by one leader always', correct: false},
  ], explanation: 'Sheep react quickly to the movement of others, creating synchronized group motion.'},
  {id: 'q32', text: 'What role did oxen play before modern machinery?', options: [
    {key: 'A', label: 'They were used only for milk', correct: false},
    {key: 'B', label: 'They replaced horses in racing', correct: false},
    {key: 'C', label: 'They helped with plowing and transportation', correct: true},
    {key: 'D', label: 'They were only used for meat', correct: false},
  ], explanation: 'Oxen were essential for agriculture, pulling plows and transporting goods.'},
];

export const drawQuestions = (n: number = 10, seed?: number): QuizQuestion[] => {
  const base = [...quizRegistry];
  const rand = typeof seed === 'number'
    ? (i: number) => ((Math.sin(seed + i) + 1) / 2)
    : Math.random;
  for (let i = base.length - 1; i > 0; i--) {
    const j = Math.floor(rand(i) * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }
  return base.slice(0, Math.min(n, base.length));
};
